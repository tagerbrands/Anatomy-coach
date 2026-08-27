const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const mainOld = `<main className="flex-1 overflow-y-auto p-4 pb-24 z-10 scrollbar-hide">`;
const mainNew = `<main className="flex-1 overflow-y-auto p-3 sm:p-4 pb-20 z-10 scrollbar-hide flex flex-col">`;
content = content.replace(mainOld, mainNew);

const oefenenContainerOld = `<motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full max-w-2xl mx-auto"
          >`;
const oefenenContainerNew = `<motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col flex-1 min-h-0 w-full max-w-2xl mx-auto"
          >`;
content = content.replace(oefenenContainerOld, oefenenContainerNew);

const zenuwenContainerOld = `<motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full max-w-2xl mx-auto"
          >`;
const zenuwenContainerNew = `<motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col flex-1 min-h-0 w-full max-w-2xl mx-auto"
          >`;
// Since they are identical strings, I can just replace them both
content = content.replaceAll(`<motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-full max-w-2xl mx-auto"
          >`, oefenenContainerNew);

fs.writeFileSync('src/App.tsx', content);
