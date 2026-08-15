const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// ════════════════════════════════════════════════════
// 1. UPDATE CONFIG startDate to anniversary 16/8/2022
// ════════════════════════════════════════════════════
html = html.replace(
  `  startDate: "2024-09-14",  // When your relationship started`,
  `  startDate: "2022-08-16",  // Anniversary — officially together`
);

// ════════════════════════════════════════════════════
// 2. UPDATE TIMELINE with real dates
// ════════════════════════════════════════════════════
const oldTimeline = `const TIMELINE = [
  { date:"September 14, 2024", emoji:"🎂", icon:"🌟", title:"The Beginning of Everything", desc:"The first birthday we had something real between us. I didn't know yet how much you'd mean to me." },
  { date:"A special afternoon", emoji:"⏰", icon:"🕰️", title:"Horloge", desc:"That day we went to Horloge together. A memory I keep close, a moment that felt timeless." },
  { date:"A sweet moment", emoji:"🍫", icon:"🍫", title:"The Chocolate", desc:"The day you shared that chocolate with me. A tiny thing that held so much warmth." },
  { date:"The butterfly day", emoji:"🦋", icon:"🦋", title:"The Butterfly Gift", desc:"You gave me that beautiful butterfly. I looked at it and thought — you are one of the most rare and beautiful things in my world." },
  { date:"A tram memory", emoji:"🚋", icon:"🚋", title:"The Tram Ticket", desc:"You kept the tram ticket. That's when I knew you were someone who cares deeply about the little things." },
  { date:"Lola Cheesecake", emoji:"🍰", icon:"🍰", title:"Lola Cheesecake", desc:"The day Lola Cheesecake arrived — a sweet memory wrapped in warmth and shared laughter." },
  { date:"Every day since", emoji:"💕", icon:"🌹", title:"Every Little Gift", desc:"Every gift, every note, every message you kept — you showed me that love lives in the details." },
  { date:"September 14, 2025", emoji:"🎉", icon:"🎂", title:"Your Birthday — Our First Anniversary", desc:"The first birthday we celebrate officially together. Happy Birthday, Nada. This app is my gift to you. 💕" },
];`;

const newTimeline = `const TIMELINE = [
  { date:"May 22, 2022", emoji:"💬", icon:"💌", title:"The First Message", desc:"May 22, 2022 — the day you replied and everything changed. I didn't know yet that a simple conversation would be the beginning of my favorite story.", special:"first" },
  { date:"July 19, 2022", emoji:"🍩", icon:"🍩", title:"Dunkin' — Our First Time Out", desc:"July 19, 2022 — the first time we went out together, at Dunkin'. I was nervous. You were perfect. I remember thinking: I really hope this isn't the last time.", special:"dunkin" },
  { date:"August 16, 2022", emoji:"💞", icon:"🌹", title:"We Became Official ♥", desc:"August 16, 2022 — the day we became us. Our anniversary. The day I stopped imagining and started living the best chapter of my life.", special:"anniversary" },
  { date:"A special afternoon", emoji:"⏰", icon:"🕰️", title:"Horloge", desc:"That afternoon at Horloge with you — the light, the time, the feeling that I never wanted it to end. A memory I carry everywhere." },
  { date:"The butterfly day", emoji:"🦋", icon:"🦋", title:"The Butterfly Gift", desc:"You gave me that beautiful butterfly. I looked at it and thought — you are one of the most rare and beautiful things in my world." },
  { date:"Lola Cheesecake", emoji:"🍰", icon:"🍰", title:"Lola Cheesecake", desc:"Every visit to Lola felt like a small world of its own — just us, the cheesecake, and time that moved too fast." },
  { date:"July 17, 2026", emoji:"💍", icon:"💍", title:"The Fatiha & The Ring", desc:"July 17, 2026 — I read the Fatiha with you and gave you the ring. The most important day of my life so far. You said yes with your whole heart. 💍", special:"ring" },
  { date:"November 20, 2026 — Inshallah 🤍", emoji:"💒", icon:"🌸", title:"Our Engagement — Inshallah", desc:"November 20, 2026 — the day we begin officially, in front of everyone we love. I am counting every single day until then.", special:"engagement" },
];`;

html = html.replace(oldTimeline, newTimeline);

// ════════════════════════════════════════════════════
// 3. ADD BEAUTIFUL GRAPHICS CSS (balloons, paper planes, floating hearts)
// ════════════════════════════════════════════════════
const newGraphicsCSS = `
    /* ══════════════════════════════════
       FLOATING GRAPHICS — Balloons & Paper Planes
    ══════════════════════════════════ */
    .floater { position:fixed; pointer-events:none; z-index:1; font-size:1.8rem; animation:floatRise linear infinite; opacity:0; }
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
    }

    /* Special timeline milestones */
    .timeline-item.special-anniversary .timeline-dot { background:linear-gradient(135deg,#D4AF37,#ff6b9d); box-shadow:0 0 25px rgba(212,175,55,0.6); }
    .timeline-item.special-ring .timeline-dot { background:linear-gradient(135deg,#9b72cf,#D4AF37); box-shadow:0 0 30px rgba(155,114,207,0.7); }
    .timeline-item.special-engagement .timeline-dot { background:linear-gradient(135deg,#D98896,#9b72cf,#D4AF37); box-shadow:0 0 30px rgba(217,136,150,0.6); animation:engagementPulse 2s ease-in-out infinite; }
    @keyframes engagementPulse { 0%,100%{box-shadow:0 0 20px rgba(217,136,150,0.5);} 50%{box-shadow:0 0 40px rgba(212,175,55,0.8);} }
    .timeline-item.special-first .timeline-dot { background:linear-gradient(135deg,#81C784,#D4AF37); }
    .timeline-item.special-dunkin .timeline-dot { background:linear-gradient(135deg,#FF7043,#D4AF37); }
    .timeline-special-badge { display:inline-block; background:linear-gradient(135deg,var(--gold),var(--rose)); color:white; font-size:0.6rem; padding:2px 8px; border-radius:20px; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; font-weight:700; }

    /* Decorative corner petals */
    .petal-corner { position:fixed; pointer-events:none; z-index:0; font-size:2rem; opacity:0.12; }

    /* Timeline special cards glow */
    .timeline-item.special-ring .timeline-content,
    .timeline-item.special-engagement .timeline-content {
      background:linear-gradient(135deg,rgba(212,175,55,0.12),rgba(155,114,207,0.08));
      border-color:rgba(212,175,55,0.4);
    }
    .timeline-item.special-anniversary .timeline-content {
      background:linear-gradient(135deg,rgba(217,136,150,0.1),rgba(212,175,55,0.08));
      border-color:rgba(217,136,150,0.35);
    }
`;

html = html.replace('    #audio-player { display:none; }\n', '    #audio-player { display:none; }\n' + newGraphicsCSS + '\n');

// ════════════════════════════════════════════════════
// 4. UPDATE renderTimeline to support special milestone badges + class
// ════════════════════════════════════════════════════
const oldRenderTimeline = `function renderTimeline() {
  const container = document.getElementById('timeline-items');
  TIMELINE.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'timeline-item fade-in-up';
    div.style.animationDelay = (i * 0.1) + 's';
    div.innerHTML = \`
      <div class="timeline-dot">\${item.icon}</div>
      <div class="timeline-content">
        <div class="timeline-date">\${item.date}</div>
        <div class="timeline-title">\${item.emoji} \${item.title}</div>
        <div class="timeline-desc">\${item.desc}</div>
      </div>
    \`;
    container.appendChild(div);
  });
}`;

const newRenderTimeline = `function renderTimeline() {
  const container = document.getElementById('timeline-items');
  TIMELINE.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'timeline-item fade-in-up' + (item.special ? ' special-' + item.special : '');
    div.style.animationDelay = (i * 0.12) + 's';
    const badge = item.special === 'anniversary' ? '<div class="timeline-special-badge">💞 Our Anniversary</div>' :
                  item.special === 'ring' ? '<div class="timeline-special-badge">💍 The Ring Moment</div>' :
                  item.special === 'engagement' ? '<div class="timeline-special-badge">✨ Coming Soon</div>' :
                  item.special === 'first' ? '<div class="timeline-special-badge">💬 First Contact</div>' :
                  item.special === 'dunkin' ? '<div class="timeline-special-badge">🍩 First Date</div>' : '';
    div.innerHTML = \`
      <div class="timeline-dot">\${item.icon}</div>
      <div class="timeline-content">
        \${badge}
        <div class="timeline-date">\${item.date}</div>
        <div class="timeline-title">\${item.emoji} \${item.title}</div>
        <div class="timeline-desc">\${item.desc}</div>
      </div>
    \`;
    container.appendChild(div);
  });
}`;

html = html.replace(oldRenderTimeline, newRenderTimeline);

// ════════════════════════════════════════════════════
// 5. ADD FLOATING GRAPHICS SPAWNER to initApp
// ════════════════════════════════════════════════════
html = html.replace(
  'function initApp() {',
  `// ── FLOATING GRAPHICS ──
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

function initApp() {`
);

// Also call spawnFloaters in initApp
html = html.replace(
  '  renderStars();\n  checkBirthday();\n}',
  '  renderStars();\n  checkBirthday();\n  spawnFloaters();\n}'
);

fs.writeFileSync('index.html', html);
console.log('Done! Timeline updated + Graphics added!');
