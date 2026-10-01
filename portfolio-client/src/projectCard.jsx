import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card shadow-sm rounded-4 p-4 bg-white border">
      <div className="project-content">
        <span className="badge bg-primary mb-2">{project.category}</span>
        <h3 className="h4 fw-bold text-dark mb-2">{project.title}</h3>
        <p className="text-muted mb-3">{project.description}</p>
        
        {/* Tech Stack Badges */}
        <div className="d-flex flex-wrap gap-1 mb-4">
          {project.techStack.map((tech, index) => (
            <span key={index} className="badge bg-light text-secondary border">
              {tech}
            </span>
          ))}
        </div>

        {/* Functioning Action Buttons */}
        <div className="d-flex gap-2">
          {/* Live Demo Button */}
          {project.liveUrl && project.liveUrl.trim() !== "" ? (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-sm flex-grow-1"
            >
              Live Demo
            </a>
          ) : (
            <button className="btn btn-outline-secondary btn-sm flex-grow-1" disabled>
              In Development
            </button>
          )}

          {/* GitHub Repository Button */}
          {project.githubUrl && project.githubUrl.trim() !== "" && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-dark btn-sm flex-grow-1"
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
