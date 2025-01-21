'use client';
import { useState, useEffect } from 'react';
import Dashboard from "@/src/components/sidebar";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Stack,
  Avatar,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  LocalFireDepartment as FireIcon,
  Stars as StarsIcon,
} from '@mui/icons-material';

// Separate LeaderboardSection component
function LeaderboardSection({ title, data = [], icon: Icon, valueLabel, getValue }) {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        height: '100%',
        borderRadius: 2,
        bgcolor: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" mb={3}>
        {Icon && <Icon sx={{ color: '#1976d2' }} />}
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {data.map((user, index) => (
          <Paper
            key={user.username}
            elevation={0}
            sx={{
              p: 2,
              bgcolor: index < 3 ? 'rgba(25, 118, 210, 0.04)' : 'transparent',
              border: '1px solid',
              borderColor: index < 3 ? 'rgba(25, 118, 210, 0.2)' : 'rgba(0,0,0,0.08)',
              borderRadius: 2,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateX(8px)',
              }
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography
                variant="h6"
                sx={{
                  width: 30,
                  color: index < 3 ? '#1976d2' : 'text.secondary',
                  fontWeight: index < 3 ? 600 : 400,
                }}
              >
                #{index + 1}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: index < 3 ? '#1976d2' : 'rgba(0,0,0,0.08)',
                  }}
                >
                  {user.username[0].toUpperCase()}
                </Avatar>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: index < 3 ? 600 : 400,
                    color: index < 3 ? '#1976d2' : 'text.primary',
                  }}
                >
                  @{user.username}
                </Typography>
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: index < 3 ? '#1976d2' : 'text.primary',
                }}
              >
                {getValue(user)} {valueLabel}
              </Typography>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        if (response.ok) {
          const data = await response.json();
          setLeaderboardData(data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Dashboard>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
          }}
        >
          <CircularProgress />
        </Box>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f9f7fa', minHeight: '100vh' }}>
        {/* Header */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: '#fff',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={700} color="#1a1a1a">
            Leaderboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            See how you stack up against other learners
          </Typography>
        </Paper>

        {/* Leaderboards Grid */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LeaderboardSection
              title="Most Questions Correct"
              data={leaderboardData?.correctLeaders || []}
              icon={TrophyIcon}
              valueLabel="correct"
              getValue={(user) => user.questions_correct}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <LeaderboardSection
              title="Best Streaks"
              data={leaderboardData?.streakLeaders || []}
              icon={FireIcon}
              valueLabel="days"
              getValue={(user) => user.best_streak}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <LeaderboardSection
              title="Highest Success Rate"
              data={leaderboardData?.successLeaders || []}
              icon={StarsIcon}
              valueLabel="%"
              getValue={(user) => user.success_rate}
            />
          </Grid>
        </Grid>
      </Box>
    </Dashboard>
  );
}