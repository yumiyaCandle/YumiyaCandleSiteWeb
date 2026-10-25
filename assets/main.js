/* ═══════════════════════════════════════════════
   YUMIYA CANDLE — interactions & animations
   Animations : Motion (moteur de Framer Motion), embarqué dans assets/vendor/motion.js
   ═══════════════════════════════════════════════ */

/* ── Données faciles à modifier ── */
const SHOP = {
  productName: 'Bougie Gourmande Love',
  prices: { petite: 8.90, grande: 10.90 },
  sizes: { petite: 'Petite · 90 g · ~20 h', grande: 'Grande · 180 g · ~30 h' },
  image: 'assets/candle-portrait.jpg',
};
const REVIEWS = [
  ['Une bougie qui sent divinement bon. Packaging soigné et livraison rapide !', 'Camille B.', 'Lausanne'],
  ['Parfaite comme cadeau. Ma moitié a adoré la senteur rose-vanille. Vivement Pâques !', 'Sarah M.', 'Genève'],
  ["J'ai commandé une bougie personnalisée pour mon mariage. Le résultat était magique !", 'Laura T.', 'Fribourg'],
];
const FORM_KEY = '3ae3d42d-7e3b-450e-944d-4706453eb23f'; // clé Web3Forms (envoi des demandes par email)
const FALLBACK_EMAIL = 'joe.moine@esclaneuveville.ch';

/* ── Outils ── */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ramp = (p, a, b) => clamp((p - a) / (b - a));
const mix = (a, b, t) => a + (b - a) * t;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const backOut = t => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
const chf = n => n.toFixed(2) + ' CHF';
const root = document.documentElement;
const reduced = root.classList.contains('reduced');
const finePointer = matchMedia('(pointer: fine)').matches;
const M = window.Motion;
if (!M) root.classList.remove('js'); // sans Motion, tout s'affiche simplement
const SPRING = { type: 'spring', stiffness: 260, damping: 26 };
const SOFT = { type: 'spring', stiffness: 120, damping: 20 };
const EASE = [0.22, 1, 0.36, 1];
const anim = (el, kf, opts) => (M && !reduced ? M.animate(el, kf, opts) : (applyFinal(el, kf), { finished: Promise.resolve(), stop() {}, pause() {}, play() {} }));
function applyFinal(el, kf) {
  const els = typeof el === 'string' ? $$(el) : el instanceof Element ? [el] : [...el];
  els.forEach(e => Object.entries(kf).forEach(([k, v]) => {
    const val = Array.isArray(v) ? v[v.length - 1] : v;
    if (k === 'opacity') e.style.opacity = val;
    else if (!['x', 'y', 'scale', 'rotate', 'rotateX', 'rotateY'].includes(k)) e.style[k] = val;
  }));
}

/* ═══════════════════════════════════════════════
   FLAMME
   ═══════════════════════════════════════════════ */
let fid = 0;
function flameSVG() {
  const id = 'fl' + fid++;
  return `<svg viewBox="0 0 26 44" aria-hidden="true"><defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a3d"/><stop offset=".45" stop-color="#ffad4a"/><stop offset=".85" stop-color="#fff1c1"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>
    <g class="flame"><path d="M13 0C21 14 26 25 22 34C19 41 7 41 4 34C0 25 5 14 13 0Z" fill="url(#${id})"/>
    <path d="M13 20C16 26 17 31 15.5 35C14.5 37.5 11.5 37.5 10.5 35C9 31 10 26 13 20Z" fill="#fffbe8" opacity=".92"/></g></svg>`;
}
$$('[data-flame]').forEach(el => { el.innerHTML = flameSVG(); });
const HEART = '<svg viewBox="0 0 24 22"><path fill="currentColor" d="M12 21.6 10.3 20C4.2 14.5.2 10.9.2 6.4.2 2.8 3 0 6.6 0c2 0 4 1 5.4 2.5C13.4 1 15.4 0 17.4 0c3.6 0 6.4 2.8 6.4 6.4 0 4.5-4 8.1-10.1 13.6L12 21.6z"/></svg>';

/* ═══════════════════════════════════════════════
   DÉCOUPAGE DES TITRES EN MOTS
   ═══════════════════════════════════════════════ */
function splitWords(el) {
  const build = (src, dest) => {
    [...src.childNodes].forEach(node => {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { dest.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = part;
          w.appendChild(i); dest.appendChild(w);
        });
      } else if (node.nodeType === 1) {
        const clone = node.cloneNode(false);
        if (node.tagName === 'BR') { dest.appendChild(clone); return; }
        build(node, clone); dest.appendChild(clone);
      }
    });
  };
  const frag = document.createDocumentFragment();
  build(el, frag);
  el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
  el.textContent = ''; el.appendChild(frag);
  $$('.w', el).forEach(w => w.setAttribute('aria-hidden', 'true'));
  return $$('.w > span', el);
}
const heroWords = splitWords($('#hero-title'));
const splitHeads = $$('[data-split]').map(el => ({ el, words: splitWords(el) }));
if (M && !reduced) {
  heroWords.forEach(w => { w.style.transform = 'translateY(110%)'; });
  splitHeads.forEach(({ words }) => words.forEach(w => { w.style.transform = 'translateY(110%)'; }));
}

/* ═══════════════════════════════════════════════
   OUVERTURE + ARRIVÉE DU HERO
   ═══════════════════════════════════════════════ */
function heroIn() {
  anim(heroWords, { y: ['110%', '0%'] }, { ...SPRING, stiffness: 140, damping: 20, delay: M ? M.stagger(0.06) : 0 });
  anim('[data-hero-in]', { opacity: [0, 1], y: [24, 0] }, { duration: 0.9, ease: EASE, delay: M ? M.stagger(0.09, { startDelay: 0.25 }) : 0 });
  anim('.plate', { scale: [0.6, 1], opacity: [0, 1] }, { ...SOFT, delay: 0.05 });
  anim('#hero-candle', { y: [80, 0], opacity: [0, 1] }, { ...SOFT, delay: 0.15 });
  anim('.badge-ring', { opacity: [0, 1] }, { duration: 1.2, delay: 0.5 });
}
const intro = $('#intro');
if (intro && M && !reduced) {
  const done = () => { intro.remove(); };
  const safety = setTimeout(() => { done(); heroIn(); }, 3500);
  (async () => {
    await M.animate('.intro-flame', { scale: [0, 1], opacity: [0, 1] }, { type: 'spring', stiffness: 200, damping: 12 }).finished;
    await M.animate('.intro-word > *', { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, ease: EASE, delay: M.stagger(0.08) }).finished;
    await new Promise(r => setTimeout(r, 250));
    clearTimeout(safety);
    heroIn();
    await M.animate(intro, { clipPath: ['inset(0 0 0% 0)', 'inset(0 0 100% 0)'] }, { duration: 0.9, ease: [0.76, 0, 0.24, 1] }).finished;
    done();
  })();
} else {
  intro && intro.remove();
  heroIn();
}

/* Cœurs flottants autour de la bougie */
const heartsBox = $('#float-hearts');
if (heartsBox) {
  const spots = [[12, 22, 34, -18], [80, 16, 26, 14], [88, 58, 38, 22], [8, 64, 22, -8], [70, 82, 20, 30], [26, 88, 28, -24], [50, 6, 16, 8]];
  spots.forEach(([x, y, size, r], i) => {
    const h = document.createElement('span');
    h.innerHTML = HEART;
    Object.assign(h.style, { left: x + '%', top: y + '%', width: size + 'px', height: size * 0.92 + 'px', opacity: 0 });
    heartsBox.appendChild(h);
    anim(h, { opacity: [0, 1], scale: [0, 1], rotate: [0, r] }, { type: 'spring', stiffness: 180, damping: 12, delay: 0.9 + i * 0.08 });
    if (M && !reduced) M.animate(h, { y: [0, -14 - (i % 3) * 6, 0] }, { duration: 3.6 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: 1.6 + i * 0.2 });
  });
}

/* Parallaxe à la souris sur le hero */
const heroVisual = $('#hero-visual');
if (M && !reduced && finePointer && heroVisual) {
  let raf = 0, mx = 0, my = 0;
  $('.hero').addEventListener('pointermove', e => {
    mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      M.animate('#hero-candle', { x: mx * 26, y: my * 18, rotate: mx * 3 }, SOFT);
      M.animate('#float-hearts', { x: mx * -40, y: my * -30 }, SOFT);
      M.animate('.plate', { x: mx * 10, y: my * 8 }, SOFT);
    });
  });
}

/* ═══════════════════════════════════════════════
   COMPOSANT MENU : barre de progression, état, pastille, menu mobile
   ═══════════════════════════════════════════════ */
const nav = $('#nav');
const navLinks = $$('#nav-links a');
const pill = $('#nav-pill');
const darkZones = () => [...$$('[data-dark]'), ...$$('.ignite[data-night="1"]')];
const spyIds = navLinks.map(a => a.getAttribute('href').slice(1));
let activeLink = null;

function movePill(a) {
  if (!a) { anim(pill, { opacity: 0 }, { duration: 0.2 }); return; }
  anim(pill, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1 }, SPRING);
}
navLinks.forEach(a => a.addEventListener('pointerenter', () => movePill(a)));
$('#nav-links').addEventListener('pointerleave', () => movePill(activeLink));

function onScroll() {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 30);
  $('#scrollbar').style.transform = `scaleX(${y / Math.max(1, root.scrollHeight - innerHeight)})`;
  const dark = darkZones().some(z => { const r = z.getBoundingClientRect(); return r.top <= 40 && r.bottom >= 40; });
  nav.classList.toggle('dark', dark);
  const probe = innerHeight * 0.4;
  let cur = null;
  spyIds.forEach((id, i) => { const s = document.getElementById(id); if (!s) return; const r = s.getBoundingClientRect(); if (r.top <= probe && r.bottom > probe) cur = navLinks[i]; });
  if (cur !== activeLink) {
    navLinks.forEach(a => a.classList.toggle('active', a === cur));
    activeLink = cur;
    if (!$('#nav-links').matches(':hover')) movePill(cur);
  }
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
onScroll();

const burger = $('#burger'), menu = $('#menu');
let menuOpen = false;
function toggleMenu(open = !menuOpen) {
  menuOpen = open;
  burger.setAttribute('aria-expanded', open);
  document.body.classList.toggle('locked', open);
  nav.classList.toggle('dark', open || nav.classList.contains('dark'));
  const at = `at ${innerWidth - 40}px 40px`;
  if (open) {
    menu.style.visibility = 'visible';
    anim(menu, { clipPath: [`circle(0% ${at})`, `circle(150% ${at})`] }, { duration: 0.7, ease: [0.76, 0, 0.24, 1] });
    anim($$('a', menu), { y: [40, 0], opacity: [0, 1] }, { duration: 0.6, ease: EASE, delay: M ? M.stagger(0.05, { startDelay: 0.2 }) : 0 });
  } else {
    anim(menu, { clipPath: [`circle(150% ${at})`, `circle(0% ${at})`] }, { duration: 0.5, ease: [0.76, 0, 0.24, 1] }).finished.then(() => { if (!menuOpen) menu.style.visibility = 'hidden'; onScroll(); });
    if (reduced || !M) { menu.style.visibility = 'hidden'; onScroll(); }
  }
}
burger.addEventListener('click', () => toggleMenu());
$$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

/* Bandeau défilant qui accélère avec le scroll */
const ticker = $('#ticker');
if (ticker) {
  ticker.innerHTML += ticker.innerHTML;
  if (!reduced) {
    let x = 0, lastY = scrollY, boost = 0;
    const loop = () => {
      const dy = scrollY - lastY; lastY = scrollY;
      boost = mix(boost, Math.abs(dy) * 0.35, 0.1);
      x -= 0.6 + boost;
      const half = ticker.scrollWidth / 2;
      if (-x >= half) x += half;
      ticker.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

/* ═══════════════════════════════════════════════
   SCÈNE : ALLUME-LA (pilotée par le scroll)
   ═══════════════════════════════════════════════ */
const ignite = $('.ignite');
if (ignite) {
  const sticky = $('.ignite-sticky', ignite);
  const lines = $$('.ig-line', ignite);
  const flame = $('#ig-flame'), glow = $('#ig-glow'), candle = $('#ignite-candle'), end = $('#ignite-end');
  const windows = [[0, 0.33], [0.33, 0.6], [0.6, 0.84]];
  let statsDone = false;
  const render = p => {
    const night = easeOut(ramp(p, 0.02, 0.24));
    const lit = ramp(p, 0.36, 0.46);
    sticky.style.setProperty('--night', night.toFixed(3));
    sticky.style.setProperty('--lit', lit.toFixed(3));
    ignite.dataset.night = night > 0.5 ? '1' : '0';
    lines.forEach((l, i) => {
      const [a, b] = windows[i];
      const fadeIn = i === 0 ? 1 : ramp(p, a, a + 0.06), fadeOut = i === lines.length - 1 ? 1 - ramp(p, 0.9, 0.97) : 1 - ramp(p, b - 0.06, b);
      const o = Math.min(fadeIn, fadeOut);
      l.style.opacity = o.toFixed(3);
      const base = innerWidth > 860 ? 'translateY(-50%) ' : '';
      l.style.transform = `${base}translateY(${(1 - fadeIn) * 40 - (1 - fadeOut) * 40}px)`;
    });
    flame.style.transform = `translate(-50%, -96%) scale(${backOut(lit).toFixed(3)})`;
    glow.style.opacity = (lit * 1).toFixed(3);
    candle.style.transform = `translateY(${mix(40, -10, p).toFixed(1)}px) scale(${mix(0.92, 1.04, p).toFixed(3)})`;
    const e = ramp(p, 0.84, 0.92);
    end.style.opacity = e.toFixed(3);
    end.style.transform = `translateY(${(1 - e) * 30}px)`;
    if (e > 0.5 && !statsDone) { statsDone = true; $$('[data-count]', end).forEach(countUp); }
  };
  if (M) M.scroll(render, { target: ignite, offset: ['start start', 'end end'] });
  else render(0.5);
  if (reduced) { render(0.5); }
}

/* ═══════════════════════════════════════════════
   SCÈNE : ANATOMIE (couche par couche)
   ═══════════════════════════════════════════════ */
const anatomy = $('.anatomy');
if (anatomy) {
  const items = $$('#layers li');
  const spotsBox = $('#hotspots');
  const candle = $('#anatomy-candle');
  const spots = items.map(li => {
    const s = document.createElement('span'); s.className = 'hotspot';
    s.style.left = li.dataset.x + '%'; s.style.top = li.dataset.y + '%';
    spotsBox.appendChild(s); return s;
  });
  let cur = -1;
  const setStep = i => {
    if (i === cur) return; cur = i;
    items.forEach((li, k) => li.classList.toggle('on', k === i));
    spots.forEach((s, k) => s.classList.toggle('on', k === i));
    $('#anat-n').textContent = String(i + 1).padStart(2, '0');
    candle.style.transformOrigin = `${items[i].dataset.x}% ${items[i].dataset.y}%`;
    anim(candle, { scale: i === 0 ? 1 : 1.08 }, SOFT);
    anim('#anat-n', { y: [16, 0], opacity: [0, 1] }, { duration: 0.4, ease: EASE });
  };
  setStep(0);
  if (M) M.scroll(p => setStep(Math.min(items.length - 1, Math.floor(p * items.length * 0.999))), { target: anatomy, offset: ['start start', 'end end'] });
  items.forEach((li, i) => li.addEventListener('click', () => {
    const top = anatomy.offsetTop + (anatomy.offsetHeight - innerHeight) * ((i + 0.5) / items.length);
    scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
  }));
}

/* ═══════════════════════════════════════════════
   APPARITIONS AU SCROLL
   ═══════════════════════════════════════════════ */
if (M && !reduced) {
  M.inView('[data-rv]', el => {
    const sibs = $$(':scope > [data-rv]', el.parentElement);
    const i = Math.max(0, sibs.indexOf(el)) % 4;
    M.animate(el, { opacity: [0, 1], y: [32, 0] }, { duration: 0.9, ease: EASE, delay: i * 0.08 });
  }, { margin: '0px 0px -10% 0px' });
  splitHeads.forEach(({ el, words }) => {
    M.inView(el, () => { M.animate(words, { y: ['110%', '0%'] }, { type: 'spring', stiffness: 140, damping: 20, delay: M.stagger(0.05) }); }, { margin: '0px 0px -10% 0px' });
  });
  M.inView('.values [data-count]', el => countUp(el));
}

function countUp(el) {
  const to = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
  if (!M || reduced) { el.textContent = pre + to + suf; return; }
  M.animate(0, to, { duration: 1.4, ease: EASE, onUpdate: v => { el.textContent = pre + Math.round(v) + suf; } });
}

/* Cartes inclinables (3D) */
if (M && !reduced && finePointer) {
  $$('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      M.animate(card, { rotateY: px * 8, rotateX: py * -8, y: -8 }, SOFT);
    });
    card.addEventListener('pointerleave', () => M.animate(card, { rotateY: 0, rotateX: 0, y: 0 }, SOFT));
    card.style.transformPerspective = '900px';
  });
  /* Boutons magnétiques */
  $$('[data-magnetic]').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      M.animate(btn, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3 }, SPRING);
    });
    btn.addEventListener('pointerleave', () => M.animate(btn, { x: 0, y: 0 }, { type: 'spring', stiffness: 300, damping: 12 }));
  });
}
/* Retour tactile au clic */
if (M && !reduced && M.press) M.press('.btn, .price-card, .cart-btn, .chips span, .gallery-thumbs button', el => {
  M.animate(el, { scale: 0.96 }, { type: 'spring', stiffness: 500, damping: 25 });
  return () => M.animate(el, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 15 });
});

/* ═══════════════════════════════════════════════
   BOUTIQUE : galerie, tarifs, quantité
   ═══════════════════════════════════════════════ */
const galleryMain = $('#gallery-main');
$$('#gallery-thumbs button').forEach(b => b.addEventListener('click', () => {
  if (b.classList.contains('on')) return;
  $$('#gallery-thumbs button').forEach(x => x.classList.toggle('on', x === b));
  const old = $$('img', galleryMain);
  const img = new Image(); img.src = b.dataset.src; img.alt = b.dataset.alt || '';
  galleryMain.insertBefore(img, $('.badge', galleryMain));
  anim(img, { opacity: [0, 1], scale: [1.08, 1] }, { duration: 0.7, ease: EASE }).finished.then(() => old.forEach(o => o.remove()));
}));

let size = 'petite', qty = 1;
const pricePill = $('#pricing-pill');
function placePricePill(animate = true) {
  const card = $(`.price-card[data-size="${size}"]`);
  const box = { x: card.offsetLeft, y: card.offsetTop, width: card.offsetWidth, height: card.offsetHeight };
  if (M) M.animate(pricePill, box, animate && !reduced ? SPRING : { duration: 0 });
  else Object.assign(pricePill.style, { transform: `translate(${box.x}px, ${box.y}px)`, width: box.width + 'px', height: box.height + 'px', left: 0, top: 0 });
}
pricePill.style.left = '0'; pricePill.style.top = '0';
let shownPrice = SHOP.prices.petite;
function updateBuyPrice() {
  const target = SHOP.prices[size] * qty;
  const el = $('#buy-price');
  if (M && !reduced) M.animate(shownPrice, target, { duration: 0.5, ease: EASE, onUpdate: v => { el.textContent = chf(v); } });
  else el.textContent = chf(target);
  shownPrice = target;
}
$$('.price-card').forEach(c => c.addEventListener('click', () => {
  size = c.dataset.size;
  $$('.price-card').forEach(x => { x.classList.toggle('on', x === c); x.setAttribute('aria-checked', x === c); });
  placePricePill(); updateBuyPrice();
}));
placePricePill(false);
addEventListener('resize', () => placePricePill(false));
$('#qty-minus').addEventListener('click', () => { qty = Math.max(1, qty - 1); $('#qty-val').textContent = qty; updateBuyPrice(); });
$('#qty-plus').addEventListener('click', () => { qty = Math.min(20, qty + 1); $('#qty-val').textContent = qty; updateBuyPrice(); });

/* ═══════════════════════════════════════════════
   PANIER
   ═══════════════════════════════════════════════ */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('yumiya_cart') || '[]'); } catch (_) { cart = []; }
const saveCart = () => { try { localStorage.setItem('yumiya_cart', JSON.stringify(cart)); } catch (_) {} };
const cartTotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
const cartQty = () => cart.reduce((s, i) => s + i.qty, 0);
let lastCount = -1;

function renderCart() {
  const n = cartQty();
  const badge = $('#cart-count');
  badge.textContent = n;
  if (n !== lastCount) {
    if (n > 0 && lastCount > -1) anim(badge, { scale: [1.6, 1] }, { type: 'spring', stiffness: 400, damping: 12 });
    else anim(badge, { scale: n > 0 ? 1 : 0 }, SPRING);
    lastCount = n;
  }
  const body = $('#cart-body');
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty"><div class="e-ic">🕯️</div><p>Ton panier est vide.<br/>La bougie Love t'attend.</p></div>`;
    $('#cart-ft').style.display = 'none';
  } else {
    body.innerHTML = cart.map((it, i) => `<div class="cart-item">
      <img src="${SHOP.image}" alt=""/>
      <div><strong>${it.name}</strong><small>${SHOP.sizes[it.size]}</small>
        <div class="qty"><button data-dec="${i}" aria-label="Moins">−</button><span>${it.qty}</span><button data-inc="${i}" aria-label="Plus">+</button></div></div>
      <div><div class="ci-price">${chf(it.price * it.qty)}</div><button class="cart-rm" data-rm="${i}">Retirer</button></div>
    </div>`).join('');
    $('#cart-ft').style.display = '';
  }
  $('#cart-total').textContent = chf(cartTotal());
  saveCart();
}
$('#cart-body').addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.dataset.inc) cart[+t.dataset.inc].qty++;
  if (t.dataset.dec) { const it = cart[+t.dataset.dec]; it.qty--; if (it.qty < 1) cart.splice(+t.dataset.dec, 1); }
  if (t.dataset.rm) cart.splice(+t.dataset.rm, 1);
  renderCart();
});
renderCart();

function flyHeart(from) {
  if (!M || reduced) return Promise.resolve();
  const a = from.getBoundingClientRect(), b = $('#cart-open').getBoundingClientRect();
  const h = document.createElement('div'); h.className = 'fly-heart'; h.innerHTML = HEART;
  h.style.left = a.left + a.width / 2 - 14 + 'px'; h.style.top = a.top + a.height / 2 - 14 + 'px';
  document.body.appendChild(h);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
  return M.animate(h, { x: [0, dx * 0.3, dx], y: [0, dy - 120, dy], scale: [1, 1.5, 0.4], rotate: [0, -20, 10] }, { duration: 0.8, ease: [0.5, 0, 0.3, 1] })
    .finished.then(() => { h.remove(); M.animate('#cart-open', { scale: [1.25, 1] }, { type: 'spring', stiffness: 500, damping: 10 }); });
}
$('#add-cart').addEventListener('click', async e => {
  const ex = cart.find(i => i.size === size);
  if (ex) ex.qty += qty; else cart.push({ name: SHOP.productName, size, price: SHOP.prices[size], qty });
  await flyHeart(e.currentTarget);
  renderCart();
  toast(`Ajouté : ${SHOP.productName} · ${size === 'petite' ? 'Petite' : 'Grande'} ×${qty}`);
});

/* ═══════════════════════════════════════════════
   PANNEAU, MODALES, TOAST
   ═══════════════════════════════════════════════ */
const overlay = $('#overlay');
let openLayer = null, lastFocus = null;
function openLayerEl(el, kind) {
  closeLayer(true);
  lastFocus = document.activeElement;
  openLayer = { el, kind };
  overlay.classList.add('on'); document.body.classList.add('locked');
  el.setAttribute('aria-hidden', 'false');
  if (kind === 'drawer') {
    el.style.visibility = 'visible';
    anim(el, { x: ['105%', '0%'] }, { type: 'spring', stiffness: 260, damping: 32 });
  } else {
    el.classList.add('on');
    anim($('.modal-card', el), { opacity: [0, 1], y: [40, 0], scale: [0.96, 1] }, SPRING);
  }
  setTimeout(() => ($('input:not(.hp), button', el.querySelector('form:not([hidden])') || el) || el).focus({ preventScroll: true }), 60);
}
function closeLayer(instant = false) {
  if (!openLayer) return;
  const { el, kind } = openLayer; openLayer = null;
  overlay.classList.remove('on'); document.body.classList.remove('locked');
  el.setAttribute('aria-hidden', 'true');
  if (kind === 'drawer') {
    if (instant) { el.style.visibility = 'hidden'; el.style.transform = 'translateX(105%)'; }
    else anim(el, { x: '105%' }, { duration: 0.4, ease: EASE }).finished.then(() => { if (openLayer?.el !== el) el.style.visibility = 'hidden'; });
    if (reduced || !M) el.style.visibility = 'hidden';
  } else {
    const card = $('.modal-card', el);
    if (instant) { el.classList.remove('on'); card.style.opacity = 0; }
    else anim(card, { opacity: 0, y: 20, scale: 0.97 }, { duration: 0.25 }).finished.then(() => { if (openLayer?.el !== el) el.classList.remove('on'); });
    if (reduced || !M) el.classList.remove('on');
  }
  lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
}
$('#cart-open').addEventListener('click', () => openLayerEl($('#cart'), 'drawer'));
overlay.addEventListener('click', () => closeLayer());
document.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) closeLayer();
  const op = e.target.closest('[data-open]');
  if (op) {
    e.preventDefault();
    const name = op.dataset.open;
    resetForm(name);
    if (name === 'order') fillSummary();
    openLayerEl($(`#modal-${name}`), 'modal');
  }
});
addEventListener('keydown', e => { if (e.key === 'Escape') { if (openLayer) closeLayer(); else if (menuOpen) toggleMenu(false); } });

function fillSummary() {
  $('#order-summary').innerHTML = cart.map(i => `<div class="row"><span>${i.name} · ${i.size === 'petite' ? 'Petite' : 'Grande'} ×${i.qty}</span><span>${chf(i.price * i.qty)}</span></div>`).join('') +
    `<div class="row total"><span>Total estimé</span><span>${chf(cartTotal())}</span></div>`;
}

let toastT;
function toast(msg) {
  const t = $('#toast'); t.innerHTML = `<span style="color:var(--cherry-soft)">♥</span>${msg}`;
  anim(t, { transform: ['translate(-50%, 140%)', 'translate(-50%, 0%)'] }, SPRING);
  clearTimeout(toastT);
  toastT = setTimeout(() => anim(t, { transform: 'translate(-50%, 140%)' }, { duration: 0.35, ease: EASE }), 2800);
}

/* ═══════════════════════════════════════════════
   AVIS CLIENTS (deux rangées qui défilent)
   ═══════════════════════════════════════════════ */
const reviewsBox = $('#reviews');
if (reviewsBox) {
  const card = ([q, n, c]) => `<figure class="review"><div class="stars" aria-label="5 étoiles sur 5">★★★★★</div><q>${q}</q><figcaption class="who"><span class="av">${n[0]}</span><span>${n}<small>${c}</small></span></figcaption></figure>`;
  const set = [...REVIEWS, ...REVIEWS];
  [0, 1].forEach(r => {
    const row = document.createElement('div'); row.className = 'r-row';
    const ordered = r ? [...set].reverse() : set;
    row.innerHTML = [...ordered, ...ordered].map(card).join('');
    $$('.review', row).forEach((el, i) => { if (i >= ordered.length) el.setAttribute('aria-hidden', 'true'); });
    reviewsBox.appendChild(row);
    if (M && !reduced) {
      const a = M.animate(row, { x: r ? ['-50%', '0%'] : ['0%', '-50%'] }, { duration: 48, ease: 'linear', repeat: Infinity });
      row.addEventListener('pointerenter', () => a.pause());
      row.addEventListener('pointerleave', () => a.play());
    }
  });
}

/* ═══════════════════════════════════════════════
   FAQ (accordéon animé)
   ═══════════════════════════════════════════════ */
$$('#accordion details').forEach(d => {
  const sum = $('summary', d), body = $('.acc-body', d);
  sum.addEventListener('click', e => {
    if (!M || reduced) return;
    e.preventDefault();
    if (d.open) {
      M.animate(body, { height: [body.offsetHeight + 'px', '0px'], opacity: [1, 0] }, { duration: 0.35, ease: EASE }).finished.then(() => { d.open = false; body.style.height = ''; body.style.opacity = ''; });
    } else {
      d.open = true;
      const h = body.scrollHeight;
      M.animate(body, { height: ['0px', h + 'px'], opacity: [0, 1] }, { duration: 0.45, ease: EASE }).finished.then(() => { body.style.height = ''; });
    }
  });
});

/* ═══════════════════════════════════════════════
   FORMULAIRES → email via Web3Forms
   ═══════════════════════════════════════════════ */
function resetForm(name) {
  const f = $(`#${name}-form`), s = $(`#${name}-success`);
  if (f) f.hidden = false;
  if (s) s.classList.remove('on');
}
function validate(form) {
  let ok = true;
  const groups = new Set();
  $$('[required]', form).forEach(inp => {
    if (inp.type === 'radio') { groups.add(inp.name); return; }
    const v = inp.value.trim();
    const bad = !v || (inp.type === 'email' && !/^\S+@\S+\.\S+$/.test(v));
    inp.closest('.field').classList.toggle('err', bad);
    if (bad) ok = false;
  });
  groups.forEach(g => {
    const bad = !$(`[name="${g}"]:checked`, form);
    $(`[name="${g}"]`, form).closest('.field').classList.toggle('err', bad);
    if (bad) ok = false;
  });
  if (!ok) {
    const first = $('.err input, .err select, .err textarea', form);
    first && first.focus();
    anim($$('.err', form), { x: [0, -8, 8, -5, 5, 0] }, { duration: 0.4 });
  }
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
  form.addEventListener('change', e => e.target.closest('.field')?.classList.remove('err'));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate(form)) return;
    const btn = $('button[type=submit]', form), label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Envoi…';
    try {
      await send(form, makeSubject(form), opts.extra ? opts.extra() : {});
      form.reset(); form.hidden = true;
      const ok = $(`#${name}-success`);
      ok.classList.add('on');
      anim($('.success-ic', ok), { scale: [0, 1], rotate: [-90, 0] }, { type: 'spring', stiffness: 260, damping: 12 });
      anim($$('h4, p', ok), { opacity: [0, 1], y: [16, 0] }, { duration: 0.5, ease: EASE, delay: M ? M.stagger(0.08, { startDelay: 0.15 }) : 0 });
      opts.done && opts.done();
    } catch (_) {
      alert(`Oups, l'envoi n'a pas fonctionné. Réessaie ou écris-nous à ${FALLBACK_EMAIL}`);
    } finally {
      btn.disabled = false; btn.textContent = label;
    }
  });
}
const nameOf = f => $('[name="Nom"]', f)?.value.trim() || '';
const toggleSize = on => { $('#cf-size-wrap').hidden = !on; $('#cf-size').disabled = !on; $('#cf-qty').disabled = !on; };
wire('custom', f => `Demande sur mesure Yumiya Candle - ${nameOf(f)}`);
wire('contact', f => `Nouvelle commande Yumiya Candle - ${nameOf(f)}`, { done: () => toggleSize(false) });
wire('notify', () => 'Alerte collection Pâques - Yumiya Candle');
wire('order', f => `Nouvelle commande Yumiya Candle (Boutique) - ${nameOf(f)}`, {
  extra: () => ({ Articles: cart.length ? cart.map(i => `${i.name} (${i.size}) x${i.qty} - ${chf(i.price * i.qty)}`).join(' | ') + ` | Total : ${chf(cartTotal())}` : 'voir message' }),
  done: () => { cart = []; renderCart(); },
});
$('#cf-type').addEventListener('change', e => toggleSize(e.target.value.includes('St-Valentin')));

$('#year').textContent = new Date().getFullYear();
