
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RegisterNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 shadow-md py-3 backdrop-blur-sm" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jelly-primary to-jelly-accent flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="font-bold text-xl text-jelly-dark">DOC-AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-jelly-primary transition-colors font-medium">
            Home
          </Link>
          <Link to="/#features" className="text-gray-700 hover:text-jelly-primary transition-colors font-medium">
            Features
          </Link>
          <Link to="/#how-it-works" className="text-gray-700 hover:text-jelly-primary transition-colors font-medium">
            How It Works
          </Link>
          <Link to="/#contact" className="text-gray-700 hover:text-jelly-primary transition-colors font-medium">
            Contact
          </Link>
        </nav>
        
        
      </div>
    </header>
  );
};

export default RegisterNavbar;
