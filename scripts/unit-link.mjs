// Use canonical module-wide unit IDs; never restart numbering for each block.
export const unitLink=(unit,link)=>`Unit ${Number(unit.id.replace(/^U/i,''))}: ${link(unit.href,unit.title)}`;

// Enforce the rule after custom module renderers have finished as well.
export function assertBlockUnitLabels(route,body){
 if(!/\/b\d+\/$/.test(route))return;
 let count=0;
 for(const match of body.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)){
  if(!match[1].startsWith(route))continue;
  const child=match[1].slice(route.length).match(/^u(\d+)\/$/);
  if(!child)continue;
  const expected=`Unit ${Number(child[1])}: `;
  if(!body.slice(0,match.index).endsWith(expected))throw Error(`${route}: unit link ${match[1]} must have the prefix "${expected}" outside the link.`);
  count++;
 }
 if(!count)throw Error(`${route}: block page has no labelled unit links.`);
}
