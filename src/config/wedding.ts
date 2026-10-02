/**
 * ════════════════════════════════════════════════════════════════════
 *   WEDDING CONFIG — the single source of truth for every word on the site.
 *
 *   Edit text here; no component needs to change.
 *   Anything written as  [LIKE THIS]  is a PLACEHOLDER — replace it.
 *
 *   Times are ISO-8601 with the India offset (+05:30) so countdowns and
 *   calendar files are correct for guests in any timezone.
 * ════════════════════════════════════════════════════════════════════
 */

export type EventIcon = 'varmala' | 'haldi' | 'mehendi' | 'sangeet' | 'pheras' | 'reception'

export interface WeddingEvent {
  id: string
  /** set to false to hide the function everywhere (cards + calendar file) */
  show: boolean
  name: string
  hindi: string
  icon: EventIcon
  dateLabel: string
  timeLabel: string
  /** ISO start/end, used for the calendar invite */
  start: string
  end: string
  description: string
  /** optional — a different venue for this function */
  venue?: string
}

export const wedding = {
  bride: { first: 'Sneha', full: 'Sneha Mishra', hindi: 'स्नेहा', initial: 'S' },
  groom: { first: 'Ashok', full: 'Ashok Shukla', hindi: 'अशोक', initial: 'A' },

  /** The Shubh Vivah — also the countdown target */
  weddingDate: {
    iso: '2026-12-09T20:00:00+05:30',
    weekday: 'Wednesday',
    long: '9th December 2026',
    numeric: ['09', '12', '2026'] as const,
    hindi: 'बुधवार, ९ दिसम्बर २०२६',
  },

  /** Who is inviting — appears in "With the blessings of our elders, ___ cordially invite you" */
  hosts: 'The Mishra & Shukla Families',

  invocation: {
    title: '॥ श्री गणेशाय नमः ॥',
    shloka: ['वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।', 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'],
  },

  /** the joined-hands scene */
  hastaMilap: {
    eyebrow: 'HASTA MILAP',
    hindi: 'हस्त मिलाप',
    title: 'Two hands, one lifetime',
    vowHindi: 'सात फेरे · सात वचन · सात जन्मों का साथ',
    vowEnglish: 'Seven rounds, seven vows — a bond for seven lifetimes.',
  },

  invitation: {
    blessingLine: 'With the blessings of our elders',
    inviteLine: 'cordially invite you to the wedding of',
  },

  /**
   * Functions / ceremonies. Varmala is confirmed.
   * Haldi, Mehendi & Sangeet are ready-made — fill in the [ ] and set show: true.
   */
  events: [
    {
      id: 'varmala',
      show: true,
      name: 'Varmala',
      hindi: 'वरमाला',
      icon: 'varmala',
      dateLabel: 'Wednesday, 9th December 2026',
      timeLabel: '8:00 PM onwards',
      start: '2026-12-09T20:00:00+05:30',
      end: '2026-12-10T01:00:00+05:30',
      description: 'The exchange of garlands — two hearts, one promise, under a sky of marigolds.',
    },
    {
      id: 'haldi',
      show: false,
      name: 'Haldi',
      hindi: 'हल्दी',
      icon: 'haldi',
      dateLabel: '[DAY, DATE]',
      timeLabel: '[TIME]',
      start: '2026-12-08T10:00:00+05:30',
      end: '2026-12-08T13:00:00+05:30',
      description: 'A morning of turmeric, laughter and golden blessings.',
    },
    {
      id: 'mehendi',
      show: false,
      name: 'Mehendi',
      hindi: 'मेहँदी',
      icon: 'mehendi',
      dateLabel: '[DAY, DATE]',
      timeLabel: '[TIME]',
      start: '2026-12-08T16:00:00+05:30',
      end: '2026-12-08T19:00:00+05:30',
      description: 'Henna, songs and stories — the colour of love on every palm.',
    },
    {
      id: 'sangeet',
      show: false,
      name: 'Sangeet',
      hindi: 'संगीत',
      icon: 'sangeet',
      dateLabel: '[DAY, DATE]',
      timeLabel: '[TIME]',
      start: '2026-12-08T19:30:00+05:30',
      end: '2026-12-08T23:30:00+05:30',
      description: 'An evening of music and dance as two families become one.',
    },
  ] satisfies WeddingEvent[] as WeddingEvent[],

  venue: {
    name: 'The Courtyard Lawns',
    address: 'Ghodbunder Rd, Gowniwada, Owale, Thane West, Thane, Mumbai, Maharashtra 400615',
    mapUrl: 'https://maps.app.goo.gl/6gVvYgCmCox2BFoW6',
    /**
     * Optional embedded map. Put the venue name + city here
     * (e.g. "Hotel Name, City"). Leave '' to hide the embedded map.
     */
    embedQuery: 'The Courtyard Lawns, Ghodbunder Rd, Owale, Thane West, Maharashtra 400615',
  },

  blessings: {
    hindi: 'आपकी उपस्थिति हमारे लिए आशीर्वाद है',
    roman: 'Aapki upasthiti hamare liye aashirwad hai',
    english: 'Your presence is our blessing',
  },

  families: [
    {
      title: "Bride's Family",
      hindi: 'वधू पक्ष',
      members: [
        '[Grandparents — e.g. Smt. & Shri ______ Mishra]',
        '[Parents — e.g. Mrs. & Mr. ______ Mishra]',
        '[Siblings / family names]',
      ],
    },
    {
      title: "Groom's Family",
      hindi: 'वर पक्ष',
      members: [
        '[Grandparents — e.g. Smt. & Shri ______ Shukla]',
        '[Parents — e.g. Mrs. & Mr. ______ Shukla]',
        '[Siblings / family names]',
      ],
    },
  ],

  rsvp: {
    contactName: '[RSVP CONTACT NAME]',
    /** For the call button, with country code, e.g. '+919876543210' */
    phone: '[+91XXXXXXXXXX]',
    /** WhatsApp number — digits only incl. country code, e.g. '919876543210' */
    whatsapp: '[91XXXXXXXXXX]',
    message: "Namaste! I/we will attend Sneha & Ashok's wedding on 9 Dec.",
    /** optional — e.g. 'Kindly respond by 25th November' ('' to hide) */
    respondBy: '',
  },

  closing: {
    line: 'We look forward to celebrating with you',
    signoff: 'With love & blessings',
    families: 'The Mishra & Shukla Families',
  },

  /** Background music — drop your file at public/audio/music.mp3 */
  music: { src: '/audio/music.mp3', volume: 0.55 },

  /** Link-preview / SEO */
  site: {
    /**
     * Your final URL, e.g. 'https://sneha-weds-ashok.vercel.app' (no trailing slash).
     * WhatsApp needs an absolute URL for the preview image. On Vercel & Netlify
     * this is auto-detected, so it can stay '' there.
     */
    url: '',
    title: 'Sneha weds Ashok · 9 December 2026',
    description:
      'With the blessings of our elders, you are warmly invited to the wedding of Sneha & Ashok — Wednesday, 9th December 2026. Varmala at 8:00 PM onwards.',
  },
}

export type Wedding = typeof wedding
export const visibleEvents = wedding.events.filter((e) => e.show)

/** true if a string is still an unfilled [PLACEHOLDER] */
export const isPlaceholder = (s: string) => /^\s*\[.*\]\s*$/.test(s)
