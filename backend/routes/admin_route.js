const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Project = require('../models/project_model');
const User = require('../models/Admin_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const decoded = jwt.verify(tokenWithoutBearer, 'links_feelinks'); // Change in production

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let { title } = req.body; // Get project title from request body

        // Replace spaces with underscores in the title
        title = title.replace(/\s+/g, '_');

        // Directory for project images
        const projectPath = path.join(__dirname, '../uploads', title);

        // Create directory if it doesn't exist
        fs.mkdir(projectPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err); // Pass the error to the callback
            }
            cb(null, projectPath); // Set the destination directory
        });
    },
    filename: function (req, file, cb) {
        // Create a unique filename using current timestamp and original file name
        cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
    },
});

const upload = multer({ storage });



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

        const token = jwt.sign({ userId: user._id }, 'links_feelinks', { expiresIn: '48h' }); // Change in production
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
    
    res.json({ message: 'Logged out successfully' });
});

// Get all projects
router.get('/projects', authMiddleware, async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});



router.get('/projects/:id', authMiddleware, async (req, res) => {
    const { id } = req.params; // Extract project ID from route params

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project); // Return the found project
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch project' });
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









// Create a new project
router.post('/projects', authMiddleware, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
    { name: 'behindTheSeancesPictures', maxCount: 5 }
]), async (req, res) => {
    const { 
        title, 
        description, 
        websiteLink, 
        youtubeLink, 
        client_type, 
        about_section, 
        categories, 
        location, 
        bulletPoints, 
        behindTheSeance  
    } = req.body;

    try {
        // Check if required fields are provided
        if (!title || !description || !req.files['coverImage']) {
            return res.status(400).json({ message: 'Title, description, and cover image are required.' });
        }
        
        // Construct the project title-safe directory
        const projectTitle = title.replace(/\s+/g, '_');
        const coverImagePath = `/uploads/${projectTitle}/${req.files['coverImage'][0].filename.replace(/\s+/g, '_')}`;
        
        const imagesPaths = req.files['images'] ? 
            req.files['images'].map(file => `/uploads/${projectTitle}/${file.filename.replace(/\s+/g, '_')}`) : [];
        
        // Handle behind the seance pictures
        const behindTheSeancesPicturesPaths = req.files['behindTheSeancesPictures'] ? 
            req.files['behindTheSeancesPictures'].map(file => `/uploads/${projectTitle}/${file.filename.replace(/\s+/g, '_')}`) : [];

        // Create the new project object
        const newProject = new Project({
            title,
            description,
            bulletPoints: bulletPoints || [], 
            coverImage: coverImagePath,
            images: imagesPaths,
            websiteLink,
            youtubeLink,
            client_type,
            about_section,
            categories: categories || '', 
            location: location || '', 
            behindTheSeance: behindTheSeance === 'true', // Ensure boolean conversion
            behindTheSeancesPictures: behindTheSeancesPicturesPaths
        });

        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
        
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ error: 'Failed to create project', details: err.message });
    }
});

// Update a project
router.put('/projects/:id', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 5 },
    { name: 'behindTheSeancesPictures', maxCount: 5 },
]), async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    // Handle bulletPoints: split if it's a comma-separated string
    if (updates.bulletPoints) {
        // Assuming the bullet points are sent as a comma-separated string
        updates.bulletPoints = updates.bulletPoints.split(',').map(item => item.trim());
    }

    // Handle file uploads and update paths
    if (req.files) {
        const projectTitle = updates.title.replace(/\s+/g, '_'); // Ensure title is sanitized for path

        if (req.files.coverImage) {
            updates.coverImage = `/uploads/${projectTitle}/${req.files.coverImage[0].filename.replace(/\s+/g, '_')}`;
        }
        if (req.files.images) {
            updates.images = req.files.images.map(file => `/uploads/${projectTitle}/${file.filename.replace(/\s+/g, '_')}`);
        }
        if (req.files.behindTheSeancesPictures) {
            updates.behindTheSeancesPictures = req.files.behindTheSeancesPictures.map(file => `/uploads/${projectTitle}/${file.filename.replace(/\s+/g, '_')}`);
        }
    }
    
    // Ensure behindTheSeance is a boolean value
    if (updates.behindTheSeance !== undefined) {
        updates.behindTheSeance = updates.behindTheSeance === 'true'; // Convert to boolean
    }

    try {
        const project = await Project.findByIdAndUpdate(id, updates, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (err) {
        console.error('Failed to update project:', err);
        res.status(500).json({ error: 'Failed to update project' });
    }
});



// Delete a project
router.delete('/projects/:id', authMiddleware, async (req, res) => {
    const { id } = req.params; 

    try {
        // Find the project to delete, so we can get its title for the folder path
        const project = await Project.findById(id); 
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Construct the path to the project folder
        const projectPath = path.join(__dirname, '../uploads', project.title);

        // Delete the project from the database
        await Project.findByIdAndDelete(id); 

        // Remove the directory and its contents
        fs.rmdir(projectPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Failed to delete project images:', err);
                return res.status(500).json({ message: 'Failed to delete project images' });
            }

            res.json({ message: 'Project deleted successfully and images removed.' }); 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});



// Get all images for a project
router.get('/:id/images', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the project by id
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Return images array
        res.json({
            coverImage: project.coverImage,
            images: project.images 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve images' });
    }
});

module.exports = router;
