# F09 — Realtime Room

> 狀態：DEFERRED_BASELINE / NOT_BUILD_FREEZE_READY
>
> Activation Gate：日期本身不 unlock；只有 Evidence + Human approval + complete Detailed Design + Build Freeze inclusion 才可進 implementation scope。
>
> Horizon：Phase 2 / evidence-gated

# 1. Purpose

F09 只處理多人同時在線、看到 / 改變同一個 live mutable session state。

~~~text
Immutable Blueprint + Room + Presence + Mutable Shared Instance State + Validated Delta
~~~

# 2. F19 Shared Data vs F09 Realtime

F19：

~~~text
A 今天玩 → score 5
B 明天玩 → score 8
C 後天玩 → score 6
→ 都看到同一 leaderboard
~~~

不要求同時在線。

F09：

~~~text
A + B + C 現在同時在線
→ Presence + live round / turn / shared mutable state
→ synchronized immediately
~~~

> Shared Durable Data ≠ Realtime。

# 3. F05 Boundary

~~~text
F05 = immutable App definition + fresh local Runtime
F19 = optional durable Shared Data Scope
F09 = live Room + Presence + shared Instance state
~~~

# 4. Creator Plan Boundary

F13 activation後，Basic Realtime可成為 Creator Pro entitlement；但Plan metadata不得提前 activation F09。Realtime limits必須 configuration-driven，不 hard-code。Working Pro target約 50 concurrent / App。

# 5. Status Note

仍是 deferred baseline。啟用前必須補齊 Room / Presence data model、conflict/order、reconnect、transport、security、TTL、abuse、evidence、Acceptance/test、compatibility、Human Build Freeze approval。
