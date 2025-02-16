const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

// Get cart items
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  const cartItem = new Cart(req.body);
  try {
    const newCartItem = await cartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Received request to remove item with id: ${req.params.id}`);
    
    // Find and delete the item by its ID
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    
    // If no item was found, return a 404 error
    if (!cartItem) {
      console.log('Item not found');
      return res.status(404).json({ message: 'Item not found' });
    }
    
    // Log the successful deletion (you can customize this log)
    console.log('Item removed:', cartItem._id);
    
    // Send a success response with the deleted item info
    res.json({ message: 'Item removed successfully', item: cartItem });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
