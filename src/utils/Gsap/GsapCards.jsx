import React from 'react'

const GsapCards = () => {

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
  return (
    <div>GsapCards</div>
  )
}

export default GsapCards