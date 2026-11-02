# Sprint 3.5 — Unknown Multi-File App Reliability / SPEC (2026-11-03)

Status: DESIGN CONTRACT / implementation and real unfamiliar-App E2E require separate evidence. Applies only to Design PR #45 and Build PR #419; no Sprint 4, merge, or Production.

## Purpose and truth boundary
The 9/9 previously frozen **distinct published Staging samples** demonstrate completed known-sample E2E, not a reliability guarantee for unseen full-stack applications. Do not count their free reruns as novel-app progress. A generic creator must support original-language intent -> durable multi-file source -> isolated build/test -> independent browser + backend/database evidence -> verified immutable Blueprint -> consented share/reopen, with per-job caps and resumable progress.

## Five universal capabilities to close
1. **Multi-file full-stack**: persist every source path/version, front-end and backend contracts, schema/migrations, environmental dependencies, and a reviewed capability/permission manifest; no code-type/game hardcoding. Unavailable backend/dependency capability must be an explicit UNSUPPORTED result, never READY.
2. **Durability**: exact owner/key/idempotency, immutable project and tool-call hashes, saved response IDs, revisions and checkpoints. Browser disconnect, timeout or ambiguous remote call recovers saved state without a new paid dispatch.
3. **Sandbox execution**: only verified project artifacts in a network-denied isolated workspace; strict allowlisted operations, bounded CPU/memory/time/network and saved build/runtime/console diagnostics. A green build alone is not a verified app.
4. **Independent multi-phase QA**: freeze all original prompt-derived requirements *before* code; verify each source-quoted criterion with real actions and observable outcomes (not static presence). Stateful use cases must support a **reload action** within the SAME independently isolated browser context followed by assertion, preventing an in-memory-only implementation from passing persistence. Cross-user isolation needs a distinct browser identity and a database observation; do not treat reload alone as proof of server persistence. Missing or unsupported QA primitives fail closed as UNTESTED/NEEDS_HUMAN, not PASS. Immutable signed QA receipts must match original prompt, project hash, build hash, and browser execution; publication requires a separate F02 admission.
5. **Bounded repair and strategy change**: repair from saved failed criteria and real diagnostics, don't silently rewrite requirements. Stop after three non-improving repairs to re-interpret/root-cause; after eight steps preserve checkpoint and change strategy only after explicit renewed human budget. Never rerun ambiguous paid model/container calls; never publish a failed or inconclusive candidate.

## First general acceptance primitive: QA reload
- Add the exact JSON action `{"action":"reload"}` with no role/name/value/URL fields. Maximum existing step bound stays unchanged. Reject arbitrary navigation or unsupported parameters.
- Independent built-project Chromium runner and isolated trusted browser QA worker execute a **same-page reload** with a bounded DOM-ready wait, keeping the same browser context and existing safe network interception. A runtime exception or missing content fails the criterion.
- A criterion such as click Add -> reload -> expect stored item (via `text_appears` anchored before actions) must PASS only if the item survives reload. A counter held only in JavaScript memory must FAIL. No model call is required for this independent regression.
- Legacy `srcdoc` single-file sandbox cannot guarantee origin persistence; it must reject/FAIL a reload criterion, not simulate persistence or claim PASS.
- QA planning rubric should request reload evidence for "refresh", "persist", "saved", "remember", "after reopening" requirements, and explicitly flag **cross-device/multi-user persistence** as requiring additional backend/identity evidence.
- Prior immutable passed samples remain untouched. Report implementation and unknown-product PASS separately.

## Next unfamiliar-App release gate (not yet fulfilled)
One fresh, genuinely unspecified **multi-file front end + backend + real PostgreSQL** request, frozen before generation with its own business rules, invalid input, create/update/delete, refresh, separate-identity isolation and permission checks. Require one owner-approved new idempotency key and a finite cap, source/version/SQL/HTTP logs, Docker build, independent browser and DB evidence, share HTTP201+ACTIVE+hash, a second fresh recipient Chromium, and zero AI calls on reuse. Negative controls deliberately missing persistence and breaking permissions must FAIL. No novel-app percentage can be invented before those proofs exist.
