"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react"; // NextAuth hooks
import AOS from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS styles
import YouTube from 'react-youtube';
import './home.css'; // Ensure the CSS file is correctly imported

const Home = () => {
  const router = useRouter(); // Initialize useRouter
  const { data: session } = useSession(); // Access session data

  useEffect(() => {
    document.title = "ScholaLatinae | Learn Latin & Greek for Free";
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with custom settings
  }, []);


  const handleSignUpClick = () => {
    router.push('/signup'); // Navigate to pricing page
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
          <button className="view-plans-button" onClick={handleSignUpClick}>Get Started</button>
          <button className="try-button" onClick={() => signIn('google')}>I Have An Account</button>
        </div>
        </div>
      </div>
      <div className="intro-video">
      <YouTube 
          videoId="mpY3Ev0gx8c" 
          opts={{
            height: '560',
            width: '940',
            playerVars: {
              autoplay: 0, // Autoplay the video
              controls: 1, // Show video player controls
              start: 4, 
            },
          }}
        />
      </div>
    </section>
  );
};

export default Home;
