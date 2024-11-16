"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AOS from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles
import './home.css'; // Ensure the CSS file is correctly imported

const Home = () => {
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    document.title = "InboxRecap | Clear & Summarize Your Inbox";
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with custom settings
  }, []);

  const handlePricingClick = () => {
    router.push('/login'); // Use router.push for navigation
  };

  const handleViewPlansClick = () => {
    router.push('#pricing'); // Navigate to pricing page
  };

  return (
    <section className="home">
      <div className="home-content">
        <div className="left-content">
        <h1>Schola Latinae</h1>
        <h3 className="special">/skɔː.lɑ lɑti.naɪ/</h3>
        <img src='/home.png' alt='Home Logo' />
        </div>
        <div className="right-content">
        <h2 className="description">A <b className='special'>free</b> and <b className='special'>fun</b> way to learn Latin & Greek</h2>
        <div className="button-container">
          <button className="view-plans-button" onClick={handleViewPlansClick}>Get Started</button>
          <button className="try-button" onClick={handlePricingClick}>I Have An Account</button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
