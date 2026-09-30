# F19 — Shared App Data / Social Persistence

> 狀態：WORKING_BASELINE / NOT_BUILD_FREEZE_READY
>
> Horizon：Phase 1 Product Proof extension；activation evidence-gated。
>
> Human Decision：Shared Durable App Data 已確認為 appf2 post-generation core competency之一。
>
> Delivery：只有 complete Detailed Design + Acceptance + Human-approved Build Freeze inclusion 後才可進 Cursor / appf2-build。

# 1. Purpose / User Outcome

> **不同使用者不必同時在線，也能在同一個 Shared App 中共同累積 durable data。**

~~~text
A 今天玩 → score 5
B 明天玩 → score 8
C 後天玩 → score 6
→ A / B / C 都看到同一 Shared Ranking
~~~

這不是 F09 Realtime。

# 2. Canonical Boundary

~~~text
F03 Runtime = local mutable state
F05 Share = immutable App definition
F19 Shared Data = recipients跨時間共同讀寫 bounded durable App data
F09 Realtime = Presence + live shared mutable session
~~~

# 3. Phase 1 Product Proof Capability Set

- Shared Ranking
- Shared Vote
- Shared Counter
- bounded Shared Records

不提供raw SQL、table designer、Supabase project UI、arbitrary schema、user-defined RLS、DB credentials、unrestricted KV dump。

User experience：

> 「我要排行榜」→ appf2安全提供Shared Ranking，而不是叫User建立資料表。

# 4. Shared Data Scope / Remix

F19用opaque `shared_data_scope_id` 分離durable mutable data與immutable Blueprint。

same Shared App → same approved Shared Data Scope。

Hard rule：

> **REMIX child 預設建立新的 Shared Data Scope。**

~~~text
A 18啦 → Ranking Scope A
B remixes A → B child → Ranking Scope B
~~~

B不得自動讀寫A scope。same-Creator REFINE若未來保留舊scope，必須explicit compatibility / migration，不自動。

# 5. Read / Write Policy

每個Shared Data Capability定義read/write eligibility、participant identity、dedupe、rate limit、validation、payload limit、retention、abuse、reset/archive。

Client提交capability operation，不是SQL：

~~~text
ranking.submitScore(...)
vote.cast(...)
counter.increment(...)
~~~

# 6. Creator Plan / Quota

F13提供versioned plan config；F19不hard-code。

Working baseline：

~~~text
Free: 3 Shared-Data Apps / ~100 records per App / ~1,000 monthly participants
Pro: 25 / ~10,000 records / ~10,000 participants / expanded records / larger history / private eligibility
~~~

Quota UX：

~~~text
~80% warn
100% temporary viral grace
grace exhausted → throttle costly writes first → preserve safe read/local play
~~~

# 7. Privacy / Evidence

Anonymous-first where possible；no raw DB credentials；payload allowlist；rate limit；public share≠DB admin。

Evidence可以記shared-data adoption / participant buckets / quota / upgrade / share-remix outcome，但不得dump raw participant content。

F18可使用privacy-safe aggregates；Shared Data popularity alone ≠ PROVEN improvement。

# 8. Acceptance Baseline

- F19-AC-001 同一Shared App recipients可跨時間看到同一approved shared data。
- F19-AC-002 不要求Realtime Room。
- F19-AC-003 data不進immutable Blueprint body。
- F19-AC-004 Client不能建立arbitrary DB schema/SQL。
- F19-AC-005 REMIX child預設fresh scope。
- F19-AC-006 child不能自動寫Parent scope。
- F19-AC-007 operations server-side validate。
- F19-AC-008 quota由F13 versioned config提供。
- F19-AC-009 quota超限優先bounded degradation。
- F19-AC-010 evidence不dump raw content。
- F19-AC-011 scope resolution不等於sharing private Runtime state。
- F19-AC-012 Ranking POC可證明A/B/C不同時間共同參與。

# 9. Activation Work Remaining

需完成exact schema/migration、Capability Cards、API、permission、retention/reset、abuse/privacy、quota/grace、UI/error/recovery、evidence registry、tests、Infra cost simulation、Human Build Freeze approval。

> **F19存在於Working SSOT，不代表目前Sprint自動增加implementation scope。**
