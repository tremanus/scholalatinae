"use client";
import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Container, 
  Card, 
  CardContent, 
  Button,
} from '@mui/material';
import {
  Public as GlobalIcon,
  Code as CodeIcon,
  VideoLibrary as VideoIcon,
  EmojiEvents as ScholarshipIcon,
  Rocket as UpgradeIcon,
  MonetizationOn as FreeIcon,
} from '@mui/icons-material';
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function Donate() {

    useEffect(() => {
        document.title = "ScholaLatinae | Learn Latin & Greek for Free";
      }, []);

  const donationImpact = [
    {
      icon: <FreeIcon sx={{ color: '#34a853' }} />,
      title: "Keep Everything Free",
      description: "Maintain free access to all features for students interested in Classics education"
    },
    {
      icon: <CodeIcon sx={{ color: '#1a73e8' }} />,
      title: "Infrastructure Costs",
      description: "Cover website subscription fees, including practice questions and leaderboard services"
    },
    {
      icon: <UpgradeIcon sx={{ color: '#ea4335' }} />,
      title: "Platform Improvements",
      description: "Upgrade practice and game features for a smoother user experience"
    },
    {
      icon: <GlobalIcon sx={{ color: '#673ab7' }} />,
      title: "Expand Our Reach",
      description: "Promote classical education to a wider audience through social media"
    },
    {
      icon: <VideoIcon sx={{ color: '#0097a7' }} />,
      title: "Content Creation",
      description: "Fund student-created educational videos to expand learning materials"
    },
    {
      icon: <ScholarshipIcon sx={{ color: '#f9a825' }} />,
      title: "Annual Scholarship",
      description: "Support high school students making an impact through Classics"
    }
  ];

  return (
    <>
      <Header />
      <Box sx={{ bgcolor: '#fafafa', py: 10, mt: 8 }}>
        <Container maxWidth="lg">
          {/* Hero Section with Donation CTA */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, md: 6 }, 
              textAlign: 'center',
              borderRadius: 2,
              border: '1px solid rgba(0,0,0,0.08)',
              bgcolor: 'white',
              maxWidth: '1200px',
              mx: 'auto',
              mb: 8
            }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                color: '#1a1a1a',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                letterSpacing: '-0.02em'
              }}
            >
              Support Free Classical Education
            </Typography>
            <Typography 
              sx={{ 
                mb: 4,
                color: '#666',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              ScholaLatinae is a completely free education service funded by generous donors like you
            </Typography>
            <Button
              variant="contained" 
              size="large"
              href="https://www.zeffy.com/donation-form/e876bdc8-ceb3-424a-bb89-28ab758ecb6e"
              target="_blank"  // Opens in new tab
              rel="noopener noreferrer" 
              sx={{
                bgcolor: '#1a73e8',
                color: 'white',
                py: 2,
                px: 6,
                borderRadius: 1.5,
                textTransform: 'none',
                fontSize: '1.25rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                mb: 4,
                '&:hover': {
                  bgcolor: '#1557b0'
                }
              }}
            >
              Donate Now
            </Button>
            <Typography 
              sx={{ 
                color: '#666',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 500
              }}
            >
              ScholaLatinae is a registered 501(c)(3) nonprofit organization.
              All donations are tax-deductible to the extent allowed by law.
            </Typography>
          </Paper>

          {/* Section Title for Impact */}
          <Typography 
            variant="h4" 
            align="center"
            sx={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              color: '#1a1a1a',
              mb: 4,
              letterSpacing: '-0.01em'
            }}
          >
            Your Donation Will Help Us
          </Typography>

          {/* Impact Cards */}
          <Grid container spacing={3}>
            {donationImpact.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {item.icon}
                      <Typography
                        variant="h6"
                        sx={{
                          ml: 1.5,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 700
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        color: '#666',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 500,
                        lineHeight: 1.6
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}