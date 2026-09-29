const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Direct in-memory sample projects
const myPortfolioProjects = [
  { _id: "1", title: "E-commerce Platform", description: "Full-stack MERN shopping app." },
  { _id: "2", title: "Distributed Banking System", description: "Java RMI and network synchronization prototype." },
  { _id: "3", title: "Personal Expense Tracker", description: "Web-based app with MySQL and PHP integration." }
];

// GET: Return projects directly as an array
app.get('/api/projects', (req, res) => {
  res.json(myPortfolioProjects);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running smoothly on http://localhost:${PORT}`);
});