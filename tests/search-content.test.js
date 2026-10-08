import test from 'node:test';
import assert from 'node:assert/strict';
import {validateContentResult,filterContentResults} from '../src/search-content.js';
const page=content=>({url:'/learn/example/',content,meta:{title:'Example'},sub_results:[]});
test('full-content search rejects shorter words and stems but allows forward prefixes',()=>{
 for(const [query,text] of [['quantum','Q is a point.'],['quantum','Quantity is measured.'],['vectorisation','A vector.'],['ion','Position and motion.'],['unseenword','U is unknown.']])assert.equal(validateContentResult(query,page(text)),null);
 for(const [query,text] of [['vector','A collection of vectors.'],['vect','Vectors and vectorisation.'],['quant','Quantum models.'],['q','Point Q.'],['cafe','A café.']])assert.ok(validateContentResult(query,page(text)));
});
test('all query terms must match; quoted phrases require consecutive whole words',()=>{
 assert.equal(validateContentResult('quantum vector',page('Q and vectors.')),null);
 assert.ok(validateContentResult('unit vect',page('Vectors have unit length.')));
 assert.equal(validateContentResult('"unit vector"',page('A unit vectors example.')),null);
 assert.equal(validateContentResult('“unit vector”',page('A vector with unit length.')),null);
 assert.ok(validateContentResult('"unit vector"',page('A unit vector has length one.')));
 assert.equal(validateContentResult('   ',page('Anything.')),null);
});
test('snippets highlight real matches and discard sections matching only Q',()=>{
 const candidate={...page('Point Q. Later we discuss quantum theory and quantum states. <script>not markup</script>'),sub_results:[{url:'/learn/example/#q',plain_excerpt:'Point Q is here.',excerpt:'Point <mark>Q</mark> is here.'},{url:'/learn/example/#quantum',plain_excerpt:'Quantum theory starts here.'}]};
 const result=validateContentResult('quantum',candidate);
 assert.equal(result.sub_results.length,1);assert.equal(result.sub_results[0].url,'/learn/example/#quantum');
 assert.match(result.excerpt,/<mark>quantum<\/mark>/);assert.doesNotMatch(result.excerpt,/<mark>Q<\/mark>|<script>/);
 assert.ok(validateContentResult('quantum',{...page('Introduction.'),meta:{title:'Quantum theory'}}));
});
test('candidate filtering caches accepted data and drops invalid results',async()=>{
 let loads=0;
 const results=['Q only.','Quantum physics.'].map(content=>({data:async()=>{loads++;return page(content);}}));
 const filtered=await filterContentResults('quantum',results);
 assert.equal(filtered.length,1);await filtered[0].data();await filtered[0].data();assert.equal(loads,2);
 assert.deepEqual(await filterContentResults('quantum',results,()=>false),[]);
});

test('the distance walked ranks the activity ahead of earlier partial matches',()=>{
 const sections=[
  ['direction','The distance OF is always nonnegative.'],
  ['example','Find the distance from the origin to its perpendicular foot.'],
  ['solution','The foot lies three metres away. Its distance is 3 m.'],
  ['activity-15','An observer reverses the reference arrow. A report calls the magnitude of d “the distance walked”. Explain what further information would make that claim valid.']
 ].map(([id,plain_excerpt])=>({url:`/learn/example/#${id}`,plain_excerpt}));
 const candidate={...page(sections.map(s=>s.plain_excerpt).join(' ')),sub_results:sections};
 for(const query of ['the distance walked','"the distance walked"']){
  const result=validateContentResult(query,candidate);
  assert.equal(result.sub_results[0].url,'/learn/example/#activity-15');
  assert.match(result.sub_results[0].excerpt,/<mark>the<\/mark> <mark>distance<\/mark> <mark>walked<\/mark>/);
 }
 assert.equal(validateContentResult('"the distance walked"',candidate).sub_results.length,1);
});
test('excerpts centre on a later phrase instead of the first common word',()=>{
 const content='The introduction. '+ 'Background information. '.repeat(40)+'We measured the distance walked along the route.';
 const result=validateContentResult('the distance walked',page(content));
 assert.match(result.excerpt,/<mark>the<\/mark> <mark>distance<\/mark> <mark>walked<\/mark>/);
 assert.ok(result.excerpt.length<400);
 assert.match(validateContentResult('quantum',page('Quantum physics.')).excerpt,/^<mark>Quantum<\/mark>/);
});
test('passages prefer nearby complete matches, then meaningful partial matches',()=>{
 const sections=[
  ['common','The the the the the.'],
  ['partial','Distance measurements.'],
  ['far','The distance '+ 'background '.repeat(15)+'walked.'],
  ['near','The distance we walked.'],
  ['phrase','The distance walked.']
 ].map(([id,plain_excerpt])=>({url:`/learn/example/#${id}`,plain_excerpt}));
 const result=validateContentResult('the distance walked',{...page(sections.map(s=>s.plain_excerpt).join(' ')),sub_results:sections});
 assert.deepEqual(result.sub_results.map(s=>s.url.split('#')[1]),['phrase','near','far','partial','common']);
});
test('later prefix clusters and repeated query words keep useful excerpts',()=>{
 const text='The opening. '+'Background. '.repeat(40)+'The vectors have unit length.';
 const result=validateContentResult('the unit vect',page(text));
 assert.match(result.excerpt,/<mark>vectors<\/mark> have <mark>unit<\/mark>/);
 assert.ok(validateContentResult('unit unit vect',page(text)));
 assert.equal(validateContentResult('"unit unit"',page(text)),null);
});

test('full indexed sections recover a phrase omitted from Pagefind excerpts',()=>{
 const opening='The distance from the origin is positive.';
 const activity='Activity 2.15 Explain the measurement. '+ 'Calculate the signed advance and distance. '.repeat(12)+'A report calls the magnitude “the distance walked”. Explain the claim.';
 const candidate={...page(opening+' '+activity),anchors:[
  {element:'h2',text:'Introduction',id:'intro',location:0},
  {element:'h3',text:'Activity 2.15',id:'activity-15',location:opening.split(/\s+/).length}
 ],sub_results:[{title:'Activity 2.15',url:'/learn/example/#activity-15',plain_excerpt:'Calculate the signed advance and distance.'}]};
 for(const query of ['the distance walked','"the distance walked"']){
  const result=validateContentResult(query,candidate);
  assert.equal(result.sub_results[0].url,'/learn/example/#activity-15');
  assert.match(result.sub_results[0].excerpt,/<mark>the<\/mark> <mark>distance<\/mark> <mark>walked<\/mark>/);
 }
});
