import React, { useState, useRef } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import './assets/styles/Register.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './assets/Images/Logo.png'; 
//import Navbar from './Reg_nav.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate(); // Initialize the navigate function

  const validateName = (name) => /^[A-Za-z]{2,}$/.test(name);
  const validatePhone = (phone) => /^[6-9][0-9]{9}$/.test(phone);
  const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateName(name)) {
      setErrorMessage('Name should not start with a number and must contain at least 2 alphabetic characters.');
      setShowModal(true);
      setLoading(false);
      return;
    }

    if (!validatePhone(phone)) {
      setErrorMessage('Phone number should start with 6-9 and contain exactly 10 digits.');
      setShowModal(true);
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email with "@example.com" format.');
      setShowModal(true);
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage('Password should be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.');
      setShowModal(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
        phone,
      });
      alert('Registration Successful');
      setLoading(false);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setLoading(false);
      alert(
        error.response && error.response.data
          ? error.response.data.message
          : 'Something went wrong, please try again.'
      );
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (errorMessage.includes('Name')) {
      nameRef.current.focus();
    } else if (errorMessage.includes('Phone')) {
      phoneRef.current.focus();
    } else if (errorMessage.includes('Email')) {
      emailRef.current.focus();
    } else if (errorMessage.includes('Password')) {
      passwordRef.current.focus();
    }
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="SurplusServe Logo" className="logo" />
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto"> 
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="register-container">
        <div className="register-box">
          <h2>SurplusServe</h2>
          <p>Create an Account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="role-group">
              <label id="role-label">Select Role</label>
              <div className="role-options">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="donor"
                    checked={role === 'donor'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Donor
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="receiver"
                    checked={role === 'receiver'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Receiver
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                ref={nameRef}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                ref={phoneRef}
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Log in here</a>
          </p>
        </div>
      </div>

      {showModal && (
        <Modal
          message={errorMessage}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Register;
