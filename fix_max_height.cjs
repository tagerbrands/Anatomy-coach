const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /className="relative inline-block( mt-4)?" style=\{\{ width: "fit-content", height: "fit-content" \}\}/g,
  'className="relative inline-block$1" style={{ width: "fit-content", height: "fit-content", maxHeight: "100%" }}'
);
code = code.replace(
  /className="relative inline-block cursor-crosshair" style=\{\{ width: "fit-content", height: "fit-content" \}\}/g,
  'className="relative inline-block cursor-crosshair" style={{ width: "fit-content", height: "fit-content", maxHeight: "100%" }}'
);

fs.writeFileSync('src/App.tsx', code);
