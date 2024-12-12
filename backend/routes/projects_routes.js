const express = require('express');
const router = express.Router();
const Project = require('../models/project_model');

// API endpoint to fetch projects (filtered by hidden)
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({ hidden: false });
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// API endpoint to fetch a single project
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});

// API endpoint to create a new project
router.post('/', async (req, res) => {
    const { title, description, coverImage, images, websiteLink, youtubeLink, client_type, about_section } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            coverImage,
            images,
            websiteLink,
            youtubeLink,
            client_type,
            about_section
        });

        const savedProject = await newProject.save();
        res.json(savedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// API endpoint to update a project
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, coverImage, images, websiteLink, youtubeLink, client_type, about_section } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(id, {
            title,
            description,
            coverImage,
            images,
            websiteLink,
            youtubeLink,
            client_type,
            about_section
        }, { new: true });

        res.json(updatedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// API endpoint to delete a project
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        res.json(deletedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

module.exports = router;