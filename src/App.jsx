import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;