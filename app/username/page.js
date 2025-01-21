"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Username requirements
const requirements = [
  { id: 1, text: 'Between 3-20 characters' },
  { id: 2, text: 'Only letters, numbers, and underscores' },
  { id: 3, text: 'No spaces allowed' },
];

export default function UsernameCreation() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // Validate username in real-time
  useEffect(() => {
    const validateUsername = async () => {
      if (!username) {
        setIsAvailable(null);
        setValidationErrors([]);
        return;
      }

      const errors = [];
      
      // Check length
      if (username.length < 3 || username.length > 20) {
        errors.push('Username must be between 3-20 characters');
      }

      // Check characters
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push('Username can only contain letters, numbers, and underscores');
      }

      // Check for spaces
      if (/\s/.test(username)) {
        errors.push('Username cannot contain spaces');
      }

      setValidationErrors(errors);

      // Only check availability if there are no validation errors
      if (errors.length === 0) {
        const { data: existingUser } = await supabase
          .from('user_stats')
          .select('username')
          .eq('username', username)
          .single();

        setIsAvailable(!existingUser);
      } else {
        setIsAvailable(null);
      }
    };

    const timeoutId = setTimeout(validateUsername, 500);
    return () => clearTimeout(timeoutId);
  }, [username]);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (validationErrors.length > 0 || !isAvailable) return;

    setIsLoading(true);
    setError('');

    try {
      const { error: updateError } = await supabase
        .from('user_stats')
        .update({ 
          username: username,
          has_set_username: true 
        })
        .eq('user_id', session?.user?.email);

      if (updateError) throw updateError;

      router.push('/home');
    } catch (err) {
      setError('Failed to set username. Please try again.');
      setIsLoading(false);
    }
  };

  if (!session) {
    router.push('/');
    return null;
  }

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f9f7fa',
        py: 12,
        px: 4
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 480,
          width: '100%',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          }
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              Choose Your Username
            </Typography>
            <Typography variant="body1" color="text.secondary">
              This will be your unique identifier in Schola Latinae
            </Typography>
          </Box>

          <form onSubmit={handleUsernameSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={validationErrors.length > 0}
                helperText={validationErrors[0]}
                InputProps={{
                  endAdornment: username && (
                    isAvailable ? (
                      <CheckIcon color="success" />
                    ) : isAvailable === false ? (
                      <CloseIcon color="error" />
                    ) : null
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  }
                }}
              />

              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2,
                  bgcolor: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <InfoIcon fontSize="small" color="action" />
                  <Typography variant="subtitle2" color="text.secondary">
                    Username Requirements
                  </Typography>
                </Stack>
                {requirements.map((req) => (
                  <Typography
                    key={req.id}
                    variant="body2"
                    color="text.secondary"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mt: 0.5
                    }}
                  >
                    •  {req.text}
                  </Typography>
                ))}
              </Paper>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading || validationErrors.length > 0 || !isAvailable}
                sx={{
                  py: 1.5,
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#1565c0',
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(0,0,0,0.12)',
                  }
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Set Username'
                )}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  );
}