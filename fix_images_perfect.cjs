const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

function replaceContainer(content) {
  content = content.replace(
    /className="relative inline-block( mt-4)?" style=\{\{ width: "fit-content" \}\}/g,
    'className="relative inline-block$1" style={{ width: "fit-content", height: "fit-content" }}'
  );
  content = content.replace(
    /className="relative inline-block cursor-crosshair" style=\{\{ width: "fit-content" \}\}/g,
    'className="relative inline-block cursor-crosshair" style={{ width: "fit-content", height: "fit-content" }}'
  );
  content = content.replace(
    /className="block max-w-full pointer-events-none opacity-80 mix-blend-screen" style=\{\{ height: "auto", display: "block" \}\}/g,
    'className="block pointer-events-none opacity-80 mix-blend-screen" style={{ display: "block", maxWidth: "100%", maxHeight: "100%", height: "auto" }}'
  );
  return content;
}

code = replaceContainer(code);

fs.writeFileSync('src/App.tsx', code);
