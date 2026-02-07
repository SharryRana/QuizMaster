'use client';

import { useQuiz } from '@/contexts/QuizContext';
import Sidebar from '@/components/Sidebar';
import Home from '@/components/Home';
import Quiz from '@/components/Quiz';
import Result from '@/components/Result';
import CreateQuiz from '@/components/CreateQuiz';
import Leaderboard from '@/components/Leaderboard';
import About from '@/components/About';

export default function Page() {
  const { currentSection } = useQuiz();

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <Sidebar />
      
      <main className="ml-[260px] flex-1 p-8 min-h-screen max-w-[1400px]">
        {currentSection === 'home' && <Home />}
        {currentSection === 'quiz' && <Quiz />}
        {currentSection === 'result' && <Result />}
        {currentSection === 'create' && <CreateQuiz />}
        {currentSection === 'leaderboard' && <Leaderboard />}
        {currentSection === 'about' && <About />}
      </main>
    </div>
  );
}
