import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post('/api/cart', { productId: product._id, quantity: 1 });
      alert('Product added to cart');
    } catch (error) {
      console.error(error);
      alert('Failed to add product to cart');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <button className="btn btn-primary mt-4" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;