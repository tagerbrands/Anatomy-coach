const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const translations = `
export type Language = 'nl' | 'en';

export const t = {
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
    distanceText: "Je was er",
    distanceOff: "% naast.",
    shareTextPinPoint: "Ik heb {xp} XP behaald als {rank}! #AnatomyVibe #Fysiotherapie",
    shareTextNerve: "Ik heb {xp} XP behaald als {rank}! #AnatomyVibe #Fysiotherapie",
    shareTextStreak: "Can you beat my streak of {streak} ({rank})? #AnatomyVibe #Fysiotherapie",
    correct: "Correct",
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
    distanceText: "You were",
    distanceOff: "% off.",
    shareTextPinPoint: "I earned {xp} XP as a {rank}! #AnatomyVibe #Physiotherapy",
    shareTextNerve: "I earned {xp} XP as a {rank}! #AnatomyVibe #Physiotherapy",
    shareTextStreak: "Can you beat my streak of {streak} ({rank})? #AnatomyVibe #Physiotherapy",
    correct: "Correct",
    movements: {
      'Flexie': 'Flexion', 'Extensie': 'Extension', 'Abductie': 'Abduction', 'Adductie': 'Adduction', 
      'Endorotatie': 'Internal Rotation', 'Exorotatie': 'External Rotation', 'Plantairflexie': 'Plantar Flexion', 
      'Dorsaalflexie': 'Dorsiflexion', 'Inversie': 'Inversion', 'Eversie': 'Eversion'
    }
  }
};
`;

content = content.replace("export default function App() {", translations + "\nexport default function App() {\n  const [language, setLanguage] = useState<Language>(() => {\n    return (localStorage.getItem('language') as Language) || 'nl';\n  });\n\n  useEffect(() => {\n    localStorage.setItem('language', language);\n  }, [language]);\n");

// Quick replace data access
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
content = content.replace(/m => m\.naam/g, 'm => m.naam');

// Elastic Method Update
const elasticFind = `const hasMovement = currentPracticeMuscle[language].functie.toLowerCase().includes(movement.toLowerCase());`;
const elasticReplace = `const translatedMovement = t[language].movements[movement as keyof typeof t.nl.movements];
    const hasMovement = currentPracticeMuscle[language].functie.toLowerCase().includes(translatedMovement.toLowerCase());`;
content = content.replace(elasticFind, elasticReplace);

const elasticFind2 = `return MOVEMENTS.filter(m => currentPracticeMuscle[language].functie.toLowerCase().includes(m.toLowerCase()));`;
const elasticReplace2 = `return MOVEMENTS.filter(m => {
      const translatedMovement = t[language].movements[m as keyof typeof t.nl.movements];
      return currentPracticeMuscle[language].functie.toLowerCase().includes(translatedMovement.toLowerCase());
    });`;
content = content.replace(elasticFind2, elasticReplace2);

// Text updates (JSX)
content = content.replace(/>Bieb</g, '>{t[language].library}<');
content = content.replace(/>Functies</g, '>{t[language].practice}<');
content = content.replace(/>Locatie</g, '>{t[language].pinpoint}<');
content = content.replace(/>Innervatie</g, '>{t[language].nerves}<');
content = content.replace(/>Zoek een spier...</g, '>{t[language].searchPlaceholder}<');
content = content.replace(/placeholder="Zoek een spier..."/g, 'placeholder={t[language].searchPlaceholder}');
content = content.replace(/>Geen spieren gevonden voor deze zoekopdracht\.</g, '>{t[language].noMuscles}<');
content = content.replace(/>Origo</g, '>{t[language].origo}<');
content = content.replace(/>Insertie</g, '>{t[language].insertion}<');
content = content.replace(/>Functie</g, '>{t[language].function}<');
content = content.replace(/>Info</g, '>{t[language].info}<');
content = content.replace(/>Volgende Spier/g, '>{t[language].nextMuscle}');
content = content.replace(/title="Deel Score"/g, 'title={t[language].shareScore}');
content = content.replace(/>Sessie Voltooid!</g, '>{t[language].sessionComplete}<');
content = content.replace(/Wijs de <span/g, '{t[language].pointTo} <span');
content = content.replace(/<\/span> aan van de/g, '</span> {t[language].ofThe}');
content = content.replace(/🎯 Ronde/g, '🎯 {t[language].round}');
content = content.replace(/⚡ Ronde/g, '⚡ {t[language].round}');
content = content.replace(/>Bekijk Resultaten</g, '>{t[language].results}<');
content = content.replace(/>Voorzie de spieren van stroom:/g, '>{t[language].supplyPower}<');
content = content.replace(/>Gevonden</g, '>{t[language].found}<');
content = content.replace(/>Beste Zenuw</g, '>{t[language].bestNerve}<');
content = content.replace(/>Slechtste Zenuw</g, '>{t[language].worstNerve}<');
content = content.replace(/>Speel Nog Een Ronde/g, '>{t[language].playAgain}');
content = content.replace(/>Totale Score</g, '>{t[language].totalScore}<');
content = content.replace(/>Hoogtepunten</g, '>{t[language].highlights}<');
content = content.replace(/>Reset Progressie</g, '>{t[language].resetProgress}<');
content = content.replace(/>Over MSK coach</g, '>{t[language].aboutTitle}<');
content = content.replace(/>Dé tool om klinisch redeneren en anatomie te masteren\.</g, '>{t[language].aboutText}<');
content = content.replace(/>Auteur: </g, '>{t[language].author} <');
content = content.replace(/fouten/g, '{t[language].mistakes}');
content = content.replace(/Je was er \{pinPointFeedback\.distance\.toFixed\(1\)\}% naast\./g, '{t[language].distanceText} {pinPointFeedback.distance.toFixed(1)}{t[language].distanceOff}');
content = content.replace(/>Correct</g, '>{t[language].correct}<');
content = content.replace(/"Mis!"/g, 't[language].miss');
content = content.replace(/"Bullseye!"/g, 't[language].bullseye');
content = content.replace(/"Geweldig!"/g, 't[language].great');
content = content.replace(/"In de buurt!"/g, 't[language].close');

content = content.replace(/label="Origo"/g, 'label={t[language].origo}');
content = content.replace(/label="Insertie"/g, 'label={t[language].insertion}');
content = content.replace(/label="Innervatie"/g, 'label={t[language].innervation}');
content = content.replace(/label="Functie"/g, 'label={t[language].function}');

// Share texts replacement
content = content.replace(
  /text: \`Ik heb \$\{pinPointXp\} XP behaald als \$\{getPinPointRank\(pinPointXp\)\}! #AnatomyVibe #Fysiotherapie\`/g,
  'text: t[language].shareTextPinPoint.replace("{xp}", pinPointXp.toString()).replace("{rank}", getPinPointRank(pinPointXp))'
);

content = content.replace(
  /text: \`Ik heb \$\{nerveXp\} XP behaald als \$\{getNerveRank\(nerveXp\)\}! #AnatomyVibe #Fysiotherapie\`/g,
  'text: t[language].shareTextNerve.replace("{xp}", nerveXp.toString()).replace("{rank}", getNerveRank(nerveXp))'
);

content = content.replace(
  /text: \`Can you beat my streak of \$\{streak\} \(\$\{getStreakTitle\(streak\)\}\)\? #AnatomyVibe #Fysiotherapie\`/g,
  'text: t[language].shareTextStreak.replace("{streak}", streak.toString()).replace("{rank}", getStreakTitle(streak))'
);

// We need to add the language toggle in the Hamburger Menu
const toggleMarkup = `
              <div className="flex bg-slate-950 p-1 rounded-full mb-8 relative border border-white/10">
                <div 
                  className="absolute inset-y-1 w-[calc(50%-4px)] bg-slate-800 rounded-full transition-all duration-300 shadow-sm"
                  style={{ left: language === 'nl' ? '4px' : 'calc(50%)' }}
                />
                <button
                  onClick={() => setLanguage('nl')}
                  className={\`flex-1 py-2 text-sm font-bold z-10 transition-colors \${language === 'nl' ? 'text-white' : 'text-slate-500'}\`}
                >
                  🇳🇱 NL
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={\`flex-1 py-2 text-sm font-bold z-10 transition-colors \${language === 'en' ? 'text-white' : 'text-slate-500'}\`}
                >
                  🇬🇧 EN
                </button>
              </div>
              
              <div className="flex flex-col gap-4">
`;
content = content.replace('<div className="flex flex-col gap-4">', toggleMarkup);


fs.writeFileSync('src/App.tsx', content);
