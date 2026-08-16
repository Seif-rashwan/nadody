const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ══════════════════════════════════════════════
// Remove the old CSS comment + floater + plane CSS
// ══════════════════════════════════════════════
html = html.replace(`    /* ══════════════════════════════════
       FLOATING GRAPHICS — Balloons & Paper Planes
    ══════════════════════════════════ */
    /* Floaters — pure CSS, pre-defined elements */
    .floater {
      position:fixed; bottom:-8%; pointer-events:none; z-index:15;
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
      position:fixed; pointer-events:none; z-index:15; font-size:1.4rem; opacity:0;
      animation: flyOver linear infinite;
    }
    @keyframes flyOver {
      0%   { transform:translateX(0) translateY(0) rotate(-8deg); opacity:0; }
      4%   { opacity:0.9; }
      88%  { opacity:0.8; }
      100% { transform:translateX(108vw) translateY(-20vh) rotate(-4deg); opacity:0; }
    }`, '');

// ══════════════════════════════════════════════
// Remove the 15 old floater/plane HTML elements after #particles
// ══════════════════════════════════════════════
const oldBlock = `<div id="particles"></div>

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

html = html.replace(oldBlock, '<div id="particles"></div>');

fs.writeFileSync('index.html', html);

// Verify
const s = html.indexOf('<script>') + 8;
const e = html.indexOf('</script>');
try { new Function(html.substring(s, e)); console.log('JS OK'); } catch(err) { console.log('JS ERROR:', err.message); }

const remaining = html.split('class="floater"').length - 1;
const planes = html.split('class="plane"').length - 1;
console.log('Old floater divs remaining:', remaining);
console.log('Old plane divs remaining:', planes);
console.log('New balloon launcher still there:', html.includes('balloon-launcher'));
console.log('riseUp CSS removed:', !html.includes('riseUp'));
