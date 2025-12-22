import React from 'react';

const OurStory: React.FC = () => {
  return (
    <div className="w-full bg-[#fafaf9]">
      {/* Header */}
      <div className="bg-stone-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30"></div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold relative z-10 tracking-wide">Our Story</h1>
        <p className="mt-4 text-xl opacity-80 font-light tracking-widest uppercase relative z-10">From the Bean to the Cup</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20 space-y-32">

        {/* Section 1 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute top-4 left-4 w-full h-full border-2 border-amber-900/30 rounded-sm -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
              alt="Coffee Estate"
              className="rounded-sm shadow-xl w-full"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <span className="text-amber-900 font-bold tracking-widest text-xs uppercase">Origins</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900">Born in the Hills</h2>
            <p className="text-stone-600 leading-relaxed font-light text-lg">
              Our journey began in the lush green hills of Chikmagalur, the birthplace of coffee in India.
              With over 12,000 acres of coffee estates, we nurture our beans with care, shade-grown under a canopy of silver oaks and jackfruit trees.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute bottom-4 right-4 w-full h-full border-2 border-amber-900/30 rounded-sm -z-10 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
              alt="Roasting"
              className="rounded-sm shadow-xl w-full"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <span className="text-amber-900 font-bold tracking-widest text-xs uppercase">Craftsmanship</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900">The Perfect Roast</h2>
            <p className="text-stone-600 leading-relaxed font-light text-lg">
              We believe that roasting is an art. Our master roasters meticulously roast each batch to unlock the unique flavor profile of the beans.
              Whether it's the bold intensity of a dark roast or the subtle acidity of a medium roast, we ensure perfection in every cup.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute top-4 left-4 w-full h-full border-2 border-amber-900/30 rounded-sm -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <img
              src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80"
              alt="Cafe Interior"
              className="rounded-sm shadow-xl w-full"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <span className="text-amber-900 font-bold tracking-widest text-xs uppercase">Community</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900">A Place to Connect</h2>
            <p className="text-stone-600 leading-relaxed font-light text-lg">
              Cafe Aroma isn't just about coffee; it's about people. It's the "third place" between work and home where conversations flow,
              ideas are born, and friendships are forged. With over 1,500 cafes across the country, we are proud to be India's favorite hangout spot.
            </p>
          </div>
        </div>

        {/* Vision Mission */}
        <div className="bg-white p-16 rounded-sm shadow-sm border border-stone-100 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-900"></div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Our Vision</h2>
          <p className="text-stone-600 text-xl italic font-serif max-w-3xl mx-auto leading-relaxed">
            "To be the best coffee chain in the world, by offering a world-class coffee experience at affordable prices."
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;