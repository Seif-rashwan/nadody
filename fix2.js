const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ════════════════════════════════════════════════════
// 1. FIX startDate to May 22, 2022 (first chat)
// ════════════════════════════════════════════════════
html = html.replace(
  `  startDate: "2022-08-16",  // Anniversary — officially together`,
  `  startDate: "2022-05-22",  // First day we talked`
);

// ════════════════════════════════════════════════════
// 2. FIX FLOATERS — Remove old JS-based approach,
//    replace with pre-built HTML elements + pure CSS
//    This is 100% reliable, no JS timing issues
// ════════════════════════════════════════════════════

// Remove the old spawnFloaters JS function
const oldSpawnFn = `// ── FLOATING GRAPHICS ──
function spawnFloaters() {
  const balloons = ['🎈','🩷','🤍','💛','🩵'];
  const planes = ['✈️'];
  const hearts = ['💕','💖','💗','🌸','✨'];
  const allItems = [...balloons, ...balloons, ...hearts, ...hearts];

  // Spawn a balloon/heart every 4-6 seconds
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'floater';
    el.textContent = allItems[Math.floor(Math.random() * allItems.length)];
    el.style.left = (5 + Math.random() * 90) + 'vw';
    el.style.bottom = '-10vh';
    el.style.fontSize = (1.2 + Math.random() * 1.2) + 'rem';
    const dur = 12 + Math.random() * 10;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay = (Math.random() * 2) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + 3) * 1000);
  }, 4500);

  // Spawn a paper plane every 15-25 seconds
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'plane';
    el.textContent = '🛩️';
    el.style.left = '-5vw';
    el.style.top = (15 + Math.random() * 50) + 'vh';
    const dur = 10 + Math.random() * 8;
    el.style.animationDuration = dur + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + 2) * 1000);
  }, 18000);
}

`;

html = html.replace(oldSpawnFn, '');

// Remove the spawnFloaters() call from initApp
html = html.replace('  spawnFloaters();\n', '');

// Fix the old CSS for .floater and .plane — replace with working version
const oldFloaterCSS = `.floater { position:fixed; pointer-events:none; z-index:1; font-size:1.8rem; animation:floatRise linear infinite; opacity:0; }
    @keyframes floatRise {
      0%   { transform:translateY(0) rotate(0deg) scale(0.8); opacity:0; }
      8%   { opacity:0.9; }
      85%  { opacity:0.7; }
      100% { transform:translateY(-110vh) rotate(20deg) scale(1.1); opacity:0; }
    }
    .plane { position:fixed; pointer-events:none; z-index:1; font-size:1.5rem; animation:flyAcross linear infinite; opacity:0; }
    @keyframes flyAcross {
      0%   { transform:translateX(0) translateY(0) rotate(-10deg); opacity:0; }
      5%   { opacity:0.85; }
      80%  { opacity:0.7; }
      100% { transform:translateX(110vw) translateY(-30vh) rotate(-5deg); opacity:0; }
    }`;

const newFloaterCSS = `/* Floaters — pure CSS, pre-defined elements */
    .floater {
      position:fixed; bottom:-8%; pointer-events:none; z-index:3;
      font-size:1.6rem; opacity:0;
      animation: riseUp linear infinite;
    }
    @keyframes riseUp {
      0%   { transform:translateY(0) rotate(-5deg); opacity:0; }
      6%   { opacity:1; }
      88%  { opacity:0.8; }
      100% { transform:translateY(-108vh) rotate(8deg); opacity:0; }
    }
    .plane {
      position:fixed; pointer-events:none; z-index:3; font-size:1.4rem; opacity:0;
      animation: flyOver linear infinite;
    }
    @keyframes flyOver {
      0%   { transform:translateX(0) translateY(0) rotate(-8deg); opacity:0; }
      4%   { opacity:0.9; }
      88%  { opacity:0.8; }
      100% { transform:translateX(108vw) translateY(-20vh) rotate(-4deg); opacity:0; }
    }`;

html = html.replace(oldFloaterCSS, newFloaterCSS);

// Now add pre-built HTML floaters right after <div id="particles"></div>
const particlesDiv = '<div id="particles"></div>';
const floatersHTML = `<div id="particles"></div>

<!-- Pre-built floating graphics — pure CSS animations -->
<div class="floater" style="left:8%;animation-duration:18s;animation-delay:1s;">🎈</div>
<div class="floater" style="left:22%;animation-duration:22s;animation-delay:6s;">💕</div>
<div class="floater" style="left:38%;animation-duration:16s;animation-delay:2s;">🩷</div>
<div class="floater" style="left:55%;animation-duration:20s;animation-delay:9s;">🌸</div>
<div class="floater" style="left:70%;animation-duration:17s;animation-delay:4s;">🎈</div>
<div class="floater" style="left:85%;animation-duration:24s;animation-delay:12s;">💖</div>
<div class="floater" style="left:14%;animation-duration:19s;animation-delay:15s;">✨</div>
<div class="floater" style="left:45%;animation-duration:21s;animation-delay:7s;">🩵</div>
<div class="floater" style="left:62%;animation-duration:15s;animation-delay:18s;">💗</div>
<div class="floater" style="left:90%;animation-duration:23s;animation-delay:3s;">🌸</div>
<div class="floater" style="left:30%;animation-duration:26s;animation-delay:21s;">🎈</div>
<div class="floater" style="left:75%;animation-duration:14s;animation-delay:10s;">💕</div>
<div class="plane"   style="left:-6%;top:25vh;animation-duration:14s;animation-delay:8s;">🛩️</div>
<div class="plane"   style="left:-6%;top:52vh;animation-duration:18s;animation-delay:25s;">✉️</div>
<div class="plane"   style="left:-6%;top:38vh;animation-duration:16s;animation-delay:42s;">🛩️</div>`;

html = html.replace(particlesDiv, floatersHTML);

fs.writeFileSync('index.html', html);

// Verify
const s = html.indexOf('<script>') + 8;
const e = html.indexOf('</script>');
try { new Function(html.substring(s, e)); console.log('✅ JS OK'); } catch(err) { console.log('❌ JS ERROR:', err.message); }
console.log('✅ startDate fixed:', html.includes('"2022-05-22"'));
console.log('✅ Floaters HTML:', html.includes('riseUp'));
console.log('✅ Pre-built floaters:', html.includes('animation-delay:6s'));
