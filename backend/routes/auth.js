// Import necessary modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({
            message: "Error creating user.",
            error: error.message // This will now send back the error message
        });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with user data and token
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in.", error });
    }
});

module.exports = router;
