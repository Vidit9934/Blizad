// Measured QA gates from the premium-interactive-web checklist.
// Usage: npm run build && npm run preview (in another terminal), then: npm run qa
//   --reduced   emulate prefers-reduced-motion
//   --only=390  run a single viewport width
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const BASE = process.env.QA_URL ?? 'http://localhost:4173'
const reduced = process.argv.includes('--reduced')
const only = process.argv.find((arg) => arg.startsWith('--only='))?.split('=')[1]
const widths = [1440, 1024, 390].filter((w) => !only || String(w) === only)
const routes = ['/', '/services', '/services/seo-geo-aeo', '/services/web-development', '/work', '/about', '/contact', '/privacy', '/404']
const SCENES = 'main > section, main > header, main > .pin-spacer > section'
const EXEMPT = ['proof', 'home-faq', 'builds', 'estimator', 'voices'] // proof/FAQ per checklist; gallery titles-only; estimator is a product screen; voices carries real testimonial quotes, same spirit as proof
const out = `qa-output/${reduced ? 'reduced' : 'full'}`
await mkdir(out, { recursive: true })

const results = []
const gate = (name, pass, detail = '') => {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`)
}

const browser = await chromium.launch()
for (const width of widths) {
  const height = width === 390 ? 844 : width === 1024 ? 768 : 900
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
    hasTouch: width === 390,
    isMobile: width === 390,
  })
  const page = await context.newPage()
  const errors = []
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
  page.on('pageerror', (err) => errors.push(err.message))

  console.log(`\n=== ${width}px ${reduced ? '(reduced motion)' : ''}`)
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2600) // preloader + arrival

  // Nav and CTA visible at scroll 0, nav opaque
  const navState = await page.evaluate(() => {
    const nav = document.querySelector('.nav')
    const cta = document.querySelector('.nav__cta')
    const wa = document.querySelector('.nav__whatsapp')
    const visible = (el) => {
      if (!el) return false
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= window.innerHeight && getComputedStyle(el).visibility !== 'hidden'
    }
    return { bg: getComputedStyle(nav).backgroundColor, cta: visible(cta), wa: visible(wa) }
  })
  gate(`${width}: Start a project visible at scroll 0`, navState.cta)
  gate(`${width}: WhatsApp visible at scroll 0`, navState.wa)
  gate(`${width}: nav background opaque`, /^rgb\(/.test(navState.bg) || /, 1\)$/.test(navState.bg), navState.bg)

  const fonts = await page.evaluate(async () => {
    await document.fonts.ready
    return {
      jakarta: document.fonts.check('600 48px "Plus Jakarta Sans Variable"'),
      inter: document.fonts.check('400 16px "Inter Variable"'),
    }
  })
  gate(`${width}: Plus Jakarta Sans loaded`, fonts.jakarta)
  gate(`${width}: Inter loaded`, fonts.inter)

  // Per-scene screenshots + word budget
  const scenes = await page.evaluate(
    (selector) =>
      [...document.querySelectorAll(selector)].map((el, i) => ({
        index: i,
        cls: el.className.split(' ').find((c) => !['scene', 'scene--ice', 'scene--deep', 'builds--pinned'].includes(c)) || `scene-${i}`,
      })),
    SCENES,
  )
  const frameDeltas = []
  for (const scene of scenes) {
    await page.evaluate(([selector, index]) => document.querySelectorAll(selector)[index].scrollIntoView({ block: 'start' }), [SCENES, scene.index])
    await page.waitForTimeout(2600)
    // Count only text a visitor can see now: skips visually-hidden summaries and
    // anything at opacity 0 (detail behind hover/focus, which the budget allows).
    const words = await page.evaluate(
      ([selector, index]) => {
        const el = document.querySelectorAll(selector)[index]
        const count = (text) => (text.match(/[\p{L}\p{N}₹+’']+/gu) || []).length
        const shown = (node) => {
          for (let n = node.parentElement; n && n !== el.parentElement; n = n.parentElement) {
            const style = getComputedStyle(n)
            if (n.classList.contains('visually-hidden') || n.hasAttribute('data-product-screen') || style.opacity === '0' || style.visibility === 'hidden' || style.display === 'none') return false
          }
          return true
        }
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
        let visible = 0
        while (walker.nextNode()) if (shown(walker.currentNode)) visible += count(walker.currentNode.textContent)
        const display = [...el.querySelectorAll('h1, h2')].map((h) => h.textContent).join(' ')
        return { display: count(display), visible }
      },
      [SCENES, scene.index],
    )
    await page.screenshot({ path: `${out}/${width}-home-${String(scene.index).padStart(2, '0')}-${scene.cls}.png` })
    if (width === 1440) {
      const exempt = EXEMPT.includes(scene.cls)
      gate(`words ${scene.cls}: display ≤ 20`, words.display <= 20, `${words.display}`)
      if (!exempt) gate(`words ${scene.cls}: visible ≤ 70`, words.visible <= 70, `${words.visible}`)
    }
  }

  // Frame time during a scripted wheel scroll
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(800)
  await page.evaluate(() => {
    window.__frames = []
    window.__longTasks = 0
    let last = performance.now()
    const tick = (now) => {
      window.__frames.push(now - last)
      last = now
      if (window.__frames.length < 600) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    try {
      new PerformanceObserver((list) => (window.__longTasks += list.getEntries().filter((e) => e.duration > 50).length)).observe({ type: 'longtask', buffered: false })
    } catch {}
  })
  for (let i = 0; i < 60; i++) {
    await page.mouse.wheel(0, 220)
    await page.waitForTimeout(40)
  }
  await page.waitForTimeout(600)
  const perf = await page.evaluate(() => {
    const frames = window.__frames.slice(5).sort((a, b) => a - b)
    const p = (q) => frames[Math.floor(frames.length * q)] ?? 0
    return { median: p(0.5), p95: p(0.95), longTasks: window.__longTasks }
  })
  frameDeltas.push(perf)
  gate(`${width}: median frame ≤ 20ms during scroll`, perf.median <= 20, `median ${perf.median.toFixed(1)}ms, p95 ${perf.p95.toFixed(1)}ms`)
  gate(`${width}: long tasks during scroll`, perf.longTasks <= 2, `${perf.longTasks}`)

  // Routes: overflow, console errors, pin leaks after route switching
  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(700)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    gate(`${width} ${route}: no horizontal overflow`, overflow <= 0, `${overflow}px`)
    // Clipped overflow: content pushed past the viewport inside an overflow:clip
    // parent never shows up in scrollWidth, so check text and controls directly.
    const clipped = await page.evaluate(() =>
      [...document.querySelectorAll('main h1, main h2, main h3, main p, main a, main button, main input')]
        .filter((el) => !el.closest('.builds__track, .visually-hidden, [hidden]'))
        .filter((el) => {
          const r = el.getBoundingClientRect()
          return r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1)
        })
        .map((el) => `${el.tagName.toLowerCase()}.${el.className.split(' ')[0]}`)
        .slice(0, 4),
    )
    gate(`${width} ${route}: no text or controls cut off at the edges`, clipped.length === 0, clipped.join(', '))
    if (route !== '/') await page.screenshot({ path: `${out}/${width}-route${route.replace(/\//g, '_') || '_home'}.png` })
  }

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(800)
  const pinsBefore = await page.evaluate(() => document.querySelectorAll('.pin-spacer').length)
  for (let i = 0; i < 10; i++) {
    await page.click('.nav__brand')
    await page.waitForTimeout(250)
    await page.evaluate(() => document.querySelector('a[href="/work"]')?.click())
    await page.waitForTimeout(250)
  }
  await page.click('.nav__brand')
  await page.waitForTimeout(900)
  const pinsAfter = await page.evaluate(() => document.querySelectorAll('.pin-spacer').length)
  gate(`${width}: no pin leaks after 10 route switches`, pinsAfter === pinsBefore, `${pinsBefore} → ${pinsAfter}`)

  const relevant = errors.filter((e) => !/favicon|og\.png/.test(e))
  gate(`${width}: zero console errors`, relevant.length === 0, relevant.slice(0, 3).join(' | '))
  await context.close()
}
await browser.close()

const failed = results.filter((r) => !r.pass)
await writeFile(`${out}/results.json`, JSON.stringify(results, null, 2))
console.log(`\n${results.length - failed.length}/${results.length} gates passed. Screenshots: ${out}/`)
process.exit(failed.length ? 1 : 0)
