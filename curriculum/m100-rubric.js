// Proposed policy only: does not grade, enrol or alter learner records.
export const rubric = {
 status:'Proposal for discussion · 25 September 2026',
 principle:'Recommend criterion-based completion for this optional bridge: demonstrate every essential capability, rather than combine assignment percentages into a compensating average. Marks may later support feedback, but no weighting, percentage pass threshold or distinction classification is proposed here.',
 levels:[
 ['Not yet evidenced','No suitable evidence is available, the task did not sample the criterion, or the conditions do not establish independent work. This is not a judgement of inability.'],
 ['Developing','The approach is partly sound, but a significant misconception, unexplained result or answer-producing help prevents a dependable demonstration. Record the specific gap.'],
 ['Demonstrated','The learner selects and explains an appropriate method, carries it through with sufficient accuracy, checks the result and satisfies the stated criterion under the permitted assistance conditions. Minor isolated slips do not automatically invalidate sound reasoning; any consequential error must be resolved.'],
 ['Secure transfer','The demonstrated standard is also met in a fresh variation, with well-justified choices and effective independent checks. This is useful feedback, not an additional requirement for completion or a separate award.']
 ],
 capabilities:[
 {id:'E1',title:'Reliable quantitative reasoning',criteria:[
 ['E1a','Calculate with signs, fractions, powers and scientific notation; distinguish exact and approximate values.'],
 ['E1b','Convert compound units and use proportional reasoning without losing dimensions or scale.'],
 ['E1c','Give an estimate or order-of-magnitude check and justify the precision reported.']],
 home:'TMA 01 and EMA B; later quantitative work can corroborate.',
 gap:'Repeated sign/scale errors or an unexplained unit conversion that changes the physical meaning require follow-up; a single corrected transcription slip does not automatically invalidate the capability.'},
 {id:'E2',title:'Algebra and functions',criteria:[
 ['E2a','Simplify and rearrange expressions while retaining excluded values and explaining valid steps.'],
 ['E2b','Solve linear equations, a two-equation linear system, an inequality and a quadratic using appropriate methods and checks.'],
 ['E2c','Connect a function’s formula, table and graph; explain composition, domain restrictions and inverse versus reciprocal.']],
 home:'TMA 01/02 and EMA B, sampled across those tasks rather than repeated in full in each.',
 gap:'Invalid cancellation, an unjustified inequality sign or treating an inverse as a reciprocal needs specific correction and fresh evidence.'},
 {id:'E3',title:'Geometry, change and direction',criteria:[
 ['E3a','Use a labelled geometric construction and appropriate trigonometry, with explicit radians/degrees and relevant solution restrictions.'],
 ['E3b','Resolve and combine two-dimensional vectors; check magnitude/direction and explain a projection or dot product.'],
 ['E3c','Solve and interpret a simple exponential/logarithmic relationship, choosing sensible scales and valid dimensionless log arguments.']],
 home:'TMA 03 and EMA B; the question blueprint must sample all three strands.',
 gap:'A correct numerical answer does not resolve a wrong angle convention, lost quadrant or invalid logarithm argument.'},
 {id:'E4',title:'Independent scientific Python',criteria:[
 ['E4a','Write and explain a small calculation using variables, conditions, iteration and functions with arguments/return values.'],
 ['E4b','Use arrays, load a documented small dataset and produce a plot with meaningful labels and units.'],
 ['E4c','Locate and repair a simple fault, test ordinary and edge cases, and rerun the notebook from a clean state.']],
 home:'Independent Python in TMA 01/02 and EMA A. Deliberately include debugging evidence rather than assume a working submission proves debugging skill.',
 gap:'Unexplained generated implementation, hidden notebook state or inability to check a result leaves the relevant criterion unestablished. A sophisticated library call is not itself evidence of understanding.'},
 {id:'E5',title:'Model, verify and communicate',criteria:[
 ['E5a','Frame a bounded question using a supplied relationship, identify assumptions and compare model predictions with evidence.'],
 ['E5b','Interpret descriptive summaries with their conventions and limitations; solve an elementary finite-probability problem with stated assumptions.'],
 ['E5c','Communicate the method and limitations, cite supplied data, and use an independent mathematical or physical check rather than only the same code twice.']],
 home:'Relevant TMA work and EMA A/B/C. Explicitly reserve a finite-probability item and a data-interpretation item; neither is inferred from a generic model plot.',
 gap:'Claiming causation or certainty from inadequate evidence, confusing spread with uncertainty of the mean, or assuming independence without justification needs targeted review.'},
 {id:'E6',title:'Control computational assistance',criteria:[
 ['E6a','Specify and operate a small bounded agent task in a disposable project copy, retaining a learner-written baseline.'],
 ['E6b','Inspect the actual changes, validate independently, explain a retain/revise/reject decision and demonstrate restoration of the baseline.'],
 ['E6c','Independently critique a supplied AI/code change and disclose the assistance used in the work.']],
 home:'E6a/b: recorded U12 practical exercise. E6c: EMA C. U08–U10 critique prepares for these; trace viewing alone cannot establish operation.',
 gap:'Accepting changes without inspection, delegating scientific assumptions without checking them, or presenting a supplied trace as personal operation does not establish practical control.'}
 ],
 completion:[
 'Every listed essential indicator must reach Demonstrated or Secure transfer, using a traceable body of evidence across the existing work. A capability is not averaged from its indicators. Missing sampling is a task-design gap to resolve, not a learner failure.',
 'Complete and review the three TMAs and the three embedded iCMAs, and submit the single EMA with A, B and C. iCMAs guide feedback and retrieval; they do not independently establish the full exit standard or carry a proposed percentage gate.',
 'Use the EMA to check integrated, independent work and any outstanding concerns. Do not require a duplicate final test of every earlier indicator. If later work contradicts earlier evidence, discuss the specific criterion and seek a focused fresh demonstration.',
 'Record E6a/b during the existing U12 formative exercise: feedback and practice are allowed, but the final demonstration must show the learner controlling the workflow. The tutor may clarify instructions, not supply each action being judged. No extra examination is added.',
 'Only a reviewed complete evidence record supports full-module completion and any future non-accredited bridge certificate. Page ticks, elapsed weeks, prior degrees or completing selected refreshers do not award the full 30 internal credits. This proposal does not issue an award.'
 ],
 assistance:[
 ['Independent mathematics','Explain the reasoning. Use only aids declared in the task; a calculator or Python check must not replace algebraic steps being assessed. Each task will state whether formula/reference sheets are allowed before release.'],
 ['Independent Python: TMA 01/02 and EMA A','Documentation and declared taught library references are allowed. Generated solutions, agent-written implementation and answer-producing tutor help are not. Declare reused taught scaffolding; the task must identify which parts the learner must write.'],
 ['U12 agent exercise','Use the approved bounded agent workflow in the disposable practice copy. Retain request, relevant diff, checks and rollback evidence; redact credentials and unnecessary private data. Record help received.'],
 ['EMA C','Independently judge supplied code and explain findings; no live AI service is required. The discussion clarifies reasoning rather than coaching the assessed answer. An equivalent written exchange can support accessibility without changing the criteria.'],
 ['Unclear or excessive assistance','Clarify what happened without assuming dishonesty. Evidence affected by answer-producing help cannot establish independence; offer an equivalent fresh task after practice. Unaffected evidence remains valid.']
 ],
 recovery:[
 'Return feedback by indicator: what is established, the specific gap, an example from the work, and an achievable next action. Separate a conceptual error from an isolated slip or a missing submission.',
 'Use the existing feedback and revision allowances first for planned corrections and practice. A corrected copy with the answer already explained is learning evidence; it is not by itself a fresh independent demonstration.',
 'Reassess only the affected indicators with a different but equivalent problem, dataset or code fault. Preserve the same scope and assistance conditions, and provide accessible conditions where needed. Do not automatically repeat the whole assignment or module.',
 'Keep every attempt and its feedback privately; record the current judgement and the evidence that superseded an earlier gap. No proposed mark cap or penalty applies for needing more practice.',
 'After two focused reassessments of the same unresolved indicator, review prerequisites and teaching together before another attempt. This is a support trigger, not an exclusion or a limit on learning.',
 'Record extra practice/reassessment time honestly when it exceeds the planned 300-hour workload. Agree any deadline change with the learner; never move dates automatically, inflate credit or disguise extra work as already budgeted.',
 'For an unclear or disputed judgement, point to the criterion and work, reconsider the explanation and offer a fresh equivalent demonstration if needed. A single tutor’s judgement is not external moderation; do not claim independent accreditation.'
 ],
 record:'Proposed private evidence record: assessment/task reference, criterion ID, evidence location, assistance conditions, judgement with reasons, feedback, attempt/date and follow-up. Preserve earlier attempts. Store no answers or grades in public course files. No grading or submission system is implemented by this policy page.',
 release:'Before any assessed task is released, map its parts to these indicators, publish its assistance rules and expected workload, and prepare a checked marking guide with acceptable alternatives. Verify that the complete assessment set samples every indicator within the existing budgets. Detailed questions and marking schemes remain unwritten; approval of this rubric alone does not establish assessment quality or permit automatic grading.'
};
