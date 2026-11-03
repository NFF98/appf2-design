# Sprint 3.5 — 產品完成率唯一執行目標 SSOT（2026-11-03）


## 2026-11-03 既有 App 受控修改：完成原 PR 免費 CI、非 Staging 產品 PASS

- Design #45 先凍結 SPEC，Build #419 已新增已保存私人 `VITE_WEB` 專案的「修改背景」入口及 `/api/v1/agent-jobs/:id/safe-style-edit` 原 owner P-256 授權路徑。只接受 blue/green/sand 三種色彩；驗證原專案 QA PASS、資料存在、正確 head CAS、步數上限；成功儲存新候選版本並失效舊預覽，不呼叫模型／Container、不自動發布／覆寫已發布 immutable App。
- **實際 GitHub Actions [#41596214939](https://github.com/NFF98/appf2-build/actions/runs/41596214939) completed/SUCCESS**：TypeScript + ESLint + 建置 PASS；新安全 API 測試檔 5/5 PASS（owner、stale、原需求 QA fail 關閉、版本不變與新 immutable CAS）；舊五次 Chromium 累積修改 5/5 PASS、故意破壞阻擋、重開與 V1 保留 PASS。皆為免費 CI／trusted fixture，不是一般用戶在 Staging 真網站修改成功。
- Supabase 唯讀核對當時 52 份現存候選 Job 符合必要 `CODING`、`VITE_WEB`、`src/style.css`、完整 frozen QA PASS、預覽、剩餘步數等資料條件；**符合條件不代表原用戶簽章金鑰可恢復、已實際使用新修改入口或已發布新版**。
- **實際新產品 Gate PASS 0；官方通用引擎驗收維持 4/9 = 44.4%；新五項完整產品能力仍沒有一項完成端到端驗收。** 不能把有限配色視為任意 AI 修改，不將 CI 當產品。新增付費 AI POST=0、Container=0；Actions 計入既有 CI 配額，實際 provider invoice 未核。
- 下一唯一產品驗證：在 Staging 部署後，用原建立者真瀏覽器開啟既有已驗收 App → 配色修改產生新 project hash → 原全部 QA 真 Chromium 通過 → 舊 App 不動，新 App owner 同意後有獨立分享 URL → 新舊重開；全鏈證據齊全才可評估下一 Gate。禁止 Production、其他 PR、未授權模型費用。

## 2026-11-03 既有 App 第一條真修改路徑：零 AI 外觀版（SPEC FIRST）

使用者指示不再停留在 trusted fixture，而是把已驗證的版本原語真正接入 APPf2 已保存的 App。採 **最小、安全、可以免費驗證** 的既有 App 編輯縱切面；不誇稱已完成全部五項能力、不重做發布架構、不授權模型或雲端 Container。

- **入口**：原始建立者從 AgentBuilderPanel「我的私人 App」開啟現存成功建置且完整原需求 Browser QA PASS 的 `VITE_WEB` 專案；可選擇明確的背景配色（藍、綠或米色），不需要寫程式。這不是任意 AI 自然語言修改或點選任意 DOM 元素。
- **安全授權**：僅允許 Staging FREE_ONLY 模式；POST 帶原 P-256 owner 證明、原 Job ID、expected job revision、expected project hash、受控配色 enum；後端再次驗證原 owner、原 hash、`CODING`、project revision >= 2、原獨立 QA `ALL PASS` 且私人建置資產存在；來源資料不可由別的 anonymous_id 讀取。禁止未驗收原版、過期版本、不完整原 QA 與 `VITE_NODE` 通過。
- **不可變修改**：只修改同個 project 中現有 `src/style.css`，追加 bounded 受控背景覆寫；不得碰 JS、後端、package、金鑰、原 prompt、原 QA，使用 `applyProjectEdits` 的 hash-CAS 和 `advanceDurableAgentJob` 儲存新版本。費用與 token checkpoint 不變。重複同色／stale CAS 必須拒絕，不得付費重送。
- **發布保護**：此 API 只回傳 `STYLE_CANDIDATE_SAVED_QA_REQUIRED`。不會直接發布，也不會替換既有 ACTIVE/share 的 hash；後續必須原樣跑完整 frozen QA，獨立 Docker/Chromium 認證新 project hash，並由用戶重新確認才可以對外分享新版（新版單獨分享連結）。舊分享仍指向舊 immutable artifact；QA 失敗不取代已發布作品。免費 QA 需原 owner 另外點擊明確同意。
- **負面驗證**：不同 owner、錯誤 hash、錯誤 revision、無 QA、FAIL/UNTESTED、原檔缺失、修改後沒變、非法 palette、step 額度不足全部 fail closed。第一次可免費本機/CI mock DB 測；沒有 Staging 真網站新 App 修改證據，就只能報「程式已接通＋CI」，不能 +1 產品 PASS。
- **下一階段才是**：將此安全修改骨架擴展成「用戶文字/指向畫面 → 明確修改約束與新 QA → 有額度 AI 修改既有 source → 新舊 QA → user accept → publication」。需另一回合的真網站 E2E，絕不可把本回合配色修改測試冒充完整五項或 AI 修改能力。

## 2026-11-03 五次修改保護：零付費驗證 SPEC（不算產品 PASS）

用戶授權先驗證「已有 App 基礎上連續五次修改、故意破壞一次、確認舊版不受影響及重開仍可用」。只在原 Design PR #45 與 Build PR #419 執行；免費 GitHub CI/Chromium，不觸發新 AI、Container、部署或 Production。先測保護基礎，不冒充真正用戶產品驗收。

- 使用現存 `createProjectSnapshot` / `applyProjectEdits` / `verifyProjectSnapshot` 不可變 CAS 版本原語；從同一份可操作的 trusted web fixture 開始，逐一新增減少、重設、步長選擇、重載持久化與外觀切換五種變更；每次新版本需同時通過所有已接受需求的獨立 Chromium 實際點擊 QA 才可移動受測 accepted-head。
- 人為製造第六次破壞：保留按鈕但撤除原「新增」動作；獨立 Browser QA 必須 FAIL，accepted-head hash 保持不變；舊 V1 可由原 immutable snapshot 重開，且 V6 在同一身分新頁能保留資料。錯誤的 stale CAS 必須拒絕。每次測試印出逐輪 PASS/FAIL 和 0 paid calls。
- **證據界線**：這是 trusted fixture、回歸驗證程式與本機瀏覽器，不是 AI 生成、不是 Staging 用戶修改入口、不是 Supabase 端資料升級或 Production；通過只能證實可重用的底層能力。現有五項完整產品能力仍不得標為 PASS，真正產品百分比維持 4/9，直到原網站可以完成真正既有 App 的多次用戶修改及發布前驗收。
- 若 CI 失敗，保留原歷史、明示真實錯誤與阻斷，不重跑任何付費 Job、不重建已付款 App。免費 CI 觸發不得包含任何付費 marker。

## 2026-11-03 產品帳本更正：已完成 4/9 = 44.4%（依既有真網站 E2E 及 PostgreSQL 原證據補認）

**使用者要求先查舊真實驗收，不得重跑或假報 2/9。** 現以四個互不相同、已有發布網站的 AI App 為保守已核實的獨立產品網站 E2E：原先計數器與客戶備忘錄 2 件，另加本次獨立查證、但**過去已完成、非本次新執行**的 G10 閱讀書單與 G11 每日喝水紀錄，合計 **4/9=44.4%**。此段優先於下方仍保留的「2/9」舊基線，舊數字不是現況。不可因其餘既有樣本已成功而**自動**宣稱更多通用未知 App Gate PASS；必須逐一重新核對同等真實證據與既定驗收範圍。

- **G10「閱讀書單」**：原 AI Job `9eecc831-4bb9-4af4-ac88-546fd159c22d`；模型 CODE `SUCCEEDED`，20¢ ceiling；原 frozen QA [41364310433](https://github.com/NFF98/appf2-build/actions/runs/41364310433) 7/7；原網站 [41363905501](https://github.com/NFF98/appf2-build/actions/runs/41363905501) SUCCESS；**實際新 Chromium、signed Worker → PostgreSQL 新增／更新／刪除、重新載入、另一 viewer 隔離** [41364683866](https://github.com/NFF98/appf2-build/actions/runs/41364683866) SUCCESS，log `REAL_PUBLISHED_RECIPIENT_FULL_PASS sample=g10-books`、visitor `model_or_job_POST=0`。Supabase live `appf2_code_app` share `4c07f75f-1f4b-43d2-9a66-dab6761b8414`，`ACTIVE/public_opt_in=true`，原 blueprint hash `sha256:710314711d4704a81c380f537ab67225fc86632d430e5d510b26ad2fcbcab738`，PG 2 viewer rows 仍存在。
- **G11「每日喝水紀錄」**：原 AI Job `224ba726-de85-4a1c-ad3c-aef7eb0f334b`；模型 CODE `SUCCEEDED`，20¢ ceiling；原 frozen QA [41365402062](https://github.com/NFF98/appf2-build/actions/runs/41365402062) 7/7；**原首波網站流程 41364911735 為 FAILURE，不可改寫**，後續真網站獨立 [41449070224](https://github.com/NFF98/appf2-build/actions/runs/41449070224) SUCCESS：0→1→2→3、重載保留、另一 viewer 隔離、刪除和再建立、真 Worker／PG CRUD 2xx、訪客 `model_or_job_POST=0`，log `REAL_PUBLISHED_RECIPIENT_FULL_PASS sample=g11-water`。Supabase share `4acf553e-09a8-4568-86f2-20a78caceb4d` 為 `ACTIVE/public_opt_in=true`，blueprint `sha256:d29d72c588335eb70fd51cee4dbf314ce6f28aa5d0b49d92ce261e01c0a374cb`；PG 4 rows 仍存在。曾有約 16 秒等待，**速度不標 PASS**。
- **邊界不得混淆**：這兩件有真 API／PostgreSQL，但目前 project profile 都是 `VITE_WEB`，使用既有簽署 `appf2Records` 後端橋接，**不是** AI 任意編寫的 `VITE_NODE` 長駐後端。此 4/9 表示已核實的「不同自然語言 App 真網站 E2E」，**不表示完整通用 AI 後端自主運行已驗收**。第一階段 55.6%（5/9）的下一新增產品 PASS 必須針對此剩餘後端整合能力作更嚴格驗收；禁止拿更多同型 CRUD 例子湊數。專用未知完整後端仍無正式 PASS。
- **本次無新增模型 POST／新 App／付費使用**，只認列原來已通過而被最新置頂錯誤忽略的兩個產品證據；不重跑已付模型、不觸發新 paid Sandbox。沒有新實際 PASS，不得再把 CI commit 當作進度。下一目標是 5/9=55.6%，不是再做另一個平台 smoke。


> **最高使用者指令：目標不是繼續修平台，而是讓真正產品從 22.2% 突破到 100%。** 不允許每次修改只產生工程活動而沒有可驗證的產品進度。僅做 Sprint 3.5；先更新本 Design PR #45 SPEC，再修改原 Build PR #419、Implement、真實網站 E2E。不開新 PR、不合併、不部署 Production、不做 Sprint 4。

## 產品完成率與舊樣本成績不得混算

- **原通用未知複雜 App 產品基線為 2/9；經上段既有產品 E2E 查帳補認，現已核 4/9 = 44.4%。** 這是本輪使用者指定的產品目標基線；沒有新增、可追溯的完整產品驗收證據，不得提高。後續更新必須明確標出**新增通過的驗收編號、網站原始操作、Job/程式版號、Sandbox 執行、後端 API、PostgreSQL 實際紀錄、恢復／分享證據及成本**。
- 本檔歷史所述 **9/9 已知 Staging 樣本**以及交接中的 7/9、8/9，是不同的既有樣本驗收帳本，**不是**通用未知複雜 App 能力完成率。不得用同一批已知樣本重跑、平台單測、CI 綠燈、模擬 Browser／DB 或新增程式行數提升此處 2/9。
- 本目標採 9 項獨立產品驗收的離散計分；經既有結果查核現為 **4/9=44.4%**，「50%、80%」依序落在可實際驗收的 **5/9=55.6%** 與 **8/9=88.9%**。每個新增 PASS 必須先對應原需求及既定產品驗收；不能事後更改驗收定義、拆小現有關卡灌水或自稱完成。

## 三階段必須突破的真正產品 Gate（不可用平台修補充數）

1. **第一階段：22.2% → 55.6%（2/9 → 5/9；新增 3 項 PASS）。** 重用**既有 Sandbox 方案與程式**，接通 AI → 同一份可保存多檔案前端／後端 → 隔離執行 → 真正後端 API → PostgreSQL。至少透過**全新、未知、複雜需求**的實際網站驗收，證明 AI 自主生成後，功能可操作、資料真的持久化並可關閉重開；每一項通過才把產品帳本 +1，絕不能把測試用固定 Node 後端或前端 CRUD 橋冒充完整未知 App。
2. **第二階段：55.6% → 88.9%（5/9 → 8/9；新增 3 項 PASS）。** 對同一未知 App 類別確認真正的編譯／Runtime／API／資料庫故障能自動診斷及有證據修復，長時間工作與中斷能從原 Job 版本恢復，並可保存、分享、重開、重用，無須付費重新生成。必須在**真網站端、真隔離執行、真資料庫**逐項驗收，不能只讀到測試輸出就 PASS。
3. **第三階段：88.9% → 100%（8/9 → 9/9；新增最後 1 項 PASS）。** 對**以前沒給引擎看過的複雜完整 App 需求**，驗證一般使用者只輸入自然語言、不需 Cursor／PowerShell／Docker／人工修程式，就能從生成、獨立 QA、真後端資料流、自主修復到保存與授權分享完整交付。最後關卡未通過不得宣稱引擎完成。

## 修改與驗收的強制門檻（禁止無進度的反覆試錯）

- **每一筆程式變更事前先指定唯一尚未通過的產品關卡**、實際阻斷、預期可觀察結果；先 SPEC → Build #419 → Implement → 真網站 E2E。不得無目標地增修平台功能、反覆重跑已成功案例或開新技術方向。若一項工程修復無法直接推動下個真產品關卡，停止並重新評估必要性。
- **改了程式 ≠ 進度增加。** 修復後必須附上對應的真網站 E2E、Job/模型原始計費日誌、Sandbox、實際 API/PG 資料、瀏覽器重開與分享（按關卡適用）；沒有新 PASS 就維持原分數，回報「未突破＋根因＋證據＋下次唯一阻斷」。既有 SDK、部署、容器及 API 單測只可當護欄。
- **至多兩輪集中修復**；每輪需有真錯誤及根因假設，沒有改善就停止改碼並更新根因／策略，禁止盲目 try-and-error。未知 AI/容器付費結果先查原 Job journal，**不得補送同一付費請求**；新增費用必須先有明確單次限額授權。
- 每次回報固定包含：**真正產品 PASS x/9、百分比、這次新增 PASS 數（或 0）、唯一阻斷、實際證據連結、付費模型次數、保守授權上限與已核帳／未核帳費用**。不得以「CI PASS」當「產品 PASS」。

**SSOT 權威：** 本段是 Design PR #45 的三階段正式產品目標契約；Build PR #419 的 `docs/sprint-3.5/SP35-WORK-HANDOFF-20261101.md` 必須同步置頂追蹤，不得與本段抵觸。其他舊樣本紀錄保留作歷史證據，但不能改寫本目標。

---

# Sprint 3.5 — Unknown Multi-File App Reliability / SPEC (2026-11-03)

Status: DESIGN CONTRACT / implementation and real unfamiliar-App E2E require separate evidence. Applies only to Design PR #45 and Build PR #419; no Sprint 4, merge, or Production.

## Purpose and truth boundary
The 9/9 previously frozen **distinct published Staging samples** demonstrate completed known-sample E2E, not a reliability guarantee for unseen full-stack applications. Do not count their free reruns as novel-app progress. A generic creator must support original-language intent -> durable multi-file source -> isolated build/test -> independent browser + backend/database evidence -> verified immutable Blueprint -> consented share/reopen, with per-job caps and resumable progress.

## Five universal capabilities to close
1. **Multi-file full-stack**: persist every source path/version, front-end and backend contracts, schema/migrations, environmental dependencies, and a reviewed capability/permission manifest; no code-type/game hardcoding. Unavailable backend/dependency capability must be an explicit UNSUPPORTED result, never READY.
2. **Durability**: exact owner/key/idempotency, immutable project and tool-call hashes, saved response IDs, revisions and checkpoints. Browser disconnect, timeout or ambiguous remote call recovers saved state without a new paid dispatch.
3. **Sandbox execution**: only verified project artifacts in a network-denied isolated workspace; strict allowlisted operations, bounded CPU/memory/time/network and saved build/runtime/console diagnostics. A green build alone is not a verified app.
4. **Independent multi-phase QA**: freeze all original prompt-derived requirements *before* code; verify each source-quoted criterion with real actions and observable outcomes (not static presence). Stateful use cases must support a **reload action** within the SAME independently isolated browser context followed by assertion, preventing an in-memory-only implementation from passing persistence. Cross-user isolation needs a distinct browser identity and a database observation; do not treat reload alone as proof of server persistence. Missing or unsupported QA primitives fail closed as UNTESTED/NEEDS_HUMAN, not PASS. Immutable signed QA receipts must match original prompt, project hash, build hash, and browser execution; publication requires a separate F02 admission.
5. **Bounded repair and strategy change**: repair from saved failed criteria and real diagnostics, don't silently rewrite requirements. Stop after three non-improving repairs to re-interpret/root-cause; after eight steps preserve checkpoint and change strategy only after explicit renewed human budget. Never rerun ambiguous paid model/container calls; never publish a failed or inconclusive candidate.

## First general acceptance primitive: QA reload
- Add the exact JSON action `{"action":"reload"}` with no role/name/value/URL fields. Maximum existing step bound stays unchanged. Reject arbitrary navigation or unsupported parameters.
- Independent built-project Chromium runner and isolated trusted browser QA worker execute a **same-page reload** with a bounded DOM-ready wait, keeping the same browser context and existing safe network interception. A runtime exception or missing content fails the criterion.
- A criterion such as click Add -> reload -> expect stored item (via `text_appears` anchored before actions) must PASS only if the item survives reload. A counter held only in JavaScript memory must FAIL. No model call is required for this independent regression.
- Legacy `srcdoc` single-file sandbox cannot guarantee origin persistence; it must reject/FAIL a reload criterion, not simulate persistence or claim PASS.
- QA planning rubric should request reload evidence for "refresh", "persist", "saved", "remember", "after reopening" requirements, and explicitly flag **cross-device/multi-user persistence** as requiring additional backend/identity evidence.
- Prior immutable passed samples remain untouched. Report implementation and unknown-product PASS separately.

## Next unfamiliar-App release gate (not yet fulfilled)
One fresh, genuinely unspecified **multi-file front end + backend + real PostgreSQL** request, frozen before generation with its own business rules, invalid input, create/update/delete, refresh, separate-identity isolation and permission checks. Require one owner-approved new idempotency key and a finite cap, source/version/SQL/HTTP logs, Docker build, independent browser and DB evidence, share HTTP201+ACTIVE+hash, a second fresh recipient Chromium, and zero AI calls on reuse. Negative controls deliberately missing persistence and breaking permissions must FAIL. No novel-app percentage can be invented before those proofs exist.

## Second general acceptance primitive: real business form controls
- Extend frozen QA actions with `{"action":"check","role":"checkbox","name":"..."}` for a named real checkbox and `{"action":"select","role":"combobox","name":"...","value":"..."}` for a named native select option. Do not permit arbitrary selectors, URLs or event scripts supplied by the model.
- Verifier must operate a real accessible, unique control and reject a non-interactable fake; positive evidence also needs a visible user-facing outcome (`text_appears` or `text_changes`) not only presence of a control. The same QA grammar applies to local independent multi-file Playwright, private isolated browser verifier and legacy single-file QA; all fail closed on unsupported UI semantics.
- Two unrelated business-flow negative controls: (1) merely drawing a checkbox but not updating consent summary, (2) static prewritten shipping choice without actual select-to-result transition. Neither may PASS. Add free Chromium positive/negative tests before claiming this primitive supported.
- No acceptance claim for server-side authorization or PostgreSQL consistency from DOM controls alone. Those remain additional unseen full-stack proof obligations.

## Third general capability: durable record writes and safe cross-tab concurrency (SPEC FIRST)
- Back-end record storage is the already-shipped **fixed SQL**, RLS-limited `public.appf2_code_app_record` behind creator/viewer P-256 signatures; executing AI-provided arbitrary SQL is explicitly NOT authorized. A generated full-stack App must only receive a capability-scoped record client. This is a generic backend capability, not arbitrary server code execution.
- **Idempotent create:** `create(record_id, value)` inserts once; retransmitting the SAME signed identity + share + UUID + semantically identical JSON payload returns existing row (HTTP 200) without creating another. A reused UUID with different value returns 409 `CODE_RECORD_CONFLICT`, never overwrites. Different owner/viewer thumbprints cannot read each other's rows (404).
- **Optimistic concurrency, opt-in backward-compatible:** `update` and `delete` MAY include `expected_value` JSON object, bound to the exact previously read stored payload; the Worker uses a **single atomic SQL DML predicate `payload=$expected::jsonb`** in addition to share/viewer/record predicates. A stale value returns 409 only if the same viewer still owns the record; absent/foreign record is 404. Without `expected_value`, legacy API semantics remain unchanged until existing published Apps are explicitly upgraded. No implicit last-writer-wins assurance for legacy clients.
- Bound both payloads and the entire HTTP body, enforce exact allowlisted JSON fields (no arbitrary SQL/selector/column, no nested oversized content). The model/guest cannot forge a viewer key or bypass RLS. HTTP error must not reveal whether a record belongs to another viewer.
- Repeated same-source update after a lost response may produce 409 because its original expected value is stale; caller MUST perform a signed scoped `read` and reconcile against intended target. Never silently resend a conflicting write.
- Negative backend proofs MUST include two concurrent reads A/B, A successful update with old snapshot, B 409 without lost update, wrong-viewer 404, same-payload create replay 200, changed-payload same UUID 409, stale delete 409, final creator-only cleanup. Verify by actual HTTP+DB or explicitly label unit/mocked evidence; frontend-only positive tests do not count as full-stack acceptance.
- This is one durable generic database reliability step, **not** proof of unbounded arbitrary backend execution or unseen full-stack generator success.

## Fourth general capability: signed viewer bridge must carry record recovery and CAS
- The immutable App iframe remains opaque-origin and NO_NETWORK. Only the trusted fixed host bridge can sign Worker record operations; never leak P-256 private key, cookies, credential or DB SQL into generated JavaScript.
- Extend `appf2Records.create(value, recordId?)` with an optional explicitly supplied **stable UUID v4** for intended replay of an uncertain first create. Existing `create(value)` remains backward compatible and host allocates an ID. Also provide bounded `appf2Records.newId()` (safe random v4 in the frame) so a new App can reserve once and reuse the same ID across retry; this is NOT an authorization key.
- `appf2Records.update(id, value, expectedValue?)` and `appf2Records.delete(id, expectedValue?)` must send **only** bounded, allowlisted JSON expected payload to the signed Worker. Without it existing public Apps behave as before. Signed identity and share ID always come from trusted host, never guest JS.
- HTTP 409 is a normal actionable `CODE_RECORD_CONFLICT` to the guest; 404/unauthorized and infrastructure errors must retain generic `CODE_RECORD_UNAVAILABLE` and leak no other viewer's data.
- If the caller receives a timeout on a CAS write, it MUST read and reconcile. The bridge cannot assert provider/transaction exactly-once merely because a network request was retried.
- Acceptance: existing bridge compatibility, stable-ID same payload replay vs changed payload conflict, two stale UI tabs request A/B with no lost write, foreign identity remains 404, browser iframe never sees identity material. A mock-browser/SQL proof is not the deployed Staging PostgreSQL E2E.

## Third gate — real Staging PostgreSQL server-side CRUD / two unrelated browser identities
- Do not regenerate or rerun a previously paid App. A known ACTIVE immutable `share_id` may be used **only as a database namespace fixture** for an independent, separate *backend platform* test; this does not prove any new generated App and may not increment E2E app counts.
- In two completely fresh independent Chromium browser contexts at the real Staging origin, create distinct nonextractable P-256 signing identities; each POST body and path is authenticated by APPF2_MUTATION_PoP_V1 with a fresh request key. Never export private keys, install secrets, or change generated artifact bytes.
- From real browser fetch through Staging Cloudflare Worker -> actual PostgreSQL, prove: A list-empty, create, read, idempotent same-value create replay (200), conflicting same-ID create (409), compare-and-swap update, stale update conflict (409), delete stale conflict (409), delete success and absent read (404). B cannot list/read/update/delete A's data (empty/404); B may create the same record UUID under **its own isolated identity** without overwriting A. Both must delete their own test rows.
- Browser must log only statuses, record counts and non-sensitive random test IDs, not P-256 signatures/keys, private payloads, SQL secrets or response internals. Limit to exact `/api/v1/code-apps/{share}/records` POST requests and same-origin GET; reject provider/model/Job POST. Run with zero AI/Cloudflare browser pay services in free GitHub-hosted Chromium.
- Any 401/404/409 unexpected response, API returning HTML, lack of per-viewer RLS isolation, duplicate real rows, or failed cleanup is a platform FAIL; never re-label as product-app SUCCESS. On a failed test cleanup in finally and preserve failing run evidence; no paid retries.
- This gate verifies the fixed trusted CRUD bridge, **not** arbitrary generated Node/Python backend, auth systems or DB schema generation. The next unknown full-stack App still must independently prove its own business logic and end-to-end user actions.

## Fourth gate — bounded app-defined backend queries for *unknown* business schemas (2026-11-03)
- Existing fixed per-viewer CRUD is useful but insufficient for unknown task boards, tickets, catalogues or planning tools. Add a **generic schema-agnostic, read-only JSONB intersection query** scoped to one ACTIVE published App and its verified P-256 viewer only. This is a platform primitive, not executing AI-authored SQL, backend JS, unrestricted database migrations or arbitrary multi-user authorization.
- New exact POST body: `{"action":"query","filters":{"status":"open","priority":2},"limit":20}`. The `filters` object MUST contain 1–4 distinct simple keys matching `^[A-Za-z][A-Za-z0-9_]{0,31}$`; each equals one bounded JSON scalar: string <=128 characters, finite safe integer in [-1000000000,1000000000], or boolean. No arrays/objects/null/functions, extra fields, unknown keys, SQL names/expressions, operator syntax or empty filters. `limit` is integer 1–100. Body still authenticated by same request PoP and exact Origin/anti-replay channel as old CRUD.
- Trusted Worker builds a JSONB object solely from checked user values and performs `payload @> $3::jsonb` with bound parameters, with `share_id=$1`, `viewer_key_thumbprint=$2`, ordered `created_at,record_id` and `LIMIT $4::integer`. Existing RLS must remain enforced. No dynamically constructed SQL identifiers, arbitrary filter operators, raw SQL or cross-owner access. Preserve old `list/read/create/update/delete` wire behavior exactly.
- Inside the verified hashed opaque iframe, expose `appf2Records.query(filters,limit)` through the existing fixed parent bridge. Browser-generated code NEVER handles signer keys or DB credentials. The parent checks the same bounded `filters` and `limit` grammar; wrong shapes fail locally before any signed request.
- Require independent API positive/negative validation tests and a *new* real Staging two-viewer Chromium signed Worker/PostgreSQL test: multiple different fields and values, intersections, nonmatching items, limit, negative input, and viewer isolation; delete temporary rows in finally and direct read-only PostgreSQL assert zero residue. This test is a **backend capability proof only**. It does not count as a new generated App, and fixed sample 9/9 does not become 10/10.
- No subscription/paid AI, arbitrary executable backend, Production deployment, new PR, or merge. Unrecognized fields yield empty results rather than privilege elevation. A future unknown full-stack AI-generated App must still compile source, implement business behavior, persist actual DB changes, prove auth/permissions, restart, repair and independently pass origin-frozen user QA.

## Fifth gate — connect the EXISTING sandbox to a single full-stack multi-file App snapshot (2026-11-03)

**Verified blocker, not a new Sandbox proposal.** The existing paid AI front-end `src/edge/free-ai-project-files.ts` admits only `src/**/*.ts/css/json` and tells the model not to create server files; `ProjectProfile` supports separate `VITE_WEB` or `NODE` but not one App with BOTH. `sandboxCommand` builds just one side. The free-only Staging deliberately forbids deploying billable private Containers and does not mean the underlying adapter is missing. Stop treating generic record CRUD and fixture browser builds as a full-stack generated App PASS.

**One bounded architectural increment, no privileged execution:** Add an explicit `VITE_NODE` project profile to existing immutable hashed ProjectSnapshot; require `index.html` AND `server/index.mjs` AND an `server/*.test.mjs` test in the same snapshot, with strictly filtered and hash-checked paths. Reuse the existing per-job network-disabled Cloudflare Sandbox adapter and trusted pinned tooling. In the Sandbox, `run_build` must build the frontend using the existing locked Vite command **and** check the server module syntax; `run_test` must run the server's independently written Node tests with fixed argv, without model-supplied shell/flags/install, and verify the frontend's locked smoke output. Logs must remain bounded and saved into the original durable Agent checkpoint. The source can use built-in Node APIs only; the Sandbox has no external network, platform credentials or PostgreSQL network access. This is offline application/backend verification, not permission to deploy a generated server.

**Admission and regression gates:** VITE_WEB and NODE unchanged; `VITE_NODE` with missing server entry/tests is rejected, arbitrary npm/package/config/secret files denied. Tests must prove a genuine multi-file front+server source snapshot reaches the SAME existing adapter `run_build` and `run_test` fixed commands with frozen project hash, no arbitrary model argv, and a failing Node test must fail the test (never fake PASS). No regression for prior frontend apps.

**Not yet solved / never claim:** An actual AI-authored unfamiliar full-stack App still needs an authorized model generation, safe long-lived backend hosting, trust-bounded PostgreSQL access, live browser→backend→DB operations, diagnosed repair, saved re-open and independent owner-approved sharing. No model POST, new paid resource, Production deploy, merge or new PR for this infrastructure increment.

### Fifth gate integration extension — route full-stack source through existing paid-model journal AND free Docker (not new Sandbox)
- Keep old jobs and frontend model responses unchanged. Creator may explicitly choose `project_profile:"VITE_NODE"` on signed Job creation; absence defaults to `VITE_WEB`. Job response must expose the durable profile, so UI can decide without guessing after reload. This is opt-in at creation, NOT automatic intent classification.
- Only a VITE_NODE Job may accept `server/**/*.mjs` plus `src/**/*` in the bounded complete AI JSON source reply. Require `server/index.mjs` and `server/test.mjs` and client entry/style, with 12 source-file and overall byte limits. The pre-code acceptance plan and model output belong to the SAME saved job and owner. No packages, deployment scripts, migrations, host commands or credentials; original paid answer must be replayed without recharging.
- Same frozen ProjectSnapshot goes to existing free locked Docker runner: trusted Vite front build, fixed `node --check server/index.mjs`, fixed `node --check server/test.mjs`, then fixed `node --test server/test.mjs` inside the egress-disabled, resource-capped sandbox. Failed server test yields a **failure receipt** (never success) bound to snapshot hash and repair context. The browser QA remains separately derived from the original prompt. Model-authored Node tests are only self-test signals, not independent proof that business requirements work.
- **Publication must fail closed for VITE_NODE** until backend hosting, owner-scoped database permissions, real API/browser integration and independent backend QA are implemented. No frontend-only preview may be represented as a complete full-stack published App. No Production, AI POST, paid Containers, new PR or merge in this step.
