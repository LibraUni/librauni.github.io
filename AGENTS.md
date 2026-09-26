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
- Current priority: the blueprint audit and sequential Stage 1 block/unit design, beginning with M101, as specified in the 25 September blueprint gate below. Retain existing approved M100 scope and provisional A101 material; no lesson production yet.

## Renumbering and saved records

- Old LU-M101 foundations is now LU-M100; old maths I becomes LU-M101 and old maths II becomes LU-M102. Never interpret saved legacy LU-M101 records as the new degree mathematics module.
- Planner schema 2 uses current active codes plus retiredPlans. Explicitly reviewed migration preserves bridge dates under M100 and retains withdrawn A101 dates as private history, excluded from active calendars. No automatic persistence or destructive overwrite. Preserve local drafts, immutable history, stale-write checks and exports/backups. Test migration and emulator persistence/security on changes.

## Blocks confirmed — 24 September 2026

Hierarchy: Degree > Stage > Module > Block > Unit > Lesson. Blocks are coherent groups of units within a module, not separate enrolments, awards or additional credits. M100 remains outside the degree and uses Module > Block > Unit > Lesson. Its three groups are B01 U01–U04 Calculate and express relationships; B02 U05–U08 Understand functions and models; B03 U09–U12 Investigate and explain. Preserve stable unit IDs, saved dates and chronological assessment placement. Later module blocks must be designed individually, not invented in bulk.

## M100 completion principles — agreed 24 September 2026

1. Demonstrate every essential capability; an aggregate mark cannot conceal a substantial foundational gap. Use targeted practice and reassessment where needed.
2. Assess independent mathematics/Python separately from controlled assistance. Documentation is allowed for independent Python tasks, generated solutions are not; other work explicitly declares permitted assistance.
3. Gather evidence through the existing TMAs and combined EMA within 300 hours, with no additional final examination.

M100’s detailed completion rubric and reassessment policy were approved 25 September 2026: follow website/curriculum/m100-rubric.js (curriculum/m100-rubric.js within the website repository). All18 essential indicators require demonstrated evidence; no compensating percentage average or reassessment penalty. Task-specific marking guides remain to be prepared. Policy approval is not evidence of learner mastery.

## Inside-out coherence review — agreed 24 September 2026

For every new or revised teaching piece, review Section → Lesson → Unit → Block → Module → Stage → Degree. Sections subdivide lessons. Check immediate levels in detail for accuracy, prerequisites, difficulty, pedagogy, examples/practice, graphics, accessibility, assessment purpose and workload; check higher levels for their general role, progression and coverage. Record evidence and unresolved issues rather than claiming perfect fit. Use findings to draft the next section in detail, next lesson as a plan, next unit as an outline and later blocks/modules/stages progressively more broadly. Repeat after revisions or relevant learner feedback; update affected outlines/coverage/dependencies visibly without silently changing agreed scope or mass-authoring distant content. Preserve identifiers and private progress. M100 connects to Stage 1 readiness but remains outside degree credits. The reusable public authoring procedure and short review-record template are in website/docs/curriculum-authoring.md (docs/curriculum-authoring.md within the website repository). Keep learner-specific review evidence private.

## Learner profile

/profile/ contains only a blank public form. Personal fields and bounded JPEG photos live in owner-only Firestore profile/main and profileHistory, never public source. Preserve versioned saves, conflict checks, draft recovery and export/recursive backup coverage. Use profile context only in private tutoring or private adaptations, selectively and when relevant; preserve traditional academic course presentation. Do not infer mastery from biography or attributes from photos. Respect current personalisation preference and learner corrections. Saving a profile does not automatically update chat context. Test security and persistence when changing this feature.

## Academic continuity journal — 25 September 2026

After each actual tutorial or content-learning session, keep a timestamped private academic record at /journal/: subject/module/unit/criterion, work attempted, learner reasoning, changes observed, evidence, difficulties, feedback, next steps and only evidenced milestones. Distinguish reported confidence/activity from demonstrated understanding. Archive the full available academic tutorial transcript separately, preserving speaker names and actual timestamps. Never archive website setup, programme-design or administrative conversation as academic progress. Do not invent historical transcripts/timestamps or claim an unavailable full transcript is complete; identify the gap and use an explicit transcript export/import. A session summary is not a transcript.

Use website/scripts/archive-academic-session.mjs with private input outside the public repository, or the authenticated academic journal form/import. Follow website/docs/academic-journal.md (paths relative to repository when appropriate). Entries are append-only; link corrections and retain earlier evidence. Verify cloud upload before claiming saved. Current journal filters category/date/search and exports full/filtered JSON or readable Markdown; server save time is separate from optional event time. Owner-only access and recursive backup remain mandatory. External chat is not automatically captured by the web page. Do not put learner records in public source. Future learning features must preserve academic event history rather than silently overwrite evidence.

Guided VS Code/Python/Jupyter setup assumes only very basic Python. Orientation6h now explicitly contains setup3h, notebook/backup practice1h, navigation/files1h and initial readiness1h; U01 includes4h of Python foundations. These stay within M100300h; additional troubleshooting must be recorded honestly.

## Tutor-owned academic logging — 25 September 2026

The tutor owns routine maintenance of the academic journal. After each substantive tutorial/content-learning session, prepare and upload the academic session note without asking the learner to fill in a form or repeatedly approve logging. Aim for roughly100–250 words when useful, shorter for a small exchange: subject/work attempted; evidence of understanding and changes since earlier evidence; difficulties/misconceptions; feedback; clear next steps; milestones only when demonstrated. Avoid padding, repeating the whole lesson or logging administrative discussion. Add focused category entries only where useful; avoid duplicate narratives.

Archive the full available academic transcript separately, preserving actual speakers/timestamps. Do not replace it with a summary labelled as complete. If connected access or full transcript text is unavailable, retain the available academic note privately and explicitly state what was not saved/captured; never silently promise automatic cross-app access. Use the existing connected-tutor uploader and verify successful archival. Manual observation and transcript-recovery controls are optional fallbacks, not the student's responsibility.

The academic journal offers readable full/filtered .txt downloads only. Do not place raw administrative backups (profile payloads/photos, planner configuration or note revisions) in its interface. Those remain separate recovery data on the study desk/private backup. The journal reads only academic records and planner completion history needed for academic activity extraction.

## Blueprint gate before lesson production — agreed 25 September 2026

Current priority supersedes earlier “M100 specifications next” directions. Audit actual source detail, then define Stage1 one module at a time: M101, P101, M102, A101 revision, reviewing each proposal and reconciling concurrent pairs. All Stage1 modules need blocks and complete unit outlines, outcomes, prerequisites, hours and assessment plans before lesson production. Review provisional Stage2/3 module/pathway roles, prerequisite chains, core breadth and capacity; sketch blocks where needed, without mass-authoring distant units. Preserve all open coverage gaps and source limitations.

Before the first M100 teaching section, blueprint every lesson in B01 U01–U04 (purpose, outcomes, prerequisites, hours, maths/Python balance, practice/evidence, forward handover), then every section of the opening lesson. Preserve/review approved B02/B03 units, adding downstream lesson outlines only where needed. Reconcile lesson hours within existing unit budgets; no additional credits or silent workload. Work both top-down and inside-out. Distinguish confirmed architecture, approved scope, draft outlines and available teaching. Orientation tutoring is not a substitute for course material or permission to bypass the blueprint gate. See website/docs/blueprint-audit-2026-09-25.md (docs/ within website) and programme/#blueprint-audit. This planning is not academic attainment and does not belong in the learning journal.

## Recursive construction policy — adopted 25 September 2026

Mandatory for every curriculum construction, revision and teaching release. Public commitment: /programme/construction-policy/; canonical gate/field data: website/curriculum/construction-policy.js (curriculum/ within website). Follow all six gates there, not only the current M100 example. Distinguish blueprinting from authoring and construction readiness from release readiness. Blueprint fields: purpose/outcomes, boundaries, dependencies, workload, evidence and handover.

Before authoring a section: all sections in its lesson and all lessons across its block must be blueprinted. Before blueprinting lesson sections: all lessons across its block must be blueprinted and unit outcomes/workload/assessment role settled. Before blueprinting unit lessons: all units across its module must be blueprinted and all blocks across its stage mapped. Before blueprinting block units: all blocks across its module must be blueprinted and all modules across its stage have outcomes/boundaries/workload. Before blueprinting module blocks: all modules across its stage must be mapped and degree progression/core-specialist boundaries established. Before blueprinting stage modules: every degree stage must have purpose, exit expectations, credit budget and progression requirements.

“Every” is scoped to the named enclosing component, not the whole degree. Distant maps may be explicitly provisional; unresolved relevant dependencies cannot be passed off as settled. Dependencies may require more detail than the minimum. Optional M100 uses the receiving Stage1 as its wider context without entering degree credits. Preserve the stronger current starting gate agreed in the blueprint audit.

For every new or materially revised component, record policy version, applicable gate, linked parent/peer/wider blueprints, dependency and budget evidence, construction disposition, separate release disposition, unresolved issues and forward handover. If a gate is unmet, complete the missing plan before detailed construction; exploratory planning is not released teaching. Review changes inside-out and across affected components, preserving IDs, prior versions and private records. Do not silently relax the policy or claim automated tests establish academic coherence. Generic review records are public; this planning and policy administration is excluded from academic progress logs.

## Planning checkpoint — 26 September 2026

All four Stage1 block/unit maps are approved, including A1011.0. Later-stage progression/capacity proposal0.1 is in curriculum/later-stage-audit.js and /programme/#later-stage-audit. Its allocations are provisional, not approved blocks; do not treat budget reconciliation as proof of academic depth. Review it next, then resume M100B01 lesson blueprinting under the existing gates. Preserve G01–G04 and the P201/P302 capacity risks. No telescope requirement or academic-log event follows from this planning.

## M100 lesson planning checkpoint — 26 September 2026

Wider progression map accepted as1.0; its capacity estimates remain provisional. M100 B01 complete19-lesson blueprint0.1 now awaits review at /programme/bridge/lu-m100/#block-1-lessons; canonical curriculum/m100-block1-lessons.js. Preserves80unit hours and14included Python hours, all five approved workload categories and existing assessment/schedule IDs. Next after review: all sections of U01-L01, then incremental teaching authoring. Do not assume published blueprint means available teaching or learner completion.

## Opening lesson checkpoint — 26 September 2026

M100B01 all19 lesson blueprints approved as1.0. Complete six-section U01-L01 plan0.1 awaits review at /programme/bridge/lu-m100/#opening-sections, canonical curriculum/m100-opening-sections.js. Preserves240 minutes and every parent budget category. Next after review: author S01 and perform actual release checks, then proceed section by section. No new whole-programme planning pass is needed unless a specific dependency fails.

## Enrichment and authoring scale — 26 September 2026

Learner requests occasional interactive animations alongside meaningful diagrams/captions, historical context about scientific figures, scientific curiosities and precisely selected free external articles/resources. Use these selectively when they deepen understanding or curiosity; avoid a quota, decorative distraction or compulsory detours disguised as optional extras. Necessary captions/explanations are core teaching. Clearly label genuine enrichment and its estimated time; required interactions and explanations fit the existing credit budget. Optional material must never contain an untaught prerequisite needed later.

Interactive elements should let the learner predict, change a meaningful parameter and interpret the result. Verify the model and limiting cases; provide keyboard access, reduced-motion support where applicable and a static/text equivalent. Historical anecdotes and external references require factual/source and rights checks when authored. These are future material standards, not a claim that animations exist already.

Recommended authoring workflow discussed with the learner: section as the default drafting increment, with a small related section group or short complete lesson possible when prerequisites and review scope are manageable. Existing recursive gates always apply. Review the complete lesson for notation, transitions, progression and workload after its sections are drafted, and conduct a whole-unit integration pass for narrative, cumulative practice, assessment preparation, gaps and repetition. Revise earlier parts where needed. Blueprinting guides coherence but does not guarantee it. Whole-unit review is distinct from generating an entire unit in one pass. Avoid requiring learner approval for every paragraph; retain meaningful review milestones and existing authorisation.

This turn records teaching preferences and discusses process; it does not author teaching or constitute an academic progress event.

## Learning materials and first release — 26 September 2026

Actual teaching lives under /learn/, separately from /programme/ blueprints. Preserve expandable/collapsible Degree > Stage > Module > Block > Unit > Lesson > Section navigation; M100 is /learn/preparation/m100/ outside degree stages. Use native details and accessible controls; curriculum Expand all must not reveal exercise feedback. Every published teaching page requires valid Vite entry, shared branding/licence/disclaimer, breadcrumbs and honest availability. Public reading requires no enrolment. Do not infer progress from reading or expose private notes.

Opening six-section plan approved as1.0. S01 is published at /learn/preparation/m100/b01/u01/l01/#S01 with three retrieval activities and feedback. Source content/m100-u01-l01-s01.html; release review docs/m100-first-section-release.md. S02–S06 forthcoming; planner enrolment and whole-unit availability unchanged. Next: review the first release, then author S02. Whole-lesson/unit integration reviews remain required.
