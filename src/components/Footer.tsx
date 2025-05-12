
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">JELLY AI</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-jelly-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-jelly-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-jelly-primary transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-jelly-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/features/entity-extraction" className="text-gray-600 hover:text-jelly-primary transition-colors">Entity Extraction</Link></li>
              <li><Link to="/features/document-control" className="text-gray-600 hover:text-jelly-primary transition-colors">Document Control</Link></li>
              <li><Link to="/features/analytics" className="text-gray-600 hover:text-jelly-primary transition-colors">Analytics</Link></li>
              <li><Link to="/features/integrations" className="text-gray-600 hover:text-jelly-primary transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/documentation" className="text-gray-600 hover:text-jelly-primary transition-colors">Documentation</Link></li>
              <li><Link to="/resources/api" className="text-gray-600 hover:text-jelly-primary transition-colors">API Reference</Link></li>
              <li><Link to="/resources/guides" className="text-gray-600 hover:text-jelly-primary transition-colors">Guides</Link></li>
              <li><Link to="/resources/blog" className="text-gray-600 hover:text-jelly-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/legal/privacy" className="text-gray-600 hover:text-jelly-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="text-gray-600 hover:text-jelly-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/legal/security" className="text-gray-600 hover:text-jelly-primary transition-colors">Security</Link></li>
              <li><Link to="/legal/compliance" className="text-gray-600 hover:text-jelly-primary transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-jelly-primary to-jelly-accent flex items-center justify-center text-white font-bold mr-2">
              J
            </div>
            <span className="font-bold">JELLY</span>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-gray-500 hover:text-jelly-primary">
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-jelly-primary">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          <p className="text-gray-500 text-sm">
            © {currentYear} JELLY AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
