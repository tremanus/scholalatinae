'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useRouter } from 'next/navigation';
import { Box, List, ListItem, ListItemIcon, ListItemText, ButtonBase } from '@mui/material';

// Define the SidebarFooter component
const SidebarFooter = () => {
  const router = useRouter();

  return (
    <Box sx={{ mt: 'auto', borderTop: '1px solid rgba(0,0,0,0.12)', pt: 1 }}>
      <List>
        <ListItem 
          component={ButtonBase}
          onClick={() => router.push('/username')}
          sx={{ 
            width: '100%',
            py: 1.5,
            textAlign: 'left',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.04)'
            }
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem 
          component={ButtonBase}
          onClick={() => router.push('/logout')}
          sx={{ 
            width: '100%',
            py: 1.5,
            textAlign: 'left',
            '&:hover': {
              bgcolor: 'rgba(0,0,0,0.04)'
            }
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
    </Box>
  );
};

const FONT_LINK = (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
  />
);

const demoTheme = createTheme({
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    allVariants: {
      color: '#000',
      fontWeight: 500,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Dashboard({ children }) {
  const router = useRouter();

  const NAVIGATION = [
    {
      segment: 'home',
      title: 'Home',
      icon: <DashboardIcon />,
      onClick: () => router.push('/home'), 
    },
    {
      segment: 'practice',
      title: 'Practice',
      icon: <SportsMartialArtsIcon />,
      onClick: () => router.push('/practice'), 
    },
    {
      segment: 'lessons',
      title: 'Lessons',
      icon: <VideoLibraryIcon />,
      onClick: () => router.push('/lessons'), 
    },
    {
      segment: 'leaderboard',
      title: 'Leaderboard',
      icon: <SportsEsportsIcon />,
      onClick: () => router.push('/leaderboard'), 
    },
    {
      segment: 'donate',
      title: 'Donate',
      icon: <MenuBookIcon />,
      onClick: () => router.push('/donate'), 
    }
  ];

  return (
    <>
      {FONT_LINK}
      <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: (
            <img
              src="/favicon.ico"
              alt="logo"
              style={{
                marginLeft: '16px',
                borderRadius: '8px',
              }}
            />
          ),
          title: (
            <Typography
              sx={{
                color: '#333',
                fontWeight: '600',
                fontSize: '1.5rem',
                marginLeft: '5px',
              }}
            >
              Schola Latinae
            </Typography>
          ),
        }}
        theme={demoTheme}
      >
        <DashboardLayout 
          slots={{ 
            toolbarAccount: () => null,
            sidebarFooter: SidebarFooter 
          }}
        >
          {children}
        </DashboardLayout>
      </AppProvider>
    </>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;