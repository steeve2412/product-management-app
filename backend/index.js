require('dotenv').config(); // This should be at the very top

// Importing necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.error('MongoDB connection error:', err));


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Authentication Routes
app.use('/auth', authRoutes);

// Product Routes
app.use('/api/products', productRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
