import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { DRIZZLE_OPTIONS, TOPPING_OPTIONS } from '../data/menu';
import './BrookieBitesModal.css';

const DEFAULT_PAIRING = { drizzle: 'no-drizzle', topping: 'no-topping' };

const BrookieBitesModal = ({ product, onClose, onAddToCart, orderingOpen }) => {
    const [pairings, setPairings] = useState([{ ...DEFAULT_PAIRING }]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [product.image, product.toppingImage].filter(Boolean);

    const addPairing = () => {
        if (pairings.length < product.maxPairings) {
            setPairings(prev => [...prev, { ...DEFAULT_PAIRING }]);
        }
    };

    const removePairing = (index) => {
        setPairings(prev => prev.filter((_, i) => i !== index));
    };

    const updatePairing = (index, field, value) => {
        setPairings(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
    };

    const pairingAddonCount = pairings.filter(
        p => p.drizzle !== 'no-drizzle' || p.topping !== 'no-topping'
    ).length;
    const addonCost = pairingAddonCount * product.pairingAddonPrice;
    const totalPrice = product.price + addonCost;

    const handleAddToCart = () => {
        const cartItem = {
            ...product,
            id: `${product.id}--${pairings.map(p => `${p.drizzle}:${p.topping}`).join('|')}`,
            price: totalPrice,
            pairings: pairings.map(p => ({
                drizzle: DRIZZLE_OPTIONS.find(d => d.id === p.drizzle)?.label,
                topping: TOPPING_OPTIONS.find(t => t.id === p.topping)?.label,
            })),
        };
        onAddToCart(cartItem);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close">
                    <X size={20} />
                </button>

                <div className="modal-header">
                    <div className="modal-img-wrapper">
                        <div
                            className="modal-product-img"
                            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                        />
                        {images.length > 1 && (
                            <div className="carousel-dots">
                                {images.map((_, index) => (
                                    <span 
                                        key={index} 
                                        className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="modal-product-info">
                        <h2>{product.name}</h2>
                        <p className="modal-base-price">Base: ${product.price.toFixed(2)}</p>
                        <p className="modal-desc">{product.description}</p>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="pairings-header">
                        <h3>Customize Your Pairings</h3>
                        <p className="pairings-hint">
                            Add up to {product.maxPairings} drizzle &amp; topping combos · <strong>${product.pairingAddonPrice.toFixed(2)} per pairing</strong>
                        </p>
                    </div>

                    <div className="pairings-list">
                        {pairings.map((pairing, index) => (
                            <div key={index} className="pairing-row">
                                <div className="pairing-number">#{index + 1}</div>
                                <div className="pairing-selects">
                                    <div className="select-group">
                                        <label>Drizzle</label>
                                        <select
                                            value={pairing.drizzle}
                                            onChange={e => updatePairing(index, 'drizzle', e.target.value)}
                                        >
                                            {DRIZZLE_OPTIONS.map(opt => (
                                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="select-group">
                                        <label>Topping</label>
                                        <select
                                            value={pairing.topping}
                                            onChange={e => updatePairing(index, 'topping', e.target.value)}
                                        >
                                            {TOPPING_OPTIONS.map(opt => (
                                                <option key={opt.id} value={opt.id}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {pairings.length > 1 && (
                                    <button
                                        className="remove-pairing-btn"
                                        onClick={() => removePairing(index)}
                                        aria-label="Remove pairing"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {pairings.length < product.maxPairings && (
                        <button className="add-pairing-btn" onClick={addPairing}>
                            <Plus size={16} />
                            Add Another Pairing
                        </button>
                    )}
                </div>

                <div className="modal-footer">
                    <div className="modal-total">
                        <span>Total</span>
                        <span className="modal-total-price">${totalPrice.toFixed(2)}</span>
                        {addonCost > 0 && (
                            <span className="modal-addon-note">
                                (${product.price.toFixed(2)} + ${addonCost.toFixed(2)} pairings)
                            </span>
                        )}
                    </div>
                    <button
                        className="btn btn-primary modal-add-btn"
                        onClick={handleAddToCart}
                        disabled={!orderingOpen}
                    >
                        <ShoppingCart size={18} />
                        {orderingOpen ? 'Add to Cart' : 'Orders Closed'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrookieBitesModal;
