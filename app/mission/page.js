'use client';
import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Container,
} from '@mui/material';
import {
  School as SchoolIcon,
  LocalLibrary as ResourcesIcon,
  SportsEsports as GamesIcon,
  Assignment as PracticeIcon,
  Public as AccessibilityIcon,
  EmojiEvents as ScholarshipIcon,
} from '@mui/icons-material';
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

export default function Mission() {
    useEffect(() => {
        document.title = "ScholaLatinae | Learn Latin & Greek for Free";
      }, []);
  const features = [
    {
      icon: <ResourcesIcon fontSize="large" sx={{ color: '#1a73e8' }} />,
      title: 'Resources',
      description: 'Comprehensive materials covering all aspects of Classical studies'
    },
    {
      icon: <SchoolIcon fontSize="large" sx={{ color: '#34a853' }} />,
      title: 'Lessons',
      description: 'Expert content created by passionate students and educators'
    },
    {
      icon: <PracticeIcon fontSize="large" sx={{ color: '#ea4335' }} />,
      title: 'Practice',
      description: 'Interactive exercises to master Latin language skills'
    },
    {
      icon: <GamesIcon fontSize="large" sx={{ color: '#673ab7' }} />,
      title: 'Games',
      description: 'Learn through play with our educational games'
    },
    {
      icon: <AccessibilityIcon fontSize="large" sx={{ color: '#0097a7' }} />,
      title: 'Accessibility',
      description: 'Breaking down barriers to classical education'
    },
    {
      icon: <ScholarshipIcon fontSize="large" sx={{ color: '#f9a825' }} />,
      title: 'Scholarship',
      description: 'Supporting the next generation of classicists'
    }
  ];

  return (
    <>
    <Header />
    <Box sx={{ bgcolor: '#fafafa', py: 10, mt: 8 }}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Typography 
          variant="h2" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800, 
            color: '#1a1a1a',
            mb: 2,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            letterSpacing: '-0.02em'
          }}
        >
          Our Mission
        </Typography>

        {/* Subtitle */}
        <Typography 
          align="center" 
          variant="h6" 
          sx={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            maxWidth: '800px', 
            mx: 'auto', 
            mb: 8,
            color: '#666',
            fontWeight: 500,
            lineHeight: 1.6,
            letterSpacing: '-0.01em'
          }}
        >
          Democratizing access to classical education through technology and community
        </Typography>

        {/* 501(c)(3) Status */}
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            mb: 8, 
            bgcolor: 'rgba(255,255,255,0.8)',
            borderRadius: 2,
            textAlign: 'center',
            border: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#1a1a1a',
              fontWeight: 700,
              mb: 1,
              letterSpacing: '-0.01em'
            }}
          >
            501(c)(3) Nonprofit Organization
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#666',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 500
            }}
          >
            Our commitment to making Classical education accessible knows no bounds
          </Typography>
        </Paper>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: 'none',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 2.5 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      mb: 1.5,
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: '#666',
                      lineHeight: 1.6,
                      fontWeight: 500
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Vision Statement */}
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 4, md: 6 }, 
            bgcolor: 'rgba(255,255,255,0.8)',
            borderRadius: 2,
            border: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: '#1a1a1a',
              mb: 4,
              letterSpacing: '-0.02em'
            }}
          >
            Breaking Down Barriers
          </Typography>
          <Typography 
            paragraph 
            sx={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#444',
              lineHeight: 1.8,
              mb: 4,
              fontSize: '1.1rem',
              fontWeight: 500
            }}
          >
            Access to Latin and Greek studies has historically been restricted by social class and wealth. As these languages become more commonly taught in public high schools, we're committed to breaking down barriers through our comprehensive and entirely free online platform.
          </Typography>
          <Typography 
            paragraph
            sx={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: '#444',
              lineHeight: 1.8,
              mb: 4,
              fontSize: '1.1rem',
              fontWeight: 500
            }}
          >
            We envision ScholaLatinae as a vibrant community of learners that fosters creativity and connection. Through our annual scholarship program and tournaments with monetary prizes, we encourage both academic excellence and community impact.
          </Typography>
          <Typography 
            sx={{ 
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '1.25rem',
              borderLeft: '4px solid #1a73e8',
              pl: 3,
              lineHeight: 1.6,
              letterSpacing: '-0.01em'
            }}
          >
            Together, we're building a world where the wonders of the Classics are open and accessible to all who seek knowledge, inspiration, and connection.
          </Typography>
        </Paper>
      </Container>
    </Box>
    <Footer />
    </>
  );
}