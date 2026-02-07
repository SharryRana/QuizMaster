export interface Question {
  q: string;
  options: string[];
  answer: string;
}

export interface QuizCategory {
  [category: string]: Question[];
}

export interface ScoreEntry {
  name: string;
  score: number;
  category?: string;
  date?: string;
}

export interface UserStats {
  username: string;
  totalQuizzes: number;
  bestScore: number;
  avgScore: number;
  recentScores: number[];
}

export type ThemeMode = 'light' | 'dark';

export type Section = 'home' | 'quiz' | 'create' | 'leaderboard' | 'about' | 'result';
