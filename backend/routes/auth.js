const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { name, email, password, role, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
      role,
      phoneNumber: phone,
    });

    await newUser.save();

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: email,
      subject: 'Welcome to SurplusServe!',
      html: `
        <h1>Welcome to SurplusServe!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for registering with SurplusServe. We're excited to have you as part of our community working to minimize food wastage and address hunger. Together, we can make a difference!</p>
        <p>Feel free to log in and explore our platform.</p>
        <p>Warm regards,</p>
        <p>The SurplusServe Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the hashed password
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Forgot Password Route (OTP Generation)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    user.otp = otp;
    user.otpExpiry = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
});

// Reset Password Route
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
    user.password = hashedNewPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();
    res.status(200).json({ message: 'Password reset successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
});

module.exports = router;
