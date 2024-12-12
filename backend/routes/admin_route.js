const express = require('express');
const router = express.Router();
const Project = require('../models/project_model');
const User = require('../models/Admin_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Middleware to check if user is authenticated
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
      
      const tokenWithoutBearer = token.replace('Bearer ', '');

      const decoded = jwt.verify(tokenWithoutBearer, '123'); // this should be changed in production
     
      if (!decoded.userId) {
          return res.status(401).json({ error: 'Invalid token' });
      }

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




// Login
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

        const token = jwt.sign({ userId: user._id }, '123', { expiresIn: '1h' }); // this should be changed in production
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Register admin
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

// Logout
router.post('/logout', authMiddleware, (req, res) => {
   localStorage.removeItem('authToken');
  res.json({ message: 'Logged out successfully' });
});


// get all projects
router.get('/projects', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Toggle project visibility
  router.put('/projects/:id/toggle-hidden', authMiddleware, async (req, res) => {
    const { id } = req.params;
  
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      project.hidden = !project.hidden;
      await project.save();
  
      res.json(project);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to toggle project visibility' });
    }
  });



// Add a new project
router.post('/projects', authMiddleware, async (req, res) => {
  const { projectData } = req.body; 

  try {
    const newProject = await Project.create(projectData); 
    if (!newProject) {
      return res.status(400).json({ message: 'Failed to create project' });
    }

    res.status(201).json(newProject); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

 


// Update a project
router.put('/projects/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { updates } = req.body; // Assuming updates is an object containing changes

  try {
    const project = await Project.findByIdAndUpdate(id, updates, { new: true }); // Return updated document
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});



// Delete a project
router.delete('/projects/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});


module.exports = router;