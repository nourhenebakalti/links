require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/projects_routes');
const authRoutes = require('./routes/admin_route');
const morgan = require('morgan');
const path = require('path'); 

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB locally
// mongoose.connect('mongodb://localhost:27017/links')
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.error(err));


// Connect to MongoDB using environment variable
  mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));






// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Use the routes
app.use('/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
