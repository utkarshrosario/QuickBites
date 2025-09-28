import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import menuRoutes from './routes/menu.js';
import restaurantRoutes from './routes/restaurants.js';
import authRoutes, { authenticateToken } from './routes/auth.js';

dotenv.config();
const app = express();
app.use(helmet());
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://127.0.0.1:3000'];
    if (allowedOrigins.includes(origin)) return callback(null, true);
    else  return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running successfully', timestamp: new Date().toISOString() });
});
// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', (req, res) => {
  res.status(501).json({ message: 'User routes not implemented yet' });
});
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', (req, res) => {
  res.status(501).json({ message: 'Order routes not implemented yet' });
});
// Menu routes
app.use('/api/menu', menuRoutes);
app.use('*', (req, res) => {
  res.status(404).json({ status: 'error', message: `Route ${req.originalUrl} not found` });
});
// Global error handler
app.use((err, _req, res) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({ status: 'error', message: err.message || 'Internal server error' });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
export default app;