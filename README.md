# Sneha weds Ashok · 9 December 2026

A cinematic, scroll-driven wedding invitation in a traditional Indian style:
palace doors → Shri Ganesh invocation → couple reveal → save the date → ceremonies → venue → blessings → RSVP → finale.

**Stack:** Vite + React + TypeScript · GSAP ScrollTrigger (pinned, scrubbed scenes) · Lenis (smooth scrolling) · Framer Motion (micro-interactions) · Tailwind CSS v4 · a custom canvas particle engine (petals, gold dust, fireworks).
All artwork is original, hand-built SVG in `src/components/art/`.

---

## 1. Run it

```bash
npm install
npm run dev        # http://localhost:5173  (also on your LAN, so you can open it on your phone)
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

Node 20+ is recommended.

## 2. Edit the text: `src/config/wedding.ts`

**Every word on the site comes from this one file.** You never need to touch a component.

Placeholders look like `[VENUE_NAME]`. Search the file for `[` and replace each one:

| Field | What it is |
| --- | --- |
| `hosts` | "With the blessings of our elders, **___** cordially invite you…" |
| `venue.name`, `venue.address` | Shown in the Venue section, on cards and in the calendar invite |
| `venue.embedQuery` | Optional. Put e.g. `"Hotel Name, City"` to add an embedded Google Map. Leave `''` to hide it |
| `families[].members` | Names in the Blessings section (bride's side / groom's side) |
| `rsvp.contactName`, `rsvp.phone`, `rsvp.whatsapp` | RSVP buttons. WhatsApp must be **digits only with country code**, e.g. `919876543210` |
| `rsvp.respondBy` | Optional line, e.g. `"Kindly respond by 25th November"` |
| `events[]` | Ceremonies. Varmala is set. **Haldi, Mehendi & Sangeet are ready-made**: fill in their `[DAY, DATE]` / `[TIME]` and `start`/`end`, then set `show: true`. To remove one, leave `show: false` or delete it |
| `site.url` | Your final URL (see §4). Auto-detected on Vercel/Netlify |

The countdown, "Add to Calendar" links and the downloadable `wedding.ics` all update automatically from the config.

## 3. Music

Put a royalty-free shehnai track at:

```
public/audio/music.mp3
```

- It **never autoplays**. It starts (with a soft fade-in) only when the guest taps **Open Invitation**.
- A floating gold toggle (top-right) lets guests pause or play it. Music also pauses when the tab is hidden.
- If the file is missing, the toggle simply hides itself.
- Tip: a 128 kbps MP3 of 2–4 minutes (about 2–4 MB) that loops cleanly works well.

## 4. WhatsApp link preview (OG image)

`public/og-image.jpg` (1200×630), `apple-touch-icon.png` and `favicon-32.png` are generated from the same SVG art.
**After changing names or the date, regenerate them:**

```bash
npm run og       # needs Google Chrome installed (or set CHROME_PATH)
```

WhatsApp requires an **absolute** image URL. The build finds it in this order:
`site.url` in the config → the `SITE_URL` env var → Vercel's or Netlify's built-in URL variables.
On Vercel and Netlify (git deploys) it just works. For any other host, set `site.url` before building.

> WhatsApp caches previews aggressively. If you shared the link before the preview was ready, share it again with `?v=2` appended.

## 5. Deploy

The site is fully static (`dist/`).

**Vercel**
1. Push this folder to GitHub, then go to vercel.com → *Add New Project* → import the repo.
2. The framework is auto-detected as Vite. `vercel.json` already sets the build command, output folder, `.ics` content type and asset caching.
3. Alternatively, from the terminal: `npx vercel --prod`.

**Netlify**
1. Push to GitHub, then go to app.netlify.com → *Add new site* → *Import from Git*. `netlify.toml` configures everything.
2. Alternatively, run `npm run build` and drag the `dist/` folder onto app.netlify.com/drop. **In that case, set `site.url` first** so the preview image URL is absolute.

## 6. How it's built

```
src/
  config/wedding.ts        ← all text & dates (edit me)
  App.tsx                  ← cover + lazy-loaded experience
  Experience.tsx           ← smooth scroll, particles, chrome, sections
  sections/                ← Opening (doors), Ganesh, Invitation, Couple, SaveTheDate,
                             Ceremonies, Venue, Blessings, RSVP, Closing
  components/art/          ← original SVG library: Ganesha, Mandala, Toran, Jharokha,
                             Diya, Kalash, Elephant, Temple, Lotus, Paisley, Wax seal, icons…
  components/              ← ParticleField (canvas), music toggle, garland scroll-progress,
                             cursor glow / tap ripple, GoldButton
  lib/                     ← scroll engine (GSAP + Lenis), audio, calendar (.ics / Google), device flags
scripts/
  generate-og.mjs          ← renders og.html → OG image + icons
  prerender.mjs            ← bakes the door scene into index.html at build time
```

**Performance choices** (Lighthouse mobile: Performance ~90, Accessibility / Best Practices / SEO 100):

- The door cover is **pre-rendered to static HTML** and hydrated, so it paints before any JavaScript runs.
- Everything behind the doors (GSAP, Lenis, Framer Motion, all sections) is a **separate chunk**. It is fetched while the browser is idle and mounted only once the doors have swung open.
- Fonts are **self-hosted and subset** (Latin + Devanagari only), and the hero script font is preloaded.
- Every continuous animation runs on transforms/opacity on composited layers. Toran strands, diya flames and halos are HTML-wrapped so they never repaint SVG per frame.
- Petals, gold dust and fireworks use one pre-rendered-sprite canvas each (no particle library). Particle counts scale down on low-end devices, small screens and Data Saver.
- `prefers-reduced-motion`: no pins, no particles or parallax, simple fades, and all artwork shown fully drawn.
