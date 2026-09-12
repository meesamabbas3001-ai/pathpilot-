import React from 'react';
import { SavedResult } from '../types';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';

interface SavedResultsModalProps {
  savedResults: SavedResult[];
  onClose: () => void;
  onSelectResult: (result: SavedResult) => void;
  onClearSaved: () => void;
}

export const SavedResultsModal: React.FC<SavedResultsModalProps> = ({
  savedResults,
  onClose,
  onSelectResult,
  onClearSaved
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-in p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Saved Assessment Results</h2>
              <p className="text-xs text-slate-500">Access your previously generated pathways.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedResults.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-sm text-slate-500">No saved results found.</p>
            <p className="text-xs text-slate-400">Complete an assessment and click "Save Result" to store your paths here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedResults.map((res) => {
              const bestMatch = res.recommendations[0];
              return (
                <div
                  key={res.id}
                  onClick={() => {
                    onSelectResult(res);
                    onClose();
                  }}
                  className="bg-slate-50 border border-slate-200 hover:border-indigo-300 p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block">{res.timestamp}</span>
                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                      {bestMatch ? bestMatch.degreeName : 'Career Path Report'}
                    </h3>
                    <p className="text-xs text-slate-600">
                      Top Match Fit: <strong className="text-indigo-600">{bestMatch?.fitScore}%</strong> • Level: {res.assessment.currentEducationLevel}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {savedResults.length > 0 && (
            <button
              onClick={onClearSaved}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Saved History</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
