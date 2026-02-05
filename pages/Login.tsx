import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Lock, ArrowRight, Mail, User as UserIcon, Sparkles, Wind, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to the page they were trying to visit, or home
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Mock Authentication Logic
    const displayName = isLogin ? email.split('@')[0] : name;
    login(email, displayName);
    navigate(from, { replace: true });
  };

  // Magnetic effect for the form container
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.05);
    y.set((e.clientY - centerY) * 0.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center py-20 px-4 selection:bg-amber-500 selection:text-black">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2 }}
          src="https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=2400"
          alt="Coffee Heritage"
          className="w-full h-full object-cover grayscale-[30%] brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-soft-light" />

        {/* Animated Bokeh */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className="relative z-10 w-full max-w-xl group"
      >
        {/* Card Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-3xl text-white relative overflow-hidden"
        >
          {/* Header */}
          <div className="text-center mb-12 space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-black tracking-[0.6em] uppercase"
            >
              <Sparkles size={14} className="animate-spin-slow" /> {isLogin ? 'Welcome Back' : 'Join the Order'}
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-serif font-black text-white mb-2 tracking-tight">
              {isLogin ? 'Sign In' : 'Join the Guild'}
            </h1>
            <p className="text-stone-300 text-[9px] font-black uppercase tracking-[0.4em]">
              {isLogin ? 'Welcome back to the sanctuary' : 'Begin your coffee pilgrimage'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {!isLogin && (
                  <div className="relative group/field">
                    <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within/field:text-amber-500 transition-colors" size={20} />
                    <input
                      type="text"
                      required={!isLogin}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-16 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all"
                      placeholder="FULL NAME"
                    />
                  </div>
                )}

                <div className="relative group/field">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within/field:text-amber-500 transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all placeholder-stone-500"
                    placeholder="AROMA EMAIL ADDRESS"
                  />
                </div>

                <div className="relative group/field">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within/field:text-amber-500 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-16 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all"
                    placeholder="PASSWORD"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-600 hover:text-amber-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-[10px] font-black uppercase tracking-[0.2em] text-center bg-red-500/10 border border-red-500/20 py-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#d97706", color: "#000" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl transition-all shadow-xl flex items-center justify-center gap-4 group/btn overflow-hidden relative"
            >
              <span className="relative z-10">{isLogin ? 'Enter Sanctuary' : 'Reserve Spot'}</span>
              <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-stone-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors pb-1 border-b border-transparent hover:border-amber-500"
              >
                {isLogin ? "No presence yet? Create one" : "Already exist? Enter Ritual"}
              </button>
            </div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="opacity-20"
            >
              <Wind size={40} className="text-white" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <Coffee size={800} className="text-white absolute -top-1/4 -left-1/4 rotate-12" />
        <Sparkles size={400} className="text-white absolute -bottom-1/4 -right-1/4 -rotate-12" />
      </div>
    </div>
  );
};

export default Login;