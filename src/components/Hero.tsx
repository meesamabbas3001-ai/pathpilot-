import React from 'react';
import { ArrowRight, Compass, Sparkles, BookOpen, Wrench, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';
import { PurpleVeilBackground } from './PurpleVeilBackground';
import { HeroPathwayIllustration } from './HeroPathwayIllustration';

interface HeroProps {
  onStartAssessment: () => void;
  onExploreSkills: () => void;
  onExploreDegrees: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartAssessment,
  onExploreSkills,
  onExploreDegrees
}) => {
  return (
    <div className="relative overflow-hidden pt-12 pb-20">
      {/* PathPilot Light-Purple Parda / Veil Background (Homepage Only) */}
      <PurpleVeilBackground />

      {/* Background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-blue-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6 pt-6 pb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Pakistan’s Premier AI Degree, Skills & Career Navigator</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Find the Right Degree & Career Path in Pakistan — <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Built Around You</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Whether you just completed FSc, ICS, or A-Levels or are planning your professional pivot, discover HEC-recognized degrees, high-demand skills, and a practical roadmap built around your strengths.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base shadow-xl shadow-indigo-600/25 hover:shadow-2xl hover:shadow-indigo-600/35 hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start Free Assessment Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExploreDegrees}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-base hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Explore 19+ Degree Programs</span>
            </button>
          </div>

          {/* Trust Statement */}
          <div className="pt-2 text-xs text-slate-500 font-medium flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Personalized orientation aligned with HEC guidelines and local job markets.</span>
          </div>
        </div>

        {/* Homepage Hero Illustration ("Finding Your Future Path") */}
        <HeroPathwayIllustration />

        {/* Why PathPilot - Pakistan Specific Context (150-200 words) */}
        <div className="my-12 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Why PathPilot Is Built Specifically for Pakistani Students & Professionals
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            Navigating higher education and career choices in Pakistan requires clear, localized insight. From understanding Higher Education Commission (HEC) degree accreditation rules and NTS/ECAT/MDCAT entry test prerequisites to balancing traditional fields like Civil Engineering and MBBS with booming sectors like Software Engineering, AI Automation, and Digital Marketing, students face complex decisions after FSc, ICS, and A-Levels. PathPilot was created to bridge this guidance gap. Our intelligent matching engine evaluates your academic background, analytical strengths, and career aspirations to recommend realistic degree majors and future skill roadmaps. Whether you are aiming for top institutions in Lahore, Karachi, Islamabad, or planning for remote tech careers, PathPilot provides transparent salary benchmarks in Pakistani Rupees (PKR) and actionable 30-day to 12-month milestones.
          </p>
        </div>

        {/* Visual Flow: Degree -> Skills -> Career -> Action Plan */}
        <div className="mt-12 pt-12 border-t border-slate-100">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            How PathPilot Guides You Step-by-Step
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                Degree Selection & HEC Alignment
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Match your intermediate background (FSc Pre-Engineering, Pre-Medical, ICS, or A-Levels) to ideal undergraduate degrees such as BS Computer Science, Electrical Engineering, BBA, or MBBS with full curriculum and career outcome overviews.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-600" />
                Future Skills Masterclass
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Master 8 essential technical and functional skill domains designed for long-term career resilience, including AI Agents & Automation, Cloud Computing, Cybersecurity, and Data Science.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Practical Action Plan & Milestones
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive practical milestones for the next 30 days, 3 months, and 6–12 months. Know exactly what projects to build, which certifications to pursue, and how to position yourself in the local and remote job market.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Block (5 questions with FAQ schema support) */}
        <div className="mt-16 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Know About PathPilot
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
              <h3 className="font-bold text-slate-900 text-base">Is PathPilot free to use?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Yes! PathPilot is 100% free for students, parents, and career seekers looking for objective academic and career guidance in Pakistan.
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
              <h3 className="font-bold text-slate-900 text-base">How does PathPilot recommend a degree?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our deterministic recommendation engine evaluates your intermediate or academic background, math/science or arts aptitude, preferred work environment, and salary goals against 19+ HEC-recognized degree programs.
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
              <h3 className="font-bold text-slate-900 text-base">Does PathPilot work for Pakistani students?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Absolutely. Every recommendation, salary estimate in PKR, and educational pathway is tailored specifically for the Pakistani educational context (FSc, ICS, A-Levels, HEC criteria).
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
              <h3 className="font-bold text-slate-900 text-base">Is this a guarantee of admission or a job?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No. PathPilot provides data-driven career and academic orientation. University admissions depend on entry tests (ECAT, MDCAT, NTS, university entry tests) and merit criteria, while jobs depend on interviews and portfolios.
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-200/60 md:col-span-2">
              <h3 className="font-bold text-slate-900 text-base">How long does the assessment take?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The interactive assessment takes under 3 minutes to complete. You will receive an instant multi-match breakdown, compatibility scores, and a customized 30-day action plan.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Quick Explorer Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
              Interactive Assessment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to find your tailored match in under 3 minutes?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Our deterministic scoring engine evaluates your background to recommend your best path without guesswork.
            </p>
          </div>
          <button
            onClick={onStartAssessment}
            className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors shadow-lg shrink-0 flex items-center gap-2"
          >
            <span>Start Assessment Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
