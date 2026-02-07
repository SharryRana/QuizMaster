'use client';

import React, { useEffect, useRef } from 'react';
import { useQuiz } from '@/contexts/QuizContext';

export default function Result() {
  const { score, currentCategory, allQuestions, setCurrentSection, addScore } = useQuiz();
  const hasSaved = useRef(false);

  const totalQuestions = allQuestions[currentCategory]?.length || 0;
  const maxScore = totalQuestions * 10;
  const percentage = (score / maxScore) * 100;

  // Save score to database when component mounts (only once)
  useEffect(() => {
    if (hasSaved.current) return;
    hasSaved.current = true;
    
    const saveScore = async () => {
      await addScore(score, currentCategory, totalQuestions);
    };
    saveScore();
  }, [score, currentCategory, totalQuestions, addScore]);

  const getRemark = () => {
    if (percentage >= 80) return { text: '🎉 Excellent!', color: 'text-green-600 dark:text-green-400' };
    if (percentage >= 50) return { text: '👍 Good Job!', color: 'text-blue-600 dark:text-blue-400' };
    return { text: '📚 Keep Practicing!', color: 'text-yellow-600 dark:text-yellow-400' };
  };

  const remark = getRemark();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-slate-800 dark:via-indigo-900/50 dark:to-purple-900/40 p-12 rounded-3xl text-center shadow-2xl border-2 border-blue-500 dark:border-indigo-400">
        <div className="inline-flex items-center justify-center w-28 h-28 mb-6 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full shadow-xl animate-bounce">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        </div>
        <h2 className="text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
          Quiz Complete!
        </h2>
        
        <div className="mb-8 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 dark:border-indigo-500/40">
          <p className="text-2xl font-semibold mb-3 text-slate-700 dark:text-slate-200">
            Category: <span className="text-blue-700 dark:text-blue-300 font-bold">{currentCategory}</span>
          </p>
          <p className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent my-5">
            {score} / {maxScore}
          </p>
          <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {percentage.toFixed(0)}% Correct
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-600/20 dark:to-purple-600/20 rounded-2xl p-6 mb-8 border-2 border-blue-400 dark:border-indigo-400">
          <p className={`text-4xl font-extrabold ${remark.color}`}>
            {remark.text}
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('home')}
          className="mt-4 px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold text-xl transition-all hover:-translate-y-2 hover:shadow-2xl shadow-xl"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
