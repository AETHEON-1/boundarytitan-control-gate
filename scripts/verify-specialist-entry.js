#!/usr/bin/env node
// Static, bounded specialist-entry checks. Not a browser or WCAG certification.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const page = fs.readFileSync('visual/specialists.html', 'utf8');
const root = process.cwd();
const matches = [...page.matchAll(/\bhref="([^"]+)"/g)].map(m => m[1]);
const local = matches.filter(h => !/^(https?:|#|mailto:)/.test(h));
const missing = local.filter(h => !fs.existsSync(path.resolve(root, 'visual', h.split('#')[0])));
assert.deepEqual(missing, [], 'Broken local file targets');
for (const id of ['main', 'understand', 'explore', 'test', 'challenge', 'evidence']) {
  assert.match(page, new RegExp('\\bid="' + id + '"'), 'Missing anchor: ' + id);
}
for (const href of matches.filter(h => h.startsWith('#'))) {
  assert.match(page, new RegExp('\\bid="' + href.slice(1) + '"'), 'Broken in-page anchor: ' + href);
}
for (const required of ['lang="en"', 'name="viewport"', 'Skip to main content', 'aria-label="Page sections"', ':focus-visible', 'prefers-reduced-motion', '<main', '<nav', '<h1', '<table', '<caption']) {
  assert.ok(page.includes(required), 'Missing accessibility/navigation marker: ' + required);
}
for (const cmd of ['git clone', 'npm ci', 'npm run typecheck', 'npm test -- --coverage=false', 'npm run test:python', 'npm run verify:state']) {
  assert.ok(page.includes(cmd), 'Missing reproduction step: ' + cmd);
}
for (const scriptName of ['typecheck', 'test', 'test:python', 'verify:state']) {
  assert.ok(Object.hasOwn(require('../package.json').scripts, scriptName), 'Undeclared command: ' + scriptName);
}
assert.ok(!/<script\b/i.test(page), 'Public specialist entry should have no executable script');
assert.ok(!/<form\b/i.test(page), 'Public specialist entry should not submit data');
console.log('Specialist entry static checks PASS: ' + local.length + ' local links, ' + matches.filter(h => h.startsWith('#')).length + ' section links, five sections, reproduction commands and basic accessibility markers.');
console.log('LIMITATION: No browser, screen reader, human newcomer or WCAG audit was performed.');
