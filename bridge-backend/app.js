const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

// Import routes
const quoteRoutes = require('./routes/quoteRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Use routes
app.use('/api/quotes', quoteRoutes);
app.use('/api/tokens', tokenRoutes);
app.use('/api/params', transactionRoutes);

module.exports = app;
