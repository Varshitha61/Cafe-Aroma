import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useInView } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, Search, Sparkles, Wind, ArrowRight, Eye } from 'lucide-react';
import { CafeLocation } from '../types';

// --- Steam Particle Component (Enhanced) ---
const SteamParticle: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100, x: Math.random() * 200 - 100, scale: 0.2 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [-50, -250],
            x: [null, Math.random() * 150 - 75],
            scale: [0.5, 3],
            rotate: [0, 90]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeOut"
          }}
          className="absolute bottom-[-100px] left-1/2 w-48 h-48 bg-gradient-to-t from-amber-500/10 via-white/5 to-transparent rounded-full blur-[60px]"
        />
      ))}
    </div>
  );
};

// --- Liquid Reveal Component ---
const LiquidReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// --- Atmosphere Slider Item ---
const AtmosphereItem: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.1 }}
      style={{ perspective: "2000px" }}
      className="relative flex-shrink-0 w-[85vw] md:w-[600px] h-[500px] md:h-[700px] rounded-[3rem] md:rounded-[5rem] overflow-hidden group shadow-2xl snap-center border border-white/10"
    >
      <motion.img
        src={item.img}
        className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110"
        alt={item.label}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-100 group-hover:opacity-70 transition-opacity duration-700" />

      <div className="absolute bottom-12 left-10 md:bottom-20 md:left-16 z-10 pr-10">
        <motion.span
          className="text-white text-4xl md:text-8xl font-serif italic font-light block drop-shadow-2xl leading-tight"
        >
          {item.label}
        </motion.span>
        <div className="h-[2px] md:h-[3px] w-16 md:w-24 bg-amber-500 mt-4 md:mt-8 group-hover:w-full transition-all duration-1000 ease-out" />
      </div>

      <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <Eye className="text-white" size={24} />
        </div>
      </div>
    </motion.div>
  );
};

// --- Atmosphere Slider Component ---
const AtmosphereSlider: React.FC = () => {
  const items = [
    { id: 1, img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200", label: "Midnight Brew" },
    { id: 2, img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200", label: "Desert Sun" },
    { id: 3, img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200", label: "Morning Mist" },
    { id: 4, img: "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1200", label: "Urban Soul" }
  ];

  return (
    <div className="relative group/slider">
      <style>{`
        .premium-scroll::-webkit-scrollbar { height: 2px; }
        .premium-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .premium-scroll::-webkit-scrollbar-thumb { background: #d97706; }
      `}</style>
      <div className="flex gap-6 md:gap-12 overflow-x-auto pb-20 px-4 md:px-0 premium-scroll snap-x cursor-grab active:cursor-grabbing">
        {items.map((item, idx) => (
          <AtmosphereItem key={item.id} item={item} index={idx} />
        ))}
        <div className="flex-shrink-0 w-20 md:w-60 h-full" />
      </div>

      <div className="absolute -bottom-10 left-0 flex items-center gap-6 group-hover/slider:translate-x-4 transition-transform duration-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-[1px] bg-amber-500/50" />
          <span className="text-stone-400 text-[9px] font-black uppercase tracking-[1em]">Slide to Experience</span>
        </div>
      </div>
    </div>
  );
};

// --- Magnetic Search Bar Component ---
const MagneticSearch: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.15);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.15);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: springX, y: springY }}
      className="relative w-full max-w-3xl mx-auto mb-32 group"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Find your city..."
          className="w-full bg-stone-900/60 backdrop-blur-3xl border border-white/10 rounded-full py-6 md:py-8 px-12 md:px-20 text-white text-base md:text-lg font-light tracking-[0.1em] placeholder-stone-500 focus:outline-none focus:border-amber-500/50 transition-all shadow-3xl"
        />
        <Search className="absolute left-4 md:left-8 text-amber-500/30 group-hover:text-amber-500 transition-colors" size={24} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-5 bg-amber-500 text-black p-5 rounded-full shadow-2xl hover:bg-amber-400 transition-colors"
        >
          <Navigation size={22} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- Sanctuary Card Component ---
const SanctuaryCard: React.FC<{ cafe: CafeLocation; index: number }> = ({ cafe, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set((e.clientY - centerY) / 20);
    rotateY.set((centerX - e.clientX) / 20);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-2000"
    >
      <motion.div
        style={{ rotateX: springRotateX, rotateY: springRotateY, scale: springScale, transformStyle: "preserve-3d" }}
        className="relative bg-[#1a1a1a] rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-amber-500/20 border border-white/5"
      >
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          <img
            src={cafe.image}
            alt={cafe.name}
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-80" />
          <SteamParticle />

          <div className="absolute top-8 right-8">
            <div className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] backdrop-blur-xl border flex items-center gap-2 ${cafe.isOpen
              ? 'bg-green-500/10 text-green-400 border-green-500/30'
              : 'bg-red-500/10 text-red-400 border-red-500/30'
              }`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${cafe.isOpen ? 'bg-green-400' : 'bg-red-400'}`} />
              {cafe.isOpen ? 'Living' : 'Resting'}
            </div>
          </div>

          <div className="absolute bottom-8 left-10 flex flex-col gap-1">
            <span className="text-amber-500 font-black tracking-[0.5em] uppercase text-[10px]">Territory</span>
            <span className="text-white font-serif italic text-2xl drop-shadow-xl">{cafe.city}</span>
          </div>
        </div>

        <div className="p-8 md:p-12" style={{ transform: "translateZ(50px)" }}>
          <h3 className="text-2xl md:text-4xl font-serif font-black text-white mb-6 group-hover:text-amber-500 transition-colors duration-500">
            {cafe.name}
          </h3>

          <div className="space-y-4 mb-12">
            <p className="text-stone-300 font-light text-sm leading-relaxed tracking-wide">
              {cafe.address}
            </p>
            <div className="flex items-center gap-3 py-2 border-y border-white/5">
              <Clock size={14} className="text-amber-500/50" />
              <span className="text-stone-400 text-[10px] font-black uppercase tracking-[0.3em]">Ritual: 08:00 — 23:00</span>
            </div>
          </div>

          <motion.button
            whileHover={{ x: 10 }}
            className="group/btn flex items-center gap-4 text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all"
          >
            Explore Sanctuary <ArrowRight size={16} className="text-amber-500 group-hover/btn:translate-x-2 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Cafes: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const cafes: CafeLocation[] = [
    { id: 1, name: 'MG Road Sanctuary', address: 'MG Road, Coffee Land', city: 'Chikkamagaluru', isOpen: true, image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1200' },
    { id: 2, name: 'Western Ghats Estate', address: 'Manjarabad Road, Sakleshpur', city: 'Hassan', isOpen: true, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200' },
    { id: 3, name: 'Stuart Hill Retreat', address: 'Madikeri Heights', city: 'Coorg', isOpen: false, image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1200" },
    { id: 4, name: 'Heritage Junction', address: 'BM Road, Hassan District', city: 'Hassan', isOpen: true, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200' },
    { id: 5, name: 'Baba Budan Reserve', address: 'Mullayanagiri Road', city: 'Chikkamagaluru', isOpen: true, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200' },
    { id: 6, name: 'Mudigere Mist', address: 'Kottigehara Crossing', city: 'Mudigere', isOpen: true, image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200' },
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 1.1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen pb-60 relative overflow-hidden selection:bg-amber-500 selection:text-black">
      {/* Custom Section Cursor */}
      <AnimatePresence>
        {isHoveringImage && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{ left: mousePos.x, top: mousePos.y }}
            className="fixed pointer-events-none z-[100] w-32 h-32 -mt-16 -ml-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mix-blend-difference hidden md:flex"
          >
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Explore</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-950/20 via-black to-black opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-soft-light" />

        {/* Animated Bokeh Circles */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 120, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-1/4 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Immersive Header Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1497933321021-949f373eb1f9?q=80&w=2400"
            className="w-full h-full object-cover brightness-[0.5]"
            alt="Cafe View"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-amber-500 text-[10px] font-black tracking-[0.8em] uppercase mb-12 shadow-2xl"
          >
            <Sparkles size={16} className="animate-pulse" /> The Global Reserves
          </motion.div>

          <h1 className="text-[16vw] md:text-[16vw] font-serif font-black text-white leading-none tracking-tighter mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
            SAN <span className="text-amber-500 italic font-light drop-shadow-none">C</span> TUARY
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[1px] w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mb-12"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-stone-300 text-base md:text-2xl font-light tracking-[0.3em] uppercase max-w-4xl mx-auto leading-relaxed px-4"
          >
            A Network of <span className="text-white italic">Atmospheric Wonders</span> Across the Globe
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-6"
        >
          <span className="text-[8px] font-black tracking-[1.5em] uppercase text-stone-400">Explore Locations</span>
          <div className="h-20 w-[1px] bg-gradient-to-b from-amber-500 to-transparent" />
        </motion.div>
      </section>

      <div className="max-w-[1700px] mx-auto px-4 md:px-12 relative z-20">

        {/* Flagship Immersive Experience */}
        <section className="mb-32 md:mb-60" onMouseEnter={() => setIsHoveringImage(true)} onMouseLeave={() => setIsHoveringImage(false)}>
          <LiquidReveal>
            <div className="relative h-[80vh] md:h-[90vh] w-full rounded-[4rem] md:rounded-[6rem] overflow-hidden group border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2400"
                className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[5s] ease-out brightness-[0.7]"
                alt="Flagship Exterior"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-32">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  viewport={{ once: true }}
                >
                  <span className="text-amber-500 font-black tracking-[0.8em] text-[10px] uppercase block mb-8">Selected Series • 01</span>
                  <h2 className="text-[12vw] md:text-[8vw] font-serif font-black text-white leading-[0.8] tracking-tighter mb-10">
                    Indiranagar <span className="text-stone-500 italic font-light drop-shadow-2xl">Heritage</span>
                  </h2>
                  <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16 md:border-l-2 md:border-amber-500/40 md:pl-16">
                    <p className="text-stone-300 text-base md:text-2xl font-light leading-relaxed max-w-2xl">
                      Our crown jewel. A sacred geometry of steel, wood, and the finest beans ever roasted.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      className="w-16 h-16 md:w-28 md:h-28 rounded-full border border-white/20 bg-white/5 backdrop-blur-3xl flex items-center justify-center hover:border-amber-500/50 transition-all"
                    >
                      <Sparkles className="text-amber-500" size={24} />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </LiquidReveal>
        </section>

        {/* Atmosphere Experience Slider */}
        <section className="mb-32 md:mb-60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-20 px-4">
            <div className="max-w-3xl">
              <span className="text-amber-500 font-black tracking-[0.5em] text-[11px] uppercase block mb-6">Visual Notes</span>
              <h2 className="text-5xl md:text-9xl font-serif font-black text-white italic tracking-tighter leading-none">
                The Rhythm<span className="text-amber-500">.</span>
              </h2>
            </div>
            <p className="text-stone-400 text-sm font-light tracking-widest max-w-sm uppercase leading-loose md:border-l md:border-white/10 md:pl-10 hidden lg:block">
              Each space is designed to resonate with a specific frequency of time and soul.
            </p>
          </div>
          <AtmosphereSlider />
        </section>

        {/* Discovery & Search Interaction */}
        <section className="py-20 border-y border-white/5 mb-60 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-amber-500/5 pointer-events-none blur-[100px]" />
          <h3 className="text-center text-stone-400 text-[10px] font-black tracking-[2em] uppercase mb-20 drop-shadow-2xl">Locate Your Nearest Sanctuary</h3>
          <MagneticSearch />
        </section>

        {/* Global Grid of Sanctuaries */}
        <section className="mb-60">
          <div className="flex items-center gap-10 mb-24">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-white/10" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">The Reserves</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 md:gap-x-20 gap-y-32 md:gap-y-48">
            {cafes.map((cafe, index) => (
              <SanctuaryCard key={cafe.id} cafe={cafe} index={index} />
            ))}
          </div>
        </section>

        {/* Community & Craft */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative h-[70vh] w-full rounded-[4rem] overflow-hidden mb-60 group border border-white/5"
        >
          <img
            src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1920"
            className="w-full h-full object-cover transition-all duration-[3s] group-hover:scale-105"
            alt="Gathering Space"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-10 md:px-32">
            <div className="max-w-2xl">
              <span className="text-amber-500 font-black tracking-[0.8em] text-[10px] uppercase block mb-8">Collective Rituals</span>
              <h2 className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-10">
                Beyond <span className="italic font-light text-stone-300">Coffee</span>
              </h2>
              <p className="text-stone-300 text-lg md:text-xl font-light leading-relaxed mb-12 border-l-2 border-amber-500/20 pl-8">
                Designed as communal sanctuaries where art, conversation, and artisan culture intersect. More than a cafe, it's a movement.
              </p>
              <button className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.5em] rounded-full hover:bg-amber-500 transition-colors">
                Our Philosophy
              </button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Cinematic Footer Section */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <Wind size={1000} className="text-white absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="space-y-12 px-4"
        >
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-20" />
          <h2 className="text-[14vw] md:text-[10vw] font-serif text-white/30 italic font-light tracking-tighter leading-none mb-4">
            Sanctuary awaits.
          </h2>
          <p className="text-stone-500 tracking-[1.5em] uppercase text-[9px] font-black mb-16">
            A Global Legacy Since '96
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#d97706", color: "#000" }}
            className="text-amber-500 text-[10px] font-black uppercase tracking-[0.8em] border border-amber-500/20 px-16 py-6 rounded-full transition-all bg-white/5 backdrop-blur-xl"
          >
            Become a Guardian
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Cafes;