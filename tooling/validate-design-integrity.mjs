#!/usr/bin/env node
// APPf2 Design integrity gate — proposal only until Human-approved PR.
// Reads Design SSOT; never edits working/, Build, Task, Sprint, or GitHub.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const CATEGORIES = Object.freeze(['CONTRACT', 'BEHAVIOR', 'END_TO_END', 'RUNTIME_EVIDENCE', 'HUMAN_REVIEW']);
const STATUS = new Set(['ACTIVE', 'SUPERSEDED', 'DEPRECATED']);
const REGISTRY = 'working/detailed-design/registries/acceptance-test-registry.json';
const CONVENTIONS = 'working/common-core/ACCEPTANCE-CONVENTIONS.md';
const SCHEMA = 'APPF2-DESIGN-INTEGRITY-V1';
const sha256 = b => createHash('sha256').update(b).digest('hex');
const text = x => typeof x === 'string' && x.trim().length > 0;

function checkRoot(root) {
  const failures = [];
  const check = (condition, code, detail) => { if (!condition) failures.push({ code, detail }); };
  const fileBytes = p => {
    try { return fs.readFileSync(path.join(root, p)); }
    catch { check(false, 'FILE_MISSING', p); return null; }
  };
  const ssot = fileBytes('SSOT.md');
  const readme = fileBytes('README.md');
  const conventions = fileBytes(CONVENTIONS);
  const registryBytes = fileBytes(REGISTRY);
  check(fs.existsSync(path.join(root, 'working')) && fs.statSync(path.join(root, 'working')).isDirectory(),
    'WORKING_MISSING', 'Design Current Truth must reside in working/');
  for (const retired of ['spec', 'execution']) {
    check(!fs.existsSync(path.join(root, retired)), 'RETIRED_ROOT_PRESENT', retired + '/');
  }
  if (ssot) check(ssot.includes('working/'), 'SSOT_OWNER_MISSING', 'SSOT.md missing working/ owner');
  if (readme) check(readme.includes('working/'), 'README_OWNER_MISSING', 'README.md missing working/ owner');
  if (conventions) {
    const doc = conventions.toString('utf8');
    for (const scope of CATEGORIES) {
      check(new RegExp('(^|\\n)' + scope + '(?=\\s|\\n)', 'm').test(doc),
        'CONVENTIONS_SCOPE_MISSING', scope);
    }
  }
  let registry;
  if (registryBytes) {
    try { registry = JSON.parse(registryBytes.toString('utf8')); }
    catch (e) { check(false, 'REGISTRY_INVALID_JSON', String(e.message)); }
  }
  const entries = Array.isArray(registry?.entries) ? registry.entries : [];
  if (registryBytes && !Array.isArray(registry?.entries)) {
    check(false, 'REGISTRY_ENTRIES_MISSING', 'entries must be an array');
  }
  check(Number.isSafeInteger(registry?.total_acceptance) && registry.total_acceptance === entries.length,
    'REGISTRY_COUNT_MISMATCH', `declared ${registry?.total_acceptance ?? 'missing'} vs actual ${entries.length}`);
  check(registry?.owner === REGISTRY, 'REGISTRY_OWNER_MISMATCH', `owner must be ${REGISTRY}`);
  check(registry?.conventions === CONVENTIONS, 'REGISTRY_CONVENTIONS_MISMATCH', `conventions must be ${CONVENTIONS}`);
  const ids = new Set(), tests = new Set();
  const allowed = new Set(CATEGORIES);
  entries.forEach((item, index) => {
    const id = item?.acceptance_id || `[index=${index}]`;
    if (!/^F\d\d-AC-\d{3}$/.test(id)) check(false, 'INVALID_ACCEPTANCE_ID', id);
    if (ids.has(id)) check(false, 'DUPLICATE_ACCEPTANCE_ID', id);
    ids.add(id);
    if (!/^F\d\d$/.test(item?.function_id || '') || !id.startsWith(item.function_id + '-'))
      check(false, 'FUNCTION_MISMATCH', id);
    if (!text(item?.criterion)) check(false, 'CRITERION_MISSING', id);
    if (!text(item?.test_id)) check(false, 'TEST_ID_MISSING', id);
    else if (tests.has(item.test_id)) check(false, 'DUPLICATE_TEST_ID', `${id}: ${item.test_id}`);
    if (text(item?.test_id)) tests.add(item.test_id);
    if (!text(item?.expected_observable)) check(false, 'OBSERVABLE_MISSING', id);
    if (!STATUS.has(item?.contract_status)) check(false, 'INVALID_CONTRACT_STATUS', id);
    if (typeof item?.required_for_build_freeze !== 'boolean')
      check(false, 'REQUIRED_FLAG_INVALID', id);
    if (item?.contract_status !== 'ACTIVE' && item?.required_for_build_freeze === true)
      check(false, 'SUPERSEDED_STILL_REQUIRED', id);
    if (!allowed.has(item?.proof_scope))
      check(false, 'UNAPPROVED_PROOF_SCOPE', `${id}: ${item?.proof_scope ?? 'missing'}; allowed: ${CATEGORIES.join(', ')}`);
  });
  for (const item of entries) {
    for (const ref of item?.superseded_by || []) {
      if (!ids.has(ref)) check(false, 'SUPERSESSION_TARGET_MISSING', `${item.acceptance_id} -> ${ref}`);
    }
    if (item?.contract_status === 'SUPERSEDED' && !Array.isArray(item?.superseded_by))
      check(false, 'SUPERSESSION_TARGET_UNDECLARED', item.acceptance_id);
  }
  let gitSha = null;
  try { gitSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8', timeout: 3000, stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { /* local fixture may not be a git checkout; never invent a SHA. */ }
  return {
    schema: SCHEMA,
    verdict: failures.length ? 'FAIL' : 'PASS',
    evidence_level: 'DESIGN_REGISTRY_INTEGRITY_ONLY_NOT_PRODUCT_E2E',
    source_commit: gitSha,
    declared_acceptance: registry?.total_acceptance ?? null,
    observed_acceptance: entries.length,
    unique_acceptance: ids.size,
    unique_test_ids: tests.size,
    known_unapproved_scope_count: failures.filter(f => f.code === 'UNAPPROVED_PROOF_SCOPE').length,
    phase_1_freeze_status: registry?.phase_1_freeze_audit?.status ?? null,
    file_sha256: {
      registry: registryBytes ? sha256(registryBytes) : null,
      conventions: conventions ? sha256(conventions) : null,
    },
    failures,
    gate_rule: 'Unknown proof scope fails closed; never silently reinterpret or modify Product Design truth.',
  };
}

function selftest() {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'appf2-design-gate-'));
  const setFile = (p, content) => {
    const dest = path.join(folder, p);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, content);
  };
  const row = (id, scope = 'CONTRACT') => ({
    acceptance_id: id, function_id: id.slice(0, 3), criterion: 'Observable case',
    test_id: 'TEST-' + id, expected_observable: 'Observable test result',
    contract_status: 'ACTIVE', proof_scope: scope, required_for_build_freeze: true,
  });
  const fixture = (...entries) => ({
    owner: REGISTRY, conventions: CONVENTIONS,
    total_acceptance: entries.length, entries,
  });
  try {
    setFile('SSOT.md', 'working/ is Product Design Current Truth');
    setFile('README.md', 'working/ is authoritative');
    setFile(CONVENTIONS, '~~~text\n' + CATEGORIES.join('\n') + '\n~~~');
    const run = (expect, expectedCode, value) => {
      setFile(REGISTRY, JSON.stringify(value));
      const x = checkRoot(folder);
      if (x.verdict !== expect || (expectedCode && !x.failures.some(e => e.code === expectedCode)))
        throw new Error(`SELFTEST FAILURE ${expect}/${expectedCode || '-'} got ${JSON.stringify(x.failures)}`);
    };
    run('PASS', null, fixture(row('F00-AC-001')));
    run('FAIL', 'UNAPPROVED_PROOF_SCOPE', fixture(row('F01-AC-004', 'API')));
    run('FAIL', 'DUPLICATE_ACCEPTANCE_ID', fixture(row('F00-AC-001'), row('F00-AC-001')));
    run('FAIL', 'DUPLICATE_TEST_ID', fixture(row('F00-AC-001'), { ...row('F00-AC-002'), test_id: 'TEST-F00-AC-001' }));
    run('FAIL', 'OBSERVABLE_MISSING', fixture({ ...row('F00-AC-001'), expected_observable: '' }));
    run('FAIL', 'SUPERSEDED_STILL_REQUIRED', fixture({ ...row('F00-AC-001'), contract_status: 'SUPERSEDED', superseded_by: ['F00-AC-002'] }, row('F00-AC-002')));
    console.log('DESIGN GATE SELFTEST PASS: 6 real pure-validator cases (one positive, five negative)');
  } finally { fs.rmSync(folder, { recursive: true, force: true }); }
}

function main(args) {
  if (args.includes('--selftest')) { selftest(); return; }
  const value = flag => {
    const i = args.indexOf(flag);
    if (i >= 0 && !args[i + 1]) throw new Error(`${flag} requires a value`);
    return i < 0 ? null : args[i + 1];
  };
  const root = path.resolve(value('--root') || '.');
  const out = value('--out');
  const result = checkRoot(root);
  const output = JSON.stringify(result, null, 2) + '\n';
  if (out) { fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true }); fs.writeFileSync(out, output); }
  console.log(output);
  if (result.verdict !== 'PASS') process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (e) { console.error('DESIGN_INTEGRITY_HARD_STOP: ' + String(e.message || e)); process.exitCode = 1; }
}

export { checkRoot, CATEGORIES, REGISTRY, CONVENTIONS };
