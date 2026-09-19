const express = require('express');
const cors = require('cors');

// Import routes (apne folder structure ke mutabiq paths check kar lein)
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes setup
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes); // Yeh line /api/search route serve karti hai

// Base route
app.get('/', (req, res) => {
    res.send('GiftLink API is running...');
});

module.exports = app;
