import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Coffee, ShoppingBag, Trash2, User as UserIcon, LogOut, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, Variants, useScroll, useTransform } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, cartTotal } = useCart();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ["rgba(10, 9, 8, 0)", "rgba(10, 9, 8, 0.9)"]);
  const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(20px)"]);
  const navBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]);

  // --- Side Effect: Lock Scroll ---
  useEffect(() => {
    if (isOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isCartOpen]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'HERITAGE', path: '/story' },
    { name: 'BOUTIQUE', path: '/shop' },
    { name: 'SANCTUARIES', path: '/cafes' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <motion.nav
      style={{ backgroundColor: navBg, backdropFilter: navBlur, borderBottom: `1px solid ${navBorder}` }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-28">

          <Link to="/" className="flex items-center gap-4 group">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.8 }} className="text-amber-500">
              <Coffee size={28} strokeWidth={1.5} />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-2xl tracking-tighter text-white leading-none">
                CAFE<span className="text-amber-500 italic font-light drop-shadow-xl font-sans">A</span>ROMA
              </span>
              <span className="text-[8px] tracking-[0.6em] text-stone-400 uppercase font-black">Heritage Est. 1996</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-16">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[10px] font-black tracking-[0.5em] transition-all duration-500 relative group/link ${isActive(link.path) ? 'text-amber-500' : 'text-stone-400 hover:text-white'
                  }`}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-[1px] bg-amber-500 origin-right"
                  initial={false}
                  animate={{ scaleX: isActive(link.path) ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* User Access */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 text-white group"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
                      <UserIcon size={18} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-6 w-64 bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-3xl text-white"
                      >
                        <div className="text-[9px] font-black tracking-widest text-stone-400 uppercase mb-4">Account Presence</div>
                        <div className="text-sm font-bold mb-6 border-b border-white/5 pb-4">{user.email}</div>
                        <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 text-[10px] font-black uppercase tracking-widest hover:text-red-300 transition-colors">
                          <LogOut size={14} /> Dissolve Session
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="text-[10px] font-black tracking-[0.4em] text-white hover:text-amber-500 transition-colors uppercase">
                  Sign In
                </Link>
              )}
            </div>

            {/* Cart Presence */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
            >
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 rounded-full text-[10px] font-black flex items-center justify-center">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </motion.button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-white w-12 h-12 flex items-center justify-center"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Side Cart Drawer */}
      <AnimatePresence mode="wait">
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 40, stiffness: 400 }}
              className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-zinc-950/40 backdrop-blur-3xl z-[110] shadow-3xl flex flex-col border-l border-white/10 p-8 md:p-16"
            >
              <div className="flex justify-between items-center mb-16">
                <div>
                  <h3 className="text-4xl md:text-5xl font-serif font-black text-white tracking-tighter">THE CART</h3>
                  <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.5em] mt-2">Selection of Rituals</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-stone-500 hover:text-white hover:bg-white/5 transition-all">
                  <X size={32} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto space-y-12 scrollbar-hide pr-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Coffee size={80} className="text-white/5 mb-8" />
                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.5em]">No rituals selected yet</p>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <motion.div layout key={item.id} className="flex gap-8 group items-center">
                      <div className="w-32 h-32 rounded-[2rem] overflow-hidden flex-shrink-0 bg-stone-900 border border-white/5">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={item.name} />
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-serif text-2xl font-bold tracking-tight">{item.name}</h4>
                          <span className="text-amber-500 font-black text-lg">₹{item.price * item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center gap-4 bg-white/5 rounded-full px-4 py-2 border border-white/5">
                            <span className="text-stone-400 text-[10px] font-black uppercase tracking-widest">Qty</span>
                            <span className="text-white font-bold text-sm">{item.quantity}</span>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 rounded-full flex items-center justify-center text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-16 pt-12 border-t border-white/10 space-y-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-stone-400 text-[10px] font-black uppercase tracking-[0.3em]">Total Value</span>
                      <p className="text-sm text-stone-600 font-black uppercase tracking-widest">Inclusive of heritage taxes</p>
                    </div>
                    <span className="text-5xl font-serif font-black text-white">₹{cartTotal}</span>
                  </div>
                  <div className="flex flex-col gap-6">
                    <button
                      onClick={() => { setIsCartOpen(false); navigate('/cart'); }}
                      className="w-full py-8 border border-white/10 text-white rounded-full font-black uppercase tracking-[0.6em] text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-4"
                    >
                      REVIEW ARTIFACTS
                    </button>
                    <button
                      onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                      className="w-full py-8 bg-amber-600 text-black rounded-full font-black uppercase tracking-[0.6em] text-[10px] hover:bg-amber-500 transition-all shadow-3xl flex items-center justify-center gap-4 group"
                    >
                      <Lock size={16} className="fill-current group-hover:scale-110 transition-transform" /> SECURE CHECKOUT
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Nav Sidebar (Fixed & Refined) */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 40, stiffness: 400 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[450px] lg:hidden bg-zinc-950/80 backdrop-blur-3xl z-[110] flex flex-col border-r border-white/10"
            >
              <div className="p-12 flex justify-between items-center border-b border-white/5">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4">
                  <Coffee size={28} className="text-amber-500" />
                  <div className="flex flex-col">
                    <span className="font-serif font-black text-xl text-white tracking-widest">CAFE AROMA</span>
                    <span className="text-[6px] tracking-[0.5em] text-stone-500 uppercase font-black">Sanctuary Menu</span>
                  </div>
                </Link>
                <button onClick={() => setIsOpen(false)} className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="relative flex-grow flex flex-col justify-center p-12 overflow-hidden">
                {/* Cinematic Background for Mobile Menu */}
                <div className="absolute inset-0 z-0 opacity-20">
                  <img
                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
                    className="w-full h-full object-cover grayscale"
                    alt="Background"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950" />
                </div>

                <div className="relative z-10 flex flex-col gap-12">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-6xl font-serif font-black tracking-tighter block transition-all ${isActive(link.path) ? 'text-amber-500' : 'text-white hover:text-amber-500'
                          }`}
                      >
                        {link.name}
                      </Link>
                      {isActive(link.path) && (
                        <motion.div layoutId="mobileActive" className="h-1 w-20 bg-amber-500 mt-2" />
                      )}
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 pt-12 border-t border-white/10"
                  >
                    {user ? (
                      <div className="space-y-8">
                        <div>
                          <p className="text-stone-500 text-[9px] font-black uppercase tracking-[0.4em] mb-2">Connected as</p>
                          <p className="text-white text-lg font-bold">{user.email}</p>
                        </div>
                        <button onClick={handleLogout} className="px-8 py-4 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-red-500/10 transition-all">
                          Dissolve Session
                        </button>
                      </div>
                    ) : (
                      <Link to="/login" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-4 text-xl font-black tracking-[0.3em] uppercase text-amber-500 group">
                        Sign In to Sanctuary <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>

              <div className="p-12 border-t border-white/5 bg-zinc-950/20">
                <p className="text-[8px] tracking-[1em] text-stone-700 uppercase font-black text-center">Est 1996 • Heritage Coffee</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;