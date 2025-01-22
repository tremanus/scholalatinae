'use client';
import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function LogoutPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      if (session) {
        try {
          await signOut({ 
            callbackUrl: '/',
            redirect: true
          });
        } catch (error) {
          console.error('Logout error:', error);
          // Fallback redirect if there's an error
          router.push('/');
        }
      } else {
        // If not authenticated, redirect to home
        router.push('/');
      }
    };

    handleLogout();
  }, [session, router]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        bgcolor: '#f9f7fa'
      }}
    >
      <CircularProgress size={40} sx={{ mb: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Signing out...
      </Typography>
    </Box>
  );
}