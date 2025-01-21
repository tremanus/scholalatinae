'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box, Typography, Grid, List, ListItem, Container, IconButton } from '@mui/joy';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DiscordIcon from './DiscordIcon'; // Import your custom Discord icon

const Footer = () => {
  const pathname = usePathname();

  return (
    <Box component="footer" sx={{ bgcolor: '#f4f3f3', color: 'text.primary', py: 8 }}>
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={10} 
          justifyContent="space-between" 
          sx={{ 
            flexDirection: { xs: 'column', sm: 'row' } // Stack vertically on small screens
          }}
        >
          <Grid xs={12} sm={4}>
            <Typography level="h4" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
              Schola Latinae
            </Typography>
            <Typography level="body2" sx={{ color: 'text.secondary', mb: '10px', lineHeight: '1.5' }}>
            Schola Latinae is a 501(c)(3) charitable organization (US Tax ID Number: 93-3150781) with the mission of making a Classical education accessible for all.
            </Typography>
            <Typography level="body2" sx={{ color: 'text.secondary' }}>
              <Link href="mailto:scholalatinae@gmail.com" style={{ color: '#1e3a8a', textDecoration: 'none' }}>
                scholalatinae@gmail.com
              </Link>
            </Typography>
          </Grid>

          <Grid xs={12} sm={4}>
            <Typography level="h4" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
              Donate
            </Typography>
            <Typography level="body2" sx={{ color: 'text.secondary', mb: '10px', lineHeight: '1.5' }}>
            Donations to Schola Latinae help keep our features stay free and fund improvements for all students interested in the Classics.
            </Typography>
            <Typography level="body2" sx={{ color: 'text.secondary' }}>
              <Link href="/donate" style={{ color: '#1e3a8a', textDecoration: 'underline' }}>
                Make a tax-deductible donation here.
              </Link>
            </Typography>
          </Grid>

          <Grid xs={12} sm={4}>
          <Typography level="h4" component="h2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
              About Us
            </Typography>
            <List size="sm" sx={{ '--ListItem-paddingY': '4px', '--ListItem-paddingX': '0px' }}>
              {['Mission', 'Team', 'Privacy', 'TOS'].map((item) => (
                <ListItem key={item}>
                  <Link href={`${item.toLowerCase()}`} passHref style={{ width: '100%' }}>
                    <Typography
                      level="body2"
                      sx={{ 
                        color: '#1e3a8a',
                        textDecoration: 'none',
                        display: 'block',
                        fontSize: '1.1rem',
                        width: '100%',
                        '&:hover': { 
                          color: 'primary.main',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {item}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
      {/* Social Media Icons Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
      <IconButton
        component="a"
        href="https://www.instagram.com/scholalatinae"
        target="_blank"
        sx={{ fontSize: 40, color: 'black' }} // Increased size and black color
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://www.linkedin.com/company/scholalatinae/"
        target="_blank"
        sx={{ fontSize: 40, color: 'black' }} // Increased size and black color
      >
        <LinkedInIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://www.youtube.com/@ScholaLatinae"
        target="_blank"
        sx={{ fontSize: 40, color: 'black' }} // Increased size and black color
      >
        <YouTubeIcon />
      </IconButton>
      <IconButton
        component="a"
        href="https://discord.gg/NzPGERt5F3"
        target="_blank"
        sx={{ fontSize: 40, color: 'black' }} // Increased size and black color
      >
        <DiscordIcon />
      </IconButton>
    </Box>
      {/* Footer Text */}
      <Typography level="body2" textAlign="center" sx={{ color: 'text.secondary' }}>
        © {new Date().getFullYear()} Schola Latinae. All rights reserved.
      </Typography>
    </Box>
      </Container>
    </Box>
  );
};

export default Footer;