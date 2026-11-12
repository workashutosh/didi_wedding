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
  /** optional — a different venue for this function; null hides the venue line */
  venue?: string | null
  /** no fixed time: shown as a date-only entry (and an all-day calendar event) */
  allDay?: boolean
}

export const wedding = {
  bride: { first: 'Sneha', full: 'Sneha Mishra', hindi: 'स्नेहा', initial: 'S' },
  groom: { first: 'Ashok', full: 'Ashok Shukla', hindi: 'अशोक', initial: 'A' },

  /** The Shubh Vivah — also the countdown target */
  weddingDate: {
    iso: '2026-12-09T18:00:00+05:30',
    weekday: 'Wednesday',
    long: '9th December 2026',
    numeric: ['09', '12', '2026'] as const,
    hindi: 'बुधवार, ९ दिसम्बर २०२६',
  },

  /** Who is inviting — appears in "With the blessings of our elders, ___ cordially invite you" */
  hosts: 'Shri Chandrashekhar Mishra & Smt. Poonam Mishra',

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
    greetingHindi: 'स्नेही स्वजन,',
    hindi: 'परमपिता परमात्मा की असीम अनुकम्पा एवं स्वजनों की शुभेच्छा से',
    blessingLine: 'With the blessings of our elders',
    inviteLine: 'cordially invite you to the wedding of their beloved daughter',
  },

  /**
   * Functions / ceremonies (मांगलिक कार्यक्रम) — as printed on the card.
   * Mehendi & Sangeet are ready-made extras: fill in and set show: true.
   */
  events: [
    {
      id: 'haldi',
      show: true,
      name: 'Shubh Haldi',
      hindi: 'शुभ हल्दी',
      icon: 'haldi',
      dateLabel: 'Tuesday, 8th December 2026',
      timeLabel: '',
      allDay: true,
      start: '2026-12-08T00:00:00+05:30',
      end: '2026-12-09T00:00:00+05:30',
      description: 'A day of turmeric, laughter and golden blessings for the bride.',
      venue: null,
    },
    {
      id: 'vivah',
      show: true,
      name: 'Vivah & Varmala',
      hindi: 'शुभ विवाह एवं वरमाला',
      icon: 'varmala',
      dateLabel: 'Wednesday, 9th December 2026',
      timeLabel: '6:00 – 11:30 PM',
      start: '2026-12-09T18:00:00+05:30',
      end: '2026-12-09T23:30:00+05:30',
      description: 'The sacred union and the exchange of garlands — two hearts, one promise, under a sky of marigolds.',
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
    name: 'The Courtyard Banquet Hall',
    hindiName: 'द कोर्टयार्ड बैंक्वेट हॉल',
    address: 'Ghodbunder Road No. 1, Gowniwada, Owale, Thane (West) – 400615',
    hindiAddress: 'घोडबंदर रोड नं. 1, गोवनीवाड़ा, ओवले, ठाणे (पश्चिम) – 400615',
    mapUrl: 'https://maps.app.goo.gl/6gVvYgCmCox2BFoW6',
    /**
     * Optional embedded map. Put the venue name + city here
     * (e.g. "Hotel Name, City"). Leave '' to hide the embedded map.
     */
    embedQuery: 'The Courtyard Banquet Hall, Ghodbunder Road, Owale, Thane West, Maharashtra 400615',
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
      members: ['Sushri Sneha Mishra', 'D/o Shri Chandrashekhar Mishra & Smt. Poonam Mishra', 'Thane (West)'],
      membersHindi: ['आयु. कु. स्नेहा मिश्रा', 'सुपुत्री : श्री चंद्रशेखर मिश्रा एवं पूनम मिश्रा', 'पता : ठाणे (पश्चिम)'],
    },
    {
      title: "Groom's Family",
      hindi: 'वर पक्ष',
      members: ['Chi. Ashok Shukla', 'S/o Shri Kaushal Shukla & Smt. Kusum Shukla', 'Borivali, Mumbai'],
      membersHindi: ['आयु. चि. अशोक शुक्ला', 'सुपुत्र : कौशल शुक्ला एवं कुसुम शुक्ला', 'पता : बोरिवली, मुंबई'],
    },
  ],

  /** प्रेषक — the sender of the invitation */
  sender: { title: 'Preshak', hindi: 'प्रेषक', name: 'Ramvriksh Mishra', nameHindi: 'रामवृक्ष मिश्रा' },

  /** दर्शनाभिलाषी — eager to welcome you */
  darshanabhilashi: {
    title: 'Darshanabhilashi',
    hindi: 'दर्शनाभिलाषी',
    english: 'Eagerly awaiting your presence',
    names: ['Kripashankar Mishra', 'Chandrakesh Mishra', 'Rajnath Mishra', 'Anand Mishra', 'Ashutosh Mishra', 'Omkarnath Mishra', 'Suraj Mishra'],
    namesHindi: ['कृपाशंकर मिश्रा', 'चंद्रकेश मिश्रा', 'राजनाथ मिश्रा', 'आनंद मिश्रा', 'आशुतोष मिश्रा', 'ओंकारनाथ मिश्रा', 'सूरज मिश्रा'],
  },

  /** बाल मंडली — the little ones */
  balMandali: {
    title: 'Bal Mandali',
    hindi: 'बाल मंडली',
    english: 'The little ones who can’t wait',
    names: ['Nirvan Mishra', 'Vedika Shukla', 'Harshita Tiwari', 'Priyansh Tiwari'],
    namesHindi: ['निर्वान मिश्रा', 'वेदिका शुक्ला', 'हर्षिता तिवारी', 'प्रियांश तिवारी'],
  },

  rsvp: {
    contactName: 'Chandrashekhar Mishra',
    /** For the call button, with country code, e.g. '+919876543210' */
    phone: '+91 98676 04591',
    /** WhatsApp number — digits only incl. country code, e.g. '919876543210' */
    whatsapp: '919867604591',
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
      'With the blessings of our elders, you are warmly invited to the wedding of Sneha & Ashok — Wednesday, 9th December 2026, 6:00 PM onwards at The Courtyard Banquet Hall, Thane (West).',
  },
}

export type Wedding = typeof wedding
export const visibleEvents = wedding.events.filter((e) => e.show)

/** true if a string is still an unfilled [PLACEHOLDER] */
export const isPlaceholder = (s: string) => /^\s*\[.*\]\s*$/.test(s)
