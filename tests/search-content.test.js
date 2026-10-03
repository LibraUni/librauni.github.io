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
