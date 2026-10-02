// Calendar helpers — pure functions, used both in the browser and by the
// Vite build plugin (which emits /wedding.ics).
import type { Wedding, WeddingEvent } from '../config/wedding.ts'

const utcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

const icsEscape = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')

/** fold lines to 75 octets per RFC 5545 (approximate by chars, safe for ASCII-heavy text) */
const fold = (line: string) => {
  const out: string[] = []
  let rest = line
  while (rest.length > 73) {
    out.push(rest.slice(0, 73))
    rest = ' ' + rest.slice(73)
  }
  out.push(rest)
  return out.join('\r\n')
}

const couple = (w: Wedding) => `${w.bride.first} & ${w.groom.first}`
const location = (w: Wedding, e?: WeddingEvent) =>
  [e?.venue || w.venue.name, w.venue.address].filter(Boolean).join(', ')

export function buildICS(w: Wedding, events: WeddingEvent[]): string {
  const now = utcStamp(new Date().toISOString())
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${couple(w)}//Wedding Invitation//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${icsEscape(`${couple(w)} Wedding`)}`,
  ]
  for (const e of events) {
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.id}-${utcStamp(e.start)}@${w.bride.first.toLowerCase()}-weds-${w.groom.first.toLowerCase()}`,
      `DTSTAMP:${now}`,
      `DTSTART:${utcStamp(e.start)}`,
      `DTEND:${utcStamp(e.end)}`,
      `SUMMARY:${icsEscape(`${e.name} · ${couple(w)}'s Wedding`)}`,
      `DESCRIPTION:${icsEscape(`${e.description}\n\nDirections: ${w.venue.mapUrl}`)}`,
      `LOCATION:${icsEscape(location(w, e))}`,
      `URL:${w.venue.mapUrl}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:${icsEscape(`Tomorrow: ${e.name} · ${couple(w)}`)}`,
      'END:VALARM',
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')
  return lines.map(fold).join('\r\n') + '\r\n'
}

export function googleCalendarUrl(w: Wedding, e: WeddingEvent): string {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${couple(w)}'s Wedding · ${e.name}`,
    dates: `${utcStamp(e.start)}/${utcStamp(e.end)}`,
    details: `${e.description}\n\nDirections: ${w.venue.mapUrl}`,
    location: location(w, e),
    ctz: 'Asia/Kolkata',
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}
