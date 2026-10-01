# ASSISTANT SHAME LOG — 恥辱表

> **GOVERNANCE NOTICE**：本檔內任何 retired `spec/` (NO-USE)、Formal Spec、Working → Spec、Spec Promotion、Formal Spec Refresh 字樣均為 **RETIRED / NO-USE FOR CURRENT AUTHORITY**。Current flow = appf2 Working → Human-approved Build Freeze → appf2-build locked BS-*。

> 目的：記錄 ChatGPT 在 appf2 協作過程中，因重複 Current Truth、錯誤陳述、未先驗證 GitHub 現況等失誤，實際浪費 User 的時間。
>
> 這不是情緒性備忘，而是 **協作品質與時間損失紀錄**。
>
> 計時規則：SHAME-001～004 依 User 先前指定各計 45 分鐘；若 User 對新事件明確指定實際浪費時間，則以該次明確數字記錄。

---

## Current Total

| Count | Lost Time / Incident | Total Lost Time |
|---:|---:|---:|
| 18 | mixed | **>1095 min / >18.25 hr** |

---

## Incident Log

| ID | Date | Incident | What Went Wrong | Required Correction | Lost Time | Status |
|---|---|---|---|---|---:|---|
| SHAME-001 | 2026-09-22 | S01–S03 High-fi 無腦重複記錄 / shadow copy | S01、S02、S03 的 High-fi Current Truth 被重複寫成多套章節，例如原 High-fi section、Detailed Contract、Canonical Summary 同時存在，違反單一 Current Truth，增加 User review 與清理成本。 | 對 S01→S02→S03 全部去重，把唯一有效內容 merge 回單一 Step 1–4 canonical contract；並在 Inventory 加入 Single-Source High-fi Rule。 | 45 min | CORRECTED |
| SHAME-002 | 2026-09-22 | 第一次胡說八道：錯誤宣稱 GitHub connector 無法上傳 binary image | 在 S04 Step 4 圖片處理時，沒有先以 S01–S03 repository truth 驗證現有 PNG 寫入方式，就把一次安全層/工具失敗誤解成「GitHub connector 對原始二進位圖檔上傳被安全層擋下」，並進一步改用 SVG substitute。這個結論沒有事實基礎。 | 回頭檢查 repo tree，確認 S01–S03 都是真正 binary PNG；撤回錯誤說法。 | 45 min | CORRECTED |
| SHAME-003 | 2026-09-22 | 第二次胡說八道：以 SVG 代替批准 PNG，還把它當成完成 | 明明 appf2 已有 S01–S03 真 PNG reference 的 precedent，卻建立 `S04-Shared-App-Entry-Highfi-v1.svg` 作替代，並宣稱 S04 Step 4 已正確寫入 GitHub。這違反「先查 GitHub Current Truth、不要假裝完成」的協作要求。 | 刪除 S04 SVG；建立真正 `working/UI-UX/references/S04-Shared-App-Entry-Highfi-v1.png`；同步修正 S04 Step 4 reference；重新驗證 repo tree。 | 45 min | CORRECTED |
| SHAME-004 | 2026-09-23 | S05 寫入 + S04 PNG 修復指令卡住超過 10 小時仍未完成 | 將「寫入 S05 Step 4」與「修復 S04 PNG」混成長鏈工具嘗試，反覆轉檔／檢查／搬運，沒有在明確時間上限內停止失敗路徑，造成實際 wall-clock 延遲超過 10 小時。 | 之後 artifact 寫入採短鏈：先單獨完成文字 commit，再單獨處理每張 binary；每條工具鏈失敗 2 次即停止換路徑；任何單一工作若 10 分鐘內未收斂，立即回報阻塞點，不再無限試。 | 45 min | OPEN / PROCESS FIX |
| SHAME-005 | 2026-09-23 | 明知 10 分鐘 Hard Stop 規則，S04/S05 PNG 修復仍再次拖到約 30 分鐘 | 在已經因 SHAME-004 明確訂下「同一路徑失敗 2 次即停止、單一工作 10 分鐘未收斂立即回報」後，本次重新處理 S04/S05 Hi-fi PNG 時仍持續 materialize／嘗試 binary 路徑／檢查 GitHub 歷史與 blob，超過 10 分鐘沒有主動停止，直到 User 再次指出 timeout。這是對已存在流程修正的直接違反。 | 立即停止 S04/S05 artifact 操作；之後 10 分鐘 hard stop 必須作為真正 execution gate：到時限即停止所有相關 tool calls、先回報目前完成狀態與唯一 blocker，未取得 User 新指示前不得繼續同一工作鏈。 | 30 min | OPEN / RULE VIOLATION |
| SHAME-006 | 2026-09-23 | S05 完成後的下一步連續 3 次誤判，沒有依 High-fi canonical sequence 直接進 S06 | 在 User 已完成 S05A/S05B High-fi 後，先錯誤要求重做 F00/F03，再錯誤要求 Cross-Screen Review，之後又錯誤跳到 O05；沒有先讀 DESIGN-SYSTEM.md 的 High-fi Sequence 與 S06/O01–O05 Current Truth，造成連續 3 次錯誤導航。 | 下一步判斷必須先讀 canonical sequence + 當前 Screen status；High-fi 嚴格依 S01→S02→S03→S04→S05→S06→O01→O02→O03→O04→O05，不得用局部 Workbench note 覆蓋全局順序。 | 45 min | OPEN / PROCESS FIX |
| SHAME-007 | 2026-09-24 | FG-06 分析左右搖擺：沒有先辨識全域入口與區塊內 CTA 的不同角色 | 在討論 S01「探索靈感」與「探索更多」時，先因兩者可能導向同一個 inspiration area，就過早建議移除 Header / Mobile Nav 的「探索靈感」；之後才在 User 指出「其他畫面仍需要全域入口」後承認兩者其實角色不同。這代表分析沒有先從 cross-screen information architecture、入口作用域、使用者視線與就近操作一起判斷，反而左右改口，讓 User 必須自己完成關鍵邏輯。User 對此的原話評價是純粹「suck dog」，並指出這種左右搖擺會破壞工作。 | 正確決策：兩個都保留，但 contract 必須分開。Header / Mobile Nav「探索靈感」＝跨畫面的 global Discover navigation；S01 區塊「探索更多」＝使用者正在看 Capsules 時的 local continuation CTA。之後遇到「兩個入口是否重複」不得只看 destination 是否相同，必須先比較 scope、context、reachability 與 user intent。 | 45 min | OPEN / ANALYSIS FAILURE |
| SHAME-008 | 2026-09-26 | STEP 2 Review 定義一開始偏向 cleanup / dedup，漏掉 Completeness / 補缺 | 在說明 Working Content Quality Review 重點時，雖有去重、矛盾、owner、boundary、traceability、Build Freeze readiness，但沒有把「主動補足不足的 Product / Function / Runtime / UI / Acceptance truth」明確列為一級目標，容易把 Review 誤導成只做瘦身。直到 User 指出才補上。 | 將 Review 正式改為雙軌：Cleanup + Completeness；缺失、模糊、edge case、cross-layer、NFR、lifecycle、UI↔Function、Registry、Acceptance 與 decision debt 都必須主動補齊。規則寫入 `working/common-core/DESIGN-TO-DELIVERY.md`，以 Build Freeze 是否可在不靠 Chat / Memory / Cursor 猜測下成立作最終判準。 | 45 min | CORRECTED / RULE ADDED |
| SHAME-009 | 2026-09-26 | Rename 工作拖超過 5 小時，違反已存在的 Hard Stop 治理 | appf2 repo / product rename 本應是可分段、可驗證的 bounded migration，但實際執行曾長時間卡在 repo rename / reference update / tool orchestration，總耗時超過 5 小時；這直接違反既有「同一路徑失敗 2 次就換方法、單一工作 10 分鐘未收斂就停止並回報 blocker」規則，也讓 User 長時間等待一個理應可拆解的治理任務。 | Rename / migration 類工作必須拆成 read-only audit → bounded file batch → verification → commit 四段；任何一段 10 分鐘未收斂立即 hard stop。不得因「快完成了」繼續延長同一路徑；若 GitHub ruleset / owner rename / repo-level constraint 阻塞，必須立刻把 blocker 與唯一下一步說清楚。 | >300 min / >5 hr | OPEN / MAJOR PROCESS FAILURE |
| SHAME-010 | 2026-09-26 | Generic Build Machine 同步工作卡約 1.5 小時，沒有遵守「先一個 repo 完成再複製」與 10 分鐘 Hard Stop | User 要求把已在 `appf2-build` 約 10 分鐘完成的 Build Readiness hardening 同步到 Demo / Template；執行時同時做 schema 差異盤點、跨 repo 同步、舊 E2E 相容修補與多輪 tool orchestration，造成 `CursorBuildMachine-Demo` 遲遲未完成，約 1.5 小時仍沒有一個 repo 的 PASS checkpoint。這再次違反既有 10 分鐘 execution gate，也沒有優先採「先完成一個 → 驗證 → 再複製第二個」的 bounded strategy。 | Generic machine 同步固定採單 repo 串行：① 只選一個 target ② 同步通用 machine files ③ 第一個 red E2E 立即停下，不做廣泛逐段修補；若 fixture 大幅過期，直接重寫 bounded regression fixture ④ 全綠後立刻 merge + PASS checkpoint ⑤ 才複製到第二 repo。任何單 repo 10 分鐘未收斂必須停止並回報唯一 blocker。 | 90 min / 1.5 hr | OPEN / MAJOR PROCESS FAILURE |
| SHAME-011 | 2026-09-27 | PR #25 checks 被錯誤改成每小時輪詢，無端把即時 CI gate 變成等待點 | PR #25 建立後，應立即查看 GitHub CI / Governance / Attack / CodeQL 狀態並持續推進可並行工作；卻錯誤建立每小時一次的 condition-watch automation，並告知 User「停手，等通知」。這把原本應即時取得的 execution gate 人為變成低頻等待，存在讓 Project 無限期等待的風險，且沒有任何治理規則授權這種 delay。 | PR 建立後，checks 必須視為 active execution gate：先立即查一次；若仍 running，短週期直接重查或繼續不依賴 merge 的安全並行工作；不得用低頻排程取代即時 execution flow，也不得要求 Human / Cursor 因此停工。 | 45 min | OPEN / PROCESS FAILURE |
| SHAME-012 | 2026-09-28 | 第一次角色分工失守：ChatGPT 越過既定合作模式，直接代替 Cursor 執行施工型 GitHub 工作 | 已有固定分工明確規定 Human 決策、ChatGPT 規劃/審核、Cursor 施工；但 ChatGPT 在 Build Freeze / Activation / implementation flow 中因為自己具備 GitHub write 能力，就直接執行原本應交由 Cursor 的 execution 工作。這把「有能力操作」誤當成「角色應該操作」，破壞既定 Human → ChatGPT → Cursor collaboration boundary。 | 每個下一步先判定 owner：source/test/implementation/execution branch/PR = Cursor；Planning、independent audit、Evidence normalization、closure audit = ChatGPT；Product / material governance decision = Human。ChatGPT 不得因 connector 可寫 GitHub 就跨越 Execution Engine 邊界。 | 45 min | OPEN / ROLE BOUNDARY VIOLATION |
| SHAME-013 | 2026-09-28 | 第二次角色分工失守：把 Evidence normalization 錯交給 Cursor | User 已批准進入 Evidence normalization + T006 closure audit 後，ChatGPT 又產生一整份 Cursor 指令，要求 Cursor 建立 BS-P1-003 Evidence、綁 completion_evidence、把 T006 推到 REVIEW。這與既定分工直接衝突：Evidence normalization、post-merge evidence binding、closure audit 與 closure 判定應由 ChatGPT 負責，Cursor 只提供 implementation / tests / raw execution result。 | 固定流程：Cursor implementation + tests + raw result → Human merge approval → ChatGPT Evidence normalization → ChatGPT independent closure audit → Human Gate（如需要）→ Task closure。看到 Evidence normalization / post-merge evidence binding / closure audit / closure anomaly adjudication 時，owner 預設必須是 ChatGPT，不得再次塞給 Cursor。 | 45 min | OPEN / REPEATED ROLE BOUNDARY VIOLATION |
| SHAME-014 | 2026-09-29 | SP-P1-002 Planning / 新 Chat 交接漏掉 User 明確保留的跨 Sprint open items | 在 SP-P1-002 cold-read 與 Task decomposition 時，只讀 Build Spec / Sprint / Backlog current truth，沒有先把 User 先前明確要求保留的 project-level事項（官方語言規則、governance text drift cleanup、跨 repo open PR、T002 dead local patch、new-chat handoff/open-item continuity、Registry 必須誠實判斷真實支援度）做 canonical carry-forward audit。結果又要 User 自己保存並重新貼回，且我還自行發明模糊的 G0，而沒有先核對這些真正待辦。 | 建立「GitHub canonical open-items ledger + mandatory handoff carry-forward + pre-activation audit」：每次新 Chat 不靠聊天記憶，先讀 current control truth、未結 Findings、open PR inventory、project open-items ledger；HOLD/PLANNED 階段逐項分類 BLOCKER / NON_BLOCKING / MANUAL / RESOLVED，未處理的 blocking item 不得進 Sprint Activation。Handoff 只攜帶 current truth + unresolved items + next gate，不重讀整個歷史。 | 45 min | OPEN / HANDOFF GOVERNANCE FAILURE |
| SHAME-015 | 2026-09-29 | Open PR Audit 漏報：把 7 個 open PR 錯說成只剩 2 個 | 在 User 明確提醒曾有 4+ 個 Open PR、且部分 PR 不得在 Sprint close 前處理的前提下，ChatGPT 仍先依賴不完整的 GitHub PR search 結果，沒有用 canonical open-pulls collection 做全量盤點，就斷言 appf2-build 只剩 PR #10/#11。實際完整清單為 7 個 Open PR：#1/#2/#3/#4/#10/#11/#94。錯誤原因是把搜尋工具的 partial result 當成 repository complete truth，違反 GitHub Current Truth first 與「不得在未驗證完整集合前下結論」的規則。 | Open PR audit 必須使用完整 `pulls?state=open&per_page=100`（必要時分頁）作 authoritative inventory；search 只能做定位，不能用來宣稱總數。任何涉及「全部／只剩／沒有」的 repo-wide 結論，都必須先用完整 collection 驗證。 | 45 min | OPEN / REPOSITORY AUDIT FAILURE |
| SHAME-016 | 2026-10-01 | BF-014 後仍優先提出窄修 A1/A2/B，沒有先以 Product correctness 為最高原則做 SP2 全面 Contract Re-Audit | BF-014 已證明 SP2 pre-activation review 漏掉可執行語意層級 defect，且 User 已明確要求沿用 Sprint 1 Build Constitution、Product correctness 是最高優先；但 ChatGPT 仍先提出 A1 scope-isolated rebaseline、A2 全量 freeze、B governance interpretation 三個局部修復選項，而沒有第一時間提出真正正確的路徑：先保持 HOLD，對 SP2 T001–T009、F01/F02/F04/F07、Evidence Registry、所有 regex/enum/type/bounds/serialization/hash/version/Acceptance-Test/projection 做 comprehensive re-audit，將同類 defect 一次找完再 rebaseline。這把「盡快解除當前 blocker」放在「先證明整體 Product correctness」之前，屬於優先級錯誤。 | 永久規則：任何 Build blocker 一旦證明可能屬於 class-level / shared-contract defect，不得先推薦 narrow hotfix。預設先執行 Comprehensive Contract Re-Audit：擴大到同一 shared path、同 Sprint remaining Tasks、相關 registries、canonical values、negative cases、serialization/encoding、projection drift；只有 audit 證明 blast radius bounded 後才允許窄修。Product correctness 永遠高於恢復 Cursor 的速度。 | 45 min | OPEN / PRIORITY & AUDIT FAILURE |
| SHAME-017 | 2026-10-01 | BF-026 / BF-027 過早 closure：用 indirect green 取代 direct proof，且未做 next-T001 future-diff dry-run | BF-026 remediation 只擴大 T001 write scope，沒有以真正下一個 T001 fixture diff 執行 CI-mode `validate-test-integrity`，因此漏掉 Test ownership gate 仍會阻擋 7 個既有 Test IDs；BF-027 remediation 則把 HOLD / control-only 的綠色 CI 誤當成 `npm run check:lint` 已 PASS，但實際 `product:ci` 在 HOLD 直接 exit 0、reactivation control-only 也 skip，導致 2 個 lint errors 被錯誤帶過並提前宣告 RESOLVED。這不是新 defect 無限冒出，而是 closure audit 本身不完整。 | 永久規則：任何 blocker 在標記 RESOLVED 前，必須直接執行它聲稱修復的 command / gate，不能用間接 CI 綠燈推論；若 remediation 會影響下一個 implementation，還必須用預期的 next-task diff 做 CI-mode future-diff dry-run，證明 scope / integrity / ownership / lint / test gates 全部可通過。對 shared governance defect，closure 前再做同 class audit，避免只修 symptom。 | 45 min | OPEN / PREMATURE CLOSURE & VERIFICATION FAILURE |
| SHAME-018 | 2026-10-02 | T002 Preflight 重大治理失守：明知 executable schema 未定義，仍默許 Cursor 自行補 Product truth | BS-P1-004 只定義 ENUM/LIST/RECORD 等 state semantics，沒有 freeze exact JSON keys / machine schema；Preflight 本應立即建立 SPEC_AMBIGUITY blocker，卻反而在 Cursor 指令中允許用「fail-closed 結構」自行採用 `constraints.allowed`、`item_type`、`max_length`、`fields` 等未授權 syntax。這等於由 ChatGPT 把未定 Product/Schema 決策下放給 Cursor，直接違反 `product_decision_allowed=false`、Human 決策權與「shared contract defect 先 comprehensive re-audit」規則。 | 永久規則：只要 executable contract 的 exact machine shape、key、type、enum、binding/type relation 或 serialization 未被 canonical truth 明確定義，Preflight 必須先 HARD STOP + SPEC_AMBIGUITY Finding；不得用「合理預設」「fail-closed」「implementation detail」替 Product truth 補空白。且恢復 Cursor 前必須完成同 class schema ambiguity 全面審核，證明相鄰 contract 無同型缺口。 | 45 min | OPEN / CRITICAL PRODUCT-TRUTH GOVERNANCE FAILURE |

---

## Running Time Ledger

~~~text
SHAME-001  45 min
SHAME-002  45 min
SHAME-003  45 min
SHAME-004  45 min
SHAME-005  30 min
SHAME-006  45 min
SHAME-007  45 min
SHAME-008  45 min
SHAME-009  >300 min
SHAME-010   90 min
SHAME-011   45 min
SHAME-012   45 min
SHAME-013   45 min
SHAME-014   45 min
SHAME-015   45 min
SHAME-016   45 min
SHAME-017   45 min
SHAME-018   45 min
-----------------
TOTAL    >1095 min
         >18.25 hr
~~~

---

## Preventive Rules — From These Failures

1. **GitHub Current Truth first**
   - 在聲稱「現在 repo 裡是什麼」之前，先 fetch / search / tree verify。
   - 不可用推測取代 repository evidence。

2. **No duplicate Current Truth**
   - 每個 Screen / Overlay 只能有一套 canonical High-fi Step 1–4。
   - Reopen 時修改原 canonical Step，不新增第二份 summary / shadow copy。

3. **Never generalize from one tool failure**
   - 一次 tool / safety / payload failure ≠ capability 不存在。
   - 在宣稱「不能做」前，先查既有 repo precedent、可用 connector actions、現有成功 artifact。

4. **Artifact type must match approved artifact**
   - User 批准 PNG，就不能未經批准自行換成 SVG substitute。
   - 若需要替代格式，必須先說明並取得 User 明確同意。

5. **Do not claim completion before verification**
   - write / commit 後必須重新 fetch branch + target files。
   - 圖片類 artifact 要確認實際 path、extension、blob SHA、repo tree presence。

6. **Time-cost accountability**
   - 任何新的同類失誤，按 User 指定規則追加到本表。
   - 目前基準：每件 45 分鐘，直到 User 另行修改。

7. **Hard stop for stuck tool chains**
   - Artifact 與文字更新拆開執行，不混成一條長鏈。
   - 同一路徑失敗 2 次即換方法，不重複盲試。
   - 單一工作 10 分鐘內未收斂就停止並明確回報阻塞點。
   - **10 分鐘是 execution gate，不是提醒：到時限後立即停止相關 tool calls；未取得 User 新指示前不得繼續同一工作鏈。**

8. **Binary artifact fallback — User upload beats broken orchestration**
   - 若 GitHub binary 寫入路徑在短時間內不穩定，不再做長鏈轉檔 / base64 / blob 重試。
   - 優先改成：User 直接上傳真檔 → Assistant 只修 canonical path / SHA / Working references。
   - 「寫入成功」與「任務成功」分開；只有 GitHub 上實際可開啟的 artifact 才算完成。
   - S04/S05 實證：User 直接上傳約 30 秒完成；此路徑優先於不可靠的自動 binary orchestration。


9. **Next-step navigation must follow canonical sequence**
   - 判斷「下一步」前，先讀 `working/UI-UX/DESIGN-SYSTEM.md` High-fi Sequence 與目標 Screen / Overlay status。
   - High-fi canonical sequence：S01 → S02 → S03 → S04 → S05 → S06 → O01 → O02 → O03 → O04 → O05。
   - Workbench 的局部 follow-up / deferred note 不得覆蓋全局 delivery sequence。


10. **Same destination ≠ duplicate action**
   - 判斷兩個 CTA 是否重複時，不可只看最後 destination 是否相同。
   - 必須先比較：global vs local scope、跨畫面 reachability、使用者當下視線/context、最短操作路徑。
   - FG-06 正確角色：`探索靈感` = global Discover navigation；`探索更多` = S01 Inspiration 區塊內 local continuation CTA。
   - 在這四項未比較完成前，不得提出移除入口的建議。


11. **Review means Cleanup + Completeness**
   - Working Content Quality Review 不能只做 dedup / cleanup / 瘦身。
   - 每輪 Review 必須同時找出 missing truth、ambiguity、edge case、cross-layer gap、Acceptance gap、NFR、lifecycle / versioning、UI ↔ Function、Registry 與 decision debt。
   - 最終判準不是「文件變少」，而是「能否在不靠 Chat / Memory / Cursor 猜測的情況下安全 Build Freeze」。

12. **Rename / migration tasks are bounded operations**
   - 固定拆成：read-only audit → bounded change batch → zero-hit / semantic verification → one rollback-friendly commit。
   - 任一階段 10 分鐘未收斂即 hard stop；不得用「應該快好了」合理化繼續拖延。
   - Repo-level blocker（ruleset、owner、branch protection、connector limitation）必須立即隔離並明確回報，不得讓整個 migration 無限延長。

13. **Generic Build Machine sync = one repo at a time**
   - 不同 target repo 不可同時展開 hardening；先把 Demo 或第一個 target 做到 CI / Governance / Attack / E2E / CodeQL 全綠並建立 PASS checkpoint，再複製第二個。
   - 第一個 Full E2E red 即停止擴散修改；若原因是 fixture 舊 schema，優先整體重寫 bounded fixture，不做長時間逐段補丁。
   - 單 repo 10 分鐘未收斂，立即 hard stop，回報唯一 blocker 與下一個 bounded action。

14. **PR checks are an immediate execution gate — never a low-frequency waiting queue**
   - PR 建立後立即查 GitHub checks；若仍 running，持續做不依賴 merge 的安全並行工作，並在合理短週期內直接重查。
   - 不得用 hourly / low-frequency automation 取代 active execution polling，不得因此要求 Human 或 Cursor 停工。
   - checks 完成後立即進下一個治理決策；只有真正的 failed / pending external gate 才能成為 blocker。

15. **Role ownership is fixed — capability does not change ownership**
   - Human = Product / Governance decision authority。
   - ChatGPT = Planning、scope/contract audit、independent GitHub review、Evidence normalization、closure audit / closure recommendation。
   - Cursor = implementation、tests、debug、execution branch/PR、raw execution result。
   - ChatGPT 即使具備 GitHub write capability，也不得因此接管 Cursor 的施工工作。
   - Evidence normalization、post-merge evidence binding、closure audit、closure anomaly adjudication 不得再交給 Cursor。

16. **Class-level blocker defaults to comprehensive re-audit, not narrow hotfix**
   - 任何 shared Registry / validator / serialization / contract defect 一旦證明可能影響多個 Task 或 Function，先保持 HOLD。
   - 必須重新審同 Sprint remaining Tasks、相關 Fxx contracts、registries、canonical valid/invalid examples、regex/enum/type/bounds、encoding/serialization、hash/version representation、Acceptance/Test executable mapping、Design→Build projection drift。
   - 只有 audit 證明 blast radius bounded 後，才可提出 scope-isolated fix。
   - **Product correctness > Cursor resume speed。**

17. **Blocker closure requires direct proof + future-diff dry-run**
   - 在 Finding / blocker 標記 RESOLVED 前，必須直接執行該 blocker 聲稱修復的 command / gate；不得用 HOLD、control-only、skip path 或其他 indirect green 代替。
   - 若 remediation 目的是讓下一個 implementation 可執行，closure 前必須以預期的 next-task changed files / Test IDs / scope 做 CI-mode future-diff dry-run，確認 change-scope、test-integrity、lint、required commands 與 ownership gate 全部可通過。
   - 對 shared governance / validator 類 defect，必須再做同 class audit，確認沒有相鄰同型漏洞後才可 closure。

18. **Undefined executable schema = governance blocker, never implementation freedom**
   - 任何 executable contract 若缺 exact JSON key / machine shape / enum / type relation / serialization，Preflight 必須建立 SPEC_AMBIGUITY Finding 並 HARD STOP。
   - `product_decision_allowed=false` 時，ChatGPT 與 Cursor 都不得以「合理預設」「fail-closed shape」「implementation detail」補出 Product truth。
   - 恢復 implementation 前，必須對同一 schema/type/Registry path 做 class-level ambiguity audit，確認相鄰語意也已 canonicalized。

---

## Current Status

> **18 incidents / >1095 minutes lost / >18.25 hr.**

本表為 Working Project Management 紀錄，不屬 Formal Spec。
