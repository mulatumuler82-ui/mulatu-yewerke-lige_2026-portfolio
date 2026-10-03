import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: 'MERN' | 'Java' | 'ML';
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Full-Stack MERN Portfolio",
    description: "Modern responsive web app featuring secure API routes, dynamic tag filtering, and cloud-hosted resume downloads.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    category: "MERN"
  },
  {
    id: 2,
    title: "Loan Approval Prediction System",
    description: "Machine learning classification workflow evaluating logistic regression and random forest classification algorithms.",
    tags: ["Python", "Scikit-Learn", "Pandas"],
    category: "ML"
  },
  {
    id: 3,
    title: "Laboratory Equipment Management System",
    description: "Enterprise software application implementing rigorous SRS documentation, MVC structure, and PostgreSQL/JDBC connectivity.",
    tags: ["Java", "JavaFX", "PostgreSQL"],
    category: "Java"
  }
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
      
      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {['All', 'MERN', 'Java', 'ML'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === cat ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-950 text-blue-400 text-xs px-2.5 py-1 rounded-md font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};