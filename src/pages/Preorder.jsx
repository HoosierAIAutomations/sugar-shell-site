import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, MapPin, CheckCircle } from 'lucide-react';
import { getDeliveryFee } from '../utils/delivery';
import { initiateCheckout } from '../utils/stripe';
import './Preorder.css';

const Preorder = ({ cart, updateQuantity, removeFromCart, orderingOpen, isOrderingForNextWeek }) => {
  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' or 'delivery'
  const [zipCode, setZipCode] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [zipMessage, setZipMessage] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + (deliveryType === 'delivery' ? deliveryFee : 0);

  const handleZipCheck = (e) => {
    e.preventDefault();
    const fee = getDeliveryFee(zipCode);
    if (fee !== null) {
      setDeliveryFee(fee);
      setZipMessage(`Great! We deliver to ${zipCode} for a $${fee} fee.`);
    } else {
      setDeliveryFee(0);
      setZipMessage('Sorry, we do not deliver to this zip code. Your order will be for Pickup only.');
      setDeliveryType('pickup');
    }
  };

  const handleCheckout = () => {
    if (!phone) {
      alert("Phone number is required for all orders!");
      return;
    }
    
    initiateCheckout(cart, phone, deliveryType, deliveryFee, isOrderingForNextWeek);
  };

  if (cart.length === 0) {
    return (
      <div className="preorder-page container empty-state text-center animate-fade-in">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any sweet treats yet!</p>
        <Link to="/menu" className="btn btn-primary" style={{marginTop: '2rem'}}>Browse Menu</Link>
      </div>
    );
  }

  return (
    <div className="preorder-page container animate-fade-in">
      <h1 className="page-title text-center">Your Preorder</h1>
      
      {(!orderingOpen && !isOrderingForNextWeek) && (
        <div className="closed-warning">
          <strong>Notice:</strong> Preorders are currently closed. You can view your cart, but checkout is disabled until Monday at 8 AM. 
          <br />
          <em style={{fontSize: '0.9em', display: 'block', marginTop: '0.5rem'}}>
            If you wish to order for next week, click the button in the top banner.
          </em>
        </div>
      )}

      {isOrderingForNextWeek && (
        <div className="next-week-notice">
          <strong>Next Week Ordering:</strong> You are currently placing an order for the following week's bake.
        </div>
      )}

      <div className="checkout-grid">
        <div className="cart-section">
          <h2>Cart Items</h2>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div 
                  className="cart-item-img" 
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                  {item.pairings && item.pairings.length > 0 && (
                    <ul className="cart-item-pairings">
                      {item.pairings.map((p, i) => (
                        <li key={i}>
                          <span className="pairing-label">#{i + 1}:</span>{' '}
                          {p.drizzle}{p.drizzle !== 'No Drizzle' || p.topping !== 'No Topping' ? ' · ' : ''}{p.topping !== 'No Topping' ? p.topping : ''}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={16}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}><Plus size={16}/></button>
                  </div>
                  <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-card">
            <h2>Order Summary</h2>
            
            <div className="delivery-toggle">
              <label className={`radio-label ${deliveryType === 'pickup' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="deliveryType" 
                  value="pickup" 
                  checked={deliveryType === 'pickup'} 
                  onChange={() => setDeliveryType('pickup')}
                />
                Pickup (Bedford - Free)
              </label>
              <label className={`radio-label ${deliveryType === 'delivery' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="deliveryType" 
                  value="delivery" 
                  checked={deliveryType === 'delivery'} 
                  onChange={() => setDeliveryType('delivery')}
                />
                Delivery
              </label>
            </div>

            {deliveryType === 'delivery' && (
              <div className="zip-check-box">
                <p>Enter your zip code to check delivery fee:</p>
                <form onSubmit={handleZipCheck} className="zip-form">
                  <input 
                    type="text" 
                    placeholder="e.g. 47421" 
                    value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-secondary">Check</button>
                </form>
                {zipMessage && (
                  <p className={`zip-message ${deliveryFee > 0 ? 'success' : 'error'}`}>
                    {deliveryFee > 0 ? <CheckCircle size={16}/> : <MapPin size={16}/>}
                    {zipMessage}
                  </p>
                )}
              </div>
            )}

            <div className="phone-input-section">
              <label htmlFor="phone">Phone Number (Required)</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="e.g. 812-555-0123" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <p className="input-helper">We'll text you for pickup/delivery updates.</p>
            </div>



            <div className="totals-box">
              <div className="total-line">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-line">
                <span>{deliveryType === 'pickup' ? 'Pickup' : 'Delivery Fee'}</span>
                <span>{deliveryType === 'pickup' ? 'Free' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <hr />
              <div className="total-line grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary checkout-btn" 
              disabled={!orderingOpen || (deliveryType === 'delivery' && deliveryFee === 0) || !phone}
              onClick={handleCheckout}
            >
              {orderingOpen ? 'Proceed to Payment' : 'Orders Closed'}
            </button>
            {deliveryType === 'delivery' && deliveryFee === 0 && orderingOpen && (
              <p className="checkout-warning">Please enter a valid delivery zip code or switch to Pickup.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preorder;
