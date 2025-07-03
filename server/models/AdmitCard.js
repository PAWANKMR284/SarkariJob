const mongoose = require('mongoose');

const admitCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  availableDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AdmitCard', admitCardSchema); 