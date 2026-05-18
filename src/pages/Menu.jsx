import React, { useState } from 'react';
import { PRODUCTS } from '../data/menu';
import { ShoppingCart, Settings2 } from 'lucide-react';
import BrownieBitesModal from '../components/BrownieBitesModal';
import BrookieBitesModal from '../components/BrookieBitesModal';
import ProductCard from '../components/ProductCard';
import './Menu.css';

const Menu = ({ addToCart, orderingOpen }) => {
  const [filter, setFilter] = useState('all');
  const [customizeProduct, setCustomizeProduct] = useState(null);

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const handleCardAction = (product) => {
    if (product.customizable) {
      setCustomizeProduct(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="menu-page container">
      <div className="menu-header text-center animate-fade-in">
        <h1>Our Menu</h1>
        <p>Handcrafted with love and premium ingredients.</p>
        
        <div className="menu-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Treats
          </button>
          <button 
            className={`filter-btn ${filter === 'cookie' ? 'active' : ''}`}
            onClick={() => setFilter('cookie')}
          >
            Cookies
          </button>
          <button 
            className={`filter-btn ${filter === 'brownie' ? 'active' : ''}`}
            onClick={() => setFilter('brownie')}
          >
            Brownies
          </button>
        </div>
      </div>

      <div className="menu-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAction={handleCardAction} 
            orderingOpen={orderingOpen} 
          />
        ))}
      </div>

      {customizeProduct && customizeProduct.id === 'brownie-bites-box' && (
        <BrownieBitesModal
          product={customizeProduct}
          onClose={() => setCustomizeProduct(null)}
          onAddToCart={addToCart}
          orderingOpen={orderingOpen}
        />
      )}
      {customizeProduct && customizeProduct.id === 'brookie-bites-box' && (
        <BrookieBitesModal
          product={customizeProduct}
          onClose={() => setCustomizeProduct(null)}
          onAddToCart={addToCart}
          orderingOpen={orderingOpen}
        />
      )}
    </div>
  );
};

export default Menu;
