import React, { useState, useEffect } from 'react';
import profilePhoto from './profile.jpg';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
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
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDesc })
      });
      
      if (response.ok) {
        setNewTitle('');
        setNewDesc('');
        fetchProjects();
      }
    } catch (error) {
      console.error("Error adding project:", error);
    }
    setSubmitting(false);
  };

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
          <span style={{ cursor: 'pointer' }}>Architecture</span>
          <span style={{ cursor: 'pointer' }}>Systems</span>
          <span style={{ cursor: 'pointer' }}>Contact</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ 
        position: 'relative', 
        zIndex: 10,
        padding: '80px 20px 60px 20px', 
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
          fontSize: '46px', 
          fontWeight: '800', 
          color: '#ffffff',
          lineHeight: '1.2'
        }}>
          Building Scalable Systems & <span style={{ background: 'linear-gradient(135deg, #818cf8, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Modern Web Apps</span>
        </h1>
        
        <p style={{ 
          margin: '0 auto', 
          fontSize: '16px', 
          color: '#9ca3af', 
          maxWidth: '650px', 
          lineHeight: '1.6' 
        }}>
          Crafting high-performance MERN applications, distributed Java networks, and robust database infrastructures with precision.
        </p>
      </header>

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto 80px auto', padding: '0 20px' }}>
        
        {/* Add Project Form */}
        <section style={{ 
          background: 'rgba(17, 24, 39, 0.7)', 
          backdropFilter: 'blur(10px)',
          padding: '28px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
          marginBottom: '50px', 
          border: '1px solid rgba(255, 255, 255, 0.08)' 
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#ffffff', fontWeight: '600' }}>+ Deploy New Project to Backend</h3>
          <form onSubmit={handleAddProject} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '14px' }}>
            <input 
              type="text" 
              placeholder="Project Title" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ 
                background: 'rgba(3, 7, 18, 0.6)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                padding: '12px 16px', 
                borderRadius: '10px', 
                color: '#ffffff',
                outline: 'none',
                fontSize: '14px'
              }}
              required
            />
            <input 
              type="text" 
              placeholder="Short Description" 
              value={newDesc} 
              onChange={(e) => setNewDesc(e.target.value)}
              style={{ 
                background: 'rgba(3, 7, 18, 0.6)', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                padding: '12px 16px', 
                borderRadius: '10px', 
                color: '#ffffff',
                outline: 'none',
                fontSize: '14px'
              }}
              required
            />
            <button 
              type="submit" 
              disabled={submitting}
              style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                color: '#ffffff', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '10px', 
                fontWeight: '600', 
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                fontSize: '14px'
              }}
            >
              {submitting ? 'Adding...' : 'Add Project'}
            </button>
          </form>
        </section>

        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#ffffff' }}>Featured Works</h2>
          <span style={{ fontSize: '13px', color: '#6b7280', background: 'rgba(255,255,255,0.03)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            Live API Feed: Connected
          </span>
        </div>

        {/* Project Grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#9ca3af', padding: '40px' }}>Loading systems data...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id || Math.random()} style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  padding: '28px',
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
                    <div style={{
                      display: 'inline-block',
                      background: 'rgba(99, 102, 241, 0.15)',
                      color: '#818cf8',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      marginBottom: '16px',
                      letterSpacing: '0.5px'
                    }}>
                      SYSTEM ARCHITECTURE
                    </div>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#ffffff', fontWeight: '700' }}>{project.title}</h3>
                    <p style={{ margin: 0, color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>{project.description}</p>
                  </div>
                  <div style={{ marginTop: '25px', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#818cf8', fontSize: '13px', fontWeight: '600' }}>Explore Repository &rarr;</span>
                    <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: '#9ca3af' }}>No projects registered in cluster.</p>
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