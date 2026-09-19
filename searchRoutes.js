const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db'); // Apne database connection file ka path check kar lein

// Search endpoint to filter gifts based on category, condition, etc.
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');

        // Extract query parameters (e.g., category)
        const { category, condition, age } = req.query;
        let query = {};

        // Filter by category if provided
        if (category) {
            query.category = category;
        }
        
        // Optional extra filters if needed
        if (condition) {
            query.condition = condition;
        }
        if (age) {
            query.age = { $lte: Number(age) };
        }

        // Fetch filtered results from MongoDB
        const gifts = await collection.find(query).toArray();
        res.json(gifts);
        
    } catch (e) {
        console.error('Error searching/filtering gifts:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
