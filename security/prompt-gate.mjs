// BT-PIG-001: advisory content classifier; NOT an authorization or execution gate.
// Never execute, evaluate, or interpolate input into a shell command.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const SENSITIVE_PATHS = Object.freeze([
  '.github/workflows/', '.github/CODEOWNERS', 'security/', 'scripts/',
  'package.json', 'package-lock.json'
]);
export const UNTRUSTED_SOURCES = Object.freeze([
  'pull_request_body','issue_comment','external_webpage','retrieved_document',
  'tool_output','dependency_readme','repository_document'
]);
const signals = [
  ['role_spoof', /(?:^|\n)\s*(?:system|developer|assistant)\s*:/i],
  ['instruction_override', /ignore (?:all )?(?:previous|prior|above) instructions/i],
  ['credential_request', /(?:print|exfiltrate|upload|send|reveal|dump)\s+(?:the\s+)?(?:secrets?|tokens?|credentials?|private keys?)/i],
  ['policy_bypass', /(?:disable|bypass|skip)\s+(?:the\s+)?(?:approval|security checks?|branch protection|authorization)/i],
  ['tool_impersonation', /(?:tool result|function result|administrator override)\s*:/i]
];
export function inspectUntrusted(input, source) {
  if (!UNTRUSTED_SOURCES.includes(source)) throw new Error('unknown source: fail closed');
  if (typeof input !== 'string') throw new TypeError('input must be text');
  const hits = signals.filter(([,pattern]) => pattern.test(input)).map(([id])=>id);
  return { source, trust:'untrusted', disposition:hits.length?'REVIEW':'NO_PATTERN_DETECTED',
    signals:hits, authorityGranted:false };
}
export function authorize(action, context) {
  // Explicitly reject: local classifier cannot grant consequence authority.
  return {allowed:false, reason:'EXTERNAL_AUTHORIZATION_REQUIRED',
    action:String(action), context:String(context ?? '')};
}
export function checkManifest() {
  const workflow = readFileSync(resolve(root,'.github/workflows/prompt-injection-gate.yml'),'utf8');
  if (!/permissions:\s*\n\s*contents: read/.test(workflow)) throw new Error('read-only workflow missing');
  if (/pull_request_target\s*:/.test(workflow)) throw new Error('unsafe privileged PR trigger');
  if (!existsSync(resolve(root,'security/prompt-gate.test.mjs'))) throw new Error('tests missing');
  return true;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url) && process.argv.includes('--check')) {
  checkManifest();
  console.log('Manifest checks complete. External enforcement NOT TESTED.');
}
