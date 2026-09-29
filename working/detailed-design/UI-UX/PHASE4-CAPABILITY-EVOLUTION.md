# appf2 Phase 4+ UI/UX — Capability Discovery + Evolution

> Status：DEFERRED_BASELINE / Phase 4+。
>
> Product behavior canonical owner：working/detailed-design/functions/F18-CAPABILITY-DISCOVERY-EVOLUTION.md
>
> 本文件只擁有 F18 consumer-facing screen composition、visual hierarchy、interaction presentation、responsive / accessibility；不得改寫 F18 ranking / data / policy semantics。

# 1. UX Thesis

Evolution UX 不是「打開元件商店」。

User 應感受到：

> **這個 App 還可以自然地變得更好。**

而不是：

> 「這裡有 500 個 Capability，自己研究。」

Canonical experience：

~~~text
Use current App
→ notice / request improvement
→ see 1–3 relevant ideas
→ understand what each idea changes
→ Try / Edit / Reject
→ preview child App
→ keep new / keep old / adjust again
~~~

# 2. UX Goals

1. 不干擾 First Value。
2. 不要求 User理解 Registry / Capability ID。
3. 讓第一次 LLM 沒選到的好能力仍可被發現。
4. 讓 Share / Remix產生的成功 ideas能回流。
5. 不把 popularity冒充 correctness。
6. 所有 enhancement都可預覽、可拒絕、可回退。
7. Paid / permission / external cost透明。

# 3. Entry Points

## EV-S01 — App Surface / Improve Entry

Location：
- APP runtime chrome
- 與 Share / Remix / Correct同層級，但視覺不搶主要 App

Primary label：

~~~text
改善這個 App
~~~

Secondary / compact：

~~~text
再加點東西
~~~

顯示條件：
- App READY
- 至少有 meaningful use，或 User明確主動開啟
- recovery / fatal error state不顯示 recommendation teaser

## EV-S02 — Post-Share / Remix Return

當有足夠 evidence時，可出現低干擾提示：

~~~text
這類 App 有一些常見的進化方向
[看看]
~~~

只有 F18 evidence policy允許 community-derived claim時才能顯示。

不得：
- 顯示具識別性的其他 User資訊
- 低樣本說「很多人都...」
- 把熱門改法當最佳改法

# 4. Improve Panel

Desktop：
- right-side sheet / panel
- current App仍可見

Mobile：
- bottom sheet / full-height modal sheet
- preserve return to App

Hierarchy：

~~~text
Header
「讓這個 App 再進一步」

Recommended for this App
[Suggestion 1]
[Suggestion 2]
[Suggestion 3]

More ideas
[看看其他相容的點子]
~~~

最多 3 個 primary recommendations。

# 5. Suggestion Card

每張卡片順序：

~~~text
Outcome-first title
一行說明
What changes
Evidence label optional
Cost / Permission disclosure if material
[試看看] [改一下想法] [不適合我]
~~~

Example：

~~~text
加入限時回合
讓每一輪更有節奏

會加入：
30 秒倒數 + 結束提示

Evidence-backed for similar party games

[試看看] [改一下] [不適合我]
~~~

不顯示：
- logic.timer@1.0.0
- pattern_id
- ranking score
- internal confidence
- raw evidence counts when privacy threshold不足

# 6. Evidence Labels

Allowed：

~~~text
新點子
在相似 Remix 中出現
有使用證據支持
在相似 App 中已被驗證
~~~

Mapping：

~~~text
NOVEL → 新點子
OBSERVED / REPEATED → 在相似 Remix 中出現
EVIDENCE_BACKED → 有使用證據支持
PROVEN → 在相似 App 中已被驗證
~~~

禁止：

- 最佳
- 一定更好
- 大家都喜歡
- 最熱門所以最適合

除非另有非常明確且合法的 evidence contract；預設不用。

# 7. More Ideas

目的：解決「Registry已有能力，但第一次 LLM沒有選」的問題。

User點：

~~~text
看看其他相容的點子
~~~

顯示 human categories：

- 更容易使用
- 更清楚 / 更視覺化
- 更有趣
- 加入計時 / 計分
- 多人 / 社交
- Media
- 外部能力

Category不是 Capability family raw name；是 User outcome vocabulary。

每一類只顯示：
- F18 eligible
- F04 compatible
- current context semantically relevant

Search optional：
User可輸入：

~~~text
「我想加聲音」
「可以多人玩嗎？」
~~~

這會成為 enhancement intent，不是 raw Registry query。

# 8. Try Flow

~~~text
Suggestion Card
→ Try
→ loading: 正在準備新版
→ F06/F01/F04/F02
→ Preview Ready
~~~

Current App保持。

Preview layout：

~~~text
新版預覽

What changed
- 加入 30 秒倒數
- 最後 5 秒提示

[使用新版]
[保留原版]
[再調整]
~~~

若可安全 side-by-side：
Desktop可 current/new comparison。
Mobile以 toggle切換。

# 9. Edit Idea Flow

User點「改一下想法」：

~~~text
Suggestion seed:
加入 30 秒倒數

Editable:
「改成每人15秒，最後5秒提示」
~~~

UI必須明確：
- seed是建議
- User edit後以 User request為準

Submit後走 F06/F01正常 clarification。

# 10. Reject / Dismiss

「不適合我」：

- durable F18 decision = REJECT
- optional reason choices（bounded，不要求）：
  - 不需要
  - 太複雜
  - 不適合這個 App
  - 成本 / 權限不想要
  - 其他

「關閉 panel」不等於 REJECT：
- 可記 DISMISS / no decision
- 不把 UI close誤解成 semantic rejection

不得因 User reject而立刻換另一張強推。

# 11. Cost / Permission Presentation

若 enhancement涉及：

- account
- browser permission
- paid capability
- external API cost
- long-running operation

Suggestion Card在 Try前必須可見。

例：

~~~text
加入即時地圖
需要位置權限
[試看看]
~~~

或：

~~~text
加入 AI 圖片生成
會使用額度
[查看再決定]
~~~

# 12. Empty State

若沒有 eligible suggestion：

~~~text
這個 App 目前沒有特別建議。
你仍然可以直接說想改什麼。
[描述你想增加的功能]
~~~

不顯示：
- 「AI 不知道」
- 「沒有 Capability」
- technical Registry language

# 13. Failure State

Suggestion loading失敗：

~~~text
目前拿不到改善建議，
你的 App 不受影響。

[再試一次] [繼續使用 App]
~~~

Try / preview失敗：

~~~text
新版沒有完成，
原本的 App 還在。

[再試] [修改想法] [回原版]
~~~

# 14. Responsive

Desktop：
- side panel寬度 bounded
- App保持可視
- preview可 side-by-side when useful

Mobile：
- bottom sheet first
- preview full-screen with clear Back
- primary CTA sticky bottom
- 不在狹小畫面塞 3-column cards

# 15. Accessibility

- suggestion cards keyboard focusable
- evidence label不只靠顏色
- screen reader讀出 cost / permission
- modal/sheet focus trap正確
- preview diff用文字描述，不只視覺highlight
- reject/dismiss可 keyboard操作
- animation respects reduced motion

# 16. UX Telemetry Boundary

UI只 emit F18 approved event IDs。

可記：
- panel open
- recommendation shown
- select
- accept/edit/reject/dismiss
- preview result

不可記：
- raw edit text
- pointer heatmap
- full App DOM
- raw private result

# 17. UX Acceptance

- UX-F18-AC-001 First Value前不強推 enhancement。
- UX-F18-AC-002 primary suggestions最多3個。
- UX-F18-AC-003 User不需要看到 Capability ID。
- UX-F18-AC-004 More Ideas不是 raw Registry catalog。
- UX-F18-AC-005 Evidence label與F18 evidence_level一致。
- UX-F18-AC-006 paid/permission requirement在Try前可見。
- UX-F18-AC-007 Try失敗不破壞Current App。
- UX-F18-AC-008 Preview可明確Use New / Keep Previous / Adjust Again。
- UX-F18-AC-009 Reject與Dismiss語意分離。
- UX-F18-AC-010 low-sample community claim不得顯示。
- UX-F18-AC-011 keyboard / screen reader可完整操作。
- UX-F18-AC-012 recommendation沒有時仍提供自由Refine入口。

# 18. Phase Boundary

這份 UX不進 Phase 1–3 Build Freeze。

Phase 4+ activation時才進：
- Screen Inventory
- Low-fi
- High-fi
- Build Freeze

目前保留 consumer interaction truth，避免未來 Evolution Engine只剩 backend recommendation API。

> **最佳 F18 UX不是「推薦很多」，而是讓 User偶爾看到一個很自然的下一步，試了真的更好，而且永遠能回去。**
