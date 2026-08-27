import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

old_quiz_state = """  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);"""

new_quiz_state = """  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizMistakeMade, setQuizMistakeMade] = useState(false);"""
code = code.replace(old_quiz_state, new_quiz_state)

old_start_quiz = """  const startNewQuizRound = () => {
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    setQuizMuscle(randomMuscle);
    setQuizAnswered(false);
    setQuizSelectedOption(null);
    setShowSuccessAnimation(false);"""

new_start_quiz = """  const startNewQuizRound = () => {
    const randomMuscle = MUSCLES[Math.floor(Math.random() * MUSCLES.length)];
    setQuizMuscle(randomMuscle);
    setQuizAnswered(false);
    setQuizMistakeMade(false);
    setQuizSelectedOption(null);
    setShowSuccessAnimation(false);"""
code = code.replace(old_start_quiz, new_start_quiz)


old_quiz_click = """  const handleQuizOptionClick = (optionName: string) => {
    if (quizAnswered || !quizMuscle) return;
    
    setQuizSelectedOption(optionName);
    
    if (optionName === quizMuscle.naam) {
      setQuizAnswered(true);
      setQuizStreak(s => s + 1);
      setShowSuccessAnimation(true);
      setTimeout(() => { setShowSuccessAnimation(false); startNewQuizRound(); }, 1200);
    } else {
      setQuizStreak(0);
    }
  };"""

new_quiz_click = """  const handleQuizOptionClick = (optionName: string) => {
    if (quizAnswered || !quizMuscle) return;
    
    setQuizSelectedOption(optionName);
    
    if (optionName === quizMuscle.naam) {
      setQuizAnswered(true);
      if (!quizMistakeMade) setQuizStreak(s => s + 1);
      setShowSuccessAnimation(true);
      setTimeout(() => { setShowSuccessAnimation(false); startNewQuizRound(); }, 1200);
    } else {
      setQuizStreak(0);
      setQuizMistakeMade(true);
    }
  };"""
code = code.replace(old_quiz_click, new_quiz_click)

with open('src/App.tsx', 'w') as f:
    f.write(code)
