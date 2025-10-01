import { useEffect, useRef, useState } from "react";
import ScrollVideoSection from "./ScrollVideoSection";

const YOSSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-32 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* New Text Section - Above YOS */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight text-hero text-center">
            Imagine the yard as an intelligent
            <br />
            bridge seamlessly connecting
            <br />
            highway to warehouse.
          </h2>
        </div>

        {/* Scroll Video Section */}
        <ScrollVideoSection />

        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 font-medium">
            That's the
          </p>

            

            {/* Number Animation Effect */}
            {isVisible && (
              <div className="flex justify-center items-center space-x-2 sm:space-x-4 overflow-hidden opacity-20">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className="text-4xl sm:text-6xl font-bold text-muted-foreground animate-fade-in"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
    </section>
  );
};

export default YOSSection;
