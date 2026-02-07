'use client';

import React, { useState, useEffect } from 'react';
import { useQuiz } from '@/contexts/QuizContext';

export default function Home() {
  const { 
    allQuestions, 
    scores, 
    username, 
    setUsername, 
    setCurrentSection, 
    setCurrentCategory,
    userStats,
    isLoading 
  } = useQuiz();
  const [nameInput, setNameInput] = useState(username);
  const [featuredQuiz, setFeaturedQuiz] = useState('');

  useEffect(() => {
    const categories = Object.keys(allQuestions);
    if (categories.length > 0) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setFeaturedQuiz(randomCategory);
    }
  }, [allQuestions]);

  // Sync nameInput with username from context
  useEffect(() => {
    setNameInput(username);
  }, [username]);

  const handleSaveName = async () => {
    if (!nameInput.trim()) {
      alert('Please enter a name.');
      return;
    }
    await setUsername(nameInput.trim());
  };

  const startQuiz = (category: string) => {
    setCurrentCategory(category);
    setCurrentSection('quiz');
  };

  const totalQuizzes = Object.keys(allQuestions).length;
  const bestScore = userStats.bestScore;
  const avgScore = userStats.totalQuizzes > 0 
    ? Math.round(userStats.totalScore / userStats.totalQuizzes) 
    : 0;
  const recentScores = scores.slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">Loading QuizMaster...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 dark:from-indigo-900 dark:via-purple-900 dark:to-blue-900 rounded-2xl text-white p-16 text-center shadow-2xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-white/20 dark:bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight drop-shadow-lg">Welcome to QuizMaster</h1>
          <p className="text-xl opacity-95 font-medium">Test your knowledge, track your progress, and climb the leaderboard</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
        <div className="card bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-indigo-500/30 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
            <span className="dark:text-white">User Info</span>
          </h3>
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Enter Your Name</label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Your name..."
            className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-indigo-500/20 transition-all"
          />
          <button
            onClick={handleSaveName}
            className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-indigo-600 dark:to-purple-600 hover:from-blue-700 hover:to-blue-800 dark:hover:from-indigo-700 dark:hover:to-purple-700 text-white rounded-lg font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-indigo-500/30"
          >
            Save Name
          </button>
          <p className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <strong className="text-slate-600 dark:text-slate-400">Welcome:</strong>{' '}
            <span className="text-blue-600 dark:text-blue-400 font-bold">{username}</span>
          </p>
        </div>

        <div className="card bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-purple-900/40 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
            </div>
            <span className="dark:text-white">Total Categories</span>
          </h3>
          <p className="text-4xl font-extrabold text-blue-600 dark:text-purple-400 mt-2">{totalQuizzes}</p>
        </div>

        <div className="card bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-green-500/30 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-green-500/20 hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <span className="dark:text-white">Best Score</span>
          </h3>
          <p className="text-4xl font-extrabold text-green-600 dark:text-green-400 mt-2">{bestScore}</p>
        </div>

        <div className="card bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/10 dark:hover:shadow-amber-500/20 hover:-translate-y-1 transition-all duration-300">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-lg">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <span className="dark:text-white">Average Score</span>
          </h3>
          <p className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">{avgScore}</p>
        </div>
      </div>

      {/* Featured Quiz */}
      <div className="mt-7 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-800/20 p-6 rounded-xl shadow-md border-2 border-amber-400 dark:border-amber-600">
        <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 mb-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
          </svg>
          <span>Featured Quiz of the Day</span>
        </h3>
        <p className="text-amber-800 dark:text-amber-300 font-semibold text-lg">{featuredQuiz || ''}</p>
      </div>

      {/* Categories */}
      <h2 className="text-3xl font-bold mt-8 mb-5 flex items-center gap-3 dark:text-white">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
          </svg>
        </div>
        <span>Available Categories</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.keys(allQuestions).map((category) => (
          <div
            key={category}
            onClick={() => startQuiz(category)}
            className="cat-card bg-gradient-to-br from-blue-100 to-blue-200 dark:from-indigo-900/40 dark:to-purple-900/40 p-8 rounded-xl text-center cursor-pointer font-bold text-lg text-blue-900 dark:text-blue-100 transition-all hover:-translate-y-2 hover:scale-105 hover:from-blue-600 hover:to-blue-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 hover:text-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-indigo-500/50 border-2 border-blue-300 dark:border-indigo-500/30 hover:border-blue-600 dark:hover:border-indigo-400 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            <span className="relative z-10">{category}</span>
          </div>
        ))}
      </div>

      {/* Recent Scores */}
      <div className="mt-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl shadow-lg border-2 border-slate-200 dark:border-indigo-500/30 hover:shadow-xl transition-shadow">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 dark:text-white">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
            </svg>
          </div>
          <span>Recent Scores</span>
        </h3>
        <ul className="space-y-3">
          {recentScores.length === 0 ? (
            <li className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-indigo-900/30 px-5 py-4 rounded-lg font-semibold border-l-4 border-blue-600 dark:border-blue-400 text-slate-700 dark:text-slate-200">
              No scores yet play a quiz!
            </li>
          ) : (
            recentScores.map((s, i) => (
              <li
                key={i}
                className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-indigo-900/30 px-5 py-4 rounded-lg font-semibold border-l-4 border-blue-600 dark:border-blue-400 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 dark:hover:from-slate-600 dark:hover:to-indigo-800/40 hover:translate-x-2 transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{s.category}</span>
                  <span className="font-bold text-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">{s.score} pts</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {s.date ? new Date(s.date).toLocaleDateString() : 'Recently'}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
