const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const { authLimiter } = require('./middleware/rateLimiter');
const { clerkAuth } = require('./middleware/auth');
const authRoutes = require('./routes/auth.routes');
const templateRoutes = require('./routes/template.routes');
const portfolioRoutes = require('./routes/portfolio.routes');
const uploadRoutes = require('./routes/upload.routes');
const publicRoutes = require('./routes/public.routes');
const userRoutes = require('./routes/user.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api', authLimiter);

// Clerk auth middleware
app.use(clerkAuth);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
