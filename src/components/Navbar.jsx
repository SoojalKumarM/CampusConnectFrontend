

export default function Navbar({ onNavigate, showAuth = true }) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('landing')}>
        <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
          <span className="text-xl">🎓</span>
        </div>
        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300">
          CampusConnect
        </span>
      </div>

      {/* Optional Center Badge */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner">
        <span className="text-xs font-medium text-pink-300 tracking-wide uppercase">
          Exclusive University Dating & Social Network
        </span>
      </div>

      {/* Auth Action Buttons */}
      {showAuth && (
        <div className="flex space-x-4">
          <button 
            onClick={() => onNavigate('login')} 
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => onNavigate('signup')} 
            className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}