// Injects the server-rendered cover into dist/index.html (run after both builds).
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { render } from '../.ssr/entry-server.js'

const file = 'dist/index.html'
const html = readFileSync(file, 'utf8')
if (!html.includes('<div id="root"></div>')) throw new Error('root div not found in dist/index.html')
writeFileSync(file, html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`))
rmSync('.ssr', { recursive: true, force: true })
console.log('✓ pre-rendered cover into dist/index.html')
