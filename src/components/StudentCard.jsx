import React from 'react';

export default function StudentCard({ story }) {
  return (
    <div className="bg-slate-900 border border-slate-800/90 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300 shadow-md flex flex-col">
      {/* Compact Image with Tag */}
      <div className="relative h-36 overflow-hidden">
        <img 
          src={story.image} 
          alt={story.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md text-[10px] font-semibold px-2.5 py-0.5 rounded-full text-pink-300 border border-slate-800">
          {story.tag}
        </span>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
        <div>
          <h3 className="text-base font-bold text-white leading-tight">{story.name}</h3>
          <p className="text-[11px] text-pink-400 font-medium mt-0.5">{story.major}</p>
          <p className="text-xs text-slate-300 italic mt-2 leading-snug line-clamp-3">
            &ldquo;{story.quote}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}