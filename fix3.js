const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix 1: Raise z-index of floaters above the screen (z-index:10)
html = html.replace(
  `    .floater {
      position:fixed; bottom:-8%; pointer-events:none; z-index:3;
      font-size:1.6rem; opacity:0;
      animation: riseUp linear infinite;
    }`,
  `    .floater {
      position:fixed; bottom:-8%; pointer-events:none; z-index:15;
      font-size:1.6rem; opacity:0;
      animation: riseUp linear infinite;
    }`
);

html = html.replace(
  `    .plane {
      position:fixed; pointer-events:none; z-index:3; font-size:1.4rem; opacity:0;
      animation: flyOver linear infinite;
    }`,
  `    .plane {
      position:fixed; pointer-events:none; z-index:15; font-size:1.4rem; opacity:0;
      animation: flyOver linear infinite;
    }`
);

// Fix 2: Move the pre-built floater divs from right after #particles
// to INSIDE the #app div (before closing </div><!-- end content -->)
// First remove them from their current location after #particles
const floatersBlock = `
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

// Remove from after #particles
html = html.replace('<div id="particles"></div>' + floatersBlock, '<div id="particles"></div>');

// Now inject them inside #app, right after the opening <div class="app-inner">
html = html.replace(
  `<div class="app-inner">
    <div class="topbar">`,
  `<div class="app-inner">
    <!-- Floating graphics inside app -->
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
    <div class="topbar">`
);

fs.writeFileSync('index.html', html);

// Verify JS is clean
const s = html.indexOf('<script>') + 8;
const e = html.indexOf('</script>');
try { new Function(html.substring(s, e)); console.log('✅ JS OK'); } catch(err) { console.log('❌ JS ERROR:', err.message); }
console.log('✅ z-index 15:', html.includes('z-index:15'));
console.log('✅ floaters inside app:', html.includes('Floating graphics inside app'));
