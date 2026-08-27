const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const useEffects = `  useEffect(() => {
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

// Note the original is compressed on one line because I ran sed -i 's/\\n//g' earlier? No wait, earlier I ran sed -i 's/\\n//g' which is buggy! Oh wait, I didn't actually run that across the whole file? Wait. Let me check how it looks.
