import React, { useState } from 'react';
import axios from 'axios';
import './assets/styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/Images/Logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      const { user } = response.data;

      setLoading(false);

      if (user.role === 'donor') {
        navigate('/donor');
      } else if (user.role === 'receiver') {
        navigate('/receiver');
      } else if (user.role === 'volunteer') {
        navigate('/volunteer');
      } else {
        navigate('/'); // Default to home if role is not recognized
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Something went wrong, please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Something went wrong, please try again.');
    }
  };

  return (
    <div>
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
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome Back!</h2>
          <p>Log in to your SurplusServe account</p>
          {error && <div className="error-message">{error}</div>}
          {isForgotPassword ? (
            <form onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <label htmlFor="email">Enter your email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
              <button type="button" className="back-button" onClick={() => setIsForgotPassword(false)}>
                Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <p className="forgot-password" onClick={handleForgotPassword}>Forgot password?</p>
              <p className="register-link">
                Don't have an account? <Link to="/register">Sign up here</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
