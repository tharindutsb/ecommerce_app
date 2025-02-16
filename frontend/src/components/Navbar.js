import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-xl font-bold" to="/">E-commerce</Link>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link className="text-white" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-white" to="/cart">View Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
