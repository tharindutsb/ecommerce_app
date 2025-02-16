import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('/api/cart')
      .then(response => setCartItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCheckout = () => {
    // Handle the checkout process here
    alert('Thank you for your purchase!');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cartItems.map(item => (
              <li className="border p-4 mb-2 rounded" key={item._id}>
                <p>Product ID: {item.productId}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <button className="btn btn-success" onClick={handleCheckout}>Complete Purchase</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;