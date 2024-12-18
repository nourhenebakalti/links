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
        const decoded = jwt.verify(tokenWithoutBearer, 'your_secret_key'); // Change in production

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

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { title } = req.body; // Get project title from request body
        const projectPath = path.join(__dirname, '../uploads', title); // Directory for project images

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
        cb(null, Date.now() + '-' + file.originalname);
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

        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); // Change in production
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

// Add a new project with cover image and multiple images
router.post('/projects', authMiddleware, upload.fields(
    [{ name: 'coverImage', maxCount: 1 }, { name: 'images', maxCount: 10 }]
), async (req, res) => {
    const { title, description, websiteLink, youtubeLink, client_type, about_section } = req.body;

    try {
        // Check if required fields are provided
        if (!title || !description || !req.files['coverImage']) {
            return res.status(400).json({ message: 'Title, description, and cover image are required.' });
        }

        // Construct the relative paths for cover image and images
        const coverImagePath = `/uploads/${title}/${req.files['coverImage'][0].filename}`;
        const imagesPaths = req.files['images'] ? 
            req.files['images'].map(file => `/uploads/${title}/${file.filename}`) : [];

        // Create the new project object
        const newProject = new Project({
            title,
            description,
            coverImage: coverImagePath,
            images: imagesPaths,
            websiteLink,
            youtubeLink,
            client_type,
            about_section,
        });

        // Attempt to save the new project
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
        
    } catch (err) {
        console.error('Error creating project:', err); // Log the entire error
        res.status(500).json({ error: 'Failed to create project', details: err.message });
    }
});





router.put('/projects/:id', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
]), async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    if (req.files) {
        if (req.files.coverImage) {
            updates.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
        }
        if (req.files.images) {
            updates.images = req.files.images.map(file => `/uploads/${file.filename}`);
        }
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
