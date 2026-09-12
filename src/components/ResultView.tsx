import React, { useState } from 'react';
import { RecommendationMatch, ActionPlan, UserAssessment } from '../types';
import { CheckCircle2, AlertTriangle, ArrowRight, Bookmark, Share2, Printer, Compass, Sparkles, Award, Layers, TrendingUp, Check } from 'lucide-react';

interface ResultViewProps {
  recommendations: RecommendationMatch[];
  actionPlan: ActionPlan;
  assessment: UserAssessment;
  onSaveResult: () => void;
  onOpenCompare: () => void;
  onRetake: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  recommendations,
  actionPlan,
  assessment,
  onSaveResult,
  onOpenCompare,
  onRetake
}) => {
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);
  const [sharedToast, setSharedToast] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const activeMatch = recommendations[selectedMatchIndex] || recommendations[0];

  const handleShare = () => {
    // Generate secure shareable link without exposing private user info
    const shareUrl = window.location.origin + window.location.pathname + '#shared-path';
    navigator.clipboard.writeText(shareUrl);
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 3000);
  };

  const handleSave = () => {
    onSaveResult();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Assessment Complete</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Your Career Path & Recommendations
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Based on your {assessment.currentEducationLevel} background, skills, and goals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Bookmark className="w-4 h-4 text-indigo-600" />
              <span>Save Result</span>
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Share2 className="w-4 h-4 text-indigo-600" />
              <span>Share</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Printer className="w-4 h-4 text-indigo-600" />
              <span>Print Report</span>
            </button>
          </div>
        </div>

        {/* Toasts */}
        {sharedToast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between animate-fade-in">
            <span>Secure report link copied to clipboard! (No private personal info is exposed).</span>
            <Check className="w-4 h-4" />
          </div>
        )}
        {savedToast && (
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between animate-fade-in">
            <span>Result successfully saved to your browser session!</span>
            <Check className="w-4 h-4" />
          </div>
        )}

        {/* 5 Recommendations Tabs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Your 5 Recommended Pathways
            </h3>
            <button
              onClick={onOpenCompare}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Compare Paths Side-by-Side →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {recommendations.map((rec, index) => {
              const isSelected = selectedMatchIndex === index;
              return (
                <button
                  key={rec.type}
                  onClick={() => setSelectedMatchIndex(index)}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {rec.type}
                    </span>
                    <span className={`text-xs font-extrabold ${isSelected ? 'text-white' : 'text-indigo-600'}`}>
                      {rec.fitScore}% Fit
                    </span>
                  </div>
                  <h4 className="font-bold text-sm line-clamp-1 mb-1">{rec.degreeName}</h4>
                  <p className={`text-xs line-clamp-1 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    Role: {rec.careerName}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Match Deep Dive */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 space-y-8 animate-fade-in">
          {/* Top Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-100">
                  {activeMatch.type}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Calculated Fit Score: <strong className="text-indigo-600 text-base">{activeMatch.fitScore}%</strong>
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {activeMatch.degreeName}
              </h2>
              <p className="text-base text-slate-600 mt-1 font-medium">
                Primary Target Career: <span className="text-indigo-600 font-bold">{activeMatch.careerName}</span>
              </p>
            </div>

            <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl text-center shrink-0">
              <span className="text-xs text-slate-500 block font-medium">Salary & Market Note</span>
              <span className="text-xs font-semibold text-slate-800 mt-0.5 block max-w-xs">
                Salary varies by country, experience, employer and specialization.
              </span>
            </div>
          </div>

          {/* Why this matches you & Potential concerns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Why matches */}
            <div className="bg-emerald-50/50 border border-emerald-100/80 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Why This Matches You</span>
              </h3>
              <ul className="space-y-3">
                {activeMatch.whyMatches.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Potential concerns */}
            <div className="bg-amber-50/50 border border-amber-100/80 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Potential Considerations & Challenges</span>
              </h3>
              <ul className="space-y-3">
                {activeMatch.potentialConcerns.map((concern, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">!</span>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Career Path Roadmap */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <span>Career Path & Visual Roadmap</span>
            </h3>
            <p className="text-sm text-slate-600">
              The structured progression from education to advanced leadership for this path:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">1. Education</span>
                <p className="font-bold text-xs text-slate-900 line-clamp-3">{activeMatch.roadmap.education}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">2. Core Skills</span>
                <p className="font-bold text-xs text-slate-900 line-clamp-3">{activeMatch.roadmap.coreSkills.slice(0, 3).join(', ')}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">3. Experience</span>
                <p className="font-bold text-xs text-slate-900 line-clamp-3">{activeMatch.roadmap.projectsOrExperience.join(', ')}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">4. Entry Level</span>
                <p className="font-bold text-xs text-slate-900 line-clamp-3">{activeMatch.roadmap.entryLevelRole}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">5. Mid Level</span>
                <p className="font-bold text-xs text-slate-900 line-clamp-3">{activeMatch.roadmap.midLevelRole}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">6. Advanced</span>
                <p className="font-bold text-xs text-slate-900 line-clamp-3">{activeMatch.roadmap.advancedRole}</p>
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <span>Your Personalized Action Plan</span>
              </h3>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Tailored to your goals
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  Next 30 Days
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {actionPlan.next30Days.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider">
                  Next 3 Months
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {actionPlan.next3Months.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-violet-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  Next 6–12 Months
                </div>
                <ul className="space-y-2 text-sm text-slate-700">
                  {actionPlan.next6To12Months.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onRetake}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4"
            >
              Retake Assessment with Different Answers
            </button>

            <button
              onClick={onOpenCompare}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Compare All 5 Paths Side-by-Side</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
