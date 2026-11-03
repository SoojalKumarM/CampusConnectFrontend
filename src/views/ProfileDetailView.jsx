import React from 'react';

export default function ProfileDetailView({ profile, onBack }) {
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={onBack} className="text-xs font-medium text-pink-400 hover:text-pink-300">
          ← Back to Browse Profiles
        </button>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-72 md:h-96 w-full">
            <img src={profile.imageUrl} alt={profile.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-pink-500/20 border border-pink-500/40 text-pink-300 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
                {profile.major} • Age {profile.age}
              </span>
              <h1 className="text-3xl md:text-4xl font-black mt-2">{profile.name}</h1>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">About Me</h3>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed">&ldquo;{profile.bio}&rdquo;</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-pink-400 font-bold block mb-1">🎯 Looking For</span>
                <p className="text-sm text-slate-300">{profile.lookingFor || "Coffee dates & campus hangouts"}</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-pink-400 font-bold block mb-1">☕ Favorite Study Spot</span>
                <p className="text-sm text-slate-300">{profile.studySpot || "University Central Library"}</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-pink-400 font-bold block mb-1">🎸 Hobbies & Interests</span>
                <p className="text-sm text-slate-300">{profile.hobbies || "Coding, Music, Jogging"}</p>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-pink-400 font-bold block mb-1">🎧 Music Vibe</span>
                <p className="text-sm text-slate-300">{profile.musicTaste || "Lo-Fi & Acoustic"}</p>
              </div>
            </div>

            <div className="pt-4 flex space-x-4">
              <button 
                onClick={() => alert(`Connection request sent to ${profile.name}! 🚀`)}
                className="flex-1 py-3 bg-linear-to-r from-pink-500 to-rose-500 font-bold rounded-xl text-sm shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all"
              >
                Connect & Send Message 💌
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}