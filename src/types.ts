export type EducationLevel = 
  | 'High School / Secondary'
  | 'Some College / Associate Degree'
  | "Bachelor's Degree"
  | "Master's Degree"
  | 'Vocational / Diploma'
  | 'Other';

export type SkillCategory = 
  | 'Programming'
  | 'Mathematics'
  | 'Writing'
  | 'Communication'
  | 'Design'
  | 'Research'
  | 'Problem solving'
  | 'Leadership'
  | 'Business'
  | 'Creativity'
  | 'Analysis'
  | 'Organization'
  | 'Technical skills'
  | 'Other';

export type InterestCategory = 
  | 'Technology'
  | 'Business'
  | 'Science'
  | 'Healthcare'
  | 'Design'
  | 'Media'
  | 'Engineering'
  | 'Finance'
  | 'Education'
  | 'Law'
  | 'Social sciences'
  | 'Environment'
  | 'Other';

export type WorkPreference = 
  | 'Remote'
  | 'Office'
  | 'Field'
  | 'Hybrid'
  | 'Hands-on'
  | 'Research'
  | 'People-focused'
  | 'Independent'
  | 'Team-based';

export type GoalCategory = 
  | 'High income'
  | 'Job stability'
  | 'Entrepreneurship'
  | 'Remote work'
  | 'International opportunities'
  | 'Creativity'
  | 'Helping people'
  | 'Research'
  | 'Leadership'
  | 'Flexible lifestyle';

export type BudgetRange = 
  | 'Low budget'
  | 'Moderate budget'
  | 'Flexible budget';

export type StudyPreference = 
  | '2-year'
  | '4-year'
  | 'Shorter practical route'
  | 'Willing to pursue postgraduate study'
  | 'Prefer practical learning'
  | 'Prefer theoretical/research learning';

export interface UserAssessment {
  currentEducationLevel: EducationLevel;
  completedDegree: string;
  gpaOrMarks: string;
  subjectsStudied: string[];
  academicStrengths: string[];
  skills: SkillCategory[];
  customSkills: string[];
  interests: InterestCategory[];
  workPreferences: WorkPreference[];
  goals: GoalCategory[];
  budgetSituation: BudgetRange;
  locationCountry: string;
  locationState: string;
  locationCity: string;
  preferredStudyLocation: string;
  studyPreferences: StudyPreference[];
  likedSubjects: string[];
  dislikedSubjects: string[];
}

export interface DegreeInfo {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  subjectsCommonlyStudied: string[];
  skillsDeveloped: string[];
  suitableInterests: InterestCategory[];
  suitableStrengths: string[];
  possibleCareers: string[];
  alternativeDegrees: string[];
  typicalStudyDuration: string;
  furtherStudyOptions: string[];
  workEnvironments: string[];
  importantConsiderations: string[];
  lastUpdated: string;
  difficulty?: string;
  eligibilityInfo?: string;
  regions?: string[];
  sources?: string[];
  published?: boolean;
}

export interface CareerInfo {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  whatItIs: string;
  whatPeopleDo: string[];
  importantSkills: string[];
  educationRoutes: string[];
  relatedDegrees: string[];
  workEnvironment: string;
  careerProgression: {
    entryLevel: string;
    midLevel: string;
    advanced: string;
  };
  relatedCareers: string[];
  whoMayEnjoy: string[];
  whoMayNotEnjoy: string[];
  countryNotes: string;
  lastUpdated: string;
}

export interface RecommendationMatch {
  type: 'Best Match' | 'Strong Alternative' | 'Backup Option' | 'Unexpected Option' | 'Shorter/Practical Alternative';
  degreeId: string;
  degreeName: string;
  careerName: string;
  fitScore: number; // e.g. 92
  whyMatches: string[];
  potentialConcerns: string[];
  roadmap: {
    education: string;
    coreSkills: string[];
    projectsOrExperience: string[];
    entryLevelRole: string;
    midLevelRole: string;
    advancedRole: string;
  };
  aiExplanation?: string;
}

export interface ActionPlan {
  next30Days: string[];
  next3Months: string[];
  next6To12Months: string[];
}

export interface SavedResult {
  id: string;
  timestamp: string;
  assessment: UserAssessment;
  recommendations: RecommendationMatch[];
  actionPlan: ActionPlan;
}

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    credential: string;
  };
  content: string[];
}
