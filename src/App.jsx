import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Preorder from './pages/Preorder';
import Contact from './pages/Contact';
import Success from './pages/Success';
import './App.css'; // Just keeping for any legacy Vite styles, though we use index.css
import { isOrderingOpen } from './utils/timeCheck';
import sfscImage from './assets/SFSC.jpg';

function App() {
  const [cart, setCart] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderingForNextWeek, setIsOrderingForNextWeek] = useState(false);
  const orderingOpen = isOrderingOpen();

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <div className="container nav-content">
            <Link to="/" className="logo-link">
              <img src="/logo.jpg" alt="Sugar Shell Bakehouse" className="logo" />
            </Link>
            
            <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
              <Link to="/preorder" onClick={() => setIsMobileMenuOpen(false)}>
                Preorder
                {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </nav>

            <div className="nav-controls">
              <Link to="/preorder" className="cart-icon">
                <ShoppingCart />
                {cartItemCount > 0 && <span className="cart-badge-icon">{cartItemCount}</span>}
              </Link>
              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </header>

        {!orderingOpen && (
          <div className={`store-closed-banner ${isOrderingForNextWeek ? 'ordering-next-week' : ''}`}>
            <p>
              {isOrderingForNextWeek 
                ? "You are currently ordering for NEXT WEEK'S bake. Pickup/Delivery will be following next week's schedule."
                : "Orders are currently closed. We accept preorders Monday 8 AM through Friday at 6pm!"
              }
            </p>
            {!isOrderingForNextWeek && (
              <button 
                className="next-week-btn"
                onClick={() => setIsOrderingForNextWeek(true)}
              >
                Order for Next Week
              </button>
            )}
            {isOrderingForNextWeek && (
              <button 
                className="next-week-btn secondary"
                onClick={() => setIsOrderingForNextWeek(false)}
              >
                Back to View Only
              </button>
            )}
          </div>
        )}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} orderingOpen={orderingOpen || isOrderingForNextWeek} />} />
            <Route path="/preorder" element={
              <Preorder 
                cart={cart} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
                orderingOpen={orderingOpen || isOrderingForNextWeek}
                isOrderingForNextWeek={isOrderingForNextWeek}
              />
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container footer-content">
            <p>&copy; {new Date().getFullYear()} Sugar Shell Bakehouse. All rights reserved.</p>
            <p>Bedford, IN & Surrounding Areas</p>
            <p className="health-notice">Made in a home kitchen not inspected by the Department of Health</p>
            <p className="certification-link">
              <a href={sfscImage} target="_blank" rel="noopener noreferrer">2026 StateFoodSafety Certification</a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
