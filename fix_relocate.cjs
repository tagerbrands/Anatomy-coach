const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const toRemove = `  useEffect(() => {
    if (selectedMuscle) {
      setViewSideBieb(selectedMuscle.visualisatie.basis_weergave.includes('achter') ? 'achter' : 'voor');
    }
  }, [selectedMuscle]);

  useEffect(() => {
    if (currentPracticeMuscle) {
      setViewSideOefenen(currentPracticeMuscle.visualisatie.basis_weergave.includes('achter') ? 'achter' : 'voor');
    }
  }, [currentPracticeMuscle]);

  useEffect(() => {
    if (pinPointMuscle) {
      setViewSidePinPoint(pinPointMuscle.visualisatie.basis_weergave.includes('achter') ? 'achter' : 'voor');
    }
  }, [pinPointMuscle]);`;

content = content.replace(toRemove, '');

const insertTarget = `const flexCardRef = useRef<HTMLDivElement>(null);`;
content = content.replace(insertTarget, insertTarget + '\\n\\n' + toRemove);

fs.writeFileSync('src/App.tsx', content);
