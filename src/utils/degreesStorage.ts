import { DegreeInfo } from '../types';
import { INITIAL_DEGREES_DATA } from '../data/degreesData';

const STORAGE_KEY = 'pathpilot_degrees_database_v2';

export function getAllDegrees(): DegreeInfo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: DegreeInfo[] = JSON.parse(stored);
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load degrees from localStorage', e);
  }
  return INITIAL_DEGREES_DATA;
}

export function saveAllDegrees(degrees: DegreeInfo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(degrees));
  } catch (e) {
    console.error('Failed to save degrees to localStorage', e);
  }
}

export function getPublishedDegrees(): DegreeInfo[] {
  return getAllDegrees().filter(d => d.published !== false);
}

export function addDegree(newDegree: Omit<DegreeInfo, 'id' | 'slug' | 'lastUpdated'> & { lastUpdated?: string }): DegreeInfo {
  const all = getAllDegrees();
  const slug = newDegree.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const id = slug + '-' + Date.now().toString().slice(-4);
  const created: DegreeInfo = {
    ...newDegree,
    id,
    slug,
    published: newDegree.published ?? true,
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  const updated = [created, ...all];
  saveAllDegrees(updated);
  return created;
}

export function updateDegree(updatedDegree: DegreeInfo): void {
  const all = getAllDegrees();
  const index = all.findIndex(d => d.id === updatedDegree.id);
  if (index !== -1) {
    all[index] = {
      ...updatedDegree,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    saveAllDegrees(all);
  }
}

export function deleteDegree(id: string): void {
  const all = getAllDegrees();
  const filtered = all.filter(d => d.id !== id);
  saveAllDegrees(filtered);
}

export function togglePublishDegree(id: string): void {
  const all = getAllDegrees();
  const index = all.findIndex(d => d.id === id);
  if (index !== -1) {
    all[index].published = !all[index].published;
    saveAllDegrees(all);
  }
}
