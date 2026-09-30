# F15 — Transaction / Settlement

> 狀態：DEFERRED_BASELINE / NOT_BUILD_FREEZE_READY
>
> Horizon：Phase 3+ Creator Commerce / later Capability Commerce

# 1. Purpose

F15 是 money truth：transaction lifecycle、idempotency、payment result、durable ledger、refund/reversal、reconciliation、revenue split、payout / settlement audit。

# 2. Paid App Bounded Revenue Split

Eligible Direct Parent = Seller Version由另一位Creator的Version直接REMIX：

~~~text
Current Seller         80%
Direct Parent Creator   5%
appf2                   15%
Other ancestors          0%
~~~

Example：

~~~text
A → B → C → D
D sells for $10
D = $8.00
C = $0.50
appf2 = $1.50
B = $0
A / Root = $0
~~~

No eligible Direct Parent（Original、same-Creator REFINE/self-derived、no valid payable parent）：

~~~text
Current Seller 85%
appf2           15%
~~~

不存在的parent 5%回Seller，不增加appf2 share。

# 3. Root Creator Rule

Root Creator永久保留attribution / lineage，但不永久抽成。只有Root同時是該筆sale的Direct Parent時才拿5%。

# 4. FREE Parent → PAID Child

~~~text
A Parent = FREE
B remixes A → B child = PAID
B child sells
→ B 80% / A 5% / appf2 15%

C later sells its child
→ C 80% / B 5% / appf2 15% / A 0%
~~~

不形成永久royalty chain。

# 5. Settlement Base / Refund

Split比例已固定；tax、processor fee、FX、refund的gross/net accounting order尚未Build Freeze。Activation前必須明確disclose。

Refund / chargeback必須 durable reversal / adjustment，不刪原transaction、不靠Frontend減數字。

# 6. Identity / Marketplace Boundary

Paid Seller / Parent payout recipient必須解析到F08 durable identity。

Phase 3先做：

~~~text
Paid App direct link / App Card → checkout → entitlement → transaction → split → settlement
~~~

Marketplace discovery不是前置條件。

# 7. Acceptance Baseline

- F15-AC-001 transaction可idempotently重放/對帳。
- F15-AC-002 eligible Remix sale = 80/5/15。
- F15-AC-003 no eligible parent = 85/15。
- F15-AC-004 Root不永久抽成。
- F15-AC-005 FREE Parent → PAID child仍有5%。
- F15-AC-006 same-Creator不產生fake parent payout。
- F15-AC-007 refund/chargeback有durable reversal。
- F15-AC-008 payout recipient有durable identity。
- F15-AC-009 money truth不依賴Frontend。
- F15-AC-010 Marketplace不是activation前置。

# 8. Status Note

仍非Build Freeze input。啟用前需補payment provider、currency/tax、settlement base、refund/chargeback、payout reserve、fraud、ledger schema、reconciliation、legal/compliance、tests、Human approval。
