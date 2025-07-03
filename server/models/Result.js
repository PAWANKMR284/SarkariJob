const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releasedDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Result', resultSchema); 