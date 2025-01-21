'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Dashboard from "@/src/components/sidebar";
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Alert,
  Fade,
} from '@mui/material';

const getDifficultyColor = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner': return '#4caf50';
    case 'intermediate': return '#ff9800';
    case 'advanced': return '#f44336';
    default: return '#757575';
  }
};

const calculateSuccessRate = (question) => {
  if (!question?.total_attempts) return 0;
  return Math.round((question.correct_attempts / question.total_attempts) * 100);
};

export default function Quiz() {
  const { data: session } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, isCorrect: false });
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNextQuestion = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/quiz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error('Response not OK:', response.status, text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Received question data:', data);
      
      if (currentQuestion && data.id === currentQuestion.id) {
        console.log('Duplicate question detected, fetching another...');
        fetchNextQuestion();
        return;
      }
  
      setCurrentQuestion(data);
    } catch (error) {
      console.error('Error details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  const handleAnswerSelect = async (selectedOption) => {
    if (isAnswered) return;
    
    setSelectedAnswer(selectedOption);
    setIsAnswered(true);
    
    const isCorrect = selectedOption === currentQuestion.correct_answer;
    setFeedback({ show: true, isCorrect });
    setStreak(prev => isCorrect ? prev + 1 : 0);

    try {
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          isCorrect,
          answerGiven: selectedOption
        })
      });
    } catch (error) {
      console.error('Error recording answer:', error);
    }

    setTimeout(() => {
      setFeedback({ show: false, isCorrect: false });
      setSelectedAnswer(null);
      setIsAnswered(false);
      fetchNextQuestion();
    }, 2000);
  };

  if (loading) {
    return (
      <Dashboard>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh' 
        }}>
          <LinearProgress sx={{ width: '60%' }} />
        </Box>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '90vh' }}>
        {/* Header Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: '#fff',
            borderRadius: 2
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
              Practice Latin
            </Typography>
            <Typography variant="h6" color="primary">
              Streak: {streak}
            </Typography>
          </Stack>
        </Paper>

        {/* Question Card */}
{currentQuestion && (
  <Card sx={{ maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
    <CardContent sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        {/* Left side with Question Difficulty */}
        <Typography variant="body2" color="textSecondary">
          Success Rate: {calculateSuccessRate(currentQuestion)}%
        </Typography>

        {/* Right side with Success Rate */}
        <Stack direction="row" spacing={3} alignItems="center">
          {currentQuestion?.difficulty && (
            <Typography 
              sx={{ 
                color: getDifficultyColor(currentQuestion.difficulty),
                fontWeight: 500,
                bgcolor: '#f5f5f5',
                px: 2,
                py: 1,
                borderRadius: 1
              }}
            >
              {currentQuestion.difficulty.charAt(0).toUpperCase() + 
               currentQuestion.difficulty.slice(1)}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Typography 
        variant="h5" 
        sx={{ 
          mb: 4, 
          color: '#1a1a1a',
          fontWeight: 500,
          lineHeight: 1.4
        }}
      >
        {currentQuestion.question}
      </Typography>

      <Stack spacing={2}>
        {currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            variant={selectedAnswer === option ? 'contained' : 'outlined'}
            fullWidth
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
            sx={{
              p: 2,
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontSize: '1rem',
              bgcolor: () => {
                if (!isAnswered) return 'transparent';
                if (option === currentQuestion.correct_answer) return '#c8e6c9';
                if (option === selectedAnswer) return '#ffcdd2';
                return 'transparent';
              },
              color: 'black',
              '&:hover': {
                bgcolor: !isAnswered && '#f5f5f5'
              },
              border: '1px solid #e0e0e0',
            }}
          >
            {option}
          </Button>
        ))}
      </Stack>
    </CardContent>
  </Card>
)}

        {/* Feedback Alert */}
        <Fade in={feedback.show}>
          <Alert 
            severity={feedback.isCorrect ? "success" : "error"}
            sx={{ 
              position: 'fixed', 
              bottom: 24, 
              left: '50%', 
              transform: 'translateX(-50%)',
              minWidth: 300,
              borderRadius: 2
            }}
          >
            {feedback.isCorrect ? 'Correct! Well done!' : 'Not quite right. Keep practicing!'}
          </Alert>
        </Fade>
      </Box>
    </Dashboard>
  );
}