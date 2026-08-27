const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const quizLogicCode = `
  // Quiz Logic
  useEffect(() => {
    if (quizMuscle) {
      setViewSideQuiz(quizMuscle.visualisatie[0]?.image.includes('achter') ? 'achter' : 'voor');
    }
  }, [quizMuscle]);

  useEffect(() => {
    if (activeTab === 'quiz' && !quizMuscle) {
      startNewQuizRound();
    }
  }, [activeTab]);

  const startNewQuizRound = () => {
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    setQuizMuscle(randomMuscle);
    setQuizAnswered(false);
    setQuizSelectedOption(null);
    setShowSuccessAnimation(false);
    
    const distractors = MUSCLES.filter(m => m.id !== randomMuscle.id);
    const shuffledDistractors = distractors.sort(() => 0.5 - Math.random()).slice(0, 5);
    const options = [...shuffledDistractors.map(m => m.naam), randomMuscle.naam];
    
    setQuizOptions(options.sort(() => 0.5 - Math.random()));
  };

  const handleQuizOptionClick = (optionName: string) => {
    if (quizAnswered || !quizMuscle) return;
    
    setQuizAnswered(true);
    setQuizSelectedOption(optionName);
    
    if (optionName === quizMuscle.naam) {
      setQuizStreak(s => s + 1);
      setShowSuccessAnimation(true);
      setTimeout(() => {
        setShowSuccessAnimation(false);
        startNewQuizRound();
      }, 1500);
    } else {
      setQuizStreak(0);
    }
  };

`;

code = code.replace(
  /\/\/ Zenuwen Logic/,
  quizLogicCode + '// Zenuwen Logic'
);

fs.writeFileSync('src/App.tsx', code);
