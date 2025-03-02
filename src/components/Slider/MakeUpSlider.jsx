// App.jsx or Slider.jsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MakeupSlider = () => {
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  const textRef = useRef(null);
  
  // Slider Content
  const slides = [
    {
      id: 1,
      video: '/videos/makeup-tutorial-1.mp4', // Replace with your video path
      title: 'Transform Your Passion into Profession',
      description: 'Welcome to Blush & Muse, where your passion for beauty transforms into a fulfilling profession. Join our vibrant community and explore endless opportunities in makeup artistry.'
    },
    {
      id: 2,
      video: '/videos/makeup-tutorial-2.mp4', // Replace with your video path
      title: 'Master the Art of Beauty',
      description: 'Learn advanced techniques from industry professionals that will elevate your makeup skills to new heights.'
    },
    {
      id: 3,
      video: '/videos/makeup-tutorial-3.mp4', // Replace with your video path
      title: 'Create Your Beauty Legacy',
      description: 'Build your personal brand and portfolio with our guidance and support. Your journey to becoming a renowned makeup artist starts here.'
    }
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    const slideElements = slidesRef.current;
    const textElement = textRef.current;
    
    // Initial setup - hide all slides except the first one
    gsap.set(slideElements.slice(1), { autoAlpha: 0 });
    
    // Create the slider animation timeline
    const createSliderAnimation = () => {
      const duration = 1;
      const slideDelay = 5; // Time each slide stays visible
      
      const tl = gsap.timeline({ repeat: -1 });
      
      slideElements.forEach((slide, index) => {
        const nextIndex = (index + 1) % slideElements.length;
        
        // Fade in current slide
        if (index === 0) {
          tl.to(slide, { autoAlpha: 1, duration });
        }
        
        // Text animation when slide is active
        tl.to(textElement, { 
          y: 0, 
          autoAlpha: 1, 
          duration: 0.8, 
          ease: "power2.out" 
        }, `-=${duration - 0.2}`);
        
        // Pause on this slide
        tl.to({}, { duration: slideDelay });
        
        // Fade out text before slide transition
        tl.to(textElement, { 
          y: -30, 
          autoAlpha: 0, 
          duration: 0.5, 
          ease: "power2.in" 
        });
        
        // Cross-fade to next slide
        tl.to(slide, { autoAlpha: 0, duration }, "+=0.2");
        if (nextIndex !== 0) {
          tl.to(slideElements[nextIndex], { autoAlpha: 1, duration }, `-=${duration}`);
        }
        
        // Update text content
        tl.add(() => {
          updateTextContent(nextIndex);
        });
      });
      
      return tl;
    };
    
    // Update text content based on current slide
    const updateTextContent = (index) => {
      const titleElement = textElement.querySelector('.slide-title');
      const descElement = textElement.querySelector('.slide-description');
      
      if (titleElement && descElement) {
        titleElement.textContent = slides[index].title;
        descElement.textContent = slides[index].description;
      }
    };
    
    // Initialize the slider
    const mainTimeline = gsap.timeline();
    mainTimeline.add(createSliderAnimation());
    
    // Cleanup
    return () => {
      mainTimeline.kill();
    };
  }, []);
  
  // Store slide refs
  const addToSlidesRef = (el) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slider container */}
      <div ref={sliderRef} className="w-full h-full">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={addToSlidesRef}
            className="absolute inset-0 w-full h-full"
          >
            {/* Video background */}
            <video
              className="object-cover w-full h-full"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={slide.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
        ))}
      </div>
      
      {/* Text overlay */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 lg:w-2/3 opacity-0"
      >
        <h1 className="slide-title text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {slides[0].title}
        </h1>
        <p className="slide-description text-lg md:text-xl text-white/90 max-w-2xl">
          {slides[0].description}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition-colors">
            Contact Us
          </button>
          <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-full transition-colors">
            Join Now
          </button>
        </div>
      </div>
      
      {/* Slider navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors"
            aria-label={`Go to slide ${index + 1}`}
            // You can add onClick handlers to manually navigate slides
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MakeupSlider;