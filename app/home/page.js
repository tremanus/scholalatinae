'use client';
import { useSession } from 'next-auth/react';
import Dashboard from "@/src/components/sidebar";
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
} from '@mui/material';
import {
  School as SchoolIcon,
  YouTube as YouTubeIcon,
  EmojiEvents as TrophyIcon,
  Group as GroupIcon,
  Timeline as TimelineIcon,
  MenuBook as BookIcon,
  StarBorder as StarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

export default function Home() {
  const { data: session } = useSession();

  const userProgress = {
    lessonsCompleted: 12,
    vocabularyMastered: 145,
    streak: 7,
    totalPoints: 850
  };

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume from Lesson 13: Latin Verbs',
      icon: <SchoolIcon />,
      color: '#1976d2',
      link: '/lessons'
    },
    {
      title: 'Watch Lessons',
      description: 'Explore video tutorials and lectures',
      icon: <YouTubeIcon />,
      color: '#9c27b0',
      link: '/videos'
    },
    {
      title: 'Practice',
      description: 'Test your knowledge with exercises',
      icon: <TrophyIcon />,
      color: '#2e7d32',
      link: '/practice'
    },
    {
      title: 'Community',
      description: 'Connect with fellow Latin learners',
      icon: <GroupIcon />,
      color: '#ed6c02',
      link: '/community'
    }
  ];

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
                width: 80, 
                height: 80,
                border: '3px solid #fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                Salve, {session?.user?.name || 'Scholar'}!
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#666' }}>
                Continue your journey through the fascinating world of Latin.
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
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{userProgress.streak}</Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 500 }}>Day Streak</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <BookIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{userProgress.lessonsCompleted}</Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 500 }}>Lessons Completed</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <StarIcon sx={{ fontSize: 40, mb: 1, color: '#ffd700' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{userProgress.vocabularyMastered}</Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 500 }}>Words Mastered</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <TrendingUpIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>{userProgress.totalPoints}</Typography>
                <Typography color="textSecondary" sx={{ fontWeight: 500 }}>Total Points</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
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

        {/* Daily Challenge */}
        <Paper 
          sx={{ 
            p: 3,
            bgcolor: '#fff',
            borderRadius: 2,
            border: '1px solid #e0e0e0'
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
            Daily Challenge
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
            Translate today's featured phrase:
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontStyle: 'italic',
              mb: 3,
              color: '#1a1a1a',
              fontWeight: 500
            }}
          >
            "Per aspera ad astra"
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#1976d2',
              color: '#fff',
              fontWeight: 500,
              '&:hover': {
                bgcolor: '#1565c0',
              }
            }}
          >
            Start Challenge
          </Button>
        </Paper>
      </Box>
    </Dashboard>
  );
}