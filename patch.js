const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ════════════════════════════════════════════════════
// 1. ADD NEW CSS (before </style>)
// ════════════════════════════════════════════════════
const newCSS = `
    /* ══════════════════════════════════
       CINEMATIC SPLASH
    ══════════════════════════════════ */
    .splash-letter { display:inline-block; opacity:0; transform:translateY(20px); animation:letterReveal 0.5s ease forwards; }
    @keyframes letterReveal { to { opacity:1; transform:translateY(0); } }
    .heartbeat-line { font-size:2rem; margin:8px 0 20px; animation:heartPulse 1.4s ease-in-out infinite; }
    @keyframes heartPulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.2);} }
    .splash-shimmer { position:absolute; inset:0; background:radial-gradient(ellipse at center, rgba(212,175,55,0.25) 0%, transparent 70%); animation:splashShimmer 2.5s ease-out forwards; opacity:0; }
    @keyframes splashShimmer { 0%{opacity:0;transform:scale(0.5);} 40%{opacity:1;} 100%{opacity:0;transform:scale(2);} }

    /* ══════════════════════════════════
       BIRTHDAY CANDLE
    ══════════════════════════════════ */
    .candle-section { margin:0 20px 28px; text-align:center; background:linear-gradient(135deg,rgba(212,175,55,0.08),rgba(217,136,150,0.08)); border:1px solid rgba(212,175,55,0.2); border-radius:24px; padding:28px 20px; position:relative; overflow:hidden; }
    .candle-title { font-family:'Dancing Script',cursive; font-size:1.5rem; color:var(--rose); margin-bottom:6px; }
    .candle-sub { font-size:0.78rem; color:var(--text-dim); margin-bottom:20px; }
    .candle-wrap { position:relative; display:inline-block; cursor:pointer; margin-bottom:16px; }
    .cake-emoji { font-size:5rem; display:block; filter:drop-shadow(0 8px 16px rgba(212,175,55,0.3)); transition:transform 0.3s; }
    .candle-wrap:active .cake-emoji { transform:scale(0.93); }
    .candle-flame { position:absolute; top:-18px; left:50%; transform:translateX(-50%); font-size:1.6rem; animation:flicker 0.5s ease-in-out infinite alternate; transform-origin:bottom center; }
    @keyframes flicker { 0%{transform:translateX(-50%) scale(1) rotate(-3deg);} 100%{transform:translateX(-50%) scale(1.15) rotate(3deg);} }
    .candle-flame.out { display:none; }
    .candle-hint { font-size:0.75rem; color:var(--text-dim); letter-spacing:1px; animation:fadePulse 2s ease-in-out infinite; }
    .wish-reveal { display:none; margin-top:16px; padding:16px 20px; background:var(--parchment); border-radius:14px; border:1px solid rgba(212,175,55,0.3); font-family:'Caveat',cursive; font-size:1.25rem; line-height:1.6; color:var(--ink); }
    .wish-reveal.show { display:block; animation:fadeInUp 0.6s ease; }

    /* ══════════════════════════════════
       LOVE LETTER ENVELOPE
    ══════════════════════════════════ */
    .letter-section { margin:0 20px 28px; text-align:center; }
    .envelope-wrap { display:inline-block; cursor:pointer; perspective:800px; }
    .envelope { width:200px; height:130px; position:relative; margin:0 auto 12px; transition:transform 0.3s; }
    .envelope:active { transform:scale(0.95); }
    .env-body { position:absolute; inset:0; background:linear-gradient(135deg,rgba(212,175,55,0.3),rgba(217,136,150,0.25)); border:1.5px solid rgba(212,175,55,0.4); border-radius:6px 6px 10px 10px; box-shadow:0 12px 35px rgba(74,59,66,0.12); }
    .env-flap { position:absolute; top:0; left:0; right:0; height:65px; background:linear-gradient(135deg,rgba(212,175,55,0.25),rgba(217,136,150,0.2)); clip-path:polygon(0 0, 50% 55%, 100% 0); border-radius:6px 6px 0 0; transform-origin:top center; transition:transform 0.6s cubic-bezier(0.4,0,0.2,1); border-top:1.5px solid rgba(212,175,55,0.4); }
    .envelope.open .env-flap { transform:rotateX(180deg); }
    .env-seal { position:absolute; top:40px; left:50%; transform:translateX(-50%); font-size:1.6rem; transition:opacity 0.3s; z-index:2; }
    .envelope.open .env-seal { opacity:0; }
    .env-bottom-left { position:absolute; bottom:0; left:0; width:50%; height:60px; background:linear-gradient(to top right,rgba(212,175,55,0.15),transparent); clip-path:polygon(0 100%, 100% 100%, 0 0); }
    .env-bottom-right { position:absolute; bottom:0; right:0; width:50%; height:60px; background:linear-gradient(to top left,rgba(217,136,150,0.15),transparent); clip-path:polygon(0 100%, 100% 100%, 100% 0); }
    .letter-hint { font-size:0.75rem; color:var(--text-dim); animation:fadePulse 2s ease-in-out infinite; margin-bottom:4px; }
    .letter-label { font-family:'Dancing Script',cursive; font-size:1.3rem; color:var(--rose); }
    .letter-overlay { position:fixed; inset:0; z-index:300; background:rgba(250,246,245,0.97); display:flex; align-items:flex-start; justify-content:center; padding:50px 20px 30px; overflow-y:auto; opacity:0; pointer-events:none; transition:opacity 0.4s ease; backdrop-filter:blur(10px); }
    .letter-overlay.show { opacity:1; pointer-events:all; }
    .letter-scroll { max-width:420px; width:100%; }
    .letter-close { position:fixed; top:20px; right:20px; font-size:1.5rem; cursor:pointer; background:var(--glass); border:1px solid var(--glass-border); border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; z-index:301; }
    .letter-paper { background:var(--parchment); border-radius:20px; padding:32px 28px; box-shadow:0 20px 60px rgba(74,59,66,0.15); border:1px solid rgba(212,175,55,0.2); position:relative; }
    .letter-paper::before { content:''; position:absolute; top:0; left:32px; width:1px; height:100%; background:rgba(217,136,150,0.3); }
    .letter-paper-title { font-family:'Dancing Script',cursive; font-size:1.8rem; color:var(--rose); text-align:center; margin-bottom:24px; }
    .letter-body { font-family:'Caveat',cursive; font-size:1.2rem; line-height:1.85; color:var(--ink); white-space:pre-line; padding-left:16px; }
    .letter-sig { font-family:'Dancing Script',cursive; font-size:1.4rem; color:var(--gold); text-align:right; margin-top:24px; }

    /* ══════════════════════════════════
       CONSTELLATION OF LOVE
    ══════════════════════════════════ */
    .constellation-section { margin:0 20px 28px; background:linear-gradient(135deg,#1a0a2e,#2d1247); border-radius:24px; padding:24px 20px; position:relative; overflow:hidden; }
    .constellation-title { font-family:'Dancing Script',cursive; font-size:1.5rem; color:rgba(212,175,55,0.9); text-align:center; margin-bottom:6px; }
    .constellation-sub { font-size:0.75rem; color:rgba(255,255,255,0.4); text-align:center; margin-bottom:20px; letter-spacing:1px; }
    .stars-field { position:relative; height:260px; }
    .star-btn { position:absolute; background:none; border:none; cursor:pointer; font-size:1.4rem; padding:4px; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1); filter:drop-shadow(0 0 6px rgba(212,175,55,0.6)); animation:starTwinkle var(--d,3s) ease-in-out infinite var(--delay,0s); }
    .star-btn:active { transform:scale(1.5); }
    @keyframes starTwinkle { 0%,100%{opacity:0.7;filter:drop-shadow(0 0 4px rgba(212,175,55,0.4));} 50%{opacity:1;filter:drop-shadow(0 0 12px rgba(212,175,55,0.9));} }
    .star-tooltip { position:fixed; z-index:400; background:rgba(26,10,46,0.95); border:1px solid rgba(212,175,55,0.4); border-radius:16px; padding:14px 18px; max-width:240px; font-family:'Playfair Display',serif; font-size:0.88rem; color:rgba(255,255,255,0.9); line-height:1.5; font-style:italic; text-align:center; box-shadow:0 12px 35px rgba(0,0,0,0.4); pointer-events:none; opacity:0; transform:translateY(8px); transition:all 0.3s ease; }
    .star-tooltip.show { opacity:1; transform:translateY(0); }
    .star-tooltip-close { margin-top:10px; font-size:0.7rem; color:rgba(212,175,55,0.7); letter-spacing:1px; }

    /* ══════════════════════════════════
       POLAROID GALLERY
    ══════════════════════════════════ */
    .polaroid-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; padding:0 16px; }
    .polaroid { background:#FFFEF9; border-radius:4px; box-shadow:0 10px 30px rgba(74,59,66,0.15); padding:10px 10px 34px; cursor:pointer; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1); position:relative; }
    .polaroid:nth-child(odd) { transform:rotate(-1.5deg); }
    .polaroid:nth-child(even) { transform:rotate(1.5deg); }
    .polaroid:active { transform:rotate(0) scale(1.05) !important; z-index:10; }
    .polaroid-img-wrap { width:100%; aspect-ratio:1/1; overflow:hidden; background:var(--glass); }
    .polaroid-img-wrap img { width:100%; height:100%; object-fit:cover; }
    .polaroid-caption { font-family:'Caveat',cursive; font-size:0.9rem; color:#4A3B42; text-align:center; margin-top:8px; line-height:1.3; }

    /* ══════════════════════════════════
       PREMIUM GOLDEN TICKETS
    ══════════════════════════════════ */
    .ticket-premium { background:linear-gradient(135deg,#fffbeb,#fff8e1); border:none; border-radius:16px; padding:0; overflow:hidden; box-shadow:0 10px 35px rgba(212,175,55,0.2); position:relative; }
    .ticket-shimmer { position:absolute; inset:0; background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.4) 50%,transparent 70%); background-size:200% 100%; animation:ticketShimmer 3s ease-in-out infinite; pointer-events:none; }
    @keyframes ticketShimmer { 0%{background-position:200% 0;} 100%{background-position:-200% 0;} }
    .ticket-gold-border { border:2px solid; border-image:linear-gradient(135deg,#D4AF37,#f0d060,#B8860B,#D4AF37) 1; border-radius:16px; }
    .ticket-header { background:linear-gradient(135deg,#D4AF37,#B8860B); padding:14px 20px 10px; display:flex; align-items:center; gap:10px; }
    .ticket-header-icon { font-size:1.6rem; }
    .ticket-header-title { font-family:'Playfair Display',serif; font-size:1rem; color:#fff; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; }
    .ticket-perforation { display:flex; align-items:center; padding:0 4px; background:#fffbeb; }
    .ticket-perf-circle { width:14px; height:14px; border-radius:50%; background:var(--bg-deep); flex-shrink:0; }
    .ticket-perf-dashes { flex:1; border-top:2px dashed rgba(212,175,55,0.4); margin:0 4px; }
    .ticket-body { padding:16px 20px 20px; }
    .ticket-desc-premium { font-size:0.88rem; color:#6B5742; line-height:1.6; margin-bottom:16px; font-style:italic; }
    .ticket-btn-premium { background:linear-gradient(135deg,#D4AF37,#f0d060); border:none; padding:11px 24px; border-radius:50px; font-weight:700; color:#4A3B00; cursor:pointer; font-family:'Inter',sans-serif; text-transform:uppercase; letter-spacing:1.5px; font-size:0.72rem; box-shadow:0 4px 15px rgba(212,175,55,0.4); transition:all 0.3s; display:flex; align-items:center; gap:6px; }
    .ticket-btn-premium:active { transform:scale(0.95); }
    .ticket-card.redeemed .ticket-btn-premium { display:none; }
    .ticket-redeemed-stamp { display:none; font-family:'Caveat',cursive; font-size:1.4rem; color:var(--rose); border:2px solid var(--rose); padding:4px 14px; border-radius:8px; font-weight:700; opacity:0; transform:rotate(-12deg); width:fit-content; }
    .ticket-card.redeemed .ticket-redeemed-stamp { display:block; animation:stampPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }

    /* ══════════════════════════════════
       OUR MAP
    ══════════════════════════════════ */
    .map-header { padding:20px 20px 10px; text-align:center; }
    .map-header h2 { font-family:'Dancing Script',cursive; font-size:2rem; font-weight:700; background:linear-gradient(135deg,var(--gold),var(--purple)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .map-header p { font-size:0.82rem; color:var(--text-dim); margin-top:6px; }
    .map-canvas { margin:0 16px; border-radius:20px; overflow:hidden; position:relative; background:linear-gradient(160deg,#f0ede8,#e8ddd6); border:2px solid rgba(212,175,55,0.25); box-shadow:0 12px 40px rgba(74,59,66,0.12); }
    .map-illustration { width:100%; display:block; }
    .map-pins { position:absolute; inset:0; }
    .map-pin { position:absolute; cursor:pointer; transform:translate(-50%,-100%); animation:pinBounce 0.5s ease; }
    @keyframes pinBounce { 0%{transform:translate(-50%,-60%);opacity:0;} 100%{transform:translate(-50%,-100%);opacity:1;} }
    .map-pin-icon { font-size:2rem; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.25)); transition:transform 0.2s; display:block; }
    .map-pin:active .map-pin-icon { transform:scale(1.3); }
    .map-pin-label { background:rgba(255,255,255,0.95); border:1px solid rgba(212,175,55,0.4); border-radius:12px; padding:4px 10px; font-family:'Caveat',cursive; font-size:0.85rem; color:var(--ink); text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1); white-space:nowrap; margin-top:4px; }
    .map-memory-card { position:fixed; bottom:0; left:0; right:0; z-index:350; background:white; border-radius:24px 24px 0 0; padding:28px 24px 50px; box-shadow:0 -10px 40px rgba(74,59,66,0.15); transform:translateY(100%); transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1); border-top:3px solid rgba(212,175,55,0.3); }
    .map-memory-card.show { transform:translateY(0); }
    .map-memory-close { position:absolute; top:16px; right:20px; font-size:1.2rem; cursor:pointer; color:var(--text-dim); }
    .map-memory-icon { font-size:2.5rem; margin-bottom:10px; }
    .map-memory-name { font-family:'Playfair Display',serif; font-size:1.2rem; color:var(--gold); font-weight:700; margin-bottom:8px; }
    .map-memory-desc { font-size:0.9rem; color:var(--cream); line-height:1.6; font-style:italic; }
    .map-overlay { position:fixed; inset:0; z-index:349; background:rgba(74,59,66,0.2); opacity:0; pointer-events:none; transition:opacity 0.3s; }
    .map-overlay.show { opacity:1; pointer-events:all; }
    .map-places-list { padding:16px 16px 0; display:flex; flex-direction:column; gap:12px; }
    .map-place-item { background:var(--glass); border:1px solid var(--glass-border); border-radius:16px; padding:14px 18px; display:flex; align-items:center; gap:14px; cursor:pointer; transition:all 0.2s; box-shadow:0 4px 12px rgba(74,59,66,0.05); }
    .map-place-item:active { transform:scale(0.97); }
    .map-place-icon { font-size:2rem; }
    .map-place-name { font-family:'Playfair Display',serif; font-size:0.95rem; font-weight:700; color:var(--text-main); margin-bottom:2px; }
    .map-place-sub { font-size:0.75rem; color:var(--text-dim); }

    /* ══════════════════════════════════
       MINI MUSIC PLAYER
    ══════════════════════════════════ */
    .music-player { position:fixed; bottom:90px; right:16px; z-index:150; background:rgba(255,255,255,0.92); border:1px solid rgba(212,175,55,0.3); border-radius:20px; padding:10px 14px; box-shadow:0 8px 30px rgba(74,59,66,0.15); backdrop-filter:blur(10px); display:none; align-items:center; gap:10px; max-width:200px; animation:slideUpFade 0.4s ease; }
    @keyframes slideUpFade { from{transform:translateY(20px);opacity:0;} to{transform:translateY(0);opacity:1;} }
    .music-player.show { display:flex; }
    .vinyl { width:38px; height:38px; border-radius:50%; background:conic-gradient(from 0deg,#1a0a2e,#D4AF37,#1a0a2e,#D98896,#1a0a2e); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .vinyl.spinning { animation:vinylSpin 3s linear infinite; }
    @keyframes vinylSpin { to{transform:rotate(360deg);} }
    .vinyl-center { width:10px; height:10px; border-radius:50%; background:white; }
    .music-info { flex:1; min-width:0; }
    .music-song { font-size:0.72rem; font-weight:600; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .music-artist { font-size:0.62rem; color:var(--text-dim); }
    .music-toggle { background:none; border:none; cursor:pointer; font-size:1.1rem; flex-shrink:0; padding:2px; }
`;

html = html.replace('    #audio-player { display:none; }\n\n  </style>', `    #audio-player { display:none; }\n${newCSS}\n  </style>`);

// ════════════════════════════════════════════════════
// 2. UPGRADE SPLASH SCREEN
// ════════════════════════════════════════════════════
html = html.replace(
  '<div class="screen" id="splash">\n  <img src="./logo.png" alt="Nadody\'s Vault" class="splash-logo" />\n  <div class="splash-title">Nadody\'s Vault</div>\n  <div class="splash-sub">A place made just for you</div>\n  <div class="splash-loader"><div class="splash-loader-bar"></div></div>\n</div>',
  `<div class="screen" id="splash" style="overflow:hidden;">
  <div class="splash-shimmer"></div>
  <img src="./logo.png" alt="Nadody's Vault" class="splash-logo" />
  <div class="splash-title" id="splash-name-wrap"></div>
  <div class="heartbeat-line">💓</div>
  <div class="splash-sub" id="splash-sub-text" style="opacity:0;transition:opacity 0.8s ease;">A place made just for you</div>
  <div class="splash-loader" style="opacity:0;transition:opacity 0.8s ease;" id="splash-loader-wrap"><div class="splash-loader-bar"></div></div>
</div>`
);

// ════════════════════════════════════════════════════
// 3. ADD HOME SECTIONS (candle, letter, constellation)
// ════════════════════════════════════════════════════
// Replace the jar-container + quick cards section
const oldHomeBottom = `        <div class="jar-container fade-in-up delay-2">
          <div class="jar-title">The Jar of Love</div>
          <div class="jar-graphic" id="jar-graphic" onclick="openJarNote()">🫙</div>
          <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:8px;">Tap the jar when you need a smile</div>
          <div class="jar-paper" id="jar-paper"></div>
        </div>
        <div class="section-title fade-in-up delay-3">✨ Explore Our Story</div>
        <div class="quick-cards fade-in-up delay-3">
          <div class="quick-card" onclick="switchTab('timeline')"><div class="quick-card-icon">📜</div><div class="quick-card-title">Timeline</div><div class="quick-card-sub">Our memories</div></div>
          <div class="quick-card" onclick="switchTab('gallery')"><div class="quick-card-icon">🖼️</div><div class="quick-card-title">Gallery</div><div class="quick-card-sub">Our moments</div></div>
          <div class="quick-card" onclick="switchTab('cards')"><div class="quick-card-icon">💌</div><div class="quick-card-title">Love Notes</div><div class="quick-card-sub">Tap to reveal</div></div>
          <div class="quick-card" onclick="switchTab('tickets')"><div class="quick-card-icon">🎫</div><div class="quick-card-title">Golden Tickets</div><div class="quick-card-sub">Redeem them</div></div>
        </div>
        <div style="height:20px;"></div>
      </div>`;

const newHomeBottom = `        <!-- Birthday Candle -->
        <div class="candle-section fade-in-up delay-2">
          <div class="candle-title">Make a Wish 🎂</div>
          <div class="candle-sub">Tap the candle to blow it out...</div>
          <div class="candle-wrap" onclick="blowCandle()" id="candle-wrap">
            <div class="candle-flame" id="candle-flame">🔥</div>
            <span class="cake-emoji">🎂</span>
          </div>
          <div class="candle-hint" id="candle-hint">✦ tap to blow ✦</div>
          <div class="wish-reveal" id="wish-reveal">
            Happy Birthday, Nada 🌹

Your wish has been heard by every star in the sky.
This year, everything beautiful is coming to you.

I hope this day is the beginning of the happiest year of your life.

I love you more than words can hold. 💕
          </div>
        </div>

        <!-- Love Letter Envelope -->
        <div class="letter-section fade-in-up delay-2">
          <div class="letter-label">✉ A letter from my heart</div>
          <div style="height:12px;"></div>
          <div class="envelope-wrap" onclick="openLetter()">
            <div class="envelope" id="envelope">
              <div class="env-body"></div>
              <div class="env-flap"></div>
              <div class="env-bottom-left"></div>
              <div class="env-bottom-right"></div>
              <div class="env-seal">💌</div>
            </div>
          </div>
          <div class="letter-hint">tap to open...</div>
        </div>

        <!-- Constellation of Reasons -->
        <div class="constellation-section fade-in-up delay-3">
          <div class="constellation-title">Stars Just For You ✨</div>
          <div class="constellation-sub">Each star holds a reason I love you — tap to discover</div>
          <div class="stars-field" id="stars-field"></div>
        </div>

        <!-- Jar of Love (keep, now hidden behind constellation) -->
        <div class="jar-container fade-in-up delay-2" style="display:none;">
          <div class="jar-title">The Jar of Love</div>
          <div class="jar-graphic" id="jar-graphic" onclick="openJarNote()">🫙</div>
          <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:8px;">Tap the jar when you need a smile</div>
          <div class="jar-paper" id="jar-paper"></div>
        </div>

        <div class="section-title fade-in-up delay-3">✨ Explore Our Story</div>
        <div class="quick-cards fade-in-up delay-3">
          <div class="quick-card" onclick="switchTab('timeline')"><div class="quick-card-icon">📜</div><div class="quick-card-title">Timeline</div><div class="quick-card-sub">Our memories</div></div>
          <div class="quick-card" onclick="switchTab('gallery')"><div class="quick-card-icon">🖼️</div><div class="quick-card-title">Gallery</div><div class="quick-card-sub">Our moments</div></div>
          <div class="quick-card" onclick="switchTab('map')"><div class="quick-card-icon">🗺️</div><div class="quick-card-title">Our Map</div><div class="quick-card-sub">Where we've been</div></div>
          <div class="quick-card" onclick="switchTab('tickets')"><div class="quick-card-icon">🎫</div><div class="quick-card-title">Golden Tickets</div><div class="quick-card-sub">Redeem them</div></div>
        </div>
        <div style="height:20px;"></div>
      </div>`;

html = html.replace(oldHomeBottom, newHomeBottom);

// ════════════════════════════════════════════════════
// 4. REPLACE GALLERY TAB with Polaroid gallery
// ════════════════════════════════════════════════════
html = html.replace(
  `      <!-- GALLERY -->
      <div class="tab-page" id="tab-gallery">
        <div class="gallery-header"><h2>Our Gallery 🖼️</h2><p>Pieces of our beautiful story</p></div>
        <div class="gallery-grid" id="gallery-grid"></div>
        <div class="gallery-note" style="margin-top:16px;">"Every photo here tells a story that words could never fully capture..."<br/><span style="color:var(--gold);font-size:0.8rem;">— Add your photos by replacing the gallery items</span></div>
        <div style="height:20px;"></div>
      </div>`,
  `      <!-- GALLERY -->
      <div class="tab-page" id="tab-gallery">
        <div class="gallery-header"><h2>Our Gallery 🖼️</h2><p>Pieces of our beautiful story</p></div>
        <div class="polaroid-grid" id="gallery-grid"></div>
        <div class="gallery-note" style="margin-top:16px;">"Every photo here tells a story that words could never fully capture..." 💕</div>
        <div style="height:20px;"></div>
      </div>`
);

// ════════════════════════════════════════════════════
// 5. ADD MAP TAB (before golden tickets)
// ════════════════════════════════════════════════════
html = html.replace(
  `      <!-- GOLDEN TICKETS -->
      <div class="tab-page" id="tab-tickets">`,
  `      <!-- OUR MAP -->
      <div class="tab-page" id="tab-map">
        <div class="map-header"><h2>Our Places 🗺️</h2><p>The corners of Alexandria that hold our story</p></div>
        <div class="map-places-list" id="map-places-list"></div>
        <div style="height:20px;"></div>
      </div>

      <!-- GOLDEN TICKETS -->
      <div class="tab-page" id="tab-tickets">`
);

// ════════════════════════════════════════════════════
// 6. UPDATE NAV (add Map tab)
// ════════════════════════════════════════════════════
html = html.replace(
  `    <div class="bottom-nav">
      <div class="nav-item active" id="nav-home" onclick="switchTab('home')"><div class="nav-icon">🏡</div><div class="nav-label">Home</div></div>
      <div class="nav-item" id="nav-timeline" onclick="switchTab('timeline')"><div class="nav-icon">📜</div><div class="nav-label">Timeline</div></div>
      <div class="nav-item" id="nav-gallery" onclick="switchTab('gallery')"><div class="nav-icon">🖼️</div><div class="nav-label">Gallery</div></div>
      <div class="nav-item" id="nav-tickets" onclick="switchTab('tickets')"><div class="nav-icon">🎫</div><div class="nav-label">Tickets</div></div>
    </div>`,
  `    <div class="bottom-nav">
      <div class="nav-item active" id="nav-home" onclick="switchTab('home')"><div class="nav-icon">🏡</div><div class="nav-label">Home</div></div>
      <div class="nav-item" id="nav-timeline" onclick="switchTab('timeline')"><div class="nav-icon">📜</div><div class="nav-label">Story</div></div>
      <div class="nav-item" id="nav-gallery" onclick="switchTab('gallery')"><div class="nav-icon">🖼️</div><div class="nav-label">Gallery</div></div>
      <div class="nav-item" id="nav-map" onclick="switchTab('map')"><div class="nav-icon">🗺️</div><div class="nav-label">Our Map</div></div>
      <div class="nav-item" id="nav-tickets" onclick="switchTab('tickets')"><div class="nav-icon">🎫</div><div class="nav-label">Tickets</div></div>
    </div>`
);

// ════════════════════════════════════════════════════
// 7. ADD MUSIC PLAYER + LETTER OVERLAY + STAR TOOLTIP HTML
// ════════════════════════════════════════════════════
html = html.replace(
  '<!-- PHOTO VIEWER -->',
  `<!-- MINI MUSIC PLAYER -->
<div class="music-player" id="music-player">
  <div class="vinyl" id="vinyl"><div class="vinyl-center"></div></div>
  <div class="music-info">
    <div class="music-song" id="music-song-name">Our Song</div>
    <div class="music-artist">♥ playing for you</div>
  </div>
  <button class="music-toggle" id="music-toggle-btn" onclick="toggleMusic()">▶</button>
</div>

<!-- LOVE LETTER OVERLAY -->
<div class="letter-overlay" id="letter-overlay">
  <div class="letter-close" onclick="closeLetter()">✕</div>
  <div class="letter-scroll">
    <div class="letter-paper">
      <div class="letter-paper-title">My Dearest Nada,</div>
      <div class="letter-body">If I had to describe you to someone who had never met you, I wouldn't know where to begin — and I think that's the most honest thing I've ever said.

You are the kind of person that makes the world feel warmer simply by being in it. The way you laugh — completely, without holding back — is something I could listen to forever. The way you keep every small thing, every little note, every memory — it tells me everything I need to know about the size of your heart.

I think about the first time we were at Dunkin'. I didn't know then that I was sitting across from someone who would change everything for me. I just knew that the time felt different with you. Slower. Better.

And Lola Cheesecake — every time we went, I wasn't thinking about the food. I was thinking about how lucky I was to be sitting there, next to you, watching you be yourself.

Horloge. That afternoon. You know the one. I didn't want it to end. I remember thinking: this is one of those moments I'll carry with me for the rest of my life. And I have.

You make me want to be better, Nada. Not because you ask it of me, but because you deserve it. You deserve someone who notices all the little things the same way you do. Someone who keeps things too.

So here is me, keeping you — in every way I know how.

Happy Birthday, my love.
This entire world I built here? It's just a small reflection of what you mean to me.

It's not enough. But it's everything I have.</div>
      <div class="letter-sig">Forever yours,<br/>Seif 🌹</div>
    </div>
  </div>
</div>

<!-- STAR TOOLTIP -->
<div class="star-tooltip" id="star-tooltip">
  <div id="star-tooltip-text"></div>
  <div class="star-tooltip-close">✦ tap anywhere to close ✦</div>
</div>

<!-- MAP MEMORY CARD -->
<div class="map-overlay" id="map-overlay" onclick="closeMapMemory()"></div>
<div class="map-memory-card" id="map-memory-card">
  <div class="map-memory-close" onclick="closeMapMemory()">✕</div>
  <div class="map-memory-icon" id="map-mem-icon"></div>
  <div class="map-memory-name" id="map-mem-name"></div>
  <div class="map-memory-desc" id="map-mem-desc"></div>
</div>

<!-- PHOTO VIEWER -->`
);

// ════════════════════════════════════════════════════
// 8. UPDATE THE GALLERY renderGallery FUNCTION to Polaroid
// ════════════════════════════════════════════════════
const oldRenderGallery = `function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  GALLERY.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item fade-in-up';
    div.style.animationDelay = (i * 0.1) + 's';
    div.onclick = () => openPhotoViewer(item);
    div.innerHTML = \`
      <img src="\${item.src}" alt="\${item.title}" loading="lazy" />
      <div class="gallery-overlay">
        <div class="gallery-item-title">\${item.title}</div>
        <div class="gallery-item-date">\${item.date}</div>
      </div>
    \`;
    grid.appendChild(div);
  });
}`;

const newRenderGallery = `function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  GALLERY.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'polaroid fade-in-up';
    div.style.animationDelay = (i * 0.12) + 's';
    div.onclick = () => openPhotoViewer(item);
    div.innerHTML = \`
      <div class="polaroid-img-wrap">
        <img src="\${item.src}" alt="\${item.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div class="polaroid-caption">\${item.title}<br/><span style="font-size:0.75rem;color:var(--text-dim);">\${item.date}</span></div>
    \`;
    grid.appendChild(div);
  });
}`;

html = html.replace(oldRenderGallery, newRenderGallery);

// ════════════════════════════════════════════════════
// 9. UPDATE renderTickets to premium design
// ════════════════════════════════════════════════════
const oldRenderTickets = `function renderTickets() {
  const list = document.getElementById('tickets-list');
  const saved = JSON.parse(localStorage.getItem('redeemedTickets') || '{}');
  list.innerHTML = '';
  GOLDEN_TICKETS.forEach(t => {
    const isRedeemed = saved[t.id];
    const div = document.createElement('div');
    div.innerHTML = \`
      <div class="ticket-card \${isRedeemed ? 'redeemed' : ''}" id="card-\${t.id}">
        <div class="ticket-title">\${t.title}</div>
        <div class="ticket-desc">\${t.desc}</div>
        \${isRedeemed ? '' : \`<button class="ticket-btn" onclick="redeemTicket('\${t.id}')">✨ Redeem</button>\`}
        <div class="ticket-stamp">REDEEMED</div>
      </div>
    \`;
    list.appendChild(div.firstElementChild);
  });
}`;

const newRenderTickets = `function renderTickets() {
  const list = document.getElementById('tickets-list');
  const saved = JSON.parse(localStorage.getItem('redeemedTickets') || '{}');
  list.innerHTML = '';
  GOLDEN_TICKETS.forEach(t => {
    const isRedeemed = saved[t.id];
    const div = document.createElement('div');
    div.innerHTML = \`
      <div class="ticket-card ticket-premium \${isRedeemed ? 'redeemed' : ''}" id="card-\${t.id}">
        <div class="ticket-shimmer"></div>
        <div class="ticket-header">
          <div class="ticket-header-icon">\${t.icon || '🎫'}</div>
          <div class="ticket-header-title">\${t.title}</div>
        </div>
        <div class="ticket-perforation">
          <div class="ticket-perf-circle"></div>
          <div class="ticket-perf-dashes"></div>
          <div class="ticket-perf-circle"></div>
        </div>
        <div class="ticket-body">
          <div class="ticket-desc-premium">\${t.desc}</div>
          \${isRedeemed ? '' : \`<button class="ticket-btn-premium" onclick="redeemTicket('\${t.id}')">✨ Redeem Now</button>\`}
          <div class="ticket-redeemed-stamp">REDEEMED 💕</div>
        </div>
      </div>
    \`;
    list.appendChild(div.firstElementChild);
  });
}`;

html = html.replace(oldRenderTickets, newRenderTickets);

// ════════════════════════════════════════════════════
// 10. UPDATE switchTab to handle map + cards
// ════════════════════════════════════════════════════
const oldSwitchTab = `function switchTab(tab) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('nav-' + tab).classList.add('active');
}`;

const newSwitchTab = `function switchTab(tab) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  const navEl = document.getElementById('nav-' + tab);
  if(navEl) navEl.classList.add('active');
  if(tab === 'map' && !mapBuilt) { renderMap(); mapBuilt = true; }
}`;

html = html.replace(oldSwitchTab, newSwitchTab);

// ════════════════════════════════════════════════════
// 11. UPDATE initApp to call new features
// ════════════════════════════════════════════════════
html = html.replace(
  `function initApp() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  renderTimeline();
  renderGallery();
  renderFlipCards();
  renderTickets();
  checkBirthday();
}`,
  `let mapBuilt = false;

function initApp() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
  renderTimeline();
  renderGallery();
  renderFlipCards();
  renderTickets();
  renderStars();
  checkBirthday();
  initSplashAnimation();
}

function initSplashAnimation() {
  const name = "Nadody's Vault";
  const wrap = document.getElementById('splash-name-wrap');
  if(!wrap) return;
  wrap.innerHTML = '';
  name.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'splash-letter';
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.animationDelay = (0.5 + i * 0.08) + 's';
    span.style.color = 'transparent';
    span.style.backgroundImage = 'linear-gradient(135deg,#D4AF37,#D98896,#B593A0)';
    span.style.webkitBackgroundClip = 'text';
    span.style.backgroundClip = 'text';
    span.style.fontFamily = "'Dancing Script',cursive";
    span.style.fontSize = '3.2rem';
    span.style.fontWeight = '700';
    wrap.appendChild(span);
  });
  setTimeout(() => {
    const sub = document.getElementById('splash-sub-text');
    const loader = document.getElementById('splash-loader-wrap');
    if(sub) sub.style.opacity = '1';
    if(loader) loader.style.opacity = '1';
  }, 1800);
}`
);

// ════════════════════════════════════════════════════
// 12. ADD NEW JS FUNCTIONS (before </script>)
// ════════════════════════════════════════════════════
const newFunctions = `
// ── CANDLE ──
let candleBlown = false;
function blowCandle() {
  if(candleBlown) return;
  candleBlown = true;
  document.getElementById('candle-flame').classList.add('out');
  document.getElementById('candle-hint').style.display = 'none';
  launchConfetti();
  const wish = document.getElementById('wish-reveal');
  wish.classList.add('show');
}

// ── LOVE LETTER ──
function openLetter() {
  document.getElementById('envelope').classList.add('open');
  setTimeout(() => {
    document.getElementById('letter-overlay').classList.add('show');
  }, 400);
}
function closeLetter() {
  document.getElementById('letter-overlay').classList.remove('show');
  setTimeout(() => {
    document.getElementById('envelope').classList.remove('open');
  }, 400);
}

// ── CONSTELLATION STARS ──
const STAR_REASONS = [
  "Because the way you laugh makes everything feel okay. 🌟",
  "Because you kept every little thing I gave you. 🎁",
  "Because your kindness is the most beautiful thing I've ever witnessed. 🌸",
  "Because ordinary days feel magical when you're in them. ☀️",
  "Because when I'm with you, I feel exactly where I should be. 💫",
  "Because the butterfly you gave me is more precious than anything. 🦋",
  "Because every note you wrote, I still read sometimes. 💌",
  "Because you turned my world into something worth waking up for. 🌅",
  "Because your smile is the first thing I think of every morning. 😊",
  "Because you believed in us before I even had the words. 💕",
  "Because the Horloge memory lives in my heart forever. ⏰",
  "Because even small moments with you feel monumental. 🌙",
  "Because you make me understand what 'home' truly means. 🏡",
  "Because you deserve to be loved — intentionally, deeply. 🌹",
  "Because this birthday, I want you to know: you are everything. 🎂",
];

function renderStars() {
  const field = document.getElementById('stars-field');
  if(!field) return;
  const positions = [
    {left:'8%',top:'10%'},{left:'28%',top:'5%'},{left:'55%',top:'8%'},{left:'80%',top:'12%'},
    {left:'15%',top:'30%'},{left:'42%',top:'25%'},{left:'70%',top:'28%'},{left:'90%',top:'22%'},
    {left:'5%',top:'55%'},{left:'30%',top:'50%'},{left:'58%',top:'48%'},{left:'82%',top:'52%'},
    {left:'18%',top:'75%'},{left:'45%',top:'72%'},{left:'72%',top:'78%'},
  ];
  STAR_REASONS.forEach((reason, i) => {
    const btn = document.createElement('button');
    btn.className = 'star-btn';
    btn.textContent = ['⭐','🌟','✨','💫','⚡'][i % 5];
    btn.style.left = positions[i].left;
    btn.style.top = positions[i].top;
    btn.style.setProperty('--d', (2.5 + Math.random()*2) + 's');
    btn.style.setProperty('--delay', (Math.random()*2) + 's');
    btn.onclick = (e) => showStarReason(reason, e);
    field.appendChild(btn);
  });
}

function showStarReason(text, e) {
  const tooltip = document.getElementById('star-tooltip');
  document.getElementById('star-tooltip-text').textContent = text;
  tooltip.classList.add('show');
  const rect = e.target.getBoundingClientRect();
  let top = rect.top - 120;
  if(top < 60) top = rect.bottom + 12;
  tooltip.style.top = top + 'px';
  tooltip.style.left = '50%';
  tooltip.style.transform = 'translateX(-50%)';
  document.addEventListener('click', hideStarTooltip, {once:true});
}
function hideStarTooltip() {
  document.getElementById('star-tooltip').classList.remove('show');
}

// ── MAP ──
const MAP_PLACES = [
  { icon:'🍩', name:'Dunkin\'', sub:'Where it all began...', desc:'The very first place we met. I walked in not knowing that I was about to sit across from the person who would change everything. You ordered first. I\'ve never forgotten that.' },
  { icon:'🍰', name:'Lola Cheesecake', sub:'Our sweet escape', desc:'Every visit to Lola felt like a small celebration just for us. The cheesecake was good. But the company was everything. I always wanted those afternoons to last longer.' },
  { icon:'⏰', name:'Horloge', sub:'The afternoon I stopped time', desc:'Horloge. That word carries so much now. That afternoon with you — the light was perfect, time slowed down, and I remember thinking: I never want this to end. I still don\'t.' },
  { icon:'🚗', name:'Youssef\'s Car', sub:'Our little world on wheels', desc:'The journeys in Youssef\'s car — windows down, your voice filling the space, the city passing by outside. Some of my favorite moments with you happened in that car.' },
];

function renderMap() {
  const list = document.getElementById('map-places-list');
  if(!list) return;
  MAP_PLACES.forEach((place, i) => {
    const item = document.createElement('div');
    item.className = 'map-place-item fade-in-up';
    item.style.animationDelay = (i * 0.1) + 's';
    item.onclick = () => showMapMemory(place);
    item.innerHTML = \`
      <div class="map-place-icon">\${place.icon}</div>
      <div>
        <div class="map-place-name">\${place.name}</div>
        <div class="map-place-sub">\${place.sub}</div>
      </div>
      <div style="margin-left:auto;color:var(--gold);font-size:1.2rem;">›</div>
    \`;
    list.appendChild(item);
  });
}

function showMapMemory(place) {
  document.getElementById('map-mem-icon').textContent = place.icon;
  document.getElementById('map-mem-name').textContent = place.name;
  document.getElementById('map-mem-desc').textContent = place.desc;
  document.getElementById('map-memory-card').classList.add('show');
  document.getElementById('map-overlay').classList.add('show');
}
function closeMapMemory() {
  document.getElementById('map-memory-card').classList.remove('show');
  document.getElementById('map-overlay').classList.remove('show');
}

// ── MUSIC PLAYER UPGRADE ──
function toggleMusic() {
  const audio = document.getElementById('audio-player');
  const player = document.getElementById('music-player');
  const vinyl = document.getElementById('vinyl');
  const toggleBtn = document.getElementById('music-toggle-btn');
  const btn = document.getElementById('music-btn');
  if(musicEnabled) {
    audio.pause();
    musicEnabled = false;
    btn.textContent = '🎵';
    btn.classList.remove('playing');
    vinyl.classList.remove('spinning');
    toggleBtn.textContent = '▶';
    player.classList.remove('show');
  } else {
    audio.play().catch(()=>{});
    musicEnabled = true;
    btn.textContent = '🎶';
    btn.classList.add('playing');
    vinyl.classList.add('spinning');
    toggleBtn.textContent = '⏸';
    player.classList.add('show');
  }
}
`;

html = html.replace('</script>', newFunctions + '\n</script>');

// ════════════════════════════════════════════════════
// 13. UPDATE GOLDEN_TICKETS with icons
// ════════════════════════════════════════════════════
html = html.replace(
  `const GOLDEN_TICKETS = [
  { id: 't1', title: "Instant Forgiveness", desc: "Redeem this ticket to instantly win any argument or be forgiven for a small mistake. No questions asked. 🤫" },
  { id: 't2', title: "A Night On Me", desc: "A fully paid, fully planned date night doing whatever you want. Just tell me when. 🥂" },
  { id: 't3', title: "Long Hug Session", desc: "Valid for one very long, very tight hug. Can be used anywhere, anytime. 🤗" },
  { id: 't4', title: "Your Favorite Treat", desc: "Redeem for your favorite chocolate, dessert, or coffee delivered to you. 🍫☕" }
];`,
  `const GOLDEN_TICKETS = [
  { id: 't1', icon: '🤍', title: "Instant Forgiveness", desc: "Redeem this ticket to instantly win any argument or be forgiven for a small mistake. No questions asked. Not a single one. 🤫" },
  { id: 't2', icon: '🥂', title: "A Night On Me", desc: "A fully paid, fully planned date night — wherever you want to go, whatever you want to eat. Just say the word. 🌹" },
  { id: 't3', icon: '🤗', title: "Endless Hug Session", desc: "Valid for one very long, very tight, no-time-limit hug. Can be used anywhere, anytime. No expiry. Ever. 💕" },
  { id: 't4', icon: '🍫', title: "Your Favorite Treat", desc: "Redeem for your favorite chocolate, cheesecake from Lola, or whatever your heart desires — delivered to you. ☕" },
  { id: 't5', icon: '📸', title: "Our Photo Day", desc: "A full day out together, just us — you pick the place, I'll bring the camera. Let's make memories worth keeping. 🌅" },
  { id: 't6', icon: '✨', title: "A Wish Granted", desc: "Whatever you ask of me on this day — within my power — is yours. No conditions. No limits. Just say the word. 💫" },
];`
);

fs.writeFileSync('index.html', html);
console.log('✅ All 8 features successfully added!');
