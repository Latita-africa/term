import { useEffect, useState, useRef } from 'react';

export const useScrollVideo = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const lastScrollTime = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const playbackRateRef = useRef<number>(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Continuous animation loop that keeps video playing
    const animate = (timestamp: number) => {
      if (!isAnimatingRef.current) return;

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Smooth interpolation for continuous playback
      const lerpFactor = Math.min(deltaTime * 0.01, 0.2); // Faster for continuous feel
      currentTimeRef.current += (targetTimeRef.current - currentTimeRef.current) * lerpFactor;

      // Update video time smoothly for continuous playback
      if (video.duration && video.readyState >= 2) {
        try {
          // Only seek if there's a meaningful difference
          if (Math.abs(video.currentTime - currentTimeRef.current) > 0.05) {
            video.currentTime = currentTimeRef.current;
          }
        } catch (error) {
          console.warn('Video seeking error:', error);
        }
      }

      // Always continue animation for smooth continuous playback
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const now = performance.now();
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 2;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      setScrollProgress(progress);
      lastScrollTime.current = now;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Immediate update for responsive feel
      if (video.duration && video.readyState >= 2) {
        targetTimeRef.current = progress * video.duration;
        
        // Start continuous animation
        if (!isAnimatingRef.current) {
          isAnimatingRef.current = true;
          lastTimeRef.current = performance.now();
          rafRef.current = requestAnimationFrame(animate);
        }
      }
    };

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      currentTimeRef.current = 0;
      targetTimeRef.current = 0;
      // Don't auto-play, let user control when to start
    };

    const handleCanPlay = () => {
      // Don't auto-play, let user control when to start
    };

    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', () => {
      // Loop the video for continuous playback
      video.currentTime = 0;
      // Don't auto-play, let user control when to start
    });
    
    // Initial setup
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', () => {});
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      isAnimatingRef.current = false;
    };
  }, [videoRef]);

  return scrollProgress;
};
