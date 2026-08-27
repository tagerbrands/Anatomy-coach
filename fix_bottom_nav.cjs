const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// I need to find the bottom nav items. It usually looks like <button onClick={() => setActiveTab('bieb')}
const bottomNavCode = `
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          <button 
            onClick={() => setActiveTab('bieb')}
            className={\`flex flex-col items-center justify-center w-full h-full space-y-1 \${
              activeTab === 'bieb' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
            }\`}
          >
            <Library className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t[language].library}</span>
          </button>
          <button 
            onClick={() => setActiveTab('oefenen')}
            className={\`flex flex-col items-center justify-center w-full h-full space-y-1 \${
              activeTab === 'oefenen' ? 'text-fuchsia-400' : 'text-slate-500 hover:text-slate-300'
            }\`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t[language].practice}</span>
          </button>
          <button 
            onClick={() => setActiveTab('pinpoint')}
            className={\`flex flex-col items-center justify-center w-full h-full space-y-1 \${
              activeTab === 'pinpoint' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
            }\`}
          >
            <Target className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t[language].pinpoint}</span>
          </button>
          <button 
            onClick={() => setActiveTab('zenuwen')}
            className={\`flex flex-col items-center justify-center w-full h-full space-y-1 \${
              activeTab === 'zenuwen' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'
            }\`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t[language].nerves}</span>
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={\`flex flex-col items-center justify-center w-full h-full space-y-1 \${
              activeTab === 'quiz' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
            }\`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium">{t[language].quiz}</span>
          </button>
        </div>
`;

// Replace the inner div of Bottom Navigation
const startNav = '<div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">';
const endNav = '</div>\n      </nav>';

code = code.substring(0, code.indexOf(startNav)) + bottomNavCode.trim() + '\n      </nav>' + code.substring(code.indexOf(endNav) + endNav.length);

fs.writeFileSync('src/App.tsx', code);
