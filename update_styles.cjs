const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Bieb detail modal
// <div className="relative inline-block h-[200px] sm:h-[250px]">
content = content.replace(
  '<div className="relative inline-block h-[200px] sm:h-[250px]">',
  '<div className="relative inline-block h-[250px] sm:h-[300px] w-full flex items-center justify-center">'
);
content = content.replace(
  'src={getRegionImage(selectedMuscle)} \n                    alt="Skelet" \n                    className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"',
  'src={getRegionImage(selectedMuscle)} \n                    alt="Skelet" \n                    className="max-h-full max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"'
);

// Pin-Point
// <div className="relative flex-1 min-h-[400px] mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center py-4">
content = content.replace(
  '<div className="relative flex-1 min-h-[400px] mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center py-4">',
  '<div className="relative flex-1 min-h-0 mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center p-2 sm:p-4">'
);
content = content.replace(
  '<div \n                className="relative inline-block h-[400px] max-w-full cursor-crosshair"',
  '<div \n                className="relative inline-block h-full w-full flex items-center justify-center cursor-crosshair"'
);
content = content.replace(
  'src={getRegionImage(pinPointMuscle)} \n                  alt="Skelet" \n                  className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"',
  'src={getRegionImage(pinPointMuscle)} \n                  alt="Skelet" \n                  className="max-h-full max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"'
);


fs.writeFileSync('src/App.tsx', content);
