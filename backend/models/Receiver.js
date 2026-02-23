const mongoose = require('mongoose');

const receiverSchema = new mongoose.Schema({
  receiverName: String,
  phoneNumber: String,
  location: String,
  category: String,
  donorId: mongoose.Schema.Types.ObjectId, // Reference to donor
  requiredQuantity: Number,
  date: Date,
});

module.exports = mongoose.model('Receiver', receiverSchema);
