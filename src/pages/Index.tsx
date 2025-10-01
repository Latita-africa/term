import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import YOSSection from "@/components/YOSSection";
import ScrollVideoSection from "@/components/ScrollVideoSection";
import GridSection from "@/components/GridSection";
import Benefits from "@/components/Benefits";
import Partners from "@/components/Partners";
import Testimonial from "@/components/Testimonial";
import Clients from "@/components/Clients";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <YOSSection />
      <GridSection />
      <Footer />
    </div>
  );
};

export default Index;
