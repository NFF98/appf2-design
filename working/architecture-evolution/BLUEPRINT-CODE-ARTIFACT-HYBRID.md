# APPf2 — AI Code Builder → Blueprint v2 → Verified App Card (Design Delta H-001)
Date: 2026-10-28
Status: **Working design proposal, product-owner requested**. Not a frozen Phase 1 baseline, not deployed functionality, no Production permission.
Build target: NFF98/appf2-build PR #419 (Sprint 3.5 product-priority spike / incremental implementation); full hybrid production launch needs separate evidence.

## 0. Sprint 3.5 範圍鎖定 — 2026-10-31（本檔優先解讀規則）

> **性質：既有 Design PR #45 的產品範圍更正草案；尚未合併、非已批准 Build Freeze。**
> **唯一 Design owner：本檔 Working H-001；Phase / Function 語意仍由各 canonical Working owner 擁有。**
> 本節界定「Sprint 3.5 要修好的 Stage A」；下方藍圖描述的是**長期產品方向／分階段契約**，不是自動啟用的 Sprint 3.5 backlog。與本節衝突的「立即發布、永久保存、完整後端、完整版本家族、跨模型自由切換」字眼，**不得當成本 Sprint 的完成條件**。Design PR 未合併前不假稱已更動 main SSOT。

### 0.1 最高產品目標與 Stage A 邊界

- **長期方向不變**：「自然語言 → 單一、類型無關 AI Code Builder → Blueprint v2 包裝／版本／權限 → 受控建置和獨立驗收 → 可操作 App」。後續安全分享、資產保存、版本家族與重用按原 Phase Gate 分批啟用；不開第二套生成引擎。
- **Sprint 3.5 只交付 Stage A 產品修復**：網站輸入一句一般自然語言，真正 AI 在同一 Agent 產生**多檔案的受控靜態 Web 專案**；原始專案與步驟存 PostgreSQL；真實隔離 Sandbox 編譯；獨立 Chromium 依原始要求操作並驗收；失敗時以原始碼／失敗證據在授權預算內修復；成功才在**目前會話的私人預覽**真實操作。不可用單檔範本或 fixture 冒充。
- **Blueprint v2 在 Stage A 的最小職責**：已建置候選的檔案／雜湊／manifest／隔離權限／來源與 QA 證據一致性。候選不是 F05 的正式公開 App；F02 v2 完整生產 Admission／永久 R2 發布未納入 Stage A 完成定義。
- **禁止未經證據轉移範圍**：Sprint 3.5 不因 Blueprint v2 的長期架構而自動新增跨裝置帳號、永久 App 收藏庫、版本家族管理、公開 v2 App 商城／畫廊、語意搜尋／智能重用、付費能力或外部 Runtime。既有 v1 F01–F06／F16 語意與正在使用的 App 不得被破壞。
- **未解決範圍衝突要明示，不假完成**：原五項願景曾提「前後端／DB App」；目前批准／候選的安全執行 profile 首期僅靜態 Web（NODE 只有受限測試，PYTHON 未就緒）。**真正可對外運作的生成後端／DB 仍是缺口**，不得以 APPf2 平台自身的 PostgreSQL、靜態 Vite Demo 或產生了 backend 原始碼代替。之後啟用需補正式 Execution/Permission/DB 隔離契約及 Human scope 決策；本節不臆定其為 Sprint 4、Phase 2 或已完成。

### 0.2 五項 Sprint 3.5 產品修復（本期可驗收的最小切面）

| 原五項核心 | Sprint 3.5 Stage A 必做 | 明確不等於 |
| --- | --- | --- |
| 1 多檔案／自由 Coding | 同一 Agent 處理兩種不同自然語言要求，生成不同的真實多檔案 VITE_WEB 專案、實際建置與互動，不做遊戲專用引擎 | 已可託管任意後端／任意 DB／任意套件 |
| 2 工作持續化 | 專案原始碼、雜湊、Step、工具／AI 收據存於既有 Job DB；中斷後讀回**同一 Job／同一原始碼**再續；不重複支付已確認的模型請求 | 永久個人 App Library、跨裝置帳號、歷史版本收藏 |
| 3 真 Sandbox | Cloudflare 私有隔離環境實際執行**模型生成**的建置與測試，記錄命令、時間、結果與失敗診斷；憑證不可進容器 | CI 本地 Docker fixture 或 Wrangler dry-run |
| 4 獨立驗收與修復 | 從使用者原文先產生凍結 QA 條件，真實 Chromium 操作候選，未通過交模型修復、再次執行完整驗收；原文必備功能未過就不報 READY | Hash 正確、能顯示畫面、模型自稱 PASS |
| 5 受控續作與策略調整 | 保留失敗證據與檔案，無改善時改分析／修復方案；每次 paid step/預算經核准，可暫停且從同一 Job 續作；對不確定費用結果不得重送 | 自動轉移所有模型供應商、無上限消費或無限重試 |

### 0.3 原有 Phase 與 Sprint 的**正確界線**（不得混用）

| 能力 | Canonical 設計／Phase | Sprint 3.5 對應決策 |
| --- | --- | --- |
| **基本 Share／Restore**：受控 immutable Blueprint 分享連結、接收者直接用（0 次重新生成） | **Phase 1 F05**，屬原有 Core Loop | 保留原 v1 功能、不破壞；**不要求在本次新增 v2 公開分享系統**，舊 Phase 1 未通過證據仍如實列未結 |
| **基本 Refine／Remix 與修正回退**：產生 immutable child、原版不被覆蓋、當前 session 比較／回退 | **Phase 1 F06／F16** | 不重寫成 v2 版本管理中心；未完成原 Phase 1 驗收另列，不冒充 Sprint 3.5 已完成 |
| **保存 Agent 開發進度**：DB 快照、Checkpoint、重連續作 | **Sprint 3.5 核心 2 的技術必要條件** | 必做；不承諾 App 永久可讀、帳號資產 ownership |
| **帳號級 Save、History、Ownership、跨裝置、Creator 發布管理／App Version 家族** | **Phase 2**，見 BUSINESS-PLAN Phase 2、F08；啟用需證據及批准 | **排除本期**；不得用 Phase 1 的 anonymous cookie 假裝永久 ownership |
| **Semantic Blueprint Reuse／Retrieval** | **Phase 2 F10（DEFERRED）** | **排除本期**；只讀回同一 Job 不是 F10 重用引擎 |
| **可靠的版本相容性、擴大執行／外部 API／成本路由** | **Phase 3+ 證據門檻**，見 BUSINESS-PLAN、F11/F17 | **排除本期**；任意後端／DB 和跨供應者自動切換不得宣稱已支援 |
| **AI 驅動 App Evolution／知識推薦** | **Phase 4+ F18（DEFERRED）** | **排除本期** |

「Sprint 4」與「Phase 4」不是同一個概念；**本期不啟動 Sprint 4**。任何未來 Phase 內容都不因這份架構願景或現有 prototype 而提早啟用。

### 0.4 完成判斷、BLOCK 與停止規則

**Stage A 最小真實 E2E：**
1. 在真實隔離 Staging 網站，Browser 同源呼叫 Worker，**真實 AI** 接收原始自然語言與凍結驗收條件，寫出多檔案；查出原始 Job／project hash／版本已入 PostgreSQL。
2. **Cloudflare Sandbox** 為該 AI 產生的原始碼建置／測試，輸出可檢驗 digest、失敗診斷；**真實 Browser QA** 對原始條件逐項驗證；使用者能在網頁預覽按下控制並看到正確結果。
3. 第二個**不同類別**的需求重複同一引擎；失敗案例應維持 FAILED／UNVERIFIED，不提供假的 READY。
4. 關掉／重開頁面可讀回**同一 Agent Job** 與源碼／工作進度；不需重生，已完成的 paid call 不重送。QA 失敗只在核准費用內以保存的診斷修復。
5. 以上每條要在**同一 Commit** 留下 Staging URL、脫敏 request/job id、DB hash、AI／Cloudflare 收據、Chromium 互動畫面、QA 分項 PASS/FAIL/UNTESTED。**任一必要項 NOT_RUN = Stage A NOT_VERIFIED**。

**已知阻斷，不得推測成已解決：** Cloudflare subscription 唯讀查詢 HTTP 403（權限／方案未知，非部署成功）；當前多檔案私有服務部署與真實 AI + Sandbox + Browser QA 整鏈未有驗證；當前 Agent QA 後仍 `app_published:false`（本期允許 private usable preview，不得偷變公有產品）；正式 main／Release HOLD；舊治理 Gate 失敗與 Stage A 產品第一失敗 hop 分開記錄。

**修復順序**：先 Staging 最早失敗 hop → 模型／DB → Sandbox → Browser QA → 產品內實際操作／中斷續作；僅修已證實的失敗點、最多兩輪集中修復。不得以修更多旁支功能取代產品操作證據。Staging 的付費 AI／Container 與正式 Production 發布各須獨立授權；此 Design 修改本身**不授權費用、部署、Merge 或 Production 上線**。

**產品成功的報告口徑：**「Stage A multi-file REAL E2E PASS / FAIL / NOT_RUN」與「原 Phase 1 Release 1 全功能 PASS / 未結」分開；不得把兩者、五項工程進度、Phase 2+ 長期方向加總成百分比。

---

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


## 14. Sprint 3.5 — 歷史五項改造方向與新範圍對照（2026-10-31）

2026-10-28 原提案希望從單檔 JavaScript 演進為多檔案、AI Coding Agent、Cloud Sandbox、DB 工作續作、獨立 QA。這五項**方向仍保留**，但原文曾把「完整全端／永久 App 發布／所有模型策略」一併當成當期完成條件，超出當前 Stage A 與正式 Phase 啟用邊界。

**目前 Sprint 3.5 唯一實作及驗收範圍，以本檔 §0.1–0.4 為準。** Full-stack 自訂後端／DB Profile、v2 正式公開發布、App 資產庫、跨設備 ownership、智能重用及自動供應者路由都是**尚未交付且未被本節核准啟用的需求缺口／未來工作**，不能假裝完成，也不能任意指定成 Sprint 4。

保留既有 Blueprint v1、既有單檔 `/code/:id`、F05 Phase 1 基本分享及安全邊界。私有候選只有經原始需求真實 QA 通過才可標示 Stage A 可操作，不因此得到公開分享、收費或正式發版權限。

**執行限制**：先由原 Design PR #45 修正範圍；Build 僅沿用 PR #419、不得新增 PR／Sprint 4；兩輪修復硬停；每輪列明實際源碼 SHA、第一故障 hop、前後證據及產品 Stage A 狀態；不冒稱 GitHub CI fixture PASS 為 live REAL E2E。
