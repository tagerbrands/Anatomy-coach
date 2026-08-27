const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace container styles
code = code.replace(
  /className="relative inline-block( mt-4)?" style=\{\{ width: "fit-content", height: "fit-content", maxHeight: "100%", maxWidth: "100%" \}\}/g,
  'className="relative inline-block$1" style={{ width: "fit-content" }}'
);
code = code.replace(
  /className="relative inline-block cursor-crosshair" style=\{\{ width: "fit-content", height: "fit-content", maxHeight: "100%", maxWidth: "100%" \}\}/g,
  'className="relative inline-block cursor-crosshair" style={{ width: "fit-content" }}'
);

// Replace image styles
code = code.replace(
  /className="block pointer-events-none opacity-80 mix-blend-screen" style=\{\{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" \}\}/g,
  'className="block max-w-full pointer-events-none opacity-80 mix-blend-screen" style={{ height: "auto", display: "block" }}'
);

// Wait, I should probably also remove the `h-full` from the parent of the relative inline-block if it's there. 
// Let's just apply their exact CSS first.

fs.writeFileSync('src/App.tsx', code);
