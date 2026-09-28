# M101 temporary website sample

The owner explicitly authorised publication of the approved illustrated sample on 28 September 2026 to test its placement, breadcrumbs, browsability and side panels. This is a narrow exception to local-only development, not a release of actual degree teaching.

Route: `/learn/physics/stage-1/m101/b01/u01/l01/`. The module and unit pages link to it; the full ancestor breadcrumb and shared reading rail are used. The page labels itself a temporary sample, is noindex, has no progress controls or study persistence script, and does not change enrolment, schedules or completion availability. Reading the sample creates no learning records.

Content is isolated in `content/samples/m101-opening.html`, integration in `scripts/m101-sample.mjs`, presentation in `src/teaching-sample.css`, and images in `public/teaching-samples/m101/`. Source credits and reuse links remain in figure captions. Only original teaching and the three previously verified reusable images are published; private OU materials and local editorial drafts are excluded. The shared licence footer remains, with an additional notice in the sample clarifying third-party image rights.

The five closing questions are demonstration exercises, not a whole-unit set. Actual units will use appropriate in-text activities and a substantial closing exercise set covering the entire unit. Replace the sample at this route when actual content is authorised and ready; update its parent links, rail, status and any production progression integration then. Do not treat sample anchor IDs as released curriculum/progress IDs.

Validation: production build; repository unit/navigation tests; browser traversal from module through block and unit to sample; all six ancestor links; section navigation/current-section tracking; mobile rail expand/collapse; deep links; image decoding; feedback disclosures; desktop/mobile visual checks; light/dark readability. The publication workflow also gates deployment on Firestore emulator security tests and the full test/build jobs. No persistence code is changed.
