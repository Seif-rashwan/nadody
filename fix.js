const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the broken section by finding and replacing the bad line
const badPattern = '<div cl        <div style="height:20px;"></div>\n      </div>/div>';

const goodSection = `<div class="candle-section fade-in-up delay-2">
          <div class="candle-title">Make a Wish 🎂</div>
          <div class="candle-sub">Tap the candle to blow it out...</div>
          <div class="candle-wrap" onclick="blowCandle()" id="candle-wrap">
            <div class="candle-flame" id="candle-flame">🔥</div>
            <span class="cake-emoji">🎂</span>
          </div>
          <div class="candle-hint" id="candle-hint">✦ tap to blow ✦</div>
          <div class="wish-reveal" id="wish-reveal">Happy Birthday, Nada 🌹

Your wish has been heard by every star in the sky.
This year, everything beautiful is coming to you.

I hope this day is the beginning of the happiest year of your life.

I love you more than words can hold. 💕</div>
        </div>

        <!-- Love Letter Envelope -->
        <div class="letter-section fade-in-up delay-2">
          <div class="letter-label">✉ A letter from my heart</div>
          <div style="height:12px;"></div>`;

if (html.includes(badPattern)) {
  html = html.replace(badPattern, goodSection);
  console.log('Fixed bad pattern!');
} else {
  // Find it manually
  const idx = html.indexOf('<div cl        <div');
  if (idx !== -1) {
    const end = html.indexOf('/div>', idx) + 5;
    const bad = html.substring(idx, end);
    console.log('Found bad section:', JSON.stringify(bad.substring(0, 100)));
    html = html.replace(bad, goodSection);
    console.log('Replaced!');
  } else {
    console.log('Could not find bad section');
  }
}

// Also remove the "Explore Our Story" quick cards section
html = html.replace(
  `        <div class="section-title fade-in-up delay-3">✨ Explore Our Story</div>
        <div class="quick-cards fade-in-up delay-3">
          <div class="quick-card" onclick="switchTab('timeline')"><div class="quick-card-icon">📜</div><div class="quick-card-title">Timeline</div><div class="quick-card-sub">Our memories</div></div>
          <div class="quick-card" onclick="switchTab('gallery')"><div class="quick-card-icon">🖼️</div><div class="quick-card-title">Gallery</div><div class="quick-card-sub">Our moments</div></div>
          <div class="quick-card" onclick="switchTab('map')"><div class="quick-card-icon">🗺️</div><div class="quick-card-title">Our Map</div><div class="quick-card-sub">Where we've been</div></div>
          <div class="quick-card" onclick="switchTab('tickets')"><div class="quick-card-icon">🎫</div><div class="quick-card-title">Golden Tickets</div><div class="quick-card-sub">Redeem them</div></div>
        </div>
        <div style="height:20px;"></div>
      </div>`,
  `        <div style="height:20px;"></div>
      </div>`
);

fs.writeFileSync('index.html', html);
console.log('Done!');
