import React from 'react';
import { ArrowRight, Layers, Cpu, Shield, Database, Cloud, Terminal, TrendingUp, Palette } from 'lucide-react';

interface SkillPathwayVisualProps {
  skillId: string;
  skillName: string;
}

export const SkillPathwayVisual: React.FC<SkillPathwayVisualProps> = ({ skillId, skillName }) => {
  // Define 5-step workflow steps based on skill ID or default
  let steps = [
    { label: 'Foundations', desc: 'Core Concepts & Principles' },
    { label: 'Tooling', desc: 'Industry Software & Frameworks' },
    { label: 'Execution', desc: 'Building Functional Systems' },
    { label: 'Optimization', desc: 'Performance & Scaling' },
    { label: 'Deployment', desc: 'Production & Real-World Impact' }
  ];

  if (skillId === 'ai-agents' || skillId.includes('ai')) {
    steps = [
      { label: 'User Goal', desc: 'Define Objective' },
      { label: 'AI Agent', desc: 'LLM Planning & Reasoning' },
      { label: 'Tools', desc: 'APIs & Execution Engines' },
      { label: 'Workflow', desc: 'Iterative Loop & Memory' },
      { label: 'Result', desc: 'Automated Outcome' }
    ];
  } else if (skillId === 'cybersecurity') {
    steps = [
      { label: 'Systems', desc: 'Network & Assets' },
      { label: 'Protection', desc: 'Encryption & IAM' },
      { label: 'Detection', desc: 'Threat Monitoring' },
      { label: 'Response', desc: 'Incident Mitigation' },
      { label: 'Recovery', desc: 'Business Continuity' }
    ];
  } else if (skillId === 'data-analytics') {
    steps = [
      { label: 'Raw Data', desc: 'SQL & Sources' },
      { label: 'Analysis', desc: 'Cleaning & EDA' },
      { label: 'Insights', desc: 'Dashboards & Modeling' },
      { label: 'Decisions', desc: 'Strategic Actions' },
      { label: 'Impact', desc: 'KPI Growth' }
    ];
  } else if (skillId === 'cloud-computing') {
    steps = [
      { label: 'App Code', desc: 'Microservices' },
      { label: 'Infrastructure', desc: 'AWS / Azure / GCP' },
      { label: 'Services', desc: 'Serverless & Docker' },
      { label: 'Monitoring', desc: 'DevOps & Logs' },
      { label: 'Scale', desc: 'Global Users' }
    ];
  } else if (skillId === 'software-development') {
    steps = [
      { label: 'Idea', desc: 'Product Specs' },
      { label: 'Code', desc: 'TypeScript & Git' },
      { label: 'Testing', desc: 'QA & CI/CD' },
      { label: 'Deployment', desc: 'Cloud Release' },
      { label: 'Product', desc: 'User Scale' }
    ];
  } else if (skillId === 'digital-marketing') {
    steps = [
      { label: 'Search Intent', desc: 'Audience Research' },
      { label: 'Content', desc: 'SEO & Copywriting' },
      { label: 'Visibility', desc: 'Rankings & Reach' },
      { label: 'Visitors', desc: 'Traffic & Leads' },
      { label: 'Results', desc: 'Conversion & ROI' }
    ];
  } else if (skillId === 'ux-ui-design') {
    steps = [
      { label: 'User Need', desc: 'Empathy & Research' },
      { label: 'Wireframe', desc: 'Information Architecture' },
      { label: 'Design', desc: 'Figma UI & Systems' },
      { label: 'Prototype', desc: 'Interactive Testing' },
      { label: 'Product', desc: 'Developer Handoff' }
    ];
  }

  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 space-y-4 my-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Educational Skill Workflow Diagram
        </span>
        <span className="text-[11px] text-slate-500 font-medium">Core Mastery Pathway</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-1 relative group hover:border-indigo-300 transition-colors">
            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Step 0{idx + 1}</div>
            <div className="font-extrabold text-slate-900 text-xs">{step.label}</div>
            <div className="text-[11px] text-slate-500 leading-snug">{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
