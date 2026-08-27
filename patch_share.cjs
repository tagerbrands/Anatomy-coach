const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const stateAdd = `const [pinPointShareFile, setPinPointShareFile] = useState<File | null>(null);`;
content = content.replace("const [isPinPointFinished, setIsPinPointFinished] = useState(false);", "const [isPinPointFinished, setIsPinPointFinished] = useState(false);\n  " + stateAdd);

const useEffectAdd = `
  useEffect(() => {
    if (isPinPointFinished && pinPointFlexCardRef.current) {
      setTimeout(() => {
        html2canvas(pinPointFlexCardRef.current!, {
          backgroundColor: '#020617',
          scale: 2,
          logging: false,
          useCORS: true
        }).then(canvas => {
          canvas.toBlob(blob => {
            if (blob) {
              setPinPointShareFile(new File([blob], \`anatomy-vibe-pinpoint-\${pinPointXp}.png\`, { type: 'image/png' }));
            }
          }, 'image/png');
        }).catch(err => console.error(err));
      }, 500); // Give it a bit to render
    } else {
      setPinPointShareFile(null);
    }
  }, [isPinPointFinished, pinPointXp]);
`;
content = content.replace("// Zenuwen Logic", useEffectAdd + "\n  // Zenuwen Logic");

const handleShareReplace = `
  const handleSharePinPoint = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      const shareData: any = {
        title: 'MSK Coach Locatie Score',
        text: t[language].shareTextPinPoint.replace("{xp}", pinPointXp.toString()).replace("{rank}", getPinPointRank(pinPointXp)),
      };
      
      if (pinPointShareFile) {
        shareData.files = [pinPointShareFile];
      }

      if (navigator.canShare && (pinPointShareFile ? navigator.canShare({ files: shareData.files }) : navigator.canShare({ text: shareData.text }))) {
        await navigator.share(shareData);
      } else if (pinPointShareFile) {
        const url = URL.createObjectURL(pinPointShareFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = pinPointShareFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
    }
    setIsSharing(false);
  };
`;

const handleShareOld = content.match(/const handleSharePinPoint = async \(\) => \{[\s\S]*?^\s*\};\n/m);
if (handleShareOld) {
  content = content.replace(handleShareOld[0], handleShareReplace);
} else {
  console.log("Could not find handleSharePinPoint");
}

fs.writeFileSync('src/App.tsx', content);
