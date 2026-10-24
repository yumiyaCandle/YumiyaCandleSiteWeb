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
const chf = n => n.toFixed(2) + ' CHF';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════════════════════════════════════════
   LA BOUGIE EN SVG — dessinée calque par calque
   ═══════════════════════════════════════════════ */
const PALETTES = {
  love:   { wax: '#fbf3ec', waxShade: '#e4d2c4', band: '#d9333f', bandTop: '#ef5b63', bandShade: '#9e1b28', cream: '#fffaf5', creamShade: '#e7d6c9', heart: '#e0303f', heartHi: '#ff8a90', glass: 'rgba(255,255,255,.55)' },
  paques: { wax: '#fbf6ea', waxShade: '#e6dcc4', band: '#f0c24a', bandTop: '#f7d877', bandShade: '#c4922a', cream: '#fffdf6', creamShade: '#e8e0cc', heart: '#8cc276', heartHi: '#c4e6b4', glass: 'rgba(18,7,9,.28)' },
  custom: { wax: '#f6d9de', waxShade: '#d9b0b8', band: '#d2a86a', bandTop: '#e6c48e', bandShade: '#9c7438', cream: '#fff8f4', creamShade: '#e8d3cb', heart: '#f6c9d1', heartHi: '#fff', glass: 'rgba(255,255,255,.5)' },
};

function defs(id, c) {
  return `<defs>
    <linearGradient id="${id}-wax" x1="0" x2="1"><stop offset="0" stop-color="${c.waxShade}"/><stop offset=".28" stop-color="${c.wax}"/><stop offset=".72" stop-color="${c.wax}"/><stop offset="1" stop-color="${c.waxShade}"/></linearGradient>
    <linearGradient id="${id}-band" x1="0" x2="1"><stop offset="0" stop-color="${c.bandShade}"/><stop offset=".3" stop-color="${c.band}"/><stop offset=".72" stop-color="${c.band}"/><stop offset="1" stop-color="${c.bandShade}"/></linearGradient>
    <radialGradient id="${id}-cream" cx=".38" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${c.cream}"/><stop offset="1" stop-color="${c.creamShade}"/></radialGradient>
    <linearGradient id="${id}-glass" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".16" stop-color="#fff" stop-opacity=".05"/><stop offset=".84" stop-color="#fff" stop-opacity=".03"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
    <linearGradient id="${id}-flame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a3d"/><stop offset=".45" stop-color="#ffad4a"/><stop offset=".85" stop-color="#fff1c1"/><stop offset="1" stop-color="#fff"/></linearGradient>
    <radialGradient id="${id}-glow"><stop offset="0" stop-color="#ffc06e" stop-opacity=".6"/><stop offset=".4" stop-color="#ff8a5c" stop-opacity=".18"/><stop offset="1" stop-color="#ff8a5c" stop-opacity="0"/></radialGradient>
  </defs>`;
}
const HEART = 'M0 -4C-3 -11 -14 -10 -14 -1C-14 7 -4 12 0 17C4 12 14 7 14 -1C14 -10 3 -11 0 -4Z';
const PARTS = {
  wax: (id, c) => `<path d="M106 398V506Q106 527 127 527H273Q294 527 294 506V398Z" fill="url(#${id}-wax)"/>
    <ellipse cx="200" cy="398" rx="94" ry="11" fill="${c.wax}"/>`,
  band: (id, c) => `<path d="M106 340V398A94 11 0 0 0 294 398V340Z" fill="url(#${id}-band)"/>
    <ellipse cx="200" cy="340" rx="94" ry="11" fill="${c.bandTop}"/>
    <path d="M118 352q8 14 14 2q6 12 12 0" fill="none" stroke="${c.bandTop}" stroke-width="3" stroke-linecap="round" opacity=".5"/>`,
  wick: () => `<rect x="198" y="128" width="4" height="118" rx="2" fill="#efe6d8"/><rect x="198" y="128" width="4" height="10" rx="2" fill="#3a2a22"/>`,
  flame: id => `<g data-flame><circle cx="200" cy="112" r="95" fill="url(#${id}-glow)"/>
    <g class="flame"><path d="M200 66C213 92 220 110 213 128C208 141 192 141 187 128C180 110 187 92 200 66Z" fill="url(#${id}-flame)"/>
    <path d="M200 102C205 113 207 123 204 131C202 136 198 136 196 131C193 123 195 113 200 102Z" fill="#fffbe8" opacity=".9"/></g></g>`,
  topping: (id, c) => {
    const tiers = [[[128, 324], [164, 324], [200, 324], [236, 324], [272, 324], 26], [[146, 296], [182, 296], [218, 296], [254, 296], 26], [[164, 268], [200, 268], [236, 268], 24], [[182, 244], [218, 244], 21]];
    let s = `<path d="M104 322V344A96 12 0 0 0 296 344V322Z" fill="${c.creamShade}"/>`;
    tiers.forEach(t => { const r = t[t.length - 1]; t.slice(0, -1).forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}-cream)" stroke="${c.creamShade}" stroke-width="1.2"/>`; }); });
    s += `<path d="M186 238C188 214 200 204 210 200C206 210 214 222 214 236Z" fill="url(#${id}-cream)" stroke="${c.creamShade}" stroke-width="1.2"/>`;
    s += `<g transform="translate(146 266) rotate(14) scale(1.05)"><path d="${HEART}" fill="${c.heart}"/></g>`;
    return s;
  },
  heart: (id, c) => `<g transform="translate(224 228) rotate(-14) scale(1.6)"><path d="${HEART}" fill="${c.heart}"/><ellipse cx="-7" cy="-3" rx="3.2" ry="2" fill="${c.heartHi}" opacity=".7" transform="rotate(-30 -7 -3)"/></g>`,
  glass: (id, c) => `<path d="M100 222V506Q100 534 128 534H272Q300 534 300 506V222" fill="url(#${id}-glass)" stroke="${c.glass}" stroke-width="2"/>
    <ellipse cx="200" cy="222" rx="100" ry="14" fill="none" stroke="${c.glass}" stroke-width="2"/>
    <path d="M105 516Q106 529 128 529H272Q294 529 295 516" fill="none" stroke="${c.glass}" stroke-width="1.5" opacity=".6"/>
    <rect x="112" y="240" width="9" height="250" rx="4.5" fill="#fff" opacity=".2"/>
    <rect x="279" y="252" width="4" height="220" rx="2" fill="#fff" opacity=".13"/>`,
};

/** Bougie complète (cartes, coffret, panier) */
function candleSVG(palette = 'love', { lit = true } = {}) {
  const id = 'c' + Math.random().toString(36).slice(2, 8);
  const c = PALETTES[palette];
  return `<svg viewBox="70 20 260 530" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs(id, c)}
    ${PARTS.wax(id, c)}${PARTS.band(id, c)}${PARTS.wick(id, c)}${lit ? PARTS.flame(id, c) : ''}${PARTS.topping(id, c)}${PARTS.glass(id, c)}${PARTS.heart(id, c)}</svg>`;
}
$$('[data-candle]').forEach(el => { el.outerHTML = candleSVG(el.dataset.candle); });
$('#box-candle').innerHTML = `<div id="box-candle-in">${candleSVG('love')}</div>`;

/* ── Calques de la scène « couche par couche » */
const LAYERS = [
  // clé, décalage éclaté (unités SVG), centre du libellé, côté, titre, détail
  { key: 'wax',     dy: 26,   cy: 462, side: 'r', t: 'Cire de soja',        d: '100% végétale, zéro paraffine. Coulée à la main.' },
  { key: 'band',    dy: -30,  cy: 370, side: 'l', t: 'Couche fraise',       d: 'Rose · Fraise · Vanille chaude' },
  { key: 'wick',    dy: -190, cy: 100, side: 'r', t: 'Mèche coton',         d: 'Naturelle, pour une combustion propre et régulière.' },
  { key: 'topping', dy: -86,  cy: 290, side: 'r', t: 'Chantilly de cire',   d: 'Fouettée et pochée à la main, comme en pâtisserie.' },
  { key: 'glass',   dy: 96,   cy: 520, side: 'l', t: 'Verre transparent',   d: 'Réutilisable une fois ta bougie terminée.' },
  { key: 'heart',   dy: -140, cy: 228, side: 'l', t: 'Le petit cœur',       d: 'Décor en cire, posé à la main. Chaque bougie est unique.' },
];
const stage = $('#stage');
const sid = 'stk';
const lp = PALETTES.love;
LAYERS.forEach((L, i) => {
  const inner = L.key === 'wick' ? PARTS.wick(sid, lp) + PARTS.flame(sid, lp) : PARTS[L.key](sid, lp);
  stage.insertAdjacentHTML('beforeend', `<svg class="layer" data-layer="${L.key}" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${i === 0 ? defs(sid, lp) : ''}${inner}</svg>`);
  L.el = stage.lastElementChild;
});
// les libellés dans l'ordre visuel (haut → bas) pour l'apparition
const labelOrder = [...LAYERS].sort((a, b) => (a.cy + a.dy) - (b.cy + b.dy));
labelOrder.forEach((L, i) => {
  $('#labels').insertAdjacentHTML('beforeend', `<div class="lbl ${L.side}"><i>${String(i + 1).padStart(2, '0')}</i><b>${L.t}</b><small>${L.d}</small></div>`);
  L.lbl = $('#labels').lastElementChild;
  L.order = i;
});
const stackFlame = $('[data-flame]', stage);

/* ═══════════════════════════════════════════════
   SCÈNES AU SCROLL
   ═══════════════════════════════════════════════ */
const scenes = $$('[data-scene]').map(el => ({ el, name: el.dataset.scene }));
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

const els = {
  heroMedia: $('#hero-media'), heroImg: $('#hero-media img'), heroTitle: $('#hero-title'), heroAfter: $('#hero-after'),
  glow: $('#stack-glow'), stackEnd: $('#stack-end'), stackHead: $('.stack-head'), progress: $$('#progress span'),
  lid: $('#box-lid'), tissue: $('#box-tissue'), boxCandle: $('#box-candle-in'), steps: $$('.box-step'),
};

function progressOf(el) {
  const r = el.getBoundingClientRect();
  const total = r.height - innerHeight;
  return total > 0 ? clamp(-r.top / total) : 0;
}

const RENDER = {
  hero(p) {
    const t = easeIO(ramp(p, 0, .85));
    els.heroMedia.style.clipPath = `inset(${t * 12}% ${t * 20}% ${t * 12}% ${t * 20}% round ${t * 28}px)`;
    els.heroImg.style.transform = `scale(${1.14 - t * .14})`;
    els.heroTitle.style.opacity = 1 - ramp(p, .05, .4);
    els.heroTitle.style.transform = `translateY(${-ramp(p, 0, .4) * 90}px)`;
    const a = ramp(p, .45, .8);
    els.heroAfter.style.opacity = a;
    els.heroAfter.style.transform = `translateY(${(1 - ease(a)) * 40}px)`;
  },
  manifest(p) {
    const n = Math.round(ramp(p, .08, .85) * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
  },
  stack(p) {
    // éclate → tient → se reforme → s'allume
    const e = p < .62 ? easeIO(ramp(p, .06, .4)) : 1 - easeIO(ramp(p, .62, .8));
    const scale = stage.clientHeight / 600;
    LAYERS.forEach(L => {
      const y = L.dy * e * scale;
      L.el.style.transform = `translateY(${y}px)`;
      const topPx = (L.cy + L.dy * e) * scale;
      L.lbl.style.transform = `translateY(calc(${topPx}px - .62em))`;
      L.lbl.classList.toggle('on', e > .55 + L.order * .07);
    });
    els.progress.forEach((s, i) => s.style.setProperty('--f', clamp((e - .55 - i * .07) / .07)));
    const lit = ramp(p, .82, .9);
    stackFlame.style.opacity = lit;
    els.glow.style.opacity = lit;
    els.stackEnd.style.opacity = ramp(p, .86, .93);
    els.stackEnd.style.transform = `translateY(${(1 - ramp(p, .86, .93)) * 30}px)`;
    els.stackHead.style.opacity = Math.min(1 - ramp(e, .25, .55), 1 - ramp(p, .8, .84));
  },
  box(p) {
    const t1 = easeIO(ramp(p, .12, .4));
    els.lid.style.transform = `translate(${58 * t1}%, ${-90 * t1}%) rotate(${28 * t1}deg)`;
    els.tissue.style.opacity = ramp(p, .3, .42);
    const t2 = ease(ramp(p, .38, .72));
    const rise = innerWidth > 1000 ? 30 : 16;
    els.boxCandle.style.transform = `translateY(${(1 - t2) * 100 - t2 * rise}%)`;
    els.steps.forEach((s, i) => s.classList.toggle('on', p > [.05, .4, .7][i]));
  },
};

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    $('#nav').classList.toggle('scrolled', scrollY > 30);
    scenes.forEach(s => {
      const r = s.el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > innerHeight + 50) return;
      RENDER[s.name](reduced ? { hero: 0, manifest: 1, stack: .5, box: 1 }[s.name] : progressOf(s.el));
    });
  });
}
if (reduced) $$('.scene').forEach(s => { s.style.height = 'auto'; $('.scene-sticky', s).style.position = 'relative'; });
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
scenes.forEach(s => RENDER[s.name](reduced ? { hero: 0, manifest: 1, stack: .5, box: 1 }[s.name] : progressOf(s.el)));

/* ── Apparitions */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target;
  const delay = el.classList.contains('card') ? [...el.parentNode.children].indexOf(el) * 120 : 0;
  setTimeout(() => el.classList.add('in'), delay);
  io.unobserve(el);
}), { threshold: .15 });
$$('.rv, .card').forEach(el => io.observe(el));

/* ── Avis (défilement infini) */
$('#reviews-track').innerHTML = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS].map(([q, n]) =>
  `<figure class="review"><div class="stars" aria-label="5 étoiles">★★★★★</div><q>${q}</q><span>— ${n}</span></figure>`).join('');
$('#year').textContent = new Date().getFullYear();

/* ── Menu mobile */
const burger = $('#burger'), drawer = $('#drawer');
burger.addEventListener('click', () => { burger.classList.toggle('x'); drawer.classList.toggle('on'); });
$$('a', drawer).forEach(a => a.addEventListener('click', () => { burger.classList.remove('x'); drawer.classList.remove('on'); }));

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
    </div>`).join('') : `<div class="cart-empty">${candleSVG('love', { lit: false })}<p>Ton panier est vide.</p><a href="#produit" class="btn btn-ghost" data-close>Voir la bougie</a></div>`;
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
  document.body.style.overflow = 'hidden';
}
function closeAll() {
  $$('.cart, .modal, .overlay').forEach(el => el.classList.remove('on'));
  document.body.style.overflow = '';
}
$('#cart-open').addEventListener('click', () => openPanel('cart'));
document.addEventListener('click', e => {
  const o = e.target.closest('[data-open]');
  if (o) { e.preventDefault(); openPanel(o.dataset.open); }
  if (e.target.closest('[data-close]') || e.target === overlay || e.target.classList.contains('modal')) closeAll();
});
addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

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
  const f = $(`#${name}-form`); f.hidden = false; $(`#${name}-success`).classList.remove('on');
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
wire('contact', f => `Nouvelle commande Yumiya Candle - ${nameOf(f)}`);
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
$('#cf-size').disabled = true;
