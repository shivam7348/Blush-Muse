import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBanner = ({ theme = 'yellow' }) => {
  const bannerRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const buttonRef = useRef(null);
  const textContentRef = useRef(null);

  // Theme color configurations
  const themeColors = {
    yellow: {
      primary: 'bg-yellow-400',
      secondary: 'text-yellow-400',
      accent: 'text-pink-400'
    },
    blue: {
      primary: 'bg-blue-500',
      secondary: 'text-blue-500',
      accent: 'text-purple-400'
    },
    green: {
      primary: 'bg-green-500',
      secondary: 'text-green-500',
      accent: 'text-teal-400'
    }
  };

  const colors = themeColors[theme] || themeColors.yellow;

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup - start with elements invisible
    gsap.set([headingRef.current, subheadingRef.current, buttonRef.current], { 
      opacity: 0, 
      y: 20 
    });
    
    // Create animation sequence
    tl.to(bannerRef.current, { 
      duration: 1, 
      opacity: 1, 
      ease: "power2.inOut" 
    })
    .to(headingRef.current, { 
      duration: 0.8, 
      opacity: 1, 
      y: 0, 
      ease: "back.out(1.2)" 
    })
    .to(subheadingRef.current, { 
      duration: 0.8, 
      opacity: 1, 
      y: 0, 
      ease: "back.out(1)" 
    }, "-=0.4")
    .to(buttonRef.current, { 
      duration: 0.6, 
      opacity: 1, 
      y: 0, 
      ease: "power3.out" 
    }, "-=0.2");
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={bannerRef} 
      className="flex justify-between items-center p-8 bg-black text-white w-full opacity-0"
    >
      <div ref={textContentRef} className="max-w-lg">
        <p className="uppercase text-lg font-semibold mb-2">Empower</p>
        <h1 ref={headingRef} className="text-4xl sm:text-5xl font-bold mb-4">
          Transform your Passion into Profession with{' '}
          <span className={colors.secondary}>Blush</span> &{' '}
          <span className={colors.accent}>Muse</span>
        </h1>
        
        <p ref={subheadingRef} className="text-base sm:text-lg mb-8">
          Joining Blush & Muse opens doors to professional growth
          through our comprehensive training and resources.
          Experience unparalleled community support while
          accessing high-quality makeup products tailored for your
          success.
        </p>
        
        <div className="flex space-x-4 items-center">
          <button 
            ref={buttonRef}
            className={`${colors.primary} text-black font-bold py-3 px-8 rounded hover:brightness-105 transition-all`}
          >
            Join Now
          </button>
          <a href="#" className="flex items-center text-white hover:text-gray-200 transition-colors">
            Explore <span className="ml-2">&gt;</span>
          </a>
        </div>
      </div>
      
      <div className="hidden md:block w-1/2 ml-8">
        {/* Image placeholder */}
        <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gray-800">
          {/* You would place your actual image here */}
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            Image Content
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBanner;