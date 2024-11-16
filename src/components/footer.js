'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box, Typography, Grid, List, ListItem, Container } from '@mui/joy';

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
            <Typography level="body2" sx={{ color: 'text.secondary', mb: '10px' }}>
              A free and fun way to learn Latin and Greek.
            </Typography>
            <Typography level="body2" sx={{ color: 'text.secondary' }}>
              <Link href="mailto:support@inboxrecap.com" style={{ color: '#1e3a8a', textDecoration: 'none' }}>
                support@inboxrecap.com
              </Link>
            </Typography>
          </Grid>

          <Grid xs={12} sm={4}>
          <Typography level="h4" component="h2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
              About Us
            </Typography>
            <List size="sm" sx={{ '--ListItem-paddingY': '4px', '--ListItem-paddingX': '0px' }}>
              {['Features', 'Mission', 'Team'].map((item) => (
                <ListItem key={item}>
                  <Link href={`#${item.toLowerCase()}`} passHref style={{ width: '100%' }}>
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

          <Grid xs={12} sm={4}>
          <Typography level="h4" component="h2" sx={{ mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
              Privacy & Terms
            </Typography>
            <List size="sm" sx={{ '--ListItem-paddingY': '4px', '--ListItem-paddingX': '0px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <ListItem key={item}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} passHref style={{ width: '100%' }}>
                    <Typography
                      level="body2"
                      sx={{ 
                        color: '#1e3a8a',
                        textDecoration: 'none',
                        display: 'block',
                        width: '100%',
                        fontSize: '1.1rem',
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
          <Typography level="body2" textAlign="center" sx={{ color: 'text.secondary' }}>
            © {new Date().getFullYear()} Schola Latinae. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;