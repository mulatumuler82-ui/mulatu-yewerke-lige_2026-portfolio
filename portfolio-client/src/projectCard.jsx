import React, { useState, useEffect } from 'react';
import ProjectCard from './projectCard';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch projects from your backend server
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      if (Array.isArray(data)) {
        setProjects(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle adding a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDesc })
      });
      
      if (response.ok) {
        setNewTitle('');
        setNewDesc('');
        fetchProjects(); // Refresh the list
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
    setSubmitting(false);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: '#f9fafb', minHeight: '100vh', color: '#1f2937' }}>
      
      {/* Navbar Header */}
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#4f46e5' }}>Mulatu.dev</h2>
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px', fontWeight: '500', color: '#4b5563' }}>
          <span>Projects</span>
          <span>Full-Stack Systems</span>
          <span>Contact</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', color: '#ffffff', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '36px', fontWeight: '800' }}>Full-Stack Software Engineering Portfolio</h1>
        <p style={{ margin: 0, fontSize: '16px', opacity: '0.9', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Specializing in MERN Web Applications, Distributed Systems Architecture, and Robust Desktop Software.
        </p>
      </header>

      {/* Main Content Container */}
      <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Add Project Form Section */}
        <section style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '40px', border: '1px solid #eaeaea' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#111827' }}>Add a New Project to Portfolio</h3>
          <form onSubmit={handleAddProject} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Project Title" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
              required
            />
            <input 
              type="text" 
              placeholder="Short Description" 
              value={newDesc} 
              onChange={(e) => setNewDesc(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
              required
            />
            <button 
              type="submit" 
              disabled={submitting}
              style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              {submitting ? 'Adding...' : 'Add Project'}
            </button>
          </form>
        </section>

        {/* Projects Section Heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Featured Projects</h2>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>Live from Express Backend API</span>
        </div>

        {/* Project Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>Loading projects...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard 
                  key={project._id || Math.random()} 
                  title={project.title} 
                  description={project.description} 
                />
              ))
            ) : (
              <p style={{ color: '#6b7280' }}>No projects available.</p>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '30px', color: '#9ca3af', fontSize: '14px', borderTop: '1px solid #e5e7eb', marginTop: '60px' }}>
        &copy; 2026 Full-Stack MERN Portfolio. Built with React & Node.js.
      </footer>
    </div>
  );
}

export default App;