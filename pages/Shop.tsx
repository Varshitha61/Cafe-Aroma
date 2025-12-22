import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Check, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<number | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'Cappuccino',
      price: 220,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=800&q=80',
      description: 'A perfect balance of espresso, steamed milk and foam, dusted with cocoa.'
    },
    {
      id: 2,
      name: 'Cafe Latte',
      price: 240,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?w=800&q=80',
      description: 'Rich espresso swirled with steamed milk, topped with a light layer of foam.'
    },
    {
      id: 3,
      name: 'Tandoori Paneer Sandwich',
      price: 250,
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=800&q=80',
      description: 'Spiced paneer tikka layered with fresh veggies in grilled gourmet bread.'
    },
    {
      id: 4,
      name: 'Iced Americano',
      price: 200,
      category: 'Beverages',
      image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
      description: 'Espresso shots topped with cold water and ice. Crisp and refreshing.'
    },
    {
      id: 5,
      name: 'Chilli Cheese Pizza',
      price: 180,
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80',
      description: 'Crispy artisan bread topped with melted cheddar, mozzarella, and green chillies.'
    },
    {
      id: 6,
      name: 'Cocoa Fantasy Cake',
      price: 200,
      category: 'Dessert',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
      description: 'Decadent dark chocolate cake with a molten center.'
    },
    {
      id: 7,
      name: 'Espresso',
      price: 150,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80',
      description: 'A concentrated shot of rich, full-bodied coffee.'
    },

    {
      id: 8,
      name: 'Fried rice',
      price: 160,
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
      description: 'buttery Indian Breakfast to golden perfection.'
    },
    {
      id: 9,
      name: 'Hazelnut Frappe',
      price: 290,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
      description: 'Creamy cold coffee blended with hazelnut syrup and topped with whipped cream.'
    },
    {
      id: 10,
      name: 'Artisan Ceramic Mug',
      price: 399,
      category: 'Merchandise',
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
      description: 'Hand-crafted ceramic mug for your daily brew ritual.'
    },
    {
      id: 11,
      name: 'House Blend (250g)',
      price: 450,
      category: 'Merchandise',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80',
      description: 'Our signature blend of Arabica beans, perfect for home brewing.'
    },
    {
      id: 12,
      name: 'Avocado Sourdough Pasta',
      price: 350,
      category: 'Food',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
      description: 'Toasted sourdough topped with smashed avocado, cherry tomatoes, and seeds.'
    },
  ];

  const categories = ['All', 'Beverages', 'Food', 'Dessert', 'Merchandise'];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleAdd = (product: Product) => {
    addToCart(product);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1000);
  };

  return (
    <div className="bg-[#fafaf9] min-h-screen pb-24">
      {/* Aesthetic Header */}
      <div className="relative bg-stone-900 py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507133750069-775b0f45bbd4?w=1600&q=80"
          alt="Coffee Table"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">The Menu</h1>
          <p className="text-lg text-stone-300 font-light tracking-wide">Curated flavors for the discerning palate.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Category Filter */}
        <div className="bg-white p-4 rounded-xl shadow-lg border border-stone-100 mb-12 flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 text-stone-400 mr-2">
            <Filter size={18} />
            <span className="text-sm font-medium uppercase tracking-wider">Filter:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${activeCategory === cat
                ? 'bg-stone-800 text-white shadow-md'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-stone-100 flex flex-col">
              <div className="relative h-72 overflow-hidden bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-stone-800 border border-stone-200">
                  {product.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-stone-800 leading-tight">{product.name}</h3>
                  <span className="text-lg font-medium text-amber-900">₹{product.price}</span>
                </div>

                <p className="text-sm text-stone-500 mb-6 font-light leading-relaxed flex-grow">
                  {product.description}
                </p>

                <button
                  onClick={() => handleAdd(product)}
                  className={`${addedItem === product.id ? 'bg-green-700' : 'bg-stone-900'
                    } text-white w-full py-3 px-4 rounded-sm hover:opacity-90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group-hover:translate-y-0`}
                  disabled={addedItem === product.id}
                >
                  {addedItem === product.id ? (
                    <>
                      <Check size={18} />
                      <span className="font-medium text-sm">Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      <span className="font-medium text-sm tracking-wide">ADD TO CART</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;