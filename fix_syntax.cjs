const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix \n\n
content = content.replace(/\\n\\n/g, '\\n');

fs.writeFileSync('src/App.tsx', content);
