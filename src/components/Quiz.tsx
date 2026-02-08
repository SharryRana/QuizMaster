'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useQuiz } from '@/contexts/QuizContext';

export default function Quiz() {
  const {
    allQuestions,
    currentCategory,
    setCurrentSection,
    score,
    setScore,
    currentIndex,
    setCurrentIndex,
  } = useQuiz();

  const [timer, setTimer] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const questions = allQuestions[currentCategory] || [];
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    // Reset quiz state
    setScore(0);
    setCurrentIndex(0);
  }, [currentCategory]);

  useEffect(() => {
    if (!currentQuestion) return;

    // Reset for new question
    setTimer(30);
    setSelectedAnswer(null);
    setIsAnswered(false);

    // Start timer
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, currentQuestion]);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsAnswered(true);
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const handleSelectAnswer = (answer: string) => {
    if (isAnswered) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === currentQuestion.answer) {
      setScore(score + 10);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const finalScore = selectedAnswer === currentQuestion.answer ? score + 10 : score;
    setScore(finalScore);
    setCurrentSection('result');
  };

  const endQuizEarly = () => {
    if (confirm('End quiz early? Your current score will be saved.')) {
      setCurrentSection('result');
    }
  };

  if (!currentQuestion) {
    return (
      <div className="text-center p-6 sm:p-8">
        <p className="text-lg sm:text-xl">Please select a quiz category from the home page.</p>
        <button
          onClick={() => setCurrentSection('home')}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all min-h-[44px]"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const getOptionClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-indigo-900/40 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/60 dark:hover:to-indigo-800/60 hover:border-blue-600 dark:hover:border-indigo-400 hover:translate-x-2 sm:hover:translate-x-3 hover:shadow-lg';
    }

    if (option === currentQuestion.answer) {
      return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400 animate-pulse shadow-xl';
    }

    if (option === selectedAnswer && option !== currentQuestion.answer) {
      return 'bg-gradient-to-r from-red-500 to-rose-600 text-white border-red-400 shadow-xl';
    }

    return 'bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 opacity-60';
  };

  return (
    <div>
      {/* Quiz Header */}
      <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
        <div className="font-bold text-base sm:text-lg lg:text-xl px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
          {currentCategory}
        </div>
        <div className={`text-base sm:text-lg lg:text-xl font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-lg border-2 shadow-lg transition-all ${
          timer <= 10 
            ? 'bg-gradient-to-br from-red-500 to-orange-600 border-red-400 text-white animate-pulse' 
            : 'bg-gradient-to-br from-yellow-400 to-amber-500 dark:from-yellow-600 dark:to-amber-700 border-yellow-500 text-slate-900 dark:text-white'
        }`}>
          ⏱ {timer}s
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg text-base sm:text-lg lg:text-xl">
          {currentIndex + 1}/{questions.length}
        </div>
      </div>

      {/* Question Box */}
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-indigo-500/40">
        <div className="font-bold text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 lg:mb-8 leading-relaxed text-slate-800 dark:text-white">
          Q{currentIndex + 1}: {currentQuestion.q}
        </div>

        <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
          {currentQuestion.options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectAnswer(option)}
              className={`px-4 py-3 sm:px-6 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl border-2 cursor-pointer font-semibold text-sm sm:text-base lg:text-lg transition-all shadow-md min-h-[48px] flex items-center ${getOptionClass(option)} ${
                !isAnswered ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed'
              }`}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-6 sm:mt-8">
          <button
            onClick={nextQuestion}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-bold text-base sm:text-lg transition-all hover:-translate-y-1 hover:shadow-2xl shadow-lg min-h-[44px]"
          >
            Next Question →
          </button>
          <button
            onClick={endQuizEarly}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg font-bold text-base sm:text-lg transition-all hover:-translate-y-1 hover:shadow-2xl shadow-lg min-h-[44px]"
          >
            End Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
