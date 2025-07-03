const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sarkarijob', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Job = require('./models/Job');
const Result = require('./models/Result');
const AdmitCard = require('./models/AdmitCard');

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password123';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Jobs API
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json(jobs);
});
app.post('/api/jobs', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});
app.delete('/api/jobs/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.put('/api/jobs/:id', async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
});
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (e) {
    res.status(404).json({ error: 'Job not found' });
  }
});

// Results API
app.get('/api/results', async (req, res) => {
  const results = await Result.find().sort({ createdAt: -1 });
  res.json(results);
});
app.post('/api/results', async (req, res) => {
  const { title, releasedDate } = req.body;
  const result = new Result({ title, releasedDate });
  await result.save();
  res.status(201).json(result);
});
app.delete('/api/results/:id', async (req, res) => {
  await Result.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.put('/api/results/:id', async (req, res) => {
  const { title, releasedDate } = req.body;
  const result = await Result.findByIdAndUpdate(req.params.id, { title, releasedDate }, { new: true });
  res.json(result);
});

// Admit Cards API
app.get('/api/admit-cards', async (req, res) => {
  const admitCards = await AdmitCard.find().sort({ createdAt: -1 });
  res.json(admitCards);
});
app.post('/api/admit-cards', async (req, res) => {
  const { title, availableDate } = req.body;
  const admitCard = new AdmitCard({ title, availableDate });
  await admitCard.save();
  res.status(201).json(admitCard);
});
app.delete('/api/admit-cards/:id', async (req, res) => {
  await AdmitCard.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.put('/api/admit-cards/:id', async (req, res) => {
  const { title, availableDate } = req.body;
  const admitCard = await AdmitCard.findByIdAndUpdate(req.params.id, { title, availableDate }, { new: true });
  res.json(admitCard);
});

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Middleware to protect admin routes
function verifyAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const token = auth.split(' ')[1];
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

// Root endpoint
app.get('/', (req, res) => {
  res.send('Sarkari Job API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 