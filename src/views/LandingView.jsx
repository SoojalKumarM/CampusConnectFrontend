
import Navbar from '../components/Navbar';
import StudentCard from '../components/StudentCard';

export default function LandingView({ onNavigate }) {
  
  
    // Dummy student stories data


  const studentStories = [
    {
      id: 1,
      name: "Sophia & Alex",
      major: "Computer Science & Business",
      tag: "Study Dates & Coffee ☕",
      quote: "We met on campus through a shared love for late-night coffee and coding sessions.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Lucas",
      major: "Media & Arts",
      tag: "Campus Events & Jamming 🎸",
      quote: "CampusConnect made it super easy to find friends with similar vibes outside my department.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Elena & Marcus",
      major: "Engineering & Biology",
      tag: "Late Pizza & Exam Chill 🍕",
      quote: "Surviving midterms is 10x easier when you have someone to grab pizza with after long days at the library.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const steps = [
    { step: "01", title: "Verify Student Identity", desc: "Sign up using your university email address." },
    { step: "02", title: "Create Your Campus Vibe", desc: "Share your major, hobbies, and favorite study spots." },
    { step: "03", title: "Match & Meet Up", desc: "Discover like-minded students nearby." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Reusable Navbar Component */}
      <Navbar onNavigate={onNavigate} showAuth={true} />

      {/* Hero Section */}
      <section className="relative max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-pink-500/10 rounded-full blur-3xl -z-10" />
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-8">
          Where <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400">Campus Stories</span> & Real Connections Begin.
        </h1>

        <div className="max-w-2xl mx-auto mt-12 mb-16">
          <blockquote className="relative p-6 sm:p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 shadow-lg backdrop-blur-md">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
            <p className="italic text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              &ldquo;University isn&apos;t just about degrees and exams; it&apos;s about the people who turn ordinary campus days into extraordinary memories.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* Reusable Student Cards Grid Section */}
      <section className="bg-slate-900/40 py-12 border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Real Campus Experiences</h2>
            <p className="text-slate-400 mt-1 text-xs sm:text-sm">
              Discover how students use CampusConnect to find study partners, coffee dates, and meaningful relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {studentStories.map((story) => (
              <StudentCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl font-extrabold sm:text-3xl">How CampusConnect Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
              <span className="text-4xl font-black text-slate-800 block mb-4">{item.step}</span>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}