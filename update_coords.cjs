const fs = require('fs');

const coords = {
  "m_gluteus_maximus": { "origo_x": "45.5%", "origo_y": "19.9%", "insertie_x": "11.8%", "insertie_y": "34.8%" },
  "m_gluteus_medius": { "origo_x": "26.8%", "origo_y": "15.2%", "insertie_x": "5.7%", "insertie_y": "28.6%" },
  "m_gluteus_minimus": { "origo_x": "20.3%", "origo_y": "17.9%", "insertie_x": "2.4%", "insertie_y": "30.2%" },
  "m_piriformis": { "origo_x": "30.5%", "origo_y": "21.2%", "insertie_x": "7.7%", "insertie_y": "26.8%" },
  "m_obturatorius_internus": { "origo_x": "36.6%", "origo_y": "29.4%", "insertie_x": "8.1%", "insertie_y": "27.0%" },
  "mm_gemelli": { "origo_x": "31.7%", "origo_y": "28.1%", "insertie_x": "10.6%", "insertie_y": "27.5%" },
  "m_quadratus_femoris": { "origo_x": "50%", "origo_y": "30%", "insertie_x": "50%", "insertie_y": "60%" },
  "m_sartorius": { "origo_x": "10.7%", "origo_y": "18.8%", "insertie_x": "30.3%", "insertie_y": "57.4%" },
  "m_quadriceps_femoris": { "origo_x": "10.3%", "origo_y": "35.5%", "insertie_x": "20.5%", "insertie_y": "62.7%" },
  "m_pectineus": { "origo_x": "40.6%", "origo_y": "27.5%", "insertie_x": "18.6%", "insertie_y": "37.4%" },
  "m_gracilis": { "origo_x": "39.0%", "origo_y": "32.1%", "insertie_x": "31.1%", "insertie_y": "58.1%" },
  "m_adductor_longus": { "origo_x": "35.8%", "origo_y": "32.3%", "insertie_x": "19.7%", "insertie_y": "44.1%" },
  "m_adductor_brevis": { "origo_x": "39.8%", "origo_y": "31.8%", "insertie_x": "18.6%", "insertie_y": "40.6%" },
  "m_adductor_magnus": { "origo_x": "37.4%", "origo_y": "32.4%", "insertie_x": "17.8%", "insertie_y": "38.2%" },
  "m_biceps_femoris": { "origo_x": "35.4%", "origo_y": "33.2%", "insertie_x": "29.7%", "insertie_y": "64.6%" },
  "m_semitendinosus": { "origo_x": "35.0%", "origo_y": "32.9%", "insertie_x": "28.5%", "insertie_y": "66.1%" },
  "m_semimembranosus": { "origo_x": "33.3%", "origo_y": "33.2%", "insertie_x": "28.0%", "insertie_y": "65.8%" },
  "m_tensor_fasciae_latae": { "origo_x": "9.9%", "origo_y": "18.8%", "insertie_x": "11.1%", "insertie_y": "61.3%" },
  "m_tibialis_anterior": { "origo_x": "19.3%", "origo_y": "67.5%", "insertie_x": "24.8%", "insertie_y": "91.2%" },
  "m_extensor_hallucis_longus": { "origo_x": "17.4%", "origo_y": "82.6%", "insertie_x": "20.9%", "insertie_y": "98.5%" },
  "m_extensor_digitorum_longus": { "origo_x": "15.8%", "origo_y": "71.5%", "insertie_x": "17.8%", "insertie_y": "92.5%" },
  "m_fibularis_tertius": { "origo_x": "17.4%", "origo_y": "81.8%", "insertie_x": "12.3%", "insertie_y": "93.2%" },
  "m_fibularis_longus": { "origo_x": "11.5%", "origo_y": "67.4%", "insertie_x": "19.7%", "insertie_y": "91.7%" },
  "m_fibularis_brevis": { "origo_x": "14.2%", "origo_y": "79.4%", "insertie_x": "11.5%", "insertie_y": "93.4%" },
  "m_gastrocnemius": { "origo_x": "21.5%", "origo_y": "56.0%", "insertie_x": "24.0%", "insertie_y": "95.9%" },
  "m_soleus": { "origo_x": "19.1%", "origo_y": "62.3%", "insertie_x": "24.4%", "insertie_y": "95.8%" },
  "m_plantaris": { "origo_x": "14.2%", "origo_y": "55.9%", "insertie_x": "25.2%", "insertie_y": "95.9%" },
  "m_popliteus": { "origo_x": "19.1%", "origo_y": "58.2%", "insertie_x": "22.0%", "insertie_y": "64.8%" },
  "m_tibialis_posterieur": { "origo_x": "17.1%", "origo_y": "71.0%", "insertie_x": "29.7%", "insertie_y": "96.2%" },
  "m_flexor_hallucis_longus": { "origo_x": "15.9%", "origo_y": "81.6%", "insertie_x": "15.9%", "insertie_y": "98.0%" },
  "m_flexor_digitorum_longus": { "origo_x": "23.2%", "origo_y": "73.5%", "insertie_x": "11.0%", "insertie_y": "97.8%" }
};

const content = fs.readFileSync('src/data.ts', 'utf8');
const jsonStr = content.replace(/import { Muscle } from '.\/types';\n\nexport const MUSCLES: Muscle\[\] = /, '').replace(/;\n$/, '');
const data = JSON.parse(jsonStr);

data.forEach(muscle => {
  if (coords[muscle.id]) {
    muscle.visualisatie.origo_x = coords[muscle.id].origo_x;
    muscle.visualisatie.origo_y = coords[muscle.id].origo_y;
    muscle.visualisatie.insertie_x = coords[muscle.id].insertie_x;
    muscle.visualisatie.insertie_y = coords[muscle.id].insertie_y;
  }
});

const newContent = `import { Muscle } from './types';\n\nexport const MUSCLES: Muscle[] = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('src/data.ts', newContent);
