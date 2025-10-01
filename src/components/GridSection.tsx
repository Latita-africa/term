import { useEffect, useRef, useState, useCallback } from "react";

const GridSection = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWhiteBackground, setIsWhiteBackground] = useState(false);
  const animationRef = useRef<number>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  // Animation loop for grid elements
  useEffect(() => {
    const animate = () => {
      setAnimationProgress(prev => (prev + 0.008) % (Math.PI * 2));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const now = Date.now();
    if (now - lastScrollTime.current < 16) return; // 60fps throttling
    lastScrollTime.current = now;

    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // More precise scroll calculation
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const sectionCenter = sectionTop + (sectionHeight / 2);
    
    // Calculate progress based on section center crossing viewport center
    let progress = 0;
    
    if (sectionTop <= windowHeight && sectionTop >= -sectionHeight) {
      // Section is in viewport
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = windowHeight / 2 + sectionHeight / 2;
      
      progress = Math.max(0, Math.min(1, 1 - (distanceFromCenter / maxDistance)));
    }
    
    setScrollProgress(progress);
    
    // Switch to white background when section is 60% scrolled through
    const shouldBeWhite = progress > 0.6;
    setIsWhiteBackground(shouldBeWhite);
    
  }, []);

  // Scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Generate grid dots with better distribution
  const generateDots = () => {
    const dots = [];
    const gridSize = 50;
    const cols = Math.ceil(window.innerWidth / gridSize);
    const rows = Math.ceil(window.innerHeight / gridSize);
    
    for (let i = 0; i < cols * rows; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col * gridSize) / window.innerWidth * 100;
      const y = (row * gridSize) / window.innerHeight * 100;
      
      // Add some randomness to make it more organic
      const randomOffset = (Math.sin(i * 0.1) * 5);
      const delay = i * 0.05;
      const pulse = Math.sin(animationProgress + delay) * 0.5 + 0.5;
      
      dots.push(
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full transition-all duration-1000 ease-out"
          style={{
            left: `${x + randomOffset}%`,
            top: `${y + randomOffset}%`,
            backgroundColor: isWhiteBackground ? '#000000' : 'hsl(var(--foreground))',
            opacity: 0.2 + (pulse * 0.6),
            transform: `scale(${0.5 + pulse * 0.8})`,
            transitionDelay: `${i * 2}ms`
          }}
        />
      );
    }
    return dots;
  };

  // Generate glowing lines with better positioning
  const generateGlowingLines = () => {
    const lines = [];
    const positions = [
      { x: 15, y: 40, width: 80 },
      { x: 25, y: 65, width: 60 },
      { x: 35, y: 80, width: 100 },
      { x: 60, y: 30, width: 70 },
      { x: 70, y: 55, width: 90 }
    ];
    
    positions.forEach((pos, i) => {
      const delay = i * 1.5;
      const glow = Math.sin(animationProgress + delay) * 0.5 + 0.5;
      const pulse = Math.sin(animationProgress * 1.5 + delay) * 0.3 + 0.7;
      
      lines.push(
        <div
          key={i}
          className="absolute h-0.5 rounded-full transition-all duration-1000 ease-out"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${pos.width}px`,
            backgroundColor: isWhiteBackground ? '#22c55e' : 'hsl(var(--accent))',
            opacity: 0.4 + (glow * 0.6),
            boxShadow: `0 0 ${15 + glow * 25}px ${isWhiteBackground ? '#22c55e' : 'hsl(var(--accent))'}`,
            transform: `scaleX(${0.3 + pulse * 0.7})`,
            transitionDelay: `${i * 100}ms`
          }}
        />
      );
    });
    return lines;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden transition-all duration-1000 ease-in-out"
      style={{
        backgroundColor: isWhiteBackground ? '#ffffff' : 'hsl(var(--background))'
      }}
    >
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0">
        {/* Modern Animated Grid */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: isWhiteBackground ? 0.3 : 0.2 }}>
          <defs>
            <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isWhiteBackground ? '#000000' : 'hsl(var(--accent))'} stopOpacity="0.8" />
              <stop offset="50%" stopColor={isWhiteBackground ? '#000000' : 'hsl(var(--foreground))'} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isWhiteBackground ? '#000000' : 'hsl(var(--accent))'} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          <g transform={`translate(${Math.sin(animationProgress) * 20}, ${Math.cos(animationProgress * 0.7) * 20})`}>
            {/* Primary Grid - More Visible */}
            {Array.from({ length: Math.ceil(window.innerWidth / 60) + 3 }, (_, i) => {
              const x = i * 60;
              const wave = Math.sin(animationProgress * 2 + i * 0.3) * 10;
              const opacity = 0.6 + Math.sin(animationProgress + i * 0.4) * 0.4;
              
              return (
                <line
                  key={`v-${i}`}
                  x1={x + wave}
                  y1="0"
                  x2={x + wave}
                  y2="100%"
                  stroke="url(#gridGradient)"
                  strokeWidth="2"
                  opacity={opacity}
                  strokeDasharray={Math.sin(animationProgress + i) > 0 ? "0" : "5,5"}
                />
              );
            })}
            
            {Array.from({ length: Math.ceil(window.innerHeight / 60) + 3 }, (_, i) => {
              const y = i * 60;
              const wave = Math.cos(animationProgress * 1.5 + i * 0.2) * 8;
              const opacity = 0.6 + Math.cos(animationProgress + i * 0.3) * 0.4;
              
              return (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={y + wave}
                  x2="100%"
                  y2={y + wave}
                  stroke="url(#gridGradient)"
                  strokeWidth="2"
                  opacity={opacity}
                  strokeDasharray={Math.cos(animationProgress + i) > 0 ? "0" : "5,5"}
                />
              );
            })}
          </g>
        </svg>

        {/* Glowing Grid Overlay */}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: isWhiteBackground ? 0.2 : 0.15 }}>
          <g transform={`translate(${Math.cos(animationProgress * 0.8) * 15}, ${Math.sin(animationProgress * 1.2) * 15})`}>
            {/* Glowing Grid Lines */}
            {Array.from({ length: Math.ceil(window.innerWidth / 120) + 2 }, (_, i) => {
              const x = i * 120;
              const glow = Math.sin(animationProgress * 3 + i * 0.5) * 0.5 + 0.5;
              
              return (
                <line
                  key={`glow-v-${i}`}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="100%"
                  stroke={isWhiteBackground ? '#22c55e' : 'hsl(var(--accent))'}
                  strokeWidth="1"
                  opacity={glow * 0.8}
                  filter="blur(1px)"
                />
              );
            })}
            
            {Array.from({ length: Math.ceil(window.innerHeight / 120) + 2 }, (_, i) => {
              const y = i * 120;
              const glow = Math.cos(animationProgress * 2.5 + i * 0.4) * 0.5 + 0.5;
              
              return (
                <line
                  key={`glow-h-${i}`}
                  x1="0"
                  y1={y}
                  x2="100%"
                  y2={y}
                  stroke={isWhiteBackground ? '#22c55e' : 'hsl(var(--accent))'}
                  strokeWidth="1"
                  opacity={glow * 0.8}
                  filter="blur(1px)"
                />
              );
            })}
          </g>
        </svg>

        {/* Scanning Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 3 }, (_, i) => {
            const speed = 0.3 + (i * 0.2);
            const y = (animationProgress * speed * 100 + i * 30) % 120;
            const opacity = 0.3 + Math.sin(animationProgress * 4 + i) * 0.2;
            
            return (
              <div
                key={`scan-${i}`}
                className="absolute w-full h-0.5 transition-all duration-100"
                style={{
                  top: `${y - 10}%`,
                  background: `linear-gradient(90deg, transparent, ${isWhiteBackground ? '#22c55e' : 'hsl(var(--accent))'}, transparent)`,
                  opacity: opacity,
                  boxShadow: `0 0 10px ${isWhiteBackground ? '#22c55e' : 'hsl(var(--accent))'}`,
                }}
              />
            );
          })}
        </div>

        {/* Animated Dots with better distribution */}
        <div className="absolute inset-0">
          {generateDots()}
        </div>

        {/* Enhanced Glowing Lines */}
        <div className="absolute inset-0">
          {generateGlowingLines()}
        </div>

        {/* Flowing Horizontal Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }, (_, i) => {
            const speed = 0.5 + (i * 0.2);
            const offset = i * 15;
            const x = (animationProgress * speed * 100 + offset) % 120;
            const opacity = 0.1 + Math.sin(animationProgress + i) * 0.1;
            
            return (
              <div
                key={`flow-h-${i}`}
                className="absolute h-px transition-all duration-1000"
                style={{
                  left: `${x - 20}%`,
                  top: `${20 + i * 12}%`,
                  width: '40%',
                  backgroundColor: isWhiteBackground ? '#000000' : 'hsl(var(--foreground))',
                  opacity: opacity,
                  transform: `translateX(${Math.sin(animationProgress + i) * 10}px)`,
                }}
              />
            );
          })}
        </div>

        {/* Flowing Vertical Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 4 }, (_, i) => {
            const speed = 0.3 + (i * 0.15);
            const offset = i * 20;
            const y = (animationProgress * speed * 100 + offset) % 120;
            const opacity = 0.08 + Math.cos(animationProgress + i) * 0.08;
            
            return (
              <div
                key={`flow-v-${i}`}
                className="absolute w-px transition-all duration-1000"
                style={{
                  left: `${25 + i * 15}%`,
                  top: `${y - 20}%`,
                  height: '40%',
                  backgroundColor: isWhiteBackground ? '#000000' : 'hsl(var(--foreground))',
                  opacity: opacity,
                  transform: `translateY(${Math.cos(animationProgress + i) * 8}px)`,
                }}
              />
            );
          })}
        </div>

        {/* Additional animated elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const radius = 200 + Math.sin(animationProgress + i) * 50;
            const x = 50 + Math.cos(angle + animationProgress * 0.5) * 30;
            const y = 50 + Math.sin(angle + animationProgress * 0.5) * 30;
            
            return (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full transition-all duration-1000"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  backgroundColor: isWhiteBackground ? '#000000' : 'hsl(var(--foreground))',
                  opacity: 0.1 + Math.sin(animationProgress + i) * 0.2,
                  transform: `scale(${0.5 + Math.sin(animationProgress + i) * 0.5})`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Enhanced Content with better typography */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-6xl">
          <p 
            className="text-lg sm:text-xl mb-8 font-medium transition-colors duration-1000 ease-out"
            style={{
              color: isWhiteBackground ? '#666666' : 'hsl(var(--muted-foreground))'
            }}
          >
            That's the
          </p>
          
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 transition-colors duration-1000 ease-out"
            style={{
              color: isWhiteBackground ? '#000000' : 'hsl(var(--hero))'
            }}
          >
            Yard Operating System.
          </h1>
          
          <div className="flex justify-center items-center space-x-4 sm:space-x-8 my-12">
            <span 
              className="text-6xl sm:text-8xl md:text-9xl font-bold transition-colors duration-1000 ease-out"
              style={{
                color: isWhiteBackground ? '#000000' : 'hsl(var(--hero))'
              }}
            >
              YOS™
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GridSection;