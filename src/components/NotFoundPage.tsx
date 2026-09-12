import React from 'react';
import { Compass, Home, Search, ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  onBackToHome: () => void;
  onExploreDegrees: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackToHome, onExploreDegrees }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-600">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">You've Wandered Off the Pathway</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page or resource you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back on track.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={onBackToHome}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors shadow flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to PathPilot Home</span>
          </button>
          <button
            onClick={onExploreDegrees}
            className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-indigo-600" />
            <span>Explore Degree Database</span>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
          PathPilot AI • Pakistan Education & Career Guidance
        </div>
      </div>
    </div>
  );
};
