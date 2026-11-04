import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function BrowseProfilesView({ onNavigate }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfiles() {
      try {
        const data = await api.getProfiles();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black">Campus Community & Matchmaking</h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">Explore student profiles, find study buddies, and connect.</p>
          </div>
          <button 
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>

        {error && <p className="text-xs text-rose-400 text-center">{error}</p>}
        {loading && <p className="text-xs text-slate-400 text-center py-12">Loading campus profiles...</p>}

        {/* Profile Grid */}
        {!loading && profiles.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-3">
            <p className="text-sm text-slate-300">No student profiles found yet.</p>
            <p className="text-xs text-slate-500">Be the first to publish your profile from the dashboard!</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div 
              key={profile.id}
              onClick={() => onNavigate('profile-detail', profile)}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all cursor-pointer group shadow-lg flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                <img 
                  src={profile.imageUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 bg-slate-950/80 border border-slate-800 backdrop-blur-md text-pink-400 px-3 py-1 rounded-full text-xs font-bold">
                  Age {profile.age}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold group-hover:text-pink-400 transition-colors">{profile.name}</h3>
                  <p className="text-xs font-semibold text-slate-400">{profile.major}</p>
                  <p className="text-xs text-slate-300 line-clamp-2 pt-2">&ldquo;{profile.bio}&rdquo;</p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate max-w-[180px]">🎯 {profile.lookingFor || 'Study & Coffee'}</span>
                  <span className="text-pink-400 font-bold group-hover:translate-x-1 transition-transform">View Profile →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}