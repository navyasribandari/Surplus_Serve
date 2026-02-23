import React, { useState } from 'react';
import axios from 'axios';
import './assets/styles/ForgotPassword.css';
import Modal from './Modal';
import { Navigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPasswordResetPage, setIsPasswordResetPage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(response.data.message || 'OTP sent successfully!');
      setMessageType('success');
      setIsOtpSent(true);
      setIsPasswordResetPage(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong!');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(
        'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });
      setMessage('');
      setMessageType('');
      setIsModalVisible(true); // Show modal for successful password reset

      // Reset the form after successful password reset
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setIsOtpSent(false);
      setIsPasswordResetPage(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong!');
      setMessageType('error');
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setRedirectToLogin(true); // Redirect to login page
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {!isOtpSent && !isPasswordResetPage ? (
          <div>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-group"
            />
            <button onClick={handleRequestOtp} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        ) : isOtpSent && isPasswordResetPage ? (
          <div>
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
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-group"
            />
            <button onClick={handleResetPassword}>Reset Password</button>
          </div>
        ) : null}
        {message && (
          <p className={`message ${messageType === 'success' ? 'message-success' : 'message-error'}`}>
            {message}
          </p>
        )}
      </div>
      {isModalVisible && (
        <Modal message="Password reset successful! You can now log in." onClose={closeModal} />
      )}
    </div>
  );
};

export default ForgotPassword;
