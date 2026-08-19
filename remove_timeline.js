const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target1 = `  { date:"A special afternoon", emoji:"⏰", icon:"🕰️", title:"Horloge", desc:"That afternoon at Horloge with you — the light, the time, the feeling that I never wanted it to end. A memory I carry everywhere." },\n`;
const target2 = `  { date:"The butterfly day", emoji:"🦋", icon:"🦋", title:"The Butterfly Gift", desc:"You gave me that beautiful butterfly. I looked at it and thought — you are one of the most rare and beautiful things in my world." },\n`;
const target3 = `  { date:"Lola Cheesecake", emoji:"🍰", icon:"🍰", title:"Lola Cheesecake", desc:"Every visit to Lola felt like a small world of its own — just us, the cheesecake, and time that moved too fast." },\n`;

html = html.replace(target1, '');
html = html.replace(target2, '');
html = html.replace(target3, '');

fs.writeFileSync('index.html', html);
console.log('Removed Horloge, Butterfly, and Lola Cheesecake from TIMELINE');
