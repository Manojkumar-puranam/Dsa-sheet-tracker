import React from 'react';
import ProblemCard from './ProblemCard.jsx';

const TopicList = ({ topics, onToggle }) => {
  return (
    <div className="space-y-6">
      {topics.map((topic) => (
        <section
          key={topic._id}
          className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold">{topic.name}</h3>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Chapter: {topic.chapter}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {topic.problems.map((problem) => (
              <ProblemCard
                key={problem._id}
                problem={problem}
                onToggle={() => onToggle(problem._id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TopicList;

