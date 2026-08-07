// SubPilot · 订阅管家
// ===== Storage Keys =====
const KEYS = {
  accounts: 'subpilot_accounts',
  subscriptions: 'subpilot_subs',
  transactions: 'subpilot_tx',
  onboarded: 'subpilot_onboarded',
  settings: 'subpilot_settings',
  qrcodes: 'subpilot_qrcodes',
  invoices: 'subpilot_invoices',
  cloudConfig: 'subpilot_cloud_config',
  cloudSession: 'subpilot_cloud_session'
};

// ===== Embedded Brand Icons (SVG path data, viewBox 0 0 24 24) =====
// Each entry: { path, bg } - path is SVG path d, bg is brand background color
const BRAND_ICONS = {
  spotify: { p: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.9 15 10.56 18.72 12.84c.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z', bg: '#1DB954' },
  netflix: { p: 'M5.4 0l3 5.6V0h3v7.6L14.6 0h3.3L13.5 8.4 18 16h-3.3l-2.9-5.4V16H9V8.9L5.6 16H2.4L7 8 2.4 0z', bg: '#E50914' },
  youtube: { p: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.55 12 3.55 12 3.55s-7.51 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.51 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z', bg: '#FF0000' },
  apple: { p: 'M17.05 12.04c-.03-2.48 2.03-3.67 2.13-3.73-1.16-1.7-2.97-1.93-3.62-1.96-1.54-.16-3.01.91-3.79.91-.79 0-1.99-.89-3.27-.86-1.68.03-3.24.98-4.11 2.49-1.75 3.03-.45 7.51 1.26 9.97.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.72-.81 3.23-.81 1.51 0 1.94.81 3.26.78 1.35-.02 2.21-1.23 3.03-2.43.96-1.4 1.35-2.76 1.37-2.83-.03-.01-2.61-1-2.64-3.97zM14.5 4.64c.69-.83 1.15-1.99 1.02-3.14-.99.04-2.18.66-2.89 1.49-.64.74-1.2 1.92-1.05 3.04 1.1.09 2.23-.56 2.92-1.39z', bg: '#ffffff' },
  notion: { p: 'M4.46 4.21c.75.6 1.03.56 2.11.41l11.29-1.62c.3-.04.62-.09.91-.05-.27.09-.56.22-.81.39L6.26 12.14c-.53.37-.67.52-.64.97l.13 6.59c.01.47.1.63.47.58l12.46-1.78c.52-.07.65-.22.65-.74V4.85c0-.48-.08-.71-.56-.64L6.85 5.94c-.86.12-1.29.06-1.8-.42l-.59-.9zm12.92 3.57v9.46c0 .22-.08.35-.3.38l-9.59 1.37c-.24.03-.32-.04-.32-.27V8.64c0-.21.05-.3.25-.33l9.66-1.38c.23-.03.31.05.31.29v.56z', bg: '#ffffff' },
  github: { p: 'M12 .3c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6 0-.3-.1-1-.1-2-3.3.7-4-1.6-4-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2 0 1.6-.1 2.9-.1 3.3 0 .3.2.7.8.6C20.6 22.1 24 17.6 24 12.3c0-6.6-5.4-12-12-12', bg: '#ffffff' },
  figma: { p: 'M15.9 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4H16v-4zm0-8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4H16V4zM8 0c2.2 0 4 1.8 4 4S10.2 12 8 12 4 10.2 4 8 5.8 0 8 0zm0 24c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4v4H8zm0-8c-2.2 0-4-1.8-4-4s1.8-4 4-4h4v8H8z', bg: '#F24E1E' },
  discord: { p: 'M20.3 4.4c-1.5-.7-3.1-1.2-4.9-1.5-.3.4-.5.9-.7 1.3-1.8-.3-3.7-.3-5.5 0-.2-.4-.4-.9-.7-1.3-1.8.3-3.4.8-4.9 1.5C.5 9-.3 13.6.1 18.1c2 1.5 4 2.3 6 3 .5-.6.9-1.3 1.2-2-1.3-.5-2.2-1.1-3-1.9.3-.2.5-.4.7-.6 1.3.6 2.6.9 4 1 1.4.1 2.8-.1 4.1-.5.1.2.4.4.7.6-.8.7-1.7 1.4-3 1.9.3.7.7 1.4 1.2 2 2-.7 4-1.5 6-3 .4-4.5-.4-9.1-3.6-13.7zM8 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z', bg: '#5865F2' },
  google: { p: 'M21.35 11.1h-9.1v2.9h5.3c-.5 2.2-2.2 3.7-5.3 3.7-3.2 0-5.7-2.6-5.7-5.7s2.6-5.7 5.7-5.7c1.4 0 2.5.5 3.4 1.3l2.1-2.1C16.65 4.2 14.55 3.2 12.25 3.2 6.95 3.2 2.65 7.5 2.65 12s4.3 8.8 9.6 8.8c5.5 0 9.2-3.9 9.2-9.1 0-.6-.1-1.1-.1-1.6z', bg: '#4285F4' },
  microsoft: { p: 'M0 0h11.4v11.4H0zm12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zm12.6 0H24V24H12.6z', bg: '#5E5CE6' },
  chatgpt: { p: 'M22.3 10.1c-.3-1.4-1.2-2.5-2.5-3.1.2-.7.2-1.5-.1-2.3-.5-1.3-1.6-2.3-3-2.6-.7-.2-1.4-.1-2 .1-.7-1.1-1.8-1.9-3.2-2-1.4-.1-2.7.5-3.5 1.5-1.3-.2-2.7.3-3.6 1.3-.9 1-1.3 2.4-.9 3.7-1.1.6-1.9 1.6-2.2 2.9-.3 1.3-.1 2.7.6 3.8-.3 1.4-.1 2.9.8 4 .9 1.2 2.3 1.9 3.8 2 .1.7.4 1.4.9 2 .7.8 1.7 1.3 2.8 1.3.5 0 1-.1 1.4-.3.5 1.3 1.7 2.3 3.1 2.5 1.4.2 2.8-.3 3.7-1.3 1.3.3 2.7-.1 3.7-1 .9-.9 1.4-2.2 1.2-3.5.6-.3 1.1-.7 1.5-1.3.9-1.3 1-3 .2-4.4.3-.4.4-1 .5-1.6.1-.7-.1-1.4-.3-2z', bg: '#10a37f' },
  wechat: { p: 'M8.7 3C4.5 3 1 5.9 1 9.5c0 2 1.1 3.7 2.9 4.9l-.7 2.2 2.6-1.3c.9.2 1.8.4 2.8.4h.7c-.1-.4-.2-.8-.2-1.3 0-3.2 3.1-5.8 7-5.8h.5C15.9 5.3 12.6 3 8.7 3zM6.3 7.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm4.8 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm5.2 2.2c-3.3 0-6 2.3-6 5.2 0 2.9 2.7 5.2 6 5.2.7 0 1.4-.1 2.1-.3l2 1-.5-1.7c1.5-1 2.4-2.5 2.4-4.2 0-2.9-2.7-5.2-6-5.2zm-2 3.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm3.9 0c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z', bg: '#07C160' },
  alipay: { p: 'M18.5 3H5.5C4.1 3 3 4.1 3 5.5v13C3 19.9 4.1 21 5.5 21h13c1.4 0 2.5-1.1 2.5-2.5V5.5C21 4.1 19.9 3 18.5 3zm-3.7 12.8c-.9-.3-2.2-.9-3.6-1.8-.8 1-1.8 1.8-3.2 1.8-2 0-3.3-1.5-3.2-3 0-1.3 1-2.5 3-2.5.8 0 1.8.3 2.8.7.4-.7.7-1.5.9-2.3H6.3V7.5h4.3v-1h-5V5.7h5v-1h1.7v1h5v.8h-5v1h4.2l-.3.7c-.4 1.3-1 2.4-1.7 3.4 1.2.5 2.4.9 3.3 1.2l-.5 1.3c-.8-.2-2-.5-3.2-1-.9.8-1.9 1.4-3 1.8l.5-1.3zm-5.7-1c-1.3 0-2 .8-2 1.6s.7 1.4 1.8 1.4c1 0 2-.7 2.8-1.8-1-.7-1.9-1.2-2.6-1.2z', bg: '#1677FF' },
  qqmusic: { p: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.5 9.4c-.1 1.2-.8 2.3-1.9 2.9-.4.2-.9.4-1.3.4-.2 0-.4 0-.5-.1-.3-.1-.5-.4-.5-.7 0-.4.3-.8.8-.9.5-.1 1-.3 1.3-.7.3-.4.4-.9.4-1.4V8.1c0-.2.1-.3.3-.3l1.7-.5c.2-.1.3 0 .4.1.1.1.1.2.1.4v.9c.1 0 .1 0 0 .1v.6c.1 1.1-.1 2.1-.8 2.8z', bg: '#31C27C' },
  neteasecloudmusic: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.96 8.3c.07 0 .13.06.13.14v2.1c0 .08-.05.13-.1.15-.06.02-.12 0-.16-.06-1.37-1.94-3.56-1.36-4.65-.86-.32.15-.44.53-.28.84.15.32.53.44.84.29.93-.44 2.4-.8 3.23.84.35.7.33 1.64-.26 2.4-.96 1.22-2.86 1.36-4.24.31-1.8-1.37-1.74-4.04.14-5.31 1.4-.94 3.25-.78 4.62.22.06-.03.08-.07.08-.14V8.6c0-.06-.04-.1-.1-.12l-4.8-1.3c-.08-.02-.1-.08-.08-.16l.32-1.2c.02-.08.08-.12.16-.1l5.16 1.4c.06.02.1.08.1.16v2.92c-.02.04 0 .08 0 .1z', bg: '#C20C0C' },
  bilibili: { p: 'M17.8 4.7h.9c1.5.05 2.8.58 3.8 1.57 1 .99 1.5 2.25 1.6 3.76v7.36c-.04 1.51-.56 2.77-1.56 3.77-1 .99-2.3 1.52-3.8 1.56H5.3c-1.5-.04-2.8-.56-3.8-1.56C.5 20.19 0 18.86 0 17.35V9.99c.04-1.51.56-2.77 1.56-3.76C2.56 5.23 3.82 4.71 5.3 4.65h.8L4.9 3.53c-.3-.25-.4-.57-.4-.9 0-.36.1-.66.4-.91.3-.25.6-.37.9-.37s.7.12.9.37l2.9 2.75c.1.07.1.14.2.21h4.3c.1-.07.1-.14.2-.21l2.9-2.75c.3-.25.6-.37.9-.37s.7.15.9.4c.3.25.4.55.4.9 0 .36-.1.66-.4.91L17.8 4.7zM5.3 7.24c-.7.02-1.4.28-1.9.77-.5.5-.8 1.1-.8 1.9v7.5c.02.8.3 1.4.8 1.9.5.5 1.1.8 1.9.8h13.3c.8-.02 1.4-.28 1.9-.77.5-.5.8-1.1.8-1.9V9.9c-.02-.8-.3-1.4-.8-1.9-.5-.5-1.1-.8-1.9-.8H5.3z', bg: '#00A1D6' },
  iqiyi: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.3 14.4c-.4 0-.7-.3-.7-.7V8.3c0-.4.3-.7.7-.7s.7.3.7.7v7.4c0 .4-.3.7-.7.7zm5.3 0c-.4 0-.7-.3-.7-.7V8.3c0-.4.3-.7.7-.7s.7.3.7.7v7.4c0 .4-.3.7-.7.7z', bg: '#00BE06' },
  tencentvideo: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.3 13.7c-.2.3-.5.4-.9.3l-2.9-1.1c-.3-.1-.6 0-.7.3l-.6 1.3c-.2.3-.5.5-.9.5-.4 0-.7-.2-.9-.5L6.7 11c-.2-.4-.1-.8.2-1.1.3-.2.8-.2 1.1.1l2.5 2.9V7.3c0-.4.3-.7.7-.7s.7.3.7.7v8.7l2.6-2.9c.3-.3.7-.3 1-.1.3.2.4.7.1 1l-1.8 2.1 2.5 1c.4.1.6.5.4.9z', bg: '#FF6A00' },
  youku: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.2 14.1l-3.1-.8c-.4-.1-.6-.5-.5-.9l1.1-4.1c.1-.4.5-.6.9-.5l3.1.8c.4.1.6.5.5.9l-1.1 4.1c-.1.4-.5.6-.9.5zm7.4-.6c-.1.3-.4.5-.8.5l-3.5.1c-.4 0-.7-.3-.7-.6l.2-4.3c0-.4.3-.6.7-.7l3.5-.2c.4 0 .7.3.7.6l-.1 4.6z', bg: '#1FB1EB' },
  baidu: { p: 'M7.6 11.6c-.5-.9-1.2-1.6-2.2-1.6-1.6 0-2.5 1.7-2.5 3.7 0 2.1 1.1 3.6 2.7 3.6 1.3 0 2.2-.8 2.5-2.1H10c-.2.3-.3.6-.3 1 0 .8.4 1.4 1.2 1.4.7 0 1.2-.6 1.2-1.4 0-.5-.2-.9-.5-1.2.9-.8 1.5-2 1.5-3.4 0-2.5-1.5-4.5-3.7-4.5-1.1 0-2 .5-2.7 1.3-.3-.5-.7-.9-1.3-.9-.8 0-1.4.7-1.4 1.7 0 .8.4 1.5 1.1 2-.3.1-.5.3-.5.6 0 .2.2.4.4.4h1.2c.2-.1.2-.3.1-.5zm.9-3.3c1.2 0 2.1 1.3 2.1 3s-.9 3-2.1 3-2.1-1.3-2.1-3 .9-3 2.1-3zm8.7-1.5c-1.8 0-3.3 1.5-3.3 3.3 0 1.1.6 2.1 1.4 2.7-.1.2-.2.4-.2.7 0 .6.5 1 1.1 1s1.1-.4 1.1-1c0-.3-.1-.5-.2-.7.8-.6 1.4-1.6 1.4-2.7 0-1.8-1.5-3.3-3.3-3.3zm0 5c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7z', bg: '#2319DC' },
  wps: { p: 'M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zm3.1 4.6L4 14h4.5L7.1 7.6zM12 7.6L9.5 14h5L12 7.6zm4.9 0L14.5 14H20l-3.1-6.4z', bg: '#D32D27' },
  dropbox: { p: 'M6 1.8L0 6.4l3.9 3.1L6 7.2l6 4.7 6-4.7 2.1 2.3L24 6.4l-6-4.6-6 4.7L6 1.8zM0 11.8l3.9 3.1L6 12.6l6 4.7 6-4.7 2.1 2.3L24 11.8l-6 4.7-6-4.7-6 4.7-6-4.7zm6 6.3l6-4.7 6 4.7-6 4.7-6-4.7z', bg: '#0061FF' },
  adobe: { p: 'M13.3.6c-.3-.2-.6-.2-.9-.2s-.6.1-.9.2L1.3 6.6c-.6.3-.9 1-.9 1.6v7.5c0 .7.4 1.3.9 1.6l3.6 2.1v-5.7L12 17.8c.6.3 1.3.3 1.8 0l10.2-5.9c.6-.3.9-1 .9-1.6V2.7L13.3.6z', bg: '#FF0000' },
  canva: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-.8 14.5l-4-4c-.2-.2-.2-.5 0-.7l4-4c.2-.2.5-.2.7 0l1.4 1.4c.2.2.2.5 0 .7L10.9 12l2.4 2.4c.2.2.2.5 0 .7l-1.4 1.4c-.2.2-.5.2-.7 0z', bg: '#00C4CC' },
  xiaohongshu: { p: 'M3 3h18v18H3V3zm4.8 4.2v9.6h2.1v-3.4c0-.9.4-1.5 1.2-1.5.7 0 1 .5 1 1.4v3.5h2.1v-3.9c0-2-1.1-2.9-2.5-2.9-1.1 0-1.8.5-2.1 1.2h-.1V7.2H7.8zm9.5 5.3c0 2.3-1.4 4.3-3.5 4.3-2 0-3.5-2-3.5-4.3s1.5-4.3 3.5-4.3c2.1 0 3.5 2 3.5 4.3zm-2.1 0c0-1.4-.7-2.5-1.5-2.5-.9 0-1.5 1.1-1.5 2.5s.6 2.5 1.5 2.5c.8 0 1.5-1.1 1.5-2.5z', bg: '#FF2442' },
  douyin: { p: 'M12.5 2h-2v12.2c0 1.8-1.5 3.3-3.3 3.3S4 16 4 14.2s1.5-3.3 3.3-3.3c.3 0 .7 0 1 .1v-2.1c-.4-.1-.7-.1-1-.1C4.2 8.8 1.8 11.2 1.8 14.2S4.2 19.6 7.2 19.6s5.4-2.4 5.4-5.4V7.8c1.2.8 2.6 1.3 4.1 1.3V7.1c-1.6 0-3-1-3.7-2.4l-.5-.7V2z', bg: '#000000' },
  zhihu: { p: 'M5.7 3C4.2 3 3 4.2 3 5.7v12.6c0 1.5 1.2 2.7 2.7 2.7h12.6c1.5 0 2.7-1.2 2.7-2.7V5.7C21 4.2 19.8 3 18.3 3H5.7zm2.6 4h3.1v1.7H9.8c-.1 1.2-.4 2.3-.8 3.3l1.5.7-.8 1.5-1.3-.6c-.6 1-1.4 1.9-2.4 2.5l-.9-1.4c.7-.4 1.3-.9 1.8-1.6.4-.6.8-1.4 1-2.2H5.8V7h2.5zm8.4 0h1.8v1.8h-1.8v5.8h-1.8V8.8h-1.8V7h1.8V5.2h1.8V7z', bg: '#0066FF' },
  weibo: { p: 'M10.1 20.6c-4.2.4-7.8-1.5-8-4.3-.2-2.8 3.1-5.4 7.3-5.8 4.2-.4 7.8 1.5 8 4.3.2 2.8-3.1 5.4-7.3 5.8zm8.5-9.7c-.3-.1-.5-.1-.4-.5.3-.8.3-1.5 0-2-.6-.8-2.1-.8-3.9 0 0 0-.5.2-.4-.2.2-.7.2-1.3-.1-1.6-.7-.7-2.6.1-4.3 1.7-1.3 1.2-2 2.5-2 3.6 0 2.1 2.7 3.4 6 3.4 3.9 0 6.5-2.3 6.5-4.1 0-.1-.1-.2-.2-.3-.2-.1-.8-.2-1.2 0-.1 0-.1 0-.2-.1 0 0-.2-.1 0 0zm.7-5.8c-.8-.9-2-1.3-3.1-1.1-.3 0-.5.3-.4.6 0 .3.3.5.5.4.8-.2 1.6.2 2.1.8.5.6.6 1.4.4 2.1-.1.3.1.5.3.6.3.1.5-.1.6-.3.4-1.1.2-2.3-.4-3.1zm1.8-1.7c-1.4-1.6-3.4-2.3-5.4-1.9-.3.1-.5.4-.4.7.1.3.4.4.7.4 1.5-.3 3.1.2 4.2 1.4 1.1 1.3 1.3 3 .7 4.5-.1.3 0 .6.3.7h.3c.2 0 .4-.2.4-.4.7-1.8.4-3.9-.8-5.4z', bg: '#E6162D' },
  taobao: { p: 'M3 5v14h18V5H3zm6.6 8.5c-.4 1-1.2 1.9-2.2 2.3l-.7-1.2c.8-.3 1.4-.9 1.7-1.6l-1.8-.3.3-1.6 2.4.1c.1-.4.1-.8.1-1.2H6.5V8.8h3.1c0-.3-.1-.6-.1-.9H5.7V6.6h3.9c0-.3-.1-.6-.2-.9l1.8-.4c.1.4.3.8.3 1.3h3.5v1.3h-3.3c0 .3.1.6.1.9h2.8l-.2 1.5-1.8-.1c.4.6.9 1.2 1.6 1.5l-.9 1.2c-.8-.4-1.4-1-1.8-1.7-.4.7-1.1 1.3-2 1.8-.1 0-.1.1 0 .1-.2-.1-.1-.1 0-.1zm6.4-.2l-.9-1.2c-.3.2-.7.3-1 .4l-.5-1.5c1.3-.3 2.2-1.1 2.6-2.2H18l.3-1.5h-2.2c0-.3-.1-.6-.2-.8l1.6-.5-.6-1.4-1.9.5c-.3-.5-.7-.9-1.3-1l-.8 1.4c.3.2.6.4.7.7-.2.3-.3.7-.4 1.1H11l-.3 1.5h1.8c-.1.7-.5 1.4-1.2 1.8l.7 1.4c.3-.3.5-.6.6-.9.4.5.9.9 1.5 1.1l-.6.9z', bg: '#FF4400' },
  jd: { p: 'M3 5v14h18V5H3zm4.5 3.5h2.1v2.4c0 .8-.4 1.3-1 1.3-.7 0-1-.5-1-1.3V8.5zm3.4 0h2.1c.1 1.1.1 2.2 0 3.4-.1.5-.5.7-1 .7s-1-.2-1.1-.7V8.5zm3.3 0h2.1v4.2h-2.1V8.5zm-6.7 5.7h8.8v1.3H7.5v-1.3z', bg: '#E1251B' },
  meituan: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z', bg: '#FFD101' },
  eleme: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 5v3.5c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V7h1.5v3h1V7h1.5zm5 0v7c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5v-7H14v5.5h1V7h1.5z', bg: '#007AFF' },
  pinduoduo: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-6 5c0-1.1 2-2 4-2s4 .9 4 2v1H8v-1z', bg: '#E02E24' },
  unionpay: { p: 'M4 7h16c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zm2.5 3v4H5v-4h1.5zm4 0l-1.5 4H7.5l1.5-4h1.5zm4 0l-1.5 4H11l1.5-4h2zm4 0h-1.5v4H17l1.5-4z', bg: '#E21836' },
  // 银行类 - 用银行卡图标+品牌色
  cmb: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#C8102E' },
  icbc: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#B40020' },
  ccb: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#003F88' },
  abc: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#009A44' },
  boc: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#AF272F' },
  bankcomm: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#005BAC' },
  spdb: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#C8102E' },
  cmbc: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#005BAC' },
  citic: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#E60012' },
  ceb: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#7B2E86' },
  psbc: { p: 'M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z', bg: '#007A33' },
  // 理财类
  licaitong: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5c-2.8 0-5 2.2-5 5 0 .6.1 1.1.3 1.6C6 13.8 5 12.7 5 11.3 5 9 6.8 7 9.2 7c.5 0 .9.1 1.4.3C11.2 5.9 12.5 5 14 5c2.2 0 4 1.8 4 4 0 .3 0 .6-.1.8.4.1.8.3 1.1.5V10c0-2.8-2.2-5-5-5h-2zm0 4c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z', bg: '#FA9D3B' },
  yuebao: { p: 'M18.5 3H5.5C4.1 3 3 4.1 3 5.5v13C3 19.9 4.1 21 5.5 21h13c1.4 0 2.5-1.1 2.5-2.5V5.5C21 4.1 19.9 3 18.5 3zm-3.7 12.8c-.9-.3-2.2-.9-3.6-1.8-.8 1-1.8 1.8-3.2 1.8-2 0-3.3-1.5-3.2-3 0-1.3 1-2.5 3-2.5.8 0 1.8.3 2.8.7.4-.7.7-1.5.9-2.3H6.3V7.5h4.3v-1h-5V5.7h5v-1h1.7v1h5v.8h-5v1h4.2l-.3.7c-.4 1.3-1 2.4-1.7 3.4 1.2.5 2.4.9 3.3 1.2l-.5 1.3c-.8-.2-2-.5-3.2-1-.9.8-1.9 1.4-3 1.8l.5-1.3zm-5.7-1c-1.3 0-2 .8-2 1.6s.7 1.4 1.8 1.4c1 0 2-.7 2.8-1.8-1-.7-1.9-1.2-2.6-1.2z', bg: '#FF7300' },
  // 通用钱包图标
  wallet: { p: 'M21 7H5V5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2zm0 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V9h18zm-5 5c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z', bg: '#d4af7a' }
};

// ===== Brand Database =====
const BRANDS = {
  'spotify': { name: 'Spotify', slug: 'spotify', cat: '娱乐' },
  'netflix': { name: 'Netflix', slug: 'netflix', cat: '娱乐' },
  'youtube': { name: 'YouTube Premium', slug: 'youtube', cat: '娱乐' },
  'youtube premium': { name: 'YouTube Premium', slug: 'youtube', cat: '娱乐' },
  'notion': { name: 'Notion', slug: 'notion', cat: '生产力' },
  'icloud': { name: 'iCloud+', slug: 'apple', cat: '工具' },
  'icloud+': { name: 'iCloud+', slug: 'apple', cat: '工具' },
  'apple': { name: 'Apple', slug: 'apple', cat: '工具' },
  'app store': { name: 'App Store', slug: 'apple', cat: '娱乐' },
  'apple music': { name: 'Apple Music', slug: 'apple', cat: '娱乐' },
  'apple tv': { name: 'Apple TV+', slug: 'apple', cat: '娱乐' },
  'lightroom': { name: 'Adobe Lightroom', slug: 'adobe', cat: '工具' },
  'adobe lightroom': { name: 'Adobe Lightroom', slug: 'adobe', cat: '工具' },
  'photoshop': { name: 'Adobe Photoshop', slug: 'adobe', cat: '工具' },
  'wps': { name: 'WPS Office', slug: 'wps', cat: '生产力' },
  'wps office': { name: 'WPS Office', slug: 'wps', cat: '生产力' },
  'figma': { name: 'Figma', slug: 'figma', cat: '生产力' },
  'chatgpt': { name: 'ChatGPT', slug: 'chatgpt', cat: '工具' },
  'github': { name: 'GitHub', slug: 'github', cat: '工具' },
  'discord': { name: 'Discord Nitro', slug: 'discord', cat: '娱乐' },
  'discord nitro': { name: 'Discord Nitro', slug: 'discord', cat: '娱乐' },
  'baidu': { name: '百度网盘', slug: 'baidu', cat: '工具' },
  '百度网盘': { name: '百度网盘', slug: 'baidu', cat: '工具' },
  'qq音乐': { name: 'QQ音乐', slug: 'qqmusic', cat: '娱乐' },
  '网易云音乐': { name: '网易云音乐', slug: 'neteasecloudmusic', cat: '娱乐' },
  '网易云': { name: '网易云音乐', slug: 'neteasecloudmusic', cat: '娱乐' },
  'bilibili': { name: '哔哩哔哩', slug: 'bilibili', cat: '娱乐' },
  '哔哩哔哩': { name: '哔哩哔哩', slug: 'bilibili', cat: '娱乐' },
  'b站': { name: '哔哩哔哩', slug: 'bilibili', cat: '娱乐' },
  '爱奇艺': { name: '爱奇艺', slug: 'iqiyi', cat: '娱乐' },
  '腾讯视频': { name: '腾讯视频', slug: 'tencentvideo', cat: '娱乐' },
  '优酷': { name: '优酷', slug: 'youku', cat: '娱乐' },
  '芒果tv': { name: '芒果TV', slug: 'mgtv', cat: '娱乐' },
  '小红书': { name: '小红书', slug: 'xiaohongshu', cat: '娱乐' },
  '抖音': { name: '抖音', slug: 'douyin', cat: '娱乐' },
  '快手': { name: '快手', slug: 'kuaishou', cat: '娱乐' },
  '知乎': { name: '知乎', slug: 'zhihu', cat: '阅读' },
  '微博': { name: '微博', slug: 'weibo', cat: '娱乐' },
  '淘宝': { name: '淘宝88VIP', slug: 'taobao', cat: '购物' },
  '88vip': { name: '淘宝88VIP', slug: 'taobao', cat: '购物' },
  '京东': { name: '京东PLUS', slug: 'jd', cat: '购物' },
  '京东plus': { name: '京东PLUS', slug: 'jd', cat: '购物' },
  'plus会员': { name: '京东PLUS', slug: 'jd', cat: '购物' },
  '美团': { name: '美团会员', slug: 'meituan', cat: '生活' },
  '饿了么': { name: '饿了么', slug: 'eleme', cat: '生活' },
  '拼多多': { name: '拼多多', slug: 'pinduoduo', cat: '购物' },
  'dropbox': { name: 'Dropbox', slug: 'dropbox', cat: '工具' },
  'google one': { name: 'Google One', slug: 'google', cat: '工具' },
  'google': { name: 'Google', slug: 'google', cat: '工具' },
  'microsoft 365': { name: 'Microsoft 365', slug: 'microsoft', cat: '生产力' },
  'office': { name: 'Microsoft 365', slug: 'microsoft', cat: '生产力' },
  'canva': { name: 'Canva', slug: 'canva', cat: '生产力' },
  'adobe': { name: 'Adobe Creative Cloud', slug: 'adobe', cat: '工具' },
  'creative cloud': { name: 'Adobe Creative Cloud', slug: 'adobe', cat: '工具' },
  'spotify premium': { name: 'Spotify', slug: 'spotify', cat: '娱乐' },
  // 支付平台
  '云闪付': { name: '云闪付', slug: 'unionpay', cat: '工具' },
  '支付宝': { name: '支付宝', slug: 'alipay', cat: '工具' },
  '微信': { name: '微信', slug: 'wechat', cat: '工具' },
  '微信支付': { name: '微信支付', slug: 'wechat', cat: '工具' },
  // 理财平台
  '理财通': { name: '理财通', slug: 'licaicai', cat: '理财' },
  '余额宝': { name: '余额宝', slug: 'yuebao', cat: '理财' },
  '零钱通': { name: '零钱通', slug: 'wechat', cat: '理财' },
  '京东金融': { name: '京东金融', slug: 'jd', cat: '理财' },
  '度小满': { name: '度小满', slug: 'baidu', cat: '理财' },
  // 银行
  '招商银行': { name: '招商银行', slug: 'cmb', cat: '银行' },
  '招行': { name: '招商银行', slug: 'cmb', cat: '银行' },
  '工商银行': { name: '工商银行', slug: 'icbc', cat: '银行' },
  '工行': { name: '工商银行', slug: 'icbc', cat: '银行' },
  '建设银行': { name: '建设银行', slug: 'ccb', cat: '银行' },
  '建行': { name: '建设银行', slug: 'ccb', cat: '银行' },
  '农业银行': { name: '农业银行', slug: 'abc', cat: '银行' },
  '农行': { name: '农业银行', slug: 'abc', cat: '银行' },
  '中国银行': { name: '中国银行', slug: 'boc', cat: '银行' },
  '中行': { name: '中国银行', slug: 'boc', cat: '银行' },
  '交通银行': { name: '交通银行', slug: 'bankcomm', cat: '银行' },
  '交行': { name: '交通银行', slug: 'bankcomm', cat: '银行' },
  '浦发银行': { name: '浦发银行', slug: 'spdb', cat: '银行' },
  '浦发': { name: '浦发银行', slug: 'spdb', cat: '银行' },
  '民生银行': { name: '民生银行', slug: 'cmbc', cat: '银行' },
  '民生': { name: '民生银行', slug: 'cmbc', cat: '银行' },
  '中信银行': { name: '中信银行', slug: 'citic', cat: '银行' },
  '中信': { name: '中信银行', slug: 'citic', cat: '银行' },
  '光大银行': { name: '光大银行', slug: 'ceb', cat: '银行' },
  '光大': { name: '光大银行', slug: 'ceb', cat: '银行' },
  '邮储银行': { name: '邮储银行', slug: 'psbc', cat: '银行' },
  '邮储': { name: '邮储银行', slug: 'psbc', cat: '银行' },
  '兴业银行': { name: '兴业银行', slug: 'cib', cat: '银行' },
  '平安银行': { name: '平安银行', slug: 'pab', cat: '银行' },
  '广发银行': { name: '广发银行', slug: 'cgb', cat: '银行' },
  '华夏银行': { name: '华夏银行', slug: 'hxb', cat: '银行' }
};

// Expense categories
const EXPENSE_CATS = [
  { id: 'food', icon: '🍜', name: '餐饮' },
  { id: 'shopping', icon: '🛒', name: '购物' },
  { id: 'transport', icon: '🚇', name: '交通' },
  { id: 'home', icon: '🏠', name: '居家' },
  { id: 'entertainment', icon: '🎮', name: '娱乐' },
  { id: 'medical', icon: '💊', name: '医疗' },
  { id: 'study', icon: '📚', name: '学习' },
  { id: 'other', icon: '💡', name: '其他' }
];
const INCOME_CATS = [
  { id: 'salary', icon: '💰', name: '工资' },
  { id: 'bonus', icon: '🎁', name: '红包' },
  { id: 'invest', icon: '📈', name: '理财' },
  { id: 'other_in', icon: '💡', name: '其他' }
];

// Account card color classes
const CARD_COLORS = ['dark1', 'dark2', 'dark3', 'dark4'];

// ===== State =====
let state = {
  accounts: [],
  subscriptions: [],
  transactions: [],
  currentView: 'overview',
  lastView: 'overview',
  activeCardIdx: 0,
  txType: 'expense',
  selectedCat: 'food',
  selectedCycle: 'month',
  selectedAcctType: 'bank',
  selectedCardColor: 'gold',
  currentSubId: null,
  fetchedAppIcon: null,
  editSubId: null,
  cardIconPickerId: null,
  settings: {
    lockType: 'none', // 'none', 'biometric', 'pin'
    pinHash: null,
    notifications: false,
    exRates: { USD: 7.25, EUR: 7.85, GBP: 9.20, JPY: 0.048, HKD: 0.93, TWD: 0.22 },
    defaultCurrency: 'CNY'
  },
  qrcodes: [],
  invoices: [],
  reportPeriod: 'month',
  qrSelectedCat: 'all',
  qrEditingId: null,
  qrPreviewData: null,
  qrViewingId: null,
  pinInputBuffer: '',
  pinSetupBuffer: '',
  pinSetupStep: 0,
  pinSetupFirst: '',
  invoiceEditingId: null,
  invoicePreviewData: null,
  invoiceViewingId: null,
  invSelectedCat: 'all',
  invoicePreviewType: 'image',
  cloudEnabled: false,
  cloudUrl: '',
  cloudKey: '',
  supabaseClient: null,
  cloudUser: null,
  cloudLastSync: null,
  authEmail: ''
};

// Card color themes
const CARD_THEMES = {
  gold: {
    gradient: 'linear-gradient(145deg,#1c1c1e 0%,#0d0d0d 100%)',
    border: 'rgba(255,255,255,0.06)',
    accent: '#d4af7a',
    text: '#fff',
    subtext: 'rgba(255,255,255,0.5)',
    chipBg: 'linear-gradient(135deg,#c8c8c8 0%,#909090 40%,#d0d0d0 60%,#888 100%)',
    hasChip: true
  },
  blue: {
    gradient: 'linear-gradient(145deg,#0a1628 0%,#0d1f3c 50%,#061020 100%)',
    border: 'rgba(22,119,255,0.15)',
    accent: '#4A9EFF',
    text: '#fff',
    subtext: 'rgba(255,255,255,0.4)',
    chipBg: 'linear-gradient(135deg,#c8c8c8 0%,#909090 40%,#d0d0d0 60%,#888 100%)',
    hasChip: true
  },
  green: {
    gradient: 'linear-gradient(145deg,#0a1f12 0%,#0d2818 50%,#061a0e 100%)',
    border: 'rgba(7,193,96,0.12)',
    accent: '#2DC770',
    text: '#fff',
    subtext: 'rgba(255,255,255,0.4)',
    chipBg: 'linear-gradient(135deg,#c8c8c8 0%,#909090 40%,#d0d0d0 60%,#888 100%)',
    hasChip: true
  },
  red: {
    gradient: 'linear-gradient(145deg,#2a0a0a 0%,#1a0505 50%,#100303 100%)',
    border: 'rgba(255,92,72,0.15)',
    accent: '#FF5C48',
    text: '#fff',
    subtext: 'rgba(255,255,255,0.4)',
    chipBg: 'linear-gradient(135deg,#c8c8c8 0%,#909090 40%,#d0d0d0 60%,#888 100%)',
    hasChip: true
  },
  purple: {
    gradient: 'linear-gradient(145deg,#1a0a2a 0%,#100518 50%,#080310 100%)',
    border: 'rgba(180,100,255,0.15)',
    accent: '#B464FF',
    text: '#fff',
    subtext: 'rgba(255,255,255,0.4)',
    chipBg: 'linear-gradient(135deg,#c8c8c8 0%,#909090 40%,#d0d0d0 60%,#888 100%)',
    hasChip: true
  },
  pink: {
    gradient: 'linear-gradient(145deg,#2a0a1a 0%,#180510 50%,#100308 100%)',
    border: 'rgba(255,100,150,0.15)',
    accent: '#FF6496',
    text: '#fff',
    subtext: 'rgba(255,255,255,0.4)',
    chipBg: 'linear-gradient(135deg,#c8c8c8 0%,#909090 40%,#d0d0d0 60%,#888 100%)',
    hasChip: true
  },
  orange: {
    gradient: 'linear-gradient(145deg,#2a1a0a 0%,#181005 50%,#100a03 100%)',
    border: 'rgba(255,159,10,0.15)',
    accent: '#FF9F0A',
    text: '#fff',
    subtext: 'rgba(255,255,255,0.4)',
    chipBg: 'linear-gradient(135deg,#c8c8c8 0%,#909090 40%,#d0d0d0 60%,#888 100%)',
    hasChip: true
  },
  dark: {
    gradient: 'linear-gradient(145deg,#141416 0%,#0a0a0c 100%)',
    border: 'rgba(255,255,255,0.08)',
    accent: '#fff',
    text: '#fff',
    subtext: 'rgba(255,255,255,0.4)',
    chipBg: 'linear-gradient(135deg,#c8c8c8 0%,#909090 40%,#d0d0d0 60%,#888 100%)',
    hasChip: true
  }
};

// Account type config
const ACCOUNT_TYPES = {
  bank: { name: '储蓄卡', brand: 'UnionPay', hasChip: true, hasHolo: true },
  alipay: { name: '支付宝', brand: 'Alipay', hasChip: false, hasHolo: false },
  wechat: { name: '微信零钱', brand: 'WeChat Pay', hasChip: false, hasHolo: false },
  yunshanfu: { name: '云闪付', brand: 'UnionPay', hasChip: false, hasHolo: false },
  licaicai: { name: '理财通', brand: 'Licaitong', hasChip: false, hasHolo: false },
  yuebao: { name: '余额宝', brand: 'Yuebao', hasChip: false, hasHolo: false },
  other: { name: '钱包', brand: 'Wallet', hasChip: false, hasHolo: false }
};

// ===== Storage =====
function load() {
  try {
    state.accounts = JSON.parse(localStorage.getItem(KEYS.accounts) || '[]');
    state.subscriptions = JSON.parse(localStorage.getItem(KEYS.subscriptions) || '[]');
    state.transactions = JSON.parse(localStorage.getItem(KEYS.transactions) || '[]');
    state.qrcodes = JSON.parse(localStorage.getItem(KEYS.qrcodes) || '[]');
    state.invoices = JSON.parse(localStorage.getItem(KEYS.invoices) || '[]');
    // Merge loaded settings with defaults to ensure all keys exist
    const loaded = JSON.parse(localStorage.getItem(KEYS.settings) || '{}');
    const defaults = { lockType: 'none', pinHash: null, notifications: false, exRates: { USD: 7.25, EUR: 7.85, GBP: 9.20, JPY: 0.048, HKD: 0.93, TWD: 0.22 }, defaultCurrency: 'CNY' };
    state.settings = { ...defaults, ...loaded };
    if (!state.settings.exRates) state.settings.exRates = defaults.exRates;
  } catch(e) { console.error('Load error', e); }
}
function save() {
  localStorage.setItem(KEYS.accounts, JSON.stringify(state.accounts));
  localStorage.setItem(KEYS.subscriptions, JSON.stringify(state.subscriptions));
  localStorage.setItem(KEYS.transactions, JSON.stringify(state.transactions));
  localStorage.setItem(KEYS.settings, JSON.stringify(state.settings));
  localStorage.setItem(KEYS.qrcodes, JSON.stringify(state.qrcodes));
  localStorage.setItem(KEYS.invoices, JSON.stringify(state.invoices));
  updateBadge();
  markLocalChange();
}

// ===== Utils =====
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const fmt = n => {
  if (n === null || n === undefined || isNaN(n)) return '0';
  return Number(n).toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};
const today = () => new Date().toISOString().slice(0, 10);
const daysBetween = (d1, d2) => Math.ceil((new Date(d2) - new Date(d1)) / 86400000);
const addDays = (dateStr, days) => {
  const d = new Date(dateStr); d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};
const addMonths = (dateStr, months) => {
  const d = new Date(dateStr); d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
};
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function cycleToDays(cycle) {
  return { week: 7, month: 30, quarter: 90, year: 365 }[cycle] || 30;
}
function cycleToLabel(cycle) {
  return { week: '/周', month: '/月', quarter: '/季', year: '/年' }[cycle] || '/月';
}
function cycleAdd(dateStr, cycle) {
  const d = new Date(dateStr);
  if (cycle === 'week') d.setDate(d.getDate() + 7);
  else if (cycle === 'month') d.setMonth(d.getMonth() + 1);
  else if (cycle === 'quarter') d.setMonth(d.getMonth() + 3);
  else if (cycle === 'year') d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}
function cyclePrev(dateStr, cycle) {
  const d = new Date(dateStr);
  if (cycle === 'week') d.setDate(d.getDate() - 7);
  else if (cycle === 'month') d.setMonth(d.getMonth() - 1);
  else if (cycle === 'quarter') d.setMonth(d.getMonth() - 3);
  else if (cycle === 'year') d.setFullYear(d.getFullYear() - 1);
  return d.toISOString().slice(0, 10);
}

function getMonthRange(dateStr) {
  const d = dateStr ? new Date(dateStr) : new Date();
  const y = d.getFullYear(), m = d.getMonth();
  const start = new Date(y, m, 1).toISOString().slice(0,10);
  const end = new Date(y, m+1, 0).toISOString().slice(0,10);
  return { start, end, label: `${y}年${m+1}月` };
}

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), 2000);
}

// ===== Haptic Feedback =====
function haptic(type) {
  if (!navigator.vibrate) return;
  const patterns = { light: 8, medium: 15, heavy: 25, success: [10, 30, 10], error: [20, 50, 20, 50, 20] };
  navigator.vibrate(patterns[type] || 10);
}

// Global click haptic - fires on any button/interactive element tap
document.addEventListener('click', (e) => {
  const target = e.target.closest('button, .pick, .cat-i, .tbi, .qai, .info-r, .pl, .sc2, .bc, .ai-quick-btn, .ai-action-btn, .color-pick, .type-opt');
  if (target) haptic('light');
}, true);

// ===== PWA Badge (app icon badge for expiring subscriptions) =====
function updateBadge() {
  if (!('setAppBadge' in navigator)) return;
  try {
    const todayStr = today();
    const expiring = state.subscriptions.filter(s => {
      const d = daysBetween(todayStr, s.nextDate);
      return d >= 0 && d <= 3;
    }).length;
    if (expiring > 0) {
      navigator.setAppBadge(expiring);
    } else {
      navigator.clearAppBadge?.();
    }
  } catch(e) {}
}

// Handle URL shortcuts (from manifest shortcuts)
function handleUrlAction() {
  const params = new URLSearchParams(window.location.search);
  const action = params.get('action');
  if (action === 'add-tx') {
    setTimeout(() => openAddTx(), 500);
  } else if (action === 'add-sub') {
    setTimeout(() => { showView('subs'); openAddSub(); }, 500);
  } else if (action === 'ai-chat') {
    setTimeout(() => openAIChat(), 500);
  }
  // Clean up URL
  if (action) {
    window.history.replaceState({}, '', './');
  }
}

// ===== Brand Icon =====
function brandIconSvg(brand) {
  if (!brand) return letterIcon('?', '#d4af7a');
  // If brand has an iconUrl (from App Store), use it
  if (brand.iconUrl) {
    return `<div style="width:100%;height:100%;border-radius:12px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#fff;"><img src="${brand.iconUrl}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentNode.innerHTML='${letterIcon((brand.name[0]||'?').toUpperCase(), '#d4af7a').replace(/'/g, '&#39;').replace(/"/g, '&quot;')}';" /></div>`;
  }
  const bi = BRAND_ICONS[brand.slug];
  if (bi && bi.p) {
    // Real brand icon on colored background
    const fg = isLightColor(bi.bg) ? '#000' : '#fff';
    return `<div style="width:100%;height:100%;border-radius:12px;background:${bi.bg};display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" style="width:26px;height:26px;fill:${fg};"><path d="${bi.p}"/></svg></div>`;
  }
  // Fallback: colored letter badge
  return letterIcon((brand.name[0]||'?').toUpperCase(), bi ? bi.bg : '#d4af7a');
}

function isLightColor(hex) {
  const h = hex.replace('#','');
  const r = parseInt(h.substr(0,2),16), g = parseInt(h.substr(2,2),16), b = parseInt(h.substr(4,2),16);
  return (r*299+g*587+b*114)/1000 > 150;
}

function matchBrand(name) {
  if (!name) return null;
  const n = name.toLowerCase().trim();
  for (const key in BRANDS) {
    if (n.includes(key) || key.includes(n)) return BRANDS[key];
  }
  return null;
}

function letterIcon(letter, bg) {
  const fg = isLightColor(bg) ? '#000' : '#fff';
  return `<div style="width:100%;height:100%;border-radius:12px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:${fg};">${letter}</div>`;
}

function txIconSvg(type) {
  const icons = {
    food: '<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    shopping: '<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    transport: '<svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    entertainment: '<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    medical: '<svg viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    study: '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    other: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    salary: '<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    bonus: '<svg viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
    invest: '<svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    other_in: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>',
    sub: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M7 10c.5-1 2.5-2 5-2s4.5 1 5 2M7 14c.5 1 2.5 2 5 2s4.5-1 5-2"/></svg>',
    sub2: '<svg viewBox="0 0 24 24"><path d="M6 2l6 18h2l6-18h-3l-3.5 11L10 2H6z"/></svg>'
  };
  return icons[type] || icons.other;
}

// ===== View Switching =====
function showView(name) {
  state.lastView = state.currentView;
  state.currentView = name;
  $$('.view').forEach(v => v.classList.remove('active'));
  const target = $(`#view-${name}`);
  if (target) target.classList.add('active');
  $$('.tbi').forEach(t => t.classList.remove('on'));
  const tab = document.querySelector(`.tbi[data-v="${name}"]`);
  if (tab) tab.classList.add('on');
  // Hide FAB on views that don't need it
  const fab = $('#fab');
  if (fab) fab.style.display = (name === 'reports' || name === 'settings' || name === 'subdetail') ? 'none' : 'flex';
  // Reset account detail visibility when navigating
  if (name === 'accounts') {
    const detailEl = $('#acct-detail-section');
    if (detailEl) detailEl.style.display = 'none';
  }
  render();
  haptic('light');
}

// ===== Sheets =====
function openSheet(id) { $(`#${id}`).classList.add('on'); }
function closeSheet(id) { $(`#${id}`).classList.remove('on'); }
$$('.sheet-overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) o.classList.remove('on'); }));

function fabAction() {
  const v = state.currentView;
  if (v === 'tx' || v === 'overview') openAddTx();
  else if (v === 'subs') openAddSub();
  else if (v === 'accounts') openAddAccount();
  else if (v === 'qrcodes') openAddQRCode();
  else if (v === 'invoices') openAddInvoice();
  else openAddTx();
}

// ===== Add Transaction =====
function openAddTx(prefill) {
  state.txType = 'expense';
  state.selectedCat = 'food';
  $('#tx-amt-input').value = '';
  $('#tx-note').value = '';
  $('#tx-date').value = today();
  // Type toggle
  $$('#tx-type .type-opt').forEach(b => {
    b.classList.remove('on', 'exp', 'inc');
    if (b.dataset.t === state.txType) b.classList.add('on', state.txType === 'expense' ? 'exp' : 'inc');
  });
  renderCatGrid();
  renderTxAcctPick();
  openSheet('sheet-tx');
  setTimeout(() => $('#tx-amt-input').focus(), 300);
}

function renderCatGrid() {
  const cats = state.txType === 'expense' ? EXPENSE_CATS : INCOME_CATS;
  $('#cat-grid').innerHTML = cats.map(c => `<div class="cat-i ${c.id === state.selectedCat ? 'on' : ''}" data-c="${c.id}">
    <div class="cat-ic">${c.icon}</div><div class="cat-nm">${c.name}</div>
  </div>`).join('');
  $$('#cat-grid .cat-i').forEach(el => el.onclick = () => {
    state.selectedCat = el.dataset.c;
    renderCatGrid();
  });
}

function renderTxAcctPick() {
  const html = state.accounts.map(a => {
    const isFirst = state.accounts.indexOf(a) === 0;
    return `<button class="pick ${isFirst ? 'on' : ''}" data-id="${a.id}">${a.name}</button>`;
  }).join('');
  $('#tx-acct-pick').innerHTML = html || '<div style="font-size:12px;color:var(--t3);padding:8px 0;">请先在「账户」页添加账户</div>';
  $$('#tx-acct-pick .pick').forEach(b => b.onclick = () => {
    $$('#tx-acct-pick .pick').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
  });
}

function saveTx() {
  const amt = parseFloat($('#tx-amt-input').value);
  if (!amt || amt <= 0) { toast('请输入金额'); return; }
  if (state.accounts.length === 0) { toast('请先添加账户'); return; }
  const acctBtn = document.querySelector('#tx-acct-pick .pick.on');
  const acctId = acctBtn ? acctBtn.dataset.id : state.accounts[0].id;
  const note = $('#tx-note').value.trim();
  const date = $('#tx-date').value || today();
  const cats = state.txType === 'expense' ? EXPENSE_CATS : INCOME_CATS;
  const cat = cats.find(c => c.id === state.selectedCat) || cats[0];
  const now = new Date();
  const tx = {
    id: genId(), type: state.txType, amount: amt,
    category: cat.id, categoryName: cat.name, categoryIcon: cat.icon,
    note, accountId: acctId, date,
    time: `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`,
    timestamp: now.toISOString(),
    isSubscription: false
  };
  state.transactions.unshift(tx);
  // Update account balance
  const acct = state.accounts.find(a => a.id === acctId);
  if (acct) {
    acct.balance += state.txType === 'expense' ? -amt : amt;
  }
  save();
  closeSheet('sheet-tx');
  toast('记账成功');
  haptic('success');
  render();
}

// Type toggle for tx
$$('#tx-type .type-opt').forEach(b => {
  b.onclick = () => {
    state.txType = b.dataset.t;
    state.selectedCat = state.txType === 'expense' ? 'food' : 'salary';
    $$('#tx-type .type-opt').forEach(x => { x.classList.remove('on','exp','inc'); });
    b.classList.add('on', state.txType === 'expense' ? 'exp' : 'inc');
    renderCatGrid();
  };
});

// ===== Add Subscription =====
function openAddSub() {
  state.editSubId = null;
  $('#sub-sheet-title').textContent = '添加订阅';
  $('#sub-name').value = '';
  $('#sub-appurl').value = '';
  $('#sub-icon-preview').innerHTML = '';
  $('#sub-price').value = '';
  $('#sub-currency').value = 'CNY';
  $('#sub-currency-hint').style.display = 'none';
  $('#sub-nextdate').value = today();
  $('#sub-note').value = '';
  state.selectedCycle = 'month';
  state.fetchedAppIcon = null; // Reset fetched icon
  $$('#sub-cycle-pick .pick').forEach(p => p.classList.toggle('on', p.dataset.c === 'month'));
  renderSubAcctPick();
  renderSubSuggest();
  openSheet('sheet-sub');
}

function openEditSub(id) {
  const sub = state.subscriptions.find(s => s.id === id);
  if (!sub) return;
  state.editSubId = id;
  $('#sub-sheet-title').textContent = '编辑订阅';
  $('#sub-name').value = sub.name;
  $('#sub-appurl').value = sub.appUrl || '';
  $('#sub-price').value = sub.price;
  $('#sub-currency').value = sub.currency || 'CNY';
  updateCurrencyHint();
  $('#sub-nextdate').value = sub.nextDate;
  $('#sub-note').value = sub.note || '';
  state.selectedCycle = sub.cycle;
  state.fetchedAppIcon = sub.brand?.iconUrl ? { iconUrl: sub.brand.iconUrl, name: sub.brand.name } : null;
  const previewEl = $('#sub-icon-preview');
  if (state.fetchedAppIcon) {
    previewEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid var(--border);">
        <img src="${state.fetchedAppIcon.iconUrl}" style="width:48px;height:48px;border-radius:12px;object-fit:cover;" onerror="this.style.opacity=0.3;" />
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:600;color:var(--t1);">${state.fetchedAppIcon.name || sub.name}</div>
          <div style="font-size:11px;color:var(--gold);margin-top:2px;">当前图标 · 可粘贴新链接替换</div>
        </div>
      </div>
    `;
  } else if (sub.brand) {
    // Show built-in brand icon
    const bi = BRAND_ICONS[sub.brand.slug];
    if (bi && bi.p) {
      const fg = isLightColor(bi.bg) ? '#000' : '#fff';
      previewEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid var(--border);">
          <div style="width:48px;height:48px;border-radius:12px;background:${bi.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg viewBox="0 0 24 24" style="width:26px;height:26px;fill:${fg};"><path d="${bi.p}"/></svg>
          </div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:600;color:var(--t1);">${sub.brand.name}</div>
            <div style="font-size:11px;color:var(--gold);margin-top:2px;">内置图标 · 可粘贴链接替换</div>
          </div>
        </div>
      `;
    } else {
      const bg = bi ? bi.bg : '#d4af7a';
      const fg = isLightColor(bg) ? '#000' : '#fff';
      previewEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid var(--border);">
          <div style="width:48px;height:48px;border-radius:12px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:${fg};flex-shrink:0;">${(sub.brand.name[0]||'?').toUpperCase()}</div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:600;color:var(--t1);">${sub.brand.name}</div>
            <div style="font-size:11px;color:var(--gold);margin-top:2px;">字母图标 · 可粘贴链接替换</div>
          </div>
        </div>
      `;
    }
  } else {
    previewEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid var(--border);">
        <div style="width:48px;height:48px;border-radius:12px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:var(--t2);flex-shrink:0;">${(sub.name[0]||'?').toUpperCase()}</div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:600;color:var(--t1);">${sub.name}</div>
          <div style="font-size:11px;color:var(--gold);margin-top:2px;">无图标 · 可粘贴链接获取</div>
        </div>
      </div>
    `;
  }
  $$('#sub-cycle-pick .pick').forEach(p => p.classList.toggle('on', p.dataset.c === sub.cycle));
  renderSubAcctPick();
  if (sub.accountId) {
    $$('#sub-acct-pick .pick').forEach(b => {
      b.classList.toggle('on', b.dataset.id === sub.accountId);
    });
  }
  renderSubSuggest();
  openSheet('sheet-sub');
}

function renderSubAcctPick() {
  if (state.accounts.length === 0) {
    $('#sub-acct-pick').innerHTML = '<div style="font-size:12px;color:var(--t3);padding:8px 0;">请先添加账户</div>';
    return;
  }
  $('#sub-acct-pick').innerHTML = state.accounts.map((a,i) =>
    `<button class="pick ${i===0?'on':''}" data-id="${a.id}">${a.name}</button>`
  ).join('');
  $$('#sub-acct-pick .pick').forEach(b => b.onclick = () => {
    $$('#sub-acct-pick .pick').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
  });
}

function renderSubSuggest() {
  const names = Object.values(BRANDS).filter((v,i,a) => a.findIndex(x=>x.name===v.name)===i);
  $('#sub-suggest').innerHTML = names.slice(0,30).map(b => `<option value="${b.name}">`).join('');
}

function saveSub() {
  const name = $('#sub-name').value.trim();
  const price = parseFloat($('#sub-price').value);
  if (!name) { toast('请输入服务名称'); return; }
  if (!price || price <= 0) { toast('请输入金额'); return; }
  const nextDate = $('#sub-nextdate').value || today();
  const note = $('#sub-note').value.trim();
  const appUrl = $('#sub-appurl').value.trim();
  const currency = $('#sub-currency').value || 'CNY';
  const acctBtn = document.querySelector('#sub-acct-pick .pick.on');
  const accountId = acctBtn ? acctBtn.dataset.id : (state.accounts[0]?.id || null);
  
  // First try to match brand from built-in database
  let brand = matchBrand(name);
  
  // If no built-in match but we have a fetched App Store icon, use that
  if (!brand && state.fetchedAppIcon) {
    brand = {
      name: state.fetchedAppIcon.name || name,
      slug: 'appstore_' + genId().slice(0, 6),
      cat: '订阅',
      iconUrl: state.fetchedAppIcon.iconUrl
    };
  }
  // If built-in brand exists but we also have a fetched icon, prefer the fetched icon URL
  if (brand && state.fetchedAppIcon) {
    brand.iconUrl = state.fetchedAppIcon.iconUrl;
    if (state.fetchedAppIcon.name && !BRAND_ICONS[brand.slug]) {
      brand.name = state.fetchedAppIcon.name;
    }
  }
  
  const isEdit = !!state.editSubId;
  if (isEdit) {
    const existing = state.subscriptions.find(s => s.id === state.editSubId);
    if (existing) {
      existing.name = name;
      existing.price = price;
      existing.currency = currency;
      existing.cycle = state.selectedCycle;
      existing.nextDate = nextDate;
      existing.note = note;
      existing.accountId = accountId;
      existing.brand = brand ? { name: brand.name, slug: brand.slug, color: brand.color, cat: brand.cat, iconUrl: brand.iconUrl || null } : null;
      existing.appUrl = appUrl || null;
    }
    state.editSubId = null;
  } else {
    const sub = {
      id: genId(), name, price, currency, cycle: state.selectedCycle,
      nextDate, note, accountId,
      brand: brand ? { name: brand.name, slug: brand.slug, color: brand.color, cat: brand.cat, iconUrl: brand.iconUrl || null } : null,
      appUrl: appUrl || null,
      autoRenew: true,
      createdAt: new Date().toISOString()
    };
    state.subscriptions.push(sub);
  }
  save();
  closeSheet('sheet-sub');
  toast(isEdit ? '订阅已更新' : '订阅已添加');
  haptic('success');
  render();
}

// ===== App Store Icon Fetch =====
async function fetchAppIcon() {
  const urlInput = $('#sub-appurl');
  const url = urlInput.value.trim();
  const previewEl = $('#sub-icon-preview');
  const btn = $('#sub-fetch-btn');
  
  if (!url) {
    toast('请先粘贴App Store链接');
    return;
  }
  
  // Extract app ID from various App Store URL formats
  let appId = null;
  // Format: https://apps.apple.com/app/id1234567890
  const idMatch = url.match(/id(\d+)/);
  if (idMatch) appId = idMatch[1];
  
  if (!appId) {
    // Try searching by app name from URL or name field
    const appName = $('#sub-name').value.trim() || extractAppNameFromUrl(url);
    if (appName) {
      previewEl.innerHTML = '<div style="font-size:12px;color:var(--t3);padding:8px;">正在搜索应用...</div>';
      btn.disabled = true;
      btn.textContent = '搜索中...';
      try {
        const result = await searchAppByName(appName);
        if (result) {
          appId = result.trackId;
        }
      } catch(e) {}
      btn.disabled = false;
      btn.textContent = '获取图标';
    }
  }
  
  if (!appId) {
    previewEl.innerHTML = '<div style="font-size:12px;color:var(--red);padding:8px;">未找到应用，请检查链接是否正确</div>';
    toast('无法识别链接');
    return;
  }
  
  previewEl.innerHTML = '<div style="font-size:12px;color:var(--t3);padding:8px;">正在获取图标...</div>';
  btn.disabled = true;
  btn.textContent = '获取中...';
  
  try {
    const resp = await fetch(`https://itunes.apple.com/lookup?id=${appId}&country=cn`);
    if (!resp.ok) throw new Error('network');
    const data = await resp.json();
    
    if (data.results && data.results.length > 0) {
      const app = data.results[0];
      const iconUrl = app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60;
      const appName = app.trackName;
      const primaryGenre = app.primaryGenreName || '应用';
      
      if (iconUrl) {
        state.fetchedAppIcon = { iconUrl, name: appName, appId };
        // Auto-fill name if empty
        if (!$('#sub-name').value.trim()) {
          $('#sub-name').value = appName;
        }
        previewEl.innerHTML = `
          <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid var(--border);">
            <img src="${iconUrl}" style="width:48px;height:48px;border-radius:12px;object-fit:cover;" onerror="this.style.opacity=0.3;" />
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:600;color:var(--t1);">${appName}</div>
              <div style="font-size:11px;color:var(--t3);margin-top:2px;">${primaryGenre} · 图标已获取 ✓</div>
            </div>
          </div>
        `;
        toast('图标获取成功');
      } else {
        throw new Error('no icon');
      }
    } else {
      throw new Error('not found');
    }
  } catch(e) {
    previewEl.innerHTML = '<div style="font-size:12px;color:var(--red);padding:8px;">获取失败，请检查链接或网络</div>';
    toast('获取失败');
  }
  
  btn.disabled = false;
  btn.textContent = '获取图标';
}

function extractAppNameFromUrl(url) {
  // Try to extract app name from URL like /app/app-name/id123
  const match = url.match(/\/app\/([^/]+)\//);
  if (match) {
    return decodeURIComponent(match[1].replace(/-/g, ' '));
  }
  return null;
}

async function searchAppByName(name) {
  try {
    const resp = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(name)}&country=cn&entity=software&limit=1`);
    if (!resp.ok) return null;
    const data = await resp.json();
    if (data.results && data.results.length > 0) {
      return data.results[0];
    }
  } catch(e) {}
  return null;
}

// Auto-fetch icon when user pastes an App Store link
let _iconFetchTimer = null;
$('#sub-appurl').addEventListener('input', () => {
  clearTimeout(_iconFetchTimer);
  _iconFetchTimer = setTimeout(() => {
    const url = $('#sub-appurl').value.trim();
    // Auto-trigger fetch if it looks like an App Store link
    if (url.length > 10 && /apps\.apple\.com|itunes\.apple\.com|id\d+/.test(url)) {
      fetchAppIcon();
    }
  }, 500);
});

$$('#sub-cycle-pick .pick').forEach(p => p.onclick = () => {
  state.selectedCycle = p.dataset.c;
  $$('#sub-cycle-pick .pick').forEach(x => x.classList.remove('on'));
  p.classList.add('on');
});

// Auto-match brand when typing name
$('#sub-name').addEventListener('input', () => {
  const brand = matchBrand($('#sub-name').value);
  if (brand && !$('#sub-price').value) {
    const suggestions = { spotify: 68, netflix: 78, notion: 96, icloud: 21, youtube: 35, bilibili: 25, apple: 21 };
    const key = Object.keys(BRANDS).find(k => BRANDS[k].slug === brand.slug);
    if (suggestions[key]) $('#sub-price').value = suggestions[key];
  }
});

// ===== Add Account =====
function openAddAccount() {
  $('#acct-name').value = '';
  $('#acct-balance').value = '0';
  $('#acct-num').value = '';
  state.selectedAcctType = 'bank';
  state.selectedCardColor = 'gold';
  $$('#acct-type-pick .pick').forEach(p => p.classList.toggle('on', p.dataset.t === 'bank'));
  $$('#acct-color-pick .color-pick').forEach(p => p.classList.toggle('on', p.dataset.c === 'gold'));
  openSheet('sheet-acct');
}

function saveAccount() {
  const name = $('#acct-name').value.trim();
  if (!name) { toast('请输入账户名称'); return; }
  const balance = parseFloat($('#acct-balance').value) || 0;
  const cardNumber = $('#acct-num').value.trim();
  
  // Auto-detect account type from name
  let acctType = state.selectedAcctType;
  let acctColor = state.selectedCardColor;
  const brand = matchBrand(name);
  if (brand) {
    // Map brand to account type
    if (brand.slug === 'alipay') acctType = 'alipay';
    else if (brand.slug === 'wechat') acctType = 'wechat';
    else if (brand.slug === 'unionpay') acctType = 'yunshanfu';
    else if (brand.slug === 'licaicai') acctType = 'licaicai';
    else if (brand.slug === 'yuebao') acctType = 'yuebao';
    else if (['cmb','icbc','ccb','abc','boc','bankcomm','spdb','cmbc','citic','ceb','psbc','cib','pab','cgb','hxb'].includes(brand.slug)) {
      acctType = 'bank';
      // Use brand color for bank cards
      const bi = BRAND_ICONS[brand.slug];
      if (bi) {
        // Map brand bg color to closest theme
        if (bi.bg.includes('003F88') || bi.bg.includes('005BAC') || bi.bg.includes('007A33')) acctColor = 'blue';
        else if (bi.bg.includes('009A44') || bi.bg.includes('007A33')) acctColor = 'green';
        else if (bi.bg.includes('B40020') || bi.bg.includes('C8102E') || bi.bg.includes('AF272F') || bi.bg.includes('E60012') || bi.bg.includes('7B2E86')) acctColor = 'red';
      }
    }
  }
  
  const acct = {
    id: genId(), name, type: acctType, balance,
    cardNumber, color: acctColor, brandSlug: brand?.slug || null,
    createdAt: new Date().toISOString()
  };
  state.accounts.push(acct);
  save();
  closeSheet('sheet-acct');
  toast('账户已添加');
  haptic('success');
  render();
}

$$('#acct-type-pick .pick').forEach(p => p.onclick = () => {
  state.selectedAcctType = p.dataset.t;
  $$('#acct-type-pick .pick').forEach(x => x.classList.remove('on'));
  p.classList.add('on');
});

$$('#acct-color-pick .color-pick').forEach(p => p.onclick = () => {
  state.selectedCardColor = p.dataset.c;
  $$('#acct-color-pick .color-pick').forEach(x => {
    x.classList.remove('on');
    x.style.boxShadow = '';
    x.style.borderColor = 'transparent';
  });
  p.classList.add('on');
});

// Auto-detect type when typing account name
$('#acct-name').addEventListener('input', () => {
  const name = $('#acct-name').value;
  const brand = matchBrand(name);
  if (brand) {
    let autoType = 'bank';
    let autoColor = 'gold';
    if (brand.slug === 'alipay') { autoType = 'alipay'; autoColor = 'blue'; }
    else if (brand.slug === 'wechat') { autoType = 'wechat'; autoColor = 'green'; }
    else if (brand.slug === 'unionpay') { autoType = 'yunshanfu'; autoColor = 'red'; }
    else if (brand.slug === 'licaicai') { autoType = 'licaicai'; autoColor = 'orange'; }
    else if (brand.slug === 'yuebao') { autoType = 'yuebao'; autoColor = 'orange'; }
    else if (['cmb','icbc','boc','spdb','citic'].includes(brand.slug)) { autoType = 'bank'; autoColor = 'red'; }
    else if (['ccb','bankcomm','cmbc'].includes(brand.slug)) { autoType = 'bank'; autoColor = 'blue'; }
    else if (['abc','psbc'].includes(brand.slug)) { autoType = 'bank'; autoColor = 'green'; }
    else if (brand.slug === 'ceb') { autoType = 'bank'; autoColor = 'purple'; }
    
    state.selectedAcctType = autoType;
    state.selectedCardColor = autoColor;
    $$('#acct-type-pick .pick').forEach(x => x.classList.toggle('on', x.dataset.t === autoType));
    $$('#acct-color-pick .color-pick').forEach(x => {
      const isOn = x.dataset.c === autoColor;
      x.classList.toggle('on', isOn);
      x.style.boxShadow = isOn ? '0 0 0 2px var(--gold)' : '';
      x.style.borderColor = isOn ? 'var(--gold)' : 'transparent';
    });
  }
});

// ===== Card Icon Picker (App Store link) =====
function openCardIconPicker(acctId) {
  state.cardIconPickerId = acctId;
  const acct = state.accounts.find(a => a.id === acctId);
  if (!acct) return;
  $('#card-icon-input').value = acct.iconUrl || '';
  $('#card-icon-preview').innerHTML = acct.iconUrl
    ? `<div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid var(--border);"><img src="${acct.iconUrl}" style="width:48px;height:48px;border-radius:12px;object-fit:cover;" onerror="this.style.opacity=0.3;" /><div style="flex:1;"><div style="font-size:14px;font-weight:600;color:var(--t1);">${acct.name}</div><div style="font-size:11px;color:var(--gold);margin-top:2px;">当前图标 · 可粘贴新链接替换</div></div></div>`
    : `<div style="font-size:12px;color:var(--t3);padding:8px;">粘贴 App Store 链接自动获取图标</div>`;
  openSheet('sheet-card-icon');
}

async function fetchCardIcon() {
  const urlInput = $('#card-icon-input');
  const url = urlInput.value.trim();
  const previewEl = $('#card-icon-preview');
  const btn = $('#card-icon-fetch-btn');

  if (!url) {
    toast('请先粘贴App Store链接');
    return;
  }

  let appId = null;
  const idMatch = url.match(/id(\d+)/);
  if (idMatch) appId = idMatch[1];

  if (!appId) {
    const acct = state.accounts.find(a => a.id === state.cardIconPickerId);
    const appName = acct ? acct.name : extractAppNameFromUrl(url);
    if (appName) {
      previewEl.innerHTML = '<div style="font-size:12px;color:var(--t3);padding:8px;">正在搜索应用...</div>';
      btn.disabled = true;
      btn.textContent = '搜索中...';
      try {
        const result = await searchAppByName(appName);
        if (result) appId = result.trackId;
      } catch(e) {}
      btn.disabled = false;
      btn.textContent = '获取图标';
    }
  }

  if (!appId) {
    previewEl.innerHTML = '<div style="font-size:12px;color:var(--red);padding:8px;">未找到应用，请检查链接是否正确</div>';
    toast('无法识别链接');
    return;
  }

  previewEl.innerHTML = '<div style="font-size:12px;color:var(--t3);padding:8px;">正在获取图标...</div>';
  btn.disabled = true;
  btn.textContent = '获取中...';

  try {
    const resp = await fetch(`https://itunes.apple.com/lookup?id=${appId}&country=cn`);
    if (!resp.ok) throw new Error('network');
    const data = await resp.json();

    if (data.results && data.results.length > 0) {
      const app = data.results[0];
      const iconUrl = app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60;

      if (iconUrl) {
        const acct = state.accounts.find(a => a.id === state.cardIconPickerId);
        if (acct) {
          acct.iconUrl = iconUrl;
          save();
        }
        previewEl.innerHTML = `
          <div style="display:flex;align-items:center;gap:12px;padding:10px;background:rgba(255,255,255,0.04);border-radius:12px;border:1px solid var(--border);">
            <img src="${iconUrl}" style="width:48px;height:48px;border-radius:12px;object-fit:cover;" onerror="this.style.opacity=0.3;" />
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:600;color:var(--t1);">${app.trackName}</div>
              <div style="font-size:11px;color:var(--gold);margin-top:2px;">图标已更新 ✓</div>
            </div>
          </div>
        `;
        toast('图标更新成功');
        render();
      } else {
        throw new Error('no icon');
      }
    } else {
      throw new Error('not found');
    }
  } catch(e) {
    previewEl.innerHTML = '<div style="font-size:12px;color:var(--red);padding:8px;">获取失败，请检查链接或网络</div>';
    toast('获取失败');
  }

  btn.disabled = false;
  btn.textContent = '获取图标';
}

function clearCardIcon() {
  const acct = state.accounts.find(a => a.id === state.cardIconPickerId);
  if (acct) {
    acct.iconUrl = null;
    save();
    render();
  }
  closeSheet('sheet-card-icon');
  toast('图标已清除');
}

// Auto-fetch on paste
let _cardIconTimer = null;
document.addEventListener('DOMContentLoaded', () => {
  const ciInput = $('#card-icon-input');
  if (ciInput) {
    ciInput.addEventListener('input', () => {
      clearTimeout(_cardIconTimer);
      _cardIconTimer = setTimeout(() => {
        const url = ciInput.value.trim();
        if (url.length > 10 && /apps\.apple\.com|itunes\.apple\.com|id\d+/.test(url)) {
          fetchCardIcon();
        }
      }, 500);
    });
  }
});

// ===== Subscription Auto-Deduction =====
function processAutoDeductions() {
  const now = today();
  let deducted = 0;
  state.subscriptions.forEach(sub => {
    // Check if subscription is due and we haven't processed it yet
    if (sub.nextDate <= now && sub.accountId) {
      // Check if already deducted (look for tx on same date for this sub)
      const existing = state.transactions.find(t =>
        t.isSubscription && t.subscriptionId === sub.id && t.date === sub.nextDate
      );
      if (!existing) {
        const acct = state.accounts.find(a => a.id === sub.accountId);
        const txTime = new Date(sub.nextDate + 'T09:00:00');
        const cnyPrice = convertToCNY(sub.price, sub.currency || 'CNY');
        const tx = {
          id: genId(), type: 'expense', amount: cnyPrice,
          category: 'subscription', categoryName: sub.name, categoryIcon: '🔄',
          note: `${sub.name} 自动续费${sub.currency && sub.currency !== 'CNY' ? ` (${sub.currency} ${sub.price})` : ''}`, accountId: sub.accountId,
          date: sub.nextDate, time: '09:00',
          timestamp: txTime.toISOString(),
          isSubscription: true, subscriptionId: sub.id
        };
        state.transactions.unshift(tx);
        if (acct) acct.balance -= cnyPrice;
        // Advance next date
        sub.nextDate = cycleAdd(sub.nextDate, sub.cycle);
        deducted++;
      }
    }
  });
  if (deducted > 0) { save(); }
}

// ===== Render Functions =====
function renderOverview() {
  const month = getMonthRange();
  const monthTx = state.transactions.filter(t => t.date >= month.start && t.date <= month.end);
  const monthExpense = monthTx.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0);
  const monthIncome = monthTx.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0);
  const subExpense = monthTx.filter(t => t.isSubscription).reduce((s,t) => s + t.amount, 0);

  $('#hero-total').textContent = fmt(Math.round(monthExpense));
  $('#overview-sub').textContent = `${month.label} · ${state.subscriptions.length}项订阅`;

  const delta = Math.round(monthIncome - monthExpense);
  $('#hero-meta').innerHTML = `
    <div class="hmi"><span class="hmv" style="color:var(--green);">+${fmt(monthIncome)}</span><span class="hml">收入</span></div>
    <div class="hdot"></div>
    <div class="hmi"><span class="hmv">${fmt(Math.round(subExpense))}</span><span class="hml">订阅</span></div>
    <div class="hdot"></div>
    <div class="hmi"><span class="hmv" style="color:${delta>=0?'var(--green)':'var(--red)'};">${delta>=0?'+':''}${fmt(delta)}</span><span class="hml">结余</span></div>
  `;

  // 7-day chart
  const bars = $('#chart-bars');
  const days = ['一','二','三','四','五','六','今'];
  const todayIdx = new Date().getDay();
  // Simple mock chart based on recent data
  let html = '';
  for (let i = 6; i >= 0; i--) {
    const d = addDays(today(), -i);
    const dayExp = state.transactions.filter(t => t.date === d && t.type === 'expense').reduce((s,t) => s + t.amount, 0);
    const maxExp = Math.max(50, ...Array.from({length:7},(_,j) => {
      const dd = addDays(today(), -(6-j));
      return state.transactions.filter(t => t.date === dd && t.type === 'expense').reduce((s,t) => s + t.amount, 0);
    }));
    const pct = maxExp > 0 ? Math.max(8, (dayExp / maxExp) * 100) : 10;
    const isToday = i === 0;
    html += `<div class="cbg"><div class="cbb ${isToday?'on':''}" style="height:${pct}%;"></div><span class="cbl">${days[6-i]}</span></div>`;
  }
  bars.innerHTML = html;

  // Upcoming subscriptions (next 3)
  const sorted = [...state.subscriptions].sort((a,b) => new Date(a.nextDate) - new Date(b.nextDate));
  const upcoming = sorted.slice(0, 3);
  const container = $('#upcoming-subs');
  if (state.subscriptions.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="es-icon">📋</div><div class="es-text">暂无订阅</div><div class="es-sub">点击 + 添加你的第一个订阅</div></div>`;
    return;
  }
  container.innerHTML = upcoming.map(sub => renderSubCard(sub)).join('');
  // Bind click
  container.querySelectorAll('.sc2').forEach(el => {
    el.onclick = () => { state.currentSubId = el.dataset.id; showView('subdetail'); };
  });
}

function renderSubCard(sub) {
  const days = daysBetween(today(), sub.nextDate);
  const cycleDays = cycleToDays(sub.cycle);
  const pct = Math.min(100, Math.max(0, Math.round(((cycleDays - days) / cycleDays) * 100)));
  const isSoon = days <= 7;
  const isWarning = days > 7 && days <= 14;
  // 三色进度条：红色=快到期(7天内)，金色=临近(8-14天)，绿色=充足(15天以上)
  let ringColor, ringTextColor;
  if (isSoon) {
    ringColor = 'var(--red)';
    ringTextColor = 'var(--red)';
  } else if (isWarning) {
    ringColor = 'var(--gold)';
    ringTextColor = 'var(--gold)';
  } else {
    ringColor = 'var(--green)';
    ringTextColor = 'rgba(82,204,130,0.8)';
  }
  const circumference = 2 * Math.PI * 16;
  const offset = circumference * (1 - pct/100);
  const daysText = days <= 0 ? '已到期' : `${days}天后`;
  const daysStyle = isSoon ? 'color:var(--red);font-weight:600;' : '';
  const iconHtml = sub.brand ? brandIconSvg(sub.brand) : letterIcon((sub.name[0]||'?').toUpperCase(), 'rgba(255,255,255,0.4)');
  const account = state.accounts.find(a => a.id === sub.accountId);
  // Currency display
  const cur = sub.currency || 'CNY';
  const curSymbols = { CNY: '¥', USD: '$', EUR: '€', GBP: '£', JPY: '¥', HKD: 'HK$', TWD: 'NT$' };
  const curSym = curSymbols[cur] || '¥';
  const cnyAmount = convertToCNY(sub.price, cur);
  const priceDisplay = cur === 'CNY' ? `¥${sub.price}` : `${curSym}${sub.price} ≈ ¥${fmt(Math.round(cnyAmount))}`;
  return `<div class="sc2" data-id="${sub.id}">
    <div class="si">${iconHtml}</div>
    <div class="sif">
      <div class="sn">${sub.name} <span class="badge">订阅</span></div>
      <div class="sd">${priceDisplay}${cycleToLabel(sub.cycle)} · <span style="${daysStyle}">${daysText}</span></div>
    </div>
    <div class="ring">
      <svg viewBox="0 0 40 40"><circle class="rb" cx="20" cy="20" r="16"/><circle class="rf" cx="20" cy="20" r="16" stroke="${ringColor}" stroke-dasharray="${circumference.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}"/></svg>
      <span class="rt" style="color:${ringTextColor};">${pct}%</span>
    </div>
  </div>`;
}

function renderSubs() {
  $('#subs-count').textContent = state.subscriptions.length;
  const monthly = state.subscriptions.reduce((s, sub) => {
    const mult = { week: 4.3, month: 1, quarter: 1/3, year: 1/12 }[sub.cycle] || 1;
    const cnyPrice = convertToCNY(sub.price, sub.currency || 'CNY');
    return s + cnyPrice * mult;
  }, 0);
  const yearly = monthly * 12;
  $('#subs-monthly').textContent = `¥${fmt(Math.round(monthly))}`;
  $('#subs-yearly').textContent = `¥${fmt(Math.round(yearly))}`;
  $('#subs-sub').textContent = state.subscriptions.length > 0 ? `${state.subscriptions.length}项订阅 · 月均¥${fmt(Math.round(monthly))}` : '管理所有订阅服务';

  const filter = document.querySelector('#sub-fp .pl.on')?.dataset.f || 'all';
  let subs = [...state.subscriptions];
  if (filter === 'soon') subs = subs.filter(s => daysBetween(today(), s.nextDate) <= 7);
  if (filter === 'year') subs = subs.filter(s => s.cycle === 'year');
  subs.sort((a,b) => new Date(a.nextDate) - new Date(b.nextDate));

  const container = $('#subs-list');
  if (subs.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="es-icon">📋</div><div class="es-text">暂无订阅</div><div class="es-sub">点击 + 添加订阅</div></div>`;
    return;
  }
  container.innerHTML = subs.map(sub => renderSubCard(sub)).join('');
  container.querySelectorAll('.sc2').forEach(el => {
    el.onclick = () => { state.currentSubId = el.dataset.id; showView('subdetail'); };
  });
}

function renderSubDetail() {
  const sub = state.subscriptions.find(s => s.id === state.currentSubId);
  if (!sub) { showView('subs'); return; }
  const days = daysBetween(today(), sub.nextDate);
  const cycleDays = cycleToDays(sub.cycle);
  const pct = Math.min(100, Math.max(0, Math.round(((cycleDays - days) / cycleDays) * 100)));
  const isSoon = days <= 7;
  const isWarning = days > 7 && days <= 14;
  let progColor, progTextColor;
  if (isSoon) {
    progColor = 'var(--red)';
    progTextColor = 'var(--red)';
  } else if (isWarning) {
    progColor = 'var(--gold)';
    progTextColor = 'var(--gold)';
  } else {
    progColor = 'var(--green)';
    progTextColor = 'rgba(82,204,130,0.8)';
  }
  const acct = state.accounts.find(a => a.id === sub.accountId);
  const daysText = days <= 0 ? '已到期' : `${days}天后`;
  const monthly = { week: sub.price * 4.3, month: sub.price, quarter: sub.price/3, year: sub.price/12 }[sub.cycle] || sub.price;
  const yearly = monthly * 12;
  const startDate = sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('zh-CN') : '未知';
  const iconHtml = sub.brand ? brandIconSvg(sub.brand) : letterIcon((sub.name[0]||'?').toUpperCase(), 'rgba(255,255,255,0.4)');
  const bi = sub.brand ? BRAND_ICONS[sub.brand.slug] : null;
  const brandColor = bi ? bi.bg : (sub.brand?.iconUrl ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.1)');
  const heroBg = sub.brand ? `background:linear-gradient(150deg,${brandColor}22,${brandColor}08);border:1px solid ${brandColor}15;` : '';

  $('#subdetail-body').innerHTML = `
    <div class="sub-detail-hero" style="${heroBg}">
      <div class="sdh-ic">${iconHtml}</div>
      <div style="flex:1;">
        <div class="sdh-nm">${sub.name}</div>
        <div class="sdh-cat">${sub.brand?.cat || '订阅'} · ${acct?.name || '未绑定'}</div>
        <div style="display:flex;align-items:baseline;gap:4px;">
          <span class="sdh-pr">${(() => { const c = sub.currency || 'CNY'; const syms = { CNY:'¥', USD:'$', EUR:'€', GBP:'£', JPY:'¥', HKD:'HK$', TWD:'NT$' }; return `${syms[c]||'¥'}${sub.price}`; })()}</span>
          <span style="font-size:14px;color:var(--t2);">${cycleToLabel(sub.cycle)}</span>
          ${sub.currency && sub.currency !== 'CNY' ? `<span style="font-size:12px;color:var(--gold);margin-left:8px;">≈ ¥${fmt(Math.round(convertToCNY(sub.price, sub.currency)))}</span>` : ''}
        </div>
      </div>
    </div>
    <div class="info-g">
      <div class="info-r">
        <span class="info-l">下次续费</span>
        <span class="info-v ${isSoon?'warn':''}">${sub.nextDate} · ${daysText}</span>
      </div>
      <div class="info-r">
        <span class="info-l">续费方式</span>
        <span class="info-v">${sub.autoRenew ? '自动续费' : '手动续费'}</span>
      </div>
      <div class="info-r" style="flex-direction:column;align-items:stretch;">
        <div style="display:flex;justify-content:space-between;margin-bottom:0;">
          <span class="info-l">本期进度</span>
          <span class="info-v" style="color:${progTextColor};">${pct}%</span>
        </div>
        <div class="prog-track"><div class="prog-fill" style="width:${pct}%;background:${progColor};"></div></div>
      </div>
      <div class="info-r"><span class="info-l">扣款账户</span><span class="info-v">${acct?.name || '未绑定'}</span></div>
      ${sub.note ? `<div class="info-r"><span class="info-l">备注</span><span class="info-v">${sub.note}</span></div>` : ''}
    </div>
    <div class="info-g">
      <div class="info-r"><span class="info-l">月均成本</span><span class="info-v">¥${fmt(Math.round(monthly))}</span></div>
      <div class="info-r"><span class="info-l">年度成本</span><span class="info-v">¥${fmt(Math.round(yearly))}</span></div>
      <div class="info-r"><span class="info-l">添加时间</span><span class="info-v" style="color:var(--t3);">${startDate}</span></div>
    </div>
    <div class="btn-row">
      <button class="btn btn-danger" onclick="deleteSub('${sub.id}')">删除订阅</button>
      <button class="btn btn-gold" onclick="openEditSub('${sub.id}')">编辑</button>
    </div>
    <div style="height:20px;"></div>
  `;
}

function deleteSub(id) {
  if (!confirm('确定删除此订阅？相关自动扣款记录将保留。')) return;
  state.subscriptions = state.subscriptions.filter(s => s.id !== id);
  save();
  toast('已删除');
  showView('subs');
}

function renderTx() {
  const month = getMonthRange();
  $('#tx-month').textContent = month.label;
  const monthTx = state.transactions.filter(t => t.date >= month.start && t.date <= month.end);
  const exp = monthTx.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0);
  const inc = monthTx.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0);
  $('#tx-expense').textContent = `¥${fmt(Math.round(exp))}`;
  $('#tx-income').textContent = `¥${fmt(Math.round(inc))}`;
  $('#tx-balance').textContent = `¥${fmt(Math.round(inc - exp))}`;

  const filter = document.querySelector('#tx-fp .pl.on')?.dataset.f || 'all';
  let txs = monthTx;
  if (filter === 'expense') txs = txs.filter(t => t.type === 'expense');
  if (filter === 'income') txs = txs.filter(t => t.type === 'income');
  if (filter === 'sub') txs = txs.filter(t => t.isSubscription);
  txs.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));

  const container = $('#tx-list');
  if (txs.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="es-icon">📝</div><div class="es-text">暂无记录</div><div class="es-sub">点击 + 记一笔</div></div>`;
    return;
  }

  // Group by date
  const groups = {};
  txs.forEach(t => {
    const key = t.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });

  let html = '';
  const sortedDates = Object.keys(groups).sort((a,b) => new Date(b) - new Date(a));
  sortedDates.forEach(date => {
    const d = new Date(date);
    const isToday = date === today();
    const label = isToday ? `今天 · ${d.getMonth()+1}月${d.getDate()}日` :
      date === addDays(today(), -1) ? `昨天 · ${d.getMonth()+1}月${d.getDate()}日` :
      `${d.getMonth()+1}月${d.getDate()}日`;
    const dayExp = groups[date].filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
    const dayInc = groups[date].filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
    let sumText = '';
    if (dayInc > 0) sumText += `<span style="color:var(--green);">+${fmt(Math.round(dayInc))}</span>`;
    if (dayExp > 0) sumText += (sumText ? ' · ' : '') + `<span style="color:var(--red);">-${fmt(Math.round(dayExp))}</span>`;
    html += `<div class="mh"><span class="mht">${label}</span><span class="mht">${sumText}</span></div>`;
    groups[date].forEach(t => {
      const acct = state.accounts.find(a => a.id === t.accountId);
      const theme = acct ? (CARD_THEMES[acct.color] || CARD_THEMES.gold) : CARD_THEMES.gold;
      const acctColor = theme.accent;
      const isSub = t.isSubscription;
      const icClass = isSub ? 'txi is' : (t.type === 'income' ? 'txi is2' : 'txi');
      const iconContent = isSub ? txIconSvg('sub') : txIconSvg(t.category);
      const badge = isSub ? '<span class="badge">订阅</span>' : '';
      html += `<div class="tx">
        <div class="${icClass}">${iconContent}</div>
        <div class="tx2">
          <div class="txn">${t.categoryName} ${badge}</div>
          <div class="txm"><span class="ad" style="background:${acctColor};"></span>${acct?.name || '未知'} · ${t.time}</div>
        </div>
        <div class="txa ${t.type==='income'?'in':''}">${t.type==='income'?'+':'-'}¥${fmt(t.amount)}</div>
      </div>`;
    });
  });
  container.innerHTML = html;
}

function renderAccounts() {
  $('#acct-sub').textContent = state.accounts.length > 0 ?
    `${state.accounts.length}张卡片 · ¥${fmt(Math.round(state.accounts.reduce((s,a)=>s+a.balance,0)))}` :
    '添加银行卡和钱包';

  // Cards stack
  const cs = $('#cards-stack');
  const hintEl = $('#swipe-hint');
  if (hintEl) hintEl.style.display = state.accounts.length > 1 ? 'block' : 'none';
  if (state.accounts.length === 0) {
    if (hintEl) hintEl.style.display = 'none';
    cs.innerHTML = `<div class="empty-state" style="padding:40px 20px;"><div class="es-icon">💳</div><div class="es-text">暂无账户</div><div class="es-sub">点击 + 添加你的第一张卡</div></div>`;
  } else {
    // Reorder accounts so active card is first, rest follow in order
    const ordered = [];
    for (let i = 0; i < state.accounts.length; i++) {
      ordered.push(state.accounts[(state.activeCardIdx + i) % state.accounts.length]);
    }

    cs.innerHTML = ordered.map((a, stackPos) => {
      const isOn = stackPos === 0;
      const stackClass = isOn ? 'on' : (stackPos === 1 ? 'off stack-1' : stackPos === 2 ? 'off stack-2' : 'off stack-3');
      const origIdx = state.accounts.indexOf(a);
      // Compatibility with old data - map old types
      let acctTypeKey = a.type;
      if (!ACCOUNT_TYPES[acctTypeKey]) acctTypeKey = 'other';
      const acctType = ACCOUNT_TYPES[acctTypeKey];
      // Ensure color exists
      if (!a.color) a.color = 'gold';
      const theme = CARD_THEMES[a.color] || CARD_THEMES.gold;
      
      // Get brand icon
      let logoHtml;
      let logoClickAttr = '';
      const brandSlug = a.brandSlug || (a.type === 'alipay' ? 'alipay' : a.type === 'wechat' ? 'wechat' : a.type === 'yunshanfu' ? 'unionpay' : a.type === 'licaicai' ? 'licaicai' : a.type === 'yuebao' ? 'yuebao' : null);
      if (a.iconUrl) {
        logoHtml = `<img src="${a.iconUrl}" style="width:100%;height:100%;border-radius:10px;object-fit:cover;" onerror="this.style.opacity=0.3;" />`;
        logoClickAttr = `onclick="openCardIconPicker('${a.id}')"`;
      } else if (brandSlug && BRAND_ICONS[brandSlug]) {
        const bi = BRAND_ICONS[brandSlug];
        const fg = isLightColor(bi.bg) ? '#000' : '#fff';
        logoHtml = `<svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:${fg};"><path d="${bi.p}"/></svg>`;
        logoClickAttr = `onclick="openCardIconPicker('${a.id}')"`;
      } else {
        // Generic logo for account type
        logoHtml = `<svg viewBox="0 0 24 24" width="20" height="20" fill="${theme.accent}"><path d="M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z"/></svg>`;
        logoClickAttr = `onclick="openCardIconPicker('${a.id}')"`;
      }
      
      // NFC icon for bank cards
      const holoSvg = acctType.hasHolo
        ? `<div class="holo"><svg viewBox="0 0 24 28"><path d="M8 6c5.5 0 10 4.5 10 10M12 6c3.3 0 6 2.7 6 6M4 6c7.7 0 14 6.3 14 14M8 10c3.3 0 6 2.7 6 6M12 14c1.1 0 2 .9 2 2"/></svg></div>`
        : '';
      
      // Chip for bank cards
      const chipHtml = acctType.hasChip ? `<div class="chip" style="background:${theme.chipBg};"></div>` : '';
      
      // Card identifier text
      const cardIdent = a.cardNumber
        ? '•••• •••• •••• ' + a.cardNumber
        : (a.type === 'bank' ? 'BANK CARD' : a.type === 'alipay' ? 'ALIPAY WALLET' : a.type === 'wechat' ? 'WECHAT WALLET' : a.type === 'yunshanfu' ? 'UNIONPAY' : a.type === 'licaicai' ? 'LICAITONG' : a.type === 'yuebao' ? 'YUEBAO' : 'DIGITAL WALLET');
      
      // Custom inline styles for card
      const cardStyle = `background:${theme.gradient};border:1px solid ${theme.border};`;
      
      return `<div class="bc bc-custom ${stackClass}" data-idx="${origIdx}" data-stack="${stackPos}" style="${cardStyle}">
        ${holoSvg}
        <div class="bct">
          <div class="bcti"><div class="bcn" style="color:${theme.accent};">${a.name}</div><div class="bcty" style="color:${theme.subtext};">${acctType.name}${a.cardNumber ? ' · 尾号'+a.cardNumber : ''}</div></div>
          <div class="bcl" style="background:rgba(255,255,255,0.04);border:1px solid ${theme.border};" ${logoClickAttr}>${logoHtml}</div>
        </div>
        <div style="flex:1;"></div>
        ${chipHtml}
        <div class="bcnm" style="color:${theme.subtext};">${cardIdent}</div>
        <div class="bcb">
          <div class="bcbn" style="color:${theme.accent};opacity:0.6;">${acctType.brand}</div>
          <div style="text-align:right;"><div class="bcbl" style="color:${theme.subtext};">可用余额</div><div class="bcv" style="color:${theme.text};">¥${fmt(Math.round(a.balance))}</div></div>
        </div>
      </div>`;
    }).join('');
    cs.querySelectorAll('.bc').forEach(c => {
      const stackPos = parseInt(c.dataset.stack) || 0;
      if (stackPos !== 0) return; // Only top card is interactive

      // Click to toggle detail section
      c.onclick = (e) => {
        if (e.target.closest('.bcl')) return;
        if (cs.dataset.animating === '1') return;
        const detailEl = $('#acct-detail-section');
        const isVisible = detailEl.style.display !== 'none';
        detailEl.style.display = isVisible ? 'none' : 'block';
        haptic('light');
      };

      // Swipe right to cycle card to back
      let startX = 0, startY = 0, currentX = 0, currentY = 0, isDragging = false, isSwipe = false;
      c.addEventListener('touchstart', (e) => {
        if (e.target.closest('.bcl')) return;
        if (cs.dataset.animating === '1') return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = 0; currentY = 0;
        isDragging = true; isSwipe = false;
        c.style.transition = 'none';
      }, { passive: true });

      c.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX - startX;
        currentY = e.touches[0].clientY - startY;
        if (currentX > 0 && currentX > Math.abs(currentY) && currentX > 10) {
          isSwipe = true;
          c.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.04}deg)`;
          c.style.opacity = String(Math.max(1 - currentX / 350, 0.2));
        }
      }, { passive: true });

      c.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        c.style.transition = '';

        if (isSwipe && currentX > 80 && state.accounts.length > 1) {
          haptic('medium');
          cs.dataset.animating = '1';

          // Fly off: use flying class for quick exit
          c.classList.add('flying');
          c.classList.remove('on');
          c.style.transform = `translateX(${window.innerWidth + 100}px) rotate(25deg)`;
          c.style.opacity = '0';

          // Immediately advance active index and re-render
          // This causes next card to animate up to front position via CSS transition
          state.activeCardIdx = (state.activeCardIdx + 1) % state.accounts.length;
          $('#acct-detail-section').style.display = 'none';
          save();
          render();

          setTimeout(() => { delete cs.dataset.animating; }, 400);
        } else {
          c.style.transform = '';
          c.style.opacity = '';
        }
      });
    });
  }

  // Stats
  const month = getMonthRange();
  const monthTx = state.transactions.filter(t => t.date >= month.start && t.date <= month.end);
  const totalBalance = state.accounts.reduce((s,a)=>s+a.balance,0);
  const totalIncome = monthTx.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const totalExpense = monthTx.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  $('#acct-stats').innerHTML = `
    <div class="stc"><div class="stl">本月收入</div><div class="stv" style="color:var(--green);">+${fmt(Math.round(totalIncome))}</div></div>
    <div class="stc"><div class="stl">本月支出</div><div class="stv" style="color:var(--red);">-${fmt(Math.round(totalExpense))}</div></div>
    <div class="stc"><div class="stl">总资产</div><div class="stv">${fmt(Math.round(totalBalance))}</div></div>
  `;

  // Donut chart
  const expenseByCat = {};
  monthTx.filter(t=>t.type==='expense').forEach(t => {
    const key = t.isSubscription ? '订阅' : (EXPENSE_CATS.find(c=>c.id===t.category)?.name || '其他');
    expenseByCat[key] = (expenseByCat[key] || 0) + t.amount;
  });
  const total = Object.values(expenseByCat).reduce((s,v)=>s+v,0);
  const dc = $('#dnt-chart');
  if (total === 0) {
    dc.innerHTML = `<div style="text-align:center;padding:20px;color:var(--t3);font-size:13px;">本月暂无支出</div>`;
    return;
  }
  const catColors = { '餐饮':'var(--gold)', '订阅':'rgba(255,255,255,0.12)', '购物':'rgba(255,92,72,0.6)', '交通':'rgba(100,200,255,0.4)', '居家':'rgba(255,159,10,0.5)', '娱乐':'rgba(180,100,255,0.5)', '医疗':'rgba(255,69,58,0.5)', '学习':'rgba(82,204,130,0.5)', '其他':'rgba(255,255,255,0.15)' };
  let cum = 0;
  const segments = Object.entries(expenseByCat).sort((a,b) => b[1]-a[1]).map(([name, val]) => {
    const pct = (val/total)*100;
    const start = cum; cum += pct;
    return { name, val, pct, start, color: catColors[name] || 'rgba(255,255,255,0.2)' };
  });
  let conic = 'conic-gradient(';
  conic += segments.map(s => `${s.color} ${s.start}% ${s.start+s.pct}%`).join(',');
  conic += ')';
  dc.innerHTML = `
    <div class="dntc" style="background:${conic};"><span class="dntv">¥${fmt(Math.round(total))}</span></div>
    <div class="dntl">
      ${segments.slice(0,4).map(s => `<div class="dli"><span class="dld" style="background:${s.color};${s.name==='订阅'?'border:1px solid var(--border);':''}"></span><span class="dln">${s.name}</span><span class="dlv">¥${fmt(Math.round(s.val))}</span></div>`).join('')}
    </div>
  `;
}

function render() {
  renderOverview();
  renderSubs();
  renderTx();
  renderAccounts();
  renderReports();
  renderQRCodes();
  renderInvoices();
  updateLockStatus();
  updateNotifStatus();
  updateExrateStatus();
  updateCloudStatus();
  if (state.currentView === 'subdetail') renderSubDetail();
}

// Filter pills
$$('#sub-fp .pl').forEach(p => p.onclick = () => {
  $$('#sub-fp .pl').forEach(x => { x.classList.remove('on'); x.classList.add('off'); });
  p.classList.remove('off'); p.classList.add('on');
  renderSubs();
});
$$('#tx-fp .pl').forEach(p => p.onclick = () => {
  $$('#tx-fp .pl').forEach(x => { x.classList.remove('on'); x.classList.add('off'); });
  p.classList.remove('off'); p.classList.add('on');
  renderTx();
});

// ===== Data Management =====
function clearAll() {
  state.accounts = []; state.subscriptions = []; state.transactions = []; state.qrcodes = []; state.invoices = [];
  state.settings = { lockType: 'none', pinHash: null, notifications: false, exRates: { USD: 7.25, EUR: 7.85, GBP: 9.20, JPY: 0.048, HKD: 0.93, TWD: 0.22 }, defaultCurrency: 'CNY' };
  localStorage.removeItem(KEYS.accounts); localStorage.removeItem(KEYS.subscriptions); localStorage.removeItem(KEYS.transactions);
  localStorage.removeItem(KEYS.onboarded); localStorage.removeItem(KEYS.settings); localStorage.removeItem(KEYS.qrcodes);
  localStorage.removeItem(KEYS.invoices);
  render();
}
function exportData() {
  const data = { accounts: state.accounts, subscriptions: state.subscriptions, transactions: state.transactions, qrcodes: state.qrcodes, invoices: state.invoices, settings: state.settings, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `subpilot-backup-${today()}.json`; a.click();
  URL.revokeObjectURL(url);
  toast('数据已导出');
  haptic('success');
}
function importDataPrompt() { $('#import-file').click(); }
$('#import-file').addEventListener('change', e => {
  const file = e.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.accounts) state.accounts = data.accounts;
      if (data.subscriptions) state.subscriptions = data.subscriptions;
      if (data.transactions) state.transactions = data.transactions;
      if (data.qrcodes) state.qrcodes = data.qrcodes;
      if (data.invoices) state.invoices = data.invoices;
      if (data.settings) state.settings = { ...state.settings, ...data.settings };
      save(); render(); toast('数据已导入');
      haptic('success');
    } catch(err) { toast('导入失败，文件格式错误'); }
  };
  reader.readAsText(file);
});

// ===== Version Management =====
const APP_VERSION = '1.7.3';
const APP_BUILD = '2026.08.07';
const CHANGELOG = [
  { ver: '1.7.3', date: '2026-08-07', items: [
    '修复登录/注册错误提示，明确引导关闭邮箱确认',
    '优化邮箱确认未通过时的用户提示'
  ]},
  { ver: '1.7.2', date: '2026-08-07', items: [
    '登录改为邮箱+密码方式，无需收邮件验证码，开箱即用',
    '注册/登录双Tab切换，密码可见切换',
    '支持忘记密码重置（邮件重置链接）'
  ]},
  { ver: '1.7.1', date: '2026-08-07', items: [
    '云同步开箱即用：内置公共Supabase云，无需配置直接登录',
    '所有用户打开App即可使用邮箱验证码登录和数据同步',
    '支持切换到自定义Supabase项目'
  ]},
  { ver: '1.7.0', date: '2026-08-07', items: [
    '新增云同步功能：基于Supabase，支持邮箱验证码登录/注册',
    '多设备数据同步：Last-Write-Wins策略，自动/手动同步',
    '设置页增加云同步状态和配置入口',
    '密码PIN哈希不上传云端，保护本地隐私'
  ]},
  { ver: '1.6.1', date: '2026-08-07', items: [
    '重构卡面切换动画：绝对定位堆叠，划走的卡立刻消失，下一张平滑升到第一位',
    '新增发票夹功能：支持图片/PDF上传、分类管理、查看、保存到本地',
    'PWA增强：应用角标显示即将到期订阅数量，桌面快捷方式支持快速记账/添加订阅/AI记账',
    '所有交互按钮触觉反馈优化'
  ]},
  { ver: '1.6.0', date: '2026-08-07', items: [
    '修复卡面切换动画：划走的卡立刻消失并排到后面，下一张卡平滑升到第一位',
    '所有按钮添加震动反馈（haptic feedback），关键操作有成功/错误震动',
    '新增应用锁：支持 Face ID/指纹生物识别、4位数字密码、3选1',
    '新增订阅到期提醒：浏览器通知API，到期前3天/1天/当天自动提醒',
    '新增月度/年度报表：收支趋势折线图、分类占比饼图、同比环比分析',
    '新增汇率换算：支持USD/EUR/GBP/JPY/HKD/TWD自动换算人民币',
    '新增二维码夹：分类管理常用二维码（收款/交通/医疗/个人），支持查看和保存到本地',
    '从后台返回时自动锁定并检查到期提醒'
  ]},
  { ver: '1.5.5', date: '2026-08-07', items: [
    '修复底部导航栏位置，紧贴屏幕底部不再悬空',
    '使用 env(safe-area-inset-bottom) 自动适配不同设备底部安全区',
    '内容区和FAB按钮底部间距同步优化'
  ]},
  { ver: '1.5.4', date: '2026-08-07', items: [
    '账户页默认只显示卡片，点击卡片展开详细信息',
    '快捷操作、收支统计、支出分布图折叠隐藏，点击后才显示',
    '滑动切换卡片时自动收起详细信息'
  ]},
  { ver: '1.5.3', date: '2026-08-07', items: [
    '卡面支持右滑切换，划走的卡自动到后面',
    '滑动时卡片跟随手指移动并渐隐，带旋转动效',
    '多卡时显示滑动提示，单卡时自动隐藏'
  ]},
  { ver: '1.5.2', date: '2026-08-07', items: [
    '增大卡面高度，修复底部文字（可用余额/品牌名）被遮挡的问题',
    '优化卡面内部间距，确保所有信息完整显示'
  ]},
  { ver: '1.5.1', date: '2026-08-07', items: [
    '添加按钮上移，避免与底部导航栏重叠'
  ]},
  { ver: '1.5.0', date: '2026-08-07', items: [
    '调换流水和账户页面在底部导航栏的位置',
    'AI记账按钮从悬浮移至底部导航栏中间',
    '卡面布局优化：可用余额移至右下角，BANK CARD移至左下角',
    '卡面右上角图标支持点击弹窗，粘贴App Store链接自动识别替换图标',
    '移除悬浮AI按钮，界面更简洁'
  ]},
  { ver: '1.4.3', date: '2026-08-07', items: [
    '移除顶部模拟状态栏（信号/WiFi/时间），使用系统原生状态栏',
    '适配刘海屏安全区域'
  ]},
  { ver: '1.4.2', date: '2026-08-07', items: [
    '修复触摸滑动导致整个页面移动的问题',
    '锁定页面框架，仅内容区域可滚动',
    '优化 iOS 橡皮筋滚动效果'
  ]},
  { ver: '1.4.1', date: '2026-08-07', items: [
    '订阅圆环进度条三色显示：绿色(充足)、金色(临近)、红色(快到期)',
    '详情页进度条同步三色显示'
  ]},
  { ver: '1.4.0', date: '2026-08-07', items: [
    '修复订阅编辑功能，表单标题动态切换',
    '编辑时显示当前图标预览（内置/字母/远程）',
    '粘贴 App Store 链接自动获取图标，无需手动点击',
    '优化图标替换流程，编辑时可一键替换图标'
  ]},
  { ver: '1.3.0', date: '2026-08-07', items: [
    '新增 App Store 链接获取应用图标功能',
    '通过 iTunes API 自动获取高清应用图标和应用名称',
    '优化 AI 对话框全机型安全区域适配',
    '设置页新增版本号、更新日志和检查更新功能'
  ]},
  { ver: '1.2.0', date: '2026-08-07', items: [
    '新增 AI 智能记账功能，一句话自动记账',
    '新增自定义卡面颜色，8种高级配色主题',
    '新增云闪付、理财通、余额宝账户类型',
    '升级品牌图标库，支持40+真实品牌SVG图标',
    '优化卡面渲染，支持品牌自动识别'
  ]},
  { ver: '1.1.0', date: '2026-08-06', items: [
    '新增差异化卡面设计（银行卡/支付宝/微信）',
    '新增真实品牌SVG图标替代剪影图标',
    '新增订阅自动扣款关联账户',
    '新增记账功能（收入/支出流水）'
  ]},
  { ver: '1.0.0', date: '2026-08-05', items: [
    'SubPilot 订阅管家正式发布',
    '订阅管理核心功能（概览、列表、详情）',
    '账户管理（银行卡/钱包）',
    'PWA 离线支持'
  ]}
];

function showVersionInfo() {
  let msg = `SubPilot 订阅管家\n\n版本：v${APP_VERSION}\n构建：${APP_BUILD}\n\n当前为最新版本`;
  alert(msg);
}

function showChangelog() {
  let html = '';
  for (const log of CHANGELOG) {
    html += `【v${log.ver}】${log.date}\n`;
    for (const item of log.items) {
      html += `  · ${item}\n`;
    }
    html += '\n';
  }
  alert('SubPilot 更新日志\n\n' + html.trim());
}

async function checkUpdate() {
  const statusEl = $('#update-status');
  statusEl.textContent = '检查中...';
  try {
    const resp = await fetch('https://api.github.com/repos/dongsion/SubPilot/commits/main', { cache: 'no-store' });
    if (!resp.ok) throw new Error('network');
    const data = await resp.json();
    const remoteDate = data.commit?.committer?.date?.slice(0, 10) || '';
    const localDate = APP_BUILD;
    if (remoteDate > localDate) {
      statusEl.textContent = '有新版';
      statusEl.style.color = 'var(--gold)';
      alert(`发现新版本！\n\n线上最新更新日期：${remoteDate}\n你的版本构建日期：${localDate}\n\n请访问 GitHub 获取最新版本：\nhttps://dongsion.github.io/SubPilot/`);
    } else {
      statusEl.textContent = '最新 ✓';
      statusEl.style.color = '#30d158';
      toast('已是最新版本');
    }
  } catch(e) {
    statusEl.textContent = '›';
    statusEl.style.color = 'var(--gold)';
    alert(`当前版本：v${APP_VERSION} (Build ${APP_BUILD})\n\n无法连接网络检查更新，请手动访问：\nhttps://dongsion.github.io/SubPilot/`);
  }
}

// ===== Init =====
function init() {
  load();

  // Process auto-deductions after data is loaded
  processAutoDeductions();

  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }

  render();

  // Show lock screen on app launch if enabled
  showLockScreen();

  // Check subscription expiry reminders
  checkSubscriptionReminders();

  // Update PWA badge
  updateBadge();

  // Handle URL shortcut actions
  handleUrlAction();

  // Init cloud sync (if configured)
  initSupabase();
  checkCloudSession().then(() => {
    updateCloudStatus();
    // Auto-sync on startup if logged in
    if (state.cloudUser) {
      setTimeout(() => syncToCloud(), 1500);
    }
  });
}

// Keyboard: amount input only numbers
$('#tx-amt-input')?.addEventListener('input', function(e) {
  this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
});
$('#sub-price')?.addEventListener('input', function(e) {
  this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
});
$('#acct-balance')?.addEventListener('input', function(e) {
  this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
});
$('#inv-amount')?.addEventListener('input', function(e) {
  this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
});

// Currency hint for subscription form
function updateCurrencyHint() {
  const currency = $('#sub-currency')?.value || 'CNY';
  const price = parseFloat($('#sub-price')?.value) || 0;
  const hintEl = $('#sub-currency-hint');
  if (!hintEl) return;
  if (currency === 'CNY' || price <= 0) {
    hintEl.style.display = 'none';
    return;
  }
  const cny = convertToCNY(price, currency);
  const symbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', HKD: 'HK$', TWD: 'NT$' };
  hintEl.textContent = `${symbols[currency] || ''}${price} ≈ ¥${fmt(Math.round(cny))} 人民币`;
  hintEl.style.display = 'block';
}
$('#sub-currency')?.addEventListener('change', () => { updateCurrencyHint(); haptic('light'); });
$('#sub-price')?.addEventListener('input', () => updateCurrencyHint());

// ===== AI Smart Bookkeeping =====
// Category keywords mapping
const CATEGORY_KEYWORDS = {
  food: ['吃饭','餐','吃','外卖','饭','早','午','晚','食','美食','聚餐','奶茶','咖啡','饮料','水果','零食','小吃','饿了么','美团','肯德基','kfc','麦当劳','星巴克','瑞幸','海底捞','烧烤','火锅','早餐','午餐','晚餐','宵夜'],
  shopping: ['购物','买','淘宝','京东','拼多多','衣服','鞋','包','化妆品','护肤品','电商','网购','商场','双十一','双十二','618','打折','数码','手机','电脑','耳机','相机','电子产品','数码产品','配件'],
  transport: ['交通','打车','滴滴','地铁','公交','出租','高铁','火车','机票','飞机','加油','停车','过路费','油费','出行','共享单车','哈啰','青桔','高德'],
  entertainment: ['娱乐','电影','游戏','会员','演出','门票','ktv','酒吧','派对','旅游','酒店','景点','度假','音乐','视频','充值'],
  home: ['日用','超市','买菜','菜市场','水电','电费','水费','燃气','话费','手机费','网费','宽带','物业','房租','日用品','纸巾','洗衣液','家居'],
  medical: ['医疗','看病','医院','药','挂号','体检','诊所','牙医','买药','医药费'],
  study: ['学习','教育','课程','书','培训','学费','买书','教材','网课','知识付费'],
  other: ['转账','转给','发红包','还款','还钱','借钱'],
  salary: ['工资','薪水','发薪','薪资','奖金','提成','收入','到账'],
  bonus: ['红包'],
  invest: ['理财','收益','利息','股票','基金','投资','分红']
};

// Income keywords
const INCOME_KEYWORDS = ['收入','工资','到账','收到','转入','红包收','退款','返现','奖金','发了','赚','利息','收益','报销','还钱给我','转给我'];
// Expense keywords
const EXPENSE_KEYWORDS = ['花了','花掉','支出','消费','用了','扣了','付了','付款','买了','吃饭','打车','花','买','付','扣','交','充'];

// Account keywords mapping (matches to account types or names)
const ACCOUNT_KEYWORDS = {
  wechat: ['微信','wechat','wx','零钱','微信支付'],
  alipay: ['支付宝','alipay','余额宝','花呗'],
  yunshanfu: ['云闪付','银联'],
  licaicai: ['理财通'],
  cash: ['现金','现款','钞票']
};

// AI state
let aiState = {
  messages: [],
  pendingTx: null
};

function openAIChat() {
  const overlay = $('#ai-chat');
  overlay.classList.add('on');
  renderAIMessages();
  renderQuickReplies();
  // Use visualViewport to handle keyboard on mobile
  if (window.visualViewport) {
    const onResize = () => {
      overlay.style.height = window.visualViewport.height + 'px';
      // Scroll messages to bottom when keyboard appears
      const container = $('#ai-messages');
      if (container) container.scrollTop = container.scrollHeight;
    };
    window.visualViewport.removeEventListener('resize', onResize);
    window.visualViewport.addEventListener('resize', onResize);
    onResize();
  }
  setTimeout(() => {
    const input = $('#ai-input');
    if (input) input.focus({ preventScroll: true });
  }, 300);
  // Auto-grow textarea
  const aiInput = $('#ai-input');
  if (aiInput && !aiInput._autoGrowBound) {
    aiInput._autoGrowBound = true;
    aiInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
  }
}

function closeAIChat() {
  $('#ai-chat').classList.remove('on');
  if (window.visualViewport) {
    $('#ai-chat').style.height = '';
  }
}

function renderAIMessages() {
  const container = $('#ai-messages');
  if (aiState.messages.length === 0) {
    // Welcome message
    aiState.messages.push({
      role: 'bot',
      text: '你好！我是AI记账助手，可以用一句话帮你记账。试试说：\n• 今天用微信花了20元吃饭\n• 支付宝收到工资8000元\n• 招行卡扣了Netflix订阅68元',
      isWelcome: true
    });
  }
  container.innerHTML = aiState.messages.map(msg => {
    if (msg.role === 'bot') {
      return `<div class="ai-msg bot">
        <div class="ai-msg-ic">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1h.5a2.5 2.5 0 0 1 0 5H16v1a4 4 0 0 1-8 0v-1H7.5a2.5 2.5 0 0 1 0-5H8V6a4 4 0 0 1 4-4z"/></svg>
        </div>
        <div class="ai-msg-bubble">${msg.text}</div>
      </div>`;
    } else {
      return `<div class="ai-msg user">
        <div class="ai-msg-ic">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </div>
        <div class="ai-msg-bubble">
          ${msg.text}
          ${msg.txPreview ? renderTxPreview(msg.txPreview) : ''}
        </div>
      </div>`;
    }
  }).join('');
  container.scrollTop = container.scrollHeight;
}

function renderTxPreview(tx) {
  const typeText = tx.type === 'income' ? '收入' : '支出';
  const account = state.accounts.find(a => a.id === tx.accountId);
  const allCats = [...EXPENSE_CATS, ...INCOME_CATS];
  const catInfo = allCats.find(c => c.id === tx.category);
  return `<div class="ai-tx-card">
    <div class="ai-tx-row"><span class="ai-tx-label">类型</span><span class="ai-tx-value">${typeText}</span></div>
    <div class="ai-tx-row"><span class="ai-tx-label">金额</span><span class="ai-tx-value" style="color:${tx.type==='income'?'#30d158':'var(--red)'};">${tx.type==='income'?'+':'-'}¥${fmt(tx.amount)}</span></div>
    <div class="ai-tx-row"><span class="ai-tx-label">分类</span><span class="ai-tx-value">${catInfo?.name || tx.categoryName}</span></div>
    <div class="ai-tx-row"><span class="ai-tx-label">账户</span><span class="ai-tx-value">${account?.name || '未选择'}</span></div>
    <div class="ai-tx-row"><span class="ai-tx-label">日期</span><span class="ai-tx-value">${tx.date}</span></div>
    ${tx.note ? `<div class="ai-tx-row"><span class="ai-tx-label">备注</span><span class="ai-tx-value">${tx.note}</span></div>` : ''}
    <div class="ai-actions">
      <button class="ai-action-btn" onclick="cancelAITx()">取消</button>
      <button class="ai-action-btn confirm" onclick="confirmAITx()">确认记账</button>
    </div>
  </div>`;
}

function renderQuickReplies() {
  const quick = $('#ai-quick');
  if (state.accounts.length === 0) {
    quick.innerHTML = `<span style="color:var(--t3);font-size:12px;">请先在「账户」页面添加至少一个账户</span>`;
    return;
  }
  const suggestions = [
    '今天吃饭花了30元',
    '微信打车25',
    '支付宝充话费100',
    '收到工资5000'
  ];
  quick.innerHTML = suggestions.map(s => `<button class="ai-quick-btn" onclick="$('#ai-input').value='${s}';sendAIMessage();">${s}</button>`).join('');
}

function parseNaturalLanguage(text) {
  const result = {
    amount: null,
    type: 'expense',
    category: 'other',
    categoryName: '其他',
    accountId: null,
    accountName: null,
    date: today(),
    note: '',
    confidence: 0
  };
  
  // Normalize text
  let normalized = text.toLowerCase().trim();
  
  // 1. Extract amount (supports patterns like: 20元, 20块, 20块钱, 20, ¥20)
  const amountPatterns = [
    /(\d+(?:\.\d{1,2})?)\s*元/,
    /(\d+(?:\.\d{1,2})?)\s*块/,
    /(\d+(?:\.\d{1,2})?)\s*块钱/,
    /(\d+(?:\.\d{1,2})?)\s*rmb/,
    /¥\s*(\d+(?:\.\d{1,2})?)/,
    /(\d+(?:\.\d{1,2})?)\s*(?:刀|美元)/,
    /花了?\s*(\d+(?:\.\d{1,2})?)/,
    /用了?\s*(\d+(?:\.\d{1,2})?)/,
    /付了?\s*(\d+(?:\.\d{1,2})?)/,
    /扣了?\s*(\d+(?:\.\d{1,2})?)/,
    /收入\s*(\d+(?:\.\d{1,2})?)/,
    /收到\s*(\d+(?:\.\d{1,2})?)/,
    /(\d+(?:\.\d{1,2})?)/  // fallback - just number
  ];
  
  for (const pattern of amountPatterns) {
    const match = normalized.match(pattern);
    if (match) {
      result.amount = parseFloat(match[1]);
      break;
    }
  }
  
  // 2. Determine transaction type (income/expense)
  const isIncome = INCOME_KEYWORDS.some(kw => normalized.includes(kw));
  const isExpense = EXPENSE_KEYWORDS.some(kw => normalized.includes(kw));
  if (isIncome && !isExpense) {
    result.type = 'income';
  } else if (normalized.includes('收入') || normalized.includes('收到') || normalized.includes('工资') || normalized.includes('到账')) {
    result.type = 'income';
  }
  
  // 3. Find account
  let matchedAccount = null;
  
  // Check account type keywords
  for (const [typeKey, keywords] of Object.entries(ACCOUNT_KEYWORDS)) {
    for (const kw of keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        // Find account of this type
        matchedAccount = state.accounts.find(a => a.type === typeKey);
        if (matchedAccount) break;
      }
    }
    if (matchedAccount) break;
  }
  
  // If no type match, search by account name
  if (!matchedAccount) {
    for (const acct of state.accounts) {
      const acctName = acct.name.toLowerCase();
      if (normalized.includes(acctName) || acctName.includes(normalized.substring(0, 2))) {
        matchedAccount = acct;
        break;
      }
    }
  }
  
  // If still no match, use the first account or active account
  if (!matchedAccount) {
    if (state.accounts.length > 0) {
      matchedAccount = state.accounts[state.activeCardIdx] || state.accounts[0];
    }
  }
  
  if (matchedAccount) {
    result.accountId = matchedAccount.id;
    result.accountName = matchedAccount.name;
  }
  
  // 4. Determine category
  let bestCat = 'other';
  let bestCatName = '其他';
  let bestScore = 0;
  
  const allCats = [...EXPENSE_CATS, ...INCOME_CATS];
  
  for (const [catKey, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (normalized.includes(kw.toLowerCase())) {
        const score = kw.length; // longer keyword = higher confidence
        if (score > bestScore) {
          bestScore = score;
          bestCat = catKey;
          const catInfo = allCats.find(c => c.id === catKey);
          bestCatName = catInfo?.name || '其他';
        }
      }
    }
  }
  
  // Income categories - special handling
  if (result.type === 'income') {
    if (normalized.includes('工资') || normalized.includes('薪水') || normalized.includes('发薪')) {
      bestCat = 'salary';
      bestCatName = '工资';
    } else if (normalized.includes('红包')) {
      bestCat = 'bonus';
      bestCatName = '红包';
    } else if (normalized.includes('理财') || normalized.includes('收益') || normalized.includes('利息') || normalized.includes('投资')) {
      bestCat = 'invest';
      bestCatName = '理财';
    } else if (normalized.includes('报销')) {
      bestCat = 'other_in';
      bestCatName = '报销';
    } else {
      bestCat = 'other_in';
      bestCatName = '其他';
    }
  }
  
  result.category = bestCat;
  result.categoryName = bestCatName;
  
  // 5. Determine date
  if (normalized.includes('今天') || normalized.includes('今日')) {
    result.date = today();
  } else if (normalized.includes('昨天') || normalized.includes('昨日')) {
    result.date = addDays(today(), -1);
  } else if (normalized.includes('前天')) {
    result.date = addDays(today(), -2);
  }
  
  // 6. Extract note (use the original text as note if nothing specific)
  // Remove amount and common keywords to get note
  let note = text;
  const wordsToRemove = ['今天','昨天','前天','用','在','花了','花','花掉','支出','消费','用了','扣了','付了','付款','买了','元','块','块钱','人民币','微信','支付宝','云闪付','现金','吃饭','打车','收到','收入','工资','的'];
  for (const w of wordsToRemove) {
    note = note.replace(new RegExp(w, 'g'), '');
  }
  note = note.replace(/\d+(?:\.\d{1,2})?/g, '').trim();
  result.note = note || bestCatName;
  
  // Calculate confidence
  result.confidence = (result.amount ? 40 : 0) + (result.accountId ? 30 : 0) + (bestScore > 0 ? 30 : 0);
  
  return result;
}

function aiResponse(parsed) {
  if (!parsed.amount) {
    return '抱歉，我没听清楚金额是多少。能再说一遍吗？比如"花了20元吃饭"';
  }
  if (!parsed.accountId && state.accounts.length === 0) {
    return '你还没有添加任何账户哦。请先去「账户」页面添加一个账户，然后再试吧~';
  }
  
  const typeText = parsed.type === 'income' ? '收入' : '支出';
  let response = `好的，我理解了：`;
  response += `\n• ${typeText} ¥${fmt(parsed.amount)}`;
  response += `\n• 分类：${parsed.categoryName}`;
  response += `\n• 账户：${parsed.accountName || '默认账户'}`;
  if (parsed.confidence < 70) {
    response += `\n\n如果信息有误，你可以手动调整或重新描述。确认无误后点击「确认记账」即可。`;
  } else {
    response += `\n\n确认无误请点击「确认记账」，我来帮你记录~`;
  }
  return response;
}

function sendAIMessage() {
  const input = $('#ai-input');
  const text = input.value.trim();
  if (!text) return;
  
  // Add user message
  aiState.messages.push({ role: 'user', text });
  
  // Parse the message
  const parsed = parseNaturalLanguage(text);
  aiState.pendingTx = parsed;
  
  // Add bot response with preview
  aiState.messages.push({
    role: 'user',
    text: '',
    txPreview: parsed.amount ? parsed : null
  });
  
  // Add bot text response
  aiState.messages.push({
    role: 'bot',
    text: aiResponse(parsed)
  });
  
  input.value = '';
  input.style.height = 'auto';
  renderAIMessages();
  renderQuickReplies();
}

function confirmAITx() {
  if (!aiState.pendingTx || !aiState.pendingTx.amount) {
    toast('无法记账：缺少金额信息');
    return;
  }
  
  const tx = aiState.pendingTx;
  if (!tx.accountId && state.accounts.length > 0) {
    tx.accountId = state.accounts[state.activeCardIdx]?.id || state.accounts[0].id;
  }
  
  if (!tx.accountId) {
    toast('请先添加账户');
    return;
  }
  
  // Create transaction
  const now = new Date();
  const txRecord = {
    id: genId(),
    type: tx.type,
    amount: tx.amount,
    category: tx.category,
    categoryName: tx.categoryName,
    accountId: tx.accountId,
    note: tx.note,
    date: tx.date,
    time: `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`,
    isSubscription: false,
    createdAt: now.toISOString()
  };
  
  state.transactions.unshift(txRecord);
  
  // Update account balance
  const acct = state.accounts.find(a => a.id === tx.accountId);
  if (acct) {
    if (tx.type === 'expense') {
      acct.balance -= tx.amount;
    } else {
      acct.balance += tx.amount;
    }
  }
  
  save();
  render();
  
  // Remove the preview message and add success message
  aiState.messages = aiState.messages.filter(m => !m.txPreview);
  aiState.messages.push({
    role: 'bot',
    text: `✅ 已成功记账！${tx.type==='income'?'收入':'支出'} ¥${fmt(tx.amount)} 已${tx.type==='income'?'存入':'从'}${acct?.name || '账户'}${tx.type==='income'?'':'扣除'}。`
  });
  
  aiState.pendingTx = null;
  renderAIMessages();
  renderQuickReplies();
  toast('记账成功');
  haptic('success');
}

function cancelAITx() {
  aiState.messages = aiState.messages.filter(m => !m.txPreview);
  aiState.messages.push({
    role: 'bot',
    text: '好的，已取消。你可以重新描述，或者试试快捷回复~'
  });
  aiState.pendingTx = null;
  renderAIMessages();
  renderQuickReplies();
}

// ===== App Lock (Biometric / PIN) =====
function hashPin(pin) {
  let h = 0;
  for (let i = 0; i < pin.length; i++) { h = ((h << 5) - h + pin.charCodeAt(i)) | 0; }
  return 'h' + h;
}

function updateLockStatus() {
  const el = $('#lock-status');
  if (!el) return;
  const t = state.settings.lockType;
  if (t === 'biometric') el.textContent = '生物识别 已开启 ›';
  else if (t === 'pin') el.textContent = '密码锁 已开启 ›';
  else el.textContent = '未开启 ›';
}

function openLockSettings() {
  const options = [
    { v: 'none', label: '关闭应用锁' },
    { v: 'biometric', label: 'Face ID / 指纹' },
    { v: 'pin', label: '数字密码' }
  ];
  const current = state.settings.lockType;
  let msg = '选择锁定方式：\n\n';
  options.forEach((o, i) => {
    msg += `${i + 1}. ${o.label}${o.v === current ? ' (当前)' : ''}\n`;
  });
  msg += '\n输入数字选择（1-3）：';
  const choice = prompt(msg);
  if (!choice) return;
  const idx = parseInt(choice) - 1;
  if (idx < 0 || idx >= options.length) { toast('无效选择'); return; }
  const selected = options[idx].v;

  if (selected === 'none') {
    state.settings.lockType = 'none';
    state.settings.pinHash = null;
    save();
    updateLockStatus();
    toast('应用锁已关闭');
    haptic('medium');
  } else if (selected === 'biometric') {
    if (!window.PublicKeyCredential) {
      toast('当前设备不支持生物识别，请使用密码锁');
      return;
    }
    state.settings.lockType = 'biometric';
    save();
    updateLockStatus();
    toast('生物识别锁已开启');
    haptic('success');
  } else if (selected === 'pin') {
    state.pinSetupStep = 0;
    state.pinSetupBuffer = '';
    state.pinSetupFirst = '';
    $('#pin-setup-hint').textContent = '请输入4位数字密码';
    updatePinSetupDots();
    openSheet('sheet-pin');
  }
}

function updatePinSetupDots() {
  const dots = $$('#pin-setup-dots span');
  dots.forEach((d, i) => {
    d.classList.remove('filled', 'error');
    if (i < state.pinSetupBuffer.length) d.classList.add('filled');
  });
}

function pinSetupInput(digit) {
  haptic('light');
  if (state.pinSetupBuffer.length >= 4) return;
  state.pinSetupBuffer += digit;
  updatePinSetupDots();
  if (state.pinSetupBuffer.length === 4) {
    setTimeout(() => {
      if (state.pinSetupStep === 0) {
        state.pinSetupFirst = state.pinSetupBuffer;
        state.pinSetupBuffer = '';
        state.pinSetupStep = 1;
        $('#pin-setup-hint').textContent = '请再次输入确认';
        updatePinSetupDots();
      } else {
        if (state.pinSetupBuffer === state.pinSetupFirst) {
          state.settings.lockType = 'pin';
          state.settings.pinHash = hashPin(state.pinSetupBuffer);
          save();
          updateLockStatus();
          closeSheet('sheet-pin');
          toast('密码锁已开启');
          haptic('success');
        } else {
          $('#pin-setup-hint').textContent = '两次密码不一致，请重新输入';
          haptic('error');
          $$('#pin-setup-dots span').forEach(d => d.classList.add('error'));
          setTimeout(() => {
            state.pinSetupBuffer = '';
            state.pinSetupStep = 0;
            state.pinSetupFirst = '';
            $('#pin-setup-hint').textContent = '请输入4位数字密码';
            updatePinSetupDots();
          }, 600);
        }
      }
    }, 150);
  }
}

function pinSetupDelete() {
  haptic('light');
  state.pinSetupBuffer = state.pinSetupBuffer.slice(0, -1);
  updatePinSetupDots();
}

function showLockScreen() {
  if (state.settings.lockType === 'none') return;
  const overlay = $('#lock-screen');
  const pinArea = $('#lock-pin-area');
  const unlockBtn = $('#lock-unlock-btn');
  const subtitle = $('#lock-subtitle');

  if (state.settings.lockType === 'biometric') {
    pinArea.style.display = 'none';
    unlockBtn.style.display = 'block';
    subtitle.textContent = '点击下方按钮使用生物识别解锁';
  } else if (state.settings.lockType === 'pin') {
    pinArea.style.display = 'block';
    unlockBtn.style.display = 'none';
    subtitle.textContent = '请输入密码解锁';
    state.pinInputBuffer = '';
    updatePinInputDots();
  }
  overlay.classList.add('on');
}

function hideLockScreen() {
  $('#lock-screen').classList.remove('on');
}

async function attemptUnlock() {
  haptic('medium');
  if (state.settings.lockType === 'biometric') {
    try {
      const cred = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          timeout: 60000,
          userVerification: 'required'
        }
      });
      if (cred) {
        hideLockScreen();
        haptic('success');
      }
    } catch(e) {
      toast('生物识别失败，请重试');
      haptic('error');
    }
  }
}

function updatePinInputDots() {
  const dots = $$('#pin-dots span');
  dots.forEach((d, i) => {
    d.classList.remove('filled', 'error');
    if (i < state.pinInputBuffer.length) d.classList.add('filled');
  });
}

function pinInput(digit) {
  haptic('light');
  if (state.pinInputBuffer.length >= 4) return;
  state.pinInputBuffer += digit;
  updatePinInputDots();
  if (state.pinInputBuffer.length === 4) {
    setTimeout(() => {
      if (hashPin(state.pinInputBuffer) === state.settings.pinHash) {
        hideLockScreen();
        haptic('success');
      } else {
        haptic('error');
        $$('#pin-dots span').forEach(d => d.classList.add('error'));
        setTimeout(() => {
          state.pinInputBuffer = '';
          updatePinInputDots();
        }, 600);
      }
    }, 150);
  }
}

function pinDelete() {
  haptic('light');
  state.pinInputBuffer = state.pinInputBuffer.slice(0, -1);
  updatePinInputDots();
}

function pinCancel() {
  // Can't cancel lock screen - app stays locked
  haptic('light');
}

// Lock on visibility change (return from background)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    showLockScreen();
    checkSubscriptionReminders();
  }
});

// ===== Subscription Expiry Notifications =====
function updateNotifStatus() {
  const el = $('#notif-status');
  if (!el) return;
  el.textContent = state.settings.notifications ? '已开启 ›' : '未开启 ›';
}

async function toggleNotifications() {
  if (state.settings.notifications) {
    state.settings.notifications = false;
    save();
    updateNotifStatus();
    toast('到期提醒已关闭');
    haptic('medium');
    return;
  }
  if (!('Notification' in window)) {
    toast('当前浏览器不支持通知');
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    state.settings.notifications = true;
    save();
    updateNotifStatus();
    toast('到期提醒已开启');
    haptic('success');
    checkSubscriptionReminders();
  } else {
    toast('通知权限被拒绝，请在浏览器设置中允许');
  }
}

function checkSubscriptionReminders() {
  if (!state.settings.notifications) return;
  if (Notification.permission !== 'granted') return;
  const todayStr = today();
  const remindedKey = 'subpilot_reminded_' + todayStr;
  if (localStorage.getItem(remindedKey)) return; // Already checked today

  state.subscriptions.forEach(sub => {
    const days = daysBetween(todayStr, sub.nextDate);
    if (days === 3 || days === 1 || days === 0) {
      const title = days === 0 ? '今日到期' : `${days}天后到期`;
      const body = `「${sub.name}」${title}，金额 ¥${fmt(sub.price)}${sub.autoRenew ? '（自动续费）' : ''}`;
      new Notification(title, { body, icon: 'icons/icon.svg', tag: sub.id });
    }
  });
  localStorage.setItem(remindedKey, '1');
}

// ===== Reports =====
function switchReportPeriod(period) {
  state.reportPeriod = period;
  $$('.rp-btn').forEach(b => b.classList.toggle('on', b.dataset.p === period));
  renderReports();
  haptic('light');
}

function renderReports() {
  if (state.currentView !== 'reports') return;
  const period = state.reportPeriod;
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();

  let label, txs;
  if (period === 'month') {
    const range = getMonthRange();
    label = range.label;
    txs = state.transactions.filter(t => t.date >= range.start && t.date <= range.end);
    $('#reports-sub').textContent = label;
  } else {
    label = `${y}年`;
    const yStart = `${y}-01-01`;
    const yEnd = `${y}-12-31`;
    txs = state.transactions.filter(t => t.date >= yStart && t.date <= yEnd);
    $('#reports-sub').textContent = label;
  }

  const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const net = income - expense;

  $('#rep-summary').innerHTML = `
    <div class="rep-stat"><div class="rep-stat-label">总收入</div><div class="rep-stat-val" style="color:var(--green);">+¥${fmt(Math.round(income))}</div></div>
    <div class="rep-stat"><div class="rep-stat-label">总支出</div><div class="rep-stat-val" style="color:var(--red);">-¥${fmt(Math.round(expense))}</div></div>
    <div class="rep-stat"><div class="rep-stat-label">净收支</div><div class="rep-stat-val" style="color:${net >= 0 ? 'var(--green)' : 'var(--red)'};">${net >= 0 ? '+' : ''}¥${fmt(Math.round(net))}</div></div>
    <div class="rep-stat"><div class="rep-stat-label">笔数</div><div class="rep-stat-val">${txs.length}</div></div>
  `;

  renderLineChart(txs, period);
  renderPieChart(txs);
  renderComparison(period, y, m);
}

function renderLineChart(txs, period) {
  const container = $('#rep-line-chart');
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth();

  let buckets = [];
  if (period === 'month') {
    // Daily buckets for current month
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const ds = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const dayTx = txs.filter(t => t.date === ds);
      buckets.push({
        label: d % 5 === 0 || d === 1 ? String(d) : '',
        income: dayTx.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0),
        expense: dayTx.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0)
      });
    }
  } else {
    // Monthly buckets for current year
    for (let mo = 0; mo < 12; mo++) {
      const moStr = `${y}-${String(mo+1).padStart(2,'0')}`;
      const moTx = txs.filter(t => t.date.startsWith(moStr));
      buckets.push({
        label: `${mo+1}月`,
        income: moTx.filter(t => t.type === 'income').reduce((s,t) => s+t.amount, 0),
        expense: moTx.filter(t => t.type === 'expense').reduce((s,t) => s+t.amount, 0)
      });
    }
  }

  const maxVal = Math.max(...buckets.map(b => Math.max(b.income, b.expense)), 1);
  const w = 100 / buckets.length;
  const chartH = 120;

  let svg = `<svg viewBox="0 0 100 ${chartH}" preserveAspectRatio="none" style="width:100%;height:100%;">`;
  // Grid lines
  for (let i = 1; i <= 3; i++) {
    const gy = chartH - (chartH * i / 4);
    svg += `<line x1="0" y1="${gy}" x2="100" y2="${gy}" stroke="rgba(255,255,255,0.04)" stroke-width="0.3"/>`;
  }

  // Expense line (red)
  let expPoints = buckets.map((b, i) => {
    const x = i * w + w / 2;
    const yExp = chartH - (b.expense / maxVal) * (chartH - 10) - 5;
    return `${x},${yExp}`;
  }).join(' ');
  svg += `<polyline points="${expPoints}" fill="none" stroke="rgba(255,92,72,0.8)" stroke-width="0.8" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
  buckets.forEach((b, i) => {
    const x = i * w + w / 2;
    const yExp = chartH - (b.expense / maxVal) * (chartH - 10) - 5;
    svg += `<circle cx="${x}" cy="${yExp}" r="0.8" fill="rgba(255,92,72,0.8)"/>`;
  });

  // Income line (green)
  let incPoints = buckets.map((b, i) => {
    const x = i * w + w / 2;
    const yInc = chartH - (b.income / maxVal) * (chartH - 10) - 5;
    return `${x},${yInc}`;
  }).join(' ');
  svg += `<polyline points="${incPoints}" fill="none" stroke="rgba(82,204,130,0.8)" stroke-width="0.8" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
  buckets.forEach((b, i) => {
    const x = i * w + w / 2;
    const yInc = chartH - (b.income / maxVal) * (chartH - 10) - 5;
    svg += `<circle cx="${x}" cy="${yInc}" r="0.8" fill="rgba(82,204,130,0.8)"/>`;
  });

  svg += `</svg>`;

  // X-axis labels
  let labels = '<div style="display:flex;justify-content:space-between;font-size:9px;color:var(--t3);margin-top:4px;">';
  buckets.forEach((b, i) => {
    if (b.label) labels += `<span>${b.label}</span>`;
    else labels += `<span></span>`;
  });
  labels += '</div>';

  // Legend
  let legend = '<div style="display:flex;gap:14px;margin-top:8px;font-size:11px;">';
  legend += '<span style="color:var(--green);">● 收入</span><span style="color:var(--red);">● 支出</span>';
  legend += '</div>';

  container.innerHTML = svg + labels + legend;
}

function renderPieChart(txs) {
  const container = $('#rep-pie-chart');
  const expenseByCat = {};
  txs.filter(t => t.type === 'expense').forEach(t => {
    const key = t.isSubscription ? '订阅' : (EXPENSE_CATS.find(c => c.id === t.category)?.name || '其他');
    expenseByCat[key] = (expenseByCat[key] || 0) + t.amount;
  });
  const total = Object.values(expenseByCat).reduce((s, v) => s + v, 0);
  if (total === 0) {
    container.innerHTML = '<div style="text-align:center;padding:20px;color:var(--t3);font-size:13px;width:100%;">暂无支出数据</div>';
    return;
  }
  const catColors = { '餐饮':'#d4af7a', '订阅':'rgba(255,255,255,0.15)', '购物':'rgba(255,92,72,0.6)', '交通':'rgba(100,200,255,0.4)', '居家':'rgba(255,159,10,0.5)', '娱乐':'rgba(180,100,255,0.5)', '医疗':'rgba(255,69,58,0.5)', '学习':'rgba(82,204,130,0.5)', '其他':'rgba(255,255,255,0.2)' };
  let cum = 0;
  const segments = Object.entries(expenseByCat).sort((a, b) => b[1] - a[1]).map(([name, val]) => {
    const pct = (val / total) * 100;
    const start = cum; cum += pct;
    return { name, val, pct, start, color: catColors[name] || 'rgba(255,255,255,0.2)' };
  });
  let conic = 'conic-gradient(';
  conic += segments.map(s => `${s.color} ${s.start}% ${s.start + s.pct}%`).join(',');
  conic += ')';
  container.innerHTML = `
    <div class="dntc" style="background:${conic};"><span class="dntv">¥${fmt(Math.round(total))}</span></div>
    <div class="dntl">
      ${segments.slice(0, 5).map(s => `<div class="dli"><span class="dld" style="background:${s.color};"></span><span class="dln">${s.name}</span><span class="dlv">${s.pct.toFixed(0)}%</span></div>`).join('')}
    </div>
  `;
}

function renderComparison(period, y, m) {
  const container = $('#rep-compare');
  let html = '';

  if (period === 'month') {
    // Month-over-month: compare this month vs last month
    const thisRange = getMonthRange();
    const lastMonth = new Date(y, m - 1, 1);
    const lastRange = getMonthRange(lastMonth.toISOString().slice(0, 10));
    const thisTx = state.transactions.filter(t => t.date >= thisRange.start && t.date <= thisRange.end);
    const lastTx = state.transactions.filter(t => t.date >= lastRange.start && t.date <= lastRange.end);
    const thisExp = thisTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const lastExp = lastTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const thisInc = thisTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const lastInc = lastTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

    const expChange = lastExp > 0 ? ((thisExp - lastExp) / lastExp * 100) : 0;
    const incChange = lastInc > 0 ? ((thisInc - lastInc) / lastInc * 100) : 0;

    html += `<div class="rep-cmp-row"><span class="rep-cmp-label">支出环比上月</span><span class="rep-cmp-val ${expChange <= 0 ? 'up' : 'down'}">${lastExp > 0 ? (expChange >= 0 ? '+' : '') + expChange.toFixed(1) + '%' : '—'}</span></div>`;
    html += `<div class="rep-cmp-row"><span class="rep-cmp-label">收入环比上月</span><span class="rep-cmp-val ${incChange >= 0 ? 'up' : 'down'}">${lastInc > 0 ? (incChange >= 0 ? '+' : '') + incChange.toFixed(1) + '%' : '—'}</span></div>`;
    html += `<div class="rep-cmp-row"><span class="rep-cmp-label">上月支出</span><span class="rep-cmp-val">¥${fmt(Math.round(lastExp))}</span></div>`;
    html += `<div class="rep-cmp-row"><span class="rep-cmp-label">本月支出</span><span class="rep-cmp-val">¥${fmt(Math.round(thisExp))}</span></div>`;
  } else {
    // Year-over-year: compare this year vs last year
    const thisStart = `${y}-01-01`, thisEnd = `${y}-12-31`;
    const lastStart = `${y-1}-01-01`, lastEnd = `${y-1}-12-31`;
    const thisTx = state.transactions.filter(t => t.date >= thisStart && t.date <= thisEnd);
    const lastTx = state.transactions.filter(t => t.date >= lastStart && t.date <= lastEnd);
    const thisExp = thisTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const lastExp = lastTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const thisInc = thisTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const lastInc = lastTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);

    const expChange = lastExp > 0 ? ((thisExp - lastExp) / lastExp * 100) : 0;
    const incChange = lastInc > 0 ? ((thisInc - lastInc) / lastInc * 100) : 0;

    html += `<div class="rep-cmp-row"><span class="rep-cmp-label">支出同比去年</span><span class="rep-cmp-val ${expChange <= 0 ? 'up' : 'down'}">${lastExp > 0 ? (expChange >= 0 ? '+' : '') + expChange.toFixed(1) + '%' : '—'}</span></div>`;
    html += `<div class="rep-cmp-row"><span class="rep-cmp-label">收入同比去年</span><span class="rep-cmp-val ${incChange >= 0 ? 'up' : 'down'}">${lastInc > 0 ? (incChange >= 0 ? '+' : '') + incChange.toFixed(1) + '%' : '—'}</span></div>`;
    html += `<div class="rep-cmp-row"><span class="rep-cmp-label">去年总支出</span><span class="rep-cmp-val">¥${fmt(Math.round(lastExp))}</span></div>`;
    html += `<div class="rep-cmp-row"><span class="rep-cmp-label">今年总支出</span><span class="rep-cmp-val">¥${fmt(Math.round(thisExp))}</span></div>`;
  }

  container.innerHTML = html;
}

// ===== Exchange Rate =====
function updateExrateStatus() {
  const el = $('#exrate-status');
  if (!el) return;
  const rates = state.settings?.exRates || {};
  const count = Object.keys(rates).filter(k => rates[k] > 0).length;
  el.textContent = count > 0 ? `${count}种币种 ›` : '设置 ›';
}

function openExchangeRateSettings() {
  const rates = state.settings.exRates;
  const currencyNames = { USD: '美元 USD', EUR: '欧元 EUR', GBP: '英镑 GBP', JPY: '日元 JPY', HKD: '港币 HKD', TWD: '新台币 TWD' };
  let msg = '汇率设置（兑1人民币）\n\n';
  msg += '当前汇率：\n';
  Object.entries(rates).forEach(([k, v]) => {
    msg += `  ${currencyNames[k] || k}: ${v}\n`;
  });
  msg += '\n如需修改，请输入币种代码和汇率\n例如: USD,7.25\n\n输入 "auto" 可尝试自动获取最新汇率\n输入 "reset" 恢复默认';

  const input = prompt(msg);
  if (!input) return;

  if (input.trim().toLowerCase() === 'auto') {
    fetchExchangeRates();
    return;
  }
  if (input.trim().toLowerCase() === 'reset') {
    state.settings.exRates = { USD: 7.25, EUR: 7.85, GBP: 9.20, JPY: 0.048, HKD: 0.93, TWD: 0.22 };
    save();
    updateExrateStatus();
    toast('汇率已重置');
    haptic('medium');
    return;
  }

  const parts = input.split(',').map(s => s.trim());
  if (parts.length >= 2) {
    const currency = parts[0].toUpperCase();
    const rate = parseFloat(parts[1]);
    if (rate > 0) {
      state.settings.exRates[currency] = rate;
      save();
      updateExrateStatus();
      toast(`${currency} 汇率已更新为 ${rate}`);
      haptic('success');
    } else {
      toast('汇率格式错误');
    }
  } else {
    toast('请按格式输入：币种,汇率');
  }
}

async function fetchExchangeRates() {
  toast('正在获取汇率...');
  try {
    const resp = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await resp.json();
    if (data.rates && data.rates.CNY) {
      const usdToCny = data.rates.CNY;
      state.settings.exRates.USD = Math.round(usdToCny * 100) / 100;
      if (data.rates.EUR) state.settings.exRates.EUR = Math.round(usdToCny / data.rates.EUR * 100) / 100;
      if (data.rates.GBP) state.settings.exRates.GBP = Math.round(usdToCny / data.rates.GBP * 100) / 100;
      if (data.rates.JPY) state.settings.exRates.JPY = Math.round(usdToCny / data.rates.JPY * 10000) / 10000;
      if (data.rates.HKD) state.settings.exRates.HKD = Math.round(usdToCny / data.rates.HKD * 100) / 100;
      if (data.rates.TWD) state.settings.exRates.TWD = Math.round(usdToCny / data.rates.TWD * 100) / 100;
      save();
      updateExrateStatus();
      toast('汇率已更新');
      haptic('success');
    }
  } catch(e) {
    toast('获取汇率失败，请手动设置');
  }
}

function convertToCNY(amount, currency) {
  if (!currency || currency === 'CNY') return amount;
  const rate = state.settings.exRates[currency];
  if (!rate) return amount;
  return amount * rate;
}

// ===== QR Code Folder =====
const QR_CATEGORIES = {
  payment: { name: '收款付款', icon: '💳' },
  transport: { name: '交通出行', icon: '🚇' },
  medical: { name: '医疗社保', icon: '🏥' },
  personal: { name: '个人身份', icon: '👤' },
  other: { name: '其他', icon: '📋' }
};

function renderQRCodes() {
  if (state.currentView !== 'qrcodes') return;
  const cats = $('#qr-cats');
  const grid = $('#qr-grid');

  // Category tabs
  let catHtml = `<button class="qr-cat ${state.qrSelectedCat === 'all' ? 'on' : 'off'}" onclick="selectQRCat('all')">全部</button>`;
  Object.entries(QR_CATEGORIES).forEach(([k, v]) => {
    catHtml += `<button class="qr-cat ${state.qrSelectedCat === k ? 'on' : 'off'}" onclick="selectQRCat('${k}')">${v.icon} ${v.name}</button>`;
  });
  cats.innerHTML = catHtml;

  // QR code grid
  let filtered = state.qrcodes;
  if (state.qrSelectedCat !== 'all') {
    filtered = state.qrcodes.filter(q => q.category === state.qrSelectedCat);
  }

  $('#qr-sub').textContent = `${state.qrcodes.length}个二维码`;

  let gridHtml = '';
  filtered.forEach(qr => {
    const catInfo = QR_CATEGORIES[qr.category] || QR_CATEGORIES.other;
    gridHtml += `<div class="qr-card" onclick="viewQRCode('${qr.id}')">
      <div class="qr-card-img"><img src="${qr.image}" alt="${qr.name}"></div>
      <div class="qr-card-name">${qr.name}</div>
      <div style="font-size:10px;color:var(--t3);">${catInfo.icon} ${catInfo.name}</div>
    </div>`;
  });
  // Add button
  gridHtml += `<div class="qr-add-card" onclick="openAddQRCode()">
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    <span>添加二维码</span>
  </div>`;
  grid.innerHTML = gridHtml;
}

function selectQRCat(cat) {
  state.qrSelectedCat = cat;
  renderQRCodes();
  haptic('light');
}

function openAddQRCode() {
  state.qrEditingId = null;
  state.qrPreviewData = null;
  $('#qr-sheet-title').textContent = '添加二维码';
  $('#qr-name').value = '';
  $('#qr-preview').innerHTML = '';
  $$('#qr-cat-pick .pick').forEach((b, i) => {
    b.classList.toggle('on', i === 0);
  });
  state.qrSelectedCat = 'all'; // Reset filter
  openSheet('sheet-qr');
}

$$('#qr-cat-pick .pick').forEach(b => {
  b.onclick = () => {
    $$('#qr-cat-pick .pick').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    haptic('light');
  };
});

function previewQRFile(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) {
    toast('图片不能超过2MB');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    state.qrPreviewData = e.target.result;
    $('#qr-preview').innerHTML = `<img src="${e.target.result}" style="width:120px;height:120px;border-radius:12px;object-fit:cover;">`;
  };
  reader.readAsDataURL(file);
}

function saveQRCode() {
  const name = $('#qr-name').value.trim();
  if (!name) { toast('请输入名称'); return; }
  if (!state.qrPreviewData) { toast('请选择二维码图片'); return; }
  const catBtn = document.querySelector('#qr-cat-pick .pick.on');
  const category = catBtn ? catBtn.dataset.c : 'other';

  if (state.qrEditingId) {
    const qr = state.qrcodes.find(q => q.id === state.qrEditingId);
    if (qr) {
      qr.name = name;
      qr.category = category;
      qr.image = state.qrPreviewData;
    }
    state.qrEditingId = null;
  } else {
    state.qrcodes.push({
      id: genId(),
      name,
      category,
      image: state.qrPreviewData,
      createdAt: new Date().toISOString()
    });
  }
  save();
  closeSheet('sheet-qr');
  toast('二维码已保存');
  haptic('success');
  renderQRCodes();
}

function viewQRCode(id) {
  const qr = state.qrcodes.find(q => q.id === id);
  if (!qr) return;
  state.qrViewingId = id;
  $('#qr-view-title').textContent = qr.name;
  $('#qr-view-img').innerHTML = `<img src="${qr.image}" style="width:100%;display:block;">`;
  openSheet('sheet-qr-view');
  haptic('light');
}

function downloadQR() {
  const qr = state.qrcodes.find(q => q.id === state.qrViewingId);
  if (!qr) return;
  const link = document.createElement('a');
  link.download = `${qr.name}.png`;
  link.href = qr.image;
  link.click();
  haptic('success');
  toast('已保存到本地');
}

// ===== Invoice Management =====
const INVOICE_CATEGORIES = {
  food: { name: '餐饮', icon: '🍜' },
  shopping: { name: '购物', icon: '🛍️' },
  transport: { name: '交通', icon: '🚗' },
  entertainment: { name: '娱乐', icon: '🎮' },
  other: { name: '其他', icon: '📋' }
};

function renderInvoices() {
  if (state.currentView !== 'invoices') return;
  const cats = $('#inv-cats');
  const grid = $('#inv-grid');
  if (!cats || !grid) return;

  // Category tabs
  let catHtml = `<button class="qr-cat ${state.invSelectedCat === 'all' ? 'on' : 'off'}" onclick="selectInvCat('all')">全部</button>`;
  Object.entries(INVOICE_CATEGORIES).forEach(([k, v]) => {
    catHtml += `<button class="qr-cat ${state.invSelectedCat === k ? 'on' : 'off'}" onclick="selectInvCat('${k}')">${v.icon} ${v.name}</button>`;
  });
  cats.innerHTML = catHtml;

  // Filter
  let filtered = state.invoices;
  if (state.invSelectedCat !== 'all') {
    filtered = state.invoices.filter(inv => inv.category === state.invSelectedCat);
  }
  // Sort by date desc
  filtered.sort((a, b) => b.date.localeCompare(a.date));

  const totalAmt = filtered.reduce((s, inv) => s + (inv.amount || 0), 0);
  $('#inv-sub').textContent = `${state.invoices.length}张发票 · ¥${fmt(Math.round(totalAmt))}`;

  let gridHtml = '';
  filtered.forEach(inv => {
    const catInfo = INVOICE_CATEGORIES[inv.category] || INVOICE_CATEGORIES.other;
    const isPdf = inv.fileType === 'pdf';
    const thumbHtml = isPdf
      ? `<div class="inv-pdf-icon">📄</div>`
      : `<img src="${inv.image}" alt="${inv.name}">`;
    gridHtml += `<div class="inv-card" onclick="viewInvoice('${inv.id}')">
      <div class="inv-card-thumb">${thumbHtml}</div>
      <div class="inv-card-name">${inv.name}</div>
      <div class="inv-card-meta">
        <span class="inv-cat-badge">${catInfo.name}</span>
        <span class="inv-card-amt">¥${fmt(Math.round(inv.amount || 0))}</span>
      </div>
      <div style="font-size:10px;color:var(--t3);">${inv.date || ''}</div>
    </div>`;
  });

  gridHtml += `<div class="inv-add-card" onclick="openAddInvoice()">
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    <span>添加发票</span>
  </div>`;
  grid.innerHTML = gridHtml;
}

function selectInvCat(cat) {
  state.invSelectedCat = cat;
  renderInvoices();
  haptic('light');
}

function openAddInvoice() {
  state.invoiceEditingId = null;
  state.invoicePreviewData = null;
  $('#inv-sheet-title').textContent = '添加发票';
  $('#inv-name').value = '';
  $('#inv-amount').value = '';
  $('#inv-note').value = '';
  $('#inv-date').value = today();
  $('#inv-preview').innerHTML = '';
  $$('#inv-cat-pick .pick').forEach((b, i) => {
    b.classList.toggle('on', i === 0);
  });
  state.invSelectedCat = 'all';
  openSheet('sheet-inv');
  haptic('light');
}

$$('#inv-cat-pick .pick')?.forEach(b => {
  b.onclick = () => {
    $$('#inv-cat-pick .pick').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    haptic('light');
  };
});

function previewInvFile(input) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    toast('文件不能超过5MB');
    return;
  }
  const isPdf = file.type === 'application/pdf';
  const reader = new FileReader();
  reader.onload = (e) => {
    state.invoicePreviewData = e.target.result;
    state.invoicePreviewType = isPdf ? 'pdf' : 'image';
    if (isPdf) {
      $('#inv-preview').innerHTML = `<div style="padding:20px;background:var(--card2);border-radius:12px;text-align:center;"><div style="font-size:36px;margin-bottom:8px;">📄</div><div style="font-size:12px;color:var(--t2);">PDF文件已选择</div></div>`;
    } else {
      $('#inv-preview').innerHTML = `<img src="${e.target.result}" style="max-width:120px;max-height:160px;border-radius:12px;object-fit:cover;">`;
    }
  };
  reader.readAsDataURL(file);
}

function saveInvoice() {
  const name = $('#inv-name').value.trim();
  const amount = parseFloat($('#inv-amount').value) || 0;
  const date = $('#inv-date').value || today();
  const note = $('#inv-note').value.trim();
  if (!name) { toast('请输入发票名称/商家'); return; }
  if (!state.invoicePreviewData) { toast('请选择发票文件'); return; }
  const catBtn = document.querySelector('#inv-cat-pick .pick.on');
  const category = catBtn ? catBtn.dataset.c : 'other';

  if (state.invoiceEditingId) {
    const inv = state.invoices.find(i => i.id === state.invoiceEditingId);
    if (inv) {
      inv.name = name; inv.amount = amount; inv.date = date;
      inv.category = category; inv.note = note;
      inv.image = state.invoicePreviewData;
      inv.fileType = state.invoicePreviewType || 'image';
    }
    state.invoiceEditingId = null;
  } else {
    state.invoices.push({
      id: genId(), name, amount, date, category, note,
      image: state.invoicePreviewData,
      fileType: state.invoicePreviewType || 'image',
      createdAt: new Date().toISOString()
    });
  }
  save();
  closeSheet('sheet-inv');
  toast('发票已保存');
  haptic('success');
  renderInvoices();
}

function viewInvoice(id) {
  const inv = state.invoices.find(i => i.id === id);
  if (!inv) return;
  state.invoiceViewingId = id;
  const catInfo = INVOICE_CATEGORIES[inv.category] || INVOICE_CATEGORIES.other;
  $('#inv-view-title').textContent = inv.name;
  $('#inv-view-meta').innerHTML = `${catInfo.icon} ${catInfo.name} · ¥${fmt(Math.round(inv.amount || 0))} · ${inv.date || ''}${inv.note ? ' · ' + inv.note : ''}`;
  if (inv.fileType === 'pdf') {
    $('#inv-view-img').innerHTML = `<div style="padding:40px;background:#fff;text-align:center;width:100%;"><div style="font-size:48px;margin-bottom:8px;">📄</div><div style="font-size:12px;color:#666;">PDF发票</div></div>`;
  } else {
    $('#inv-view-img').innerHTML = `<img src="${inv.image}" style="width:100%;display:block;">`;
  }
  openSheet('sheet-inv-view');
  haptic('light');
}

function downloadInvoice() {
  const inv = state.invoices.find(i => i.id === state.invoiceViewingId);
  if (!inv) return;
  const ext = inv.fileType === 'pdf' ? 'pdf' : 'png';
  const link = document.createElement('a');
  link.download = `${inv.name}-${inv.date || ''}.${ext}`;
  link.href = inv.image;
  link.click();
  haptic('success');
  toast('已保存到本地');
}

// Initialize category pickers for invoice sheet
// (handled by delegated click on .pick elements)

// ===== Cloud Sync (Supabase) =====
const PUBLIC_SUPABASE_URL = 'https://cicauycbflanpqcrfakd.supabase.co';
const PUBLIC_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpY2F1eWNiZmxhbnBxY3JmYWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwOTA4NzcsImV4cCI6MjEwMTY2Njg3N30.kegH6ESniP0ouFtio5EHw0XDOHxJFCgtzx-dELjCx7c';
const CLOUD_DATA_TYPES = ['accounts', 'subscriptions', 'transactions', 'qrcodes', 'invoices', 'settings'];

function getSupabaseConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEYS.cloudConfig) || 'null');
    if (saved && saved.url && saved.key) {
      return { url: saved.url, key: saved.key, custom: true };
    }
  } catch(e) {}
  // Default public cloud
  return { url: PUBLIC_SUPABASE_URL, key: PUBLIC_SUPABASE_KEY, custom: false };
}

function initSupabase() {
  const cfg = getSupabaseConfig();
  if (!cfg.url || !cfg.key) {
    state.supabaseClient = null;
    state.cloudEnabled = false;
    return false;
  }
  if (typeof supabase === 'undefined') {
    console.warn('Supabase SDK not loaded');
    return false;
  }
  try {
    state.supabaseClient = supabase.createClient(cfg.url, cfg.key, {
      auth: {
        storage: {
          getItem: (k) => localStorage.getItem(k),
          setItem: (k, v) => localStorage.setItem(k, v),
          removeItem: (k) => localStorage.removeItem(k)
        },
        persistSession: true,
        autoRefreshToken: true
      }
    });
    state.cloudEnabled = true;
    return true;
  } catch(e) {
    console.error('Supabase init error:', e);
    state.supabaseClient = null;
    state.cloudEnabled = false;
    return false;
  }
}

async function checkCloudSession() {
  if (!state.supabaseClient) return;
  try {
    const { data: { session } } = await state.supabaseClient.auth.getSession();
    if (session?.user) {
      state.cloudUser = session.user;
    } else {
      state.cloudUser = null;
    }
  } catch(e) { console.error('Session check error:', e); }
}

function updateCloudStatus() {
  const el = $('#cloud-status');
  const cfgEl = $('#cloud-config-status');
  if (!el) return;
  const cfg = getSupabaseConfig();

  if (cfg.custom) {
    if (cfgEl) cfgEl.textContent = '自定义 ›';
  } else {
    if (cfgEl) cfgEl.textContent = '公共云 ›';
  }

  if (state.cloudUser) {
    const email = state.cloudUser.email || '';
    const shortEmail = email.length > 18 ? email.slice(0, 15) + '...' : email;
    const syncText = state.cloudLastSync ? ' · 已同步' : '';
    el.textContent = `${shortEmail}${syncText} ›`;
    el.style.color = 'var(--green)';
  } else {
    el.textContent = '点此登录 ›';
    el.style.color = 'var(--gold)';
  }
}

function openCloudAuth() {
  if (state.cloudUser) {
    // Already logged in - show options
    const action = confirm(`已登录: ${state.cloudUser.email}\n\n确定=立即同步\n取消=退出登录`);
    if (action) {
      syncToCloud();
    } else {
      if (confirm('确定退出登录？本地数据不会删除。')) {
        cloudSignOut();
      }
    }
    return;
  }
  // Ensure Supabase is initialized with default config
  if (!state.supabaseClient) {
    initSupabase();
  }
  openAuthSheet();
}

function openCloudConfig() {
  const cfg = getSupabaseConfig();
  $('#cloud-url').value = cfg.url || '';
  $('#cloud-key').value = cfg.key || '';
  openSheet('sheet-cloud-config');
  haptic('light');
}

function saveCloudConfig() {
  const url = $('#cloud-url').value.trim();
  const key = $('#cloud-key').value.trim();
  if (url && key) {
    localStorage.setItem(KEYS.cloudConfig, JSON.stringify({ url, key }));
    toast('已切换到自定义云');
  } else {
    localStorage.removeItem(KEYS.cloudConfig);
    toast('已使用公共云');
  }
  haptic('success');
  closeSheet('sheet-cloud-config');
  state.cloudUser = null;
  state.cloudLastSync = null;
  initSupabase();
  checkCloudSession().then(() => {
    updateCloudStatus();
    render();
  });
}

function resetCloudConfig() {
  localStorage.removeItem(KEYS.cloudConfig);
  $('#cloud-url').value = '';
  $('#cloud-key').value = '';
  state.cloudUser = null;
  state.cloudLastSync = null;
  initSupabase();
  toast('已恢复公共云');
  haptic('medium');
  updateCloudStatus();
  closeSheet('sheet-cloud-config');
}

let authMode = 'login'; // 'login' or 'signup'

function switchAuthTab(mode) {
  authMode = mode;
  const loginTab = $('#auth-tab-login');
  const signupTab = $('#auth-tab-signup');
  const confirmWrap = $('#auth-confirm-wrap');
  const submitBtn = $('#auth-submit-btn');
  const titleEl = $('#auth-title');
  const msgEl = $('#auth-msg');

  if (mode === 'login') {
    loginTab.style.background = 'var(--gold)';
    loginTab.style.color = '#000';
    signupTab.style.background = 'transparent';
    signupTab.style.color = 'var(--t2)';
    confirmWrap.style.display = 'none';
    submitBtn.textContent = '登录';
    titleEl.textContent = '登录';
    $('#auth-password').setAttribute('autocomplete', 'current-password');
  } else {
    signupTab.style.background = 'var(--gold)';
    signupTab.style.color = '#000';
    loginTab.style.background = 'transparent';
    loginTab.style.color = 'var(--t2)';
    confirmWrap.style.display = 'block';
    submitBtn.textContent = '注册';
    titleEl.textContent = '注册';
    $('#auth-password').setAttribute('autocomplete', 'new-password');
  }
  if (msgEl) msgEl.textContent = '';
  haptic('light');
}

function togglePwdVisibility() {
  const pwd = $('#auth-password');
  const btn = pwd.parentElement.querySelector('button');
  if (pwd.type === 'password') {
    pwd.type = 'text';
    btn.textContent = '隐藏';
  } else {
    pwd.type = 'password';
    btn.textContent = '显示';
  }
}

function setAuthMsg(text, isError) {
  const msgEl = $('#auth-msg');
  if (!msgEl) return;
  msgEl.textContent = text;
  msgEl.style.color = isError ? 'var(--red)' : 'var(--green)';
}

async function submitAuth() {
  const email = $('#auth-email').value.trim();
  const password = $('#auth-password').value;
  const password2 = $('#auth-password2')?.value || '';

  if (!email || !email.includes('@')) {
    setAuthMsg('请输入有效的邮箱地址', true);
    haptic('error');
    return;
  }
  if (!password || password.length < 6) {
    setAuthMsg('密码至少6位', true);
    haptic('error');
    return;
  }

  if (!state.supabaseClient) {
    initSupabase();
    if (!state.supabaseClient) {
      setAuthMsg('云服务未初始化，请刷新重试', true);
      return;
    }
  }

  const btn = $('#auth-submit-btn');
  btn.disabled = true;
  btn.style.opacity = '0.6';

  try {
    let data, error;
    if (authMode === 'signup') {
      if (password !== password2) {
        setAuthMsg('两次密码不一致', true);
        btn.disabled = false; btn.style.opacity = '';
        haptic('error');
        return;
      }
      // Sign up with email+password (no email confirmation needed)
      const res = await state.supabaseClient.auth.signUp({
        email, password,
        options: { emailRedirectTo: undefined }
      });
      data = res.data; error = res.error;
      if (!error && data.user) {
        if (data.session) {
          state.cloudUser = data.user;
          setAuthMsg('注册成功！正在同步数据...', false);
          haptic('success');
          setTimeout(() => {
            closeSheet('sheet-auth');
            btn.disabled = false; btn.style.opacity = '';
            updateCloudStatus();
            syncToCloud();
          }, 800);
        } else {
          // Email confirmation is required but email can't be received
          setAuthMsg('⚠️ 请先去Supabase后台关闭"Confirm email"开关（Authentication→Providers→Email），关掉后重新注册', true);
          btn.disabled = false; btn.style.opacity = '';
          haptic('error');
        }
        return;
      }
    } else {
      // Sign in
      const res = await state.supabaseClient.auth.signInWithPassword({ email, password });
      data = res.data; error = res.error;
      if (!error && data.user) {
        state.cloudUser = data.user;
        state.authEmail = email;
        setAuthMsg('登录成功！正在同步...', false);
        haptic('success');
        setTimeout(() => {
          closeSheet('sheet-auth');
          btn.disabled = false; btn.style.opacity = '';
          updateCloudStatus();
          syncToCloud();
        }, 800);
        return;
      }
    }

    if (error) {
      let msg = error.message || '操作失败';
      if (msg.includes('Invalid login')) msg = '邮箱或密码错误';
      else if (msg.includes('already registered')) msg = '该邮箱已注册，请直接登录';
      else if (msg.includes('Password should be')) msg = '密码至少6位';
      else if (msg.includes('rate limit')) msg = '操作过于频繁，请1小时后再试';
      else if (msg.includes('Email not confirmed')) {
        msg = '⚠️ 请先去Supabase后台关闭"Confirm email"开关（Authentication→Providers→Email），关掉后重新注册即可';
      }
      setAuthMsg(msg, true);
      haptic('error');
    }
  } catch(e) {
    setAuthMsg('网络错误，请检查网络连接', true);
    haptic('error');
  }
  btn.disabled = false;
  btn.style.opacity = '';
}

// Open auth sheet - reset state
function openAuthSheet() {
  authMode = 'login';
  $('#auth-email').value = state.authEmail || '';
  $('#auth-password').value = '';
  $('#auth-password2').value = '';
  switchAuthTab('login');
  setAuthMsg('', true);
  openSheet('sheet-auth');
  haptic('light');
}

async function forgotPassword() {
  const email = $('#auth-email').value.trim();
  if (!email || !email.includes('@')) {
    setAuthMsg('请先输入注册邮箱', true);
    return;
  }
  if (!state.supabaseClient) initSupabase();
  try {
    const { error } = await state.supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) {
      setAuthMsg(error.message || '发送失败', true);
      haptic('error');
    } else {
      setAuthMsg('重置链接已发送到邮箱，请查收', false);
      haptic('success');
    }
  } catch(e) {
    setAuthMsg('发送失败，请检查网络', true);
    haptic('error');
  }
}

async function cloudSignOut() {
  if (!state.supabaseClient) return;
  await state.supabaseClient.auth.signOut();
  state.cloudUser = null;
  state.cloudLastSync = null;
  toast('已退出登录');
  haptic('medium');
  updateCloudStatus();
}

// Cloud data sync using last-write-wins per collection
async function syncToCloud() {
  if (!state.supabaseClient || !state.cloudUser) {
    toast('请先登录');
    return;
  }
  const uid = state.cloudUser.id;
  toast('正在同步...');

  try {
    // First pull all cloud data
    const { data: cloudData, error: pullErr } = await state.supabaseClient
      .from('user_data')
      .select('data_type, data, updated_at')
      .eq('user_id', uid);

    if (pullErr) throw pullErr;

    const cloudMap = {};
    (cloudData || []).forEach(row => {
      cloudMap[row.data_type] = row;
    });

    const localTimestamps = JSON.parse(localStorage.getItem('subpilot_local_ts') || '{}');
    const now = new Date().toISOString();
    let pushCount = 0;
    let pullCount = 0;

    for (const type of CLOUD_DATA_TYPES) {
      let localData;
      if (type === 'settings') {
        // Don't sync lock PIN hash for security
        const safe = { ...state.settings };
        delete safe.pinHash;
        localData = safe;
      } else {
        localData = state[type];
      }

      const cloud = cloudMap[type];
      const localTs = localTimestamps[type] || '1970-01-01T00:00:00.000Z';
      const cloudTs = cloud?.updated_at || '1970-01-01T00:00:00.000Z';

      if (!cloud || localTs > cloudTs) {
        // Local is newer - push
        const { error: upsertErr } = await state.supabaseClient
          .from('user_data')
          .upsert({
            user_id: uid,
            data_type: type,
            data: localData,
            updated_at: now
          }, { onConflict: 'user_id,data_type' });
        if (upsertErr) console.error('Push error for', type, upsertErr);
        else pushCount++;
      } else if (cloudTs > localTs) {
        // Cloud is newer - pull
        if (type === 'settings') {
          const pulled = cloud.data || {};
          state.settings = { ...state.settings, ...pulled };
        } else {
          state[type] = cloud.data || [];
        }
        pullCount++;
      }
    }

    localTimestamps._lastSync = now;
    for (const type of CLOUD_DATA_TYPES) {
      localTimestamps[type] = now;
    }
    localStorage.setItem('subpilot_local_ts', JSON.stringify(localTimestamps));
    state.cloudLastSync = now;
    save();
    render();
    updateCloudStatus();

    if (pushCount > 0 && pullCount > 0) {
      toast(`同步完成：推送${pushCount}项，拉取${pullCount}项`);
    } else if (pushCount > 0) {
      toast(`已上传${pushCount}项数据到云端`);
    } else if (pullCount > 0) {
      toast(`已从云端拉取${pullCount}项数据`);
    } else {
      toast('数据已是最新');
    }
    haptic('success');
  } catch(e) {
    console.error('Sync error:', e);
    toast('同步失败：' + (e.message || '请检查网络和配置'));
    haptic('error');
  }
}

// Update local timestamps when data changes locally
function markLocalChange() {
  const ts = JSON.parse(localStorage.getItem('subpilot_local_ts') || '{}');
  const now = new Date().toISOString();
  for (const type of CLOUD_DATA_TYPES) {
    ts[type] = now;
  }
  localStorage.setItem('subpilot_local_ts', JSON.stringify(ts));
}

// ===== Update render() to include new views =====

init();
