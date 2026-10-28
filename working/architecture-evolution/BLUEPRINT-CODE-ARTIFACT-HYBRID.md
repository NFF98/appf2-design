# APPf2 Blueprint + Code Builder — Hybrid Architecture, Design Delta H-001
Date: 2026-10-28
Status: **Working design proposal, product-owner requested**. Not a frozen Phase 1 baseline, not deployed functionality, no Production permission.
Build target: NFF98/appf2-build PR #419 (Sprint 3.5 product-priority spike / incremental implementation); full hybrid production launch needs separate evidence.

## 1. Product outcome

**One request → many kinds of working Apps**, without hardcoding a template/handler per game style, and **the same durable Blueprint/F05 App card for every App**. Two implementations may coexist:
- `NATIVE_BLUEPRINT` (legacy immutable F02-v1 + F03 deterministic capability graph; unchanged).
- `CODE_ARTIFACT` (new validated, immutable code bundle referenced by an immutable Blueprint envelope; executed in a **separate untrusted-code sandbox**, never in APPf2 Shell/Worker or elevated DB session).

**One card; not two products.** A user can publish, share, reopen, save and fork either kind without regeneration. Opening any published App is zero **AI generation** invocations. Client runtime hosting cost remains possible.

Prohibited shortcut: a model's JSON/TS string, merely a ContentHash, a passed unit test, or an attached ZIP is **not** an executable admitted Artifact or a public share.

## 2. Architecture (F01/F02/F03/F05/F06/F16)

```text
Natural request
  → F01 intent analysis & bounded planning
  → route Native Blueprint | Code Builder (decision based on required features)
  → Code Builder: generate isolated workspace (React/TS, HTML/CSS/JS, optional Canvas)
      → compile/test in disposable **isolated Build Sandbox** (no appf2 secrets/DB)
      → immutable built output & reproducible manifest
      → F02 v2 artifact admission (hashes, provenance, policy, tests)
  → unified **BlueprintEnvelope v2**
      ├─ NATIVE_BLUEPRINT: v1 canonical Blueprint reference
      └─ CODE_ARTIFACT: pinned admitted bundle reference and execution policy
  → immutable Blueprint identity / DB registry / creator ownership
  → F05 share ACTIVE reference / My Apps card → exact hash/manifest authorization
  → F03 Hosted Sandbox Runtime: opaque-origin isolated frame, no host storage,
     zero secret/bindings, controlled message-based state bridge
  → F06/F16 creates a **new artifact and new immutable Blueprint**,
     with a verified parent-child lineage, preview/accept/reject/revert
```

## 3. Versioned records and unambiguous hashes

**Do not silently widen existing v1 Blueprint schema.** Legacy `schema_version = 1.0.0` and `content_hash` remain bit-for-bit identical. v2 is a different format; all v1 shared Apps continue to pass old F02/F03.

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
| H3 | standalone iframe sandbox cannot access parent DOM/localStorage/cookies, network denied; controlled message bridge only |
| H4 | real staging build-sandbox compiles **an arbitrary source project**; hashes persisted & revalidated; old v1 App unchanged |
| H5 | real F05 anonymous second browser opens a v2 published card, mutates own state, reloads, no new AI, no creator data |
| H6 | crash/runaway/malicious source isolated with bounded failure and no platform compromise |
| H7 | create a simple game and a visually different interactive app via **the same general pipeline**; no game-specific code switches |

**Milestone honesty:** Initial implementation may complete H1/H3 in isolation; that is **NOT** H4/H5/H6/H7 or the finished Code Builder. Nobody may report “all apps supported” without the corresponding proof.

## 8. Compatibility & rollout decision

- Existing F01/F02/F03/F05 v1 passes unchanged. Blueprint v2 is additive; never migrate old hashes in place.
- First Code Builder output profile is static, client-only WEB_STATIC_V1; backend APIs, multiplayer network servers, payments, camera, native mobile or arbitrary installed packages are additional permissioned product capabilities, not automatically enabled by Code Builder.
- No 16P/HOLD/quasi-governance blocker in the product critical path; maintain non-negotiable code execution isolation and consent checks.
- **Design first, Build second**: this Working design is committed in NFF98/appf2-design before touching Build files. A source link and exact version of this document must travel with the Build PR, not pretend that the original immutable Phase 1 freeze has changed.
