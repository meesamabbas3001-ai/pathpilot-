import React, { useState, useEffect, lazy, Suspense } from 'react';
import { UserAssessment, RecommendationMatch, ActionPlan, DegreeInfo, GuideArticle, SavedResult } from './types';
import { SkillDetail, SKILLS_DATA } from './data/skillsData';
import { DEGREES_DATA } from './data/degreesData';
import { GUIDES_DATA } from './data/guidesData';
import { AUTHORS_DATA, AuthorProfile } from './data/authorsData';
import { calculateRecommendations } from './utils/recommendationEngine';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { NotFoundPage } from './components/NotFoundPage';
import { Lock, Shield, CheckCircle2 } from 'lucide-react';

const AssessmentWizard = lazy(() => import('./components/AssessmentWizard').then(m => ({ default: m.AssessmentWizard })));
const ResultView = lazy(() => import('./components/ResultView').then(m => ({ default: m.ResultView })));
const DegreesHub = lazy(() => import('./components/DegreesHub').then(m => ({ default: m.DegreesHub })));
const FutureSkillsHub = lazy(() => import('./components/FutureSkillsHub').then(m => ({ default: m.FutureSkillsHub })));
const GuidesHub = lazy(() => import('./components/GuidesHub').then(m => ({ default: m.GuidesHub })));
const AuthorProfileView = lazy(() => import('./components/AuthorProfileView').then(m => ({ default: m.AuthorProfileView })));
const DegreeDetailModal = lazy(() => import('./components/DegreeDetailModal').then(m => ({ default: m.DegreeDetailModal })));
const SkillDetailModal = lazy(() => import('./components/SkillDetailModal').then(m => ({ default: m.SkillDetailModal })));
const GuideArticleModal = lazy(() => import('./components/GuideArticleModal').then(m => ({ default: m.GuideArticleModal })));
const CompareModal = lazy(() => import('./components/CompareModal').then(m => ({ default: m.CompareModal })));
const SavedResultsModal = lazy(() => import('./components/SavedResultsModal').then(m => ({ default: m.SavedResultsModal })));
const ChatbotWidget = lazy(() => import('./components/ChatbotWidget').then(m => ({ default: m.ChatbotWidget })));

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'assessment' | 'results' | 'degrees' | 'skills' | 'guides' | 'author' | 'internal-admin' | 'not-found'>('home');
  
  const [assessment, setAssessment] = useState<UserAssessment | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationMatch[]>([]);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [savedResults, setSavedResults] = useState<SavedResult[]>([]);
  
  // Modals & Sub-views
  const [selectedDegree, setSelectedDegree] = useState<DegreeInfo | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<GuideArticle | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorProfile | null>(null);
  const [initialDegreeCategory, setInitialDegreeCategory] = useState<string>('All');
  
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  
  // Admin auth state for /internal-admin
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState(false);

  // Parse initial URL pathname and load saved results on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('pathpilot_saved_results');
      if (stored) {
        setSavedResults(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved results', e);
    }

    const path = window.location.pathname;
    if (path === '/' || path === '') {
      setCurrentView('home');
    } else if (path === '/internal-admin') {
      setCurrentView('internal-admin');
    } else if (path.startsWith('/authors/')) {
      const slug = path.replace('/authors/', '');
      const found = AUTHORS_DATA.find(a => a.slug === slug);
      if (found) {
        setSelectedAuthor(found);
        setCurrentView('author');
      } else {
        setCurrentView('not-found');
      }
    } else if (path.startsWith('/degrees/')) {
      const slug = path.replace('/degrees/', '');
      const foundDeg = DEGREES_DATA.find(d => d.slug === slug);
      if (foundDeg) {
        setSelectedDegree(foundDeg);
        setCurrentView('degrees');
      } else {
        const catMap: Record<string, string> = {
          'technology': 'Technology',
          'engineering': 'Engineering',
          'business-finance': 'Business & Finance',
          'natural-sciences': 'Natural Sciences',
          'healthcare': 'Healthcare',
          'social-sciences': 'Social Sciences',
          'arts-humanities': 'Arts & Humanities',
          'law': 'Law',
          'architecture-design': 'Architecture & Design',
          'agriculture-food': 'Agriculture & Food',
          'environment': 'Environment',
          'hospitality-tourism': 'Hospitality & Tourism',
          'education': 'Education'
        };
        if (catMap[slug]) {
          setInitialDegreeCategory(catMap[slug]);
          setCurrentView('degrees');
        } else {
          setCurrentView('not-found');
        }
      }
    } else if (path.startsWith('/skills/')) {
      const slug = path.replace('/skills/', '');
      const found = SKILLS_DATA.find(s => s.slug === slug);
      if (found) {
        setSelectedSkill(found);
        setCurrentView('skills');
      } else {
        setCurrentView('not-found');
      }
    } else if (path.startsWith('/guides/')) {
      const slug = path.replace('/guides/', '');
      const found = GUIDES_DATA.find(g => g.slug === slug);
      if (found) {
        setSelectedGuide(found);
        setCurrentView('guides');
      } else {
        setCurrentView('not-found');
      }
    } else if (path === '/degrees') {
      setCurrentView('degrees');
    } else if (path === '/skills') {
      setCurrentView('skills');
    } else if (path === '/guides') {
      setCurrentView('guides');
    } else if (path === '/assessment') {
      setCurrentView('assessment');
    } else if (path === '/results') {
      setCurrentView('results');
    } else {
      setCurrentView('not-found');
    }
  }, []);

  // Update URL and SEO Meta tags & JSON-LD Schema
  useEffect(() => {
    let title = 'PathPilot — AI-Powered Degree, Skills & Career Path Finder';
    let desc = 'Discover degrees, future skills and a practical personalized path built around your education, skills, interests and goals.';
    let url = '/';

    if (currentView === 'internal-admin') {
      title = 'Internal Admin Portal | PathPilot';
      desc = 'Secure management portal.';
      url = '/internal-admin';
    } else if (currentView === 'not-found') {
      title = 'Page Not Found (404) | PathPilot';
      desc = 'The page you requested could not be found.';
      url = '/404';
    } else if (currentView === 'author' && selectedAuthor) {
      title = `${selectedAuthor.name} — Expert Author Profile | PathPilot`;
      desc = selectedAuthor.bio;
      url = `/authors/${selectedAuthor.slug}`;
    } else if (currentView === 'degrees') {
      if (selectedDegree) {
        title = `${selectedDegree.name} — Requirements, Careers & Guide | PathPilot`;
        desc = selectedDegree.description;
        url = `/degrees/${selectedDegree.slug}`;
      } else {
        title = 'Degree Database — Explore Majors & Career Pathways | PathPilot';
        desc = 'Explore detailed academic degrees, common subjects, skills developed, and career outcomes.';
        url = '/degrees';
      }
    } else if (currentView === 'skills') {
      if (selectedSkill) {
        title = `${selectedSkill.name} — Roadmap, Tools & Careers | PathPilot`;
        desc = selectedSkill.description;
        url = `/skills/${selectedSkill.slug}`;
      } else {
        title = 'Future Skills Index — Essential Competencies & Roadmaps | PathPilot';
        desc = 'Explore 8 essential technical and functional skill domains designed for long-term career resilience.';
        url = '/skills';
      }
    } else if (currentView === 'guides') {
      if (selectedGuide) {
        title = `${selectedGuide.title} | PathPilot Guides`;
        desc = selectedGuide.description;
        url = `/guides/${selectedGuide.slug}`;
      } else {
        title = 'Career & Degree Strategy Guides Hub | PathPilot';
        desc = 'Human-authored, fact-checked guides to help you navigate academic choices and career pivots.';
        url = '/guides';
      }
    } else if (currentView === 'assessment') {
      title = 'Career & Degree Assessment Wizard | PathPilot';
      desc = 'Complete our assessment to receive tailored degree and career matches.';
      url = '/assessment';
    } else if (currentView === 'results') {
      title = 'Your Personalized Career & Degree Roadmap | PathPilot';
      desc = 'Review your custom compatibility scores, best degree match, career roadmap, and 30-day action plan.';
      url = '/results';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);

    window.history.pushState(null, '', url);
  }, [currentView, selectedDegree, selectedGuide, selectedSkill, selectedAuthor]);

  const handleAssessmentComplete = (userAssessment: UserAssessment) => {
    setAssessment(userAssessment);
    const result = calculateRecommendations(userAssessment);
    setRecommendations(result.recommendations);
    setActionPlan(result.actionPlan);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveResult = () => {
    if (!assessment || recommendations.length === 0 || !actionPlan) return;
    const newSaved: SavedResult = {
      id: 'res_' + Date.now(),
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      assessment,
      recommendations,
      actionPlan
    };
    const updated = [newSaved, ...savedResults];
    setSavedResults(updated);
    try {
      localStorage.setItem('pathpilot_saved_results', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save result', e);
    }
  };

  const handleClearSaved = () => {
    setSavedResults([]);
    localStorage.removeItem('pathpilot_saved_results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={view => {
          setSelectedDegree(null);
          setSelectedGuide(null);
          setSelectedSkill(null);
          setSelectedAuthor(null);
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedResults.length}
        onOpenSaved={() => setShowSavedModal(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        <Suspense fallback={<div className="py-24 text-center text-slate-400 text-sm">Loading PathPilot...</div>}>
          {currentView === 'home' && (
            <Hero
              onStartAssessment={() => setCurrentView('assessment')}
              onExploreSkills={() => setCurrentView('skills')}
              onExploreDegrees={() => setCurrentView('degrees')}
            />
          )}

          {currentView === 'assessment' && (
            <AssessmentWizard
              onComplete={handleAssessmentComplete}
              onCancel={() => setCurrentView('home')}
            />
          )}

          {currentView === 'results' && recommendations.length > 0 && actionPlan && assessment && (
            <ResultView
              recommendations={recommendations}
              actionPlan={actionPlan}
              assessment={assessment}
              onSaveResult={handleSaveResult}
              onOpenCompare={() => setShowCompareModal(true)}
              onRetake={() => setCurrentView('assessment')}
            />
          )}

          {currentView === 'degrees' && (
            <DegreesHub
              initialCategory={initialDegreeCategory}
              onSelectDegree={deg => setSelectedDegree(deg)}
              onBackToHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'skills' && (
            <FutureSkillsHub
              onSelectSkill={sk => setSelectedSkill(sk)}
              onBackToHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'guides' && (
            <GuidesHub
              onSelectGuide={guide => {
                setSelectedGuide(guide);
                window.history.pushState(null, '', `/guides/${guide.slug}`);
              }}
              onSelectAuthor={authorName => {
                const foundAuthor = AUTHORS_DATA.find(a => a.name.toLowerCase() === authorName.toLowerCase());
                if (foundAuthor) {
                  setSelectedAuthor(foundAuthor);
                  setCurrentView('author');
                  window.history.pushState(null, '', `/authors/${foundAuthor.slug}`);
                }
              }}
              onBackToHome={() => setCurrentView('home')}
            />
          )}

          {currentView === 'author' && selectedAuthor && (
            <AuthorProfileView
              author={selectedAuthor}
              onSelectGuide={guide => {
                setSelectedGuide(guide);
                window.history.pushState(null, '', `/guides/${guide.slug}`);
              }}
              onBackToGuides={() => setCurrentView('guides')}
            />
          )}

          {currentView === 'not-found' && (
            <NotFoundPage
              onBackToHome={() => setCurrentView('home')}
              onExploreDegrees={() => setCurrentView('degrees')}
            />
          )}

          {currentView === 'internal-admin' && (
            <div className="min-h-screen bg-slate-900 py-16 px-4 flex items-center justify-center">
              <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6 text-white">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center mx-auto text-indigo-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl font-extrabold tracking-tight">Internal Admin Portal</h1>
                  <p className="text-xs text-slate-400">Restricted non-crawlable route for degree database management.</p>
                </div>

                {!adminAuthenticated ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Enter Secure Admin PIN</label>
                      <input
                        type="password"
                        placeholder="••••"
                        value={adminPinInput}
                        onChange={e => {
                          setAdminPinInput(e.target.value);
                          setAdminAuthError(false);
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 text-center tracking-widest text-lg font-bold"
                      />
                      {adminAuthError && (
                        <p className="text-xs text-rose-400 mt-1.5 text-center font-medium">Incorrect PIN. Try '3001' or 'admin'.</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (adminPinInput === '3001' || adminPinInput === 'admin' || adminPinInput === 'pathpilot') {
                          setAdminAuthenticated(true);
                        } else {
                          setAdminAuthError(true);
                        }
                      }}
                      className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-colors shadow"
                    >
                      Authenticate & Access Database
                    </button>
                    <button
                      onClick={() => setCurrentView('home')}
                      className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium text-xs transition-colors"
                    >
                      Return to Public Home
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-emerald-950/50 border border-emerald-800/80 p-4 rounded-xl flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-bold text-emerald-300 text-xs block">Authenticated Successfully</span>
                        <span className="text-[11px] text-emerald-400/80">Manage scalable degree database records below.</span>
                      </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 space-y-4">
                      <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-indigo-400" />
                        <span>Degree Manager Actions</span>
                      </h3>
                      <button
                        onClick={() => {
                          alert("Degree manager tool active. You can add, edit, or remove degree records.");
                        }}
                        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors shadow"
                      >
                        Open Scalable Degree Editor Modal
                      </button>
                    </div>

                    <button
                      onClick={() => setCurrentView('home')}
                      className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium text-xs transition-colors"
                    >
                      Logout & Return Home
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={view => {
          setSelectedDegree(null);
          setSelectedGuide(null);
          setSelectedSkill(null);
          setSelectedAuthor(null);
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals & Chatbot */}
      <Suspense fallback={null}>
        {selectedDegree && (
          <DegreeDetailModal
            degree={selectedDegree}
            onClose={() => setSelectedDegree(null)}
            onNavigateToSkills={() => {
              setSelectedDegree(null);
              setCurrentView('skills');
            }}
          />
        )}

        {selectedSkill && (
          <SkillDetailModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}

        {selectedGuide && (
          <GuideArticleModal
            guide={selectedGuide}
            onClose={() => setSelectedGuide(null)}
            onNavigateToDegrees={() => {
              setSelectedGuide(null);
              setCurrentView('degrees');
            }}
            onNavigateToSkills={() => {
              setSelectedGuide(null);
              setCurrentView('skills');
            }}
          />
        )}

        {showCompareModal && recommendations.length > 0 && (
          <CompareModal
            recommendations={recommendations}
            onClose={() => setShowCompareModal(false)}
          />
        )}

        {showSavedModal && (
          <SavedResultsModal
            savedResults={savedResults}
            onClose={() => setShowSavedModal(false)}
            onSelectResult={res => {
              setAssessment(res.assessment);
              setRecommendations(res.recommendations);
              setActionPlan(res.actionPlan);
              setCurrentView('results');
            }}
            onClearSaved={handleClearSaved}
          />
        )}

        <ChatbotWidget />
      </Suspense>
    </div>
  );
}
