const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

let UsersSchema = require('../models/users');

// Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UsersSchema({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});
  
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UsersSchema.findOne({ email });
        if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '120s' });
        console.log(`Token ${token}`);
        // console.log("User ID:", user._id);

        // Set the token as a cookie
        res.cookie('token', token);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Logout 
router.post('/logout', (req, res) => {
    // Clear the refresh token from the server (if applicable)
    
    // You would typically remove the user's refresh token from the database here
  
    // Clear the access token cookie from the client
    res.clearCookie('token', {
        expires: new Date(Date.now() - 1), // Set cookie to expire immediately
        httpOnly: true,
    });
  
    // Send a response indicating successful logout
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;


