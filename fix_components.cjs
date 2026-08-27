const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /setViewSideBieb\(selectedMuscle\.visualisatie\.basis_weergave\.includes\('achter'\) \? 'achter' : 'voor'\);/g,
  "setViewSideBieb(selectedMuscle.visualisatie[0]?.image.includes('achter') ? 'achter' : 'voor');"
);
content = content.replace(
  /setViewSideOefenen\(currentPracticeMuscle\.visualisatie\.basis_weergave\.includes\('achter'\) \? 'achter' : 'voor'\);/g,
  "setViewSideOefenen(currentPracticeMuscle.visualisatie[0]?.image.includes('achter') ? 'achter' : 'voor');"
);
content = content.replace(
  /setViewSidePinPoint\(pinPointMuscle\.visualisatie\.basis_weergave\.includes\('achter'\) \? 'achter' : 'voor'\);/g,
  "setViewSidePinPoint(pinPointMuscle.visualisatie[0]?.image.includes('achter') ? 'achter' : 'voor');"
);

fs.writeFileSync('src/App.tsx', content);
