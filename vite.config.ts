import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { wedding, visibleEvents } from './src/config/wedding.ts'
import { buildICS } from './src/lib/calendar.ts'

/** Absolute site URL: config → SITE_URL env → Vercel / Netlify auto env vars */
function siteUrl() {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  const raw =
    wedding.site.url ||
    process.env.SITE_URL ||
    (vercel ? `https://${vercel}` : '') ||
    process.env.URL || // Netlify
    ''
  return raw.replace(/\/$/, '')
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Injects title / OG / Twitter meta from the config, emits /wedding.ics, preloads the hero font */
function weddingPlugin(): Plugin[] {
  const ics = () => buildICS(wedding, visibleEvents)
  return [
    {
      name: 'wedding-meta',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          const base = siteUrl()
          const tokens: Record<string, string> = {
            TITLE: wedding.site.title,
            DESCRIPTION: wedding.site.description,
            URL: base ? base + '/' : '/',
            OG_IMAGE: (base || '') + '/og-image.jpg',
            OG_ALT: `${wedding.bride.first} weds ${wedding.groom.first} — ${wedding.weddingDate.long}`,
            SITE_NAME: `${wedding.bride.first} & ${wedding.groom.first}`,
          }
          return html.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in tokens ? esc(tokens[k]) : m))
        },
      },
      configureServer(server) {
        server.middlewares.use('/wedding.ics', (_req, res) => {
          res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
          res.end(ics())
        })
      },
      generateBundle(opts) {
        if (opts.dir?.endsWith('.ssr')) return
        this.emitFile({ type: 'asset', fileName: 'wedding.ics', source: ics() })
      },
    },
    {
      name: 'wedding-font-preload',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler(_html, ctx) {
          const font = Object.keys(ctx.bundle ?? {}).find((f) => /allura-latin-400-normal.*\.woff2$/.test(f))
          if (!font) return
          return [
            {
              tag: 'link',
              attrs: { rel: 'preload', href: `/${font}`, as: 'font', type: 'font/woff2', crossorigin: '' },
              injectTo: 'head-prepend',
            },
          ]
        },
      },
    },
  ]
}

export default defineConfig({
  plugins: [react(), tailwindcss(), weddingPlugin()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 4096,
  },
})
