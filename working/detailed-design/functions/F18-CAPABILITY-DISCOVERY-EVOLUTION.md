# F18 — Capability Discovery + Evolution

> 狀態：DEFERRED_BASELINE / Phase 4+ / DESIGN_COMPLETE_FOR_DEFERRED_BASELINE / NOT_BUILD_FREEZE_READY。
>
> Governance：Current Truth = this Working file；存在與設計完成都不等於 activation。只有 Phase 4+ Evidence Gate + Human approval + Build Freeze inclusion 才可進 implementation。
>
> Canonical Role：定義 appf2 如何把 Current App、Registry-compatible unused capabilities、LLM semantic ideas、Remix / Reuse lineage 與真實 Execution Evidence 組成一個可治理的 App Evolution Engine。
>
> UI presentation canonical owner：working/detailed-design/UI-UX/PHASE4-CAPABILITY-EVOLUTION.md。
>
> Durable data canonical owner：working/detailed-design/data-model/DATA-MODEL-DETAILED.md 的 Phase 4+ Evolution Knowledge Store。
>
> 上游：F04 Capability Registry / Resolution、F06 Remix / Refine、F07 Evidence、F10 Blueprint Reuse / Retrieval、F16 Result Correction、DATA-MODEL。
>
> 下游：F01 Intent Compilation、F02 Validation、F03 Runtime、未來 Creator / Capability Network。
>
> 核心原則：Capability Registry 保存「可以安全執行什麼」；Evolution Knowledge Store 保存「在什麼 App context 下，什麼改法反覆帶來較好 outcome」。兩者不可混成同一份 truth。

# 1. Purpose / User Outcome

User Outcome：

> User 不需要知道 Registry 裡有 50、500 或更多 Capability，也不需要自己閱讀技術元件清單；appf2 能在適當時機提出少量、相關、可理解的改善方向，讓 User 預覽、修改、採用或拒絕，並讓成功的 Share / Remix 經驗反過來改善未來 App。

appf2 不假設第一次 LLM composition 就是最佳 App。

~~~text
Create
→ Use
→ Share
→ Remix
→ Better Idea
→ Evidence
→ Better Suggestion
→ Refine / Remix
→ Better App
→ More Use / Share
→ More Evidence
~~~

F18 成功不是「用了更多 Capability」。

F18 成功是：

~~~text
更高 useful outcome
+ 更低 semantic mismatch
+ 更少 unnecessary complexity
+ 更高 meaningful use
+ 更自然 Share / Remix
+ 不降低 reliability / latency / cost / privacy
~~~

# 2. Scope / Non-Scope

## 2.1 Phase 4+ Scope

F18 正式負責：

- Current App enhancement discovery
- contextual compatible-capability discovery
- LLM-proposed enhancement normalization
- Remix / Reuse pattern mining input contract
- Evolution observation normalization
- evidence-backed pattern lifecycle
- recommendation candidate generation
- deterministic eligibility filtering
- evidence-aware ranking
- recommendation explanation
- User decision lifecycle
- recommendation → F06 Refine / Remix handoff
- Proven-pattern admission / downgrade / revoke policy
- recommendation telemetry / durable learning truth
- Evolution Knowledge Store DB contract
- privacy / anti-manipulation guardrails
- Acceptance / Test contract

## 2.2 Non-Scope

F18 不負責：

- Capability executable implementation
- Capability Registry source
- F01 general Intent semantic analysis
- F02 Blueprint trust validation
- F06 child Blueprint creation semantics
- F10 generic Blueprint retrieval
- automatic mutation of validated Blueprint
- arbitrary code/plugin generation
- popularity leaderboard
- social ranking of creators
- auto-install / auto-enable Capability
- Marketplace provider economics
- user profiling outside approved app context

# 3. Canonical Evolution Loop

~~~text
Current Validated Blueprint
+ Current Resolved Intent / App Context
+ Registry Snapshot
+ Compatible Unused Capabilities
+ Trusted Reuse / Remix Patterns
+ LLM Semantic Suggestions
+ Execution / Adoption / Correction Evidence
        ↓
Candidate Generation
        ↓
Deterministic Eligibility Filter
        ↓
Evidence-aware Ranking
        ↓
1–3 Contextual Enhancement Suggestions
        ↓
User:
  ACCEPT
  EDIT
  REJECT
  DISMISS
        ↓
ACCEPT / EDIT
→ F06 Refine / Remix
→ F01 Analyze / Compose
→ F04 Coverage
→ F02 Full Validation
→ New Immutable Blueprint
→ Preview / Use
→ New lineage + Evidence
        ↓
Evolution Observation
        ↓
Pattern Evidence Update
        ↓
Future Suggestions Improve
~~~

禁止：

~~~text
Recommendation
→ direct Blueprint patch
→ execute
~~~

所有被採用的 suggestion 都必須重新走 trusted App path。

# 4. Core Concepts

## F18-DATA-001 — Enhancement Candidate

~~~text
EnhancementCandidate
├─ candidate_id
├─ source_blueprint_hash
├─ context_digest
├─ title
├─ summary
├─ user_value_statement
├─ semantic_change
├─ proposed_capability_refs[]
├─ source_class
├─ evidence_level
├─ evidence_basis[]
├─ compatibility_status
├─ cost_class
├─ permission_class
├─ complexity_delta
├─ rank_score
├─ rank_reasons[]
├─ expires_at
└─ pattern_id?
~~~

source_class：

~~~text
LLM_PROPOSED
REMIX_PATTERN
REUSE_PATTERN
CAPABILITY_DISCOVERY
EXECUTION_EVIDENCE
HYBRID
~~~

evidence_level：

~~~text
NOVEL
OBSERVED
REPEATED
EVIDENCE_BACKED
PROVEN
~~~

Candidate 不是 executable truth，也不是 Blueprint。

## F18-DATA-002 — Evolution Context

F18 不做「全站最熱門 Capability」式推薦。

每次 recommendation 必須有 context：

~~~text
EvolutionContext
├─ source_blueprint_hash
├─ resolved_intent_class[]
├─ requested_outcome_class[]
├─ current_capabilities[]
├─ current_interaction_mode
├─ current_app_complexity
├─ current_cost_class
├─ permission_boundary
├─ device / surface class when material
├─ reuse_family_ref?      // only if F10 later defines one
└─ context_version
~~~

context_digest = canonicalized EvolutionContext 的 deterministic digest。

原則：

- Raw Prompt 不作 ranking key。
- Sensitive user input 不進 context signature。
- 同一個 Capability 在不同 context 可有完全不同 evidence。
- Context 只使用 product-approved semantic metadata，不建立隱性人物 profile。

## F18-DATA-003 — Evolution Pattern

Evolution Pattern 是可重用的「改善方式」，不是 executable code。

~~~text
EvolutionPattern
├─ pattern_id
├─ pattern_version
├─ pattern_type
├─ context_scope
├─ semantic_change_contract
├─ capability_changes[]
├─ preconditions[]
├─ incompatibilities[]
├─ expected_value_classes[]
├─ maturity_status
├─ evidence_policy_version
├─ created_at
└─ retired_at?
~~~

pattern_type：

~~~text
ADD_CAPABILITY
REMOVE_CAPABILITY
REPLACE_CAPABILITY
RECONFIGURE_CAPABILITY
RULE_CHANGE
LAYOUT_CHANGE
COMPOSITION_CHANGE
MULTI_CHANGE
~~~

Pattern 不保存 JS、React path、provider secret 或 executable callback。

# 5. Registry Truth vs Evolution Truth

## F18-RQ-001

Capability Card implementation 不存進 Evolution DB。

Canonical separation：

~~~text
Capability Registry
= capability_id/version
+ executable contract
+ runtime handler
+ security/resource boundary
+ compatibility
+ availability

Evolution Knowledge Store
= capability_id/version reference
+ semantic context
+ observed change
+ recommendation
+ adoption/rejection
+ outcome evidence
+ pattern maturity
~~~

所以：

> 一個「被證明很有價值的 Timer Capability」不是把 Timer code 複製進 DB；而是 DB 累積「logic.timer@1.0.0 在哪些 App context、透過哪些 enhancement pattern、得到什麼 outcome evidence」。

Registry capability 被 DISABLED / REVOKED 後：

- F18 不得再推薦。
- 既有 pattern 必須 downgrade / suspend。
- 歷史 evidence 保留作 audit，但不可作 executable eligibility。

# 6. Candidate Generation

F18 允許四條候選來源並行。

## F18-RQ-002 — Source A: Compatible Unused Capabilities

~~~text
Current Blueprint
→ current CapabilityRefs
→ F04 Registry
→ ENABLED + compatible capabilities not currently used
→ semantic relevance filter
→ candidate ideas
~~~

不是把所有 unused capabilities 都推薦。

最低 filter：

- ENABLED
- compatible with current registry/runtime
- dependencies satisfiable
- permission/cost allowed
- semantic relevance exists
- no obvious duplicate function
- complexity budget not exceeded

## F18-RQ-003 — Source B: Remix / Reuse Patterns

~~~text
similar context
+ repeated parent→child lineage deltas
+ child adoption / use evidence
→ candidate pattern
~~~

Remix frequency alone不可升級為推薦。

## F18-RQ-004 — Source C: LLM Semantic Suggestion

LLM 可以回答：

> 「如果要讓這個 App 更有用／更好玩／更容易理解，還可以加什麼？」

但 LLM 只能提出 semantic suggestion + known Capability references。

LLM 不得：

- 創造 Registry 不存在 capability
- 宣稱 popularity / evidence
- 自行把 suggestion 升為 PROVEN
- bypass eligibility filter
- 決定 final user-facing rank

## F18-RQ-005 — Source D: Trusted Blueprint / Family Delta

若 F10 未來有 trusted reuse family：

~~~text
current App
→ trusted related Blueprint family
→ material delta analysis
→ historically useful enhancement
→ candidate
~~~

F18 不擁有 F10 retrieval truth。

# 7. Deterministic Eligibility Filter

## F18-POL-001

任何 Candidate 在 ranking 前必須通過 deterministic filter。

Reject candidate if：

1. Capability unavailable / revoked / incompatible。
2. Required dependency unavailable。
3. semantic relevance 不足。
4. 與 current App 已有能力實質重複，且沒有明確替換價值。
5. 會破壞 current MUST_PRESERVE semantic core。
6. 需要新的 material permission / cost，但 candidate 未標示。
7. 風險 / latency / complexity 超過該 surface budget。
8. Pattern evidence 已被 revoked / contradicted。
9. Candidate 依賴 sensitive context 但沒有合法 consent / persistence boundary。
10. Candidate 只能靠 popularity 支持，沒有 semantic fit。

LLM confidence 不能 override filter。

# 8. Ranking Policy

## F18-POL-002

Phase 4+ 初始 ranking 採 deterministic weighted policy；不是直接讓 LLM排順序。

Conceptual score：

~~~text
Expected User Value
× Semantic Fit
× Evidence Strength
× Compatibility Confidence
× Novel Utility
− Complexity Cost
− Permission Friction
− Runtime / External Cost
− Reliability Risk
~~~

實際 weights 必須 versioned：

~~~text
ranking_policy_version
~~~

Ranking policy 初始值在 Phase 4 activation 依真實 traffic / metrics human-approved，不在 Phase 1 提前亂猜數字。

規則：

- PROVEN 不代表永遠排第一。
- Novel candidate 可以出現，但 UI 必須標示為 idea / suggestion，不可冒充 evidence-backed。
- 同一 App 一次最多顯示 3 個 primary suggestions。
- User 明確點「更多點子」後可顯示更多 compatible ideas。
- 過去拒絕的同一 pattern 不應短期重複騷擾 User。

# 9. Pattern Maturity

## F18-POL-003

Evolution Pattern lifecycle：

~~~text
OBSERVED
→ REPEATED
→ EVIDENCE_BACKED
→ PROVEN
→ RETIRED / REVOKED
~~~

### OBSERVED

至少有一個合法 parent→child evolution observation。

不代表值得推薦給其他 User。

### REPEATED

同類 context 出現多次獨立 observation，且不是同一個 actor / Blueprint chain 重複灌出。

具體 minimum threshold由 evidence policy version控制。

### EVIDENCE_BACKED

除了反覆出現，還有足夠 downstream evidence：

- child meaningful use
- preview acceptance
- share / remix continuation
- correction / revert
- failure / abandonment
- latency / cost / reliability

且 guardrail metrics 沒有重大惡化。

### PROVEN

只有更高證據門檻才能使用 PROVEN。

PROVEN 必須至少符合：

1. REPEATED + EVIDENCE_BACKED。
2. sample / independence threshold達標。
3. reliability / semantic mismatch / correction guardrails沒有 unacceptable regression。
4. 使用受控 experiment、holdout、或 Human-approved quasi-experimental evaluation顯示 target outcome有可信改善。
5. evidence policy version與 evaluation method可追溯。

單純「很多人用了」永遠不能升 PROVEN。

### RETIRED / REVOKED

- 新 evidence 顯示效果不再成立
- Registry capability revoked
- runtime / compatibility change
- safety / privacy issue
- severe regression

PROVEN 可以被 downgrade；不是永久 badge。

# 10. Proven Evidence Policy Contract

## F18-DATA-004

~~~text
EvolutionEvidencePolicy
├─ policy_version
├─ min_observations
├─ min_distinct_source_blueprints
├─ min_distinct_actors
├─ min_applied_recommendations
├─ min_meaningful_use
├─ required_metrics[]
├─ guardrail_metrics[]
├─ evaluation_method
├─ min_effect_requirement
├─ max_guardrail_regression
└─ evidence_window
~~~

evaluation_method：

~~~text
OBSERVATIONAL_ONLY
MATCHED_HOLDOUT
CONTROLLED_EXPERIMENT
HUMAN_REVIEWED_MULTI_SIGNAL
~~~

Rules：

- OBSERVATIONAL_ONLY 最多升到 EVIDENCE_BACKED，不得單獨升 PROVEN。
- PROVEN 必須使用非純觀察式 evidence 方法。
- threshold / weight / effect requirement 全部 versioned。
- Policy change 不 retroactively rewrite old evidence；重新 evaluation 產生新 evidence snapshot。

# 11. UX Entry Points

F18 不打斷 First Value。

## F18-UX-001 — Entry Timing

允許顯示 enhancement 的時機：

- App 已有 meaningful use 後
- User 主動點「改善 / 加點東西」
- Share / Remix 回流後有新 evidence
- User完成一次 Refine / Remix 後
- User明確要求「還可以加什麼？」

不允許：

- App 還沒第一次 ready 就塞 recommendation
- Clarification 尚未完成時插入 feature upsell
- Recovery/error 當下用 recommendation掩蓋 failure

## F18-UX-002 — App Surface

主要入口：

~~~text
APP
→ Improve / 再加點東西
~~~

Panel / sheet：

~~~text
Recommended for this App
1. suggestion
2. suggestion
3. suggestion

More ideas
→ compatible idea discovery
~~~

User 不看到 capability_id。

看到的是：

~~~text
「加一個限時回合」
讓每輪在 30 秒內完成

「加入隊伍計分」
適合多人分組玩法
~~~

## F18-UX-003 — Suggestion Card

每張 suggestion 至少顯示：

- outcome-first title
- 一句「會改變什麼」
- expected value
- 若有：Evidence label
- 若有：cost / permission / external dependency
- Try
- Edit idea
- Not for me

Evidence label：

~~~text
New idea
Seen in similar remixes
Evidence-backed
Proven for similar Apps
~~~

不得顯示無法支持的「最佳」、「大家都愛」等暗示。

## F18-UX-004 — More Ideas

為解決「Registry 有很多能力但 LLM第一次沒選到」：

User 可主動進入：

~~~text
Improve
→ More ideas
→ context-filtered compatible ideas
~~~

這不是 raw Registry catalog。

可用 human categories：

- Make it easier
- Make it more visual
- Make it more social
- Add game mechanics
- Add timing / scoring
- Add media
- Add external capability

只呈現 F04 判定 compatible 的能力方向。

## F18-UX-005 — Try / Preview

Try 不立即覆蓋 Current App。

~~~text
Suggestion
→ F06 change context
→ F01/F04/F02
→ child Blueprint
→ F06 PREVIEW_READY
→ User:
   Use New Version
   Keep Previous
   Adjust Again
~~~

## F18-UX-006 — Edit Idea

User 可修改：

~~~text
「加入 30 秒 timer」
→ 「改成每人 15 秒，而且最後 5 秒要有提示」
~~~

EDIT 之後是 User change request，走正常 semantic analysis。

# 12. Frontend State

## F18-STATE-001

~~~text
CLOSED
→ LOADING
→ READY
→ SUGGESTION_SELECTED
→ HANDOFF_TO_REFINE
→ PREVIEW
→ APPLIED

Branches:
READY → EMPTY
READY → ERROR
READY → MORE_IDEAS
SUGGESTION_SELECTED → DISMISSED | REJECTED
~~~

Frontend 保留：

- source blueprint_hash
- recommendation IDs
- current panel state
- User edit draft
- handoff intent_id when created

Frontend 不保存：

- hidden ranking model internals
- raw evidence rows
- unrestricted similarity corpus
- executable pattern body

# 13. API Contract

Shared transport / auth / error conventions沿用 API-CONVENTIONS。

## F18-API-001 — Get Contextual Enhancements

~~~text
GET /api/v1/blueprints/{content_hash}/enhancements
    ?surface=APP
    &limit=3
~~~

Server：

1. verify Blueprint exists / trusted。
2. build EvolutionContext。
3. generate candidates。
4. F04 eligibility。
5. rank。
6. persist recommendation exposure identity。
7. return bounded consumer payload。

Response logical shape：

~~~json
{
  "blueprint_hash": "sha256:...",
  "ranking_policy_version": "evrank-1",
  "recommendations": [
    {
      "recommendation_id": "uuid",
      "title": "加入限時回合",
      "summary": "讓每一輪有明確節奏",
      "evidence_level": "EVIDENCE_BACKED",
      "cost_class": "LOCAL",
      "permission_required": false
    }
  ]
}
~~~

## F18-API-002 — Record Decision

~~~text
POST /api/v1/enhancement-recommendations/{recommendation_id}/decision
~~~

Request：

~~~json
{
  "decision": "REJECT"
}
~~~

decision：

~~~text
ACCEPT
EDIT
REJECT
DISMISS
~~~

ACCEPT / EDIT 不直接 compile；它建立/準備 F06 change context。

正式 child creation仍走：

~~~text
POST /api/v1/intents
intent_kind = REFINE | REMIX
source.type = EVOLUTION_RECOMMENDATION
recommendation_id = ...
~~~

避免建立第二套 compiler lifecycle。

## F18-API-003 — More Ideas

~~~text
GET /api/v1/blueprints/{content_hash}/enhancements
    ?surface=MORE_IDEAS
    &category=GAME_MECHANICS
    &cursor=...
~~~

只回傳 compatible / eligible ideas。

不得變成 unrestricted Registry dump API。

# 14. Backend Processing

## F18-RQ-006 — Candidate Pipeline

~~~text
Load Blueprint
→ derive safe semantic context
→ fetch Registry compatibility projection
→ retrieve candidate patterns
→ optionally ask LLM for novel semantic ideas
→ normalize all candidates
→ deterministic eligibility filter
→ dedupe semantic equivalents
→ score / rank
→ diversity pass
→ persist recommendation exposure
→ return top candidates
~~~

Diversity pass 避免三張卡都是同一類小變化。

## F18-RQ-007 — Evolution Observation Builder

每次成功產生 child lineage後：

~~~text
parent Blueprint
+ child Blueprint
+ lineage relation
+ semantic delta / intent
→ normalized EvolutionObservation
~~~

Observation 只記 semantic / capability change，不複製 entire Blueprint。

## F18-RQ-008 — Outcome Aggregation

Observation 後續透過既有 domain truth / F07 Evidence 聚合：

- preview accepted / kept previous
- meaningful use
- share
- remix
- correction
- revert
- runtime failure
- cost / latency where material

Raw product_event 有 retention；F18 長期知識保存的是 privacy-safe aggregate / pattern evidence snapshot。

# 15. LLM Boundary

## F18-POL-004

LLM 在 F18 只做：

- semantic enhancement ideation
- explanation drafting
- semantic equivalence / change normalization assistance
- context interpretation within supplied bounded metadata

LLM 不做：

- final availability truth
- final compatibility truth
- pattern maturity promotion
- PROVEN decision
- raw DB query自由探索
- direct Blueprint mutation
- final deterministic rank eligibility

# 16. Data / DB Read-Write

F18 讀：

- blueprint_content
- blueprint_lineage
- Registry projection / compatibility
- F07 evidence aggregates / domain lifecycle truth
- F16 correction outcome
- F10 reuse metadata when available
- F19 Shared App Data privacy-safe aggregates / participation outcomes
- F20 / F15 bounded commerce aggregates when available
- Phase 4 Evolution Knowledge Store

F18 寫：

- evolution_observation
- evolution_pattern
- evolution_pattern_capability
- evolution_pattern_evidence
- enhancement_recommendation
- enhancement_decision

F18 不寫：

- Capability Registry executable definition
- source Blueprint body
- child Blueprint body directly
- arbitrary User profile
- raw Prompt warehouse
- raw Result warehouse

Exact tables由 DATA-MODEL-DETAILED Phase 4+ canonical section定義。

# 17. Error / Recovery

| ID | Meaning | Retry | Consumer Direction |
|---|---|---:|---|
| F18-ERR-001 | SOURCE_BLUEPRINT_UNAVAILABLE | NO | 返回 current safe state |
| F18-ERR-002 | NO_ELIGIBLE_ENHANCEMENT | NO | 顯示「目前沒有特別建議」 |
| F18-ERR-003 | REGISTRY_CONTEXT_MISMATCH | CONDITIONAL | refresh / retry |
| F18-ERR-004 | PATTERN_EVIDENCE_UNAVAILABLE | YES | fallback to safe non-evidence suggestion or none |
| F18-ERR-005 | RANKING_FAILED | YES | deterministic fallback / no suggestion |
| F18-ERR-006 | RECOMMENDATION_EXPIRED | NO | refresh suggestions |
| F18-ERR-007 | DECISION_CONFLICT | CONDITIONAL | load current recommendation state |
| F18-ERR-008 | HANDOFF_TO_F06_FAILED | YES | preserve selected idea / retry |
| F18-ERR-009 | PATTERN_REVOKED | NO | remove candidate / refresh |
| F18-ERR-010 | PRIVACY_CONTEXT_BLOCKED | NO | omit sensitive signal |

Recommendation failure 不得阻斷 Current App 使用。

# 18. Security / Privacy

## F18-SEC-001

Evolution Engine 不得形成 hidden behavioral profile。

Allowed ranking context：

- App semantic class
- Blueprint / Capability structure
- approved lineage / reuse metadata
- bounded product evidence
- explicit User decision on recommendations

Forbidden：

- fingerprint
- cross-site identity
- raw private prompt corpus直接 ranking
- raw result values
- sensitive runtime input
- unbounded free-form telemetry
- covert demographic inference

## F18-SEC-002

Community Remix evidence 必須 aggregate / thresholded 後才可顯示 community-derived claim。

低樣本不得顯示「常見 Remix」。

## F18-SEC-003

Paid / permission / external capability recommendation 必須在 suggestion card明確標示，不得以 enhancement名義偷偷增加 cost / permission。

# 19. Evidence Events

F18 event family 在 Phase 4 activation 時加入 generated Evidence Registry。

~~~text
F18-EVT-001 enhancement_surface_opened
F18-EVT-002 recommendation_shown
F18-EVT-003 recommendation_selected
F18-EVT-004 recommendation_accepted
F18-EVT-005 recommendation_edited
F18-EVT-006 recommendation_rejected
F18-EVT-007 recommendation_dismissed
F18-EVT-008 recommendation_child_validated
F18-EVT-009 recommendation_child_accepted
F18-EVT-010 recommendation_child_kept_previous
F18-EVT-011 pattern_promoted
F18-EVT-012 pattern_downgraded
F18-EVT-013 pattern_revoked
~~~

Event properties只允許：

- pattern_id
- evidence_level
- source_class
- category
- rank_position
- policy_version
- coarse cost/permission class
- child outcome class

禁止 raw suggestion edit text進 telemetry。

# 20. Metrics

## Product Value

- suggestion exposure → selection
- selection → preview
- preview → accepted child
- accepted child → meaningful use
- accepted child → share
- accepted child → remix
- accepted child → Shared Participation / Data adoption where F19 applies
- correction / revert after suggestion
- recommendation rejection / dismissal

## Evolution Quality

- Pattern Repeat Rate
- Evidence-backed Pattern Yield
- Proven Pattern Yield
- Proven Pattern Downrank / Revoke Rate
- Recommendation Semantic Mismatch Rate
- Recommendation-caused Correction Rate
- Suggestion Diversity

## Guardrails

- App complexity delta
- Runtime failure delta
- latency delta
- cost delta
- permission friction
- abandonment delta
- User reject / dismiss fatigue

Commerce / revenue可以作 downstream outcome signal，但：

> **Sales ≠ Semantic Correctness；Revenue ≠ PROVEN。**

不能只看 CTR、GMV 或 purchase conversion。

# 21. Acceptance Criteria

## Technical

- F18-AC-001 Recommendation 不得包含 Registry 不存在 / 不可用的 CapabilityRef。
- F18-AC-002 Recommendation 接受後不得直接 mutation source Blueprint。
- F18-AC-003 ACCEPT / EDIT 必須走 F06 → F01 → F04 → F02 trusted path。
- F18-AC-004 Registry revoke 後相關 candidate 不得繼續 eligible。
- F18-AC-005 recommendation_id / policy_version / pattern_id 可 trace。

## Semantic / Product

- F18-AC-006 User 不需要閱讀 raw Capability catalog 即可發現新能力。
- F18-AC-007 More Ideas 只能顯示 current context compatible ideas。
- F18-AC-008 popularity alone 不得形成 EVIDENCE_BACKED / PROVEN。
- F18-AC-009 LLM novel suggestion 必須標示與 evidence-backed suggestion不同。
- F18-AC-010 suggestion failure 不阻斷 Current App。
- F18-AC-011 rejected suggestion 不得短期反覆騷擾同一 User/App context。
- F18-AC-012 recommendation 不得偷偷引入 material cost / permission。

## Evolution / Evidence

- F18-AC-013 parent→child change可形成 normalized EvolutionObservation。
- F18-AC-014 pattern promotion可追到 evidence policy version。
- F18-AC-015 OBSERVATIONAL_ONLY evidence不得單獨升 PROVEN。
- F18-AC-016 PROVEN pattern可因新 evidence / Registry revoke被 downgrade或revoke。
- F18-AC-017 raw event retention結束後仍可保留 privacy-safe pattern aggregate。
- F18-AC-018 recommendation decision與 resulting child lineage可 trace。
- F18-AC-019 capability/version evidence不取代 Registry executable truth。

## Privacy / Safety

- F18-AC-020 raw Prompt / result / sensitive runtime input不得進 ranking evidence store。
- F18-AC-021 community-derived claim低樣本不得顯示。
- F18-AC-022 no fingerprint / hidden identity stitching。
- F18-AC-023 recommendation telemetry符合 F07 allowlist / retention model。

# 22. Test Mapping Seed

~~~text
F18-AC-001 → TEST-F18-001 unknown/revoked capability filtered
F18-AC-002 → TEST-F18-002 no direct Blueprint mutation
F18-AC-003 → TEST-F18-003 trusted refine handoff
F18-AC-008 → TEST-F18-008 popularity cannot promote evidence level
F18-AC-009 → TEST-F18-009 novel-vs-evidence label integrity
F18-AC-012 → TEST-F18-012 cost/permission disclosure
F18-AC-015 → TEST-F18-015 observational cannot become PROVEN
F18-AC-016 → TEST-F18-016 downgrade/revoke lifecycle
F18-AC-018 → TEST-F18-018 recommendation→intent→lineage trace
F18-AC-020 → TEST-F18-020 sensitive content exclusion
~~~

# 23. Activation Gate

F18 不得因 roadmap 日期自動啟用。

至少需要：

1. Registry breadth 足以讓 contextual discovery有實際選擇空間。
2. Capability compatibility / dependency metadata可靠。
3. Share / Remix 已有真實 usage。
4. blueprint_lineage quality足以辨識 evolution。
5. F07 Evidence能區分 meaningful use / share / remix / correction / revert。
6. F10 或替代 retrieval能提供相似 context / trusted reusable signals。
7. Evolution DB migration完成。
8. ranking / evidence policy Human-approved。
9. UX可證明不干擾 First Value。
10. Recommendation experiment / holdout infrastructure可用。
11. Privacy review PASS。
12. Phase 4+ Human approval + Build Freeze inclusion。

# 24. Phase 1–3 Preservation Rule

Phase 1–3 只需要保留未來地基：

- immutable Blueprint
- lineage
- capability/version evidence
- meaningful use
- share / remix
- F19 shared participation / bounded shared-data outcomes
- F20 / F15 commerce outcomes as non-authoritative product evidence
- correction / revert
- Registry compatibility
- privacy-safe evidence

不提前建：

- recommendation engine
- pattern mining service
- evolution knowledge tables
- ML ranking service
- popularity UI
- auto-apply

> **先快速證明 Core → Reuse → Scale；Phase 4+ 才把累積的 evidence 轉成 Evolution Engine。**

# 25. Core Moat Thesis

> **appf2 的 Evolution Engine 不是「LLM 再想一個點子」。它是把 Capability Inventory、Share / Remix Lineage、真實 Execution Outcome 與 User Decision 累積成可追溯的 Product Knowledge，讓系統逐步知道：在什麼 App context 下，加入、移除或重組哪些能力，真的比較可能讓 App 變好。**

因此：

> **Share 不只是 Distribution；Remix 不只是 Fork；它們共同產生 appf2 專屬的 Software Evolution Evidence。**
