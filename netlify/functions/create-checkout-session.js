const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { items, phone, deliveryType, deliveryFee, isNextWeek } = JSON.parse(event.body);

    // Build line items for Stripe
    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.size || '',
          images: [], // You can add image URLs here if they are public
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }));

    // Add delivery fee as a line item if applicable
    if (deliveryType === 'delivery' && deliveryFee > 0) {
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Delivery Fee',
          },
          unit_amount: Math.round(deliveryFee * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'cashapp', 'amazon_pay'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.URL}/success`,
      cancel_url: `${process.env.URL}/preorder`,
      metadata: {
        phone,
        deliveryType,
        isNextWeek: isNextWeek ? 'true' : 'false',
      },
      // If you want to collect shipping address, you can add:
      // shipping_address_collection: { allowed_countries: ['US'] },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (error) {
    console.error('Stripe Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
