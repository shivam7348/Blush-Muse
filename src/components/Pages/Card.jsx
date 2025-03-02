import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

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
      }
    };

    // Set up scroll reveal animations
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom-=150",
      end: "bottom top",
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2
        });

        gsap.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out"
        });

        gsap.to(cardButton, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.3
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

// App component with three different makeup academy cards
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
            animationType="fadeUp"
            linkTo="/fundamentals"
          />

          <Card
            title="Advanced Techniques"
            description="Elevate your skills with professional-grade techniques. Learn color theory, facial structure, and high-fashion application methods."
            imageSrc="/api/placeholder/400/320"
            animationType="glow"
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