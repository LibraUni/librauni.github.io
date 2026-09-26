// Curriculum inventory, not new module approvals or learner progress.
export const blueprint = {
 date:'25 September 2026',
 inventory:[
 ['M100 · optional bridge','Approved: 3 blocks, 12 units, scope and completion policy; 300 hours.','Map every lesson across B01 U01–U04, then every section of its opening lesson. Preserve B02/B03 unit outlines and review their handovers.'],
 ['M101 · Semester 1','Module-level map and four blocks approved; complete 13-unit blueprint approved. Lessons absent.','Logical P101 handovers agreed; reconcile calendar timing before release.'],
 ['P101 · Semester 1','Role and credits confirmed; module-level outcome/boundary/workload map approved. Four blocks approved; complete 13-unit blueprint and logical pair prerequisite check approved.','Move to M102. Calendar reconciliation remains pending. Allocate required computing and measurement foundations even for learners who do not take M100.'],
 ['M102 · Semester 2','Role and credits confirmed; module-level outcome/boundary/workload map approved. Five blocks approved; complete14-unit blueprint approved.','Revise A101 blocks/units and check Semester 2 interfaces.'],
 ['A101 · Semester 2','Ten provisional units; module-level handovers and boundaries approved; detailed units remain draft. Four blocks proposed with revised allocations; inherited unit hours await review.','Review A101 blocks, then revise inherited unit scopes/hours and exact prerequisite links. Required activities retain Semester 1 entry; M102 enrichment must be timed.'],
 ['Stage 2','Proposed P201 (60), M201 (30), X201 (30): 120 credits. Broad module roles only.','Map provisional prerequisites, core subject ownership and assessment roles. Sketch blocks where needed to test capacity and resolve coverage gaps.'],
 ['Stage 3','Proposed P301, P302, one specialist option and R300: 30 credits each. Six candidate options.','Map prerequisites, core versus optional outcomes and project readiness. Options are alternatives, not cumulative compulsory content.'],
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
 'Complete Stage 1 block-and-unit previews one module at a time: M101, P101, M102, then A101 revision. Reconcile each concurrent pair, hours and assessment timing.',
 'Review Stage 2/3 provisional progression and coverage decisions at module level, adding block sketches where a prerequisite or capacity question requires them. Keep unresolved depth visible.',
 'Map all lessons in M100 Block 1 with purpose, outcomes, prerequisites, hours, practice, Python contribution and forward links; review the remaining M100 unit handovers.',
 'Map all sections of the opening lesson; check the agreed parent outline and relevant assessment preparation. Only then author the first teaching section.',
 ],
};
