import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Shop from './pages/Shop';
import Cafes from './pages/Cafes';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import VirtualBarista from './components/VirtualBarista';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/story" element={<OurStory />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cafes" element={<Cafes />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <VirtualBarista />
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;