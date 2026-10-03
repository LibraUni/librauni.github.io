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
function highlightedExcerpt(text,spec){
 const hits=matchingTokens(text,spec);
 if(!hits.length)return '';
 const start=Math.max(0,text.lastIndexOf(' ',Math.max(0,hits[0].start-90))+1);
 let end=Math.min(text.length,start+260);
 const boundary=text.indexOf(' ',end);if(boundary!==-1)end=boundary;
 let cursor=start,html=start?'… ':'';
 for(const hit of hits.filter(h=>h.start>=start&&h.end<=end)){
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
  if(!matchingTokens(plain,spec).length)return [];
  return [{...section,excerpt:highlightedExcerpt(plain,spec)}];
 });
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
