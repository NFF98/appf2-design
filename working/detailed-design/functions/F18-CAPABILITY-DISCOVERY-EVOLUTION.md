# F18 — Capability Discovery + Evolution

> 狀態：DEFERRED_BASELINE / Phase 4+。
> Governance：Current Truth = this Working file；存在不等於 activation。只有 Evidence + Human approval + complete Detailed Design + Build Freeze inclusion 才可進 implementation。
>
> Canonical Role：定義 appf2 如何從 Current App、未使用但相容的 Capability、Remix / Reuse pattern 與 Execution Evidence，產生少量 contextual enhancement candidates，讓 App 經由 Share / Remix 持續變好。

# 1. Purpose / User Outcome

User Outcome：

> User 不需要知道 Registry 裡有多少 Capability，也不需要自己翻元件目錄；appf2 能在適當時機提出「這個 App 還可以怎麼變更好」的少量建議，並讓 User 一鍵進入 Refine / Remix。

核心不是提高 Capability 使用率，而是提高 App outcome quality。

Canonical loop：

~~~text
Current Validated App
+ App / Intent Context
+ Compatible Unused Capabilities
+ LLM Semantic Suggestions
+ Successful Remix / Reuse Patterns
+ Execution / Adoption / Correction Evidence
→ Ranked Enhancement Candidates
→ User Accepts / Edits / Rejects
→ F06 Refine / Remix
→ F01 Analyze / Compose
→ F04 Coverage
→ F02 Full Validation
→ New Immutable Blueprint
→ Use / Share / Remix
→ New Evidence
~~~

# 2. Product Thesis

appf2 不假設第一次 LLM composition 就是最佳 App。

目標：

~~~text
Create
→ Use
→ Share
→ Remix
→ Better Idea
→ Evidence
→ Better Suggestion
→ Better App
→ More Share
~~~

這讓 Share 不只是 Distribution，也成為 Idea Evolution Mechanism。

# 3. Inputs

F18 future input sources：

- current validated Blueprint
- resolved intent / current App context
- Registry-compatible unused capabilities
- capability compatibility / dependency metadata
- F06 Remix lineage
- F10 trusted reuse / Blueprint family patterns
- F07 product / execution evidence
- F16 correction evidence
- LLM semantic enhancement proposal

任何單一 signal 都不能獨立決定 recommendation。

# 4. Recommendation Rules

1. 不把全部 Registry capability catalog 暴露給一般 User 自己挑。
2. 不因某 Capability 已 RELEASED 就推薦。
3. 不因 popular / frequently remixed 就假設適合目前 App。
4. recommendation 必須與 current Intent / App semantic core 相容。
5. 一次只呈現少量、可理解、高相關候選。
6. User 可接受、修改、忽略或拒絕。
7. recommendation 不能直接 mutation validated Blueprint。
8. 接受後必須走 F06 → F01 → F04 → F02 正常 trusted path。
9. recommendation rejection 也是 Evidence，但不得用來建立暗黑模式或強迫採用。
10. Capability usage rate 不是成功 KPI；App outcome improvement 才是。

# 5. Candidate Shape — Future Contract Seed

~~~text
EnhancementCandidate
├─ candidate_id
├─ app_context_ref
├─ summary
├─ proposed_capability_refs[]
├─ expected_user_value
├─ evidence_basis[]
├─ compatibility_status
├─ confidence
├─ source:
│  ├─ LLM_PROPOSED
│  ├─ REMIX_PATTERN
│  ├─ REUSE_PATTERN
│  ├─ EXECUTION_EVIDENCE
│  └─ HYBRID
└─ user_action:
   ├─ ACCEPT
   ├─ EDIT
   ├─ REJECT
   └─ DISMISS
~~~

Exact schema deferred until Phase 4+ activation.

# 6. Dependencies

Upstream：
- F04 Capability Registry / Resolution
- F06 Remix / Refine
- F07 Evidence
- F10 Blueprint Reuse / Retrieval
- F16 Result Correction

Execution path：
- F06 Refine / Remix
- F01 Intent Compilation
- F04 Coverage
- F02 Validation
- F03 Runtime

# 7. Activation Gate

F18 不得因 roadmap 日期自動啟用。

至少需要：

- Registry 有足夠 capability breadth / compatibility metadata
- Share / Remix 已有真實 usage
- lineage / reuse evidence 足以形成 pattern
- evidence quality 可區分 adoption、rejection、correction
- recommendation 能證明改善 outcome，而不是只增加 feature count
- Phase 4+ Human approval

# 8. Non-Scope Before Activation

Phase 1–3 不需要：
- consumer capability catalog
- recommendation engine
- collaborative recommendation marketplace
- auto-apply enhancement
- popularity ranking UI
- machine learning ranking service

目前只保留 Evidence、Lineage、Registry compatibility 等未來所需地基。

# 9. Core Guardrail

> **appf2 的目標不是讓第一次生成完美，而是讓每個 App 都能在 Use → Share → Remix → Evidence 中持續進化。**
