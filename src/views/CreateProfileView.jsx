import React, { useState } from 'react';
import { api } from '../services/api';

export default function CreateProfileView({ userId, onNavigate, onProfileCreated }) {
  const activeUserId = userId || localStorage.getItem('campus_user_id');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    major: '',
    imageUrl: '',
    bio: '',
    lookingFor: 'Coffee Dates & Study Buddy',
    hobbies: '',
    studySpot: '',
    musicTaste: ''
  });
  
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Track success state

  if (!activeUserId || activeUserId === 'null' || activeUserId === 'undefined') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 space-y-4">
        <h2 className="text-xl font-bold text-rose-400">Authentication Error</h2>
        <p className="text-xs text-slate-400">User session ID is missing. Please log in again.</p>
        <button onClick={() => onNavigate('login')} className="px-6 py-2 bg-slate-800 text-xs font-bold rounded-xl hover:bg-slate-700 transition-all">
          Go to Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Save profile to database
      await api.saveProfile(Number(activeUserId), formData);
      // Trigger success screen instead of instant redirect
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to save profile');
    }
  };

  // If successfully published, render the success confirmation view
 if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black">Profile Published! 🎉</h2>
            <p className="text-xs text-slate-400">
              Awesome work, <strong className="text-white">{formData.name}</strong>! Your profile is live.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('dashboard')} // 🚀 Directs to the full feature dashboard
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 font-bold rounded-xl text-sm shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all cursor-pointer"
          >
            Go to Main Dashboard 🚀
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center py-12 px-6">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
        <h2 className="text-2xl font-black text-center">Create Your Campus Profile</h2>
        {error && <p className="text-xs text-rose-400 text-center bg-rose-950/40 p-2 rounded-xl border border-rose-900">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" placeholder="Soojal Kumar" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Age</label>
              <input type="number" required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" placeholder="21" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Major / Degree</label>
              <input type="text" required value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" placeholder="Computer Science" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Profile Photo URL</label>
            <input type="url" required value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" placeholder="https://images.unsplash.com/..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Short Bio</label>
            <textarea required rows="3" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm" placeholder="Passionate coder, coffee lover..." />
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 font-bold rounded-xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all cursor-pointer">
            Save & Publish Profile
          </button>
        </form>
        <button onClick={() => onNavigate('dashboard')} className="text-xs text-slate-400 block mx-auto hover:text-white pt-2 cursor-pointer">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}