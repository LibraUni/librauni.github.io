// Curriculum inventory, not new module approvals or learner progress.
export const blueprint = {
 date:'29 September 2026',
 inventory:[
 ['M100 · retired prototype','Former bridge: 3 blocks, 12 units and prototype teaching preserved in the programme archive.','Historical reference only; enrolment and assessment submissions are closed.'],
 ['M101 · Semester 1','Four blocks and complete 13-unit blueprint approved. Module and Unit 1 introductions and Unit 1 Lessons 1–2 available.','Later lessons remain outlines. Continue incremental authoring and review; joint calendar timing and formal assessment release remain pending.'],
 ['P101 · Semester 1','Four blocks and complete 13-unit blueprint approved. Module and Unit 1 introductions, practical orientation, complete Unit 1 teaching and resources, and Unit 2 introduction and Lessons 1–2 available.','Further teaching remains in preparation. Preserve mathematical and computing prerequisites; joint calendar timing and formal assessment release remain pending.'],
 ['M102 · Semester 2','Five blocks and complete 14-unit blueprint approved. Teaching not yet released.','Plan and author lessons within the approved scope; check Semester 2 interfaces and joint timing.'],
 ['A101 · Semester 2','Four blocks and complete revised ten-unit blueprint approved, with reconciled hours and Semester 1 prerequisites. Teaching not yet released.','Lesson production, joint calendars and detailed source verification remain pending.'],
 ['Stage 2','P201 (60), M201 (30), X201 (30): 120 credits. Wider progression map accepted; subject-capacity estimates remain provisional.','Detailed depth and evidence must be checked before later module approval.'],
 ['Stage 3','P301, P302, one specialist option and R300: 30 credits each. Six candidate options; wider progression map accepted with provisional capacities.','Retain prerequisite gates. Options are alternatives, not cumulative compulsory content.'],
 ],
 dependencies:[
 ['M100 → M101/P101 entry','Bridge completion is not compulsory. Specify demonstrable entry skills and a targeted refresher route; prior qualifications alone do not prove them.'],
 ['M101 ↔ P101','Teach each mathematical tool before its quantitative physics use. Assign first teaching of Python, measurement, uncertainty and reporting; check both module sequences together.'],
 ['M101/P101 → M102/A101','Name the actual prerequisite outcomes. Do not make A101 repeat introductory Python or depend on optional M100.'],
 ['M102 ↔ A101','Distinguish Semester 1 prerequisites from same-semester tools. Place any required M102 teaching before A101 uses it, or explicitly budget a justified introduction.'],
 ['Stage 1 → P201/M201/X201','Reserve readiness for calculus, vectors, matrices, complex numbers, differential equations and quantitative investigation. Exact depth and first-teaching homes remain to be decided.'],
 ['P201/M201/X201 → Stage 3','Check advanced field, quantum, specialist and project prerequisites. Preserve compulsory thermal/statistical, solid-state and nuclear/particle foundations across every path.'],
 ],
 gates:[
 'All four Stage 1 block-and-unit maps are approved. Preserve their scope, prerequisites and hour budgets as teaching develops.',
 'The wider Stage 2/3 progression map is accepted; capacity sketches and detailed coverage remain provisional and require further review.',
 'Continue degree teaching incrementally. Before authoring, check the required surrounding lesson and section blueprints under the construction policy; M100 is a retired archive, not the next production step.',
 'Each teaching release requires its own correctness, reader, visual, accessibility and integration checks. Available lessons do not imply complete units, open enrolment or learner attainment.',
 ],
};
