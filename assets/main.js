/* ═══════════════════════════════════════════════
   YUMIYA CANDLE — interactions
   ═══════════════════════════════════════════════ */

/* ── Données faciles à modifier ── */
const SHOP = {
  productName: 'Bougie Gourmande Love',
  prices: { petite: 8.90, grande: 10.90 },
  sizes: { petite: 'Petite · 90 g · ~20 h', grande: 'Grande · 180 g · ~30 h' },
  image: 'assets/candle-portrait.jpg',
};
const REVIEWS = [
  ['Une bougie qui sent divinement bon. Packaging soigné et livraison rapide !', 'Camille B., Lausanne'],
  ['Parfaite comme cadeau. Ma moitié a adoré la senteur rose-vanille. Vivement Pâques !', 'Sarah M., Genève'],
  ["J'ai commandé une bougie personnalisée pour mon mariage. Le résultat était magique !", 'Laura T., Fribourg'],
];
const FORM_KEY = '3ae3d42d-7e3b-450e-944d-4706453eb23f'; // clé Web3Forms (envoi des demandes par email)
const FALLBACK_EMAIL = 'joe.moine@esclaneuveville.ch';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ramp = (p, a, b) => clamp((p - a) / (b - a));
const ease = t => 1 - Math.pow(1 - t, 3);
const easeIO = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const chf = n => n.toFixed(2) + ' CHF';
const uid = () => Math.random().toString(36).slice(2, 8);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

/* ═══════════════════════════════════════════════
   FLAMME (écran d'ouverture + bougie du hero)
   ═══════════════════════════════════════════════ */
function flameSVG() {
  const id = 'f' + uid();
  return `<svg viewBox="0 0 26 44" aria-hidden="true"><defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a3d"/><stop offset=".45" stop-color="#ffad4a"/><stop offset=".85" stop-color="#fff1c1"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>
    <g class="flame"><path d="M13 0C21 14 26 25 22 34C19 41 7 41 4 34C0 25 5 14 13 0Z" fill="url(#${id})"/>
    <path d="M13 20C16 26 17 31 15.5 35C14.5 37.5 11.5 37.5 10.5 35C9 31 10 26 13 20Z" fill="#fffbe8" opacity=".92"/></g></svg>`;
}
$$('[data-flame-svg]').forEach(el => { el.innerHTML = flameSVG(); });

/* ═══════════════════════════════════════════════
   LA BOUGIE EN SVG — dessinée calque par calque
   ═══════════════════════════════════════════════ */
const PALETTES = {
  love:   { wax: '#fbf3ec', waxShade: '#dcc6b6', band: '#d9333f', bandTop: '#ef5b63', bandShade: '#8e1824', cream: '#fffaf5', creamShade: '#e3cfc0', heart: '#e0303f', heartHi: '#ff9aa0', glass: 'rgba(255,255,255,.55)' },
  paques: { wax: '#fbf6ea', waxShade: '#e2d6bc', band: '#f0c24a', bandTop: '#f7d877', bandShade: '#b88520', cream: '#fffdf6', creamShade: '#e6dcc6', heart: '#8cc276', heartHi: '#d2f0c4', glass: 'rgba(18,7,9,.28)' },
  custom: { wax: '#f6d9de', waxShade: '#cf9fa9', band: '#d2a86a', bandTop: '#e6c48e', bandShade: '#8e6630', cream: '#fff8f4', creamShade: '#e6cfc6', heart: '#f6c9d1', heartHi: '#fff', glass: 'rgba(255,255,255,.5)' },
};

function defs(id, c) {
  return `<defs>
    <linearGradient id="${id}-wax" x1="0" x2="1"><stop offset="0" stop-color="${c.waxShade}"/><stop offset=".22" stop-color="${c.wax}"/><stop offset=".6" stop-color="${c.wax}"/><stop offset="1" stop-color="${c.waxShade}"/></linearGradient>
    <linearGradient id="${id}-band" x1="0" x2="1"><stop offset="0" stop-color="${c.bandShade}"/><stop offset=".25" stop-color="${c.band}"/><stop offset=".62" stop-color="${c.band}"/><stop offset="1" stop-color="${c.bandShade}"/></linearGradient>
    <radialGradient id="${id}-cream" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="${c.cream}"/><stop offset="1" stop-color="${c.creamShade}"/></radialGradient>
    <linearGradient id="${id}-glass" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".12" stop-color="#fff" stop-opacity=".06"/><stop offset=".5" stop-color="#fff" stop-opacity=".02"/><stop offset=".88" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".22"/></linearGradient>
    <linearGradient id="${id}-flame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a3d"/><stop offset=".45" stop-color="#ffad4a"/><stop offset=".85" stop-color="#fff1c1"/><stop offset="1" stop-color="#fff"/></linearGradient>
    <radialGradient id="${id}-glow"><stop offset="0" stop-color="#ffc06e" stop-opacity=".6"/><stop offset=".4" stop-color="#ff8a5c" stop-opacity=".18"/><stop offset="1" stop-color="#ff8a5c" stop-opacity="0"/></radialGradient>
    <filter id="${id}-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="${id}-grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .45  0 0 0 0 .4  0 0 0 .22 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  </defs>`;
}
const HEART = 'M0 -4C-3 -11 -14 -10 -14 -1C-14 7 -4 12 0 17C4 12 14 7 14 -1C14 -10 3 -11 0 -4Z';
// Géométrie calquée sur la vraie bougie : verre légèrement évasé, rebord à y=336, fond à y=534
const WAX_SHAPE = 'M114 449L118.5 508Q120 528 142 528H258Q280 528 281.5 508L286 449Z';
const PARTS = {
  wax: (id, c) => `<path d="${WAX_SHAPE}" fill="url(#${id}-wax)"/>
    <path d="${WAX_SHAPE}" fill="#000" filter="url(#${id}-grain)"/>
    <path d="M124 478q38 4 76 0t78 2M126 504q40 4 74 0t72 2" fill="none" stroke="${c.waxShade}" stroke-width="1.2" opacity=".45"/>
    <ellipse cx="200" cy="449" rx="86" ry="10" fill="${c.wax}"/>`,
  band: (id, c) => `<path d="M111.5 414L114 449A86 10 0 0 0 286 449L288.5 414Z" fill="url(#${id}-band)"/>
    <path d="M111.5 414Q126 406 142 414T176 412T210 415T246 411T276 414T288.5 413Q246 427 200 425T111.5 414Z" fill="${c.bandTop}"/>
    <rect x="122" y="422" width="7" height="22" rx="3.5" fill="#fff" opacity=".18"/>`,
  wick: () => `<rect x="208" y="220" width="4" height="92" rx="2" fill="#efe6d8"/><rect x="208" y="220" width="4" height="8" rx="2" fill="#3a2a22"/>`,
  flame: id => `<g data-flame transform="translate(10 92)"><circle cx="200" cy="112" r="95" fill="url(#${id}-glow)"/>
    <g class="flame"><path d="M200 66C213 92 220 110 213 128C208 141 192 141 187 128C180 110 187 92 200 66Z" fill="url(#${id}-flame)"/>
    <path d="M200 102C205 113 207 123 204 131C202 136 198 136 196 131C193 123 195 113 200 102Z" fill="#fffbe8" opacity=".9"/></g></g>`,
  topping: (id, c) => {
    // crème dans le verre + couronne pochée au-dessus du rebord
    let s = `<path d="M106 336L111.5 414A88.5 10 0 0 0 288.5 414L294 336Z" fill="url(#${id}-cream)"/>
      <path d="M118 360q20 10 40 0t40 0t40 0t42 0M114 388q22 9 44 0t42 0t44 0t42 0" fill="none" stroke="${c.creamShade}" stroke-width="1.6" opacity=".7"/>
      <ellipse cx="200" cy="336" rx="94" ry="12" fill="${c.creamShade}"/>`;
    const tiers = [[[134, 324], [167, 326], [200, 323], [233, 326], [266, 324], 22], [[158, 302], [186, 300], [214, 302], [242, 300], 21], [[180, 280], [204, 278], [228, 281], 18], [[198, 262], [216, 263], 14]];
    tiers.forEach(t => {
      const r = t[t.length - 1];
      t.slice(0, -1).forEach(([x, y], i) => {
        s += `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}-cream)" stroke="${c.creamShade}" stroke-width="1.2"/>`;
        s += `<path d="M${x - r * .7} ${y + r * .15}Q${x} ${y - r * .55} ${x + r * .7} ${y + r * .15}" fill="none" stroke="${c.creamShade}" stroke-width="1.5" opacity=".8"/>`;
        s += `<path d="M${x - r * .45} ${y + r * .55}Q${x + (i % 2 ? 3 : -3)} ${y + r * .05} ${x + r * .45} ${y + r * .55}" fill="none" stroke="${c.creamShade}" stroke-width="1.2" opacity=".55"/>`;
        s += `<ellipse cx="${x - r * .32}" cy="${y - r * .38}" rx="${r * .22}" ry="${r * .12}" fill="#fff" opacity=".8"/>`;
      });
    });
    s += `<path d="M199 258C200 246 206 240 214 236C211 244 220 250 219 260Z" fill="url(#${id}-cream)" stroke="${c.creamShade}" stroke-width="1.2"/>`;
    s += `<g transform="translate(160 292) rotate(14)"><path d="${HEART}" fill="${c.heart}"/></g>`;
    return s;
  },
  heart: (id, c) => `<g transform="translate(216 322) rotate(-10) scale(1.5)"><path d="${HEART}" fill="${c.heart}"/><path d="${HEART}" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="1"/><ellipse cx="-7" cy="-3" rx="3.2" ry="2" fill="${c.heartHi}" opacity=".75" transform="rotate(-30 -7 -3)"/></g>`,
  glass: (id, c) => `<ellipse cx="200" cy="540" rx="104" ry="12" fill="#000" opacity=".45" filter="url(#${id}-soft)"/>
    <path d="M100 336L113 508Q115 534 142 534H258Q285 534 287 508L300 336" fill="url(#${id}-glass)" stroke="${c.glass}" stroke-width="2"/>
    <path d="M114.5 512Q116 530 142 530H258Q284 530 285.5 512L286 504Q244 518 200 518T114 504Z" fill="#fff" opacity=".1"/>
    <ellipse cx="200" cy="336" rx="100" ry="13" fill="none" stroke="${c.glass}" stroke-width="2.4"/>
    <path d="M102 338Q200 357 298 338" fill="none" stroke="#fff" stroke-width="1" opacity=".35"/>
    <path d="M112 352L120 498" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".2"/>
    <path d="M126 360L132 470" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".12"/>
    <path d="M286 356L279 486" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".14"/>`,
};

/** Bougie complète (cartes de la gamme) */
function candleSVG(palette = 'love', { lit = true } = {}) {
  const id = 'c' + uid();
  const c = PALETTES[palette];
  return `<svg viewBox="78 120 244 440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs(id, c)}
    ${PARTS.wax(id, c)}${PARTS.band(id, c)}${PARTS.wick(id, c)}${lit ? PARTS.flame(id, c) : ''}${PARTS.topping(id, c)}${PARTS.glass(id, c)}${PARTS.heart(id, c)}</svg>`;
}
$$('[data-candle]').forEach(el => { el.outerHTML = candleSVG(el.dataset.candle); });

/* ── Calques de la scène « couche par couche » */
const LAYERS = [
  // clé, décalage éclaté (unités SVG), centre du libellé, côté, titre, détail
  { key: 'wax',     dy: 24,   cy: 488, side: 'r', t: 'Cire de soja',      d: '100% végétale, zéro paraffine. Coulée à la main.' },
  { key: 'band',    dy: -20,  cy: 430, side: 'l', t: 'Couche fraise',     d: 'Rose · Fraise · Vanille chaude' },
  { key: 'wick',    dy: -150, cy: 245, side: 'r', t: 'Mèche coton',       d: 'Naturelle, pour une combustion propre et régulière.' },
  { key: 'topping', dy: -70,  cy: 300, side: 'r', t: 'Chantilly de cire', d: 'Fouettée et pochée à la main, comme en pâtisserie.' },
  { key: 'glass',   dy: 80,   cy: 536, side: 'l', t: 'Verre transparent', d: 'Réutilisable une fois ta bougie terminée.' },
  { key: 'heart',   dy: -110, cy: 326, side: 'l', t: 'Le petit cœur',     d: 'Décor en cire, posé à la main. Chaque bougie est unique.' },
];
const stage = $('#stage');
const lp = PALETTES.love;
LAYERS.forEach((L, i) => {
  const inner = L.key === 'wick' ? PARTS.wick('stk', lp) : PARTS[L.key]('stk', lp);
  stage.insertAdjacentHTML('beforeend', `<svg class="layer" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${i === 0 ? defs('stk', lp) : ''}${inner}</svg>`);
  L.el = stage.lastElementChild;
});
const labelOrder = [...LAYERS].sort((a, b) => (a.cy + a.dy) - (b.cy + b.dy));
labelOrder.forEach((L, i) => {
  $('#labels').insertAdjacentHTML('beforeend', `<div class="lbl ${L.side}"><i>${String(i + 1).padStart(2, '0')}</i><b>${L.t}</b><small>${L.d}</small></div>`);
  L.lbl = $('#labels').lastElementChild;
  L.order = i;
});

/* ── Hero : le mot géant lettre par lettre + cœurs flottants */
const heroWord = $('#hero-word');
heroWord.innerHTML = [...heroWord.textContent].map((ch, i) =>
  `<span class="hw" aria-hidden="true"><span><span style="transition-delay:${.15 + i * .06}s">${ch}</span></span></span>`).join('');
const letters = $$('.hw', heroWord);

const HEARTS = [ // x %, y %, taille (vmin), rotation, profondeur, opacité
  [13, 24, 7, -20, 1.3, 1], [83, 20, 5.5, 24, .9, 1], [22, 68, 4.5, 14, 1.6, 1], [79, 63, 8, -12, 1.4, 1],
  [6, 47, 3.5, 38, .6, .55], [94, 43, 3.2, -34, .6, .55], [35, 13, 3, 10, .5, .5], [63, 82, 4, -25, 1.1, .9],
];
$('#hearts').innerHTML = HEARTS.map(([x, y, s, r, , o], i) =>
  `<div class="heart" style="left:${x}%;top:${y}%;width:${s}vmin;--r:${r}deg;--o:${o};${o < 1 ? 'filter:blur(1.5px);' : ''}"><img src="assets/heart.webp" alt="" style="transition-delay:${.5 + i * .07}s"/></div>`).join('');
const heartEls = $$('.heart');

/* ── Manifeste : un mot à la fois */
const words = [];
(function splitManifest() {
  const p = $('#manifest-text');
  const out = [];
  p.childNodes.forEach(n => {
    const hl = n.nodeType === 1;
    n.textContent.split(/(\s+)/).forEach(w => {
      if (!w.trim()) { out.push(w); return; }
      out.push(`<span class="w${hl ? ' hl' : ''}">${w}</span>`);
    });
  });
  p.innerHTML = out.join('');
  words.push(...$$('.w', p));
})();

/* ── Titres : apparition ligne par ligne */
$$('.lines').forEach(h => {
  h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map(l => `<span class="ln"><span>${l}</span></span>`).join('');
});

/* ═══════════════════════════════════════════════
   SCÈNES AU SCROLL (valeurs lissées pour un rendu fluide)
   ═══════════════════════════════════════════════ */
const els = {
  nav: $('#nav'), warm: $('#hero-warm'), candle: $('#hero-candle'), flame: $('#hero-flame'), glow: $('#hero-glow'),
  script: $('#hero-script'), bottom: $('#hero-bottom'), sideL: $('#side-l'), sideR: $('#side-r'), hint: $('#scroll-hint'),
  stackHead: $('#stack-head'), stackEnd: $('#stack-end'), photo: $('#stage-photo'), progress: $$('#progress span'),
  lid: $('#box-lid'), tissue: $('#box-tissue'), boxCandle: $('#box-candle-in'), steps: $$('.box-step'),
};
const lightSections = $$('[data-nav="light"]');
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
if (finePointer && !reduced) addEventListener('mousemove', e => { mouse.tx = e.clientX / innerWidth * 2 - 1; mouse.ty = e.clientY / innerHeight * 2 - 1; }, { passive: true });

const RENDER = {
  hero(p) {
    const a = easeIO(ramp(p, 0, .42));
    const mx = mouse.x, my = mouse.y;
    // le mot géant s'écarte
    letters.forEach((l, i) => {
      const k = i - (letters.length - 1) / 2;
      l.style.transform = `translate(${k * a * 9 + mx * -1.2}vw, ${my * -1}vh)`;
      l.style.opacity = (1 - a * .78) * (1 - ease(ramp(p, .48, .7)) * .7);
    });
    // la bougie avance
    const s = 1 + a * .14;
    els.candle.style.transform = `translateX(-50%) translate(${mx * 1.2}vw, ${-a * 3 + my * .8}vh) scale(${s}) rotate(${mx * 1.5}deg)`;
    // les cœurs s'envolent
    heartEls.forEach((h, i) => {
      const [x, y, , , d] = HEARTS[i];
      const dx = (x - 50) / 50, dy = (y - 50) / 50;
      h.style.transform = `translate(${dx * a * 18 * d + mx * d * 2.2}vw, ${dy * a * 16 * d - a * 10 * d + my * d * 2}vh) rotate(${a * 40 * (i % 2 ? 1 : -1)}deg)`;
    });
    const fade = 1 - ramp(p, .02, .16);
    els.script.style.opacity = fade; els.script.style.transform = `translateY(${(1 - fade) * 40}px)`;
    els.bottom.style.opacity = fade; els.bottom.style.pointerEvents = fade < .2 ? 'none' : '';
    els.hint.style.opacity = fade * .6;
    // la mèche s'allume
    const f = ease(ramp(p, .3, .46));
    els.flame.style.opacity = f;
    els.flame.style.transform = `translate(-50%,-100%) scaleY(${f})`;
    els.glow.style.opacity = f;
    els.warm.style.opacity = f;
    // les textes de côté
    const t = ease(ramp(p, .5, .72));
    els.sideL.style.opacity = t; els.sideL.style.transform = `translateY(-50%) translateX(${(1 - t) * -50}px)`;
    els.sideR.style.opacity = ease(ramp(p, .58, .8)); els.sideR.style.transform = `translateY(-50%) translateX(${(1 - ease(ramp(p, .58, .8))) * 50}px)`;
    if (innerWidth <= 640) { els.sideL.style.transform = els.sideR.style.transform = 'none'; }
  },
  manifest(p) {
    const n = Math.round(ramp(p, .08, .85) * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
  },
  stack(p) {
    // photo → schéma → éclaté → reformé → photo
    const e = p < .6 ? easeIO(ramp(p, .12, .42)) : 1 - easeIO(ramp(p, .6, .78));
    const photo = p < .5 ? 1 - ramp(p, .03, .11) : ramp(p, .79, .87);
    els.photo.style.opacity = photo;
    els.photo.style.transform = `scale(${1 + (1 - photo) * .04})`;
    const scale = stage.clientHeight / 600;
    const oneSide = innerWidth <= 640; // sur téléphone, tous les libellés à droite, espacés
    let prev = -Infinity;
    labelOrder.forEach(L => {
      L.el.style.opacity = 1 - photo;
      L.el.style.transform = `translateY(${L.dy * e * scale}px)`;
      let y = (L.cy + L.dy * e) * scale;
      if (oneSide) { y = Math.max(y, prev + 46); prev = y; }
      L.lbl.style.transform = `translateY(calc(${y}px - .62em))`;
      L.lbl.classList.toggle('on', e > .55 + L.order * .07);
    });
    els.progress.forEach((s, i) => s.style.setProperty('--f', clamp((e - .55 - i * .07) / .07)));
    els.stackHead.style.opacity = Math.min(1 - ramp(e, .25, .55), 1 - ramp(p, .8, .85));
    const end = ease(ramp(p, .86, .94));
    els.stackEnd.style.opacity = end;
    els.stackEnd.style.transform = `translateY(${(1 - end) * 30}px)`;
  },
  box(p) {
    const t1 = easeIO(ramp(p, .12, .4));
    els.lid.style.transform = `translate(${58 * t1}%, ${-90 * t1}%) rotate(${28 * t1}deg)`;
    els.tissue.style.opacity = ramp(p, .3, .42);
    const t2 = ease(ramp(p, .38, .72));
    const rise = innerWidth > 1000 ? 26 : 12;
    els.boxCandle.style.transform = `translateY(${(1 - t2) * 100 - t2 * rise}%)`;
    els.steps.forEach((s, i) => s.classList.toggle('on', p > [.05, .4, .7][i]));
  },
};

const scenes = $$('[data-scene]').map(el => ({ el, name: el.dataset.scene, cur: 0, target: 0 }));
const STATIC = { hero: 0, manifest: 1, stack: .5, box: 1 };
function progressOf(el) {
  const r = el.getBoundingClientRect();
  const total = r.height - innerHeight;
  return total > 0 ? clamp(-r.top / total) : 0;
}
function measure() {
  scenes.forEach(s => { s.target = reduced ? STATIC[s.name] : progressOf(s.el); });
  els.nav.classList.toggle('scrolled', scrollY > 30);
  els.nav.classList.toggle('light', lightSections.some(s => { const r = s.getBoundingClientRect(); return r.top <= 40 && r.bottom > 40; }));
}
let running = false;
function frame() {
  let moving = false;
  mouse.x = lerp(mouse.x, mouse.tx, .08); mouse.y = lerp(mouse.y, mouse.ty, .08);
  if (Math.abs(mouse.x - mouse.tx) + Math.abs(mouse.y - mouse.ty) > .002) moving = true;
  scenes.forEach(s => {
    const d = s.target - s.cur;
    s.cur = Math.abs(d) < .0004 ? s.target : s.cur + d * .14;
    if (s.cur !== s.target) moving = true;
    const r = s.el.getBoundingClientRect();
    if (r.bottom < -50 || r.top > innerHeight + 50) return;
    RENDER[s.name](s.cur);
  });
  if (moving) requestAnimationFrame(frame); else running = false;
}
function kick() { measure(); if (!running) { running = true; requestAnimationFrame(frame); } }
if (reduced) $$('.scene').forEach(s => { s.style.height = 'auto'; $('.scene-sticky', s).style.position = 'relative'; });
addEventListener('scroll', kick, { passive: true });
addEventListener('resize', kick);
addEventListener('mousemove', () => { if (!running) { running = true; requestAnimationFrame(frame); } }, { passive: true });
measure();
scenes.forEach(s => { s.cur = s.target; RENDER[s.name](s.cur); });

/* ── Apparitions */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target;
  const delay = el.classList.contains('card') ? [...el.parentNode.children].indexOf(el) * 120 : 0;
  setTimeout(() => el.classList.add('in'), delay);
  io.unobserve(el);
}), { threshold: .15 });
$$('.rv, .card, .lines').forEach(el => io.observe(el));

/* ── Écran d'ouverture */
(function intro() {
  const loader = $('#loader'), bar = $('#loader-bar');
  document.body.classList.add('locked');
  const t0 = performance.now();
  const img = new Image(); img.src = 'assets/candle-cutout.webp';
  const waits = [img.decode().catch(() => {}), document.fonts ? document.fonts.ready : Promise.resolve()];
  let done = 0;
  waits.forEach(w => w.then(() => { done++; bar.style.transform = `scaleX(${done / waits.length})`; }));
  const finish = () => {
    bar.style.transform = 'scaleX(1)';
    const wait = Math.max(0, (reduced ? 0 : 900) - (performance.now() - t0));
    setTimeout(() => {
      loader.classList.add('done');
      document.body.classList.remove('locked');
      setTimeout(() => document.body.classList.add('ready'), 250);
      setTimeout(() => loader.remove(), 1200);
    }, wait);
  };
  Promise.race([Promise.all(waits), new Promise(r => setTimeout(r, 2500))]).then(finish);
})();

/* ── Avis (défilement infini) */
$('#reviews-track').innerHTML = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS].map(([q, n]) =>
  `<figure class="review"><div class="stars" aria-label="5 étoiles">★★★★★</div><q>${q}</q><span>— ${n}</span></figure>`).join('');
$('#year').textContent = new Date().getFullYear();

/* ── Menu mobile */
const burger = $('#burger'), drawer = $('#drawer');
function toggleMenu(on) {
  burger.classList.toggle('x', on); drawer.classList.toggle('on', on);
  document.body.classList.toggle('menu', on); document.body.classList.toggle('locked', on);
}
burger.addEventListener('click', () => toggleMenu(!drawer.classList.contains('on')));
$$('a', drawer).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

/* ── Galerie produit */
const mainImg = $('#main-photo img');
$$('#thumbs button').forEach(b => b.addEventListener('click', () => {
  if (b.classList.contains('on')) return;
  $$('#thumbs button').forEach(x => x.classList.toggle('on', x === b));
  mainImg.classList.add('out');
  setTimeout(() => { mainImg.src = b.dataset.src; mainImg.onload = () => mainImg.classList.remove('out'); }, 250);
}));

/* ═══════════════════════════════════════════════
   BOUTIQUE : taille, panier, commande
   ═══════════════════════════════════════════════ */
let size = 'petite';
$$('[data-price]').forEach(el => { el.textContent = chf(SHOP.prices[el.dataset.price]); });
$('#cf-size').innerHTML = Object.keys(SHOP.prices).map(k => `<option>${SHOP.sizes[k]} · ${chf(SHOP.prices[k])}</option>`).join('');
function showPrice() { $('#price-big').innerHTML = `${SHOP.prices[size].toFixed(2)}<small>CHF</small>`; }
$$('.size').forEach(b => b.addEventListener('click', () => {
  size = b.dataset.size;
  $$('.size').forEach(x => x.classList.toggle('on', x === b));
  showPrice();
}));
showPrice();

let cart = [];
try { cart = JSON.parse(localStorage.getItem('yumiya_cart') || '[]'); } catch (_) { cart = []; }
const saveCart = () => { try { localStorage.setItem('yumiya_cart', JSON.stringify(cart)); } catch (_) {} };
const cartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);

function renderCart() {
  const n = cart.reduce((s, i) => s + i.qty, 0);
  $('#cart-count').textContent = n;
  $('#cart-ft').classList.toggle('on', cart.length > 0);
  $('#cart-total').textContent = chf(cartTotal());
  $('#cart-body').innerHTML = cart.length ? cart.map((it, i) => `
    <div class="cart-item">
      <img src="${SHOP.image}" alt=""/>
      <div><strong>${it.name}</strong><small>${SHOP.sizes[it.size]}</small>
        <div class="qty"><button data-q="${i}" data-d="-1" aria-label="Moins">−</button><span>${it.qty}</span><button data-q="${i}" data-d="1" aria-label="Plus">+</button></div></div>
      <div><div class="p">${chf(it.price * it.qty)}</div><button class="rm" data-rm="${i}">Retirer</button></div>
    </div>`).join('') : `<div class="cart-empty"><img src="assets/candle-cutout.webp" alt=""/><p>Ton panier est vide.</p><a href="#produit" class="btn btn-ghost" data-close>Voir la bougie</a></div>`;
  saveCart();
}
$('#cart-body').addEventListener('click', e => {
  const q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]');
  if (q) { const it = cart[+q.dataset.q]; it.qty += +q.dataset.d; if (it.qty <= 0) cart.splice(+q.dataset.q, 1); renderCart(); }
  if (rm) { cart.splice(+rm.dataset.rm, 1); renderCart(); }
});
function addToCart() {
  const ex = cart.find(i => i.size === size);
  if (ex) ex.qty++; else cart.push({ name: SHOP.productName, size, price: SHOP.prices[size], qty: 1 });
  renderCart();
  const c = $('#cart-count'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
  toast(`${SHOP.productName} (${size}) ajoutée au panier`);
}
$('#add-cart').addEventListener('click', addToCart);
$('#buy-now').addEventListener('click', () => { if (!cart.length) addToCart(); openPanel('order'); });
renderCart();

/* ── Ouverture / fermeture panier & modales */
const overlay = $('#overlay');
function openPanel(what) {
  closeAll();
  if (what === 'cart') $('#cart').classList.add('on');
  if (what === 'order') { fillSummary(); resetForm('order'); $('#modal-order').classList.add('on'); }
  if (what === 'notify') { resetForm('notify'); $('#modal-notify').classList.add('on'); }
  overlay.classList.add('on');
  document.body.classList.add('locked');
}
function closeAll() {
  $$('.cart, .modal, .overlay').forEach(el => el.classList.remove('on'));
  document.body.classList.remove('locked');
}
$('#cart-open').addEventListener('click', () => openPanel('cart'));
document.addEventListener('click', e => {
  const o = e.target.closest('[data-open]');
  if (o) { e.preventDefault(); openPanel(o.dataset.open); }
  if (e.target.closest('[data-close]') || e.target === overlay || e.target.classList.contains('modal')) closeAll();
});
addEventListener('keydown', e => { if (e.key === 'Escape') { closeAll(); toggleMenu(false); } });

/* ── Liens d'ancre : défilement doux */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.getAttribute('href') === '#') return;
  const t = $(a.getAttribute('href'));
  if (!t) return;
  e.preventDefault();
  scrollTo({ top: t.getBoundingClientRect().top + scrollY - (t.id === 'top' ? 0 : 10), behavior: reduced ? 'auto' : 'smooth' });
});

function fillSummary() {
  $('#order-summary').innerHTML = cart.length
    ? cart.map(i => `<div><span>${i.name} · ${i.size} × ${i.qty}</span><span>${chf(i.price * i.qty)}</span></div>`).join('') + `<div class="tot"><span>Total estimé</span><span>${chf(cartTotal())}</span></div>`
    : '<div><span>Précise ta commande dans le message.</span></div>';
}

let toastT;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600);
}

/* ═══════════════════════════════════════════════
   FORMULAIRES → email via Web3Forms
   ═══════════════════════════════════════════════ */
function resetForm(name) {
  $(`#${name}-form`).hidden = false; $(`#${name}-success`).classList.remove('on');
}
function validate(form) {
  let ok = true;
  $$('[required]', form).forEach(inp => {
    const v = inp.value.trim();
    const bad = !v || (inp.type === 'email' && !/^\S+@\S+\.\S+$/.test(v));
    inp.closest('.field').classList.toggle('err', bad);
    if (bad) ok = false;
  });
  if (!ok) $('.err input, .err select, .err textarea', form)?.focus();
  return ok;
}
async function send(form, subject, extra = {}) {
  const data = new FormData(form);
  data.append('access_key', FORM_KEY);
  data.append('subject', subject);
  data.append('from_name', 'Yumiya Candle');
  const email = data.get('Email client');
  if (email) data.append('replyto', email);
  Object.entries(extra).forEach(([k, v]) => data.append(k, v));
  const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || 'error');
}
function wire(name, makeSubject, opts = {}) {
  const form = $(`#${name}-form`);
  form.addEventListener('input', e => e.target.closest('.field')?.classList.remove('err'));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate(form)) return;
    const btn = $('button[type=submit]', form), label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Envoi…';
    try {
      await send(form, makeSubject(form), opts.extra ? opts.extra() : {});
      form.reset(); form.hidden = true;
      $(`#${name}-success`).classList.add('on');
      opts.done && opts.done();
    } catch (_) {
      alert(`Oups, l'envoi n'a pas fonctionné. Réessaie ou écris-nous à ${FALLBACK_EMAIL}`);
    } finally {
      btn.disabled = false; btn.textContent = label;
    }
  });
}
const nameOf = f => $('[name="Nom"]', f)?.value.trim() || '';
wire('custom', f => `Demande sur mesure Yumiya Candle - ${nameOf(f)}`);
wire('contact', f => `Nouvelle commande Yumiya Candle - ${nameOf(f)}`, { done: () => { $('#cf-size-wrap').hidden = true; $('#cf-size').disabled = true; } });
wire('notify', () => 'Alerte collection Pâques - Yumiya Candle');
wire('order', f => `Nouvelle commande Yumiya Candle (Boutique) - ${nameOf(f)}`, {
  extra: () => ({ Articles: cart.length ? cart.map(i => `${i.name} (${i.size}) x${i.qty} - ${chf(i.price * i.qty)}`).join(' | ') + ` | Total : ${chf(cartTotal())}` : 'voir message' }),
  done: () => { cart = []; renderCart(); },
});
$('#cf-type').addEventListener('change', e => {
  const std = e.target.value.includes('St-Valentin');
  $('#cf-size-wrap').hidden = !std;
  $('#cf-size').disabled = !std;
});
