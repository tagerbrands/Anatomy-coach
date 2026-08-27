const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{pinPointClick && pinPointFeedback && \([\s\S]*?\{pinPointTarget === 'origo' \? t\[language\]\.origo : t\[language\]\.insertion\}<\/div>\s*<\/div>\s*<\/>\s*\)\}/;

const newPinPointSvg = `{pinPointClick && pinPointFeedback && (
                  <>
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
                    {/* User Click Dot */}
                    <div 
                      className="absolute w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.8)] -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{ left: \`\${pinPointClick.x}%\`, top: \`\${pinPointClick.y}%\` }}
                    />
                    {/* Actual Target Dots */}
                    {pinPointMuscle.visualisatie.filter(p => p.type === pinPointTarget && p.image.includes(viewSidePinPoint)).map((target, idx) => (
                      <div 
                        key={\`pp-target-\${idx}\`}
                        className={\`absolute w-4 h-4 rounded-full border-2 border-slate-900 -translate-x-1/2 -translate-y-1/2 z-10 \${pinPointTarget === 'origo' ? 'bg-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.8)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]'}\`}
                        style={{ left: target.x, top: target.y }}
                      >
                        <div className={\`absolute \${pinPointTarget === 'origo' ? '-top-6' : '-bottom-6'} left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border \${pinPointTarget === 'origo' ? 'text-fuchsia-300 border-fuchsia-500/30' : 'text-cyan-300 border-cyan-500/30'}\`}>
                          {pinPointTarget === 'origo' ? t[language].origo : t[language].insertion}
                        </div>
                      </div>
                    ))}
                  </>
                )}`;

content = content.replace(regex, newPinPointSvg);
fs.writeFileSync('src/App.tsx', content);
