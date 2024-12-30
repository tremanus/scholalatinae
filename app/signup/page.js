'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import '../../src/components/login.css'; // Import the CSS file
import { Google } from '@mui/icons-material'; // Import the Google icon from Material-UI

const Login = () => {
  const router = useRouter(); // Initialize useRouter

  const handleSignIn = async () => {
    // Trigger the NextAuth sign-in function with the 'google' provider
    await signIn('google', { callbackUrl: '/home' }); // Redirect to home page after login
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <img src="/favicon.ico" alt="ScholaLatinae Logo" className="logo" />
        <h1>Schola Latinae</h1>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <h2>Sign Up</h2>
        <p>Login with Google to Create Your Account</p>
        <button className="button-google" onClick={handleSignIn}>
          <Google fontSize="small" /> Google
        </button>
        <p>
          By clicking continue, you agree to our{' '}
          <a href="/tos" className="terms-link">Terms of Service</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;
