import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Coffee, Sparkles, ArrowRight, ChevronRight, Zap, Coffee as CoffeeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBaristaResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

// --- Typewriter Effect Component ---
const TypewriterEffect: React.FC<{ text: string; speed?: number }> = ({ text, speed = 15 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

// --- Brew Atmosphere (New Immersive Background) ---
const BrewAtmosphere: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-black to-black opacity-60" />
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`aroma-${i}`}
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{
            y: [-20, -100],
            x: [0, (Math.random() - 0.5) * 30],
            opacity: [0, 0.2, 0],
            scale: [0.5, 1.2, 0.8]
          }}
          transition={{
            duration: 8 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
          className="absolute w-2 h-2 bg-amber-500/10 rounded-full blur-md"
          style={{ bottom: -20, left: `${20 + (i * 15)}%` }}
        />
      ))}
    </div>
  );
};

// --- Barista Work Pulsar ---
const BaristaPulse: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  return (
    <div className="flex items-center gap-1.5 h-6">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={isActive ? {
            height: [4, 12, 4],
            backgroundColor: ["#d97706", "#fde68a", "#d97706"]
          } : { height: 4, backgroundColor: "#333" }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          className="w-1 rounded-full"
        />
      ))}
    </div>
  );
};


// --- Product Suggestion Card ---
const ProductSuggestion: React.FC<{ product: ChatMessage['productPreview']; navigate: any }> = ({ product, navigate }) => {
  if (!product) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-stone-900/80 border border-white/5 rounded-3xl p-4 mt-2 hover:border-amber-500/30 transition-all cursor-pointer group shadow-2xl"
      onClick={() => navigate('/shop')}
    >
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <span className="text-white text-[11px] font-bold truncate">{product.name}</span>
          <span className="text-amber-500 font-mono text-[9px]">₹{product.price}</span>
          <p className="text-[8px] text-stone-500 mt-1 line-clamp-1 italic">"{product.lore}"</p>
        </div>
        <div className="flex items-center">
          <ArrowRight size={12} className="text-stone-700 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

// --- Checkout Trigger Card ---
const OrderProgressCard: React.FC<{ cartItems: any[]; navigate: any }> = ({ cartItems, navigate }) => {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (cartItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-600/10 border border-amber-500/20 rounded-3xl p-6 mt-4 backdrop-blur-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">Order Summary</span>
        <span className="text-white font-mono text-[11px]">₹{total}</span>
      </div>
      <div className="space-y-2 mb-6">
        {cartItems.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-[10px]">
            <span className="text-stone-400 italic truncate max-w-[150px]">{item.name}</span>
            <span className="text-amber-500/60">{item.quantity}x</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/checkout')}
        className="w-full py-4 bg-white text-black text-[9px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-amber-500 transition-all flex items-center justify-center gap-2 shadow-2xl"
      >
        Proceed to Payment <ChevronRight size={14} />
      </button>
    </motion.div>
  );
};

const VirtualBarista: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = "Hey";
    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 18) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";

    return `${timeGreeting}! I'm Aroma, your barista today. ☕ How's everything going? I'm ready to brew your favorites whenever you are.`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: getGreeting() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || inputValue;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getBaristaResponse(textToSend, messages.concat(userMsg));
      setMessages(prev => [...prev, {
        role: 'model',
        text: response.reply,
        redirectTo: response.redirectTo,
        productPreview: response.productPreview
      }]);

      if (response.redirectTo && !response.reply.includes('?')) {
        setTimeout(() => navigate(response.redirectTo!), 2000);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I lost my train of thought. Can you say that again?", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="bg-[#0c0a09] border border-white/10 w-80 sm:w-[400px] h-[600px] mb-6 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Status Bar */}
            <div className="bg-amber-600/5 px-8 py-2 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                <span className="text-[8px] font-black tracking-widest text-amber-500/60 uppercase">Sanctuary Connection: active</span>
              </div>
              <span className="text-[7px] font-mono text-stone-600">ST-2248</span>
            </div>

            {/* Header */}
            <div className="p-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center border border-white/10 text-amber-500 shadow-xl">
                    <CoffeeIcon size={24} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-stone-950" />
                </div>
                <div>
                  <h3 className="text-white font-serif font-black italic text-2xl tracking-tighter uppercase leading-none">Aroma</h3>
                  <p className="text-stone-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Master Barista</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide relative min-h-0">
              <BrewAtmosphere />

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                    <div className={`px-6 py-4 rounded-3xl text-[14px] leading-relaxed ${msg.role === 'user'
                      ? 'bg-amber-600 text-black font-semibold rounded-tr-none'
                      : 'bg-stone-900/80 border border-white/5 text-stone-100 rounded-tl-none font-light backdrop-blur-md'
                      }`}>
                      {msg.role === 'model' && i === messages.length - 1 && !isLoading ? (
                        <TypewriterEffect text={msg.text} />
                      ) : msg.text}
                    </div>
                    {msg.productPreview && <ProductSuggestion product={msg.productPreview} navigate={navigate} />}

                    {/* Show order summary if they mention payment-related topics */}
                    {msg.role === 'model' && cartItems.length > 0 &&
                      (msg.text.toLowerCase().includes('pay') ||
                        msg.text.toLowerCase().includes('bill') ||
                        msg.text.toLowerCase().includes('checkout') ||
                        msg.text.toLowerCase().includes('order')) && (
                        <OrderProgressCard cartItems={cartItems} navigate={navigate} />
                      )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start relative z-10">
                  <div className="bg-stone-900/50 border border-white/5 px-6 py-4 rounded-3xl rounded-tl-none">
                    <div className="flex items-center gap-4">
                      <CoffeeIcon size={16} className="text-amber-500 animate-bounce" />
                      <span className="text-[10px] text-amber-500/50 font-black uppercase tracking-[0.2em]">Barista is brewing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-8 pt-0 bg-transparent relative z-10">
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-4 flex flex-col gap-4 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[8px] font-black text-stone-600 uppercase tracking-widest">Aroma Status</span>
                  <BaristaPulse isActive={isLoading} />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Chat with Aroma..."
                    className="flex-1 bg-transparent text-white text-[14px] px-2 focus:outline-none placeholder-stone-600 font-light"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSend()}
                    disabled={isLoading || !inputValue.trim()}
                    className="w-12 h-12 bg-amber-600 text-black rounded-2xl flex items-center justify-center hover:bg-amber-500 transition-colors disabled:opacity-20"
                  >
                    <Send size={18} />
                  </motion.button>
                </div>

                {!isLoading && messages.length < 5 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
                    {['Menu?', 'Surprise me', 'Long day...', 'Recommend?'].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSend(s)}
                        className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-stone-500 hover:text-amber-500 hover:border-amber-500/50 transition-all whitespace-nowrap"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pb-8 text-center">
              <span className="text-[7px] text-stone-800 uppercase font-black tracking-[1em]">Handcrafted Since 1996</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setIsOpen(!isOpen); setShowNotification(false); }}
        className="w-20 h-20 bg-amber-600 text-black rounded-full shadow-[0_20px_50px_rgba(217,119,6,0.3)] flex items-center justify-center relative z-50 group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X size={32} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
              <CoffeeIcon size={32} />
              {showNotification && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-amber-600 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-ping" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default VirtualBarista;