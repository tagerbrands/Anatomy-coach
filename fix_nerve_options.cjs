const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const maxTargets = Math\.min\(matchingMuscles\.length, 4 \+ Math\.floor\(Math\.random\(\) \* 2\)\); \/\/ 4 or 5/g,
  'const maxTargets = Math.min(matchingMuscles.length, 2 + Math.floor(Math.random() * 2)); // 2 or 3'
);

code = code.replace(
  /const selectedNonMatching = shuffle\(nonMatchingMuscles\)\.slice\(0, 9 - selectedMatching\.length\);/g,
  'const selectedNonMatching = shuffle(nonMatchingMuscles).slice(0, 6 - selectedMatching.length);'
);

fs.writeFileSync('src/App.tsx', code);
