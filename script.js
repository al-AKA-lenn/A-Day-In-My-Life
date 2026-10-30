/* =========================================================
   hari-hari kita  |  script.js
   yang perlu kamu ganti ada di bagian atas (CONFIG sampai SURAT)
   ========================================================= */

const CONFIG = {
  buat: 'ica',
  dari: 'lenn',
  mulai: '2026-07-21',   // tanggal jadian, format tahun-bulan-tanggal
  hitungDari: '2026-07-27T00:00:00', // halaman "hitung hari": dihitung naik terus dari sini
  loaderMs: 3600         // minimal lama animasi matcha diaduk (ms)
};

// 7 momen, satu momen = satu bunga. ganti isinya sesuka kamu.
const MOMENTS = [
  { kapan: 'pagi yang biasa aja', judul: 'cuma satu kata: “pagi”', teks: 'cuma “pagi” dari kamu, tapi hari aku jadi mulai dengan bener.' },
  { kapan: 'pas lagi main bareng', judul: 'aku seneng banget', teks: 'kamu selalu cium pipi aku, kamu selalu cubit pipi aku, ak seneng.' },
  { kapan: 'malem yang kepanjangan', judul: 'ngobrol sampe lupa jam', teks: 'besoknya ngantuk parah, tapi gak nyesel sama sekali.' },
  { kapan: 'hari kamu lagi capek', judul: 'cuma bisa nemenin', teks: 'aku gak bisa ngapa-ngapain selain ada di situ. semoga itu cukup.' },
  { kapan: 'matcha pertama bareng', judul: 'kamu bilang “enak” sambil nyipit', teks: 'itu alesan kenapa web ini ijo.' },
  { kapan: 'hari yang random', judul: 'gak ada acara, gak ada alesan', teks: 'tapi tetep jadi salah satu hari favorit aku.' },
  { kapan: 'yang belum kejadian', judul: 'bunga ini masih kosong', teks: 'nanti kita isi bareng.' }
];

// urutan jam dalam sehari (ini beneran urut, jadi dipakai sebagai timeline)
const HARI_BIASA = [
  { jam: '06.40', teks: 'kamu kirim “pagi”, aku bales pake stiker yang jelek.' },
  { jam: '12.15', teks: 'foto makan siang, terus debat siapa yang makannya lebih enak.' },
  { jam: '16.30', teks: '“udah pulang?” padahal kamu udah tau jawabannya.' },
  { jam: '21.00', teks: 'telfon. gak ngomongin hal penting, dan itu justru enaknya.' },
  { jam: '23.30', teks: '“tidur gih.” “iya, bentar lagi.” (bohong)' }
];

// album photobooth: 1 strip = 3 foto. tambah/hapus strip sesuka kamu.
// foto: isi path gambar kamu, contoh 'img/kita1.jpg'. kosongin '' kalo belum ada.
// warna strip: 'putih', 'blush', 'matcha', atau 'butter'
const ALBUM = [
  { judul: 'K3MART', tanggal: '14 OKTOBER 2026', warna: 'putih',  foto: ['Gambar/K3MART_1.jpg', 'Gambar/K3MART_2.jpg', 'Gambar/K3MART_3.jpg'] },
  { judul: 'KOPKEN',   tanggal: '10 OKTOBER 2026',             warna: 'blush',  foto: ['Gambar/KOPKEN_1.jpeg', 'Gambar/KOPKEN_2.jpg', 'Gambar/KOPKEN_3.jpeg'] },
  { judul: 'CEMARA',        tanggal: '31 OKTOBER 2026',             warna: 'matcha', foto: ['Gambar/CEMARA_1.jpg', 'Gambar/CEMARA_2.jpg', 'Gambar/CEMARA_3.jpg'] },
  { judul: 'RICHEESE', tanggal: '31 OKTOBER 2026',           warna: 'butter', foto: ['Gambar/RICHEESE_1.jpg', 'Gambar/RICHEESE_2.jpg', 'Gambar/RICHEESE_3.jpg'] }
];

const SURAT = [
  'aku gak jago ngomong yang manis-manis langsung, jadi aku bikin ini aja.',
  'isinya cuma hari-hari biasa kita. tapi buat aku, justru yang biasa itu yang bikin betah.',
  'makasih udah mau ada di hari-hariku, {buat}.'
];

/* =========================================================
   bunga: cuma lily dan tulip
   ========================================================= */

const COLORS = {
  lily: {
    cream: { back: '#F2EDDC', front: '#FFFBF1', edge: '#E3DEC6', vein: '#E2DCC0', inner: '#F6E3A6', throat: '#DDE29A', spot: '#E0B089' },
    blush: { back: '#F0CBD0', front: '#F8DDE0', edge: '#E7B6BE', vein: '#E6B1BA', inner: '#E98FA3', throat: '#E8E6A0', spot: '#C4647B' }
  },
  tulip: {
    pink:   { main: '#F0B2BE', dark: '#DE8BA0', light: '#FFE0E6' },
    rose:   { main: '#E48AA2', dark: '#CC6485', light: '#F9C7D3' },
    butter: { main: '#F6DE8E', dark: '#E6C25E', light: '#FFF4C9' },
    peach:  { main: '#F5BFA8', dark: '#E59A82', light: '#FFE5DA' }
  }
};

// m = nomor momen, t = jenis bunga, c = warna, x/y/r/s = posisi, miring, ukuran
const FLOWERS = [
  { m: 0, t: 'lily',  c: 'cream',  x: 200, y: 96,  r: 0,   s: 1.02 },
  { m: 2, t: 'lily',  c: 'blush',  x: 112, y: 160, r: -12, s: .92 },
  { m: 5, t: 'lily',  c: 'cream',  x: 288, y: 152, r: 12,  s: .92 },
  { m: 1, t: 'tulip', c: 'pink',   x: 92,  y: 274, r: -24, s: 1 },
  { m: 3, t: 'tulip', c: 'rose',   x: 158, y: 240, r: -9,  s: 1.08 },
  { m: 4, t: 'tulip', c: 'butter', x: 244, y: 236, r: 9,   s: 1.08 },
  { m: 6, t: 'tulip', c: 'peach',  x: 312, y: 276, r: 24,  s: 1 }
];

function tulipHead(c) {
  return `
    <g class="tl tl-l"><path d="M0,0 C-30,-6 -34,-42 -20,-72 C-8,-58 -2,-30 0,0 Z" fill="${c.dark}"/></g>
    <g class="tl tl-r"><path d="M0,0 C30,-6 34,-42 20,-72 C8,-58 2,-30 0,0 Z" fill="${c.dark}"/></g>
    <path d="M-17,-5 C-25,-34 -8,-66 0,-80 C8,-66 25,-34 17,-5 C9,3 -9,3 -17,-5 Z" fill="${c.main}"/>
    <path d="M0,-70 C-3,-48 -3,-26 0,-9" fill="none" stroke="${c.light}" stroke-width="2.2" stroke-linecap="round" opacity=".75"/>`;
}

function lilyHead(c) {
  const petal = (a, fill) => `
    <g transform="rotate(${a})"><g class="pt">
      <path d="M0,-4 C-23,-12 -26,-42 0,-66 C26,-42 23,-12 0,-4 Z" fill="${fill}" stroke="${c.edge}" stroke-width="1"/>
      <path d="M0,-4 C-12,-10 -13,-26 0,-42 C13,-26 12,-10 0,-4 Z" fill="${c.inner}" opacity=".5"/>
      <path d="M0,-12 L0,-54" stroke="${c.vein}" stroke-width="1.3" stroke-linecap="round" fill="none"/>
    </g></g>`;
  const back = [60, 180, 300].map(a => petal(a, c.back)).join('');
  const front = [0, 120, 240].map(a => petal(a, c.front)).join('');
  let stamens = '';
  [10, 70, 130, 190, 250, 310].forEach(a => {
    const rad = a * Math.PI / 180;
    const ex = Math.sin(rad) * 32, ey = -Math.cos(rad) * 32;
    stamens += `<g class="st"><path d="M0,0 L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="#C9C98A" stroke-width="1.6" stroke-linecap="round"/>
      <ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="2.8" ry="6" transform="rotate(${a} ${ex.toFixed(1)} ${ey.toFixed(1)})" fill="#C9823F"/></g>`;
  });
  const spots = [[-6, -14], [7, -18], [-3, -26], [9, -9], [-10, -8]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="1.1" fill="${c.spot}" opacity=".7"/>`).join('');
  return `<g transform="scale(1 .88)">${back}${front}
    <circle r="6" fill="${c.throat}"/>${spots}${stamens}</g>`;
}

function buildBouquet() {
  const BX = 200, BY = 404;

  const leaves = [
    ['M200,408 C150,380 92,340 52,286 C106,300 166,346 200,408 Z', '#A9BD8B', .05],
    ['M200,408 C246,372 304,336 352,282 C292,298 232,342 200,408 Z', '#98AE78', .12],
    ['M200,408 C170,350 138,318 120,284 C158,306 190,350 200,408 Z', '#8AA06B', .18],
    ['M200,408 C230,350 262,316 282,282 C244,304 210,350 200,408 Z', '#B3C596', .24]
  ].map(([d, f, delay]) => `<path class="leaf" style="--ld:${delay}s" d="${d}" fill="${f}"/>`).join('');

  let stems = '', heads = '';
  FLOWERS.forEach((f, i) => {
    const m = MOMENTS[f.m];
    const rad = f.r * Math.PI / 180;
    const len = (BY - f.y) * .5;
    const cx = f.x - Math.sin(rad) * len;
    const cy = f.y + Math.cos(rad) * len;
    // digambar dari bawah (ikatan) ke atas biar kelihatan tumbuh
    stems += `<path class="stem" pathLength="1" style="--gd:${(0.25 + i * 0.08).toFixed(2)}s" d="M${BX},${BY} Q${cx.toFixed(1)},${cy.toFixed(1)} ${f.x},${f.y}"/>`;

    const isLily = f.t === 'lily';
    const head = isLily ? lilyHead(COLORS.lily[f.c]) : tulipHead(COLORS.tulip[f.c]);
    const haloR = isLily ? 64 : 54, haloY = isLily ? 0 : -38;
    heads += `
      <g class="flower ${f.t}" data-m="${f.m}" tabindex="0" role="button" aria-label="${esc(m.judul)}"
         transform="translate(${f.x} ${f.y}) rotate(${f.r}) scale(${f.s})">
        <g class="sway" style="--sd:${(i * 0.9).toFixed(1)}s">
          <g class="lift">
            <circle class="halo" r="${haloR}" cy="${haloY}"/>
            <g class="bloom" style="--bd:${(0.95 + i * 0.16).toFixed(2)}s">${head}</g>
            <circle class="hit" r="${haloR}" cy="${haloY}" fill="transparent"/>
          </g>
        </g>
      </g>`;
  });

  const wrap = `
    <g class="wrap">
      <path d="M104,368 Q158,398 210,384 L198,556 Z" fill="#F4F7E8" stroke="#D2DDB6" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M296,368 Q256,396 210,384 L198,556 Z" fill="#CFDDB0" stroke="#BFCF9F" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M210,384 L198,556" stroke="#B3C596" stroke-width="1.5" fill="none"/>
      <path d="M129,414 Q200,438 271,414 L268,430 Q200,454 132,430 Z" fill="#7F9463"/>
      <path d="M200,438 C168,408 146,436 170,454 C184,460 197,450 200,438 Z" fill="#8FA672"/>
      <path d="M200,438 C232,408 254,436 230,454 C216,460 203,450 200,438 Z" fill="#8FA672"/>
      <path d="M198,442 L182,494 L197,484 L202,444 Z" fill="#6F8556"/>
      <path d="M202,442 L220,490 L204,482 L198,444 Z" fill="#7F9463"/>
      <circle cx="200" cy="440" r="7" fill="#6F8556"/>
    </g>`;

  return leaves + stems + heads + wrap;
}

/* =========================================================
   util
   ========================================================= */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const reduceMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function daysSince(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  if (!m) return null;
  const start = new Date(+m[1], +m[2] - 1, +m[3]);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const n = Math.round((today - start) / 86400000) + 1;
  return n >= 1 ? n : null;
}

/* =========================================================
   loader: matcha diseduh, diaduk
   ========================================================= */

function buildFoam() {
  const g = $('#foam');
  if (!g) return;
  let out = '';
  for (let i = 0; i < 22; i++) {
    const a = Math.sin(i * 12.9898) * 43758.5453, b = Math.sin(i * 78.233) * 12345.678;
    const ra = a - Math.floor(a), rb = b - Math.floor(b);
    const u = Math.sqrt(ra), t = rb * Math.PI * 2;
    const x = 120 + 78 * u * Math.cos(t), y = 115 + 12 * u * Math.sin(t);
    const r = 1.2 + ((i * 37) % 10) / 10 * 2.2;
    const delay = (0.6 + (i / 22) * 2.4).toFixed(2);
    out += `<circle class="bub" style="--pd:${delay}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}"/>`;
  }
  g.innerHTML = out;
}

function runLoader() {
  const loader = $('#loader');
  const label = $('#loader-text');
  if (!loader) { document.body.classList.remove('is-loading'); return; }

  const steps = ['ngayak bubuk matcha', 'tuang air hangat', 'diaduk sampe berbusa', 'hampir jadi'];
  const total = reduceMotion ? 700 : CONFIG.loaderMs;
  let i = 0, finished = false;
  const tick = setInterval(() => {
    i = Math.min(i + 1, steps.length - 1);
    label.textContent = steps[i];
  }, total / steps.length);

  const finish = () => {
    if (finished) return;
    finished = true;
    clearInterval(tick);
    label.textContent = 'jadi!';
    loader.classList.add('done');
    setTimeout(() => document.body.classList.remove('is-loading'), 250);
    setTimeout(() => { loader.hidden = true; }, 1100);
  };

  const minWait = new Promise(r => setTimeout(r, total));
  const pageReady = new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true }));
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready.catch(() => {}) : Promise.resolve();
  Promise.all([minWait, pageReady, fontsReady]).then(finish);
  setTimeout(finish, 9000); // jaga-jaga kalo ada yang nyangkut
}

/* =========================================================
   buket + catatan
   ========================================================= */

function setupBouquet() {
  const svg = $('#bouquet');
  svg.innerHTML = buildBouquet();

  const note = $('#note');
  const tilts = [-1.4, .9, -.6, 1.3, -1, .7, -1.2];
  const narrow = matchMedia('(max-width: 1100px)');
  const flowers = $$('.flower', svg);

  function select(i) {
    const m = MOMENTS[i];
    if (!m) return;
    flowers.forEach(f => f.classList.toggle('on', +f.dataset.m === i));
    note.classList.remove('empty', 'open');
    note.style.setProperty('--tilt', tilts[i % tilts.length] + 'deg');
    $('.note-kapan', note).textContent = m.kapan;
    $('.note-judul', note).textContent = m.judul;
    $('.note-teks', note).textContent = m.teks;
    void note.offsetWidth; // restart animasi kertas
    note.classList.add('open');
    if (narrow.matches) note.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  flowers.forEach(f => {
    f.addEventListener('click', () => select(+f.dataset.m));
    f.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(+f.dataset.m); }
    });
  });
}

/* =========================================================
   timeline satu hari
   ========================================================= */

function setupDay() {
  const ol = $('#hari-list');
  ol.innerHTML = HARI_BIASA.map(h =>
    `<li><span class="jam">${esc(h.jam)}</span><p>${esc(h.teks)}</p></li>`).join('');
  const items = $$('li', ol);

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(li => li.classList.add('lit'));
    ol.style.setProperty('--grow', 1);
    return;
  }

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('lit'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -30% 0px' });
  items.forEach(li => io.observe(li));

  let ticking = false;
  const update = () => {
    const r = ol.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .7 - r.top) / r.height));
    ol.style.setProperty('--grow', p.toFixed(3));
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
}

/* =========================================================
   foto: lazy load, baru dimuat pas hampir kelihatan
   ========================================================= */

function iconSvg(type) {
  const head = type === 'lily' ? lilyHead(COLORS.lily.cream) : tulipHead(COLORS.tulip.pink);
  const vb = type === 'lily' ? '-70 -64 140 128' : '-44 -90 88 100';
  return `<svg viewBox="${vb}" aria-hidden="true">${head}</svg>`;
}

function setupPhotos() {
  const wrap = $('#foto-list');
  const tilts = [-2.5, 1.8, -1.2, 2.6];
  wrap.innerHTML = ALBUM.map((s, i) => `
    <figure class="strip c-${esc(s.warna || 'putih')}" style="--tilt:${tilts[i % tilts.length]}deg">
      <div class="strip-frames">
        ${[0, 1, 2].map(n => {
          const src = (s.foto || [])[n];
          return `<div class="shot${src ? '' : ' kosong'}">${src
            ? `<img data-src="${esc(src)}" alt="${esc(s.judul)} (foto ${n + 1} dari 3)" loading="lazy" decoding="async">`
            : iconSvg((i + n) % 2 ? 'lily' : 'tulip')}</div>`;
        }).join('')}
      </div>
      <figcaption>
        <span class="strip-judul">${esc(s.judul)}</span>
        ${s.tanggal ? `<span class="strip-tgl">${esc(s.tanggal)}</span>` : ''}
      </figcaption>
    </figure>`).join('');

  const imgs = $$('img[data-src]', wrap);
  const load = img => {
    const box = img.closest('.shot');
    img.addEventListener('load', () => box.classList.add('ready'), { once: true });
    img.addEventListener('error', () => box.classList.add('kosong'), { once: true });
    img.src = img.dataset.src;
  };
  if (!('IntersectionObserver' in window)) { imgs.forEach(load); return; }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { load(e.target); io.unobserve(e.target); }
  }), { rootMargin: '240px' });
  imgs.forEach(img => io.observe(img));
}

/* =========================================================
   surat, counter, ikon
   ========================================================= */

function setupLetter() {
  $('#surat').innerHTML = SURAT.map(p => `<p>${esc(p.replace('{buat}', CONFIG.buat))}</p>`).join('');
  $('#ttd').textContent = '- ' + CONFIG.dari;
  $$('[data-icon]').forEach(svg => {
    const head = svg.dataset.icon === 'lily' ? lilyHead(COLORS.lily.blush) : tulipHead(COLORS.tulip.butter);
    svg.innerHTML = head;
  });
}

function setupCounter() {
  const n = daysSince(CONFIG.mulai);
  if (n === null) { $$('[data-needs-days]').forEach(el => el.remove()); return; }
  const text = new Intl.NumberFormat('id-ID').format(n);
  $$('[data-days]').forEach(el => { el.textContent = text; });
}

/* =========================================================
   hitung hari: count up dari CONFIG.hitungDari, jalan terus
   ========================================================= */

function elapsed(from, now) {
  let y = now.getFullYear() - from.getFullYear();
  let mo = now.getMonth() - from.getMonth();
  let d = now.getDate() - from.getDate();
  let h = now.getHours() - from.getHours();
  let mi = now.getMinutes() - from.getMinutes();
  let s = now.getSeconds() - from.getSeconds();
  if (s < 0) { s += 60; mi--; }
  if (mi < 0) { mi += 60; h--; }
  if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); mo--; }
  if (mo < 0) { mo += 12; y--; }
  return { y, mo, d, h, mi, s };
}

function setupCountUp() {
  const from = new Date(CONFIG.hitungDari);
  if (isNaN(from)) return;
  const pad = n => String(n).padStart(2, '0');
  const fmt = new Intl.NumberFormat('id-ID');
  $('#count-tanggal').textContent = from.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).toLowerCase();
  const set = (id, v) => { const el = $('#' + id); if (el && el.textContent !== v) el.textContent = v; };

  function tick() {
    const now = new Date();
    if (now < from) { ['y', 'mo', 'd'].forEach(k => set('c-' + k, '0')); ['h', 'mi', 's'].forEach(k => set('c-' + k, '00')); set('count-total', '0'); return; }
    const e = elapsed(from, now);
    set('count-total', fmt.format(Math.floor((now - from) / 86400000)));
    set('c-y', String(e.y)); set('c-mo', String(e.mo)); set('c-d', String(e.d));
    set('c-h', pad(e.h)); set('c-mi', pad(e.mi)); set('c-s', pad(e.s));
  }
  tick();
  setInterval(tick, 1000);
}

/* =========================================================
   navigasi sidebar: tiap menu = satu halaman (pakai hash #/nama)
   ========================================================= */

function setupNav() {
  const views = $$('.view');
  const links = $$('[data-nav]');
  const ids = views.map(v => v.dataset.view);
  const menuBtn = $('#menu-btn');
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
  };

  function show() {
    let id = location.hash.replace(/^#\/?/, '') || 'home';
    if (!ids.includes(id)) id = 'home';
    views.forEach(v => { v.hidden = v.dataset.view !== id; });
    links.forEach(a => {
      if (a.dataset.nav === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    scrollTo(0, 0);
    setMenu(false);
    dispatchEvent(new Event('resize')); // biar timeline ngitung ulang posisinya
  }

  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $('#scrim').addEventListener('click', () => setMenu(false));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('hashchange', show);
  show();
}

/* =========================================================
   start
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  $('#buat').textContent = CONFIG.buat;
  $$('[data-buat]').forEach(el => { el.textContent = CONFIG.buat; });
  buildFoam();
  setupCounter();
  setupBouquet();
  setupDay();
  setupPhotos();
  setupLetter();
  setupCountUp();
  setupNav();
  runLoader();
});
