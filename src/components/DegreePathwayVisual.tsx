import React from 'react';
import { GraduationCap, BookOpen, Wrench, Briefcase, Award } from 'lucide-react';

interface DegreePathwayVisualProps {
  degreeName: string;
  category: string;
}

export const DegreePathwayVisual: React.FC<DegreePathwayVisualProps> = ({ degreeName, category }) => {
  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 space-y-4 my-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Academic Pathway & Career Progression
        </span>
        <span className="text-[11px] text-slate-500 font-medium">HEC Aligned Route</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">01</div>
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Entry & Eligibility</h4>
          <p className="text-[11px] text-slate-600">Intermediate FSc / ICS / A-Levels + Entry Test (ECAT/NTS).</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">02</div>
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Core Curriculum</h4>
          <p className="text-[11px] text-slate-600">Fundamental theory, labs, and specialized major subjects.</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">03</div>
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Applied Projects</h4>
          <p className="text-[11px] text-slate-600">Final year capstone project, internships & practical portfolios.</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">04</div>
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Career & Graduate</h4>
          <p className="text-[11px] text-slate-600">Top employer placement, remote roles & MS/PhD pathways.</p>
        </div>
      </div>
    </div>
  );
};
