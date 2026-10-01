import React from 'react';
import { projectsData } from './projectsData';
import ProjectCard from './ProjectCard';
import './ProjectCard.css'; // Make sure your styles are linked

function App() {
  return (
    <div className="App" style={{ fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh' }}>
      
      {/* Header / Hero Section */}
      <header style={{ textAlign: 'center', padding: '4rem 1rem 2rem' }}>
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