import React from 'react';
import { GuideArticle } from '../types';
import { X, BookOpen, Clock, User, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface GuideArticleModalProps {
  guide: GuideArticle;
  onClose: () => void;
  onNavigateToDegrees?: () => void;
  onNavigateToSkills?: () => void;
}

export const GuideArticleModal: React.FC<GuideArticleModalProps> = ({
  guide,
  onClose,
  onNavigateToDegrees,
  onNavigateToSkills
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-in p-6 sm:p-10 space-y-6">
        
        {/* Breadcrumb */}
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <span>Home</span>
          <span>→</span>
          <span>Guides Hub</span>
          <span>→</span>
          <span className="text-indigo-600 truncate max-w-xs">{guide.title}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {guide.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                <Clock className="w-3.5 h-3.5" />
                {guide.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{guide.title}</h1>
            <p className="text-sm font-medium text-slate-600 max-w-2xl">{guide.description}</p>

            {/* Author Byline for E-E-A-T */}
            {guide.author && (
              <div className="flex items-center gap-3 pt-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 w-fit">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {guide.author.name.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{guide.author.name}</span>
                  <span className="text-slate-500 text-[11px]">{guide.author.credential}</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-xl">
          {guide.datePublished && <span>Published: {guide.datePublished}</span>}
          {guide.dateModified && <span>• Updated / Reviewed: {guide.dateModified}</span>}
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-5 text-slate-700 text-sm leading-relaxed pt-2">
          {guide.content.map((paragraph, i) => (
            <p key={i} className="text-slate-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Internal Links to Degrees & Skills */}
        <div className="bg-indigo-50/60 border border-indigo-100 p-6 rounded-2xl space-y-3 mt-6">
          <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Recommended Next Steps & Resources</span>
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                if (onNavigateToDegrees) onNavigateToDegrees();
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs hover:bg-indigo-50 border border-indigo-200 flex items-center justify-between shadow-sm"
            >
              <span>Explore HEC-Recognized Degree Programs →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                onClose();
                if (onNavigateToSkills) onNavigateToSkills();
              }}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs hover:bg-indigo-50 border border-indigo-200 flex items-center justify-between shadow-sm"
            >
              <span>Explore Future Skills Index →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Fact-Checked & Verified for Pakistani Students</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
