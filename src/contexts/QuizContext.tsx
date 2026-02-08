'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { QuizCategory, ScoreEntry, Section, ThemeMode, Question } from '@/types';

interface QuizContextType {
  // Questions & Categories
  allQuestions: QuizCategory;
  addCustomQuiz: (category: string, questions: Question[]) => void;
  loadQuizzes: () => Promise<void>;

  // User
  username: string;
  setUsername: (name: string) => Promise<void>;
  userStats: {
    totalQuizzes: number;
    totalScore: number;
    bestScore: number;
  };

  // Scores & Stats
  scores: ScoreEntry[];
  leaderboard: ScoreEntry[];
  addScore: (score: number, category: string, totalQuestions: number) => Promise<void>;
  loadScores: () => Promise<void>;
  loadLeaderboard: () => Promise<void>;

  // Navigation
  currentSection: Section;
  setCurrentSection: (section: Section) => void;

  // Quiz State
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  score: number;
  setScore: (score: number) => void;

  // Theme
  theme: ThemeMode;
  toggleTheme: () => void;

  // Loading state
  isLoading: boolean;

  // Mobile menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [allQuestions, setAllQuestions] = useState<QuizCategory>({});
  const [username, setUsernameState] = useState<string>('Guest');
  const [userStats, setUserStats] = useState({ totalQuizzes: 0, totalScore: 0, bestScore: 0 });
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as ThemeMode;
      return savedTheme || 'light';
    }
    return 'light';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  // Define functions before they're used
  const loadUserData = async (name: string) => {
    try {
      const response = await fetch(`/api/users?username=${encodeURIComponent(name)}`);
      if (response.ok) {
        const { user } = await response.json();
        setUserStats({
          totalQuizzes: user.totalQuizzes,
          totalScore: user.totalScore,
          bestScore: user.bestScore,
        });

        // Load user's scores
        const scoresResponse = await fetch(`/api/scores?username=${encodeURIComponent(name)}`);
        if (scoresResponse.ok) {
          const { scores: userScores } = await scoresResponse.json();
          setScores(
            userScores.map((s: { username: string; score: number; category: string; createdAt: string }) => ({
              name: s.username,
              score: s.score,
              category: s.category,
              date: s.createdAt,
            }))
          );
        }
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const loadQuizzes = async () => {
    try {
      const response = await fetch('/api/quizzes');
      if (response.ok) {
        const { quizzes } = await response.json();
        const questionsObj: QuizCategory = {};
        quizzes.forEach((quiz: { category: string; questions: Question[] }) => {
          questionsObj[quiz.category] = quiz.questions;
        });
        setAllQuestions(questionsObj);
      }
    } catch (error) {
      console.error('Failed to load quizzes:', error);
    }
  };

  const loadLeaderboard = async () => {
    try {
      const response = await fetch('/api/scores');
      if (response.ok) {
        const { scores: topScores } = await response.json();
        setLeaderboard(
          topScores.map((s: { username: string; score: number; category: string; createdAt: string }) => ({
            name: s.username,
            score: s.score,
            category: s.category,
            date: s.createdAt,
          }))
        );
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
  };

  // Initialize app: load data from MongoDB
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize default quizzes if needed
        await fetch('/api/init', { method: 'POST' });

        // Load username from localStorage
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
          setUsernameState(savedUsername);
          await loadUserData(savedUsername);
        }

        // Load quizzes and leaderboard
        await loadQuizzes();
        await loadLeaderboard();

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const loadScores = async () => {
    if (username === 'Guest') return;
    try {
      const response = await fetch(`/api/scores?username=${encodeURIComponent(username)}`);
      if (response.ok) {
        const { scores: userScores } = await response.json();
        setScores(
          userScores.map((s: { username: string; score: number; category: string; createdAt: string }) => ({
            name: s.username,
            score: s.score,
            category: s.category,
            date: s.createdAt,
          }))
        );
      }
    } catch (error) {
      console.error('Failed to load scores:', error);
    }
  };

  const setUsername = async (name: string) => {
    setUsernameState(name);
    localStorage.setItem('username', name);
    
    try {
      // Create or get user in database
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name }),
      });

      if (response.ok) {
        await loadUserData(name);
      }
    } catch (error) {
      console.error('Failed to set username:', error);
    }
  };

  const addCustomQuiz = async (category: string, questions: Question[]) => {
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          questions,
          isCustom: true,
          createdBy: username,
        }),
      });

      if (response.ok) {
        await loadQuizzes();
      }
    } catch (error) {
      console.error('Failed to add custom quiz:', error);
    }
  };

  const addScore = async (newScore: number, category: string, totalQuestions: number) => {
    try {
      const response = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          category,
          score: newScore,
          totalQuestions,
        }),
      });

      if (response.ok) {
        // Reload user data and leaderboard
        await loadUserData(username);
        await loadLeaderboard();
      }
    } catch (error) {
      console.error('Failed to add score:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Toggling theme from', theme, 'to', newTheme);
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Immediately apply the theme class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      console.log('Added dark class');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      console.log('Removed dark class');
    }
  };

  const value = {
    allQuestions,
    addCustomQuiz,
    loadQuizzes,
    username,
    setUsername,
    userStats,
    scores,
    leaderboard,
    addScore,
    loadScores,
    loadLeaderboard,
    currentSection,
    setCurrentSection,
    currentCategory,
    setCurrentCategory,
    currentIndex,
    setCurrentIndex,
    score,
    setScore,
    theme,
    toggleTheme,
    isLoading,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider');
  }
  return context;
};
