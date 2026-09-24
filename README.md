# LibraUni

Public website for an independent physics education. The curriculum and full visual identity are still being developed. This initial release provides a private study desk, notebook, account connection and progress infrastructure.

## Develop

Use Node 24 and pnpm 11.19.0. Run `pnpm install --frozen-lockfile`, `pnpm dev`, `pnpm test`, and `pnpm build`.

Security tests in `security-tests/` run against a local Firestore emulator with project ID demo-librauni. Use Java 21 and Firebase CLI, then run `firebase emulators:exec --only firestore --config firebase.test.json --project demo-librauni 'pnpm test:rules'`.

## Publishing

The main-branch Pages workflow tests and builds the site and publishes only dist/. It never publishes this repository's raw configuration files as a website directory. Firebase web configuration is intentionally public. Firestore access is restricted by deployed rules to the explicitly allowed GitHub identity and matching Firebase user ID.

## Private data

Never commit personal study records, responses, assessments, credentials, or database snapshots here. Their separate home is the private LibraUni/librauni-study repository and Firebase project librauni. Only ordinary Firebase client configuration belongs in this repository.

The website saves notes transactionally with a revision check and immutable history. Unsynchronised drafts are kept in local browser storage, separated by user ID. They are not cloud backups. Lesson completion is distinct from server-managed assessment evidence; no curriculum or completion percentage is fabricated when the lesson catalogue is empty.

## Licence

LibraUni uses a split licence. Course materials and site text are CC BY-NC-SA 4.0 unless a page states otherwise. Website source code is MIT-licensed; see LICENSE-CODE. The LibraUni name, logo, black-hole mark, wordmark, visual identity, private learner records, answers, marks, tutor notes, credentials and database backups are reserved and excluded from those licences.

## Backup and recovery

Daily backup automation runs in the private study repository with short-lived, read-only Google credentials. Recovery instructions and verification evidence live there. The public website links to the private backup folder; it does not expose backup contents or claim that a schedule is proof of a successful backup.

## Curriculum sources

Edit `curriculum/m101.js` and `curriculum/coverage.js` for structured outlines and the dated source/coverage register. `scripts/render-curriculum.mjs` generates their HTML pages during `pnpm build`; change templates there rather than editing generated pages. Commit generated source pages alongside their data. Tests check workload totals, prerequisite order, outcome/assessment references and audit source references. These checks validate structure, not academic sufficiency.

M101 preview 0.1 is awaiting learner review. The initial MIT/Imperial comparison is a subject-level register with documented evidence limits and unresolved gaps; it is not a completed degree equivalence audit. Develop no next module before review, and no lessons before explicit enrolment.

## Module planners and degree calendar

`curriculum/schedules.js` is the module registry. Every new module needs a source-supported presentation length (not a universal credits-to-weeks conversion), stable event IDs, version, baseline week ranges, workload, assessment type and prerequisite unit IDs. Required event hours excluding explicitly included checkpoints must total credits × 10. Use TMA, iCMA, EMA and final examination labels. Publish real resource links only when available. Keep modules non-enrollable until reviewed and opened.

`src/schedule.js` provides shared civil-date logic for module and degree views. `src/planner.js` mounts on a `data-planner` region. The degree calendar defaults to enrolled modules; planned modules are opt-in. Public undated previews need no sign-in. Dates can be previewed anonymously but reset on sign-in/reload. Signed-in plans auto-save to owner-only Firestore `planner/main` with matching immutable `plannerHistory/{revision}` documents, optimistic revision checks, local draft recovery and explicit conflict handling. Date changes never create attainment or marks. The desk export includes both collections; the existing recursive daily backup includes them automatically. A downloaded JSON is a portable recovery copy; a tutor can validate/restore it through the private recovery process (no import UI yet).

Do not change a schedule silently after enrolment: increment `scheduleVersion`, retain stable IDs, and design a reviewed migration for stored plans. A version mismatch blocks overwrite. Keep original baseline dates visible. Run `pnpm test`, `pnpm test:rules` with the local emulator, and `pnpm build`; the Pages workflow also runs emulator security and persistence checks before deploying. Rules deploy separately with Firebase CLI. Recheck module/degree views, expanded items, date changes, availability, mobile layout and private persistence when modifying planner behaviour.
