const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Bieb Modal insertion
const biebStart = `<div className="relative inline-block h-[250px] sm:h-[300px] w-full flex items-center justify-center">
                  <img `;
const biebReplacement = `<div className="w-full flex flex-col items-center">
                    <ViewToggle side={viewSideBieb} setSide={setViewSideBieb} language={language} />
                  </div>
                  <div className="relative inline-block h-[250px] sm:h-[300px] w-full flex items-center justify-center">
                  <img `;
content = content.replace(biebStart, biebReplacement);

// Oefenen insertion
const oefenenStart = `<div className="relative inline-block h-full w-full flex items-center justify-center">
                <img 
                  src={getRegionImage(currentPracticeMuscle, viewSideOefenen)}`;
const oefenenReplacement = `<div className="w-full flex flex-col items-center absolute top-2 left-0 right-0 z-20 pointer-events-auto">
                  <ViewToggle side={viewSideOefenen} setSide={setViewSideOefenen} language={language} />
                </div>
                <div className="relative inline-block h-full w-full flex items-center justify-center pt-16">
                <img 
                  src={getRegionImage(currentPracticeMuscle, viewSideOefenen)}`;
content = content.replace(oefenenStart, oefenenReplacement);

// Pin-Point insertion
const pinpointStart = `<div 
                className="relative inline-block h-full w-full flex items-center justify-center cursor-crosshair"
                onClick={handlePinPointClick}
              >
                <img 
                  src={getRegionImage(pinPointMuscle, viewSidePinPoint)}`;
const pinpointReplacement = `<div className="w-full flex flex-col items-center absolute top-2 left-0 right-0 z-20 pointer-events-auto">
                  <ViewToggle side={viewSidePinPoint} setSide={setViewSidePinPoint} language={language} />
                </div>
              <div 
                className="relative inline-block h-full w-full flex items-center justify-center cursor-crosshair pt-16"
                onClick={handlePinPointClick}
              >
                <img 
                  src={getRegionImage(pinPointMuscle, viewSidePinPoint)}`;
content = content.replace(pinpointStart, pinpointReplacement);


fs.writeFileSync('src/App.tsx', content);
