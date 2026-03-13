#!/usr/bin/env node
/**
 * Обновляет или добавляет APP_VERSION= в .env.example, не трогая остальные переменные.
 * Вызов: node scripts/update-env-version.js <version>
 */

const fs = require('fs');
const path = require('path');

const version = process.argv[2];
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!version) {
  console.error('Usage: node update-env-version.js <version>');
  process.exit(1);
}

let content = '';
if (fs.existsSync(envExamplePath)) {
  content = fs.readFileSync(envExamplePath, 'utf8');
}

const newLine = `APP_VERSION=${version}`;
const appVersionRegex = /^APP_VERSION=.*$/m;

if (appVersionRegex.test(content)) {
  content = content.replace(appVersionRegex, newLine);
} else {
  content = content.trimEnd() + (content ? '\n' : '') + newLine + '\n';
}

fs.writeFileSync(envExamplePath, content);
console.log(`Updated .env.example: APP_VERSION=${version}`);
