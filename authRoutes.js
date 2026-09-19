const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db'); // Database connection file ka path check kar lein
const bcrypt = require('bcryptjs');

// Login endpoint /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('users');

        const { email, password } = req.body;

        // Using findOne method to locate the user in the database by email
        const user = await collection.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Password comparison logic
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Success response
        res.json({
            authtoken: 'sample-auth-token-12345',
            userName: user.firstName,
            email: user.email
        });

    } catch (error) {
        console.error('Error during login authentication:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
