import React, { useState, useEffect } from 'react';
import profilePhoto from './profile.jpg';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Form state for adding projects
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Full-Stack');
  const [newTech, setNewTech] = useState('React, Node.js, MongoDB');
  const [newGithub, setNewGithub] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    setSubmitting(true);
    try {
      const techArray = newTech.split(',').map(t => t.trim());
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: newTitle, 
          description: newDesc, 
          category: newCategory,
          techStack: techArray,
          githubUrl: newGithub || '#'
        })
      });
      
      if (response.ok) {
        setNewTitle('');
        setNewDesc('');
        setNewGithub('');
        fetchProjects();
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
    setSubmitting(false);
  };

  // Filter projects based on selected tab
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      background: '#0a0f1d', 
      minHeight: '100vh', 
      color: '#f3f4f6',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      
      {/* Background Ambient Glow */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(13, 18, 30, 0) 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* Navbar */}
      <nav style={{ 
        position: 'relative', 
        zIndex: 10,
        background: 'rgba(10, 15, 29, 0.8)', 
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
        padding: '20px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '12px', height: '12px', background: '#6366f1', borderRadius: '50%', boxShadow: '0 0 10px #6366f1' }}></div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.5px' }}>MULATU.DEV</h2>
        </div>
        <div style={{ display: 'flex', gap: '25px', fontSize: '14px', fontWeight: '500', color: '#9ca3af' }}>
          <span style={{ color: '#ffffff', cursor: 'pointer' }}>Portfolio</span>
          <span style={{ cursor: 'pointer' }}>Systems</span>
          <span style={{ cursor: 'pointer' }}>Machine Learning</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ 
        position: 'relative', 
        zIndex: 10,
        padding: '70px 20px 40px 20px', 
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Glowing Developer Photo Avatar */}
        <div style={{
          position: 'relative',
          width: '130px',
          height: '130px',
          margin: '0 auto 25px auto',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          padding: '4px',
          boxShadow: '0 0 35px rgba(99, 102, 241, 0.4)'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: '#111827',
            borderRadius: '50%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={profilePhoto} 
              alt="Mulatu Jaleta"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '20px',
            height: '20px',
            background: '#10b981',
            border: '3px solid #0a0f1d',
            borderRadius: '50%'
          }}></div>
        </div>

        <div style={{
          display: 'inline-block',
          background: 'rgba(99, 102, 241, 0.1)',
          color: '#818cf8',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '20px',
          letterSpacing: '0.5px'
        }}>
          FULL-STACK SOFTWARE ENGINEER & SYSTEM ARCHITECT
        </div>

        <h1 style={{ 
          margin: '0 0 15px 0', 
          fontSize: '42px', 
          fontWeight: '800', 
          color: '#ffffff',
          lineHeight: '1.2'
        }}>
          Engineering Scalable Web Apps & <span style={{ background: 'linear-gradient(135deg, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Distributed Systems</span>
        </h1>
        
        <p style={{ 
          margin: '0 auto', 
          fontSize: '15px', 
          color: '#9ca3af', 
          maxWidth: '700px', 
          lineHeight: '1.6' 
        }}>
          Showcasing production-grade MERN solutions, Java network pipelines, and machine learning models built for high-performance environments.
        </p>
      </header>

      {/* Main Content Dashboard */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: '1050px', margin: '0 auto 80px auto', padding: '0 20px' }}>
        
        {/* Quick Add Project Control Card */}
        <section style={{ 
          background: 'rgba(17, 24, 39, 0.7)', 
          backdropFilter: 'blur(10px)',
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
          marginBottom: '40px', 
          border: '1px solid rgba(255, 255, 255, 0.08)' 
        }}>
          <h3 style={{ margin: '0 0 14px 0', fontSize: '17px', color: '#ffffff', fontWeight: '600' }}>+ Register New Engineering Project to Cluster</h3>
          <form onSubmit={handleAddProject} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Project Title" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ background: 'rgba(3, 7, 18, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', outline: 'none', fontSize: '13px' }}
              required
            />
            <input 
              type="text" 
              placeholder="Short Description" 
              value={newDesc} 
              onChange={(e) => setNewDesc(e.target.value)}
              style={{ background: 'rgba(3, 7, 18, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', outline: 'none', fontSize: '13px' }}
              required
            />
            <select 
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)}
              style={{ background: '#030712', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', outline: 'none', fontSize: '13px' }}
            >
              <option value="Full-Stack">Full-Stack (MERN)</option>
              <option value="Distributed">Distributed Systems</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Desktop">Java / Desktop</option>
            </select>
            <input 
              type="text" 
              placeholder="Tech Stack (comma separated)" 
              value={newTech} 
              onChange={(e) => setNewTech(e.target.value)}
              style={{ background: 'rgba(3, 7, 18, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', outline: 'none', fontSize: '13px' }}
            />
            <input 
              type="text" 
              placeholder="GitHub URL" 
              value={newGithub} 
              onChange={(e) => setNewGithub(e.target.value)}
              style={{ background: 'rgba(3, 7, 18, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '10px 14px', borderRadius: '8px', color: '#ffffff', outline: 'none', fontSize: '13px' }}
            />
            <button 
              type="submit" 
              disabled={submitting}
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)', fontSize: '13px' }}
            >
              {submitting ? 'Deploying...' : 'Add Project'}
            </button>
          </form>
        </section>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#ffffff' }}>Engineering Portfolio</h2>
          
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(17, 24, 39, 0.8)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {['All', 'Full-Stack', 'Distributed', 'Machine Learning', 'Desktop'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? '#6366f1' : 'transparent',
                  color: selectedCategory === cat ? '#ffffff' : '#9ca3af',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '40px' }}>Loading projects from cluster...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '24px' }}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project._id || Math.random()} style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{
                        background: 'rgba(99, 102, 241, 0.15)',
                        color: '#818cf8',
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        letterSpacing: '0.5px'
                      }}>
                        {project.category || 'Full-Stack'}
                      </span>
                      <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></span>
                    </div>

                    <h3 style={{ margin: '0 0 10px 0', fontSize: '19px', color: '#ffffff', fontWeight: '700' }}>{project.title}</h3>
                    <p style={{ margin: '0 0 16px 0', color: '#9ca3af', fontSize: '13px', lineHeight: '1.6' }}>{project.description}</p>
                    
                    {/* Tech Stack Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {project.techStack && project.techStack.map((tech, i) => (
                        <span key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#d1d5db', fontSize: '11px', padding: '3px 8px', borderRadius: '6px' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href={project.githubUrl || '#'} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
                      Source Code &rarr;
                    </a>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>Verified Build</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#9ca3af', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>No projects found under this category.</p>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ 
        position: 'relative', 
        zIndex: 10,
        textAlign: 'center', 
        padding: '40px', 
        color: '#6b7280', 
        fontSize: '13px', 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)' 
      }}>
        <p style={{ margin: 0 }}>&copy; 2026 Mulatu Jaleta Abdeta. Engineered with React, Node.js & Express.</p>
      </footer>
    </div>
  );
}

export default App;