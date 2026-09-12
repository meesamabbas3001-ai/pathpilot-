import React, { useState } from 'react';
import { getPublishedDegrees } from '../utils/degreesStorage';
import { DegreeInfo } from '../types';
import { BookOpen, Search, ArrowRight, Clock, Shield } from 'lucide-react';
import { AdminDegreesModal } from './AdminDegreesModal';

interface DegreesHubProps {
  onSelectDegree: (degree: DegreeInfo) => void;
  onBackToHome: () => void;
  initialCategory?: string;
}

export const DegreesHub: React.FC<DegreesHubProps> = ({ onSelectDegree, onBackToHome, initialCategory = 'All' }) => {
  const [degrees, setDegrees] = useState<DegreeInfo[]>(getPublishedDegrees());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const categories = [
    'All',
    'Technology',
    'Engineering',
    'Business & Finance',
    'Natural Sciences',
    'Healthcare',
    'Social Sciences',
    'Arts & Humanities',
    'Law',
    'Architecture & Design',
    'Agriculture & Food',
    'Environment',
    'Hospitality & Tourism',
    'Education'
  ];

  const filteredDegrees = degrees.filter(deg => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      deg.name.toLowerCase().includes(term) ||
      deg.description.toLowerCase().includes(term) ||
      deg.subjectsCommonlyStudied.some(s => s.toLowerCase().includes(term)) ||
      deg.skillsDeveloped.some(s => s.toLowerCase().includes(term)) ||
      deg.possibleCareers.some(c => c.toLowerCase().includes(term));

    const matchesCat = selectedCategory === 'All' || deg.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat && (deg.published !== false);
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <span>Home</span>
          <span>→</span>
          <span className="text-indigo-600">Degree Database {selectedCategory !== 'All' ? `→ ${selectedCategory}` : ''}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Scalable Degree Database ({filteredDegrees.length} Programs)</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {selectedCategory !== 'All' ? `${selectedCategory} Degrees in Pakistan: Programs & Career Outcomes` : 'Degree Database: Explore 19+ Degree Programs & Career Paths in Pakistan'}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              Finding the best degree to choose after intermediate in Pakistan (FSc Pre-Engineering, Pre-Medical, ICS, or A-Levels) shapes your entire professional trajectory. Explore our comprehensive degree profiles mapping curriculum subjects, HEC accreditation criteria, core skill development, and verified career outcomes with Pakistani salary benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shadow-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search degrees by name, subject, skill, career..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto overflow-x-auto pb-2">
            {categories.map(cat => {
              const catSlug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    if (cat === 'All') {
                      window.history.pushState(null, '', '/degrees');
                    } else {
                      window.history.pushState(null, '', `/degrees/${catSlug}`);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Degrees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDegrees.map(deg => (
            <div
              key={deg.id}
              onClick={() => onSelectDegree(deg)}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {deg.category}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium bg-slate-100 px-2 py-0.5 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    {deg.typicalStudyDuration}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                  {deg.name}
                </h3>

                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {deg.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-1">
                  {deg.skillsDeveloped.slice(0, 3).map((s, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">HEC Recognized</span>
                <div className="flex items-center gap-1 text-indigo-600 font-bold text-xs group-hover:translate-x-1 transition-transform">
                  <span>View Degree →</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDegrees.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No degrees found matching your search criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
};
