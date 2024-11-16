'use client';
import Link from 'next/link'; // Use Next.js's Link component
import './header.css'; // Ensure CSS is correctly imported

export default function Header() {
  return (
    <header>
      <Link href="/" className="logo-container">
        <img src="/favicon.ico" alt="Logo" className="logo" />
        <span className="site-title">Schola Latinae</span>
      </Link>
    </header>
  );
}
