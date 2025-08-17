#!/usr/bin/env node
import { ESLint } from "eslint";
import path from "node:path";
import { createRequire } from "node:module";

async function run() {
  try {
    const require = createRequire(import.meta.url);
    const projectConfigPath = path.resolve(process.cwd(), "eslint.config.ts");
    const projectConfig = require(projectConfigPath);
    const eslint = new ESLint({
      overrideConfig: projectConfig.default || projectConfig,
      overrideConfigFile: true,
      fix: process.argv.includes("--fix"),
    });

    const patterns = process.argv.slice(2).filter((arg) => arg !== "--fix");
    const results = await eslint.lintFiles(patterns);
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    console.log(resultText);

    if (results.some((r) => r.errorCount > 0)) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

run();
