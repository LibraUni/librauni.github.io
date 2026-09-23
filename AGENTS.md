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
