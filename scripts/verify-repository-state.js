#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const childProcess = require('child_process');

const root = path.resolve(__dirname, '..');
const currentManifestName = 'CURRENT-REPOSITORY-MANIFEST.json';
const currentManifestPath = path.join(root, currentManifestName);
const releaseManifestPath = path.join(root, 'RELEASE_CANDIDATE_MANIFEST.json');
const releaseChecksPath = path.join(root, 'RELEASE_CANDIDATE_CHECKS.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function repositoryFiles() {
  const output = childProcess.execFileSync(
    'git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
    { cwd: root }
  );
  return output.toString('utf8').split('\0').filter(Boolean);
}

function digest(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function currentEntries() {
  return repositoryFiles()
    .filter((file) => file !== currentManifestName)
    .map((file) => {
      const filePath = path.join(root, file);
      return {
        path: file,
        size_bytes: fs.statSync(filePath).size,
        sha256: digest(filePath),
      };
    });
}

function writeCurrentManifest() {
  const manifest = {
    artifact: 'BoundaryTitan current repository tree',
    version: '0.1.0',
    scope: 'tracked working tree, excluding this self-referential manifest',
    machine_certification: false,
    deployment_authority: false,
    files: currentEntries(),
  };
  fs.writeFileSync(currentManifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

function verifyCurrentManifest(errors) {
  if (!fs.existsSync(currentManifestPath)) {
    errors.push(`${currentManifestName} is missing; run with --write to create it`);
    return;
  }

  const manifest = readJson(currentManifestPath);
  if (manifest.machine_certification !== false || manifest.deployment_authority !== false) {
    errors.push(`${currentManifestName} must not claim certification or deployment authority`);
  }

  const expected = currentEntries();
  const actual = manifest.files || [];
  const expectedByPath = new Map(expected.map((entry) => [entry.path, entry]));
  const actualByPath = new Map(actual.map((entry) => [entry.path, entry]));

  for (const entry of expected) {
    const recorded = actualByPath.get(entry.path);
    if (!recorded) {
      errors.push(`current manifest is missing tracked file: ${entry.path}`);
      continue;
    }
    if (recorded.size_bytes !== entry.size_bytes || recorded.sha256 !== entry.sha256) {
      errors.push(`current manifest drift: ${entry.path}`);
    }
  }
  for (const entry of actual) {
    if (!expectedByPath.has(entry.path)) {
      errors.push(`current manifest lists untracked or missing file: ${entry.path}`);
    }
  }
}

function verifyStateMetadata(errors) {
  const release = readJson(releaseManifestPath);
  if (release.verification_scope !== 'historical_rc1_snapshot') {
    errors.push('release candidate manifest must identify itself as a historical snapshot');
  }
  if (release.current_repository_state_document !== 'CURRENT-REPOSITORY-STATE-v0.2.md') {
    errors.push('release candidate manifest must point to the current state document');
  }
  if (release.machine_certification !== false) {
    errors.push('release candidate manifest must keep machine_certification=false');
  }

  const checks = readJson(releaseChecksPath);
  if (checks.verification_scope !== 'historical_rc1_snapshot') {
    errors.push('release checks must identify their scope as historical_rc1_snapshot');
  }
  if (checks.current_repository_state_document !== 'CURRENT-REPOSITORY-STATE-v0.2.md') {
    errors.push('release checks must point to the current state document');
  }
  if (checks.current_tree_manifest !== currentManifestName) {
    errors.push(`release checks must point to ${currentManifestName}`);
  }
  if (checks.machine_certification !== false || checks.deployment_authority !== false) {
    errors.push('release checks must not claim certification or deployment authority');
  }
  if (checks.independent_verification !== 'not_performed') {
    errors.push('release checks must preserve independent_verification=not_performed');
  }
}

const errors = [];
if (process.argv.includes('--write')) {
  writeCurrentManifest();
}
verifyStateMetadata(errors);
verifyCurrentManifest(errors);

if (errors.length) {
  console.error('Repository state verification FAILED');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  const count = currentEntries().length;
  console.log(`Repository state verification passed: ${count} repository files; current tree ledger matches.`);
}
