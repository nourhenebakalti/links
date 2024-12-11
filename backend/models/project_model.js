const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverImage: String,
  images: [String], 
  websiteLink: String,
  youtubeLink: String,
  client_type: String,
  about_section: String,
  dateOfCreation: {
    type: Date,
    default: Date.now
  },
  dateOfModification: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Project', projectSchema);