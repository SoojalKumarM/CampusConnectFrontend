import React from 'react';
import Navbar from '../components/Navbar';
import StudentCard from '../components/StudentCard';

export default function LandingView({ onNavigate }) {

  // Enhanced student stories with rich Tinder-style storytelling
  const studentStories = [
    {
      id: 1,
      name: "Sophia & Alex",
      major: "Computer Science & Business",
      tag: "Study Dates & Coffee ☕",
      quote: "We matched over a debate on React vs. Spring Boot. Three semesters later, we're building projects and grabbing coffee every single day.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Lucas",
      major: "Media & Arts",
      tag: "Campus Events & Jamming 🎸",
      quote: "CampusConnect made it super easy to find friends outside my department. Found an acoustic jam buddy within 24 hours of signing up!",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Elena & Marcus",
      major: "Engineering & Biology",
      tag: "Late Pizza & Exam Chill 🍕",
      quote: "Surviving organic chemistry midterms is 10x easier when you have someone to share late-night library pizza with.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const steps = [
    { step: "01", title: "Verify University Status", desc: "Sign up securely using your official institutional student email." },
    { step: "02", title: "Build Your Campus Vibe", desc: "Showcase your major, tech stack, hobbies, and favorite study spots." },
    { step: "03", title: "Swipe, Match & Meet", desc: "Connect instantly with verified peers nearby for coffee, code, or events." }
  ];

  return (
    /* Outer container with overflow control and hidden scrollbar matching Tinder web feel */
    <div className="w-full min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500 selection:text-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {/* Reusable Navbar Component */}
      <Navbar onNavigate={onNavigate} showAuth={true} />

      {/* --- HERO SECTION (Tinder-style Immersive Landing) --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center max-w-6xl mx-auto px-6 pt-12 pb-20 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-pink-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <span className="inline-block py-1.5 px-4 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-semibold text-xs uppercase tracking-widest mb-6">
          ✨ The #1 Student Networking & Community App
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 max-w-4xl">
          Where <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400">Campus Stories</span> & Real Connections Begin.
        </h1>

        <p className="text-slate-300 text-lg sm:text-xl font-light max-w-2xl mb-10 leading-relaxed">
          Stop navigating university life alone. Find project partners, study dates, and lifelong friends who match your exact vibe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Button 1: Create Account -> Routes to signup */}
          <button 
            onClick={() => onNavigate('signup')}
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg shadow-pink-500/25 hover:scale-105 transition transform"
          >
            Create Account
          </button>
          {/* Button 2: Explore Profiles -> Routes to signup */}
          <button 
            onClick={() => onNavigate('signup')}
            className="bg-slate-900 border border-slate-700 text-slate-200 font-bold text-base px-8 py-4 rounded-full hover:bg-slate-800 hover:border-pink-500/50 transition"
          >
            Explore Profiles
          </button>
        </div>

        <div className="max-w-2xl mx-auto mt-16">
          <blockquote className="relative p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 shadow-lg backdrop-blur-md">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
            <p className="italic text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              &ldquo;University isn&apos;t just about degrees and exams; it&apos;s about the people who turn ordinary campus days into extraordinary memories.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* --- STUDENT EXPERIENCES SECTION --- */}
      <section className="bg-slate-900/40 py-20 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-3">Real Campus Experiences</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Discover how students use CampusConnect to find study partners, coffee dates, and meaningful relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentStories.map((story) => (
              <StudentCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-pink-400 font-bold tracking-widest uppercase text-xs">Simple & Secure</span>
          <h2 className="text-3xl font-extrabold sm:text-4xl mt-2">How CampusConnect Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl relative overflow-hidden group hover:border-pink-500/40 transition">
              <span className="text-5xl font-black text-slate-800/80 block mb-6 group-hover:text-pink-500/20 transition">{item.step}</span>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- BOTTOM CALL TO ACTION BANNER --- */}
      <section className="py-20 bg-gradient-to-t from-slate-900 to-slate-950 border-t border-slate-800 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Ready to find your campus crew?</h2>
          <p className="text-slate-400 text-base sm:text-lg mb-8">
            Join thousands of students already connecting, studying, and building their futures together.
          </p>
          {/* Button 3: Get Started Now -> Routes to signup */}
          <button 
            onClick={() => onNavigate('signup')}
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-extrabold text-lg px-10 py-4 rounded-full shadow-xl shadow-pink-500/30 hover:scale-105 transition transform"
          >
            Get Started Now
          </button>
        </div>
      </section>

    </div>
  );
}