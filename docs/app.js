// SubPilot · 订阅管家
// ===== Storage Keys =====
const KEYS = {
  accounts: 'subpilot_accounts',
  subscriptions: 'subpilot_subs',
  transactions: 'subpilot_tx',
  onboarded: 'subpilot_onboarded'
};

// ===== Embedded Brand Icons (path data) =====
const EMBEDDED_ICONS = {
  spotify: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14C9.6 9.9 15 10.56 18.72 12.84c.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z',
  netflix: 'M5.4 0c.5.9 1.3 2.3 1.9 3.7C8.2 2.5 9 .8 9.5 0h3.5c-.5 1.3-1.3 3.2-2.3 5 1.1 1.9 2.3 4.3 3.1 5.9V0h3.1v16h-3.1c-.8-1.6-2.2-4.3-3.5-6.6-1 2-2.2 4.8-3 6.6H4.3C3.2 12.3 1.4 5.6 0 1.7V0h5.4z',
  apple: 'M12.15 6.9c-.95 0-2.42-1.08-3.96-1.04-2.04.03-3.91 1.18-4.96 3.01C1.11 12.58 2.68 18 4.74 21c1.01 1.45 2.21 3.09 3.79 3.04 1.52-.07 2.09-.99 3.94-.99 1.83 0 2.35.99 3.96.95 1.64-.03 2.68-1.48 3.68-2.95 1.16-1.69 1.64-3.33 1.66-3.42-.04-.01-3.18-1.22-3.22-4.86-.03-3.04 2.48-4.49 2.6-4.56-1.43-2.09-3.62-2.32-4.39-2.38-2-.16-3.68 1.09-4.61 1.09zM15.53 3.83c.84-1.01 1.4-2.43 1.25-3.83-1.21.05-2.66.81-3.53 1.82-.78.9-1.45 2.34-1.27 3.71 1.34.1 2.72-.69 3.56-1.7z',
  notion: 'M4.46 4.21c.75.6 1.03.56 2.11.41l11.29-1.62c.3-.04.62-.09.91-.05-.27.09-.56.22-.81.39L6.26 12.14c-.53.37-.67.52-.64.97l.13 6.59c.01.47.1.63.47.58l12.46-1.78c.52-.07.65-.22.65-.74V4.85c0-.48-.08-.71-.56-.64L6.85 5.94c-.86.12-1.29.06-1.8-.42l-.6-.91zm12.92 3.57v9.46c0 .22-.08.35-.3.38l-9.59 1.37c-.24.03-.32-.04-.32-.27V8.64c0-.21.05-.3.25-.33l9.66-1.38c.23-.03.31.05.31.29v.56z',
  youtube: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.55 12 3.55 12 3.55s-7.51 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.51 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z',
  adobelightroom: 'M11.6 0c-2.3 0-4.1.02-5.2.16-1.4.17-2.4.6-3.3 1.48C2.1 2.59 1.6 3.8 1.5 5.1c-.1 1.1-.2 2.8-.2 5v3.7c0 2.3.1 4 .2 5 .2 1.3.6 2.5 1.7 3.5.9.8 2 1.3 3.3 1.4 1.1.1 2.9.2 5.2.2s4.1-.1 5.2-.2c1.3-.1 2.4-.6 3.3-1.4 1-.9 1.5-2.1 1.7-3.5.1-1.1.2-2.8.2-5v-3.7c0-2.2-.1-3.9-.2-5-.2-1.3-.7-2.5-1.7-3.5C19.3.76 18.2.33 16.9.16c-1.1-.13-2.9-.16-5.2-.16zM6.6 5.9h1.6v8.3h4v1.3H6.6z',
  github: 'M12 .3c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6 0-.3-.1-1-.1-2-3.3.7-4-1.6-4-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2 0 1.6-.1 2.9-.1 3.3 0 .3.2.7.8.6C20.6 22.1 24 17.6 24 12.3c0-6.6-5.4-12-12-12',
  bilibili: 'M17.8 4.7h.9c1.5.05 2.8.58 3.8 1.57 1 .99 1.5 2.25 1.6 3.76v7.36c-.04 1.51-.56 2.77-1.56 3.77-1 .99-2.3 1.52-3.8 1.56H5.3c-1.5-.04-2.8-.56-3.8-1.56C.5 20.19 0 18.86 0 17.35V9.99c.04-1.51.56-2.77 1.56-3.76C2.56 5.23 3.82 4.71 5.3 4.65h.8L4.9 3.53c-.3-.25-.4-.57-.4-.9 0-.36.1-.66.4-.91.3-.25.6-.37.9-.37s.7.12.9.37l2.9 2.75c.1.07.1.14.2.21h4.3c.1-.07.1-.14.2-.21l2.9-2.75c.3-.25.6-.37.9-.37s.7.15.9.4c.3.25.4.55.4.9 0 .36-.1.66-.4.91L17.8 4.7zM5.3 7.24c-.7.02-1.4.28-1.9.77-.5.5-.8 1.1-.8 1.9v7.5c.02.8.3 1.4.8 1.9.5.5 1.1.8 1.9.8h13.3c.8-.02 1.4-.28 1.9-.77.5-.5.8-1.1.8-1.9V9.9c-.02-.8-.3-1.4-.8-1.9-.5-.5-1.1-.8-1.9-.8H5.3z',
  google: 'M12.5 10.9v3.3h7.8c-.2 1.8-.9 3.2-1.8 4.1-1.1 1.1-2.9 2.4-6.1 2.4-4.8 0-8.6-3.9-8.6-8.7s3.8-8.7 8.6-8.7c2.6 0 4.5 1 5.9 2.3l2.3-2.3C18.7 1.4 16.1 0 12.5 0 5.9 0 .3 5.4.3 12s5.6 12 12.2 12c3.6 0 6.3-1.2 8.4-3.4 2.2-2.2 2.8-5.2 2.8-7.7 0-.8-.1-1.5-.2-2.1h-11z',
  microsoft: 'M0 0h11.4v11.4H0zm12.6 0H24v11.4H12.6zM0 12.6h11.4V24H0zm12.6 0H24V24H12.6z',
  adobe: 'M13.3.6c-.3-.2-.6-.2-.9-.2s-.6.1-.9.2L1.3 6.6c-.6.3-.9 1-.9 1.6v7.5c0 .7.4 1.3.9 1.6l3.6 2.1v-5.7L12 17.8c.6.3 1.3.3 1.8 0l10.2-5.9c.6-.3.9-1 .9-1.6V2.7L13.3.6zm0 2.3l8.4 4.9-8.4 4.9L4.9 7.8l8.4-4.9z',
  dropbox: 'M6 1.8L0 6.4l3.9 3.1L6 7.2l6 4.7 6-4.7 2.1 2.3L24 6.4l-6-4.6-6 4.7L6 1.8zM0 11.8l3.9 3.1L6 12.6l6 4.7 6-4.7 2.1 2.3L24 11.8l-6 4.7-6-4.7-6 4.7-6-4.7zm6 6.3l6-4.7 6 4.7-6 4.7-6-4.7z',
  discord: 'M20.3 4.4c-1.5-.7-3.1-1.2-4.9-1.5-.3.4-.5.9-.7 1.3-1.8-.3-3.7-.3-5.5 0-.2-.4-.4-.9-.7-1.3-1.8.3-3.4.8-4.9 1.5C.5 9-.3 13.6.1 18.1c2 1.5 4 2.3 6 3 .5-.6.9-1.3 1.2-2-1.3-.5-2.2-1.1-3-1.9.3-.2.5-.4.7-.6 1.3.6 2.6.9 4 1 1.4.1 2.8-.1 4.1-.5.1.2.4.4.7.6-.8.7-1.7 1.4-3 1.9.3.7.7 1.4 1.2 2 2-.7 4-1.5 6-3 .4-4.5-.4-9.1-3.6-13.7zM8 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4z'
};

// ===== Brand Icon Database =====
const BRANDS = {
  'spotify': { name: 'Spotify', slug: 'spotify', color: '#1DB954', cat: '娱乐' },
  'netflix': { name: 'Netflix', slug: 'netflix', color: '#E50914', cat: '娱乐' },
  'youtube': { name: 'YouTube Premium', slug: 'youtube', color: '#FF0000', cat: '娱乐' },
  'youtube premium': { name: 'YouTube Premium', slug: 'youtube', color: '#FF0000', cat: '娱乐' },
  'notion': { name: 'Notion', slug: 'notion', color: '#ffffff', cat: '生产力' },
  'icloud': { name: 'iCloud+', slug: 'apple', color: '#ffffff', cat: '工具' },
  'icloud+': { name: 'iCloud+', slug: 'apple', color: '#ffffff', cat: '工具' },
  'apple': { name: 'Apple', slug: 'apple', color: '#ffffff', cat: '工具' },
  'lightroom': { name: 'Adobe Lightroom', slug: 'adobelightroom', color: '#31A8FF', cat: '工具' },
  'adobe lightroom': { name: 'Adobe Lightroom', slug: 'adobelightroom', color: '#31A8FF', cat: '工具' },
  'photoshop': { name: 'Adobe Photoshop', slug: 'adobephotoshop', color: '#31A8FF', cat: '工具' },
  'wps': { name: 'WPS Office', slug: 'wps', color: '#D32D27', cat: '生产力' },
  'wps office': { name: 'WPS Office', slug: 'wps', color: '#D32D27', cat: '生产力' },
  'figma': { name: 'Figma', slug: 'figma', color: '#F24E1E', cat: '生产力' },
  'chatgpt': { name: 'ChatGPT', slug: 'openai', color: '#10a37f', cat: '工具' },
  'github': { name: 'GitHub', slug: 'github', color: '#ffffff', cat: '工具' },
  '1password': { name: '1Password', slug: '1password', color: '#0094F5', cat: '工具' },
  'notability': { name: 'Notability', slug: 'notability', color: '#5EEAD4', cat: '生产力' },
  'goodnotes': { name: 'GoodNotes', slug: 'goodnotes', color: '#FF6B6B', cat: '生产力' },
  'procreate': { name: 'Procreate', slug: 'procreate', color: '#00C7BE', cat: '工具' },
  'discord': { name: 'Discord Nitro', slug: 'discord', color: '#5865F2', cat: '娱乐' },
  'discord nitro': { name: 'Discord Nitro', slug: 'discord', color: '#5865F2', cat: '娱乐' },
  'nintendo': { name: 'Nintendo Online', slug: 'nintendoswitch', color: '#E60012', cat: '娱乐' },
  'playstation': { name: 'PlayStation Plus', slug: 'playstation', color: '#003791', cat: '娱乐' },
  'xbox': { name: 'Xbox Game Pass', slug: 'xbox', color: '#107C10', cat: '娱乐' },
  'baidu': { name: '百度网盘', slug: 'baidu', color: '#2319DC', cat: '工具' },
  '百度网盘': { name: '百度网盘', slug: 'baidu', color: '#2319DC', cat: '工具' },
  'qq音乐': { name: 'QQ音乐', slug: 'qqmusic', color: '#31C27C', cat: '娱乐' },
  'qq': { name: 'QQ会员', slug: 'tencentqq', color: '#12B7F5', cat: '娱乐' },
  '网易云音乐': { name: '网易云音乐', slug: 'neteasecloudmusic', color: '#C20C0C', cat: '娱乐' },
  'bilibili': { name: '哔哩哔哩', slug: 'bilibili', color: '#00A1D6', cat: '娱乐' },
  '哔哩哔哩': { name: '哔哩哔哩', slug: 'bilibili', color: '#00A1D6', cat: '娱乐' },
  '爱奇艺': { name: '爱奇艺', slug: 'iqiyi', color: '#00BE06', cat: '娱乐' },
  '腾讯视频': { name: '腾讯视频', slug: 'tencentvideo', color: '#FF6A00', cat: '娱乐' },
  '优酷': { name: '优酷', slug: 'youku', color: '#1FB1EB', cat: '娱乐' },
  'dropbox': { name: 'Dropbox', slug: 'dropbox', color: '#0061FF', cat: '工具' },
  'google one': { name: 'Google One', slug: 'google', color: '#4285F4', cat: '工具' },
  'google': { name: 'Google', slug: 'google', color: '#4285F4', cat: '工具' },
  'microsoft 365': { name: 'Microsoft 365', slug: 'microsoft', color: '#5E5CE6', cat: '生产力' },
  'office': { name: 'Microsoft 365', slug: 'microsoft', color: '#5E5CE6', cat: '生产力' },
  'canva': { name: 'Canva', slug: 'canva', color: '#00C4CC', cat: '生产力' },
  'setapp': { name: 'Setapp', slug: 'setapp', color: '#0067FF', cat: '工具' },
  'adobe': { name: 'Adobe Creative Cloud', slug: 'adobe', color: '#FF0000', cat: '工具' },
  'creative cloud': { name: 'Adobe Creative Cloud', slug: 'adobe', color: '#FF0000', cat: '工具' },
  'expressvpn': { name: 'ExpressVPN', slug: 'expressvpn', color: '#DA3940', cat: '工具' },
  'surfshark': { name: 'Surfshark', slug: 'surfshark', color: '#00D8A8', cat: '工具' },
  'duolingo': { name: 'Duolingo', slug: 'duolingo', color: '#58CC02', cat: '学习' },
  'medium': { name: 'Medium', slug: 'medium', color: '#ffffff', cat: '阅读' },
  'substack': { name: 'Substack', slug: 'substack', color: '#FF6719', cat: '阅读' },
  'kindle': { name: 'Kindle Unlimited', slug: 'amazon', color: '#FF9900', cat: '阅读' },
  'amazon prime': { name: 'Amazon Prime', slug: 'amazon', color: '#FF9900', cat: '娱乐' },
  'spotify premium': { name: 'Spotify', slug: 'spotify', color: '#1DB954', cat: '娱乐' }
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
  currentSubId: null
};

// ===== Storage =====
function load() {
  try {
    state.accounts = JSON.parse(localStorage.getItem(KEYS.accounts) || '[]');
    state.subscriptions = JSON.parse(localStorage.getItem(KEYS.subscriptions) || '[]');
    state.transactions = JSON.parse(localStorage.getItem(KEYS.transactions) || '[]');
  } catch(e) { console.error('Load error', e); }
}
function save() {
  localStorage.setItem(KEYS.accounts, JSON.stringify(state.accounts));
  localStorage.setItem(KEYS.subscriptions, JSON.stringify(state.subscriptions));
  localStorage.setItem(KEYS.transactions, JSON.stringify(state.transactions));
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

// ===== Brand Icon =====
function brandIconSvg(brand) {
  if (!brand) return letterIcon('?', 'rgba(255,255,255,0.3)');
  const letter = (brand.name[0]||'?').toUpperCase();
  const color = brand.color || '#d4af7a';
  return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:${color};letter-spacing:0;">${letter}</div>`;
}

function matchBrand(name) {
  if (!name) return null;
  const n = name.toLowerCase().trim();
  for (const key in BRANDS) {
    if (n.includes(key) || key.includes(n)) return BRANDS[key];
  }
  return null;
}

function letterIcon(letter, color) {
  return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:${color};">${letter}</div>`;
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
  render();
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
  $('#sub-name').value = '';
  $('#sub-price').value = '';
  $('#sub-nextdate').value = today();
  $('#sub-note').value = '';
  state.selectedCycle = 'month';
  $$('#sub-cycle-pick .pick').forEach(p => p.classList.toggle('on', p.dataset.c === 'month'));
  renderSubAcctPick();
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
  const acctBtn = document.querySelector('#sub-acct-pick .pick.on');
  const accountId = acctBtn ? acctBtn.dataset.id : (state.accounts[0]?.id || null);
  const brand = matchBrand(name);
  const sub = {
    id: genId(), name, price, cycle: state.selectedCycle,
    nextDate, note, accountId,
    brand: brand ? { name: brand.name, slug: brand.slug, color: brand.color, cat: brand.cat } : null,
    autoRenew: true,
    createdAt: new Date().toISOString()
  };
  state.subscriptions.push(sub);
  save();
  closeSheet('sheet-sub');
  toast('订阅已添加');
  render();
}

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
  $$('#acct-type-pick .pick').forEach(p => p.classList.toggle('on', p.dataset.t === 'bank'));
  openSheet('sheet-acct');
}

function saveAccount() {
  const name = $('#acct-name').value.trim();
  if (!name) { toast('请输入账户名称'); return; }
  const balance = parseFloat($('#acct-balance').value) || 0;
  const cardNumber = $('#acct-num').value.trim();
  const colorClass = CARD_COLORS[state.accounts.length % CARD_COLORS.length];
  const acct = {
    id: genId(), name, type: state.selectedAcctType, balance,
    cardNumber, colorClass, createdAt: new Date().toISOString()
  };
  state.accounts.push(acct);
  save();
  closeSheet('sheet-acct');
  toast('账户已添加');
  render();
}

$$('#acct-type-pick .pick').forEach(p => p.onclick = () => {
  state.selectedAcctType = p.dataset.t;
  $$('#acct-type-pick .pick').forEach(x => x.classList.remove('on'));
  p.classList.add('on');
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
        const tx = {
          id: genId(), type: 'expense', amount: sub.price,
          category: 'subscription', categoryName: sub.name, categoryIcon: '🔄',
          note: `${sub.name} 自动续费`, accountId: sub.accountId,
          date: sub.nextDate, time: '09:00',
          timestamp: txTime.toISOString(),
          isSubscription: true, subscriptionId: sub.id
        };
        state.transactions.unshift(tx);
        if (acct) acct.balance -= sub.price;
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
  const circumference = 2 * Math.PI * 16;
  const offset = circumference * (1 - pct/100);
  const ringColor = isSoon ? 'var(--gold)' : 'rgba(255,255,255,0.25)';
  const ringTextColor = isSoon ? 'var(--gold)' : 'rgba(255,255,255,0.35)';
  const daysText = days <= 0 ? '已到期' : `${days}天后`;
  const daysStyle = isSoon ? 'color:var(--red);font-weight:600;' : '';
  const iconHtml = sub.brand ? brandIconSvg(sub.brand) : letterIcon((sub.name[0]||'?').toUpperCase(), 'rgba(255,255,255,0.4)');
  const account = state.accounts.find(a => a.id === sub.accountId);
  return `<div class="sc2" data-id="${sub.id}">
    <div class="si">${iconHtml}</div>
    <div class="sif">
      <div class="sn">${sub.name} <span class="badge">订阅</span></div>
      <div class="sd">¥${sub.price}${cycleToLabel(sub.cycle)} · <span style="${daysStyle}">${daysText}</span></div>
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
    return s + sub.price * mult;
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
  const acct = state.accounts.find(a => a.id === sub.accountId);
  const daysText = days <= 0 ? '已到期' : `${days}天后`;
  const monthly = { week: sub.price * 4.3, month: sub.price, quarter: sub.price/3, year: sub.price/12 }[sub.cycle] || sub.price;
  const yearly = monthly * 12;
  const startDate = sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('zh-CN') : '未知';
  const iconHtml = sub.brand ? brandIconSvg(sub.brand) : letterIcon((sub.name[0]||'?').toUpperCase(), 'rgba(255,255,255,0.4)');
  const heroBg = sub.brand ? `background:linear-gradient(150deg,${sub.brand}22,${sub.brand}08);border:1px solid ${sub.brand}15;` : '';

  $('#subdetail-body').innerHTML = `
    <div class="sub-detail-hero" style="${heroBg}">
      <div class="sdh-ic">${iconHtml}</div>
      <div style="flex:1;">
        <div class="sdh-nm">${sub.name}</div>
        <div class="sdh-cat">${sub.brand?.cat || '订阅'} · ${acct?.name || '未绑定'}</div>
        <div style="display:flex;align-items:baseline;gap:4px;">
          <span class="sdh-pr">¥${sub.price}</span>
          <span style="font-size:14px;color:var(--t2);">${cycleToLabel(sub.cycle)}</span>
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
          <span class="info-v" style="color:${isSoon?'var(--gold)':'var(--t2)'};">${pct}%</span>
        </div>
        <div class="prog-track"><div class="prog-fill" style="width:${pct}%;background:${isSoon?'var(--gold)':'rgba(255,255,255,0.3)'};"></div></div>
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
      <button class="btn btn-gold" onclick="toast('编辑功能开发中')">编辑</button>
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
      const acctColor = acct ? { bank: '#8b3a3a', alipay: '#1a3a6e', wechat: '#1a4a2a', other: '#3a3a3a' }[acct.type] || '#3a3a3a' : '#3a3a3a';
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
  if (state.accounts.length === 0) {
    cs.innerHTML = `<div class="empty-state" style="padding:40px 20px;"><div class="es-icon">💳</div><div class="es-text">暂无账户</div><div class="es-sub">点击 + 添加你的第一张卡</div></div>`;
  } else {
    cs.innerHTML = state.accounts.map((a, i) => {
      const isOn = i === state.activeCardIdx;
      const cardLogo = { bank: '招', alipay: '支', wechat: '微', other: '●' }[a.type] || a.name[0];
      const cardType = { bank: '储蓄卡', alipay: '支付宝', wechat: '微信零钱', other: '钱包' }[a.type] || '账户';
      const cardBrand = { bank: 'UnionPay', alipay: 'Alipay', wechat: 'WeChat', other: '' }[a.type] || '';
      return `<div class="bc ${a.colorClass} ${isOn?'on':'off'}" data-idx="${i}">
        <div class="holo"></div>
        <div class="bct">
          <div class="bcti"><div class="bcn">${a.name}</div><div class="bcty">${cardType}${a.cardNumber ? ' · 尾号'+a.cardNumber : ''}</div></div>
          <div class="bcl">${cardLogo}</div>
        </div>
        <div style="flex:1;"></div>
        ${a.type === 'bank' ? '<div class="chip"></div>' : ''}
        <div class="bcnm">${a.cardNumber ? '•••• •••• •••• ' + a.cardNumber : (a.type === 'alipay' ? '余额宝' : a.type === 'wechat' ? '零钱' : '余额')}</div>
        <div class="bcb">
          <div><div class="bcbl">可用余额</div><div class="bcv">¥${fmt(Math.round(a.balance))}</div></div>
          <div class="bcbn">${cardBrand}</div>
        </div>
      </div>`;
    }).join('');
    cs.querySelectorAll('.bc').forEach(c => c.onclick = () => {
      state.activeCardIdx = parseInt(c.dataset.idx);
      render();
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
  state.accounts = []; state.subscriptions = []; state.transactions = [];
  localStorage.removeItem(KEYS.accounts); localStorage.removeItem(KEYS.subscriptions); localStorage.removeItem(KEYS.transactions);
  localStorage.removeItem(KEYS.onboarded);
  render();
}
function exportData() {
  const data = { accounts: state.accounts, subscriptions: state.subscriptions, transactions: state.transactions, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `subpilot-backup-${today()}.json`; a.click();
  URL.revokeObjectURL(url);
  toast('数据已导出');
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
      save(); render(); toast('数据已导入');
    } catch(err) { toast('导入失败，文件格式错误'); }
  };
  reader.readAsText(file);
});

// ===== Clock =====
function updateClock() {
  const d = new Date();
  $('#clock').textContent = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
setInterval(updateClock, 30000);

// ===== Init =====
function init() {
  load();
  updateClock();

  // Process auto-deductions after data is loaded
  processAutoDeductions();

  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }

  render();
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

init();
