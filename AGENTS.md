# LibraUni public website

This repository is public. Never add learner records, answers, marks, tutor notes, cloud credentials, or private backup contents. Firebase web configuration is public application configuration; privileged secrets are not. Use GitHub Pages. Keep study progress private in Firebase, with explicit owner-only access rules. Do not invent course content or learning achievements. Apply the agreed licensing policy to future publications: public course materials under CC BY-NC-SA 4.0, website source code under MIT, and the LibraUni name, logo, black-hole mark, wordmark and visual identity excluded from those licences. Run build and relevant tests before publishing.

Every public page must include the shared licence-link and official /licenses/cc-by-nc-sa.svg badge beside “Licence & reuse”, with accessible text making clear that it covers course materials and exclusions apply. HTML pages that reference /src files must be Vite build entries, never unprocessed public copies.

## Curriculum publication and development

- Preserve Degree > Stage > Module > Unit > Lesson. Modules integrate multiple traditional courses; the complete approved Unit-level outline must be available for preview before enrolment.
- Before unit design, review the learner's read-only OU Data Science reference folder when supplied. Keep its files private; learn from organisation and pedagogy without reproducing proprietary materials.
- Cross-check undergraduate physics coverage against two reputable research-university curricula using authoritative sources. Maintain a dated mapping from traditional subjects/outcomes to modules and units, with prerequisites, core/elective status, gaps and intentional revisits. Titles alone do not prove coverage. Distinguish required breadth from specialist electives.
- Work stage by stage and one module at a time, reviewing with the learner before moving to the next. Do not generate all unit outlines or lesson materials in bulk.
- Module previews include purpose, learning outcomes, prerequisites, all units and scopes, expected workload and assessment plan. Allocate 10 notional hours per internal credit across all required work; the allocations must reconcile.
- Populate actual teaching only after explicit enrolment, carefully developing one lesson or a smaller portion at a time. Require self-contained explanations, incremental examples and practice, verified diagrams and captions, free curated resources, and accurate history/anecdotes where they support learning.
- Clearly distinguish proposed outlines, approved outlines and available lessons. Keep enrolment, submissions, actual hours and demonstrated attainment private. No award is issued without its assessed evidence.

- Structured curriculum sources live in curriculum/. The renderer in scripts/render-curriculum.mjs generates module and coverage HTML during build. Edit data/templates, regenerate, and commit both sources and generated pages. Preserve dated source limitations and unresolved coverage gaps; structural tests do not establish academic completeness.

## Timetables and assessments

- Use TMA (tutor-marked assignment), iCMA (interactive computer-marked assignment), EMA (end-of-module assessment), and final examination consistently. Written exam plans include handwriting, PDF scanning/checking and submission time. Do not pretend assessment materials or upload tools exist before release.
- Every module has a referenced OU-style presentation duration and pre-scheduled unit windows, assessments and revision. Credits specify workload, not a universal calendar length. M101 uses the documented 30-study-week foundation pattern; select references for later modules individually. Personal extensions/earlier dates remain possible and must preserve the baseline.
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

## Work sequence confirmed — 24 September 2026

Finish M101 design review, then design M102, M103 and P101 through Unit level one module at a time. After Stage 1 is coherent, assess readiness and begin M101 materials incrementally as authorised by the learner. This supersedes the earlier requirement to wait for a separate explicit enrolment before authoring. Enrolment and an actual start date still require the learner’s choice. Do not call the current M101 draft timetable an exact OU match: presentation reconciliation remains a pre-launch gate.

## Entry routes and revised programming remit — 24 September 2026

- Programme blueprint 0.2 retains two 120-credit Stage 1 routes: astronomy (A101, M102, M103, P101) and foundation (M101, M102, M103, P101). The astronomy route is the current working direction. M101 is optional full/selective preparation outside its degree allocation; readiness requirements remain mandatory. No enrolment, start date or exemption is inferred.
- Full M101 plus astronomy-route Stage 1 is 1,500 notional hours. Selected refreshers do not earn the full 30 credits; an additional module must not count twice towards degree awards.
- Current sequence supersedes earlier M102-next instructions: review revised M101 maths/Python remit, then design A101 units, followed by M102, M103 and P101 individually. Reconcile all dependencies and Stage 1 coverage before teaching release.
- M101 version 0.5 proposes 48 integrated mathematical computing hours within its 240 unit hours, retaining 60 module-wide hours and 300 total. This is a revised allocation requiring workload review, not additional work or empirically validated timing. Preserve abstract practice and use physics where relevant.
- Scientific programming progresses from learner-written foundations/debugging to AI-change review and bounded agent workflows. Preserve learner understanding, specifications, diff review, independent checks, reproducibility and ability to undo changes. Agent-trace critique does not demonstrate hands-on agent operation. Verify current free tools at authoring; no paid AI access required.
- A101 currently has only a public boundary brief, not a unit outline or approved schedule. It applies physics to astronomical evidence; P101 owns first physical-law explanations, M101 owns preparation, and later astrophysics owns deeper theory. Exact prerequisite units and all 300 hours must be allocated before approval.
