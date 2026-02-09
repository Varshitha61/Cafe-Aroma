import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Sparkles, Coffee } from 'lucide-react';

const CartItem: React.FC<{ item: any }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="group relative flex flex-col md:flex-row items-center gap-8 py-12 border-b border-white/5"
        >
            <div className="relative w-full md:w-48 h-64 md:h-48 rounded-3xl overflow-hidden flex-shrink-0 border border-white/10">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="flex-grow flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8">
                <div className="space-y-2">
                    <span className="text-amber-500 font-black tracking-[0.5em] text-[10px] uppercase block">
                        {item.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif font-black text-white group-hover:text-amber-500 transition-colors">
                        {item.name}
                    </h3>
                    <p className="text-stone-400 text-sm font-light italic leading-relaxed max-w-md">
                        {item.description}
                    </p>
                </div>

                <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-2">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Minus size={14} />
                        </motion.button>
                        <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Plus size={14} />
                        </motion.button>
                    </div>

                    <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-12">
                        <span className="text-2xl font-serif font-black text-white">₹{item.price * item.quantity}</span>
                        <motion.button
                            whileHover={{ scale: 1.1, color: '#ef4444' }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-500 transition-colors"
                        >
                            <Trash2 size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Cart: React.FC = () => {
    const { cartItems, cartTotal } = useCart();
    const navigate = useNavigate();

    const tax = Math.round(cartTotal * 0.05);
    const total = cartTotal + tax;

    return (
        <div className="min-h-screen bg-[#0a0908] pt-40 pb-60 px-4 md:px-12">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-24 border-b border-white/5 pb-20">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[9px] font-black tracking-[0.6em] uppercase mb-8"
                        >
                            <ShoppingBag size={12} /> The Vessel
                        </motion.div>
                        <h1 className="text-4xl sm:text-6xl md:text-9xl font-serif font-black text-white tracking-tighter leading-none">
                            Selected <span className="italic font-light text-stone-700">Artifacts.</span>
                        </h1>
                    </div>
                    <Link to="/shop" className="group flex items-center gap-6 text-stone-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.8em]">
                        Continue Pilgrimage <ArrowRight size={20} className="text-amber-500 group-hover:translate-x-4 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">

                    {/* Cart Items List */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="popLayout">
                            {cartItems.length > 0 ? (
                                cartItems.map(item => (
                                    <CartItem key={item.id} item={item} />
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-40 text-center flex flex-col items-center gap-12"
                                >
                                    <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center text-stone-800 border border-white/5">
                                        <Coffee size={48} />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-serif font-black text-white">Your vessel is empty.</h2>
                                        <p className="text-stone-500 font-light tracking-[0.3em] uppercase text-sm">Fill it with the gravity of the brew.</p>
                                    </div>
                                    <Link to="/shop" className="px-16 py-6 bg-white text-black font-black uppercase tracking-[0.6em] text-[10px] rounded-full hover:bg-amber-500 transition-all">
                                        Explore Collections
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Checkout Totals */}
                    <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit">
                        <div className="bg-white/5 border border-white/5 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 backdrop-blur-3xl relative overflow-hidden group">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] group-hover:bg-amber-500/10 transition-colors" />

                            <h2 className="text-4xl font-serif font-black text-white mb-12 tracking-tight">Summary</h2>

                            <div className="space-y-8 mb-16">
                                <div className="flex justify-between items-end">
                                    <span className="text-stone-400 text-[10px] font-black uppercase tracking-widest leading-none">Subtotal Ritual</span>
                                    <span className="text-xl font-medium">₹{cartTotal}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-stone-400 text-[10px] font-black uppercase tracking-widest leading-none">Sacred Tax</span>
                                        <span className="text-stone-600 text-[8px] uppercase tracking-widest">5% Applied</span>
                                    </div>
                                    <span className="text-xl font-medium">₹{tax}</span>
                                </div>
                                <div className="h-[1px] bg-white/10 w-full" />
                                <div className="flex justify-between items-end pt-4">
                                    <span className="text-amber-500 text-[11px] font-black uppercase tracking-[0.3em]">Total Gravity</span>
                                    <span className="text-4xl font-serif font-black">₹{total}</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/checkout')}
                                className="w-full py-8 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-[0.8em] text-[10px] rounded-[2rem] transition-all shadow-2xl flex items-center justify-center gap-4 group/btn"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Sanctuary <Sparkles size={16} className="group-hover/btn:animate-pulse" />
                            </motion.button>

                            <div className="mt-12 text-center">
                                <p className="text-[8px] text-stone-500 tracking-[0.4em] uppercase font-black leading-relaxed">
                                    Trusted by the global guild since '96. <br /> Secure artifacts guaranteed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggested Rituals (Upsell) */}
                {cartItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 md:mt-60"
                    >
                        <div className="flex items-center gap-10 mb-24">
                            <h2 className="text-4xl md:text-5xl font-serif font-black text-white whitespace-nowrap">Enhance the <span className="italic font-light text-stone-700">Ritual.</span></h2>
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                { name: 'Sacred Filters', price: 450, category: 'Apparatus', img: 'https://images.unsplash.com/photo-1544390150-13f5080072b2?w=800' },
                                { name: 'Ceramic Calyx', price: 890, category: 'Vessel', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800' },
                                { name: 'Midnight Scale', price: 2200, category: 'Precision', img: 'https://images.unsplash.com/photo-1517068827220-cf5514f8ad9d?w=800' },
                                { name: 'Bamboo Stirrer', price: 320, category: 'Motion', img: 'https://images.unsplash.com/photo-1521482772024-db08b89698d5?w=800' }
                            ].map((item, i) => (
                                <div key={i} className="group flex flex-col gap-6 cursor-pointer">
                                    <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/5 relative">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <button className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center translate-y-20 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                    <div className="px-4">
                                        <span className="text-amber-500 font-black tracking-[0.5em] text-[8px] uppercase">{item.category}</span>
                                        <h3 className="text-2xl font-serif font-black text-white">{item.name}</h3>
                                        <span className="text-stone-500 font-bold mt-2 block">₹{item.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Cart;
