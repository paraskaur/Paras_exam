const express = require('express');
const User = require('./models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });  
    await newUser.save();
    res.json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;