const express = require('express');
const FitForConsumption = require('../models/FitForConsumption');
const FitForAnimals = require('../models/FitForAnimals');
const compost=require('../models/Spoiled')
const Receiver = require('../models/Receiver');

const router = express.Router();

// Fetch donors by category with available quantity > 0
router.get('/donors', async (req, res) => {
  const { category } = req.query;

  try {
    let donors;
    if (category === 'consumption') {
      donors = await FitForConsumption.find({ availableQuantity: { $gt: 0 } });
    } else if (category === 'animals') {
      donors = await FitForAnimals.find({ availableQuantity: { $gt: 0 } });
    } else if (category === 'compost') {
      donors = await compost.find({ availableQuantity: { $gt: 0 } });
    }else {
      return res.status(400).send('Invalid category');
    }

    res.status(200).json(donors);
  } catch (err) {
    console.error('Error fetching donors:', err.message);
    res.status(500).send('Error fetching donors');
  }
});

// Save receiver details and update donor's available quantity
router.post('/', async (req, res) => {
  const {
    receiverName,
    phoneNumber,
    location,
    category,
    donorId,
    requiredQuantity,
    date,
  } = req.body;

  try {
    if (!receiverName || !phoneNumber || !location || !category || !donorId || !requiredQuantity) {
      return res.status(400).send('All fields are required');
    }

    // Find the donor
    let donor;
    if (category === 'consumption') {
      donor = await FitForConsumption.findById(donorId);
    } else if (category === 'animals') {
      donor = await FitForAnimals.findById(donorId);
    }else if (category === 'compost') {
      donor = await compost.findById(donorId);
    }

    if (!donor) {
      return res.status(404).send('Donor not found');
    }

    if (donor.availableQuantity < requiredQuantity) {
      return res.status(400).send('Required quantity exceeds available quantity');
    }

    // Deduct quantity
    donor.availableQuantity -= requiredQuantity;
    await donor.save();

    // Save receiver details
    const receiver = new Receiver({
      receiverName,
      phoneNumber,
      location,
      category,
      donorId,
      requiredQuantity,
      date,
    });

    await receiver.save();

    res.status(201).send('Receiver details saved and donor updated');
  } catch (err) {
    console.error('Error processing receiver request:', err.message);
    res.status(500).send('Error processing receiver request');
  }
});

module.exports = router;
