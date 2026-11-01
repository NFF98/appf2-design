# APPf2 — AI Code Builder → Blueprint v2 → Verified App Card (Design Delta H-001)
Date: 2026-10-28
Status: **Working design proposal, product-owner requested**. Not a frozen Phase 1 baseline, not deployed functionality, no Production permission.
Build target: NFF98/appf2-build PR #419 (Sprint 3.5 product-priority spike / incremental implementation); full hybrid production launch needs separate evidence.

## 0. Sprint 3.5 產品交付範圍（2026-10-31 Human 最新指示）

> **唯一執行計畫名稱：Sprint 3.5 五核產品閉環收尾計畫**（`SP35-FIVE-CORE-PRODUCT-CLOSEOUT`）。
> 計畫／每輪證據：`NFF98/appf2-build/docs/sprint-3.5/SP35-FIVE-CORE-PRODUCT-CLOSEOUT.md`，僅管 HOW、次數與 E2E 證據；**不建立第二份 Product Design SSOT**。本檔仍是 H-001 唯一 Design owner，Phase 1 F05/F06/F16、Phase 2 F08/F10 的原始責任不變。
> 本節是 Design PR #45 中等待審核的產品範圍修正；尚未合併／Build Freeze／正式部署，不宣稱現有程式已可用。

### 0.1 本次必須交付的完整使用者流程

**使用者只輸入自然語言 → 單一 AI Code Builder 自主編寫多檔案程式（必要時包含受控後端／資料庫）→ Blueprint v2 固定程式、版本身分、權限、資料參照與分享身分 → 隔離 Sandbox 真正建置、獨立 Browser QA 操作與失敗修復 → 通過後出現可操作 App 卡片 → 保存、重新開啟、建立者同意後分享、別人使用同一版本；以上後續開啟均不重新呼叫生成 AI。**

「分享、重新開啟」是 Phase 1 F05 的**基本使用能力**；本次須把該效果接到新 v2 作品。它**不是** Phase 2 的帳號所有權、永久個人收藏庫、跨裝置私有資產同步、App 家族版本管理、F10 語意搜尋／智能重用，也不是 Phase 4 App Evolution。新的 App 修改可保存新 immutable 版本且不能覆寫舊 hash；本 Sprint 只要求版本**識別／可追溯／原版本可讀**，不建立帳號級 History 中心。未指定的永久保管承諾不得推定。

### 0.2 五項核心產品改造，全部以真實網站驗收

| 核心 | Sprint 3.5 的完成條件 |
| --- | --- |
| **1. 多檔案／前端／後端／資料庫** | 同一類型無關 AI Agent 生成至少兩種不同互動 App；其中一個須有真的後端與資料庫 CRUD／重讀。後端必須走明確授權、隔離的執行與資料權限；沒有受控 Profile 就標 **BLOCKED**，不可把平台工作資料庫或靜態示範當作 App 自有後端。 |
| **2. 長工作保存／接續** | Job、原始需求、程式快照、hash、已花費與工具收據可保存；中斷／重新進站接同一 Job，不重新生成或重複計費。完成的 immutable App 版本可由卡片重開。 |
| **3. 真 Sandbox** | 本期免費路線採**公開 Build Repo 既有標準 GitHub Actions Linux runner 的隔離 Docker**，對實際 AI 生成專案 build／test 並留 exit、console、限權、資源、來源與產物 digest；獨立 Chromium QA 不得與生成程式共享權限。可信 fixture PASS、Wrangler dry-run 或未證實 AI 來源都不可充數。 |
| **4. 獨立 Browser QA + 自動修復** | 從原始需求先凍結可驗收條件，實際 Chromium 操作應用、驗證狀態／邏輯／錯誤；失敗留下證據→修復→重建→重測。任一必備條件 FAIL／UNTESTED，不得發布已驗證卡片。 |
| **5. 受控重試／策略轉換** | 對重複失敗保存完整上下文、分析根因並改修復方案；成本或步數不足則暫停並可從原進度接續；未知付費結果不盲重試。不承諾無限制算力，也不允許未核准的跨模型／供應商轉送。 |

### 0.2a 免費方案決議（2026-10-31 Human 最新成本限制）

- **禁止新增費用／方案升級**：不部署 Cloudflare Containers、不依賴 Workers Paid Sandbox 或付費 Browser Run。原有 Cloudflare Worker／PostgreSQL 僅在**現有免費配額或已核准預算內**使用，不新增任何訂閱。新付費 AI API 操作同樣需核對現有可用額度與逐次明確同意，不能把現有 Key 當成免費。
- **隔離執行實作替換，非產品要求刪減**：原 H-001 的「isolated Build Sandbox」由公開 Build Repo 標準 GitHub-hosted Linux runner 上的 network-denied Docker 執行，通過來源 digest／分離權限／費用控制後再由獨立 Chromium QA 驗收。這只改技術路徑，不刪多檔案、需求後端/DB、Blueprint v2、保存/分享/零再生成、失敗修復等五核交付 Gate。
- **安全限制**：尚未具備可將「真實 AI 模型輸出」從既有 Worker/PG Job 安全交給 Docker Runner 並把 QA receipt 綁回 hash 的接線；GitHub Actions 的可信測試樣本不得算成新作品 E2E。不得將任意 AI 程式直接放 GitHub runner 的特權進程執行、不得附帶資料庫/AI/GitHub secrets 或授權其任意網路／外部 API。完整後端 DB 執行隔離未完成即 BLOCKED。
- **免費已存在能力**：已公開的既有 App 可以 0 生成 AI 呼叫直接重開；這不證明新 Agent 完成。若功能需額外付費才可完成，停止並報阻斷，不自動選擇付費服務。
- **證據／輪次／詳細 HOW**：只在 Build 原固定計畫 `SP35-FIVE-CORE-PRODUCT-CLOSEOUT` 更新；本 Design H-001 仍保留唯一產品範圍，不創建第二份 SSOT，不啟動 Sprint 4。

### 0.3 完成／非範圍邊界

- **必備產品 Gate**：真實 Staging Browser→Worker→真模型→DB→隔離 Sandbox（免費路線 CI Docker）→獨立 Browser QA→v2 immutable artifact/admission→App 卡片→同版本重新開啟／分享／新瀏覽器操作（**重開 0 生成模型呼叫**）。新 v2 作品須在建立者明確發布同意後才可公開；保密資料不進公開包、生成程式不得直接接觸 APPf2 金鑰。
- **負面 Gate**：任一未通過 QA／來源雜湊不符／越權／重送成本／惡意生成程式，都不能發放可公開操作卡片。保留 Phase 1 v1 舊 App 和其既有分享、修正功能，不能為趕新功能破壞它們。
- **不啟動**：Sprint 4；Phase 2 F08/F10 的帳號所有權與進階重用；Phase 3+ 付費外部能力／Commerce；Phase 4+ Evolution；16P 舊流程。**生成 App 的受控後端／DB 已列在本 Sprint 必交付**，但其安全執行契約缺口須先補齊再驗收，不得直接擴權。
- **完成證據**：同一 GitHub HEAD 的真實 Staging URL、request/Job ID、AI 收據、PG write/read、Sandbox exit/manifest、Browser 操作與 QA 每項結果、卡片分享重開及 0 再生成紀錄。任一項未測／不符即 **SP35 PRODUCT NOT_DONE**，CI PASS 不能代替。
- **執行節奏**：固定 `SP35-FIVE-CORE-PRODUCT-CLOSEOUT`，四個交付關卡（真實阻斷盤點、雲端五核心修復、v2 卡片／分享接線、全鏈驗收）；**產品集中修復最多兩輪**，其餘為查證與驗收；未證實改善就停、列阻斷而非開第三輪。具體計畫在 Build，不複製到 Design。
- **授權界線**：Plan 不自動授權付費 AI、Cloudflare Container、正式合併或 Production 部署；由原本批准／使用者明確授權及最小必要安全護欄控制。Design PR #45 / Build PR #419 原址延續，不另開產品 PR。


### 0.4 Sprint 3.5 缺口關閉 SPEC／分期突破門檻（Human 2026-11-01 重新對齊；**先 SPEC 後 Build**）

**最終不變目標：**使用者在**真網站**輸入一句自然語言，由**同一個**通用 AI Code Builder 產出可操作、多檔案 App（需求需要時接已核准後端／資料庫能力）；即時顯示真狀態與耗時，持久保存原始 Job 和每版程式／已付費結果；在免費隔離 Docker 真 build、由獨立 Chromium 依原需求操作、失敗有證據才有限修復及換策略；通過才交付可重開、可明確分享、他人可免重新生成使用的 **Blueprint v2 App 卡片**。不依 App 類型切不同引擎，不靠單一計分板樣例、不假 PASS。

**產品範圍與技術誠實界線：**Sprint 3.5 是一套通用**程式生成引擎**，不是承諾任何語言、任何外部服務／套件皆可無權限執行。已核准可執行的 Profile 才能啟動：前端 Vite 多模組 + 受控且使用者隔離的 platform data bridge（可用 PostgreSQL-backed CRUD），不得讓生成程式拿 DB 連線字串或直接部署任意 server。要求獨立任意 Node/Python 後端、任意 npm、網際網路、付款或未核准權限時，生成前清楚標記 `UNSUPPORTED_RUNTIME_PROFILE`／`BLOCKED_APPROVAL`，**不可**假裝已完成全端、偷換成無資料的靜態 mock，亦不可自動加購 Cloudflare Containers／付費 Browser Run。

| ID | 缺口與 SPEC 實作要求（先設契約後寫碼） | 唯一有效的產品驗收證據（不得以 mock 代替） |
| --- | --- | --- |
| **G0 / 可量測真使用者旅程** | 網站自然語言→明確同意→原 owner Job→AI→可操作私人預覽→驗收→完成／繼續。Job 每一里程碑（原請求入庫、模型開始／完成、source CAS、Runner queue/start、build、QA、卡片／分享）需有伺服器時間戳，含未完成、錯誤、超預算與離站重開；顯示階段／已花預算，不能把頁面計時或 HTTP202 當完成 | 同一真 Staging browser session，逐一重讀 PG、出具 signed Job/Runner/QA/卡片事件時序，`first_interactive_ms`／`qa_complete_ms`／`resume_ms`；無事件時標 `NOT_MEASURED` |
| **G1 / 自由多檔／受控真全端** | AI 回傳可驗 schema 的完整來源樹，修復可原子 add/replace/delete，檔案 hash/版號不可變；既有合法付費 `main_ts/style_css` 答案可重播，不另收費。資料需求只能呼叫已核准且有 viewer 隔離的 bridge；不用未核准執行 profile 假裝寫 server | **三個獨立、未見過**的真付費 GPT 需求：簡單工具、互動遊戲、含真 PostgreSQL viewer-private CRUD 的資料型 App。至少兩個非範本多模組；真正由模型生成、真 Vite、真按鍵／表單／CRUD＋刷新及跨 viewer 隔離，所有功能按原需求凍結 QA PASS。可信手寫 fixture 只能證明管線 |
| **G2 / 持久 Job 與來源重用** | 原 owner 非匯出式 PoP；原文、file snapshots、parent hash、checkpoint、paid call journal、build/QA receipt、預覽、版本和權限可從同 Job 唯一接續；401/403/404 不補建新 Job／不再調 AI。完成版本可卡片重開 | 真 Chromium A 關閉，B 原 profile 重開→讀同一 Job、同 hash App、相同有效來源，`0` 新模型 POST；陌生 owner、失效 PoP、竄改來源全部拒絕 |
| **G3 / 真實隔離執行與 QA** | GitHub Actions 標準免費 runner 裡 restricted Docker（network none/no secrets/bounded CPU/memory），獨立 Chromium 使用先凍結且與模型輸出無關的 QA；無未通過/未測試的 public publish。compile/runtime 不得以模型文字代替 | 每個**真 AI 版本**都有 signed runner id、immutable source digest、build exit、診斷與 frozen QA receipt；失敗必須保留並在 UI 可見，任何 `FAIL/UNTESTED` 絕無 READY/ACTIVE 公開卡片 |
| **G4 / AI 真自動修復與策略** | 同一 Job 的 QA FAIL→修復模型讀真診斷→source CAS 新版→Runner 重驗；三個相同根因的**連續真失敗**才切 `RETHINK_ROOT_CAUSE`，提出不同方法；失敗不改善必須停或改方案，不能無限重試。`MAX_JOB_CALLS=8`，模型成本逐筆原 owner 批准，未知收費結果先查 journal，絕不雙 POST；超資源 `PAUSED_APPROVAL` 仍可繼續 | 至少一個**真付費 GPT**首次 FAIL→修復→獨立 PASS；三份同 Job immutable 失敗收據可證明策略被選、第三輪真 model prompt/行動實際改策略並驗收。三輪情境若真模型第一輪已 PASS 不得故意造 FAIL，不得報 G4 全量 PASS |
| **G5 / v2 卡片與分享** | Build/artifact/manifest + Blueprint v2 immutable hash 的 admission 完成後，原 owner 私人卡片可重開；公開分享需新一次明確同意 + 原 owner PoP + ACTIVE share；新乾淨 browser 走相同 hash 開真正 App，資料各 viewer 隔離、0 生成模型 POST；revoked/unknown/foreign 失敗閉鎖 | 真網站：creator 生成→獨立 QA PASS→建立私有 v2 卡→重開→**另一次明確** share:create→陌生 browser 由 public URL 使用／刷新同 hash、0 新生成；跨 user 資料不得洩漏；公開卡只能按真 share 引用，禁止靈感假卡 |

**速度 SPEC / 先量測再宣稱加速：**同一產品旅程須區分 `time_to_job_saved`、`time_to_first_interactive`、`time_to_qa_complete`；記錄 AI provider 推論、GitHub queue/start、依賴／Chromium cache hit、Docker build、browser QA 分段時間。用至少 **3 種 App × 3 次真使用者路徑**獲得 P50/P95／失敗率；當樣本不足 P95 標 `INSUFFICIENT_SAMPLES`。首輪目標（**不是已驗證 SLA**）：原 Job 建立 P95 ≤ 5 秒、簡單 App 首次可操作 P50 ≤ 120 秒、完整 QA 簡單 App P50 ≤ 300 秒。達不到時先列耗時占比與首要根因；不得靠隱藏 QA／縮減功能／跳過分享偽造加速。複雜 App 允許長流程，應可離站後恢復，顯示等待及阻斷。

**執行順序（最多兩輪集中修復，不開新 Sprint/PR）**：`SPEC/G0` 凍結本 Gate 表與測試樣本／費用護欄 → **Round A** 通用模型多檔來源、受控 DB bridge、持久 Job 和可見執行時間戳 → 真 Staging + 三類受控測試 → **Round B** 只修首個真 FAIL：策略執行／卡片分享／速度最大瓶頸，按 Gate 留證 → 最後 `G0..G5` 一次全鏈重跑。每項 **PASS / PARTIAL / BLOCKED / NOT_RUN** 必填原 Job + HEAD + GitHub run + PG/Chrome 證據；不能用「完成度約60%」代替實際 PASS 比例。既有舊 16P Gate/HOLD 不能凌駕 Human 指定產品優先，但**不得**修改不可變 BS-P1-025 或冒建已啟用 BS-P1-026；`build-spec/CURRENT.json` 的舊 HOLD 不因這個工作草案自動變更。須於 Design PR #45 本 H-001 更新並先提交，**再**在既有 Build PR #419 原 `SP35-FIVE-CORE-PRODUCT-CLOSEOUT.md` 留映射、實作與驗收；不另開 Spec/Build PR。



### 0.5 Human 2026-11-01 最新硬預算／九次真網站驗收（本節後發指令覆蓋舊 6.84 美元估算）

**Human 指令：整批 US$1.00（100 cents）硬上限，不是每 Job 1 美元，也不是允許以 US$6.84 跑 9 次。** 原有一次付費 G1 Job 的歷史收據要與新費用分帳，也要在本輪綜合上限審核中保守納入。任何未知的模型供應商發票額不得猜為 0；預留上限／checkpoint cost 不能混充實扣帳單。跨 Job 有原子化全批可扣額度 ledger，只有新付款之前已確認 `sum(max_pending_possible_provider_charge_cents)+new_max<=100` 才可排程；未知付款記錄視為已占滿上限，絕不重送。不得因使用者要求「不要停」而超出明確 US$1 授權。

**9 次嚴格驗收仍是 3 類 × 3 次獨立真網站 session，原需求必須每次自然語言進站並關聯原 Job**：簡單工具／互動遊戲／有 viewer-private PostgreSQL CRUD 的資料 App；每類每次從 Chrome 互動到真正 build QA、恢復、分享/拒絕權限、零再次生成及階段真時戳。**建立、來源、驗收、持久化、正式分享、重開是產品 5/5 的共同 Gate，任何不足不可「9/9 PASS」。**

**不可偷換分母**：已付費並有真生成證據的舊一個遊戲原 Job 可以在「已存在有效證據」欄計數；不可以算作本輪新的 3 次生成。**同一 App 重開 2 次是重用 E2E，不是 2 個新的自然語言生成 Job**。可使用免費重開 session 觀測速度、權限和零再生成，但須同時公布 `new_generated_jobs`、`reused_existing_jobs`、`nine_end_to_end_new_creations` 三個獨立分子與分母，不可把 3 次生成 + 6 次重開直接寫成「9 次新生成全 PASS」。

**成本算術／前置檢查**：目前受控 GPT-6.1 Sol 原始模型 phase reservation `CODE=20 cents`、`REPAIR=16 cents`、`QA=8 cents`；手工提前凍結 QA 不發 QA model POST，歷史 Job checkpoint `28 cents` 是含虛擬 QA 8c 的較高保留記帳，並非實扣。新 GPT 的單 Job admission 仍要求 `max_cost_cents>=44` 才能進入 paid Code Builder。由此可知**9 個全新有修復餘額的 GPT-6 Job 不能在 100c 的現行 reservation contract 下獲保證**；除非先透過新 Design 批准更便宜模型／更精確、不可超支的計費控制並驗證品質，不能保證 9/9。嚴禁降低 GPT-6 模型或 QA 品質而不明示、拒絕在過度預留時偷偷開下一 Job。新的每次支付必須由原 owner P-256 授權，完成時把 exact GitHub/PG/Chromium evidence、receipt tokens、模型成本上限和真正發票未知狀態寫回唯一 Build SSOT。

**真失敗後的通用修復上下文成本規則（2026-11-01 G1 實際 DB CRUD 5/6 FAIL）**：在真 Browser QA 已驗證邏輯／資料變更斷言 FAIL（而非 CSS/版面/編譯錯）時，REPAIR 模型應保留與狀態、事件、資料交換相關的完整 TypeScript 原始來源樹及原凍結 QA，**可在送模型的診斷上下文中省略龐大 CSS 和可信不變 scaffold**，以控制 token 費用；**原 PostgreSQL source snapshots/immutable hashes 一個字不能刪**。模型仍須回傳可驗證的完整新來源樹；如無法保證程式/樣式一致則 fail-closed。不能在 24k 字 guard 上失敗卻只對前台回通用 503，應回固定無秘密代碼 `SP35_REPAIR_CONTEXT_EXCEEDS_APPROVED_BUDGET`，不繞過成本護欄、不把失敗變假 PASS。原 Job P-256 私鑰失效後不得冒充原 owner/重開新費用來假裝接續。此規則與 US$1 新批准同時適用，先免費證實再決定下一筆費用。

**執行方式**：先真網頁免費 smoke（現有 Agent 首頁入口、Worker、持久 Job、公開卡），再逐個使用最小安全費用的真模型 Job，僅在全部來源/QA/卡片/存活證據通過後計數；批次中每次真付費前重算 `$1-left`，超限不得調模型，改為免費錯誤根因修復與既有 artifact 重用驗證。任何雲端非必要費用／Production／新 PR／Sprint 4 不在本次授權內。**「不能停」指工程向既定產品目標持續推進，不構成無限制模型信用額度或無證據 PASS。**

---

## 1. Product outcome

**One natural-language request → one general-purpose AI Code Builder → one Blueprint v2 → one verified, reusable App card.** New Apps should not be routed into separate generation methods based on whether their category is a game, financial tracker, form or animation. AI writes real project code; safety, supported environments and required permissions determine *how it can be executed*, not whether the creative task is permitted by a catalog of prebuilt components.

**Blueprint v2 is an immutable envelope and reference to the built App, not a restricted UI/component instruction format.** It records version, immutable artifact hashes, permission/runtime profile, creator ownership, sharing rules and **separate per-user data-state references**. Do not embed a user's private mutable data in a shareable bundle.

**Legacy compatibility only:** existing `NATIVE_BLUEPRINT` F02-v1/F03 Apps must continue working, but **are not a user-facing second creative engine** or a basis for routing new requests by App type. The new default path produces `CODE_ARTIFACT` Blueprints. Existing F05/My Apps/gallery stays a single unified product.

Opening any published App invokes zero **AI generation** calls; hosting/storage/approved external API services may still have costs.

Prohibited shortcut: a model's JSON/TS string, merely a ContentHash, a passed unit test, or an attached ZIP is **not** an executable admitted Artifact or a public share.

## 2. Architecture (F01/F02/F03/F05/F06/F16)

```text
Natural request (e.g. 十八啦多人骰子遊戲)
  → F01 understanding / consent & bounded AI budget
  → ONE general AI Code Builder creates project source and assets
  → prepare DRAFT Blueprint v2 metadata / execution requirements
  → isolated Build Sandbox compiles project + runs security and browser tests
      ├─ fail: preserve intent/source, bounded repair ≤2, no READY card
      └─ success: immutable built files, hashed manifest and test evidence
  → F02 v2 checks artifact bytes, provenance, runtime permission and tests
  → SEAL the final Blueprint v2 with exact admitted hashes and version
      (the draft is not yet a valid runnable/shareable Blueprint)
  → F05/My Apps creates an authorized App card and immutable share reference
  → F03 sandbox runs the approved program and restores only recipient state
  → F06/F16 edits produce a NEW artifact and NEW Blueprint version
      (original remains intact; compare and user chooses whether to accept)

Legacy v1 F02/F03 dispatch is strictly a backward-compatibility route for
preexisting native Blueprints, NOT app-category classification.
```

## 3. Versioned records and unambiguous hashes

**Do not silently widen existing v1 Blueprint schema.** Legacy `schema_version = 1.0.0` and `content_hash` remain bit-for-bit identical. v2 is the single default format for newly AI-generated Apps; the existing v1 reader remains only to reopen previously created Apps.

```json
{
  "schema_version": "2.0.0",
  "kind": "APP",
  "meta": { "title": "十八啦骰子遊戲" },
  "execution": {
    "kind": "CODE_ARTIFACT",
    "artifact_id": "sha256:<64 lowercase hex>",
    "manifest_hash": "sha256:<64 lowercase hex>",
    "entrypoint": "index.html",
    "sandbox_profile": "WEB_STATIC_V1",
    "host_protocol": "appf2-code-bridge/1"
  }
}
```

This is the **minimum envelope example**, not a claim that current F02 accepts it. Real schema requires exact allowed keys, creator provenance, trust checks, content-bound allowed permissions and release version. All unknown fields fail closed.

- `artifact_id`: SHA-256 of byte-for-byte immutable built output package, including paths and lengths in deterministic order; not source code, not a URL.
- `manifest_hash`: canonical JSON hash of manifest listing exact file path / mime / size / SHA-256, toolchain digest, SBOM/dependency lock, provenance, build/test report digest, declared permission profile, runtime compatibility version. Archive-level hash and each file hash both checked.
- `blueprint_hash`: SHA-256 of the **full canonical v2 envelope** including the pinned manifest hash and artifact ID. Unique version identity; no mutation.
- `source_bundle_hash` optional metadata, separately stored/restricted for F06/F16. **Never download source by public F05 read unless the creator explicitly enables source sharing.**
- DB stores immutable records and allowlisted references; bytes stored in private R2 (or equivalent immutable object store), not in PostgreSQL mutable JSON. F05 lookup checks live share status and artifact/Blueprint hash **on each protected read**, then grants short-lived access.
- No client-supplied external artifact URL; no executable code embedded directly in share links.

## 3.1 Most important engineering decision — do not constrain AI with Blueprint

The order the user sees is **AI Code Builder → Blueprint v2 → automatic verification → reusable App card**. In implementation, a **draft** Blueprint can exist before compilation, but the *final shareable Blueprint is sealed ONLY AFTER* the built artifact passes tests and hash admission. This prevents a failed or unbuilt model response from becoming a runnable card.

Code Builder may create different layouts, game rules and application logic using normal programming languages and frameworks. Blueprint v2 is not an allowlist of app categories or widgets. It is the stable packaging, ownership, versioning, permission and sharing contract for the finished code.

Supported execution profiles still matter: initially static client-side web code in a restricted sandbox. A multiplayer server, camera, third-party payment or unrestricted internet access requires a separately approved runtime capability/profile, **not a new special-case generator**. Unsupported technical requirements must be explained to the user before fees or publication.

**Universal-card invariant:** if a generated project has not passed the exact build/test/admission process, it is **not** a reusable published App. Once admitted, open/save/share/reuse operates on the exact version and does not pay for generation again. Editable source can be stored privately for later correction, while published static code and personal user data remain distinct.

---

## 4. Build Sandbox trust boundary

- One isolated workspace per build, with CPU/memory/wall-clock/disk/process limits, file/size/dependency limits, kill-on-timeout, output-size cap.
- Source and dependencies treated **untrusted**; no APPf2 DB, Hyperdrive, model keys, Cloudflare API token, client cookies, or project secrets in process/env/files/network.
- Dependency install only through controlled policy; block unsolicited outgoing traffic and private-address/metadata endpoints; audited egress/allowlist when needed.
- Build output static WEB_STATIC_V1 first; custom server/back-end or native devices remain **unsupported pending a separate execution profile**. Do not silently promise all generated applications can run.
- Tests: deterministic typecheck/build, path traversal and secret scanning, dependency/license checks, artifact integrity, browser interactive smoke tests with seeded fixtures; bounded at most two automated repair attempts before fail-closed.
- Compilation success != semantic correctness. Record real browser operations, resource/crash/timeout behavior and security decisions as separate evidence.
- Cloudflare Sandbox/Containers is a candidate implementation, not installed/deployed merely by this design. Current provider API and limits must be checked prior to rollout.

## 5. F03 sandboxed Web Runtime boundary

- **Never import/eval the built JS in APPf2 origin, Worker, React tree, or main document**.
- Strict **sandboxed iframe without `allow-same-origin`** for built static client, opaque origin. Explicit CSP (deny default network/connect, plugins, frames, top navigation, forms by default); no Worker bindings, no host token, no cookie, no host DOM or parent storage.
- Network permissions are capability grants through separately mediated/verified host APIs, default DENY. Opaque-origin browser fetch/CORS and isolation consequences must be tested.
- Host bridge uses `postMessage`: origin is opaque so **both MessageEvent.source and an unpredictable per-instance nonce/MessageChannel port** must be verified; allowlisted typed messages; version + max bytes + rate limit, no arbitrary eval or arbitrary method dispatch.
- State: each browser/user instance gets a distinct state namespace keyed by `share_id + blueprint_hash + user/browser identity`. Only consented bounded state values via typed bridge are stored; no publisher state leaks; `DO_NOT_PERSIST` never stored; never put sensitive values in public Blueprint or R2 static bundle.
- Same published code may be opened repeatedly with **zero F01/model calls**. Loading may incur normal hosting/runtime costs. Editing code requires a new version; card can choose its pinned version and cannot silently update.
- Crashes/timeouts/errors isolated to the frame and surfaced with retry/restore; one game cannot kill APPf2 Shell or another game.

## 6. Unified App card & versions

- Card metadata: public share ID (if ACTIVE), title, thumbnail (optional), `blueprint_hash`, `execution_kind`, `published_version`, safe origin/owner policy.
- Open flow: resolve share → authorize exact Blueprint v1 or v2 → fresh runtime admission → fetch *exact* immutable artifact by ID/hash with no arbitrary redirect → verify bytes/manifest → isolated instance → restore **recipient** state.
- F05 sharing is **explicit opt-in**; public readers cannot mint themselves a share from an artifact ID or code URL.
- F06/F16 code edits create new immutable bundle/hash; only promote after real tests; original card remains usable if generation or child admission fails. Before/after is a user decision, never a silent replacement.

## 7. Phase 3.5 execution gates (no per-game hardcodes)

| Gate | Proof (never substitute a model response) |
|---|---|
| H1 | v2 envelope + manifest schema validator accepts good pinned artifacts, rejects unsupported profile/paths/hash/unknown keys |
| H2 | same immutable built output can be referenced by a card twice with no builder invocation |
| H3a | opaque-origin iframe sandbox cannot access parent DOM/localStorage/cookies, outgoing network denied (early standalone browser proof) |
| H3b | authenticated, versioned, quota-limited bridge with typed persistent instance state passes adversarial/browser proof (not covered by H3a) |
| H4 | real staging build-sandbox compiles **an arbitrary source project**; hashes persisted & revalidated; old v1 App unchanged |
| H5 | real F05 anonymous second browser opens a v2 published card, mutates own state, reloads, no new AI, no creator data |
| H6 | crash/runaway/malicious source isolated with bounded failure and no platform compromise |
| H7 | create a simple game and a visually different interactive app via **the same general pipeline**; no game-specific code switches |

**Milestone honesty:** Initial implementation may complete H1/H3a in isolation; that is **NOT** H3b/H4/H5/H6/H7 or the finished Code Builder. Nobody may report “all apps supported” without the corresponding proof.

## 8. Compatibility & rollout decision

- Existing F01/F02/F03/F05 v1 passes unchanged as legacy compatibility. **All new generation attempts use the general AI Code Builder; routing depends only on technical execution requirements/approved permission profiles, never App category.** Blueprint v2 is additive; never migrate old hashes in place.
- First Code Builder output profile is static, client-only WEB_STATIC_V1; backend APIs, multiplayer network servers, payments, camera, native mobile or arbitrary installed packages are additional permissioned product capabilities, not automatically enabled by Code Builder.
- No 16P/HOLD/quasi-governance blocker in the product critical path; maintain non-negotiable code execution isolation and consent checks.
- **Design first, Build second**: this Working design is committed in NFF98/appf2-design before touching Build files. A source link and exact version of this document must travel with the Build PR, not pretend that the original immutable Phase 1 freeze has changed.


## 9. Staging-first user-testable vertical slice — 2026-10-28

To prove the product **on the real deployed website**, the first limited WEB_STATIC_V1 path may use an internal PostgreSQL artifact store for very small, standalone one-file JavaScript Apps while object storage and true isolated compilation are developed. This is an explicit **staging-only exception**, not the final immutable R2 production storage architecture. The existing owner-authorized F05 native cards stay untouched.

**Exact end-user flow:** The homepage's normal 「建立 App」 action invokes the new Code Builder by default, with one visible, unticked **explicit public-card consent**; no hidden sharing or surprise paid retry. User types one prompt → one bounded model completion produces plain, self-contained JavaScript + short title → server validates the strict byte-hashed v2 envelope/manifest, applies a code-size and permission cap, stores it as a private staging record with the public reference active **only after** admission → user sees it running inside the existing opaque-origin frame → the URL `/code/{random_uuid_v4}` (or a card) reopens the same bytes without calling AI. Generated Apps cannot access parent origin/DB/keys or external network; network/server-backed Apps are unsupported for this initial profile.

**Required additional controls:** same-origin POST; fresh client P-256 PoP over exact request body; server-verified CREATE idempotency; bounded generation quota by server-side network pseudonym per day, claimed-key uniqueness and billing cap; model key only Worker; no off-origin arbitrary model endpoints; no unsolicited fallback; no server-side execution of model-produced JS; reject if bytes/hash/shape/permissions fail. The staging PostgreSQL write is role-limited + RLS and the public read is by opaque share ID only; never by content hash alone. A public share is published only after the user checks explicit opt-in and has acknowledged that generated UI text/content may be visible to anyone with the link. If no explicit consent, fail closed before any model call.

**Acceptance:** one actual prompt on live Staging → real API/provider response → exact canonical bytes persisted in actual PostgreSQL → fresh Chromium opens generated code and performs a concrete interactive action → page reload and separate fresh browser open same share via DB-backed route → no new provider calls on repeat. A second *different* user prompt should use the same engine with no bespoke template. Do not claim compiled multi-file React projects, server resources, persistent mutable game state, arbitrary package installs, or full production-grade F02/v2 without separately verified evidence.

**Truth boundary:** a single-file JavaScript staging prototype can be useful to test the concept in the actual APPf2 website, but does not yet guarantee arbitrary user prompts, automatic syntax correction, H4 build Sandbox, R2 or H3b persistent state. Mark these as future work rather than completed.


## 10. Quality contract for new ideas — prevent false PASS (2026-10-28)

**Problem demonstrated:** a code artifact can have valid JSON, SHA-256 and a clickable button yet fail fundamental user expectations. Published eighteen-dice evidence contained missing screens and incorrect domain scoring. Hash validation is *integrity only*, not functional correctness. An automated test that checks merely "some text changed" cannot claim that a game or any other application has passed. The prior success claim is invalid as a user-requirements acceptance result.

**Universal approach (no golden reference App):**

1. **Acceptance contract before coding.** Extract the exact user's mandatory behaviors, data/state transitions, constraints, mathematical/domain rules, observable outputs and UX navigation into a versioned, creator-visible requirement list. Retain original wording/provenance. For ambiguous domain rules, explicitly show the chosen rules or request a user decision; never silently invent as verified. No category-based templates.
2. **General code generation.** Feed this frozen contract plus the user prompt to a freely writing model, with an appropriate completion/context budget. Provider/model are explicitly versioned and reported. A successfully parsed program is only a *candidate*; report incomplete/truncated responses as failures.
3. **Independent implementation tests.** A separately produced test plan is derived from the *frozen acceptance contract*, not from the generated code or its model's self-test assertions. Run allowlisted browser actions and deterministic property/boundary cases in an isolated runner. Inspect actual UI states, results and console/runtime failures, and record evidence per mandatory criterion. Use fixed test seeds or injectable deterministic inputs for calculations and random gameplay; prohibit executing arbitrary AI-authored test code with credentials.
4. **Bounded repair (maximum two rounds).** On a failure, give the model the failing criterion, screenshots/DOM evidence, and error trace. Re-run the full independent suite after each repair. Require explicit consent and a displayed cost budget before any additional paid model calls. Keep the failed source as private draft evidence; never silently publish it as an ACTIVE/verified card.
5. **Truthful artifact lifecycle.** DRAFT → BUILDING → TESTING → (VERIFIED → creator-approved PUBLISHED) or FAILED/UNVERIFIED. File/manifest hash admission is a separate mandatory security gate, not equivalent to TESTING. Existing staging records that were auto-published without full functional evidence must remain clearly labelled UNVERIFIED or be quarantined until retested. Do not retroactively assert their quality.
6. **Novelty and subjective quality.** New ideas require no previous example App. The independent tests come from explicit behaviors and invariants; UI beauty, fun, completeness of unstated intentions, and disputed domain conventions cannot be established by automated tests alone. Show a human preview and make creator acceptance explicit; distinguish automated coverage and unresolved/subjective items in the card.

**Acceptance evidence contract (not yet deployed):** Store per-criterion {requirement_id, origin, expected_observable_outcome, actual_evidence_hash, test_result PASS/FAIL/UNTESTED, failure_reason}, test-run/toolchain version, executable artifact hash, provider/model version, cost/retry count and user acceptance. Prohibit the overall "product PASS" label if any mandatory criterion is FAIL/UNTESTED, even if CI passes for source integrity. A model self-review or manually created demo is not independent product evidence.

**Sprint 3.5 staged rollout:** First correct the generation request's feature coverage and output budget, fail closed on truncated completions, and stop calling untested code "verified." The actual isolated tester, independent requirements planner, repair loop and publication transition are separate engineering deliverables, each requiring real staging evidence before declaring the full architecture complete. No eighteen-dice-specific branch, selector or scoring function is allowed in the universal Builder itself.

## 11. Staging generic QA publication gate — implementation status (2026-10-28)

Build PR #419 now contains an experimental pre-publication gate in the real Code Builder route, using Cloudflare Browser Run, a source-independent requirement plan created before the program, browser UI/pure-case evidence and an opt-in, at-most-two paid repair budget. The Worker refuses to publish a new ACTIVE CodeArtifact if its independent QA is unavailable or incomplete. This is a staged implementation, not a claim of general production readiness.

Controls: the browser binding is limited to the isolated staging Worker. No model calls when that browser binding is not configured. User consent text explicitly authorizes two basic model requests (planning + coding), browser resource use, and a separate optional two-repair budget. All generated code runs in an opaque-origin sandbox and the Browser Run tester denies outgoing network requests.

Critical evidence distinction: a prior GitHub run has confirmed typecheck/lint/API tests and staging deployment of the gate, while cross-category live CREATE evidence is still pending. A single working eighteen-dice App does not prove the gate. The multi-category QA run must prove independently created, different prompt types; negative/malformed examples must never be publicly admitted.

Remaining obligations: QA report/plan hashes must be persisted and pinned to the exact artifact, manual approval/private preview for subjective or ambiguous requirements, safe asynchronous orchestration and bounded worker/browser execution cost, and configurable provider/model version. This implementation still uses staging gpt-4.1 and single-file sandboxed JavaScript, not automatic unlimited React/backend/multiplayer generation. A valid hash is only immutable integrity evidence, not a substitute for semantic acceptance.

## 12. Verified cross-category staging evidence (2026-10-28)

**Build PR #419, GitHub Actions run #40661201647: SUCCESS.** The universal Code Builder QA gate was exercised through the real staging HTTP API, Cloudflare Browser Run, PostgreSQL and two newly model-generated apps, without any genre-specific builder logic:

- Counter: independent source prompt, model acceptance plan, generated JS, browser test and public Blueprint v2. Share ID `f956f248-72e1-47ed-98c9-420c4c52de92`; real public UI increment/reset E2E, verified ACTIVE.
- Task notes: distinct source prompt, text entry, add item and completion-toggle E2E. Share ID `dbd5331f-667f-49e8-896b-aae380012b62`; real public UI test, verified ACTIVE. Two opt-in repair attempts are the maximum; do not infer the number actually spent without separate evidence.
- QA rejects imperfect outputs rather than publishing them as verified. The original eighteen-dice negative regression remains immutable; a verified fixed successor is separate.
- Requirements with `automatable=false` are not automatically published. The code now distinguishes QA_PLAN schema failure vs needs-human-review and returns sanitized failed-criterion evidence for browser QA.

**Scope/limitations:** this proves two unrelated functional categories in staging and publication gating, not statistical reliability over all novel ideas, full safety, production readiness, or coverage of subjective aesthetics/external integration. Future deliverables include persistent per-artifact plan and outcome evidence, a creator-private preview/explicit human approval path for subjective requirements, more UI action primitives, cost telemetry and a larger diverse regression corpus. Full-real-E2E for all future outputs is not implied by this run.


## 13. Observable-transition QA (no decorative or hidden-content PASS) — 2026-10-28

After two unrelated real public-creation successes (staging Run #40661201647), a model-independent quality regression revealed a generic false-positive class: assertions of expected text after a click could pass even if the words were already present before the click, or visible-text checks could be fooled by hidden DOM content.

Implemented in Build PR #419 (`57725a5`):
- A new independent `text_appears` assertion snapshots *visible* text before performing actions and requires that the expected text is absent before but visible after. It cannot be used without a user action.
- Existing `text_includes` in the Worker now checks visible `innerText`, not hidden `textContent`; the offline Chromium runner uses the same semantics.
- Model acceptance planning explicitly prefers observable transitions for add-item, score change and reveal-result requirements.
- A no-AI negative regression checks that a deliberately broken app showing "the expected result" statically is rejected, while a functioning state-changing app passes.
- Existing immutable public artifacts remain unchanged; previously verified counter and task-note cards are not silently replaced. New QA policy applies to newly created CodeArtifacts only.

This closes one concrete false-PASS mechanism, **not** every way a generative model can omit or simulate requirements. Statistical reliability across unknown ideas is still unmeasured; do not label every new generated app "fully verified" based on two categories. Persist a cryptographically linked QA plan+result receipt per immutable artifact, add explicit private human review for subjective/non-automatable requests, and expand functional regression across business logic, state persistence and multi-step navigation. Staging deployment and regression status must be reported separately from old governance/Human approval gates.


## 14. Sprint 3.5 五核心改造歷史提案（已由 §0 範圍取代）

2026-10-28 的多檔案、Agent、Sandbox、持續化、QA 方向已統一收斂於本檔 §0 及既有長期架構 §1–13；不要把過去不同階段的試驗規格、私人候選 Demo 或 Phase 2+ 資產功能當成目前 Sprint 3.5 的完成定義。

唯一交接識別：`SP35-FIVE-CORE-PRODUCT-CLOSEOUT`。真正的輪次、Blocker、執行證據只由 Build 計畫維護；Product Design 仍以本檔 H-001 與各 Fxx canonical Working owner 為準。
