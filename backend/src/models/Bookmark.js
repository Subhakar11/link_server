const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  title: { type: String },
  favicon: { type: String },
  summary: { type: String },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);