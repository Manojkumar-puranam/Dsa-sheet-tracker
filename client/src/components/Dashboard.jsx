import React, { useEffect, useState } from 'react';
import { fetchTopics, toggleProblem } from '../services/api.js';
import TopicList from './TopicList.jsx';

const Dashboard = ({ token, user, activeTab }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      setError('');
      try {
        const response = await fetchTopics(token);
        // Handle both old format (array) and new format (object with data)
        const topicsData = Array.isArray(response) ? response : response.data;
        setTopics(topicsData);
      } catch (err) {
        setError(err.message || 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const handleToggle = async (problemId) => {
    try {
      await toggleProblem(token, problemId);
      setTopics((prev) =>
        prev.map((topic) => ({
          ...topic,
          problems: topic.problems.map((p) =>
            p._id === problemId ? { ...p, completed: !p.completed } : p
          ),
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!token || !user) {
    return (
      <p className="text-center text-slate-400 mt-10">
        Please login to view the DSA sheet.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-slate-400 mt-10">
        Loading your DSA sheet...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-400 mt-10">
        {error}
      </p>
    );
  }

  // Calculate progress by difficulty
  const allProblems = topics.flatMap(t => t.problems);
  const easyProblems = allProblems.filter(p => p.level === 'Easy');
  const mediumProblems = allProblems.filter(p => p.level === 'Medium');
  const toughProblems = allProblems.filter(p => p.level === 'Tough');

  const easyCompleted = easyProblems.filter(p => p.completed).length;
  const mediumCompleted = mediumProblems.filter(p => p.completed).length;
  const toughCompleted = toughProblems.filter(p => p.completed).length;

  const easyPercent = easyProblems.length ? Math.round((easyCompleted / easyProblems.length) * 100) : 0;
  const mediumPercent = mediumProblems.length ? Math.round((mediumCompleted / mediumProblems.length) * 100) : 0;
  const toughPercent = toughProblems.length ? Math.round((toughCompleted / toughProblems.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      {activeTab === 'profile' && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Welcome {user.name}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <label className="text-slate-400 text-sm">Name</label>
              <p className="text-xl font-semibold text-white mt-2">{user.name}</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <label className="text-slate-400 text-sm">Email</label>
              <p className="text-xl font-semibold text-white mt-2">{user.email}</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <label className="text-slate-400 text-sm">Total Problems</label>
              <p className="text-3xl font-bold text-emerald-400 mt-2">{allProblems.length}</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <label className="text-slate-400 text-sm">Completed</label>
              <p className="text-3xl font-bold text-blue-400 mt-2">
                {allProblems.filter(p => p.completed).length}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'topics' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Topics</h2>
            <p className="text-slate-400">Explore these exciting topics!</p>
          </div>
          <TopicList topics={topics} onToggle={handleToggle} />
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Progress Reports</h2>
          <div className="space-y-6">
            {/* Easy */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-semibold">Easy: {easyCompleted}/{easyProblems.length}</label>
                <span className="text-emerald-400 font-bold">{easyPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div
                  className="bg-emerald-500 h-3 rounded-full transition-all"
                  style={{ width: `${easyPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-semibold">Medium: {mediumCompleted}/{mediumProblems.length}</label>
                <span className="text-amber-400 font-bold">{mediumPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div
                  className="bg-amber-500 h-3 rounded-full transition-all"
                  style={{ width: `${mediumPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Tough */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-semibold">Tough: {toughCompleted}/{toughProblems.length}</label>
                <span className="text-rose-400 font-bold">{toughPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <div
                  className="bg-rose-500 h-3 rounded-full transition-all"
                  style={{ width: `${toughPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Overall */}
            <div className="pt-6 border-t border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <label className="text-white font-semibold text-lg">Overall Progress</label>
                <span className="text-blue-400 font-bold text-lg">
                  {allProblems.length ? Math.round(((easyCompleted + mediumCompleted + toughCompleted) / allProblems.length) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full transition-all"
                  style={{ width: `${allProblems.length ? Math.round(((easyCompleted + mediumCompleted + toughCompleted) / allProblems.length) * 100) : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

