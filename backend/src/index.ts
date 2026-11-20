import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import mediaRoutes from './routes/media.routes.js';
import publicRoutes from './routes/public.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving for disk storage fallback
app.use('/uploads', express.static(path.join(process.cwd(), 'dist', 'uploads')));

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://yashharwanii1119-cybeer.github.io',
  'https://admin.shreeshivshaktiart.com',
  'https://sssa-website.vercel.app',
  ...(process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',') : []),
  ...(process.env.ADMIN_ORIGIN ? process.env.ADMIN_ORIGIN.split(',') : [])
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (process.env.NODE_ENV !== 'production') {
      callback(null, true); // Permissive in dev only
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/public', publicRoutes); // Public read-only endpoints for main storefront

// Health Check
const getHealthStatus = () => ({
  status: 'ok',
  service: 'SSSA Backend',
  timestamp: new Date().toISOString()
});

app.get('/health', (req, res) => {
  res.json(getHealthStatus());
});

app.get('/api/health', (req, res) => {
  res.json(getHealthStatus());
});

// Error handling middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[SSSA Backend] Server running on port ${PORT}`);
  });
}

export default app;
