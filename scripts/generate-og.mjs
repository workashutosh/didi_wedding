// Generates public/og-image.jpg (1200×630), apple-touch-icon.png (180) and favicon-32.png
// from src/dev/OgCard.tsx using a headless Chrome. Run: npm run og
import { createServer } from 'vite'
import puppeteer from 'puppeteer-core'
import { existsSync } from 'node:fs'

const CHROME =
  process.env.CHROME_PATH ||
  [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
  ].find(existsSync)

const server = await createServer({ server: { port: 5199 }, logLevel: 'error' })
await server.listen()
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' })
const page = await browser.newPage()

async function capture(mode, w, h, path, type) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 })
  await page.goto(`http://localhost:5199/og.html?mode=${mode}`, { waitUntil: 'networkidle0' })
  await page.evaluate(() => document.fonts.ready)
  await new Promise((r) => setTimeout(r, 400))
  await page.screenshot({ path, type, quality: type === 'jpeg' ? 88 : undefined, clip: { x: 0, y: 0, width: w, height: h } })
  console.log('✓', path)
}

await capture('og', 1200, 630, 'public/og-image.jpg', 'jpeg')
await capture('180', 180, 180, 'public/apple-touch-icon.png', 'png')
await capture('32', 32, 32, 'public/favicon-32.png', 'png')
await browser.close()
await server.close()
