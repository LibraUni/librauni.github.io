# Personal learning evidence — release 1, 26 September 2026

## Scope and decision

Owner-only snapshot management, actual file preservation, selective disclosure,
and optional wallet-approved Ethereum mainnet anchoring. No additional learner
accounts, accreditation, certificates or autonomous payments. Paid anchoring was
explicitly accepted as an optional exception to free required study resources.

Existing journal automation remains tutor-owned. A snapshot is an explicit copy
of the academic timeline currently returned by the journal plus attached files;
it cannot capture absent external conversations. Enrolment stays closed until
teaching/assessment release readiness. Opening the page or creating a snapshot
is not academic completion, assessment or enrolment.

## Protocol

EAS SDK PrivateData 2.10.0 generates independently salted leaves, using the SDK's
OpenZeppelin StandardMerkleTree encoding. Each leaf is an exact string containing
canonical JSON. Fields are committed as whole journal entries or file manifests.
Original files use SHA-256 over their exact bytes and are backed up privately,
not just hashed. A manifest commits preparation time, counts and previous root.
Snapshot chain continuity is linkage, not proof that no history was omitted.
Full historic snapshots remain necessary for earlier file recovery.

Browser signatures bind the exact root, format, wallet and mainnet chain. This
proves control of a wallet, not independent learner identity. A separate explicit
action calls timestamp(bytes32) with zero ETH value on the existing mainnet EAS
0.26 deployment 0xA1207F3BBa224E2c9c3c6D5aF63D0eb1582Ce587. Network fees apply.
No new contract, schema registration, token approval, or automatic transaction.
Only the root and public transaction metadata leave private storage. Secret salts
and personal information are never placed on-chain.

Transaction references are downloaded immediately and saved privately. Verification
checks mainnet, exact contract/calldata/root, signer, zero value, successful receipt,
canonical block, EAS timestamp and finalized block height. Included but unfinalized,
network failures, missing transactions and mismatches have distinct honest outcomes.
No “verified academic correctness” result exists. A downloadable standalone verifier
uses official EAS/ethers libraries and an independently chosen Ethereum RPC. The
public web verifier is a LibraUni convenience interface, not an external verifier.
This is explicitly not Blockcerts; formal credential issuance remains future work.

## Storage and recovery

Immutable users/{uid}/evidence/{rootWithout0x} manifests; bounded parts subcollection;
immutable anchors subcollection; transactional evidenceState/main head. Normal
browser writes preserve sequencing; concurrent stale preparation is rejected. Saved
payloads are restored, hashed, reconstructed and files verified before success is
reported. Snapshots have an 8 MB serialized UTF-8 cap, 100,000-character chunks,
maximum 80 chunks; attachments up to 3 MB per snapshot. Larger archives require a
future streaming/batching extension; failures are explicit, never truncated.

Firestore security preserves the existing owner identity restriction, prohibits
snapshot/part/anchor replacement and deletion, and protects the chain head. Receipt
payloads are user-authored and must be independently checked, not trusted as facts.
The existing recursive private backup traverses new subcollections automatically.
No profile, administrative snapshots or website-planning conversations enter the
academic package. Downloads expose secrets only to the downloading owner; selective
exports omit unselected records, files and salts but disclose manifest metadata.

## Verification performed

51 application tests including proof interoperability, hidden-leaf exclusion,
file tampering, JSON restore, predecessor commitment and wallet/transaction checks.
10 local Firestore emulator tests including multi-part evidence round-trip,
idempotent retries, stale-head rejection and foreign-access/write rejection.
Production build and browser public verification tested with synthetic valid and
altered packages: valid unanchored data remains explicitly unanchored; corruption
fails. No paid live Ethereum transaction performed. User wallet signing/broadcast
and first real mainnet confirmation remain live acceptance steps controlled by the
owner. No testnet or synthetic record is inserted into the private academic journal.

## Sources checked

- https://github.com/ethereum-attestation-service/eas-sdk (PrivateData, timestamp)
- https://github.com/ethereum-attestation-service/eas-contracts (mainnet deployment)
- https://github.com/blockchain-certificates/cert-verifier-js (separate credential format)
- https://ethereum.org/developers/docs/gas/ (transaction fees)

Implementation note: SDK 2.10.0's root ESM entry has a lodash named-export issue in
Node24. eas-private.js selects its supported CommonJS entry for Node; Vite builds
the browser ESM branch. Tests exercise the same SDK encoding, not a copied hash
algorithm. Dependencies are pinned by the committed lockfile.
