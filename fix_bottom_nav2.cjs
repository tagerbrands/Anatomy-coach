const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The bottom nav code needs to have BicepsFlexed and other original icons. Let me just undo the last change by looking at what was there.
// Actually I don't have the full previous content easily, but I can fix it manually.
code = code.replace(/<Activity className="w-5 h-5" \/>/g, '<Activity className="w-6 h-6" />');
code = code.replace(/<Library className="w-5 h-5" \/>/g, '<Library className="w-6 h-6" />');
code = code.replace(/<Target className="w-5 h-5" \/>/g, '<Target className="w-6 h-6" />');
code = code.replace(/<Zap className="w-5 h-5" \/>/g, '<Zap className="w-6 h-6" />');
code = code.replace(/<HelpCircle className="w-5 h-5" \/>/g, '<HelpCircle className="w-6 h-6" />');

// also change the font size back to sm:text-xs
code = code.replace(/<span className="text-\[10px\] font-medium">/g, '<span className="text-[10px] sm:text-xs font-medium">');

fs.writeFileSync('src/App.tsx', code);
