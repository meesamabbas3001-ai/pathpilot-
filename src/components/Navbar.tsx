import React from 'react';
import { Compass, BookOpen, Wrench, Bookmark, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'assessment' | 'results' | 'degrees' | 'skills' | 'guides';
  onNavigate: (view: 'home' | 'assessment' | 'results' | 'degrees' | 'skills' | 'guides') => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedCount,
  onOpenSaved
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('home')} 
          className="flex items-center space-x-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
              PathPilot <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-semibold border border-indigo-100">AI 2.0</span>
            </span>
            <span className="text-xs text-slate-500 block -mt-0.5 font-medium">Degree, Skills & Career Finder</span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'home' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('degrees')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${currentView === 'degrees' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            Degrees
          </button>
          <button
            onClick={() => onNavigate('skills')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${currentView === 'skills' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            <Wrench className="w-4 h-4 text-slate-400" />
            Future Skills
          </button>
          <button
            onClick={() => onNavigate('guides')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'guides' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
          >
            Guides Hub
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {savedCount > 0 && (
            <button
              onClick={onOpenSaved}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
              title="Saved Results"
            >
              <Bookmark className="w-5 h-5 text-indigo-600" />
              <span className="hidden sm:inline">Saved</span>
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {savedCount}
              </span>
            </button>
          )}

          <button
            onClick={() => onNavigate('assessment')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Find My Path</span>
          </button>
        </div>
      </div>
    </header>
  );
};
