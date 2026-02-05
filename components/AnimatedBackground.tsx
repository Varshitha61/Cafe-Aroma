import React, { useEffect } from 'react';
import { Coffee, Pizza, Utensils, Cloud } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ParallaxIcons: React.FC = () => {
    // Mouse position tracking for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 50 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position (-1 to 1)
            const xPct = (e.clientX / window.innerWidth) - 0.5;
            const yPct = (e.clientY / window.innerHeight) - 0.5;
            mouseX.set(xPct);
            mouseY.set(yPct);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Icons to display
    const icons = [Coffee, Pizza, Utensils, Cloud];

    // Generate particles with different parallax depths
    const particles = React.useMemo(() => {
        return [...Array(15)].map((_, i) => {
            const depth = Math.random() * 50 + 20; // Parallax depth factor
            return {
                id: i,
                Icon: icons[i % icons.length],
                size: Math.random() * 24 + 16,
                initialX: Math.random() * 100,
                initialY: Math.random() * 100,
                duration: Math.random() * 20 + 20,
                delay: Math.random() * 10,
                depth, // Store depth for usage in transform
            };
        });
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <ParallaxItem
                    key={p.id}
                    particle={p}
                    springX={springX}
                    springY={springY}
                />
            ))}
        </div>
    );
};

// Separate component to handle individual transforms efficiently
const ParallaxItem = ({ particle, springX, springY }: { particle: any, springX: any, springY: any }) => {
    const x = useTransform(springX, (val: number) => val * particle.depth); // Move based on mouse * depth
    const y = useTransform(springY, (val: number) => val * particle.depth);

    return (
        <motion.div
            className="absolute text-amber-900/40" // Increased opacity to 40%
            style={{
                top: `${particle.initialY}%`,
                left: `${particle.initialX}%`,
                x,
                y,
            }}
            animate={{
                y: [0, -30, 0], // Floating animation independent of parallax
                rotate: [0, 10, -10, 0],
            }}
            transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
            }}
        >
            <particle.Icon size={particle.size} strokeWidth={2} /> {/* Increased stroke width */}
        </motion.div>
    );
};

// Geometric shapes for added visual complexity
const GeometricShapes: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Rotating Dashed Circle - Top Right */}
            <motion.div
                className="absolute -top-20 -right-20 w-[400px] h-[400px] border border-dashed border-amber-900/8 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-10 right-10 w-[250px] h-[250px] border border-dotted border-coffee-800/6 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />

            {/* Rotating Dashed Circle - Bottom Left */}
            <motion.div
                className="absolute -bottom-32 -left-32 w-[500px] h-[500px] border border-dashed border-stone-800/6 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            />

            {/* Decorative Square - Middle Left */}
            <motion.div
                className="absolute top-1/3 left-[5%] w-16 h-16 border border-amber-500/8 rotate-45"
                animate={{ rotate: [45, 90, 45], scale: [1, 1.05, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Decorative Triangle - Middle Right */}
            <div className="absolute top-2/3 right-[10%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-amber-900/6 opacity-40 animate-float" style={{ animationDuration: '8s' }}></div>
        </div>
    );
};

const AnimatedBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Soft gradient base */}
            <div className="absolute inset-0 bg-[#fafaf9]"></div>

            {/* Grid Pattern - Very Subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            {/* Moving Blobs with CSS-defined colors */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-blob-1"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-blob-2"></div>
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] animate-blob-3"></div>
            <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] rounded-full blur-[110px] animate-blob-4"></div>

            <GeometricShapes />

            {/* Interactive Parallax Layer */}
            <ParallaxIcons />

            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]"></div>
        </div>
    );
};

export default AnimatedBackground;
