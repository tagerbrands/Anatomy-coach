const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace nerveHistory type
content = content.replace(
  "const [nerveHistory, setNerveHistory] = useState<Array<{ nerve: string, mistakes: number, xp: number }>>([]);",
  "const [nerveHistory, setNerveHistory] = useState<Array<{ nerve: {nl: string, en: string}, mistakes: number, xp: number }>>([]);"
);

// In handleNerveClick
content = content.replace(
  "setNerveHistory(prev => [...prev, { nerve: targetNerve, mistakes: nerveMistakesThisRound, xp: xpEarned }]);",
  "setNerveHistory(prev => [...prev, { nerve: targetNerveObj!, mistakes: nerveMistakesThisRound, xp: xpEarned }]);"
);

// For bestNerve and worstNerve
content = content.replace(
  "const bestNerve = [...nerveHistory].sort((a, b) => a.mistakes - b.mistakes)[0];",
  "const bestNerve = nerveHistory.length > 0 ? [...nerveHistory].sort((a, b) => a.mistakes - b.mistakes)[0] : null;"
);
content = content.replace(
  "const worstNerve = [...nerveHistory].sort((a, b) => b.mistakes - a.mistakes)[0];",
  "const worstNerve = nerveHistory.length > 0 ? [...nerveHistory].sort((a, b) => b.mistakes - a.mistakes)[0] : null;"
);

content = content.replace(
  /{bestNerve\?\.nerve}/g,
  "{bestNerve?.nerve[language]}"
);
content = content.replace(
  /{worstNerve\?\.nerve}/g,
  "{worstNerve?.nerve[language]}"
);

fs.writeFileSync('src/App.tsx', content);
