import React, { useState, useEffect } from 'react';
import { ShoppingCart, Settings2 } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onAction, orderingOpen }) => {
    const images = product.images || [product.image, product.toppingImage].filter(Boolean);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % images.length);
        }, product.imageInterval || 4000);
        return () => clearInterval(interval);
    }, [images.length, product.imageInterval]);

    return (
        <div className="product-card animate-fade-in">
            <div className="product-image">
              <img 
                src={images[currentImageIndex]} 
                alt={product.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {product.size && <div className="product-size">{product.size}</div>}
              {product.customizable && (
                <div className="product-customizable-badge">Customizable</div>
              )}
              {images.length > 1 && (
                <div className="carousel-dots">
                    {images.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(index);
                            }}
                        />
                    ))}
                </div>
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
                  onClick={() => onAction(product)}
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
    );
};

export default ProductCard;
