import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

zenuwen_start = code.find('// Zenuwen Logic')
oefenen_start = code.find('// Oefenen Logic')

if zenuwen_start != -1 and oefenen_start != -1:
    new_zenuwen_logic = """// Zenuwen Logic
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

  """
    code = code[:zenuwen_start] + new_zenuwen_logic + code[oefenen_start:]
    
with open('src/App.tsx', 'w') as f:
    f.write(code)
