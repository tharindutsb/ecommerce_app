import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    console.log('Fetching cart items...');
    axios.get('/api/cart')
      .then(response => {
        console.log('Cart items fetched:', response.data);
        setCartItems(response.data);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  }, []);

  const removeFromCart = async (id) => {
    try {
      console.log(`Attempting to remove item with id: ${id}`);
      const response = await axios.delete(`/api/cart/${id}`);
      console.log('Remove response:', response.data);
      
      // Update the state using a function to ensure you're using the latest state
      setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
      console.log('Item removed');
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item from cart');
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item._id}>
                <p>Product ID: {item.productId}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;