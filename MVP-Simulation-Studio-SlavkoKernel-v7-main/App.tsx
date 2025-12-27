import React from 'react';
import { MvpStudio } from './components/MvpStudio';

function App() {
  return (
    // The min-h-screen and font-sans are sufficient here.
    // Background colors are now dynamically handled by MvpStudio and PulsatingBackground.
    <div className="min-h-screen font-sans">
      <MvpStudio />
    </div>
  );
}

export default App;