const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const getRegionImageCode = `
const getRegionImage = (muscle: Muscle | null) => {
  if (!muscle || !muscle.visualisatie) return 'skelet_achter.png';
  const origoY = parseFloat(muscle.visualisatie.origo_y);
  return origoY > 50 ? 'regio_onder.png' : 'regio_boven.png';
};

export default function App() {`;

content = content.replace("export default function App() {", getRegionImageCode);

content = content.replace(
  `src={currentPracticeMuscle.visualisatie.basis_weergave}`,
  `src={getRegionImage(currentPracticeMuscle)}`
);

content = content.replace(
  `src={pinPointMuscle.visualisatie.basis_weergave}`,
  `src={getRegionImage(pinPointMuscle)}`
);

content = content.replace(
  `src={selectedMuscle.visualisatie.basis_weergave}`,
  `src={getRegionImage(selectedMuscle)}`
);

fs.writeFileSync('src/App.tsx', content);
