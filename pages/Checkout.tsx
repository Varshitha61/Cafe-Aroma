import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShieldCheck, CreditCard, MapPin, Truck, Lock, CheckCircle, ArrowLeft, Sparkles, Wind, Coffee, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'verifying' | 'success'>('details');
  const [activeTab, setActiveTab] = useState<'shipping' | 'payment'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const tax = Math.round(cartTotal * 0.05);
  const shipping = cartTotal > 500 ? 0 : 50;
  const grandTotal = cartTotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 16);
    val = val.replace(/(\d{4})/g, '$1 ').trim();
    setFormData(prev => ({ ...prev, cardNumber: val }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setFormData(prev => ({ ...prev, expiry: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Phase 1: Initial Processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('verifying');

    // Phase 2: Detailed Verification
    const duration = 4000;
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, interval));
      setVerificationProgress(Math.min(i * increment, 100));
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep('success');
    clearCart();
  };

  if (!user) {
    return <Navigate to="/login" state={{ from: { pathname: '/checkout' } }} />;
  }

  if (cartItems.length === 0 && step === 'details') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
          <Coffee size={80} className="text-amber-500/20 mx-auto" />
          <h2 className="text-4xl font-serif font-black tracking-tight">Your Vessel is Empty</h2>
          <Link to="/shop" className="inline-block px-10 py-4 bg-amber-600 text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-amber-500 transition-all">Begin Selection</Link>
        </motion.div>
      </div>
    );
  }

  if (step === 'verifying') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full border-dashed"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center relative z-10"
        >
          <div className="mb-12 relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border-t-2 border-r-2 border-amber-500 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck size={40} className="text-amber-500 animate-pulse" />
            </div>
          </div>

          <h2 className="text-4xl font-serif font-black text-white mb-6 uppercase tracking-widest">Verifying Ritual</h2>
          <p className="text-stone-500 text-xs uppercase tracking-[0.5em] mb-12 font-black">Authenticating Sacred Transfer...</p>

          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-8 border border-white/5">
            <motion.div
              className="h-full bg-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${verificationProgress}%` }}
            />
          </div>

          <div className="flex flex-col gap-4 text-[10px] uppercase font-black tracking-[0.3em]">
            <span className={verificationProgress > 20 ? "text-green-500 transition-colors" : "text-stone-700"}>
              {verificationProgress > 20 ? "✓ Encryption Secured" : "• SECURING ENCRYPTION"}
            </span>
            <span className={verificationProgress > 50 ? "text-green-500 transition-colors" : "text-stone-700"}>
              {verificationProgress > 50 ? "✓ Transfer Authenticated" : "• AUTHENTICATING TRANSFER"}
            </span>
            <span className={verificationProgress > 80 ? "text-green-500 transition-colors" : "text-stone-700"}>
              {verificationProgress > 80 ? "✓ Manifest Synced" : "• SYNCING MANIFEST"}
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Ritual Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-500/10 rounded-full"
          />
          <Wind size={800} className="text-white/15 absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3" />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-zinc-900/80 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-2xl w-full text-center border border-white/10 rounded-[4rem] p-12 md:p-24 relative z-10 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-500/20 relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-green-500/20 rounded-full"
            />
            <CheckCircle className="h-12 w-12 text-green-500 relative z-10" />
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-black text-white mb-6 tracking-tighter">Manifest secured.</h2>
          <p className="text-stone-300 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md mx-auto">
            The ritual has begun. Our master baristas are channeling the essence into your selection.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <span className="block text-[8px] uppercase tracking-[0.3em] text-stone-500 mb-2">Tracking Ritual</span>
              <span className="text-white font-mono text-xs uppercase">#{Math.floor(Math.random() * 1000000)}</span>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
              <span className="block text-[8px] uppercase tracking-[0.3em] text-stone-500 mb-2">Arrival Aura</span>
              <span className="text-white font-mono text-xs uppercase px-2 font-black">~25 MIN</span>
            </div>
          </div>

          <Link
            to="/"
            className="group relative inline-block w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.6em] text-[10px] overflow-hidden transition-all shadow-2xl"
          >
            <motion.div
              className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
            />
            <span className="relative z-10">Return to Sanctuary</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20 pb-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Progress Tracker */}
        <div className="max-w-4xl mx-auto mb-20 px-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2" />
            <div className={`absolute top-1/2 left-0 h-[2px] bg-amber-500 -translate-y-1/2 transition-all duration-700 ${activeTab === 'shipping' ? 'w-0' : 'w-full'}`} />

            {[
              { id: 'shipping', label: 'Preparation', icon: MapPin },
              { id: 'payment', label: 'Sacred Transfer', icon: CreditCard },
              { id: 'finalize', label: 'Manifestation', icon: Sparkles },
            ].map((s, idx) => {
              const Icon = s.icon;
              const isActive = (s.id === 'shipping' && activeTab === 'shipping') ||
                (s.id === 'payment' && activeTab === 'payment');
              const isPast = (s.id === 'shipping' && activeTab === 'payment');

              return (
                <div key={idx} className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${isActive ? 'bg-amber-600 border-amber-600 shadow-[0_0_20px_rgba(217,119,6,0.4)] scale-110' :
                    isPast ? 'bg-green-600 border-green-600' : 'bg-zinc-900 border-white/5'
                    }`}>
                    {isPast ? <CheckCircle size={20} className="text-white" /> : <Icon size={20} className={isActive ? 'text-black' : 'text-stone-600'} />}
                  </div>
                  <span className={`text-[8px] uppercase tracking-[0.3em] font-black transition-colors ${isActive ? 'text-white' : 'text-stone-600'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">

              {/* Shipping Section */}
              <motion.div
                initial={false}
                animate={{ opacity: activeTab === 'shipping' ? 1 : 0.4, filter: activeTab === 'shipping' ? 'blur(0)' : 'blur(2px)' }}
                className="bg-zinc-950/40 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/5 relative group"
                onClick={() => activeTab !== 'shipping' && setActiveTab('shipping')}
              >
                <div className={`absolute inset-0 bg-amber-500/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${activeTab === 'shipping' ? 'opacity-100' : ''}`} />
                <h2 className="text-2xl font-serif font-black text-white mb-10 flex items-center gap-4 tracking-tight relative z-10">
                  <MapPin size={24} className="text-amber-500" /> Destination
                </h2>
                <div className="space-y-6 relative z-10">
                  <div className="relative group/input">
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="FULL TERRITORY ADDRESS"
                      onFocus={() => setActiveTab('shipping')}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-6 px-8 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all"
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-amber-500 group-focus-within/input:w-full transition-all duration-500" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group/input">
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        placeholder="CITY"
                        onChange={handleInputChange}
                        onFocus={() => setActiveTab('shipping')}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-6 px-8 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                    <div className="relative group/input">
                      <input
                        type="text"
                        name="zip"
                        required
                        pattern="[0-9]*"
                        maxLength={6}
                        placeholder="POSTAL CODE"
                        value={formData.zip}
                        onChange={handleInputChange}
                        onFocus={() => setActiveTab('shipping')}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-6 px-8 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {activeTab === 'shipping' && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setActiveTab('payment'); }}
                    className="mt-12 w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    Continue to Payment <ArrowLeft size={16} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                )}
              </motion.div>

              {/* Payment Section */}
              <motion.div
                initial={false}
                animate={{ opacity: activeTab === 'payment' ? 1 : 0.4, filter: activeTab === 'payment' ? 'blur(0)' : 'blur(2px)' }}
                className="bg-zinc-950/40 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-white/5 relative group"
                onClick={() => activeTab !== 'payment' && setActiveTab('payment')}
              >
                <div className={`absolute inset-0 bg-amber-500/5 rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${activeTab === 'payment' ? 'opacity-100' : ''}`} />
                <h2 className="text-2xl font-serif font-black text-white mb-10 flex items-center gap-4 tracking-tight relative z-10">
                  {paymentMethod === 'card' ? <CreditCard size={24} className="text-amber-500" /> : <QrCode size={24} className="text-amber-500" />} Treasury Transfer
                </h2>

                <div className="mb-10 flex gap-4 relative z-10">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setPaymentMethod('card'); }}
                    className={`flex-1 py-4 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all ${paymentMethod === 'card'
                      ? 'bg-amber-600 text-black shadow-[0_4px_20px_rgba(217,119,6,0.3)]'
                      : 'border border-white/5 text-stone-400 hover:bg-white/5'
                      }`}
                  >
                    Credit / Debit Path
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setPaymentMethod('qr'); }}
                    className={`flex-1 py-4 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all ${paymentMethod === 'qr'
                      ? 'bg-amber-600 text-black shadow-[0_4px_20px_rgba(217,119,6,0.3)]'
                      : 'border border-white/5 text-stone-400 hover:bg-white/5'
                      }`}
                  >
                    Digital Rituals
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {paymentMethod === 'card' ? (
                    <motion.div
                      key="card-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8 relative z-10"
                    >
                      {/* Visual Card Preview */}
                      <div className="relative h-56 w-full rounded-3xl bg-gradient-to-br from-amber-600/20 to-zinc-800/20 border border-white/10 p-8 flex flex-col justify-between overflow-hidden mb-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="flex justify-between items-start">
                          <Coffee size={32} className="text-amber-500/40" />
                          <div className="flex gap-2">
                            <div className="w-10 h-8 bg-white/5 rounded-md" />
                            <div className="w-10 h-8 bg-white/[0.02] rounded-md" />
                          </div>
                        </div>
                        <div>
                          <p className="text-stone-500 text-[8px] uppercase tracking-[0.3em] mb-2 font-black">Sacred Sigil Number</p>
                          <p className="text-white font-mono text-xl tracking-widest">
                            {formData.cardNumber || "•••• •••• •••• ••••"}
                          </p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-stone-500 text-[8px] uppercase tracking-[0.3em] mb-1 font-black">Bearer</p>
                            <p className="text-white text-[10px] uppercase tracking-widest font-black truncate max-w-[150px]">
                              {formData.cardName || "IDENTIFIED SOUL"}
                            </p>
                          </div>
                          <div>
                            <p className="text-stone-500 text-[8px] uppercase tracking-[0.3em] mb-1 font-black">Cycle</p>
                            <p className="text-white text-[10px] uppercase tracking-widest font-black">
                              {formData.expiry || "MM/YY"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="relative group/input">
                          <input
                            type="text"
                            name="cardName"
                            required={paymentMethod === 'card'}
                            placeholder="CARDHOLDER IDENTITY"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            onFocus={() => setActiveTab('payment')}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-6 px-8 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all"
                          />
                        </div>
                        <div className="relative group/input">
                          <input
                            type="text"
                            name="cardNumber"
                            required={paymentMethod === 'card'}
                            placeholder="0000 0000 0000 0000"
                            value={formData.cardNumber}
                            onChange={handleCardNumberChange}
                            onFocus={() => setActiveTab('payment')}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-6 px-8 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all font-mono"
                          />
                          <Lock size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within/input:text-amber-500 transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <input
                            type="text"
                            name="expiry"
                            required={paymentMethod === 'card'}
                            placeholder="MM/YY"
                            maxLength={5}
                            value={formData.expiry}
                            onChange={handleExpiryChange}
                            onFocus={() => setActiveTab('payment')}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-6 px-8 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all text-center"
                          />
                          <input
                            type="password"
                            name="cvv"
                            required={paymentMethod === 'card'}
                            maxLength={3}
                            placeholder="•••"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            onFocus={() => setActiveTab('payment')}
                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-6 px-8 text-white text-sm placeholder-stone-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-all text-center tracking-widest"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="qr-code"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center space-y-10 py-6 relative z-10"
                    >
                      <div className="p-1 w-64 h-64 bg-gradient-to-br from-amber-500/40 via-transparent to-amber-500/40 rounded-[2.5rem] relative group cursor-pointer">
                        <div className="absolute inset-0 bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all duration-700 rounded-full" />
                        <div className="relative w-full h-full bg-zinc-900 rounded-[2.3rem] flex items-center justify-center overflow-hidden border border-white/5 p-8">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent animate-scan" />
                          <div className="p-4 bg-white rounded-3xl">
                            <QRCodeSVG
                              value={`upi://pay?pa=cafe-aroma@upi&pn=Cafe%20Aroma&am=${grandTotal}&cu=INR`}
                              size={160}
                              level="H"
                              includeMargin={false}
                            />
                          </div>
                        </div>
                        <div className="absolute inset-x-0 -bottom-3 flex justify-center">
                          <span className="bg-amber-600 text-black px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl">Scan to Pay</span>
                        </div>
                      </div>
                      <div className="text-center space-y-4">
                        <p className="text-stone-500 text-[10px] uppercase tracking-[0.4em] font-black leading-relaxed">Scan the sacred sigil <br /> with your preferred portal</p>
                        <div className="flex gap-6 justify-center items-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Google_Pay_Logo.svg" alt="GPay" className="h-4" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-3" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </div>

          <div className="w-full lg:w-[480px]">
            <div className="bg-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.4)] p-10 md:p-14 rounded-[4rem] border border-white/10 sticky top-32 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
              <h2 className="text-2xl font-serif font-black text-white mb-10 tracking-tight flex items-center justify-between">
                Order Manifest <span className="text-[10px] uppercase tracking-[0.4em] font-black text-amber-500/50">V0.4</span>
              </h2>

              <div className="max-h-[400px] overflow-y-auto mb-10 pr-4 space-y-8 scrollbar-hide">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start group">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl overflow-hidden border border-white/5 group-hover:border-amber-500/30 transition-all">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-white font-serif font-bold text-sm tracking-tight group-hover:text-amber-500 transition-colors">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500 font-black text-[9px] uppercase tracking-widest">{item.quantity}x</span>
                          <div className="w-1 h-1 bg-white/10 rounded-full" />
                          <span className="text-stone-500 text-[9px] uppercase tracking-widest">{item.category}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-white font-mono text-sm pt-1">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/[0.02] rounded-3xl p-8 space-y-4 mb-10 border border-white/5">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-stone-500">
                  <span>Ritual Value</span>
                  <span className="text-stone-300 font-mono">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-stone-500">
                  <span>Aura Tax (5%)</span>
                  <span className="text-stone-300 font-mono">₹{tax}</span>
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em] text-stone-500">
                  <span>Transit Fee</span>
                  {shipping === 0 ? <span className="text-green-500/80">Gratis</span> : <span className="text-stone-300 font-mono">₹{shipping}</span>}
                </div>
                <div className="h-[1px] bg-white/5 w-full my-4" />
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-[0.4em] font-black text-amber-500 opacity-50 mb-1">Total Offering</span>
                    <span className="font-serif font-black text-3xl text-white tracking-tighter">₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                form="checkout-form"
                disabled={isProcessing || (activeTab === 'shipping' && !formData.address)}
                className="w-full py-8 bg-white text-black rounded-[2.5rem] font-black uppercase tracking-[0.6em] text-[10px] shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center justify-center gap-4 group disabled:opacity-50 overflow-hidden relative"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={isProcessing ? { x: "100%" } : { x: "-100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200 to-transparent opacity-20"
                />
                {isProcessing ? (
                  <div className="h-5 w-5 border-2 border-stone-900/30 border-t-stone-900 rounded-full animate-spin" />
                ) : (
                  <>
                    {paymentMethod === 'card' ? (
                      <>
                        <Lock size={18} className="fill-current" /> Pay Securely
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} className="fill-current" /> Complete Ritual
                      </>
                    )}
                  </>
                )}
              </motion.button>

              <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale pointer-events-none">
                <ShieldCheck size={20} className="text-white" />
                <Truck size={20} className="text-white" />
                <Lock size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;