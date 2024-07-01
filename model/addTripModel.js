//ensure some sort of structure for the documents in our database collection
const mongoose = require('mongoose');

const addTripSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  modeOfTrip: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('addTrip', addTripSchema);