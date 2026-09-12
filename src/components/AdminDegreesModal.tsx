import React, { useState } from 'react';
import { DegreeInfo } from '../types';
import { getAllDegrees, addDegree, updateDegree, deleteDegree, togglePublishDegree } from '../utils/degreesStorage';
import { X, Plus, Edit, Trash2, Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AdminDegreesModalProps {
  onClose: () => void;
  onRefresh: () => void;
}

export const AdminDegreesModal: React.FC<AdminDegreesModalProps> = ({ onClose, onRefresh }) => {
  const [degrees, setDegrees] = useState<DegreeInfo[]>(getAllDegrees());
  const [editingDegree, setEditingDegree] = useState<DegreeInfo | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form state for create/edit
  const [formData, setFormData] = useState({
    name: '',
    category: 'Technology',
    description: '',
    subjectsCommonlyStudied: '',
    skillsDeveloped: '',
    suitableInterests: 'Technology',
    suitableStrengths: '',
    possibleCareers: '',
    alternativeDegrees: '',
    typicalStudyDuration: '4 years (Full-time)',
    furtherStudyOptions: '',
    workEnvironments: 'Office, Remote',
    importantConsiderations: '',
    difficulty: 'Moderate to High',
    eligibilityInfo: 'High school diploma',
    sources: 'Official University Curricula'
  });

  const handleOpenEdit = (deg: DegreeInfo) => {
    setEditingDegree(deg);
    setIsCreating(false);
    setFormData({
      name: deg.name,
      category: deg.category,
      description: deg.description,
      subjectsCommonlyStudied: deg.subjectsCommonlyStudied.join(', '),
      skillsDeveloped: deg.skillsDeveloped.join(', '),
      suitableInterests: deg.suitableInterests.join(', '),
      suitableStrengths: deg.suitableStrengths.join(', '),
      possibleCareers: deg.possibleCareers.join(', '),
      alternativeDegrees: deg.alternativeDegrees.join(', '),
      typicalStudyDuration: deg.typicalStudyDuration,
      furtherStudyOptions: deg.furtherStudyOptions.join(', '),
      workEnvironments: deg.workEnvironments.join(', '),
      importantConsiderations: deg.importantConsiderations.join(', '),
      difficulty: deg.difficulty || 'Moderate',
      eligibilityInfo: deg.eligibilityInfo || 'High school diploma',
      sources: deg.sources ? deg.sources.join(', ') : 'Standard Accreditation'
    });
  };

  const handleOpenCreate = () => {
    setEditingDegree(null);
    setIsCreating(true);
    setFormData({
      name: '',
      category: 'Technology',
      description: '',
      subjectsCommonlyStudied: '',
      skillsDeveloped: '',
      suitableInterests: 'Technology',
      suitableStrengths: '',
      possibleCareers: '',
      alternativeDegrees: '',
      typicalStudyDuration: '4 years (Full-time)',
      furtherStudyOptions: '',
      workEnvironments: 'Office, Remote',
      importantConsiderations: '',
      difficulty: 'Moderate',
      eligibilityInfo: 'High school diploma',
      sources: 'University Accreditation Board'
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      subjectsCommonlyStudied: formData.subjectsCommonlyStudied.split(',').map(s => s.trim()).filter(Boolean),
      skillsDeveloped: formData.skillsDeveloped.split(',').map(s => s.trim()).filter(Boolean),
      suitableInterests: formData.suitableInterests.split(',').map(s => s.trim() as any).filter(Boolean),
      suitableStrengths: formData.suitableStrengths.split(',').map(s => s.trim()).filter(Boolean),
      possibleCareers: formData.possibleCareers.split(',').map(s => s.trim()).filter(Boolean),
      alternativeDegrees: formData.alternativeDegrees.split(',').map(s => s.trim()).filter(Boolean),
      typicalStudyDuration: formData.typicalStudyDuration,
      furtherStudyOptions: formData.furtherStudyOptions.split(',').map(s => s.trim()).filter(Boolean),
      workEnvironments: formData.workEnvironments.split(',').map(s => s.trim()).filter(Boolean),
      importantConsiderations: formData.importantConsiderations.split(',').map(s => s.trim()).filter(Boolean),
      difficulty: formData.difficulty,
      eligibilityInfo: formData.eligibilityInfo,
      sources: formData.sources.split(',').map(s => s.trim()).filter(Boolean),
      published: true
    };

    if (isCreating) {
      addDegree(payload);
      setSuccessMessage('Successfully created new degree!');
    } else if (editingDegree) {
      updateDegree({
        ...editingDegree,
        ...payload,
        slug: editingDegree.slug
      });
      setSuccessMessage('Successfully updated degree!');
    }

    setDegrees(getAllDegrees());
    setIsCreating(false);
    setEditingDegree(null);
    onRefresh();
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this degree?')) {
      deleteDegree(id);
      setDegrees(getAllDegrees());
      onRefresh();
    }
  };

  const handleTogglePublish = (id: string) => {
    togglePublishDegree(id);
    setDegrees(getAllDegrees());
    onRefresh();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              Database Administrator Panel
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Manage Degree Knowledge Base</h2>
            <p className="text-sm text-slate-600">Add, edit, publish or remove degrees without writing code.</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {(isCreating || editingDegree) ? (
          <form onSubmit={handleSave} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">
                {isCreating ? 'Add New Degree' : `Edit: ${editingDegree?.name}`}
              </h3>
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingDegree(null); }}
                className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Degree Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Bachelor of Science in Artificial Intelligence"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Technology">Technology</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business & Finance">Business & Finance</option>
                  <option value="Natural Sciences">Natural Sciences</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Arts & Humanities">Arts & Humanities</option>
                  <option value="Law">Law</option>
                  <option value="Architecture & Design">Architecture & Design</option>
                  <option value="Agriculture & Food">Agriculture & Food</option>
                  <option value="Environment">Environment</option>
                  <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
              <textarea
                rows={2}
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Overview of the degree curriculum and objectives..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Common Subjects (comma-separated)</label>
                <input
                  type="text"
                  value={formData.subjectsCommonlyStudied}
                  onChange={e => setFormData({ ...formData, subjectsCommonlyStudied: e.target.value })}
                  placeholder="Algorithms, Machine Learning, Calculus"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Skills Developed (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skillsDeveloped}
                  onChange={e => setFormData({ ...formData, skillsDeveloped: e.target.value })}
                  placeholder="Programming, Mathematics, Analysis"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Possible Careers (comma-separated)</label>
                <input
                  type="text"
                  value={formData.possibleCareers}
                  onChange={e => setFormData({ ...formData, possibleCareers: e.target.value })}
                  placeholder="Software Engineer, Data Scientist"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Study Duration</label>
                <input
                  type="text"
                  value={formData.typicalStudyDuration}
                  onChange={e => setFormData({ ...formData, typicalStudyDuration: e.target.value })}
                  placeholder="4 years (Full-time)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingDegree(null); }}
                className="px-5 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow"
              >
                {isCreating ? 'Create Degree Record' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Total Degrees in Database: {degrees.length}</span>
              <button
                onClick={handleOpenCreate}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-indigo-700 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Degree</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                    <th className="p-4">Degree Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {degrees.map(deg => (
                    <tr key={deg.id} className="hover:bg-slate-50/80">
                      <td className="p-4 font-bold text-slate-900">{deg.name}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                          {deg.category}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-500">{deg.typicalStudyDuration}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${deg.published !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {deg.published !== false ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleTogglePublish(deg.id)}
                          title={deg.published !== false ? 'Unpublish' : 'Publish'}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                        >
                          {deg.published !== false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleOpenEdit(deg)}
                          title="Edit"
                          className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(deg.id)}
                          title="Delete"
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
