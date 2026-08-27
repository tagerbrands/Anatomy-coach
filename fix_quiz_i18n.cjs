const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add to translations
code = code.replace(
  /quiz: "Quiz",/g,
  'quiz: "Quiz",\n    nextQuestion: "Volgende Vraag",'
);

code = code.replace(
  /quiz: "Quiz",\n    nextQuestion: "Volgende Vraag",/,
  'quiz: "Quiz",\n    nextQuestion: "Volgende Vraag",' // nl
);

// fix English
code = code.replace(
  /installApp: "Install App",/g,
  'nextQuestion: "Next Question",\n    installApp: "Install App",'
);


code = code.replace(
  /Volgende Vraag <ChevronRight/g,
  '{t[language].nextQuestion} <ChevronRight'
);

fs.writeFileSync('src/App.tsx', code);
