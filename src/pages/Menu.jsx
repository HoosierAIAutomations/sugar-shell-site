import React, { useState } from 'react';
import { PRODUCTS } from '../data/menu';
import { ShoppingCart } from 'lucide-react';
import './Menu.css';

const Menu = ({ addToCart, orderingOpen }) => {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

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
          <div key={product.id} className="product-card animate-fade-in">
            <div 
              className="product-image" 
              style={{ backgroundImage: `url(${product.image})` }}
            >
              <div className="product-size">{product.size}</div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              {product.quantityInfo && <p className="product-quantity">{product.quantityInfo}</p>}
              <p className="product-desc">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button 
                  className="btn btn-primary add-to-cart-btn"
                  onClick={() => addToCart(product)}
                  disabled={!orderingOpen}
                >
                  <ShoppingCart size={18} />
                  {orderingOpen ? 'Add to Cart' : 'Closed'}
                </button>
              </div>
              {product.ingredients && (
                <details className="ingredients-dropdown">
                  <summary>Ingredients</summary>
                  <p>{product.ingredients}</p>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
