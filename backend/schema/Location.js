const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
  name: { type: String, required: true, index: true, unique: true },
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
