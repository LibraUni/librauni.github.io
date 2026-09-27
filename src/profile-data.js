export const fields={name:120,surname:120,location:160,languages:300};
export const emptyProfile=()=>({schemaVersion:3,...Object.fromEntries(Object.keys(fields).map(k=>[k,'']))});
export function validateProfile(p){
 if(!p||p.schemaVersion!==3||Object.keys(p).some(k=>!['schemaVersion',...Object.keys(fields)].includes(k)))throw Error('Unrecognised profile format. Please reload this page.');
 for(const [key,limit] of Object.entries(fields))if(typeof p[key]!=='string'||p[key].length>limit)throw Error(`Please shorten ${key} to ${limit} characters.`);
 return p;
}
// Retired profile formats must never restore deleted personal information.
export function readProfile(p){
 if(p?.schemaVersion===1||p?.schemaVersion===2)return emptyProfile();
 return validateProfile(p);
}
export function clearLegacyProfileDrafts(storage){
 for(let i=storage.length-1;i>=0;i--){
  const key=storage.key(i);if(!key?.startsWith('librauni:profile:'))continue;
  try{validateProfile(JSON.parse(storage.getItem(key)).data);}catch{storage.removeItem(key);}
 }
}
