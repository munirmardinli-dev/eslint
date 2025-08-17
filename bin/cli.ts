#!/usr/bin/env node
import { ESLint } from 'eslint';
import process from 'node:process';

import createEslintConfig from '../index.js';

async function main() {
  const args = process.argv.slice(2);
  const fix = args.includes('--fix');
  const files = args.filter(arg => !arg.startsWith('--'));

  try {
    const eslint = new ESLint({
      overrideConfig: createEslintConfig({
        files: ['**/*.{js,jsx,ts,tsx,json,yml,yaml}'],
        ignores: ['node_modules/', 'dist/', 'build/', 'coverage/', '*.d.ts'],
        project: './tsconfig.json'
      }),
      fix,
      cache: !args.includes('--no-cache'),
    });

    const results = await eslint.lintFiles(files.length ? files : ['.']);
    const formatter = await eslint.loadFormatter('stylish');
    console.log(formatter.format(results));

    if (results.some(r => r.errorCount > 0)) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(2);
  }
}

main();