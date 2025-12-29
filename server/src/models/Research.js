// models/Research.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  lead: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Planning', 'Ongoing', 'Completed', 'Published'],
    default: 'Planning'
  },
  startDate: Date,
  endDate: Date,
  image: String,
  documents: [String]
}, { _id: false });

const researchSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'carbon-footprint',
      'renewable-energy',
      'soil-conservation',
      'biodiversity',
      'waste-management',
      'water-pollution',
      'air-pollution',
      'urban-heat'
    ]
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  projects: [projectSchema],
  achievements: [{
    text: String,
    date: Date
  }],
  team: [{
    name: String,
    role: String,
    image: String
  }],
  publications: [{
    title: String,
    authors: String,
    journal: String,
    year: Number,
    link: String
  }],
  gallery: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Research', researchSchema);
