import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     
     const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
     
     
      
      if (res.ok) {
        setStatus('Message sent successfully to database!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      setStatus('Error connecting to server.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col justify-between font-sans">
      
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#0B0F19]/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex justify-between items-center max-w-6xl mx-auto w-full">
        <span className="font-bold text-xl text-blue-400">Mulatu Jaleta Abdeta</span>
        <div className="flex gap-6 text-sm text-gray-300">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>
      </nav>

      {/* Hero / About Section */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 flex items-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Text Content */}
          <div className="md:col-span-7 text-center md:text-left">
            <span className="inline-block text-blue-400 font-mono text-sm bg-blue-950/60 px-3 py-1 rounded-full border border-blue-900/40 mb-6">
              Software Engineering Student @ Injibara University
            </span>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white leading-tight">
              Crafting Robust Distributed Systems & Web Solutions
            </h1>
            
            <p className="text-gray-400 text-lg max-w-2xl mb-8">
              Full-stack developer specialized in TypeScript, the MERN stack, Java distributed architectures (RMI/JDBC), and machine learning classification pipelines.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#projects" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/20">
                View Projects
              </a>
              <a href="#contact" className="bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium px-6 py-3 rounded-xl transition border border-gray-700">
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-2xl transform -rotate-6"></div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-blue-900/50 shadow-2xl bg-gray-900">
                <img 
                  src="src/g.jpg" 
                  alt="Mulatu Jaleta Abdeta" 
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition duration-500"
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 mb-20 text-left w-full">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Project 1: IU-LEMMS */}
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl hover:border-blue-500/50 transition">
            <h3 className="text-xl font-semibold text-white mb-2">IU-LEMMS Lab Management System</h3>
            <p className="text-gray-400 text-sm mb-4">University laboratory equipment management system built with full architectural modeling, UML diagrams, and structured database workflows.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">TypeScript</span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">MERN Stack</span>
            </div>
          </div>

          {/* Project 2: Distributed Banking */}
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl hover:border-blue-500/50 transition">
            <h3 className="text-xl font-semibold text-white mb-2">Distributed Banking Protocol</h3>
            <p className="text-gray-400 text-sm mb-4">Java RMI and socket-based distributed application prototype focusing on network synchronization, RPC, and stub-skeleton architecture.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">Java RMI</span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">JDBC</span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">IntelliJ IDEA</span>
            </div>
          </div>

          {/* Project 3: Cost Management App */}
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl hover:border-blue-500/50 transition">
            <h3 className="text-xl font-semibold text-white mb-2">Personal Cost Management App</h3>
            <p className="text-gray-400 text-sm mb-4">Web-based personal finance and expense tracking application featuring user authentication, secure database queries, and data visualization.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">PHP</span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">MySQL</span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">Bootstrap</span>
            </div>
          </div>

          {/* Project 4: Loan Approval Prediction */}
          <div className="bg-gray-900/60 border border-gray-800 p-6 rounded-2xl hover:border-blue-500/50 transition">
            <h3 className="text-xl font-semibold text-white mb-2">Loan Approval Prediction Model</h3>
            <p className="text-gray-400 text-sm mb-4">Supervised machine learning classification pipeline evaluating risk metrics using Logistic Regression, Decision Trees, and Random Forests.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">Python</span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">Scikit-Learn</span>
              <span className="text-xs font-mono text-blue-400 bg-blue-950/50 px-2 py-1 rounded">Classification</span>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-xl mx-auto bg-gray-900/60 border border-gray-800 p-8 rounded-2xl text-left w-full mb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
        <p className="text-gray-400 text-sm mb-6">Send a message directly to the backend database.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Your Name</label>
            <input
              type="text"
              required
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Your Email</label>
            <input
              type="email"
              required
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">Message</label>
            <textarea
              required
              rows={4}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition"
          >
            Send Message
          </button>
          {status && <p className="text-sm text-center text-blue-400 mt-2 font-mono">{status}</p>}
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-500 font-mono w-full">
        © 2026 Mulatu Jaleta Abdeta. Built with TypeScript & MERN.
      </footer>

    </div>
  );
}