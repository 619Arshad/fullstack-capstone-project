const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db'); // Apne database connection file ka path yahan check kar Lein

// 1. Get all gifts endpoint: /api/gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Get a single gift by ID endpoint: /api/gifts/:id
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const id = req.params.id;
        const gift = await collection.findOne({ id: id });
        
        if (!gift) {
            return res.status(404).json({ error: 'Gift not found' });
        }
        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift by ID:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
