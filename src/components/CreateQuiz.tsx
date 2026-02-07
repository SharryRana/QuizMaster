'use client';

import React, { useState } from 'react';
import { useQuiz } from '@/contexts/QuizContext';

interface QuestionField {
  id: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

export default function CreateQuiz() {
  const { addCustomQuiz, setCurrentSection } = useQuiz();
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState<QuestionField[]>([]);
  const [nextId, setNextId] = useState(1);

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      {
        id: nextId,
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
      },
    ]);
    setNextId(nextId + 1);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const saveQuiz = () => {
    if (!category.trim()) {
      alert('Please enter a category name.');
      return;
    }

    const validQuestions = questions.filter(
      (q) =>
        q.question.trim() &&
        q.option1.trim() &&
        q.option2.trim() &&
        q.answer.trim()
    );

    if (validQuestions.length === 0) {
      alert('Please add at least one valid question with options and a correct answer.');
      return;
    }

    const formatted = validQuestions.map((q) => ({
      q: q.question.trim(),
      options: [q.option1, q.option2, q.option3, q.option4].filter((o) => o.trim()),
      answer: q.answer.trim(),
    }));

    addCustomQuiz(category.trim(), formatted);
    alert('Quiz saved successfully! You can find it on the Home page.');
    setCategory('');
    setQuestions([]);
    setCurrentSection('home');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-indigo-500/40">
        <div className="flex items-center mb-8">
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Create a New Quiz
          </h2>
        </div>

        <div className="mb-8">
          <label className="block mb-3 font-bold text-lg text-slate-800 dark:text-slate-100">
            Category Name
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Math, Science, History..."
            className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 dark:focus:border-indigo-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-indigo-500/20 transition-all font-semibold shadow-sm"
          />
        </div>

        <div className="space-y-6">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-dashed border-blue-300 dark:border-indigo-500/40 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <label className="block mb-3 font-bold text-xl text-slate-900 dark:text-slate-100">
                Question Text
              </label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                placeholder="Enter your question..."
                className="w-full px-5 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 mb-5 focus:outline-none focus:border-blue-600 dark:focus:border-indigo-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-semibold"
              />

              <label className="block mb-3 font-bold text-lg text-slate-900 dark:text-slate-100">
                Answer Options
              </label>
              <input
                type="text"
                value={q.option1}
                onChange={(e) => updateQuestion(q.id, 'option1', e.target.value)}
                placeholder="Option 1"
                className="w-full px-5 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 mb-3 focus:outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
              <input
                type="text"
                value={q.option2}
                onChange={(e) => updateQuestion(q.id, 'option2', e.target.value)}
                placeholder="Option 2"
                className="w-full px-5 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 mb-3 focus:outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
              <input
                type="text"
                value={q.option3}
                onChange={(e) => updateQuestion(q.id, 'option3', e.target.value)}
                placeholder="Option 3 (optional)"
                className="w-full px-5 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 mb-3 focus:outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
              <input
                type="text"
                value={q.option4}
                onChange={(e) => updateQuestion(q.id, 'option4', e.target.value)}
                placeholder="Option 4 (optional)"
                className="w-full px-5 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 mb-5 focus:outline-none focus:border-green-600 dark:focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />

              <label className="block mb-3 font-bold text-lg text-slate-900 dark:text-slate-100">
                Correct Answer
              </label>
              <input
                type="text"
                value={q.answer}
                onChange={(e) => updateQuestion(q.id, 'answer', e.target.value)}
                placeholder="Type the exact correct answer from options above"
                className="w-full px-5 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 mb-5 focus:outline-none focus:border-purple-600 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />

              <button
                onClick={() => removeQuestion(q.id)}
                className="w-full px-5 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-xl shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Remove Question
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={addQuestionField}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-2xl shadow-lg flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
            </svg>
            Add Question
          </button>
          <button
            onClick={saveQuiz}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-2xl shadow-lg flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            Save Quiz
          </button>
        </div>

        <div className="mt-8 text-base bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl border-l-4 border-blue-600 dark:border-blue-400 flex gap-4 shadow-sm">
          <svg className="w-7 h-7 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
          </svg>
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
            <strong className="text-blue-700 dark:text-blue-300">Tip:</strong> Add questions with their options and correct answers, then click "Save Quiz". 
            Your custom quiz will appear in the Available Categories section on the Home page.
          </p>
        </div>
      </div>
    </div>
  );
}
