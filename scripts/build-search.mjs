import {readdir,readFile,writeFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import * as pagefind from 'pagefind';
import {prepareSearchPage} from './search-index.mjs';

function checked(result){
 if(result.errors?.length)throw new Error(result.errors.join('\n'));
 return result;
}
export async function buildSearch(directory='dist'){
 const root=resolve(directory);
 await rm(resolve(root,'pagefind'),{recursive:true,force:true});
 const {index}=checked(await pagefind.createIndex({forceLanguage:'en',keepIndexUrl:false}));
 if(!index)throw new Error('Pagefind did not create an index');
 const manifest=[];
 try{
  const files=(await readdir(root,{recursive:true})).filter(f=>f.endsWith('index.html')).sort();
  for(const file of files){
   const url='/'+file.replaceAll('\\','/').replace(/index\.html$/,'');
   const full=resolve(root,file);
   const page=prepareSearchPage(await readFile(full,'utf8'),url);
   if(!page)continue;
   checked(await index.addHTMLFile({url,content:page.html}));
   await writeFile(full,page.html);
   manifest.push({url,...page.metadata});
  }
  if(!manifest.some(p=>p.status==='available'))throw new Error('Search index contains no available teaching');
  checked(await index.writeFiles({outputPath:resolve(root,'pagefind')}));
  await writeFile(resolve(root,'pagefind/manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  console.log(`Search: indexed ${manifest.length} available learning pages.`);
 }finally{await index.deleteIndex();await pagefind.close();}
 return manifest;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await buildSearch(process.argv[2]);
