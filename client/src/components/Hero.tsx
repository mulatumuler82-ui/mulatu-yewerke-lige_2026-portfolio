// portfolio/client/src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center items-start max-w-4xl mx-auto px-6 py-12">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Available for Remote Contract & Freelance Projects
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Mulatu</span>. 
        <br />Full-Stack Software Engineer.
      </h1>
      
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-8 leading-relaxed">
        I architect and build high-performance web applications, scalable backends, and robust distributed systems using the <strong className="text-zinc-200">MERN stack, TypeScript, and Java</strong>. I help startups and businesses turn complex requirements into production-ready software.
      </p>

      <div className="flex flex-wrap gap-4">
        <a 
          href="#contact" 
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-600/20"
        >
          Let's Build Together
        </a>
        <a 
          href="#projects" 
          className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors border border-zinc-700"
        >
          View Case Studies
        </a>
      </div>
    </section>
  );
}