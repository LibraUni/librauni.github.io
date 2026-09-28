# M101 first production teaching release

28 September 2026. The learner approved the complete local reading copies and explicitly authorised publication and website verification.

The module introduction now belongs at `/learn/physics/stage-1/m101/`, the Unit 1 introduction at `/learn/physics/stage-1/m101/b01/u01/`, and the complete seven-section Lesson 1 replaces the temporary sample at its existing `l01/` address. Original approved prose, diagrams, six worked examples, seven activities and their feedback are preserved. Source fragments are in `content/m101/`; the renderer is `scripts/m101-teaching.mjs` and scoped presentation is `src/teaching.css`.

The unit lists all five approved lessons. Lessons 2–5 are honest outline destinations, not fabricated teaching. Module/block/stage descriptions reflect the partial release. Unit 1 remains incomplete. Its full exercise set and reference resources remain due at its conclusion. The lesson retains its three-hour allocation, including the unit introduction; the unit retains 18 hours. This release does not open enrolment, change private progress or implement M101 progress persistence; the existing M100-only progress script is excluded from the three reading pages.

The shared site header, licence badge, full ancestor breadcrumbs, sticky section navigation, narrow-screen menu, theme switching and native feedback disclosures are retained. Old sample links to module/unit introductions redirect to the new locations; old section anchors remain useful aliases. The obsolete sample exercise anchor leads to the lesson synthesis, without preserving demonstration exercises as a production requirement.

Validation: 75 automated tests passed, including ancestor/child navigation, production content/IDs, assets, future outline status and absence of inappropriate progress controls. The production build passed; existing evidence-bundle size and browser-externalisation warnings remain unrelated to this teaching change. Browser checks cover all three reading pages at 1440, 900, 390 and 320 pixels, hierarchy browsing, all six lesson ancestor links, sidebar tracking, hidden/keyboard-operated feedback, image decoding, light/dark presentation, mobile contents and legacy links. A same-document hash-change redirect defect was found and fixed before release. Representative figures, captions and examples were visually inspected in the actual site styling.

The approved material was previously calibrated against the supplied MST124 material, OpenStax University Physics §2.2 and Active Calculus §9.2. Private OU files are not published. Image credits and separate reuse terms accompany the NASA photographs and public-domain Descartes portrait. Original material follows the agreed CC BY-NC-SA policy with branding excluded.

Deployment and a repeat of the browser checks against the public site are the final release steps. Later teaching remains incremental; this release does not author Lesson 2.
