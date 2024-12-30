'use client';
import Link from 'next/link'; // Use Next.js's Link component
import { signIn, signOut, useSession } from "next-auth/react"; // NextAuth hooks
import { useRouter } from 'next/navigation';
import './header.css'; // Ensure CSS is correctly imported

export default function Header() {
  const { data: session } = useSession(); // Access session data
  const router = useRouter(); // Initialize the useRouter hook

  const handleSignIn = () => {
    router.push('/signup'); // Redirect to login page
  };

  return (
    <header>
      <Link href="/" className="logo-container">
        <img src="/favicon.ico" alt="Logo" className="logo" />
        <span className="site-title">Schola Latinae</span>
      </Link>
      
      <nav>
        {session ? (
          // User is logged in
          <button onClick={() => signOut()} className="auth-button">
            Logout
          </button>
        ) : (
          // User is not logged in
          <>
          <button className="login-button" onClick={() => signIn('google')}>Login</button>
          <button className="signup-button" onClick={handleSignIn}>Get Started</button>
          </>
        )}
      </nav>
    </header>
  );
}
