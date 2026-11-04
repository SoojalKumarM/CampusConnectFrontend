import React, { useState } from 'react';
import { api } from '../services/api';

export default function LoginView({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.login(email, password);
      // Ensure your backend login response actually returns { userId: 1, ... }
      if (res && res.userId) {
        onLoginSuccess(res.userId); 
      } else {
        throw new Error("Login response did not include a valid userId.");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <h2 className="text-2xl font-black text-center">Welcome Back</h2>
        {error && <p className="text-xs text-rose-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 font-bold rounded-xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all">Log In</button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[11px] text-slate-500 uppercase tracking-wider">or continue with</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Compact Google Button Below */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => { window.location.href = 'http://localhost:8080/oauth2/authorization/google'; }}
            className="px-5 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-200 font-medium rounded-xl text-xs flex items-center space-x-2.5 shadow-sm transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.24 24 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.39-1.5-.39-2.24s.14-1.52.39-2.24V6.6H1.18C.43 8.12 0 9.82 0 12s.43 3.88 1.18 5.4l4.09-3.16z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.24 0 3.15 2.68 1.18 6.6l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            <span>Google</span>
          </button>
        </div>

        <button onClick={() => onNavigate('landing')} className="text-xs text-slate-400 block mx-auto hover:text-white pt-2">← Back to Home</button>
      </div>
    </div>
  );
}