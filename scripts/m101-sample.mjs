import fs from 'node:fs';
export const sampleUnit='/learn/physics/stage-1/m101/b01/u01/';
export const samplePath=sampleUnit+'l01/';
export function addM101Sample({root,pages,extraRails,link}){
 const notice='<aside class="sample-notice" aria-label="Test lesson"><strong>Test lesson · temporary sample</strong><p>This sample is online to test reading, navigation and layout. It will be replaced by actual teaching. It is not a completed lesson and does not record study progress.</p></aside>';
 const body=fs.readFileSync(root+'content/samples/m101-opening.html','utf8');
 pages.push([samplePath,'M101 · Lesson 1 · Test sample',[],notice+'<div class="sample-reading">'+body+'</div><nav class="lesson-pagination" aria-label="Lesson navigation">'+link(sampleUnit,'← Unit 1 overview')+link('/learn/physics/stage-1/m101/','M101 overview →')+'</nav>']);
 extraRails.set(samplePath,{title:'In this sample',back:sampleUnit,items:[['module-introduction','Module introduction'],['unit-introduction','Unit 1 introduction'],['coordinates','Lesson 1 · Opening'],['m101-u01-s01','1.1 Describing a position'],['m101-u01-s01-01','1.1.1 Along a line'],['m101-u01-s01-02','1.1.2 In a plane'],['opening-conclusion','Looking back and ahead'],['lesson-exercises','Sample exercises'],['references','Sources and credits']].map(([id,title])=>({href:'#'+id,title}))});
 const unit=pages.find(p=>p[0]===sampleUnit);
 unit[3]=unit[3].replace('<p class="availability">Teaching materials forthcoming · This is a curriculum outline.</p>','<p class="availability">Actual unit teaching is forthcoming. A temporary Lesson 1 sample is available for testing.</p>')+'<p>'+link(samplePath,'Lesson 1 · Coordinates, position and displacement — test sample')+'</p>';
 extraRails.get(sampleUnit).items.push({title:'Lesson 1 · Test sample',href:samplePath});
 const module=pages.find(p=>p[0]==='/learn/physics/stage-1/m101/');
 module[3]+='<p>'+link(samplePath,'Try the illustrated Lesson 1 sample')+' · Temporary test material; actual teaching is forthcoming.</p>';
}
