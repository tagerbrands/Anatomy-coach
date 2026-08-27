const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Find where handleSharePinPoint begins and ends.
const startStr = "const handleSharePinPoint = async () => {";
const startIndex = content.indexOf(startStr);
if (startIndex === -1) {
    console.log("Could not find handleSharePinPoint");
    process.exit(1);
}

// Find the end of handleSharePinPoint (which is just before `useEffect(() => { \n    if (isPinPointFinished` which I added)
const endStr = "  useEffect(() => {\n    if (isPinPointFinished";
let endIndex = content.indexOf(endStr, startIndex);

if (endIndex === -1) {
    // maybe it's just before `// Zenuwen Logic` if I messed up
    endIndex = content.indexOf("// Zenuwen Logic", startIndex);
}

const toReplace = content.substring(startIndex, endIndex);

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

content = content.replace(toReplace, handleShareReplace);
fs.writeFileSync('src/App.tsx', content);
