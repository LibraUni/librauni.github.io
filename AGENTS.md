# LibraUni public website

This repository is public. Never add learner records, answers, marks, tutor notes, cloud credentials, or private backup contents. Firebase web configuration is public application configuration; privileged secrets are not. Use GitHub Pages. Keep study progress private in Firebase, with explicit owner-only access rules. Do not invent course content or learning achievements. Apply the agreed licensing policy to future publications: public course materials under CC BY-NC-SA 4.0, website source code under MIT, and the LibraUni name, logo, black-hole mark, wordmark and visual identity excluded from those licences. Run build and relevant tests before publishing.

Every public page must include the shared licence-link and official /licenses/cc-by-nc-sa.svg badge beside “Licence & reuse”, with accessible text making clear that it covers course materials and exclusions apply. HTML pages that reference /src files must be Vite build entries, never unprocessed public copies.

## Curriculum publication and development

- Preserve Degree > Stage > Module > Block > Unit > Lesson. Modules integrate multiple traditional courses; the complete approved Unit-level outline must be available for preview before enrolment.
- Before unit design, review the learner's read-only OU Data Science reference folder when supplied. Keep its files private; learn from organisation and pedagogy without reproducing proprietary materials.
- Cross-check undergraduate physics coverage against two reputable research-university curricula using authoritative sources. Maintain a dated mapping from traditional subjects/outcomes to modules and units, with prerequisites, core/elective status, gaps and intentional revisits. Titles alone do not prove coverage. Distinguish required breadth from specialist electives.
- Work stage by stage and one module at a time, reviewing with the learner before moving to the next. Do not generate all unit outlines or lesson materials in bulk.
- Module previews include purpose, learning outcomes, prerequisites, all units and scopes, expected workload and assessment plan. Allocate 10 notional hours per internal credit across all required work; the allocations must reconcile.
- After the Stage 1 design/readiness review, develop authorised teaching incrementally, one lesson or smaller portion at a time; actual enrolment and start dates remain the learner’s choice. Require self-contained explanations, incremental examples and practice, verified diagrams and captions, free curated resources, and accurate history/anecdotes where they support learning.
- Clearly distinguish proposed outlines, approved outlines and available lessons. Keep enrolment, submissions, actual hours and demonstrated attainment private. No award is issued without its assessed evidence.

- Structured curriculum sources live in curriculum/. The renderer in scripts/render-curriculum.mjs generates module and coverage HTML during build. Edit data/templates, regenerate, and commit both sources and generated pages. Preserve dated source limitations and unresolved coverage gaps; structural tests do not establish academic completeness.

## Timetables and assessments

- Use TMA (tutor-marked assignment), iCMA (interactive computer-marked assignment), EMA (end-of-module assessment), and final examination consistently. Written exam plans include handwriting, PDF scanning/checking and submission time. Do not pretend assessment materials or upload tools exist before release.
- Every module has a referenced OU-style presentation duration and pre-scheduled unit windows, assessments and revision. Credits specify workload, not a universal calendar length. M100 uses the documented 30-study-week foundation pattern; select references for later modules individually. Personal extensions/earlier dates remain possible and must preserve the baseline.
- Integrate all events in the expandable module study sequence and its calendar, with Expand all / Hide all, prerequisite links and availability-aware material links. The degree calendar aggregates the same private dates for enrolled modules; planned modules are an explicit optional view.
- Use curriculum/schedules.js and shared planner/date components for future modules. Stable event IDs and schedule versions are durable record keys; never silently overwrite an enrolled timetable or repurpose IDs. Add migration/review for changed versions.
- Keep private plan persistence, immutable revision history, stale-write protection, local draft recovery, export and recursive backup coverage working. Run schedule and emulator persistence/security tests before publication; never count elapsed calendar dates as learning or assessed mastery.

- Scheduling clarification, 24 September 2026: Use the relevant OU module/presentation as the reference for structure, duration and expected weekly workload, including busier assessment weeks. Do not cap, smooth, reduce or stretch that workload to fit Iker’s stated weekly availability. Personal delays are manual date changes chosen by Iker. Mark LibraUni estimates and unverified week-by-week mappings honestly; original unit counts cannot be claimed to reproduce an OU timetable exactly.

## Practical education standard — 24 September 2026

- Practical intensity varies by module. Integrate purposeful Python work throughout the programme, with substantially deeper computational and investigative work in practical modules and projects, especially X201, C301 and R300.
- Aim for the rigour and practical experience of excellent research-university undergraduate education. Activities should be ambitious but achievable at their stated undergraduate stage, with explicit prerequisites, scaffolding and credit-budgeted work. Institutional prestige is an aspiration, not an equivalence claim.
- Select modern, capable, actively maintained tools appropriate to each activity. Verify current capabilities, genuinely free required access, licensing, hardware requirements and reproducibility when designing the unit; do not select tools for novelty alone or promise a free tier will remain unchanged. Prefer portable Python workflows and retain alternatives where a hosted service could disappear.
- Practical work should include formulating questions, making modelling/experimental choices, using simulations or real measured data, quantifying uncertainty/numerical error, checking results against independent evidence, and communicating a reproducible investigation. Progress from guided investigations towards independent undergraduate projects.
- Every practical module preview must state practical outcomes, planned activity types, tool/data requirements, expected deliverables, validation methods and assessed evidence. Track this strand in coverage rows C14–C16 as modules are defined. Distinguish computational/data-analysis experience from physical apparatus and teamwork skills that require actual access; investigate free remote equipment or suitable physical opportunities where feasible.


## Final programme structure — 24 September 2026

- One fixed Stage 1, 120 internal credits. Semester 1: LU-M101 Mathematics for physics I + LU-P101 Physics, space & scientific thinking. Semester 2: LU-M102 Mathematics for physics II + LU-A101 Exploring astronomy through computation. Each module is 30 credits/300 hours; each semester is 60 credits/600 hours. No alternative Stage 1 route remains.
- LU-M100 Mathematics & Python bridge is optional preparation outside the degree, taken only if needed. Its full 30-credit scope is 300 hours; selected refreshers are separately scoped and do not earn full-module credit. Preserve relevant physics applications, abstract fluency exercises, thorough scientific Python foundations and progressively controlled AI/agent work. The full degree is 360 credits, excluding M100.
- P101 belongs with the first mathematics module to establish physical reasoning; A101 follows in Semester 2 and applies Semester 1 foundations alongside further maths. The former bridge–A101 concurrent-entry plan is withdrawn.
- No semester length, start date or enrolment is set. Coordinate both modules in each semester when defining calendar durations and deadlines; do not compress workload silently or fit it to a personal weekly cap. The old A101 31-week presentation and its bridge prerequisite gates are withdrawn. M100’s retained 30-week estimate is provisional for the next bridge review, not a Stage 1 semester length.
- Immediate next task: M100 specifications. Do not resume A101 review or M101/M102 design ahead of that. Retain useful subject outlines as drafts, removing obsolete route and scheduling instructions. Historical decisions remain in Git history, not competing instructions in current records.

## Renumbering and saved records

- Old LU-M101 foundations is now LU-M100; old maths I becomes LU-M101 and old maths II becomes LU-M102. Never interpret saved legacy LU-M101 records as the new degree mathematics module.
- Planner schema 2 uses current active codes plus retiredPlans. Explicitly reviewed migration preserves bridge dates under M100 and retains withdrawn A101 dates as private history, excluded from active calendars. No automatic persistence or destructive overwrite. Preserve local drafts, immutable history, stale-write checks and exports/backups. Test migration and emulator persistence/security on changes.

## Blocks confirmed — 24 September 2026

Hierarchy: Degree > Stage > Module > Block > Unit > Lesson. Blocks are coherent groups of units within a module, not separate enrolments, awards or additional credits. M100 remains outside the degree and uses Module > Block > Unit > Lesson. Its three groups are B01 U01–U04 Calculate and express relationships; B02 U05–U08 Understand functions and models; B03 U09–U12 Investigate and explain. Preserve stable unit IDs, saved dates and chronological assessment placement. Later module blocks must be designed individually, not invented in bulk.

## M100 completion principles — agreed 24 September 2026

1. Demonstrate every essential capability; an aggregate mark cannot conceal a substantial foundational gap. Use targeted practice and reassessment where needed.
2. Assess independent mathematics/Python separately from controlled assistance. Documentation is allowed for independent Python tasks, generated solutions are not; other work explicitly declares permitted assistance.
3. Gather evidence through the existing TMAs and combined EMA within 300 hours, with no additional final examination.

Detailed capability descriptors, rubrics, thresholds and reassessment arrangements remain to be finalised; agreement to principles is not evidence of learner mastery.

## Inside-out coherence review — agreed 24 September 2026

For every new or revised teaching piece, review Section → Lesson → Unit → Block → Module → Stage → Degree. Sections subdivide lessons. Check immediate levels in detail for accuracy, prerequisites, difficulty, pedagogy, examples/practice, graphics, accessibility, assessment purpose and workload; check higher levels for their general role, progression and coverage. Record evidence and unresolved issues rather than claiming perfect fit. Use findings to draft the next section in detail, next lesson as a plan, next unit as an outline and later blocks/modules/stages progressively more broadly. Repeat after revisions or relevant learner feedback; update affected outlines/coverage/dependencies visibly without silently changing agreed scope or mass-authoring distant content. Preserve identifiers and private progress. M100 connects to Stage 1 readiness but remains outside degree credits. The reusable public authoring procedure and short review-record template are in website/docs/curriculum-authoring.md (docs/curriculum-authoring.md within the website repository). Keep learner-specific review evidence private.

## Learner profile

/profile/ contains only a blank public form. Personal fields and bounded JPEG photos live in owner-only Firestore profile/main and profileHistory, never public source. Preserve versioned saves, conflict checks, draft recovery and export/recursive backup coverage. Use profile context only in private tutoring or private adaptations, selectively and when relevant; preserve traditional academic course presentation. Do not infer mastery from biography or attributes from photos. Respect current personalisation preference and learner corrections. Saving a profile does not automatically update chat context. Test security and persistence when changing this feature.
