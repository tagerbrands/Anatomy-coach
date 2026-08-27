import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Fix Quiz Logic
old_quiz_click = """  const handleQuizOptionClick = (optionName: string) => {
    if (quizAnswered || !quizMuscle) return;
    
    setQuizAnswered(true);
    setQuizSelectedOption(optionName);
    
    if (optionName === quizMuscle.naam) {
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
      setQuizStreak(s => s + 1);
      setShowSuccessAnimation(true);
      setTimeout(() => { setShowSuccessAnimation(false); startNewQuizRound(); }, 1200);
    } else {
      setQuizStreak(0);
    }
  };"""
code = code.replace(old_quiz_click, new_quiz_click)

# In the render of Quiz options:
old_quiz_render = """                    if (quizAnswered) {
                      if (option === quizMuscle.naam) {
                        btnClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                      } else if (option === quizSelectedOption) {
                        btnClass = "bg-rose-500/20 text-rose-300 border-rose-500/50";
                      }
                    } else if (option === quizSelectedOption) {
                      btnClass = "bg-cyan-500/20 text-cyan-300 border-cyan-500/50";
                    }"""

new_quiz_render = """                    if (quizAnswered) {
                      if (option === quizMuscle.naam) {
                        btnClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                      } else if (option === quizSelectedOption) {
                        btnClass = "bg-rose-500/20 text-rose-300 border-rose-500/50";
                      }
                    } else if (option === quizSelectedOption) {
                      btnClass = "bg-rose-500/20 text-rose-300 border-rose-500/50 animate-shake";
                    }"""
code = code.replace(old_quiz_render, new_quiz_render)

# Remove overlayTitle from quiz
old_quiz_playfield = """            <MusclePlayfield 
              muscle={quizMuscle} 
              language={language} 
              showSuccess={showSuccessAnimation} 
              overlayTitle={`${t[language].question} ${quizStreak + 1}`}
            >"""
new_quiz_playfield = """            <MusclePlayfield 
              muscle={quizMuscle} 
              language={language} 
              showSuccess={showSuccessAnimation} 
            >"""
code = code.replace(old_quiz_playfield, new_quiz_playfield)

with open('src/App.tsx', 'w') as f:
    f.write(code)
