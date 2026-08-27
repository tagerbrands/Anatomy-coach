const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add <> wrapper to Oefenen SVG
content = content.replace(
  '{currentPracticeMuscle && (currentPracticeMuscle.visualisatie.basis_weergave.includes(viewSideOefenen)) && (\\n                <svg className="absolute inset-0 w-full h-full pointer-events-none">',
  '{currentPracticeMuscle && (currentPracticeMuscle.visualisatie.basis_weergave.includes(viewSideOefenen)) && (<>\\n                <svg className="absolute inset-0 w-full h-full pointer-events-none">'
);
content = content.replace(
  '{currentPracticeMuscle && (currentPracticeMuscle.visualisatie.basis_weergave.includes(viewSideOefenen)) && (\\n              <svg className="absolute inset-0 w-full h-full pointer-events-none">',
  '{currentPracticeMuscle && (currentPracticeMuscle.visualisatie.basis_weergave.includes(viewSideOefenen)) && (<>\\n              <svg className="absolute inset-0 w-full h-full pointer-events-none">'
);

// Close it correctly at the end of Oefenen dots
content = content.replace(
  '                  </div>\\n                </div>\\n\\n                <div className="flex flex-col gap-4 shrink-0 pb-6">',
  '                  </div>\\n                </>)}</div>\\n\\n                <div className="flex flex-col gap-4 shrink-0 pb-6">'
);
content = content.replace(
  '                  </div>\\n                )}</div>\\n\\n                <div className="flex flex-col gap-4 shrink-0 pb-6">',
  '                  </div>\\n                </>)}</div>\\n\\n                <div className="flex flex-col gap-4 shrink-0 pb-6">'
);

// 2. Add <> wrapper to Bieb SVG
content = content.replace(
  '{selectedMuscle && (selectedMuscle.visualisatie.basis_weergave.includes(viewSideBieb)) && (\\n                  <svg className="absolute inset-0 w-full h-full pointer-events-none">',
  '{selectedMuscle && (selectedMuscle.visualisatie.basis_weergave.includes(viewSideBieb)) && (<>\\n                  <svg className="absolute inset-0 w-full h-full pointer-events-none">'
);
content = content.replace(
  '                  </div>\\n                </div>\\n\\n              </div>\\n\\n              <div className="space-y-6">',
  '                  </div>\\n                </>)}</div>\\n\\n              </div>\\n\\n              <div className="space-y-6">'
);
content = content.replace(
  '                  </div>\\n                )}</div>\\n\\n              </div>\\n\\n              <div className="space-y-6">',
  '                  </div>\\n                </>)}</div>\\n\\n              </div>\\n\\n              <div className="space-y-6">'
);


fs.writeFileSync('src/App.tsx', content);
