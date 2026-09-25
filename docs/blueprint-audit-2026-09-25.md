# Programme blueprint audit — 25 September 2026

Disposition: inventory complete; blueprint incomplete; lesson production on hold. This audit changes the design workflow, not credits, enrolments, stable curriculum IDs, assessments or saved dates. No new module outline is approved by this document.

## Evidence inspected

- `curriculum/stage1.js`: fixed four-module Stage 1 and optional M100 boundary.
- `curriculum/m100.js`, block1/2/3, computing, audit and rubric sources: three approved blocks, twelve units, workload and completion policy.
- `curriculum/a101.js`: ten provisional units, outcome/assessment proposals and unresolved Semester 1 prerequisites; no blocks.
- `scripts/render-curriculum.mjs`: M101/P101/M102 previews are role placeholders, not unit outlines.
- `programme/index.html`: later-stage module/pathway proposals, 120 credits per stage, award intentions.
- `curriculum/coverage.js`: 18 coverage rows and four open gap groups. MIT/Imperial comparison remains preliminary with its recorded source limitations. This inventory is not a fresh external curriculum verification.

The public inventory and dependency decisions are maintained in `curriculum/blueprint.js` and rendered on the programme page. No available lessons should be inferred from approved scopes or a successful orientation exercise.

## Required planning resolution

1. Entire M100 Block 1: all lessons in U01–U04, each with purpose, outcomes, prerequisite links, estimated time, mathematical/Python balance, practice/evidence and next-lesson handover. Reconcile to unit budgets 16/18/22/24 hours, total80; integrated Python14 hours. Do not add lesson totals on top of those budgets.
2. Opening lesson: all sections and their functions; then write one section at a time.
3. M100 B02/B03: preserve approved unit-level design (90/70 hours). Review dependencies and draft downstream lessons only where needed to constrain Block1. No requirement to author every distant lesson now.
4. Entire Stage1: blocks and all units for M101/P101/M102/A101, outcomes, entry requirements, assessment evidence, hours and semester co-requisites. Each module300h; each concurrent pair600h. Calendar duration remains unresolved and must use explicit OU references rather than infer weeks from the word semester.
5. Stages2/3: provisional module/pathway map with core/specialist boundaries, prerequisites, assessment/project roles and block sketches needed for credible capacity/progression decisions. Do not invent detailed units in bulk or declare distant curricula settled.
6. Degree: map introduction, practice and assessment of essential strands with source evidence and unresolved gaps. Optional M100 and specialist options cannot be sole homes of compulsory outcomes.

## Priority decisions and acceptance evidence

| Decision | Relevant register rows | Required evidence before closure |
| --- | --- | --- |
| Calculus / linear algebra / ODE progression | C02–C04 | Explicit module-unit outcomes, prior teaching and first physics application; coordinate concurrent modules. |
| Mechanics, waves and fields | C05/C07/C08 | Separate P101 introductory outcomes from P201/P301 depth; identify maths dependencies and assessed evidence. |
| Analytical mechanics | C06 / G01 | Compulsory minimum and feasible hours in a later-stage module/block; advanced options do not close this gap. |
| Thermal/statistical, solid-state, nuclear/particle foundations | C09–C12 / G01/G02 | Core homes across all paths and a capacity check of P201/P302; no unbudgeted additions to broad titles. |
| Probability, uncertainty, computing and communication | C13/C14/C16 | Required Stage1 teaching/assessment homes for learners entering without M100; subsequent development in X201 and projects. |
| Practical experience | C15 / G03 | Distinguish data/simulation outcomes from apparatus and collaboration; retain unmet practical outcomes honestly. |
| External source depth | G04 | During each module design, retrieve detailed primary syllabi and map outcomes, not titles alone. Preserve entry-year and retrieval limitations. |

## Working order

Next substantive deliverable: **M101 block-and-unit proposal**, including an interface sheet for P101. Review it with the learner before proceeding to P101. Then reconcile Semester1; define M102; revise A101 and reconcile Semester2. Use later-stage requirements to constrain these proposals without pretending the broad destinations are approved detailed scopes. Review the Stage2/3 module-level map and capacity questions, close the Stage1 blueprint audit, then prepare the full M100 B01 lesson map and opening lesson section map. No teaching section is authorised for release before these blueprint gates are reviewed.

The M101 proposal must include: purpose and boundaries; entry/exit outcomes; block membership for every unit; unit scope, prerequisites, hours and intended evidence; assessment/support hours; independent versus assisted computation; traditional-course coverage and source limits; P101 handover points; links to M102/M201; explicit unresolved decisions. A proposed block title alone is not sufficient.

## Inside-out review of this audit

No lesson content, numerical exercises or learner-specific material created. Immediate fit: inventories actual sources and distinguishes confirmed architecture, approved scope, provisional outlines and absent details. Wider fit: protects fixed credits and core breadth; exposes prerequisite ownership before authoring. Forward handover: M101 proposal first, not bulk lesson generation. Curriculum planning is not an academic attainment event and must not be logged as one.
