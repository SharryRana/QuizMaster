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
  const { currentSection, isMobileMenuOpen, setIsMobileMenuOpen } = useQuiz();

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <Sidebar />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between z-30 shadow-md">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
          </svg>
          <span className="font-bold text-lg text-slate-900 dark:text-white">QuizMaster</span>
        </div>
        <div className="w-10"></div>
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-[260px] pt-20 lg:pt-8 min-h-screen w-full max-w-full overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto">
          {currentSection === 'home' && <Home />}
          {currentSection === 'quiz' && <Quiz />}
          {currentSection === 'result' && <Result />}
          {currentSection === 'create' && <CreateQuiz />}
          {currentSection === 'leaderboard' && <Leaderboard />}
          {currentSection === 'about' && <About />}
        </div>
      </main>
    </div>
  );
}
