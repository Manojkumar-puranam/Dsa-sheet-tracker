import React, { useState } from 'react';
import { login, register } from '../services/api.js';

const LoginPage = ({ onAuthSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const fn = isRegister ? register : login;
      const payload = isRegister
        ? form
        : { email: form.email, password: form.password };
      const res = await fn(payload);
      onAuthSuccess(res.token, res.user);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-semibold mb-2 text-center">
          {isRegister ? 'Create your account' : 'Welcome back'}
        </h2>
        <p className="text-sm text-slate-400 mb-6 text-center">
          {isRegister
            ? 'Sign up to start tracking your DSA progress.'
            : 'Login to continue where you left off.'}
        </p>
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-sm px-3 py-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required={isRegister}
              />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium py-2 transition disabled:opacity-60"
          >
            {loading
              ? 'Please wait...'
              : isRegister
              ? 'Create account'
              : 'Login'}
          </button>
        </form>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="w-full mt-4 text-sm text-slate-300 hover:text-emerald-400"
        >
          {isRegister
            ? 'Already have an account? Login'
            : "New here? Create a student's account"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

