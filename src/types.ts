export interface LocalizedMuscleData {
  regio: string;
  origo: string;
  insertie: string;
  innervatie: string;
  functie: string;
}

export interface Muscle {
  id: string;
  naam: string;
  nl: LocalizedMuscleData;
  en: LocalizedMuscleData;
  visualisatie: {
    basis_weergave: string;
    origo_x: string;
    origo_y: string;
    insertie_x: string;
    insertie_y: string;
  };
}
