// utils/quizLogic.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const DIFFICULTY_LEVELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced'
};

export async function initializeUserStats(userId) {
  try {
    const { data: existingStats, error: fetchError } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        const initialStats = {
          user_id: userId,
          questions_attempted: 0,
          questions_correct: 0,
          beginner_correct: 0,
          beginner_attempted: 0,
          intermediate_correct: 0,
          intermediate_attempted: 0,
          advanced_correct: 0,
          advanced_attempted: 0,
          current_streak: 0,
          best_streak: 0,
          last_quiz_date: new Date().toISOString()
        };

        const { data: newStats, error: createError } = await supabase
          .from('user_stats')
          .upsert(initialStats)
          .select()
          .single();

        if (createError) throw createError;
        return newStats;
      }
      throw fetchError;
    }

    return existingStats;
  } catch (error) {
    console.error('Error initializing user stats:', error);
    throw error;
  }
}

async function calculateTargetDifficulty(userStats) {
    console.log('Calculating target difficulty for user:', userStats.user_id);

    // Calculate overall success rate
    const overallSuccessRate = userStats.questions_attempted > 0 
        ? (userStats.questions_correct / userStats.questions_attempted) * 100 
        : 0;

    // Check advanced stats
    const advancedSuccessRate = userStats.advanced_attempted > 0
        ? (userStats.advanced_correct / userStats.advanced_attempted) * 100
        : 0;

    console.log('Overall stats:', {
        overallSuccessRate,
        advancedAttempts: userStats.advanced_attempted,
        advancedCorrect: userStats.advanced_correct,
        advancedSuccessRate
    });

    // Get the user's last 25 attempts
    const { data: recentAttempts, error } = await supabase
      .from('user_progress')
      .select('is_correct, created_at')
      .eq('user_id', userStats.user_id)
      .order('created_at', { ascending: false })
      .limit(25);
  
    if (error) {
      console.error('Error fetching recent attempts:', error);
      return 'beginner';
    }
  
    // If user has less than 10 attempts total, stay in beginner
    if (userStats.questions_attempted < 10) {
      console.log('User has less than 10 total attempts, staying in beginner');
      return 'beginner';
    }
  
    // Calculate success rate from recent attempts
    const correctAttempts = recentAttempts.filter(attempt => attempt.is_correct).length;
    const recentSuccessRate = (correctAttempts / recentAttempts.length) * 100;

    console.log('Recent performance:', {
        totalRecent: recentAttempts.length,
        correctRecent: correctAttempts,
        successRate: recentSuccessRate,
        currentStreak: userStats.current_streak
    });

    // New condition: if overall success rate is over 70%
    if (overallSuccessRate > 70) {
        console.log('Moving to advanced: Overall success rate > 70%');
        return 'advanced';
    }
  
    if (recentSuccessRate > 90) {
        return 'advanced';
    }
    // Move to advanced if recent performance is excellent and has a streak
    if (recentSuccessRate > 80 && userStats.current_streak >= 5) {
      return 'advanced';
    }
    // Move to intermediate if recent performance is good
    if (recentSuccessRate > 65) {
      return 'intermediate';
    }

    return 'beginner';
}

async function getQuestionStats(questionId) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('is_correct')
    .eq('question_id', questionId);

  if (error) {
    console.error('Error fetching question stats:', error);
    return { totalAttempts: 0, successRate: 0 };
  }

  const totalAttempts = data.length;
  const correctAttempts = data.filter(attempt => attempt.is_correct).length;
  const successRate = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

  return {
    totalAttempts,
    successRate: Math.round(successRate * 10) / 10
  };
}

export async function getNextQuestion(userEmail) {
    try {
      const userStats = await initializeUserStats(userEmail);

      const targetDifficulty = await calculateTargetDifficulty(userStats);
      console.log('Target difficulty calculated:', targetDifficulty);

      // Get recently answered questions
      const { data: recentQuestions } = await supabase
        .from('user_progress')
        .select('question_id')
        .eq('user_id', userEmail)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
  
      // First try: Get questions at target difficulty, not recently answered
      let { data: questions, error: questionsError } = await supabase
        .from('quiz_questions')
        .select('*')
        .not('id', 'in', `(${recentQuestions?.map(q => q.question_id).join(',') || '0'})`)
        .eq('difficulty', targetDifficulty)
        .limit(50);

      if (questionsError) {
        console.error('Error fetching target difficulty questions:', questionsError);
      }
  
      // Second try: Get any questions not recently answered
      if (!questions?.length) {
        ({ data: questions } = await supabase
          .from('quiz_questions')
          .select('*')
          .not('id', 'in', `(${recentQuestions?.map(q => q.question_id).join(',') || '0'})`)
          .limit(50));

      }
  
      // Final try: If all questions were answered recently, get the least recently answered ones
      if (!questions?.length) {
        const { data: oldestAnswered } = await supabase
          .from('user_progress')
          .select('question_id, created_at')
          .eq('user_id', userEmail)
          .order('created_at', { ascending: true })
          .limit(50);
  
        ({ data: questions } = await supabase
          .from('quiz_questions')
          .select('*')
          .in('id', oldestAnswered.map(q => q.question_id))
          .limit(50));
      }
  
      if (!questions?.length) {
        console.error('No questions available at all');
        throw new Error('No questions available in the database');
      }
  
      // Select random question from available ones
      const selectedQuestion = questions[Math.floor(Math.random() * questions.length)];
      console.log('Selected question:', {
        id: selectedQuestion.id,
        difficulty: selectedQuestion.difficulty
      });

      const stats = await getQuestionStats(selectedQuestion.id);
      console.log('Question stats:', stats);
  
      return {
        ...selectedQuestion,
        difficultyText: DIFFICULTY_LEVELS[selectedQuestion.difficulty],
        stats
      };
    } catch (error) {
      console.error('Error getting next question:', error);
      throw error;
    }
}

export async function recordAnswer(userEmail, questionId, isCorrect, answerGiven) {
    try {
      // Get question's current stats
      const { data: question, error: questionError } = await supabase
        .from('quiz_questions')
        .select('difficulty, total_attempts, correct_attempts')
        .eq('id', questionId)
        .single();
  
      if (questionError) {
        console.error('Error fetching question:', questionError);
        throw questionError;
      }

      console.log('Current question stats:', {
        total_attempts: question.total_attempts,
        correct_attempts: question.correct_attempts
      });
  
      // Calculate new stats
      const newTotalAttempts = (question.total_attempts || 0) + 1;
      const newCorrectAttempts = (question.correct_attempts || 0) + (isCorrect ? 1 : 0);

      console.log('Updating question stats to:', {
        total_attempts: newTotalAttempts,
        correct_attempts: newCorrectAttempts
      });

      // Update question's stats
      const { error: questionStatsError } = await supabase
        .from('quiz_questions')
        .update({
          total_attempts: newTotalAttempts,
          correct_attempts: newCorrectAttempts
        })
        .eq('id', questionId);
  
      if (questionStatsError) {
        console.error('Error updating question stats:', questionStatsError);
        throw questionStatsError;
      }

      // Verify the update
      const { data: updatedQuestion, error: verifyError } = await supabase
        .from('quiz_questions')
        .select('total_attempts, correct_attempts')
        .eq('id', questionId)
        .single();

      if (verifyError) {
        console.error('Error verifying update:', verifyError);
      } else {
        console.log('Updated question stats:', updatedQuestion);
      }
  
      // Record the attempt
      const { error: progressError } = await supabase
        .from('user_progress')
        .insert({
          user_id: userEmail,
          question_id: questionId,
          is_correct: isCorrect,
          answer_given: answerGiven
        });
  
      if (progressError) throw progressError;
  
      // Get current user stats
      const { data: stats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userEmail)
        .single();
  
      if (statsError) {
        await initializeUserStats(userEmail);
      }
  
      // Update difficulty-specific stats
      const difficultyLevel = question.difficulty;
      const attemptedField = `${difficultyLevel}_attempted`;
      const correctField = `${difficultyLevel}_correct`;
  
      // Update user stats
      const { error: updateError } = await supabase
        .from('user_stats')
        .upsert({
          user_id: userEmail,
          questions_attempted: (stats?.questions_attempted || 0) + 1,
          questions_correct: (stats?.questions_correct || 0) + (isCorrect ? 1 : 0),
          [attemptedField]: (stats?.[attemptedField] || 0) + 1,
          [correctField]: (stats?.[correctField] || 0) + (isCorrect ? 1 : 0),
          current_streak: isCorrect ? (stats?.current_streak || 0) + 1 : 0,
          best_streak: isCorrect ?
            Math.max((stats?.best_streak || 0), (stats?.current_streak || 0) + 1) :
            (stats?.best_streak || 0),
          last_quiz_date: new Date().toISOString()
        })
        .select();
  
      if (updateError) throw updateError;
      return true;
    } catch (error) {
      console.error('Error recording answer:', error);
      throw error;
    }
  }