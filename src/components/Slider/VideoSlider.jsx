import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

const VideoSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Sample slides data structure if none is provided
 
  const slidesToUse = slides || defaultSlides;

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, slidesToUse.length);
  }, [slidesToUse]);

  // Handle auto-play and progress tracking
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    
    if (currentVideo) {
      // Reset all videos
      videoRefs.current.forEach((video, idx) => {
        if (idx !== currentIndex) {
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        }
      });

      // Set up current video
      currentVideo.muted = isMuted;
      
      if (isPlaying) {
        currentVideo.play().catch(e => console.log("Video play error:", e));
        
        // Track progress
        progressIntervalRef.current = setInterval(() => {
          if (currentVideo.duration) {
            setProgress((currentVideo.currentTime / currentVideo.duration) * 100);
          }
        }, 100);
      } else {
        currentVideo.pause();
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPlaying, isMuted]);

  // Auto-advance slides when video ends
  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    
    if (currentVideo) {
      const handleEnded = () => {
        goToNext();
      };
      
      currentVideo.addEventListener('ended', handleEnded);
      
      return () => {
        currentVideo.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentIndex]);

  // Navigate to previous slide
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slidesToUse.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setProgress(0);
  };

  // Navigate to next slide
  const goToNext = () => {
    const isLastSlide = currentIndex === slidesToUse.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setProgress(0);
  };

  // Go to specific slide
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    setProgress(0);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-full">
      {/* Video Slides */}
      <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16/9' }}>
        {slidesToUse.map((slide, slideIndex) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              slideIndex === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <video
              ref={el => videoRefs.current[slideIndex] = el}
              src={slide.videoSrc}
              className="object-cover w-full h-full"
              loop={false}
              playsInline
            />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 md:p-8">
              <h2 className="text-2xl md:text-4xl font-bold text-yellow-100 mb-2">{slide.title}</h2>
              <p className="text-sm md:text-base text-yellow-100/80 mb-4 max-w-lg">{slide.description}</p>
              <a 
                href={slide.ctaLink} 
                className="inline-block bg-yellow-600 hover:bg-yellow-700 text-yellow-100 font-medium py-2 px-4 rounded-sm transition-colors w-max"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-yellow-900/30 h-1">
        <div 
          className="h-full bg-yellow-500 transition-all duration-100" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-2 bg-black">
        {/* Left controls */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={togglePlay} 
            className="p-2 text-yellow-100 hover:text-yellow-500 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          
          <button 
            onClick={toggleMute} 
            className="p-2 text-yellow-100 hover:text-yellow-500 transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
        
        {/* Slide indicators */}
        <div className="flex items-center space-x-2">
          {slidesToUse.map((slide, slideIndex) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(slideIndex)}
              className={`w-2 h-2 rounded-full transition-all ${
                slideIndex === currentIndex ? "bg-yellow-500 w-4" : "bg-yellow-100/50"
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <div className="flex items-center space-x-1">
          <button
            onClick={goToPrevious}
            className="p-2 text-yellow-100 hover:text-yellow-500 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goToNext}
            className="p-2 text-yellow-100 hover:text-yellow-500 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;