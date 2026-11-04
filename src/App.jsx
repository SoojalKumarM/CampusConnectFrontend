import  { useState, useEffect } from 'react';
import LandingView from './views/LandingView';
import SignupView from './views/SignupView';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView'; // Full featured dashboard
import MyProfileDashboardView from './views/MyProfileDashboardView';
import BrowseProfilesView from './views/BrowseProfilesView';
import CreateProfileView from './views/CreateProfileView';
import ProfileDetailView from './views/ProfileDetailView';

export default function App() {
  const getInitialView = () => {
    const path = window.location.pathname;
    if (path.includes('my-dashboard')) return 'my-dashboard';
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('signup')) return 'signup';
    if (path.includes('login')) return 'login';
    if (path.includes('browse')) return 'browse';
    if (path.includes('create-profile')) return 'create-profile';
    return 'landing';
  };

  const [currentView, setCurrentView] = useState(getInitialView);
  const [navKey, setNavKey] = useState(0);

  const [userId, setUserId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get('userId');
    if (idFromUrl) {
      const parsedId = parseInt(idFromUrl, 10);
      localStorage.setItem('campus_user_id', parsedId);
      return parsedId;
    }
    const savedId = localStorage.getItem('campus_user_id');
    return savedId ? parseInt(savedId, 10) : null;
  });

  const [selectedProfile, setSelectedProfile] = useState(null);

  // Listen to browser Back / Forward navigation buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('my-dashboard')) setCurrentView('my-dashboard');
      else if (path.includes('dashboard')) setCurrentView('dashboard');
      else if (path.includes('signup')) setCurrentView('signup');
      else if (path.includes('login')) setCurrentView('login');
      else if (path.includes('browse')) setCurrentView('browse');
      else if (path.includes('create-profile')) setCurrentView('create-profile');
      else setCurrentView('landing');
      
      setNavKey(prev => prev + 1);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view, extraData = null) => {
    if (view === 'profile-detail') {
      setSelectedProfile(extraData);
    }
    setCurrentView(view);
    const path = view === 'landing' ? '/' : `/${view}`;
    window.history.pushState({}, '', path);
    setNavKey(prev => prev + 1);
  };

  const handleLoginSuccess = (id) => {
    const parsedId = parseInt(id, 10);
    setUserId(parsedId);
    localStorage.setItem('campus_user_id', parsedId);
    handleNavigate('dashboard');
  };

  const handleLogout = () => {
    setUserId(null);
    localStorage.removeItem('campus_user_id');
    handleNavigate('landing');
  };

  switch (currentView) {
    case 'landing':
      return <LandingView key={navKey} onNavigate={handleNavigate} />;
    case 'signup':
      return <SignupView key={navKey} onNavigate={handleNavigate} />;
    case 'login':
      return <LoginView key={navKey} onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;
    case 'dashboard':
      // 🚀 After success, users land here to access all full dashboard features!
      return <DashboardView key={navKey} userId={userId} onNavigate={handleNavigate} onLogout={handleLogout} />;
    case 'my-dashboard':
      return <MyProfileDashboardView key={navKey} userId={userId} onNavigate={handleNavigate} onLogout={handleLogout} />;
    case 'browse':
      return <BrowseProfilesView key={navKey} onNavigate={handleNavigate} />;
    case 'create-profile':
      return <CreateProfileView key={navKey} userId={userId} onNavigate={handleNavigate} />;
    case 'profile-detail':
      return <ProfileDetailView key={navKey} profile={selectedProfile} onBack={() => handleNavigate('browse')} />;
    default:
      return <LandingView key={navKey} onNavigate={handleNavigate} />;
  }
}