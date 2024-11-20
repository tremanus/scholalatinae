import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useRouter } from 'next/navigation'; // Use Next.js App Router navigation

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
      onClick: () => router.push('/home'), // Navigate to /dashboard
    },
    {
        segment: 'practice',
        title: 'Practice',
        icon: <SportsMartialArtsIcon />,
        onClick: () => router.push('/practice'), // Navigate to /lessons
      },
    {
      segment: 'lessons',
      title: 'Lessons',
      icon: <VideoLibraryIcon />,
      onClick: () => router.push('/lessons'), // Navigate to /lessons
    },
    {
      segment: 'games',
      title: 'Games',
      icon: <SportsEsportsIcon />,
      onClick: () => router.push('/games'), // Navigate to /games
    },
    {
        segment: 'resources',
        title: 'Resources',
        icon: <MenuBookIcon />,
        onClick: () => router.push('/resources'), // Navigate to /lessons
      },
  ];

  return (
    <>
      {FONT_LINK}
      <AppProvider
        navigation={NAVIGATION.map((item) => ({
          ...item,
          onClick: item.onClick, // Attach onClick event
        }))}
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
        <DashboardLayout>{children}</DashboardLayout>
      </AppProvider>
    </>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node,
};

export default Dashboard;
