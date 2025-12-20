import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Coffee } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1c1917] text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <Coffee className="h-6 w-6" />
              <span className="font-serif font-bold text-xl tracking-wide">CAFE AROMA</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Crafting moments of connection since 1996. We source the finest Indian Arabica beans to bring you a cup that warms the soul.
            </p>
            <div className="flex space-x-5 pt-2">
              <a href="#" className="text-stone-400 hover:text-amber-500 transition"><Facebook size={20} /></a>
              <a href="#" className="text-stone-400 hover:text-amber-500 transition"><Twitter size={20} /></a>
              <a href="#" className="text-stone-400 hover:text-amber-500 transition"><Instagram size={20} /></a>
              <a href="#" className="text-stone-400 hover:text-amber-500 transition"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6">Explore</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Our Heritage</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">The Menu</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Locations</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Franchise Opportunities</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Shipping & Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif font-semibold text-lg mb-6">Visit Us</h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0 text-amber-600" size={18} />
                <span>123 Coffee Street, Tech Park,<br/>Bangalore, KA 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="flex-shrink-0 text-amber-600" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="flex-shrink-0 text-amber-600" size={18} />
                <span>hello@cafearoma.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 font-light">
          <p>&copy; {new Date().getFullYear()} Cafe Aroma. All rights reserved.</p>
          <p>Designed with ❤️ for coffee lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;