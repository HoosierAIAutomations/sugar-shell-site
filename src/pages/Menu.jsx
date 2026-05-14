import React, { useState } from 'react';
import { PRODUCTS } from '../data/menu';
import { ShoppingCart, Settings2 } from 'lucide-react';
import BrownieBitesModal from '../components/BrownieBitesModal';
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
          <div key={product.id} className="product-card animate-fade-in">
            <div 
              className="product-image" 
              style={{ backgroundImage: `url(${product.image})` }}
            >
              {product.size && <div className="product-size">{product.size}</div>}
              {product.customizable && (
                <div className="product-customizable-badge">Customizable</div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              {product.quantityInfo && <p className="product-quantity">{product.quantityInfo}</p>}
              <p className="product-desc">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">
                  ${product.price.toFixed(2)}
                  {product.customizable && (
                    <span className="product-price-note"> + pairings</span>
                  )}
                </span>
                <button 
                  className="btn btn-primary add-to-cart-btn"
                  onClick={() => handleCardAction(product)}
                  disabled={!orderingOpen}
                >
                  {product.customizable ? <Settings2 size={18} /> : <ShoppingCart size={18} />}
                  {!orderingOpen ? 'Closed' : product.customizable ? 'Customize' : 'Add to Cart'}
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

      {customizeProduct && (
        <BrownieBitesModal
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
