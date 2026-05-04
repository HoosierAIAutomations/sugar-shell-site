import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, Send } from 'lucide-react';
import './Success.css';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const phone = queryParams.get('phone');
  const method = queryParams.get('method') || 'stripe';
  
  const hasNotified = useRef(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const slots = [
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'
  ];

  // Automatic notification on load
  useEffect(() => {
    if (hasNotified.current) return;
    hasNotified.current = true;

    const sendInitialNotification = async () => {
      const formData = new FormData();
      formData.append("access_key", "fe576714-9159-49d6-bd66-2f17492d35df");
      formData.append("subject", `New Order Received! (${method === 'manual' ? 'CHECK/CASH' : 'STRIPE'})`);
      formData.append("from_name", "Sugar Shell Website");
      formData.append("message", `A new order has been placed on the website.
      
Payment Method: ${method === 'manual' ? 'Check/Cash (Pay at Pickup/Delivery)' : 'Paid via Stripe'}
Delivery Type: ${type}
Customer Phone: ${phone || 'Not provided'}

Note: If this is a pickup order, the customer may still select a specific time slot below.`);

      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
      } catch (error) {
        console.error("Failed to send initial notification:", error);
      }
    };

    sendInitialNotification();
  }, [method, type, phone]);

  const handleConfirmSlot = async () => {
    if (!selectedSlot) return;
    
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("access_key", "fe576714-9159-49d6-bd66-2f17492d35df");
    formData.append("subject", `Pickup Time Selected: ${selectedSlot}`);
    formData.append("from_name", "Sugar Shell Website");
    formData.append("message", `A customer has selected a pickup time.
    
Time: ${selectedSlot}
Customer Phone: ${phone || 'Not provided'}
Delivery Type: ${type}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('There was an issue confirming your time. Please text us directly!');
      }
    } catch (error) {
      console.error(error);
      alert('Error confirming time. Please text us!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPickup = type === 'pickup';

  return (
    <div className="container text-center animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <CheckCircle size={80} color="#57684C" />
      </div>
      <h1 className="page-title">Order Received!</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        Thank you for your order! {isPickup ? "Since you're picking up, please see the details below." : "We'll be in contact with the drop-off details for your order soon."}
      </p>

      {method === 'manual' && (
        <div className="manual-payment-notice" style={{ 
          backgroundColor: '#fff4e6', 
          border: '1px solid #ffd8a8', 
          padding: '1.5rem', 
          borderRadius: '12px',
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          <h3 style={{ color: '#d9480f', marginTop: 0 }}>Payment Required</h3>
          <p style={{ marginBottom: 0 }}>
            You selected <strong>Check or Cash</strong>. Please have your payment ready when you {isPickup ? 'arrive for pickup' : 'receive your delivery'}. 
            {isPickup && " Alex will collect it then!"}
          </p>
        </div>
      )}

      {isPickup && (
        <div className="pickup-info-container">
          <div className="pickup-header">
            <h2>Pickup Details</h2>
            <p>Our Sunday bake will be ready for you at the address below.</p>
          </div>

          <div className="address-card">
            <div className="address-icon">
              <MapPin size={24} />
            </div>
            <div className="address-details">
              <h3>Pickup Location</h3>
              <p>2502 Rockport Rd Lot 10, Bedford, IN 47421</p>
            </div>
          </div>

          <div className="slots-section">
            <h3>Choose your Sunday pickup time:</h3>
            {!submitted ? (
              <>
                <div className="slots-grid">
                  {slots.map(slot => (
                    <div key={slot} className="slot-option">
                      <input 
                        type="radio" 
                        id={`slot-${slot}`} 
                        name="pickup-slot" 
                        value={slot}
                        checked={selectedSlot === slot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                      />
                      <label htmlFor={`slot-${slot}`} className="slot-label">
                        {slot}
                      </label>
                    </div>
                  ))}
                </div>
                <button 
                  className="btn btn-primary confirm-btn"
                  onClick={handleConfirmSlot}
                  disabled={!selectedSlot || isSubmitting}
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Pickup Time'}
                  <Send size={18} style={{ marginLeft: '0.5rem' }} />
                </button>
              </>
            ) : (
              <div className="success-message">
                <CheckCircle size={20} />
                <span>Pickup time confirmed for {selectedSlot}! See you then.</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: '3rem' }}>
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
};

export default Success;
