
import { useEffect, useRef } from "react";

const Features = () => {
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
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">How can Jelly Help You?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto reveal" style={{ transitionDelay: "0.2s" }}>
            Our AI-powered document intelligence platform streamlines document processing workflows for insurance companies and general contractors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow jelly-hover reveal"
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${feature.bgColor}`}>
                <span className="text-white text-xl font-bold">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Insurance Document Assistance",
    description: "Automate data extraction from insurance policies, claims forms, and binders. Reduce processing time by up to 80%.",
    icon: "🏥",
    bgColor: "bg-blue-500"
  },
  {
    title: "Document Control",
    description: "Securely manage document workflows with advanced classification and routing capabilities. Ensure compliance with industry regulations.",
    icon: "📄",
    bgColor: "bg-jelly-primary"
  },
  {
    title: "Entity Extraction Management",
    description: "Create custom entity sets for specific document types and train our AI to extract precisely the information you need.",
    icon: "🔍",
    bgColor: "bg-jelly-accent"
  }
];

export default Features;
