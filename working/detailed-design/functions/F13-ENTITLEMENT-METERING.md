# F13 — Entitlement / Metering

> 狀態：DEFERRED_BASELINE / NOT_BUILD_FREEZE_READY
>
> Horizon：Phase 3+ / evidence-gated

# 1. Purpose

F13分開兩個 entitlement 軸：

~~~text
Axis A — App entitlement
Recipient有沒有權 Play + Remix 某個 PAID App？

Axis B — Creator resource entitlement
Creator的App可以使用多少 appf2 resource？
~~~

Axis A commerce UX由F20擁有；Axis B plan / quota enforcement由F13擁有。

# 2. Axis A — FREE / PAID App Entitlement

~~~text
FREE → Play + Remix
PAID → one-time purchase → Play + Remix
~~~

沒有 Free Play + Paid Remix、separate Remix purchase、ownership transfer purchase。

# 3. Axis B — Creator Plan Entitlement

App Price與Creator Plan獨立：

~~~text
Free Creator + FREE App
Free Creator + PAID App
Creator Pro + FREE App
Creator Pro + PAID App
~~~

Creator Plan買resource envelope，不是銷售權。

# 4. Initial Working Plan Configuration

Human-approved Working defaults；正式 activation前仍需成本 / usage evidence校正。所有值必須進 versioned config，不 hard-code。

| Key | Free Creator | Creator Pro |
|---|---:|---:|
| monthly_price_usd | 0 | 12 |
| annual_effective_monthly_target_usd | 0 | ~10 |
| active_shared_data_apps | 3 | 25 |
| shared_records_per_app | ~100 | ~10,000 |
| monthly_shared_participants | ~1,000 | ~10,000 |
| shared_ranking_vote_counter | YES | YES |
| advanced_shared_records | BASIC | EXPANDED |
| shared_retention_history | BOUNDED | LARGER / LONGER |
| private_app_or_data | NO | YES |
| basic_realtime | NO | YES when F09 activated |
| realtime_concurrent_per_app | 0 | ~50 Working target |
| ai_create_remix_allowance | BASIC | HIGHER |

Future Scale plan只有真實高 traffic / storage / realtime evidence才設計。

# 5. Human-facing Limits

UI優先顯示 Shared Apps、records、participants、Realtime、history，不要求User理解DB MB/GB、egress、raw API/message counts。Backend mapping必須versioned / auditable。

# 6. Viral Grace / Safe Degradation

~~~text
~80% → warn Creator
100% → temporary viral grace → upgrade prompt
grace exhausted → restrict costly Shared Data writes / Realtime first
→ preserve safe local App use / reads whenever possible
~~~

不得因單一quota超限讓已分享App不必要地整體死亡。

# 7. Metering / Enforcement

F13 activation至少包含 entitlement policy、versioned plan config、quota/usage、purchase entitlement、metering、premium enforcement、cost attribution、audit、grace/degradation state。

# 8. Acceptance Baseline

- F13-AC-001 App Price與Creator Plan可獨立組合。
- F13-AC-002 PAID一次解鎖Play + Remix。
- F13-AC-003 entitlement不 transfer ownership。
- F13-AC-004 plan limits由versioned config載入，不 hard-code。
- F13-AC-005 Free / Pro shared-data limits可正確 enforce。
- F13-AC-006 F09未 activation時不得假裝Realtime可用。
- F13-AC-007 quota warning / grace可觀測。
- F13-AC-008 exhausted優先bounded degradation。
- F13-AC-009 usage / entitlement / policy version可audit。
- F13-AC-010 cost-bearing action不能偷偷執行。

# 9. Status Note

仍非Build Freeze input。啟用前需完成exact config schema、billing lifecycle、purchase entitlement、meter source、grace/overage、quota reset、refund revoke、cross-device entitlement、security/fraud、tests、Human approval。
