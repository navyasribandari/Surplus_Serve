const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['donor', 'receiver', 'volunteer'], required: true },
  phoneNumber: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
});

module.exports = mongoose.model('User', UserSchema);