// Route membership is curriculum design, never an enrolment or award record.
export const stage1Modules = [
  {code:'LU-M101',title:'Mathematical foundations',credits:30,purpose:'Mathematical fluency and scientific Python preparation, progressing from handwritten reasoning and learner-written code to critically reviewed AI assistance.',path:'/programme/stage-1/lu-m101/'},
  {code:'LU-M102',title:'Mathematics for physics I',credits:30,purpose:'Calculus, vectors and introductory matrix methods, connecting symbolic reasoning with motion, rates and accumulated quantities.'},
  {code:'LU-M103',title:'Mathematics for physics II',credits:30,purpose:'Further calculus and linear algebra, complex numbers and differential equations for later physical models.'},
  {code:'LU-P101',title:'Physics, space & scientific thinking',credits:30,purpose:'Physical laws, measurement and scientific reasoning: motion, energy, matter, waves and an introduction to the cosmos.'},
  {code:'LU-A101',path:'/programme/stage-1/lu-a101/',title:'Exploring astronomy through computation',credits:30,purpose:'Investigate astronomical questions with observations, supplied models and reproducible Python; interpret evidence and the limits of a conclusion.'},
];
export const stage1Routes = [
  {id:'astronomy',title:'Astronomy route',codes:['LU-M102','LU-M103','LU-P101','LU-A101'],preparation:'M101 is available outside the degree allocation: targeted refreshers or the full assessed module, according to readiness evidence.'},
  {id:'foundation',title:'Foundation route',codes:['LU-M101','LU-M102','LU-M103','LU-P101'],preparation:'M101 counts within Stage 1. A101 may be taken separately as additional study; it does not replace M102, M103 or P101.'},
];
export const a101Boundaries = [
  ['Purpose', 'An introductory astronomy investigation module, not an advanced astrophysics course or a second introductory Python course. The 30-credit outline must justify 300 hours through new astronomical knowledge, investigation and assessed interpretation.'],
  ['Readiness', 'For concurrent entry, ordinary arithmetic and tables are enough to begin. Mathematics and Python requirements are gated unit by unit against M101; equivalent readiness may be demonstrated separately. The full module need not be completed before A101 starts.'],
  ['Physics and mathematics timing', 'A101 0.1 supplies elementary physical context and uses explained model relations without calculus. It is designed to start with M101; graphing, functions, trigonometry, logs and data summaries wait for the relevant M101 units. P101 later develops physical-law derivations; M102/M103 remain essential later mathematics.'],
  ['Candidate investigations', 'Possible anchors include astronomical scales and coordinates, interpreting light and spectra, stellar data and colour–brightness diagrams, and variability or transit light curves. The linked unit preview now allocates the selected investigations and their hours.'],
  ['What P101 owns', 'First explanations of physical laws, measurement and core physical reasoning. A101 retrieves them to interpret astronomical evidence; it does not repeat a general mechanics or waves course.'],
  ['What M101 owns', 'Python foundations and elementary mathematical fluency. A101 applies and extends these through data provenance, structured investigations, validation and uncertainty appropriate to Stage 1. Any new method must be taught and budgeted.'],
  ['What later modules own', 'Detailed stellar structure/evolution, deeper orbital inference, cosmology and advanced numerical methods belong in their later module homes. A101 observations prepare questions for those explanations rather than claiming their coverage.'],
  ['Practical evidence', 'Plan reproducible notebooks with source/units of data, justified modelling choices, independent checks, clear figures and a written or spoken defence. Use supplied or freely accessible observations; no telescope purchase is required. Data analysis does not certify physical instrument handling.'],
  ['Before unit approval', 'Select a feasible investigation set, verify free data/tools, allocate all 300 hours, map prerequisites and assessment evidence, and choose a documented presentation reference. The linked preview includes a provisional timetable; lessons, assessment questions and enrolment remain unavailable.'],
];
