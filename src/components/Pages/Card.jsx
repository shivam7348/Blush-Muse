import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Link } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Card = ({ title, description, imageSrc, animationType, linkTo }) => {
  const cardRef = useRef(null);
  const timelineRef = useRef(null);
  const cleanupFunctionsRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const cardImage = card.querySelector('.card-image');
    const cardContent = card.querySelector('.card-content');
    const cardButton = card.querySelector('.card-button');

    // Kill any existing animations to prevent conflicts
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    // Run cleanup functions if they exist
    if (cleanupFunctionsRef.current) {
      cleanupFunctionsRef.current();
      cleanupFunctionsRef.current = null;
    }

    // Create a main timeline for coordinating animations
    timelineRef.current = gsap.timeline();

    // Initial state setup with improved performance hints
    gsap.set(card, { 
      opacity: 0, 
      y: 50,
      force3D: true,
      willChange: "transform, opacity"
    });
    gsap.set(cardImage, { 
      scale: 1, 
      opacity: 0.7,
      force3D: true 
    });
    gsap.set(cardContent, { 
      y: 20, 
      opacity: 0, 
      scale: 0.95,
      force3D: true
    });
    gsap.set(cardButton, { 
      opacity: 0, 
      y: 10,
      force3D: true 
    });

    // Optimized enter animations
    const enterAnimations = {
      fadeUp: () => {
        const tl = gsap.timeline({ paused: true });
        
        tl.to(cardImage, {
          scale: 1.1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, 0);

        tl.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0.1);

        tl.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }, 0.2);

        tl.to(card, {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
          y: -10,
          duration: 0.4,
          ease: "power2.out"
        }, 0);
        
        tl.play();
        return () => tl.reverse();
      },

      glow: () => {
        const tl = gsap.timeline({ paused: true });
        
        tl.to(cardImage, {
          filter: 'brightness(1.3) saturate(1.2)',
          scale: 1.05,
          opacity: 0.9,
          duration: 0.5,
          ease: "power2.out"
        }, 0);

        tl.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0.1);

        tl.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          background: 'linear-gradient(to right, #FFC107, #FF9800)',
          boxShadow: '0 0 15px rgba(255, 193, 7, 0.5)',
          ease: "power2.out"
        }, 0.2);

        tl.to(card, {
          boxShadow: '0 0 30px 5px rgba(255, 215, 0, 0.3)',
          duration: 0.5,
          ease: "power2.out"
        }, 0);
        
        tl.play();
        return () => tl.reverse();
      },
      
      rotate3D: () => {
        let mouseTracker = { x: 0, y: 0 };
        let mouseAnimation = null;
        let isActive = true;
        
        // Smooth tracking of mouse position
        const handleMouseMove = (e) => {
          if (!isActive) return;
          
          const { left, top, width, height } = card.getBoundingClientRect();
          mouseTracker.x = (e.clientX - left) / width - 0.5;
          mouseTracker.y = (e.clientY - top) / height - 0.5;
          
          if (!mouseAnimation) {
            mouseAnimation = gsap.to(card, {
              rotationY: () => mouseTracker.x * 10,
              rotationX: () => -mouseTracker.y * 10,
              transformPerspective: 1000,
              duration: 0.4,
              ease: "power1.out",
              repeat: -1,
              modifiers: {
                rotationY: value => Math.round(value * 10) / 10, // Reduce jitter
                rotationX: value => Math.round(value * 10) / 10  // Reduce jitter
              }
            });
            
            gsap.to(cardImage, {
              rotationY: () => mouseTracker.x * 5,
              rotationX: () => -mouseTracker.y * 5,
              transformPerspective: 1000,
              scale: 1.1,
              opacity: 0.9,
              duration: 0.4,
              repeat: -1
            });
          }
        };
        
        const tl = gsap.timeline({ paused: true });
        
        tl.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0);

        tl.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
          boxShadow: '0 0 15px rgba(138, 43, 226, 0.5)',
          ease: "power2.out"
        }, 0.1);

        tl.to(card, {
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          duration: 0.5,
          ease: "power2.out"
        }, 0);
        
        card.addEventListener('mouseenter', () => {
          isActive = true;
        });
        
        card.addEventListener('mousemove', handleMouseMove);
        
        tl.play();
        
        return () => {
          isActive = false;
          card.removeEventListener('mousemove', handleMouseMove);
          if (mouseAnimation) mouseAnimation.kill();
          return tl.reverse();
        };
      },

      motionPath: () => {
        // Create a more performant floating effect
        const floatTimeline = gsap.timeline({
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Simpler motion path for better performance
        floatTimeline.to(card, {
          y: '-=10',
          x: '+=5',
          rotation: 0.5,
          duration: 2
        }).to(card, {
          y: '+=5',
          x: '-=8',
          rotation: -0.5,
          duration: 2.5
        }).to(card, {
          y: '+=5',
          x: '+=3',
          rotation: 0,
          duration: 2
        });

        const tl = gsap.timeline({ paused: true });
        
        tl.to(cardImage, {
          filter: 'brightness(1.2) saturate(1.1)',
          scale: 1.05,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, 0);

        tl.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0.1);

        tl.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          background: 'linear-gradient(to right, #00C9FF, #92FE9D)',
          boxShadow: '0 0 15px rgba(0, 201, 255, 0.5)',
          ease: "power2.out"
        }, 0.2);

        tl.to(card, {
          boxShadow: '0 10px 30px rgba(0, 201, 255, 0.3), 0 0 15px rgba(146, 254, 157, 0.3)',
          duration: 0.5,
          ease: "power2.out"
        }, 0);
        
        tl.play();
        
        return () => {
          floatTimeline.kill();
          return tl.reverse();
        };
      },

      orbit: () => {
        // Create optimized particle system
        const particleCount = 5; // Reduced for better performance
        const particles = [];
        const particleContainer = document.createElement('div');
        particleContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
        card.appendChild(particleContainer);
        
        const colors = ['#FF3366', '#00C9FF', '#FFCC00', '#92FE9D', '#F761A1'];
        const mainTimeline = gsap.timeline();
        
        // Create particles with staggered animations for better performance
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          const size = 4 + Math.random() * 6;
          particle.className = 'absolute rounded-full z-10';
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.backgroundColor = colors[i % colors.length];
          
          particleContainer.appendChild(particle);
          particles.push(particle);
          
          // Set initial position - center of the card
          gsap.set(particle, {
            x: card.clientWidth / 2,
            y: card.clientHeight / 2,
            opacity: 0,
            force3D: true
          });
          
          // Create a simpler orbit animation
          const tl = gsap.timeline({
            delay: i * 0.2
          });
          
          const radius = 40 + Math.random() * 60;
          const duration = 4 + Math.random() * 3;
          
          tl.to(particle, {
            opacity: 0.8,
            duration: 0.3,
            ease: "power1.in"
          });
          
          // Use simple circular animation instead of complex motionPath
          tl.to(particle, {
            duration: duration,
            repeat: -1,
            ease: "none",
            onUpdate: function() {
              const progress = this.progress();
              const angle = progress * Math.PI * 2;
              const x = card.clientWidth / 2 + Math.cos(angle) * radius;
              const y = card.clientHeight / 2 + Math.sin(angle) * radius;
              gsap.set(particle, { x, y });
            }
          });
          
          mainTimeline.add(tl, 0);
        }

        const tl = gsap.timeline({ paused: true });
        
        tl.to(cardImage, {
          filter: 'brightness(1.2) saturate(1.1)',
          scale: 1.05,
          opacity: 0.9,
          duration: 0.5,
          ease: "power2.out"
        }, 0);

        tl.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0.1);

        tl.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          background: 'linear-gradient(to right, #F761A1, #8C1BAB)',
          boxShadow: '0 0 15px rgba(247, 97, 161, 0.5)',
          ease: "power2.out"
        }, 0.2);

        tl.to(card, {
          boxShadow: '0 10px 30px rgba(140, 27, 171, 0.3)',
          duration: 0.5,
          ease: "power2.out"
        }, 0);
        
        tl.play();
        
        return () => {
          mainTimeline.kill();
          particles.forEach(particle => {
            gsap.killTweensOf(particle);
          });
          if (particleContainer.parentNode) {
            particleContainer.parentNode.removeChild(particleContainer);
          }
          return tl.reverse();
        };
      }
    };

    // More efficient scroll animation with fewer callbacks
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=100",
        end: "bottom top+=100",
        toggleActions: "play none none reverse",
        once: false
      }
    });

    // Smoother entry animation with better motion path
    scrollTimeline.fromTo(card, 
      { 
        opacity: 0,
        y: 80,
        x: -10,
        force3D: true
      },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        motionPath: {
          path: [
            {x: -10, y: 80},
            {x: 5, y: 40},
            {x: -2, y: 20},
            {x: 0, y: 0}
          ],
          curviness: 1.5
        }
      }
    ).fromTo(cardImage,
      { 
        opacity: 0.5,
        scale: 0.95,
        force3D: true
      },
      {
        opacity: 0.7,
        scale: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 
      "-=0.4"
    ).fromTo(cardContent,
      { 
        y: 20, 
        opacity: 0,
        force3D: true
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }, 
      "-=0.3"
    ).fromTo(cardButton,
      { 
        opacity: 0, 
        y: 10,
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, 
      "-=0.2"
    );

    // Add event listeners for hover animations with better cleanup
    const enterFunction = enterAnimations[animationType];
    
    if (enterFunction) {
      let cleanupFunc = null;
      
      const handleEnter = () => {
        if (cleanupFunc) {
          cleanupFunc();
        }
        cleanupFunc = enterFunction();
      };
      
      const handleLeave = () => {
        if (cleanupFunc) {
          cleanupFunc();
          cleanupFunc = null;
        }
      };
      
      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mouseleave', handleLeave);
      
      // Store cleanup function for component unmount
      cleanupFunctionsRef.current = () => {
        card.removeEventListener('mouseenter', handleEnter);
        card.removeEventListener('mouseleave', handleLeave);
        if (cleanupFunc) {
          cleanupFunc();
          cleanupFunc = null;
        }
      };
    }

    // Cleanup on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      
      if (cleanupFunctionsRef.current) {
        cleanupFunctionsRef.current();
      }
      
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === card) {
          st.kill();
        }
      });
    };
  }, [animationType]);

  // Get button style based on animation type
  const getButtonStyle = () => {
    switch (animationType) {
      case 'glow':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black';
      case 'rotate3D':
        return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white';
      case 'motionPath':
        return 'bg-gradient-to-r from-cyan-500 to-green-500 text-white';
      case 'orbit':
        return 'bg-gradient-to-r from-pink-500 to-purple-600 text-white';
      default:
        return 'bg-gradient-to-r from-pink-500 to-rose-500 text-white';
    }
  };

  return (
    <div
      ref={cardRef}
      className="card bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-96 relative transform-gpu will-change-transform"
    >
      <div className="card-image h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="card-content p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <Link to={linkTo} className="block">
          <button className={`card-button ${getButtonStyle()} px-6 py-2 rounded-full font-medium shadow-md transition-all duration-300 hover:shadow-xl w-full`}>
            Click Me
          </button>
        </Link>
      </div>
    </div>
  );
};

// App component with different animation types
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-4 tracking-tight">
          Discover Your Beauty Journey at
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"> Blush & Muse</span>
        </h1>
        <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto">Unlock your potential with our exclusive courses designed for aspiring makeup artists. Transform your passion into a profession.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Fundamentals Course"
            description="Master the basics of makeup artistry with personalized instruction for any occasion, including bridal and special events."
            imageSrc="https://static.vecteezy.com/system/resources/previews/007/584/570/large_2x/cosmetics-on-black-background-and-make-up-tools-top-view-and-mock-up-copy-space-free-photo.jpg"
            animationType="motionPath"
            linkTo="/fundamentals"
          />

          <Card
            title="Advanced Techniques"
            description="Elevate your skills with professional-grade techniques. Learn color theory, facial structure, and high-fashion application methods."
            imageSrc="/api/placeholder/400/320"
            animationType="orbit"
            linkTo="/advanced"
          />

          <Card
            title="Special Effects"
            description="Create stunning transformations for film, TV, and theater. From scars and prosthetics to fantasy characters and aging effects."
            imageSrc="/api/placeholder/400/320"
            animationType="rotate3D"
            linkTo="/special-effects"
          />
        </div>
      </div>
    </div>
  );
};

export default App;