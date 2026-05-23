import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, MapPin, Send } from 'lucide-react';
import './Success.css';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const phone = queryParams.get('phone');
  
  const hasNotified = useRef(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const slots = [
    '12:00 PM', '5:00 PM'
  ];

  // Automatic notification on load
  useEffect(() => {
    if (hasNotified.current) return;
    hasNotified.current = true;

    const sendInitialNotification = async () => {
      const formData = new FormData();
      formData.append("access_key", "fe576714-9159-49d6-bd66-2f17492d35df");
      formData.append("subject", `New Order Received! (STRIPE)`);
      formData.append("from_name", "Sugar Shell Website");
      formData.append("message", `A new order has been placed on the website.
      
Payment Method: Paid via Stripe
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
  }, [type, phone]);

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
              <p>
                Thornton Park<br />
                1625 Q St. Bedford, IN
              </p>
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

          <div className="pickup-disclaimer">
            <h4>Pick up disclaimer</h4>
            <p>By placing an order, you agree to pick up your items at the selected pickup time. A grace period of 30 minutes will be provided after your scheduled pickup time. Orders not picked up within 30 minutes of the selected pickup time will be considered abandoned.</p>
            <p>Due to the perishable nature of our products and scheduling limitations, any order not picked up within the 30-minute grace period will be forfeited. No refunds, credits, replacements, or exchanges will be provided for unclaimed orders.</p>
            <p>Please ensure you select a pickup time that works best for your schedule and contact us in advance if an emergency may prevent timely pickup.</p>
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
