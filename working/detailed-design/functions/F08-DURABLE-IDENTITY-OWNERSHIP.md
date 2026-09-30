# F08 — Durable Identity / Ownership

> 狀態：DEFERRED_BASELINE / NOT_BUILD_FREEZE_READY
>
> Activation Gate：日期本身不 unlock；只有 Evidence + Human approval + complete Detailed Design + Build Freeze inclusion 才可進 implementation scope。
>
> Horizon：Phase 2 / 2–3 月
>
> Delivery 規則：`working/common-core/DESIGN-TO-DELIVERY.md`
>
> Function Portfolio / Dependency / Release Scope：`working/detailed-design/APP-DETAILED-DESIGN-OVERVIEW.md`

# 1. Purpose / User Outcome

F08 讓 appf2 從 anonymous artifact continuity 升級成 durable Creator identity / ownership。

核心不是「誰登入」，而是：

> **每一個 App Version 都能清楚回答：這一版是誰建立、誰擁有、直接從哪一版來、整個 App Family 的 Root Creator 是誰。**

~~~text
anonymous_id
→ durable value requested
→ authenticate
→ claim eligible anonymous artifacts
→ user_id
→ durable ownership / attribution
~~~

Authentication 不得阻擋 First Value。

# 2. Version-scoped Ownership

Ownership 永遠屬於某一個 App Version，不是整個 ancestry。

~~~text
A creates V1 → A owns V1
B remixes V1 → B owns V2
C remixes V2 → C owns V3
~~~

A 不因為是 Root Creator 就擁有 B / C 的 Version。

## F08-POL-001 — Purchase Is Not Ownership Transfer

~~~text
B purchases A Version
→ B gets Play + Remix entitlement
→ A still owns A Version

B actually remixes
→ create new child Version
→ B owns child Version
~~~

Purchase 永遠不得把 Parent owner改成 Buyer。

# 3. App Family / App Version Metadata Layer

~~~text
AppFamily
- family_id
- root_version_id
- root_creator_user_id

AppVersion
- app_version_id
- family_id
- blueprint_hash
- creator_user_id
- owner_user_id
- parent_version_id?
- lineage_relation
- created_at
~~~

Rules：

1. Blueprint content 仍 immutable / content-addressed。
2. Ownership / creator profile 不進 Blueprint body。
3. `blueprint_lineage` 仍保存 immutable content relation；AppVersion metadata 不改寫歷史 lineage。
4. Root pointer 是 lineage 的 durable lookup / attribution projection，不得取代 lineage audit truth。
5. 同一 Content Hash 不得被假設天然等於同一 Ownership object。

# 4. Root Creator / Direct Parent

Root Creator = 整個 App Family 最初建立 Original Version 的 Creator。

Root Creator 永久保留：

- attribution
- provenance
- family identity
- dispute / abuse traceability
- F18 Evolution family grouping

Root Creator不代表：

- 擁有所有 descendants
- 可以任意刪除 descendants
- 永久取得 descendants revenue

只有 Root Creator 同時是某次 sale 的 Direct Parent Creator時，才可依 F15/F20 policy取得該筆 royalty。

Direct Parent = 目前 Version 直接 REMIX 的 source Version，用於 immediate lineage attribution、provenance、bounded commerce royalty eligibility。

# 5. Consumer-facing Attribution Labels

Original App：

~~~text
Created by A
~~~

Remixed App：

~~~text
Remixed by Z
Remixed from Y’s version
Root Creator: A
~~~

一般 Consumer Card 不顯示 owner_user_id、License holder、derivative-work / fork ownership internals。

# 6. Anonymous Claim

Anonymous artifacts 可在 durable identity建立後安全 claim，但必須：

- 只 claim 可證明由該 anonymous continuity建立的 artifact；
- idempotent；
- public share recipient不是 owner；
- conflict fail closed；
- claim不 mutation Blueprint；
- lineage / original timestamps不重寫。

Public Share ≠ Ownership。

# 7. Permission / Commerce Boundary

F08 擁有 identity / ownership / attribution / family / root；不擁有：

- Remix compilation → F06
- Shared App Data → F19
- Paid entitlement / quota → F13 + F20
- transaction / payout → F15
- Evolution ranking → F18

要把 App 設成 PAID / 收款 / payout，Creator 必須有 durable identity。

# 8. Acceptance Baseline

- F08-AC-001 existing eligible anonymous artifacts可安全 claim。
- F08-AC-002 public share / open不建立 ownership。
- F08-AC-003 ownership / permission與 Blueprint content分離。
- F08-AC-004 purchase不得 transfer Parent ownership。
- F08-AC-005 REMIX child可建立自己的 owner identity。
- F08-AC-006 Root Creator可在任意 lineage depth穩定解析。
- F08-AC-007 Root Creator不自動擁有 descendant。
- F08-AC-008 Consumer attribution可區分 Created by / Remixed by / Remixed from / Root Creator。
- F08-AC-009 identical Blueprint content不得因此合併不同 ownership context。
- F08-AC-010 claim / ownership conflict fail closed且可 audit。

# 9. Activation Work Remaining

此文件已固定 Human-approved ownership / lineage product policy，但仍是 deferred baseline。

啟用前仍需補齊 authenticated UI / claim UX、exact API/schema、authorization、deletion / dispute、account recovery、privacy、evidence、Acceptance → Test、unresolved blockers = 0。

缺少的 Product Design 不得由 appf2-build / Cursor自行補決策。
