import React from 'react';

export const HeroPathwayIllustration: React.FC = () => {
  return (
    <div className="my-8 max-w-4xl mx-auto px-4" aria-label="PathPilot student journey pathway illustration">
      <div className="bg-white/90 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100/50">
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            The PathPilot Career & Education Journey
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
            Your Structured Route from Student to Professional Success
          </h2>
        </div>

        {/* Responsive Vector Pathway Diagram */}
        <div className="relative py-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
            {/* Step 1 */}
            <div className="bg-slate-50/80 hover:bg-indigo-50/50 transition-colors p-4 rounded-2xl border border-slate-200/70 text-center space-y-2 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Education</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                FSc, ICS, A-Levels & Academic Background
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50/80 hover:bg-indigo-50/50 transition-colors p-4 rounded-2xl border border-slate-200/70 text-center space-y-2 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Degree Major</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                HEC Aligned BS, MBBS, BBA & Engineering
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50/80 hover:bg-indigo-50/50 transition-colors p-4 rounded-2xl border border-slate-200/70 text-center space-y-2 group">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white font-bold flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Future Skills</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                AI Automation, Coding & Cloud Competencies
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50/80 hover:bg-indigo-50/50 transition-colors p-4 rounded-2xl border border-slate-200/70 text-center space-y-2 group">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white font-bold flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Projects</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Real-World Portfolio & Practical Milestones
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50/80 hover:bg-emerald-50/60 transition-colors p-4 rounded-2xl border border-slate-200/70 text-center space-y-2 group">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
                05
              </div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Career & Future</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Top Pakistani Employers & Remote Global Roles
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>🎯 Verified HEC guidelines</span>
          <span>⚡ 100% Free personalized guidance</span>
          <span>🚀 Local & remote job market scope</span>
        </div>
      </div>
    </div>
  );
};
