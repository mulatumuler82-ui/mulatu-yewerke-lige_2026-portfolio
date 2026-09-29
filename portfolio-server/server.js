
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Clean MongoDB Connection (Modern Mongoose syntax)
mongoose.connect('mongodb+srv://Cluster0:cluster0@cluster0.mongodb.net/portfolioDB?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected Successfully!'))
.catch(err => console.log('MongoDB Connection Error: ', err));

// Define Project Schema with Categories & Links
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'Full-Stack' }, // e.g., Full-Stack, Distributed, Machine Learning, Desktop
  techStack: [String], // e.g., ['React', 'Node.js', 'MongoDB']
  githubUrl: { type: String, default: '#' },
  liveUrl: { type: String, default: '#' },
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

// API Routes

// 1. Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add a new project
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, category, techStack, githubUrl, liveUrl } = req.body;
    const newProject = new Project({
      title,
      description,
      category: category || 'Full-Stack',
      techStack: techStack || ['React', 'Node.js'],
      githubUrl: githubUrl || '#',
      liveUrl: liveUrl || '#'
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});