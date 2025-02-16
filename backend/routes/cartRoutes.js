const express = require('express');

const router = express.Router();

module.exports = (dynamoDB) => {
  // Get cart items
  router.get('/', async (req, res) => {
    const params = {
      TableName: 'Cart',
    };

    try {
      const data = await dynamoDB.scan(params).promise();
      res.json(data.Items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Add item to cart
  router.post('/', async (req, res) => {
    const params = {
      TableName: 'Cart',
      Item: req.body,
    };

    try {
      await dynamoDB.put(params).promise();
      res.status(201).json(params.Item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Remove item from cart
  router.delete('/:id', async (req, res) => {
    const params = {
      TableName: 'Cart',
      Key: {
        _id: req.params.id,
      },
    };

    try {
      const data = await dynamoDB.delete(params).promise();
      if (!data.Attributes) return res.status(404).json({ message: 'Item not found' });
      res.json({ message: 'Item removed successfully', item: data.Attributes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};
