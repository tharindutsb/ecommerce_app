const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Product 1',
    price: 100,
    description: 'Description of Product 1',
    image: 'https://via.placeholder.com/250x250?text=Product+1',
  },
  {
    name: 'Product 2',
    price: 200,
    description: 'Description of Product 2',
    image: 'https://via.placeholder.com/250x250?text=Product+2',
  },
  {
    name: 'Product 3',
    price: 300,
    description: 'Description of Product 3',
    image: 'https://via.placeholder.com/250x250?text=Product+3',
  },
];

mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Products added successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error adding products:', error);
    mongoose.connection.close();
  });
