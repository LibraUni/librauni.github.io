// Match complete words or a contiguous phrase, ignoring case, accents and punctuation.
// Each title is matched separately; terms cannot bridge two unrelated titles.
function words(value){
 return String(value||'').normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase('en').match(/[\p{L}\p{N}]+/gu)||[];
}
export function matchesTitle(query,record){
 const phrase=words(query).join(' ');
 if(!phrase)return false;
 return [record.title,record.pageTitle].some(title=>` ${words(title).join(' ')} `.includes(` ${phrase} `));
}
