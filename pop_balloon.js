const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update .balloon-wrap CSS
html = html.replace(
  `    .balloon-wrap {
      position:fixed;
      bottom:-20%;
      pointer-events:none;`,
  `    .balloon-wrap {
      position:fixed;
      bottom:-20%;
      pointer-events:auto;
      cursor:pointer;`
);

// 2. Add mini-heart particle CSS
const particleCSS = `
    .mini-heart {
      position: fixed;
      z-index: 600;
      font-size: 1.2rem;
      pointer-events: none;
      animation: popOut 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
    }
    @keyframes popOut {
      0% { opacity: 1; transform: scale(0.5) translate(0, 0); }
      100% { opacity: 0; transform: scale(1.5) translate(var(--tx), var(--ty)); }
    }
`;
html = html.replace('    .balloon-body {', particleCSS + '    .balloon-body {');


// 3. Add onclick to spawnBalloon
html = html.replace(
  `  document.getElementById('app').appendChild(wrap);
  setTimeout(() => wrap.remove(), (dur + 1) * 1000);`,
  `  wrap.onclick = (e) => popBalloon(wrap, e);
  document.getElementById('app').appendChild(wrap);
  setTimeout(() => wrap.remove(), (dur + 1) * 1000);`
);

// 4. Add popBalloon function
const popBalloonJS = `
function popBalloon(balloon, e) {
  // Prevent any other clicks
  e.stopPropagation();
  
  // Remove the clicked balloon
  balloon.remove();
  
  // Create explosion of mini hearts/balloons
  const emojis = ['💕', '💖', '✨', '🎈', '🩷', '🌸'];
  const particleCount = 6 + Math.floor(Math.random() * 4); // 6 to 9 particles
  
  for(let i=0; i<particleCount; i++) {
    const p = document.createElement('div');
    p.className = 'mini-heart';
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Position at click coordinates
    p.style.left = (e.clientX - 10) + 'px';
    p.style.top = (e.clientY - 10) + 'px';
    
    // Calculate random directions
    const tx = (Math.random() - 0.5) * 200 + 'px';
    const ty = (Math.random() - 0.5) * 200 + 'px';
    
    p.style.setProperty('--tx', tx);
    p.style.setProperty('--ty', ty);
    
    document.body.appendChild(p);
    
    // Cleanup
    setTimeout(() => p.remove(), 800);
  }
}
`;

html = html.replace('</script>', popBalloonJS + '\n</script>');

fs.writeFileSync('index.html', html);
console.log('Added balloon pop interaction!');
