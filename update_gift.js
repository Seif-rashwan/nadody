const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find GIFTS array and replace it entirely
const giftsStart = html.indexOf('const GIFTS = [');
const giftsEnd = html.indexOf('];\n\n// ── BALLOON LAUNCHER ──') + 3;

const newGifts = `const GIFTS = [
  {
    id: 1,
    locked: false,
    color: '#D4AF37',
    ribbonColor: '#D98896',
    badge: '🎁 1st Gift for Nadody',
    name: 'Seropipe Extreme Lashes Serum',
    image: './serum.png',
    tagline: '1st Gift for Nadody 🎁✨',
    loveNote: \`Happy birthday ya Nadody! 🎉 De awl gift tft7eha..

I remembered enk bthby montgat Parkville w btshkary feha, fa dakhlt ashof screenshots bl brands ely ta7tha w la2et el serum da mn brand seropipehair. I felt it's something you'd really want w htstkhdmeha kteer.

W 3ashan enty dayman bthzry w ts2leny ana bstakhdem eh l rmoshy, f 2olt ageblak Seropipe tdala3y be rmoshek w hawagbek.. even though ana kda kda shayefhom a7la haga fl donya mn gher ay haga khales! bs 34an mt8resh mny hahaha 😄

Gebtlk 2 pieces 3ashan lma wa7da tkhlas tla2y el tanya ma3aky. la bsraha ana gbthom kont fakr en wahd mnhom complementary ll tany bs tl3 da shakl adem w da gded anyway keda b2a m3aky extra one hehe 😉

Love you! 💕\`,
    how: [
      { icon: '☀️', step: "Morning: 7oteeh el sob7 3ala clean lashes. Lw ht7oty makeup, put the serum first." },
      { icon: '🌙', step: "Night: Bllel abl ma tnamy, make sure en rmoshek maghsoula koways w mafhash ay makeup." },
      { icon: '👁️', step: "Steps: Zay el mascara belzabt.. mashieh 3ala rmoshek el fo2 w el ta7t, w 3ala hawagbek from roots to tips." },
    ]
  },
  { id: 2, locked: true, color: '#9b72cf', ribbonColor: '#7b52af', badge: '🔒 Coming Soon', name: '?????', image: null, tagline: 'هدية جاية قريباً... 🤍', loveNote: '', how: [] },
  { id: 3, locked: true, color: '#D98896', ribbonColor: '#c0697a', badge: '🔒 Coming Soon', name: '?????', image: null, tagline: 'هدية جاية قريباً... 🤍', loveNote: '', how: [] },
];`;

html = html.substring(0, giftsStart) + newGifts + html.substring(giftsEnd);

fs.writeFileSync('index.html', html);

// Verify
const s = html.indexOf('<script>') + 8;
const e = html.indexOf('</script>');
try { new Function(html.substring(s, e)); console.log('✅ JS OK'); } catch(err) { console.log('❌ JS ERROR:', err.message); }
console.log('✅ Parkville:', html.includes('Parkville'));
console.log('✅ hahaha:', html.includes('hahaha'));
console.log('✅ 2 pieces:', html.includes('2 pieces'));
