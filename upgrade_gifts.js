const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ══════════════════════════════════════════════════════════════
// STEP 1: Remove old gifts section from its current position
// ══════════════════════════════════════════════════════════════
html = html.replace(
  `        <!-- ─── BIRTHDAY GIFTS ─── -->
        <div class="gifts-section fade-in-up delay-2">
          <div class="gifts-section-title">🎁 Birthday Gifts</div>
          <div class="gifts-section-sub">tap a gift to unwrap it 💕</div>
          <div class="gifts-row" id="gifts-row"></div>
        </div>

        <div class="candle-section fade-in-up delay-2">`,
  `        <div class="candle-section fade-in-up delay-2">`
);

// ══════════════════════════════════════════════════════════════
// STEP 2: Add gifts section at BOTTOM of home page (before closing)
// ══════════════════════════════════════════════════════════════
html = html.replace(
  `        <div style="height:20px;"></div>
      </div>

      <!-- TIMELINE -->`,
  `        <!-- ─── BIRTHDAY GIFTS (bottom of home) ─── -->
        <div class="gifts-section fade-in-up delay-3">
          <div class="gifts-section-title">🎁 Birthday Gifts</div>
          <div class="gifts-section-sub">tap a gift to unwrap it 💕</div>
          <div class="gifts-row" id="gifts-row"></div>
        </div>

        <div style="height:20px;"></div>
      </div>

      <!-- TIMELINE -->`
);

// ══════════════════════════════════════════════════════════════
// STEP 3: Replace old gift overlay with multi-step unwrap overlay
// ══════════════════════════════════════════════════════════════
html = html.replace(
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
    </div>`,
  `    <!-- Gift Unwrap Overlay — Multi-Step Experience -->
    <div class="unwrap-overlay" id="unwrap-overlay">
      <!-- Step 1: 3D Gift Box -->
      <div class="unwrap-step" id="unwrap-step-1">
        <div class="unwrap-hint">✨ Tap the gift to unwrap it ✨</div>
        <div class="big-gift-scene" id="big-gift-scene" onclick="unwrapStep1()">
          <div class="big-gift-box" id="big-gift-box">
            <div class="big-ribbon-bow">🎀</div>
            <div class="big-ribbon-v" id="big-ribbon-v"></div>
            <div class="big-ribbon-h" id="big-ribbon-h"></div>
            <div class="big-lid" id="big-lid">
              <div class="big-lid-ribbon-h"></div>
            </div>
            <div class="big-body" id="big-body">
              <div class="big-body-ribbon-v"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Product Reveal with sparkles -->
      <div class="unwrap-step hidden" id="unwrap-step-2">
        <div class="product-reveal-wrap" id="product-reveal-wrap">
          <div class="product-glow"></div>
          <img id="unwrap-product-img" class="unwrap-product-img" src="" alt="Gift">
          <div class="product-name-reveal" id="product-name-reveal"></div>
        </div>
        <div class="unwrap-hint">✨ Tap to read your love note ✨</div>
      </div>

      <!-- Step 3: Envelope with love letter -->
      <div class="unwrap-step hidden" id="unwrap-step-3">
        <div class="love-envelope-scene" id="love-envelope-scene" onclick="unwrapStep3()">
          <div class="love-envelope" id="love-envelope">
            <div class="love-env-flap" id="love-env-flap"></div>
            <div class="love-env-body"></div>
            <div class="love-env-seal">💌</div>
          </div>
          <div class="love-env-hint">tap the envelope...</div>
        </div>
      </div>

      <!-- Step 4: The Letter Content -->
      <div class="unwrap-step hidden" id="unwrap-step-4">
        <div class="letter-scroll" id="letter-scroll">
          <div class="letter-scroll-badge" id="letter-scroll-badge"></div>
          <div class="letter-scroll-body" id="letter-scroll-body"></div>
          <div class="letter-scroll-divider">✦ How to use ✦</div>
          <div class="letter-scroll-how" id="letter-scroll-how"></div>
          <button class="gift-close-btn" onclick="closeUnwrap()">يسلم إيدي اللي جابهالك 💕</button>
        </div>
      </div>

      <!-- Close X -->
      <div class="unwrap-close" onclick="closeUnwrap()">✕</div>
    </div>`
);

// ══════════════════════════════════════════════════════════════
// STEP 4: Remove old gift CSS and add new unwrap CSS
// ══════════════════════════════════════════════════════════════
const oldGiftCSS = `    /* ══════════════════════════════════
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
    @keyframes spinSlow { to{transform:rotate(360deg);} }`;

const newGiftCSS = `    /* ══════════════════════════════════
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
    .gift-box-wrap {
      flex:0 0 auto; width:120px; cursor:pointer; position:relative;
    }
    .gift-box-wrap.locked { opacity:0.55; cursor:default; }
    .gift-badge {
      text-align:center; font-size:0.58rem; font-weight:700;
      letter-spacing:1px; text-transform:uppercase;
      padding:2px 6px; border-radius:20px; margin-bottom:6px;
      display:inline-block; width:100%;
    }
    .gift-box {
      width:110px; height:110px; position:relative; margin:0 auto;
    }
    .gift-box-lid {
      width:110px; height:32px; position:absolute; top:0; left:0;
      border-radius:8px 8px 0 0; z-index:2;
    }
    .gift-box-body {
      width:110px; height:90px; position:absolute; bottom:0; left:0;
      border-radius:0 0 12px 12px;
      display:flex; align-items:center; justify-content:center; overflow:hidden;
    }
    .bow { position:absolute; top:-22px; left:50%; transform:translateX(-50%); font-size:1.4rem; z-index:3; }
    .body-ribbon-v { position:absolute; top:0; bottom:0; left:50%; width:14px; transform:translateX(-50%); opacity:0.6; }
    .body-ribbon-h { position:absolute; left:0; right:0; top:35%; height:14px; opacity:0.6; }
    .lid-ribbon-h { position:absolute; top:50%; left:0; right:0; height:14px; transform:translateY(-50%); }
    .gift-name-tag { text-align:center; margin-top:10px; font-size:0.65rem; color:var(--ink); font-weight:600; line-height:1.3; }
    .gift-tagline { text-align:center; font-size:0.58rem; color:var(--text-dim); margin-top:2px; }
    .gift-box-wrap:not(.locked) .gift-box { animation: giftGlow 2.5s ease-in-out infinite; }
    @keyframes giftGlow {
      0%,100% { filter: drop-shadow(0 4px 16px rgba(212,175,55,0.3)); }
      50%      { filter: drop-shadow(0 6px 28px rgba(212,175,55,0.65)); }
    }
    .gift-close-btn {
      margin-top:20px; padding:12px 28px;
      background:linear-gradient(135deg,var(--gold),var(--rose));
      color:white; border:none; border-radius:50px;
      font-size:0.85rem; font-weight:600; cursor:pointer;
      letter-spacing:0.5px; box-shadow:0 4px 18px rgba(212,175,55,0.35);
    }

    /* ════════════════════════════════════════
       UNWRAP OVERLAY — The Big Gift Ceremony
    ════════════════════════════════════════ */
    .unwrap-overlay {
      position:fixed; inset:0; z-index:700;
      background:radial-gradient(ellipse at 50% 40%, #1a0a2e 0%, #0d0518 100%);
      opacity:0; pointer-events:none;
      transition:opacity 0.5s ease;
      overflow-y:auto;
    }
    .unwrap-overlay.show { opacity:1; pointer-events:all; }
    .unwrap-close {
      position:fixed; top:18px; right:18px; z-index:800;
      color:rgba(255,255,255,0.5); font-size:1.4rem; cursor:pointer;
      width:36px; height:36px; border-radius:50%; border:1px solid rgba(255,255,255,0.2);
      display:flex; align-items:center; justify-content:center;
      background:rgba(0,0,0,0.3); backdrop-filter:blur(5px);
    }
    .unwrap-step {
      position:absolute; inset:0;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      transition:opacity 0.6s ease, transform 0.6s ease;
    }
    .unwrap-step.hidden { opacity:0; pointer-events:none; transform:scale(0.9); }
    .unwrap-hint {
      color:rgba(212,175,55,0.8); font-size:0.72rem; letter-spacing:2px;
      margin-bottom:30px; animation:hintPulse 2s ease-in-out infinite;
    }
    @keyframes hintPulse { 0%,100%{opacity:0.6;} 50%{opacity:1;} }

    /* ── Step 1: Big 3D Gift Box ── */
    .big-gift-scene {
      perspective:900px; cursor:pointer;
    }
    .big-gift-box {
      width:180px; height:200px; position:relative;
      transform-style:preserve-3d;
      animation:boxFloat 3s ease-in-out infinite;
    }
    @keyframes boxFloat {
      0%,100%{ transform:translateY(0) rotateY(-5deg); }
      50%    { transform:translateY(-12px) rotateY(5deg); }
    }
    .big-lid {
      width:190px; height:50px; position:absolute;
      top:0; left:-5px; border-radius:10px 10px 2px 2px;
      background:linear-gradient(145deg,#D4AF37,#B8860B);
      z-index:3; transform-origin:top center;
      transition:transform 1s cubic-bezier(0.6,0,0.2,1);
      box-shadow:0 4px 20px rgba(212,175,55,0.4);
    }
    .big-lid.fly {
      transform:rotateX(-140deg) translateY(-60px);
      opacity:0;
    }
    .big-lid-ribbon-h {
      position:absolute; top:50%; left:0; right:0; height:20px;
      transform:translateY(-50%);
      background:linear-gradient(to bottom,#D98896,#c0697a);
    }
    .big-body {
      width:180px; height:160px; position:absolute;
      bottom:0; left:0; border-radius:0 0 14px 14px;
      background:linear-gradient(145deg,#D4AF37 0%,#e8c84a 50%,#B8860B 100%);
      box-shadow:inset 0 -15px 30px rgba(0,0,0,0.15), 0 10px 40px rgba(212,175,55,0.3);
    }
    .big-body-ribbon-v {
      position:absolute; top:0; bottom:0; left:50%; width:22px;
      transform:translateX(-50%);
      background:linear-gradient(to right,#D98896,#c0697a);
    }
    .big-ribbon-bow {
      position:absolute; top:-30px; left:50%; transform:translateX(-50%);
      font-size:2.6rem; z-index:4;
      filter:drop-shadow(0 3px 8px rgba(0,0,0,0.3));
      transition:transform 0.6s, opacity 0.6s;
    }
    .big-ribbon-bow.gone { transform:translateX(-50%) translateY(-80px) rotate(30deg); opacity:0; }
    .big-ribbon-v, .big-ribbon-h {
      position:absolute; z-index:5; background:linear-gradient(to bottom,#D98896,#c0697a);
      transition:transform 0.8s cubic-bezier(0.6,0,0.2,1), opacity 0.5s;
    }
    .big-ribbon-v { top:-10px; bottom:0; left:50%; width:22px; transform:translateX(-50%); }
    .big-ribbon-h { left:-10px; right:-10px; top:40%; height:22px; }
    .big-ribbon-v.gone { transform:translateX(-50%) scaleY(0); opacity:0; }
    .big-ribbon-h.gone { transform:scaleX(0); opacity:0; }

    /* Confetti burst for unwrap */
    .unwrap-confetti {
      position:fixed; pointer-events:none; z-index:710;
      font-size:1.2rem;
      animation:confettiShoot 1.2s cubic-bezier(0.1,0.8,0.3,1) forwards;
    }
    @keyframes confettiShoot {
      0% { opacity:1; transform:translate(0,0) scale(1) rotate(0deg); }
      100% { opacity:0; transform:translate(var(--cx),var(--cy)) scale(0.4) rotate(720deg); }
    }

    /* ── Step 2: Product Reveal ── */
    .product-reveal-wrap {
      position:relative; display:flex; flex-direction:column;
      align-items:center; gap:16px;
    }
    .product-glow {
      position:absolute; width:250px; height:250px; border-radius:50%;
      background:radial-gradient(circle,rgba(212,175,55,0.25) 0%,transparent 70%);
      animation:glowPulse 2s ease-in-out infinite;
    }
    @keyframes glowPulse {
      0%,100%{transform:scale(1);opacity:0.6;} 50%{transform:scale(1.15);opacity:1;}
    }
    .unwrap-product-img {
      width:140px; height:180px; object-fit:contain; position:relative; z-index:2;
      filter:drop-shadow(0 15px 40px rgba(212,175,55,0.4));
      animation:productFloat 3s ease-in-out infinite;
    }
    @keyframes productFloat {
      0%,100%{transform:translateY(0) rotate(-2deg);}
      50%{transform:translateY(-10px) rotate(2deg);}
    }
    .product-name-reveal {
      font-family:'Dancing Script',cursive; font-size:1.5rem;
      color:white; text-shadow:0 2px 15px rgba(212,175,55,0.5);
      z-index:2;
    }

    /* ── Step 3: Love Envelope ── */
    .love-envelope-scene {
      display:flex; flex-direction:column; align-items:center; cursor:pointer;
    }
    .love-envelope {
      width:200px; height:130px; position:relative;
      animation:envFloat 3s ease-in-out infinite;
    }
    @keyframes envFloat {
      0%,100%{transform:translateY(0) rotate(-1deg);}
      50%{transform:translateY(-8px) rotate(1deg);}
    }
    .love-env-body {
      width:200px; height:100px; background:linear-gradient(145deg,#f5e6d0,#e8d5b7);
      border-radius:0 0 6px 6px; position:absolute; bottom:0;
      box-shadow:0 8px 30px rgba(0,0,0,0.2);
    }
    .love-env-flap {
      width:0; height:0;
      border-left:100px solid transparent;
      border-right:100px solid transparent;
      border-top:80px solid #e8d5b7;
      position:absolute; top:0;
      transition:transform 0.8s cubic-bezier(0.4,0,0.2,1);
      transform-origin:top center;
      filter:drop-shadow(0 2px 8px rgba(0,0,0,0.1));
    }
    .love-env-flap.open { transform:rotateX(180deg); }
    .love-env-seal {
      position:absolute; top:30px; left:50%; transform:translateX(-50%);
      font-size:2rem; z-index:2;
      filter:drop-shadow(0 2px 8px rgba(0,0,0,0.2));
      transition:opacity 0.5s, transform 0.5s;
    }
    .love-env-seal.gone { opacity:0; transform:translateX(-50%) scale(1.5); }
    .love-env-hint {
      margin-top:20px; color:rgba(212,175,55,0.7); font-size:0.72rem;
      letter-spacing:2px;
    }

    /* ── Step 4: Letter Content ── */
    .letter-scroll {
      background:linear-gradient(145deg,#FAF6F5 0%,#FFF0F5 100%);
      border:1px solid rgba(212,175,55,0.35);
      border-radius:24px; padding:28px 20px;
      max-width:360px; width:90vw; max-height:80vh;
      overflow-y:auto; text-align:center;
      box-shadow:0 20px 60px rgba(0,0,0,0.4);
      animation:letterSlide 0.8s cubic-bezier(0.34,1.56,0.64,1);
      position:relative;
    }
    @keyframes letterSlide {
      from{transform:translateY(60px) scale(0.8);opacity:0;}
      to{transform:translateY(0) scale(1);opacity:1;}
    }
    .letter-scroll-badge {
      font-size:0.62rem; font-weight:700; letter-spacing:2px;
      text-transform:uppercase; color:var(--gold);
      background:rgba(212,175,55,0.1); border:1px solid rgba(212,175,55,0.3);
      padding:4px 12px; border-radius:20px; display:inline-block;
      margin-bottom:16px;
    }
    .letter-scroll-body {
      font-size:0.82rem; color:#4A3B42; line-height:1.8;
      text-align:left; white-space:pre-wrap;
      padding:14px 16px; margin-bottom:16px;
      background:linear-gradient(135deg,rgba(217,136,150,0.08),rgba(212,175,55,0.04));
      border:1px solid rgba(217,136,150,0.2); border-radius:14px;
    }
    .letter-scroll-divider {
      font-size:0.65rem; font-weight:700; letter-spacing:3px;
      text-transform:uppercase; color:var(--text-dim); margin:14px 0;
    }
    .letter-scroll-how {}
    .gift-how-item {
      display:flex; align-items:flex-start; gap:10px;
      margin-bottom:8px; padding:10px 14px;
      background:white; border-radius:12px;
      border:1px solid rgba(212,175,55,0.15);
      font-size:0.78rem; color:#4A3B42; text-align:left;
    }
    .gift-how-icon { font-size:1.1rem; flex-shrink:0; }`;

html = html.replace(oldGiftCSS, newGiftCSS);

// ══════════════════════════════════════════════════════════════
// STEP 5: Replace old openGift/closeGiftReveal JS with new multi-step unwrap JS
// ══════════════════════════════════════════════════════════════
const oldGiftJS = `
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
}`;

const newGiftJS = `
// ── GIFTS ──
let currentUnwrapGift = null;

function renderGifts() {
  const row = document.getElementById('gifts-row');
  if(!row) return;
  row.innerHTML = '';
  GIFTS.forEach(gift => {
    const wrap = document.createElement('div');
    wrap.className = 'gift-box-wrap' + (gift.locked ? ' locked' : '');
    const badgeColor = gift.locked ? '#999' : gift.color;
    const bodyBg = 'linear-gradient(145deg, ' + gift.color + '22, ' + gift.color + '44)';
    const lidBg = 'linear-gradient(135deg, ' + gift.color + ', ' + gift.ribbonColor + ')';
    wrap.innerHTML = '<div style="text-align:center;">'
      + '<span class="gift-badge" style="background:' + gift.color + '22; color:' + badgeColor + '; border:1px solid ' + gift.color + '44;">' + gift.badge + '</span>'
      + '</div>'
      + '<div class="gift-box">'
      + '<div class="bow">' + (gift.locked ? '🔒' : '🎀') + '</div>'
      + '<div class="gift-box-lid" style="background:' + lidBg + ';"><div class="lid-ribbon-h" style="background:rgba(255,255,255,0.3);"></div></div>'
      + '<div class="gift-box-body" style="background:' + bodyBg + '; border:2px solid ' + gift.color + '55;">'
      + '<div class="body-ribbon-v" style="background:' + gift.ribbonColor + ';"></div>'
      + '<div class="body-ribbon-h" style="background:' + gift.ribbonColor + ';"></div>'
      + '<span style="font-size:2rem;">' + (gift.locked ? '❔' : '🎁') + '</span>'
      + '</div></div>'
      + '<div class="gift-name-tag">' + gift.name + '</div>'
      + '<div class="gift-tagline">' + gift.tagline + '</div>';
    if(!gift.locked) { wrap.onclick = function() { startUnwrap(gift); }; }
    row.appendChild(wrap);
  });
}

function startUnwrap(gift) {
  currentUnwrapGift = gift;
  // Reset all steps
  ['unwrap-step-1','unwrap-step-2','unwrap-step-3','unwrap-step-4'].forEach(function(id,i) {
    var el = document.getElementById(id);
    if(i === 0) el.classList.remove('hidden');
    else el.classList.add('hidden');
  });
  // Reset animations
  var lid = document.getElementById('big-lid');
  lid.classList.remove('fly');
  document.querySelector('.big-ribbon-bow').classList.remove('gone');
  document.getElementById('big-ribbon-v').classList.remove('gone');
  document.getElementById('big-ribbon-h').classList.remove('gone');
  var flap = document.getElementById('love-env-flap');
  if(flap) flap.classList.remove('open');
  var seal = document.querySelector('.love-env-seal');
  if(seal) seal.classList.remove('gone');
  // Show overlay
  document.getElementById('unwrap-overlay').classList.add('show');
}

function unwrapStep1() {
  // 1. Ribbons fly away
  document.querySelector('.big-ribbon-bow').classList.add('gone');
  document.getElementById('big-ribbon-v').classList.add('gone');
  document.getElementById('big-ribbon-h').classList.add('gone');
  
  // 2. Lid flies open after ribbons
  setTimeout(function() {
    document.getElementById('big-lid').classList.add('fly');
    
    // Confetti burst!
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2 - 50;
    var emojis = ['💕','✨','🌸','💖','🎉','⭐','🎀','🩷','💗','🌹','🎊','🥳'];
    for(var i = 0; i < 24; i++) {
      var p = document.createElement('div');
      p.className = 'unwrap-confetti';
      p.textContent = emojis[i % emojis.length];
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      var angle = (i / 24) * Math.PI * 2;
      var dist = 120 + Math.random() * 180;
      p.style.setProperty('--cx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--cy', Math.sin(angle) * dist - 60 + 'px');
      p.style.animationDelay = (i * 40) + 'ms';
      document.body.appendChild(p);
      (function(el){ setTimeout(function(){el.remove();}, 1500); })(p);
    }
  }, 500);

  // 3. Transition to step 2 (product reveal)
  setTimeout(function() {
    document.getElementById('unwrap-step-1').classList.add('hidden');
    document.getElementById('unwrap-step-2').classList.remove('hidden');
    var img = document.getElementById('unwrap-product-img');
    if(currentUnwrapGift.image) { img.src = currentUnwrapGift.image; img.style.display='block'; }
    else { img.style.display='none'; }
    document.getElementById('product-name-reveal').textContent = currentUnwrapGift.name;
    // Tap to continue
    document.getElementById('unwrap-step-2').onclick = function() {
      document.getElementById('unwrap-step-2').classList.add('hidden');
      document.getElementById('unwrap-step-3').classList.remove('hidden');
    };
  }, 2000);
}

function unwrapStep3() {
  // Open envelope flap
  document.getElementById('love-env-flap').classList.add('open');
  document.querySelector('.love-env-seal').classList.add('gone');
  
  // Transition to letter
  setTimeout(function() {
    document.getElementById('unwrap-step-3').classList.add('hidden');
    document.getElementById('unwrap-step-4').classList.remove('hidden');
    // Fill letter content
    document.getElementById('letter-scroll-badge').textContent = currentUnwrapGift.badge;
    document.getElementById('letter-scroll-body').textContent = currentUnwrapGift.loveNote;
    var howList = document.getElementById('letter-scroll-how');
    howList.innerHTML = currentUnwrapGift.how.map(function(h) {
      return '<div class="gift-how-item"><span class="gift-how-icon">' + h.icon + '</span><span>' + h.step + '</span></div>';
    }).join('');
  }, 1200);
}

function closeUnwrap() {
  document.getElementById('unwrap-overlay').classList.remove('show');
}`;

html = html.replace(oldGiftJS, newGiftJS);

fs.writeFileSync('index.html', html);

// Verify JS
const s = html.indexOf('<script>') + 8;
const e = html.indexOf('</script>');
try { new Function(html.substring(s, e)); console.log('✅ JS OK'); } catch(err) { console.log('❌ JS ERROR:', err.message); }
console.log('✅ Multi-step unwrap:', html.includes('unwrapStep1'));
console.log('✅ Gifts at bottom:', html.indexOf('BIRTHDAY GIFTS (bottom') > html.indexOf('constellation-section'));
console.log('✅ Big gift box:', html.includes('big-gift-box'));
console.log('✅ Love envelope:', html.includes('love-envelope'));
