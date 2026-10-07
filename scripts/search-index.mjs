import {load} from 'cheerio';

// This allowlist is deliberately independent of authentication and private stores.
export function prepareSearchPage(html, url) {
 if(!url.startsWith('/learn/')||/\/m100\//i.test(url))return null;
 const $=load(html);
 const body=$('.lesson-reading').first().length?$('.lesson-reading').first():$('main').first();
 if(!body.length)throw new Error(`Missing search content: ${url}`);
 // Local teaching previews must not enter the available-material index.
 if(body.find('[data-search-status="draft"]').length)return null;
 const status=body.attr('data-search-status');
 if(!['available','outline','archive'].includes(status))throw new Error(`Missing search availability: ${url}`);
 if(body.find('.teaching-reading').length&&status!=='available')throw new Error(`Teaching missing availability marker: ${url}`);
 if(status!=='available')return null;
 const module=(url.match(/\/(?:lu-)?([mapcxrt]\d{3})\//i)?.[1]||'').toUpperCase();
 const unit=url.match(/\/u(\d+)\//)?.[1];
 const lesson=url.match(/\/l(\d+)\//)?.[1];
 const kind=lesson?'Lesson':unit?'Unit':url.includes('/orientation/')?'Orientation':/\/b\d+\/$/.test(url)?'Block':module?'Module':'Programme';
 const location=[module,unit&&`Unit ${Number(unit)}`,lesson&&`Lesson ${Number(lesson)}`].filter(Boolean).join(' · ')||'Programme';
 const heading=body.find('h1').first().clone();
 heading.find('br').replaceWith(' ');
 const title=heading.text().replace(/\s+/g,' ').trim()||$('title').text().replace(/\s*[|·]\s*LibraUni.*$/,'').trim();
 body.attr('data-pagefind-body','').attr('data-search-location',location).attr('data-pagefind-index-attrs','data-search-location');
 const pageTitle=$('title').text().replace(/\s*[|·]\s*LibraUni.*$/,'').replace(/\s+/g,' ').trim();
 const metadata={title,pageTitle,location,kind,status,module:module||'Programme'};
 $('meta[data-search-generated]').remove();
 for(const [name,value] of Object.entries(metadata)){
  const meta=$('<meta>').attr('data-search-generated','').attr('data-pagefind-meta',`${name}[content]`).attr('content',value);
  if(['status','module','kind'].includes(name))meta.attr('data-pagefind-filter',`${name}[content]`);
  $('head').append(meta);
 }
 // Exclude solution disclosures, repeated chrome and controls, but retain questions/code.
 body.find('nav, .lesson-sidebar, footer, form, button, input, select, textarea, script, style, .section-read, .overview-motif, .legacy-anchor, [hidden], [aria-hidden="true"], [data-search-ignore]').attr('data-pagefind-ignore','all');
 body.find('details').each((_,element)=>{
  const disclosure=$(element);
  const label=disclosure.children('summary').first().text().trim();
  if(/^(?:read|check|compare|review|discussion|hints?|worked solution|solution|feedback|answers?)\b/i.test(label)||disclosure.hasClass('practice-feedback'))disclosure.attr('data-pagefind-ignore','all');
 });
 // Preserve existing section anchors; add separate heading anchors for search subresults.
 body.find('h2,h3,h4').each((i,heading)=>{
  const h=$(heading);
  if(h.attr('id')||h.closest('[data-pagefind-ignore]').length)return;
  const parent=h.closest('[id]').attr('id')||'section';
  let id=`${parent}-search-${i+1}`;
  while($('[id]').toArray().some(el=>$(el).attr('id')===id))id+='-heading';
  h.attr('id',id);
 });
 return {html:$.html(),metadata};
}
