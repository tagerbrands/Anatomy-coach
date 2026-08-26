const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix the hardcoded "Voorzie de spieren van stroom" in the UI
content = content.replace(
  "Voorzie de spieren van stroom:<br/>",
  "{t[language].supplyPower}<br/>"
);

// 2. Change `targetNerve` state to `targetNerveObj`
content = content.replace(
  "const [targetNerve, setTargetNerve] = useState<string>('');",
  "const [targetNerveObj, setTargetNerveObj] = useState<{nl: string, en: string} | null>(null);\n  const targetNerve = targetNerveObj ? targetNerveObj[language] : '';"
);

// 3. Update `generateNerveRound`
content = content.replace(
  "const allNerves = Array.from(new Set(MUSCLES.map(m => m[language].innervatie)));",
  ""
);
content = content.replace(
  "const selectedNerve = allNerves[Math.floor(Math.random() * allNerves.length)];\n    setTargetNerve(selectedNerve);",
  "const randomNerveMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];\n    const selectedNerveObj = { nl: randomNerveMuscle.nl.innervatie, en: randomNerveMuscle.en.innervatie };\n    setTargetNerveObj(selectedNerveObj);\n    const selectedNerve = selectedNerveObj[language];"
);
// Wait, the above might be slightly off. Let's do it precisely via regex.

fs.writeFileSync('src/App.tsx', content);
