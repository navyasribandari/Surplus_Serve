import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have React Router set up for navigation
import './Reg_nav.css'; // Styling for the navbar
import logo from './Images/Logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="SurplusServe Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
