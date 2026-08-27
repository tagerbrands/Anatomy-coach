export interface LocalizedMuscleData {
  regio: string;
  origo: string;
  insertie: string;
  innervatie: string;
  functie: string;
}

export interface VisualisatiePoint {
  image: string;
  type: 'origo' | 'insertie';
  x: string;
  y: string;
}

export interface Muscle {
  id: string;
  naam: string;
  nl: LocalizedMuscleData;
  en: LocalizedMuscleData;
  visualisatie: VisualisatiePoint[];
}
