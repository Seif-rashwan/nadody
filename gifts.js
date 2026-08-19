const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ══════════════════════════════════════════════════════════════
// 1. GIFTS DATA — add to JS
// ══════════════════════════════════════════════════════════════
const giftsData = `
// ── BIRTHDAY GIFTS ──
const GIFTS = [
  {
    id: 1,
    locked: false,
    color: '#D4AF37',
    ribbonColor: '#D98896',
    badge: '✨ Gift #1',
    name: 'Seropipe Extreme Lashes Serum',
    image: './serum.png',
    tagline: 'لأن كل تفصيلة فيكي تستحق الاهتمام ✨',
    loveNote: 'بلاحظ من زمان إنك بتهتمي بنفسك وبتسأليني: بستخدمها صح ولا لأ؟ اللي مشكوش فيه إنك دايماً بتعمليها صح أكتر من أي حد. الهدية دي مش بس سيروم — دي لحظتي بقولك فيها: رمشاتك الصغيرة دول بيوقفوا قلبي. 🦋',
    how: [
      { icon: '🌅', step: 'الصبح: قبل المكياج' },
      { icon: '🌙', step: 'بالليل: بعد إزالة المكياج' },
      { icon: '✍️', step: 'ادهنيه من الجذر للطرف على الرموش والحواجب' },
      { icon: '👁️', step: 'الرموش العلوية والسفلية والحواجب' },
    ]
  },
  { id: 2, locked: true, color: '#9b72cf', ribbonColor: '#7b52af', badge: '🔒 Coming Soon', name: '?????', image: null, tagline: 'هدية جاية قريباً... 🤍', loveNote: '', how: [] },
  { id: 3, locked: true, color: '#D98896', ribbonColor: '#c0697a', badge: '🔒 Coming Soon', name: '?????', image: null, tagline: 'هدية جاية قريباً... 🤍', loveNote: '', how: [] },
];

`;

html = html.replace('// ── BALLOON LAUNCHER ──', giftsData + '// ── BALLOON LAUNCHER ──');

// ══════════════════════════════════════════════════════════════
// 2. GIFT CSS
// ══════════════════════════════════════════════════════════════
const giftCSS = `
    /* ══════════════════════════════════
       BIRTHDAY GIFTS SECTION
    ══════════════════════════════════ */
    .gifts-section { margin:0 20px 28px; }
    .gifts-section-title {
      text-align:center; font-family:'Dancing Script',cursive;
      font-size:1.4rem; color:var(--gold); margin-bottom:6px;
      letter-spacing:1px;
    }
    .gifts-section-sub {
      text-align:center; font-size:0.72rem; color:var(--text-dim);
      margin-bottom:18px; letter-spacing:0.5px;
    }
    .gifts-row {
      display:flex; gap:14px; justify-content:center;
      flex-wrap:nowrap; overflow-x:auto; padding-bottom:6px;
    }

    /* === GIFT BOX === */
    .gift-box-wrap {
      flex:0 0 auto; width:120px; cursor:pointer;
      position:relative;
    }
    .gift-box-wrap.locked { opacity:0.7; cursor:default; }
    .gift-badge {
      text-align:center; font-size:0.58rem; font-weight:700;
      letter-spacing:1px; text-transform:uppercase;
      padding:2px 6px; border-radius:20px; margin-bottom:6px;
      display:inline-block; width:100%;
    }

    /* The box itself */
    .gift-box {
      width:110px; height:110px; position:relative;
      margin:0 auto;
    }
    .gift-box-lid {
      width:110px; height:32px; position:absolute;
      top:0; left:0; border-radius:8px 8px 0 0;
      z-index:2; transition:transform 0.6s cubic-bezier(0.4,0,0.2,1);
      transform-origin: top center;
    }
    .gift-box-lid.opened {
      transform: rotateX(-130deg) translateY(-10px);
    }
    .gift-box-body {
      width:110px; height:90px; position:absolute;
      bottom:0; left:0; border-radius:0 0 12px 12px;
      display:flex; align-items:center; justify-content:center;
      overflow:hidden;
    }
    /* Ribbons on lid */
    .lid-ribbon-h {
      position:absolute; top:50%; left:0; right:0; height:14px;
      transform:translateY(-50%);
    }
    /* Bow on lid */
    .bow {
      position:absolute; top:-22px; left:50%; transform:translateX(-50%);
      font-size:1.4rem; z-index:3;
    }
    /* Ribbon on body */
    .body-ribbon-v {
      position:absolute; top:0; bottom:0; left:50%; width:14px;
      transform:translateX(-50%); opacity:0.6;
    }
    .body-ribbon-h {
      position:absolute; left:0; right:0; top:35%; height:14px; opacity:0.6;
    }

    /* Gift name tag */
    .gift-name-tag {
      text-align:center; margin-top:10px; font-size:0.65rem;
      color:var(--ink); font-weight:600; line-height:1.3;
    }
    .gift-tagline {
      text-align:center; font-size:0.58rem; color:var(--text-dim);
      margin-top:2px;
    }

    /* Glow pulse for unlocked */
    .gift-box-wrap:not(.locked) .gift-box {
      animation: giftGlow 2.5s ease-in-out infinite;
    }
    @keyframes giftGlow {
      0%,100% { filter: drop-shadow(0 4px 16px rgba(212,175,55,0.3)); }
      50%      { filter: drop-shadow(0 6px 28px rgba(212,175,55,0.65)); }
    }

    /* === GIFT REVEAL OVERLAY === */
    .gift-reveal-overlay {
      position:fixed; inset:0; z-index:600;
      background:rgba(26,10,46,0.88);
      backdrop-filter:blur(8px);
      display:flex; align-items:center; justify-content:center;
      opacity:0; pointer-events:none;
      transition:opacity 0.4s ease;
    }
    .gift-reveal-overlay.show {
      opacity:1; pointer-events:all;
    }
    .gift-reveal-card {
      background:linear-gradient(145deg,#FAF6F5 0%,#FFF0F5 100%);
      border:1px solid rgba(212,175,55,0.35);
      border-radius:24px; padding:24px 20px;
      max-width:360px; width:90vw; max-height:88vh;
      overflow-y:auto; text-align:center;
      box-shadow:0 20px 60px rgba(74,59,66,0.3);
      animation:cardPop 0.5s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes cardPop {
      from{transform:scale(0.6);opacity:0;}
      to{transform:scale(1);opacity:1;}
    }
    .gift-reveal-badge {
      font-size:0.62rem; font-weight:700; letter-spacing:2px;
      text-transform:uppercase; color:var(--gold);
      background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.3);
      padding:4px 12px; border-radius:20px; display:inline-block;
      margin-bottom:14px;
    }
    .gift-product-img {
      width:120px; height:150px; object-fit:contain;
      margin:0 auto 12px; display:block;
      border-radius:12px;
      filter:drop-shadow(0 8px 20px rgba(74,59,66,0.15));
    }
    .gift-product-img-placeholder {
      width:120px; height:150px; margin:0 auto 12px;
      background:linear-gradient(135deg,#e8d5b7,#D4AF37);
      border-radius:12px; display:flex; align-items:center;
      justify-content:center; font-size:3rem;
    }
    .gift-reveal-name {
      font-family:'Dancing Script',cursive; font-size:1.3rem;
      color:var(--ink); margin-bottom:4px; font-weight:700;
    }
    .gift-reveal-tagline {
      font-size:0.72rem; color:var(--rose); margin-bottom:16px;
    }
    .gift-love-note {
      background:linear-gradient(135deg,rgba(217,136,150,0.1),rgba(212,175,55,0.06));
      border:1px solid rgba(217,136,150,0.25); border-radius:14px;
      padding:14px 16px; font-size:0.8rem; color:#4A3B42;
      line-height:1.7; text-align:right; direction:rtl;
      margin-bottom:16px; font-style:italic;
    }
    .gift-how-title {
      font-size:0.65rem; font-weight:700; letter-spacing:2px;
      text-transform:uppercase; color:var(--text-dim);
      margin-bottom:10px;
    }
    .gift-how-list { text-align:right; direction:rtl; }
    .gift-how-item {
      display:flex; align-items:flex-start; gap:10px;
      margin-bottom:8px; padding:8px 12px;
      background:white; border-radius:10px;
      border:1px solid rgba(212,175,55,0.15);
      font-size:0.75rem; color:#4A3B42;
    }
    .gift-how-icon { font-size:1rem; flex-shrink:0; }
    .gift-close-btn {
      margin-top:20px; padding:12px 28px;
      background:linear-gradient(135deg,var(--gold),var(--rose));
      color:white; border:none; border-radius:50px;
      font-size:0.85rem; font-weight:600; cursor:pointer;
      letter-spacing:0.5px;
      box-shadow:0 4px 18px rgba(212,175,55,0.35);
    }
    .gift-sparkle-ring {
      font-size:1.4rem; letter-spacing:8px; margin-bottom:8px;
      animation:spinSlow 8s linear infinite;
    }
    @keyframes spinSlow { to{transform:rotate(360deg);} }
`;

html = html.replace('    #audio-player { display:none; }', '    #audio-player { display:none; }' + giftCSS);

// ══════════════════════════════════════════════════════════════
// 3. GIFT HTML — section in home + overlay
// ══════════════════════════════════════════════════════════════

// Add gifts section in home page BEFORE candle section
html = html.replace(
  `        <div class="candle-section fade-in-up delay-2">`,
  `        <!-- ─── BIRTHDAY GIFTS ─── -->
        <div class="gifts-section fade-in-up delay-2">
          <div class="gifts-section-title">🎁 Birthday Gifts</div>
          <div class="gifts-section-sub">tap a gift to unwrap it 💕</div>
          <div class="gifts-row" id="gifts-row"></div>
        </div>

        <div class="candle-section fade-in-up delay-2">`
);

// Add overlay at end of app-inner (before balloon launcher button)
html = html.replace(
  `    <!-- Balloon Launcher Button -->`,
  `    <!-- Gift Reveal Overlay -->
    <div class="gift-reveal-overlay" id="gift-reveal-overlay" onclick="closeGiftReveal(event)">
      <div class="gift-reveal-card" id="gift-reveal-card">
        <div class="gift-sparkle-ring" id="gift-sparkle-ring">✨💕✨</div>
        <div class="gift-reveal-badge" id="gift-reveal-badge">Gift #1</div>
        <div id="gift-img-wrap"></div>
        <div class="gift-reveal-name" id="gift-reveal-name"></div>
        <div class="gift-reveal-tagline" id="gift-reveal-tagline"></div>
        <div class="gift-love-note" id="gift-love-note"></div>
        <div class="gift-how-title">💆‍♀️ إزاي تستخدميه</div>
        <div class="gift-how-list" id="gift-how-list"></div>
        <button class="gift-close-btn" onclick="closeGiftReveal()">يسلم إيدي اللي جابهالك 💕</button>
      </div>
    </div>

    <!-- Balloon Launcher Button -->`
);

// ══════════════════════════════════════════════════════════════
// 4. GIFT JS
// ══════════════════════════════════════════════════════════════
const giftJS = `
// ── GIFTS ──
function renderGifts() {
  const row = document.getElementById('gifts-row');
  if(!row) return;
  row.innerHTML = '';
  GIFTS.forEach(gift => {
    const wrap = document.createElement('div');
    wrap.className = 'gift-box-wrap' + (gift.locked ? ' locked' : '');
    
    const badgeColor = gift.locked ? '#999' : gift.color;
    const bodyBg = \`linear-gradient(145deg, \${gift.color}22, \${gift.color}44)\`;
    const lidBg = \`linear-gradient(135deg, \${gift.color}, \${gift.ribbonColor})\`;
    
    wrap.innerHTML = \`
      <div style="text-align:center;">
        <span class="gift-badge" style="background:\${gift.color}22; color:\${badgeColor}; border:1px solid \${gift.color}44;">\${gift.badge}</span>
      </div>
      <div class="gift-box" id="gbox-\${gift.id}">
        <div class="bow">\${gift.locked ? '🔒' : '🎀'}</div>
        <div class="gift-box-lid" id="lid-\${gift.id}" style="background:\${lidBg};">
          <div class="lid-ribbon-h" style="background:rgba(255,255,255,0.3);"></div>
        </div>
        <div class="gift-box-body" style="background:\${bodyBg}; border:2px solid \${gift.color}55;">
          <div class="body-ribbon-v" style="background:\${gift.ribbonColor};"></div>
          <div class="body-ribbon-h" style="background:\${gift.ribbonColor};"></div>
          <span style="font-size:2rem;">\${gift.locked ? '❔' : '🎁'}</span>
        </div>
      </div>
      <div class="gift-name-tag">\${gift.name}</div>
      <div class="gift-tagline">\${gift.tagline}</div>
    \`;
    
    if(!gift.locked) {
      wrap.onclick = () => openGift(gift);
    }
    row.appendChild(wrap);
  });
}

function openGift(gift) {
  // Lift lid animation
  const lid = document.getElementById('lid-' + gift.id);
  if(lid) lid.classList.add('opened');

  // Mini confetti burst
  const gbox = document.getElementById('gbox-' + gift.id);
  if(gbox) {
    const rect = gbox.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top;
    ['💕','✨','🌸','💖','🎉'].forEach((em, i) => {
      const p = document.createElement('div');
      p.className = 'mini-heart';
      p.textContent = em;
      p.style.left = (cx - 10) + 'px';
      p.style.top = cy + 'px';
      p.style.setProperty('--tx', ((Math.random()-0.5)*160)+'px');
      p.style.setProperty('--ty', (-(40+Math.random()*100))+'px');
      p.style.animationDelay = (i*80)+'ms';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 900);
    });
  }

  // Show overlay after short delay
  setTimeout(() => {
    // Fill overlay content
    document.getElementById('gift-reveal-badge').textContent = gift.badge;
    document.getElementById('gift-reveal-name').textContent = gift.name;
    document.getElementById('gift-reveal-tagline').textContent = gift.tagline;
    document.getElementById('gift-love-note').textContent = gift.loveNote;

    // Image or placeholder
    const imgWrap = document.getElementById('gift-img-wrap');
    if(gift.image) {
      imgWrap.innerHTML = \`<img src="\${gift.image}" class="gift-product-img" alt="\${gift.name}" onerror="this.parentNode.innerHTML='<div class=gift-product-img-placeholder>✨</div>'">\`;
    } else {
      imgWrap.innerHTML = '<div class="gift-product-img-placeholder">🎁</div>';
    }

    // How to use
    const howList = document.getElementById('gift-how-list');
    howList.innerHTML = gift.how.map(h => \`
      <div class="gift-how-item">
        <span class="gift-how-icon">\${h.icon}</span>
        <span>\${h.step}</span>
      </div>
    \`).join('');

    document.getElementById('gift-reveal-overlay').classList.add('show');
  }, 400);
}

function closeGiftReveal(e) {
  if(e && e.target !== document.getElementById('gift-reveal-overlay')) return;
  document.getElementById('gift-reveal-overlay').classList.remove('show');
}
`;

html = html.replace('</script>', giftJS + '\n</script>');

// Add renderGifts() call inside initApp
html = html.replace(
  '  renderStars();\n  checkBirthday();',
  '  renderGifts();\n  renderStars();\n  checkBirthday();'
);

fs.writeFileSync('index.html', html);

// Verify
const s = html.indexOf('<script>') + 8;
const e = html.indexOf('</script>');
try { new Function(html.substring(s, e)); console.log('✅ JS OK'); } catch(err) { console.log('❌ JS ERROR:', err.message); }
console.log('✅ GIFTS data:', html.includes('const GIFTS ='));
console.log('✅ Gift section HTML:', html.includes('gifts-section'));
console.log('✅ Overlay:', html.includes('gift-reveal-overlay'));
console.log('✅ renderGifts called:', html.includes('renderGifts()'));
