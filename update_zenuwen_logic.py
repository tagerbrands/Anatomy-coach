import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Update Zenuwen State
old_state = """  // Zenuwen State
  const [nerveRound, setNerveRound] = useState(1);
  const [nerveHistory, setNerveHistory] = useState<Array<{ nerve: {nl: string, en: string}, mistakes: number, xp: number }>>([]);
  const [isNerveFinished, setIsNerveFinished] = useState(false);
  const [nerveXp, setNerveXp] = useState(0);
  const [nerveMistakesThisRound, setNerveMistakesThisRound] = useState(0);
  const [targetNerveObj, setTargetNerveObj] = useState<{nl: string, en: string} | null>(null);
  const targetNerve = targetNerveObj ? targetNerveObj[language] : '';
  const [nerveGrid, setNerveGrid] = useState<Muscle[]>([]);
  const [correctCountInGrid, setCorrectCountInGrid] = useState(0);
  const [foundNerves, setFoundNerves] = useState<string[]>([]);
  const [shakingNerve, setShakingNerve] = useState<string | null>(null);
  const [isNerveLevelComplete, setIsNerveLevelComplete] = useState(false);
  const nerveFlexCardRef = useRef<HTMLDivElement>(null);"""

new_state = """  // Zenuwen State
  const [nerveRound, setNerveRound] = useState(1);
  const [nerveHistory, setNerveHistory] = useState<Array<{ nerve: {nl: string, en: string}, mistakes: number, xp: number }>>([]);
  const [isNerveFinished, setIsNerveFinished] = useState(false);
  const [nerveXp, setNerveXp] = useState(0);
  const [nerveMistakesThisRound, setNerveMistakesThisRound] = useState(0);
  
  const [nerveMuscle, setNerveMuscle] = useState<Muscle | null>(null);
  const [nerveOptions, setNerveOptions] = useState<string[]>([]);
  const [nerveAnswered, setNerveAnswered] = useState(false);
  const [nerveSelectedOption, setNerveSelectedOption] = useState<string | null>(null);
  
  const nerveFlexCardRef = useRef<HTMLDivElement>(null);"""
code = code.replace(old_state, new_state)

# Update Zenuwen Logic
old_logic = """// Zenuwen Logic
  useEffect(() => {
    if (activeTab === 'zenuwen' && !targetNerve && !isNerveFinished) {
      generateNerveRound();
    }
  }, [activeTab]);

  const startNewNerveSession = () => {
    setNerveRound(1);
    setNerveXp(0);
    setNerveHistory([]);
    setIsNerveFinished(false);
    setNerveMistakesThisRound(0);
    generateNerveRound();
  };

  const generateNerveRound = () => {
    setNerveMistakesThisRound(0);
    
    const randomNerveMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    const selectedNerveObj = { nl: randomNerveMuscle.nl.innervatie, en: randomNerveMuscle.en.innervatie };
    setTargetNerveObj(selectedNerveObj);
    const selectedNerve = selectedNerveObj[language];

    const matchingMuscles = MUSCLES.filter(m => m[language].innervatie === selectedNerve);
    const nonMatchingMuscles = MUSCLES.filter(m => m[language].innervatie !== selectedNerve);

    const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5);

    const maxTargets = Math.min(matchingMuscles.length, 2 + Math.floor(Math.random() * 2)); // 2 or 3
    const selectedMatching = shuffle(matchingMuscles).slice(0, maxTargets);
    setCorrectCountInGrid(selectedMatching.length);

    const selectedNonMatching = shuffle(nonMatchingMuscles).slice(0, 6 - selectedMatching.length);

    const finalGrid = shuffle([...selectedMatching, ...selectedNonMatching]);
    setNerveGrid(finalGrid);
    setFoundNerves([]);
    setIsNerveLevelComplete(false);
  };

  const handleNerveClick = (muscle: Muscle) => {
    if (foundNerves.includes(muscle.id) || isNerveLevelComplete || isNerveFinished) return;

    if (muscle[language].innervatie === targetNerve) {
      const newFound = [...foundNerves, muscle.id];
      setFoundNerves(newFound);

      if (newFound.length === correctCountInGrid) {
        setIsNerveLevelComplete(true);
        
        const xpEarned = Math.max(0, 100 - (nerveMistakesThisRound * 25));
        setNerveXp(prev => prev + xpEarned);
        setNerveHistory(prev => [...prev, { nerve: targetNerveObj!, mistakes: nerveMistakesThisRound, xp: xpEarned }]);

        if (nerveRound >= 10) {
          setTimeout(() => { setIsNerveFinished(true); setIsNerveLevelComplete(false); }, 1200);
        } else {
          setTimeout(() => { setNerveRound(r => r + 1); generateNerveRound(); }, 1200);
        }
      }
    } else {
      setShakingNerve(muscle.id);
      setNerveMistakesThisRound(m => m + 1);
      setTimeout(() => setShakingNerve(null), 300);
    }
  };"""

new_logic = """// Zenuwen Logic
  useEffect(() => {
    if (activeTab === 'zenuwen' && !nerveMuscle && !isNerveFinished) {
      generateNerveRound();
    }
  }, [activeTab]);

  const startNewNerveSession = () => {
    setNerveRound(1);
    setNerveXp(0);
    setNerveHistory([]);
    setIsNerveFinished(false);
    setNerveMistakesThisRound(0);
    generateNerveRound();
  };

  const generateNerveRound = () => {
    setNerveMistakesThisRound(0);
    setNerveAnswered(false);
    setNerveSelectedOption(null);
    setShowSuccessAnimation(false);
    
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    setNerveMuscle(randomMuscle);
    
    // Get unique nerves in current language
    const allNerves = Array.from(new Set(MUSCLES.map(m => m[language].innervatie)));
    const correctNerve = randomMuscle[language].innervatie;
    const distractors = allNerves.filter(n => n !== correctNerve);
    const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [...shuffledDistractors, correctNerve].sort(() => 0.5 - Math.random());
    setNerveOptions(options);
  };

  const handleNerveOptionClick = (optionStr: string) => {
    if (nerveAnswered || !nerveMuscle) return;
    
    setNerveSelectedOption(optionStr);
    
    if (optionStr === nerveMuscle[language].innervatie) {
      setNerveAnswered(true);
      
      const xpEarned = Math.max(0, 100 - (nerveMistakesThisRound * 25));
      setNerveXp(prev => prev + xpEarned);
      setNerveHistory(prev => [...prev, { nerve: { nl: nerveMuscle.nl.innervatie, en: nerveMuscle.en.innervatie }, mistakes: nerveMistakesThisRound, xp: xpEarned }]);

      setShowSuccessAnimation(true);

      if (nerveRound >= 10) {
        setTimeout(() => { setIsNerveFinished(true); setShowSuccessAnimation(false); }, 1200);
      } else {
        setTimeout(() => { setNerveRound(r => r + 1); generateNerveRound(); }, 1200);
      }
    } else {
      setNerveMistakesThisRound(m => m + 1);
    }
  };"""
code = code.replace(old_logic, new_logic)

with open('src/App.tsx', 'w') as f:
    f.write(code)
