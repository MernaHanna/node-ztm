const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    // default: 100,
    // min: 100,
    // max: 999
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  // this approach makes it difficult because mongoose doesn't actually support joins
  // instead use the data directly in our model
  // targetPlanet: {
  //   type: mongoose.ObjectId,
  //   ref: 'Planet',
  // },
  targetPlanet: {
    type: String,
    required: true,
  },
  // customers: [
  //   {
  //     type: String,
  //     required: true,
  //   },
  // ],
  // or
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// const launchesSchema = new mongoose.Schema({
//   flightNumber: Number,
//   mission: String,
//   rocket: String,
//   launchDate: Date,
//   targetPlanet: String,
//   customers: [String],
//   upcoming: Boolean,
//   success: Boolean,
// });
