import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from './assets/Images/Logo.png'; 
import './assets/styles/Receiver.css';

const ReceiverPage = () => {
  const [formData, setFormData] = useState({
    receiverName: '',
    phoneNumber: '',
    location: '',
    category: '',
    donorId: '',
    requiredQuantity: '',
    date: '',
  });
  const [donors, setDonors] = useState([]);
  const [noFoodMessage, setNoFoodMessage] = useState(''); // State for displaying no food message

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const fetchDonors = async (category) => {
    try {
      const response = await axios.get('http://localhost:5000/api/receiver/donors', {
        params: { category },
      });

      const availableDonors = response.data.filter((donor) => donor.availableQuantity > 0);

      if (availableDonors.length === 0) {
        setNoFoodMessage('No food available for this category at the moment');
      } else {
        setNoFoodMessage(''); // Clear the message if donors are available
      }

      setDonors(availableDonors);
    } catch (error) {
      console.error('Error fetching donors:', error);
      alert('Error fetching donors!');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      setFormData({ ...formData, [name]: value, donorId: '', requiredQuantity: '' });
      fetchDonors(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/receiver', formData);
      alert('Receiver details submitted successfully!');
      setFormData({
        receiverName: '',
        phoneNumber: '',
        location: '',
        category: '',
        donorId: '',
        requiredQuantity: '',
        date: '',
      });
      setDonors([]);
      setNoFoodMessage(''); // Clear the message after successful submission
    } catch (error) {
      console.error('Error submitting receiver details:', error);
      alert('Error submitting receiver details!');
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
                <Link className="nav-link" to="/">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="receiver-container">
        <div className="receiver-box">
          <h2>Receiver Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Receiver Name:
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  placeholder="Enter receiver's name"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Category:
                
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="consumption">For Consumption</option>
                  <option value="animals">For Animals</option>
                  <option value="compost">For Compost</option>
                </select>
              
              </label>
            </div>
            {noFoodMessage && <p>{noFoodMessage}</p>} {/* Display the message if no food is available */}
            <div>
              <label>
                Select Donor:
                <select
                  name="donorId"
                  value={formData.donorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {donors.length > 0
                    ? donors.map((donor) => (
                        <option key={donor._id} value={donor._id}>
                          {donor.donorName} (Available: {donor.availableQuantity}
                          {formData.category === 'consumption' ? ' persons' : ' kgs'})
                        </option>
                      ))
                    : <option value="" disabled>No donors available</option>}
                </select>
              </label>
            </div>
            <div>
              <label>
                Required Quantity:
                <input
                  type="number"
                  name="requiredQuantity"
                  value={formData.requiredQuantity}
                  onChange={handleChange}
                  min="1"
                  max={
                    donors.find((donor) => donor._id === formData.donorId)?.availableQuantity || 0
                  }
                  placeholder="Enter required quantity"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today} // Restrict past dates
                  placeholder="Select a date"
                  required
                />
              </label>
            </div>
            <button type="submit" disabled={!formData.donorId || !formData.requiredQuantity}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReceiverPage;
