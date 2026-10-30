// One-off: renders each live build, saves gallery screenshots to public/builds/
// and dumps visible text to qa-output/builds/ (reference for copywriting).
// Run: npm run capture:builds   (needs `npx playwright install chromium` once)
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const builds = [
  { id: 'tunefry', url: 'https://www.tunefry.com/home' },
  { id: 'my-lifechoices', url: 'https://www.my-lifechoices.com/' },
  { id: 'scdm-accelerator', url: 'https://scdm-accelerator.org/' },
]

await mkdir('public/builds', { recursive: true })
await mkdir('qa-output/builds', { recursive: true })

const browser = await chromium.launch()
for (const build of builds) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  try {
    await page.goto(build.url, { waitUntil: 'networkidle', timeout: 45_000 })
    await page.waitForTimeout(2500)
    await page.screenshot({ path: `public/builds/${build.id}.jpg`, type: 'jpeg', quality: 78 })
    const text = await page.evaluate(() => document.body.innerText)
    await writeFile(`qa-output/builds/${build.id}.txt`, text)
    console.log(`ok   ${build.id}`)
  } catch (error) {
    console.log(`fail ${build.id}: ${error.message.split('\n')[0]} — gallery falls back to a typographic panel`)
  } finally {
    await page.close()
  }
}
await browser.close()
