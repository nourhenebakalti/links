const express = require('express');
const router = express.Router();
const Project = require('../models/project_model');
const User = require('../models/Admin_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware for authentication
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Admin Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key');
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Protected Admin Routes to be reviewed later on ....
router.get('/projects', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});


router.post('/register-admin', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10); 
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: 'admin'
      });
  
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create admin user' });
    }
  });

module.exports = router;