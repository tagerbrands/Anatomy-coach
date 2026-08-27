const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const quizTabHTML = `
        {activeTab === 'quiz' && quizMuscle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col h-full max-w-2xl mx-auto w-full"
          >
            {/* Header: Streak */}
            <div className="flex justify-between items-center mb-4 px-2 shrink-0">
              <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 drop-shadow-sm flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-emerald-400" />
                {t[language].quiz}
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 text-orange-400 rounded-full border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                  <Flame className="w-4 h-4" />
                  <span className="font-bold text-sm">{quizStreak}</span>
                </div>
              </div>
            </div>

            {/* Playfield */}
            <div className="relative flex-1 min-h-0 mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center p-2 sm:p-4">
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
              </AnimatePresence>
              
              <div className="w-full flex flex-col items-center absolute top-2 left-0 right-0 z-20 pointer-events-auto">
                <ViewToggle side={viewSideQuiz} setSide={setViewSideQuiz} language={language} />
              </div>
              <div className="flex w-full h-full items-center justify-center pt-16 overflow-hidden">
                <div className="relative inline-block" style={{ width: "fit-content", height: "fit-content", maxHeight: "100%" }}>
                  <img 
                    src={getRegionImage(quizMuscle, viewSideQuiz)} 
                    alt="Skelet" 
                    className="block pointer-events-none opacity-80 mix-blend-screen" style={{ display: "block", maxWidth: "100%", maxHeight: "100%", height: "auto" }}
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}
                  />
                  {quizMuscle && quizMuscle.visualisatie.some(p => p.image.includes(viewSideQuiz)) && (
                    <>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="neonGradientQuiz" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#e879f9" />
                      </linearGradient>
                      <filter id="neonGlowThickQuiz">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {quizMuscle.visualisatie.filter(p => p.image.includes(viewSideQuiz) && p.type === 'origo').map((origo, oIdx) => (
                      quizMuscle.visualisatie.filter(p => p.image.includes(viewSideQuiz) && p.type === 'insertie').map((insertie, iIdx) => (
                        <line 
                          key={\`line-\${oIdx}-\${iIdx}\`}
                          x1={origo.x} 
                          y1={origo.y} 
                          x2={insertie.x} 
                          y2={insertie.y} 
                          stroke="url(#neonGradientQuiz)" 
                          strokeWidth="6"
                          strokeLinecap="round"
                          filter="url(#neonGlowThickQuiz)"
                          className="opacity-90"
                        />
                      ))
                    ))}
                  </svg>
                  {/* Dots */}
                  {quizMuscle.visualisatie.filter(p => p.image.includes(viewSideQuiz)).map((point, idx) => (
                    <div 
                      key={\`dot-\${idx}\`}
                      className={\`absolute w-4 h-4 rounded-full border-2 border-slate-900 -translate-x-1/2 -translate-y-1/2 z-10 \${point.type === 'origo' ? 'bg-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.8)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'}\`}
                      style={{ left: point.x, top: point.y }}
                    >
                      <div className={\`absolute \${point.type === 'origo' ? '-top-6' : '-bottom-6'} left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border \${point.type === 'origo' ? 'text-fuchsia-300 border-fuchsia-500/30' : 'text-cyan-300 border-cyan-500/30'}\`}>
                        {point.type === 'origo' ? t[language].origo : t[language].insertion}
                      </div>
                    </div>
                  ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4 shrink-0 pb-6">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {quizOptions.map((option) => {
                  let btnClass = "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
                  
                  if (quizAnswered) {
                    if (option === quizMuscle.naam) {
                      btnClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                    } else if (option === quizSelectedOption) {
                      btnClass = "bg-rose-500/20 text-rose-300 border-rose-500/50";
                    } else {
                      btnClass = "bg-white/5 text-slate-500 border-white/5 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleQuizOptionClick(option)}
                      disabled={quizAnswered}
                      className={\`p-3 rounded-xl border font-medium text-sm transition-all active:scale-95 \${btnClass}\`}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
              {quizAnswered && quizSelectedOption !== quizMuscle.naam && (
                <button
                  onClick={() => startNewQuizRound()}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 mt-2"
                >
                  Volgende Vraag <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        )}
`;

const anchor = "{/* Bottom Navigation */}";
code = code.substring(0, code.indexOf(anchor)) + quizTabHTML + '\n      ' + code.substring(code.indexOf(anchor));
fs.writeFileSync('src/App.tsx', code);
