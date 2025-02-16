const express = require('express');

const router = express.Router();

module.exports = (dynamoDB) => {
  // Get all products
  router.get('/', async (req, res) => {
    const params = {
      TableName: 'ProductCatalog',
    };

    try {
      const data = await dynamoDB.scan(params).promise();
      res.json(data.Items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get a single product by ID
  router.get('/:id', async (req, res) => {
    const params = {
      TableName: 'ProductCatalog',
      Key: {
        ProductId: req.params.id,
      },
    };

    try {
      const data = await dynamoDB.get(params).promise();
      if (!data.Item) return res.status(404).json({ message: 'Product not found' });
      res.json(data.Item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create a new product
  router.post('/', async (req, res) => {
    const params = {
      TableName: 'ProductCatalog',
      Item: req.body,
    };

    try {
      await dynamoDB.put(params).promise();
      res.status(201).json(params.Item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  return router;
};