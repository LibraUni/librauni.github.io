# Tutor-managed student records and selective proof

Release contract, 26 September 2026. The v2 workflow supersedes manual v1
attachments and separate Prepare/Save steps. Legacy snapshots remain readable.

## Responsibility and scope

The tutor preserves each supplied academic original privately, reviews and
corrects the work, records an actual mark/rubric when applicable, and adds the
academic journal entry. Learners are not responsible for routine archival.
Never infer grades, mastery, completion or awards from a page visit or from
archiving a file. Certificates enter the archive only when actually issued
under the applicable assessment policy; this feature itself issues none.

Keep submissions, activities, assessment records, feedback, skills, milestones,
certificates, journal entries and academic tutorials categorised. Administrative
conversation, profile data and general private notes are excluded. Preserve
available academic transcripts as originals when available; label gaps honestly.
A full snapshot cannot capture an unsaved external conversation or an original
that the tutor has not archived. The deterministic web button does not summon an
AI tutor or perform grading: tutoring and archival happen before generation.

## Tutor procedure

1. Preserve original bytes outside public Git, in the private study repository.
   Retain earlier versions; do not replace an already assessed submission.
2. Prepare a private JSON manifest for `scripts/archive-student-records.mjs`:
   `files` contains ref, path (relative to manifest), category, module, activity,
   source and optional occurredAt. `records` contains category, module, fields
   and optional fileRefs referring to those refs. Store marks, criteria, feedback,
   assistance conditions, assessment version, event dates and corrections as
   distinct meaningful fields. Include references to relevant journal entries.
   Never invent missing dates, transcripts or evidence.
3. Run the official-CLI-authenticated uploader with --write. It uses immutable,
   content-derived identifiers, verifies existing data on retries, writes original
   chunks, restores/checks all bytes, then publishes each file in the catalogue.
   Incomplete uploads are not listed. Register records publish after their files.
4. Use the existing `archive-academic-session.mjs` for the substantive learning
   entry. Keep transcripts distinct from summaries. Verify upload and preserve
   private copies in Git. Correction records link prior IDs; no destructive edits.
5. Confirm the recursive private backup includes catalogue, register, original
   chunks, journal, snapshots and anchors. Do not log website work as learning.

The manifest and original data must never be committed to this public repo.
The public uploader contains no credentials. It requires an existing authorised
Firebase CLI login, FIREBASE_AUTH_MODULE pointing to that CLI's auth module, and
its configured XDG_CONFIG_HOME where applicable. Client browser writes to
academicFiles and academicRecords remain denied; owner-only reads are allowed.

## One-button generation

“Generate proof of full student records” loads all pages of academic journal /
progress / attempt / assessment / academic planner-completion history, the tutor
register and original catalogue. It verifies every original and rereads inventory
to detect concurrent changes. It builds and verifies a complete ZIP, saves the
immutable commitment and restores it from Firestore before offering download.
No optional attachment picker or separate manual save remains in routine use.
A failure stops generation instead of silently issuing a partial full package.

“All” means the saved academic inventory at generation time, including correction
history. It does not assert completeness of all learning outside the system.
Current source-release hashes describe the current public teaching release, not
necessarily the teaching version used in an older activity. A snapshot never
enrols the learner or awards credit; M100 enrolment remains closed.

## v2 format and privacy

`librauni-student-records-v2` uses official EAS PrivateData salted Merkle trees.
Each academic record field is an independently provable leaf. Original file
leaves commit the SHA-256 digest of exact bytes and classified metadata. Fields
carry module, category and stable record identity; no real-world learner profile
is added. Structured website assessment fields are retained separately as well
as their readable journal representation. Files are held separately from the
compact immutable snapshot index and restored by immutable asset ID.

ZIPs have proof.json plus category/module/record folders with readable fields
and original bytes. Every item has a .proof.json; every category has a
CATEGORY-PROOF.json. Full ZIPs also contain private-recovery.json (all fields,
salts and snapshot context). Selected exports omit recovery data and unselected
leaves. The context leaf is not automatically disclosed: a single grade need not
reveal journal text, feedback, counts, previous root or other salts. Select extra
context fields deliberately when needed to interpret a grade or record.

A single field or file, whole category, or arbitrary selection verifies against
the same root. A file must travel with its proof. The web verifier accepts a ZIP,
or a JSON proof with accompanying originals, and fails on missing/altered bytes.
ZIP readable fields must match committed values. JSON field proofs display the
committed values; do not treat an unverified separate summary as authoritative.
The separately runnable verify.cjs uses official packages and no LibraUni backend.

Current safeguards: 150 MB per original, 250 MB ZIP, 8 MB snapshot/proof index,
80 index chunks. These are explicit bounds, not unlimited archive claims.
Oversized work requires a reviewed split/streaming extension, never truncation.
Firestore free quotas and backup Git size need review as real volume grows;
required study must remain free. No new paid storage service is enabled here.

## Optional Ethereum timestamp

The user accepts optional mainnet transaction fees. The browser signs a message
binding wallet, format and root, estimates fees, and requests a separate explicit
wallet-approved transaction to the existing mainnet EAS timestamp(bytes32)
contract 0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587. No new contract or schema is
deployed. Private text, originals and salts stay off-chain. Receipts are saved
and downloaded immediately after broadcast; uncertain submission must not trigger
an automatic paid retry. Receipt recovery checks the existing transaction.

An anchor proves integrity and existence by chain inclusion, not the truth of
academic claims, authorship, identity beyond wallet control, an accredited award,
or completeness of undisclosed records. Verification checks successful exact
calldata, sender, contract, chain, canonical receipt, EAS timestamp and finality.
Unavailable network checks are unconfirmed. This is not Blockcerts or an
independently issued tutor credential. No paid transaction belongs in testing.

## Validation

Test v1 compatibility, per-field privacy, original and readable-content tampering,
ZIP restoration, independent category/file verification, oversized/missing inputs,
concurrent inventory changes, snapshot predecessor conflict, server persistence,
catalogue pagination, browser write denial and foreign read denial. Maintain
private backup/restore coverage. Automated tests establish software properties,
not academic completeness or credibility of awarded marks.


## Required completion certificates and private archival — 26 September 2026

Certificate issuance is a required tutor-managed completion step, not an optional learner upload. After checking the published assessment and completion criteria, issue a designed LibraUni certificate for every completed module (including full M100, outside degree credit), each completed stage, the full 360-credit programme, and every additional completed Stage 3 specialist module. Selected bridge refreshers do not earn a full M100 certificate. Stage awards retain the programme's cumulative requirements; additional options earn separate certificates without double-counting degree credits.

The final programme certificate records completion of the BSc (Hons)-level Physics programme, clearly as an independent, non-accredited LibraUni award, not a recognised BSc degree. Stage 1 uses Certificate in the Foundations of Physics; Stage 2 uses Diploma in Physics. Final typography/design and any classification require approved criteria before issuance, never invented marks or third-party endorsement.

For each award: verify supporting assessment evidence; create a branded PDF with learner name, award/module title, scope, internal credits, actual completion and issue dates, unique award ID, issuer and version, and grade/classification only when applicable and evidenced. Privately archive the original PDF and a structured award record under `certificates`, link its assessment/transcript evidence, verify byte-for-byte restoration, and add the substantive award milestone to the academic journal. Include both certificate bytes and record fields in subsequent full proof snapshots and selective exports. Do not alter older snapshots or automatically pay for anchoring. Corrections/reissues preserve originals and link superseding/revoked status and reason.

Before the first eligible completion, implement and verify the issuance/template/status workflow with clearly non-issued fixtures. Existing archive and proof support is not a completed certificate issuer. Completion close-out must check certificate generation, private archival, restore verification and inclusion in the next proof; do not wait for the learner to ask. An empty certificates category is correct until actual issuance. This policy update is administrative and is not an academic journal event.
