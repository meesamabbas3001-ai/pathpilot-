import React, { useState } from 'react';
import { UserAssessment, EducationLevel, SkillCategory, InterestCategory, WorkPreference, GoalCategory, BudgetRange, StudyPreference } from '../types';
import { ArrowLeft, ArrowRight, Check, Sparkles, GraduationCap, Wrench, Heart, Briefcase, Target, DollarSign, MapPin, BookOpen, Plus, X } from 'lucide-react';

interface AssessmentWizardProps {
  onComplete: (assessment: UserAssessment) => void;
  onCancel: () => void;
}

const EDUCATION_LEVELS: EducationLevel[] = [
  'High School / Secondary',
  'Some College / Associate Degree',
  "Bachelor's Degree",
  "Master's Degree",
  'Vocational / Diploma',
  'Other'
];

const SKILL_OPTIONS: SkillCategory[] = [
  'Programming', 'Mathematics', 'Writing', 'Communication', 'Design',
  'Research', 'Problem solving', 'Leadership', 'Business', 'Creativity',
  'Analysis', 'Organization', 'Technical skills', 'Other'
];

const INTEREST_OPTIONS: InterestCategory[] = [
  'Technology', 'Business', 'Science', 'Healthcare', 'Design',
  'Media', 'Engineering', 'Finance', 'Education', 'Law',
  'Social sciences', 'Environment', 'Other'
];

const WORK_PREFERENCES: WorkPreference[] = [
  'Remote', 'Office', 'Field', 'Hybrid', 'Hands-on',
  'Research', 'People-focused', 'Independent', 'Team-based'
];

const GOAL_OPTIONS: GoalCategory[] = [
  'High income', 'Job stability', 'Entrepreneurship', 'Remote work',
  'International opportunities', 'Creativity', 'Helping people',
  'Research', 'Leadership', 'Flexible lifestyle'
];

const BUDGET_RANGES: BudgetRange[] = [
  'Low budget', 'Moderate budget', 'Flexible budget'
];

const STUDY_PREFERENCES: StudyPreference[] = [
  '2-year', '4-year', 'Shorter practical route',
  'Willing to pursue postgraduate study', 'Prefer practical learning',
  'Prefer theoretical/research learning'
];

export const AssessmentWizard: React.FC<AssessmentWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  const [assessment, setAssessment] = useState<UserAssessment>({
    currentEducationLevel: 'High School / Secondary',
    completedDegree: '',
    gpaOrMarks: '',
    subjectsStudied: [],
    academicStrengths: ['Problem solving'],
    skills: ['Problem solving', 'Communication'],
    customSkills: [],
    interests: ['Technology'],
    workPreferences: ['Hybrid'],
    goals: ['Job stability', 'High income'],
    budgetSituation: 'Moderate budget',
    locationCountry: 'United States',
    locationState: 'California',
    locationCity: 'San Francisco',
    preferredStudyLocation: 'Domestic / Online',
    studyPreferences: ['4-year', 'Prefer practical learning'],
    likedSubjects: ['Mathematics', 'Computer Science'],
    dislikedSubjects: []
  });

  const [newSubject, setNewSubject] = useState('');
  const [newStrength, setNewStrength] = useState('');
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [likedInput, setLikedInput] = useState('');
  const [dislikedInput, setDislikedInput] = useState('');

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(assessment);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  const toggleSkill = (skill: SkillCategory) => {
    setAssessment(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const addCustomSkill = () => {
    if (customSkillInput.trim() && !assessment.customSkills.includes(customSkillInput.trim())) {
      setAssessment(prev => ({
        ...prev,
        customSkills: [...prev.customSkills, customSkillInput.trim()]
      }));
      setCustomSkillInput('');
    }
  };

  const removeCustomSkill = (skill: string) => {
    setAssessment(prev => ({
      ...prev,
      customSkills: prev.customSkills.filter(s => s !== skill)
    }));
  };

  const toggleInterest = (interest: InterestCategory) => {
    setAssessment(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleWorkPref = (pref: WorkPreference) => {
    setAssessment(prev => ({
      ...prev,
      workPreferences: prev.workPreferences.includes(pref)
        ? prev.workPreferences.filter(p => p !== pref)
        : [...prev.workPreferences, pref]
    }));
  };

  const toggleGoal = (goal: GoalCategory) => {
    setAssessment(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const toggleStudyPref = (pref: StudyPreference) => {
    setAssessment(prev => ({
      ...prev,
      studyPreferences: prev.studyPreferences.includes(pref)
        ? prev.studyPreferences.filter(p => p !== pref)
        : [...prev.studyPreferences, pref]
    }));
  };

  const addSubject = () => {
    if (newSubject.trim() && !assessment.subjectsStudied.includes(newSubject.trim())) {
      setAssessment(prev => ({ ...prev, subjectsStudied: [...prev.subjectsStudied, newSubject.trim()] }));
      setNewSubject('');
    }
  };

  const removeSubject = (sub: string) => {
    setAssessment(prev => ({ ...prev, subjectsStudied: prev.subjectsStudied.filter(s => s !== sub) }));
  };

  const addStrength = () => {
    if (newStrength.trim() && !assessment.academicStrengths.includes(newStrength.trim())) {
      setAssessment(prev => ({ ...prev, academicStrengths: [...prev.academicStrengths, newStrength.trim()] }));
      setNewStrength('');
    }
  };

  const removeStrength = (str: string) => {
    setAssessment(prev => ({ ...prev, academicStrengths: prev.academicStrengths.filter(s => s !== str) }));
  };

  const addLikedSubject = () => {
    if (likedInput.trim() && !assessment.likedSubjects.includes(likedInput.trim())) {
      setAssessment(prev => ({ ...prev, likedSubjects: [...prev.likedSubjects, likedInput.trim()] }));
      setLikedInput('');
    }
  };

  const removeLikedSubject = (sub: string) => {
    setAssessment(prev => ({ ...prev, likedSubjects: prev.likedSubjects.filter(s => s !== sub) }));
  };

  const addDislikedSubject = () => {
    if (dislikedInput.trim() && !assessment.dislikedSubjects.includes(dislikedInput.trim())) {
      setAssessment(prev => ({ ...prev, dislikedSubjects: [...prev.dislikedSubjects, dislikedInput.trim()] }));
      setDislikedInput('');
    }
  };

  const removeDislikedSubject = (sub: string) => {
    setAssessment(prev => ({ ...prev, dislikedSubjects: prev.dislikedSubjects.filter(s => s !== sub) }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Top bar with back and step indicator */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrev}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{step === 1 ? 'Cancel' : 'Previous Step'}</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Step {step} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-600 to-violet-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 animate-fade-in">
          {/* STEP 1: EDUCATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Your Education Background</h2>
                  <p className="text-sm text-slate-500">Tell us about your current academic standing and performance.</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Current Education Level</label>
                  <select
                    value={assessment.currentEducationLevel}
                    onChange={e => setAssessment({ ...assessment, currentEducationLevel: e.target.value as EducationLevel })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {EDUCATION_LEVELS.map(lvl => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Degree / Diploma Completed (if any)</label>
                    <input
                      type="text"
                      placeholder="e.g. High School Diploma, B.A. History"
                      value={assessment.completedDegree}
                      onChange={e => setAssessment({ ...assessment, completedDegree: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">GPA / Marks / Percentage</label>
                    <input
                      type="text"
                      placeholder="e.g. 3.7 GPA, 88%, or 'Top 10%'"
                      value={assessment.gpaOrMarks}
                      onChange={e => setAssessment({ ...assessment, gpaOrMarks: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Key Subjects Studied</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add subject (e.g. Physics, Economics, Calculus)"
                      value={newSubject}
                      onChange={e => setNewSubject(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSubject(); } }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={addSubject}
                      className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {assessment.subjectsStudied.map(sub => (
                      <span key={sub} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200">
                        {sub}
                        <button type="button" onClick={() => removeSubject(sub)} className="text-slate-400 hover:text-slate-700">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    {assessment.subjectsStudied.length === 0 && (
                      <span className="text-xs text-slate-400 italic">No subjects added yet. Add a few above.</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Academic Strengths</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Add strength (e.g. Quantitative analysis, Essay writing)"
                      value={newStrength}
                      onChange={e => setNewStrength(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addStrength(); } }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={addStrength}
                      className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {assessment.academicStrengths.map(str => (
                      <span key={str} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                        {str}
                        <button type="button" onClick={() => removeStrength(str)} className="text-indigo-400 hover:text-indigo-700">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SKILLS */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Your Skills & Capabilities</h2>
                  <p className="text-sm text-slate-500">Select the skills you possess or enjoy practicing.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {SKILL_OPTIONS.map(skill => {
                  const isSelected = assessment.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`p-3.5 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{skill}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Add Custom Skills</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="e.g. Public Speaking, 3D Modeling, Python"
                    value={customSkillInput}
                    onChange={e => setCustomSkillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomSkill(); } }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomSkill}
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {assessment.customSkills.map(cs => (
                    <span key={cs} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold border border-violet-100">
                      {cs}
                      <button type="button" onClick={() => removeCustomSkill(cs)} className="text-violet-400 hover:text-violet-700">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INTERESTS */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Your Areas of Interest</h2>
                  <p className="text-sm text-slate-500">What fields, domains, or topics excite you the most?</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {INTEREST_OPTIONS.map(interest => {
                  const isSelected = assessment.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{interest}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: WORK PREFERENCES & GOALS */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Work Environment & Style</h2>
                  <p className="text-sm text-slate-500">How do you envision your ideal day-to-day work environment?</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {WORK_PREFERENCES.map(pref => {
                  const isSelected = assessment.workPreferences.includes(pref);
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => toggleWorkPref(pref)}
                      className={`p-3.5 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{pref}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: GOALS */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Your Career Goals & Motivations</h2>
                  <p className="text-sm text-slate-500">What matters most to you in your future profession?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {GOAL_OPTIONS.map(goal => {
                  const isSelected = assessment.goals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{goal}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: FINANCIAL SITUATION & LOCATION */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Budget & Financial Situation</h2>
                  <p className="text-sm text-slate-500">We do not ask for sensitive details. Choose a broad optional range.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {BUDGET_RANGES.map(budget => {
                  const isSelected = assessment.budgetSituation === budget;
                  return (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setAssessment({ ...assessment, budgetSituation: budget })}
                      className={`p-5 rounded-2xl border text-center font-bold text-sm transition-all ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 shadow-md ring-2 ring-indigo-500/20' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-slate-900 text-base">Location & Study Preference</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
                    <input
                      type="text"
                      value={assessment.locationCountry}
                      onChange={e => setAssessment({ ...assessment, locationCountry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">State / Province</label>
                    <input
                      type="text"
                      value={assessment.locationState}
                      onChange={e => setAssessment({ ...assessment, locationState: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                    <input
                      type="text"
                      value={assessment.locationCity}
                      onChange={e => setAssessment({ ...assessment, locationCity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: STUDY PREFERENCES */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Study Format & Duration</h2>
                  <p className="text-sm text-slate-500">What program duration and learning style suit you best?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {STUDY_PREFERENCES.map(pref => {
                  const isSelected = assessment.studyPreferences.includes(pref);
                  return (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => toggleStudyPref(pref)}
                      className={`p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{pref}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 8: SUBJECTS LIKED / DISLIKED */}
          {step === 8 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Subjects You Like & Dislike</h2>
                  <p className="text-sm text-slate-500">Final touch: helps us avoid recommending paths you will dislike.</p>
                </div>
              </div>

              <div className="space-y-6 pt-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subjects / Topics You Enjoy</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="e.g. Mathematics, Psychology, Coding"
                      value={likedInput}
                      onChange={e => setLikedInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addLikedSubject(); } }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={addLikedSubject}
                      className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {assessment.likedSubjects.map(sub => (
                      <span key={sub} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100">
                        ✓ {sub}
                        <button type="button" onClick={() => removeLikedSubject(sub)} className="text-emerald-400 hover:text-emerald-700">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Subjects / Topics You Dislike or Avoid</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="e.g. Heavy Chemistry, Organic Lab"
                      value={dislikedInput}
                      onChange={e => setDislikedInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDislikedSubject(); } }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={addDislikedSubject}
                      className="px-4 py-2.5 bg-slate-700 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {assessment.dislikedSubjects.map(sub => (
                      <span key={sub} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-100">
                        ✕ {sub}
                        <button type="button" onClick={() => removeDislikedSubject(sub)} className="text-rose-400 hover:text-rose-700">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Footer Action */}
          <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              You can go back and edit answers anytime.
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center gap-2"
            >
              <span>{step === totalSteps ? 'Generate My Results' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
