const mongoose = require('mongoose');

// Candidate Schema
const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  dob: Date,
  workExperience: String,
  resumeTitle: String,
  currentLocation: String,
  postalAddress: String,
  currentEmployer: String,
  currentDesignation: String,

});

const Candidate = mongoose.model('KlimbCandidates', candidateSchema);

module.exports = Candidate;
