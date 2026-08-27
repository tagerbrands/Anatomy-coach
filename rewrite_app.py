import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

playfield_component = """
function MusclePlayfield({ muscle, language, children, showSuccess, successText, overlayTitle, isPinPoint, pinPointTarget, onPinPointClick, pinPointClick, pinPointFeedback, pinPointSide }: any) {
  const t = {
    nl: { origo: 'Origo', insertion: 'Insertie', correct: 'Goed!' },
    en: { origo: 'Origin', insertion: 'Insertion', correct: 'Correct!' }
  };
  const sides = getRequiredSides(muscle);
  return (
    <div className="relative flex-1 min-h-0 mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex flex-col p-2 sm:p-4">
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-emerald-500/20 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-emerald-500 text-white font-black text-3xl sm:text-5xl px-8 py-4 rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.8)] border border-white/20 text-center"
            >
              {successText || t[language].correct + " 🎉"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {overlayTitle && (
        <div className="absolute top-4 left-0 right-0 z-20 text-center pointer-events-none px-4">
          <h2 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 drop-shadow-md">
            {overlayTitle}
          </h2>
        </div>
      )}

      <div className="flex w-full h-full items-center justify-center pt-8 overflow-hidden min-h-0 shrink gap-2 sm:gap-8">
        {sides.map(side => {
           const isCurrentSidePinPoint = pinPointSide === side;
           return (
             <div 
               key={side} 
               className={`relative inline-block min-h-0 shrink h-full ${isPinPoint ? 'cursor-crosshair' : ''}`}
               onClick={isPinPoint && onPinPointClick ? (e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = ((e.clientX - rect.left) / rect.width) * 100;
                 const y = ((e.clientY - rect.top) / rect.height) * 100;
                 onPinPointClick(e, x, y, side);
               } : undefined}
             >
               <img 
                 src={getRegionImage(muscle, side)} 
                 alt={`Skelet ${side}`} 
                 className="block pointer-events-none opacity-80 mix-blend-screen h-full max-h-[42vh] sm:max-h-[55vh] w-auto object-contain shrink"
                 onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}
               />
               
               {muscle.visualisatie.some((p: any) => p.image.includes(side)) && !isPinPoint && (
                 <>
                   <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
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
                     {muscle.visualisatie.filter((p: any) => p.image.includes(side) && p.type === 'origo').map((origo: any, oIdx: number) => (
                       muscle.visualisatie.filter((p: any) => p.image.includes(side) && p.type === 'insertie').map((insertie: any, iIdx: number) => (
                         <line 
                           key={`line-${oIdx}-${iIdx}`}
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
                   {muscle.visualisatie.filter((p: any) => p.image.includes(side)).map((point: any, idx: number) => (
                     <div 
                       key={`dot-${idx}`}
                       className={`absolute w-4 h-4 rounded-full border-2 border-slate-900 -translate-x-1/2 -translate-y-1/2 z-10 ${point.type === 'origo' ? 'bg-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.8)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'}`}
                       style={{ left: point.x, top: point.y }}
                     >
                       <div className={`absolute ${point.type === 'origo' ? '-top-6' : '-bottom-6'} left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border ${point.type === 'origo' ? 'text-fuchsia-300 border-fuchsia-500/30' : 'text-cyan-300 border-cyan-500/30'}`}>
                         {point.type === 'origo' ? t[language as keyof typeof t].origo : t[language as keyof typeof t].insertion}
                       </div>
                     </div>
                   ))}
                 </>
               )}

               {isPinPoint && isCurrentSidePinPoint && pinPointClick && pinPointFeedback && (
                 <>
                   {muscle.visualisatie.some((p: any) => p.image.includes(side)) && (
                     <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                       {muscle.visualisatie.filter((p: any) => p.type === pinPointTarget && p.image.includes(side)).map((target: any, idx: number) => (
                         <line 
                           key={`pp-line-${idx}`}
                           x1={`${pinPointClick.x}%`} 
                           y1={`${pinPointClick.y}%`} 
                           x2={target.x} 
                           y2={target.y} 
                           stroke="rgba(255,255,255,0.3)" 
                           strokeWidth="2"
                           strokeDasharray="4 4"
                         />
                       ))}
                     </svg>
                   )}
                   <div 
                     className="absolute w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                     style={{ left: `${pinPointClick.x}%`, top: `${pinPointClick.y}%` }}
                   />
                   {muscle.visualisatie.filter((p: any) => p.type === pinPointTarget && p.image.includes(side)).map((target: any, idx: number) => (
                     <div 
                       key={`pp-target-${idx}`}
                       className={`absolute w-5 h-5 rounded-full border-2 border-slate-900 -translate-x-1/2 -translate-y-1/2 z-10 ${pinPointFeedback.distance < 3 ? 'bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]' : 'bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]'}`}
                       style={{ left: target.x, top: target.y }}
                     />
                   ))}
                 </>
               )}
             </div>
           );
        })}
      </div>
      {children}
    </div>
  );
}
"""

if "function MusclePlayfield" not in code:
    idx = code.find("export default function App() {")
    code = code[:idx] + playfield_component + "\n" + code[idx:]

with open('src/App.tsx', 'w') as f:
    f.write(code)
