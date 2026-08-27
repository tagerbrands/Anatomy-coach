const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix Bieb layout
content = content.replace(
  '<div className="w-full flex flex-col items-center">\\n                    <ViewToggle side={viewSideBieb} setSide={setViewSideBieb} language={language} />\\n                  </div>\\n                  <div className="relative inline-block h-[250px] sm:h-[300px] w-full flex items-center justify-center">\\n                  <img ',
  '<div className="w-full flex flex-col items-center mb-4">\\n                    <ViewToggle side={viewSideBieb} setSide={setViewSideBieb} language={language} />\\n                  </div>\\n                  <div className="relative inline-block h-[250px] sm:h-[300px]">\\n                  <img '
);

content = content.replace(
  'src={getRegionImage(selectedMuscle, viewSideBieb)} \\n                    alt="Skelet" \\n                    className="max-h-full max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"',
  'src={getRegionImage(selectedMuscle, viewSideBieb)} \\n                    alt="Skelet" \\n                    className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"'
);

// Fix Oefenen layout
content = content.replace(
  '<div className="w-full flex flex-col items-center absolute top-2 left-0 right-0 z-20 pointer-events-auto">\\n                  <ViewToggle side={viewSideOefenen} setSide={setViewSideOefenen} language={language} />\\n                </div>\\n                <div className="relative inline-block h-full w-full flex items-center justify-center pt-16">\\n                <img ',
  '<div className="w-full flex flex-col items-center shrink-0">\\n                  <ViewToggle side={viewSideOefenen} setSide={setViewSideOefenen} language={language} />\\n                </div>\\n                <div className="relative inline-block flex-1 min-h-[300px] flex items-center justify-center">\\n                  <div className="relative inline-block h-full">\\n                <img '
);

content = content.replace(
  'src={getRegionImage(currentPracticeMuscle, viewSideOefenen)} \\n                  alt="Skelet" \\n                  className="max-h-full max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"\\n                  onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}',
  'src={getRegionImage(currentPracticeMuscle, viewSideOefenen)} \\n                  alt="Skelet" \\n                  className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"\\n                  onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}'
);
content = content.replace(
  '                <div className="flex flex-col gap-4 shrink-0 pb-6">',
  '                  </div>\\n                </div>\\n\\n                <div className="flex flex-col gap-4 shrink-0 pb-6">'
);

// Fix Pin-Point layout
content = content.replace(
  '<div className="w-full flex flex-col items-center absolute top-2 left-0 right-0 z-20 pointer-events-auto">\\n                  <ViewToggle side={viewSidePinPoint} setSide={setViewSidePinPoint} language={language} />\\n                </div>\\n              <div \\n                className="relative inline-block h-full w-full flex items-center justify-center cursor-crosshair pt-16"\\n                onClick={handlePinPointClick}\\n              >\\n                <img ',
  '<div className="w-full flex flex-col items-center shrink-0">\\n                  <ViewToggle side={viewSidePinPoint} setSide={setViewSidePinPoint} language={language} />\\n                </div>\\n              <div className="relative flex-1 min-h-[300px] flex items-center justify-center">\\n                <div \\n                  className="relative inline-block h-full cursor-crosshair"\\n                  onClick={handlePinPointClick}\\n                >\\n                <img '
);

content = content.replace(
  'src={getRegionImage(pinPointMuscle, viewSidePinPoint)} \\n                  alt="Skelet" \\n                  className="max-h-full max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"\\n                  onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}',
  'src={getRegionImage(pinPointMuscle, viewSidePinPoint)} \\n                  alt="Skelet" \\n                  className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"\\n                  onError={(e) => { e.currentTarget.src = "https://placehold.co/400x800/1e293b/334155?text=Skelet"; }}'
);

content = content.replace(
  '                    {/* User Click Dot */}\\n                  </>',
  '                    {/* User Click Dot */}\\n                  </>\\n                </div>'
);


fs.writeFileSync('src/App.tsx', content);
