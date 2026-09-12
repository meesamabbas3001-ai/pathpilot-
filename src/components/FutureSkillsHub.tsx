import React from 'react';
import { SKILLS_DATA, SkillDetail } from '../data/skillsData';
import { Wrench, ArrowRight, Cpu, Shield, Database, Cloud, Code, LineChart, Layout, Sparkles } from 'lucide-react';

interface FutureSkillsHubProps {
  onSelectSkill: (skill: SkillDetail) => void;
  onBackToHome: () => void;
}

export const FutureSkillsHub: React.FC<FutureSkillsHubProps> = ({ onSelectSkill, onBackToHome }) => {
  const getSkillIcon = (id: string) => {
    switch (id) {
      case 'ai-agents-ai-automation': return <Cpu className="w-6 h-6 text-indigo-600" />;
      case 'generative-ai-ai-engineering': return <Sparkles className="w-6 h-6 text-violet-600" />;
      case 'cybersecurity': return <Shield className="w-6 h-6 text-rose-600" />;
      case 'data-analytics-data-science': return <LineChart className="w-6 h-6 text-blue-600" />;
      case 'cloud-computing': return <Cloud className="w-6 h-6 text-sky-600" />;
      case 'software-development': return <Code className="w-6 h-6 text-emerald-600" />;
      case 'digital-marketing-seo': return <TrendingUpIcon className="w-6 h-6 text-amber-600" />;
      case 'ux-ui-product-design': return <Layout className="w-6 h-6 text-pink-600" />;
      default: return <Wrench className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <span>Home</span>
          <span>→</span>
          <span className="text-indigo-600">Future Skills Index</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
              <Wrench className="w-3.5 h-3.5" />
              <span>Future Skills Index (8 Core Domains)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Future Skills Index: 8 In-Demand Skill Domains for Career Resilience
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              Academic degrees provide your theoretical foundation, but future-proof technical and functional competencies secure your long-term career resilience. We selected these 8 core domains based on active employer demand across Pakistan’s tech hubs (Lahore, Karachi, Islamabad) and international remote markets.
            </p>
          </div>

          <button
            onClick={onBackToHome}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm self-start md:self-auto shrink-0"
          >
            ← Back to Home
          </button>
        </div>

        {/* 8 Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map(skill => (
            <div
              key={skill.id}
              onClick={() => onSelectSkill(skill)}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getSkillIcon(skill.id)}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {skill.category}
                  </span>
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {skill.name}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {skill.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Updated {skill.lastUpdated}
                </span>
                <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
                  <span>Explore {skill.name} →</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
