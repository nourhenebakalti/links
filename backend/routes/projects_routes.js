const express = require('express');
const router = express.Router();
const Project = require('../models/project_model');
const fs = require('fs');
const path = require('path');
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




module.exports = router;