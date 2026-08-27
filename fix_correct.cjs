const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Change setTimeout to 1 second and make it advance
code = code.replace(
  /const t = setTimeout\(\(\) => setShowSuccessAnimation\(false\), 1500\);/g,
  'const t = setTimeout(() => { setShowSuccessAnimation(false); handleNextMuscle(); }, 1000);'
);

fs.writeFileSync('src/App.tsx', code);
