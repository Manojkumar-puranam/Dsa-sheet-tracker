import React from 'react';

const levelColors = {
  Easy: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40',
  Medium: 'bg-amber-500/10 text-amber-300 border-amber-500/40',
  Tough: 'bg-rose-500/10 text-rose-300 border-rose-500/40',
};

const ProblemCard = ({ problem, onToggle }) => {
  const levelClass = levelColors[problem.level] || levelColors.Easy;
  const status = problem.completed ? 'Done' : 'Pending';
  const statusColor = problem.completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-300';

  return (
    <div className="flex items-start justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 hover:border-slate-700 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <input
          type="checkbox"
          checked={!!problem.completed}
          onChange={onToggle}
          className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-white">
              {problem.title}
            </h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
              {status}
            </span>
          </div>
          {problem.description && (
            <p className="text-xs text-slate-400 mt-1">
              {problem.description}
            </p>
          )}
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {problem.youtubeUrl && (
              <a
                href={problem.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 transition-colors cursor-pointer"
              >
                Watch
              </a>
            )}
            {problem.practiceUrl && (
              <a
                href={problem.practiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 hover:bg-sky-500/30 transition-colors cursor-pointer"
              >
                Practise
              </a>
            )}
            {problem.articleUrl && (
              <a
                href={problem.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-500/30 transition-colors cursor-pointer"
              >
                Read
              </a>
            )}
          </div>
        </div>
      </div>
      <span
        className={`ml-4 self-center text-[11px] px-2 py-1 rounded-full border whitespace-nowrap ${levelClass}`}
      >
        {problem.level}
      </span>
    </div>
  );
};

export default ProblemCard;

