const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const oldZenuwenNav = `<button 
                  onClick={() => {
                    setActiveTab('zenuwen');
                    setIsMenuOpen(false);
                  }}
                  className={\`flex items-center gap-3 p-4 rounded-xl transition-colors \${
                    activeTab === 'zenuwen' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'hover:bg-white/5'
                  }\`}
                >
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">{t[language].nerves}</span>
                </button>`;

const newNav = `${oldZenuwenNav}
                <button 
                  onClick={() => {
                    setActiveTab('quiz');
                    setIsMenuOpen(false);
                  }}
                  className={\`flex items-center gap-3 p-4 rounded-xl transition-colors \${
                    activeTab === 'quiz' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'hover:bg-white/5'
                  }\`}
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-semibold">{t[language].quiz}</span>
                </button>`;

code = code.replace(oldZenuwenNav, newNav);
fs.writeFileSync('src/App.tsx', code);
