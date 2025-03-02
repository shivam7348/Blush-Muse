import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

// Register ScrollTrigger and MotionPathPlugin with GSAP
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Card = ({ title, description, imageSrc, animationType, linkTo }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const cardImage = card.querySelector('.card-image');
    const cardContent = card.querySelector('.card-content');
    const cardButton = card.querySelector('.card-button');

    // Initial state
    gsap.set(card, { opacity: 0, y: 50 });
    gsap.set(cardImage, { scale: 1, opacity: 0.7 });
    gsap.set(cardContent, { y: 20, opacity: 0, scale: 0.95 });
    gsap.set(cardButton, { opacity: 0, y: 10 });

    // Define different hover animations based on animation type
    const enterAnimations = {
      fadeUp: () => {
        gsap.to(cardImage, {
          scale: 1.1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });

        gsap.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out"
        });

        gsap.to(card, {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
          y: -10,
          duration: 0.4
        });
      },

      glow: () => {
        gsap.to(cardImage, {
          filter: 'brightness(1.3) saturate(1.2)',
          scale: 1.05,
          opacity: 0.9,
          duration: 0.5
        });

        gsap.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4
        });

        gsap.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          background: 'linear-gradient(to right, #FFC107, #FF9800)',
          boxShadow: '0 0 15px rgba(255, 193, 7, 0.5)'
        });

        gsap.to(card, {
          boxShadow: '0 0 30px 5px rgba(255, 215, 0, 0.3)',
          duration: 0.5
        });
      },
      
      rotate3D: () => {
        // Track mouse position for 3D effect
        const handleMouseMove = (e) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;
          
          gsap.to(card, {
            rotationY: x * 10,
            rotationX: -y * 10,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power1.out"
          });
          
          gsap.to(cardImage, {
            rotationY: x * 5,
            rotationX: -y * 5,
            transformPerspective: 1000,
            scale: 1.1,
            opacity: 0.9,
            duration: 0.4
          });
        };
        
        card.addEventListener('mousemove', handleMouseMove);
        
        gsap.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4
        });

        gsap.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          background: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
          boxShadow: '0 0 15px rgba(138, 43, 226, 0.5)'
        });

        gsap.to(card, {
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          duration: 0.5
        });
        
        return () => card.removeEventListener('mousemove', handleMouseMove);
      },

      // New animation type using MotionPathPlugin
      motionPath: () => {
        // Create floating effect with slight motion path
        const timeline = gsap.timeline({
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });

        // Motion path for subtle floating animation
        timeline.to(card, {
          motionPath: {
            path: [
              {x: 0, y: 0},
              {x: 5, y: -10},
              {x: -5, y: -5},
              {x: 0, y: 0}
            ],
            curviness: 2,
            autoRotate: false
          },
          duration: 4
        });

        // Glow effect
        gsap.to(cardImage, {
          filter: 'brightness(1.2) saturate(1.1)',
          scale: 1.05,
          opacity: 1,
          duration: 0.5
        });

        gsap.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4
        });

        gsap.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          background: 'linear-gradient(to right, #00C9FF, #92FE9D)',
          boxShadow: '0 0 15px rgba(0, 201, 255, 0.5)'
        });

        gsap.to(card, {
          boxShadow: '0 10px 30px rgba(0, 201, 255, 0.3), 0 0 15px rgba(146, 254, 157, 0.3)',
          duration: 0.5
        });
        
        return () => timeline.kill();
      },

      // Another MotionPath animation with circular movement
      orbit: () => {
        // Create small elements that orbit around the card
        const particleContainer = document.createElement('div');
        particleContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
        card.appendChild(particleContainer);
        
        // Create orbit particles
        const particles = [];
        const colors = ['#FF3366', '#00C9FF', '#FFCC00', '#92FE9D', '#F761A1'];
        
        for (let i = 0; i < 6; i++) {
          const particle = document.createElement('div');
          const size = 4 + Math.random() * 6;
          particle.className = 'absolute rounded-full z-10';
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          
          particleContainer.appendChild(particle);
          particles.push(particle);
          
          // Set initial position
          gsap.set(particle, {
            x: card.clientWidth / 2,
            y: card.clientHeight / 2,
            opacity: 0
          });
          
          // Create unique orbit for each particle
          const timeline = gsap.timeline({
            repeat: -1,
            delay: i * 0.2
          });
          
          const radius = 50 + Math.random() * 80;
          const duration = 3 + Math.random() * 4;
          
          timeline.to(particle, {
            opacity: 0.8,
            duration: 0.3
          });
          
          timeline.to(particle, {
            motionPath: {
              path: `M 0,0 m -${radius}, 0 a ${radius},${radius} 0 1,0 ${radius*2},0 a ${radius},${radius} 0 1,0 -${radius*2},0`,
              alignOrigin: [0.5, 0.5],
              autoRotate: false
            },
            duration: duration,
            ease: "none",
            repeat: -1
          }, 0);
        }

        // Add glow to card
        gsap.to(cardImage, {
          filter: 'brightness(1.2) saturate(1.1)',
          scale: 1.05,
          opacity: 0.9,
          duration: 0.5
        });

        gsap.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4
        });

        gsap.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          background: 'linear-gradient(to right, #F761A1, #8C1BAB)',
          boxShadow: '0 0 15px rgba(247, 97, 161, 0.5)'
        });

        gsap.to(card, {
          boxShadow: '0 10px 30px rgba(140, 27, 171, 0.3)',
          duration: 0.5
        });
        
        return () => {
          // Clean up particles
          particles.forEach(particle => {
            gsap.killTweensOf(particle);
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          });
          if (particleContainer.parentNode) {
            particleContainer.parentNode.removeChild(particleContainer);
          }
        };
      }
    };

    const leaveAnimations = {
      fadeUp: () => {
        gsap.to(cardImage, {
          scale: 1,
          opacity: 0.7,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(cardContent, {
          y: 10,
          opacity: 0.9,
          scale: 0.98,
          duration: 0.4,
          ease: "power2.out"
        });

        gsap.to(cardButton, {
          opacity: 0.9,
          duration: 0.3
        });

        gsap.to(card, {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          y: 0,
          duration: 0.4
        });
      },

      glow: () => {
        gsap.to(cardImage, {
          filter: 'brightness(1) saturate(1)',
          scale: 1,
          opacity: 0.7,
          duration: 0.5
        });

        gsap.to(cardContent, {
          y: 10,
          opacity: 0.9,
          scale: 0.98,
          duration: 0.4
        });

        gsap.to(cardButton, {
          opacity: 0.9,
          duration: 0.3,
          background: 'linear-gradient(to right, #FF9800, #FF9800)',
          boxShadow: 'none'
        });

        gsap.to(card, {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          duration: 0.5
        });
      },
      
      rotate3D: () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          transformPerspective: 1000,
          duration: 0.6,
          ease: "power1.out"
        });
        
        gsap.to(cardImage, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          opacity: 0.7,
          duration: 0.6
        });
        
        gsap.to(cardContent, {
          y: 10,
          opacity: 0.9,
          scale: 0.98,
          duration: 0.4
        });

        gsap.to(cardButton, {
          opacity: 0.9,
          duration: 0.3,
          background: 'linear-gradient(to right, #8E2DE2, #8E2DE2)',
          boxShadow: 'none'
        });

        gsap.to(card, {
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          duration: 0.6
        });
      },

      // New animation leave effect for motionPath
      motionPath: () => {
        gsap.killTweensOf(card);
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });
        
        gsap.to(cardImage, {
          filter: 'brightness(1) saturate(1)',
          scale: 1,
          opacity: 0.7,
          duration: 0.5
        });

        gsap.to(cardContent, {
          y: 10,
          opacity: 0.9,
          scale: 0.98,
          duration: 0.4
        });

        gsap.to(cardButton, {
          opacity: 0.9,
          duration: 0.3,
          background: 'linear-gradient(to right, #00C9FF, #00C9FF)',
          boxShadow: 'none'
        });

        gsap.to(card, {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          duration: 0.5
        });
      },

      // Leave animation for orbit
      orbit: () => {
        // Find and remove all particle elements
        const particles = card.querySelectorAll('.absolute.rounded-full');
        particles.forEach(particle => {
          gsap.to(particle, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
              }
            }
          });
        });
        
        gsap.to(cardImage, {
          filter: 'brightness(1) saturate(1)',
          scale: 1,
          opacity: 0.7,
          duration: 0.5
        });

        gsap.to(cardContent, {
          y: 10,
          opacity: 0.9,
          scale: 0.98,
          duration: 0.4
        });

        gsap.to(cardButton, {
          opacity: 0.9,
          duration: 0.3,
          background: 'linear-gradient(to right, #F761A1, #F761A1)',
          boxShadow: 'none'
        });

        gsap.to(card, {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          duration: 0.5
        });
      }
    };

    // Cool initial entry animation using MotionPathPlugin for all cards
    gsap.fromTo(card, 
      { 
        opacity: 0,
        y: 100,
        x: -20
      },
      {
        opacity: 1,
        duration: 1.2,
        delay: 0.1,
        motionPath: {
          path: [
            {x: -20, y: 100},
            {x: 10, y: 50},
            {x: -5, y: 30},
            {x: 0, y: 0}
          ],
          curviness: 2
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=150",
          end: "bottom top",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Add additional reveal animations for content elements
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom-=150",
      end: "bottom top",
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out"
        });

        gsap.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.4
        });
      }
    });

    // Add event listeners for hover animations
    const enterFunction = enterAnimations[animationType];
    const leaveFunction = leaveAnimations[animationType];
    
    if (enterFunction && leaveFunction) {
      const onEnter = () => {
        const cleanup = enterFunction();
        return cleanup;
      };
      
      let cleanup;
      card.addEventListener('mouseenter', () => {
        cleanup = onEnter();
      });
      
      card.addEventListener('mouseleave', () => {
        if (cleanup) cleanup();
        leaveFunction();
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
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
      className="card bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-96 relative transform-gpu"
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

// App component with different animation types for each card
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
            animationType="motionPath" // Changed to new motion path animation
            linkTo="/fundamentals"
          />

          <Card
            title="Advanced Techniques"
            description="Elevate your skills with professional-grade techniques. Learn color theory, facial structure, and high-fashion application methods."
            imageSrc="/api/placeholder/400/320"
            animationType="orbit" // Changed to orbit animation
            linkTo="/advanced"
          />

          <Card
            title="Special Effects"
            description="Create stunning transformations for film, TV, and theater. From scars and prosthetics to fantasy characters and aging effects."
            imageSrc="/api/placeholder/400/320"
            animationType="rotate3D" // Keeping original 3D rotation animation
            linkTo="/special-effects"
          />
        </div>
      </div>
    </div>
  );
};

export default App;