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
  unionpay: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#E21836' },
  // 银行类 - 用银行卡图标+品牌色
  cmb: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#C8102E' },
  icbc: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#B40020' },
  ccb: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#003F88' },
  abc: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#009A44' },
  boc: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#AF272F' },
  bankcomm: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#005BAC' },
  spdb: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#C8102E' },
  cmbc: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#005BAC' },
  citic: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#E60012' },
  ceb: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#7B2E86' },
  psbc: { p: 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z', bg: '#007A33' },
  // 理财类
  licaitong: { p: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z', bg: '#FA9D3B' },
  yuebao: { p: 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z', bg: '#FF7300' },
  // 通用钱包图标
  wallet: { p: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z', bg: '#d4af7a' }
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
  acctIncludeInAssets: true,
  editingAcctIdx: -1,
  activeCardByGroup: {}, // 每个分组当前展示的卡片索引: {groupKey: accountId}
  currentSubId: null,
  fetchedAppIcon: null,
  editSubId: null,
  cardIconPickerId: null,
  settings: {
    appPassword: null,
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
  bank: { name: '储蓄卡', brand: 'UnionPay', hasChip: true, hasHolo: true, group: 'funding' },
  alipay: { name: '支付宝', brand: 'Alipay', hasChip: false, hasHolo: false, group: 'funding' },
  wechat: { name: '微信零钱', brand: 'WeChat Pay', hasChip: false, hasHolo: false, group: 'funding' },
  yunshanfu: { name: '云闪付', brand: 'UnionPay', hasChip: false, hasHolo: false, group: 'funding' },
  licaicai: { name: '理财通', brand: 'Licaitong', hasChip: false, hasHolo: false, group: 'wealth' },
  yuebao: { name: '余额宝', brand: 'Yuebao', hasChip: false, hasHolo: false, group: 'wealth' },
  cash: { name: '现金', brand: 'Cash', hasChip: false, hasHolo: false, group: 'cash' },
  other: { name: '钱包', brand: 'Wallet', hasChip: false, hasHolo: false, group: 'funding' }
};

const ACCOUNT_GROUPS = {
  funding: { name: '资金账户', icon: '💳' },
  wealth: { name: '理财账户', icon: '📈' },
  cash: { name: '纸币现金', icon: '💵' }
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
    const defaults = { appPassword: null, notifications: false, exRates: { USD: 7.25, EUR: 7.85, GBP: 9.20, JPY: 0.048, HKD: 0.93, TWD: 0.22 }, defaultCurrency: 'CNY' };
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
  // FAB only shows on accounts (card pack) view
  const fab = $('#fab');
  if (fab) fab.style.display = (name === 'accounts') ? 'flex' : 'none';
  render();
  haptic('light');
}

// ===== Sheets =====
function openSheet(id) { $(`#${id}`).classList.add('on'); }
function closeSheet(id) { $(`#${id}`).classList.remove('on'); }
$$('.sheet-overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o) o.classList.remove('on'); }));

function fabAction() {
  openAddAccount();
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

// ===== Add/Edit Account =====
function openAddAccount() {
  state.editingAcctIdx = -1;
  $('#sheet-acct-title').textContent = '添加账户';
  $('#acct-name').value = '';
  $('#acct-balance').value = '0';
  $('#acct-num').value = '';
  $('#acct-currency').value = 'CNY';
  $('#acct-custom-group').value = '';
  state.selectedAcctType = 'bank';
  state.selectedCardColor = 'gold';
  state.acctIncludeInAssets = true;
  $$('#acct-type-pick .pick').forEach(p => p.classList.toggle('on', p.dataset.t === 'bank'));
  $$('#acct-color-pick .color-pick').forEach(p => p.classList.toggle('on', p.dataset.c === 'gold'));
  $('#acct-include-assets').classList.add('on');
  $('#acct-save-btn').textContent = '保存';
  openSheet('sheet-acct');
}

function editAccount(idx) {
  const a = state.accounts[idx];
  if (!a) return;
  state.editingAcctIdx = idx;
  $('#sheet-acct-title').textContent = '编辑账户';
  $('#acct-name').value = a.name || '';
  $('#acct-balance').value = a.balance != null ? String(a.balance) : '0';
  $('#acct-num').value = a.cardNumber || '';
  $('#acct-currency').value = a.currency || 'CNY';
  $('#acct-custom-group').value = a.customGroup || '';
  state.selectedAcctType = a.type || 'bank';
  state.selectedCardColor = a.color || 'gold';
  state.acctIncludeInAssets = a.includeInAssets !== false;
  $$('#acct-type-pick .pick').forEach(p => p.classList.toggle('on', p.dataset.t === (a.type || 'bank')));
  $$('#acct-color-pick .color-pick').forEach(p => p.classList.toggle('on', p.dataset.c === (a.color || 'gold')));
  $('#acct-include-assets').classList.toggle('on', a.includeInAssets !== false);
  $('#acct-save-btn').textContent = '保存修改';
  openSheet('sheet-acct');
}

function saveAccount() {
  const name = $('#acct-name').value.trim();
  if (!name) { toast('请输入账户名称'); return; }
  const balance = parseFloat($('#acct-balance').value) || 0;
  const cardNumber = $('#acct-num').value.trim();
  const currency = $('#acct-currency').value || 'CNY';
  const customGroup = $('#acct-custom-group').value.trim() || null;

  // Auto-detect account type from name (only for new accounts)
  let acctType = state.selectedAcctType;
  let acctColor = state.selectedCardColor;
  if (state.editingAcctIdx < 0) {
    const brand = matchBrand(name);
    if (brand) {
      if (brand.slug === 'alipay') acctType = 'alipay';
      else if (brand.slug === 'wechat') acctType = 'wechat';
      else if (brand.slug === 'unionpay') acctType = 'yunshanfu';
      else if (brand.slug === 'licaicai') acctType = 'licaicai';
      else if (brand.slug === 'yuebao') acctType = 'yuebao';
      else if (['cmb','icbc','ccb','abc','boc','bankcomm','spdb','cmbc','citic','ceb','psbc','cib','pab','cgb','hxb'].includes(brand.slug)) {
        acctType = 'bank';
        const bi = BRAND_ICONS[brand.slug];
        if (bi) {
          if (bi.bg.includes('003F88') || bi.bg.includes('005BAC') || bi.bg.includes('007A33')) acctColor = 'blue';
          else if (bi.bg.includes('009A44') || bi.bg.includes('007A33')) acctColor = 'green';
          else if (bi.bg.includes('B40020') || bi.bg.includes('C8102E') || bi.bg.includes('AF272F') || bi.bg.includes('E60012') || bi.bg.includes('7B2E86')) acctColor = 'red';
        }
      }
    }
  }

  if (state.editingAcctIdx >= 0) {
    // 编辑模式：更新现有账户
    const a = state.accounts[state.editingAcctIdx];
    a.name = name;
    a.balance = balance;
    a.cardNumber = cardNumber;
    a.currency = currency;
    a.type = acctType;
    a.color = acctColor;
    a.includeInAssets = state.acctIncludeInAssets !== false;
    a.customGroup = customGroup;
    state.editingAcctIdx = -1;
    save();
    closeSheet('sheet-acct');
    toast('账户已更新');
    haptic('success');
    render();
  } else {
    // 添加模式：创建新账户
    const brand = matchBrand(name);
    const acct = {
      id: genId(), name, type: acctType, balance,
      cardNumber, currency, color: acctColor, brandSlug: brand?.slug || null,
      includeInAssets: state.acctIncludeInAssets !== false,
      customGroup,
      createdAt: new Date().toISOString()
    };
    state.accounts.push(acct);
    save();
    closeSheet('sheet-acct');
    toast('账户已添加');
    haptic('success');
    render();
  }
}

$$('#acct-type-pick .pick').forEach(p => p.onclick = () => {
  state.selectedAcctType = p.dataset.t;
  $$('#acct-type-pick .pick').forEach(x => x.classList.remove('on'));
  p.classList.add('on');
});

$$('#acct-color-pick .color-pick').forEach(p => p.onclick = () => {
  state.selectedCardColor = p.dataset.c;
  $$('#acct-color-pick .color-pick').forEach(x => x.classList.remove('on'));
  p.classList.add('on');
  haptic('light');
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
  $('#overview-sub').textContent = `${month.label} · ${state.transactions.length}笔流水`;

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

  // 最近流水（最近5条）
  const container = $('#overview-tx');
  const recentTx = [...state.transactions].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
  if (recentTx.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="es-icon">📝</div><div class="es-text">暂无流水记录</div><div class="es-sub">点击 + 记一笔</div></div>`;
    return;
  }
  const catColors = { food:'#f59e0b',shopping:'#ec4899',transport:'#0ea5e9',home:'#10b981',entertainment:'#a855f7',medical:'#ef4444',study:'#3b82f6',other:'#6b7280',salary:'#10b981',bonus:'#f59e0b',invest:'#8b5cf6',other_in:'#6b7280',sub:'#d4af37' };
  const catBgColors = { food:'rgba(245,158,11,0.12)',shopping:'rgba(236,72,153,0.12)',transport:'rgba(14,165,233,0.12)',home:'rgba(16,185,129,0.12)',entertainment:'rgba(168,85,247,0.12)',medical:'rgba(239,68,68,0.12)',study:'rgba(59,130,246,0.12)',other:'rgba(107,114,128,0.12)',salary:'rgba(16,185,129,0.12)',bonus:'rgba(245,158,11,0.12)',invest:'rgba(139,92,246,0.12)',other_in:'rgba(107,114,128,0.12)',sub:'rgba(212,175,55,0.12)' };

  container.innerHTML = recentTx.map(t => {
    const acct = state.accounts.find(a => a.id === t.accountId);
    const theme = acct ? (CARD_THEMES[acct.color] || CARD_THEMES.gold) : CARD_THEMES.gold;
    const acctColor = theme.accent;
    const isSub = t.isSubscription;
    const catKey = isSub ? 'sub' : t.category;
    const iconColor = catColors[catKey] || catColors.other;
    const iconBg = catBgColors[catKey] || catBgColors.other;
    const iconContent = isSub ? txIconSvg('sub') : txIconSvg(t.category);
    const badge = isSub ? '<span class="tx-badge">订阅</span>' : '';
    const amtClass = t.type === 'income' ? 'in' : 'out';
    return `<div class="tx-item" onclick="openTxDetail('${t.id}')">
      <div class="tx-item-icon" style="background:${iconBg};">
        <svg viewBox="0 0 24 24" style="stroke:${iconColor};">${iconContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1] || ''}</svg>
      </div>
      <div class="tx-item-body">
        <div class="tx-item-name">${t.categoryName} ${badge}</div>
        <div class="tx-item-meta"><span class="tx-acct-dot" style="background:${acctColor};"></span>${acct?.name || '未知'} · ${t.time}</div>
      </div>
      <div class="tx-item-amt ${amtClass}">${t.type==='income'?'+':'-'}¥${fmt(t.amount)}</div>
    </div>`;
  }).join('');
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

  // 分类颜色映射
  const catColors = {
    food: '#f59e0b', shopping: '#ec4899', transport: '#0ea5e9', home: '#10b981',
    entertainment: '#a855f7', medical: '#ef4444', study: '#3b82f6', other: '#6b7280',
    salary: '#10b981', bonus: '#f59e0b', invest: '#8b5cf6', other_in: '#6b7280', sub: '#d4af37'
  };
  const catBgColors = {
    food: 'rgba(245,158,11,0.12)', shopping: 'rgba(236,72,153,0.12)', transport: 'rgba(14,165,233,0.12)',
    home: 'rgba(16,185,129,0.12)', entertainment: 'rgba(168,85,247,0.12)', medical: 'rgba(239,68,68,0.12)',
    study: 'rgba(59,130,246,0.12)', other: 'rgba(107,114,128,0.12)',
    salary: 'rgba(16,185,129,0.12)', bonus: 'rgba(245,158,11,0.12)', invest: 'rgba(139,92,246,0.12)',
    other_in: 'rgba(107,114,128,0.12)', sub: 'rgba(212,175,55,0.12)'
  };

  // Group by date - 时间轴卡片
  const groups = {};
  txs.forEach(t => {
    const key = t.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });

  let html = '<div class="tx-timeline">';
  const sortedDates = Object.keys(groups).sort((a,b) => new Date(b) - new Date(a));
  sortedDates.forEach(date => {
    const d = new Date(date);
    const isToday = date === today();
    const isYesterday = date === addDays(today(), -1);
    const label = isToday ? '今天' : isYesterday ? '昨天' : `${d.getMonth()+1}月${d.getDate()}日`;
    const weekDay = ['日','一','二','三','四','五','六'][d.getDay()];
    const dayExp = groups[date].filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
    const dayInc = groups[date].filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
    // 日卡片颜色点：有支出用红色，纯收入用绿色
    const dotColor = dayExp > 0 ? 'var(--red)' : 'var(--green)';
    let sumText = '';
    if (dayInc > 0) sumText += `<span style="color:var(--green);">+${fmt(Math.round(dayInc))}</span>`;
    if (dayExp > 0) sumText += (sumText ? ' · ' : '') + `<span style="color:var(--red);">-${fmt(Math.round(dayExp))}</span>`;

    html += `<div class="tx-day-card">
      <div class="tx-day-header">
        <div class="tx-day-date">
          <span class="tx-day-dot" style="background:${dotColor};"></span>
          <div>
            <div class="tx-day-label">${label}</div>
            <div class="tx-day-sub">周${weekDay} · ${groups[date].length}笔</div>
          </div>
        </div>
        <div class="tx-day-sum">${sumText}</div>
      </div>
      <div class="tx-day-items">`;

    groups[date].forEach(t => {
      const acct = state.accounts.find(a => a.id === t.accountId);
      const theme = acct ? (CARD_THEMES[acct.color] || CARD_THEMES.gold) : CARD_THEMES.gold;
      const acctColor = theme.accent;
      const isSub = t.isSubscription;
      const catKey = isSub ? 'sub' : (t.type === 'income' ? t.category : t.category);
      const iconColor = catColors[catKey] || catColors.other;
      const iconBg = catBgColors[catKey] || catBgColors.other;
      const iconContent = isSub ? txIconSvg('sub') : txIconSvg(t.category);
      const badge = isSub ? '<span class="tx-badge">订阅</span>' : '';
      const amtClass = t.type === 'income' ? 'in' : 'out';

      html += `<div class="tx-item" onclick="openTxDetail('${t.id}')">
        <div class="tx-item-icon" style="background:${iconBg};">
          <svg viewBox="0 0 24 24" style="stroke:${iconColor};">${iconContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1] || ''}</svg>
        </div>
        <div class="tx-item-body">
          <div class="tx-item-name">${t.categoryName} ${badge}</div>
          <div class="tx-item-meta"><span class="tx-acct-dot" style="background:${acctColor};"></span>${acct?.name || '未知'} · ${t.time}</div>
        </div>
        <div class="tx-item-amt ${amtClass}">${t.type==='income'?'+':'-'}¥${fmt(t.amount)}</div>
      </div>`;
    });

    html += `</div></div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===== 钱包余额显示/隐藏 =====
let balanceMasked = true;
const revealedCards = new Set();

function toggleBalanceMask() {
  balanceMasked = !balanceMasked;
  const totalEl = $('#wallet-total');
  const textEl = $('#wallet-total-text');
  const eyeEl = $('#wallet-eye');
  const totalAssets = state.accounts.filter(a => a.includeInAssets !== false).reduce((s,a)=>s+a.balance,0);
  if (balanceMasked) {
    totalEl.classList.add('masked');
    textEl.textContent = '****';
    eyeEl.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
    revealedCards.clear();
  } else {
    totalEl.classList.remove('masked');
    textEl.textContent = '¥' + fmt(Math.round(totalAssets));
    eyeEl.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    state.accounts.forEach(a => revealedCards.add(a.id));
  }
  haptic('light');
  renderAccounts();
}

function toggleCardBalance(cardId, ev) {
  if (ev) { ev.stopPropagation(); ev.preventDefault(); }
  if (!balanceMasked) return; // 全局已显示，单卡无需切换
  if (revealedCards.has(cardId)) {
    revealedCards.delete(cardId);
  } else {
    revealedCards.add(cardId);
  }
  haptic('light');
  // Update this card's display in-place
  const cardEl = document.querySelector('.wc[data-card-id="' + cardId + '"]');
  if (cardEl) {
    const balEl = cardEl.querySelector('.wc-face-bal');
    const eyeEl2 = cardEl.querySelector('.wc-eye-icon');
    const account = state.accounts.find(a => a.id === cardId);
    if (account && balEl) {
      const cs = { CNY:'¥', USD:'$', EUR:'€', GBP:'£', JPY:'¥', HKD:'HK$', TWD:'NT$' };
      const sym = cs[account.currency || 'CNY'] || '¥';
      const revealed = !balanceMasked || revealedCards.has(cardId);
      balEl.textContent = revealed ? sym + fmt(Math.round(account.balance)) : '****';
      if (eyeEl2) {
        eyeEl2.innerHTML = revealed
          ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
          : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
      }
    }
  }
}

// ===== 钱包卡片默认渐变配色（鲜艳风格）=====
const WALLET_CARD_COLORS = [
  'linear-gradient(135deg,#1a6dff 0%,#0d3bbf 100%)',  // 蓝 - 银行
  'linear-gradient(135deg,#1677FF 0%,#0958c9 100%)',  // 支付宝蓝
  'linear-gradient(135deg,#07C160 0%,#059047 100%)',  // 微信绿
  'linear-gradient(135deg,#6366f1 0%,#a855f7 100%)',  // 靛紫
  'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',  // 金红
  'linear-gradient(135deg,#10b981 0%,#06b6d4 100%)',  // 青绿
  'linear-gradient(135deg,#ec4899 0%,#8b5cf6 100%)',  // 粉紫
  'linear-gradient(135deg,#0ea5e9 0%,#2563eb 100%)',  // 天蓝
  'linear-gradient(135deg,#FF7300 0%,#e65c00 100%)',  // 余额宝橙
  'linear-gradient(135deg,#FA9D3B 0%,#e88a28 100%)',  // 理财通橙
  'linear-gradient(135deg,#E21836 0%,#b8122c 100%)',  // 银联红
];

function getWalletCardGradient(a, idx) {
  // 用户手动选择的颜色优先
  if (a.color) {
    const colorMap = {
      gold: 'linear-gradient(135deg,#b8860b 0%,#8b6914 100%)',
      blue: 'linear-gradient(135deg,#1a6dff 0%,#0d3bbf 100%)',
      green: 'linear-gradient(135deg,#10b981 0%,#06b6d4 100%)',
      red: 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',
      purple: 'linear-gradient(135deg,#6366f1 0%,#a855f7 100%)',
      pink: 'linear-gradient(135deg,#ec4899 0%,#8b5cf6 100%)',
      orange: 'linear-gradient(135deg,#FF7300 0%,#e65c00 100%)',
      sky: 'linear-gradient(135deg,#0ea5e9 0%,#2563eb 100%)',
      teal: 'linear-gradient(135deg,#14b8a6 0%,#0d9488 100%)',
      indigo: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)',
      rose: 'linear-gradient(135deg,#f43f5e 0%,#e11d48 100%)',
      dark: 'linear-gradient(145deg,#141416 0%,#0a0a0c 100%)',
    };
    if (colorMap[a.color]) return colorMap[a.color];
  }

  // 根据账户类型返回品牌色（仅在没有手动选色时）
  if (a.type === 'alipay') return WALLET_CARD_COLORS[1];
  if (a.type === 'wechat') return WALLET_CARD_COLORS[2];
  if (a.type === 'yuebao') return WALLET_CARD_COLORS[8];
  if (a.type === 'licaicai') return WALLET_CARD_COLORS[9];
  if (a.type === 'yunshanfu') return WALLET_CARD_COLORS[10];
  if (a.type === 'bank') return WALLET_CARD_COLORS[idx % 2 === 0 ? 0 : 4];
  if (a.type === 'cash' || a.type === 'other') return WALLET_CARD_COLORS[3];

  return WALLET_CARD_COLORS[idx % 7];
}

// 卡片logo加载失败时的全局回退函数
function cardLogoFallback(img, slug, big) {
  const sz = big ? '28px' : '24px';
  const spanSz = big ? '20px' : '18px';
  const rmbSz = big ? '24px' : '22px';
  let html = '';
  if (slug === 'alipay') html = `<span style="font-size:${spanSz};font-weight:800;color:#fff;">支</span>`;
  else if (slug === 'wechat') html = `<svg viewBox="0 0 24 24" style="width:${sz};height:${sz};fill:#fff;"><path d="M8.7 3C4.5 3 1 5.9 1 9.5c0 2 1.1 3.7 2.9 4.9l-.7 2.2 2.6-1.3c.9.2 1.8.4 2.8.4.5 0 .9 0 1.4-.1-.1-.4-.2-.8-.2-1.2 0-3.2 3.1-5.8 7-5.8h.5C15.9 5.3 12.6 3 8.7 3zM6.3 7.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm4.8 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm5.2 2.2c-3.3 0-6 2.3-6 5.2 0 2.9 2.7 5.2 6 5.2.7 0 1.4-.1 2.1-.3l2 1-.5-1.7c1.5-1 2.4-2.5 2.4-4.2 0-2.9-2.7-5.2-6-5.2zm-2 3.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm3.9 0c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"/></svg>`;
  else if (slug === 'licaicai' || slug === 'yuebao' || slug === 'wallet') html = `<span style="font-size:${rmbSz};font-weight:300;color:#fff;">￥</span>`;
  else html = `<svg viewBox="0 0 24 24" style="width:${sz};height:${sz};fill:#fff;"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`;
  img.outerHTML = html;
}

function renderWalletCard(a, origIdx) {
  let acctTypeKey = a.type;
  if (!ACCOUNT_TYPES[acctTypeKey]) acctTypeKey = 'other';
  const acctType = ACCOUNT_TYPES[acctTypeKey];

  const gradient = getWalletCardGradient(a, origIdx);
  const cardBg = `background:${gradient};`;

  // Logo
  let brandSlug = a.brandSlug;
  if (!brandSlug) {
    if (a.type === 'alipay') brandSlug = 'alipay';
    else if (a.type === 'wechat') brandSlug = 'wechat';
    else if (a.type === 'yunshanfu') brandSlug = 'unionpay';
    else if (a.type === 'licaicai') brandSlug = 'licaicai';
    else if (a.type === 'yuebao') brandSlug = 'yuebao';
    else if (a.type === 'bank') brandSlug = 'unionpay';
    else brandSlug = 'wallet';
  }

  function getLogoContent(slug) {
    const spanStyle = 'style="font-size:18px;font-weight:800;color:#fff;"';
    const svgStyle = 'style="width:24px;height:24px;fill:#fff;"';
    const rmbStyle = 'style="font-size:22px;font-weight:300;color:#fff;"';
    if (slug === 'alipay') return `<span ${spanStyle}>支</span>`;
    if (slug === 'wechat') return `<svg viewBox="0 0 24 24" ${svgStyle}><path d="M8.7 3C4.5 3 1 5.9 1 9.5c0 2 1.1 3.7 2.9 4.9l-.7 2.2 2.6-1.3c.9.2 1.8.4 2.8.4.5 0 .9 0 1.4-.1-.1-.4-.2-.8-.2-1.2 0-3.2 3.1-5.8 7-5.8h.5C15.9 5.3 12.6 3 8.7 3zM6.3 7.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm4.8 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm5.2 2.2c-3.3 0-6 2.3-6 5.2 0 2.9 2.7 5.2 6 5.2.7 0 1.4-.1 2.1-.3l2 1-.5-1.7c1.5-1 2.4-2.5 2.4-4.2 0-2.9-2.7-5.2-6-5.2zm-2 3.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm3.9 0c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"/></svg>`;
    if (slug === 'unionpay' || slug === 'cmb' || slug === 'icbc' || slug === 'ccb' || slug === 'abc' || slug === 'boc') return `<svg viewBox="0 0 24 24" ${svgStyle}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`;
    if (slug === 'licaicai' || slug === 'yuebao' || slug === 'wallet') return `<span ${rmbStyle}>￥</span>`;
    return `<svg viewBox="0 0 24 24" ${svgStyle}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`;
  }

  const logoHtml = a.iconUrl
    ? `<img src="${a.iconUrl}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;" onerror="cardLogoFallback(this,'${brandSlug}')"/>`
    : getLogoContent(brandSlug);

  const numDisplay = a.cardNumber ? '•••• •••• •••• ' + a.cardNumber : '•••• •••• •••• ****';
  const excludedBadge = a.includeInAssets === false ? '<div class="wc-exclude">不计入</div>' : '';

  let brandText = acctType.brand;
  if (brandText === 'UnionPay') brandText = 'UNIONPAY';
  if (brandText === 'Alipay') brandText = 'ALIPAY';
  if (brandText === 'WeChat Pay') brandText = 'WECHAT';
  if (brandText === 'Licaitong') brandText = 'LICAITONG';
  if (brandText === 'Yuebao') brandText = 'YUEBAO';
  if (brandText === 'Wallet') brandText = 'WALLET';

  const curSyms = { CNY:'¥', USD:'$', EUR:'€', GBP:'£', JPY:'¥', HKD:'HK$', TWD:'NT$' };
  const curSym = curSyms[a.currency || 'CNY'] || '¥';
  const cardRevealed = !balanceMasked || revealedCards.has(a.id);
  const balText = cardRevealed ? curSym + fmt(Math.round(a.balance)) : '****';
  const eyeSvg = cardRevealed
    ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
    : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';

  const cardStyle = `${cardBg}`;

  const peekName = (a.name || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  return `<div class="wc" data-idx="${origIdx}" data-card-id="${a.id}" data-peek-name="${peekName}" style="${cardStyle}">
    ${excludedBadge}
    <div class="wc-face">
      <div class="wc-face-top">
        <div>
          <div class="wc-face-name">${a.name}</div>
          <div class="wc-face-type">${acctType.name}${a.cardNumber ? ' · 尾号'+a.cardNumber : ''}</div>
        </div>
        <div class="wc-face-logo">${logoHtml}</div>
      </div>
      <div class="wc-face-num">${numDisplay}</div>
      <div class="wc-face-bottom">
        <div class="wc-face-brand">${brandText}</div>
        <div class="wc-face-bal-row">
          <div style="text-align:right;">
            <div class="wc-face-bal-label">AVAILABLE</div>
            <div class="wc-face-bal">${balText}</div>
          </div>
          <svg class="wc-eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" onclick="toggleCardBalance('${a.id}',event)">${eyeSvg}</svg>
        </div>
      </div>
    </div>
  </div>`;
}

// 打开卡片详情弹窗
function openCardDetail(idx) {
  const a = state.accounts[idx];
  if (!a) return;

  let acctTypeKey = a.type;
  if (!ACCOUNT_TYPES[acctTypeKey]) acctTypeKey = 'other';
  const acctType = ACCOUNT_TYPES[acctTypeKey];

  const gradient = getWalletCardGradient(a, idx);

  let brandSlug = a.brandSlug;
  if (!brandSlug) {
    if (a.type === 'alipay') brandSlug = 'alipay';
    else if (a.type === 'wechat') brandSlug = 'wechat';
    else if (a.type === 'yunshanfu') brandSlug = 'unionpay';
    else if (a.type === 'licaicai') brandSlug = 'licaicai';
    else if (a.type === 'yuebao') brandSlug = 'yuebao';
    else if (a.type === 'bank') brandSlug = 'unionpay';
    else brandSlug = 'wallet';
  }

  function getLogoContentBig(slug) {
    const spanStyle = 'style="font-size:20px;font-weight:800;color:#fff;"';
    const svgStyle = 'style="width:28px;height:28px;fill:#fff;"';
    const rmbStyle = 'style="font-size:24px;font-weight:300;color:#fff;"';
    if (slug === 'alipay') return `<span ${spanStyle}>支</span>`;
    if (slug === 'wechat') return `<svg viewBox="0 0 24 24" ${svgStyle}><path d="M8.7 3C4.5 3 1 5.9 1 9.5c0 2 1.1 3.7 2.9 4.9l-.7 2.2 2.6-1.3c.9.2 1.8.4 2.8.4.5 0 .9 0 1.4-.1-.1-.4-.2-.8-.2-1.2 0-3.2 3.1-5.8 7-5.8h.5C15.9 5.3 12.6 3 8.7 3zM6.3 7.8c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm4.8 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm5.2 2.2c-3.3 0-6 2.3-6 5.2 0 2.9 2.7 5.2 6 5.2.7 0 1.4-.1 2.1-.3l2 1-.5-1.7c1.5-1 2.4-2.5 2.4-4.2 0-2.9-2.7-5.2-6-5.2zm-2 3.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm3.9 0c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"/></svg>`;
    if (slug === 'unionpay' || slug === 'cmb' || slug === 'icbc' || slug === 'ccb' || slug === 'abc' || slug === 'boc') return `<svg viewBox="0 0 24 24" ${svgStyle}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`;
    if (slug === 'licaicai' || slug === 'yuebao' || slug === 'wallet') return `<span ${rmbStyle}>￥</span>`;
    return `<svg viewBox="0 0 24 24" ${svgStyle}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>`;
  }

  const logoHtml = a.iconUrl
    ? `<img src="${a.iconUrl}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:6px;" onerror="cardLogoFallback(this,'${brandSlug}',true)"/>`
    : getLogoContentBig(brandSlug);

  let brandText = acctType.brand;
  if (brandText === 'UnionPay') brandText = 'UNIONPAY';
  if (brandText === 'Alipay') brandText = 'ALIPAY';
  if (brandText === 'WeChat Pay') brandText = 'WECHAT';
  if (brandText === 'Licaitong') brandText = 'LICAITONG';
  if (brandText === 'Yuebao') brandText = 'YUEBAO';
  if (brandText === 'Wallet') brandText = 'WALLET';

  const numDisplay = a.cardNumber ? '•••• •••• •••• ' + a.cardNumber : '•••• •••• •••• ****';
  const chipHtml = acctType.hasChip ? '<div class="card-detail-chip"></div>' : '';
  const curSyms = { CNY:'¥', USD:'$', EUR:'€', GBP:'£', JPY:'¥', HKD:'HK$', TWD:'NT$' };
  const curSym = curSyms[a.currency || 'CNY'] || '¥';
  const balText = (!balanceMasked || revealedCards.has(a.id)) ? curSym + fmt(Math.round(a.balance)) : '****';
  const excludedBadge = a.includeInAssets === false ? '<div class="wc-exclude">不计入</div>' : '';
  const currencyLabel = a.currency && a.currency !== 'CNY' ? ' · ' + a.currency : '';

  const content = $('#card-detail-content');
  content.innerHTML = `
    <div class="card-detail-card" style="background:${gradient};">
      ${excludedBadge}
      <div class="card-detail-top">
        <div>
          <div class="card-detail-name">${a.name}</div>
          <div class="card-detail-type">${acctType.name}${a.cardNumber ? ' · 尾号'+a.cardNumber : ''}${currencyLabel}</div>
        </div>
        <div class="card-detail-logo">${logoHtml}</div>
      </div>
      ${chipHtml}
      <div class="card-detail-num">${numDisplay}</div>
      <div class="card-detail-bottom">
        <div class="card-detail-brand">${brandText}</div>
        <div style="text-align:right;">
          <div class="card-detail-bal-label">AVAILABLE</div>
          <div class="card-detail-bal">${balText}</div>
        </div>
      </div>
    </div>
    <div class="card-detail-actions">
      <div class="card-detail-btn" onclick="event.stopPropagation();closeCardDetail();openAddTx()">记一笔</div>
      <div class="card-detail-btn" onclick="event.stopPropagation();toast('转账功能开发中')">转账</div>
      <div class="card-detail-btn" onclick="event.stopPropagation();closeCardDetail();editAccount(${idx})">编辑</div>
    </div>
  `;

  const overlay = $('#card-detail-overlay');
  overlay.classList.add('active');
  haptic('light');
}

function closeCardDetail() {
  const overlay = $('#card-detail-overlay');
  overlay.classList.remove('active');
  haptic('light');
}

function closePulledCard() {
  state.pulledCardIdx = -1;
  renderAccounts();
  haptic('light');
}

// ===== Card Overlay (保留用于其他功能) =====
function openCardOverlay(acct) {
  if (!acct) return;
  let acctTypeKey = acct.type;
  if (!ACCOUNT_TYPES[acctTypeKey]) acctTypeKey = 'other';
  const acctType = ACCOUNT_TYPES[acctTypeKey];
  if (!acct.color) acct.color = 'gold';
  const theme = CARD_THEMES[acct.color] || CARD_THEMES.gold;

  let logoHtml = '';
  const brandSlug = acct.brandSlug || (acct.type === 'alipay' ? 'alipay' : acct.type === 'wechat' ? 'wechat' : acct.type === 'yunshanfu' ? 'unionpay' : acct.type === 'licaicai' ? 'licaicai' : acct.type === 'yuebao' ? 'yuebao' : null);
  if (acct.iconUrl) {
    logoHtml = `<img src="${acct.iconUrl}" />`;
  } else if (brandSlug && BRAND_ICONS[brandSlug]) {
    const bi = BRAND_ICONS[brandSlug];
    const fg = isLightColor(bi.bg) ? '#000' : '#fff';
    logoHtml = `<svg viewBox="0 0 24 24" style="width:28px;height:28px;fill:${fg};"><path d="${bi.p}"/></svg>`;
  } else {
    logoHtml = `<svg viewBox="0 0 24 24" width="28" height="28" fill="${theme.accent}"><path d="M12 2L2 7v2h20V7L12 2zm-8 9v7h2v-7h3v7h2v-7h2v7h2v-7h3v7h2v-7H4z"/></svg>`;
  }

  const cardIdent = acct.cardNumber
    ? '•••• •••• •••• ' + acct.cardNumber
    : (acct.type === 'bank' ? 'BANK CARD' : acct.type === 'alipay' ? 'ALIPAY WALLET' : acct.type === 'wechat' ? 'WECHAT WALLET' : acct.type === 'yunshanfu' ? 'UNIONPAY' : acct.type === 'licaicai' ? 'LICAITONG' : acct.type === 'yuebao' ? 'YUEBAO' : 'DIGITAL WALLET');

  const chipHtml = acctType.hasChip ? `<div class="bce-chip" style="background:${theme.chipBg};"></div>` : '';
  const excludedBadge = acct.includeInAssets === false ? '<div style="position:absolute;top:12px;right:12px;font-size:9px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);z-index:5;">不计入资产</div>' : '';

  const cardStyle = `background:${theme.gradient};border:1px solid ${theme.border};`;

  $('#card-expanded').style.cssText = cardStyle;
  $('#card-expanded').innerHTML = `
    <div class="bce-close" onclick="closeCardOverlay()">×</div>
    ${excludedBadge}
    <div class="bce-content">
      <div class="bce-top">
        <div>
          <div class="bce-name" style="color:${theme.accent};">${acct.name}</div>
          <div class="bce-type" style="color:${theme.subtext};">${acctType.name}${acct.cardNumber ? ' · 尾号' + acct.cardNumber : ''}</div>
        </div>
        <div class="bce-logo" style="background:rgba(255,255,255,0.04);border:1px solid ${theme.border};">${logoHtml}</div>
      </div>
      ${chipHtml}
      <div class="bce-num" style="color:${theme.subtext};">${cardIdent}</div>
      <div style="flex:1;"></div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;">
        <div class="bce-brand" style="color:${theme.accent};opacity:0.6;">${acctType.brand}</div>
        <div style="text-align:right;">
          <div class="bce-bal-label" style="color:${theme.subtext};">可用余额</div>
          <div class="bce-bal" style="color:${theme.text};">¥${fmt(Math.round(acct.balance))}</div>
        </div>
      </div>
      <div class="bce-actions">
        <div class="bce-btn" onclick="closeCardOverlay();openAddTx()">记一笔</div>
        <div class="bce-btn" onclick="toast('转账功能开发中')">转账</div>
        <div class="bce-btn" onclick="closeCardOverlay();$('#acct-detail-section').style.display='block'">更多</div>
      </div>
    </div>
  `;

  const overlay = $('#card-overlay');
  overlay.classList.add('active');
  haptic('light');
}

function closeCardOverlay(e) {
  if (e && e.target.closest('.card-expanded') && !e.target.closest('.bce-close')) return;
  const overlay = $('#card-overlay');
  overlay.classList.remove('active');
  haptic('light');
}

// 将指定卡片切换到前台（弹簧动画）
function bringCardToFront(stackEl, clickedCard) {
  const cards = Array.from(stackEl.querySelectorAll('.wc'));
  const clickedIdx = cards.indexOf(clickedCard);
  if (clickedIdx <= 0) return;

  // Reorder DOM: move clicked card to first position
  stackEl.insertBefore(clickedCard, stackEl.firstChild);

  // Recalculate positions
  const peekH = 12;
  const overlap = 4;
  const reordered = Array.from(stackEl.querySelectorAll('.wc'));

  reordered.forEach((card, pos) => {
    card.classList.remove('wc-front', 'wc-behind', 'wc-behind-2', 'wc-behind-3', 'wc-behind-4', 'wc-behind-far');
    card.style.animationDelay = '';
    if (pos === 0) {
      card.style.top = '0px';
      card.classList.add('wc-front');
    } else {
      const topPos = 130 - overlap + (pos - 1) * peekH;
      card.style.top = topPos + 'px';
      card.classList.add('wc-behind');
      if (pos === 2) card.classList.add('wc-behind-2');
      else if (pos === 3) card.classList.add('wc-behind-3');
      else if (pos === 4) card.classList.add('wc-behind-4');
      else if (pos > 4) card.classList.add('wc-behind-far');
    }
    // Rebind click handler with new position
    card.onclick = (e) => {
      e.stopPropagation();
      const idx = parseInt(card.dataset.idx);
      const newPos = Array.from(stackEl.querySelectorAll('.wc')).indexOf(card);
      if (newPos === 0) {
        openCardDetail(idx);
      } else {
        // Find which group this stack belongs to
        const gk = stackEl.dataset.group;
        state.activeCardByGroup[gk] = state.accounts[idx].id;
        haptic('light');
        bringCardToFront(stackEl, card);
      }
    };
  });

  // Update group total display (optional - keep it simple)
}

function renderAccounts() {
  // Total assets
  const totalAssets = state.accounts.filter(a => a.includeInAssets !== false).reduce((s,a)=>s+a.balance,0);
  $('#acct-sub').textContent = state.accounts.length > 0 ?
    `${state.accounts.length}张卡片 · ¥${fmt(Math.round(totalAssets))}` :
    '添加银行卡和钱包';

  // Update wallet total display
  const totalEl = $('#wallet-total');
  const textEl = $('#wallet-total-text');
  const eyeEl = $('#wallet-eye');
  if (totalEl && textEl) {
    if (balanceMasked) {
      totalEl.classList.add('masked');
      textEl.textContent = '****';
    } else {
      totalEl.classList.remove('masked');
      textEl.textContent = '¥' + fmt(Math.round(totalAssets));
    }
  }

  const cs = $('#cards-stack');

  if (state.accounts.length === 0) {
    cs.innerHTML = `<div class="empty-state" style="padding:40px 20px 30px;text-align:center;"><div style="font-size:40px;margin-bottom:12px;">💳</div><div style="font-size:15px;color:rgba(255,255,255,0.5);font-weight:500;">暂无卡片</div><div style="font-size:12px;color:rgba(255,255,255,0.25);margin-top:8px;">点击 + 添加你的第一张卡</div></div>`;
    cs.style.minHeight = '180px';
    return;
  }

  cs.style.minHeight = '';

  const groupOrder = ['funding', 'wealth', 'cash'];
  const customGroups = [];
  state.accounts.forEach(a => {
    if (a.customGroup && !groupOrder.includes(a.customGroup) && !customGroups.includes(a.customGroup)) {
      customGroups.push(a.customGroup);
    }
  });
  const allGroups = [...groupOrder, ...customGroups];

  let html = '';

  allGroups.forEach(gk => {
    const groupAccounts = state.accounts.map((a, i) => ({a, i})).filter(({a}) => {
      const at = ACCOUNT_TYPES[a.type];
      const grp = a.customGroup || (at ? at.group : 'funding');
      return grp === gk;
    });
    if (groupAccounts.length === 0) return;

    let groupName, groupIcon;
    if (ACCOUNT_GROUPS[gk]) {
      groupName = ACCOUNT_GROUPS[gk].name;
      groupIcon = ACCOUNT_GROUPS[gk].icon;
    } else {
      groupName = gk;
      groupIcon = '📂';
    }
    const groupTotal = groupAccounts.filter(({a}) => a.includeInAssets !== false).reduce((s,{a}) => s + a.balance, 0);
    const curSyms = { CNY:'¥', USD:'$', EUR:'€', GBP:'£', JPY:'¥', HKD:'HK$', TWD:'NT$' };

    // Determine active card for this group
    let activeId = state.activeCardByGroup[gk];
    if (!activeId || !groupAccounts.find(({a}) => a.id === activeId)) {
      activeId = groupAccounts[0].a.id;
      state.activeCardByGroup[gk] = activeId;
    }

    // Calculate stack height: front card 130px + peek strips for remaining cards
    const peekH = 12; // visible strip per behind card
    const behindH = 18; // actual behind card element height
    const overlap = 4; // overlap between cards
    const stackH = 130 + (groupAccounts.length - 1) * peekH + 8;

    html += `<div class="card-group" data-group="${gk}">`;
    html += `<div class="card-group-header">
      <span class="card-group-icon">${groupIcon}</span>
      <span class="card-group-name">${groupName}</span>
      <span class="card-group-count">${groupAccounts.length}张</span>
      <span class="card-group-total">${balanceMasked ? '****' : curSyms.CNY + fmt(Math.round(groupTotal))}</span>
    </div>`;
    html += `<div class="card-group-stack" style="min-height:${stackH}px;" data-group="${gk}">`;

    // Order cards: active first, then rest
    const activeIdx = groupAccounts.findIndex(({a}) => a.id === activeId);
    const ordered = [groupAccounts[activeIdx], ...groupAccounts.slice(0, activeIdx), ...groupAccounts.slice(activeIdx + 1)];

    ordered.forEach(({a, i}, pos) => {
      html += renderWalletCard(a, i);
    });

    html += `</div></div>`;
  });

  cs.innerHTML = html;

  // After DOM insertion, position each card with correct styles
  requestAnimationFrame(() => {
    allGroups.forEach(gk => {
      const groupEl = cs.querySelector(`.card-group-stack[data-group="${gk}"]`);
      if (!groupEl) return;
      const cards = groupEl.querySelectorAll('.wc');
      const peekH = 12;
      const behindH = 18;
      const overlap = 4;

      cards.forEach((card, pos) => {
        // Reset all classes first
        card.classList.remove('wc-front', 'wc-visible', 'wc-behind', 'wc-behind-2', 'wc-behind-3', 'wc-behind-4', 'wc-behind-far');
        card.style.height = '';
        card.style.transform = '';
        card.style.animationDelay = (pos * 0.06) + 's';

        if (pos === 0) {
          // Front card
          card.style.top = '0px';
          card.classList.add('wc-front', 'wc-visible');
        } else {
          // Behind card - positioned as colored strip below previous card
          const topPos = 130 - overlap + (pos - 1) * peekH;
          card.style.top = topPos + 'px';
          card.classList.add('wc-behind', 'wc-visible');
          if (pos === 2) card.classList.add('wc-behind-2');
          else if (pos === 3) card.classList.add('wc-behind-3');
          else if (pos === 4) card.classList.add('wc-behind-4');
          else if (pos > 4) card.classList.add('wc-behind-far');
        }

        // Click handler
        card.onclick = (e) => {
          e.stopPropagation();
          const idx = parseInt(card.dataset.idx);
          if (pos === 0) {
            // Front card -> open detail
            openCardDetail(idx);
          } else {
            // Behind card -> bring to front with smooth spring animation
            state.activeCardByGroup[gk] = state.accounts[idx].id;
            haptic('light');
            // Reorder DOM within the stack for smooth CSS transition
            bringCardToFront(groupEl, card, peekH, overlap);
          }
        };
      });
    });
  });
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
  state.settings = { appPassword: null, notifications: false, exRates: { USD: 7.25, EUR: 7.85, GBP: 9.20, JPY: 0.048, HKD: 0.93, TWD: 0.22 }, defaultCurrency: 'CNY' };
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
const APP_VERSION = '1.9.8';
const APP_BUILD = '2026.08.08';
const CHANGELOG = [
  { ver: '1.9.8', date: '2026-08-08', items: [
    '密码锁屏重新设计：左侧密码显示 + 右侧滚轮选择器，参考智能手表旋钮交互',
    '单滚轮逐位输入：滚动选数字，点击滚轮确认，四位密码自动提交',
    '滚轮右侧刻度标记：靠近中心高亮金色，远离变暗，视觉反馈层次分明',
    '密码槽位脉冲动画：当前输入位呼吸光效提示',
    '删除按钮支持回退上一位输入'
  ]},
  { ver: '1.9.7', date: '2026-08-08', items: [
    '卡面右下角眼睛图标：点击切换单卡余额显示/隐藏',
    '账户分组右侧显示组别总资金，跟随全局遮罩状态',
    '全局余额切换联动所有卡片和分组总额'
  ]},
  { ver: '1.9.6', date: '2026-08-08', items: [
    'EchoAI扇形卡面动效：前景卡完全展开，后景卡以彩色条带堆叠露出',
    '弹簧缓动切换：点击后景条带，卡片以cubic-bezier(.34,1.4,.64,1)弹簧动画弹到前台',
    '条带显示卡片名称，后景卡逐层降低透明度营造深度',
    'DOM直接重排实现切换动画，无需重建节点保证动效流畅',
    '错落入场动画：卡片从下方弹入，每张间隔60ms'
  ]},
  { ver: '1.9.5', date: '2026-08-08', items: [
    '卡面分组分类：资金账户/理财账户/纸币现金三大类，支持自定义分组',
    '概览页移除即将续费区域，改为最近流水预览，概览与流水合并展示',
    '流水页时间轴卡片重构：参考行云Soar设计，按日期分组卡片+分类色彩图标',
    '流水点击展开详情弹窗：显示金额/分类/账户/备注，支持删除',
    '概览页流水预览与流水页统一卡片样式和分类配色'
  ]},
  { ver: '1.9.4', date: '2026-08-08', items: [
    '修复编辑按钮无反应：新增editAccount函数，支持编辑余额/名称/卡号/币种/颜色/计入资产',
    '新增币种选择：支持CNY/USD/EUR/GBP/JPY/HKD/TWD七种货币',
    '卡面配色扩充至12种：新增天蓝/青绿/靛蓝/玫瑰红，配色预览改为鲜艳渐变',
    '用户选色优先于自动品牌色匹配',
    '恢复卡片堆叠视觉效果：卡片间-38px重叠，z-index递减营造钱包层次感'
  ]},
  { ver: '1.9.3', date: '2026-08-08', items: [
    '卡片入场动效：错落渐入+上滑动画，切换更流畅自然',
    '底部详情弹窗优化：卡片弹出+操作按钮分层动画',
    '修复卡面图标显示不全：SVG等比缩放、图片contain模式不裁切',
    '修复图标加载失败回退：全局cardLogoFallback函数替代内联onerror'
  ]},
  { ver: '1.9.2', date: '2026-08-08', items: [
    '修复版本号不更新问题：版本号改为JS动态设置，不受缓存影响',
    '检查更新功能重做：点击后清空全部缓存+注销Service Worker+强制刷新页面',
    'Service Worker改为网络优先策略，确保总是加载最新版本',
    '检查更新支持检测GitHub远程版本，发现新版可一键更新'
  ]},
  { ver: '1.9.1', date: '2026-08-08', items: [
    '卡包全新钱包式设计：选中卡片完整展示，其他卡片以卡带形式紧密堆叠',
    '卡带显示品牌logo、卡片名称和尾号，层次分明',
    '卡带随深度逐级缩进、透明度递减，营造真实钱包质感',
    '点击任意卡带即可切换到该卡片'
  ]},
  { ver: '1.9.0', date: '2026-08-08', items: [
    '卡包全新设计：默认完整显示当前卡片，取消卡舌抽拉模式',
    '后方卡片堆叠在下方，带模糊变暗效果，层次更分明',
    '总资产显示移至卡片上方，视觉更聚焦',
    '快捷操作按钮（记一笔/转账/提醒/设置）常驻显示',
    '统计卡片和支出分布图表默认展示'
  ]},
  { ver: '1.8.3', date: '2026-08-08', items: [
    '新增卡片向上拉飞出动效：向上拉动卡片飞出后放大展示完整信息',
    '放大卡片显示余额、卡号、品牌等全部详情，支持快捷操作按钮',
    '点击放大卡片或空白处即可缩回卡片堆叠状态',
    '向右滑动切换卡片功能保留不变'
  ]},
  { ver: '1.8.2', date: '2026-08-07', items: [
    '卡包按类型分组显示：银行卡、理财、现金/电子钱包三组独立展示',
    '每组显示分组标题、卡片数量和小计余额',
    '新增「计入总资产」开关：可单独设置某张卡是否计入总资产统计',
    '不计入资产的卡片显示「不计入资产」标记'
  ]},
  { ver: '1.8.1', date: '2026-08-07', items: [
    '修复AI聊天框输入时画面被键盘顶上去的问题',
    '使用visualViewport API同时调整高度和顶部偏移，适配键盘弹出'
  ]},
  { ver: '1.8.0', date: '2026-08-07', items: [
    '彻底修复导航栏按钮位置：去掉safe-area底部padding，按钮紧贴屏幕底部',
    '导航栏仅保留2px底部间距，适配所有设备'
  ]},
  { ver: '1.7.9', date: '2026-08-07', items: [
    '修复导航栏按钮仍未贴底：去掉额外6px间距，仅保留安全区高度'
  ]},
  { ver: '1.7.8', date: '2026-08-07', items: [
    '修复底部导航栏按钮未底对齐问题：减少内边距，按钮紧贴底部安全区'
  ]},
  { ver: '1.7.7', date: '2026-08-07', items: [
    '添加按钮仅在卡包(账户)页面显示，其他页面用各自标题栏按钮添加'
  ]},
  { ver: '1.7.6', date: '2026-08-07', items: [
    '修复密码滚轮对不准问题：改用CSS padding居中，DOM插入后设置初始位置',
    '优化滚动吸附：增加scroll-snap-stop防止跳过数字，改进高亮判定'
  ]},
  { ver: '1.7.5', date: '2026-08-07', items: [
    '新增应用密码：4位数字密码锁，iOS风格滚动转盘输入',
    '设置中开启密码后，每次打开App需滚动输入密码解锁',
    '支持修改密码和关闭密码，密码哈希不上传云端'
  ]},
  { ver: '1.7.4', date: '2026-08-07', items: [
    '移除应用锁功能（Face ID/指纹/PIN密码），简化应用体验',
    '清理锁屏相关界面与代码'
  ]},
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
  statusEl.style.color = 'var(--gold)';

  try {
    // 1. 先检查远程是否有新版本（通过GitHub API）
    let hasNewVersion = false;
    let remoteInfo = '';
    try {
      const resp = await fetch('https://api.github.com/repos/dongsion/SubPilot/commits/main', { cache: 'no-store' });
      if (resp.ok) {
        const data = await resp.json();
        const remoteDate = data.commit?.committer?.date?.slice(0, 10) || '';
        if (remoteDate > APP_BUILD) {
          hasNewVersion = true;
          remoteInfo = `线上最新更新日期：${remoteDate}`;
        }
      }
    } catch(e) { /* 网络检查失败也能强制刷新本地缓存 */ }

    if (hasNewVersion) {
      statusEl.textContent = '发现新版';
      statusEl.style.color = '#ff6b6b';
      // 弹窗确认后强制更新
      if (confirm(`发现新版本！\n${remoteInfo}\n你的版本：v${APP_VERSION} (Build ${APP_BUILD})\n\n点击「确定」立即更新到最新版本`)) {
        await forceUpdate();
      }
    } else {
      statusEl.textContent = '已是最新';
      statusEl.style.color = '#30d158';
      // 即使是最新版，也强制刷新一次缓存，确保版本号同步
      if (confirm(`当前版本：v${APP_VERSION} (Build ${APP_BUILD})\n\n是否强制刷新缓存？\n（可解决版本号不更新、界面显示旧内容的问题）`)) {
        await forceUpdate();
      }
    }
  } catch(e) {
    statusEl.textContent = '›';
    statusEl.style.color = 'var(--gold)';
    alert(`检查更新失败\n\n当前版本：v${APP_VERSION} (Build ${APP_BUILD})\n\n可尝试强制刷新：清除缓存并重新加载`);
  }
}

// 强制更新：清除所有缓存 + 注销Service Worker + 重新加载页面
async function forceUpdate() {
  toast('正在清除缓存...');
  try {
    // 1. 清除所有Cache Storage
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }

    // 2. 注销所有Service Worker
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(r => r.unregister()));
    }

    // 3. 短暂延迟后强制刷新（绕过缓存）
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  } catch(e) {
    // 降级方案：直接刷新
    window.location.reload(true);
  }
}

// ===== Init =====
function init() {
  load();

  // 动态设置版本号显示（避免SW缓存导致版本号不更新）
  const verEl = document.getElementById('ver-display');
  if (verEl) verEl.textContent = `v${APP_VERSION} ›`;
  const verFooterEls = document.querySelectorAll('[data-ver-footer]');
  verFooterEls.forEach(el => { el.textContent = `订阅管家 · v${APP_VERSION} (Build ${APP_BUILD})`; });

  // Process auto-deductions after data is loaded
  processAutoDeductions();

  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }

  render();

  // Show lock screen on app launch if password is set
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
  // Use visualViewport to handle keyboard on mobile - fix both height and top offset
  if (window.visualViewport) {
    const onResize = () => {
      const vv = window.visualViewport;
      overlay.style.height = vv.height + 'px';
      overlay.style.top = vv.offsetTop + 'px';
      // Scroll messages to bottom when keyboard appears
      const container = $('#ai-messages');
      if (container) container.scrollTop = container.scrollHeight;
    };
    window.visualViewport.removeEventListener('resize', overlay._vvResize);
    window.visualViewport.removeEventListener('scroll', overlay._vvResize);
    overlay._vvResize = onResize;
    window.visualViewport.addEventListener('resize', onResize);
    window.visualViewport.addEventListener('scroll', onResize);
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
  const overlay = $('#ai-chat');
  overlay.classList.remove('on');
  if (window.visualViewport && overlay._vvResize) {
    window.visualViewport.removeEventListener('resize', overlay._vvResize);
    window.visualViewport.removeEventListener('scroll', overlay._vvResize);
  }
  overlay.style.height = '';
  overlay.style.top = '';
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

// 流水详情弹窗
function openTxDetail(txId) {
  const t = state.transactions.find(x => x.id === txId);
  if (!t) return;
  const account = state.accounts.find(a => a.id === t.accountId);
  const allCats = [...EXPENSE_CATS, ...INCOME_CATS];
  const catInfo = allCats.find(c => c.id === t.category);
  const typeText = t.type === 'income' ? '收入' : '支出';
  const acctColor = account ? (CARD_THEMES[account.color]?.accent || 'var(--gold)') : 'var(--gold)';

  const overlay = $('#card-detail-overlay');
  const content = $('#card-detail-content');
  content.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:18px;padding:20px;margin-bottom:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <span style="font-size:12px;padding:4px 10px;border-radius:8px;background:${t.type==='income'?'rgba(82,204,130,0.12)':'rgba(239,68,68,0.12)'};color:${t.type==='income'?'var(--green)':'var(--red)'};font-weight:600;">${typeText}</span>
        <span style="font-size:11px;color:var(--t3);">${t.date} ${t.time}</span>
      </div>
      <div style="text-align:center;margin-bottom:20px;">
        <div style="font-size:32px;font-weight:700;font-family:var(--font-mono);color:${t.type==='income'?'var(--green)':'var(--t1)'};">${t.type==='income'?'+':'-'}¥${fmt(t.amount)}</div>
        <div style="font-size:14px;color:var(--t2);margin-top:6px;">${t.categoryName || catInfo?.name || '未分类'}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:13px;color:var(--t3);">账户</span>
          <span style="font-size:13px;color:var(--t1);display:flex;align-items:center;gap:6px;"><span style="width:6px;height:6px;border-radius:50%;background:${acctColor};"></span>${account?.name || '未选择'}</span>
        </div>
        ${t.note ? `<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:13px;color:var(--t3);">备注</span><span style="font-size:13px;color:var(--t1);">${t.note}</span></div>` : ''}
        ${t.isSubscription ? `<div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-size:13px;color:var(--t3);">类型</span><span style="font-size:12px;padding:2px 8px;border-radius:6px;background:var(--gold-bg);color:var(--gold);font-weight:600;">订阅自动扣款</span></div>` : ''}
      </div>
    </div>
    <div class="card-detail-actions">
      <div class="card-detail-btn" onclick="event.stopPropagation();closeCardDetail();toast('编辑功能开发中')">编辑</div>
      <div class="card-detail-btn" onclick="event.stopPropagation();deleteTx('${t.id}')">删除</div>
    </div>
  `;
  overlay.classList.add('active');
  haptic('light');
}

function deleteTx(txId) {
  if (!confirm('确定删除这笔流水？')) return;
  state.transactions = state.transactions.filter(t => t.id !== txId);
  save();
  closeCardDetail();
  toast('已删除');
  haptic('success');
  render();
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

// Lock on visibility change (return from background)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    showLockScreen();
    checkSubscriptionReminders();
  }
});

// ===== App Lock (Rotary Wheel Password) =====
const WHEEL_ITEM_H = 44;
let lockEnteredDigits = [0, 0, 0, 0];
let lockActiveSlot = 0;
let lockWheelReady = false;

function hashPassword(pwd) {
  let h = 5381;
  for (let i = 0; i < pwd.length; i++) { h = ((h << 5) + h + pwd.charCodeAt(i)) | 0; }
  return 'p' + (h >>> 0).toString(36);
}

function updateLockStatus() {
  const el = $('#lock-status');
  if (!el) return;
  el.textContent = state.settings.appPassword ? '已开启 ›' : '未开启 ›';
}

// Build the rotary wheel with digits 0-9
function buildRotaryWheel() {
  const container = $('#lock-rotary');
  if (!container) return;
  container.innerHTML = '';
  for (let d = 0; d <= 9; d++) {
    const item = document.createElement('div');
    item.className = 'lock-rotary-item';
    item.textContent = String(d);
    container.appendChild(item);
  }
  let snapTimer = null;
  container.addEventListener('scroll', () => {
    updateRotaryHighlight(container);
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => snapRotary(container), 120);
    // Live update the active slot
    if (lockActiveSlot < 4) {
      const digit = getRotaryDigit(container);
      lockEnteredDigits[lockActiveSlot] = digit;
      updateLockDots();
    }
  }, { passive: true });

  // Tap to confirm current digit and advance
  container.addEventListener('click', (e) => {
    e.stopPropagation();
    lockConfirmDigit();
  });

  // Build tick marks
  buildRotaryTicks();
  lockWheelReady = true;
}

function buildRotaryTicks() {
  const ticksEl = $('#lock-rotary-ticks');
  if (!ticksEl) return;
  ticksEl.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const tick = document.createElement('div');
    tick.className = 'lock-tick';
    ticksEl.appendChild(tick);
  }
}

function updateRotaryHighlight(wheel) {
  const items = wheel.querySelectorAll('.lock-rotary-item');
  const center = wheel.scrollTop + wheel.clientHeight / 2;
  items.forEach(item => {
    const itemCenter = item.offsetTop + item.offsetHeight / 2;
    const dist = Math.abs(center - itemCenter);
    if (dist < WHEEL_ITEM_H * 0.55) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  updateRotaryTicks(wheel);
}

function updateRotaryTicks(wheel) {
  const ticks = $$('#lock-rotary-ticks .lock-tick');
  const center = wheel.scrollTop + wheel.clientHeight / 2;
  const items = wheel.querySelectorAll('.lock-rotary-item');
  ticks.forEach((tick, i) => {
    const item = items[i];
    if (!item) return;
    const itemCenter = item.offsetTop + item.offsetHeight / 2;
    const dist = Math.abs(center - itemCenter);
    tick.classList.remove('bright', 'dim');
    if (dist < WHEEL_ITEM_H * 0.55) {
      tick.classList.add('bright');
    } else if (dist < WHEEL_ITEM_H * 1.5) {
      tick.classList.add('dim');
    }
  });
}

function snapRotary(wheel) {
  const nearest = Math.round(wheel.scrollTop / WHEEL_ITEM_H) * WHEEL_ITEM_H;
  if (Math.abs(wheel.scrollTop - nearest) > 1) {
    wheel.scrollTo({ top: nearest, behavior: 'smooth' });
  }
}

function getRotaryDigit(wheel) {
  const idx = Math.round(wheel.scrollTop / WHEEL_ITEM_H);
  return ((idx % 10) + 10) % 10;
}

function getWheelDigits() {
  return lockEnteredDigits.map(d => String(d)).join('');
}

// Confirm current digit and advance to next slot
function lockConfirmDigit() {
  if (lockActiveSlot >= 4) return;
  haptic('light');
  lockActiveSlot++;
  updateLockDots();
  // Auto-submit when all 4 digits entered
  if (lockActiveSlot >= 4) {
    setTimeout(() => confirmLockPassword(), 300);
  }
}

// Go back one digit
function lockBackspace() {
  if (lockActiveSlot <= 0) return;
  haptic('light');
  lockActiveSlot--;
  updateLockDots();
}

// Update the password display on the left
function updateLockDots() {
  const slots = $$('#lock-pass-display .lock-pass-slot');
  const wheel = $('#lock-rotary');
  const currentDigit = wheel ? getRotaryDigit(wheel) : 0;
  slots.forEach((slot, i) => {
    slot.classList.remove('active', 'filled');
    if (i < lockActiveSlot) {
      slot.classList.add('filled');
      slot.textContent = String(lockEnteredDigits[i]);
    } else if (i === lockActiveSlot) {
      slot.classList.add('active');
      lockEnteredDigits[i] = currentDigit;
      slot.textContent = String(currentDigit);
    } else {
      slot.textContent = '';
    }
  });
  // Update backspace button state
  const backBtn = $('#lock-back-btn');
  if (backBtn) backBtn.disabled = lockActiveSlot <= 0;
}

function resetWheels() {
  lockEnteredDigits = [0, 0, 0, 0];
  lockActiveSlot = 0;
  if (!lockWheelReady) buildRotaryWheel();
  const wheel = $('#lock-rotary');
  if (wheel) {
    wheel.scrollTop = 0;
    updateRotaryHighlight(wheel);
  }
  updateLockDots();
}

// Lock screen mode: 'unlock' | 'set' | 'confirm' | 'remove'
let lockMode = 'unlock';

function showLockScreen() {
  if (!state.settings.appPassword) return;
  lockMode = 'unlock';
  const overlay = $('#lock-screen');
  const subtitle = $('#lock-subtitle');
  const confirmBtn = $('#lock-confirm-btn');
  const cancelBtn = $('#lock-cancel-btn');
  const backBtn = $('#lock-back-btn');
  subtitle.textContent = '滚动选择数字，点击确认';
  subtitle.classList.remove('error');
  confirmBtn.style.display = 'block';
  confirmBtn.textContent = '解锁';
  cancelBtn.style.display = 'none';
  if (backBtn) backBtn.style.display = 'flex';
  resetWheels();
  overlay.classList.add('on');
  haptic('medium');
}

function hideLockScreen() {
  $('#lock-screen').classList.remove('on');
}

function openLockSettings() {
  if (state.settings.appPassword) {
    // Already set - ask to change or remove
    const choice = confirm('应用密码已开启\n\n确定 = 修改密码\n取消 = 关闭密码');
    if (choice) {
      // Verify old password first
      lockMode = 'verify-old';
      const subtitle = $('#lock-subtitle');
      const confirmBtn = $('#lock-confirm-btn');
      const cancelBtn = $('#lock-cancel-btn');
      const backBtn = $('#lock-back-btn');
      subtitle.textContent = '请先输入当前密码';
      subtitle.classList.remove('error');
      confirmBtn.style.display = 'block';
      confirmBtn.textContent = '确认';
      cancelBtn.style.display = 'block';
      if (backBtn) backBtn.style.display = 'flex';
      resetWheels();
      $('#lock-screen').classList.add('on');
    } else {
      // Remove password
      state.settings.appPassword = null;
      save();
      updateLockStatus();
      toast('应用密码已关闭');
      haptic('success');
    }
    return;
  }
  // Set new password - first entry
  lockMode = 'set';
  const subtitle = $('#lock-subtitle');
  const confirmBtn = $('#lock-confirm-btn');
  const cancelBtn = $('#lock-cancel-btn');
  const backBtn = $('#lock-back-btn');
  subtitle.textContent = '滚动设置4位数字密码';
  subtitle.classList.remove('error');
  confirmBtn.style.display = 'block';
  confirmBtn.textContent = '下一步';
  cancelBtn.style.display = 'block';
  if (backBtn) backBtn.style.display = 'flex';
  resetWheels();
  $('#lock-screen').classList.add('on');
}

let pendingPassword = '';

function confirmLockPassword() {
  haptic('medium');
  const subtitle = $('#lock-subtitle');
  const confirmBtn = $('#lock-confirm-btn');
  const entered = getWheelDigits();

  if (lockMode === 'unlock') {
    if (hashPassword(entered) === state.settings.appPassword) {
      hideLockScreen();
      haptic('success');
    } else {
      subtitle.textContent = '密码错误，请重试';
      subtitle.classList.add('error');
      haptic('error');
      resetWheels();
      setTimeout(() => {
        subtitle.textContent = '滚动选择数字，点击确认';
        subtitle.classList.remove('error');
      }, 1500);
    }
  } else if (lockMode === 'verify-old') {
    if (hashPassword(entered) === state.settings.appPassword) {
      // Old password correct, now set new
      lockMode = 'set';
      subtitle.textContent = '滚动设置新的4位密码';
      subtitle.classList.remove('error');
      confirmBtn.textContent = '下一步';
      resetWheels();
    } else {
      subtitle.textContent = '当前密码错误';
      subtitle.classList.add('error');
      haptic('error');
      resetWheels();
      setTimeout(() => {
        subtitle.textContent = '请先输入当前密码';
        subtitle.classList.remove('error');
      }, 1500);
    }
  } else if (lockMode === 'set') {
    pendingPassword = entered;
    lockMode = 'confirm';
    subtitle.textContent = '请再次滚动输入确认';
    subtitle.classList.remove('error');
    confirmBtn.textContent = '确认';
    resetWheels();
  } else if (lockMode === 'confirm') {
    if (entered === pendingPassword) {
      state.settings.appPassword = hashPassword(entered);
      save();
      updateLockStatus();
      hideLockScreen();
      toast('应用密码已开启');
      haptic('success');
      pendingPassword = '';
    } else {
      subtitle.textContent = '两次密码不一致，请重新设置';
      subtitle.classList.add('error');
      haptic('error');
      pendingPassword = '';
      lockMode = 'set';
      confirmBtn.textContent = '下一步';
      resetWheels();
      setTimeout(() => {
        subtitle.textContent = '滚动设置4位数字密码';
        subtitle.classList.remove('error');
      }, 1500);
    }
  }
}

function cancelLockAction() {
  haptic('light');
  hideLockScreen();
  pendingPassword = '';
}

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
        // Don't sync app password hash for security
        const safe = { ...state.settings };
        delete safe.appPassword;
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
