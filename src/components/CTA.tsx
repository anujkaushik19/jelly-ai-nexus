
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const CTA = () => {
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
    <section id="contact" className="py-16 md:py-24 bg-jelly-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">
            Ready to Transform Your Document Processing?
          </h2>
          <p className="text-lg text-gray-300 mb-8 reveal" style={{ transitionDelay: "0.2s" }}>
            Insurance firms and general contractors delegate their document administrative tasks to Jelly AI and save a lot of time. Join them today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal" style={{ transitionDelay: "0.3s" }}>
            <Button asChild size="lg" className="bg-jelly-primary hover:bg-jelly-accent">
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">Book a Demo</Link>
            </Button>
          </div>
          <div className="mt-12 reveal" style={{ transitionDelay: "0.4s" }}>
            <p className="text-gray-400 mb-4">Have questions? We're here to help.</p>
            <a href="mailto:info@jellyai.com" className="text-jelly-primary hover:text-jelly-accent transition-colors">
              info@jellyai.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
