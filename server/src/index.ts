import express from 'express';
import stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const app = express();
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10' as any,
});

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// Stripe Webhook needs raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripeClient.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    console.log(`Stripe Payment successful for session: ${session.id}`);
    // TODO: Fulfill the purchase
  }

  res.json({ received: true });
});

app.use(express.json());

// Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  const { priceId, tierName } = req.body;

  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/`,
      metadata: {
        tierName,
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// PayPal order verification
app.post('/api/verify-paypal-order', async (req, res) => {
  const { orderID, tierName } = req.body;

  try {
    // In a real app, you'd call PayPal API to verify the order status
    // For now, we stub it as successful
    console.log(`PayPal Order verified: ${orderID} for ${tierName}`);
    
    // Example fetch to PayPal:
    /*
    const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString('base64')}`
      }
    });
    const orderData = await response.json();
    */

    res.json({ status: 'COMPLETED' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
