const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Modifying the SVG defs in App.tsx. I will replace `<svg className="absolute inset-0 w-full h-full pointer-events-none">` with the new one containing the gradients.
const svgGradients = `<svg className="absolute inset-0 w-full h-full pointer-events-none">
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
                  </defs>`;

content = content.replace(/<svg className="absolute inset-0 w-full h-full pointer-events-none">\s*<defs>\s*<filter id="neonGlow">[\s\S]*?<\/filter>\s*<\/defs>/, svgGradients);

// Wait, the detail modal doesn't have the filter defs yet. Let's just blindly replace all <svg className="absolute inset-0 w-full h-full pointer-events-none"> if they are followed by <line. Or better, just string replace.
// Let's use regex for Elastiek line
content = content.replace(
  /<line\s*x1={currentPracticeMuscle\.visualisatie\.origo_x}[\s\S]*?className="opacity-70"\s*\/>/,
  `<line 
                    x1={currentPracticeMuscle.visualisatie.origo_x} 
                    y1={currentPracticeMuscle.visualisatie.origo_y} 
                    x2={currentPracticeMuscle.visualisatie.insertie_x} 
                    y2={currentPracticeMuscle.visualisatie.insertie_y} 
                    stroke="url(#neonGradient)" 
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#neonGlowThick)"
                    className="opacity-90"
                  />`
);

// Detail Modal line
content = content.replace(
  /<svg className="absolute inset-0 w-full h-full pointer-events-none">\s*<line\s*x1={selectedMuscle\.visualisatie\.origo_x}[\s\S]*?className="opacity-70"\s*\/>\s*<\/svg>/,
  `<svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="neonGradientModal" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#e879f9" />
                      </linearGradient>
                      <filter id="neonGlowThickModal">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <line 
                      x1={selectedMuscle.visualisatie.origo_x} 
                      y1={selectedMuscle.visualisatie.origo_y} 
                      x2={selectedMuscle.visualisatie.insertie_x} 
                      y2={selectedMuscle.visualisatie.insertie_y} 
                      stroke="url(#neonGradientModal)" 
                      strokeWidth="6"
                      strokeLinecap="round"
                      filter="url(#neonGlowThickModal)"
                      className="opacity-90"
                    />
                  </svg>`
);

// Swipe buttons in detail modal
const modalHeaderOld = `<h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white mt-3">
                  {selectedMuscle.naam}
                </h2>`;
const modalHeaderNew = `<div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white pr-2">
                    {selectedMuscle.naam}
                  </h2>
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = MUSCLES.findIndex(m => m.id === selectedMuscle.id);
                        setSelectedMuscle(MUSCLES[idx > 0 ? idx - 1 : MUSCLES.length - 1]);
                      }}
                      className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-cyan-400 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = MUSCLES.findIndex(m => m.id === selectedMuscle.id);
                        setSelectedMuscle(MUSCLES[idx < MUSCLES.length - 1 ? idx + 1 : 0]);
                      }}
                      className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-cyan-400 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>`;
content = content.replace(modalHeaderOld, modalHeaderNew);

// Hero Section in Bieb
const biebSearchOld = `<div className="flex flex-col gap-3 sticky top-0 bg-slate-950/80 backdrop-blur-md p-2 -mx-2 z-20 rounded-xl">`;
const biebHero = `
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-fuchsia-900/40 rounded-3xl p-6 border border-white/10 mb-2 shadow-2xl relative overflow-hidden shrink-0 mt-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">MSK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">Coach</span></h2>
                  <p className="text-slate-300 text-sm max-w-[200px] leading-relaxed">
                    {language === 'nl' ? 'Master je anatomie en klinisch redeneren.' : 'Master your anatomy and clinical reasoning.'}
                  </p>
                </div>
                <div className="text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">🦴</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-cyan-400 mb-1">{MUSCLES.length}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Spieren</span>
                </div>
                <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-3 border border-white/5 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-fuchsia-400 mb-1">3</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Gamemodes</span>
                </div>
              </div>
            </div>
`;
content = content.replace(biebSearchOld, biebHero + biebSearchOld);

fs.writeFileSync('src/App.tsx', content);
