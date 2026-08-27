const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  /\{currentPracticeMuscle\s*&&\s*\(currentPracticeMuscle\.visualisatie\.basis_weergave\.includes\(viewSideOefenen\)\)\s*&&\s*\(\s*<svg/g,
  '{currentPracticeMuscle && (currentPracticeMuscle.visualisatie.basis_weergave.includes(viewSideOefenen)) && (<>\\n                <svg'
);
content = content.replace(
  /\{selectedMuscle\s*&&\s*\(selectedMuscle\.visualisatie\.basis_weergave\.includes\(viewSideBieb\)\)\s*&&\s*\(\s*<svg/g,
  '{selectedMuscle && (selectedMuscle.visualisatie.basis_weergave.includes(viewSideBieb)) && (<>\\n                <svg'
);

content = content.replace(
  /\{\/\* Insertie Dot \*\/\}\s*<div\s*className="absolute[^>]*>\s*<div[^>]*>\{t\[language\]\.insertion\}<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div className="flex flex-col gap-4 shrink-0 pb-6">/g,
  '{/* Insertie Dot */}\\n                <div \\n                  className="absolute w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.8)] -translate-x-1/2 -translate-y-1/2 z-10"\\n                  style={{ left: currentPracticeMuscle.visualisatie.insertie_x, top: currentPracticeMuscle.visualisatie.insertie_y }}\\n                >\\n                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-300 uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border border-cyan-500/30">{t[language].insertion}</div>\\n                </div>\\n                </>)}</div>\\n\\n                <div className="flex flex-col gap-4 shrink-0 pb-6">'
);

content = content.replace(
  /\{\/\* Insertie Dot \*\/\}\s*<div\s*className="absolute[^>]*>\s*<div[^>]*>\{t\[language\]\.insertion\}<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div className="space-y-6">/g,
  '{/* Insertie Dot */}\\n                <div \\n                  className="absolute w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.8)] -translate-x-1/2 -translate-y-1/2 z-10"\\n                  style={{ left: selectedMuscle.visualisatie.insertie_x, top: selectedMuscle.visualisatie.insertie_y }}\\n                >\\n                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-300 uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full border border-cyan-500/30">{t[language].insertion}</div>\\n                </div>\\n                </>)}</div>\\n\\n              </div>\\n\\n              <div className="space-y-6">'
);

fs.writeFileSync('src/App.tsx', content);
