import React, { useState } from 'react';

type Status = { type: 'idle' | 'sending' | 'success' | 'error'; text: string };

// Live Vercel backend (api/contact.js)
const API_URL = 'https://mulatu-yewerke-lige-2026-portfolio-ten.vercel.app/api/contact';

export const Contact: React.FC = () => {
  // Field names match what the backend expects: name, email, message
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>({ type: 'idle', text: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'sending', text: 'Sending...' });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', text: 'Message sent successfully to your inbox!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', text: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Network error. Please check your connection.' });
    }
  };

  const inputClass =
    'w-full bg-[#07090F] border border-[#2a3358] rounded-xl p-3.5 text-white placeholder:text-[#5d6685] ' +
    'outline-none transition focus:border-[#7B6CFF] focus:ring-2 focus:ring-[#7B6CFF]/30';

  const statusColor =
    status.type === 'success'
      ? 'text-emerald-400'
      : status.type === 'error'
      ? 'text-rose-400'
      : 'text-[#8B93AD]';

  return (
    <section id="contact" className="py-20 px-6 max-w-xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">Get in Touch</h2>
      <p className="text-center text-[#8B93AD] mb-8">
        Send a message for contract work, collaborations, or job opportunities.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-[#0E1220]/80 backdrop-blur border border-[#1C2340] p-8 rounded-3xl shadow-2xl shadow-black/40"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#B4BBD3] mb-1.5">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#B4BBD3] mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#B4BBD3] mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="How can I help you?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={status.type === 'sending'}
          className="w-full py-3.5 rounded-full font-semibold text-[#07090F] bg-gradient-to-r from-[#a99fff] to-[#4CC9F0] 
                     shadow-lg shadow-[#7B6CFF]/30 transition hover:-translate-y-0.5 hover:shadow-[#4CC9F0]/40 
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status.type === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        <p aria-live="polite" className={`text-center text-sm min-h-[1.25rem] font-medium ${statusColor}`}>
          {status.type !== 'sending' && status.text}
        </p>
      </form>
    </section>
  );
};