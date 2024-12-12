const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projects_routes');
const authRoutes = require('./routes/admin_route');
const morgan = require('morgan');


const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/links')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
// Use the routes
app.use('/api/auth', authRoutes); // Add auth routes
app.use('/api/projects', projectRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});