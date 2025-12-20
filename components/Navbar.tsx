import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Coffee, ShoppingBag, Trash2, User as UserIcon, LogOut, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, cartTotal, clearCart } = useCart();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Story', path: '/story' },
    { name: 'Shop', path: '/shop' },
    { name: 'Cafes', path: '/cafes' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-[#fafaf9] shadow-sm sticky top-0 z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="bg-stone-800 p-2 rounded-full transition-transform group-hover:scale-105">
                <Coffee className="h-6 w-6 text-stone-100" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl tracking-wide text-stone-800 leading-none">
                  CAFE AROMA
                </span>
                <span className="text-[10px] tracking-[0.2em] text-stone-500 uppercase">Est. 1996</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative py-2 ${
                  isActive(link.path)
                    ? 'text-amber-900'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-900 transform transition-transform duration-300 origin-left ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0'}`}></span>
              </Link>
            ))}
            
            <div className="flex items-center gap-2">
              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-700"
                  >
                    <UserIcon size={20} />
                    <span className="text-sm font-medium hidden lg:inline">{user.name.split(' ')[0]}</span>
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-stone-100 z-20 py-1 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-2 border-b border-stone-100">
                          <p className="text-xs text-stone-400">Signed in as</p>
                          <p className="text-sm font-medium text-stone-900 truncate">{user.email}</p>
                        </div>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut size={14} /> Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium text-stone-500 hover:text-amber-900 px-3 py-2">
                  Sign In
                </Link>
              )}

              {/* Cart Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="p-3 rounded-full hover:bg-stone-100 text-stone-600 hover:text-amber-900 transition-colors relative flex items-center"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
                    <span className="absolute top-0 right-0 bg-amber-900 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#fafaf9]">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>

                {isCartOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsCartOpen(false)}></div>
                    <div className="absolute right-0 mt-4 w-96 bg-white rounded-xl shadow-2xl border border-stone-100 z-50 overflow-hidden transform transition-all animate-in fade-in slide-in-from-top-5">
                      <div className="p-4 bg-stone-900 text-stone-50 flex justify-between items-center">
                        <h3 className="font-serif font-bold flex items-center gap-2 tracking-wide"><ShoppingBag size={18} /> Your Cart</h3>
                        <button onClick={() => setIsCartOpen(false)} className="hover:bg-stone-700 p-1 rounded-full transition"><X size={18} /></button>
                      </div>
                      
                      <div className="max-h-[60vh] overflow-y-auto bg-white">
                        {cartItems.length === 0 ? (
                          <div className="p-10 text-center text-stone-400">
                            <Coffee className="mx-auto h-12 w-12 mb-3 text-stone-200" />
                            <p className="font-serif text-lg text-stone-600">Your cart is empty.</p>
                            <p className="text-sm mb-4">Time to brew some happiness!</p>
                            <Link to="/shop" onClick={() => setIsCartOpen(false)} className="mt-2 inline-block text-amber-900 font-semibold text-sm hover:underline border-b border-transparent hover:border-amber-900">Browse Menu</Link>
                          </div>
                        ) : (
                          <ul className="divide-y divide-stone-100">
                            {cartItems.map(item => (
                              <li key={item.id} className="p-4 hover:bg-stone-50 transition-colors flex gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                                <div className="flex-1">
                                  <h4 className="font-serif font-bold text-stone-800 text-sm">{item.name}</h4>
                                  <div className="text-xs text-stone-500 mt-1 uppercase tracking-wider">
                                    {item.category}
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-medium text-stone-600">Qty: {item.quantity}</span>
                                    <span className="font-medium text-amber-900">₹{item.price * item.quantity}</span>
                                  </div>
                                </div>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}
                                  className="text-stone-400 hover:text-red-500 self-start p-1 transition-colors"
                                  title="Remove item"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {cartItems.length > 0 && (
                        <div className="p-5 bg-stone-50 border-t border-stone-100">
                          <div className="flex justify-between items-center mb-6 text-stone-800">
                            <span className="font-serif text-lg">Subtotal</span>
                            <span className="font-bold text-xl text-amber-900">₹{cartTotal}</span>
                          </div>
                          <button 
                            onClick={handleCheckout}
                            className="w-full bg-stone-900 text-white py-3.5 rounded-sm font-medium tracking-wide hover:bg-stone-800 transform active:scale-[0.98] transition-all shadow-lg flex justify-center items-center gap-2"
                          >
                            <Lock size={16} /> CHECKOUT SECURELY
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative text-stone-800 p-1"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItems.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-800 hover:text-amber-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-amber-900 bg-amber-50'
                    : 'text-stone-600 hover:text-amber-900 hover:bg-stone-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
               <div className="pt-4 border-t border-stone-100">
                 <div className="px-3 py-2 text-sm font-bold text-stone-800">Hello, {user.name}</div>
                 <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md">
                   Sign Out
                 </button>
               </div>
            ) : (
               <Link 
                 to="/login"
                 onClick={() => setIsOpen(false)}
                 className="block px-3 py-3 rounded-md text-base font-medium text-stone-600 hover:text-amber-900 hover:bg-stone-50"
               >
                 Sign In
               </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;