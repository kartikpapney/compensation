const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkipSchema = new Schema({
  post_id: { type: String, required: true, unique: true, index: true },
});

const Skip = mongoose.model('Skip', SkipSchema);

module.exports = Skip;
