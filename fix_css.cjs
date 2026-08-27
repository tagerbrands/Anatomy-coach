const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /className="relative inline-block h-full( mt-4)?"/g,
  'className="relative inline-flex max-w-full max-h-full items-center justify-center$1"'
);

code = code.replace(
  /className="relative inline-block h-full cursor-crosshair"/g,
  'className="relative inline-flex max-w-full max-h-full items-center justify-center cursor-crosshair"'
);

code = code.replace(
  /className="block h-full w-auto max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"/g,
  'className="block max-w-full max-h-full object-contain pointer-events-none opacity-80 mix-blend-screen"'
);

fs.writeFileSync('src/App.tsx', code);
