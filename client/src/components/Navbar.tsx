import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-6 px-8 max-w-6xl mx-auto border-b border-gray-800">
      <div className="text-xl font-bold text-white font-mono">
        Mulatu<span className="text-blue-500">.ts</span>
      </div>
      <div className="flex gap-6 text-sm font-medium text-gray-300">
        <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
        <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
      </div>
    </nav>
  );
};