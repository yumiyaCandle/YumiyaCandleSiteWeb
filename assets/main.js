/* ═══════════════════════════════════════════════
   YUMIYA CANDLE — interactions & animations
   Animations : Motion (moteur de Framer Motion), embarqué dans assets/vendor/motion.js
   ═══════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════
   RÉGLAGES DE LA BOUTIQUE — tout se modifie ici
   ═══════════════════════════════════════════════ */
const SITE = {
  email: 'yumiyacandle@outlook.com',
  formspree: 'https://formspree.io/f/xlgzandp',
  sumup: 'https://pay.sumup.com/b2c/QHKF9ZF6',
  twint: 'https://go.twint.ch/1/e/tw?tw=acq.Ym3w05jiSvied2R3BRgLV99gzY1xEgp4HkHFveezjEUlzb_7czPOsxlqogPRkuSn',
  shipping: 5.00,
};
const IMG = 'assets/img/';
/* Catalogue — active:false affiche le produit comme « épuisé » */
const PRODUCTS = {
  marsh: {
    active: true, cat: 'gourmande', line: 'Bougie gourmande', name: 'Marshmallow Framboise', word: 'Framboise',
    notes: 'Marshmallow · Framboise', badge: 'Signature', bg: '#F7D9D5', soft: '#FFF1EE',
    imgs: ['framboise-signature.webp', 'collection-gourmande.webp', 'bougie-framboise.webp', 'photo-coeurs.jpg'], cut: 'detoure-framboise.webp',
    desc: 'Une douceur sucrée et fruitée : notes de marshmallow et de framboise, chantilly blanche travaillée à la main et petits cœurs. Coulée dans un verre transparent, en cire de soja 100 % végétale.',
    sizes: [{ id: 'petite', label: 'Petite', meta: '90 g · ≈ 12 h', price: 8.90 }, { id: 'grande', label: 'Grande', meta: '180 g · ≈ 18 h', price: 10.90 }],
    facts: [['Senteur', 'Marshmallow, framboise'], ['Formats', '90 g · 180 g'], ['Contenant', 'Verre transparent']],
  },
  lav: {
    active: true, cat: 'gourmande', line: 'Bougie gourmande', name: 'Lavande', word: 'Lavande',
    notes: 'Lavande · Crème', bg: '#E4DAF1', soft: '#F6F1FB',
    imgs: ['bougie-lavande.webp'], cut: 'detoure-lavande.webp', price: 10.90,
    desc: 'La douceur apaisante de la lavande. Nuances de violet et de crème, chantilly blanche travaillée à la main, petits cœurs et tablette de chocolat violette.',
    facts: [['Senteur', 'Lavande'], ['Décor', 'Chantilly, cœurs et chocolat violet']],
  },
  aut: {
    active: true, cat: 'gourmande', line: 'Bougie gourmande', name: 'Automne', word: 'Automne',
    notes: 'Pomme · Crème', badge: "Édition d'automne", bg: '#F5DCC0', soft: '#FDF1E4',
    imgs: ['bougie-automne.webp'], cut: 'detoure-automne.webp', price: 10.90,
    desc: "L'atmosphère chaleureuse de l'automne, portée par de douces notes de pomme. Couches de cire orange et crème, chantilly et décorations gourmandes faites à la main.",
    facts: [['Senteur', 'Pomme'], ['Décor', 'Chantilly et décorations gourmandes']],
  },
  tulip: {
    active: true, cat: 'tulipe', line: 'Bougie florale', name: 'Tulipe', word: 'Tulipe',
    notes: 'Vanille · Fraise', bg: '#DDEBD3', soft: '#F1F7EC',
    imgs: ['bougie-tulipe.webp', 'tulipes-jardin.webp', 'tulipes-ecrins.webp', 'tulipes-boites.webp'], cut: 'detoure-tulipe.webp', price: 6.30,
    desc: "Un bouquet de tulipes en cire posé sur un socle vert mousse, dans son verre. Une note vanille-fraise, délicate et printanière, pour fleurir la maison toute l'année.",
    colors: [{ n: 'Rose', c: ['#E07C8C'] }, { n: 'Orange clair', c: ['#F0A877'] }, { n: 'Rouge & bleu clair', c: ['#C23B3B', '#86BFE0'] }, { n: 'Violet', c: ['#8B5BB5'] }],
    facts: [['Senteur', 'Vanille, fraise'], ['Décor', 'Tulipes en cire, socle vert mousse'], ['Contenant', 'Verre transparent']],
  },
  box: {
    active: true, cat: 'coffret', line: 'Coffret cadeau', name: 'Coffret Yumiya', word: 'Coffret',
    notes: 'Gourmande + Tulipe', badge: 'Prêt à offrir', bg: '#F6E4D8', soft: '#FDF5EF',
    imgs: ['coffret-yumiya.webp', 'coffret-ouvert.webp'], cut: 'detoure-coffret.webp', price: 13.30,
    desc: 'Un duo prêt à offrir : une bougie gourmande marshmallow-framboise et une bougie tulipe vanille-fraise, réunies dans une boîte cadeau aux tons pastel. Plus avantageux que les deux bougies achetées séparément.',
    facts: [['Contenu', '1 Marshmallow Framboise, 1 Tulipe'], ['Écrin', "Boîte cadeau nouée d'un ruban"]],
  },
};
const COMMON_FACTS = [['Cire', 'Soja 100 % végétale'], ['Mèche', 'Coton'], ['Fabrication', 'À la main, à La Neuveville'], ['Livraison', 'Suisse · 5.00 CHF']];

/* ── Outils ── */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ramp = (p, a, b) => clamp((p - a) / (b - a));
const mix = (a, b, t) => a + (b - a) * t;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const backOut = t => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
const chf = n => (Math.round(n * 100) / 100).toFixed(2) + ' CHF';
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const minPrice = p => (p.sizes ? p.sizes[0].price : p.price);
const root = document.documentElement;
const reduced = root.classList.contains('reduced');
const finePointer = matchMedia('(pointer: fine)').matches;
const M = window.Motion;
if (!M) root.classList.remove('js'); // sans Motion, tout s'affiche simplement
const SPRING = { type: 'spring', stiffness: 260, damping: 26 };
const SOFT = { type: 'spring', stiffness: 120, damping: 20 };
const EASE = [0.22, 1, 0.36, 1];
const stagger = (s, o) => (M ? M.stagger(s, o) : 0);
const noop = { finished: Promise.resolve(), stop() {}, pause() {}, play() {} };
const anim = (el, kf, opts) => {
  if (M && !reduced) return M.animate(el, kf, opts);
  applyFinal(el, kf); return noop;
};
function applyFinal(el, kf) {
  const els = typeof el === 'string' ? $$(el) : el instanceof Element ? [el] : [...el];
  els.forEach(e => Object.entries(kf).forEach(([k, v]) => {
    const val = Array.isArray(v) ? v[v.length - 1] : v;
    if (k === 'opacity') e.style.opacity = val;
    else if (['x', 'y', 'scale', 'rotate', 'rotateX', 'rotateY'].includes(k)) e.style.transform = '';
    else e.style[k] = val;
  }));
}

/* ═══════════════════════════════════════════════
   FLAMME & CŒUR
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
        if (node.tagName !== 'BR') build(node, clone);
        dest.appendChild(clone);
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
  anim(heroWords, { y: ['110%', '0%'] }, { type: 'spring', stiffness: 140, damping: 20, delay: stagger(0.06) });
  anim('[data-hero-in]', { opacity: [0, 1], y: [24, 0] }, { duration: 0.9, ease: EASE, delay: stagger(0.09, { startDelay: 0.25 }) });
  anim('.plate', { scale: [0.6, 1], opacity: [0, 1] }, { ...SOFT, delay: 0.05 });
  anim('#hero-candle', { y: [80, 0], opacity: [0, 1] }, { ...SOFT, delay: 0.15 });
  anim('.badge-ring', { opacity: [0, 1] }, { duration: 1.2, delay: 0.5 });
}
const intro = $('#intro');
if (intro && M && !reduced) {
  const safety = setTimeout(() => { intro.remove(); heroIn(); }, 3500);
  (async () => {
    await M.animate('.intro-flame', { scale: [0, 1], opacity: [0, 1] }, { type: 'spring', stiffness: 200, damping: 12 }).finished;
    await M.animate('.intro-word > *, .intro-sub', { y: [20, 0], opacity: [0, 1] }, { duration: 0.5, ease: EASE, delay: M.stagger(0.08) }).finished;
    await new Promise(r => setTimeout(r, 250));
    clearTimeout(safety);
    heroIn();
    await M.animate(intro, { clipPath: ['inset(0 0 0% 0)', 'inset(0 0 100% 0)'] }, { duration: 0.9, ease: [0.76, 0, 0.24, 1] }).finished;
    intro.remove();
  })();
} else {
  intro && intro.remove();
  heroIn();
}

/* Cœurs flottants autour de la bougie */
const heartsBox = $('#float-hearts');
if (heartsBox) {
  const spots = [[12, 22, 34, -18], [80, 16, 26, 14], [88, 58, 38, 22], [8, 64, 22, -8], [70, 82, 20, 30], [30, 92, 26, -24], [50, 6, 16, 8]];
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
if (M && !reduced && finePointer) {
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
   COMPOSANT MENU : progression, état, pastille, menu mobile
   ═══════════════════════════════════════════════ */
const nav = $('#nav');
const navLinks = $$('#nav-links a');
const pill = $('#nav-pill');
const spyIds = navLinks.map(a => a.getAttribute('href').slice(1));
let activeLink = null;

function movePill(a) {
  if (!a) { anim(pill, { opacity: 0 }, { duration: 0.2 }); return; }
  anim(pill, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1 }, SPRING);
}
navLinks.forEach(a => a.addEventListener('pointerenter', () => movePill(a)));
$('#nav-links').addEventListener('pointerleave', () => movePill(activeLink));

let menuOpen = false;
function onScroll() {
  const y = scrollY;
  nav.classList.toggle('scrolled', y > 30);
  $('#scrollbar').style.transform = `scaleX(${y / Math.max(1, root.scrollHeight - innerHeight)})`;
  const zones = [...$$('[data-dark]'), ...$$('.ignite[data-night="1"]')];
  const dark = zones.some(z => { const r = z.getBoundingClientRect(); return r.top <= 40 && r.bottom >= 40; });
  nav.classList.toggle('dark', dark || menuOpen);
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

const burger = $('#burger'), menu = $('#menu');
function toggleMenu(open = !menuOpen) {
  menuOpen = open;
  burger.setAttribute('aria-expanded', open);
  document.body.classList.toggle('locked', open);
  const at = `at ${innerWidth - 40}px 40px`;
  if (open) {
    menu.style.visibility = 'visible';
    anim(menu, { clipPath: [`circle(0% ${at})`, `circle(150% ${at})`] }, { duration: 0.7, ease: [0.76, 0, 0.24, 1] });
    anim($$('a', menu), { y: [40, 0], opacity: [0, 1] }, { duration: 0.6, ease: EASE, delay: stagger(0.05, { startDelay: 0.2 }) });
  } else if (M && !reduced) {
    M.animate(menu, { clipPath: [`circle(150% ${at})`, `circle(0% ${at})`] }, { duration: 0.5, ease: [0.76, 0, 0.24, 1] }).finished.then(() => { if (!menuOpen) menu.style.visibility = 'hidden'; });
  } else menu.style.visibility = 'hidden';
  onScroll();
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
      if (half && -x >= half) x += half;
      ticker.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

/* ═══════════════════════════════════════════════
   SCÈNE : LE RITUEL (pilotée par le scroll)
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
    const desktop = innerWidth > 860;
    lines.forEach((l, i) => {
      const [a, b] = windows[i];
      const fadeIn = i === 0 ? 1 : ramp(p, a, a + 0.06);
      const fadeOut = i === lines.length - 1 ? 1 - ramp(p, 0.9, 0.97) : 1 - ramp(p, b - 0.06, b);
      l.style.opacity = Math.min(fadeIn, fadeOut).toFixed(3);
      l.style.transform = `${desktop ? 'translateY(-50%) ' : ''}translateY(${(1 - fadeIn) * 40 - (1 - fadeOut) * 40}px)`;
    });
    flame.style.transform = `translate(-50%, -96%) scale(${backOut(lit).toFixed(3)})`;
    glow.style.opacity = lit.toFixed(3);
    candle.style.transform = `translateY(${mix(40, -10, p).toFixed(1)}px) scale(${mix(0.92, 1.04, p).toFixed(3)})`;
    const e = ramp(p, 0.84, 0.92);
    end.style.opacity = e.toFixed(3);
    end.style.transform = `translateY(${(1 - e) * 30}px)`;
    if (e > 0.5 && !statsDone) { statsDone = true; $$('[data-count]', end).forEach(countUp); }
  };
  if (M && !reduced) M.scroll(render, { target: ignite, offset: ['start start', 'end end'] });
  else render(0.5);
}

/* ═══════════════════════════════════════════════
   VITRINE : défilement horizontal piloté par le scroll
   ═══════════════════════════════════════════════ */
const vitrine = $('.vitrine');
if (vitrine) {
  const track = $('#vt-track');
  const keys = Object.keys(PRODUCTS);
  track.innerHTML = keys.map((k, i) => {
    const p = PRODUCTS[k];
    return `<article class="vt-panel" style="--bg:${p.bg};--soft:${p.soft}" data-i="${i}">
      <span class="vt-word" aria-hidden="true">${esc(p.word)}</span>
      <img class="vt-img${k === 'tulip' ? ' wide' : ''}" src="${IMG + p.cut}" alt="${esc(p.line + ' ' + p.name)}" loading="lazy"/>
      <div class="vt-info container">
        <div><span class="vt-n">${String(i + 1).padStart(2, '0')} · ${esc(p.line)}</span><h3 class="vt-name">${esc(p.name)}</h3><p class="vt-notes">${esc(p.notes)}</p></div>
        <div class="vt-buy"><span class="vt-price">${p.sizes ? 'dès ' : ''}${chf(minPrice(p))}</span><button class="btn btn-primary btn-sm" type="button" data-product="${k}">Découvrir</button></div>
      </div>
    </article>`;
  }).join('');
  const panels = $$('.vt-panel', track);
  const words = $$('.vt-word', track), imgs = $$('.vt-img', track);
  const n = panels.length;
  let curN = -1;
  const render = p => {
    const pos = p * (n - 1);
    track.style.transform = `translateX(${-pos * 100}vw)`;
    panels.forEach((_, i) => {
      const d = clamp(pos - i, -1, 1);
      words[i].style.transform = `translate(calc(-50% + ${d * -22}vw), -50%)`;
      imgs[i].style.transform = `translateX(${d * 10}vw) rotate(${d * -6}deg)`;
    });
    $('#vt-bar').style.transform = `scaleX(${(pos + 1) / n})`;
    const k = Math.round(pos);
    if (k !== curN) { curN = k; $('#vt-n').textContent = String(k + 1).padStart(2, '0'); }
  };
  if (M && !reduced) M.scroll(render, { target: vitrine, offset: ['start start', 'end end'] });
  else vitrine.classList.add('static');
  render(0);
}

/* ═══════════════════════════════════════════════
   SCÈNE : L'ATELIER (couche par couche)
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

/* Coffret : léger zoom au scroll */
const giftImg = $('#gift-img');
if (giftImg && M && !reduced) M.scroll(p => { giftImg.style.transform = `scale(${mix(1.18, 1, p).toFixed(3)}) translateY(${mix(-4, 4, p).toFixed(2)}%)`; }, { target: $('.gift'), offset: ['start end', 'end start'] });

/* ═══════════════════════════════════════════════
   BOUTIQUE : grille + filtres
   ═══════════════════════════════════════════════ */
const grid = $('#shop-grid');
grid.innerHTML = Object.entries(PRODUCTS).map(([k, p], i) => `
  <article class="p-card${p.active ? '' : ' sold'}" data-cat="${p.cat}" data-rv>
    <button class="p-media" type="button" data-product="${k}" aria-label="Voir ${esc(p.name)}" style="--bg:${p.bg}">
      <img class="p-photo" src="${IMG + p.imgs[0]}" alt="${esc(p.line + ' ' + p.name)}" loading="lazy"/>
      <img class="p-cut" src="${IMG + p.cut}" alt="" loading="lazy"/>
      <span class="p-n">${String(i + 1).padStart(2, '0')}</span>
      ${p.badge ? `<span class="badge badge-${p.cat === 'coffret' ? 'gold' : 'red'}">${esc(p.badge)}</span>` : ''}
      ${p.active ? '' : '<span class="badge badge-soft">Épuisé</span>'}
    </button>
    <div class="p-body">
      <div><span class="p-notes">${esc(p.notes)}</span><h3>${esc(p.name)}</h3></div>
      <div class="p-end"><span class="p-price">${p.sizes ? 'dès ' : ''}${chf(minPrice(p))}</span>
        <button class="p-add" type="button" ${p.active ? '' : 'disabled'} data-${p.sizes || p.colors ? 'product' : 'add'}="${k}" aria-label="Ajouter ${esc(p.name)} au panier"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></button>
      </div>
    </div>
  </article>`).join('');

const tabs = $$('#shop-tabs button'), tabsPill = $('#tabs-pill');
function placeTabsPill(btn, animate = true) {
  const box = { x: btn.offsetLeft, width: btn.offsetWidth };
  if (M) M.animate(tabsPill, box, animate && !reduced ? SPRING : { duration: 0 });
  else Object.assign(tabsPill.style, { transform: `translateX(${box.x}px)`, width: box.width + 'px' });
}
tabs.forEach(t => t.addEventListener('click', async () => {
  tabs.forEach(x => { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', x === t); });
  placeTabsPill(t);
  const cat = t.dataset.cat;
  const cards = $$('.p-card', grid);
  await anim(cards.filter(c => !c.hidden), { opacity: 0, y: 12 }, { duration: 0.18 }).finished;
  cards.forEach(c => { c.hidden = cat !== 'all' && c.dataset.cat !== cat; });
  anim(cards.filter(c => !c.hidden), { opacity: [0, 1], y: [24, 0] }, { duration: 0.5, ease: EASE, delay: stagger(0.06) });
}));
requestAnimationFrame(() => placeTabsPill($('#shop-tabs .on'), false));
addEventListener('resize', () => placeTabsPill($('#shop-tabs .on'), false));

/* ═══════════════════════════════════════════════
   APPARITIONS AU SCROLL
   ═══════════════════════════════════════════════ */
if (M && !reduced) {
  M.inView('[data-rv]', el => {
    const sibs = $$(':scope > [data-rv]', el.parentElement);
    const i = Math.max(0, sibs.indexOf(el)) % 4;
    M.animate(el, { opacity: [0, 1], y: [32, 0] }, { duration: 0.9, ease: EASE, delay: i * 0.08 });
  }, { margin: '0px 0px -8% 0px' });
  splitHeads.forEach(({ el, words }) => {
    M.inView(el, () => { M.animate(words, { y: ['110%', '0%'] }, { type: 'spring', stiffness: 140, damping: 20, delay: M.stagger(0.05) }); }, { margin: '0px 0px -10% 0px' });
  });
  M.inView('.values [data-count], .maison-stats [data-count]', el => countUp(el));
}
function countUp(el) {
  const to = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
  if (!M || reduced) { el.textContent = pre + to + suf; return; }
  M.animate(0, to, { duration: 1.4, ease: EASE, onUpdate: v => { el.textContent = pre + Math.round(v) + suf; } });
}

/* Cartes inclinables (3D) et boutons magnétiques */
if (M && !reduced && finePointer) {
  $$('.p-card').forEach(card => {
    card.style.transformPerspective = '900px';
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      M.animate(card, { rotateY: px * 7, rotateX: py * -7, y: -6 }, SOFT);
    });
    card.addEventListener('pointerleave', () => M.animate(card, { rotateY: 0, rotateX: 0, y: 0 }, SOFT));
  });
  $$('[data-magnetic]').forEach(btn => {
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      M.animate(btn, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3 }, SPRING);
    });
    btn.addEventListener('pointerleave', () => M.animate(btn, { x: 0, y: 0 }, { type: 'spring', stiffness: 300, damping: 12 }));
  });
}
if (M && !reduced && M.press) M.press('.btn, .price-card, .cart-btn, .chips span, .p-add, .swatch, .qv-thumbs button', el => {
  M.animate(el, { scale: 0.96 }, { type: 'spring', stiffness: 500, damping: 25 });
  return () => M.animate(el, { scale: 1 }, { type: 'spring', stiffness: 500, damping: 15 });
});

/* ═══════════════════════════════════════════════
   PANNEAUX & MODALES
   ═══════════════════════════════════════════════ */
const overlay = $('#overlay');
let openLayer = null, lastFocus = null;
function openLayerEl(el, kind) {
  if (openLayer) closeLayer(true, false);
  else lastFocus = document.activeElement;
  openLayer = { el, kind };
  overlay.classList.add('on'); document.body.classList.add('locked');
  el.setAttribute('aria-hidden', 'false');
  if (kind === 'drawer') {
    el.style.visibility = 'visible';
    anim(el, { x: ['105%', '0%'] }, { type: 'spring', stiffness: 260, damping: 32 });
  } else {
    el.classList.add('on');
    anim($('.modal-card', el), { opacity: [0, 1], y: [40, 0], scale: [0.97, 1] }, SPRING);
  }
  setTimeout(() => { const f = $('.x-btn', el); f && f.focus({ preventScroll: true }); }, 60);
}
function closeLayer(instant = false, refocus = true) {
  if (!openLayer) return;
  const { el, kind } = openLayer; openLayer = null;
  if (refocus) { overlay.classList.remove('on'); document.body.classList.remove('locked'); }
  el.setAttribute('aria-hidden', 'true');
  const smooth = !instant && M && !reduced;
  if (kind === 'drawer') {
    if (smooth) M.animate(el, { x: '105%' }, { duration: 0.4, ease: EASE }).finished.then(() => { if (openLayer?.el !== el) el.style.visibility = 'hidden'; });
    else { el.style.transform = 'translateX(105%)'; el.style.visibility = 'hidden'; }
  } else {
    const card = $('.modal-card', el);
    if (smooth) M.animate(card, { opacity: 0, y: 20, scale: 0.98 }, { duration: 0.22 }).finished.then(() => { if (openLayer?.el !== el) el.classList.remove('on'); });
    else { el.classList.remove('on'); card.style.opacity = 0; }
  }
  if (refocus && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}
overlay.addEventListener('click', () => closeLayer());
$$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) closeLayer(); }));
addEventListener('keydown', e => { if (e.key === 'Escape') { if (openLayer) closeLayer(); else if (menuOpen) toggleMenu(false); } });
document.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) { closeLayer(); return; }
  const pv = e.target.closest('[data-product]');
  if (pv) { e.preventDefault(); openProduct(pv.dataset.product); return; }
  const ad = e.target.closest('[data-add]');
  if (ad) { e.preventDefault(); const k = ad.dataset.add; addToCart(k, null, 1, ad); }
});

/* ═══════════════════════════════════════════════
   APERÇU PRODUIT (composant tarifs, coloris, quantité)
   ═══════════════════════════════════════════════ */
const QV = { key: '', opt: null, qty: 1 };
function qvPrice() {
  const p = PRODUCTS[QV.key];
  return p.sizes ? p.sizes.find(s => s.id === QV.opt).price : p.price;
}
function qvUpdate() {
  $('#qty-val').textContent = QV.qty;
  $('#qv-total').textContent = chf(qvPrice() * QV.qty);
  $('#qv-price').textContent = chf(qvPrice());
}
function setQvImage(src, alt) {
  const main = $('#qv-main');
  const old = $$('img', main);
  const img = new Image(); img.src = src; img.alt = alt || '';
  main.appendChild(img);
  if (!old.length) return;
  anim(img, { opacity: [0, 1], scale: [1.06, 1] }, { duration: 0.6, ease: EASE }).finished.then(() => old.forEach(o => o.remove()));
  if (!M || reduced) old.forEach(o => o.remove());
}
function openProduct(k) {
  const p = PRODUCTS[k]; if (!p) return;
  Object.assign(QV, { key: k, qty: 1, opt: p.sizes ? p.sizes[0].id : p.colors ? null : null });
  $('#qv-line').textContent = p.line;
  $('#qv-title').textContent = p.name;
  $('#qv-notes').textContent = p.notes;
  $('#qv-desc').textContent = p.desc;
  $('#qv-main').innerHTML = '';
  $('#qv-main').style.setProperty('--bg', p.bg);
  setQvImage(IMG + p.imgs[0], p.line + ' ' + p.name);
  const pics = [...p.imgs, p.cut];
  $('#qv-thumbs').innerHTML = pics.length > 1 ? pics.map((src, i) => `<button type="button" class="${i ? '' : 'on'}${src === p.cut ? ' cut' : ''}" data-src="${IMG + src}" aria-label="Photo ${i + 1}" style="--bg:${p.bg}"><img src="${IMG + src}" alt="" loading="lazy"/></button>`).join('') : '';
  let opts = '';
  if (p.sizes) {
    opts = `<div class="opt-l">Format</div><div class="pricing" role="radiogroup" aria-label="Format">
      <span class="pricing-pill" id="pricing-pill" aria-hidden="true"></span>
      ${p.sizes.map((s, i) => `<button type="button" class="price-card${i ? '' : ' on'}" role="radio" aria-checked="${!i}" data-size="${s.id}">
        <span class="pc-top"><b>${s.label}</b><em>${chf(s.price)}</em></span><span class="pc-meta">${s.meta}</span>
        <span class="pc-bar"><i style="--w:${i ? 100 : 66}%"></i></span></button>`).join('')}
    </div>`;
  } else if (p.colors) {
    opts = `<div class="opt-l">Coloris <span id="qv-color">— à choisir</span></div><div class="swatches">${p.colors.map(c => `<button type="button" class="swatch" data-color="${esc(c.n)}" aria-pressed="false"><i style="background:${c.c.length > 1 ? `linear-gradient(90deg,${c.c[0]} 50%,${c.c[1]} 50%)` : c.c[0]}"></i>${esc(c.n)}</button>`).join('')}</div>`;
  }
  $('#qv-opts').innerHTML = opts;
  $('#qv-facts').innerHTML = [...p.facts, ...COMMON_FACTS].map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('');
  const add = $('#qv-add'); add.disabled = !p.active; $('span', add).textContent = p.active ? 'Ajouter au panier' : 'Épuisé';
  qvUpdate();
  openLayerEl($('#modal-product'), 'modal');
  $('.qv-info').scrollTop = 0;
  if (p.sizes) requestAnimationFrame(() => placePricePill(false));
}
function placePricePill(animate = true) {
  const pill = $('#pricing-pill'), card = $('.price-card.on');
  if (!pill || !card) return;
  const box = { x: card.offsetLeft, y: card.offsetTop, width: card.offsetWidth, height: card.offsetHeight };
  if (M) M.animate(pill, box, animate && !reduced ? SPRING : { duration: 0 });
  else Object.assign(pill.style, { transform: `translate(${box.x}px, ${box.y}px)`, width: box.width + 'px', height: box.height + 'px' });
}
addEventListener('resize', () => placePricePill(false));
$('#modal-product').addEventListener('click', e => {
  const pc = e.target.closest('.price-card');
  if (pc) {
    QV.opt = pc.dataset.size;
    $$('.price-card').forEach(x => { x.classList.toggle('on', x === pc); x.setAttribute('aria-checked', x === pc); });
    placePricePill(); qvUpdate();
  }
  const sw = e.target.closest('.swatch');
  if (sw) {
    QV.opt = sw.dataset.color;
    $$('.swatch').forEach(x => { x.classList.toggle('on', x === sw); x.setAttribute('aria-pressed', x === sw); });
    $('#qv-color').textContent = QV.opt;
    $('.swatches').classList.remove('err');
  }
  const th = e.target.closest('.qv-thumbs button');
  if (th && !th.classList.contains('on')) {
    $$('.qv-thumbs button').forEach(x => x.classList.toggle('on', x === th));
    $('#qv-main').classList.toggle('cut', th.classList.contains('cut'));
    setQvImage(th.dataset.src, PRODUCTS[QV.key].name);
  }
});
$('#qty-minus').addEventListener('click', () => { QV.qty = Math.max(1, QV.qty - 1); qvUpdate(); });
$('#qty-plus').addEventListener('click', () => { QV.qty = Math.min(20, QV.qty + 1); qvUpdate(); });
$('#qv-add').addEventListener('click', e => {
  const p = PRODUCTS[QV.key];
  if (p.colors && !QV.opt) {
    toast('Choisissez d\'abord un coloris');
    $('.swatches').classList.add('err');
    anim('.swatches', { x: [0, -8, 8, -5, 5, 0] }, { duration: 0.4 });
    return;
  }
  addToCart(QV.key, QV.opt, QV.qty, e.currentTarget).then(() => closeLayer());
});

/* ═══════════════════════════════════════════════
   PANIER
   ═══════════════════════════════════════════════ */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('yumiya_cart_v2') || '[]').filter(i => PRODUCTS[i.key]); } catch (_) { cart = []; }
const saveCart = () => { try { localStorage.setItem('yumiya_cart_v2', JSON.stringify(cart)); } catch (_) {} };
const cartSub = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
const cartTotal = () => (cart.length ? cartSub() + SITE.shipping : 0);
const cartQty = () => cart.reduce((s, i) => s + i.qty, 0);
const optLabel = (k, opt) => { const p = PRODUCTS[k]; if (p.sizes) { const s = p.sizes.find(x => x.id === opt); return `${s.label} · ${s.meta}`; } return opt || ''; };
let lastCount = -1;

function renderCart() {
  const n = cartQty(), badge = $('#cart-count');
  badge.textContent = n;
  if (n !== lastCount) {
    if (n > 0 && lastCount > 0) anim(badge, { scale: [1.6, 1] }, { type: 'spring', stiffness: 400, damping: 12 });
    else anim(badge, { scale: n > 0 ? 1 : 0 }, SPRING);
    lastCount = n;
  }
  const body = $('#cart-body');
  if (!cart.length) {
    body.innerHTML = `<div class="cart-empty"><img src="${IMG}logo.webp" alt=""/><p><strong>Votre panier est vide</strong><br/>Laissez-vous tenter par nos créations.</p><a class="btn btn-ghost btn-sm" href="#boutique" data-close>Voir la boutique</a></div>`;
    $('#cart-ft').style.display = 'none';
  } else {
    body.innerHTML = cart.map((it, i) => `<div class="cart-item">
      <img src="${IMG + PRODUCTS[it.key].imgs[0]}" alt=""/>
      <div><strong>${esc(PRODUCTS[it.key].name)}</strong><small>${esc(optLabel(it.key, it.opt) || PRODUCTS[it.key].line)}</small>
        <div class="qty"><button type="button" data-dec="${i}" aria-label="Moins">−</button><span>${it.qty}</span><button type="button" data-inc="${i}" aria-label="Plus">+</button></div></div>
      <div><div class="ci-price">${chf(it.price * it.qty)}</div><button type="button" class="cart-rm" data-rm="${i}">Retirer</button></div>
    </div>`).join('');
    $('#cart-ft').style.display = '';
  }
  $('#cart-sub').textContent = chf(cartSub());
  $('#cart-ship').textContent = chf(SITE.shipping);
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
  if (!M || reduced || !from) return Promise.resolve();
  const a = from.getBoundingClientRect(), b = $('#cart-open').getBoundingClientRect();
  const h = document.createElement('div'); h.className = 'fly-heart'; h.innerHTML = HEART;
  h.style.left = a.left + a.width / 2 - 14 + 'px'; h.style.top = a.top + a.height / 2 - 14 + 'px';
  document.body.appendChild(h);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
  return M.animate(h, { x: [0, dx * 0.3, dx], y: [0, dy - 120, dy], scale: [1, 1.5, 0.4], rotate: [0, -20, 10] }, { duration: 0.8, ease: [0.5, 0, 0.3, 1] })
    .finished.then(() => { h.remove(); M.animate('#cart-open', { scale: [1.25, 1] }, { type: 'spring', stiffness: 500, damping: 10 }); });
}
async function addToCart(key, opt, qty, fromEl) {
  const p = PRODUCTS[key]; if (!p || !p.active) return;
  const price = p.sizes ? p.sizes.find(s => s.id === (opt || p.sizes[0].id)).price : p.price;
  opt = p.sizes ? (opt || p.sizes[0].id) : opt;
  const ex = cart.find(i => i.key === key && i.opt === opt);
  if (ex) ex.qty += qty; else cart.push({ key, opt, price, qty });
  await flyHeart(fromEl);
  renderCart();
  toast(`Ajouté : ${p.name}${opt && !p.sizes ? ' · ' + opt : ''} ×${qty}`, true);
}
$('#cart-open').addEventListener('click', () => openLayerEl($('#cart'), 'drawer'));

let toastT;
function toast(msg, withCart = false) {
  const t = $('#toast');
  t.innerHTML = `<span class="t-heart">♥</span><span>${esc(msg)}</span>${withCart ? '<button type="button" class="t-link">Voir le panier</button>' : ''}`;
  const btn = $('.t-link', t); if (btn) btn.onclick = () => { hideToast(); openLayerEl($('#cart'), 'drawer'); };
  anim(t, { transform: ['translate(-50%, 160%)', 'translate(-50%, 0%)'] }, SPRING);
  if (!M || reduced) t.style.transform = 'translate(-50%, 0)';
  clearTimeout(toastT); toastT = setTimeout(hideToast, 3200);
}
function hideToast() {
  const t = $('#toast');
  anim(t, { transform: 'translate(-50%, 160%)' }, { duration: 0.35, ease: EASE });
  if (!M || reduced) t.style.transform = 'translate(-50%, 160%)';
}

/* ═══════════════════════════════════════════════
   ENVOI DES FORMULAIRES (Formspree, puis secours par email)
   ═══════════════════════════════════════════════ */
async function sendForm(data) {
  const fd = () => { const f = new FormData(); Object.entries(data).forEach(([k, v]) => { if (v != null && v !== '') f.append(k, v); }); return f; };
  const once = () => fetch(SITE.formspree, { method: 'POST', headers: { Accept: 'application/json' }, body: fd() }).then(r => r.ok);
  try { if (await once()) return true; } catch (_) {}
  await new Promise(r => setTimeout(r, 1200));
  try { return await once(); } catch (_) { return false; }
}
function mailtoFor(subject, data) {
  const body = Object.entries(data).filter(([k, v]) => v && k[0] !== '_').map(([k, v]) => k.replace(/_/g, ' ') + ' : ' + v).join('\n');
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function failBox(el, subject, data, msg) {
  el.innerHTML = `<div class="warn"><b>Envoi automatique impossible</b><span>${msg}</span><a class="btn btn-primary btn-block" href="${mailtoFor(subject, data)}">Envoyer par email</a></div>`;
  el.hidden = false;
}
function validate(form) {
  let ok = true;
  const groups = new Set();
  $$('[required]', form).forEach(inp => {
    if (inp.type === 'radio') { groups.add(inp.name); return; }
    const v = inp.value.trim();
    let bad = !v || (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    if (inp.pattern && v && !new RegExp('^' + inp.pattern + '$').test(v)) bad = true;
    if (inp.type === 'tel' && v.replace(/\D/g, '').length < 9) bad = true;
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
const formData = form => Object.fromEntries([...new FormData(form)].filter(([k]) => k !== '_gotcha'));
function showSuccess(ok) {
  ok.classList.add('on');
  anim($('.success-ic', ok), { scale: [0, 1], rotate: [-90, 0] }, { type: 'spring', stiffness: 260, damping: 12 });
  anim($$('h4, p', ok), { opacity: [0, 1], y: [16, 0] }, { duration: 0.5, ease: EASE, delay: stagger(0.08, { startDelay: 0.15 }) });
}
function wire(form, success, makeSubject, type) {
  form.addEventListener('input', e => e.target.closest('.field')?.classList.remove('err'));
  form.addEventListener('change', e => e.target.closest('.field')?.classList.remove('err'));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if ($('[name="_gotcha"]', form)?.checked) return;
    if (!validate(form)) return;
    const data = { _subject: makeSubject(form), type, ...formData(form) };
    data._replyto = data.email;
    const btn = $('button[type=submit]', form), label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Envoi…';
    const ok = await sendForm(data);
    btn.disabled = false; btn.textContent = label;
    form.hidden = true;
    if (ok) { form.reset(); showSuccess(success); }
    else {
      const box = document.createElement('div'); success.parentNode.insertBefore(box, success);
      failBox(box, data._subject, data, 'Votre message n\'a pas pu être envoyé automatiquement. Envoyez-le-nous par email : il est déjà rédigé.');
    }
  });
}
wire($('#custom-form'), $('#custom-success'), f => `Demande sur mesure — ${$('[name="nom"]', f).value.trim()}`, 'Sur mesure');
wire($('#contact-form'), $('#contact-success'), f => `Contact — ${$('[name="sujet"]', f).value} — ${$('[name="nom"]', f).value.trim()}`, 'Contact');

/* ═══════════════════════════════════════════════
   COMMANDE : livraison → paiement TWINT / carte → confirmation
   ═══════════════════════════════════════════════ */
const co = { ref: '', order: null, total: 0, method: '' };
function coStep(n) {
  $('#co-addr').hidden = n !== 1; $('#co-pay').hidden = n !== 2; $('#co-done').hidden = n !== 3;
  $$('#co-steps span').forEach((s, i) => { s.classList.toggle('on', i === n - 1); s.classList.toggle('done', i < n - 1); });
  const pane = [$('#co-addr'), $('#co-pay'), $('#co-done')][n - 1];
  anim(pane, { opacity: [0, 1], x: [24, 0] }, { duration: 0.45, ease: EASE });
  $('.co-main').scrollTop = 0;
}
function coSummary() {
  $('#co-sum').innerHTML = cart.map(i => `<div class="sum-row"><img src="${IMG + PRODUCTS[i.key].imgs[0]}" alt=""/><span>${esc(PRODUCTS[i.key].name)}<small>${esc(optLabel(i.key, i.opt))} ×${i.qty}</small></span><b>${chf(i.price * i.qty)}</b></div>`).join('') +
    `<div class="sum-line"><span>Livraison (Suisse)</span><span>${chf(SITE.shipping)}</span></div><div class="sum-line total"><span>Total</span><span>${chf(cartTotal())}</span></div>`;
}
$('#checkout-open').addEventListener('click', () => {
  if (!cart.length) return;
  $('#co-warn').hidden = true;
  coSummary(); coStep(1);
  openLayerEl($('#modal-checkout'), 'modal');
});
const coForm = $('#co-addr');
coForm.addEventListener('input', e => e.target.closest('.field')?.classList.remove('err'));
coForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!validate(coForm)) return;
  const d = formData(coForm);
  co.total = cartTotal();
  co.ref = 'YC-' + Date.now().toString(36).slice(-5).toUpperCase();
  const lines = cart.map(i => `${PRODUCTS[i.key].name}${i.opt ? ' (' + optLabel(i.key, i.opt) + ')' : ''} ×${i.qty} ${chf(i.price * i.qty)}`);
  lines.push('Livraison ' + chf(SITE.shipping));
  co.order = { reference: co.ref, ...d, commande: lines.join(' | '), montant: chf(co.total), date: new Date().toLocaleString('fr-CH') };
  const subj = `Nouvelle commande ${co.ref} — ${d.prenom} ${d.nom} — ${chf(co.total)}`;
  sendForm({ _subject: subj, _replyto: d.email, type: 'Commande', ...co.order }).then(ok => {
    if (!ok) failBox($('#co-warn'), subj, co.order, "Votre commande n'a pas pu nous être transmise automatiquement. Envoyez-nous le récapitulatif (déjà rédigé) en un clic, puis réglez votre commande ci-dessous.");
  });
  const amt = co.total.toFixed(2);
  $('#twint-link').href = `${SITE.twint}&amount=${amt}&trxInfo=${encodeURIComponent(co.ref)}`;
  $('#sumup-link').href = SITE.sumup;
  $('#twint-cta').textContent = `Payer ${chf(co.total)} avec TWINT`;
  $('#sumup-cta').textContent = `Payer ${chf(co.total)} par carte`;
  $('#sumup-amt').textContent = amt;
  $('#pay-amount').textContent = chf(co.total);
  $('#ord-ref').textContent = co.ref;
  coStep(2);
});
$$('[data-pay]').forEach(a => a.addEventListener('click', () => {
  co.method = a.dataset.pay;
  if (co.method !== 'TWINT') {
    const amt = co.total.toFixed(2);
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(amt).then(() => toast('Montant copié : ' + chf(co.total))).catch(() => toast('Montant à régler : ' + chf(co.total)));
    else toast('Montant à régler : ' + chf(co.total));
  }
}));
$('#back-addr').addEventListener('click', () => coStep(1));
$('#paid-btn').addEventListener('click', () => {
  if (co.order) sendForm({ _subject: `Paiement annoncé — ${co.ref} — ${chf(co.total)}`, type: 'Paiement annoncé', reference: co.ref, client: `${co.order.prenom} ${co.order.nom}`, email: co.order.email, montant: chf(co.total), moyen: co.method || 'non précisé', date: new Date().toLocaleString('fr-CH') });
  $('#done-ref').textContent = co.ref;
  $('#co-sum').innerHTML = `<div class="sum-line"><span>Commande</span><span>${co.ref}</span></div><div class="sum-line total"><span>Total</span><span>${chf(co.total)}</span></div>`;
  cart = []; renderCart(); coForm.reset();
  coStep(3);
  anim('#co-done .success-ic', { scale: [0, 1], rotate: [-90, 0] }, { type: 'spring', stiffness: 260, damping: 12 });
});

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
      M.animate(body, { height: ['0px', body.scrollHeight + 'px'], opacity: [0, 1] }, { duration: 0.45, ease: EASE }).finished.then(() => { body.style.height = ''; });
    }
  });
});

$('#year').textContent = new Date().getFullYear();
onScroll();
