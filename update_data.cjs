const fs = require('fs');
const content = fs.readFileSync('src/data.ts', 'utf8');

// The file exports MUSCLES. Let's extract the array.
const startIndex = content.indexOf('[');
const endIndex = content.lastIndexOf(']') + 1;
const arrayStr = content.substring(startIndex, endIndex);

let muscles;
eval('muscles = ' + arrayStr);

const translate = (text) => {
  if (!text) return "";
  // Basic translations just for structure
  const mapping = {
    "Achterzijde os ilium; facies dorsalis sacri en os coccygis; lig. sacrotuberale": "Posterior aspect of ilium; dorsal surface of sacrum and coccyx; sacrotuberous ligament",
    "Tuberositas glutea en tractus iliotibialis": "Gluteal tuberosity and iliotibial tract",
    "N. gluteus inferior": "Inferior gluteal nerve",
    "Extensie en exorotatie heup; stabilisatie bekken": "Extension and external rotation of the hip; pelvic stabilization",
    "GLUTEAAL (Bilregio)": "GLUTEAL (Buttock region)",
    "Facies glutea van os ilium tussen linea glutea anterior en posterior": "Gluteal surface of ilium between anterior and posterior gluteal lines",
    "Laterale zijde trochanter major (femur)": "Lateral aspect of greater trochanter (femur)",
    "N. gluteus superior": "Superior gluteal nerve",
    "Abductie heup; voorste vezels endorotatie; stabilisatie bekken": "Abduction of hip; anterior fibers internal rotation; pelvic stabilization",
    // Just a placeholder translate function that prepends [EN] if no translation is available
  };
  
  // Since we don't have all translations, I will just prepend "[EN] " to the dutch text for now, 
  // or do a basic keyword replace.
  // Actually, I can just use a simple regex replace for common anatomical terms.
  let enText = mapping[text] || text;
  if (!mapping[text]) {
      enText = enText.replace(/flexie/gi, 'flexion')
                     .replace(/extensie/gi, 'extension')
                     .replace(/abductie/gi, 'abduction')
                     .replace(/adductie/gi, 'adduction')
                     .replace(/endorotatie/gi, 'internal rotation')
                     .replace(/exorotatie/gi, 'external rotation')
                     .replace(/heup/gi, 'hip')
                     .replace(/knie/gi, 'knee')
                     .replace(/en /gi, 'and ')
                     .replace(/voet/gi, 'foot')
                     .replace(/bekken/gi, 'pelvis')
                     .replace(/stabilisatie/gi, 'stabilization')
                     .replace(/voorste vezels/gi, 'anterior fibers')
                     .replace(/N\./g, 'Nerve')
                     .replace(/achterzijde/gi, 'posterior surface')
                     .replace(/binnenzijde/gi, 'inner surface')
                     .replace(/bovenzijde/gi, 'superior surface');
  }
  return enText;
};

const translated = muscles.map(m => {
  return {
    id: m.id,
    naam: m.naam, // Name usually stays the same (latin)
    nl: {
      regio: m.regio,
      origo: m.origo,
      insertie: m.insertie,
      innervatie: m.innervatie,
      functie: m.functie,
    },
    en: {
      regio: translate(m.regio),
      origo: translate(m.origo),
      insertie: translate(m.insertie),
      innervatie: translate(m.innervatie),
      functie: translate(m.functie),
    },
    visualisatie: m.visualisatie
  };
});

const newContent = `import { Muscle } from './types';\n\nexport const MUSCLES: Muscle[] = ${JSON.stringify(translated, null, 2)};\n`;
fs.writeFileSync('src/data.ts', newContent);
console.log("data.ts updated");
