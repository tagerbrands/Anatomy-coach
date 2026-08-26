const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const modalRegex = /\s*\{\/\* iOS Install Modal \*\/\}(.|\n)*?<\/AnimatePresence>/m;
const modalStr = content.match(modalRegex)[0];
content = content.replace(modalRegex, '');

content = content.replace(
  "      </AnimatePresence>\n    </div>\n  );\n}",
  "      </AnimatePresence>\n" + modalStr + "\n    </div>\n  );\n}"
);

fs.writeFileSync('src/App.tsx', content);
