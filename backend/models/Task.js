const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  volunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donation: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
});

module.exports = mongoose.model('Task', TaskSchema);
