# APPf2 — AI Code Builder → Blueprint v2 → Verified App Card (Design Delta H-001)
Date: 2026-10-28
Status: **Working design proposal, product-owner requested**. Not a frozen Phase 1 baseline, not deployed functionality, no Production permission.
Build target: NFF98/appf2-build PR #419 (Sprint 3.5 product-priority spike / incremental implementation); full hybrid production launch needs separate evidence.

## 1. Product outcome

**One natural-language request → one general-purpose AI Code Builder → one Blueprint v2 → one verified, reusable App card.** New Apps should not be routed into separate generation methods based on whether their category is a game, financial tracker, form or animation. AI writes real project code; safety, supported environments and required permissions determine *how it can be executed*, not whether the creative task is permitted by a catalog of prebuilt components.

**Blueprint v2 is an immutable envelope and reference to the built App, not a restricted UI/component instruction format.** It records version, immutable artifact hashes, permission/runtime profile, creator ownership, sharing rules and **separate per-user data-state references**. Do not embed a user's private mutable data in a shareable bundle.

**Legacy compatibility only:** existing `NATIVE_BLUEPRINT` F02-v1/F03 Apps must continue working, but **are not a user-facing second creative engine** or a basis for routing new requests by App type. The new default path produces `CODE_ARTIFACT` Blueprints. Existing F05/My Apps/gallery stays a single unified product.

Opening any published App invokes zero **AI generation** calls; hosting/storage/approved external API services may still have costs.

Prohibited shortcut: a model's JSON/TS string, merely a ContentHash, a passed unit test, or an attached ZIP is **not** an executable admitted Artifact or a public share.

## 2. Architecture (F01/F02/F03/F05/F06/F16)

```text
Natural request (e.g. 十八啦多人骰子遊戲)
  → F01 understanding / consent & bounded AI budget
  → ONE general AI Code Builder creates project source and assets
  → prepare DRAFT Blueprint v2 metadata / execution requirements
  → isolated Build Sandbox compiles project + runs security and browser tests
      ├─ fail: preserve intent/source, bounded repair ≤2, no READY card
      └─ success: immutable built files, hashed manifest and test evidence
  → F02 v2 checks artifact bytes, provenance, runtime permission and tests
  → SEAL the final Blueprint v2 with exact admitted hashes and version
      (the draft is not yet a valid runnable/shareable Blueprint)
  → F05/My Apps creates an authorized App card and immutable share reference
  → F03 sandbox runs the approved program and restores only recipient state
  → F06/F16 edits produce a NEW artifact and NEW Blueprint version
      (original remains intact; compare and user chooses whether to accept)

Legacy v1 F02/F03 dispatch is strictly a backward-compatibility route for
preexisting native Blueprints, NOT app-category classification.
```

## 3. Versioned records and unambiguous hashes

**Do not silently widen existing v1 Blueprint schema.** Legacy `schema_version = 1.0.0` and `content_hash` remain bit-for-bit identical. v2 is the single default format for newly AI-generated Apps; the existing v1 reader remains only to reopen previously created Apps.

```json
{
  "schema_version": "2.0.0",
  "kind": "APP",
  "meta": { "title": "十八啦骰子遊戲" },
  "execution": {
    "kind": "CODE_ARTIFACT",
    "artifact_id": "sha256:<64 lowercase hex>",
    "manifest_hash": "sha256:<64 lowercase hex>",
    "entrypoint": "index.html",
    "sandbox_profile": "WEB_STATIC_V1",
    "host_protocol": "appf2-code-bridge/1"
  }
}
```

This is the **minimum envelope example**, not a claim that current F02 accepts it. Real schema requires exact allowed keys, creator provenance, trust checks, content-bound allowed permissions and release version. All unknown fields fail closed.

- `artifact_id`: SHA-256 of byte-for-byte immutable built output package, including paths and lengths in deterministic order; not source code, not a URL.
- `manifest_hash`: canonical JSON hash of manifest listing exact file path / mime / size / SHA-256, toolchain digest, SBOM/dependency lock, provenance, build/test report digest, declared permission profile, runtime compatibility version. Archive-level hash and each file hash both checked.
- `blueprint_hash`: SHA-256 of the **full canonical v2 envelope** including the pinned manifest hash and artifact ID. Unique version identity; no mutation.
- `source_bundle_hash` optional metadata, separately stored/restricted for F06/F16. **Never download source by public F05 read unless the creator explicitly enables source sharing.**
- DB stores immutable records and allowlisted references; bytes stored in private R2 (or equivalent immutable object store), not in PostgreSQL mutable JSON. F05 lookup checks live share status and artifact/Blueprint hash **on each protected read**, then grants short-lived access.
- No client-supplied external artifact URL; no executable code embedded directly in share links.

## 3.1 Most important engineering decision — do not constrain AI with Blueprint

The order the user sees is **AI Code Builder → Blueprint v2 → automatic verification → reusable App card**. In implementation, a **draft** Blueprint can exist before compilation, but the *final shareable Blueprint is sealed ONLY AFTER* the built artifact passes tests and hash admission. This prevents a failed or unbuilt model response from becoming a runnable card.

Code Builder may create different layouts, game rules and application logic using normal programming languages and frameworks. Blueprint v2 is not an allowlist of app categories or widgets. It is the stable packaging, ownership, versioning, permission and sharing contract for the finished code.

Supported execution profiles still matter: initially static client-side web code in a restricted sandbox. A multiplayer server, camera, third-party payment or unrestricted internet access requires a separately approved runtime capability/profile, **not a new special-case generator**. Unsupported technical requirements must be explained to the user before fees or publication.

**Universal-card invariant:** if a generated project has not passed the exact build/test/admission process, it is **not** a reusable published App. Once admitted, open/save/share/reuse operates on the exact version and does not pay for generation again. Editable source can be stored privately for later correction, while published static code and personal user data remain distinct.

---

## 4. Build Sandbox trust boundary

- One isolated workspace per build, with CPU/memory/wall-clock/disk/process limits, file/size/dependency limits, kill-on-timeout, output-size cap.
- Source and dependencies treated **untrusted**; no APPf2 DB, Hyperdrive, model keys, Cloudflare API token, client cookies, or project secrets in process/env/files/network.
- Dependency install only through controlled policy; block unsolicited outgoing traffic and private-address/metadata endpoints; audited egress/allowlist when needed.
- Build output static WEB_STATIC_V1 first; custom server/back-end or native devices remain **unsupported pending a separate execution profile**. Do not silently promise all generated applications can run.
- Tests: deterministic typecheck/build, path traversal and secret scanning, dependency/license checks, artifact integrity, browser interactive smoke tests with seeded fixtures; bounded at most two automated repair attempts before fail-closed.
- Compilation success != semantic correctness. Record real browser operations, resource/crash/timeout behavior and security decisions as separate evidence.
- Cloudflare Sandbox/Containers is a candidate implementation, not installed/deployed merely by this design. Current provider API and limits must be checked prior to rollout.

## 5. F03 sandboxed Web Runtime boundary

- **Never import/eval the built JS in APPf2 origin, Worker, React tree, or main document**.
- Strict **sandboxed iframe without `allow-same-origin`** for built static client, opaque origin. Explicit CSP (deny default network/connect, plugins, frames, top navigation, forms by default); no Worker bindings, no host token, no cookie, no host DOM or parent storage.
- Network permissions are capability grants through separately mediated/verified host APIs, default DENY. Opaque-origin browser fetch/CORS and isolation consequences must be tested.
- Host bridge uses `postMessage`: origin is opaque so **both MessageEvent.source and an unpredictable per-instance nonce/MessageChannel port** must be verified; allowlisted typed messages; version + max bytes + rate limit, no arbitrary eval or arbitrary method dispatch.
- State: each browser/user instance gets a distinct state namespace keyed by `share_id + blueprint_hash + user/browser identity`. Only consented bounded state values via typed bridge are stored; no publisher state leaks; `DO_NOT_PERSIST` never stored; never put sensitive values in public Blueprint or R2 static bundle.
- Same published code may be opened repeatedly with **zero F01/model calls**. Loading may incur normal hosting/runtime costs. Editing code requires a new version; card can choose its pinned version and cannot silently update.
- Crashes/timeouts/errors isolated to the frame and surfaced with retry/restore; one game cannot kill APPf2 Shell or another game.

## 6. Unified App card & versions

- Card metadata: public share ID (if ACTIVE), title, thumbnail (optional), `blueprint_hash`, `execution_kind`, `published_version`, safe origin/owner policy.
- Open flow: resolve share → authorize exact Blueprint v1 or v2 → fresh runtime admission → fetch *exact* immutable artifact by ID/hash with no arbitrary redirect → verify bytes/manifest → isolated instance → restore **recipient** state.
- F05 sharing is **explicit opt-in**; public readers cannot mint themselves a share from an artifact ID or code URL.
- F06/F16 code edits create new immutable bundle/hash; only promote after real tests; original card remains usable if generation or child admission fails. Before/after is a user decision, never a silent replacement.

## 7. Phase 3.5 execution gates (no per-game hardcodes)

| Gate | Proof (never substitute a model response) |
|---|---|
| H1 | v2 envelope + manifest schema validator accepts good pinned artifacts, rejects unsupported profile/paths/hash/unknown keys |
| H2 | same immutable built output can be referenced by a card twice with no builder invocation |
| H3a | opaque-origin iframe sandbox cannot access parent DOM/localStorage/cookies, outgoing network denied (early standalone browser proof) |
| H3b | authenticated, versioned, quota-limited bridge with typed persistent instance state passes adversarial/browser proof (not covered by H3a) |
| H4 | real staging build-sandbox compiles **an arbitrary source project**; hashes persisted & revalidated; old v1 App unchanged |
| H5 | real F05 anonymous second browser opens a v2 published card, mutates own state, reloads, no new AI, no creator data |
| H6 | crash/runaway/malicious source isolated with bounded failure and no platform compromise |
| H7 | create a simple game and a visually different interactive app via **the same general pipeline**; no game-specific code switches |

**Milestone honesty:** Initial implementation may complete H1/H3a in isolation; that is **NOT** H3b/H4/H5/H6/H7 or the finished Code Builder. Nobody may report “all apps supported” without the corresponding proof.

## 8. Compatibility & rollout decision

- Existing F01/F02/F03/F05 v1 passes unchanged as legacy compatibility. **All new generation attempts use the general AI Code Builder; routing depends only on technical execution requirements/approved permission profiles, never App category.** Blueprint v2 is additive; never migrate old hashes in place.
- First Code Builder output profile is static, client-only WEB_STATIC_V1; backend APIs, multiplayer network servers, payments, camera, native mobile or arbitrary installed packages are additional permissioned product capabilities, not automatically enabled by Code Builder.
- No 16P/HOLD/quasi-governance blocker in the product critical path; maintain non-negotiable code execution isolation and consent checks.
- **Design first, Build second**: this Working design is committed in NFF98/appf2-design before touching Build files. A source link and exact version of this document must travel with the Build PR, not pretend that the original immutable Phase 1 freeze has changed.


## 9. Staging-first user-testable vertical slice — 2026-10-28

To prove the product **on the real deployed website**, the first limited WEB_STATIC_V1 path may use an internal PostgreSQL artifact store for very small, standalone one-file JavaScript Apps while object storage and true isolated compilation are developed. This is an explicit **staging-only exception**, not the final immutable R2 production storage architecture. The existing owner-authorized F05 native cards stay untouched.

**Exact end-user flow:** The homepage's normal 「建立 App」 action invokes the new Code Builder by default, with one visible, unticked **explicit public-card consent**; no hidden sharing or surprise paid retry. User types one prompt → one bounded model completion produces plain, self-contained JavaScript + short title → server validates the strict byte-hashed v2 envelope/manifest, applies a code-size and permission cap, stores it as a private staging record with the public reference active **only after** admission → user sees it running inside the existing opaque-origin frame → the URL `/code/{random_uuid_v4}` (or a card) reopens the same bytes without calling AI. Generated Apps cannot access parent origin/DB/keys or external network; network/server-backed Apps are unsupported for this initial profile.

**Required additional controls:** same-origin POST; fresh client P-256 PoP over exact request body; server-verified CREATE idempotency; bounded generation quota by server-side network pseudonym per day, claimed-key uniqueness and billing cap; model key only Worker; no off-origin arbitrary model endpoints; no unsolicited fallback; no server-side execution of model-produced JS; reject if bytes/hash/shape/permissions fail. The staging PostgreSQL write is role-limited + RLS and the public read is by opaque share ID only; never by content hash alone. A public share is published only after the user checks explicit opt-in and has acknowledged that generated UI text/content may be visible to anyone with the link. If no explicit consent, fail closed before any model call.

**Acceptance:** one actual prompt on live Staging → real API/provider response → exact canonical bytes persisted in actual PostgreSQL → fresh Chromium opens generated code and performs a concrete interactive action → page reload and separate fresh browser open same share via DB-backed route → no new provider calls on repeat. A second *different* user prompt should use the same engine with no bespoke template. Do not claim compiled multi-file React projects, server resources, persistent mutable game state, arbitrary package installs, or full production-grade F02/v2 without separately verified evidence.

**Truth boundary:** a single-file JavaScript staging prototype can be useful to test the concept in the actual APPf2 website, but does not yet guarantee arbitrary user prompts, automatic syntax correction, H4 build Sandbox, R2 or H3b persistent state. Mark these as future work rather than completed.


## 10. Quality contract for new ideas — prevent false PASS (2026-10-28)

**Problem demonstrated:** a code artifact can have valid JSON, SHA-256 and a clickable button yet fail fundamental user expectations. Published eighteen-dice evidence contained missing screens and incorrect domain scoring. Hash validation is *integrity only*, not functional correctness. An automated test that checks merely "some text changed" cannot claim that a game or any other application has passed. The prior success claim is invalid as a user-requirements acceptance result.

**Universal approach (no golden reference App):**

1. **Acceptance contract before coding.** Extract the exact user's mandatory behaviors, data/state transitions, constraints, mathematical/domain rules, observable outputs and UX navigation into a versioned, creator-visible requirement list. Retain original wording/provenance. For ambiguous domain rules, explicitly show the chosen rules or request a user decision; never silently invent as verified. No category-based templates.
2. **General code generation.** Feed this frozen contract plus the user prompt to a freely writing model, with an appropriate completion/context budget. Provider/model are explicitly versioned and reported. A successfully parsed program is only a *candidate*; report incomplete/truncated responses as failures.
3. **Independent implementation tests.** A separately produced test plan is derived from the *frozen acceptance contract*, not from the generated code or its model's self-test assertions. Run allowlisted browser actions and deterministic property/boundary cases in an isolated runner. Inspect actual UI states, results and console/runtime failures, and record evidence per mandatory criterion. Use fixed test seeds or injectable deterministic inputs for calculations and random gameplay; prohibit executing arbitrary AI-authored test code with credentials.
4. **Bounded repair (maximum two rounds).** On a failure, give the model the failing criterion, screenshots/DOM evidence, and error trace. Re-run the full independent suite after each repair. Require explicit consent and a displayed cost budget before any additional paid model calls. Keep the failed source as private draft evidence; never silently publish it as an ACTIVE/verified card.
5. **Truthful artifact lifecycle.** DRAFT → BUILDING → TESTING → (VERIFIED → creator-approved PUBLISHED) or FAILED/UNVERIFIED. File/manifest hash admission is a separate mandatory security gate, not equivalent to TESTING. Existing staging records that were auto-published without full functional evidence must remain clearly labelled UNVERIFIED or be quarantined until retested. Do not retroactively assert their quality.
6. **Novelty and subjective quality.** New ideas require no previous example App. The independent tests come from explicit behaviors and invariants; UI beauty, fun, completeness of unstated intentions, and disputed domain conventions cannot be established by automated tests alone. Show a human preview and make creator acceptance explicit; distinguish automated coverage and unresolved/subjective items in the card.

**Acceptance evidence contract (not yet deployed):** Store per-criterion {requirement_id, origin, expected_observable_outcome, actual_evidence_hash, test_result PASS/FAIL/UNTESTED, failure_reason}, test-run/toolchain version, executable artifact hash, provider/model version, cost/retry count and user acceptance. Prohibit the overall "product PASS" label if any mandatory criterion is FAIL/UNTESTED, even if CI passes for source integrity. A model self-review or manually created demo is not independent product evidence.

**Sprint 3.5 staged rollout:** First correct the generation request's feature coverage and output budget, fail closed on truncated completions, and stop calling untested code "verified." The actual isolated tester, independent requirements planner, repair loop and publication transition are separate engineering deliverables, each requiring real staging evidence before declaring the full architecture complete. No eighteen-dice-specific branch, selector or scoring function is allowed in the universal Builder itself.

## 11. Staging generic QA publication gate — implementation status (2026-10-28)

Build PR #419 now contains an experimental pre-publication gate in the real Code Builder route, using Cloudflare Browser Run, a source-independent requirement plan created before the program, browser UI/pure-case evidence and an opt-in, at-most-two paid repair budget. The Worker refuses to publish a new ACTIVE CodeArtifact if its independent QA is unavailable or incomplete. This is a staged implementation, not a claim of general production readiness.

Controls: the browser binding is limited to the isolated staging Worker. No model calls when that browser binding is not configured. User consent text explicitly authorizes two basic model requests (planning + coding), browser resource use, and a separate optional two-repair budget. All generated code runs in an opaque-origin sandbox and the Browser Run tester denies outgoing network requests.

Critical evidence distinction: a prior GitHub run has confirmed typecheck/lint/API tests and staging deployment of the gate, while cross-category live CREATE evidence is still pending. A single working eighteen-dice App does not prove the gate. The multi-category QA run must prove independently created, different prompt types; negative/malformed examples must never be publicly admitted.

Remaining obligations: QA report/plan hashes must be persisted and pinned to the exact artifact, manual approval/private preview for subjective or ambiguous requirements, safe asynchronous orchestration and bounded worker/browser execution cost, and configurable provider/model version. This implementation still uses staging gpt-4.1 and single-file sandboxed JavaScript, not automatic unlimited React/backend/multiplayer generation. A valid hash is only immutable integrity evidence, not a substitute for semantic acceptance.

## 12. Verified cross-category staging evidence (2026-10-28)

**Build PR #419, GitHub Actions run #40661201647: SUCCESS.** The universal Code Builder QA gate was exercised through the real staging HTTP API, Cloudflare Browser Run, PostgreSQL and two newly model-generated apps, without any genre-specific builder logic:

- Counter: independent source prompt, model acceptance plan, generated JS, browser test and public Blueprint v2. Share ID `f956f248-72e1-47ed-98c9-420c4c52de92`; real public UI increment/reset E2E, verified ACTIVE.
- Task notes: distinct source prompt, text entry, add item and completion-toggle E2E. Share ID `dbd5331f-667f-49e8-896b-aae380012b62`; real public UI test, verified ACTIVE. Two opt-in repair attempts are the maximum; do not infer the number actually spent without separate evidence.
- QA rejects imperfect outputs rather than publishing them as verified. The original eighteen-dice negative regression remains immutable; a verified fixed successor is separate.
- Requirements with `automatable=false` are not automatically published. The code now distinguishes QA_PLAN schema failure vs needs-human-review and returns sanitized failed-criterion evidence for browser QA.

**Scope/limitations:** this proves two unrelated functional categories in staging and publication gating, not statistical reliability over all novel ideas, full safety, production readiness, or coverage of subjective aesthetics/external integration. Future deliverables include persistent per-artifact plan and outcome evidence, a creator-private preview/explicit human approval path for subjective requirements, more UI action primitives, cost telemetry and a larger diverse regression corpus. Full-real-E2E for all future outputs is not implied by this run.


## 13. Observable-transition QA (no decorative or hidden-content PASS) — 2026-10-28

After two unrelated real public-creation successes (staging Run #40661201647), a model-independent quality regression revealed a generic false-positive class: assertions of expected text after a click could pass even if the words were already present before the click, or visible-text checks could be fooled by hidden DOM content.

Implemented in Build PR #419 (`57725a5`):
- A new independent `text_appears` assertion snapshots *visible* text before performing actions and requires that the expected text is absent before but visible after. It cannot be used without a user action.
- Existing `text_includes` in the Worker now checks visible `innerText`, not hidden `textContent`; the offline Chromium runner uses the same semantics.
- Model acceptance planning explicitly prefers observable transitions for add-item, score change and reveal-result requirements.
- A no-AI negative regression checks that a deliberately broken app showing "the expected result" statically is rejected, while a functioning state-changing app passes.
- Existing immutable public artifacts remain unchanged; previously verified counter and task-note cards are not silently replaced. New QA policy applies to newly created CodeArtifacts only.

This closes one concrete false-PASS mechanism, **not** every way a generative model can omit or simulate requirements. Statistical reliability across unknown ideas is still unmeasured; do not label every new generated app "fully verified" based on two categories. Persist a cryptographically linked QA plan+result receipt per immutable artifact, add explicit private human review for subjective/non-automatable requests, and expand functional regression across business logic, state persistence and multi-step navigation. Staging deployment and regression status must be reported separately from old governance/Human approval gates.


## 14. Sprint 3.5 — Coding Agent architecture migration (2026-10-28)

**Human directive:** Evolve APPf2 from single-file JavaScript generation into a general full-stack Coding Agent. Preserve existing, immutable Blueprint v2 cards; this migration remains inside Sprint 3.5. Never report all five completed merely because their contracts exist.

### Five core workstreams and measurable proof

| Core | Production target | First deliverable | Real completion condition |
|---|---|---|---|
| 1. Multi-file workspace | Framework-agnostic project tree with dependencies and assets | Canonical safe project bundle, path/hash validation, trusted CI multi-file build | Novel AI-written multi-file program builds and runs in isolated cloud workspace |
| 2. Coding Agent | Model uses Responses API tools: read/write files, run builds, inspect diagnostics, repair | Typed tool calls and bounded step driver | Real GPT-6.1 Sol Responses tool-call loop repairs an actual workspace |
| 3. Cloud sandbox | One untrusted project per private isolated container | Adapter interface and allowed-tool policy | Cloudflare Sandbox deployed with verifiable isolation, command and egress limits |
| 4. Durable jobs | Resume after disconnect and retry without double charging | Serialized checkpoint and idempotency state | Real Cloudflare Workflow resumes same job across interruption |
| 5. Quality and admission | Requirement-to-evidence mapping, build and browser E2E, provenance and receipt | Hash-bound QA receipt and reject-on-failure contract | Real generated full-stack project independently tested and approved before ACTIVE |

**Security boundary:** The model never receives APPf2 DB, Cloudflare or AI keys. Commands from model output are executed only inside a sandbox broker; never in the host Worker, GitHub runner or production machine. The broker owns CPU/memory/wall-time/disk/process/egress/secret limits and durable identity separation. Sandbox egress, metadata endpoints and dependency installs must be explicitly policy-controlled. Every tool call has a stable idempotent ID and a bounded result.

**Cost/complexity:** Do not use the old 128-KB single-file ceiling as a universal limit. Replace fixed small-App restrictions with configurable per-job storage, token, command and spend budgets, progress checkpoints and explicit extra-budget consent. Unlimited creative categories are not unlimited paid resources.

**Model protocol:** GPT-6.1 Sol tool calling uses OpenAI Responses API, not merely swapping the model string in the legacy Chat Completions JSON request. Require a validated function-call schema, function_call_output response and response continuation ID. Keep per-provider configuration and prohibit unsolicited provider transfers. References: https://developers.openai.com/api/docs/guides/function-calling ; https://developers.cloudflare.com/sandbox/ ; https://developers.cloudflare.com/workflows/.

**Migration:** Existing WEB_STATIC_V1 and /code/:id cards remain unchanged. New multi-file source is a private candidate, never a published Blueprint until its compiled output, manifest, permissions, provenance and independent tests pass admission. Production DB, current F02/F03 and public sharing remain unmodified until there is real evidence. Use staged, explicitly authorized private capabilities rather than broad default network access.

**Sprint 3.5 execution sequence:** commit Design PR #45 first; Build PR #419 implements project-tree contract, checkpoint and tool-call contract plus trusted multi-file build regression; then cloud sandbox broker, Responses agent, Workflow persistence, verifiable immutable artifact and unfamiliar full-stack live browser E2E. Keep legacy gates from stalling product work, but do not remove execution isolation or consent guards.

**Evidence honesty:** DESIGN_ACCEPTED is not MULTIFILE_CONTRACT_TESTED; local trusted multi-file fixture is not cloud untrusted build; deployed Cloudflare Sandbox alone is not GPT tool-call E2E; and a hash without browser QA is never FULL_REAL_E2E.
