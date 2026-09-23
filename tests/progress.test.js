import test from 'node:test';
import assert from 'node:assert/strict';
import {summariseProgress, validateNote} from '../src/progress.js';
test('unplanned curriculum does not imply zero or full mastery', () => {
  assert.equal(summariseProgress([]).completionPercent, null);
});
test('completion is independent of assessed understanding; unknown and duplicate records do not inflate progress', () => {
  const s = summariseProgress([{id:'a'},{id:'b'}], [{id:'a',completed:true},{id:'a',completed:true},{id:'fake',completed:true}], [{lessonId:'b',mastered:true},{lessonId:'fake',mastered:true}]);
  assert.equal(s.completionPercent, 50); assert.equal(s.masteryPercent, 50);
});
test('invalid notes are rejected before saving', () => {
  assert.throws(()=>validateNote('x'.repeat(20001))); assert.throws(()=>validateNote({})); assert.equal(validateNote(''), '');
});
