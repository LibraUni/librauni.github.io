// Match each title independently; a phrase cannot span unrelated titles.
function words(value){
 return String(value||'').normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase('en').match(/[\p{L}\p{N}]+/gu)||[];
}
function titleMatch(query,record){
 const text=String(query||'').trim();
 const exactOnly=/^(?:"[\s\S]*"|“[\s\S]*”)$/.test(text);
 const terms=words(text);
 if(!terms.length)return null;
 let best=null;
 for(const title of [record.title,record.pageTitle]){
  const tokens=words(title);
  for(let start=0;start<=tokens.length-terms.length;start++){
   const exact=terms.every((term,i)=>tokens[start+i]===term);
   const prefix=!exactOnly&&terms.every((term,i)=>tokens[start+i].startsWith(term));
   const score=exact?2:prefix?1:0;
   if(score&&(!best||score>best.score))best={score,title};
  }
 }
 return best;
}
export function matchesTitle(query,record){return titleMatch(query,record)!==null;}
export function searchTitles(query,records,module=''){
 return records.filter(record=>!module||record.module===module)
  .map(record=>({record,match:titleMatch(query,record)}))
  .filter(result=>result.match)
  .sort((a,b)=>b.match.score-a.match.score)
  .map(({record,match})=>({...record,title:match.title}));
}
