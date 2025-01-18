const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  post_id: { type: String, required: true, unique: true },
  post: { type: String, default: '' },
  comments: [{ type: String, default: '' }],
  createdAt: { type: Number },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
