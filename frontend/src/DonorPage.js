import React, { useState } from 'react';
import axios from 'axios';
import './assets/styles/Donor.css';
import { Link } from 'react-router-dom'; 
import logo from './assets/Images/Logo.png'; 
import Modal from './Modal'; // Import the Modal component

const DonorPage = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    phoneNumber: '',
    location: '',
    category: '',
    foodType: '',
    quantity: '',
    pickupDate: '',
  });

  const [errors, setErrors] = useState({
    donorName: '',
    phoneNumber: '',
    serverError: '',
  });

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message

  const today = new Date().toISOString().split('T')[0];

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const donorNameRegex = /^[^\d][a-zA-Z\s]{2,}$/;
    const phoneNumberRegex = /^[6-9]\d{9}$/;

    let formErrors = {};

    if (!donorNameRegex.test(formData.donorName)) {
      formErrors.donorName = 'Name should be at least 2 characters and not start with a number';
    }

    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Phone number must be 10 digits and start with 6-9';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/donations', formData);
      setFormData({
        donorName: '',
        phoneNumber: '',
        location: '',
        category: '',
        foodType: '',
        quantity: '',
        pickupDate: '',
      });
      setErrors({});
      
      // Show modal with a success message
      setModalMessage('Donation registered successfully! Thank you for donating.');
      setShowModal(true); // Show the modal
    } catch (err) {
      setErrors({ serverError: 'Error creating donation. Please try again.' });
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
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
      <div className="donor-container">
        <div className="donor-box">
          <h1>Donor Page</h1>
          {errors.serverError && <div className="error">{errors.serverError}</div>}
          <form onSubmit={handleFormSubmit}>
            <div className="input-group">
              <label>Donor Name</label>
              <input
                type="text"
                placeholder="Enter donor name"
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                required
              />
              {errors.donorName && <div className="error">{errors.donorName}</div>}
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
              {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
            </div>

            <div className="input-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, foodType: '' })}
                required
              >
                <option value="">Select Category</option>
                <option value="Fit for Consumption">Fit for Consumption</option>
                <option value="Fit for Animals">Fit for Animals</option>
                <option value="Spoiled">Spoiled</option>
              </select>
            </div>

            <div className="input-group">
              <label>Food Type</label>
              <select
                value={formData.foodType}
                onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                required
                disabled={formData.category === 'Spoiled'}
              >
                <option value="">Select Food Type</option>
                {formData.category === 'Fit for Consumption' && (
                  <>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Desserts">Desserts</option>
                  </>
                )}
                {formData.category === 'Fit for Animals' && (
                  <>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                  </>
                )}
                {formData.category === 'Spoiled' && <option value="Spoiled">Spoiled</option>}
              </select>
            </div>

            <div className="input-group">
              <label>Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity (kg or people)"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                min="1"
                required
              />
            </div>

            <div className="input-group">
              <label>Pickup Date</label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                min={today}
                required
              />
            </div>

            <button type="submit">Register Donation</button>
          </form>
        </div>
      </div>

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default DonorPage;
