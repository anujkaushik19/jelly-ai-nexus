
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };
    
    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });
    
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => {
      observerRef.current?.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section className="pt-28 pb-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 reveal">
              Welcome to <span className="gradient-text">JELLY</span> Document Intelligence
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 reveal" style={{ transitionDelay: "0.2s" }}>
              Transform your document processing workflow with AI-powered entity extraction for insurance firms and general contractors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 reveal" style={{ transitionDelay: "0.4s" }}>
              <Button asChild size="lg" className="bg-jelly-primary hover:bg-jelly-accent">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Book a Demo</Link>
              </Button>
            </div>
            <div className="mt-8 flex gap-8 items-center reveal" style={{ transitionDelay: "0.6s" }}>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">C1</div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">C2</div>
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">C3</div>
              </div>
              <p className="text-sm text-gray-600">Trusted by industry leaders</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative reveal" style={{ transitionDelay: "0.3s" }}>
            <div className="bg-gradient-to-br from-jelly-primary/20 to-jelly-accent/20 rounded-lg p-1">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="bg-gray-100 rounded-md h-64 md:h-80 flex items-center justify-center">
                  <div className="animate-float relative">
                    <div className="w-32 h-40 bg-white rounded-md shadow-md absolute -top-12 -left-16 rotate-12 flex items-center justify-center">
                      <div className="w-24 h-32 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-40 h-48 bg-white rounded-md shadow-md z-10 relative flex flex-col p-3">
                      <div className="flex-1 bg-gray-200 rounded-sm mb-2"></div>
                      <div className="h-4 bg-jelly-primary/30 rounded-sm w-3/4"></div>
                    </div>
                    <div className="w-32 h-40 bg-white rounded-md shadow-md absolute -bottom-12 -right-16 -rotate-12 flex items-center justify-center">
                      <div className="w-24 h-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-jelly-accent/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-jelly-primary/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
