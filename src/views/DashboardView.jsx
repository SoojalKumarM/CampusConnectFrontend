import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function DashboardView({ userId, onNavigate, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    async function fetchUserStatus() {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        // Force numeric ID conversion
        const numericId = parseInt(userId, 10);
        const userProfile = await api.getProfileByUser(numericId);
        if (userProfile) {
          setProfile(userProfile);
          setEditForm(userProfile);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserStatus();
  }, [userId]);

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
    if (window.confirm('Are you sure you want to delete your profile? This will re-enable profile creation.')) {
      try {
        await api.deleteProfile(profile.id);
        setProfile(null);
        alert('Profile deleted successfully.');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        <p className="text-xs text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-slate-900/80 border-b border-slate-800 px-8 py-4 flex justify-between items-center backdrop-blur-md">
        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300">
          CampusConnect Dashboard
        </span>
        <button onClick={onLogout} className="text-xs text-slate-400 hover:text-white">Log Out</button>
      </nav>

      <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 space-y-8">
        {/* Dynamic Welcome */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 p-8 rounded-3xl shadow-xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-black">
              Welcome back, <span className="text-pink-400">{profile ? profile.name : 'Student'}</span>! 👋
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              {profile ? "Manage your campus dating profile or explore other students." : "You haven't created your profile yet. Create one to get started!"}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('browse')}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-bold rounded-xl transition-all"
          >
            Browse All Profiles 🌍
          </button>
        </div>

        {/* Profile Status & Management Panel */}
        <div>
          {profile ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold">Your Active Profile Settings ⚙️</h2>
                <div className="space-x-3">
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl transition-all"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile ✏️'}
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 bg-rose-950/50 border border-rose-800/80 hover:bg-rose-900 text-rose-300 text-xs font-semibold rounded-xl transition-all"
                  >
                    Delete Profile 🗑️
                  </button>
                </div>
              </div>

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
                    <textarea rows="2" value={editForm.bio || ''} onChange={e => setEditForm({...editForm, bio: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Looking For</label>
                      <input type="text" value={editForm.lookingFor || ''} onChange={e => setEditForm({...editForm, lookingFor: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Study Spot</label>
                      <input type="text" value={editForm.studySpot || ''} onChange={e => setEditForm({...editForm, studySpot: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Hobbies</label>
                      <input type="text" value={editForm.hobbies || ''} onChange={e => setEditForm({...editForm, hobbies: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Music Vibe</label>
                      <input type="text" value={editForm.musicTaste || ''} onChange={e => setEditForm({...editForm, musicTaste: e.target.value})} className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3 bg-pink-600 font-bold rounded-xl text-sm hover:bg-pink-500 transition-all">Save Changes</button>
                </form>
              ) : (
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <img src={profile.imageUrl} alt={profile.name} className="w-32 h-32 rounded-2xl object-cover border border-slate-800 shadow-md" />
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold">{profile.name}, {profile.age}</h3>
                    <p className="text-pink-400 text-xs font-semibold">{profile.major}</p>
                    <p className="text-slate-300 text-xs italic">&ldquo;{profile.bio}&rdquo;</p>
                    <div className="text-xs text-slate-400 pt-2 grid grid-cols-2 gap-2">
                      <span>🎯 <strong className="text-slate-300">Looking For:</strong> {profile.lookingFor || 'N/A'}</span>
                      <span>☕ <strong className="text-slate-300">Study Spot:</strong> {profile.studySpot || 'N/A'}</span>
                      <span>🎸 <strong className="text-slate-300">Hobbies:</strong> {profile.hobbies || 'N/A'}</span>
                      <span>🎧 <strong className="text-slate-300">Music:</strong> {profile.musicTaste || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4 shadow-xl">
              <h3 className="text-lg font-bold">Ready to meet other students?</h3>
              <p className="text-xs text-slate-400">Create your single university profile to start connecting.</p>
              <button 
                onClick={() => onNavigate('create-profile')}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 font-bold text-sm rounded-xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all"
              >
                Create Profile 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}