import React, { useState } from 'react';
import { api } from '../services/api';

export default function SignupView({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.register(email, password);
      if (res && res.userId) {
        localStorage.setItem('campus_user_id', res.userId);
        if (onLoginSuccess) onLoginSuccess(res.userId);
        onNavigate('dashboard');
      } else {
        onNavigate('login');
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to backend server');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
        <h2 className="text-2xl font-black text-center">Join CampusConnect</h2>
        {error && <p className="text-xs text-rose-400 text-center bg-rose-950/40 p-2 rounded-xl border border-rose-900">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" 
              placeholder="student@university.edu" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 font-bold rounded-xl text-sm shadow-lg">
            Create Account
          </button>
        </form>

        <p className="text-xs text-center text-slate-400">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-pink-400 font-bold hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}