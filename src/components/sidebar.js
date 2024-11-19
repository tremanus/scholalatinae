import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

const FONT_LINK = (
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
  />
);

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'lessons',
    title: 'Lessons',
    icon: <MenuBookIcon />,
  },
];

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
  const router = useDemoRouter('/dashboard');

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
        router={router}
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
