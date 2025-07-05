const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET endpoint for user signup page/form
router.get('/signup', (req, res) => {
  res.json({
    message: 'User signup endpoint',
    method: 'GET',
    description: 'This endpoint will be used to display signup form or get signup page',
    endpoint: '/api/auth/signup',
    status: 'Ready for implementation'
  });
});

// POST endpoint for user signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Username, email, and password are required',
        required: ['username', 'email', 'password']
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
        message: 'A user with this email already exists'
      });
    }

    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({
        error: 'Username taken',
        message: 'This username is already taken'
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      firstName,
      lastName
    });

    await user.save();

    // Return user data without password
    const userProfile = user.getProfile();

    res.status(201).json({
      message: 'User created successfully',
      data: userProfile
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to create user'
    });
  }
});

// GET endpoint for user login page/form
router.get('/login', (req, res) => {
  res.json({
    message: 'User login endpoint',
    method: 'GET',
    description: 'This endpoint will be used to display login form or get login page',
    endpoint: '/api/auth/login',
    status: 'Ready for implementation'
  });
});

// POST endpoint for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Email and password are required',
        required: ['email', 'password']
      });
    }

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Return user data without password
    const userProfile = user.getProfile();

    res.json({
      message: 'Login successful',
      data: userProfile
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to login'
    });
  }
});

// GET endpoint to check if user is authenticated
router.get('/me', (req, res) => {
  res.json({
    message: 'Get current user info endpoint',
    method: 'GET',
    description: 'This endpoint will return current user information',
    endpoint: '/api/auth/me',
    status: 'Ready for implementation'
  });
});

// PUT endpoint for updating user info
router.put('/me', async (req, res) => {
  try {
    const { username, email, firstName, lastName } = req.body;
    const userId = req.params.userId || 'mock-user-id'; // This will be replaced with actual user ID from JWT

    // Basic validation
    if (!username && !email && !firstName && !lastName) {
      return res.status(400).json({
        error: 'No fields to update',
        message: 'Provide at least one field to update',
        allowed: ['username', 'email', 'firstName', 'lastName']
      });
    }

    // Find user (mock implementation - will be replaced with actual user lookup)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User does not exist'
      });
    }

    // Update fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    await user.save();

    // Return updated user data without password
    const userProfile = user.getProfile();

    res.json({
      message: 'User updated successfully',
      data: userProfile
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to update user'
    });
  }
});

// GET endpoint for logout
router.get('/logout', (req, res) => {
  res.json({
    message: 'User logout endpoint',
    method: 'GET',
    description: 'This endpoint will handle user logout',
    endpoint: '/api/auth/logout',
    status: 'Ready for implementation'
  });
});

module.exports = router; 