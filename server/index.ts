import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';

// Import routes
import auth from './routes/auth';
import products from './routes/products';
import categories from './routes/categories';
import admin from './routes/admin';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for all API routes
app.use('/api/*', cors());

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', message: 'Twreedat API is running' });
});

// Mount API routes
app.route('/api/auth', auth);
app.route('/api/products', products);
app.route('/api/categories', categories);
app.route('/api/admin', admin);

// Serve client-side app for all non-API routes
// Cloudflare Pages will automatically serve static files from assets directory

export default app;
