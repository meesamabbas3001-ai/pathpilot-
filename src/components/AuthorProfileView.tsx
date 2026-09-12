import React from 'react';
import { AuthorProfile } from '../data/authorsData';
import { GUIDES_DATA } from '../data/guidesData';
import { GuideArticle } from '../types';
import { ArrowRight, BookOpen, MapPin, Award, CheckCircle2 } from 'lucide-react';

interface AuthorProfileViewProps {
  author: AuthorProfile;
  onSelectGuide: (guide: GuideArticle) => void;
  onBackToGuides: () => void;
}

export const AuthorProfileView: React.FC<AuthorProfileViewProps> = ({ author, onSelectGuide, onBackToGuides }) => {
  const authorGuides = GUIDES_DATA.filter(g => g.author?.name.toLowerCase() === author.name.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <span>Home</span>
          <span>→</span>
          <span className="cursor-pointer hover:underline" onClick={onBackToGuides}>Guides Hub</span>
          <span>→</span>
          <span className="text-indigo-600">{author.name}</span>
        </div>

        {/* Author Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-indigo-50 shrink-0"
          />
          <div className="space-y-4 text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                Verified Expert Author
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{author.name}</h1>
              <p className="text-sm font-semibold text-indigo-600 flex items-center justify-center sm:justify-start gap-1.5">
                <Award className="w-4 h-4" />
                <span>{author.credential}</span>
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              {author.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {author.location}
              </span>
              {author.expertise.map((exp, i) => (
                <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium border border-indigo-100">
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Authored Articles */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Articles Authored by {author.name} ({authorGuides.length})</span>
            </h2>
            <button
              onClick={onBackToGuides}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              ← Back to Guides Hub
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {authorGuides.map(guide => (
              <div
                key={guide.id}
                onClick={() => onSelectGuide(guide)}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-indigo-300 shadow-sm hover:shadow transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {guide.category}
                    </span>
                    <span className="text-xs text-slate-400">{guide.readTime}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {guide.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs shrink-0 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
