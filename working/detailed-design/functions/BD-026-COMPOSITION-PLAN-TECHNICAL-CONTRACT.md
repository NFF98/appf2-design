# BD-026 — F01 Typed Composition Plan & Deterministic Blueprint Lowering — Executable Technical Contract

> **Proposed Design Delta (2026-10-27)**. Canonical detail owner: F01 §14. This document is subordinate to Design SSOT, not a Build Spec or an already approved Build Freeze. Exact JSON grammar: [composition-plan-v1.schema.json](../registries/composition-plan-v1.schema.json). The normative words MUST / MUST NOT / FAIL mean machine-checkable requirements. A code implementation MUST NOT treat passing this document's schema as F02 admission.

## 0. Outcome, scope and rollout

The user says a normal sentence. The server keeps F01 Resolved Intent and its human-visible assumptions authoritative. Prompt B chooses a small semantic CompositionPlanV1 (not raw executable Blueprint). The *server* checks intent traceability, applies pinned F04 certified composition requirements and deterministically lowers that plan to the existing F02 Blueprint 1.0.0. The resulting candidate must still pass existing F02 V01–V12, durable admission, F03 Execution Admission, and browser interaction.

**Phase 1 certified capabilities**: (a) DISPLAY, (b) FORM with TEXT/NUMBER/TOGGLE fields, (c) ARITHMETIC with ADD/SUB/MUL, (d) RECORD_LIST with two typed fields (free-form STRING title and BOOLEAN completion), including add, per-row toggle/delete, total/completed metrics. These modules are independently composable in one root page, independently labeled and ordered; they are not a hard-coded Todo App template. Requests needing other record fields, DB persistence, remote data, durable instance state, date, arbitrary code, share, or unsupported operations MUST remain unsupported or receive truthful user-confirmed partial coverage. No claim to general-purpose arbitrary software generation.

**Frozen interfaces preserved**: F00 clarification/source authority; F01 ResolvedIntent v1 + provider operation BLUEPRINT_COMPOSE; F04 unique capability canonical source and its registry digests/ledger; F02 Blueprint 1.0.0, trust and admission; F03 execution, local state, event ordering and result evidence. Do not change these silently.

## 1. Provider output and trust boundary

Prompt B output object MUST have exactly plan_version, title, modules and optional description. Its structure MUST pass the JSON Schema with additionalProperties:false, max 12 modules, key grammar `^[a-z][a-z0-9_]{0,39}$`, no null values and bounded user-facing text. Its module discrimination MUST be precisely DISPLAY, FORM, ARITHMETIC or RECORD_LIST. Unknown kind/field/key MUST fail. The model MUST NOT output IDs for Blueprint nodes, Actions, Rules, state storage keys, F04 registration keys, URLs, arbitrary JS, custom ValueSource ASTs, provider keys or an unbounded generic graph. Provider response mode: JSON Schema strict where supported, but local plan parser is the independent authority.

Trusted request context (not model-authored): ResolvedIntent projection, accepted material assumptions, requested capability requirements with exact IDs, F04 resolver result (selected ID@version plus registry_version, registryDigest and validator release identity), ephemeral-input sensitivity marker, current schema/prompt versions, resource/permission policy and context clock/deadline. The model's requirement_ids are only *references*; F01 verifies them against still-authoritative required/optional ResolvedIntent requirement IDs. Every required requirement MUST have at least one semantically matching module and every module MUST map to at least one valid requirement; mapping purely by fabricated ID is rejected. A closed, server-owned feature-signature map (not fuzzy runtime LLM matching) verifies semantic_need, interaction_class, input/output type and constraints against the selected module. Missing signature = unsupported. Safe decorative headings can be added without new material business claims.

No plan body, diagnostic, telemetry event or compiler_run may persist request-scoped DO_NOT_PERSIST values; reuse the existing F01 ephemeral detector and fail before assembling. Raw user Intent is not included in publicly visible errors. Plan is *untrusted*, not an authority for business decisions or capability coverage.

## 2. Exact PlanV1 fields and invariants

- Top object `{plan_version:"1.0.0",title,description?,modules:[...]}`; `title` 1..120 code points, `description` 0..500, `modules` 1..12 ordered.
- Every module has `key`, `kind`, `requirement_ids` (1..12 unique sha256 requirements). Module keys MUST be unique across plan. `requirement_ids` MUST refer to trusted, still-valid requirements; list order does not imply strength or license to drop a required feature.
- DISPLAY: `heading`, `body` nonempty bounded strings. Semantics: layout + heading + body; no interactive action.
- FORM: `heading`, 1..8 ordered `fields`, optional `reset_label`. Field `key` unique per module; one of TEXT(`label,max_length:1..120,initial,placeholder?`), NUMBER(`label,min,max,initial` finite, bounds within ±1,000,000), TOGGLE(`label,initial:boolean`). If TEXT initial exceeds max_length, or NUMBER min>max / initial outside bounds, fail plan-level semantic checking. Text maxlength 120 is a Phase 1 plan limit, NOT permission to widen F04 constraints. `reset_label` produces a meaningful reset action, not a fake submit.
- ARITHMETIC: `heading,left_label,right_label,result_label,operation,initial_left,initial_right`; operation only ADD, SUB, MUL (no division by zero ambiguity). Both numeric initial values finite ±1,000,000; result must be finite and F02 resource/type constraints satisfied. Lowerer emits two independent numeric inputs and a derived result; no added fake submit.
- RECORD_LIST: `heading,record_title_key,record_done_key,input_label,add_label,toggle_label,delete_label,total_label,completed_label,max_items`. `record_title_key` and `record_done_key` MUST be distinct valid unreserved field identifiers. Exact record type: RECORD{titleKey:STRING(max_length=120),doneKey:BOOLEAN}; LIST(max_length=plan.max_items, item=that RECORD). Initially empty. Record cap 1..100. The list may NOT claim durable cross-device persistence. The row add/toggle/delete/stat behavior is defined in §5 and is mandatory; no display-only degradation without an explicit user-visible decision.
- All machine identifiers have NFF reserved-prefix checks (`nff_`, `sys_`, `__` forbidden), all arrays obey schema limits, all visible strings must be normalized to valid JSON UTF-8 and must not be interpreted as code or property paths. The model is not allowed to provide custom formulas or arbitrary SQL.

JSON schema validates syntax and local ranges. Cross-field equality, uniqueness, source provenance, capability coverage, model-output leakage and semantics are checked by deterministic F01 plan validation *after parsing and before lowering*.

## 3. F04 capability closure — no invented Registry

For each module, a certified requirements map pinned to the F04 Registry release is compiled **from the existing F04 definitions**, not from an independent hand-maintained validator:
- DISPLAY: layout.container, content.text.
- FORM(TEXT): layout.container, input.text; FORM(NUMBER): layout.container, input.number; FORM(TOGGLE): layout.container, input.toggle; FORM reset: action.button.
- ARITHMETIC: layout.container, input.number, data.stat; exact F02 allowed arithmetic OP and two typed numeric states.
- RECORD_LIST: layout.container, input.text, action.button, content.text, content.list, data.stat; F02 operators LIST_APPEND, LIST_REPLACE_AT, LIST_REMOVE_AT, RECORD_SET, LIST_FILTER_EQ, COUNT, NOT, EQ, NEQ, TRIM, IF, AND, LT (only actually-used allowlisted operators may be emitted).

Before Prompt B, F04 must resolve coverage AND transitive *wiring/structural* requirements derived deterministically from trusted semantic feature requirements (NOT guessed from a provider capability list). A draft plan can only use the resulting pinned, explicit selected set. If a module would need a capability not in the pinned set, F01 must re-run F04 coverage once on a verified additional semantic requirement, or return a composition-unsupported diagnostic; it MUST NOT silently select capabilities in the lowerer. A selected capability MUST be ENABLED, ACTIVE, compatible, have verified runtime handler, and match exact ID/version; all generated machine projections and ledger digests must agree. Missing renderer/handler/unsupported source-kind/unknown event = fail-closed. `FULLY_SUPPORTED` in F04 is **coverage**, not product E2E success.

F04's proposed *machine-readable* composition certification projection is defined by [CompositionCertificateV1 JSON Schema](../registries/composition-certificate-v1.schema.json). It maps module kinds to exact role references, operator allowlists, verified F04 release digests, typed validator contracts and test fixture hashes. F04 generator verifies every listed role against actual generated validator/runtime artifacts, includes exact immutable registry digests and fails on mismatch. Semantic role recipes are F04-owned metadata co-located with canonical source, not a second handwritten validator, an executable capability, JS callback or user-editable tool. A plan's required refs must all be in the pinned F04 selected closure.

## 4. Deterministic lowering algorithm and conflict handling

Inputs: validated PlanV1, Resolved Intent, exact F04 coverage + certified role artifact, pinned registry identity, fixed Blueprint schema 1.0.0. Output: a *fresh*, complete F02 candidate, or a typed F01 composition error. Lowering is a pure function with no provider, DB write, HTTP, clock or random calls and MUST produce byte-equivalent canonical Blueprint for equivalent canonical inputs/version. Changing module order is a semantic presentation edit and may change hash.

Algorithm:
1. Validate plan schema; reject unknown module kinds/field names, duplicate keys, invalid numbers, null/unsafe objects, empty modules or out-of-range values. Enforce provenance and required-feature semantic coverage.
2. Verify F04 selected role closure and pinned release digest; use the generated F04 machine artifact for every prop, binding, event, action and composition decision.
3. Create exactly one real root `node_root` as layout.container (COLUMN, gap MD, align STRETCH) with no repeat; require its exact selected F04 ref. Process modules in the *input array order*, zero-based index padded to three decimal digits for stable IDs; all module descendants attach through precisely one module container child. No free-standing extra nodes.
4. Allocate deterministic, collision-checked IDs: `node_m000_<role>`, `action_m000_<role>`, `rule_m000_<role>`, `s_m000_<role>`. Role is one of lowerer-controlled ASCII snake_case tokens, never user/module keys. For repeated row child use singular structural definition, not per-item static nodes. IDs must satisfy existing F02 grammar, reserved and uniqueness rules. Emit nodes in pre-order DFS from root; children arrays in prescribed presentation order.
5. Create typed mutable states first, then known derived values and action steps; apply exact F02 TypeDescriptor and ValueSource grammar. No graph node may be emitted before all required states/events/actions can be typed. No implicit coercion, NUMBER-to-STRING, list item indexing, optional keys, null or dynamic eval.
6. Build semantic nodes using F04's resolved machine props/bindings/event shapes. Only permitted parents may have nonempty children; only `content.list` may receive REPEAT (required, with STATE list items, item_alias=item, index_alias=index, max_items<=descriptor max_length). Children of a repeated list inherit item/index scope; action dispatch site sees all scope aliases. All leaf nodes omit repeat and have children:[].
7. Connect node event names to lowerer-generated action IDs. Input change actions use F04-defined event payload `{kind:"EVENT",path:"value"}`, not inline handlers. Every press/change target action must exist, have valid nonempty steps and receive statically compatible event/scope in **all dispatch sites**. Actions containing EVENT/SCOPE never share dispatch sites of incompatible types.
8. Build the support/degradation projection from trusted F04 coverage, never from model text. Add no user-visible feature that is not traceable to the plan. Set schema_version 1.0.0, registry_version pinned, kind APP, meta title, state/rules/actions/nodes/root_node_id and result.outputs (bounded, privacy-aware). EXACT eleven F02 top-level keys; F02 canonicalizes/hash independently.
9. Preflight structural checks: exactly one root with parent count 0, every other node has exactly one parent, all IDs reachable, no cycles, repeat only on F04-allowed node, alias no shadowing, F04 exact version exists, expected typed state/action/result predicates hold, aggregate resource limits stay within F02 V09 and F04. Preflight errors return typed diagnostics, not mutated admission.
10. Submit entire candidate once through existing F02 validate → admit. F02 is the final unmodified trust gate; passing F01 preflight is **not** itself VALIDATED.

Plan/registry versions are pinned per logical compile, not rebound on retry. The same PlanV1 + ResolvedIntent + pinned F04 release produces identical candidate digests (independent of current system time or model). Lowerer MUST NOT read raw user prompt as executable text; it uses escaped labels only.

## 5. Exact RECORD_LIST action semantics

With module m000, field keys `title` and `done` (names configurable only as PlanV1 record_title_key/record_done_key), lowerer-generated state:
- `s_m000_rows`: MUTABLE LIST, initial [], constraints.item = RECORD(fields.{title,done}, STRING(max_length=120), BOOLEAN); constraints.max_length = max_items.
- `s_m000_draft`: MUTABLE STRING, initial "", constraints.max_length=120.
- `s_m000_can_add`: internal MUTABLE BOOLEAN initial false; never user-editable or a result. `s_m000_completed` is **not** mutable; use an F02 rule or derived value `COUNT(LIST_FILTER_EQ(STATE rows,LITERAL doneKey,LITERAL true))`; total=`COUNT(STATE rows)`.

Root's module container children: heading text, input.text, add action.button, data.stat(total), data.stat(completed), content.list. For input.text: `props.label=LITERAL input_label`, `props.max_length=LITERAL 120`, `bindings.bind=STATE draft`, `events.change=action_m000_draft_change`. That Action's one SET_STATE step writes `EVENT("value")` to draft. For the add button `events.press=action_m000_add` (F04-defined press); Action steps:
1. SET_STATE target `s_m000_can_add` (internal MUTABLE BOOLEAN initial false) = `AND(NEQ(TRIM(STATE draft),LITERAL ""),LT(COUNT(STATE rows),LITERAL max_items))`. This snapshots the acceptance predicate in the **working transaction**.
2. SET_STATE target rows = `LIST_APPEND(STATE rows,RECORD_SET(LITERAL {titleKey:"",doneKey:false},LITERAL titleKey,STATE draft))`, with `when=STATE can_add`.
3. SET_STATE target draft = LITERAL "", with `when=STATE can_add`.
4. RESET_STATE target `s_m000_can_add` unconditionally (initial false). Four action steps, all supported by F02/F03. Empty or full list does not clear the draft; appending the last legal row DOES clear the draft. F03 StoreTransaction's later steps see prior working writes, so **re-checking list capacity after append would be wrong**. Snapshot can_add first. Failed operation aborts the whole transaction.
For list node: `repeat={items:STATE rows,item_alias:"item",index_alias:"index",max_items:max_items}`, children:[row_container]. Row container children:[title text from SCOPE item.titleKey, completion button, delete button]. Toggle action SET_STATE rows = `LIST_REPLACE_AT(STATE rows,SCOPE index,RECORD_SET(SCOPE item,LITERAL doneKey,NOT(SCOPE item.doneKey)))`. Delete action SET_STATE rows = `LIST_REMOVE_AT(STATE rows,SCOPE index)`. Both events.press bind to unique action IDs. No filtered/sorted `repeat.items` in the editable case. These actions may only bind under the exact unfiltered list to avoid positional index corruption.
F02 result outputs may report total and completed as non-sensitive NUMBER; UI stats use `data.stat` with source `RULE` or OP as typed. Empty list completed=0, total=0, no division. External persistent records, multiuser identity, deadline/day clock semantics and background saving are **not part of this profile**.

**Runtime basis**: current F03 StoreTransaction processes action steps sequentially on working state; the four-step boolean snapshot above avoids final-capacity bugs using existing operators. Certification nevertheless REQUIRES independent F02 V01–V12 admission and F03 real runtime tests (first row, middle row, last slot, full list, empty input). Never infer row identity from filtered or sorted list.

## 6. Other module lowering semantics

- DISPLAY: module container → content.text HEADING with literal text binding and content.text BODY with literal text binding. No state, Action, result or user input. F04 exact allowlists govern props.
- FORM: module container → HEADING + each typed input in field order. Each field owns one MUTABLE state and one change Action writing EVENT.value into the matching state. TEXT always emits max_length literal, matching STRING descriptor; NUMBER min/max/initial checked and NUMBER descriptor min/max; TOGGLE BOOLEAN. Optional reset_label emits action.button that invokes SET_STATE to each declared initial literal, not fake submit or network save. Multiple field keys get disjoint generated state IDs. No remote submission is claimed.
- ARITHMETIC: module container → HEADING + two input.number nodes + data.stat. Both typed fields write their own NUMBER state on change. Stat binds to typed `OP(operation, STATE left, STATE right)`. No divide-by-zero or hidden external call. Numeric operation must remain finite within F02/F03 runtime semantics; overflow means explicit safe failure, no NaN or fabricated result.
- Multiple modules: order preserved; one single root container. No accidental variable sharing between modules; no computed extra features. Up to 12 modules subject to F02 resource bounds and selected F04 closure.

## 7. Exact error disposition (no new public error codes)

| Internal subreason | Existing public mapping | Handling |
|---|---|---|
| PLAN_SCHEMA_INVALID | F01-ERR-007 | bounded provider invalid-output retry; never blame user |
| PLAN_UNTRUSTED_REFERENCE | F01-ERR-007 | rejected model output, no forged requirement/capability |
| PLAN_SEMANTIC_MISMATCH | F01-ERR-007 if hallucinated; F01-ERR-008 if genuinely unsupported | do not silently drop required feature |
| COMPOSITION_UNSUPPORTED | F01-ERR-008 | supported capability or pattern is missing; show gap |
| LOWERING_TYPE_INVALID | F01-ERR-014 | internal assembler bug; no paid automatic retry |
| LOWERING_GRAPH_INVALID | F01-ERR-014 | internal assembler bug; preserve intent |
| F02_REJECTED | F01-ERR-011 | full F02 validation; existing rejection classification, ≤1 recompose |
| RUNTIME_BEHAVIOR_FAILED | F03 error + product E2E FAIL | never claim product-ready from F02-only pass |

Diagnostics may include path, module kind, trusted capability ref, pinned digest and attempt count, never raw intent, DO_NOT_PERSIST value, secret or candidate payload. The public error envelope retains request_id and stable code; no fake new F02 codes.

## 8. Failures, user recovery, security and economics

Independent error stages with safe code + machine path (no secrets/raw prompt):
- `PLAN_SCHEMA_INVALID`: malformed extra fields, invalid enum/limits; fail before F02/DB.
- `PLAN_UNTRUSTED_REFERENCE`: unmatched requirement, changed provenance, injected capability/hidden secret; preserve intent, no fabricated state.
- `PLAN_SEMANTIC_MISMATCH`: required material feature cannot be faithfully represented, mismatched values or unknown field interaction; return clarification/unsupported rather than auto-drop.
- `COMPOSITION_UNSUPPORTED`: missing certified module/profile, missing F04 capability in pinned selection, unknown event/action contract, selected release mismatch; return user-visible capability gap, not technical Prompt rewrite request.
- `LOWERING_TYPE_INVALID`: state/op/scope/event/type incompatibility; internal assembly fault, retain original intent, no F02 bypass.
- `LOWERING_GRAPH_INVALID`: duplicate/nonreachable node, repeat placement, invalid alias, cycle or over-budget graph; internal assembly fault, do not ask user to change their words.
- `F02_REJECTED`: F02 independent failure, preserve report/evidence, classify existing F01 §17 error and stop.
- `RUNTIME_BEHAVIOR_FAILED`: F03 admitted but user-visible behavior differs, product E2E FAIL (not CREATE success for milestone reporting).

Implement these as F01 server-owned *subreasons* in a versioned error detail object mapped through existing public F01 errors, never as invented F02/F03 trust codes. Distinguish USER_REQUIRED_CLARIFICATION vs PLATFORM_ASSEMBLY_FAILURE in F00/S02/F12; technical errors preserve original text and suggest retry later rather than 'modify prompt'. If feature genuinely unsupported, clearly name it and offer only truthful options.

**Cost**: Prompt A remains existing bounded analysis. Prompt B may retry a malformed provider output at most per F01 §16; validation-driven recompose budget is EXACTLY 1 per logical compile, shared across lease takeovers, and total provider calls must fit request deadline. No automatic paid CI calls on push, no silent expensive fallback or automatic multishot attempts. Staging must record input/output tokens, latency, attempt count and cost estimate (not raw prompt); staging output token caps are NOT a monetary USD cap. First run free fixtures, contract tests and scripted browser; only then one deliberately triggered real-model + PG + browser trial.

**Security**: user-provided text never controls F04 selection/version without trusted resolver; no arbitrary code, network handler, SQL, DOM event callback or executable ValueSource allowed. Only local allowlisted actions. F02 permission/resource enforcement unchanged. F03 normal interactions do not call any model or send provider keys to browser. No raw DO_NOT_PERSIST data in persisted plan, Blueprint, logs or report.

## 9. Compatibility, versioning and migration

The new plan is a distinct internal artifact `CompositionPlanV1` at plan_version `1.0.0`, and changes the Prompt B output mode. It is NOT an F02 Blueprint schema bump; Blueprint remains 1.0.0. Do not feed old Blueprint-shaped provider JSON into Plan parser. Introduce new PROMPT_B_VERSION for new mode and tagged operation context; old validated Blueprints stay immutable/admitted on their pinned F04 release. New Staging pathway first, one PR #419; no silent Production/older-client activation, no main Build Spec edits. Plan storage is not an external API nor a replacement for original Intent; if compiler_run evidence persists internal plan metadata, it must be versioned, bounded and scrubbed.

F04 certified composition profile is a versioned generated artifact from canonical Registry definitions with exact immutable digest; when it changes executable meaning, bump appropriate semantic version/ledger identity per F04 §§8–10; no in-place same-version drift. Build Spec BS-P1-025 remains untouched; only after material Design Delta Human approval and exact source-commit pin can BS-P1-026 be projected/locked.

## 10. Test mapping — machine-checkable acceptance

| ID | Test evidence / assertions | Fail condition |
|---|---|---|
| F01-AC-030 | Schema positive/negative cases; malicious extra keys rejected; selected/ref identity; plan parse/typing; deterministic byte-equivalence | Unknown key/secret/custom code accepted |
| F01-AC-031 | 50 seeded PlanV1 variants per certified family and combination; stable rooted graph/event/action/types/repeat; independent F02 V01–V12 PASS; F03 typed interaction | Orphans, wrong row, hidden failure |
| F01-AC-032 | One and only one validation recompose, bound retry/timeout, 0 model calls in free tests, intent retained | Third paid candidate or automatic charge |
| F01-AC-033 | At least 30 distinct short prompts with scripted-model free browser integration spanning all four modules, plus one explicitly authorized bounded real-model + PG + Browser E2E per certified family before release; disclose numerator/denominator by family and proof tier | Fixture/Hello World counted as real E2E; paid requests triggered automatically |
| F01-AC-034 | Unsupported record/calendar/remote/durable requests must be honest, no fabricated button or hidden feature dropping | False FULLY_SUPPORTED App |
| F00-AC-040 | Browser A/B/C: create 3, complete B, remove A, total2 completed1; state/UI result | Mistaken row or wrong count |
| F03-AC-039 | Runtime repeated row index targeting, empty list, repeated first/last, append-full boundary, zero interaction LLM | Stale/out-of-bounds/first-only mutation |
| F04-AC-020 | Selected exact refs and digest match generated machine artifact; missing role/version/revoked/mismatched handler fail | Manually duplicated semantics bypassed |
 
Every test must have exact commit SHA, fixture/prompt version, intended provider cost mode, F02 content hash, observed state-before/after, failure code and independent pass/fail evidence. Product success must not be reported from individual unit/API test counts.

## 11. Non-negotiable completion checklist

- [ ] This schema, semantic checks, capability role closure and deterministic lowering algorithm implemented in TypeScript and tested *without paid model*.
- [ ] Generated F02 candidate for all four certified modules and cross-module composition validated by independent F02 V01–V12 with pinned Registry.
- [ ] F03 generated RECORD_LIST A/B/C add/toggle/delete/total/completed asserts PASS, including empty/full lists and no model interaction.
- [ ] F01 retry count exactly aligned with one validation recompose; F00 recovery tells the truth without blaming the user's wording.
- [ ] 30 distinct short natural-language prompts in cost-free scripted-model runs tracked by family; real-model trials separately and explicitly cost-authorized only after free gates PASS, reporting real and simulated success fractions separately.
- [ ] Design Delta approved and Design integrity PASS; new exact-source Build Spec projection reviewed; never mutate BS-P1-025.

**Release truth**: Spec contract finalized for implementation review ≠ feature implemented ≠ F02 passed ≠ real product E2E PASS ≠ Design approved Build Freeze. BD-026 remains PROPOSED until explicitly reviewed.

## Appendix A — Normative F04 certificate generation

The F04 generator MUST emit exactly one pattern per kind DISPLAY/FORM/ARITHMETIC/RECORD_LIST; duplicate kind/role is forbidden by semantic validation beyond JSON Schema. Its canonical profile source is an F04-owned semantic role-recipe table, merged at build time against existing F04 ValidatorContract and RuntimeRegistry; it MUST NOT duplicate field schemas or replace F04. Roles required by pattern (exact current capability IDs) are DISPLAY root=layout.container, text=content.text; FORM root=layout.container, text_input=input.text, number_input=input.number, toggle_input=input.toggle, reset_button=action.button; ARITHMETIC root=layout.container, number_input=input.number, stat=data.stat; RECORD_LIST root=layout.container, text_input=input.text, button=action.button, text=content.text, list=content.list, stat=data.stat. Versions are pinned by F04, not hard-coded as 1.0.0. A FORM module only needs roles for fields actually present, not every possible field kind. Each role execution_contract_digest MUST equal F04's canonical digest for its exact capability ref. All role refs must be ENABLED/ACTIVE with verified bundled runtime handlers.

`operators` MUST be a subset of the actual F02/F03 allowlist used by that recipe; `fixture_digests` represent versioned golden/negative test vectors that gate certification. `limits` only restrict existing F02/F04 resource ceilings. `profile_digest` = sha256: lowercase hex SHA-256 of canonical JSON of the entire certificate **excluding profile_digest**, including exact F04 release tuple. F04 digest canonicalization follows its existing key-sorted compact UTF-8 rule, no alternate serializer. Same exact source + pinned release MUST generate byte-identical certificate. A digest mismatch, missing handler/validator, invalid role or uncertified interaction MUST fail-closed before paid provider invocation; never allow the model to forge certificate metadata. F04 coverage must derive role dependency closure from trusted semantic requirements, not provider-selected capabilities. No production release may rely on this proposal before explicit new Registry/Baseline versioning.

