#!/usr/bin/env node
// bin/eslint-config.js

import process from 'node:process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import createEslintConfig from './index.js';

async function loadConfig() {
  try {
    const configPath = path.join(process.cwd(), 'eslint.config.ts');
    const configModule = await import(pathToFileURL(configPath).href);
    return configModule.default;
  } catch (error) {
    console.error('❌ Error loading eslint.config.ts:');
    console.error(error instanceof Error ? error.message : String(error));
    console.error('\nExpected format:\nimport { createEslintConfig } from \'@munirmardinli-dev/eslint\';\n\nexport default createEslintConfig({...});');
    process.exit(1);
  }
}

async function runLint() {
  const config = await loadConfig();
  const { ESLint } = await import('eslint');
  
  const eslint = new ESLint({
    overrideConfig: typeof config === 'function' ? config() : createEslintConfig(config),
    overrideConfigFile: true,
    fix: process.argv.includes('--fix')
  });

  const results = await eslint.lintFiles(['**/*.{js,ts,tsx}']);
  const formatter = await eslint.loadFormatter('stylish');
  console.log(formatter.format(results));

  if (results.some(r => r.errorCount > 0)) process.exit(1);
}

// Minimal CLI
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: munir-eslint [--fix]

Options:
  --fix    Automatically fix problems
  --help   Show this help
`);
  process.exit(0);
}

runLint().catch(error => {
  console.error('Linting failed:', error instanceof Error ? error.message : String(error));
  process.exit(1);
});