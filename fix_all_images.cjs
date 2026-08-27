const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

function getNewSVG(muscleVar, sideVar) {
  return `                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#e879f9" />
                      </linearGradient>
                      <filter id="neonGlowThick">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {${muscleVar}.visualisatie.filter(p => p.image.includes(${sideVar}) && p.type === 'origo').map((origo, oIdx) => (
                      ${muscleVar}.visualisatie.filter(p => p.image.includes(${sideVar}) && p.type === 'insertie').map((insertie, iIdx) => (
                        <line 
                          key={\`line-\${oIdx}-\${iIdx}\`}
                          x1={origo.x} 
                          y1={origo.y} 
                          x2={insertie.x} 
                          y2={insertie.y} 
                          stroke="url(#neonGradient)" 
                          strokeWidth="6"
                          strokeLinecap="round"
                          filter="url(#neonGlowThick)"
                          className="opacity-90"
                        />
                      ))
                    ))}
                  </svg>
                  {/* Dots */}
                  {${muscleVar}.visualisatie.filter(p => p.image.includes(${sideVar})).map((point, idx) => (
                    <div 
                      key={\`dot-\${idx}\`}
                      className={\`absolute w-4 h-4 rounded-full border-2 border-slate-900 -translate-x-1/2 -translate-y-1/2 z-10 \${point.type === 'origo' ? 'bg-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.8)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'}\`}
                      style={{ left: point.x, top: point.y }}
                    >
                      <div className={\`absolute \${point.type === 'origo' ? '-top-6' : '-bottom-6'} left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border \${point.type === 'origo' ? 'text-fuchsia-300 border-fuchsia-500/30' : 'text-cyan-300 border-cyan-500/30'}\`}>
                        {point.type === 'origo' ? t[language].origo : t[language].insertion}
                      </div>
                    </div>
                  ))}`;
}

const oefenenStart = '<div className="w-full flex flex-col items-center absolute top-2 left-0 right-0 z-20 pointer-events-auto">';
const oefenenEnd = '{/* Controls */}';

const oefenenContent = `              <div className="w-full flex flex-col items-center absolute top-2 left-0 right-0 z-20 pointer-events-auto">
                <ViewToggle side={viewSideOefenen} setSide={setViewSideOefenen} language={language} />
              </div>
              <div className="flex w-full h-full items-center justify-center pt-16 overflow-hidden">
                <div className="relative inline-block h-full">
                  <img 
                    src={getRegionImage(currentPracticeMuscle, viewSideOefenen)} 
                    alt="Skelet" 
                    className="block h-full w-auto max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}
                  />
                  {currentPracticeMuscle && currentPracticeMuscle.visualisatie.some(p => p.image.includes(viewSideOefenen)) && (
                    <>
${getNewSVG('currentPracticeMuscle', 'viewSideOefenen')}
                    </>
                  )}
                </div>
              </div>
            </div>
            `;

code = code.substring(0, code.indexOf(oefenenStart)) + oefenenContent + code.substring(code.indexOf(oefenenEnd));


const pinpointStart = '{/* Pin-Point Playfield */}';
const pinpointEnd = '{/* Pin-Point Feedback Overlay */}';

const pinpointContent = `{/* Pin-Point Playfield */}
            <div className="relative flex-1 min-h-0 mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center p-2 sm:p-4">
              <div className="w-full flex flex-col items-center absolute top-2 left-0 right-0 z-20 pointer-events-auto">
                <ViewToggle side={viewSidePinPoint} setSide={setViewSidePinPoint} language={language} />
              </div>
              <div className="flex w-full h-full items-center justify-center pt-16 overflow-hidden">
                <div 
                  className="relative inline-block h-full cursor-crosshair"
                  onClick={handlePinPointClick}
                >
                  <img 
                    src={getRegionImage(pinPointMuscle, viewSidePinPoint)} 
                    alt="Skelet" 
                    className="block h-full w-auto max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}
                  />
                  {pinPointClick && pinPointFeedback && (
                    <>
                      {pinPointMuscle.visualisatie.some(p => p.image.includes(viewSidePinPoint)) && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          {pinPointMuscle.visualisatie.filter(p => p.type === pinPointTarget && p.image.includes(viewSidePinPoint)).map((target, idx) => (
                            <line 
                              key={\`pp-line-\${idx}\`}
                              x1={\`\${pinPointClick.x}%\`} 
                              y1={\`\${pinPointClick.y}%\`} 
                              x2={target.x} 
                              y2={target.y} 
                              stroke="rgba(255,255,255,0.3)" 
                              strokeWidth="2"
                              strokeDasharray="4 4"
                            />
                          ))}
                        </svg>
                      )}
                      {/* User Click Dot */}
                      <div 
                        className="absolute w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                        style={{ left: \`\${pinPointClick.x}%\`, top: \`\${pinPointClick.y}%\` }}
                      />
                      {/* Actual Target Dots */}
                      {pinPointMuscle.visualisatie.filter(p => p.type === pinPointTarget && p.image.includes(viewSidePinPoint)).map((target, idx) => (
                        <div 
                          key={\`pp-target-\${idx}\`}
                          className={\`absolute w-4 h-4 rounded-full border-2 border-slate-900 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none \${pinPointTarget === 'origo' ? 'bg-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.8)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'}\`}
                          style={{ left: target.x, top: target.y }}
                        >
                          <div className={\`absolute \${pinPointTarget === 'origo' ? '-top-6' : '-bottom-6'} left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border \${pinPointTarget === 'origo' ? 'text-fuchsia-300 border-fuchsia-500/30' : 'text-cyan-300 border-cyan-500/30'}\`}>
                            {pinPointTarget === 'origo' ? t[language].origo : t[language].insertion}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            `;

code = code.substring(0, code.indexOf(pinpointStart)) + pinpointContent + code.substring(code.indexOf(pinpointEnd));


const biebStart = '{/* Added Visualizer to Bieb */}';
const biebEnd = '<div className="flex flex-col gap-4">';

const biebContent = `{/* Added Visualizer to Bieb */}
              <div className="flex justify-center bg-slate-950/50 rounded-2xl border border-white/5 py-4 mb-6">
                <div className="w-full flex flex-col items-center">
                  <ViewToggle side={viewSideBieb} setSide={setViewSideBieb} language={language} />
                  
                  <div className="flex w-full h-[250px] sm:h-[300px] items-center justify-center overflow-hidden">
                    <div className="relative inline-block h-full mt-4">
                      <img 
                        src={getRegionImage(selectedMuscle, viewSideBieb)} 
                        alt="Skelet" 
                        className="block h-full w-auto max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"
                        onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}
                      />
                      {selectedMuscle && selectedMuscle.visualisatie.some(p => p.image.includes(viewSideBieb)) && (
                        <>
${getNewSVG('selectedMuscle', 'viewSideBieb')}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              `;

code = code.substring(0, code.indexOf(biebStart)) + biebContent + code.substring(code.indexOf(biebEnd));


fs.writeFileSync('src/App.tsx', code);
