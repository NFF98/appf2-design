# PFR-2026 — Product-First Phase Realignment

> 狀態：**ACTIVE / HUMAN-GOVERNED**
>
> 啟動日期：2026-09-30
>
> 範圍：Phase 1 → Phase 4+ roadmap / Build alignment 重構。
>
> 目的：把 appf2 的開發順序改成 **先做出可玩、可分享、可共用 Shared Data、可 Remix 的真實 Product Proof，再用 Evidence 決定後續 Phase**。
>
> 本檔是此次 phase realignment 的唯一進度 tracker。它記錄「現在做到哪」，但**不取代**各 canonical Function / UI / Data / Business owner，也**不直接授權 Cursor implementation**。

# 1. Program Name

正式名稱：

> **PFR-2026 — Product-First Phase Realignment**

人話：

> **先把真正產品做出來，再根據 Evidence 一步一步重排 Phase 1–Phase 4+。**

# 2. Hard Rules

1. GitHub Working SSOT 仍是 Product Design Current Truth。
2. `appf2-build` locked `BS-*` 仍是 implementation authority。
3. PFR-2026 不得直接修改已鎖定的舊 Build Spec；需要同步時建立新的 Build Spec baseline。
4. 每個 material Product / UX / Contract change 仍需 Human approval。
5. Cursor 只能執行已經進入 approved Build Spec + activated Sprint / Task 的工作。
6. Phase 2 / 3 / 4+ 不因本 tracker 出現就自動 activation。
7. 後續每次與本重構相關的 Review / Handoff / Planning Note，必須標明：
   - `Program = PFR-2026`
   - `Current Step`
   - `Status`
   - `Next Human Gate`
8. 完成的 Step 不因後續討論自動 reopen；如需 reopen，必須留下原因與 Human decision。

# 3. Current Program Status

~~~text
Program = PFR-2026
Status = ACTIVE
Current Step = PFR-02 — Complete SP-P1-002
Current Build Control Source = appf2-build/build-spec/CURRENT.json + delivery/CURRENT-SPRINT.json
Current Locked Baseline = BS-P1-012
Current Build Execution = HOLD
SP-P1-002 = OPEN / HOLD BETWEEN TASKS
T001 = CLOSED
T002 = CLOSED
T003 = CLOSED
T004–T009 = PLANNED
Cursor Product Implementation = NOT AUTHORIZED
Next Step = T004 Activation Review
Carry-forward = POI-005 production HTTP / Runtime / Postgres fresh-admission wiring (non-blocking, not T004 scope)
~~~

Current status is a tracker convenience only. Canonical Build control state remains `appf2-build/build-spec/CURRENT.json` + `delivery/CURRENT-SPRINT.json`; when this tracker and Build control state differ, Build control state wins.

# 4. Phase 1 Product-First Re-alignment

| ID | Step | Human meaning | Build / Cursor | Planning estimate | Status |
|---|---|---|---|---:|---|
| PFR-00 | Program Registration | 正式建立本重構與 tracker | No implementation | — | **COMPLETED — 2026-09-30** |
| PFR-01 | Development Re-alignment Audit | 新 Product Spec 對舊 Build Plan；判斷保留 / 修改 / 延後 | Audit only | 0.5–1 day | **COMPLETED — 2026-10-01** |
| PFR-02 | Complete `SP-P1-002 — Validation + Intent Foundation + Evidence Reliability` | 完成 Intent / Validation / Evidence 地基 | **Cursor implementation after Human Activation** | 2–4 days | **CURRENT — T001–T003 CLOSED / HOLD BEFORE T004 ACTIVATION** |
| PFR-03 | Complete `F19 — Shared App Data / Social Persistence` Detailed Design | 把 Shared Ranking 設計到可施工 | Design only | 1–2 days | PENDING |
| PFR-04 | UI/UX Delta Review | 重新檢查 S03 / S04 / S05 的 Shared Data / Remix / Lineage 影響 | Design only | ~1 day | PENDING |
| PFR-05 | Create next Human-approved Product Proof Build Spec | 最新 Product Truth Freeze 成新的施工圖；**不在 roadmap 預留 BS 編號，實際 BS-P1-NNN 只在 Freeze 建立時依 canonical latest ID 分配** | Build planning / no product code | 0.5–1 day | PENDING |
| PFR-06 | Product Proof Stage A — Playable App Vertical Slice | Intent → generated App → render → play；**Sprint numeric ID at creation time** | **Cursor implementation** | 3–5 days | PENDING |
| PFR-07 | Product Proof Stage B — Share + Shared Ranking | Share → recipient use → asynchronous Shared Ranking；**Sprint numeric ID at creation time** | **Cursor implementation** | 3–5 days | PENDING |
| PFR-08 | Product Proof Stage C — Remix + Lineage | Remix → child Version → Parent / Root lineage → fresh Shared Data Scope；**Sprint numeric ID at creation time** | **Cursor implementation** | 3–5 days | PENDING |
| PFR-09 | Product Hardening + Phase 1 Close | Recovery / Correction / Accessibility / performance / evidence 等必要收尾；**Sprint numeric ID(s) at creation time** | **Cursor implementation** | Evidence-driven | PENDING |

Phase 1 完成的核心產品循環：

~~~text
Intent
→ App
→ Play
→ Share
→ Recipient Use
→ Shared Data
→ Remix
→ New App
~~~

Phase 1 不以「所有未來功能都做完」為完成條件；以 Human-approved Product Proof + required hardening + Evidence Gate 為準。

# 4A. PFR-01 Approved Re-alignment Decision

2026-10-01 Human Review 已批准 PFR-01 Audit。以下為後續 planning / Build authority 必須沿用的正式結論：

### PRESERVE

- `SP-P1-001` 已完成 implementation 全部保留；Capability Registry / Admission / Coverage、Canonical Blueprint Identity、Anonymous Identity、Evidence ingestion / batching / retry 不因新 Product direction 重做。
- `SP-P1-002 T001–T009` 保留；其 F01 / F02 / F04 / F07 foundation 未被 F19 / F20 推翻。
- **Historical PFR-01 decision:** 當時 `BS-P1-003` 足以開始 `SP-P1-002`。其後 BF remediation 已合法 rebaseline 至 `BS-P1-012`；目前/未來 implementation authority 一律讀 `appf2-build/build-spec/CURRENT.json`，不得把這條歷史敘述當成現行 baseline。

### CHANGE

- **Legacy provisional labels `SP-P1-003–SP-P1-008` 不再作為 execution sequence，也不構成未來 Sprint ID reservation。** 其舊 backlog grouping 必須依 Product-first roadmap重新 move / split / re-sequence；未來正式 Sprint ID只在 Human-approved Sprint creation時分配。
- Phase 1 execution sequence改為：
  `SP2 foundation → Playable App → Share + Shared Ranking → Remix + Lineage → Hardening`。
- **Historical naming note:** PFR-01 曾暫定 Product Proof Baseline 為 `BS-P1-005`，但後續 BF rebaseline 已實際使用 `BS-P1-005`–`BS-P1-012`。因此該預留名稱正式作廢；PFR-05 不再預約固定 BS ID。Product Proof Build Spec只在 F19 Detailed Design closure + S03/S04/S05 UI/UX Delta Review + required Acceptance/Test/Evidence closure後，由當時 canonical latest baseline往後分配唯一新 ID。

### DEFER

- Full Result Correction、deeper Recovery、full Accessibility、advanced hardening、final cross-function metrics 延後到 **PFR-09 Product Hardening stage**，但前序 Product Proof仍需 minimum safe failure / truthful timeout / bounded recovery。實際 Sprint ID不在本 roadmap預留。
- F09 Realtime 保持 evidence-gated。
- F08 durable account ownership 保持 Phase 2。
- F13 full entitlement / metering、F20 Creator Commerce、F15 settlement 保持 Phase 3。

### NEW / BOUNDARY

- F19 Shared App Data 為 Phase 1 Product Proof extension；第一個 implementation proof優先 Shared Ranking，不要求一次做完所有 Shared Data capability。
- Remix child必須有 fresh Shared Data Scope，不得自動讀寫 Parent shared data。
- Phase 1 先證明 child creation + creator attribution + Direct Parent lineage + Root provenance；**durable account ownership仍由 F08 承接**。
- F19 Phase 1 resource-limit contract不得依賴完整 Phase 3 F13 billing/entitlement system；完整 Creator Plan / commercial metering仍 deferred。

> 本段是 PFR-01 Human-approved planning truth；不直接授權任何 Cursor implementation。

## 4B. Canonical Naming Rule — Future Build Specs / Sprints

為避免 PFR planning 與 Build remediation 共用同一組流水號造成碰撞，2026-10-04 起採以下規則：

1. **Planning roadmap 不預留未來 `BS-P1-NNN` 或 `SP-P1-NNN` 數字 ID。**
2. PFR 只使用 stable stage name：`Product Proof Stage A / B / C`、`Product Hardening`。
3. Build Spec ID 只在 Human-approved Build Freeze candidate真正建立時，依 `appf2-build/build-spec/baselines/` 最新 canonical ID分配。
4. Sprint ID只在 Sprint詳細 planning / Human activation前建立時，依 `appf2-build/delivery/sprints/` canonical sequence分配。
5. 已存在的 historical ID（例如 `BS-P1-005`–`BS-P1-012`）永遠保留其原始歷史意義，不 rename、不 recycle、不重新指派。
6. Legacy provisional `SP-P1-003–SP-P1-008` 只代表舊 roadmap草案，不保留號碼；未來不得因名稱相同就自動沿用其舊 scope。
7. Product semantics / stage順序不因本命名 normalization改變；本次只移除 identifier collision / stale reservation。

# 5. Phase 2–Phase 4+ Replanning

Phase 2–Phase 4+ 必須重排，但**不在 Phase 1 尚未產生真實 Evidence 前一次鎖死詳細 Sprint**。

| ID | Phase | Replanning focus | Status |
|---|---|---|---|
| PFR-10 | Phase 2 Replan | PMF Deepening：Retention / Durable Identity / Ownership / Creator Value；Realtime only if evidence supports | PENDING — after Phase 1 evidence |
| PFR-11 | Phase 3 Replan | Monetization + Scale Readiness：Creator Pro / Paid App / Entitlement / Metering / Settlement / Commerce Pilot | PENDING — after earlier evidence |
| PFR-12 | Phase 4+ Replan | App Evolution / Capability Network / Discovery / Marketplace / Network Effect | PENDING — after earlier evidence |
| PFR-13 | Cross-Phase Final Consistency Review | Phase 1–4+ goal / gate / dependency / naming / SSOT consistency final audit | PENDING |

未來 Phase 5+ 可以存在，但現在不預先 Freeze 名稱或內容。只有 Evidence 顯示需要新的獨立 Phase 時，才由 Human approval 建立。

# 6. Current Timing Target

2026-09-30 Working planning estimate：

~~~text
PFR-01 audit
→ PFR-02 SP2
→ PFR-03 / 04 design delta
→ PFR-05 next Product Proof Build Spec (ID assigned at Freeze)
→ PFR-06 first playable App
   target ≈ 2026-10-07 to 2026-10-10

→ PFR-07 Share + Shared Ranking
→ PFR-08 Remix + Lineage
   Product Proof target ≈ 2026-10-15 to 2026-10-20
~~~

這些日期是 planning estimate，不是 activation gate，也不是保證日期。真實進度由 Evidence / review / blocker 決定。

# 7. Completion Rule

PFR-2026 只有在以下都成立後才可標為 `COMPLETED`：

1. Phase 1 Product-First roadmap 已完成並有 Human-approved Product Proof。
2. Phase 2 roadmap 已依 Phase 1 Evidence replan 並 Human-approved。
3. Phase 3 roadmap 已依前序 Evidence replan 並 Human-approved。
4. Phase 4+ roadmap 已依前序 Evidence replan 並 Human-approved。
5. Cross-Phase Final Consistency Review PASS。
6. Business Plan / Function portfolio / UI/UX / Data / Infrastructure / Build handoff 沒有互相矛盾的 active truth。

# 7A. A0 — SP2 Comprehensive Contract Re-Audit

A0 由 BF-014 觸發。First-pass 已完成：35/35 SP2 Acceptance/Test mapping PASS、Phase 1 registry index consistency PASS；同時發現 BF-015～BF-023。Design PR #6 已修正 canonical Capability ID grammar；Build PR #110 已正規化 A0 findings。T001 / T002 / T006 / T008 直接 BLOCKED，Build 保持 HOLD。BS-P1-004 尚未建立。

A0 exit：blocking Findings resolved → cross-contract re-audit PASS → projection scope clean → Human Build Freeze approval。

# 8. Update Log

| Date | Step | Update | Result |
|---|---|---|---|
| 2026-09-30 | PFR-00 | 建立 Product-First Phase Realignment program + canonical progress tracker | COMPLETED |
| 2026-10-01 | PFR-01 | 完成 Design → Build impact audit；Human 批准 PRESERVE / CHANGE / DEFER / NEW 與 Product-first Phase 1 重排 | COMPLETED |
| 2026-10-01 | PFR-02 | 進入 SP-P1-002；沿用 BS-P1-003，不 rebaseline；完成 Activation Review PASS | REVIEW PASS |
| 2026-10-01 | PFR-02 | Human 批准 SP-P1-002 Activation；Build control state 已切換 ACTIVE，T001 為唯一 Active Task；第一個 Cursor command 仍受 POI-003 hard stop | ACTIVATED |
| 2026-10-01 | PFR-02 | POI-003 經 Human `False / False` 驗證後解除；T001 開始執行 | EXECUTION STARTED |
| 2026-10-01 | PFR-02 | T001 發現 BF-014：BS-P1-003 evidence registry regex serialization defect 使 F04-AC-018 無法誠實達成；SP2/T001 fail-closed BLOCKED，Build execution 轉 HOLD，等待 Human resolution | BLOCKED |
| 2026-10-01 | PFR-02 | Human 同意沿用 Sprint 1 Build Constitution 繼續 BF-014 Option A；Working 修正 9 個 regex serialization defects、固定 registry_digest wire format，planned replacement = BS-P1-004；原 PFR-05 Product Proof Baseline 順延 BS-P1-005 | DESIGN DELTA |
| 2026-10-01 | PFR-02 | appf2-design PR #5 merge；targeted registry audit PASS；BD-003 merge。Replacement Freeze audit 發現 latest Working 相對 BS-P1-003 有 11 個 projected output changes，其中只有 3 個屬 BF-014、另 8 個屬 PFR/F19/future compatibility，禁止 silent freeze | CURRENT / FREEZE SCOPE BLOCKED |
| 2026-10-01 | PFR-02 / A0 | Product correctness 優先；完成 A0 first-pass，Design PR #6 + Build PR #110；BF-014～BF-023 open，T001/T002/T006/T008 BLOCKED | HUMAN CONTRACT RESOLUTION GATE |
| 2026-10-01 | PFR-02 / A0 | Human 批准 BF-016～BF-023 resolution direction；A0 Phase 2 remediation 落入 Working，Evidence Registry v3；第二輪 machine audit PASS；建立 scope-clean freeze source 91894ae8...，只含 11 個 approved remediation paths | BS-P1-004 BUILD FREEZE APPROVAL | 
| 2026-10-01 | PFR-02 / A0 | Human 批准 BS-P1-004 Build Freeze；Build PR #113 全 checks PASS 後 merge，BS-P1-004 LOCKED，BF-014～022 RESOLVED，BF-023 保持 OPEN；CURRENT 仍 BS-P1-003/HOLD | CURRENT / SP2 REBIND + ACTIVATION REVIEW |
| 2026-10-01 | PFR-02 | SP2 Rebind + Activation Review 完成；Build PR #114 全 required checks PASS 後 merge。Review 確認 atomic rebind precedent：Human Activation 時一次切 CURRENT + rebind 38 個 unfinished backlog + SP2 Tasks；BL-P1-032 保留 DONE 歷史並由 T001 revalidate F07-AC-008。BF-024/025 RESOLVED；BF-023 保持 OPEN | HUMAN ACTIVATION GATE |
| 2026-10-01 | PFR-02 | Human 批准 BS-P1-004 / SP-P1-002 Activation；Build PR #115 全 gates PASS 後 merge。CURRENT=BS-P1-004、implementation_enabled=true、SP2 ACTIVE、T001 IN_PROGRESS、38 unfinished backlog rebind，BL-P1-032/F07-AC-008 revalidation IN_PROGRESS | CURRENT / T001 EXECUTION |
