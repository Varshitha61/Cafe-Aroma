import React, { useRef, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Coffee, Wind, Sun, Users, ArrowDown, Leaf, Droplets, ThermometerSun, Sparkles, MapPin, Zap } from 'lucide-react';

// --- Particle System for Atmosphere ---
const AtmosphereParticle: React.FC<{ index: number }> = ({ index }) => {
    const randomX = useMemo(() => Math.random() * 100, []);
    const randomY = useMemo(() => Math.random() * 100, []);
    const duration = useMemo(() => 10 + Math.random() * 20, []);
    const size = useMemo(() => 1 + Math.random() * 3, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 0.4, 0],
                y: [0, -400],
                x: [0, (Math.random() - 0.5) * 150],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "linear"
            }}
            style={{
                position: 'absolute',
                left: `${randomX}%`,
                top: `${randomY}%`,
                width: size,
                height: size,
            }}
            className="bg-amber-400/20 rounded-full blur-[1px] pointer-events-none"
        />
    );
};

// --- Magnetic Content Wrapper ---
const MagneticContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
            {children}
        </motion.div>
    );
};

// --- Animated Background Elements ---
const JourneyBackground: React.FC<{ progress: any }> = ({ progress }) => {
    const bgScale = useTransform(progress, [0, 1], [1.1, 1.5]);
    const bgRotate = useTransform(progress, [0, 1], [0, 5]);

    // Color shifts based on story chapters
    const bgColor = useTransform(
        progress,
        [0, 0.25, 0.5, 0.75, 1],
        ["#0c0a09", "#1c1917", "#292524", "#44403c", "#0c0a09"]
    );

    return (
        <motion.div
            style={{ backgroundColor: bgColor }}
            className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        >
            <motion.div
                style={{ scale: bgScale, rotate: bgRotate, opacity: 0.15 }}
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070')] bg-cover bg-center grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </motion.div>
    );
};

// --- The Heritage Story Component ---
const OurStory: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 30,
        damping: 20,
        restDelta: 0.001
    });

    const chapters = [
        {
            id: 'origin',
            label: 'The Foundation',
            year: '1996',
            title: 'Chikmagalur Sanctuary',
            description: 'In the high-altitude cradle of the Western Ghats, where the mist blankets the mountains at 4,200ft, our first beans were chosen.',
            subtext: 'Mineral-rich soil and ancient shade cover create the soul of every cherry.',
            icon: <Leaf className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e"
        },
        {
            id: 'alchemy',
            label: 'The Transformation',
            year: '2005',
            title: 'Roast Rituals',
            description: 'Fire meets cherry. Our roasters are alchemists, listening for the "first crack" as notes of citrus jasmine and smoked chocolate begin their dance.',
            subtext: 'Small-batch roasting ensures the thermodynamic integrity of every single origin.',
            icon: <ThermometerSun className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e"
        },
        {
            id: 'brewing',
            label: 'The Zenith',
            year: '2015',
            title: 'Precision Extraction',
            description: 'Every shot is a legacy. At exactly 9 bars of pressure, we transcend the liquid, capturing the high-density oils and complex VOCs of our signature blends.',
            subtext: 'The science of the pour meets the meditation of the barista.',
            icon: <Droplets className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
        },
        {
            id: 'legacy',
            label: 'The Future',
            year: '2026',
            title: 'Heritage Forward',
            description: 'Cafe Aroma is not just a place; it is a shared timeline. Your private morning thoughts and bustling business rituals are our narrative.',
            subtext: 'Brewing since 1996, and dreaming of the next millennium.',
            icon: <Users className="w-8 h-8" />,
            image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31"
        }
    ];

    return (
        <div ref={containerRef} className="relative bg-[#0c0a09] min-h-[500vh] selection:bg-amber-500 selection:text-black">
            <JourneyBackground progress={smoothProgress} />

            {/* Atmosphere Layer */}
            <div className="fixed inset-0 z-10 pointer-events-none opacity-40">
                {[...Array(50)].map((_, i) => <AtmosphereParticle key={i} index={i} />)}
            </div>

            {/* HUD: Scroll Progress (Heritage Meter) */}
            <div className="fixed left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-12 pointer-events-none">
                <div className="text-[10px] font-black tracking-[1em] text-amber-500/40 vertical-text uppercase">Timeline</div>
                <div className="relative h-64 md:h-96 w-[2px] bg-white/5 overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-amber-500 shadow-[0_0_20px_#d97706]"
                        style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                    />
                </div>
                <motion.div
                    className="text-[10px] font-black tracking-[0.5em] text-white"
                >
                    {useTransform(smoothProgress, p => `${Math.round(p * 100)}%`)}
                </motion.div>
            </div>

            {/* Hero Section */}
            <section className="relative z-20 h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl"
                >
                    <motion.div
                        className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-12"
                        whileHover={{ scale: 1.05, borderColor: 'rgba(217, 119, 6, 0.3)' }}
                    >
                        <Sparkles size={16} className="text-amber-500 animate-pulse" />
                        <span className="text-amber-500 text-[10px] font-black tracking-[0.8em] uppercase">Documentary Series</span>
                    </motion.div>

                    <h1 className="text-[14vw] md:text-[8vw] font-serif font-black text-white leading-none tracking-tighter mb-12">
                        THE <span className="text-amber-500 italic font-light drop-shadow-2xl font-sans">H</span>ERITAGE
                    </h1>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 400 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-16"
                    />

                    <p className="text-stone-300 text-lg md:text-3xl font-light tracking-[0.4em] uppercase leading-relaxed">
                        A Vertical Odyssey Through the <span className="text-white italic">Soul</span> of Coffee
                    </p>
                </motion.div>

                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0, 0.05], [0.6, 0]) }}
                    className="absolute bottom-12 flex flex-col items-center gap-6"
                >
                    <span className="text-[10px] font-black tracking-[1em] uppercase text-stone-500">Initiate Journey</span>
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                        <ArrowDown size={28} strokeWidth={1} className="text-amber-500/50" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Chapters Wrapper */}
            <div className="relative z-20 px-8 md:px-24">
                {chapters.map((chapter, index) => (
                    <ChapterSection
                        key={chapter.id}
                        chapter={chapter}
                        index={index}
                    />
                ))}
            </div>

            {/* Final Reflection */}
            <section className="relative z-20 h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-t from-black to-transparent">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl border border-white/5 bg-white/5 backdrop-blur-3xl p-20 rounded-[4rem] relative overflow-hidden group"
                >
                    <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px] group-hover:bg-amber-500/10 transition-colors duration-1000" />

                    <Coffee size={80} className="text-amber-500 mb-16 mx-auto stroke-thin" />

                    <h2 className="text-5xl md:text-8xl font-serif font-black text-white mb-12 tracking-tighter leading-tight">
                        Crafting Immortality, <br />One <span className="italic text-amber-500">Cup</span> at a Time.
                    </h2>

                    <p className="text-stone-400 text-lg md:text-xl font-light tracking-[0.3em] uppercase mb-20">
                        ESTABLISHED 1996 • CHIKMAGALUR
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, letterSpacing: "1.2em" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-6 bg-amber-600 text-white font-black tracking-[1em] uppercase text-[10px] rounded-full shadow-2xl transition-all duration-500"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Re-Init Story
                    </motion.button>
                </motion.div>

                <div className="absolute bottom-12 text-[8px] text-stone-600 tracking-[1.5em] uppercase font-black">
                    Cafe Aroma Documentary Series © 2026
                </div>
            </section>
        </div>
    );
};

const ChapterSection: React.FC<{ chapter: any; index: number }> = ({ chapter, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", once: false });

    return (
        <div ref={ref} className="min-h-screen flex items-center justify-center py-40">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20 lg:gap-32 w-full max-w-[1600px]`}>

                {/* Visual Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: index % 2 === 0 ? -100 : 100 }}
                    animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.8, x: index % 2 === 0 ? -100 : 100 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full lg:w-1/2 aspect-square md:aspect-video lg:aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden group shadow-3xl border border-white/10"
                >
                    <motion.img
                        animate={isInView ? { scale: 1.15 } : { scale: 1 }}
                        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                        src={chapter.image}
                        className="w-full h-full object-cover transition-transform duration-[3s]"
                        alt={chapter.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Floating Info Badge */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10"
                    >
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-amber-500/20 text-amber-500 rounded-2xl">
                                {chapter.icon}
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-[0.4em] text-amber-500 uppercase mb-1">{chapter.label}</div>
                                <div className="text-xl md:text-2xl font-serif font-bold text-white uppercase">{chapter.year} Protocol</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Textual Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <MagneticContent>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <div className="flex items-center gap-6 mb-12">
                                <span className="text-amber-500 font-serif italic text-4xl">0{index + 1}</span>
                                <div className="h-[1px] w-24 bg-amber-500/30" />
                                <span className="text-stone-500 text-[10px] font-black tracking-[0.8em] uppercase leading-none">Perspective</span>
                            </div>

                            <h2 className="text-6xl md:text-[7vw] font-serif font-black text-white leading-[0.85] tracking-tighter mb-12">
                                {chapter.title.split(' ').map((word: string, i: number) => (
                                    <span key={i} className={i === 1 ? "text-stone-500 italic font-light font-sans" : ""}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h2>

                            <div className="space-y-12 border-l-2 border-amber-500/10 pl-12">
                                <p className="text-stone-200 text-2xl md:text-3xl font-light leading-relaxed">
                                    {chapter.description}
                                </p>
                                <p className="text-stone-500 text-lg md:text-xl italic font-serif leading-relaxed">
                                    {chapter.subtext}
                                </p>
                            </div>

                            <motion.div
                                className="mt-20 flex gap-8"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-amber-500 mb-4">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="text-[8px] tracking-[0.3em] uppercase text-stone-600 font-bold">Location Bound</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-amber-500 mb-4">
                                        <Zap size={18} />
                                    </div>
                                    <span className="text-[8px] tracking-[0.3em] uppercase text-stone-600 font-bold">Kinetic Impact</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </MagneticContent>
                </div>

            </div>
        </div>
    );
};

export default OurStory;
