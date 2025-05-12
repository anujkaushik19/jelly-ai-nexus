
import { useEffect, useRef } from "react";

const HowItWorks = () => {
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
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto reveal" style={{ transitionDelay: "0.2s" }}>
            Our streamlined process makes document intelligence accessible to everyone in your organization.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-24 left-[calc(25%-2px)] right-[calc(25%-2px)] h-0.5 bg-gradient-to-r from-transparent via-jelly-primary to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.title} 
                className="flex flex-col items-center text-center reveal"
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-jelly-primary/10 flex items-center justify-center mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-jelly-primary flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Create Entity Sets",
    description: "Define custom entity sets tailored to your specific document types and information needs."
  },
  {
    title: "Configure Training",
    description: "Set up training parameters including domain, storage options, and entity extraction criteria."
  },
  {
    title: "Process Documents",
    description: "Upload your documents and let our AI process and extract the specified entities automatically."
  },
  {
    title: "Review & Utilize",
    description: "Review extracted data, export it to your systems, and make informed business decisions."
  }
];

export default HowItWorks;
