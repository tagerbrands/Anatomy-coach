const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The three tabs have their image container wrapped in a flex container.

// Tab 1: Oefenen
// Current:
// <div className="flex w-full h-full items-center justify-center pt-16 overflow-hidden">
//   <div className="relative inline-flex max-w-full max-h-full items-center justify-center">
//     <img 
//       src={getRegionImage(currentPracticeMuscle, viewSideOefenen)} 
//       alt="Skelet" 
//       className="block max-w-full max-h-full object-contain pointer-events-none opacity-80 mix-blend-screen"

code = code.replace(
  /className="relative inline-flex max-w-full max-h-full items-center justify-center"/g,
  'className="relative inline-block" style={{ width: "fit-content", height: "fit-content", maxHeight: "100%", maxWidth: "100%" }}'
);
code = code.replace(
  /className="relative inline-flex max-w-full max-h-full items-center justify-center mt-4"/g,
  'className="relative inline-block mt-4" style={{ width: "fit-content", height: "fit-content", maxHeight: "100%", maxWidth: "100%" }}'
);
code = code.replace(
  /className="relative inline-flex max-w-full max-h-full items-center justify-center cursor-crosshair"/g,
  'className="relative inline-block cursor-crosshair" style={{ width: "fit-content", height: "fit-content", maxHeight: "100%", maxWidth: "100%" }}'
);


// And for the image itself:
code = code.replace(
  /className="block max-w-full max-h-full object-contain pointer-events-none opacity-80 mix-blend-screen"/g,
  'className="block pointer-events-none opacity-80 mix-blend-screen" style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}'
);


fs.writeFileSync('src/App.tsx', code);
