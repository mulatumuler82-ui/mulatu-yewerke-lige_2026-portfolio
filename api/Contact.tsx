import React, { useState } from 'react';

export const Contact: React.FC = () => {
  // Field names match what the backend expects: name, email, message
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // REPLACE with your actual live Vercel backend URL
      const API_URL = 'https://mulatu-yewerke-lige-2026-portfolio-ten.vercel.app/api/contact';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus("Message sent successfully to your inbox!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error. Please check your connection.");
    }
  };

  return (
    <section className="py-20 px-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 border border-gray-800 p-8 rounded-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Send Message
        </button>
        {status && <p className="text-center text-sm mt-4 text-blue-400 font-medium">{status}</p>}
      </form>
    </section>
  );
};