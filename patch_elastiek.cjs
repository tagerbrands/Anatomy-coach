const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const checkMovementMatchStr = `
  const checkMovementMatch = (movement: string, funcText: string) => {
    let text = funcText.toLowerCase();
    const mov = movement.toLowerCase();

    if (mov === 'flexie') {
      text = text.replace(/plantairflexie|plantarflexion|plantar flexion|dorsaalflexie|dorsiflexion/g, '');
      return text.includes('flex');
    }
    if (mov === 'extensie') return text.includes('exten');
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

content = content.replace("  const handleMovementClick = (movement: string) => {", checkMovementMatchStr + "\n  const handleMovementClick = (movement: string) => {");

const handleMovementClickMatch = `
    const translatedMovement = t[language].movements[movement as keyof typeof t.nl.movements];
    const hasMovement = currentPracticeMuscle[language].functie.toLowerCase().includes(translatedMovement.toLowerCase());
`;
const handleMovementClickReplace = `
    const hasMovement = checkMovementMatch(movement, currentPracticeMuscle[language].functie);
`;
content = content.replace(handleMovementClickMatch, handleMovementClickReplace);

const isMuscleCompleteMatch = `
  const isMuscleComplete = currentPracticeMuscle && 
    (correctMovementsForCurrent.length === 0 || correctMovementsForCurrent.every(m => guessedMovements[m] === 'correct'));
`;
const isMuscleCompleteReplace = `
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const isMuscleComplete = currentPracticeMuscle && MOVEMENTS.some(m => guessedMovements[m] === 'correct');

  useEffect(() => {
    if (isMuscleComplete) {
      setShowSuccessAnimation(true);
      const t = setTimeout(() => setShowSuccessAnimation(false), 1500);
      return () => clearTimeout(t);
    }
  }, [isMuscleComplete]);
`;
content = content.replace(isMuscleCompleteMatch, isMuscleCompleteReplace);

// Add the success animation overlay in the Elastiek playfield
const playfieldStart = `<div className="relative flex-1 min-h-[350px] mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center py-4">`;
const playfieldReplace = playfieldStart + `
              <AnimatePresence>
                {showSuccessAnimation && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-emerald-500/20 backdrop-blur-sm"
                  >
                    <motion.div 
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="bg-emerald-500 text-white font-black text-3xl sm:text-5xl px-8 py-4 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.8)] border border-white/20"
                    >
                      {t[language].correct} 🎉
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>`;
content = content.replace(playfieldStart, playfieldReplace);

fs.writeFileSync('src/App.tsx', content);
