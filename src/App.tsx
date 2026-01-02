/**
 * APP ROOT — Layout wrapper for router
 */

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TerminatorIntro from './components/TerminatorIntro';
import { LandingPage } from './routes/LandingPage';
import { DomainGateway } from './routes/DomainGateway';
import AppLayout from './components/app/AppLayout';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const location = useLocation();

  // If user is at root, show intro. Otherwise (deep link), skip intro.
  // Or force intro every time if desired.
  useEffect(() => {
     if (location.pathname !== '/' && location.pathname !== '') {
         setIntroDone(true);
     }
  }, [location]);

  const handleIntroComplete = () => {
    setIntroDone(true);
  };

  if (!introDone && (location.pathname === '/' || location.pathname === '')) {
      return <TerminatorIntro onComplete={handleIntroComplete} />;
  }

  return <AppLayout />;
}
