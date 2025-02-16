const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Use routes
app.use('/api/products', productRoutes(dynamoDB));
app.use('/api/cart', cartRoutes(dynamoDB));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
