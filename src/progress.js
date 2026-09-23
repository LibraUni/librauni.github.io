export function summariseProgress(catalog, records = [], assessments = []) {
  const known = new Set(catalog.map(x => x.id));
  const complete = new Set(records.filter(x => known.has(x.id) && x.completed === true).map(x => x.id));
  const mastered = new Set(assessments.filter(x => known.has(x.lessonId) && x.mastered === true).map(x => x.lessonId));
  const ratio = n => catalog.length ? Math.round(100 * n / catalog.length) : null;
  return {total: catalog.length, completed: complete.size, mastered: mastered.size,
    completionPercent: ratio(complete.size), masteryPercent: ratio(mastered.size)};
}
export function validateNote(text) {
  if (typeof text !== 'string' || text.length > 20000) throw new Error('Notes can contain up to 20,000 characters.');
  return text;
}
