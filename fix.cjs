const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/miss: t\[language\]\.miss,/g, 'miss: "Mis!",');
content = content.replace(/bullseye: t\[language\]\.bullseye,/g, 'bullseye: "Bullseye!",');
content = content.replace(/great: t\[language\]\.great,/g, 'great: "Geweldig!",');
content = content.replace(/close: t\[language\]\.close,/g, 'close: "In de buurt!",');
content = content.replace(/mistakes: "\{t\[language\]\.mistakes\}",/g, 'mistakes: "fouten",');

fs.writeFileSync('src/App.tsx', content);
