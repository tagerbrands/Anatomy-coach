const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace("ChevronRight,", "ChevronRight,\n  ChevronLeft,");

content = content.replace(
  /const MOVEMENTS = \[\s*'Flexie', 'Extensie', 'Abductie', 'Adductie', \s*'Endorotatie', 'Exorotatie', 'Plantairflexie', \s*'Dorsaalflexie', 'Inversie', 'Eversie'\s*\];/,
  "const MOVEMENTS = [\n" +
  "  'Flexie', 'Extensie', 'Anteflexie', 'Dorsoflexie', 'Abductie', 'Adductie',\n" +
  "  'Endorotatie', 'Exorotatie', 'Plantairflexie', 'Dorsaalflexie',\n" +
  "  'Inversie', 'Eversie'\n" +
  "];"
);

// update nl movements
content = content.replace(
  /'Flexie': 'Flexie', 'Extensie': 'Extensie', 'Abductie': 'Abductie', 'Adductie': 'Adductie', \s*'Endorotatie': 'Endorotatie', 'Exorotatie': 'Exorotatie', 'Plantairflexie': 'Plantairflexie', \s*'Dorsaalflexie': 'Dorsaalflexie', 'Inversie': 'Inversie', 'Eversie': 'Eversie'/,
  "'Flexie': 'Flexie', 'Extensie': 'Extensie', 'Anteflexie': 'Anteflexie', 'Dorsoflexie': 'Dorsoflexie', 'Abductie': 'Abductie', 'Adductie': 'Adductie',\n      " +
  "'Endorotatie': 'Endorotatie', 'Exorotatie': 'Exorotatie', 'Plantairflexie': 'Plantairflexie',\n      " +
  "'Dorsaalflexie': 'Dorsaalflexie', 'Inversie': 'Inversie', 'Eversie': 'Eversie'"
);

// update en movements
content = content.replace(
  /'Flexie': 'Flexion', 'Extensie': 'Extension', 'Abductie': 'Abduction', 'Adductie': 'Adduction', \s*'Endorotatie': 'Internal Rotation', 'Exorotatie': 'External Rotation', 'Plantairflexie': 'Plantar Flexion', \s*'Dorsaalflexie': 'Dorsiflexion', 'Inversie': 'Inversion', 'Eversie': 'Eversion'/,
  "'Flexie': 'Flexion', 'Extensie': 'Extension', 'Anteflexie': 'Anteflexion', 'Dorsoflexie': 'Dorsoflexion', 'Abductie': 'Abduction', 'Adductie': 'Adduction',\n      " +
  "'Endorotatie': 'Internal Rotation', 'Exorotatie': 'External Rotation', 'Plantairflexie': 'Plantar Flexion',\n      " +
  "'Dorsaalflexie': 'Dorsiflexion', 'Inversie': 'Inversion', 'Eversie': 'Eversion'"
);

fs.writeFileSync('src/App.tsx', content);
