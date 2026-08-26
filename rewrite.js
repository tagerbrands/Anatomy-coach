const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add translations object
const translations = `
type Language = 'nl' | 'en';

const t = {
  nl: {
    library: "Bieb",
    practice: "Functies",
    pinpoint: "Locatie",
    nerves: "Innervatie",
    searchPlaceholder: "Zoek een spier...",
    noMuscles: "Geen spieren gevonden voor deze zoekopdracht.",
    origo: "Origo",
    insertion: "Insertie",
    innervation: "Innervatie",
    function: "Functie",
    info: "Info",
    nextMuscle: "Volgende Spier",
    shareScore: "Deel Score",
    sessionComplete: "Sessie Voltooid!",
    pointTo: "Wijs de",
    ofThe: "aan van de",
    round: "Ronde",
    results: "Bekijk Resultaten",
    supplyPower: "Voorzie de spieren van stroom:",
    found: "Gevonden",
    bestNerve: "Beste Zenuw",
    worstNerve: "Slechtste Zenuw",
    playAgain: "Speel Nog Een Ronde",
    totalScore: "Totale Score",
    highlights: "Hoogtepunten",
    resetProgress: "Reset Progressie",
    aboutTitle: "Over MSK coach",
    aboutText: "Dé tool om klinisch redeneren en anatomie te masteren.",
    author: "Auteur:",
    mistakes: "fouten",
    miss: "Mis!",
    bullseye: "Bullseye!",
    great: "Geweldig!",
    close: "In de buurt!",
    distanceText: "Je was er {dist}% naast.",
    shareTextPinPoint: "Ik heb {xp} XP behaald als {rank}! #AnatomyVibe #Fysiotherapie",
    shareTextNerve: "Ik heb {xp} XP behaald als {rank}! #AnatomyVibe #Fysiotherapie",
    shareTextStreak: "Can you beat my streak of {streak} ({rank})? #AnatomyVibe #Fysiotherapie",
    movements: {
      'Flexie': 'Flexie', 'Extensie': 'Extensie', 'Abductie': 'Abductie', 'Adductie': 'Adductie', 
      'Endorotatie': 'Endorotatie', 'Exorotatie': 'Exorotatie', 'Plantairflexie': 'Plantairflexie', 
      'Dorsaalflexie': 'Dorsaalflexie', 'Inversie': 'Inversie', 'Eversie': 'Eversie'
    }
  },
  en: {
    library: "Library",
    practice: "Functions",
    pinpoint: "Location",
    nerves: "Innervation",
    searchPlaceholder: "Search for a muscle...",
    noMuscles: "No muscles found for this search.",
    origo: "Origin",
    insertion: "Insertion",
    innervation: "Innervation",
    function: "Action",
    info: "Info",
    nextMuscle: "Next Muscle",
    shareScore: "Share Score",
    sessionComplete: "Session Complete!",
    pointTo: "Point to the",
    ofThe: "of the",
    round: "Round",
    results: "View Results",
    supplyPower: "Supply power to the muscles:",
    found: "Found",
    bestNerve: "Best Nerve",
    worstNerve: "Worst Nerve",
    playAgain: "Play Another Round",
    totalScore: "Total Score",
    highlights: "Highlights",
    resetProgress: "Reset Progress",
    aboutTitle: "About MSK coach",
    aboutText: "The ultimate tool to master clinical reasoning and anatomy.",
    author: "Author:",
    mistakes: "mistakes",
    miss: "Miss!",
    bullseye: "Bullseye!",
    great: "Great!",
    close: "Close!",
    distanceText: "You were {dist}% off.",
    shareTextPinPoint: "I earned {xp} XP as a {rank}! #AnatomyVibe #Physiotherapy",
    shareTextNerve: "I earned {xp} XP as a {rank}! #AnatomyVibe #Physiotherapy",
    shareTextStreak: "Can you beat my streak of {streak} ({rank})? #AnatomyVibe #Physiotherapy",
    movements: {
      'Flexie': 'Flexion', 'Extensie': 'Extension', 'Abductie': 'Abduction', 'Adductie': 'Adduction', 
      'Endorotatie': 'Internal Rotation', 'Exorotatie': 'External Rotation', 'Plantairflexie': 'Plantar Flexion', 
      'Dorsaalflexie': 'Dorsiflexion', 'Inversie': 'Inversion', 'Eversie': 'Eversion'
    }
  }
};
`;

content = content.replace("export default function App() {", translations + "\nexport default function App() {\n  const [language, setLanguage] = useState<Language>(() => {\n    return (localStorage.getItem('language') as Language) || 'nl';\n  });\n\n  useEffect(() => {\n    localStorage.setItem('language', language);\n  }, [language]);\n");

// Replace hardcoded words with translations
content = content.replace(/muscle\.origo/g, 'muscle[language].origo');
content = content.replace(/muscle\.insertie/g, 'muscle[language].insertie');
content = content.replace(/muscle\.innervatie/g, 'muscle[language].innervatie');
content = content.replace(/muscle\.functie/g, 'muscle[language].functie');

content = content.replace(/selectedMuscle\.origo/g, 'selectedMuscle[language].origo');
content = content.replace(/selectedMuscle\.insertie/g, 'selectedMuscle[language].insertie');
content = content.replace(/selectedMuscle\.innervatie/g, 'selectedMuscle[language].innervatie');
content = content.replace(/selectedMuscle\.functie/g, 'selectedMuscle[language].functie');

content = content.replace(/currentPracticeMuscle\.functie/g, 'currentPracticeMuscle[language].functie');

content = content.replace(/m\.innervatie/g, 'm[language].innervatie');
content = content.replace(/m\.functie/g, 'm[language].functie');

// Now, handle Elastic Method verification:
// find handleMovementClick function
content = content.replace(
  /const hasMovement = currentPracticeMuscle\.\[language\]\.functie\.toLowerCase\(\)\.includes\(movement\.toLowerCase\(\)\);/g,
  "const translatedMovement = t[language].movements[movement as keyof typeof t.nl.movements];\n    const hasMovement = currentPracticeMuscle[language].functie.toLowerCase().includes(translatedMovement.toLowerCase());"
);

content = content.replace(
  /return MOVEMENTS\.filter\(m => currentPracticeMuscle\.\[language\]\.functie\.toLowerCase\(\)\.includes\(m\.toLowerCase\(\)\)\);/g,
  "return MOVEMENTS.filter(m => {\n      const translatedMovement = t[language].movements[m as keyof typeof t.nl.movements];\n      return currentPracticeMuscle[language].functie.toLowerCase().includes(translatedMovement.toLowerCase());\n    });"
);

// We need to check if [language] replace went correctly. I used `muscle\.functie` replaced by `muscle[language].functie`, so the previous regex would match `currentPracticeMuscle[language].functie`. Let's fix that.

fs.writeFileSync('rewrite2.js', `
const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Revert any previous mistakes if any, or just load fresh
`);
