const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const modalRegex = /\s*\{\/\* iOS Install Modal \*\/\}(.|\n)*?<\/AnimatePresence>/m;
const modalStr = content.match(modalRegex)[0];

// Remove it
content = content.replace(modalRegex, '');

// Insert into App properly
content = content.replace("  );\n}\n\nfunction DetailRow", modalStr + "\n  );\n}\n\nfunction DetailRow");

fs.writeFileSync('src/App.tsx', content);
