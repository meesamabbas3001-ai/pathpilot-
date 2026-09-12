import React from 'react';
import { RecommendationMatch } from '../types';
import { X, Layers, CheckCircle2 } from 'lucide-react';

interface CompareModalProps {
  recommendations: RecommendationMatch[];
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ recommendations, onClose }) => {
  const topPaths = recommendations.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-in p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Compare My Paths (“What If I Choose This?”)</h2>
              <p className="text-xs text-slate-500">Side-by-side analysis of your top recommended options.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPaths.map((path, idx) => (
            <div key={path.degreeId} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4 relative">
              <div className="absolute top-4 right-4 bg-indigo-600 text-white font-bold text-xs px-2.5 py-1 rounded-full">
                {path.fitScore}% Fit
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                  Option {idx + 1}: {path.type}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">{path.degreeName}</h3>
                <p className="text-xs text-slate-600 mt-1">Primary Career: <strong>{path.careerName}</strong></p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-200/60 text-xs">
                <div>
                  <span className="font-semibold text-slate-500 block">Study Length</span>
                  <span className="font-bold text-slate-800">4 Years Full-Time (Flexible Options)</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 block">Learning Difficulty</span>
                  <span className="font-bold text-slate-800">Moderate to High (Requires Dedication)</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 block">Key Skill Requirements</span>
                  <span className="font-bold text-slate-800">{path.roadmap.coreSkills.slice(0, 3).join(', ')}</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 block">Work Style</span>
                  <span className="font-bold text-slate-800">Hybrid / Remote / Collaborative</span>
                </div>

                <div>
                  <span className="font-semibold text-slate-500 block">Salary & Compensation Note</span>
                  <span className="text-slate-600 italic">Salary varies by country, experience, employer and specialization.</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            All paths are evaluated based on your unique assessment profile.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
