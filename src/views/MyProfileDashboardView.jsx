import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function MyProfileDashboardView({ userId, onNavigate, onLogout }) {
  const activeUserId = userId || localStorage.getItem('campus_user_id');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMyProfile() {
      if (!activeUserId || activeUserId === 'null' || activeUserId === 'undefined') {
        setLoading(false);
        return;
      }
      try {
        const numericId = parseInt(activeUserId, 10);
        const userProfile = await api.getProfileByUser(numericId);
        if (userProfile) {
          setProfile(userProfile);
          setEditForm(userProfile);
        } else {
          // If no profile exists yet in the DB for this user, send them to creation
          onNavigate('create-profile');
        }
      } catch (err) {
        setError(err.message || 'Error loading profile data');
      } finally {
        setLoading(false);
      }
    }
    fetchMyProfile();
  }, [activeUserId, onNavigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = await api.updateProfile(profile.id, editForm);
      setProfile(updated);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        await api.deleteProfile(profile.id);
        alert('Profile deleted successfully.');
        onNavigate('create-profile');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        <p className="text-xs text-slate-400">Loading your profile portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-slate-900/80 border-b border-slate-800 px-8 py-4 flex justify-between items-center backdrop-blur-md">
        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300">
          CampusConnect — My Profile Portal
        </span>
        <div className="space-x-4">
          <button onClick={() => onNavigate('browse')} className="text-xs text-slate-300 hover:text-white cursor-pointer">
            Browse All 🌍
          </button>
          <button onClick={onLogout} className="text-xs text-rose-400 hover:text-rose-300 cursor-pointer">
            Log Out
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 space-y-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <h1 className="text-2xl font-black">Welcome back, {profile?.name} ✨</h1>
              <p className="text-xs text-slate-400 mt-1">This is your exclusive profile management dashboard.</p>
            </div>
            <div className="space-x-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                {isEditing ? 'Cancel' : 'Edit Settings ✏️'}
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-rose-950/50 border border-rose-800 hover:bg-rose-900 text-rose-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Delete Profile 🗑️
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-rose-400">{error}</p>}

          {isEditing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Name</label>
                  <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Age</label>
                  <input type="number" value={editForm.age || ''} onChange={e => setEditForm({...editForm, age: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Major</label>
                  <input type="text" value={editForm.major || ''} onChange={e => setEditForm({...editForm, major: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Image URL</label>
                  <input type="url" value={editForm.imageUrl || ''} onChange={e => setEditForm({...editForm, imageUrl: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Bio</label>
                <textarea rows="3" value={editForm.bio || ''} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
              </div>
              <button type="submit" className="w-full py-3 bg-pink-600 font-bold rounded-xl text-sm hover:bg-pink-500 transition-all cursor-pointer">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img src={profile?.imageUrl} alt={profile?.name} className="w-36 h-36 rounded-2xl object-cover border border-slate-800 shadow-md" />
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold">{profile?.name}, {profile?.age}</h3>
                <p className="text-pink-400 text-xs font-semibold">{profile?.major}</p>
                <p className="text-slate-300 text-xs italic">&ldquo;{profile?.bio}&rdquo;</p>
                <div className="text-xs text-slate-400 pt-2 grid grid-cols-2 gap-2">
                  <span>🎯 <strong className="text-slate-300">Looking For:</strong> {profile?.lookingFor || 'N/A'}</span>
                  <span>☕ <strong className="text-slate-300">Study Spot:</strong> {profile?.studySpot || 'N/A'}</span>
                  <span>🎸 <strong className="text-slate-300">Hobbies:</strong> {profile?.hobbies || 'N/A'}</span>
                  <span>🎧 <strong className="text-slate-300">Music:</strong> {profile?.musicTaste || 'N/A'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}