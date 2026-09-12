import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'assessment' | 'results' | 'degrees' | 'skills' | 'guides') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">PathPilot</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An AI-powered Degree, Skills & Career Path Finder built around who you are, what you love, and your unique goals.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-800/60 p-2.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Personalized guidance, not a guaranteed prediction.</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('assessment')} className="hover:text-white transition-colors">Find My Path</button></li>
              <li><button onClick={() => onNavigate('degrees')} className="hover:text-white transition-colors">Degree Database</button></li>
              <li><button onClick={() => onNavigate('skills')} className="hover:text-white transition-colors">Future Skills</button></li>
              <li><button onClick={() => onNavigate('guides')} className="hover:text-white transition-colors">SEO Guides Hub</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Legal & Trust</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              PathPilot provides data-driven career and academic orientation. It does not guarantee admission, employment, or financial returns.
            </p>
            <div className="text-xs text-slate-500 pt-2">
              © 2026 PathPilot AI. All rights reserved.
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>Designed for students, career transitioners, and lifelong learners.</p>
          <div className="flex items-center gap-1 mt-3 sm:mt-0">
            <span>Powered by structured data & intelligent guidance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
