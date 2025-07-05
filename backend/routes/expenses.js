const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const User = require('../models/User');

// POST /api/expenses - Create a new expense for a user
router.post('/', async (req, res) => {
  try {
    const { userId, title, amount, category, date, notes } = req.body;
    if (!userId || !title || !amount || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const expense = new Expense({
      user: userId,
      title,
      amount,
      category,
      date,
      notes
    });
    await expense.save();
    res.status(201).json({ message: 'Expense created', data: expense });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/expenses/:userId - Get all expenses for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    res.json({ data: expenses });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 