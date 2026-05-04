import React from 'react';
import { Link } from 'react-router-dom';
import FlavorBubble from '../components/FlavorBubble';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-content animate-fade-in">
          <img src="/logo.jpg" alt="Sugar Shell Bakehouse" className="hero-logo" />
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary">View Menu</Link>
            <Link to="/preorder" className="btn btn-secondary">Preorder Now</Link>
          </div>
        </div>
      </section>

      <section className="schedule-section container">
        <div className="schedule-card">
          <h2>How Our Preorders Work</h2>
          <div className="schedule-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Order Window</h3>
              <p>Preorders open on <strong>Monday at 8:00 AM</strong> and close on <strong>Friday at 6:00 PM</strong>.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>We Bake</h3>
              <p>We prepare your handcrafted treats with love and the finest ingredients.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Sunday Fulfillment</h3>
              <p>Pick up your order in Bedford or get it delivered straight to your door on Sunday.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section container">
        <div className="featured-grid">
          <div className="featured-item image-right">
            <div className="featured-text">
              <h2>Decadent Cookies</h2>
              <p>Experience our signature 4oz cookies, packed with premium ingredients. From our Dark Chocolate Dream to the Classic Chocolate Chip, there's a perfect cookie for everyone.</p>
              <Link to="/menu" className="btn btn-primary" style={{marginTop: '1rem'}}>Explore Cookies</Link>
            </div>
            <div className="featured-image cookie-img"></div>
          </div>
          
          <div className="featured-item image-left">
            <div className="featured-image brownie-img"></div>
            <div className="featured-text">
              <h2>Fudgy Brownies</h2>
              <p>Indulge in our rich, fudgy Double Chocolate Chip Brownies. Perfectly sized at 3x3 inches, they are the ultimate chocolate lover's dream.</p>
              <Link to="/menu" className="btn btn-secondary" style={{marginTop: '1rem'}}>Explore Brownies</Link>
            </div>
          </div>
        </div>
      </section>
      <FlavorBubble />
    </div>
  );
};

export default Home;
