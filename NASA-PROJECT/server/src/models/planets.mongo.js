const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  // to make it easier we should use the same name as the name in the frontend
  keplerName: {
    type: String,
    required: true,
  },
});
