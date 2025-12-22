import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Award, Clock, MapPin, Instagram } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-[#fafaf9]">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-stone-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80"
          alt="Aesthetic Coffee Setting"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/50 to-transparent"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <span className="text-amber-400 font-medium tracking-[0.2em] mb-4 uppercase text-sm animate-fade-in">Established 1996</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 leading-[1.1] animate-fade-in-up">
            Moments <br />
            <span className="text-stone-300 italic">brewed</span> beautifully.
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-lg text-stone-300 font-light leading-relaxed">
            Experience the artistry of Indian coffee. Hand-picked beans, slow-roasted for depth, and served in an ambiance designed for connection.
          </p>
          <div className="flex gap-6">
            <Link to="/shop" className="bg-amber-900 hover:bg-amber-800 text-white px-10 py-4 rounded-sm font-medium tracking-wide transition-all transform hover:-translate-y-1 shadow-lg">
              Order Online
            </Link>
            <Link to="/cafes" className="bg-transparent border border-white text-white hover:bg-white hover:text-stone-900 px-10 py-4 rounded-sm font-medium tracking-wide transition-all">
              Find a Cafe
            </Link>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <div className="bg-white border-b border-stone-200 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-stone-800">
          <div className="flex flex-col items-center gap-3 group">
            <div className="p-4 bg-stone-50 rounded-full group-hover:bg-amber-50 transition-colors">
              <Coffee size={28} className="text-amber-900" />
            </div>
            <span className="font-serif font-semibold text-lg">100% Arabica</span>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <div className="p-4 bg-stone-50 rounded-full group-hover:bg-amber-50 transition-colors">
              <Award size={28} className="text-amber-900" />
            </div>
            <span className="font-serif font-semibold text-lg">Award Winning</span>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <div className="p-4 bg-stone-50 rounded-full group-hover:bg-amber-50 transition-colors">
              <Clock size={28} className="text-amber-900" />
            </div>
            <span className="font-serif font-semibold text-lg">Freshly Roasted</span>
          </div>
          <div className="flex flex-col items-center gap-3 group">
            <div className="p-4 bg-stone-50 rounded-full group-hover:bg-amber-50 transition-colors">
              <MapPin size={28} className="text-amber-900" />
            </div>
            <span className="font-serif font-semibold text-lg">1500+ Outlets</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-24 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Discover Our Menus</h2>
            <div className="h-1 w-20 bg-amber-900 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative h-[500px] overflow-hidden rounded-sm cursor-pointer shadow-md">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80"
                alt="Beverages"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/20 transition-all"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center">
                <h3 className="text-3xl font-serif font-bold text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Signature Brews</h3>
                <Link to="/shop" className="text-white bg-white/20 backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-2 hover:bg-white hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500 delay-100">
                  View Menu <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-[500px] overflow-hidden rounded-sm cursor-pointer shadow-md">
              <img
                src="https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?w=800&q=80"
                alt="Food"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/20 transition-all"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center">
                <h3 className="text-3xl font-serif font-bold text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Gourmet Eats</h3>
                <Link to="/shop" className="text-white bg-white/20 backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-2 hover:bg-white hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500 delay-100">
                  View Menu <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-[500px] overflow-hidden rounded-sm cursor-pointer shadow-md">
              <img
                src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80"
                alt="Merchandise"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/20 transition-all"></div>
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-center text-center">
                <h3 className="text-3xl font-serif font-bold text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Home Brewing</h3>
                <Link to="/shop" className="text-white bg-white/20 backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-2 hover:bg-white hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500 delay-100">
                  Shop Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured CTA */}
      <section className="py-24 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-amber-900/20 rounded-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              alt="Mobile App Aesthetic"
              className="rounded-lg shadow-2xl relative z-10"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">The Aroma Club</h2>
              <p className="text-lg text-stone-600 font-light leading-relaxed">
                Join our exclusive community. Skip the line, order ahead, and earn beans with every purchase.
                Redeem for artisanal blends and merchandise.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="bg-stone-900 text-white px-8 py-3 rounded-md font-medium flex items-center gap-3 hover:bg-stone-800 transition shadow-lg">
                <span>Download App</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-[#fafaf9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-serif font-bold text-stone-900">Moments of Aroma</h2>
            <a href="#" className="flex items-center gap-2 text-amber-900 hover:text-amber-700 transition">
              <Instagram size={20} /> <span className="font-medium">@CafeAromaIndia</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square overflow-hidden rounded-sm group">
              <img
                src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80"
                alt="Latte Art"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm group">
              <img
                src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80"
                alt="Cozy Cafe Corner"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm group">
              <img
                src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80"
                alt="Coffee Beans"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-sm group">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
                alt="Barista Pouring"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;