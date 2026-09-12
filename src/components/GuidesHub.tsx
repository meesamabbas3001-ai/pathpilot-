import React from 'react';
import { GUIDES_DATA } from '../data/guidesData';
import { GuideArticle } from '../types';
import { BookOpen, Clock, ArrowRight, User, ShieldCheck } from 'lucide-react';

interface GuidesHubProps {
  onSelectGuide: (guide: GuideArticle) => void;
  onSelectAuthor?: (authorName: string) => void;
  onBackToHome: () => void;
}

export const GuidesHub: React.FC<GuidesHubProps> = ({ onSelectGuide, onSelectAuthor, onBackToHome }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <span>Home</span>
          <span>→</span>
          <span className="text-indigo-600">Guides Hub ({GUIDES_DATA.length} Articles)</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Expert SEO Guides Hub</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Career & Degree Strategy Guides for Pakistani Students
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Human-authored, fact-checked guides to help you navigate academic choices after FSc/ICS/A-Levels, HEC accreditation, and modern career paths in Pakistan.
            </p>
          </div>

          <button
            onClick={onBackToHome}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm self-start md:self-auto"
          >
            ← Back to Home
          </button>
        </div>

        {/* Guides List */}
        <div className="space-y-4">
          {GUIDES_DATA.map(guide => (
            <div
              key={guide.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
            >
              <div 
                onClick={() => onSelectGuide(guide)}
                className="space-y-3 max-w-2xl cursor-pointer"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {guide.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime}
                  </span>
                  {guide.author && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectAuthor) onSelectAuthor(guide.author!.name);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 font-semibold cursor-pointer bg-indigo-50/80 px-2 py-0.5 rounded"
                    >
                      <User className="w-3.5 h-3.5" />
                      {guide.author.name}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {guide.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div 
                onClick={() => onSelectGuide(guide)}
                className="shrink-0 flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Read Article →</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
