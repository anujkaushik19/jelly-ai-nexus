
import { useEffect, useRef } from "react";

const Testimonials = () => {
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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto reveal" style={{ transitionDelay: "0.2s" }}>
            Don't just take our word for it. See how JELLY has transformed document workflows for our clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow jelly-hover reveal"
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-jelly-primary/20 flex items-center justify-center text-jelly-primary font-medium">
                  {testimonial.author[0]}
                </div>
                <div className="ml-3">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    text: "JELLY has reduced our document processing time by 75%. Our claims analysts can now focus on decision-making rather than manual data entry.",
    author: "Sarah Johnson",
    position: "Claims Director at ABC Insurance"
  },
  {
    text: "The custom entity sets feature is a game-changer. We've trained the system to extract exactly the construction details we need from various document types.",
    author: "Michael Chen",
    position: "Operations Manager at XYZ Contractors"
  },
  {
    text: "Implementation was smooth and the ROI was immediate. Our underwriters now have access to structured data from policies in seconds instead of hours.",
    author: "David Rodriguez",
    position: "CTO at Regional Insurance Group"
  }
];

export default Testimonials;
