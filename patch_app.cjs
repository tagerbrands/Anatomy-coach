const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. PIN-POINT SCOREBOARD
// Add Home button to the end screen
// Find: <RotateCcw className="w-5 h-5" />\n                  Oefen Opnieuw\n                </button>
// Add a Home button after it.
const homeBtnHtml = `
                <button 
                  onClick={() => {
                    setIsPinPointFinished(false);
                    setActiveTab('bieb');
                  }} 
                  className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Library className="w-5 h-5" />
                  Terug naar Startmenu
                </button>`;

content = content.replace(
  /(<RotateCcw className="w-5 h-5" \/>\s*Oefen Opnieuw\s*<\/button>)/,
  "$1" + homeBtnHtml
);

// We need to fix handleSharePinPoint to work reliably.
// We can use a simpler approach. If it fails, fallback to download.
// The user says "doet de Deel Resultaat knop momenteel niets." 
// We will generate the blob/file directly in a useEffect when isPinPointFinished is true,
// but wait, html2canvas needs the element to be visible. The hidden flexcard is rendered offscreen!
// It should work. Let's make sure the share button calls navigator.share properly and has a catch block that downloads.
// Wait, the existing code DOES have a catch block that downloads!
// Why does it do nothing?
// Ah! `navigator.canShare` might throw on some devices if `files` are checked but not supported, breaking the flow?
// No, canShare doesn't throw, it returns a boolean.
// But `navigator.share` MUST be triggered by a user gesture.
// Because `html2canvas` is async and takes > 100ms, iOS Safari loses the user gesture token, 
// and `navigator.share` is silently blocked or throws a NotAllowedError, 
// and THEN it goes to catch block, where it tries to `a.click()` which ALSO might be blocked by popup blocker because of lost user gesture!
// Solution:
// Share ONLY text if navigator.share works.
// Or pre-generate the canvas!
// Let's pre-generate the canvas when `isPinPointFinished` becomes true.

fs.writeFileSync('src/App.tsx', content);
