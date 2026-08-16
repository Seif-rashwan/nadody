const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find all lines with old floater/plane references
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('floater') || l.includes('riseUp') || l.includes('flyOver') || l.includes('class="plane"') || l.includes('.plane ')) {
    console.log(i+1, ':', l.trim().substring(0, 100));
  }
});
