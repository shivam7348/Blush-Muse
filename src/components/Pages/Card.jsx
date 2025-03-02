import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, description, imageSrc, animationType,Link }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const cardImage = card.querySelector('.card-image');
    const cardContent = card.querySelector('.card-content');
    const cardCta = card.querySelector('.card-cta');

    // Initial state
    gsap.set(card, { opacity: 0, y: 50 });
    gsap.set(cardImage, { scale: 1, y: 0, rotationY: 0, rotationX: 0, opacity: 1 });
    gsap.set(cardContent, { y: 20, opacity: 0, scale: 0.95 });
    gsap.set(cardCta, { opacity: 0, y: 10 });

    // Define different hover animations based on animation type
    const enterAnimations = {
      fadeUp: () => {
        gsap.to(cardImage, {
          scale: 1.1,
          y: -10,
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

        gsap.to(cardCta, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out"
        });

        gsap.to(card, {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
          y: -5,
          duration: 0.4
        });
      },

      glow: () => {
        gsap.to(cardImage, {
          filter: 'brightness(1.2)',
          scale: 1.03,
          duration: 0.5
        });

        gsap.to(cardContent, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4
        });

        gsap.to(cardCta, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1
        });

        gsap.to(card, {
          boxShadow: '0 0 30px 5px rgba(255, 215, 0, 0.3)',
          duration: 0.5
        });
      }
    };

    const leaveAnimations = {
      fadeUp: () => {
        gsap.to(cardImage, {
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(cardContent, {
          y: 20,
          opacity: 0.8,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.out"
        });

        gsap.to(cardCta, {
          opacity: 0.7,
          y: 10,
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
          filter: 'brightness(1)',
          scale: 1,
          duration: 0.5
        });

        gsap.to(cardContent, {
          y: 20,
          opacity: 0.8,
          scale: 0.95,
          duration: 0.4
        });

        gsap.to(cardCta, {
          opacity: 0.7,
          y: 10,
          duration: 0.3
        });

        gsap.to(card, {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          duration: 0.5
        });
      }
    };

    // Set up scroll reveal animations
    ScrollTrigger.create({
      trigger: card,
      start: "top bottom-=100",
      end: "bottom top",
      toggleActions: "play none none none",
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

        gsap.to(cardCta, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.3
        });
      }
    });

    // Add event listeners for hover animations
    card.addEventListener('mouseenter', enterAnimations[animationType]);
    card.addEventListener('mouseleave', leaveAnimations[animationType]);

    // Cleanup
    return () => {
      card.removeEventListener('mouseenter', enterAnimations[animationType]);
      card.removeEventListener('mouseleave', leaveAnimations[animationType]);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animationType]);

  return (
    <div
      ref={cardRef}
      className="card bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-96 relative"
    >
      <div className="card-image h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover opacity-70"
        />
      </div>
      <div className="card-content p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className='text-underline '>{Link}</p>
        <p className="text-gray-300">{description}</p>
        <div className="card-cta mt-4">
          {/* <a href="#" className="inline-block bg-transparent border border-yellow-400 text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-black transition-colors duration-300">
            Sign Up
          </a> */}
        </div>
      </div>
    </div>
  );
};

// App component with three different makeup academy cards
const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          Discover Your Beauty Journey at
          Blush & Muse Today!</h1>
        <p className="text-center text-gray-300 mb-12">Unlock your potential with our upcoming courses designed for aspiring makeup artists.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Fundamentals Course"
            description="Experience personalised makeovers for any occasion, including bridal and special events.."
            imageSrc="https://static.vecteezy.com/system/resources/previews/007/584/570/large_2x/cosmetics-on-black-background-and-make-up-tools-top-view-and-mock-up-copy-space-free-photo.jpg"
            animationType="fadeUp"
            Link = "/Explorer Now"
          />

          <Card
            title="Advanced Techniques"
            description="Take your skills to the next level with professional-grade techniques and products."
            imageSrc="/api/placeholder/400/320"
            animationType="glow"
          />

          <Card
            title="Special Effects"
            description="Learn how to create stunning special effects makeup for film, TV, and theatrical productions."
            imageSrc="/api/placeholder/400/320"
            animationType="fadeUp"
          />
        </div>
      </div>
    </div>
  );
};

export default App;