import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Check, Filter, Zap, ArrowRight, Sparkles, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, useInView } from 'framer-motion';



// --- Magnetic Button Component ---
const MagneticButton: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void
}> = ({ children, isActive, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);
    x.set(middleX * 0.4);
    y.set(middleY * 0.4);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`relative px-6 py-3 md:px-8 md:py-4 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-500 ${isActive
        ? 'text-white'
        : 'text-stone-400 hover:text-stone-200'
        }`}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-amber-600 rounded-full shadow-2xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
};

const products: Product[] = [
  // --- Beverages: Hot Coffees ---
  { id: 1, name: 'Heritage Reserve Americano', price: 215, category: 'Beverages', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd', description: 'Deep, rich espresso shots topped with hot water for a bold ritual.' },
  { id: 2, name: 'Amber Smoked Latte', price: 295, category: 'Beverages', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772', description: 'Double-shot reserve espresso with smoked maple syrup and toasted oat milk.' },
  { id: 3, name: 'Velvet Flat White', price: 285, category: 'Beverages', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04', description: 'Smooth micro-foam poured over ristretto shots for a cream-heavy body.' },
  { id: 4, name: 'Cloud Macchiato', price: 325, category: 'Beverages', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d', description: 'Aerated milk foam marked with espresso and vanilla bean cross-hatch.' },
  { id: 5, name: 'White Chocolate Mocha', price: 310, category: 'Beverages', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735', description: 'Espresso and steamed milk with white chocolate sauce and whipped cream.' },
  { id: 31, name: 'Cinnamon Dolce Ritual', price: 290, category: 'Beverages', image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed', description: 'A ritual of sweet cinnamon syrup, espresso, and steamed milk with more cinnamon.' },
  { id: 32, name: 'Toffee Nut Reserve', price: 330, category: 'Beverages', image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff', description: 'Rich, buttery toffee flavor paired with roasted nuts and espresso.' },

  // --- Beverages: Cold Coffees ---
  { id: 6, name: 'Sea Salt Caramel Cold Brew', price: 310, category: 'Beverages', image: 'https://images.unsplash.com/photo-1532009324734-24a7a5b12850', description: '12-hour steeped reserve beans topped with a high-density salted caramel foam.' },
  { id: 7, name: 'Midnight Nitro Cold Brew', price: 340, category: 'Beverages', image: 'https://images.unsplash.com/photo-1599398054066-846f28917f38', description: 'Nitro-infused reserve coffee for a natural sweetness and velvet texture.' },
  { id: 8, name: 'Iced Shaken Espresso', price: 275, category: 'Beverages', image: 'https://images.unsplash.com/photo-1499961024600-ad094db305cc', description: 'Espresso shaken with ice and brown sugar, topped with oat milk.' },
  { id: 33, name: 'Honey Almond Cold Brew', price: 320, category: 'Beverages', image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3', description: 'Slow-steeped cold brew sweetened with honey and topped with almond milk.' },
  { id: 34, name: 'Cold Foam Cascade', price: 290, category: 'Beverages', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735', description: 'Crisp cold brew served with a massive cloud of non-fat cold milk foam.' },

  // --- Beverages: Frappuccinos & Blended ---
  { id: 9, name: 'Java Mint Reserve Frappé', price: 360, category: 'Beverages', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699', description: 'Cooling peppermint infusion blended with dark chocolate chips and coffee.' },
  { id: 10, name: 'Caramel Crunch Frappé', price: 380, category: 'Beverages', image: 'https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2', description: 'Buttery caramel blended with coffee and topped with dark caramel drizzle.' },
  { id: 11, name: 'Midnight Crimson Frappé', price: 345, category: 'Beverages', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d', description: 'A velvet blend of dark cocoa, ruby berries, and chilled espresso.' },
  { id: 35, name: 'Double Chocolaty Chip', price: 350, category: 'Beverages', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', description: 'Rich chocolate chips blended with mocha sauce and milk, finished with cream.' },
  { id: 36, name: 'Vanilla Bean Oracle', price: 320, category: 'Beverages', image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767', description: 'Creamy blend of vanilla bean, milk and ice. A spiritual pure experience.' },

  // --- Beverages: Tea & Refreshers ---
  { id: 12, name: 'Emerald Matcha Latte', price: 310, category: 'Beverages', image: 'https://images.unsplash.com/photo-1541480601-3b2d1d971689', description: 'Stone-ground ceremonial matcha whisked with steamed oat milk.' },
  { id: 13, name: 'Chai Spice Ritual', price: 290, category: 'Beverages', image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8', description: 'Black tea infused with cardamom, cinnamon, and cloves with steamed milk.' },
  { id: 14, name: 'Mango Dragonfruit Refresher', price: 280, category: 'Beverages', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721', description: 'A tropical blend of mango and dragonfruit flavors shaken with ice.' },
  { id: 37, name: 'Strawberry Açaí Sanctuary', price: 285, category: 'Beverages', image: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d', description: 'Sweet strawberry flavors accented by passion fruit and açaí notes.' },
  { id: 38, name: 'Hibiscus Herbal Infusion', price: 240, category: 'Beverages', image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256', description: 'Bright hibiscus and citrus tea, served over ice for total restoration.' },


  // --- Food: Breakfast & Sandwiches ---
  { id: 15, name: 'Pistachio Glazed Croissant', price: 220, category: 'Food', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a', description: 'Flaky artisan pastry filled with emerald pistachio cream and sea salt.' },
  { id: 16, name: 'Truffle Mushroom Toast', price: 280, category: 'Food', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8', description: 'Sourdough hearth bread with wild porcini, white truffle oil, and chives.' },
  { id: 17, name: 'Spinach & Feta Egg Wrap', price: 245, category: 'Food', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', description: 'Cage-free egg whites, spinach, and feta in a whole-wheat wrap.' },
  { id: 18, name: 'Bacon & Gouda Artisan', price: 310, category: 'Food', image: 'https://images.unsplash.com/photo-1509482560494-4126f8225994', description: 'Applewood smoked bacon and melted gouda on a parmesan frittata.' },
  { id: 19, name: 'Everything Bagel & Cream Cheese', price: 180, category: 'Food', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543', description: 'Toasted artisan bagel with poppy seeds, sesame, onion, and garlic.' },
  { id: 39, name: 'Avocado Ritual Crust', price: 290, category: 'Food', image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0', description: 'Chunky avocado spread on toasted multigrain bread with chili flakes.' },
  { id: 40, name: 'Impossible Breakfast Sandwich', price: 340, category: 'Food', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', description: 'Plant-based sausage, cage-free egg and cheddar on a sesame ciabatta.' },

  // --- Desserts: Sweet Rituals ---
  { id: 20, name: 'Noir Velvet Cheesecake', price: 320, category: 'Dessert', image: 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546', description: 'A obsidian cocoa base with Madagascar vanilla bean cream and charcoal dust.' },
  { id: 21, name: 'Gold Leaf Brownie', price: 240, category: 'Dessert', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b', description: 'Intense Ghanian chocolate brownie topped with edible 24K gold foil.' },
  { id: 22, name: 'Ruby Berry Danishes', price: 190, category: 'Dessert', image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f', description: 'Flaky puff pastry centered with tart forest berries and sweet cream.' },

  { id: 23, name: 'Ceremonial Cake Pops', price: 140, category: 'Dessert', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187', description: 'Pink velvet cake dipped in white chocolate with a pearl finish.' },
  { id: 25, name: 'Lemon Glazed Loaf', price: 210, category: 'Dessert', image: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18', description: 'Zesty citrus cake with a thick sugar glaze and lemon zest.' },
  { id: 41, name: 'Cinnamon Swirl Coffee Cake', price: 230, category: 'Dessert', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777', description: 'Moist golden cake with a legacy of cinnamon-sugar and walnut crumble.' },
  { id: 42, name: 'Birthday Cake Pop Shell', price: 145, category: 'Dessert', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587', description: 'Vanilla cake with confetti sprinkles, dipped in high-gloss pink coating.' },

  // --- Merchandise: Sacred Apparatus ---
  { id: 26, name: 'Obsidian Matte Chemex', price: 4200, category: 'Merchandise', image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780', description: 'Limited edition laboratory-grade glass with a black silicone grip.' },
  { id: 27, name: 'Copper Ritual Press', price: 3800, category: 'Merchandise', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', description: 'Double-walled hammered copper press for ultimate thermal stability.' },
  { id: 28, name: 'Heritage Estate Blend (500g)', price: 1250, category: 'Merchandise', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e', description: 'Small-batch beans from our highest elevation sanctuary in Chikmagalur.' },
  { id: 29, name: 'Titanium Travel Calyx', price: 2400, category: 'Merchandise', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8', description: 'Double-insulated titanium tumbler with a matte charcoal finish.' },
  { id: 30, name: 'Sacred Bean Grinder', price: 6500, category: 'Merchandise', image: '/coffee-grinder.jpg', description: 'Precision conical burr grinder with 40 ritual-specific settings.' },
  { id: 43, name: 'Vintage Brass Goose-neck', price: 5400, category: 'Merchandise', image: '/brass-gooseneck.jpg', description: 'Antique brass finish electric kettle for precise hand-poured rituals.' },
  { id: 44, name: 'Heritage Leather Apron', price: 2800, category: 'Merchandise', image: '/leather-apron.jpg', description: 'Full-grain dark leather apron for the dedicated home barista.' }
];

const categories = ['All', 'Beverages', 'Food', 'Dessert', 'Merchandise'];

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    return activeCategory === 'All'
      ? products
      : products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleAdd = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(product);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1000);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pb-40 overflow-hidden">
      {/* Cinematic Boutique Header */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1501339817308-44b29fadd1d2?w=1920&q=80"
            alt="Shop Interior"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920';
            }}
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-amber-500 text-[10px] font-black tracking-[0.8em] uppercase mb-8 md:mb-12"
          >
            <Sparkles size={14} className="animate-pulse" /> The Collection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[16vw] md:text-[8vw] font-serif font-black text-white leading-none tracking-tighter mb-8"
          >
            BO<span className="text-amber-500 italic font-light drop-shadow-2xl font-sans">U</span>TIQUE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-stone-400 text-sm md:text-2xl font-light tracking-[0.4em] uppercase"
          >
            Handpicked Artifacts of <span className="text-white italic">Aroma</span>
          </motion.p>
        </div>
      </section>

      <div className="max-w-[1800px] mx-auto px-4 md:px-12 relative z-20">

        {/* Flagship Reveal Section */}
        <section className="mb-24 md:mb-40 mt-12 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[70vh] md:h-[80vh] w-full rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl"
          >
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1920&q=80"
              className="w-full h-full object-cover brightness-[0.8] group-hover:scale-105 transition-transform duration-[4s]"
              alt="Flagship Ritual"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-20">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-amber-500 font-black tracking-[0.8em] text-[10px] uppercase block mb-4 md:mb-6"
              >
                The Unique Masterpiece
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-[14vw] md:text-[6vw] font-serif font-black text-white leading-[0.85] tracking-tighter mb-8 md:mb-10"
              >
                SACRED <span className="text-stone-500 italic font-light drop-shadow-2xl font-sans">A</span>ROMA
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="max-w-xl border-l-2 border-amber-500/30 pl-6 md:pl-10"
              >
                <p className="text-stone-300 text-base md:text-xl font-light leading-relaxed">
                  A celestial convergence of gravity and gold. This unique visual represents the pinnacle of our roastery rituals.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Refined Filters */}
        <div className="flex justify-center mb-16 md:mb-32 overflow-x-auto pb-6 scrollbar-hide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-2 p-2 bg-zinc-900 overflow-visible rounded-full border border-white/5"
          >
            {categories.map(cat => (
              <MagneticButton
                key={cat}
                isActive={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </MagneticButton>
            ))}
          </motion.div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, delay: (index % 4) * 0.1 }}
                className="group relative h-[500px] md:h-[600px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl"
              >
                <motion.img
                  layoutId={`img-${product.id}`}
                  src={`${product.image}?w=400&q=75`}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[2s] ease-out brightness-105"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <span className="text-amber-500 font-black tracking-[0.3em] uppercase text-[9px] mb-4">{product.category}</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-white mb-6 leading-tight tracking-tight group-hover:text-amber-500 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl font-black text-white">₹{product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handleAdd(product, e)}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all ${addedItem === product.id ? 'bg-green-500' : 'bg-white text-black hover:bg-amber-500'}`}
                    >
                      {addedItem === product.id ? <Check size={18} /> : <Zap size={18} className="fill-current" />}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>


      </div>
    </div>
  );
};

export default Shop;
