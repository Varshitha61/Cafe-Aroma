import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShieldCheck, CreditCard, MapPin, Truck, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Calculate totals
  const tax = Math.round(cartTotal * 0.05); // 5% Tax
  const shipping = cartTotal > 500 ? 0 : 50;
  const grandTotal = cartTotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format: xxxx xxxx xxxx xxxx
    let val = e.target.value.replace(/\D/g, '');
    val = val.substring(0, 16);
    val = val.replace(/(\d{4})/g, '$1 ').trim();
    setFormData(prev => ({ ...prev, cardNumber: val }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format: MM/YY
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setFormData(prev => ({ ...prev, expiry: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Payment Processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setStep('success');
    clearCart();
  };

  // Auth Guard
  if (!user) {
    return <Navigate to="/login" state={{ from: { pathname: '/checkout' } }} />;
  }

  // Empty Cart Guard (only if not on success step)
  if (cartItems.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafaf9] p-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Your cart is empty</h2>
        <Link to="/shop" className="text-amber-900 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-4">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-lg w-full text-center border border-stone-100 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Order Placed!</h2>
          <p className="text-stone-600 mb-8">
            Thank you, {user.name}! Your order has been securely processed. We're firing up the espresso machine right now.
          </p>
          <div className="bg-stone-50 p-4 rounded-md mb-8 text-sm text-stone-500">
            Order ID: #{Math.floor(Math.random() * 1000000)}<br/>
            Estimated Delivery: 30-45 mins
          </div>
          <Link 
            to="/" 
            className="inline-block bg-stone-900 text-white px-8 py-3 rounded-full font-medium hover:bg-stone-800 transition shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-stone-900">Secure Checkout</h1>
          <div className="flex items-center text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
            <ShieldCheck size={14} className="mr-1" />
            SSL Encrypted
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Forms */}
          <div className="flex-1 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit}>
              
              {/* Shipping Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-6 flex items-center">
                  <MapPin size={20} className="mr-2 text-amber-900" /> Shipping Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-stone-600 mb-1">Full Address</label>
                    <input 
                      type="text" 
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address, apartment, suite"
                      className="w-full p-3 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-900 focus:border-amber-900 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">City</label>
                    <input 
                      type="text" 
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-900 focus:border-amber-900 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">ZIP Code</label>
                    <input 
                      type="text" 
                      name="zip"
                      required
                      pattern="[0-9]*"
                      maxLength={6}
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-900 focus:border-amber-900 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 mt-6">
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-6 flex items-center">
                  <CreditCard size={20} className="mr-2 text-amber-900" /> Payment Method
                </h2>
                
                <div className="mb-6 flex gap-4">
                  <div className="flex-1 border border-amber-900 bg-amber-50 p-4 rounded-md flex items-center justify-center text-amber-900 font-medium text-sm cursor-pointer ring-1 ring-amber-900 relative">
                     <div className="absolute top-2 right-2 w-2 h-2 bg-amber-900 rounded-full"></div>
                     Credit / Debit Card
                  </div>
                  <div className="flex-1 border border-stone-200 p-4 rounded-md flex items-center justify-center text-stone-500 font-medium text-sm cursor-not-allowed opacity-60">
                     UPI / Netbanking
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Cardholder Name</label>
                    <input 
                      type="text" 
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-900 focus:border-amber-900 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-600 mb-1">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="cardNumber"
                        required
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full p-3 pl-10 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-900 focus:border-amber-900 outline-none transition-all font-mono"
                      />
                      <Lock size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiry"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.expiry}
                        onChange={handleExpiryChange}
                        className="w-full p-3 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-900 focus:border-amber-900 outline-none transition-all text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-600 mb-1">CVV</label>
                      <input 
                        type="password" 
                        name="cvv"
                        required
                        maxLength={3}
                        placeholder="•••"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-stone-200 rounded-md focus:ring-1 focus:ring-amber-900 focus:border-amber-900 outline-none transition-all text-center tracking-widest"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-stone-100 sticky top-28">
              <h2 className="text-lg font-serif font-bold text-stone-900 mb-6">Order Summary</h2>
              
              <div className="max-h-60 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start mb-4 text-sm">
                    <div className="flex gap-3">
                      <span className="font-semibold text-stone-500">{item.quantity}x</span>
                      <span className="text-stone-800">{item.name}</span>
                    </div>
                    <span className="font-medium text-stone-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Delivery Fee</span>
                  {shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : <span>₹{shipping}</span>}
                </div>
              </div>

              <div className="border-t border-dashed border-stone-300 pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-serif font-bold text-lg text-stone-900">Total</span>
                  <span className="font-bold text-2xl text-amber-900">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-stone-900 text-white py-4 rounded-md font-medium tracking-wide hover:bg-stone-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg flex justify-center items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} /> Pay ₹{grandTotal} Securely
                  </>
                )}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-[10px] text-stone-400">
                  By placing this order, you agree to our Terms of Service. 
                  <br/>Your payment information is encrypted.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;