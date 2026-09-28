// Discard drafts from the retired test workspace once; preserve profile and theme.
export function clearRetiredStudyDrafts(storage){
 const marker='librauni:study-reset:2026-09-28';
 if(storage.getItem(marker))return;
 for(const key of Object.keys(storage))if(/^(librauni:(planner|academic-journal|assessment)(:|$)|librauni-submission-)/.test(key))storage.removeItem(key);
 storage.setItem(marker,'done');
}
try{clearRetiredStudyDrafts(localStorage);}catch{}
