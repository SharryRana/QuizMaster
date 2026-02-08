'use client';

import React, { useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';

export default function Leaderboard() {
  const { leaderboard } = useQuiz();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(leaderboard.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEntries = leaderboard.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="max-w-4xl mx-auto px-2">
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-indigo-500/40">
        <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Leaderboard
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">
                {leaderboard.length} total {leaderboard.length === 1 ? 'entry' : 'entries'}
              </p>
            </div>
          </div>
          {totalPages > 1 && (
            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-300 dark:border-indigo-500/40">
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                Page {currentPage} of {totalPages}
              </p>
            </div>
          )}
        </div>

        {currentEntries.length === 0 ? (
          <div className="text-center py-8 sm:py-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border-2 border-dashed border-blue-300 dark:border-indigo-500/40">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 text-blue-400 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <p className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300">
              No leaderboard entries yet. Be the first to complete a quiz!
            </p>
          </div>
        ) : (
          <>
            <ol className="space-y-3 sm:space-y-4">
              {currentEntries.map((entry, index) => {
                const actualRank = startIndex + index;
                let bgClass = 'bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-indigo-900/40';
                let borderClass = 'border-blue-600 dark:border-blue-400';
                let badgeClass = 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md';
                let rankIcon = null;

                if (actualRank === 0) {
                  bgClass = 'bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/30 dark:via-amber-900/30 dark:to-orange-900/30';
                  borderClass = 'border-yellow-500 dark:border-yellow-400';
                  badgeClass = 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 text-white shadow-lg animate-pulse';
                  rankIcon = (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 absolute -top-1 -right-1 text-yellow-200" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  );
                } else if (actualRank === 1) {
                  bgClass = 'bg-gradient-to-r from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-800/40 dark:via-slate-800/40 dark:to-zinc-800/40';
                  borderClass = 'border-gray-500 dark:border-gray-400';
                  badgeClass = 'bg-gradient-to-br from-gray-400 to-slate-500 text-white shadow-lg';
                } else if (actualRank === 2) {
                  bgClass = 'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/30 dark:via-amber-900/30 dark:to-yellow-900/30';
                  borderClass = 'border-orange-500 dark:border-orange-400';
                  badgeClass = 'bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg';
                }

                return (
                  <li
                    key={actualRank}
                    className={`${bgClass} px-4 py-3 sm:px-6 sm:py-4 lg:py-5 rounded-xl font-semibold border-l-4 ${borderClass} flex items-center gap-3 sm:gap-4 hover:translate-x-1 sm:hover:translate-x-2 hover:shadow-xl transition-all shadow-md group`}
                  >
                    <div className="relative flex-shrink-0">
                      <span className={`${badgeClass} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-transform group-hover:scale-110`}>
                        {actualRank + 1}
                      </span>
                      {rankIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base sm:text-lg lg:text-xl text-slate-800 dark:text-slate-100 truncate">{entry.name}</div>
                      {entry.category && (
                        <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                          </svg>
                          <span className="truncate">{entry.category}</span>
                        </div>
                      )}
                      {entry.date && (
                        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <div className="font-extrabold text-2xl sm:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        {entry.score}
                      </div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">points</div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 sm:px-4 rounded-lg font-semibold transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base min-h-[44px] ${
                      currentPage === 1
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-1 sm:gap-2">
                    {getPageNumbers().map((page, idx) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${idx}`} className="px-2 sm:px-4 py-2 text-slate-500 dark:text-slate-400 font-bold text-sm sm:text-base">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page as number)}
                          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg font-bold transition-all text-sm sm:text-base ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white shadow-lg scale-110'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:scale-105 active:scale-95'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 sm:px-4 rounded-lg font-semibold transition-all flex items-center gap-1 sm:gap-2 text-sm sm:text-base min-h-[44px] ${
                      currentPage === totalPages
                        ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-center mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Showing entries {startIndex + 1}-{Math.min(endIndex, leaderboard.length)} of {leaderboard.length}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
