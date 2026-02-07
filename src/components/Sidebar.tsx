'use client';

import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/contexts/QuizContext';
import { Section } from '@/types';

export default function Sidebar() {
  const { setCurrentSection, username, setUsername, toggleTheme, theme } = useQuiz();
  const [nameInput, setNameInput] = useState(username);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync nameInput with username from context
  useEffect(() => {
    setNameInput(username);
  }, [username]);

  const handleSaveName = () => {
    if (!nameInput.trim()) {
      alert('Please enter a name.');
      return;
    }
    setUsername(nameInput.trim());
  };

  const navigate = (section: Section) => {
    setCurrentSection(section);
  };

  return (
    <aside className="w-[260px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 text-white fixed left-0 top-0 bottom-0 p-4 flex flex-col gap-2 shadow-2xl border-r border-slate-700 dark:border-indigo-900/50 z-50 md:translate-x-0 transition-all duration-300">
      <div className="text-2xl font-extrabold text-center mb-5 p-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl tracking-tight flex items-center justify-center gap-2 border border-white/20 dark:border-indigo-500/30 shadow-lg">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
        </svg>
        <span>QuizMaster</span>
      </div>

      <button
        onClick={() => navigate('home')}
        className="nav-btn flex items-center gap-3 bg-white/8 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 dark:hover:from-indigo-600/30 dark:hover:to-purple-600/30 border border-white/10 hover:border-blue-400/50 dark:hover:border-indigo-400/50 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-indigo-500/20 font-medium group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
        <span>Home</span>
      </button>

      <button
        onClick={() => navigate('quiz')}
        className="nav-btn flex items-center gap-3 bg-white/8 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 dark:hover:from-indigo-600/30 dark:hover:to-purple-600/30 border border-white/10 hover:border-blue-400/50 dark:hover:border-indigo-400/50 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-indigo-500/20 font-medium group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
        </svg>
        <span>Start Quiz</span>
      </button>

      <button
        onClick={() => navigate('create')}
        className="nav-btn flex items-center gap-3 bg-white/8 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 dark:hover:from-indigo-600/30 dark:hover:to-purple-600/30 border border-white/10 hover:border-blue-400/50 dark:hover:border-indigo-400/50 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-indigo-500/20 font-medium group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
        </svg>
        <span>Create Quiz</span>
      </button>

      <button
        onClick={() => navigate('leaderboard')}
        className="nav-btn flex items-center gap-3 bg-white/8 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 dark:hover:from-indigo-600/30 dark:hover:to-purple-600/30 border border-white/10 hover:border-blue-400/50 dark:hover:border-indigo-400/50 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-indigo-500/20 font-medium group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>
        <span>Leaderboard</span>
      </button>

      <button
        onClick={() => navigate('about')}
        className="nav-btn flex items-center gap-3 bg-white/8 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 dark:hover:from-indigo-600/30 dark:hover:to-purple-600/30 border border-white/10 hover:border-blue-400/50 dark:hover:border-indigo-400/50 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:translate-x-1 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-indigo-500/20 font-medium group"
      >
        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
        </svg>
        <span>About</span>
      </button>

      <button
        onClick={toggleTheme}
        className="nav-btn flex items-center gap-3 bg-gradient-to-r from-amber-600/20 to-orange-600/20 dark:from-amber-500/20 dark:to-yellow-500/20 hover:from-amber-600/30 hover:to-orange-600/30 dark:hover:from-amber-500/30 dark:hover:to-yellow-500/30 border border-amber-400/30 hover:border-amber-400/50 px-4 py-3 rounded-xl text-left transition-all duration-300 hover:translate-x-1 hover:shadow-lg hover:shadow-amber-500/30 font-medium group"
      >
        {mounted && theme === 'dark' ? (
          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
          </svg>
        )}
        <span>{mounted ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : 'Toggle Theme'}</span>
      </button>

      {/* User Box */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 dark:from-indigo-900/30 dark:to-purple-900/20 p-4 rounded-xl mt-auto border border-white/20 dark:border-indigo-500/30 backdrop-blur-sm shadow-xl">
        <div className="font-bold mb-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
          Your Name
        </div>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter name..."
          className="w-full px-3 py-2 rounded-lg border border-white/20 bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-indigo-500 transition-all"
        />
        <button
          onClick={handleSaveName}
          className="w-full mt-2 px-3 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-500/30"
        >
          Save Name
        </button>
        <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t border-white/15">
          <span className="opacity-90 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Welcome:
          </span>
          <span className="font-semibold text-white">{username}</span>
        </div>
      </div>
    </aside>
  );
}
