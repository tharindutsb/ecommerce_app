import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Link to="/cart" className="btn btn-secondary mb-4">View Cart</Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div className="product-card" key={product._id}>
            <Link to={`/product/${product._id}`}>
              <img src={product.image} className="w-full h-48 object-cover mb-4" alt={product.name} />
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;