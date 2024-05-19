const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Create a new product
router.post('/products', async (req, res) => {
  const { name, description, price, category } = req.body;

  // Validate request data
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const product = new Product({ name, description, price, category });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Ensure validation is run on update
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!removedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
