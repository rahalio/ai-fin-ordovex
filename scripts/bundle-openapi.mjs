#!/usr/bin/env node
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const domains = [
  'identity',
  'strategies',
  'certifications',
  'limits',
  'pretrade',
  'telemetry',
  'kills',
  'concentration',
  'incidents',
  'health',
];

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'openapi-core');
const bundled = join(pkgRoot, 'src', '.bundled');
mkdirSync(bundled, { recursive: true });

for (const domain of domains) {
  for (const [ext, file] of [
    ['yaml', `${domain}.openapi.yaml`],
    ['json', `${domain}.json`],
  ]) {
    const out = join(bundled, file);
    const result = spawnSync(
      'pnpm',
      ['exec', 'redocly', 'bundle', domain, '--output', out],
      { cwd: pkgRoot, stdio: 'inherit' },
    );
    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
    void ext;
  }
}
