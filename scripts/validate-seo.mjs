// scripts/validate-seo.mjs
// Automated Build-Time SEO & Link Validator for hek75.com

import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Please run build first.');
  process.exit(1);
}

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`\n🔍 Validating SEO for ${htmlFiles.length} HTML files in dist/...\n`);

let errors = [];
let warnings = [];
const titlesMap = new Map();

// Known redirect or utility pages that do not require full metadata
const excludedPages = ['/about', '/skills', '/games', '/multiplayer'];

for (const filePath of htmlFiles) {
  const relPath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const urlPath = '/' + relPath.replace(/(^|\/)index\.html$/, '$1');

  // Skip redirect files or internal charts
  if (excludedPages.some(p => urlPath.startsWith(p)) || relPath.includes('_gantt') || relPath.includes('_chart')) {
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // 1. Title Check
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`[${urlPath}] Missing <title> tag`);
  } else {
    const title = titleMatch[1].trim();
    if (titlesMap.has(title)) {
      warnings.push(`[${urlPath}] Duplicate title: "${title}" (also in ${titlesMap.get(title)})`);
    } else {
      titlesMap.set(title, urlPath);
    }
  }

  // 2. Meta Description Check (Only for main site pages, pitch decks optional)
  const isMainSite = !urlPath.startsWith('/projects/thefinalloop') && !urlPath.startsWith('/projects/theunlitdoor') && !urlPath.startsWith('/projects/easter-egg');
  if (isMainSite) {
    const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i)
      || content.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*>/i);
    if (!descMatch || !descMatch[1].trim()) {
      errors.push(`[${urlPath}] Missing <meta name="description"> tag`);
    }
  }

  // 3. Canonical URL Check
  if (isMainSite && !urlPath.includes('404')) {
    const canonMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([\s\S]*?)["'][^>]*>/i);
    if (!canonMatch || !canonMatch[1].trim()) {
      errors.push(`[${urlPath}] Missing <link rel="canonical"> tag`);
    } else {
      const canon = canonMatch[1].trim();
      if (!canon.startsWith('https://hek75.com')) {
        errors.push(`[${urlPath}] Canonical URL does not match canonical domain: ${canon}`);
      }
      if (!canon.endsWith('/') && !canon.includes('.html')) {
        warnings.push(`[${urlPath}] Canonical URL missing trailing slash: ${canon}`);
      }
    }
  }

  // 4. Single H1 Check
  if (isMainSite && !urlPath.includes('404')) {
    const h1Matches = [...content.matchAll(/<h1[^>]*>/gi)];
    if (h1Matches.length === 0) {
      errors.push(`[${urlPath}] Missing <h1> heading`);
    } else if (h1Matches.length > 1) {
      warnings.push(`[${urlPath}] Multiple <h1> headings found (${h1Matches.length})`);
    }
  }

  // 5. Image Alt Check
  const imgMatches = [...content.matchAll(/<img([^>]*)>/gi)];
  for (const img of imgMatches) {
    if (!img[1].includes('alt=')) {
      warnings.push(`[${urlPath}] <img> tag missing alt attribute: ${img[0].slice(0, 50)}...`);
    }
  }
}

// 6. Robots.txt and Sitemap.xml Check
const robotsPath = path.join(distDir, 'robots.txt');
const sitemapPath = path.join(distDir, 'sitemap.xml');

if (!fs.existsSync(robotsPath)) {
  errors.push('Missing dist/robots.txt');
} else {
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  if (!robots.includes('sitemap.xml')) {
    warnings.push('dist/robots.txt does not mention sitemap.xml');
  }
}

if (!fs.existsSync(sitemapPath)) {
  errors.push('Missing dist/sitemap.xml');
} else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const locs = [...sitemap.matchAll(/<loc>(https:\/\/hek75\.com[^<]+)<\/loc>/g)].map(m => m[1]);
  for (const loc of locs) {
    const route = loc.replace('https://hek75.com', '');
    const candidate1 = path.join(distDir, route, 'index.html');
    const candidate2 = path.join(distDir, route);
    if (!fs.existsSync(candidate1) && !fs.existsSync(candidate2)) {
      errors.push(`Sitemap URL does not resolve to dist output: ${loc}`);
    }
  }
}

console.log('--- SEO VALIDATION RESULTS ---');
if (warnings.length > 0) {
  console.log(`\n⚠ Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log('  ' + w));
}

if (errors.length > 0) {
  console.error(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.error('  ' + e));
  process.exit(1);
} else {
  console.log('\n✔ All critical SEO checks passed cleanly! Zero errors found.\n');
}
