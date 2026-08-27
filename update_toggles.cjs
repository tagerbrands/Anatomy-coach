const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Replace getRegionImage
const oldGetRegionImage = `const getRegionImage = (muscle: Muscle | null) => {
  if (!muscle || !muscle.visualisatie) return 'skelet_achter.png';
  const origoY = parseFloat(muscle.visualisatie.origo_y);
  return origoY > 50 ? 'regio_onder.png' : 'regio_boven.png';
};`;

const newGetRegionImage = `const getRegionImage = (muscle: Muscle | null, side: 'voor' | 'achter') => {
  if (!muscle || !muscle.visualisatie) return \`regio_boven_\${side}.png\`;
  const regio = muscle.nl.regio.toLowerCase();
  const isOnder = regio.includes('onderbeen') || regio.includes('voet') || regio.includes('enkel') || regio.includes('leg');
  return isOnder ? \`regio_onder_\${side}.png\` : \`regio_boven_\${side}.png\`;
};

const ViewToggle = ({ side, setSide, language }: { side: 'voor'|'achter', setSide: (s: 'voor'|'achter') => void, language: Language }) => (
  <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/10 w-full max-w-[300px] mx-auto mt-2 mb-4 z-20 relative">
    <button
      onClick={(e) => { e.stopPropagation(); setSide('voor'); }}
      className={\`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 \${
        side === 'voor' ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:text-slate-200'
      }\`}
    >
      👁️ {language === 'nl' ? 'Vooraanzicht' : 'Anterior'}
    </button>
    <button
      onClick={(e) => { e.stopPropagation(); setSide('achter'); }}
      className={\`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 \${
        side === 'achter' ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-400 hover:text-slate-200'
      }\`}
    >
      🔄 {language === 'nl' ? 'Achteraanzicht' : 'Posterior'}
    </button>
  </div>
);`;

content = content.replace(oldGetRegionImage, newGetRegionImage);

// 2. Add States
const stateAnchor = `  const [isMenuOpen, setIsMenuOpen] = useState(false);`;
const statesToAdd = `  const [viewSideBieb, setViewSideBieb] = useState<'voor' | 'achter'>('voor');
  const [viewSideOefenen, setViewSideOefenen] = useState<'voor' | 'achter'>('voor');
  const [viewSidePinPoint, setViewSidePinPoint] = useState<'voor' | 'achter'>('voor');

  useEffect(() => {
    if (selectedMuscle) {
      setViewSideBieb(selectedMuscle.visualisatie.basis_weergave.includes('achter') ? 'achter' : 'voor');
    }
  }, [selectedMuscle]);

  useEffect(() => {
    if (currentPracticeMuscle) {
      setViewSideOefenen(currentPracticeMuscle.visualisatie.basis_weergave.includes('achter') ? 'achter' : 'voor');
    }
  }, [currentPracticeMuscle]);

  useEffect(() => {
    if (pinPointMuscle) {
      setViewSidePinPoint(pinPointMuscle.visualisatie.basis_weergave.includes('achter') ? 'achter' : 'voor');
    }
  }, [pinPointMuscle]);`;

content = content.replace(stateAnchor, stateAnchor + '\\n\\n' + statesToAdd);

// 3. Update getRegionImage calls
content = content.replace(
  `src={getRegionImage(currentPracticeMuscle)}`,
  `src={getRegionImage(currentPracticeMuscle, viewSideOefenen)}`
);
content = content.replace(
  `src={getRegionImage(pinPointMuscle)}`,
  `src={getRegionImage(pinPointMuscle, viewSidePinPoint)}`
);
content = content.replace(
  `src={getRegionImage(selectedMuscle)}`,
  `src={getRegionImage(selectedMuscle, viewSideBieb)}`
);

// 4. Update SVG rendering condition for Oefenen
const oefenenSvgStart = `<svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>`;
const oefenenSvgReplacement = `{currentPracticeMuscle && (currentPracticeMuscle.visualisatie.basis_weergave.includes(viewSideOefenen)) && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>`;
content = content.replace(oefenenSvgStart, oefenenSvgReplacement);

const oefenenSvgEnd = `</circle>
                </svg>`;
const oefenenSvgEndReplacement = `</circle>
                </svg>
              )}`;
content = content.replace(oefenenSvgEnd, oefenenSvgEndReplacement);

// 5. Update SVG rendering condition for Pin-Point
const pinpointSvgStart = `<svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line `;
const pinpointSvgReplacement = `{(pinPointMuscle.visualisatie.basis_weergave.includes(viewSidePinPoint)) && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <line `;
content = content.replace(pinpointSvgStart, pinpointSvgReplacement);

const pinpointSvgEnd = `</svg>
                    {/* User Click Dot */}`;
const pinpointSvgEndReplacement = `</svg>
                    )}
                    {/* User Click Dot */}`;
content = content.replace(pinpointSvgEnd, pinpointSvgEndReplacement);

const pinpointDotStart = `{/* Target Dot (Hidden until clicked) */}
                    <circle`;
const pinpointDotReplacement = `{/* Target Dot (Hidden until clicked) */}
                    {(pinPointMuscle.visualisatie.basis_weergave.includes(viewSidePinPoint)) && (
                      <circle`;
content = content.replace(pinpointDotStart, pinpointDotReplacement);

const pinpointDotEnd = `fill="#10b981"
                      className="drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                    />
                  </>`;
const pinpointDotEndReplacement = `fill="#10b981"
                      className="drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                    />
                    )}
                  </>`;
content = content.replace(pinpointDotEnd, pinpointDotEndReplacement);

// 6. Update SVG rendering condition for Bieb
const biebSvgStart = `<svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="neonGradientModal" x1="0%" y1="0%" x2="100%" y2="100%">`;
const biebSvgReplacement = `{selectedMuscle && (selectedMuscle.visualisatie.basis_weergave.includes(viewSideBieb)) && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="neonGradientModal" x1="0%" y1="0%" x2="100%" y2="100%">`;
content = content.replace(biebSvgStart, biebSvgReplacement);

const biebSvgEnd = `</circle>
                  </svg>`;
const biebSvgEndReplacement = `</circle>
                  </svg>
                )}`;
content = content.replace(biebSvgEnd, biebSvgEndReplacement);


fs.writeFileSync('src/App.tsx', content);
