const express = require('express');
const FitForConsumption = require('../models/FitForConsumption');
const FitForAnimals = require('../models/FitForAnimals');
const Spoiled = require('../models/Spoiled');

const router = express.Router();

// Route to handle donations
router.post('/', async (req, res) => {
  const { donorName, phoneNumber,location, category, foodType, quantity, pickupDate, } = req.body;

  try {
    if (!donorName || !phoneNumber || !quantity || !location) {
      return res.status(400).send('Donor name, phone number,location and quantity are required');
    }

    if (category === 'Fit for Consumption') {
      if (!foodType || !['Veg', 'Non-Veg', 'Desserts'].includes(foodType)) {
        return res.status(400).send('Invalid or missing foodType for Fit for Consumption');
      }
      const newItem = new FitForConsumption({
        donorName,
        phoneNumber,
        location,
        foodType,
        quantity,
        availableQuantity: quantity, // Initialize availableQuantity
        pickupDate,
      });
      await newItem.save();
    } else if (category === 'Fit for Animals') {
      if (!foodType || !['Veg', 'Non-Veg'].includes(foodType)) {
        return res.status(400).send('Invalid or missing foodType for Fit for Animals');
      }
      const newItem = new FitForAnimals({
        donorName,
        phoneNumber,
        location,
        foodType,
        quantity,
        availableQuantity: quantity, // Initialize availableQuantity
        pickupDate,
      });
      await newItem.save();
    } else if (category === 'Spoiled') {
      const newItem = new Spoiled({
        donorName,
        phoneNumber,
        location,
        quantity,
        availableQuantity: quantity, // Initialize availableQuantity
        pickupDate,
      });
      await newItem.save();
    } else {
      return res.status(400).send('Invalid category');
    }

    res.status(201).send('Donation created successfully');
  } catch (err) {
    console.error('Error while saving donation:', err.message);
    res.status(500).send('Error saving donation');
  }
});

// Route to update available quantity
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { quantityTaken } = req.body;

  try {
    let item;

    // Find the donation across categories
    item = await FitForConsumption.findById(id) ||
           await FitForAnimals.findById(id) ||
           await Spoiled.findById(id);

    if (!item) {
      return res.status(404).send('Donation not found');
    }

    // Update the available quantity
    if (item.availableQuantity - quantityTaken < 0) {
      return res.status(400).send('Quantity taken exceeds available quantity');
    }

    item.availableQuantity -= quantityTaken;

    await item.save();

    res.status(200).send('Available quantity updated successfully');
  } catch (err) {
    console.error('Error while updating available quantity:', err.message);
    res.status(500).send('Error updating available quantity');
  }
});

module.exports = router;
