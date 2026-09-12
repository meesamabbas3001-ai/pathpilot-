export interface AuthorProfile {
  id: string;
  slug: string;
  name: string;
  credential: string;
  bio: string;
  avatar: string;
  expertise: string[];
  location: string;
}

export const AUTHORS_DATA: AuthorProfile[] = [
  {
    id: 'tariq-jamil',
    slug: 'tariq-jamil',
    name: 'Dr. Tariq Jamil',
    credential: 'Senior Higher Education & Career Counselor, Islamabad',
    bio: 'Dr. Tariq Jamil has over 18 years of experience advising students across Islamabad, Lahore, and Karachi on university admissions, HEC recognition guidelines, and higher education strategy. He holds a Ph.D. in Educational Leadership and has served on multiple academic advisory panels.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
    expertise: ['HEC Accreditation', 'University Admissions', 'FSc/ICS Counseling', 'Higher Education Strategy'],
    location: 'Islamabad, Pakistan'
  },
  {
    id: 'ayesha-malik',
    slug: 'ayesha-malik',
    name: 'Ayesha Malik',
    credential: 'Tech Recruiter & Software Engineering Mentor, Lahore',
    bio: 'Ayesha Malik is a senior technical recruiter and software engineering career mentor based in Lahore. She has helped over 500 graduates from Pakistani universities transition into top-tier tech roles and remote engineering positions with international startups.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=faces',
    expertise: ['Software Engineering Careers', 'Tech Hiring in Pakistan', 'Remote Work', 'Skill Development'],
    location: 'Lahore, Pakistan'
  },
  {
    id: 'faisal-rehman',
    slug: 'faisal-rehman',
    name: 'Faisal Rehman',
    credential: 'Managing Director, Pakistan Career Institute',
    bio: 'Faisal Rehman specializes in career economics, salary benchmarking in PKR, and vocational vs. academic pathways in Pakistan. He frequently writes on corporate recruitment trends, banking, and professional accounting standards.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    expertise: ['Career Economics', 'Salary Benchmarking', 'Corporate Recruitment', 'Professional Accounting'],
    location: 'Karachi, Pakistan'
  },
  {
    id: 'zoya-khan',
    slug: 'zoya-khan',
    name: 'Dr. Zoya Khan',
    credential: 'Medical Education Consultant & Researcher, Rawalpindi',
    bio: 'Dr. Zoya Khan advises pre-medical students on MDCAT preparation, MBBS/BDS admissions in public and private medical colleges in Pakistan, and alternative allied health sciences pathways.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces',
    expertise: ['MDCAT & Medical Admissions', 'Allied Health Sciences', 'Healthcare Careers in Pakistan'],
    location: 'Rawalpindi, Pakistan'
  }
];
