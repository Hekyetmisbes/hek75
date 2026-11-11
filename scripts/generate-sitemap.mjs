// scripts/generate-sitemap.mjs
// Deterministic Build-Time XML Sitemap Generator for hek75.com
// Dynamically extracts verified last modification dates from git history.

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const siteUrl = 'https://hek75.com';

function getGitLastMod(relativeFilePath) {
  try {
    const fullPath = path.resolve(relativeFilePath);
    if (!fs.existsSync(fullPath)) return null;
    const date = execSync(`git log -1 --format=%cs -- "${relativeFilePath}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore']
    }).trim();
    // Validate YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
  } catch {
    // If git is not available or shallow clone without history, return null
  }
  return null;
}

// Canonical indexable routes with their source files
const routes = [
  { path: '/', file: 'src/pages/index.astro', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects/', file: 'src/pages/projects/index.astro', priority: '0.9', changefreq: 'weekly' },
  { path: '/player/', file: 'src/pages/player.astro', priority: '0.9', changefreq: 'weekly' },
  { path: '/products/', file: 'src/pages/products/index.astro', priority: '0.85', changefreq: 'weekly' },
  { path: '/products/litecast/', file: 'src/pages/products/litecast.astro', priority: '0.85', changefreq: 'weekly' },
  { path: '/products/litecast/changelog/', file: 'src/pages/products/litecast/changelog.astro', priority: '0.7', changefreq: 'monthly' },
  { path: '/products/closemeet-lite/', file: 'src/pages/products/closemeet-lite.astro', priority: '0.85', changefreq: 'weekly' },
  { path: '/products/closemeet-lite/changelog/', file: 'src/pages/products/closemeet-lite/changelog.astro', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact/', file: 'src/pages/contact.astro', priority: '0.8', changefreq: 'monthly' },

  // Project Case Studies (Content sourced from src/data/games.ts)
  { path: '/projects/the-final-loop/', file: 'src/data/games.ts', priority: '0.85', changefreq: 'monthly' },
  { path: '/projects/fog-bridge/', file: 'src/data/games.ts', priority: '0.85', changefreq: 'monthly' },
  { path: '/projects/the-unlit-door/', file: 'src/data/games.ts', priority: '0.85', changefreq: 'monthly' },
  { path: '/projects/delivery-driver/', file: 'src/data/games.ts', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects/the-platform/', file: 'src/data/games.ts', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects/flag-quiz-game/', file: 'src/data/games.ts', priority: '0.75', changefreq: 'monthly' },
  { path: '/projects/movidle-game/', file: 'src/data/games.ts', priority: '0.75', changefreq: 'monthly' },
  { path: '/projects/ribbon-bloom/', file: 'src/data/games.ts', priority: '0.85', changefreq: 'monthly' },
  { path: '/projects/tiny-tide-harbor/', file: 'src/data/games.ts', priority: '0.85', changefreq: 'monthly' },

  // Presentation & Pitch Decks
  { path: '/projects/thefinalloop/', file: 'public/projects/thefinalloop/index.html', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects/theunlitdoor/', file: 'public/projects/theunlitdoor/index.html', priority: '0.7', changefreq: 'monthly' }
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => {
    const lastMod = getGitLastMod(r.file);
    const lastModXml = lastMod ? `\n    <lastmod>${lastMod}</lastmod>` : '';
    return `  <url>
    <loc>${siteUrl}${r.path}</loc>${lastModXml}
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

// Write to public/ and root and dist/ (if exists)
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.resolve('sitemap.xml'), sitemapXml, 'utf-8');
if (fs.existsSync(path.resolve('dist'))) {
  fs.writeFileSync(path.resolve('dist/sitemap.xml'), sitemapXml, 'utf-8');
}

console.log(`✔ Generated sitemap.xml with ${routes.length} verified canonical URLs.`);
