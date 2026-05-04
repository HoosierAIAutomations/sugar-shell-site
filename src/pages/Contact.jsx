import React, { useState } from 'react';
import './Contact.css';
import { Mail, MapPin } from 'lucide-react';
import FlavorBubble from '../components/FlavorBubble';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    // You will need to replace this key with your Web3Forms access key
    formData.append("access_key", "fe576714-9159-49d6-bd66-2f17492d35df");
    formData.append("subject", "New Message/Order from Website");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      alert('Message sent successfully!');
      e.target.reset();
    } catch (error) {
      alert('Error sending message. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="contact-page container animate-fade-in">
      <div className="contact-header text-center">
        <h1>Get in Touch</h1>
        <p>Have questions about a large order or special event? Let us know!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-item">
            <MapPin className="info-icon" />
            <div>
              <h3>Location</h3>
              <p>Bedford, Indiana</p>
              <p className="sub-text">Delivery available to: Bedford, French Lick, Paoli, Orleans, Elletsville, Smithville, Mitchell, Oolitic, Avoca, and Bloomington.</p>
            </div>
          </div>
          

        </div>

        <div className="contact-form-container">
          <h2>Send a Message</h2>
          <form 
            onSubmit={handleSubmit}
            className="contact-form"
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message/Order</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      <FlavorBubble />
    </div>
  );
};

export default Contact;
