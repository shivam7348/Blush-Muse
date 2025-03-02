import { useEffect, useRef, useState } from 'react';
import slider from "../Slider/mainSlider.mp4"
import gsap from 'gsap';

const MakeupSlider = () => {
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  const textRef = useRef(null);
  const dotsRef = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Slider Content
  const slides = [
    {
      id: 1,
      video: slider, // Update with your actual path
      title: 'Transform Your Passion into Profession',
      description: 'Welcome to Blush & Muse, where your passion for beauty transforms into a fulfilling profession. Join our vibrant community and explore endless opportunities in makeup artistry.'
    },
    // {
    //   id: 2,
    //   video: '/videos/makeup-tutorial-2.mp4',
    //   title: 'Master the Art of Beauty',
    //   description: 'Learn advanced techniques from industry professionals that will elevate your makeup skills to new heights.'
    // },
    // {
    //   id: 3,
    //   video: '/videos/makeup-tutorial-3.mp4',
    //   title: 'Create Your Beauty Legacy',
    //   description: 'Build your personal brand and portfolio with our guidance and support. Your journey to becoming a renowned makeup artist starts here.'
    // }
  ];

  // Function to go to a specific slide
  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    
    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }
    });
    
    // Fade out current text
    timeline.to(textRef.current, {
      y: -30,
      autoAlpha: 0,
      duration: 0.5,
      ease: "power2.in"
    });
    
    // Crossfade slides
    timeline.to(slidesRef.current[currentSlide], {
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.3");
    
    timeline.to(slidesRef.current[index], {
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.8");
    
    // Update and fade in new text
    timeline.add(() => {
      const titleElement = textRef.current.querySelector('.slide-title');
      const descElement = textRef.current.querySelector('.slide-description');
      
      if (titleElement && descElement) {
        titleElement.textContent = slides[index].title;
        descElement.textContent = slides[index].description;
      }
    });
    
    timeline.to(textRef.current, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.out"
    });
    
    // Update active dot
    timeline.to(dotsRef.current, {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      duration: 0.3
    }, "-=0.8");
    
    timeline.to(dotsRef.current[index], {
      backgroundColor: "rgba(255, 255, 255, 1)",
      duration: 0.3
    }, "-=0.3");
  };

  // Auto-advance slides
  useEffect(() => {
    let interval;
    
    if (!isAnimating) {
      interval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        goToSlide(nextSlide);
      }, 6000); // 6 seconds per slide
    }
    
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating, slides.length]);

  useEffect(() => {
    // Initial setup
    const slideElements = slidesRef.current;
    
    // Hide all slides except the first one
    gsap.set(slideElements.slice(1), { autoAlpha: 0 });
    
    // Initial text animation
    gsap.fromTo(textRef.current, 
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1, delay: 0.5, ease: "power3.out" }
    );
    
    // Initial dot highlight
    gsap.set(dotsRef.current[0], { backgroundColor: "rgba(255, 255, 255, 1)" });
    
    // Preload all videos
    slideElements.forEach(slide => {
      const video = slide.querySelector('video');
      if (video) {
        video.load();
      }
    });
  }, []);

  // Store slide refs
  const addToSlidesRef = (el) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current.push(el);
    }
  };
  
  // Store dot refs
  const addToDotsRef = (el) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current.push(el);
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
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
          <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full transition-colors duration-300">
            Contact Us
          </button>
          <button className="px-8 py-3 bg-transparent hover:bg-white/10 text-white border-2 border-white rounded-full transition-colors duration-300">
            Join Now
          </button>
        </div>
      </div>
      
      {/* Slider navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            ref={addToDotsRef}
            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors duration-300"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors duration-300"
        onClick={() => {
          const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
          goToSlide(prevSlide);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors duration-300"
        onClick={() => {
          const nextSlide = (currentSlide + 1) % slides.length;
          goToSlide(nextSlide);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default MakeupSlider;