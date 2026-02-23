import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/styles/Leaderboard.css';
import { Link } from 'react-router-dom';
import logo from './assets/Images/Logo.png';

const Leaderboard = () => {
  const [donors, setDonors] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchLeaderboardData = async () => {
    try {
      // Ensure fromDate and toDate are properly formatted and passed to the backend
      const response = await axios.get('http://localhost:5000/api/leaderboard', {
        params: { fromDate, toDate },
      });

      const { donors, message } = response.data;

      if (donors.length === 0) {
        setErrorMessage(message || 'No donors available in this date range.');
        setDonors([]);
      } else {
        setErrorMessage('');
        setDonors(donors);
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error.message);
      setErrorMessage('Error fetching leaderboard data. Please try again.');
    }
  };

  const handleDateFilter = (e) => {
    e.preventDefault();
    fetchLeaderboardData();
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard-background">
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
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="leaderboard-container">
        <div className="leaderboard-box">
          <h1>Leaderboard</h1>
          <form className="date-filter-form" onSubmit={handleDateFilter}>
            <div className="date-input-group">
              <label htmlFor="fromDate">From:</label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="date-input-group">
              <label htmlFor="toDate">To:</label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <button type="submit">Filter</button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {donors.length > 0 ? (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Date</th>
                  <th>Donor Name</th>
                  <th>Phone Number</th>
                  <th>Total Quantity</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(donor.date).toLocaleDateString()}</td>
                    <td>{donor.donorName}</td>
                    <td>{donor.phoneNumber}</td>
                    <td>{donor.totalQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !errorMessage && <p>No donors available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
