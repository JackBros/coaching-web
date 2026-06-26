import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg border-b border-slate-800">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">⚡</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
            PRO AI COACHING
          </h1>
        </div>
        <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-teal-400 border border-teal-500/30">
          v1.0 Web Edition
        </span>
      </div>
    </nav>
  );
};

export default Navbar;