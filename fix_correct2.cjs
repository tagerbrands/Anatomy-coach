const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Revert the auto-advance, just set it to false after 1000ms
code = code.replace(
  /const t = setTimeout\(\(\) => \{ setShowSuccessAnimation\(false\); handleNextMuscle\(\); \}, 1000\);/g,
  'const t = setTimeout(() => setShowSuccessAnimation(false), 1000);'
);

// Add setShowSuccessAnimation(false) to pickRandomMuscle
code = code.replace(
  /setCurrentPracticeMuscle\(randomMuscle\);/g,
  'setCurrentPracticeMuscle(randomMuscle);\n    setShowSuccessAnimation(false);'
);

fs.writeFileSync('src/App.tsx', code);
