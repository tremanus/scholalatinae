'use client';
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import './header.css';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signup');
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/home'
      });
      
      if (result?.error) {
        console.error('Sign in error:', result.error);
      } else if (result?.url) {
        router.push('/home');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: '/'
      });
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header>
      <Link href="/" className="logo-container">
        <img src="/favicon.ico" alt="Logo" className="logo" />
        <span className="site-title">Schola Latinae</span>
      </Link>
      
      <nav>
        {session ? (
          <button onClick={handleSignOut} className="signup-button">
            Logout
          </button>
        ) : (
          <>
            <button className="login-button" onClick={handleGoogleSignIn}>Login</button>
            <button className="signup-button" onClick={handleSignIn}>Get Started</button>
          </>
        )}
      </nav>
    </header>
  );
}