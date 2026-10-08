// Pagefind may return shorter stems (e.g. Q for quantum). Validate against
// indexed text, never DOM text: indexed text already excludes private/feedback content.
const normalise=value=>value.normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase('en');
const tokens=text=>[...String(text||'').matchAll(/[\p{L}\p{N}\p{M}]+/gu)].map(m=>({word:normalise(m[0]),start:m.index,end:m.index+m[0].length}));
const escape=text=>text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function querySpec(query){
 const text=String(query||'').trim();
 return {terms:tokens(text).map(t=>t.word),exact:/^(?:"[\s\S]*"|“[\s\S]*”)$/.test(text)};
}
function matchingTokens(text,{terms,exact}){
 if(!terms.length)return [];
 const list=tokens(text);
 if(exact){
  const hits=[];
  for(let i=0;i<=list.length-terms.length;i++)if(terms.every((term,j)=>list[i+j].word===term))hits.push(...list.slice(i,i+terms.length));
  return hits;
 }
 return list.filter(t=>terms.some(term=>t.word.startsWith(term)));
}
function containsQuery(text,spec){
 const hits=matchingTokens(text,spec);
 return spec.exact?hits.length>0:spec.terms.length>0&&spec.terms.every(term=>hits.some(t=>t.word.startsWith(term)));
}
// Common words remain required for matching, but carry less passage-ranking weight.
const commonWords=new Set('a an and are as at be by for from in is it of on or that the this to was were with'.split(' '));
const compareRank=(a,b)=>{
 for(let i=0;i<a.length;i++)if(a[i]!==b[i])return b[i]-a[i];
 return 0;
};
function bestPassage(text,spec){
 const hits=matchingTokens(text,spec);
 if(!hits.length)return null;
 // An adjacent whole-word phrase is strongest even for an unquoted query.
 const phraseHits=matchingTokens(text,{...spec,exact:true});
 if(phraseHits.length){
  const first=phraseHits[0],last=phraseHits[spec.terms.length-1];
  return {hits,start:first.start,end:last.end,rank:[1,1,0,0,-(last.end-first.start)]};
 }
 const terms=[...new Set(spec.terms)];
 const matches=hits.map(hit=>terms.flatMap((term,i)=>hit.word.startsWith(term)?[i]:[]));
 const counts=terms.map(()=>0);
 let right=0,best=null;
 // Sliding windows keep work bounded by text length rather than all hit pairs.
 for(let left=0;left<hits.length;left++){
  while(right<hits.length&&(right===left||hits[right].end-hits[left].start<=260)){
   for(const i of matches[right])counts[i]++;
   right++;
  }
  const covered=terms.filter((_,i)=>counts[i]>0);
  const end=hits[right-1].end;
  const rank=[0,Number(covered.length===terms.length),covered.reduce((sum,term)=>sum+(commonWords.has(term)?0.1:1),0),covered.length,-(end-hits[left].start)];
  if(!best||compareRank(rank,best.rank)<0)best={hits,start:hits[left].start,end,rank};
  for(const i of matches[left])counts[i]--;
 }
 return best;
}
function highlightedExcerpt(text,spec,passage=bestPassage(text,spec)){
 if(!passage)return '';
 const context=Math.max(0,Math.min(90,260-(passage.end-passage.start)));
 const desiredStart=Math.max(0,passage.start-context);
 const start=desiredStart===0?0:text.lastIndexOf(' ',desiredStart)+1;
 let end=Math.min(text.length,Math.max(start+260,passage.end));
 const boundary=text.indexOf(' ',end);if(boundary!==-1)end=boundary;
 let cursor=start,html=start?'… ':'';
 for(const hit of passage.hits.filter(h=>h.start>=start&&h.end<=end)){
  if(hit.start<cursor)continue;
  html+=escape(text.slice(cursor,hit.start))+'<mark>'+escape(text.slice(hit.start,hit.end))+'</mark>';cursor=hit.end;
 }
 return html+escape(text.slice(cursor,end))+(end<text.length?' …':'');
}
export function validateContentResult(query,page){
 const spec=querySpec(query);
 const content=page.content||'';
 const titles=[page.meta?.title||'',page.meta?.pageTitle||''];
 if(!containsQuery(content,spec)&&!titles.some(title=>containsQuery(title,spec)))return null;
 const subResults=(page.sub_results||[]).flatMap(section=>{
  // Only expose section snippets containing actual forward matches.
  const plain=section.plain_excerpt||'';
  const passage=bestPassage(plain,spec);
  if(!passage)return [];
  return [{section:{...section,excerpt:highlightedExcerpt(plain,spec,passage)},rank:passage.rank}];
 }).sort((a,b)=>compareRank(a.rank,b.rank)).map(result=>result.section);
 const excerpt=highlightedExcerpt(content,spec)||highlightedExcerpt(titles.find(title=>containsQuery(title,spec))||'',spec);
 return {...page,excerpt,sub_results:subResults};
}
export async function filterContentResults(query,results,isCurrent=()=>true){
 const accepted=[];
 // Bound concurrent fragment requests and stop obsolete searches between batches.
 for(let i=0;i<results.length&&isCurrent();i+=8){
  const pages=await Promise.all(results.slice(i,i+8).map(result=>result.data()));
  if(!isCurrent())return [];
  for(const page of pages){const valid=validateContentResult(query,page);if(valid)accepted.push({data:async()=>valid});}
 }
 return accepted;
}
