import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Coffee, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0908] text-stone-400 pt-40 pb-20 border-t border-white/5 relative overflow-hidden">
      {/* Aesthetic Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 lg:gap-12 pb-32">

          {/* Brand & Manifesto */}
          <div className="space-y-12 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-white">
                <Coffee size={24} className="text-amber-500" />
                <span className="font-serif font-black text-3xl tracking-tighter uppercase">CAFE AROMA</span>
              </div>
              <span className="text-[9px] tracking-[0.6em] text-stone-400 uppercase font-black">Legacy Shared Since 1996</span>
            </div>
            <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed font-serif italic max-w-sm">
              "We don't just brew coffee; we compose the quiet moments that define your life's chapters."
            </p>
            <div className="flex gap-8">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#d97706" }}
                  className="text-stone-500 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Chapters */}
          <div className="lg:pl-20">
            <h4 className="text-white text-[10px] font-black tracking-[0.5em] uppercase mb-12">The Map</h4>
            <ul className="space-y-6">
              {['Our Heritage', 'Boutique', 'Sanctuaries', 'Careers', 'Franchise'].map((link) => (
                <li key={link}>
                  <a href="#" className="flex items-center gap-2 group text-stone-400 hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                    {link} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge */}
          <div className="lg:pl-10">
            <h4 className="text-white text-[10px] font-black tracking-[0.5em] uppercase mb-12">The Order</h4>
            <ul className="space-y-6">
              {['Contact Support', 'Privacy Protocol', 'Terms of Ritual', 'Returns'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-stone-400 hover:text-white transition-all text-xs font-black uppercase tracking-widest">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Presence */}
          <div className="space-y-12">
            <h4 className="text-white text-[10px] font-black tracking-[0.5em] uppercase mb-12">Sanctuary Presence</h4>
            <ul className="space-y-10">
              <li className="flex gap-6 group">
                <MapPin className="text-amber-500 flex-shrink-0" size={20} />
                <span className="text-xs font-black tracking-widest leading-loose uppercase group-hover:text-white transition-colors">
                  123 Coffee Heritage Path, <br />Indiranagar, Bangalore 560038
                </span>
              </li>
              <li className="flex items-center gap-6 group">
                <Phone className="text-amber-500" size={20} />
                <span className="text-xs font-black tracking-widest uppercase group-hover:text-white transition-colors">+91 9123 456 789</span>
              </li>
              <li className="flex items-center gap-6 group">
                <Mail className="text-amber-500" size={20} />
                <span className="text-xs font-black tracking-widest uppercase group-hover:text-white transition-colors">rituals@cafearoma.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-black tracking-[0.4em] uppercase text-stone-300">All Nodes Operational</span>
          </div>
          <p className="text-[9px] font-black tracking-[0.4em] uppercase text-stone-500">
            &copy; {new Date().getFullYear()} CAFE AROMA HERITAGE. BUILT FOR THE GRAVITY OF THE BREW.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[9px] font-black tracking-[0.4em] uppercase text-stone-400 hover:text-white transition-colors"
          >
            Ascend to Peak
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;