const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/S_demo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/donor', require('./routes/donor'));
//app.use('/api/receiver', require('./routes/receiver'));
app.use('/api/volunteer', require('./routes/volunteer'));
app.use('/api/donations', require('./routes/donations')); // Added donations route
const receiverRoutes = require('./routes/receiver');
app.use('/api/receiver', receiverRoutes);
const leaderboardRoutes = require('./routes/leaderboard');
app.use('/api/leaderboard', leaderboardRoutes);





// Start Server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
