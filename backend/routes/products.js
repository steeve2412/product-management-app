const express = require('express');
const Product = require('../models/Products'); 
const auth = require('./auth'); 

const router = express.Router();
router.get('/', auth, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
router.post('/', auth, async (req, res) => {
    console.log(req.body);  // Log the request body to debug
    const { name, price, description } = req.body;
    try {
        if (!name || !price || !description) {
            return res.status(400).json({ msg: 'All fields are required' });
        }
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json({ msg: 'Product removed' });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});
module.exports = router;