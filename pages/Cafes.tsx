import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { CafeLocation } from '../types';

const Cafes: React.FC = () => {
  const cafes: CafeLocation[] = [
    { id: 1, name: 'Indiranagar High Street', address: '12th Main, 100ft Road, Indiranagar', city: 'Bangalore', isOpen: true, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80' },
    { id: 2, name: 'Connaught Place Central', address: 'Outer Circle, Block B', city: 'New Delhi', isOpen: true, image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80' },
    {
      id: 3,
      name: 'Marina Beach Road',
      address: 'Kamarajar Salai, Triplicane',
      city: 'Chennai',
      isOpen: false,
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
    },
    { id: 4, name: 'Bandra West', address: 'Hill Road, Near Mehboob Studio', city: 'Mumbai', isOpen: true, image: 'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=800&q=80' },
    { id: 5, name: 'Park Street', address: 'Park Street, Mullick Bazar', city: 'Kolkata', isOpen: true, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80' },
    { id: 6, name: 'Cyber Hub', address: 'DLF Cyber City, Phase 2', city: 'Gurgaon', isOpen: true, image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80' },
  ];

  return (
    <div className="bg-[#fafaf9] min-h-screen">
      <div className="bg-stone-900 py-20 text-center text-white relative">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Find A Cafe</h1>
        <p className="mt-4 text-stone-400 font-light tracking-wide text-lg">Visit one of our 1500+ locations nearby</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Bar Stub */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <input
            type="text"
            placeholder="Search by City or Area..."
            className="w-full p-5 pl-14 rounded-full border border-stone-200 shadow-sm focus:ring-2 focus:ring-amber-900 focus:border-amber-900 focus:outline-none bg-white text-stone-800 placeholder-stone-400"
          />
          <MapPin className="absolute left-5 top-5 text-stone-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cafes.map(cafe => (
            <div key={cafe.id} className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 group">
              <div className="overflow-hidden h-56">
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-bold text-stone-900 leading-tight pr-4">{cafe.name}</h3>
                  {cafe.isOpen ? (
                    <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-green-100">Open</span>
                  ) : (
                    <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-red-100">Closed</span>
                  )}
                </div>
                <div className="space-y-3 text-stone-600 text-sm mb-6 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="mt-1 flex-shrink-0 text-amber-900" />
                    <p>{cafe.address}, {cafe.city}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-amber-900" />
                    <p>8:00 AM - 11:00 PM</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-amber-900" />
                    <p>+91 99999 88888</p>
                  </div>
                </div>
                <button className="w-full border border-stone-800 text-stone-800 py-3 rounded-sm font-medium text-sm hover:bg-stone-900 hover:text-white transition-colors uppercase tracking-widest">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cafes;