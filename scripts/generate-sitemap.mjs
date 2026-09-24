import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITE_URL = 'https://decouvrirlaguadeloupe.com'.replace(/\/+$/, '');
const BLOG_DIR = path.join(rootDir, 'src', 'content', 'blog');
const PAGES_DIR = path.join(rootDir, 'src', 'content', 'pages');
const OUTPUT_SITEMAP = path.join(rootDir, 'public', 'sitemap.xml');

// Helper to extract frontmatter field
function getField(content, field) {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(field + ':')) {
      let val = trimmed.slice(field.length + 1).trim();
      val = val.replace(/^["'`]/, '').replace(/["'`]$/, '').trim();
      return val;
    }
  }
  return null;
}

async function generateSitemap() {
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${SITE_URL}/blog/`, priority: '0.9', changefreq: 'daily' },
    { loc: `${SITE_URL}/en/`, priority: '0.8', changefreq: 'daily' },
    { loc: `${SITE_URL}/es/`, priority: '0.8', changefreq: 'daily' },
    { loc: `${SITE_URL}/mentions-legales/`, priority: '0.3', changefreq: 'monthly' },
    { loc: `${SITE_URL}/politique-confidentialite/`, priority: '0.3', changefreq: 'monthly' },
  ];

  // Articles du blog
  if (fs.existsSync(BLOG_DIR)) {
    const blogFiles = await fsp.readdir(BLOG_DIR);
    for (const f of blogFiles) {
      if (!f.endsWith('.md')) continue;
      const content = await fsp.readFile(path.join(BLOG_DIR, f), 'utf-8');
      const draft = getField(content, 'draft') === 'true';
      if (draft) continue;

      const lang = getField(content, 'lang') || 'fr';
      const slug = path.basename(f, '.md');

      let loc = '';
      if (lang === 'en') {
        loc = `${SITE_URL}/en/${slug}/`;
      } else if (lang === 'es') {
        loc = `${SITE_URL}/es/${slug}/`;
      } else {
        loc = `${SITE_URL}/blog/${slug}/`;
      }

      urls.push({
        loc,
        priority: '0.8',
        changefreq: 'weekly'
      });
    }
  }

  // Pages statiques
  if (fs.existsSync(PAGES_DIR)) {
    const pageFiles = await fsp.readdir(PAGES_DIR);
    for (const f of pageFiles) {
      if (!f.endsWith('.md')) continue;
      const content = await fsp.readFile(path.join(PAGES_DIR, f), 'utf-8');
      const draft = getField(content, 'draft') === 'true';
      if (draft) continue;

      const lang = getField(content, 'lang') || 'fr';
      const slug = path.basename(f, '.md');

      let loc = '';
      if (lang === 'en') {
        loc = `${SITE_URL}/en/${slug}/`;
      } else if (lang === 'es') {
        loc = `${SITE_URL}/es/${slug}/`;
      } else {
        loc = `${SITE_URL}/${slug}/`;
      }

      urls.push({
        loc,
        priority: '0.6',
        changefreq: 'monthly'
      });
    }
  }

  // Dédupliquer les URLs
  const uniqueUrls = [];
  const seen = new Set();
  for (const item of urls) {
    if (!seen.has(item.loc)) {
      seen.add(item.loc);
      uniqueUrls.push(item);
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  await fsp.mkdir(path.dirname(OUTPUT_SITEMAP), { recursive: true });
  await fsp.writeFile(OUTPUT_SITEMAP, sitemapXml, 'utf-8');
  console.log(`🗺️  Sitemap XML généré avec succès dans public/sitemap.xml (${uniqueUrls.length} URLs indexées).`);
}

generateSitemap().catch(err => {
  console.error('Erreur lors de la génération du sitemap:', err);
  process.exit(1);
});
