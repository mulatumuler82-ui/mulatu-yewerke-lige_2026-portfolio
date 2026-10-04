// portfolio/client/src/components/CaseStudyCard.tsx
interface ProjectProps {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
}

export function CaseStudyCard({ title, tagline, problem, solution, impact, techStack, liveUrl, githubUrl }: ProjectProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 hover:border-zinc-700 transition-all">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-blue-400 text-sm font-medium">{tagline}</p>
        </div>
        <div className="flex gap-2">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white text-sm px-3 py-1.5 rounded bg-zinc-800 transition-colors">
              GitHub
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className="text-white text-sm px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 transition-colors">
              Live Demo
            </a>
          )}
        </div>
      </div>

      <div className="space-y-3 text-sm text-zinc-300 my-6">
        <p><strong className="text-zinc-100">The Problem:</strong> {problem}</p>
        <p><strong className="text-zinc-100">The Solution:</strong> {solution}</p>
        <p><strong className="text-zinc-100">Architecture & Impact:</strong> {impact}</p>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800">
        {techStack.map((tech, index) => (
          <span key={index} className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs font-mono">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}