const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lastDate: { type: String, required: true },
  applyLink: { type: String },
  notification: { type: String },
  essentialInfo: { type: String },
  notificationDate: { type: String },
  importantDates: [{ label: String, value: String }],
  applicationFees: [{ label: String, value: String }],
  vacancyDetails: [{ post: String, total: String, eligibility: String }],
  howToApply: { type: String },
  usefulLinks: [{ label: String, url: String, type: String }],
  faqs: [{ question: String, answer: String }],
  shortDetails: { type: String },
  ageLimit: { type: String },
  totalPosts: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema); 