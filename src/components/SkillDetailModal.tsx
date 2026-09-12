import React from 'react';
import { SkillDetail } from '../data/skillsData';
import { X, Wrench, CheckCircle2, BookOpen, Briefcase, Cpu, Layers, Shield, Terminal, ArrowRight, FileText, HelpCircle } from 'lucide-react';
import { SkillPathwayVisual } from './SkillPathwayVisual';

interface SkillDetailModalProps {
  skill: SkillDetail;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-in p-6 sm:p-10 space-y-8">
        
        {/* Breadcrumb */}
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <span>Home</span>
          <span>→</span>
          <span>Future Skills Index</span>
          <span>→</span>
          <span className="text-indigo-600 truncate max-w-xs">{skill.name}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {skill.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{skill.name}</h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">{skill.description}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Educational Skill Workflow Diagram */}
        <SkillPathwayVisual skillId={skill.id} skillName={skill.name} />

        {/* Content sections */}
        <div className="space-y-8">
          
          {/* What is it & Why important */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h2 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>What is {skill.name}?</span>
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {skill.whatIsIt.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50/60 p-6 rounded-2xl border border-indigo-100 space-y-3">
              <h2 className="font-extrabold text-indigo-950 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Why It Is Becoming Important</span>
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-indigo-900 leading-relaxed">
                {skill.whyImportant.map((item, i) => (
                  <p key={i}>• {item}</p>
                ))}
              </div>
            </div>
          </div>

          {/* AI Agents Special Section if applicable */}
          {skill.isAiAgentsSpecial && (
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">AI Agents & Automation Architecture</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                AI agents transcend traditional chatbots by maintaining persistent memory, executing deterministic loops (ReAct), invoking external REST APIs, using tools, and orchestrating multi-step workflows with human-in-the-loop governance.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-wider mb-1">Tool Use & APIs</h4>
                  <p className="text-xs text-slate-300">Allowing LLMs to query databases, run code interpreters, and trigger external webhooks.</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-wider mb-1">Multi-Step Loops</h4>
                  <p className="text-xs text-slate-300">Reasoning, planning, executing, evaluating, and self-correcting errors autonomously.</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <h4 className="font-bold text-xs text-indigo-400 uppercase tracking-wider mb-1">Supervision & Safety</h4>
                  <p className="text-xs text-slate-300">Guardrails, deterministic validation, permission boundaries, and human oversight.</p>
                </div>
              </div>
            </div>
          )}

          {/* What can you do & Core abilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">What You Can Do With This Skill</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {skill.whatCanYouDo.map((item, i) => (
                  <li key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Core Abilities to Learn</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {skill.coreAbilities.map((item, i) => (
                  <li key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Beginner → Intermediate → Advanced Roadmap */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">Learning Roadmap (Beginner → Advanced)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">Beginner</span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {skill.roadmap.beginner.map((step, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold shrink-0">1.{i+1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">Intermediate</span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {skill.roadmap.intermediate.map((step, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold shrink-0">2.{i+1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">Advanced</span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {skill.roadmap.advanced.map((step, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold shrink-0">3.{i+1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tools, Projects, & Where Used */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Tools & Technologies</h4>
              <div className="flex flex-wrap gap-1.5">
                {skill.toolsAndTech.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Projects to Practice</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {skill.projectsToPractice.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Where This Is Used</h4>
              <div className="flex flex-wrap gap-1.5">
                {skill.whereUsed.map((w, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Related Degrees & Careers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Related Degrees</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.relatedDegrees.map((deg, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                    {deg}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                <span>Related Career Pathways</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.relatedCareers.map((car, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100">
                    {car}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* First to learn & Future relevance */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">What Students Should Learn First</h4>
            <div className="flex flex-wrap gap-2">
              {skill.firstToLearn.map((f, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                  {f}
                </span>
              ))}
            </div>
            <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Future Relevance:</strong> {skill.futureRelevance}
            </div>
          </div>

          {/* FAQs */}
          {skill.faqs && skill.faqs.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="space-y-3">
                {skill.faqs.map((faq, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{faq.q}</h5>
                    <p className="text-xs sm:text-sm text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Sources: {skill.sources.join(', ')} • Updated: {skill.lastUpdated}</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
