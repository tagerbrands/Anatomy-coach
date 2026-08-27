const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  /Share,/,
  'Share,\n  HelpCircle,'
);
fs.writeFileSync('src/App.tsx', code);
