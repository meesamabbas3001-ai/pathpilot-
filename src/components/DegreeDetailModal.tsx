import React from 'react';
import { DegreeInfo } from '../types';
import { X, BookOpen, Clock, Building, CheckCircle2, AlertTriangle, ArrowRight, GraduationCap, Award, FileText, ShieldCheck } from 'lucide-react';
import { DegreePathwayVisual } from './DegreePathwayVisual';

interface DegreeDetailModalProps {
  degree: DegreeInfo;
  onClose: () => void;
  onNavigateToSkills?: () => void;
}

export const DegreeDetailModal: React.FC<DegreeDetailModalProps> = ({
  degree,
  onClose,
  onNavigateToSkills
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-in p-6 sm:p-10 space-y-8">
        
        {/* Breadcrumb */}
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <span>Home</span>
          <span>→</span>
          <span>Degree Database</span>
          <span>→</span>
          <span className="text-indigo-600 truncate max-w-xs">{degree.name}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {degree.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full font-medium">
                <Clock className="w-3.5 h-3.5" />
                {degree.typicalStudyDuration}
              </span>
              {degree.difficulty && (
                <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-medium border border-amber-100">
                  Rigor: {degree.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{degree.name}</h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">{degree.description}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Educational Degree Pathway Visual */}
        <DegreePathwayVisual degreeName={degree.name} category={degree.category} />

        {/* Admission Requirements & Pakistani Context Note */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Admission Prerequisites & HEC Recognition (Pakistan Context)</span>
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {degree.eligibilityInfo || 'Requires Intermediate (FSc Pre-Engineering / Pre-Medical / ICS) or A-Level equivalence certified by IBCC, with university entry test qualification (such as ECAT, NTS-NAT, or university-specific aptitude tests). HEC-recognized degree program.'}
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg font-semibold">Typical Starting Salary (Pakistan): PKR 80,000 – 180,000 / month</span>
            <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-lg font-semibold">HEC Accredited Curriculum</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Subjects & Skills */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Subjects Commonly Studied</span>
              </h3>
              <ul className="space-y-2">
                {degree.subjectsCommonlyStudied.map((sub, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                    <span>{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base mb-3">Skills Developed</h3>
              <div className="flex flex-wrap gap-2">
                {degree.skillsDeveloped.map((skill, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {degree.alternativeDegrees && degree.alternativeDegrees.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Alternative / Related Degrees</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {degree.alternativeDegrees.map((alt, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Careers & Considerations */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-3">Possible Career Paths</h3>
              <div className="flex flex-wrap gap-2">
                {degree.possibleCareers.map((car, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {car}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Building className="w-4 h-4 text-indigo-600" />
                <span>Work Environments</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {degree.workEnvironments.map((env, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    {env}
                  </span>
                ))}
              </div>
            </div>

            {degree.furtherStudyOptions && degree.furtherStudyOptions.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Further Study Options</span>
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {degree.furtherStudyOptions.map((opt, i) => (
                    <li key={i}>• {opt}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 space-y-2">
              <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Important Considerations</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-900">
                {degree.importantConsiderations.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Link to Future Skills */}
        <div className="bg-indigo-50/60 border border-indigo-100 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Pair This Degree With In-Demand Future Skills</span>
            </h4>
            <p className="text-xs text-slate-600">
              Maximize your employability by combining this degree with AI Automation, Cloud Computing, or Data Analytics.
            </p>
          </div>
          {onNavigateToSkills && (
            <button
              onClick={() => {
                onClose();
                onNavigateToSkills();
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shrink-0 flex items-center gap-1.5 shadow"
            >
              <span>Explore Future Skills Index →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Last Reviewed: {degree.lastUpdated}</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
          >
            Close Degree Details
          </button>
        </div>
      </div>
    </div>
  );
};
