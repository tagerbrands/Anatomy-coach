const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace checkMovementMatch
const checkMovementMatchStr = `
  const checkMovementMatch = (movement: string, funcText: string) => {
    let text = funcText.toLowerCase();
    const mov = movement.toLowerCase();

    if (mov === 'anteflexie') {
      return /anteflex|flexie heup|hip flexion|flexie van de heup|flexes the hip/i.test(funcText);
    }
    if (mov === 'dorsoflexie') {
      return /dorsoflex|retroflex|extensie heup|hip extension|extensie van de heup|extends the hip/i.test(funcText);
    }
    if (mov === 'flexie') {
      text = text.replace(/plantairflexie|plantarflexion|plantar flexion|dorsaalflexie|dorsiflexion|anteflexie|dorsoflexie|flexie heup|hip flexion|flexie van de heup|flexes the hip/gi, '');
      return text.includes('flex');
    }
    if (mov === 'extensie') {
      text = text.replace(/extensie heup|hip extension|extensie van de heup|extends the hip/gi, '');
      return text.includes('exten');
    }
    if (mov === 'abductie') return text.includes('abduc');
    if (mov === 'adductie') return text.includes('adduc');
    if (mov === 'endorotatie') return /endorot|internal rot|inwaartse rot|medial rot/.test(text);
    if (mov === 'exorotatie') return /exorot|external rot|buitenwaartse rot|lateral rot/.test(text);
    if (mov === 'plantairflexie') return /plantair|plantar/.test(text);
    if (mov === 'dorsaalflexie') return /dorsaal|dorsi/.test(text);
    if (mov === 'inversie') return text.includes('invers');
    if (mov === 'eversie') return text.includes('evers');

    return false;
  };
`;

const matchRegex = /const checkMovementMatch = \(movement: string, funcText: string\) => \{[\s\S]*?return false;\s*\};\s*/;
content = content.replace(matchRegex, checkMovementMatchStr);

// Add practiceOptions state
content = content.replace(
  "const [currentPracticeMuscle, setCurrentPracticeMuscle] = useState<Muscle | null>(null);",
  "const [currentPracticeMuscle, setCurrentPracticeMuscle] = useState<Muscle | null>(null);\n  const [practiceOptions, setPracticeOptions] = useState<string[]>([]);"
);

// Replace pickRandomMuscle
const oldPickRandom = /const pickRandomMuscle = \(\) => \{[\s\S]*?setGuessedMovements\(\{\}\);\s*\};/;
const newPickRandom = `const pickRandomMuscle = () => {
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    setCurrentPracticeMuscle(randomMuscle);
    setGuessedMovements({});
    
    // Generate 6 options
    const correctOptions = MOVEMENTS.filter(m => checkMovementMatch(m, randomMuscle[language].functie));
    let incorrectOptions = MOVEMENTS.filter(m => !correctOptions.includes(m));
    
    // Shuffle incorrectOptions
    incorrectOptions.sort(() => 0.5 - Math.random());
    
    // Pick enough incorrect to make 6 total (if possible, else use all)
    const needed = Math.max(0, 6 - correctOptions.length);
    const selectedIncorrect = incorrectOptions.slice(0, needed);
    
    const combined = [...correctOptions, ...selectedIncorrect];
    // Shuffle combined
    combined.sort(() => 0.5 - Math.random());
    
    setPracticeOptions(combined);
  };`;
content = content.replace(oldPickRandom, newPickRandom);

// Fix isMuscleComplete mapping over MOVEMENTS -> practiceOptions
content = content.replace(
  "const isMuscleComplete = currentPracticeMuscle && MOVEMENTS.some(m => guessedMovements[m] === 'correct');",
  "const correctPracticeOptions = currentPracticeMuscle ? practiceOptions.filter(m => checkMovementMatch(m, currentPracticeMuscle[language].functie)) : [];\n  const isMuscleComplete = currentPracticeMuscle && correctPracticeOptions.length > 0 && correctPracticeOptions.every(m => guessedMovements[m] === 'correct');"
);

// Replace mapping in UI from MOVEMENTS.map to practiceOptions.map
content = content.replace(
  "{MOVEMENTS.map(movement => {",
  "{practiceOptions.map(movement => {"
);

fs.writeFileSync('src/App.tsx', content);
