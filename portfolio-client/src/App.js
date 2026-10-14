import React from 'react';
import { projectsData } from './projectsData';
import ProjectCard from './ProjectCard';
import './ProjectCard.css'; // Make sure your styles are linked

// Circular Rotating Name Component for the Top-Left
function CircularNameBadge() {
  const name = "MULATU JALETA • SOFTWARE ENGINEER • ";

  return (
    <a href="#hero" style={{ textDecoration: 'none', position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px' }}>
      {/* Rotating Ring with SVG Curved Text */}
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', animation: 'spin 12s linear infinite' }}>
        <svg style={{ width: '100%', height: '100%', overflow: 'visible' }} viewBox="0 0 100 100">
          <path
            id="textPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text style={{ fontSize: '10.5px', fontFamily: 'monospace', fontWeight: '600', fill: '#4f46e5' }}>
            <textPath href="#textPath" startOffset="0%">
              {name}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Initials Icon */}
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: '#4f46e5',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
        zIndex: 10
      }}>
        MJ
      </div>
    </a>
  );
}

function App() {
  return (
    <div className="App" style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      
      {/* Injecting keyframe animation for the circular rotation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Top Navigation Bar with Circular Badge on the Far Left */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.2rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <CircularNameBadge />
          <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1f2937', letterSpacing: '-0.025em' }}>
            Mulatu Jaleta
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#projects" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>Projects</a>
          <a href="#contact" style={{ color: '#4b5563', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>Contact</a>
        </div>
      </nav>

      {/* Header / Hero Section */}
      <header id="hero" style={{ textAlign: 'center', padding: '4rem 1rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>Mulatu Jaleta Abdeta</h1>
        <p style={{ fontSize: '1.2rem', color: '#4b5563' }}>Software Engineering Student & Full-Stack Developer</p>
      </header>

      {/* Projects Section */}
      <section id="projects" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '2rem', textAlign: 'center' }}>Featured Projects</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

    </div>
  );
}

export default App;