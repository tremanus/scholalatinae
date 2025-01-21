'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from "@/src/components/sidebar";
import { createClient } from '@supabase/supabase-js';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Stack,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  YouTube as YouTubeIcon,
  EmojiEvents as TrophyIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  CheckCircle as CheckCircleIcon,
  StarBorder as StarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

// Move Supabase client outside component
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const quickActions = [
  {
    title: 'Practice Questions',
    description: 'Test your knowledge with exercises',
    icon: <TrophyIcon />,
    color: '#2e7d32',
    link: '/practice'
  },
  {
    title: 'Review Progress',
    description: 'See your learning analytics',
    icon: <TimelineIcon />,
    color: '#1976d2',
    link: '/home'
  },
  {
    title: 'Watch Lessons',
    description: 'Explore video tutorials',
    icon: <YouTubeIcon />,
    color: '#9c27b0',
    link: '/lessons'
  },
  {
    title: 'Community',
    description: 'Stack up against other learners',
    icon: <GroupIcon />,
    color: '#ed6c02',
    link: '/leaderboard'
  }
];

export default function Home() {
  const { data: session } = useSession();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkUsernameAndFetchStats = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        // Check username first
        const { data: user, error: userError } = await supabase
          .from('user_stats')
          .select('has_set_username')
          .eq('user_id', session.user.email)
          .single();

        if (userError) {
          console.error('Error checking username:', userError);
          if (isMounted) setLoading(false);
          return;
        }

        if (!user?.has_set_username) {
          router.push('/username');
          return;
        }

        // Only fetch stats if we're still mounted and don't have them yet
        if (isMounted && !stats) {
          try {
            const response = await fetch('/api/user/stats');
            if (response.ok) {
              const data = await response.json();
              if (isMounted) setStats(data);
            }
          } catch (error) {
            console.error('Error fetching stats:', error);
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkUsernameAndFetchStats();

    // Cleanup function to prevent updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, [session?.user?.email, router, stats]);

  // Calculate success rates for each difficulty
  const calculateSuccessRate = (correct, total) => {
    if (!total) return 0;
    return Math.round((correct / total) * 100);
  };

  const getDifficultyColor = (rate) => {
    if (rate >= 80) return '#4caf50';
    if (rate >= 60) return '#ff9800';
    return '#f44336';
  };

  if (loading) {
    return (
      <Dashboard>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <CircularProgress />
        </Box>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f9f7fa' }}>
        {/* Welcome Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: '#fff',
            borderRadius: 2
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar 
              src={session?.user?.image || '/default-avatar.png'} 
              alt={session?.user?.name || 'Profile'} 
              sx={{ 
                width: 120, 
                height: 120,
                border: '3px solid #fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 0.5 }}>
                Salve, {session?.user?.name || 'Scholar'}!
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#888', mb: 0.5 }}>
                @{stats?.username || 'username'}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#666' }}>
                {stats?.best_streak ? `Best Streak: ${stats.best_streak} 🔥` : 'Start your learning journey!'}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Progress Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TimelineIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{stats?.current_streak || 0}</Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 500 }}>Current Streak</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <CheckCircleIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {calculateSuccessRate(stats?.questions_correct || 0, stats?.questions_attempted || 0)}%
                </Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 500 }}>Overall Success Rate</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <StarIcon sx={{ fontSize: 40, mb: 1, color: '#ffd700' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{stats?.questions_correct || 0}</Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 500 }}>Questions Correct</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUpIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{stats?.questions_attempted || 0}</Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 500 }}>Total Attempts</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Difficulty Stats */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
          Performance by Difficulty
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {['beginner', 'intermediate', 'advanced'].map((level) => {
            const successRate = calculateSuccessRate(
              stats?.[`${level}_correct`] || 0,
              stats?.[`${level}_attempted`] || 0
            );
            return (
              <Grid item xs={12} sm={4} key={level}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                        {level}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: getDifficultyColor(successRate),
                          fontWeight: 600
                        }}
                      >
                        {successRate}%
                      </Typography>
                    </Stack>
                    <Typography color="textSecondary" sx={{ mt: 1 }}>
                      {stats?.[`${level}_correct`] || 0} / {stats?.[`${level}_attempted`] || 0} correct
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'all 0.2s ease',
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }
                }}
                onClick={() => router.push(action.link)}
              >
                <CardContent>
                  <IconButton
                    sx={{
                      backgroundColor: `${action.color}10`,
                      color: action.color,
                      mb: 2,
                      '&:hover': {
                        backgroundColor: `${action.color}20`,
                      }
                    }}
                  >
                    {action.icon}
                  </IconButton>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontWeight: 400 }}>
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Dashboard>
  );
}