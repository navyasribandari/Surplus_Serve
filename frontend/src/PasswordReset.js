import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './PasswordReset.css';

const PasswordReset = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });
      alert(response.data.message || 'Password reset successful!');
      // Redirect to login or other page
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-box">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="form-group"
        />
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-group"
        />
        <button onClick={handleResetPassword}>Reset Password</button>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default PasswordReset;
