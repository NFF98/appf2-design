# F20 — Creator App Commerce

> 狀態：DEFERRED_BASELINE / NOT_BUILD_FREEZE_READY
>
> Horizon：Phase 3 Commerce Pilot / evidence-gated
>
> Human Decision：App commercial state只有FREE / PAID；Paid一次購買同時解鎖Play + Remix。

# 1. Purpose / User Outcome

~~~text
Creator publishes Version → FREE or PAID

FREE → Recipient Play + Remix

PAID → App Card / bounded Preview → one-time purchase
→ Play + Remix unlock together
→ optional child Remix
~~~

# 2. Only Two App Commercial States

不建立Free Play + Paid Remix、separate Remix charge、No Remix paid mode、ownership transfer sale。

# 3. Purchase ≠ Ownership Transfer

~~~text
Buyer purchases A Version
→ A remains owner
→ Buyer gets Play + Remix entitlement

Buyer remixes
→ new immutable child Version
→ Buyer owns child
~~~

# 4. Child Commercial Freedom

Child Creator可獨立設FREE或PAID，不自動沿Parent price。

# 5. Attribution Display

F08 canonical wording：

~~~text
Original: Created by A

Remixed:
Remixed by Z
Remixed from Y’s version
Root Creator: A
~~~

Root Creator = provenance / family attribution，不代表永久royalty。

# 6. Revenue Split

F15 canonical：

~~~text
Eligible Direct Parent: Seller 80% / Parent 5% / appf2 15%
No eligible Parent: Seller 85% / appf2 15%
~~~

Root / other ancestors = 0；FREE Parent → PAID direct child仍有Parent 5%。

# 7. Two Independent Axes

~~~text
Axis A = App FREE / PAID
Axis B = Creator Free / Pro plan
~~~

Free-plan Creator可發布PAID App；Pro Creator可發布FREE App。Creator不需要先買Pro才有資格賣App。

# 8. Identity / Marketplace

Free Play / Remix anonymous-first；但publish PAID App、earnings、payout、commercial management需要F08 durable identity。

Phase 3先做direct-link Paid App Commerce；Marketplace discovery只有真實transaction density / creator supply / buyer demand成立後才做。

# 9. Shared Data / Plan Boundary

Paid App price = Buyer買App Play+Remix entitlement。

Creator Plan = Creator買appf2 resource。

Buyer買PAID App不會替Parent Creator升級Shared DB quota；Buyer Remix自己的child後可自行選Plan。

# 10. Evidence / Acceptance

Revenue可成為F18 downstream signal，但Revenue ≠ semantic correctness。

- F20-AC-001 commercial state只有FREE / PAID。
- F20-AC-002 FREE允許Play + Remix。
- F20-AC-003 PAID一次付款解鎖Play + Remix。
- F20-AC-004 Purchase不transferParent ownership。
- F20-AC-005 Remix建立Buyer-owned child。
- F20-AC-006 child可獨立FREE / PAID。
- F20-AC-007 Free-plan Creator可發布PAID。
- F20-AC-008 Pro Creator可發布FREE。
- F20-AC-009 selling card attribution符合F08。
- F20-AC-010 money truth由F15，不由Frontend。
- F20-AC-011 Marketplace非前置。
- F20-AC-012 Paid seller/payout recipient有durable identity。

# 11. Activation Work Remaining

需完成price/currency/checkout UI、payment provider、purchase entitlement、identity timing、refund/dispute、tax/processor disclosure、payout/fraud、App Card/Preview、F13/F15 integration、evidence/tests/legal、Human Build Freeze approval。

> F20目前是Working commerce contract，不是current implementation instruction。
