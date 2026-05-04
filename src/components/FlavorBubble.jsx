import React, { useState } from 'react';
import { Cloud, X } from 'lucide-react';
import './FlavorBubble.css';

const FlavorBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flavorIdea, setFlavorIdea] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: "57203c84-d617-4ba8-a4a5-c29eee818833",
            subject: "New Flavor Suggestion!",
            message: `Flavor Idea: ${flavorIdea}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`
        }),
      });
      
      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setFlavorIdea('');
        setName('');
        setEmail('');
        setPhone('');
      }, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flavor-bubble-container">
      {isOpen ? (
        <div className="flavor-form-card animate-fade-in">
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
          {submitted ? (
            <div className="success-message">
              <h3>Thanks!</h3>
              <p>We'll keep your suggestion in mind!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flavor-form">
              <h3>Have a flavor idea?</h3>
              <p>Tell us what flavor(s) you want to see next!</p>
              <div className="flavor-form-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flavor-form-group">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flavor-form-group">
                <input 
                  type="tel" 
                  placeholder="Your Phone Number" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flavor-form-group">
                <textarea 
                  placeholder="Name of cookie/flavor combo idea..." 
                  rows="3" 
                  required
                  value={flavorIdea}
                  onChange={(e) => setFlavorIdea(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-secondary btn-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Idea'}
              </button>
            </form>
          )}
        </div>
      ) : (
        <button 
          className="flavor-bubble animate-bounce-slight" 
          onClick={() => setIsOpen(true)}
        >
          <div className="bubble-content">
            <Cloud size={28} />
            <span className="bubble-text">Tell us what flavor(s) you want to see next!</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default FlavorBubble;
