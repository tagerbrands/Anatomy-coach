import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MUSCLES } from './data';
import { Muscle } from './types';
import html2canvas from 'html2canvas';
import {
  Menu,
  Library,
  Search,
  Filter,
  MapPin,
  Target,
  Zap,
  Activity,
  X,
  ChevronRight,
  Info,
  Flame,
  Share2,
  Share,
  Download,
  Loader2,
  Crosshair,
  Trophy,
  RotateCcw,
  BicepsFlexed
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOVEMENTS = [
  'Flexie', 'Extensie', 'Abductie', 'Adductie', 
  'Endorotatie', 'Exorotatie', 'Plantairflexie', 
  'Dorsaalflexie', 'Inversie', 'Eversie'
];


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
    installApp: "Installeer App",
    iosInstallTitle: "Offline leren?",
    iosInstallBody: "Tik op het Deel-icoon onderin je scherm en kies 'Zet op beginscherm'.",
    closeBtn: "Sluit",
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
    installApp: "Install App",
    iosInstallTitle: "Learn offline?",
    iosInstallBody: "Tap the Share icon below and choose 'Add to Home Screen'.",
    closeBtn: "Close",
    movements: {
      'Flexie': 'Flexion', 'Extensie': 'Extension', 'Abductie': 'Abduction', 'Adductie': 'Adduction', 
      'Endorotatie': 'Internal Rotation', 'Exorotatie': 'External Rotation', 'Plantairflexie': 'Plantar Flexion', 
      'Dorsaalflexie': 'Dorsiflexion', 'Inversie': 'Inversion', 'Eversie': 'Eversion'
    }
  }
};

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'nl';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const [activeTab, setActiveTab] = useState<'bieb' | 'oefenen' | 'pinpoint' | 'zenuwen'>('bieb');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const isStandAloneMatch = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandAlone = (window.navigator as any).standalone === true;
      setIsStandalone(isStandAloneMatch || isIOSStandAlone);
    };
    checkStandalone();

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) || (userAgent.includes("mac") && "ontouchend" in document);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      setIsMenuOpen(false);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      if (/android/.test(window.navigator.userAgent.toLowerCase())) {
        // do nothing
      } else {
        setShowIOSModal(true);
        setIsMenuOpen(false);
      }
    }
  };

  // Pin-Point State
  const [pinPointRound, setPinPointRound] = useState(1);
  const [pinPointHistory, setPinPointHistory] = useState<Array<{ naam: string, target: string, distance: number, xp: number }>>([]);
  const [isPinPointFinished, setIsPinPointFinished] = useState(false);
  const [pinPointXp, setPinPointXp] = useState(0);
  const [pinPointMuscle, setPinPointMuscle] = useState<Muscle | null>(null);
  const [pinPointTarget, setPinPointTarget] = useState<'origo' | 'insertie'>('origo');
  const [pinPointClick, setPinPointClick] = useState<{ x: number; y: number } | null>(null);
  const [pinPointFeedback, setPinPointFeedback] = useState<{ distance: number; xp: number; message: string } | null>(null);
  const pinPointFlexCardRef = useRef<HTMLDivElement>(null);

  // Zenuwen State
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
  const nerveFlexCardRef = useRef<HTMLDivElement>(null);

  // Oefenen State
  const [currentPracticeMuscle, setCurrentPracticeMuscle] = useState<Muscle | null>(null);
  const [streak, setStreak] = useState(0);
  const [guessedMovements, setGuessedMovements] = useState<Record<string, 'correct' | 'incorrect'>>({});
  const [shakeMovement, setShakeMovement] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const flexCardRef = useRef<HTMLDivElement>(null);

  const getStreakTitle = (s: number) => {
    if (s <= 5) return 'Stagiair';
    if (s <= 15) return 'Spier-Bieb Champion';
    return 'Biomechanica Baas';
  };

  const handleShareScore = async () => {
    if (!flexCardRef.current || isSharing) return;
    
    setIsSharing(true);
    try {
      const canvas = await html2canvas(flexCardRef.current, {
        backgroundColor: '#020617', // slate-950 fallback
        scale: 2,
        logging: false,
        useCORS: true
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsSharing(false);
          return;
        }

        const file = new File([blob], `anatomy-vibe-streak-${streak}.png`, { type: 'image/png' });
        const shareData = {
          title: 'Anatomy Vibe Highscore',
          text: t[language].shareTextStreak.replace("{streak}", streak.toString()).replace("{rank}", getStreakTitle(streak)),
          files: [file]
        };

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log("Gebruiker heeft share geannuleerd of er ging iets mis:", err);
          }
        } else {
          // Fallback download
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
        setIsSharing(false);
      }, 'image/png');
    } catch (err) {
      console.error("Error generating share image:", err);
      setIsSharing(false);
    }
  };

  const filteredMuscles = useMemo(() => {
    return MUSCLES.filter(m => {
      return m.naam.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // Pin-Point Logic
  useEffect(() => {
    if (activeTab === 'pinpoint' && !pinPointMuscle && !isPinPointFinished) {
      pickRandomPinPoint();
    }
  }, [activeTab]);

  const startNewPinPointSession = () => {
    setPinPointRound(1);
    setPinPointXp(0);
    setPinPointHistory([]);
    setIsPinPointFinished(false);
    pickRandomPinPoint();
  };

  const pickRandomPinPoint = () => {
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    setPinPointMuscle(randomMuscle);
    setPinPointTarget(Math.random() > 0.5 ? 'origo' : 'insertie');
    setPinPointClick(null);
    setPinPointFeedback(null);
  };

  const handlePinPointClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pinPointClick || !pinPointMuscle) return; // already clicked

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPinPointClick({ x, y });

    const actualX = parseFloat(pinPointTarget === 'origo' ? pinPointMuscle.visualisatie.origo_x : pinPointMuscle.visualisatie.insertie_x);
    const actualY = parseFloat(pinPointTarget === 'origo' ? pinPointMuscle.visualisatie.origo_y : pinPointMuscle.visualisatie.insertie_y);

    const distance = Math.sqrt(Math.pow(x - actualX, 2) + Math.pow(y - actualY, 2));
    
    let xp = 0;
    let message = t[language].miss;
    if (distance < 3) { xp = 100; message = t[language].bullseye; }
    else if (distance < 6) { xp = 75; message = t[language].great; }
    else if (distance < 10) { xp = 50; message = t[language].close; }

    setPinPointXp(prev => prev + xp);
    setPinPointFeedback({ distance, xp, message });
    setPinPointHistory(prev => [...prev, { naam: pinPointMuscle.naam, target: pinPointTarget, distance, xp }]);
  };

  const handlePinPointNext = () => {
    if (pinPointRound >= 10) {
      setIsPinPointFinished(true);
    } else {
      setPinPointRound(r => r + 1);
      pickRandomPinPoint();
    }
  };

  const getPinPointRank = (score: number) => {
    if (score < 400) return 'Anatomie Tourist';
    if (score < 800) return 'Klinisch Redeneerder';
    return 'Sniper Baas';
  };

  const bestPinPoint = useMemo(() => {
    if (pinPointHistory.length === 0) return null;
    return [...pinPointHistory].sort((a, b) => a.distance - b.distance)[0];
  }, [pinPointHistory]);

  const worstPinPoint = useMemo(() => {
    if (pinPointHistory.length === 0) return null;
    return [...pinPointHistory].sort((a, b) => b.distance - a.distance)[0];
  }, [pinPointHistory]);

  const handleSharePinPoint = async () => {
    if (!pinPointFlexCardRef.current || isSharing) return;
    
    setIsSharing(true);
    try {
      const canvas = await html2canvas(pinPointFlexCardRef.current, {
        backgroundColor: '#020617',
        scale: 2,
        logging: false,
        useCORS: true
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsSharing(false);
          return;
        }

        const file = new File([blob], `anatomy-vibe-pinpoint-${pinPointXp}.png`, { type: 'image/png' });
        const shareData = {
          title: 'MSK Coach Locatie Score',
          text: t[language].shareTextPinPoint.replace("{xp}", pinPointXp.toString()).replace("{rank}", getPinPointRank(pinPointXp)),
          files: [file]
        };

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log("Share annuleren", err);
          }
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
        setIsSharing(false);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      setIsSharing(false);
    }
  };

  // Zenuwen Logic
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

    const maxTargets = Math.min(matchingMuscles.length, 4 + Math.floor(Math.random() * 2)); // 4 or 5
    const selectedMatching = shuffle(matchingMuscles).slice(0, maxTargets);
    setCorrectCountInGrid(selectedMatching.length);

    const selectedNonMatching = shuffle(nonMatchingMuscles).slice(0, 9 - selectedMatching.length);

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
          setTimeout(() => {
            setIsNerveFinished(true);
            setIsNerveLevelComplete(false);
          }, 1500);
        } else {
          setTimeout(() => {
            setNerveRound(r => r + 1);
            generateNerveRound();
          }, 1500);
        }
      }
    } else {
      setShakingNerve(muscle.id);
      setNerveMistakesThisRound(m => m + 1);
      setTimeout(() => setShakingNerve(null), 300);
    }
  };

  const getNerveRank = (score: number) => {
    if (score < 400) return 'Zenuwslopend';
    if (score < 800) return 'Neuroloog in Opleiding';
    return 'Neuro-Master';
  };

  const bestNerve = useMemo(() => {
    if (nerveHistory.length === 0) return null;
    return [...nerveHistory].sort((a, b) => a.mistakes - b.mistakes)[0];
  }, [nerveHistory]);

  const worstNerve = useMemo(() => {
    if (nerveHistory.length === 0) return null;
    return [...nerveHistory].sort((a, b) => b.mistakes - a.mistakes)[0];
  }, [nerveHistory]);

  const handleShareNerve = async () => {
    if (!nerveFlexCardRef.current || isSharing) return;
    
    setIsSharing(true);
    try {
      const canvas = await html2canvas(nerveFlexCardRef.current, {
        backgroundColor: '#020617',
        scale: 2,
        logging: false,
        useCORS: true
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsSharing(false);
          return;
        }

        const file = new File([blob], `anatomy-vibe-innervatie-${nerveXp}.png`, { type: 'image/png' });
        const shareData = {
          title: 'MSK Coach Innervatie Score',
          text: t[language].shareTextNerve.replace("{xp}", nerveXp.toString()).replace("{rank}", getNerveRank(nerveXp)),
          files: [file]
        };

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share(shareData);
          } catch (err) {
            console.log("Share annuleren", err);
          }
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
        setIsSharing(false);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      setIsSharing(false);
    }
  };

  // Oefenen Logic
  useEffect(() => {
    if (!currentPracticeMuscle) {
      pickRandomMuscle();
    }
  }, []);

  const pickRandomMuscle = () => {
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    setCurrentPracticeMuscle(randomMuscle);
    setGuessedMovements({});
  };

  const handleNextMuscle = () => {
    setStreak(s => s + 1);
    pickRandomMuscle();
  };

  const handleInfoClick = () => {
    setStreak(0);
    setSelectedMuscle(currentPracticeMuscle);
  };

  const handleMovementClick = (movement: string) => {
    if (!currentPracticeMuscle) return;
    if (guessedMovements[movement] === 'correct') return;

    const translatedMovement = t[language].movements[movement as keyof typeof t.nl.movements];
    const hasMovement = currentPracticeMuscle[language].functie.toLowerCase().includes(translatedMovement.toLowerCase());
    
    if (hasMovement) {
      setGuessedMovements(prev => ({ ...prev, [movement]: 'correct' }));
    } else {
      setGuessedMovements(prev => ({ ...prev, [movement]: 'incorrect' }));
      setShakeMovement(movement);
      setTimeout(() => setShakeMovement(null), 300);
    }
  };

  const correctMovementsForCurrent = useMemo(() => {
    if (!currentPracticeMuscle) return [];
    return MOVEMENTS.filter(m => {
      const translatedMovement = t[language].movements[m as keyof typeof t.nl.movements];
      return currentPracticeMuscle[language].functie.toLowerCase().includes(translatedMovement.toLowerCase());
    });
  }, [currentPracticeMuscle]);

  const isMuscleComplete = currentPracticeMuscle && 
    (correctMovementsForCurrent.length === 0 || correctMovementsForCurrent.every(m => guessedMovements[m] === 'correct'));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden relative flex flex-col">
      {/* Background Orbs for Glassmorphism effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-md border-b border-white/10 z-10">
        <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <Menu className="w-6 h-6 text-cyan-400" />
        </button>
        <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
          MSK COACH
        </h1>
        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm bg-slate-900/90 backdrop-blur-xl border-r border-white/10 shadow-2xl p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">
                  MSK COACH
                </h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              
              <div className="flex bg-slate-950 p-1 rounded-full mb-8 relative border border-white/10">
                <div 
                  className="absolute inset-y-1 w-[calc(50%-4px)] bg-slate-800 rounded-full transition-all duration-300 shadow-sm"
                  style={{ left: language === 'nl' ? '4px' : 'calc(50%)' }}
                />
                <button
                  onClick={() => setLanguage('nl')}
                  className={`flex-1 py-2 text-sm font-bold z-10 transition-colors ${language === 'nl' ? 'text-white' : 'text-slate-500'}`}
                >
                  🇳🇱 NL
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-2 text-sm font-bold z-10 transition-colors ${language === 'en' ? 'text-white' : 'text-slate-500'}`}
                >
                  🇬🇧 EN
                </button>
              </div>
              
                            <div className="flex flex-col gap-4">
                
                {!isStandalone && (
                  <button 
                    onClick={handleInstallClick}
                    className="flex items-center gap-3 w-full p-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold rounded-2xl transition-colors border border-cyan-500/20"
                  >
                    <Download className="w-6 h-6" />
                    <span>{t[language].installApp}</span>
                  </button>
                )}

                <button 
                  onClick={() => {
                    setStreak(0);
                    setPinPointXp(0);
                    setGuessedMovements({});
                    setPinPointClick(null);
                    setPinPointFeedback(null);
                    setNerveRound(1);
                    setNerveXp(0);
                    setNerveHistory([]);
                    setIsNerveFinished(false);
                    setNerveMistakesThisRound(0);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-colors text-left"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="font-semibold">{t[language].resetProgress}</span>
                </button>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-4 text-slate-300 text-sm leading-relaxed">
                  <h3 className="font-bold text-slate-200 mb-2">{t[language].aboutTitle}</h3>
                  <p>{t[language].aboutText}</p>
                </div>
              </div>

              <div className="mt-auto pt-8 text-center text-xs text-slate-500 font-medium">
                Auteur: <a href="https://www.linkedin.com/in/tim-gerbrands" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Tim Gerbrands</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 z-10 scrollbar-hide">
        {activeTab === 'bieb' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-4 max-w-2xl mx-auto"
          >
            {/* Search & Filter */}
            <div className="flex flex-col gap-3 sticky top-0 bg-slate-950/80 backdrop-blur-md p-2 -mx-2 z-20 rounded-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t[language].searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-3 mt-2">
              {filteredMuscles.length > 0 ? (
                filteredMuscles.map(muscle => (
                  <button
                    key={muscle.id}
                    onClick={() => setSelectedMuscle(muscle)}
                    className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all group text-left"
                  >
                    <div>
                      <h3 className="font-semibold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {muscle.naam}
                      </h3>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </button>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500">
                  Geen spieren gevonden voor deze zoekopdracht.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'oefenen' && currentPracticeMuscle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full max-w-2xl mx-auto"
          >
            {/* Oefenen Top Bar */}
            <div className="flex justify-between items-center mb-4 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                {currentPracticeMuscle.naam}
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                  <Flame className="w-4 h-4" />
                  <span className="font-bold text-sm">{streak}</span>
                </div>
                <button
                  onClick={handleShareScore}
                  disabled={isSharing}
                  className="flex items-center justify-center p-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
                  title={t[language].shareScore}
                >
                  {isSharing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Playfield */}
            <div className="relative flex-1 min-h-[350px] mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center py-4">
              <div className="relative inline-block h-[350px] max-w-full">
                <img 
                  src={currentPracticeMuscle.visualisatie.basis_weergave} 
                  alt="Skelet" 
                  className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}
                />
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <filter id="neonGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <line 
                    x1={currentPracticeMuscle.visualisatie.origo_x} 
                    y1={currentPracticeMuscle.visualisatie.origo_y} 
                    x2={currentPracticeMuscle.visualisatie.insertie_x} 
                    y2={currentPracticeMuscle.visualisatie.insertie_y} 
                    stroke="#06b6d4" 
                    strokeWidth="3"
                    filter="url(#neonGlow)"
                    className="opacity-70"
                  />
                </svg>
                {/* Origo Dot */}
                <div 
                  className="absolute w-4 h-4 rounded-full bg-fuchsia-400 border-2 border-slate-900 shadow-[0_0_15px_rgba(232,121,249,0.8)] -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: currentPracticeMuscle.visualisatie.origo_x, top: currentPracticeMuscle.visualisatie.origo_y }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-fuchsia-300 uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border border-fuchsia-500/30">{t[language].origo}</div>
                </div>
                {/* Insertie Dot */}
                <div 
                  className="absolute w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.8)] -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: currentPracticeMuscle.visualisatie.insertie_x, top: currentPracticeMuscle.visualisatie.insertie_y }}
                >
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-300 uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border border-cyan-500/30">{t[language].insertion}</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 shrink-0 pb-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {MOVEMENTS.map(movement => {
                  const status = guessedMovements[movement];
                  const isShaking = shakeMovement === movement;
                  let btnClass = "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
                  
                  if (status === 'correct') {
                    btnClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                  } else if (status === 'incorrect') {
                    btnClass = "bg-rose-500/20 text-rose-300 border-rose-500/50";
                  }

                  return (
                    <button
                      key={t[language].movements[movement as keyof typeof t.nl.movements]}
                      onClick={() => handleMovementClick(movement)}
                      className={`p-3 rounded-xl border font-medium text-sm transition-all active:scale-95 ${btnClass} ${isShaking ? 'animate-shake' : ''}`}
                    >
                      {t[language].movements[movement as keyof typeof t.nl.movements]}
                    </button>
                  )
                })}
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center mt-2 h-12">
                <button 
                  onClick={handleInfoClick}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
                >
                  <Info className="w-5 h-5" />
                  <span className="font-medium text-sm">{t[language].info}</span>
                </button>
                
                <AnimatePresence>
                  {isMuscleComplete && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={handleNextMuscle}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2"
                    >
                      Volgende Spier <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'pinpoint' && pinPointMuscle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full max-w-2xl mx-auto"
          >
            {/* Pin-Point Top Bar */}
            <div className="flex justify-between items-center mb-4 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                 <div className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 transition-all duration-300" style={{ width: `${(pinPointRound / 10) * 100}%` }} />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-300">
                {t[language].pointTo} <span className={`uppercase font-black ${pinPointTarget === 'origo' ? 'text-fuchsia-400' : 'text-cyan-400'}`}>{pinPointTarget}</span> {t[language].ofThe} <br/>
                <span className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">{pinPointMuscle.naam}</span>
              </h2>
              <div className="flex flex-col items-end gap-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">🎯 {t[language].round} {pinPointRound} / 10</div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 shadow-[0_0_10px_rgba(244,163,64,0.1)]">
                  <Trophy className="w-4 h-4" />
                  <span className="font-bold text-sm">{pinPointXp} XP</span>
                </div>
              </div>
            </div>

            {/* Pin-Point Playfield */}
            <div className="relative flex-1 min-h-[400px] mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center py-4">
              <div 
                className="relative inline-block h-[400px] max-w-full cursor-crosshair"
                onClick={handlePinPointClick}
              >
                <img 
                  src={pinPointMuscle.visualisatie.basis_weergave} 
                  alt="Skelet" 
                  className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"
                  onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}
                />
                {pinPointClick && pinPointFeedback && (
                  <>
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line 
                        x1={`${pinPointClick.x}%`} 
                        y1={`${pinPointClick.y}%`} 
                        x2={pinPointTarget === 'origo' ? pinPointMuscle.visualisatie.origo_x : pinPointMuscle.visualisatie.insertie_x} 
                        y2={pinPointTarget === 'origo' ? pinPointMuscle.visualisatie.origo_y : pinPointMuscle.visualisatie.insertie_y} 
                        stroke="rgba(255,255,255,0.3)" 
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    </svg>
                    {/* User Click Dot */}
                    <div 
                      className="absolute w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{ left: `${pinPointClick.x}%`, top: `${pinPointClick.y}%` }}
                    />
                    {/* Actual Target Dot */}
                    <div 
                      className={`absolute w-4 h-4 rounded-full border-2 border-slate-900 -translate-x-1/2 -translate-y-1/2 z-10 ${pinPointTarget === 'origo' ? 'bg-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.8)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'}`}
                      style={{ 
                        left: pinPointTarget === 'origo' ? pinPointMuscle.visualisatie.origo_x : pinPointMuscle.visualisatie.insertie_x, 
                        top: pinPointTarget === 'origo' ? pinPointMuscle.visualisatie.origo_y : pinPointMuscle.visualisatie.insertie_y 
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border border-white/30 whitespace-nowrap">
                        Correct
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Pin-Point Feedback Overlay */}
            <AnimatePresence>
              {pinPointFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="shrink-0 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-white">{pinPointFeedback.message}</h3>
                    <span className={`font-black text-lg ${pinPointFeedback.xp > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                      +{pinPointFeedback.xp} XP
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    {t[language].distanceText} {pinPointFeedback.distance.toFixed(1)}{t[language].distanceOff}
                  </p>
                  <button
                    onClick={handlePinPointNext}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    {pinPointRound >= 10 ? 'Bekijk Resultaten' : 'Volgende Spier'} <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'zenuwen' && targetNerve && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full max-w-2xl mx-auto"
          >
            <div className="text-center mb-6 mt-4 hidden">
              <h2 className="text-slate-400 font-medium mb-1">{t[language].supplyPower}</h2>
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-cyan-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                {targetNerve}
              </div>
            </div>

            {/* Zenuwen Top Bar */}
            <div className="flex justify-between items-center mb-4 mt-2 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                 <div className="h-full bg-gradient-to-r from-yellow-500 to-cyan-500 transition-all duration-300" style={{ width: `${(nerveRound / 10) * 100}%` }} />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-300 flex-1">
                 {t[language].supplyPower}<br/>
                 <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-cyan-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">{targetNerve}</span>
              </h2>
              <div className="flex flex-col items-end gap-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">⚡ {t[language].round} {nerveRound} / 10</div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]">
                  <Trophy className="w-4 h-4" />
                  <span className="font-bold text-sm">{nerveXp} XP</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 flex-1 content-center">
              {nerveGrid.map((muscle, idx) => {
                const isFound = foundNerves.includes(muscle.id);
                const isShaking = shakingNerve === muscle.id;
                return (
                  <button
                    key={`${muscle.id}-${idx}`}
                    onClick={() => handleNerveClick(muscle)}
                    className={`relative p-4 rounded-2xl border transition-all duration-300 active:scale-95 flex items-center justify-center text-center min-h-[100px]
                      ${isFound ? 'bg-yellow-400/20 text-yellow-300 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.4)] cursor-default' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'}
                      ${isShaking ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-shake' : ''}
                    `}
                  >
                    <span className="font-semibold text-sm drop-shadow-md leading-snug">{muscle.naam}</span>
                    {isFound && <Zap className="absolute top-2 right-2 w-4 h-4 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,1)]" fill="currentColor" />}
                  </button>
                )
              })}
            </div>

            <div className="mt-auto bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center shrink-0">
              <div className="text-slate-400 font-medium text-sm">{t[language].found}</div>
              <div className="font-bold text-lg text-white">
                <span className="text-yellow-400">{foundNerves.length}</span> / {correctCountInGrid}
              </div>
            </div>

            <AnimatePresence>
              {isNerveLevelComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm rounded-3xl"
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <Zap className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,1)] mb-4" fill="currentColor" />
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-lg">LEVEL COMPLETE!</h2>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMuscle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setSelectedMuscle(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-t-3xl sm:rounded-3xl p-6 relative overflow-y-auto max-h-[85vh] scrollbar-hide"
            >
              <button 
                onClick={() => {
                  setCurrentPracticeMuscle(selectedMuscle);
                  setActiveTab('oefenen');
                  setSelectedMuscle(null);
                }}
                className="absolute top-4 left-4 p-2 bg-white/5 rounded-full text-slate-400 hover:text-fuchsia-400 hover:bg-white/10 transition-colors flex items-center gap-2 px-4"
              >
                <BicepsFlexed className="w-5 h-5" />
                <span className="font-semibold text-sm">{t[language].practice}</span>
              </button>

              <button 
                onClick={() => setSelectedMuscle(null)}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-8 mt-10">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white mt-3">
                  {selectedMuscle.naam}
                </h2>
              </div>

              {/* Added Visualizer to Bieb */}
              <div className="flex justify-center bg-slate-950/50 rounded-2xl border border-white/5 py-4 mb-6">
                <div className="relative inline-block h-[200px] sm:h-[250px]">
                  <img 
                    src={selectedMuscle.visualisatie.basis_weergave} 
                    alt="Skelet" 
                    className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}
                  />
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line 
                      x1={selectedMuscle.visualisatie.origo_x} 
                      y1={selectedMuscle.visualisatie.origo_y} 
                      x2={selectedMuscle.visualisatie.insertie_x} 
                      y2={selectedMuscle.visualisatie.insertie_y} 
                      stroke="#06b6d4" 
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="opacity-70"
                    />
                  </svg>
                  <div 
                    className="absolute w-3 h-3 rounded-full bg-fuchsia-400 border border-slate-900 shadow-[0_0_10px_rgba(232,121,249,0.8)] -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: selectedMuscle.visualisatie.origo_x, top: selectedMuscle.visualisatie.origo_y }}
                  />
                  <div 
                    className="absolute w-3 h-3 rounded-full bg-cyan-400 border border-slate-900 shadow-[0_0_10px_rgba(34,211,238,0.8)] -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: selectedMuscle.visualisatie.insertie_x, top: selectedMuscle.visualisatie.insertie_y }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <DetailRow icon={<MapPin className="w-5 h-5 text-cyan-400" />} label={t[language].origo} value={selectedMuscle[language].origo} />
                <DetailRow icon={<Target className="w-5 h-5 text-rose-400" />} label={t[language].insertion} value={selectedMuscle[language].insertie} />
                <DetailRow icon={<Zap className="w-5 h-5 text-amber-400" />} label={t[language].innervation} value={selectedMuscle[language].innervatie} />
                <DetailRow icon={<Activity className="w-5 h-5 text-emerald-400" />} label={t[language].function} value={selectedMuscle[language].functie} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-slate-900/80 backdrop-blur-lg border-t border-white/10 pb-safe z-40">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          <button
            onClick={() => setActiveTab('bieb')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              activeTab === 'bieb' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Library className="w-6 h-6" />
            <span className="text-[10px] sm:text-xs font-medium">{t[language].library}</span>
          </button>
          <button
            onClick={() => setActiveTab('oefenen')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              activeTab === 'oefenen' ? 'text-fuchsia-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <BicepsFlexed className="w-6 h-6" />
            <span className="text-[10px] sm:text-xs font-medium">{t[language].practice}</span>
          </button>
          <button
            onClick={() => setActiveTab('pinpoint')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              activeTab === 'pinpoint' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Crosshair className="w-6 h-6" />
            <span className="text-[10px] sm:text-xs font-medium">{t[language].pinpoint}</span>
          </button>
          <button
            onClick={() => setActiveTab('zenuwen')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              activeTab === 'zenuwen' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Zap className="w-6 h-6" />
            <span className="text-[10px] sm:text-xs font-medium">{t[language].nerves}</span>
          </button>
        </div>
      </nav>

      {/* Hidden Flex Card for HTML2Canvas Export */}
      <div 
        className="fixed top-[-9999px] left-[-9999px] pointer-events-none"
        aria-hidden="true"
      >
        <div 
          ref={flexCardRef}
          className="relative w-[800px] h-[400px] bg-slate-950 overflow-hidden flex flex-col items-center justify-center border-4 border-slate-800 rounded-3xl"
          style={{ backgroundImage: 'linear-gradient(135deg, #020617 0%, #17062a 50%, #082f49 100%)' }}
        >
          {/* Decorative glow elements */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-fuchsia-600/30 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/30 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
          
          <h1 className="text-5xl font-black text-white tracking-widest uppercase z-10 drop-shadow-lg mb-6">
            MY HIGHSCORE!
          </h1>
          
          <div className="flex items-center gap-4 px-8 py-4 bg-slate-900/50 rounded-full border border-white/20 backdrop-blur-md shadow-2xl z-10 mb-4">
            <Flame className="w-12 h-12 text-rose-500" fill="currentColor" />
            <span className="text-6xl font-bold text-white">{streak}</span>
          </div>

          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 z-10 mb-8">
            {getStreakTitle(streak)}
          </h2>

          <div className="absolute bottom-6 w-full text-center z-10">
            <p className="text-slate-300/80 font-medium tracking-wide">
              Can you beat my streak? <span className="text-cyan-400 font-bold">#AnatomyVibe</span> <span className="text-fuchsia-400 font-bold">#Fysiotherapie</span>
            </p>
          </div>
        </div>
      </div>

      {/* Hidden Flex Card for PinPoint HTML2Canvas Export */}
      <div 
        className="fixed top-[-9999px] left-[-9999px] pointer-events-none"
        aria-hidden="true"
      >
        <div 
          ref={pinPointFlexCardRef}
          className="relative w-[800px] h-[400px] bg-slate-950 overflow-hidden flex flex-col items-center justify-center border-4 border-slate-800 rounded-3xl"
          style={{ backgroundImage: 'linear-gradient(135deg, #020617 0%, #17062a 50%, #450a0a 100%)' }}
        >
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-600/30 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-600/30 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
          
          <h1 className="text-5xl font-black text-white tracking-widest uppercase z-10 drop-shadow-lg mb-4">
            LOCATIE SCORE
          </h1>
          
          <div className="flex items-center gap-4 px-8 py-4 bg-slate-900/50 rounded-full border border-white/20 backdrop-blur-md shadow-2xl z-10 mb-2">
            <Trophy className="w-12 h-12 text-amber-500" fill="currentColor" />
            <span className="text-6xl font-bold text-white">{pinPointXp}</span>
          </div>

          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 z-10 mb-6">
            {getPinPointRank(pinPointXp)}
          </h2>

          <div className="flex gap-8 z-10 text-slate-200 bg-black/30 px-6 py-3 rounded-2xl border border-white/10">
            <div className="text-center">
              <div className="text-sm text-emerald-400 font-bold uppercase tracking-wider mb-1">Beste Schot</div>
              <div className="font-medium">{bestPinPoint?.naam} ({bestPinPoint?.distance.toFixed(1)}%)</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-sm text-rose-400 font-bold uppercase tracking-wider mb-1">Grootste Blunder</div>
              <div className="font-medium">{worstPinPoint?.naam} ({worstPinPoint?.distance.toFixed(1)}%)</div>
            </div>
          </div>

          <div className="absolute bottom-6 w-full text-center z-10">
            <p className="text-slate-300/80 font-medium tracking-wide">
              Can you beat my aim? <span className="text-amber-400 font-bold">#AnatomyVibe</span>
            </p>
          </div>
        </div>
      </div>

      {/* Pin-Point Session Complete Modal */}
      <AnimatePresence>
        {isPinPointFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900/90 border border-white/10 p-6 sm:p-8 rounded-3xl w-full max-w-sm shadow-2xl"
            >
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 text-center mb-6">
                Sessie Voltooid!
              </h2>
              
              <div className="text-center mb-8">
                <p className="text-slate-400 font-medium mb-1">{t[language].totalScore}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{pinPointXp}</span>
                  <span className="text-2xl text-amber-400 font-black mt-3">XP</span>
                </div>
                <p className="text-xl font-bold text-cyan-400 mt-2">{getPinPointRank(pinPointXp)}</p>
              </div>
              
              <div className="space-y-3 mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-slate-200 border-b border-white/10 pb-2 mb-2">{t[language].highlights}</h4>
                <p className="text-sm text-slate-300 flex justify-between">
                  <span className="flex items-center gap-1"><Target className="w-4 h-4 text-emerald-400"/> Beste:</span> 
                  <span className="text-emerald-400 font-medium">{bestPinPoint?.naam} ({bestPinPoint?.distance.toFixed(1)}%)</span>
                </p>
                <p className="text-sm text-slate-300 flex justify-between">
                  <span className="flex items-center gap-1"><X className="w-4 h-4 text-rose-400"/> Blunder:</span> 
                  <span className="text-rose-400 font-medium">{worstPinPoint?.naam} ({worstPinPoint?.distance.toFixed(1)}%)</span>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleSharePinPoint} 
                  disabled={isSharing}
                  className="w-full py-3 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50 hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {isSharing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
                  Deel Resultaat
                </button>
                <button 
                  onClick={startNewPinPointSession} 
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Speel Nog Een Ronde
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Flex Card for Nerve HTML2Canvas Export */}
      <div 
        className="fixed top-[-9999px] left-[-9999px] pointer-events-none"
        aria-hidden="true"
      >
        <div 
          ref={nerveFlexCardRef}
          className="relative w-[800px] h-[400px] bg-slate-950 overflow-hidden flex flex-col items-center justify-center border-4 border-slate-800 rounded-3xl"
          style={{ backgroundImage: 'linear-gradient(135deg, #020617 0%, #172a06 50%, #45400a 100%)' }}
        >
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-600/30 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/30 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
          
          <h1 className="text-5xl font-black text-white tracking-widest uppercase z-10 drop-shadow-lg mb-4">
            INNERVATIE SCORE
          </h1>
          
          <div className="flex items-center gap-4 px-8 py-4 bg-slate-900/50 rounded-full border border-white/20 backdrop-blur-md shadow-2xl z-10 mb-2">
            <Trophy className="w-12 h-12 text-yellow-500" fill="currentColor" />
            <span className="text-6xl font-bold text-white">{nerveXp}</span>
          </div>

          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400 z-10 mb-6">
            {getNerveRank(nerveXp)}
          </h2>

          <div className="flex gap-8 z-10 text-slate-200 bg-black/30 px-6 py-3 rounded-2xl border border-white/10">
            <div className="text-center">
              <div className="text-sm text-emerald-400 font-bold uppercase tracking-wider mb-1">{t[language].bestNerve}</div>
              <div className="font-medium">{bestNerve?.nerve[language]} ({bestNerve?.mistakes} {t[language].mistakes})</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-sm text-rose-400 font-bold uppercase tracking-wider mb-1">{t[language].worstNerve}</div>
              <div className="font-medium">{worstNerve?.nerve[language]} ({worstNerve?.mistakes} {t[language].mistakes})</div>
            </div>
          </div>

          <div className="absolute bottom-6 w-full text-center z-10">
            <p className="text-slate-300/80 font-medium tracking-wide">
              Can you handle the voltage? <span className="text-yellow-400 font-bold">#AnatomyVibe</span>
            </p>
          </div>
        </div>
      </div>

      {/* Nerve Session Complete Modal */}
      <AnimatePresence>
        {isNerveFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900/90 border border-white/10 p-6 sm:p-8 rounded-3xl w-full max-w-sm shadow-2xl"
            >
              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-cyan-400 text-center mb-6">
                Sessie Voltooid!
              </h2>
              
              <div className="text-center mb-8">
                <p className="text-slate-400 font-medium mb-1">{t[language].totalScore}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{nerveXp}</span>
                  <span className="text-2xl text-yellow-400 font-black mt-3">XP</span>
                </div>
                <p className="text-xl font-bold text-cyan-400 mt-2">{getNerveRank(nerveXp)}</p>
              </div>
              
              <div className="space-y-3 mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-slate-200 border-b border-white/10 pb-2 mb-2">{t[language].highlights}</h4>
                <p className="text-sm text-slate-300 flex justify-between">
                  <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-emerald-400"/> Beste:</span> 
                  <span className="text-emerald-400 font-medium text-right">{bestNerve?.nerve[language]} ({bestNerve?.mistakes} {t[language].mistakes})</span>
                </p>
                <p className="text-sm text-slate-300 flex justify-between">
                  <span className="flex items-center gap-1"><X className="w-4 h-4 text-rose-400"/> Slechtste:</span> 
                  <span className="text-rose-400 font-medium text-right">{worstNerve?.nerve[language]} ({worstNerve?.mistakes} {t[language].mistakes})</span>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleShareNerve} 
                  disabled={isSharing}
                  className="w-full py-3 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/50 hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {isSharing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
                  Deel Resultaat
                </button>
                <button 
                  onClick={startNewNerveSession} 
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Speel Nog Een Ronde
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* iOS Install Modal */}
      <AnimatePresence>
        {showIOSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900/90 border border-white/10 p-6 rounded-3xl w-full max-w-sm shadow-2xl relative"
            >
              <button 
                onClick={() => setShowIOSModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4 border border-cyan-500/20">
                  <Share className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t[language].iosInstallTitle}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {t[language].iosInstallBody}
                </p>
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="w-full py-3 bg-cyan-500/20 text-cyan-300 font-bold rounded-xl border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                >
                  {t[language].closeBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</h4>
        <p className="text-sm text-slate-200 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}