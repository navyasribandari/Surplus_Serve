const mongoose = require('mongoose');

const fitForConsumptionSchema = new mongoose.Schema({
  donorName: String,
  phoneNumber: String,
  location:String,
  foodType: String,
  quantity: Number,
  availableQuantity: Number, // Field to track remaining quantity
  pickupDate: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure the date is in YYYY-MM-DD format
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid date format!`,
    },
  },
});

// Pre-save middleware to format the date to YYYY-MM-DD
fitForConsumptionSchema.pre('save', function (next) {
  if (this.pickupDate instanceof Date) {
    const date = this.pickupDate;
    this.pickupDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
  }
  next();
});

module.exports = mongoose.model('FitForConsumption', fitForConsumptionSchema);
