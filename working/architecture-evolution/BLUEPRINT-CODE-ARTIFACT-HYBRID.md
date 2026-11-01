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

### 0.6 2026-11-01 真正 Browser QA「回復初始狀態」時序契約（Human 持續修 Sprint 3.5）

**已見到真實 5/6 FAIL 的驗收偽陰性風險。** 原新資料庫 App 的第六項要求「新增一筆→刪除→紀錄數：0」；瀏覽器初始本來就是「紀錄數：0」。現有免費 Chromium Runner 在每項 QA 開新頁後，以 `!initialBody.includes(expected) && finalBody.includes(expected)` 判斷 `text_appears`。這對「0→1→0」永遠 FAIL，即使功能正確。必須先改此通用測試語意，不能隨意扣一次 GPT-6 修理一個可能已正確的 App；但也不能僅放寬成「最終仍有 0 就 PASS」。

**獨立驗證契約：**每一 QA criterion 以新頁啟動，保存初始畫面、每一步操作後的已觀察穩定畫面及最終畫面，按原凍結 `steps` 順序真 click/fill。對 `text_appears(E)`：最終畫面包含 E；若初始畫面已有 E，則操作過程至少一次明確觀察到 **E 曾消失**，再重新出現，且畫面確實有可辨認的過渡狀態。只有初始/最終相同、沒有中間消失證據的無效果動作 **FAIL**。對初始沒有 E 的普通情形，必須最終可見 E；瀏覽器要等候合理的非同步 UI 更新，超時誠實 FAIL。原需求包含資料庫保留與 viewer 隔離時，**記憶體替身只算前端功能驗證**，另要真 PostgreSQL 的發布後跨重新整理/不同 viewer E2E，不能把 mock 判成全端 PASS。

**證據與歷史**：新的 QA Runner 必須用免費 Chromium 覆蓋 0→1→0 正例、完全無效果負例、異步操作正例、沒有 E 的負例。保留先前原 App 5/6 immutable receipt 不變，新的演算法只在新 Runner、重跑原相同版本及同一 frozen QA 得到真收據後才能改判。**沒有原 owner 私鑰不准以特權模式代簽或發佈原 Job**。成本沿用 US$1 整批上限，首選 0 新 AI 測試；SPEC 先於 Build，仍只 Design PR #45、Build PR #419。

### 0.7 2026-11-01 關閉整個瀏覽器後恢復身分／真資料與無重付（Sprint 3.5 延續）

**原五項需求第 3「速度／不因關頁失成果」與第 4「保存重用」不能只用同頁 reload 或單一 Playwright context 假充長期保存。** 必須對目前已發布、已通過公開權限的 Blueprint v2 App 做真 Staging 網站 E2E：乾淨的 persistent Chromium profile A 啟動、開公開 App、經沙盒中的 `appf2Records` → signed Worker → 真 PostgreSQL 新增資料、記錄 record_id 與 creator 身分；**完全關閉 Chromium 進程**，同一 profile 重啟後以原有不可匯出 P-256 key 繼續讀取同筆資料、可 UPDATE，第二次完全關閉再啟動後仍能讀到更新值、可 DELETE。另用獨立乾淨 profile B 斷言不可 list/read A 私人資料，B 新增的資料也不能出現在 A。最後清理測試列；沒有 PG 端真讀寫或身分持久化，必須 FAIL。

**費用與證據**：驗證只能操作既有已公開 App／免費瀏覽器、不得重新生成 App、呼叫付費模型、觸發 paid workflow、Cloudflare Containers 或繞過 signed owner 權限。明確計量：A/B browser profiles、cold reopen 2 次、CRUD 與拒絕跨 viewer、全程新模型 POST 0，真 GitHub run/commit/PG 行為 logs。這是**平台既有公開 App 資料橋的恢復 E2E**，不是 AI 編寫完整資料庫 App 的九次新生成 PASS；獨立公布「真關 Chrome 持久化 PASS」與「新 GPT-6 全閉環 NOT_VERIFIED」。任何密鑰永不 log、不得把私鑰外傳或以管理員代簽。

保留 [Build SSOT](https://github.com/NFF98/appf2-build/blob/product/sprint-3.5-complex-intent-recovery-20261026/docs/sprint-3.5/SP35-FIVE-CORE-PRODUCT-CLOSEOUT.md) 原主檔、僅 #419，測試免費且全批 US$1 硬上限不變；如失敗集中修復共用持久身份/橋接原始碼，禁止藉此報 5/5 或 9/9。

### 0.8 Human 突破：2026-11-01 第 1 個完整「真人網站輸入→全新 GPT-6 App→QA→分享」E2E

優先以**原生網站輸入**而不是直接打 Agent API 驗收第一個完整新 App：真 Chromium 在 Staging 首頁使用新版 Agent textarea 輸入「計數工具：起始0、按一次+1、連按兩次到2、重新歸零」，以原需求先凍結 QA，再在網站勾選各項 Human 已授權的模型／免費 Docker／Chromium QA（以及自動修復限額）並按一鍵主 CTA。由同一個**原 owner 瀏覽器產生並保存新 P-256 Job**、真正 GPT-6.1 Sol 生成 source、免費 network-denied Docker 編譯、獨立 Chromium QA 全 PASS、私人可操作預覽；回到網站經原 owner 明確勾選公開授權才發布，另起乾淨 Chromium context 讀公開 App 並實際按鈕，reload 後再操作。量測真網站 Job 建立至首次交互、QA、分享/訪客可操作時間。

**PASS 的唯一計數規則**：只有全程完成，才可稱 `new_generated_complete_site_e2e=1/9`（simple tool）；只生成程式、使用舊卡片、測試器綠燈或純後端 Job 不算。公開與異瀏覽器使用不能用畫面相似度冒充，須真 UI 操作。失敗保留原 Job/source/QA/模型收據、無假 PASS。

**費用安全**：全批 Human 授權 **US$1.00**；先前兩筆模型 CODE 20c+20c 各已 journal SUCCEEDED，仍非實際發票。**新 Job 授權最多44c**，所以在模型 call 上限層最保守 40+44=84c<100c；只有確認沒有新增第三個已佔成本 call、且此單次 Job 原子記帳、GitHub 精確一次觸發與 Staging readiness PASS 才可開出這筆。不能自動重送已收費 CODE；修復須守原 Job 44c 累積上限；不可藉「繼續」超過 US$1 或無故改模型。這是 9 次中的第 1 次，不表示剩下 8 次已可在相同成本完成；後續需要再證明可擴充的低成本方案。

維持 Design PR #45 原 H-001、Build PR #419 原 SSOT；**本節必須先提交 SPEC，才實作與驗收 Build**。不合併、不 Production、不 Sprint 4。

### 0.9 2026-11-01 生成 UI 跨子節點可見文字 QA 不得偽陰性（真 GPT-6 Job 見 0.8）

真 GPT-6 一鍵網站生成的計數工具，歷史模型源碼 `<div class="count"><span class="count-label">計數：</span><span class="count-value">0</span></div>` 把視覺上連續的「計數：0」拆成兩段 DOM；現有 Browser QA 只用 `document.body.innerText.includes("計數：0")`，因 flex/grid 換行而把原需求 initial, increment, twice, reset 全錯判 `ASSERTION_FAILED`，讓 UI 進入一次額外付費修復。**不能因此削弱凍結測試或假裝 QA 已 PASS。**

修正規格：Browser QA 對 `text_includes`、`text_appears` 使用 (a) 真正可見的 body.innerText 原判定，或 (b) 可見 DOM **同一最小界面組件** 的 textContent 經有限空白 normalization 後 **整段等於**預期文字，並確保組件在 viewport layout、有尺寸且不在 `hidden`、`aria-hidden=true`、`display:none` 或 `visibility:hidden` 祖先裡。不得把 body 全文任意刪空白拼接兩個不同功能區文字湊 PASS。保留操作前、每一步後、最終值的 DOM 可見證據與哈希，`text_appears` 初始存在時仍必須見中間真正消失才能 PASS（0→1→0）；沒有作用的按鈕不可 PASS。對一般單一文字顯示和非同步顯示，原獨立 Chromium 行為不變。

提供免費真 Chromium 正反回歸：flex span 計數 0→1→2→0 應 PASS，兩個相距不同組件拼湊字串 FAIL、hidden 文字 FAIL、按鈕不變 FAIL、異步更新 PASS。已保存的原 5 項第一次 FAIL 收據不可覆寫，需合法 original owner/Job 再跑真免費 QA 才能改判；修復模型若已合法送出不因編碼改動而二次扣款。成本仍 Human 全批 US$1（20+20歷史+新44=84c最大準入）、不擴權、不另外新付費 Job。

### 0.10 2026-11-01 Human 最新「real product percentage, 突破；需 credit 告知再繼續」：第 2 個真網站 App E2E 規格

**實際產品完成百分比以真網站端新生成完整 PASS 的 9 個 Job 當分母；截至上一筆確認 1/9（11.1%），目標本輪真資料庫 App 2/9（22.2%），剩 7。** Foundation/Runner 10/10、舊 App 重開或 API-only 工作不可冒充第二次新生成。每個新 Job 要從 Staging 真 Chromium 網站原生 Agent textarea 進站並凍結原 QA，網站勾選模型與自修同意、同一 owner P-256 Job，GPT-6.1 Sol 真 code，免費 Docker + Chromium frozen QA 全 PASS，私人 preview，建立者在網站勾選分享，乾淨第二 Chrome 真實操作公開 App 並重開。不得以人工注入 CRUD、模板程式或測試 harness 操作 App 冒充 model-authored UI。

**第二種 App 是 AI 自己寫的 viewer-private PostgreSQL「客戶備忘錄」**。網站自然語言 prompt 包含固定可驗按鈕標籤 `新增紀錄` `修改紀錄` `刪除紀錄`，以及內容文字「咖啡」「茶」、計數 0→1→0；AI 使用已經存在的 `window.appf2Records` Bridge (list/create/read/update/delete) 真接已發布網站的 Worker/PG，無 fetch/localStorage/偽資料。Frozen QA 六項：標題、初始 0、新增 1、讀咖啡、新增後改成茶、新增後刪除歸零，**每項獨立新頁，0→1→0 必須真正觀察中間狀態**。免費 Docker 的 memory bridge 只做 UI behavior QA；發布後另一真 browser context 才是 PostgreSQL RLS：A 真新增→reload 後保存→修改→reload 更新仍在，B 不可 list/read A 私有資料且反向隔離，A 刪除後持久消失，這些必須由**AI 自己生成的可見 UI**完成、而非 console 直呼 `appf2Records`。另以簽章 Worker/PG 真實往返收據，不將 mock QA 當真正 PG E2E。

**授權及成本**：使用者最新明確說「if need more credit let me know and go」，已先通知此次最低新增預算 **US$0.28**，把此小批保守整批 cap 從 **US$1.00 提到 US$1.28**（前兩個歷史 Job ceiling 40c + 第一網站 Job ceiling 44c + 第二新網站 Job ceiling 44c = **128c**）。只核准這一個全新 Job，不核准所有其餘七個自動付費；單 Job cap=44c，其中 CODE 20c、REPAIR 16c 且 frozen QA 8c reservation，provider actual invoice 仍未取得不能假寫。Runner 觸發前原子 ledger 必須確認目前真模型 journal 本時段最多 4 calls/76c max，各舊 Job cap 已關閉、0 未決；如果多筆或未知費用停用觸發。新版模型生成時不得不經同意擴額、換模型、重送同一付費 CODE；瀏覽器失敗照實保留 Job。未完成 2/9 就維持 1/9，費用上限不可當完成證據。

**效能**：本次紀錄瀏覽器點擊開始、原 Job 建立、首次 source 保存、第一次 UI 可操作的 QA preview、final share and guest interaction 的真時間；與首筆 13m26s 對比，不宣稱提前性能 PASS；重開無新 AI。最新結果附原 Build SSOT 的既有章節，單 PR #419/Design #45、Staging only、無 Production/新 Sprint。



### 0.11 2026-11-01 第 2 個「AI-authored 真 PostgreSQL App」完整網站驗收結算：**2/9 = 22.2%**

**本節是 §0.10 凍結驗收規格的結果，不放寬原先 Gate；所有以前 §0.8–§0.10 之 1/9 數字為歷史快照。** 第二個新網站自然語言 Job `a2689c78-5362-43a2-8f7c-a4cfd8b6affb` 經 GPT-6.1 Sol 生成四檔多模組 App（`src/main.ts`、`src/store.ts`、`src/view.ts`、`src/style.css`），原需求 frozen QA 六條由免費 Docker/Chromium [#41307455393](https://github.com/NFF98/appf2-build/actions/runs/41307455393) **6/6 PASS**；已經建立者在原網站發布為 ACTIVE、`public_opt_in=true` 的 [公開 Blueprint v2 客戶備忘錄](https://appf2-sp35-417-staging.juiyuang69.workers.dev/code/e29027dd-cd71-4424-a182-3fb7706614b8)。首次 [#41306946235](https://github.com/NFF98/appf2-build/actions/runs/41306946235) 為 **FAIL**（`G2_REAL_SIGNED_PG_WORKER_REQUESTS_NOT_VERIFIED`），不得抹去。

**零付費重驗證：** 原 Build PR #419 `deploy/scripts/sp35-g2-published-db-free-browser-e2e.mjs` 直接啟動兩個獨立 Chromium context，以原 AI 自寫 iframe UI 可見按鈕新增／修改／刪除，真網站 `POST /api/v1/code-apps/e29027dd-cd71-4424-a182-3fb7706614b8/records`，由 Playwright 監看實際 response HTTP 2xx；沒有 `appf2Records` iframe evaluate/injection、沒有假 PG bridge、沒有新 GPT 模型呼叫。A：`list/create/read/update/delete` 共 14 HTTP requests，B：`list/create/read/delete` 共 6 HTTP requests；兩人從乾淨獨立 context 各自 0 筆開始，A 建立「咖啡」後刷新保留、A 改「茶」後刷新保留、B 無法看到 A 內容，兩人刪除後各自刷新為 0。 [免費 Workflow #41307944305](https://github.com/NFF98/appf2-build/actions/runs/41307944305) 的 `g2-free-published-original-browser-retest` **SUCCESS**，Job 原始 log 有完整 `SP35 G2 STRICT PG HTTP RECEIPT`；獨立 frozen QA 與發布後真 Worker/PG 不混算。

**只承認真產品 2/9，非通用產品 100%。** 已確認「計數器工具」與「PostgreSQL 客戶備忘錄」兩個不同新 Job 的完整網站交付，剩餘 7 個不同新需求，仍需按 §0.5 嚴格 3 類×3 次補足；至少互動遊戲類、不同工具/DB 類新樣本和原始需求自修可靠性、首次可操作時間／P50/P95 未全面 PASS。重驗為 Chromium `reload`，不可冒充「關閉 Chromium 進程再重開同一原建立者持久 Job」的額外要求；先前 §0.7 獨立 cold-reopen 工程證據仍單獨存在。

**費用界線**：本第二樣本只有原已核准 CODE，不重新付費生成；本次 free retest 額外模型 POST=0。**本批指定四個 Job**（兩筆 20c 歷史 + 第一次新網站 44c + 第二次新網站 44c）以各自授權額加總為 `US$1.28`，不是整個 2026-11-01 所有 Job 的總費用。**Supabase 唯讀事後交叉核實**：2026-11-01 UTC 全日 PostgreSQL `appf2_agent_model_call` 共 **7 個不同 Job、10 筆 SUCCEEDED 模型呼叫、逐筆 `max_charge_cents` 合計 188c**；其中**本批四 Job**分別為 20c + 20c + 36c(CODE+REPAIR) + 20c(CODE)，即 **96c 實際已執行呼叫的單次風險上限**，另三個較早 Job 是 20c + 36c + 36c = **92c**。`US$1.28` 是指定四 Job 的**工作授權 ceiling**而非真實 provider billing；`US$1.88` 是**全日模型呼叫逐筆 ceiling**亦非實扣。provider actual `NOT_VERIFIED`，更不能將這兩種 ceiling 相減當作可支用餘額。**額外風險**：整庫另有 2026-10-31 UTC 起 2 筆 `IN_FLIGHT` + 2 筆 `BLOCKED_UNCERTAIN` 的歷史 QA model calls，每筆 8c ceiling，合計 **32c 未結清最大風險**，不可視為已確定扣款或直接歸零。由於沒有核實供應商實扣與跨 Job 原子費用 fence，下一筆 paid generation 必須保持 `PAUSED_BUDGET`；可繼續免費 E2E、程式品質及前置成本診斷，但不盲 POST。剩下 7 個新模型 Job 未得到本節自動授權，必須逐次確認可用額度與成本控制，避免重複收費。Build 結果與下一個阻斷只寫回原 `SP35-FIVE-CORE-PRODUCT-CLOSEOUT.md`。兩 PR 均不合併，Staging only，禁止 Production 與 Sprint 4。


### 0.12 2026-11-01 第三個獨立自然語言作品：雙人井字棋（互動遊戲 G3）— SPEC FIRST，**未執行模型、不得預報 3/9**


**同日 Human 新授權補充（SPEC first）：**使用者明確回覆「同意繼續，可以多一點不要停！」，承接前一則已明列第三款新 Job 的 **US$0.44（44 cents）單次上限**，只批准此第三款雙人井字棋新 Job **一次**。允許付費推進 G3 真 E2E，先行 read-only Supabase journal reconciliation；所有付費模型呼叫必須沿用原網站 P-256 creator consent、單 Job ≤44c atomic admission，不能視為對其他六款或超出 44c 的無上限授權；非確認 provider invoice 仍標 NOT_VERIFIED，其他歷史未決 model calls 保留不再發送。若 QA FAIL 保留同 Job/程式和進度，優先在原核准額度內修復，不得生成第二個付費 Job 或重跑已付過費的階段。

**嚴格分母延續 §0.5/§0.10/§0.11：**目前兩筆真新網站獨立 E2E 已確認 2/9 = 22.2%，第三筆必須從 Staging **新版 Agent textarea** 首次輸入一個新的互動遊戲需求，原 Chrome creator signed P-256 新 Job，真 GPT-6.1 Sol 多檔自由生成、原需求凍結 QA 由免費隔離 Docker/獨立 Chromium 逐項 PASS、私人預覽、另一次明確 owner 分享、陌生 Chrome 在原 AI UI 真操作與 reload；所有步驟後才能列第 3 個。不得將 2026-10-28 舊十八啦公開卡、工程 fixture、第二個資料庫 App 重開或手寫棋盤充數。

**第三樣本原需求測試契約（不寫遊戲專用 runtime 引擎）：**「雙人井字棋」九格按鈕固定可存取名稱 `第1格`～`第9格`、玩家輪流 X/O、每個落子後有清楚的可見文字例如 `第1格：X`、`第5格：O`、文字 `輪到：X`/`輪到：O`、三個 X 同列宣告 `勝者：X`、已填格禁止覆寫、獲勝後不可再落子、`重新開始` 歸零。前端需至少三個相互匯入的 `src/` TS 模組，受控無外網環境，非對應九宮格模板引擎。模型輸出必須真正符合需求，絕不修改 QA 讓其過關。

**凍結至少七條互動 QA**（原 prompt 必須逐條包含對應 source quote，不能 QA 看過模型後再變更）：標題；首次 `輪到：X`；點 `第1格` 顯示 `第1格：X`；點一次 `第1格` 顯示 `輪到：O`；依序點 `第1格`、`第5格` 顯示 `第5格：O`；依序 X1/O5/X2/O8/X3 顯示 `勝者：X`；點 `第1格` → `重新開始` 回到 `輪到：X`（須有真正  X→O→X 可見中間時序）。另於**已發布原 AI UI** 用陌生 Chrome 實際執行至少一次 X1/O5/X2/O8/X3 → X 勝、獲勝後無法改棋盤、reload 重置/保留依原需求、按重新開始後新回合可操作。不得在 iframe 注入 play 函式／手動移動狀態，嚴禁只看 QA 7/7 就計數。

**預付成本安全與先完成免費準備：**已確認 Supabase ledger 在 2026-11-01 UTC 全日 **10 筆 SUCCEEDED model calls，逐筆 ceiling 共 188c（非實際 bill）**，另四筆 2026-10-31 起未結清 `IN_FLIGHT` ×2、`BLOCKED_UNCERTAIN` ×2（各8c）。先完成免費驗收程式 syntax、原 prompt QA 計畫完整性、真 Staging readiness GET、既有公開 App 零付費回歸，保留同 PR 新樣本腳本為 **PREPARED / NOT_RUN**。第三筆新 Job 原上限如繼續 `44c`（CODE 20c，REPAIR 16c，QA 虛擬 reservation 8c），**不得**因 Human 籠統要求持續突破而將先前四 Job `US$1.28` 限額或 `188c` 全日 ceiling 誤讀成有新增餘額。必須核實歷史未決呼叫、當前可用額度和模型前原子 budget admission，另取得本筆最高額度批准及原 browser owner P-256 paid/public-sharing 明確同意；沒有證據維持 `PAUSED_BUDGET`，不能靠偷偷換模型、提高 cap、重新生成同一個已付費 Job。結論只能是 2/9，直到單獨新 Job 全部真 PASS。

**工程執行限制：**只改 Design PR #45、Build PR #419；本 SPEC commit 先於 Build script；同一 Sprint 3.5，禁止 Sprint 4、Production、merge；不允許推送另一筆模型消費用的 commit marker 以製造假進度。真成本／Job／run／分享 hash 確定之後，才在原 Build SSOT 追加第 3 個 outcome。

**G3 2026-11-01 付費唯一一次完整證據與失敗處置（SPEC 修正先行）**：Build Run [#41311674915](https://github.com/NFF98/appf2-build/actions/runs/41311674915) 最終 FAIL，**僅正式分享階段**：獨立 Job `31d6a1f4-df41-4c41-8f92-5800a937c7c7` 一次 GPT-6.1 CODE [#41311851870](https://github.com/NFF98/appf2-build/actions/runs/41311851870) SUCCEEDED（CODE ceiling 20c；provider invoice NOT_VERIFIED）；建立 6 檔 TypeScript/CSS 新井字棋，QA 凍結 7/7；免費 Docker/Chromium [#41312106622](https://github.com/NFF98/appf2-build/actions/runs/41312106622) SUCCESS，DB 7/7 evidence_hash，原私人 preview 已保存。最後建立者於原生 Chrome 按正式發布，但 `開啟／分享已發布 App` 連結等待 45 秒逾時，**未建立 public app、未執行陌生人 E2E，不得算 3/9**。Publish API HTTP status／錯誤碼未被該次 Playwright 捕獲，**根因尚未確認**；不可把 CI 7/7 宣稱完整產品 PASS，不可假設模型生成失敗或擅自再次付費。原非抽取式 P-256 owner 只存在 ephemeral GitHub Runner browser，不得以 SQL 改 owner、冒用簽章、發布內部 source、或重試同一模型以偽裝「修復」。

**所有未來 G3/G4 website proof 必須落實**：在按正式分享前捕獲該原生 Chrome 的網路 POST `/publish-code-app` 回應 status／無秘密的錯誤碼、可見 UI error；點擊時另驗證 button enabled 與原 QA receipt 完整 hash；分享必須明確 await `ACTIVE` 後才離開原 owner Chromium。若發生暫時性 5xx，最多一次**原有 owner context、原 project、相同 idempotency** 重新點發布（無新模型、無新 Job），且須保留第一回合 HTTP 診斷；401/403/409/4xx 或不確定 DB 發布結果 FAIL_CLOSED，不能復原／偽造 P-256；**離開 browser／遺失原 owner key 後禁止再拿別人身分補發**。執行新一件獨立創意需求仍應用同一通用 Code Builder，不建「井字棋專用引擎」。不增加 Production，僅 PR #45/#419，仍 Sprint 3.5。


### 0.14 2026-11-01 HTTP 413 真根因與免費自動回歸（Design/SPEC first）

原 native creator website G4 `7045a009-6bfc-4889-8f1b-df03ba93c406` 原生發布回應已完整錄到 **HTTP 413 `AGENT_JOB_TOO_LARGE`**，見原 website Run [#41313398452](https://github.com/NFF98/appf2-build/actions/runs/41313398452)。兩個不同 GPT-6 原創遊戲已通過各自 7/7 frozen Chromium QA，但 **沒有任何新公開卡片／新訪客 E2E**，產品分數仍 **2/9**。GitHub Build 目前 `src/edge/agent-jobs.ts` 對 `/api/v1/agent-jobs/:id/publish-code-app` 使用一般端點 **1,400 raw request bytes**，雖然 `validPublishOwnerAppBody` 允許 UTF-8 中文原始 prompt 最長 800 chars，加上 owner UUID、project hash、title JSON，合法授權分享自然超過 1,400 bytes。這是 route ingress size gate 的確定原因，不是 AI/model 或 frozen QA 失敗。

**最小修復規格**：僅 `FREE_SHARE_ITEM` （完整精確路徑）POST 的 raw `Content-Length` 與 `arrayBuffer` 統一使用 **4,096 bytes**（足夠 800 字中文 + JSON 欄位），原通用 1,400、QA 24,000、free import 200,000 bytes 不變；不可擴大任意 Agent 路由。仍強制 exact request fields、original owner nonextractable P-256 signature、idempotency、same Origin、canonical frozen QA 7/7、preview/source hash、creator public share consent 和 DB ACTIVE。4,097 bytes 必須仍 413；3,000-byte 合法中文 payload 應先通過 size gate，之後沒有有效 P-256 時 404 而非 413，不能由測試跳過驗證建立 public share。禁止 SQL/管理者偽造 owner 補發已過期的 G3/G4，原 AI models 絕不重送。

**完成門檻**：新 API size-boundary 正／負測試，CI types/lint/route tests SUCCESS；原 Sprint 3.5 staging（**never production**）完成部署，GET health/readiness 正常；免費網路測試以長中文 publish payload、錯簽章精準證明 staging 不是 413 且不是 2xx/DB 副作用，4,097 bytes 原則上仍拒絕；以前的 7/7 QA 不能當作 3/9。由下一個 human-authorized **全新** signed-owner website GPT-6 Job → fresh source → frozen QA → 200 ACTIVE sharing → independent new visitor full click/reload **全鏈** 成功才 +1。Work 可繼續監督 CI 與故障修復、在同一個 PR/#45 SPEC，最多兩輪修復和一次一個收費 Job；不得允許沒有預算的新模型呼叫、無限自動重試或虛報 9/9。GitHub Actions 可自主執行**免費** gates，但 Work 不是永久常駐背景 daemon。

### 0.13 2026-11-01 第三個 PASS 仍缺：**不同創意「雙人拿石頭」** 第二候選，僅一次新 Job

原 G3 井字棋 GPT-6 工程工作已經通過 Docker/Chromium 7/7，但原 Browser owner 正式分享沒有成功，已結束的 GitHub ephemeral browser P-256 私鑰不可復原，故原 Job `31d6a1f4-...` **NOT_PUBLISHED / NOT_COUNTED**，保留只讀模型日誌及私有 source，禁止再次付費生成相同遊戲。Human 對費用明確回覆「可以多一點不要停」，此處將額外預留**另一件不同自然語言需求、單個獨立 Job ≤44c**，不延伸為無限筆授權；即 G3+新候選最多 **88c cumulative Job ceiling**（不是 invoice），其他歷史 model calls/未決風險另行計列。

第二個候選原始自然語言：「請幫我做一個全新可操作的『雙人拿石頭』遊戲，從 9 顆開始，甲乙交替，每回合只能選『拿1顆』或『拿2顆』，不得拿超出剩餘數，拿到最後一顆的玩家獲勝。畫面顯示『雙人拿石頭』、初始『剩餘：9』『輪到：甲』；按『拿1顆』後顯示『剩餘：8』及『輪到：乙』；依序拿 1、2、2、2、1、1 顆後顯示『勝者：乙』；按『拿1顆』再按『重新開始』需顯示『剩餘：9』。獲勝後任何拿取按鈕不得再改變畫面，重新開始後能重新玩。使用至少三個彼此 import 的 src/ TypeScript 模組與 CSS，禁止 mock、固定勝利、外網與模板。」這是**不同**的遊戲邏輯和原始需求，不是重生成井字棋。

凍結 7 項 source-quote 原驗收：（1）標題；（2）初始剩餘9；（3）初始甲；（4）按拿1顆剩餘8；（5）按拿1顆輪到乙；（6）1/2/2/2/1/1 → 乙勝；（7）拿1顆→重新開始→剩餘9。真新創作者 Chrome 需完整一次簽名 Job → GPT-6 自寫多檔 → network-denied Docker + 7/7 原始 QA → 原 creator 明確授權分享 API 有**可見 200/ACTIVE** → 陌生瀏覽器執行甲乙輪替/乙勝/禁再拿/重開/reload；少任一步保持 2/9，不拿舊井字棋充數。

正式分享失敗時，必須在關閉 creator browser 之前記錄 HTTP status、可安全曝光的錯誤 code 及 UI 可見 error；5xx 才可在相同 owner/key、相同 idempotency 下免費重試一次，4xx/未知保存證據停止，沒有第二筆同樣模型 POST。只做 Design PR #45 / Build PR #419，禁止 merge、Production、Sprint 4。


### 0.15 Work 接管後下一個獨立候選：餐費分攤工具（PREPARED / PAUSED_BUDGET）

2026-11-01：免費 Staging #41316476210 最終 SUCCESS；同程式修正後最新 Foundation #41316637632 SUCCESS，原 #41316476230 為 cancelled，不改報 PASS。舊骰子負面稽核仍有已知規則/頁面失敗，屬保留的負面證據；不表示九個新產品完成。真產品仍 2/9。

下一候選必須是**全新餐費分攤工具**，不可重生已付費井字棋/拿石頭。輸入餐費、用餐人數、服務費百分比，按「計算」顯示總額與每人金額；1000/4/10 → 總額1100.00、每人275.00；600/3/0 → 每人200.00；人數0顯示錯誤且不可產生 Infinity；重設清空結果。至少三個互相 import 的 src TypeScript 模組與 CSS。模型生成前凍結七項原需求 QA：標題、1000/4/10 的總額、同案例每人金額、600/3/0、零人拒絕、重設、重設後重新計算。陌生 browser 必須完成相同實際輸入/點擊、錯誤/重設、重新整理後再算；0 guest AI/Job POST，公開 ACTIVE 與 immutable hash仍必須核對。

本候選原為PREPARED/PAUSED_BUDGET；**2026-11-02 日本時間，Human回覆「批准繼續做完全部」，明確承接上一則單一新Job最高US$0.44請求，准許本G5餐費分攤Job執行一次**。本次以44¢硬上限執行，不自動放大成無上限費用；舊未決32¢另列且不可重送。先完成免費 script syntax/plan/source-quote 檢查並保存。請求未來額度僅單一新 Job 44¢（CODE 20/REPAIR 16/QA 8保留上限），不可與已消耗的 G3/G4 88¢批准混用；最多兩輪集中修復且不得超出單 Job cap。2026-11-01 UTC ledger：12筆 SUCCEEDED ceiling共228¢；10/31四筆未決共32¢，供應商實扣 NOT_VERIFIED，均不可重送。必須取得此筆明確批准後才允許原生 creator P-256 paid consent；不自動跑批次、不合併、不 Production，仍原 PR #419/#45。


### 0.16 G5 建立入口 UTF-8 上限：第一輪集中修復（2026-11-02 JST，SPEC FIRST）

G5餐費原需求含585+個中文字與原生數字欄位說明，低於既有800-character合法上限，但 CREATE JSON raw bytes超過1400。原#41326123312網站流程未產生新Job，PG model journal仍只有原12筆，無新付費呼叫。靜態根因：`src/edge/agent-jobs.ts` 的 `url.pathname===CREATE` 仍落入通用1400，而先前§0.14只修了publish route。**不能靠縮短/刪除原需求和QA或重付模型偽造修復**。原workflow尚未結束時不重開paid workflow；其原creator沒有成功Job，不需或允許SQL代簽補造。

只將精確 `POST /api/v1/agent-jobs` 的Content-Length與實讀raw bytes上限設為4096，與精確publish一致；合法prompt800 chars、原anonymous_id、explicit_ai_consent、max_cost_cents schema仍不變，原owner P-256、same-Origin、nonce/idempotency和DB admission全部保留。其餘Agent端點1400、QA24000、import200000不變。4097必須413；1401..4096錯PoP必須404、不寫Job/不呼叫模型。免費unit及原Staging先部署前後讀取邊界，確認修復與health/readiness正常，才接續原已批准的單一44¢G5新Job。只有成功建立一次Job之後可調模型，未知paid結果不得重送；兩輪集中修復限制不變。先保留舊run真結果，不算產品分數，仍2/9。


### 0.17 Human「批准繼續做完全部」之有限執行封頂（2026-11-02 JST）

Human最新指令為「批准繼續做完全部」。執行延續原目標2/9→9/9，採已報單價**每個新Job最多44¢**，保守封頂為**剩餘7個新Job累計最多308¢（US$3.08）**；一次只建1個Job，不並行模型、不無限補新Job、不把錯誤重生作已成功作品。G5尚未成功建立Job且model POST0之空等待不占付費Job名額。任何已建立並有付費呼叫的失敗Job保留且占名額，不在308¢之外偷偷再開第8個Job。原10/31未決32¢另列，不清零、不重送；供應商invoice未知，不以ceiling冒充實扣。每筆新模型前只讀核帳，原子單Job44¢仍強制；已開始Job與封頂保留額逐筆記錄在原Build固定closeout，不重問已授權的這7件。

每件先凍結自然需求與7項獨立QA，原生網站P-256同意→真GPT-6來源→免費Docker/獨立Chrome→原owner ACTIVE公開→**全新Chromium process**操作/reload/reuse；後續6件依原3工具/3遊戲/3真PG資料App總分母補足：G5餐費工具後，再1工具、3互動遊戲、2真PG CRUD App。各Job至多兩輪集中修復，未知費用不重送；費用/名額不足則保留來源、分析換策略，超308¢必須再獲明確批准。只原#419/#45，無Production/merge/Sprint4。


### 0.18 完整800字需求的全鏈入口審核：第二輪／最後集中修復（2026-11-02 JST）

第一輪精確CREATE修復已真Staging #41326481475全SUCCESS，部署前1950 bytes錯PoP為413，部署後404。原生G5新Job `b439ed54-4a9a-4f2d-8a32-14c06df42d53` 已保存44¢ budget和原始7條QA，revision0；model_call與model_runner_request皆0。下一步 `free-ai-stage` 同樣攜帶完整original_prompt但仍落入1400，導致編碼根本未派發。保留此原Job/QA，不能說模型失敗或重新收費。

**完整精確路由清單**：CREATE、publish-code-app、free-ai-stage、free-ai-repair-evidence、qa-generate均合法接收最長800 chars原需求；這些精確POST路由 raw Content-Length/arrayBuffer統一4096。已是24000的qa-plan/qa-review/qa-run/qa-repair不變；200000 import/repair不變；其餘不攜帶原文的Agent路由仍1400。不能靠任意前綴、任意URL或提高全域限制解決。每條長中文錯PoP必須404、4097必須413，從不產生Job/model/DB副作用；一般agent-progress>1400仍413。免費Staging逐條查證後才走真模型，原owner、PoP、same-Origin、已凍結QA、hash、budget、idempotency完全保留。

**正式發布HTTP語意審核**：現有精確owner `publish-code-app` 成功本來回 **201 Created**，不是200；成功定義為200/201中的合約成功碼、可讀新分享連結、DB真ACTIVE/public_opt_in和相同immutable hash、另一個全新Chromium真操作。不能把201正確建立誤報失敗、不能把只收到2xx當完成。既有G5測試只認200是驗收腳本缺陷，修為接受200/201並留實際status與PG證據；模型品質/7條QA完全不變。免費測試須包含201接受/413拒絕的狀態判斷。

最後集中修復後若仍有新阻斷，保留原Job/source/evidence，先根因分析與換執行策略，不盲目第三輪。沒有模型journal的拒絕不得算付費嘗試或重送已收費模型；原ephemeral owner若失效不可偽造復原，原空Job保留並明確記錄無生成。接續的唯一成功paid G5仍受原44¢和七Job308¢總額控制。



**同輪免費環境語意澄清**：Staging為FREE_ONLY，舊私有付費 `qa-generate` 在容量檢查之前已被完整停用，任意大小都必須均勻404。它不屬於可執行的免費路由；模型前QA仍走已凍結plan或受控free-ai-stage。Live負面測試應驗證該停用路由對普通/超大body都404，不能為通過容量測試而開啟它或改安全拒絕順序。啟用環境的4096/4097單元測試仍保留。第二輪程式修正不變，只精確對齊FREE_ONLY測試判斷；不得把停用功能冒報PASS。

### 0.19 剩餘六個獨立新需求與驗收凍結（免費準備；不自動付費）

延續§0.17七Job308¢上限與原3工具/3遊戲/3PostgreSQL類別計畫。先完成G5全鏈，後續一次只選以下**一個**未開始的需求；先只讀核帳和已有Job/paid journal，不重送已開始/未知收費的樣本。測試腳本依以下原需求操作，從不向App注入遊戲/CRUD實作，不按類別建生成引擎。每個新模型Job仍44¢；QA與訪客流程全部實際通過+PG真ACTIVE/hash才能加分。DB類另要求模型自己寫的UI在真PostgreSQL CRUD、刷新保留、第三個乾淨瀏覽器無資料洩漏；不能用memory橋的QA7/7代替。

| Sample | 自然需求 | 類別 | 凍結QA |
|---|---|---|---|
| g6-length | 長度換算器 | tool | 7 |
| g7-memory | 水果記憶配對 | game | 7 |
| g8-lights | 四燈切換謎題 | game | 7 |
| g9-connect | 四乘四連線棋 | game | 7 |
| g10-books | 閱讀書單 | postgres | 7 |
| g11-water | 每日喝水紀錄 | postgres | 7 |

以下JSON為**模型開始前**凍結的完整原文、七項source quote、操作與預期（guest operations為已發布原App的額外嚴格驗收，不是向模型提供程式模板）。即便模型不符合也不得事後換QA；失敗保留/至多兩輪集中修復後分析換策略。每次從此清單選定一件並在原Build closeout紀錄原Job/Run/費用/結果，不為跑齊分母重生付過費的同一App。

```json
[
  {
    "id": "g6-length",
    "title": "長度換算器",
    "category": "tool",
    "original_prompt": "製作「長度換算器」。標題顯示「長度換算器」。提供原生number數字欄位「公尺」和按鈕「換算」「清除」。輸入1公尺後換算顯示「公分：100.00」。輸入1公尺後換算顯示「毫米：1000.00」。輸入2.5公尺後換算顯示「公分：250.00」。輸入0公尺後換算顯示「公分：0.00」。輸入負1公尺後換算顯示「輸入不可為負數」，清掉舊成功結果。先換算1公尺再按清除顯示「尚未換算」，輸入框清空。未計算時也顯示「尚未換算」。換算公式公分=公尺乘100、毫米=公尺乘1000，均顯示兩位小數，連續改數字或重整後仍可計算。請由AI自由撰寫至少三個互相import的src/ TypeScript模組及CSS，不得用模板、mock、固定成功畫面、外部網路、外部套件或localStorage。按鈕與文字依以下名稱，手機也可完整操作。",
    "criteria": [
      {
        "id": "title",
        "source_quote": "標題顯示「長度換算器」",
        "description": "原需求獨立驗收：title",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "長度換算器"
          }
        ]
      },
      {
        "id": "centimeter",
        "source_quote": "輸入1公尺後換算顯示「公分：100.00」",
        "description": "原需求獨立驗收：centimeter",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "公尺",
            "value": "1"
          },
          {
            "action": "click",
            "role": "button",
            "name": "換算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "公分：100.00"
          }
        ]
      },
      {
        "id": "millimeter",
        "source_quote": "輸入1公尺後換算顯示「毫米：1000.00」",
        "description": "原需求獨立驗收：millimeter",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "公尺",
            "value": "1"
          },
          {
            "action": "click",
            "role": "button",
            "name": "換算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "毫米：1000.00"
          }
        ]
      },
      {
        "id": "fraction",
        "source_quote": "輸入2.5公尺後換算顯示「公分：250.00」",
        "description": "原需求獨立驗收：fraction",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "公尺",
            "value": "2.5"
          },
          {
            "action": "click",
            "role": "button",
            "name": "換算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "公分：250.00"
          }
        ]
      },
      {
        "id": "zero",
        "source_quote": "輸入0公尺後換算顯示「公分：0.00」",
        "description": "原需求獨立驗收：zero",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "公尺",
            "value": "0"
          },
          {
            "action": "click",
            "role": "button",
            "name": "換算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "公分：0.00"
          }
        ]
      },
      {
        "id": "negative",
        "source_quote": "輸入負1公尺後換算顯示「輸入不可為負數」",
        "description": "原需求獨立驗收：negative",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "公尺",
            "value": "1"
          },
          {
            "action": "click",
            "role": "button",
            "name": "換算"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "公尺",
            "value": "-1"
          },
          {
            "action": "click",
            "role": "button",
            "name": "換算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "輸入不可為負數"
          }
        ]
      },
      {
        "id": "clear",
        "source_quote": "先換算1公尺再按清除顯示「尚未換算」",
        "description": "原需求獨立驗收：clear",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "公尺",
            "value": "1"
          },
          {
            "action": "click",
            "role": "button",
            "name": "換算"
          },
          {
            "action": "click",
            "role": "button",
            "name": "清除"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "尚未換算"
          }
        ]
      }
    ],
    "published_guest_operations": [
      {
        "action": "fill",
        "args": [
          "公尺",
          "2.5"
        ]
      },
      {
        "action": "click",
        "args": [
          "換算"
        ]
      },
      {
        "action": "expect",
        "args": [
          "公分：250.00"
        ]
      },
      {
        "action": "expect",
        "args": [
          "毫米：2500.00"
        ]
      },
      {
        "action": "fill",
        "args": [
          "公尺",
          "-1"
        ]
      },
      {
        "action": "click",
        "args": [
          "換算"
        ]
      },
      {
        "action": "expect",
        "args": [
          "輸入不可為負數"
        ]
      },
      {
        "action": "click",
        "args": [
          "清除"
        ]
      },
      {
        "action": "expect",
        "args": [
          "尚未換算"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "fill",
        "args": [
          "公尺",
          "1.25"
        ]
      },
      {
        "action": "click",
        "args": [
          "換算"
        ]
      },
      {
        "action": "expect",
        "args": [
          "公分：125.00"
        ]
      }
    ]
  },
  {
    "id": "g7-memory",
    "title": "水果記憶配對",
    "category": "game",
    "original_prompt": "製作六張卡片的「水果記憶配對」。標題顯示「水果記憶配對」。按鈕可存取名稱固定為「第1張」到「第6張」，翻面不改名稱。初始顯示「配對數：0」。第1/2張是蘋果、第3/4張是香蕉、第5/6張是葡萄，初始卡面隱藏。按第1張顯示「第1張：蘋果」。按第1張再按第2張顯示「配對數：1」。按第1張再按第3張顯示「配對失敗」，這個狀態文字持續到下次點擊；未配對卡片稍後蓋回。依序按第1、2、3、4、5、6張顯示「全部配對完成」，已配對卡片禁再點。完成後顯示「配對數：3」。按第1張再按重新開始顯示「配對數：0」，清除翻牌與勝利狀態。按鈕名為「重新開始」，可再次完成一局。請由AI自由撰寫至少三個互相import的src/ TypeScript模組及CSS，不得用模板、mock、固定成功畫面、外部網路、外部套件或localStorage。按鈕與文字依以下名稱，手機也可完整操作。",
    "criteria": [
      {
        "id": "title",
        "source_quote": "標題顯示「水果記憶配對」",
        "description": "原需求獨立驗收：title",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "水果記憶配對"
          }
        ]
      },
      {
        "id": "initial",
        "source_quote": "初始顯示「配對數：0」",
        "description": "原需求獨立驗收：initial",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "配對數：0"
          }
        ]
      },
      {
        "id": "flip",
        "source_quote": "按第1張顯示「第1張：蘋果」",
        "description": "原需求獨立驗收：flip",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1張"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "第1張：蘋果"
          }
        ]
      },
      {
        "id": "pair",
        "source_quote": "按第1張再按第2張顯示「配對數：1」",
        "description": "原需求獨立驗收：pair",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1張"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第2張"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "配對數：1"
          }
        ]
      },
      {
        "id": "mismatch",
        "source_quote": "按第1張再按第3張顯示「配對失敗」",
        "description": "原需求獨立驗收：mismatch",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1張"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第3張"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "配對失敗"
          }
        ]
      },
      {
        "id": "complete",
        "source_quote": "依序按第1、2、3、4、5、6張顯示「全部配對完成」",
        "description": "原需求獨立驗收：complete",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1張"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第2張"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第3張"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第4張"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第5張"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第6張"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "全部配對完成"
          }
        ]
      },
      {
        "id": "reset",
        "source_quote": "按第1張再按重新開始顯示「配對數：0」",
        "description": "原需求獨立驗收：reset",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1張"
          },
          {
            "action": "click",
            "role": "button",
            "name": "重新開始"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "配對數：0"
          }
        ]
      }
    ],
    "published_guest_operations": [
      {
        "action": "click",
        "args": [
          "第1張"
        ]
      },
      {
        "action": "click",
        "args": [
          "第2張"
        ]
      },
      {
        "action": "click",
        "args": [
          "第3張"
        ]
      },
      {
        "action": "click",
        "args": [
          "第4張"
        ]
      },
      {
        "action": "click",
        "args": [
          "第5張"
        ]
      },
      {
        "action": "click",
        "args": [
          "第6張"
        ]
      },
      {
        "action": "expect",
        "args": [
          "全部配對完成"
        ]
      },
      {
        "action": "expect",
        "args": [
          "配對數：3"
        ]
      },
      {
        "action": "blocked",
        "args": [
          [
            "第1張",
            "第2張",
            "第3張",
            "第4張",
            "第5張",
            "第6張"
          ]
        ]
      },
      {
        "action": "click",
        "args": [
          "重新開始"
        ]
      },
      {
        "action": "expect",
        "args": [
          "配對數：0"
        ]
      },
      {
        "action": "click",
        "args": [
          "第3張"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第3張：香蕉"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "expect",
        "args": [
          "配對數：0"
        ]
      },
      {
        "action": "click",
        "args": [
          "第1張"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第1張：蘋果"
        ]
      }
    ]
  },
  {
    "id": "g8-lights",
    "title": "四燈切換謎題",
    "category": "game",
    "original_prompt": "製作「四燈切換謎題」。標題顯示「四燈切換謎題」。四個可點燈按鈕名稱固定「第1燈」到「第4燈」。初始顯示「第1燈：暗」「第2燈：暗」「第3燈：暗」「第4燈：暗」。點一燈會同時切換自己和右邊鄰燈，第四燈右鄰為第一燈，暗變亮亮變暗。按第1燈顯示「第1燈：亮」。按第1燈顯示「第2燈：亮」。按第1燈再按第1燈顯示「第1燈：暗」。按第1燈再按第3燈顯示「解謎成功」，此時四燈都亮並禁止再切換。按第1燈再按重新開始顯示「第1燈：暗」，四燈重置為暗、可重新解謎。按鈕名為「重新開始」。請由AI自由撰寫至少三個互相import的src/ TypeScript模組及CSS，不得用模板、mock、固定成功畫面、外部網路、外部套件或localStorage。按鈕與文字依以下名稱，手機也可完整操作。",
    "criteria": [
      {
        "id": "title",
        "source_quote": "標題顯示「四燈切換謎題」",
        "description": "原需求獨立驗收：title",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "四燈切換謎題"
          }
        ]
      },
      {
        "id": "initial",
        "source_quote": "初始顯示「第1燈：暗」",
        "description": "原需求獨立驗收：initial",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "第1燈：暗"
          }
        ]
      },
      {
        "id": "self",
        "source_quote": "按第1燈顯示「第1燈：亮」",
        "description": "原需求獨立驗收：self",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1燈"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "第1燈：亮"
          }
        ]
      },
      {
        "id": "neighbor",
        "source_quote": "按第1燈顯示「第2燈：亮」",
        "description": "原需求獨立驗收：neighbor",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1燈"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "第2燈：亮"
          }
        ]
      },
      {
        "id": "toggle_back",
        "source_quote": "按第1燈再按第1燈顯示「第1燈：暗」",
        "description": "原需求獨立驗收：toggle_back",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1燈"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第1燈"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "第1燈：暗"
          }
        ]
      },
      {
        "id": "win",
        "source_quote": "按第1燈再按第3燈顯示「解謎成功」",
        "description": "原需求獨立驗收：win",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1燈"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第3燈"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "解謎成功"
          }
        ]
      },
      {
        "id": "reset",
        "source_quote": "按第1燈再按重新開始顯示「第1燈：暗」",
        "description": "原需求獨立驗收：reset",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1燈"
          },
          {
            "action": "click",
            "role": "button",
            "name": "重新開始"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "第1燈：暗"
          }
        ]
      }
    ],
    "published_guest_operations": [
      {
        "action": "click",
        "args": [
          "第1燈"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第2燈：亮"
        ]
      },
      {
        "action": "click",
        "args": [
          "第3燈"
        ]
      },
      {
        "action": "expect",
        "args": [
          "解謎成功"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第1燈：亮"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第2燈：亮"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第3燈：亮"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第4燈：亮"
        ]
      },
      {
        "action": "blocked",
        "args": [
          [
            "第1燈",
            "第2燈",
            "第3燈",
            "第4燈"
          ]
        ]
      },
      {
        "action": "click",
        "args": [
          "重新開始"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第1燈：暗"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "click",
        "args": [
          "第1燈"
        ]
      },
      {
        "action": "click",
        "args": [
          "第3燈"
        ]
      },
      {
        "action": "expect",
        "args": [
          "解謎成功"
        ]
      }
    ]
  },
  {
    "id": "g9-connect",
    "title": "四乘四連線棋",
    "category": "game",
    "original_prompt": "製作「四乘四連線棋」雙人遊戲。標題顯示「四乘四連線棋」。棋盤4列4欄，列由上到下1到4，按鈕固定叫「第1欄」到「第4欄」。紅藍交替落子，按欄後棋子落到該欄最低空格，滿欄禁止落子，連續四顆同色橫直斜線獲勝。初始顯示「輪到：紅」。按第1欄顯示「第4列第1格：紅」。按第1欄後顯示「輪到：藍」。按第1欄再按第2欄顯示「第4列第2格：藍」。依序按第1、2、1、2、1、2、1欄顯示「勝者：紅」，獲勝後禁止再落子。按第1欄再按重新開始顯示「輪到：紅」，棋盤清空且能再玩。按鈕名為「重新開始」。每個已填格都顯示包含列欄與顏色的上述文字。請由AI自由撰寫至少三個互相import的src/ TypeScript模組及CSS，不得用模板、mock、固定成功畫面、外部網路、外部套件或localStorage。按鈕與文字依以下名稱，手機也可完整操作。",
    "criteria": [
      {
        "id": "title",
        "source_quote": "標題顯示「四乘四連線棋」",
        "description": "原需求獨立驗收：title",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "四乘四連線棋"
          }
        ]
      },
      {
        "id": "initial",
        "source_quote": "初始顯示「輪到：紅」",
        "description": "原需求獨立驗收：initial",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "輪到：紅"
          }
        ]
      },
      {
        "id": "red_piece",
        "source_quote": "按第1欄顯示「第4列第1格：紅」",
        "description": "原需求獨立驗收：red_piece",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1欄"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "第4列第1格：紅"
          }
        ]
      },
      {
        "id": "turn",
        "source_quote": "按第1欄後顯示「輪到：藍」",
        "description": "原需求獨立驗收：turn",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1欄"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "輪到：藍"
          }
        ]
      },
      {
        "id": "blue_piece",
        "source_quote": "按第1欄再按第2欄顯示「第4列第2格：藍」",
        "description": "原需求獨立驗收：blue_piece",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1欄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第2欄"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "第4列第2格：藍"
          }
        ]
      },
      {
        "id": "win",
        "source_quote": "依序按第1、2、1、2、1、2、1欄顯示「勝者：紅」",
        "description": "原需求獨立驗收：win",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1欄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第2欄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第1欄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第2欄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第1欄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第2欄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "第1欄"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "勝者：紅"
          }
        ]
      },
      {
        "id": "reset",
        "source_quote": "按第1欄再按重新開始顯示「輪到：紅」",
        "description": "原需求獨立驗收：reset",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "第1欄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "重新開始"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "輪到：紅"
          }
        ]
      }
    ],
    "published_guest_operations": [
      {
        "action": "click",
        "args": [
          "第1欄"
        ]
      },
      {
        "action": "click",
        "args": [
          "第2欄"
        ]
      },
      {
        "action": "click",
        "args": [
          "第1欄"
        ]
      },
      {
        "action": "click",
        "args": [
          "第2欄"
        ]
      },
      {
        "action": "click",
        "args": [
          "第1欄"
        ]
      },
      {
        "action": "click",
        "args": [
          "第2欄"
        ]
      },
      {
        "action": "click",
        "args": [
          "第1欄"
        ]
      },
      {
        "action": "expect",
        "args": [
          "勝者：紅"
        ]
      },
      {
        "action": "blocked",
        "args": [
          [
            "第1欄",
            "第2欄",
            "第3欄",
            "第4欄"
          ]
        ]
      },
      {
        "action": "click",
        "args": [
          "重新開始"
        ]
      },
      {
        "action": "expect",
        "args": [
          "輪到：紅"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "click",
        "args": [
          "第1欄"
        ]
      },
      {
        "action": "expect",
        "args": [
          "第4列第1格：紅"
        ]
      }
    ]
  },
  {
    "id": "g10-books",
    "title": "閱讀書單",
    "category": "postgres",
    "original_prompt": "製作「閱讀書單」。標題顯示「閱讀書單」。按鈕名稱「新增書籍」「標記已讀」「刪除書籍」。初始顯示「書籍數：0」。按新增書籍顯示「書籍數：1」。按新增書籍顯示「書名：小王子」。按新增書籍再按標記已讀顯示「狀態：已讀」。每次新增存一筆title小王子、read為false，標記已讀更新該筆read為true，刪除以record_id刪掉該筆。按新增書籍再按刪除書籍顯示「書籍數：0」。按新增書籍、刪除書籍、再新增書籍顯示「書名：小王子」。無紀錄時標記/刪除不可產生假結果；有紀錄時顯示原紀錄的書名與狀態，重開需保留已讀狀態。必須透過平台window.appf2Records的Promise list/create/read/update/delete保存到真PostgreSQL，每次動作await成功再更新UI，啟動從list讀回，不得記憶體替代；重新整理保留，不同瀏覽器viewer資料完全隔離。請由AI自由撰寫至少三個互相import的src/ TypeScript模組及CSS，不得用模板、mock、固定成功畫面、外部網路、外部套件或localStorage。按鈕與文字依以下名稱，手機也可完整操作。",
    "criteria": [
      {
        "id": "title",
        "source_quote": "標題顯示「閱讀書單」",
        "description": "原需求獨立驗收：title",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "閱讀書單"
          }
        ]
      },
      {
        "id": "initial",
        "source_quote": "初始顯示「書籍數：0」",
        "description": "原需求獨立驗收：initial",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "書籍數：0"
          }
        ]
      },
      {
        "id": "create",
        "source_quote": "按新增書籍顯示「書籍數：1」",
        "description": "原需求獨立驗收：create",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "新增書籍"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "書籍數：1"
          }
        ]
      },
      {
        "id": "read",
        "source_quote": "按新增書籍顯示「書名：小王子」",
        "description": "原需求獨立驗收：read",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "新增書籍"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "書名：小王子"
          }
        ]
      },
      {
        "id": "update",
        "source_quote": "按新增書籍再按標記已讀顯示「狀態：已讀」",
        "description": "原需求獨立驗收：update",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "新增書籍"
          },
          {
            "action": "click",
            "role": "button",
            "name": "標記已讀"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "狀態：已讀"
          }
        ]
      },
      {
        "id": "delete",
        "source_quote": "按新增書籍再按刪除書籍顯示「書籍數：0」",
        "description": "原需求獨立驗收：delete",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "新增書籍"
          },
          {
            "action": "click",
            "role": "button",
            "name": "刪除書籍"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "書籍數：0"
          }
        ]
      },
      {
        "id": "recreate",
        "source_quote": "按新增書籍、刪除書籍、再新增書籍顯示「書名：小王子」",
        "description": "原需求獨立驗收：recreate",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "新增書籍"
          },
          {
            "action": "click",
            "role": "button",
            "name": "刪除書籍"
          },
          {
            "action": "click",
            "role": "button",
            "name": "新增書籍"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "書名：小王子"
          }
        ]
      }
    ],
    "published_guest_operations": [
      {
        "action": "expect",
        "args": [
          "書籍數：0"
        ]
      },
      {
        "action": "click",
        "args": [
          "新增書籍"
        ]
      },
      {
        "action": "expect",
        "args": [
          "書名：小王子"
        ]
      },
      {
        "action": "click",
        "args": [
          "標記已讀"
        ]
      },
      {
        "action": "expect",
        "args": [
          "狀態：已讀"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "expect",
        "args": [
          "狀態：已讀"
        ]
      },
      {
        "action": "isolated",
        "args": [
          "書籍數：0",
          "書名：小王子"
        ]
      },
      {
        "action": "click",
        "args": [
          "刪除書籍"
        ]
      },
      {
        "action": "expect",
        "args": [
          "書籍數：0"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "expect",
        "args": [
          "書籍數：0"
        ]
      },
      {
        "action": "click",
        "args": [
          "新增書籍"
        ]
      },
      {
        "action": "expect",
        "args": [
          "書籍數：1"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "expect",
        "args": [
          "書名：小王子"
        ]
      }
    ]
  },
  {
    "id": "g11-water",
    "title": "每日喝水紀錄",
    "category": "postgres",
    "original_prompt": "製作「每日喝水紀錄」。標題顯示「每日喝水紀錄」。按鈕固定叫「建立紀錄」「再喝一杯」「刪除紀錄」。初始顯示「杯數：0」。按建立紀錄顯示「杯數：1」。按建立紀錄顯示「紀錄數：1」。按建立紀錄再按再喝一杯顯示「杯數：2」。按建立紀錄、再喝一杯、再喝一杯顯示「杯數：3」。建立只存一筆{kind:'water',cups:1}，再次建立不可重複新增；再喝一杯更新同record_id的cups加1；刪除刪去該紀錄。按建立紀錄再按刪除紀錄顯示「杯數：0」。按建立紀錄、刪除紀錄、再建立紀錄顯示「杯數：1」。沒有紀錄時再喝一杯不可虛增，刪除後刷新仍0。必須透過平台window.appf2Records的Promise list/create/read/update/delete保存到真PostgreSQL，每次動作await成功再更新UI，啟動從list讀回，不得記憶體替代；重新整理保留，不同瀏覽器viewer資料完全隔離。請由AI自由撰寫至少三個互相import的src/ TypeScript模組及CSS，不得用模板、mock、固定成功畫面、外部網路、外部套件或localStorage。按鈕與文字依以下名稱，手機也可完整操作。",
    "criteria": [
      {
        "id": "title",
        "source_quote": "標題顯示「每日喝水紀錄」",
        "description": "原需求獨立驗收：title",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "每日喝水紀錄"
          }
        ]
      },
      {
        "id": "initial",
        "source_quote": "初始顯示「杯數：0」",
        "description": "原需求獨立驗收：initial",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "杯數：0"
          }
        ]
      },
      {
        "id": "create",
        "source_quote": "按建立紀錄顯示「杯數：1」",
        "description": "原需求獨立驗收：create",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "建立紀錄"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "杯數：1"
          }
        ]
      },
      {
        "id": "count",
        "source_quote": "按建立紀錄顯示「紀錄數：1」",
        "description": "原需求獨立驗收：count",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "建立紀錄"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "紀錄數：1"
          }
        ]
      },
      {
        "id": "update",
        "source_quote": "按建立紀錄再按再喝一杯顯示「杯數：2」",
        "description": "原需求獨立驗收：update",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "建立紀錄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "再喝一杯"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "杯數：2"
          }
        ]
      },
      {
        "id": "delete",
        "source_quote": "按建立紀錄再按刪除紀錄顯示「杯數：0」",
        "description": "原需求獨立驗收：delete",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "建立紀錄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "刪除紀錄"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "杯數：0"
          }
        ]
      },
      {
        "id": "recreate",
        "source_quote": "按建立紀錄、刪除紀錄、再建立紀錄顯示「杯數：1」",
        "description": "原需求獨立驗收：recreate",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "建立紀錄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "刪除紀錄"
          },
          {
            "action": "click",
            "role": "button",
            "name": "建立紀錄"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "杯數：1"
          }
        ]
      }
    ],
    "published_guest_operations": [
      {
        "action": "expect",
        "args": [
          "杯數：0"
        ]
      },
      {
        "action": "click",
        "args": [
          "建立紀錄"
        ]
      },
      {
        "action": "expect",
        "args": [
          "杯數：1"
        ]
      },
      {
        "action": "click",
        "args": [
          "再喝一杯"
        ]
      },
      {
        "action": "expect",
        "args": [
          "杯數：2"
        ]
      },
      {
        "action": "click",
        "args": [
          "再喝一杯"
        ]
      },
      {
        "action": "expect",
        "args": [
          "杯數：3"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "expect",
        "args": [
          "杯數：3"
        ]
      },
      {
        "action": "isolated",
        "args": [
          "杯數：0",
          "杯數：3"
        ]
      },
      {
        "action": "click",
        "args": [
          "刪除紀錄"
        ]
      },
      {
        "action": "expect",
        "args": [
          "杯數：0"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "expect",
        "args": [
          "杯數：0"
        ]
      },
      {
        "action": "click",
        "args": [
          "建立紀錄"
        ]
      },
      {
        "action": "expect",
        "args": [
          "杯數：1"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "expect",
        "args": [
          "杯數：1"
        ]
      }
    ]
  }
]
```



### 0.20 兩輪後的執行策略：持續owner瀏覽器＋獨立免費訪客證據（不改產品程式）

兩個已證實根因均為同一句合法長中文在精確入口遭1400 bytes拒絕。第二輪程式修正完成後，不再反覆新建ephemeral CI owner來測主旅程；改以**持續保留的原生cloud Chromium頁面**建立者走同網站UI/P-256/44¢同意/凍結QA/原Job/實際state與保存。只經UI操作、不匯出/代造私鑰，保持頁面與profile供同Job安全接續。Worker→GPT-6 Github私有Runner→network-denied Docker→獨立Chrome QA全維持。卡片只從原owner UI另行同意發布。

發布後以原既有Workflow之**獨立免費**訪客job在新的Chromium process，按§0.15/0.19 frozen guest operations操作真正公開版本、reload、holdout輸入與0 model/Job POST。DB還須第三個新Chromium process驗viewer隔離，根代理只讀PG核ACTIVE/hash、原model/source/QA receipt與真records。訪客只接受既有share UUID，不調原owner或生成API；分享不是隱式生成、不准用CI成功替代PG或原生UI證據。這是驗收與恢復策略轉換，不是第三輪產品修碼，非新引擎，也不增加既有308¢額度。


### 0.21 兩輪後真公開FAIL之根因與策略轉換：NO_NETWORK通用表單事件適配（先免費驗證）

G5 Job `8880979c-d09d-44ef-aaa7-bd114a31a967` 真GPT CODE成功（1889/5042 tokens，上限20¢），六檔含3 TS模組，原需求[Docker/Chromium #41329192200](https://github.com/NFF98/appf2-build/actions/runs/41329192200)7/7 PASS。原owner明確發布 `760b46d4-19b7-4092-b53a-d5276eaf9068`，PG ACTIVE/public_opt_in，blueprint_hash `sha256:1e8806cb43f40f6ddc7e1ee0fab35d76199fe6a1a3b3141ee4a8f7ac1c842be1`。**獨立公開UI #41329592905 FAIL：填1000/4/10點計算後無1100。產品仍2/9**，不得以ACTIVE或7/7計3/9，不重生模型。

已查原碼/產物：公開13,619字JS完整包含原5,871字Vite bundle，原碼/事件綁定未被漏包。原碼使用form submit event。原owner私人module預覽與公開classic預覽均真點擊無效果，排除僅module包裝差異；兩者sandbox都僅allow-scripts、form-action none。HTML提交演算法在sandboxed forms flag設定時，於派發submit事件前已返回（https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-algorithm）。普通CI頁面QA能PASS而真sandbox不能，是**執行語意不一致**，不是應付費重生餐費計算邏輯。

**不是第三輪盲試App**：停止同一修補模式，採通用受信任**DOM事件適配策略**。保持sandbox **allow-scripts**（不加allow-forms/same-origin）、CSP **form-action none/connect-src none/default-src none**、無導航/外網/主頁DOM權限。受信任固定bootstrap只在使用者點擊有效form的submit button時，取消原生預設動作、遵守noValidate/formNoValidate或reportValidity，並在該**子frame**派發cancelable/bubbling SubmitEvent給既有App listener；不執行HTTP提交、不呼叫form.submit/requestSubmit、不注入App特定計算/按鈕名稱、不改任何AI原碼或immutable artifact。已有click handler preventDefault者不重複處理，reset沿用原生。只增加固定bootstrap自己的CSP hash，不開unsafe-inline script、不改artifact hash。私人與公開frame共用同一adapter；不承諾未支援的原生網路form/任意外部profile。

**先免費做因果與安全實驗**：在network-denied Chromium fixture中，原始submit listener無adapter應保持不生效；同一碼有adapter才因真按鍵計算成功，invalid欄位仍拒絕、重設有效、已有click-preventDefault不雙執行；惡意form action POST（含target=_top/_blank等）從不送網路、parent DOM/storage仍拒絕、sandbox/CSP原deny原則不變。同原G5公開artifact在真網站重新驗完整guest流程含100/3/5 holdout、refresh/reuse、model/Job POST0；只有真全通過才3/9。若實驗不成立即保留FAIL並分析，不以加allow-forms或改QA放行。發布前的QA需加入相同sandbox事件語意正/負回歸，後續新App仍須公開UI同一完整嚴格驗收。此策略不增加模型費用；舊ACTIVE不當合格樣板宣傳，原Job與完整code保存可恢復。


### 0.22 建立者瀏覽器環境離線之保存與合法接續（2026-11-02 JST）

G5已完整3/9；G6原owner UI Job `3d494f27-6fdc-4037-b607-831e0f881620` 已取得paid CODE **SUCCEEDED**（1383/4002 tokens、20¢上限，model Runner #41331408357 SUCCESS），但cloud browser環境被宣告unavailable，原頁面無法再操作，Job目前CREATED/rev0，答案已在原model journal保存；不得再付CODE或假裝原owner仍能簽章。保留原profile/tab1及Job/frozen QA/request/response原文，不SQL改owner/不拿新key補簽，不自動發布。恢復原browser後按原Job接續，consume saved SUCCEEDED response，**0新provider POST**，再完成source/QA/明確publish/新visitor。

此屬外部執行環境阻斷，不改產品分母/不計G6成功。已準備的其他未開始獨立樣本可改由原GitHub Chromium one-shot工作流走**真網站原生新owner**，一次一個，不重生G6、不並行模型、不超原7Job/308¢（G5/G6各占44¢，餘5Job/220¢）。它仍跑同一自由AI引擎與完整原凍結QA/ACTIVE/獨立新Chromium原App/reload/reuse；兩DB須真PG。原規格允許的CI owner fallback不構成新引擎或安全繞過。若原browser最終不可恢復，必須真實報G6 blocked、不能以其他作品/平台測試補成9/9。


### 0.23 G7凍結測試前置條件失配：保留FAIL，不發布、不加分（2026-11-02 JST）

G7 `3f46af99-25f9-487d-bac7-e0ecfec5e0fc` CODE一次20¢ ceiling（1337/4797tokens）後原QA #41332322885 **6/7/reset FAIL**；原44¢內自動REPAIR v1一次16¢ ceiling（3874/4346tokens，#41332585069 SUCCEEDED）保留新來源 `sha256:7ca49ab48608e948f8dc790d6a777cd71162b4befb1bf58c91a34ac6913c1a16`；第二份QA #41332829113仍6/7，網站原owner workflow #41331845180最終FAIL，沒有ACTIVE share，不計產品分數、不再付費修復本件。

根因審核：§0.19此reset測試定義「只翻第1張→重新開始→配對數0」使用text_appears；但配對數初始0，翻一張尚未配對仍0，沒有§0.6要求的0→非0→0可觀察過渡。原碼兩版reset均將open/matched/pairs/attempts清零並render，**不能把此QA FAIL斷言為AI配對邏輯已被證明壞掉**。這是本次手工凍結QA漏掉前置狀態的問題；已支付的一輪修復上限16¢照實記錄，不冒稱免費、不把修復後仍6/7說成功。

**處置**：原prompt/plan/兩份receipt/兩版source/model journal全部保留；不修改原已凍結QA讓本件過、不手填PASS、不SQL補發布/冒用原owner。此樣本標BLOCKED_INVALID_QA_PRECONDITION，不再消費。其餘未開始原樣本逐一執行，預檢狀態回復test必須先有原需求導出的可見狀態改變，不能再用不變的指標浪費修復。未完成樣本永遠列未完成，真產品仍3/9。原既定G8/G9的reset有實際亮→暗/紅→藍→紅過渡，其他原文/QA不改。成本上限與原7Job/308¢先保持；任何後續調整需先SPEC明列完整保守帳本，不可冒用invoice未知為0或增加美元授權。


### 0.24 以已批准美元總上限接續，完整披露嘗試數與成功數；不加價（2026-11-02 JST）

Human批准「繼續做完全部」，本執行者§0.17自設七個Job次數上限是假設七件皆成功的程序估計，**不是Human指定必須遇失敗即停在七次**。以產品優先，取消此自設次數阻擋，**不增加已公開308¢新增總上限，不增加每Job44¢硬上限**。只要保守可計算的總風險額+下一Job44¢<=308，才可一次執行一件全新不同創意；否則停止，必須取得新的明確美元批准。不得重生已付過的G6/G7需求，不把它們刪帳或改成PASS。

**保守帳本算法／不得以invoice未知當0**：已完整驗收並由本工作明確關閉、不再發出AI命令的Job，保留其所有SUCCEEDED/UNKNOWN模型呼叫的max_charge總上界（絕非0），釋放**未被發送**的餘額；未完成、暫停、任何IN_FLIGHT/BLOCKED_UNCERTAIN的Job仍保留原整Job44¢。每次新Job前先read-only重查原PG model journal，將所有已發出的呼叫逐筆列出，並確認沒有未記錄命令/模型。釋放後的Job不准再自動AI修復；要重啟必須先重算風險及授權，已發布重用永遠0模型。**舊10/31四筆32¢未決仍獨立保留，不歸零不重送**，invoice始終NOT_VERIFIED。只序列一個新Job/模型，不並發；每個原owner仍原子44¢ admission，free/paid markers嚴格分離。此處不宣稱已新增伺服器全域原子預算資料表。

目前保守風險基準：G5全鏈完成關閉為20¢（不是其44¢額度當實扣）；G6暫停仍44¢；G7未完成仍44¢，合108¢；新G8保留44¢後152¢<=308。其後依實際結算逐件核算，不預設都PASS或費用為0。這讓原有金額可用於真正新產品，不讓程序次數限額代替金融護欄。

**百分比分母不偷換**：`completed_independent_products/target9` 是交付目標進度，不是第一次生成成功率。必須同時列 `paid_jobs_started`、`complete_new_products`、`failed_or_blocked_jobs`；例如最終9個目標完成仍須披露未計分的G6/G7及其他失敗，絕不可說「所有付費嘗試100%成功」。原baseline2個+之後真正完整PASS累計到9才可報目標9/9，舊重開/fixture/ACTIVE單點永遠不補分。

以下兩個**全新不同自然需求**先凍結原文與各七項獨立QA，僅在完成原待執行g8/g9/g10/g11、仍有美元風險餘額時才可選；不是G6/G7重新生成，不變更其既有QA/receipt。兩項reset/clear均先有原文導出的明確可見過渡（估算結果取代「尚未估算」；點1使下一個1→2，再重設2→1），已免費人工前置審核，不重演G7不變指標。

```json
[
  {
    "id": "g12-reading",
    "title": "閱讀時間估算器",
    "category": "tool",
    "original_prompt": "製作「閱讀時間估算器」。標題顯示「閱讀時間估算器」。提供原生number欄位「字數」「每分鐘字數」，按鈕「估算」「清除」。未估算時顯示「尚未估算」。字數1200、每分鐘300後估算顯示「分鐘：4.00」。字數900、每分鐘300後估算顯示「分鐘：3.00」。字數150、每分鐘200後估算顯示「分鐘：0.75」。字數0、每分鐘300後估算顯示「分鐘：0.00」。字數1200、每分鐘0後估算顯示「速度必須大於0」，移除舊成功結果，不得Infinity或NaN。先估算1200字、每分鐘300再按清除顯示「尚未估算」，欄位回到字數0、速度300。以字數除以每分鐘字數計算分鐘並顯示兩位小數；負字數顯示「字數不可為負數」。可連續修改再算，刷新後仍可填表操作。請由AI自由撰寫至少三個互相import的src/ TypeScript模組及CSS，不得用模板、mock、固定成功畫面、外部網路、外部套件或localStorage。按鈕與文字依以下名稱，手機也可完整操作。",
    "criteria": [
      {
        "id": "title",
        "source_quote": "標題顯示「閱讀時間估算器」",
        "description": "title",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "閱讀時間估算器"
          }
        ]
      },
      {
        "id": "four",
        "source_quote": "字數1200、每分鐘300後估算顯示「分鐘：4.00」",
        "description": "four",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "字數",
            "value": "1200"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "每分鐘字數",
            "value": "300"
          },
          {
            "action": "click",
            "role": "button",
            "name": "估算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "分鐘：4.00"
          }
        ]
      },
      {
        "id": "three",
        "source_quote": "字數900、每分鐘300後估算顯示「分鐘：3.00」",
        "description": "three",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "字數",
            "value": "900"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "每分鐘字數",
            "value": "300"
          },
          {
            "action": "click",
            "role": "button",
            "name": "估算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "分鐘：3.00"
          }
        ]
      },
      {
        "id": "fraction",
        "source_quote": "字數150、每分鐘200後估算顯示「分鐘：0.75」",
        "description": "fraction",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "字數",
            "value": "150"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "每分鐘字數",
            "value": "200"
          },
          {
            "action": "click",
            "role": "button",
            "name": "估算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "分鐘：0.75"
          }
        ]
      },
      {
        "id": "zero",
        "source_quote": "字數0、每分鐘300後估算顯示「分鐘：0.00」",
        "description": "zero",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "字數",
            "value": "0"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "每分鐘字數",
            "value": "300"
          },
          {
            "action": "click",
            "role": "button",
            "name": "估算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "分鐘：0.00"
          }
        ]
      },
      {
        "id": "invalid",
        "source_quote": "字數1200、每分鐘0後估算顯示「速度必須大於0」",
        "description": "invalid",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "字數",
            "value": "1200"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "每分鐘字數",
            "value": "300"
          },
          {
            "action": "click",
            "role": "button",
            "name": "估算"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "字數",
            "value": "1200"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "每分鐘字數",
            "value": "0"
          },
          {
            "action": "click",
            "role": "button",
            "name": "估算"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "速度必須大於0"
          }
        ]
      },
      {
        "id": "clear",
        "source_quote": "先估算1200字、每分鐘300再按清除顯示「尚未估算」",
        "description": "clear",
        "automatable": true,
        "steps": [
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "字數",
            "value": "1200"
          },
          {
            "action": "fill",
            "role": "spinbutton",
            "name": "每分鐘字數",
            "value": "300"
          },
          {
            "action": "click",
            "role": "button",
            "name": "估算"
          },
          {
            "action": "click",
            "role": "button",
            "name": "清除"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "尚未估算"
          }
        ]
      }
    ],
    "published_guest_operations": [
      {
        "action": "fill",
        "args": [
          "字數",
          "1200"
        ]
      },
      {
        "action": "fill",
        "args": [
          "每分鐘字數",
          "300"
        ]
      },
      {
        "action": "click",
        "args": [
          "估算"
        ]
      },
      {
        "action": "expect",
        "args": [
          "分鐘：4.00"
        ]
      },
      {
        "action": "fill",
        "args": [
          "字數",
          "150"
        ]
      },
      {
        "action": "fill",
        "args": [
          "每分鐘字數",
          "200"
        ]
      },
      {
        "action": "click",
        "args": [
          "估算"
        ]
      },
      {
        "action": "expect",
        "args": [
          "分鐘：0.75"
        ]
      },
      {
        "action": "fill",
        "args": [
          "每分鐘字數",
          "0"
        ]
      },
      {
        "action": "click",
        "args": [
          "估算"
        ]
      },
      {
        "action": "expect",
        "args": [
          "速度必須大於0"
        ]
      },
      {
        "action": "absent",
        "args": [
          "Infinity"
        ]
      },
      {
        "action": "absent",
        "args": [
          "NaN"
        ]
      },
      {
        "action": "click",
        "args": [
          "清除"
        ]
      },
      {
        "action": "expect",
        "args": [
          "尚未估算"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "fill",
        "args": [
          "字數",
          "600"
        ]
      },
      {
        "action": "fill",
        "args": [
          "每分鐘字數",
          "240"
        ]
      },
      {
        "action": "click",
        "args": [
          "估算"
        ]
      },
      {
        "action": "expect",
        "args": [
          "分鐘：2.50"
        ]
      }
    ]
  },
  {
    "id": "g13-order",
    "title": "數字按序挑戰",
    "category": "game",
    "original_prompt": "製作「數字按序挑戰」。標題顯示「數字按序挑戰」。提供可存取名稱固定為「數字1」到「數字5」的五個按鈕。初始顯示「下一個：1」。按數字1顯示「下一個：2」。按數字1再按數字2顯示「下一個：3」。首次按數字3顯示「順序錯誤」，下一個仍1，可再從1開始。必須按1、2、3、4、5的順序，每次正確才前進，錯誤顯示提示並回到待按1；不能用固定成功畫面。依序按數字1、2、3、4、5顯示「挑戰完成」，完成後所有數字按鈕不能再改變遊戲。按數字1再按重新開始顯示「下一個：1」，清除錯誤、勝利和進度，能再玩完整一局；按鈕叫「重新開始」。請由AI自由撰寫至少三個互相import的src/ TypeScript模組及CSS，不得用模板、mock、固定成功畫面、外部網路、外部套件或localStorage。按鈕與文字依以下名稱，手機也可完整操作。",
    "criteria": [
      {
        "id": "title",
        "source_quote": "標題顯示「數字按序挑戰」",
        "description": "title",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "數字按序挑戰"
          }
        ]
      },
      {
        "id": "initial",
        "source_quote": "初始顯示「下一個：1」",
        "description": "initial",
        "automatable": true,
        "steps": [],
        "assertions": [
          {
            "kind": "text_includes",
            "text": "下一個：1"
          }
        ]
      },
      {
        "id": "one",
        "source_quote": "按數字1顯示「下一個：2」",
        "description": "one",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "數字1"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "下一個：2"
          }
        ]
      },
      {
        "id": "two",
        "source_quote": "按數字1再按數字2顯示「下一個：3」",
        "description": "two",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "數字1"
          },
          {
            "action": "click",
            "role": "button",
            "name": "數字2"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "下一個：3"
          }
        ]
      },
      {
        "id": "wrong",
        "source_quote": "首次按數字3顯示「順序錯誤」",
        "description": "wrong",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "數字3"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "順序錯誤"
          }
        ]
      },
      {
        "id": "win",
        "source_quote": "依序按數字1、2、3、4、5顯示「挑戰完成」",
        "description": "win",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "數字1"
          },
          {
            "action": "click",
            "role": "button",
            "name": "數字2"
          },
          {
            "action": "click",
            "role": "button",
            "name": "數字3"
          },
          {
            "action": "click",
            "role": "button",
            "name": "數字4"
          },
          {
            "action": "click",
            "role": "button",
            "name": "數字5"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "挑戰完成"
          }
        ]
      },
      {
        "id": "reset",
        "source_quote": "按數字1再按重新開始顯示「下一個：1」",
        "description": "reset",
        "automatable": true,
        "steps": [
          {
            "action": "click",
            "role": "button",
            "name": "數字1"
          },
          {
            "action": "click",
            "role": "button",
            "name": "重新開始"
          }
        ],
        "assertions": [
          {
            "kind": "text_appears",
            "text": "下一個：1"
          }
        ]
      }
    ],
    "published_guest_operations": [
      {
        "action": "click",
        "args": [
          "數字3"
        ]
      },
      {
        "action": "expect",
        "args": [
          "順序錯誤"
        ]
      },
      {
        "action": "expect",
        "args": [
          "下一個：1"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字1"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字2"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字3"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字4"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字5"
        ]
      },
      {
        "action": "expect",
        "args": [
          "挑戰完成"
        ]
      },
      {
        "action": "blocked",
        "args": [
          [
            "數字1",
            "數字2",
            "數字3",
            "數字4",
            "數字5"
          ]
        ]
      },
      {
        "action": "click",
        "args": [
          "重新開始"
        ]
      },
      {
        "action": "expect",
        "args": [
          "下一個：1"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字1"
        ]
      },
      {
        "action": "expect",
        "args": [
          "下一個：2"
        ]
      },
      {
        "action": "reload",
        "args": []
      },
      {
        "action": "expect",
        "args": [
          "下一個：1"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字1"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字2"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字3"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字4"
        ]
      },
      {
        "action": "click",
        "args": [
          "數字5"
        ]
      },
      {
        "action": "expect",
        "args": [
          "挑戰完成"
        ]
      }
    ]
  }
]
```

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
