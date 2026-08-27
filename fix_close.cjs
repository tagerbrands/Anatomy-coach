const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Oefenen
content = content.replace(
  '{t[language].insertion}</div>\\n                </div>\\n              </div>\\n            </div>\\n            {/* Controls */}',
  '{t[language].insertion}</div>\\n                </div>\\n                </>)}              </div>\\n            </div>\\n            {/* Controls */}'
);

// Bieb Modal
content = content.replace(
  '{t[language].insertion}</div>\\n                  </div>\\n              </div>\\n\\n              <div className="space-y-6">',
  '{t[language].insertion}</div>\\n                  </div>\\n                  </>)}              </div>\\n\\n              <div className="space-y-6">'
);

fs.writeFileSync('src/App.tsx', content);
