const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running!' });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 