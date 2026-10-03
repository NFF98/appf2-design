# appf2 Working — Human Navigation

> `working/` = appf2 唯一可修改的 Product Design Current Truth。
>
> 狀態：**PFR-2026 ACTIVE / WORKING CURRENT TRUTH**
>
> 2026-09-26 的 Phase 1 Final Audit / Build Freeze Candidate 內容保留為歷史 pre-freeze snapshot。後續 Build Freeze、Build Spec、Sprint 與 implementation current truth 由 `NFF98/appf2-build` 擁有；目前跨 Phase Product Design 重構以 `working/PHASE-REALIGNMENT-PROGRAM.md` 為進度 owner。

## Active Cross-Phase Program

目前啟動中的跨 Phase 重構：

> **PFR-2026 — Product-First Phase Realignment**

Canonical tracker：

`working/PHASE-REALIGNMENT-PROGRAM.md`

所有與本次 Phase 1–Phase 4+ 重構相關的 planning / review / handoff，必須記錄 `Program / Current Step / Status / Next Human Gate`，直到 PFR-2026 正式完成。
## Canonical Structure

```text
working/
├─ README.md
├─ DESIGN-WORKBENCH.md
│
├─ common-core/
│  ├─ APP-ARCHITECTURE.md
│  ├─ BUSINESS-PLAN.md
│  ├─ CAPABILITY-FABRIC.md
│  ├─ DATA-MODEL.md
│  ├─ INFRA-ARCHITECTURE.md
│  ├─ TECHNICAL-MOAT.md
│  ├─ API-CONVENTIONS.md
│  ├─ ACCEPTANCE-CONVENTIONS.md
│  ├─ EXECUTION-ADMISSION.md
│  └─ DESIGN-TO-DELIVERY.md
│
└─ detailed-design/
   ├─ README.md
   ├─ APP-DETAILED-DESIGN-OVERVIEW.md
   ├─ data-model/
   │  └─ DATA-MODEL-DETAILED.md
   ├─ infrastructure/
   │  └─ INFRASTRUCTURE-DETAILED.md
   ├─ functions/
   ├─ UI-UX/
   └─ registries/
```

## Ownership Rule

### Common Core

`working/common-core/` 放跨 Phase 共用、長期沿用的原則、邊界與 shared contract。

Common Core 不因 Phase 1 / 2 / 3 / 4 複製。

### Detailed Design

`working/detailed-design/` 放 implementation-facing 的詳細設計。

Functions、UI/UX、Registries 依 semantic owner 維持單一 canonical truth，不按 Phase 複製。

Data Model / Infrastructure 的詳細內容也以單一 detailed owner 管理；Phase 只作為 scope / applicability / activation metadata，不自動形成 folder boundary。

### Design Workbench

`working/DESIGN-WORKBENCH.md` 只作為尚未決定、尚未有 canonical owner、或 evidence-gated 的暫存討論區。

它不是 Product Design SSOT，也不是 Build Spec source。

## Build Boundary

```text
appf2 Working
→ Content Quality Review / Dedup
→ Cross-file Consistency / Acceptance / UI Audit
→ Human approval
→ Build Freeze
→ appf2-build immutable BS-*
→ Backlog / Sprint / Cursor / Test / Evidence / Release
```

appf2-build 負責 implementation / delivery governance；appf2 不重複維護 Cursor execution rules。

## Historical Final Audit Result — 2026-09-26

Final Audit 結論：**PASS / HUMAN APPROVAL REQUIRED BEFORE BUILD FREEZE**。

已驗證：
- 53 / 53 Working text / JSON：0 stale path、0 retired pending lifecycle、0 duplicate heading。
- Phase 1 Functions：`F00 F01 F02 F03 F04 F05 F06 F07 F12 F16` 全部維持 `BUILD_FREEZE_READY / STEP2_REVIEWED`。
- Acceptance Registry：285 entries；284 ACTIVE + 1 SUPERSEDED；Acceptance ID / Test ID unique；proof scope合法。
- Phase 1 Function ↔ Acceptance / Event / Error Registry：0 missing / 0 orphan。
- Recovery Registry：所有引用的 `F12-POL-*` 都有 canonical definition。
- UI/UX：S01–S06 + O01–O05 cross-screen truth一致；11 / 11 approved PNG SHA unchanged。
- Phase scope：Phase 2 = F08/F09/F10 + evidence-unlocked Creator / PMF work；F11/F13/F14/F15/F17 = Phase 3+ deferred / evidence-gated。
- 日期本身不 unlock任何 deferred Function。

Final Audit 修正的 material / structural findings：
1. F13 entitlement / metering 從舊 2–6 月混合 scope 完整收回 Phase 3+。
2. Business / Capability appendix 與 Detailed Overview 的 stale canonical references修正。
3. S06 舊 execution-boundary wording收斂回 Human-approved Build Freeze boundary。

## Historical Phase 1 Build Freeze Candidate Inventory

Build Freeze **不是複製全部 Working**。目前 candidate 共 **47 個 source artifacts**：

### Include / Project into locked Build Spec

- Shared implementation truth（7）：`APP-ARCHITECTURE.md`、`CAPABILITY-FABRIC.md`、`DATA-MODEL.md`、`INFRA-ARCHITECTURE.md`、`API-CONVENTIONS.md`、`ACCEPTANCE-CONVENTIONS.md`、`EXECUTION-ADMISSION.md`。
- Scope owner（1）：`working/detailed-design/APP-DETAILED-DESIGN-OVERVIEW.md` 的 Phase 1 scope。
- Detailed Data / Infrastructure（2）：只投影 Phase 1 section，不把 future Phase sections帶入 implementation。
- Phase 1 Functions（10）：`F00 F01 F02 F03 F04 F05 F06 F07 F12 F16`。
- UI/UX（24）：13 個 textual contracts + 11 個 approved reference PNG。
- Machine-readable registries（3）：Acceptance / Evidence / Recovery。

### Reference-only / Do Not Copy as Build Spec Truth

- `working/common-core/BUSINESS-PLAN.md`
- `working/common-core/TECHNICAL-MOAT.md`
- `working/common-core/DESIGN-TO-DELIVERY.md`
- `working/README.md`
- `working/DESIGN-WORKBENCH.md`
- Deferred Functions：`F08 F09 F10 F11 F13 F14 F15 F17`
- Data / Infrastructure 的 Phase 2 / 3 / 4+ sections

這些可供 provenance / strategy / future design參考，但不得因同 repo存在就自動進 Phase 1 implementation baseline。

## Phase 1 Freeze Audit Marker Convention

2026-09-26 Final Audit 後，所有 **36 個可投影的 Phase 1 textual / JSON source artifacts** 都必須自帶 Freeze Audit boundary marker：

~~~text
PHASE 1 FREEZE AUDIT: PASS
scope = Phase 1 applicable truth only
eligibility = Human-approved Build Freeze required
exclude = Phase 2/3+ + deferred content
~~~

Markdown 以文件頂部單行 boundary marker 表示；3 個 machine-readable registry 以 `phase_1_freeze_audit` metadata 表示。

11 張 approved High-fi PNG 是 immutable binary reference，不改檔案本體以避免破壞已驗證 SHA；其 Phase 1 Freeze eligibility 由 `PHASE1-SCREEN-INVENTORY.md`、對應 Screen / Overlay owner與本 README 的 47-artifact inventory共同承接。

> Marker = Final Audit passed；**Marker 本身不等於 Human approval，也不等於已執行 Build Freeze。**

## Current Next Step

依 `PFR-2026 — Product-First Phase Realignment` 與 appf2-build canonical control state：

1. Current locked baseline = `BS-P1-012`。
2. Canonical Build control source = `appf2-build/build-spec/CURRENT.json` + `delivery/CURRENT-SPRINT.json`。
3. `implementation_enabled=false`；repository execution state = **HOLD**。
4. `SP-P1-002` 尚未結束；T001–T003 = CLOSED，T004–T009 = PLANNED。
5. T004 是下一個 Activation Review 對象；**尚未授權 Cursor implementation**。
6. POI-005 已記錄 T003 production HTTP / Runtime / Postgres fresh-admission wiring debt；它不阻擋 T004，也不得偷偷塞入 T004 scope。
7. PFR-03 = F19 Shared App Data Detailed Design；PFR-04 = S03/S04/S05 UI/UX Delta Review；兩者是後續 Product Proof Freeze 的前置。
8. 未來 Product Proof Build Spec / Sprint **不預留數字 ID**；ID 只在實際 Freeze / Sprint creation 時依 canonical latest sequence 分配。
9. Historical `BS-P1-005`–`BS-P1-012` 保留原 remediation/rebaseline 意義，不 rename、不 recycle。
10. Next Step = **SP-P1-002 / T004 Activation Review**。

> 本 README 只提供人類導覽；真正 Build execution authority 永遠以 `appf2-build/build-spec/CURRENT.json` 與 `delivery/CURRENT-SPRINT.json` 為準。
