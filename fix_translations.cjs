const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  /nerves: "Innervatie",/,
  'nerves: "Innervatie",\n    quiz: "Quiz",'
);
code = code.replace(
  /nerves: "Nerves",/,
  'nerves: "Nerves",\n    quiz: "Quiz",'
);
fs.writeFileSync('src/App.tsx', code);
