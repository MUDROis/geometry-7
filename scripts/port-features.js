// Портирует платформенные фичи в курс «Геометрия 7»:
// ассеты (KaTeX CDN, course.css/course.js), мета/OG/лого/фавикон, поиск, печать. Идемпотентно.
const fs = require('fs');
const path = require('path');

const DIR = 'C:/Users/Lenovo/Downloads/geometry-7';
const BASE = 'https://интерактивнаяшкола.рф/geometry-7';
const SITE = 'Геометрия 7 класс';

const files = ['index.html'].concat(
  fs.readdirSync(DIR).filter(f => /^geometriya-.*\.html$/.test(f)).sort());

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function decodeText(h) {
  return String(h).replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim();
}

const HEAD_BLOCK =
  '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">\n' +
  '<link rel="stylesheet" href="assets/course.css">\n';
const BODY_BLOCK =
  '<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>\n' +
  '<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>\n' +
  '<script defer src="assets/axis-math.js"></script>\n' +
  '<script defer src="assets/answer-core.js"></script>\n' +
  '<script defer src="assets/course.js"></script>\n';

function injectAssets(c) {
  if (!c.includes('assets/course.css')) {
    const i = c.lastIndexOf('</head>');
    c = c.slice(0, i) + HEAD_BLOCK + c.slice(i);
  }
  if (!c.includes('assets/course.js')) {
    const i = c.lastIndexOf('</body>');
    c = c.slice(0, i) + BODY_BLOCK + c.slice(i);
  }
  return c;
}

function injectMeta(c, f) {
  if (c.includes('property="og:title"')) return c;
  const titleM = /\<title>(.*?)<\/title>/s.exec(c);
  const title = titleM ? decodeText(titleM[1]) : SITE;
  const subM = /<p class="subtitle">([\s\S]*?)<\/p>/s.exec(c);
  const desc = subM ? decodeText(subM[1]) : title;
  const page = f === 'index.html' ? BASE + '/' : BASE + '/' + f;
  const block =
    '<meta name="description" content="' + esc(desc) + '">\n' +
    '<link rel="icon" type="image/x-icon" href="assets/favicon.ico">\n' +
    '<link rel="apple-touch-icon" href="assets/logo.png">\n' +
    '<meta property="og:type" content="website">\n' +
    '<meta property="og:site_name" content="' + esc(SITE) + '">\n' +
    '<meta property="og:title" content="' + esc(title) + '">\n' +
    '<meta property="og:description" content="' + esc(desc) + '">\n' +
    '<meta property="og:image" content="' + BASE + '/assets/logo.png">\n' +
    '<meta property="og:url" content="' + page + '">\n' +
    '<meta property="og:locale" content="ru_RU">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n' +
    '<meta name="twitter:title" content="' + esc(title) + '">\n' +
    '<meta name="twitter:description" content="' + esc(desc) + '">\n' +
    '<meta name="twitter:image" content="' + BASE + '/assets/logo.png">\n' +
    '<link rel="canonical" href="' + page + '">\n';
  const i = c.lastIndexOf('</head>');
  return c.slice(0, i) + block + c.slice(i);
}

function injectIndexHeader(c) {
  // лого рядом с заголовком
  if (!c.includes('course-logo')) {
    c = c.replace('<h1>📐 Геометрия — 7 класс</h1>',
      '<div style="display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;">' +
      '<img class="course-logo" src="assets/logo.png" alt="Логотип курса «Геометрия 7 класс»">' +
      '<h1 style="margin:0;">📐 Геометрия — 7 класс</h1></div>');
  }
  // поиск перед первой главой
  if (!c.includes('course-search')) {
    const at = c.indexOf('<details class="chapter"');
    if (at !== -1) {
      const box = '<div style="background:#fff;padding:16px;border-radius:14px;margin-bottom:16px;box-shadow:0 4px 10px rgba(44,62,80,.08);">' +
        '<input id="course-search" type="search" placeholder="Поиск по курсу…"></div>\n';
      c = c.slice(0, at) + box + c.slice(at);
    }
  }
  return c;
}

let filesChanged = 0;
for (const f of files) {
  const p = path.join(DIR, f);
  let c = fs.readFileSync(p, 'utf8');
  const orig = c;
  c = injectAssets(c);
  c = injectMeta(c, f);
  if (f === 'index.html') c = injectIndexHeader(c);
  if (c !== orig) { fs.writeFileSync(p, c, 'utf8'); filesChanged++; }
}
console.log('files changed:' + filesChanged);
