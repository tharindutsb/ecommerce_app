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
    <div>
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item._id}>
                <p>Product ID: {item.productId}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Complete Purchase</button>
        </div>
      )}
    </div>
  );
};

export default Checkout;