const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  author: { type: String, default: 'Anonymous' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const storySchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema]
});

module.exports = model('Story', storySchema);