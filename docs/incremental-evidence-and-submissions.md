# Incremental archive and formal submissions

User requirements agreed 26 September 2026. This is the next implementation
contract, not a claim that the controls described below are already deployed.
Current v2 generates cumulative snapshots and full downloads with predecessor
links. Dedicated formal file-submission controls and incremental downloads are
not yet implemented. Preserve the existing full snapshot and all its proofs.

## Two academic intake routes

### Tutorial material: tutor-managed

During an actual tutorial, proactively preserve every learner-supplied academic
file: activity, draft, code, sketch, notes, image, PDF or other academic artefact.
Do not require another upload or a manual archive request. Classify its module,
block/unit/lesson or assessment relationship where known, activity, artefact type,
draft/final status, source conversation and available event dates. If uncertain,
preserve it as unclassified tutorial material and refine classification later.
Never infer that an assessment-related draft is a formal submission.

Use the private original archive and journal tools. Preserve exact source bytes,
record limitations when the original is unavailable, and verify restoration.
Retain versions; append classifications/corrections rather than rewrite prior
proofs. Do not execute attached code simply to archive it. Do not classify an
administrative attachment as academic progress. Preserve grading feedback and
actual assessed results when applicable, never invent a mark or certificate.

### Formal work: explicit Submit action

Released TMA, EMA and examination pages must expose a dedicated Submit control
bound to that assignment and its version. iCMA responses use their own explicit
final submission/receipt, including files where the task requires them. A generic
upload button or a tutorial attachment must not silently count as formal submission.

Private upload staging is distinct from submitted work. On Submit, preserve all
originals, verify hashes, then record an immutable submission receipt with module,
assessment ID/version, attempt, exact file inventory and server submission time.
Provide a visible receipt and distinguish incomplete upload, draft, submitted,
under review and feedback released. Idempotent retries must not create duplicate
attempts or overwrite earlier versions. Resubmissions append and retain history.

The tutor retrieves the private submitted inventory for marking and adds linked
feedback, criterion judgements and marks to the same archive/journal. Check the
submission queue when performing tutoring/marking work. Do not imply a static web
button automatically starts an AI marking session or grants background access.
Do not open formal submissions before assessment and enrolment release gates pass.
Keep owner-only access and the existing free-study constraint.

## One growing archive, incremental monthly batches

- Treat the existing full snapshot as the initial baseline. Do not reissue it,
  change its root, discard its proofs or falsely backdate later anchors.
- Use a persistent archive identifier, sequential batch number and a committed
  predecessor root. Every new batch commits new/revised academic records plus
  its link to the preceding batch. Preserve all historical versions.
- Compare stable record identities and normalised content hashes, not newly
  generated salts, snapshot dates or incidental property order. Grade corrections,
  feedback additions and reclassifications are appended revisions with links to
  their predecessors. Missing/deleted source records must never silently erase
  previously archived material.
- Routine generation downloads only new material and appended corrections since
  the last successful archived batch, together with proofs and compact linkage
  metadata. Reuse immutable original blobs by content hash: do not repeatedly
  download an unchanged notebook/PDF because a new feedback record refers to it.
- If no academic content changed, report that fact. Do not generate an empty
  monthly proof, duplicate the archive or suggest paying an unnecessary fee.
- A separate Download complete archive action reconstructs every batch and all
  original bytes/history into one organised archive with a readable overview.
  Month boundaries are revisions of one archive, not unrelated portfolios.
- Individual/category selected exports remain self-contained: include the chosen
  original bytes and needed proofs even if those bytes were first archived in an
  earlier batch. Recipients must not need unrelated private records. Chain-link
  proofs may expose necessary archive linkage; do not expose unrelated fields.
- Distinguish batch continuity verification from item verification. Check missing,
  reordered, substituted and conflicting batches when verifying a complete archive.
  An isolated item may verify while the supplied history is incomplete; say which
  property was checked. Never label an incomplete reconstruction complete.
- A saved proof batch and a paid Ethereum anchor are different events. One can
  generate/download without paying. Optional later anchoring may commit the latest
  chain head, which transitively commits earlier batch roots; it does not invent
  earlier independent timestamps for batches not previously anchored.

## Required implementation checks

Legacy baseline migration without loss or false changes; stable identity and
cross-runtime timestamp/value normalisation; unchanged re-generation; new and
corrected entries; identical original deduplication; preserved past versions;
restoration after device loss from baseline plus deltas; complete export; selective
proofs with originals from older batches; missing/broken/forked batch chains;
failed/interrupted upload and generation; idempotent receipt/save retry; stale-head
conflicts; private reads and bounded submission writes; independent verifier
compatibility; backup coverage; and truthful UI availability. Do not call the
feature complete until these paths and actual publication have been checked.
