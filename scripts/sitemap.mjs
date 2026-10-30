// Post-build: writes dist/sitemap.xml from the pre-rendered routes.
import { readdir, writeFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const SITE = (process.env.VITE_SITE_URL ?? 'https://blizad.in').replace(/\/$/, '')
const EXCLUDE = new Set(['/404'])

async function findPages(dir, base = '') {
  const pages = []
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry)
    if ((await stat(full)).isDirectory()) pages.push(...(await findPages(full, `${base}/${entry}`)))
    else if (entry === 'index.html') pages.push(base || '/')
  }
  return pages
}

const pages = (await findPages('dist')).filter((page) => !EXCLUDE.has(page)).sort()
const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${SITE}${page === '/' ? '/' : page}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
await writeFile('dist/sitemap.xml', xml)
console.log(`sitemap.xml: ${pages.length} URLs`)
