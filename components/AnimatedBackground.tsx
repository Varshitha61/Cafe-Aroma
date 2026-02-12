import React, { useEffect } from 'react';
import { Coffee, Pizza, Utensils, Cloud } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ParallaxIcons: React.FC = () => {
    // Mouse position tracking for parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 30, stiffness: 60 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Only run on desktop and only if window is focused
            if (window.innerWidth < 1024) return;

            const xPct = (e.clientX / window.innerWidth) - 0.5;
            const yPct = (e.clientY / window.innerHeight) - 0.5;
            mouseX.set(xPct);
            mouseY.set(yPct);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Icons to display
    const icons = [Coffee, Utensils, Cloud];

    // Generate fewer particles with different parallax depths
    const particles = React.useMemo(() => {
        return [...Array(8)].map((_, i) => {
            const depth = Math.random() * 30 + 10;
            return {
                id: i,
                Icon: icons[i % icons.length],
                size: Math.random() * 20 + 16,
                initialX: Math.random() * 100,
                initialY: Math.random() * 100,
                duration: Math.random() * 15 + 15,
                delay: Math.random() * 5,
                depth,
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
    const x = useTransform(springX, (val: number) => val * particle.depth);
    const y = useTransform(springY, (val: number) => val * particle.depth);

    return (
        <motion.div
            className="absolute text-amber-900/20"
            style={{
                top: `${particle.initialY}%`,
                left: `${particle.initialX}%`,
                x,
                y,
                willChange: "transform",
            }}
            animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
                delay: particle.delay,
            }}
        >
            <particle.Icon size={particle.size} strokeWidth={1.5} />
        </motion.div>
    );
};

// Geometric shapes for added visual complexity
const GeometricShapes: React.FC = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
            {/* Rotating Dashed Circle - Top Right */}
            <motion.div
                className="absolute -top-20 -right-20 w-[300px] h-[300px] border border-dashed border-amber-900/5 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
            />

            {/* Rotating Dashed Circle - Bottom Left */}
            <motion.div
                className="absolute -bottom-32 -left-32 w-[400px] h-[400px] border border-dashed border-stone-800/5 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
            />
        </div>
    );
};

const AnimatedBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#fafaf9]">
            {/* Grid Pattern - Very Subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:64px_64px]"></div>

            {/* Moving Blobs with CSS-defined colors - Optimized blur */}
            <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full blur-[80px] animate-blob-1 opacity-40"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[80px] animate-blob-2 opacity-40"></div>

            <GeometricShapes />
            <ParallaxIcons />

            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]"></div>
        </div>
    );
};


export default AnimatedBackground;
