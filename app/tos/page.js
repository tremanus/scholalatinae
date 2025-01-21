'use client';
import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function Terms() {
  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#fafafa', py: 10, mt: 8 }}>
        <Container maxWidth="lg">
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              borderRadius: 2,
              border: '1px solid rgba(0,0,0,0.08)',
              bgcolor: 'white',
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                mb: 4
              }}
            >
              Terms of Service
            </Typography>

            <Typography variant="body1" paragraph>
              Last updated: January 21, 2025
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              1. Acceptance of Terms
            </Typography>

            <Typography paragraph>
              By accessing or using ScholaLatinae, you agree to be bound by these Terms of Service.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              2. User Accounts
            </Typography>

            <Typography paragraph>
              - You are responsible for maintaining the security of your account
              - You must provide accurate and complete information
              - You are responsible for all activities under your account
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              3. Acceptable Use
            </Typography>

            <Typography paragraph>
              You agree not to:
              - Violate any laws or regulations
              - Share inappropriate content
              - Interfere with the platform's operation
              - Attempt to access other users' accounts
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              4. Content
            </Typography>

            <Typography paragraph>
              - All content is provided for educational purposes
              - We retain all intellectual property rights
              - Users may not copy or distribute content without permission
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              5. Changes to Terms
            </Typography>

            <Typography paragraph>
              We reserve the right to modify these terms at any time. Users will be notified of significant changes.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              6. Contact
            </Typography>

            <Typography paragraph>
              For questions about these Terms, contact us at: scholalatinae@gmail.com
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}