import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Coffee, ShoppingBag, Trash2, User as UserIcon, LogOut, Lock, Sparkles } from 'lucide-react';
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
                CAFE<span className="text-amber-500 italic font-light drop-shadow-xl">A</span>ROMA
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
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-zinc-900 z-[110] shadow-3xl flex flex-col border-l border-white/5 p-12"
            >
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-3xl font-serif font-black text-white tracking-tight">The Cart.</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-stone-500 hover:text-white transition-colors">
                  <X size={32} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto space-y-10 scrollbar-hide">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Coffee size={80} className="text-white/5 mb-8" />
                    <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.5em]">No rituals selected yet</p>
                  </div>
                ) : (
                  cartItems.map(item => (
                    <motion.div layout key={item.id} className="flex gap-8 group">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 bg-stone-900">
                        <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={item.name} />
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-serif text-xl font-bold">{item.name}</h4>
                          <span className="text-amber-500 font-black text-sm">₹{item.price * item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-stone-400 text-[9px] font-black uppercase tracking-widest">Qty: {item.quantity}</span>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-500/50 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-16 pt-12 border-t border-white/5 space-y-8">
                  <div className="flex justify-between items-end">
                    <span className="text-stone-400 text-[10px] font-black uppercase tracking-widest">Total Value</span>
                    <span className="text-3xl font-serif font-black text-white">₹{cartTotal}</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => { setIsCartOpen(false); navigate('/cart'); }}
                      className="w-full py-6 border border-white/10 text-white rounded-full font-black uppercase tracking-[0.6em] text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-4"
                    >
                      REVIEW ARTIFACTS
                    </button>
                    <button
                      onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
                      className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.6em] text-[10px] hover:bg-amber-600 transition-all shadow-2xl flex items-center justify-center gap-4"
                    >
                      <Lock size={16} className="fill-current" /> SECURE CHECKOUT
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 lg:hidden bg-zinc-900 z-[100] flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/5">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4">
                <Coffee size={24} className="text-amber-500" />
                <span className="font-serif font-black text-xl text-white">CAFE AROMA</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>

            <div className="relative flex-grow flex flex-col justify-center p-12 overflow-hidden">
              {/* Cinematic Background for Mobile Menu */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
                  className="w-full h-full object-cover opacity-10 grayscale"
                  alt="Background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
              </div>

              <div className="relative z-10 flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl font-serif font-black text-white hover:text-amber-500 transition-colors tracking-tighter block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 pt-12 border-t border-white/5"
                >
                  {user ? (
                    <div className="space-y-6">
                      <p className="text-stone-400 text-xs font-black uppercase tracking-widest">{user.email}</p>
                      <button onClick={handleLogout} className="text-red-500 text-sm font-black uppercase tracking-widest">Dissolve Session</button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-xl font-black tracking-widest uppercase text-amber-500">
                      Sign In to Sanctuary
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>

            <div className="p-12 border-t border-white/5 text-center">
              <p className="text-[8px] tracking-[0.8em] text-stone-600 uppercase font-black">Est 1996 • Heritage Coffee</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;