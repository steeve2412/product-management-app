const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists." });
        }

        const newUser = new User({ username, password }); // Do not hash here; the pre-save middleware will handle it
        await newUser.save();

        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error creating user.", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error while logging in.", error: error.message });
    }
});

module.exports = router;
