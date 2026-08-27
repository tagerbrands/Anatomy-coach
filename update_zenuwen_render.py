import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

old_render = """        {activeTab === 'zenuwen' && targetNerve && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col flex-1 min-h-0 w-full max-w-2xl mx-auto px-4"
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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-2 flex-1 content-center min-h-0 overflow-y-auto scrollbar-hide">
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
        )}"""

new_render = """        {activeTab === 'zenuwen' && nerveMuscle && (
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
        )}"""
code = code.replace(old_render, new_render)

with open('src/App.tsx', 'w') as f:
    f.write(code)
