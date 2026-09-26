import {readFileSync,readdirSync,mkdirSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const files=['content','curriculum'].flatMap(dir=>readdirSync(new URL(dir+'/',root)).filter(n=>/\.(html|js)$/.test(n)).map(n=>dir+'/'+n)).sort();
const commit=process.env.GITHUB_SHA||execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
if(!/^[a-f0-9]{40}$/.test(commit))throw Error('Invalid release commit');
const release={format:'librauni-teaching-release-v1',repository:'https://github.com/LibraUni/librauni.github.io',commit,files:Object.fromEntries(files.map(f=>[f,createHash('sha256').update(readFileSync(new URL(f,root))).digest('hex')]))};
mkdirSync(new URL('public/evidence/',root),{recursive:true});writeFileSync(new URL('public/evidence/teaching-release.json',root),JSON.stringify(release,null,2)+'\n');
