import { useState, useEffect, useRef } from "react";

const ScrollVideoSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const content = [
    {
      id: "01",
      title: "Autonomous, integrated workflows starting at the gate",
      subtitle: "Single pane of glass visibility of all yard operations",
      video: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
    },
    {
      id: "02", 
      title: "Single pane of glass visibility of all yard operations",
      subtitle: "Managed by a unified platform with AI computer vision",
      video: "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4"
    },
    {
      id: "03",
      title: "Managed by a unified platform with AI computer vision", 
      subtitle: "Highly configurable to all yards in your network",
      video: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
    },
    {
      id: "04",
      title: "Highly configurable to all yards in your network",
      subtitle: "Unlocked value of your existing WMS/TMS", 
      video: "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4"
    },
    {
      id: "05",
      title: "Unlocked value of your existing WMS/TMS",
      subtitle: "Digitally transformed, data rich, and predictive",
      video: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
    },
    {
      id: "06", 
      title: "Digitally transformed, data rich, and predictive",
      subtitle: "Ready to deploy, rapid to scale",
      video: "https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate scroll progress within this section
      const scrollStart = rect.top;
      const scrollEnd = rect.bottom - windowHeight;
      const totalScrollDistance = scrollEnd - scrollStart;
      
      if (totalScrollDistance > 0) {
        const progress = Math.max(0, Math.min(1, -scrollStart / totalScrollDistance));
        setScrollProgress(progress);
        
        // Calculate which content index to show
        const newIndex = Math.floor(progress * (content.length - 1));
        setCurrentIndex(Math.min(newIndex, content.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle video transitions
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.currentTime = 0; // Reset video to beginning
          video.play().catch(console.warn);
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  const currentContent = content[currentIndex];

  return (
    <section ref={sectionRef} className="relative min-h-[10vh]">
      {/* Content Container */}
      <div className="flex">
        {/* Left Side - Scrollable Text Content */}
        <div className="w-2/5 relative">
          {content.map((item, index) => (
            <div 
              key={item.id} 
              className="h-screen relative bg-background flex items-center justify-center px-8 sm:px-12 lg:px-16 transition-opacity duration-500"
              style={{
                opacity: index === currentIndex ? 1 : index === currentIndex + 1 ? 0.3 : 0
              }}
            >
              <div className="max-w-lg">
                <div className="mb-8">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-bold text-muted-foreground/20">
                    {item.id}
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-hero mb-6">
                  {item.title}
                </h2>
                
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Sticky Video Content */}
        <div className="w-3/5 sticky top-0 h-screen bg-black overflow-hidden">
          {/* Video Container with Wireframe */}
          <div className="relative w-full h-full">
            {/* Video Background */}
            <video
              ref={(el) => (videoRefs.current[currentIndex] = el)}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              autoPlay
              muted
              loop
              playsInline
              key={currentIndex} // Force re-render when currentIndex changes
            >
              <source src={currentContent.video} type="video/mp4" />
            </video>

            {/* Starry Background Overlay */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 opacity-30">
              {[...Array(200)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Wireframe Structure */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-1/2 h-1/2">
                {/* Main Wireframe Grid */}
                <div className="absolute inset-0 border-2 border-cyan-400/60 rounded-lg">
                  {/* Vertical Sections */}
                  {[1, 3, 6, 8, 9, 10, 12, 13].map((num, sectionIndex) => (
                    <div
                      key={num}
                      className="absolute top-0 bottom-0 w-16 border-l border-cyan-400/40"
                      style={{
                        left: `${(sectionIndex * 12) + 8}%`,
                        transform: `translateY(${(scrollProgress - 0.5) * 20}px)`
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-cyan-400/80 text-2xl font-bold">
                        {num}
                      </div>
                    </div>
                  ))}

                  {/* Horizontal Lines */}
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-cyan-400/40" />
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-cyan-400/40" />

                  {/* Moving Central Element */}
                  <div 
                    className="absolute w-4 h-4 bg-cyan-400/80 rounded-full transition-transform duration-1000"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translateY(${(scrollProgress - 0.5) * 30}px)`
                    }}
                  />

                  {/* Data Flow Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M50% 50% Q30% 20% 20% 30% Q10% 40% 5% 50%"
                      stroke="url(#dataFlow)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                    />
                    <path
                      d="M50% 50% Q70% 20% 80% 30% Q90% 40% 95% 50%"
                      stroke="url(#dataFlow)"
                      strokeWidth="2"
                      fill="none"
                      className="animate-pulse"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute top-8 right-8 bg-green-500/90 text-white px-4 py-2 rounded-lg font-medium text-sm">
              ASSET DETECTED ✓
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-8 left-8 text-white">
              <div className="text-sm opacity-80">CHECK IN: 2:34 PM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollVideoSection;
