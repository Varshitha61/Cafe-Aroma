import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Coffee, Lock, ArrowRight, Mail, User as UserIcon } from 'lucide-react';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
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

  return (
    <div className="min-h-screen flex bg-[#fafaf9]">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 relative bg-stone-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1600&q=80" 
          alt="Coffee Art" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-transparent"></div>
        <div className="absolute bottom-20 left-20 text-white z-10">
          <h2 className="text-5xl font-serif font-bold mb-4">Welcome Back</h2>
          <p className="text-xl font-light text-stone-300 max-w-md">
            Sign in to access your saved preferences, order history, and exclusive coffee rewards.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="inline-block p-3 rounded-full bg-stone-100 mb-4">
              <Coffee className="h-8 w-8 text-amber-900" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              {isLogin ? 'Sign in to Cafe Aroma' : 'Create an Account'}
            </h2>
            <p className="mt-2 text-stone-500">
              {isLogin ? 'Welcome back, coffee lover.' : 'Join our community of coffee enthusiasts.'}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-stone-400" />
                  </div>
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-10 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-amber-900 focus:border-amber-900 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              )}
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-10 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-amber-900 focus:border-amber-900 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-10 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-amber-900 focus:border-amber-900 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors shadow-lg"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <ArrowRight className="h-5 w-5 text-stone-500 group-hover:text-stone-400" />
                </span>
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-sm font-medium text-amber-900 hover:text-amber-800"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;