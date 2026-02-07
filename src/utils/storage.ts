import { QuizCategory, ScoreEntry } from '@/types';
import { defaultQuestions } from '@/data/questions';

export const storage = {
  // Questions
  getQuestions: (): QuizCategory => {
    if (typeof window === 'undefined') return defaultQuestions;
    const stored = localStorage.getItem('allQuestions');
    return stored ? JSON.parse(stored) : defaultQuestions;
  },

  setQuestions: (questions: QuizCategory): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('allQuestions', JSON.stringify(questions));
  },

  // Scores
  getScores: (): number[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('scores');
    return stored ? JSON.parse(stored) : [];
  },

  addScore: (score: number): void => {
    if (typeof window === 'undefined') return;
    const scores = storage.getScores();
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
  },

  // Leaderboard
  getLeaderboard: (): ScoreEntry[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('leaderboard');
    return stored ? JSON.parse(stored) : [];
  },

  addToLeaderboard: (entry: ScoreEntry): void => {
    if (typeof window === 'undefined') return;
    let leaderboard = storage.getLeaderboard();
    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 50);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  },

  // Username
  getUsername: (): string => {
    if (typeof window === 'undefined') return 'Guest';
    return localStorage.getItem('username') || 'Guest';
  },

  setUsername: (username: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('username', username);
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  },
};
