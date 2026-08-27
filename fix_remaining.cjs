const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /\(pinPointMuscle\.visualisatie\.basis_weergave\.includes\(viewSidePinPoint\)\)/g,
  "(pinPointMuscle.visualisatie.some(p => p.image.includes(viewSidePinPoint)))"
);

content = content.replace(
  /\{selectedMuscle && \(selectedMuscle\.visualisatie\.basis_weergave\.includes\(viewSideBieb\)\) && \(\s*<>\s*<svg className="absolute inset-0 w-full h-full pointer-events-none">/g,
  "{selectedMuscle && (selectedMuscle.visualisatie.some(p => p.image.includes(viewSideBieb))) && (<>                <svg className=\"absolute inset-0 w-full h-full pointer-events-none\">"
);

fs.writeFileSync('src/App.tsx', content);
