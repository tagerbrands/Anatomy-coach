const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add lucide imports
content = content.replace(
  "Share2,",
  "Share2,\n  Share,\n  Download,"
);

// 2. Add translation texts
content = content.replace(
  "movements: {",
  "installApp: \"Installeer App\",\n    iosInstallTitle: \"Offline leren?\",\n    iosInstallBody: \"Tik op het Deel-icoon onderin je scherm en kies 'Zet op beginscherm'.\",\n    closeBtn: \"Sluit\",\n    movements: {"
);

content = content.replace(
  "movements: {\\n      'Flexie': 'Flexion'",
  "installApp: \"Install App\",\n    iosInstallTitle: \"Learn offline?\",\n    iosInstallBody: \"Tap the Share icon below and choose 'Add to Home Screen'.\",\n    closeBtn: \"Close\",\n    movements: {\n      'Flexie': 'Flexion'"
);

// Fallback to simpler replacement if the above fails
content = content.replace(
  "movements: {\n      'Flexie': 'Flexion'",
  "installApp: \"Install App\",\n    iosInstallTitle: \"Learn offline?\",\n    iosInstallBody: \"Tap the Share icon below and choose 'Add to Home Screen'.\",\n    closeBtn: \"Close\",\n    movements: {\n      'Flexie': 'Flexion'"
);

// 3. Add states for PWA right after isMenuOpen
const statesReplacement = `const [isMenuOpen, setIsMenuOpen] = useState(false);

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    const checkStandalone = () => {
      const isStandAloneMatch = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandAlone = (window.navigator as any).standalone === true;
      setIsStandalone(isStandAloneMatch || isIOSStandAlone);
    };
    checkStandalone();

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) || (userAgent.includes("mac") && "ontouchend" in document);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      setIsMenuOpen(false);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      if (/android/.test(window.navigator.userAgent.toLowerCase())) {
        // do nothing
      } else {
        setShowIOSModal(true);
        setIsMenuOpen(false);
      }
    }
  };`;
content = content.replace("const [isMenuOpen, setIsMenuOpen] = useState(false);", statesReplacement);

// 4. Add the button in the hamburger menu
const buttonHtml = `              <div className="flex flex-col gap-4">
                
                {!isStandalone && (
                  <button 
                    onClick={handleInstallClick}
                    className="flex items-center gap-3 w-full p-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold rounded-2xl transition-colors border border-cyan-500/20"
                  >
                    <Download className="w-6 h-6" />
                    <span>{t[language].installApp}</span>
                  </button>
                )}`;
content = content.replace('<div className="flex flex-col gap-4">', buttonHtml);

// 5. Add iOS Modal
const iosModalHtml = `      {/* iOS Install Modal */}
      <AnimatePresence>
        {showIOSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900/90 border border-white/10 p-6 rounded-3xl w-full max-w-sm shadow-2xl relative"
            >
              <button 
                onClick={() => setShowIOSModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4 border border-cyan-500/20">
                  <Share className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t[language].iosInstallTitle}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {t[language].iosInstallBody}
                </p>
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="w-full py-3 bg-cyan-500/20 text-cyan-300 font-bold rounded-xl border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
                >
                  {t[language].closeBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`;
// We match the last </div> tag and closing of App
content = content.replace(/    <\/div>\s*\);\s*}\s*$/, iosModalHtml);

fs.writeFileSync('src/App.tsx', content);
