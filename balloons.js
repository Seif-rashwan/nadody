const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ══════════════════════════════════════════════════════
// 1. REMOVE all old emoji floaters from inside app-inner
// ══════════════════════════════════════════════════════
// Remove the whole floaters block inside app-inner
html = html.replace(`    <!-- Floating graphics inside app -->
    <div class="floater" style="left:8%;animation-duration:18s;animation-delay:0s;">🎈</div>
    <div class="floater" style="left:22%;animation-duration:22s;animation-delay:5s;">💕</div>
    <div class="floater" style="left:38%;animation-duration:16s;animation-delay:2s;">🩷</div>
    <div class="floater" style="left:55%;animation-duration:20s;animation-delay:8s;">🌸</div>
    <div class="floater" style="left:70%;animation-duration:17s;animation-delay:3s;">🎈</div>
    <div class="floater" style="left:85%;animation-duration:24s;animation-delay:11s;">💖</div>
    <div class="floater" style="left:14%;animation-duration:19s;animation-delay:14s;">✨</div>
    <div class="floater" style="left:45%;animation-duration:21s;animation-delay:6s;">🩵</div>
    <div class="floater" style="left:62%;animation-duration:15s;animation-delay:17s;">💗</div>
    <div class="floater" style="left:90%;animation-duration:23s;animation-delay:2s;">🌸</div>
    <div class="floater" style="left:30%;animation-duration:26s;animation-delay:20s;">🎈</div>
    <div class="floater" style="left:75%;animation-duration:14s;animation-delay:9s;">💕</div>
    <div class="plane"   style="left:-6%;top:28vh;animation-duration:14s;animation-delay:4s;">🛩️</div>
    <div class="plane"   style="left:-6%;top:55vh;animation-duration:19s;animation-delay:22s;">✉️</div>
    <div class="plane"   style="left:-6%;top:40vh;animation-duration:16s;animation-delay:38s;">🛩️</div>
    <div class="topbar">`, `    <div class="topbar">`);

// ══════════════════════════════════════════════════════
// 2. ADD NEW CSS for real CSS balloons with messages
// ══════════════════════════════════════════════════════
const balloonCSS = `
    /* ══════════════════════════════════
       REAL CSS BALLOONS with messages
    ══════════════════════════════════ */
    .balloon-launcher {
      position:fixed; bottom:100px; left:16px; z-index:200;
      width:48px; height:48px; border-radius:50%;
      background:linear-gradient(135deg,#D4AF37,#D98896);
      border:none; font-size:1.5rem; cursor:pointer;
      box-shadow:0 4px 20px rgba(212,175,55,0.4);
      display:flex; align-items:center; justify-content:center;
      transition:transform 0.2s;
      animation:launcherPulse 2s ease-in-out infinite;
    }
    .balloon-launcher:active { transform:scale(0.9); }
    @keyframes launcherPulse {
      0%,100%{ box-shadow:0 4px 20px rgba(212,175,55,0.4); }
      50%{ box-shadow:0 4px 35px rgba(212,175,55,0.75); }
    }

    .balloon-wrap {
      position:fixed;
      bottom:-20%;
      pointer-events:none;
      z-index:500;
      display:flex;
      flex-direction:column;
      align-items:center;
      animation:balloonRise linear forwards;
    }
    @keyframes balloonRise {
      0%   { transform:translateY(0) rotate(0deg);   opacity:0; }
      5%   { opacity:1; }
      90%  { opacity:1; }
      100% { transform:translateY(-120vh) rotate(8deg); opacity:0; }
    }
    .balloon-body {
      width:60px; height:72px;
      border-radius:50% 50% 50% 50% / 55% 55% 45% 45%;
      position:relative;
      display:flex; align-items:center; justify-content:center;
      box-shadow:inset -8px -8px 20px rgba(0,0,0,0.12), 4px 4px 15px rgba(0,0,0,0.1);
      animation:balloonSway 3s ease-in-out infinite alternate;
    }
    @keyframes balloonSway {
      from{ transform:rotate(-4deg); }
      to  { transform:rotate(4deg); }
    }
    .balloon-knot {
      position:absolute; bottom:-7px; left:50%;
      transform:translateX(-50%);
      width:0; height:0;
      border-left:6px solid transparent;
      border-right:6px solid transparent;
    }
    .balloon-shine {
      position:absolute; top:14px; left:14px;
      width:14px; height:10px;
      background:rgba(255,255,255,0.45);
      border-radius:50%;
      transform:rotate(-35deg);
    }
    .balloon-string {
      width:1.5px;
      height:70px;
      background:linear-gradient(to bottom, rgba(100,80,80,0.5), rgba(100,80,80,0.2));
    }
    .balloon-tag {
      background:white;
      border:1px solid rgba(212,175,55,0.35);
      border-radius:10px;
      padding:5px 10px;
      font-family:'Dancing Script',cursive;
      font-size:0.78rem;
      color:#4A3B42;
      text-align:center;
      white-space:nowrap;
      box-shadow:0 3px 12px rgba(74,59,66,0.12);
      max-width:130px;
      white-space:normal;
      line-height:1.3;
    }
`;

// Add balloon CSS before closing </style>
html = html.replace('    #audio-player { display:none; }',
  '    #audio-player { display:none; }' + balloonCSS);

// ══════════════════════════════════════════════════════
// 3. ADD the launcher button to the HTML (inside #app, before bottom-nav)
// ══════════════════════════════════════════════════════
html = html.replace(
  `    </div><!-- end content -->`,
  `    </div><!-- end content -->
    <!-- Balloon Launcher Button -->
    <button class="balloon-launcher" onclick="launchBalloons()" title="Send love!">🎈</button>`
);

// ══════════════════════════════════════════════════════
// 4. ADD JS for launchBalloons
// ══════════════════════════════════════════════════════
const balloonJS = `
// ── BALLOON LAUNCHER ──
const BALLOON_MESSAGES = [
  { msg:"Seif ❤️ Nadody", color1:"#D98896", color2:"#c0697a", knot:"#c0697a" },
  { msg:"Always & Forever 💕", color1:"#D4AF37", color2:"#B8860B", knot:"#B8860B" },
  { msg:"أنا بحبك يا نادودي 🌹", color1:"#9b72cf", color2:"#7b52af", knot:"#7b52af" },
  { msg:"My favorite person 🦋", color1:"#81C784", color2:"#558B2F", knot:"#558B2F" },
  { msg:"16 August 2022 💞", color1:"#F06292", color2:"#C2185B", knot:"#C2185B" },
  { msg:"You are my everything ✨", color1:"#FFB74D", color2:"#E65100", knot:"#E65100" },
  { msg:"I will always choose you 🌟", color1:"#4FC3F7", color2:"#0277BD", knot:"#0277BD" },
  { msg:"Proud to be yours 💍", color1:"#CE93D8", color2:"#6A1B9A", knot:"#6A1B9A" },
];

function launchBalloons() {
  const count = 5 + Math.floor(Math.random() * 4); // 5-8 balloons
  for(let i = 0; i < count; i++) {
    setTimeout(() => spawnBalloon(i), i * 280);
  }
}

function spawnBalloon(idx) {
  const data = BALLOON_MESSAGES[idx % BALLOON_MESSAGES.length];
  const wrap = document.createElement('div');
  wrap.className = 'balloon-wrap';

  // Random horizontal position
  const leftPct = 5 + Math.random() * 80;
  wrap.style.left = leftPct + 'vw';

  // Random duration 9-14s
  const dur = 9 + Math.random() * 5;
  wrap.style.animationDuration = dur + 's';
  wrap.style.animationDelay = '0s';

  // Slight random rotation offset
  const rot = (Math.random() - 0.5) * 12;
  wrap.style.transform = \`rotate(\${rot}deg)\`;

  wrap.innerHTML = \`
    <div class="balloon-body" style="background:radial-gradient(circle at 35% 35%, \${data.color1}, \${data.color2});">
      <div class="balloon-shine"></div>
      <div class="balloon-knot" style="border-top:10px solid \${data.knot};"></div>
    </div>
    <div class="balloon-string"></div>
    <div class="balloon-tag">\${data.msg}</div>
  \`;

  document.getElementById('app').appendChild(wrap);
  setTimeout(() => wrap.remove(), (dur + 1) * 1000);
}
`;

html = html.replace('</script>', balloonJS + '\n</script>');

fs.writeFileSync('index.html', html);

// Verify
const s = html.indexOf('<script>') + 8;
const e = html.indexOf('</script>');
try { new Function(html.substring(s, e)); console.log('✅ JS OK'); } catch(err) { console.log('❌ JS ERROR:', err.message); }
console.log('✅ balloon-launcher CSS:', html.includes('balloon-launcher'));
console.log('✅ launchBalloons JS:', html.includes('launchBalloons'));
console.log('✅ BALLOON_MESSAGES:', html.includes('BALLOON_MESSAGES'));
