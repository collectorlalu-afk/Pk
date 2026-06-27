import express from 'express';
import stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import crypto from 'crypto';
import path from 'path';
import * as db from './db.js';

dotenv.config();

const app = express();
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10' as any,
});

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// Admin authentication middleware
const adminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const adminToken = req.headers['admin-token'];
  if (adminToken === process.env.ADMIN_TOKEN) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Stripe Webhook
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
    
    await fulfillOrder(session.id, session.customer_details.email, session.amount_total / 100, session.metadata.items);
  }

  res.json({ received: true });
});

app.use(express.json());

async function fulfillOrder(orderId: string, email: string, total: number, itemsJson: string) {
  try {
    // 1. Record order
    db.orders.create({
      id: orderId,
      customer_email: email,
      total_amount: total,
      payment_status: 'completed',
      delivery_status: 'fulfilled',
      items_purchased: itemsJson
    });

    // 2. Upsert customer
    db.customers.upsert(email, orderId);

    // 3. Generate download tokens for each product
    const items = JSON.parse(itemsJson);
    for (const item of items) {
      const token = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
      db.downloadTokens.create(token, orderId, item.id, expiresAt);
      
      // In a real app, you'd email this token/link to the customer
      console.log(`Generated download link for ${email}: /api/download/${token}`);
    }
  } catch (error) {
    console.error('Fulfillment error:', error);
  }
}

// Public Products API
app.get('/api/products', (req, res) => {
  try {
    const products = db.products.getAll();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    const product = db.products.getById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Download API
app.get('/api/download/:token', (req, res) => {
  try {
    const tokenData = db.downloadTokens.verify(req.params.token);
    if (tokenData) {
      const product = db.products.getById(tokenData.product_id);
      if (product && product.download_link) {
        // In a real app, you might redirect to a signed S3 URL or serve the file
        res.json({ download_url: product.download_link });
      } else {
        res.status(404).json({ error: 'File not found' });
      }
    } else {
      res.status(403).json({ error: 'Invalid or expired token' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'No items provided' });
  }

  try {
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        items: JSON.stringify(items.map(i => ({ id: i.id, name: i.name })))
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Admin API
app.get('/api/admin/analytics', adminAuth, (req, res) => {
  try {
    const analytics = db.orders.getAnalytics();
    res.json(analytics[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/orders', adminAuth, (req, res) => {
  try {
    const orders = db.orders.getAll();
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/products', adminAuth, (req, res) => {
  try {
    db.products.create(req.body);
    res.status(201).json({ message: 'Product created' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/products/:id', adminAuth, (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    db.products.update(id, req.body);
    res.json({ message: 'Product updated' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/products/:id', adminAuth, (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    db.products.delete(id);
    res.json({ message: 'Product deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from the React app
const distPath = path.join(process.cwd(), '../dist');
app.use(express.static(distPath));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*path', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = parseInt(process.env.PORT || '3000');
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
