import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './Home.css'; // Reuse some layout styles

const Success = () => {
  return (
    <div className="container text-center animate-fade-in" style={{ padding: '4rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <CheckCircle size={80} color="#ff9fb2" />
      </div>
      <h1 className="page-title">Order Received!</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        Thank you for your order! We'll be in contact with the pickup/drop-off details for your order.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
};

export default Success;
