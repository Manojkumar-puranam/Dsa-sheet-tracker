import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleAuthSuccess = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <header className="border-b border-slate-800 px-6 py-4 bg-blue-600/20 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          {user && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-300">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-blue-500 text-blue-300 hover:bg-blue-500/20"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {!isLoginPage && user && (
        <div className="border-b border-slate-800 px-6 bg-slate-900/40 backdrop-blur">
          <div className="max-w-7xl mx-auto flex gap-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'topics'
                  ? 'border-blue-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Topics
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'progress'
                  ? 'border-blue-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              Progress
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 px-4 py-6 md:px-8">
        <Routes>
          <Route
            path="/login"
            element={<LoginPage onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/"
            element={<Dashboard token={token} user={user} activeTab={activeTab} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

