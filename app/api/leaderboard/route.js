import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET() {
  try {
    // Fetch all user stats
    const { data: users, error } = await supabase
      .from('user_stats')
      .select('username, questions_correct, questions_attempted, best_streak')
      .not('username', 'is', null);

    if (error) throw error;

    // Calculate success rates and sort for different categories
    const processedData = users.map(user => ({
      ...user,
      success_rate: user.questions_attempted > 0 
        ? (user.questions_correct / user.questions_attempted * 100).toFixed(1)
        : 0
    }));

    // Sort for each category
    const correctLeaders = [...processedData].sort((a, b) => b.questions_correct - a.questions_correct).slice(0, 10);
    const streakLeaders = [...processedData].sort((a, b) => b.best_streak - a.best_streak).slice(0, 10);
    const successLeaders = [...processedData].sort((a, b) => b.success_rate - a.success_rate).slice(0, 10);

    return new Response(
      JSON.stringify({
        correctLeaders,
        streakLeaders,
        successLeaders
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch leaderboard data' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}