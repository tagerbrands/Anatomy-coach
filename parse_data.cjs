const fs = require('fs');

const newData = [
  {
    "spier": "m_iliopsoas",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "30.0%", "y": "6.0%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "36.6%", "y": "36.5%" }
    ]
  },
  {
    "spier": "m_rectus_femoris",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "32.0%", "y": "20.4%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "52.3%", "y": "90.6%" }
    ]
  },
  {
    "spier": "m_tensor_fasciae_latae",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "14.3%", "y": "11.1%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "33.3%", "y": "94.6%" }
    ]
  },
  {
    "spier": "m_sartorius",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "14.3%", "y": "11.5%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "65.4%", "y": "95.0%" }
    ]
  },
  {
    "spier": "m_pectineus",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "85.7%", "y": "27.0%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "69.7%", "y": "45.6%" }
    ]
  },
  {
    "spier": "m_adductor_longus",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "90.9%", "y": "31.2%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "72.2%", "y": "51.6%" }
    ]
  },
  {
    "spier": "m_adductor_brevis",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "86.3%", "y": "33.0%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "70.3%", "y": "50.0%" }
    ]
  },
  {
    "spier": "m_adductor_magnus",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "73.2%", "y": "35.4%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "72.2%", "y": "46.9%" }
    ]
  },
  {
    "spier": "m_gracilis",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "78.5%", "y": "35.4%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "68.0%", "y": "95.4%" }
    ]
  },
  {
    "spier": "m_gluteus_maximus",
    "data": [
      { "image": "regio_boven_achter.png", "type": "origo", "x": "18.4%", "y": "19.5%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "81.6%", "y": "34.8%" }
    ]
  },
  {
    "spier": "m_gluteus_medius",
    "data": [
      { "image": "regio_boven_achter.png", "type": "origo", "x": "54.7%", "y": "5.3%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "92.2%", "y": "29.0%" }
    ]
  },
  {
    "spier": "m_gluteus_minimus",
    "data": [
      { "image": "regio_boven_achter.png", "type": "origo", "x": "69.1%", "y": "11.5%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "98.5%", "y": "30.1%" }
    ]
  },
  {
    "spier": "m_piriformis",
    "data": [
      { "image": "regio_boven_achter.png", "type": "origo", "x": "42.2%", "y": "17.1%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "88.5%", "y": "26.8%" }
    ]
  },
  {
    "spier": "m_biceps_femoris",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "62.8%", "y": "35.7%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "28.1%", "y": "97.7%" }
    ]
  },
  {
    "spier": "m_semitendinosus",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "62.8%", "y": "35.9%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "68.0%", "y": "96.5%" }
    ]
  },
  {
    "spier": "m_semimembranosus",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "56.2%", "y": "34.6%" },
      { "image": "regio_boven_achter.png", "type": "origo", "x": "41.6%", "y": "36.5%" },
      { "image": "regio_boven_achter.png", "type": "insertie", "x": "37.8%", "y": "87.5%" }
    ]
  },
  {
    "spier": "m_quadriceps_femoris",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "33.3%", "y": "20.8%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "51.6%", "y": "90.3%" }
    ]
  },
  {
    "spier": "m_vastus_lateralis",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "11.1%", "y": "31.7%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "52.3%", "y": "90.1%" }
    ]
  },
  {
    "spier": "m_vastus_medialis",
    "data": [
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "51.6%", "y": "90.1%" },
      { "image": "regio_boven_voor.png", "type": "origo", "x": "32.7%", "y": "39.8%" },
      { "image": "regio_boven_achter.png", "type": "origo", "x": "63.4%", "y": "53.2%" }
    ]
  },
  {
    "spier": "m_vastus_intermedius",
    "data": [
      { "image": "regio_boven_voor.png", "type": "origo", "x": "20.9%", "y": "43.0%" },
      { "image": "regio_boven_voor.png", "type": "insertie", "x": "52.3%", "y": "89.9%" }
    ]
  },
  {
    "spier": "m_gastrocnemius",
    "data": [
      { "image": "regio_onder_achter.png", "type": "origo", "x": "38.5%", "y": "18.2%" },
      { "image": "regio_onder_achter.png", "type": "insertie", "x": "43.1%", "y": "92.6%" }
    ]
  },
  {
    "spier": "m_soleus",
    "data": [
      { "image": "regio_onder_achter.png", "type": "origo", "x": "62.4%", "y": "35.2%" },
      { "image": "regio_onder_achter.png", "type": "insertie", "x": "42.2%", "y": "92.5%" }
    ]
  },
  {
    "spier": "m_tibialis_anterior",
    "data": [
      { "image": "regio_onder_voor.png", "type": "origo", "x": "56.0%", "y": "46.0%" },
      { "image": "regio_onder_voor.png", "type": "insertie", "x": "83.4%", "y": "88.3%" }
    ]
  },
  {
    "spier": "m_peroneus_longus",
    "data": [
      { "image": "regio_onder_voor.png", "type": "origo", "x": "33.1%", "y": "42.7%" },
      { "image": "regio_onder_voor.png", "type": "insertie", "x": "87.1%", "y": "89.7%" }
    ]
  },
  {
    "spier": "m_extensor_digitorum_longus",
    "data": [
      { "image": "regio_onder_voor.png", "type": "origo", "x": "39.5%", "y": "43.0%" },
      { "image": "regio_onder_voor.png", "type": "insertie", "x": "48.6%", "y": "91.7%" }
    ]
  },
  {
    "spier": "m_flexor_digitorum_longus",
    "data": [
      { "image": "regio_onder_achter.png", "type": "origo", "x": "36.6%", "y": "52.9%" },
      { "image": "regio_onder_achter.png", "type": "insertie", "x": "63.4%", "y": "97.2%" }
    ]
  },
  {
    "spier": "m_tibialis_posterior",
    "data": [
      { "image": "regio_onder_achter.png", "type": "origo", "x": "53.2%", "y": "47.2%" },
      { "image": "regio_onder_achter.png", "type": "insertie", "x": "15.4%", "y": "92.1%" }
    ]
  }
];

let dataTs = fs.readFileSync('src/data.ts', 'utf8');

// The file exports MUSCLES array. We can just parse it if we hack a bit, or we can use string replacement.
// Wait, data.ts might be cleanly evaluable if we remove the TS types and imports.
let script = dataTs.replace(/import { Muscle } from '\.\/types';/g, '').replace(/export const MUSCLES: Muscle\[\] = /g, 'return ');
const getMuscles = new Function(script);
let muscles = getMuscles();

// Filter the muscles to only those that exist in the newData, or update all?
// The user says "Vervang de oude coördinaten en spierdata volledig door deze nieuwe master-dataset."
// Let's filter muscles to those in newData, OR update existing ones and remove ones that aren't in newData?
const updatedMuscles = newData.map(newItem => {
  const existingMuscle = muscles.find(m => m.id === newItem.spier);
  if (existingMuscle) {
    return {
      ...existingMuscle,
      visualisatie: newItem.data
    };
  } else {
    console.error("Missing muscle data for: " + newItem.spier);
    return null;
  }
}).filter(Boolean);

let newContent = `import { Muscle } from './types';\n\nexport const MUSCLES: Muscle[] = ${JSON.stringify(updatedMuscles, null, 2)};\n`;
fs.writeFileSync('src/data.ts', newContent);

