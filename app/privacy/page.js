'use client';
import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </Typography>

            <Typography variant="body1" paragraph>
              Last updated: January 21, 2025
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              1. Information We Collect
            </Typography>

            <Typography paragraph>
              We collect information that you provide directly to us, including:
              - Account information (name, email address)
              - Profile information
              - Learning progress and quiz results
              - Communications with us
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              2. How We Use Your Information
            </Typography>

            <Typography paragraph>
              We use the information we collect to:
              - Provide and maintain our services
              - Track learning progress
              - Improve our educational content
              - Communicate with you about your account
              - Ensure platform security
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              3. Information Sharing
            </Typography>

            <Typography paragraph>
              We do not sell your personal information. We may share your information only:
              - With your consent
              - For legal compliance
              - To protect rights and safety
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              4. Data Security
            </Typography>

            <Typography paragraph>
              We implement appropriate security measures to protect your personal information.
            </Typography>

            <Typography variant="h5" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              5. Contact Us
            </Typography>

            <Typography paragraph>
              If you have questions about this Privacy Policy, please contact us at: scholalatinae@gmail.com
            </Typography>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}