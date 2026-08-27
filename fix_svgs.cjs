const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// I'll define a function that generates the dots and lines for a muscle based on current side.
// The drawing logic: 
// 1. Filter muscle.visualisatie to points where image includes currentSide
// 2. Draw dots for each point.
// 3. If there is at least 1 origo and 1 insertie in the current side, draw a line. (Actually, what if there are multiple? Let's just draw lines from all origos to all inserties on that side, or just the first origo to first insertie. The instructions say: "Trek de verbindingslijnen tussen origo en insertie alleen als ze zich in hetzelfde aanzicht bevinden." Since it's an array, we could map them. Most muscles only have 1 of each on the same side, some have 2 origos like semimembranosus. Let's draw from all origos to all inserties on the current side).

function getNewSVG(muscleVar, sideVar) {
  return `                <svg className="absolute inset-0 w-full h-full pointer-events-none">
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

const oefenenRegex = /\{currentPracticeMuscle && \(currentPracticeMuscle\.visualisatie\.basis_weergave\.includes\(viewSideOefenen\)\) && \(\s*<>\s*<svg className="absolute inset-0 w-full h-full pointer-events-none">[\s\S]*?<\/div>\s*<\/div>\s*<\/>\)}\s*<\/div>\s*<\/div>\s*\{\/\* Controls \*\/\}/;

content = content.replace(oefenenRegex, `
                ${getNewSVG('currentPracticeMuscle', 'viewSideOefenen')}
              </div>
            </div>
            {/* Controls */}`);

const biebRegex = /\{selectedMuscle && \(selectedMuscle\.visualisatie\.basis_weergave\.includes\(viewSideBieb\)\) && \(\s*<>\s*<svg className="absolute inset-0 w-full h-full pointer-events-none">[\s\S]*?<\/div>\s*<\/div>\s*<\/>\)}\s*<\/div>\s*<\/div>\s*<div className="space-y-6">/;

content = content.replace(biebRegex, `
                ${getNewSVG('selectedMuscle', 'viewSideBieb')}
              </div>
            </div>
            <div className="space-y-6">`);


fs.writeFileSync('src/App.tsx', content);
