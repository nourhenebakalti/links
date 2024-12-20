const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  bulletPoints: { type: [String], default: [] },
  coverImage: { type: String, required: true },
  images: { type: [String], default: [] },
  websiteLink: { type: String, default: '' },
  youtubeLink: { type: String, default: '' },
  client_type: { type: String, default: '' },
  about_section: { type: String, default: '' },
  dateOfCreation: { type: Date, default: Date.now },
  dateOfModification: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: true },
  categories: { type: String, default: '' }, 
  location: { type: String, default: '' },
  behindTheSeance: { type: Boolean, default: false },
  behindTheSeancesPictures: { type: [String], default: [] } 
});

// Middleware to update dateOfModification before saving
projectSchema.pre('save', function (next) {
  this.dateOfModification = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
