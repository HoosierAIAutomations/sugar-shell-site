import { loadStripe } from '@stripe/stripe-js';

// Use environment variable for the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

export const initiateCheckout = async (items, phone, deliveryType, deliveryFee, isNextWeek) => {
    try {
        const response = await fetch('/.netlify/functions/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                items, 
                phone, 
                deliveryType, 
                deliveryFee,
                isNextWeek
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create checkout session');
        }

        const session = await response.json();
        
        // Redirect to Stripe Checkout
        window.location.href = session.url;
        
    } catch (error) {
        console.error('Checkout Error:', error);
        alert(`Checkout failed: ${error.message}`);
    }
};

export default stripePromise;
