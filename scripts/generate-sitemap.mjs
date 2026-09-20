// scripts/generate-sitemap.mjs
// Deterministic Build-Time XML Sitemap Generator for hek75.com

import fs from 'fs';
import path from 'path';

const siteUrl = 'https://hek75.com';
const currentDate = '2026-09-20'; // Current release date

// Canonical indexable routes (Excludes 404, redirects /about, /skills, /games, /multiplayer, and easter eggs)
const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects/', priority: '0.9', changefreq: 'weekly' },
  { path: '/player/', priority: '0.9', changefreq: 'weekly' },
  { path: '/products/', priority: '0.85', changefreq: 'weekly' },
  { path: '/products/litecast/', priority: '0.85', changefreq: 'weekly' },
  { path: '/products/litecast/changelog/', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.8', changefreq: 'monthly' },

  // Project Case Studies
  { path: '/projects/the-final-loop/', priority: '0.85', changefreq: 'monthly' },
  { path: '/projects/fog-bridge/', priority: '0.85', changefreq: 'monthly' },
  { path: '/projects/the-unlit-door/', priority: '0.85', changefreq: 'monthly' },
  { path: '/projects/delivery-driver/', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects/the-platform/', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects/flag-quiz-game/', priority: '0.75', changefreq: 'monthly' },
  { path: '/projects/movidle-game/', priority: '0.75', changefreq: 'monthly' },

  // Presentation & Pitch Decks
  { path: '/projects/thefinalloop/', priority: '0.7', changefreq: 'monthly' },
  { path: '/projects/theunlitdoor/', priority: '0.7', changefreq: 'monthly' }
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${siteUrl}${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

// Write to public/ and root and dist/ (if exists)
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.resolve('sitemap.xml'), sitemapXml, 'utf-8');
if (fs.existsSync(path.resolve('dist'))) {
  fs.writeFileSync(path.resolve('dist/sitemap.xml'), sitemapXml, 'utf-8');
}

console.log(`✔ Generated sitemap.xml with ${routes.length} canonical URLs.`);
