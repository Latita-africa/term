import { useRef, useState, useEffect } from "react";
import { useScrollVideo } from "@/hooks/useScrollVideo";

// Typing animation component - controlled by scroll progress
const TypingText = ({ text, scrollProgress, startProgress = 0.3, endProgress = 0.8 }: { 
  text: string; 
  scrollProgress: number; 
  startProgress?: number; 
  endProgress?: number; 
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (scrollProgress < startProgress) {
      // Reset when scroll is below start threshold
      setDisplayText("");
      setCurrentIndex(0);
      return;
    }

    if (scrollProgress >= startProgress) {
      // Calculate how much of the text should be visible based on scroll progress
      const progressRange = endProgress - startProgress;
      const currentProgress = Math.min((scrollProgress - startProgress) / progressRange, 1);
      const targetIndex = Math.floor(currentProgress * text.length);
      
      // Update display text based on target index
      setDisplayText(text.slice(0, targetIndex));
      setCurrentIndex(targetIndex);
    }
  }, [scrollProgress, text, startProgress, endProgress]);

  return <span>{displayText}</span>;
};

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollProgress = useScrollVideo(videoRef);
  const [showContent, setShowContent] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Show content after video progresses past 50%
    setShowContent(scrollProgress > 0.5);
  }, [scrollProgress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative h-[300vh]">
      {/* Sticky Video Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          muted
            playsInline
            loop
            crossOrigin="anonymous"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%23000' width='1920' height='1080'/%3E%3C/svg%3E"
          style={{ 
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            imageRendering: 'high-quality',
            imageRendering: '-webkit-optimize-contrast'
          }}
        >
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/40" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/30" />

        {/* Live Mouse Cursor Indicator */}
        <div 
          className="fixed pointer-events-none z-50 transition-opacity duration-500"
          style={{ 
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            opacity: scrollProgress < 0.15 ? 1 : 0,
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full w-16 h-16 animate-pulse" />
            <div className="relative flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-accent rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-medium whitespace-nowrap">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>

        {/* Main Content - fades in as you scroll */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
          style={{ 
            opacity: showContent ? 1 : 0,
            transform: `scale(${0.95 + (scrollProgress * 0.05)})`
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
                <div className="text-foreground block mb-2">
                  <TypingText 
                    text="We have reinvented the" 
                    scrollProgress={scrollProgress} 
                    startProgress={0.3} 
                    endProgress={0.6} 
                  />
                </div>
                <div className="text-foreground">
                  <TypingText 
                    text="future of logisti" 
                    scrollProgress={scrollProgress} 
                    startProgress={0.4} 
                    endProgress={0.7} 
                  />
                  <span className="text-accent">
                    <TypingText 
                      text="c" 
                      scrollProgress={scrollProgress} 
                      startProgress={0.5} 
                      endProgress={0.8} 
                    />
                  </span>
                  <span className="text-foreground">
                    <TypingText 
                      text="s" 
                      scrollProgress={scrollProgress} 
                      startProgress={0.5} 
                      endProgress={0.8} 
                    />
                  </span>
                </div>
              </h1>
              <div className="mt-8 h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-1 w-12 rounded-full bg-foreground/20 overflow-hidden"
            >
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{
                  width: `${Math.min(Math.max((scrollProgress - i * 0.25) * 400, 0), 100)}%`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
