const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, 'secretKey');
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, password, role });
    res.status(201).json({ _id: user._id, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
