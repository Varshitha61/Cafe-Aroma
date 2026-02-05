import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Award, Clock, MapPin, Instagram, Sparkles, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const SectionReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="flex flex-col w-full bg-[#0a0908] overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80"
            alt="Hero Coffee"
            className="w-full h-full object-cover brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-amber-500 text-[10px] font-black tracking-[0.8em] uppercase mb-12"
          >
            <Sparkles size={14} className="animate-pulse" /> Est. 1996
          </motion.div>

          <h1 className="text-[12vw] md:text-[8vw] font-serif font-black text-white leading-none tracking-tighter mb-8 drop-shadow-2xl">
            MOMENTS <span className="text-amber-500 italic font-light">Brewed</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-stone-300 text-lg md:text-2xl font-light tracking-[0.3em] uppercase max-w-3xl mb-12"
          >
            Artisanal perfection in every single <span className="text-white italic">drop</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col md:flex-row gap-6"
          >
            <Link to="/shop" className="px-12 py-5 bg-amber-600 text-black font-black uppercase tracking-[0.5em] text-[10px] rounded-full hover:bg-amber-500 transition-all shadow-[0_0_30px_rgba(217,119,6,0.2)]">
              Order Ritual
            </Link>
            <Link to="/cafes" className="px-12 py-5 border border-white/20 bg-white/5 backdrop-blur-md text-white font-black uppercase tracking-[0.5em] text-[10px] rounded-full hover:bg-white hover:text-black transition-all">
              Find Sanctuary
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-4 text-stone-400"
        >
          <span className="text-[8px] font-black tracking-[1em] uppercase">Begin Experience</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* Features Banner */}
      <section className="py-32 bg-zinc-900 overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {[
            { icon: Coffee, label: '100% Arabica', desc: 'Sourced from the clouds of Chikmagalur.' },
            { icon: Award, label: 'Artisan Grade', desc: 'Crafted by master roasters since 96.' },
            { icon: Clock, label: 'Fresh Ritual', desc: 'Roasted in small batches daily.' },
            { icon: MapPin, label: '1500+ Havens', desc: 'Global presence, local soul.' }
          ].map((feature, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center group cursor-default">
                <div className="w-20 h-20 rounded-[2rem] bg-stone-800 flex items-center justify-center text-amber-500 mb-8 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 border border-white/5">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-serif font-black mb-4 tracking-tight">{feature.label}</h3>
                <p className="text-stone-400 font-light text-sm tracking-widest uppercase leading-loose">{feature.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Discover Menu Grid */}
      <section className="py-24 md:py-60 px-4 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16 md:mb-32">
          <div className="max-w-2xl">
            <span className="text-amber-500 font-black tracking-[0.5em] text-[10px] uppercase block mb-6">The Catalog</span>
            <h2 className="text-6xl md:text-9xl font-serif font-black text-white leading-none tracking-tighter">
              Discover the <span className="italic font-light text-stone-500">Art.</span>
            </h2>
          </div>
          <Link to="/shop" className="group flex items-center gap-6 text-white text-[10px] font-black uppercase tracking-[0.8em]">
            Full Collections <ArrowRight size={20} className="text-amber-500 group-hover:translate-x-4 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            { title: 'Signature Brews', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200' },
            { title: 'Gourmet Eats', img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200' },
            { title: 'Home Brewing', img: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=1200' }
          ].map((item, i) => (
            <SectionReveal key={i} delay={i * 0.15}>
              <Link to="/shop" className="block relative h-[700px] rounded-[4rem] overflow-hidden group border border-white/5">
                <img
                  src={item.img}
                  alt={item.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200';
                  }}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-out brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 flex flex-col justify-end p-16">
                  <h3 className="text-4xl md:text-5xl font-serif font-black text-white mb-8 tracking-tighter">{item.title}</h3>
                  <div className="w-12 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-700" />
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Seasonal Rituals Section */}
      <section className="py-24 md:py-60 bg-black overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24 mb-32">
            <div className="w-full lg:w-1/3">
              <span className="text-amber-500 font-black tracking-[0.5em] text-[10px] uppercase block mb-6">Limited Edition</span>
              <h2 className="text-5xl md:text-8xl font-serif font-black text-white leading-[0.85] tracking-tighter mb-12">
                Seasonal <span className="italic font-light text-stone-500">Artifacts.</span>
              </h2>
              <p className="text-stone-400 text-base md:text-lg font-light leading-relaxed mb-16 max-w-md">
                Experience calculations of flavor that only exist for a fleeting moment in time.
              </p>
              <Link to="/shop" className="group flex items-center gap-6 text-white text-[10px] font-black uppercase tracking-[0.8em]">
                View All Rituals <ArrowRight size={20} className="text-amber-500 group-hover:translate-x-4 transition-transform" />
              </Link>
            </div>

            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { name: 'Midnight Crimson Frappé', price: 345, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800' },
                { name: 'Amber Smoked Latte', price: 295, img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -20 }}
                  className="group relative h-[600px] rounded-[4rem] overflow-hidden border border-white/5"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800';
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <h3 className="text-3xl font-serif font-black text-white mb-2">{item.name}</h3>
                    <span className="text-amber-500 font-bold mb-8">₹{item.price}</span>
                    <Link to="/shop" className="w-full py-6 bg-white/5 backdrop-blur-md border border-white/10 text-white text-center text-[9px] font-black uppercase tracking-widest rounded-2xl hover:bg-amber-600 hover:text-black transition-all">
                      Add to Ritual
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Club Section */}
      <section className="py-24 md:py-60 bg-zinc-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Coffee size={800} className="absolute top-0 right-0 translate-x-1/2 -rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 md:gap-32">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-amber-500/10 rounded-[5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="aspect-[4/5] md:aspect-video lg:aspect-square overflow-hidden rounded-[2rem] md:rounded-[4rem] bg-stone-900">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80"
                alt="Cafe Aroma Membership"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200';
                }}
                className="relative z-10 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-amber-500 font-black tracking-[0.8em] text-[10px] uppercase block mb-10">Exclusive Access</span>
            <h2 className="text-4xl md:text-8xl font-serif font-black text-white leading-tight tracking-tighter mb-10">
              The Aroma <span className="italic font-light">Order.</span>
            </h2>
            <p className="text-stone-300 text-base md:text-2xl font-light leading-relaxed mb-16 md:border-l-2 md:border-amber-500/20 md:pl-10">
              Join the guild of coffee connoisseurs. Skip the rituals, earn sacred beans, and unlock vault experiences.
            </p>
            <button className="w-full md:w-auto px-16 py-6 bg-white text-black font-black uppercase tracking-[0.6em] text-[10px] rounded-full hover:bg-amber-500 transition-all">
              Initiate Membership
            </button>
          </div>
        </div>
      </section>

      {/* Social Gallery */}
      <section className="py-24 md:py-60 px-4 md:px-12 max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16 md:mb-32 border-b border-white/5 pb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight">The Collective Spirit</h2>
          <Link to="#" className="flex items-center gap-4 text-stone-400 hover:text-amber-500 transition-all font-black uppercase text-[10px] tracking-widest">
            <Instagram size={20} /> @CAFEAROMA
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[
            'https://images.unsplash.com/photo-1507133750040-4a8f5700e35f?w=800',
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800',
            'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=800',
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800'
          ].map((img, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/5 group">
                <img
                  src={img}
                  alt="Social"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800';
                  }}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;