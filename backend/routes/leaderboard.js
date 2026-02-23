const express = require('express');
const FitForConsumption = require('../models/FitForConsumption');
const FitForAnimals = require('../models/FitForAnimals');
const Spoiled = require('../models/Spoiled');

const router = express.Router();

router.get('/', async (req, res) => {
  const { fromDate, toDate } = req.query;

  try {
    const filter = {};
    if (fromDate && toDate) {
      // Parse the dates and create ISO date objects
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      // Set the filter to match the pickupDate range
      filter.pickupDate = {
        $gte: startDate.toISOString().split('T')[0], // Convert to YYYY-MM-DD
        $lte: endDate.toISOString().split('T')[0],   // Convert to YYYY-MM-DD
      };
    }

    // Fetch donations from the three collections
    const fitForConsumption = await FitForConsumption.find(filter).select('donorName pickupDate phoneNumber quantity');
    const fitForAnimals = await FitForAnimals.find(filter).select('donorName pickupDate phoneNumber quantity');
    const spoiled = await Spoiled.find(filter).select('donorName pickupDate phoneNumber quantity');

    // Combine all data
    const combinedData = [...fitForConsumption, ...fitForAnimals, ...spoiled];

    // Sort by quantity in descending order
    const sortedData = combinedData.sort((a, b) => b.quantity - a.quantity);

    // Aggregate donations by donorName and phoneNumber
    const aggregatedData = sortedData.reduce((acc, item) => {
      const key = `${item.donorName}-${item.phoneNumber}`;

      if (!acc[key]) {
        acc[key] = { date: item.pickupDate, donorName: item.donorName, phoneNumber: item.phoneNumber, totalQuantity: 0 };
      }
      acc[key].totalQuantity += item.quantity;
      return acc;
    }, {});

    // Convert aggregated data to array
    const finalData = Object.values(aggregatedData);

    // Return the data or message if no donors are found
    if (finalData.length === 0) {
      return res.status(200).json({ message: 'No donors available in the specified date range.', donors: [] });
    }

    res.status(200).json({ donors: finalData });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error.message);
    res.status(500).json({ message: 'Error fetching leaderboard data', error: error.message });
  }
});

module.exports = router;
