// scripts/validate-security.mjs
// Fail the build if sensitive or server-only artifacts are accidentally published.

import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Please run the site build first.');
  process.exit(1);
}

const forbiddenBasenames = new Set([
  '.npmrc',
  '.netrc',
  'id_rsa',
  'id_dsa',
  'credentials.json',
  'wp-config.php',
]);

const forbiddenExtensions = new Set([
  '.bak',
  '.pem',
  '.key',
  '.sql',
  '.sqlite',
  '.sqlite3',
]);

function isSensitivePath(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/').toLowerCase();
  const segments = normalized.split('/');
  const basename = path.posix.basename(normalized);

  if (segments.includes('.git') || segments.includes('.svn') || segments.includes('.hg')) {
    return 'version-control metadata';
  }

  if (basename === '.env' || basename.startsWith('.env.')) {
    return 'environment file';
  }

  if (forbiddenBasenames.has(basename)) {
    return 'sensitive configuration/credential filename';
  }

  for (const extension of forbiddenExtensions) {
    if (basename.endsWith(extension)) {
      return `sensitive backup/key/database extension (${extension})`;
    }
  }

  if (basename.startsWith('wp-config.php.')) {
    return 'WordPress configuration backup';
  }

  return null;
}

function walk(dir, findings = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(distDir, fullPath);

    const reason = isSensitivePath(relativePath);
    if (reason) {
      findings.push({ relativePath, reason });
    }

    if (entry.isDirectory()) {
      walk(fullPath, findings);
    }
  }

  return findings;
}

const findings = walk(distDir);

console.log('\n🔐 Validating public build for sensitive artifacts...\n');

if (findings.length > 0) {
  console.error(`❌ Security validation failed. Found ${findings.length} sensitive artifact(s):`);
  for (const finding of findings) {
    console.error(`  - ${finding.relativePath}: ${finding.reason}`);
  }
  console.error('\nRemove these files from the public build before deploying.');
  process.exit(1);
}

console.log('✅ Security validation passed: no sensitive artifact filenames found in dist/.');
