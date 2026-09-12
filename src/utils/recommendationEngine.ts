import { UserAssessment, RecommendationMatch, ActionPlan } from '../types';
import { getPublishedDegrees } from '../utils/degreesStorage';

export function calculateRecommendations(assessment: UserAssessment): {
  recommendations: RecommendationMatch[];
  actionPlan: ActionPlan;
} {
  const degrees = getPublishedDegrees();
  // Score all available degrees based on user assessment
  const scoredDegrees = degrees.map(degree => {
    let score = 60; // base score

    // Interest Match (up to 15 pts)
    const matchingInterests = degree.suitableInterests.filter(i => assessment.interests.includes(i));
    score += matchingInterests.length * 5;

    // Skill Match (up to 15 pts)
    const matchingSkills = degree.skillsDeveloped.filter(s => assessment.skills.includes(s as any));
    score += matchingSkills.length * 4;

    // Academic Strengths Match (up to 10 pts)
    const matchingStrengths = degree.suitableStrengths.filter(st => 
      assessment.academicStrengths.some(as => as.toLowerCase().includes(st.toLowerCase()) || st.toLowerCase().includes(as.toLowerCase()))
    );
    score += matchingStrengths.length * 3;

    // Study Preference / Feasibility
    if (assessment.studyPreferences.includes('2-year' as any) && degree.typicalStudyDuration.includes('2')) {
      score += 5;
    }
    if (assessment.studyPreferences.includes('Shorter practical route' as any) && degree.category === 'Technology') {
      score += 4;
    }

    // Budget fit adjustment
    if (assessment.budgetSituation === 'Low budget') {
      if (degree.category === 'Technology' || degree.category === 'Business') score += 3; // online / flexible options
    }

    // Clamp score between 45 and 96
    const finalScore = Math.min(Math.max(Math.round(score), 45), 96);

    // Find matching career
    const matchingCareerName = degree.possibleCareers[0] || 'Software Engineer';

    // Generate why matches
    const whyMatches: string[] = [];
    if (matchingInterests.length > 0) {
      whyMatches.push(`Strong alignment with your interest in ${matchingInterests.join(', ')}`);
    } else {
      whyMatches.push(`Aligns well with your broader professional orientation`);
    }
    if (matchingSkills.length > 0) {
      whyMatches.push(`Utilizes and develops your strengths in ${matchingSkills.slice(0, 2).join(' and ')}`);
    } else {
      whyMatches.push(`Builds high-demand marketable capabilities`);
    }
    whyMatches.push(`Matches your preferred study and work environment profile`);
    whyMatches.push(`Fits your academic background and cognitive strengths`);

    // Potential concerns
    const potentialConcerns: string[] = [];
    if (degree.subjectsCommonlyStudied.some(s => s.toLowerCase().includes('math') || s.toLowerCase().includes('calculus'))) {
      potentialConcerns.push('Requires commitment to foundational mathematics and analytical reasoning');
    }
    potentialConcerns.push('Competitive admission standards at top-tier institutions');
    if (degree.category === 'Engineering' || degree.category === 'Technology') {
      potentialConcerns.push('Rapid pace of technological evolution requires continuous self-directed learning');
    }

    // Roadmap
    const roadmap = {
      education: degree.name,
      coreSkills: degree.skillsDeveloped,
      projectsOrExperience: ['Capstone Project', 'Industry Internship', 'Open Source or Applied Portfolio'],
      entryLevelRole: degree.possibleCareers[0] || 'Junior Specialist',
      midLevelRole: degree.possibleCareers[1] || 'Specialist Consultant',
      advancedRole: 'Senior Lead / Director / Founder'
    };

    return {
      degreeId: degree.id,
      degreeName: degree.name,
      careerName: matchingCareerName,
      fitScore: finalScore,
      whyMatches,
      potentialConcerns,
      roadmap
    };
  });

  // Sort by score descending
  scoredDegrees.sort((a, b) => b.fitScore - a.fitScore);

  const best = scoredDegrees[0] || scoredDegrees[1];
  const second = scoredDegrees[1] || scoredDegrees[0];
  const third = scoredDegrees[2] || second;
  const fourth = scoredDegrees[3] || best;
  const fifth = scoredDegrees[scoredDegrees.length - 1] || best;

  const recommendations: RecommendationMatch[] = [
    { ...best, type: 'Best Match' },
    { ...second, type: 'Strong Alternative', fitScore: Math.max(best.fitScore - 4, 65) },
    { ...third, type: 'Backup Option', fitScore: Math.max(best.fitScore - 9, 60) },
    { ...fourth, type: 'Unexpected Option', fitScore: Math.max(best.fitScore - 12, 58) },
    { ...fifth, type: 'Shorter/Practical Alternative', fitScore: Math.max(best.fitScore - 15, 55) }
  ];

  // Generate Personalized Action Plan
  const primarySkill = assessment.skills[0] || 'Problem solving';
  const primaryInterest = assessment.interests[0] || 'Technology';

  const actionPlan: ActionPlan = {
    next30Days: [
      `Explore introductory concepts in ${primaryInterest} and ${best.degreeName}`,
      `Complete one foundational online tutorial or read 2 introductory chapters related to ${primarySkill}`,
      `Research 3 accredited institutions offering ${best.degreeName} within your budget (${assessment.budgetSituation})`
    ],
    next3Months: [
      `Build and complete 2 small hands-on projects demonstrating your capability`,
      `Strengthen foundational academic prerequisites (such as mathematics or communication)`,
      `Connect with 2 professionals working as ${best.careerName} for informational interviews`
    ],
    next6To12Months: [
      `Prepare for required entry examinations or portfolio submissions`,
      `Finalize applications and secure financial planning or scholarship options`,
      `Enroll in your chosen program and launch your professional networking profile`
    ]
  };

  return { recommendations, actionPlan };
}
