import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

zen_start = code.find("{activeTab === 'zenuwen' && targetNerve && (")
zen_end = code.find("</main>", zen_start)

if zen_start != -1 and zen_end != -1:
    new_render = """{activeTab === 'zenuwen' && nerveMuscle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col flex-1 min-h-0 w-full max-w-2xl mx-auto"
          >
            <MusclePlayfield 
              muscle={nerveMuscle} 
              language={language} 
              showSuccess={showSuccessAnimation} 
              overlayTitle={`${t[language].round} ${nerveRound} / 10`}
            >
              {/* Controls */}
              <div className="flex flex-col gap-4 shrink-0 pb-2 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {nerveOptions.map((optionStr) => {
                    let btnClass = "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10";
                    
                    if (nerveAnswered) {
                      if (optionStr === nerveMuscle[language].innervatie) {
                        btnClass = "bg-yellow-500/20 text-yellow-300 border-yellow-500/50 shadow-[0_0_15px_rgba(250,204,21,0.2)]";
                      } else if (optionStr === nerveSelectedOption) {
                        btnClass = "bg-rose-500/20 text-rose-300 border-rose-500/50";
                      }
                    } else if (optionStr === nerveSelectedOption) {
                      btnClass = "bg-rose-500/20 text-rose-300 border-rose-500/50 animate-shake";
                    }
                    
                    return (
                      <button
                        key={`nerve-${optionStr}`}
                        onClick={() => handleNerveOptionClick(optionStr)}
                        disabled={nerveAnswered}
                        className={`p-4 rounded-xl border font-semibold text-sm transition-all active:scale-95 ${btnClass}`}
                      >
                        {optionStr}
                      </button>
                    )
                  })}
                </div>
                {/* Action Bar */}
                <div className="flex justify-between items-center mt-2 h-12">
                  <button 
                    onClick={() => {
                      setSelectedMuscle(nerveMuscle);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-colors"
                  >
                    <Info className="w-5 h-5" />
                    <span className="font-medium text-sm">{t[language].info}</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]">
                      <Trophy className="w-4 h-4" />
                      <span className="font-bold text-sm">{nerveXp} XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </MusclePlayfield>
          </motion.div>
        )}
      """
    
    code = code[:zen_start] + new_render + code[zen_end:]
    with open('src/App.tsx', 'w') as f:
        f.write(code)
