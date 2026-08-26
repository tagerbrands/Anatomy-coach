import { Muscle } from './types';

export const MUSCLES: Muscle[] = [
  {
    "id": "m_gluteus_maximus",
    "naam": "M. gluteus maximus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Achterzijde os ilium; facies dorsalis sacri en os coccygis; lig. sacrotuberale",
      "insertie": "Tuberositas glutea en tractus iliotibialis",
      "innervatie": "N. gluteus inferior",
      "functie": "Extensie en exorotatie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Posterior surface of ilium; dorsal surfaces of sacrum and coccyx; sacrotuberous ligament",
      "insertie": "Gluteal tuberosity and iliotibial tract",
      "innervatie": "Inferior gluteal nerve",
      "functie": "Hip extension and external rotation; pelvic stabilization"
    }
  },
  {
    "id": "m_gluteus_medius",
    "naam": "M. gluteus medius",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Facies glutea van os ilium tussen linea glutea anterior en posterior",
      "insertie": "Laterale zijde trochanter major (femur)",
      "innervatie": "N. gluteus superior",
      "functie": "Abductie heup; voorste vezels endorotatie; stabilisatie bekken"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Gluteal surface of ilium between anterior and posterior gluteal lines",
      "insertie": "Lateral surface of greater trochanter (femur)",
      "innervatie": "Superior gluteal nerve",
      "functie": "Hip abduction; anterior fibers medially rotate the hip; pelvic stabilization"
    }
  },
  {
    "id": "m_gluteus_minimus",
    "naam": "M. gluteus minimus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Facies glutea van os ilium tussen linea glutea anterior en inferior",
      "insertie": "Anterieure zijde trochanter major (femur)",
      "innervatie": "N. gluteus superior",
      "functie": "Abductie en endorotatie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Gluteal surface of ilium between anterior and inferior gluteal lines",
      "insertie": "Anterior surface of greater trochanter (femur)",
      "innervatie": "Superior gluteal nerve",
      "functie": "Hip abduction and internal rotation; pelvic stabilization"
    }
  },
  {
    "id": "m_piriformis",
    "naam": "M. piriformis",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Facies pelvica sacri",
      "insertie": "Bovenzijde trochanter major (femur)",
      "innervatie": "Plexus sacralis",
      "functie": "Exorotatie, abductie en extensie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Pelvic surface of sacrum",
      "insertie": "Superior aspect of greater trochanter (femur)",
      "innervatie": "Sacral plexus",
      "functie": "Hip external rotation, abduction and extension; pelvic stabilization"
    }
  },
  {
    "id": "m_obturatorius_internus",
    "naam": "M. obturatorius internus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Binnenzijde membraan obturatoria en omringende bot",
      "insertie": "Fossa trochanterica (femur)",
      "innervatie": "N. obturatorius internus",
      "functie": "Exorotatie, abductie en extensie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Internal surface of obturator membrane and surrounding bone",
      "insertie": "Trochanteric fossa (femur)",
      "innervatie": "Nerve to obturator internus",
      "functie": "Hip external rotation, abduction and extension; pelvic stabilization"
    }
  },
  {
    "id": "mm_gemelli",
    "naam": "Mm. gemelli",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "G. superior: spina ischiadica; G. inferior: tuber ischiadicum",
      "insertie": "Samen met pees m. obturatorius internus naar fossa trochanterica",
      "innervatie": "N. obturatorius internus en N. quadratus femoris",
      "functie": "Exorotatie, abductie en extensie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Superior gemellus: ischial spine; inferior gemellus: ischial tuberosity",
      "insertie": "Together with the tendon of obturator internus to the trochanteric fossa",
      "innervatie": "Nerve to obturator internus and nerve to quadratus femoris",
      "functie": "Hip external rotation, abduction and extension; pelvic stabilization"
    }
  },
  {
    "id": "m_quadratus_femoris",
    "naam": "M. quadratus femoris",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Laterale zijde tuber ischiadicum",
      "insertie": "Crista intertrochanterica (femur)",
      "innervatie": "N. quadratus femoris",
      "functie": "Exorotatie en adductie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Lateral aspect of ischial tuberosity",
      "insertie": "Intertrochanteric crest (femur)",
      "innervatie": "Nerve to quadratus femoris",
      "functie": "Hip external rotation and adduction; pelvic stabilization"
    }
  },
  {
    "id": "m_sartorius",
    "naam": "M. sartorius",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "Spina iliaca anterior superior",
      "insertie": "Facies medialis tibiae (pes anserinus)",
      "innervatie": "N. femoralis",
      "functie": "Flexie, abductie, exorotatie heup; flexie en endorotatie knie"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Anterior superior iliac spine",
      "insertie": "Medial surface of tibia (pes anserinus)",
      "innervatie": "Femoral nerve",
      "functie": "Hip flexion, abduction and external rotation; knee flexion and internal rotation"
    }
  },
  {
    "id": "m_quadriceps_femoris",
    "naam": "M. quadriceps femoris",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "R. femoris: SIAI; V. med/lat/inter: corpus femoris",
      "insertie": "Via patella en lig. patellae naar tuberositas tibiae",
      "innervatie": "N. femoralis",
      "functie": "Extensie knie; m. rectus femoris tevens flexie heup"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Rectus femoris: anterior inferior iliac spine; vastus medialis/lateralis/intermedius: femoral shaft",
      "insertie": "Via patella and patellar ligament to tibial tuberosity",
      "innervatie": "Femoral nerve",
      "functie": "Knee extension; rectus femoris also flexes the hip"
    }
  },
  {
    "id": "m_pectineus",
    "naam": "M. pectineus",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Pecten ossis pubis",
      "insertie": "Linea pectinea (femur)",
      "innervatie": "N. femoralis (en N. obturatorius)",
      "functie": "Adductie en flexie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Pecten pubis",
      "insertie": "Pectineal line (femur)",
      "innervatie": "Femoral nerve (and obturator nerve)",
      "functie": "Hip adduction and flexion; pelvic stabilization"
    }
  },
  {
    "id": "m_gracilis",
    "naam": "M. gracilis",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Ramus inferior ossis pubis",
      "insertie": "Facies medialis tibiae (pes anserinus)",
      "innervatie": "N. obturatorius",
      "functie": "Adductie en flexie heup; flexie en endorotatie knie"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Inferior ramus of pubis",
      "insertie": "Medial surface of tibia (pes anserinus)",
      "innervatie": "Obturator nerve",
      "functie": "Hip adduction and flexion; knee flexion and internal rotation"
    }
  },
  {
    "id": "m_adductor_longus",
    "naam": "M. adductor longus",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Corpus ossis pubis",
      "insertie": "Linea aspera (femur)",
      "innervatie": "N. obturatorius",
      "functie": "Adductie en flexie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Body of pubis",
      "insertie": "Linea aspera (femur)",
      "innervatie": "Obturator nerve",
      "functie": "Hip adduction and flexion; pelvic stabilization"
    }
  },
  {
    "id": "m_adductor_brevis",
    "naam": "M. adductor brevis",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Ramus inferior ossis pubis",
      "insertie": "Linea aspera (femur)",
      "innervatie": "N. obturatorius",
      "functie": "Adductie en flexie heup; stabilisatie bekken"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Inferior ramus of pubis",
      "insertie": "Linea aspera (femur)",
      "innervatie": "Obturator nerve",
      "functie": "Hip adduction and flexion; pelvic stabilization"
    }
  },
  {
    "id": "m_adductor_magnus",
    "naam": "M. adductor magnus",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Ramus inf. ossis pubis; ramus ossis ischii; tuber ischiadicum",
      "insertie": "Linea aspera en adductor tubercle (femur)",
      "innervatie": "N. obturatorius en N. ischiadicus (tibial part)",
      "functie": "Adductie, extensie (en flexie) heup; stabilisatie bekken"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Inferior ramus of pubis; ramus of ischium; ischial tuberosity",
      "insertie": "Linea aspera and adductor tubercle (femur)",
      "innervatie": "Obturator nerve and sciatic nerve (tibial division)",
      "functie": "Hip adduction and extension (and flexion); pelvic stabilization"
    }
  },
  {
    "id": "m_biceps_femoris",
    "naam": "M. biceps femoris",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Posterieur)",
      "origo": "Caput longum: tuber ischiadicum; Caput breve: linea aspera",
      "insertie": "Caput fibulae",
      "innervatie": "N. ischiadicus",
      "functie": "Flexie en exorotatie knie; caput longum tevens extensie heup"
    },
    "en": {
      "regio": "THIGH (Posterior)",
      "origo": "Long head: ischial tuberosity; short head: linea aspera",
      "insertie": "Head of fibula",
      "innervatie": "Sciatic nerve",
      "functie": "Knee flexion and external rotation; long head also extends the hip"
    }
  },
  {
    "id": "m_semitendinosus",
    "naam": "M. semitendinosus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Posterieur)",
      "origo": "Tuber ischiadicum",
      "insertie": "Facies medialis tibiae (pes anserinus)",
      "innervatie": "N. ischiadicus",
      "functie": "Flexie en endorotatie knie; extensie heup"
    },
    "en": {
      "regio": "THIGH (Posterior)",
      "origo": "Ischial tuberosity",
      "insertie": "Medial surface of tibia (pes anserinus)",
      "innervatie": "Sciatic nerve",
      "functie": "Knee flexion and internal rotation; hip extension"
    }
  },
  {
    "id": "m_semimembranosus",
    "naam": "M. semimembranosus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Posterieur)",
      "origo": "Tuber ischiadicum",
      "insertie": "Condylus medialis tibiae",
      "innervatie": "N. ischiadicus",
      "functie": "Flexie en endorotatie knie; extensie heup"
    },
    "en": {
      "regio": "THIGH (Posterior)",
      "origo": "Ischial tuberosity",
      "insertie": "Medial condyle of tibia",
      "innervatie": "Sciatic nerve",
      "functie": "Knee flexion and internal rotation; hip extension"
    }
  },
  {
    "id": "m_tensor_fasciae_latae",
    "naam": "M. tensor fasciae latae",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "BOVENBEEN (Lateraal)",
      "origo": "Spina iliaca anterior superior en crista iliaca",
      "insertie": "Tractus iliotibialis naar condylus lateralis tibiae",
      "innervatie": "N. gluteus superior",
      "functie": "Flexie, abductie, endorotatie heup; extensie en exorotatie knie"
    },
    "en": {
      "regio": "THIGH (Lateral)",
      "origo": "Anterior superior iliac spine and iliac crest",
      "insertie": "Iliotibial tract to lateral condyle of tibia",
      "innervatie": "Superior gluteal nerve",
      "functie": "Hip flexion, abduction and internal rotation; knee extension and external rotation"
    }
  },
  {
    "id": "m_tibialis_anterior",
    "naam": "M. tibialis anterior",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Anterieur)",
      "origo": "Facies lateralis tibiae en membraan interossea",
      "insertie": "Os cuneiforme mediale en os metatarsale I",
      "innervatie": "N. fibularis profundus",
      "functie": "Dorsaalflexie en inversie voet"
    },
    "en": {
      "regio": "LEG (Anterior)",
      "origo": "Lateral surface of tibia and interosseous membrane",
      "insertie": "Medial cuneiform and first metatarsal",
      "innervatie": "Deep fibular nerve",
      "functie": "Ankle dorsiflexion and foot inversion"
    }
  },
  {
    "id": "m_extensor_hallucis_longus",
    "naam": "M. extensor hallucis longus",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Anterieur)",
      "origo": "Facies medialis fibulae en membraan interossea",
      "insertie": "Phalanx distalis hallux (grote teen)",
      "innervatie": "N. fibularis profundus",
      "functie": "Extensie hallux; dorsaalflexie en inversie voet"
    },
    "en": {
      "regio": "LEG (Anterior)",
      "origo": "Medial surface of fibula and interosseous membrane",
      "insertie": "Distal phalanx of great toe",
      "innervatie": "Deep fibular nerve",
      "functie": "Great toe extension; ankle dorsiflexion and foot inversion"
    }
  },
  {
    "id": "m_extensor_digitorum_longus",
    "naam": "M. extensor digitorum longus",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Anterieur)",
      "origo": "Condylus lateralis tibiae, fibula en membraan interossea",
      "insertie": "Dorsale aponeurose van tenen II-V",
      "innervatie": "N. fibularis profundus",
      "functie": "Extensie tenen II-V; dorsaalflexie en eversie voet"
    },
    "en": {
      "regio": "LEG (Anterior)",
      "origo": "Lateral condyle of tibia, fibula and interosseous membrane",
      "insertie": "Dorsal aponeuroses of toes II–V",
      "innervatie": "Deep fibular nerve",
      "functie": "Extension of toes II–V; ankle dorsiflexion and foot eversion"
    }
  },
  {
    "id": "m_fibularis_tertius",
    "naam": "M. fibularis tertius",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Anterieur)",
      "origo": "Distale deel facies medialis fibulae",
      "insertie": "Os metatarsale V",
      "innervatie": "N. fibularis profundus",
      "functie": "Dorsaalflexie en eversie voet"
    },
    "en": {
      "regio": "LEG (Anterior)",
      "origo": "Distal part of medial surface of fibula",
      "insertie": "Fifth metatarsal",
      "innervatie": "Deep fibular nerve",
      "functie": "Ankle dorsiflexion and foot eversion"
    }
  },
  {
    "id": "m_fibularis_longus",
    "naam": "M. fibularis longus",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Lateraal)",
      "origo": "Caput fibulae en facies lateralis fibulae",
      "insertie": "Os cuneiforme mediale en os metatarsale I (plantair)",
      "innervatie": "N. fibularis superficialis",
      "functie": "Plantairflexie en eversie voet; ondersteunt voetboog"
    },
    "en": {
      "regio": "LEG (Lateral)",
      "origo": "Head and lateral surface of fibula",
      "insertie": "Medial cuneiform and first metatarsal (plantar surface)",
      "innervatie": "Superficial fibular nerve",
      "functie": "Ankle plantarflexion and foot eversion; supports the foot arch"
    }
  },
  {
    "id": "m_fibularis_brevis",
    "naam": "M. fibularis brevis",
    "visualisatie": {
      "basis_weergave": "skelet_voor.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Lateraal)",
      "origo": "Facies lateralis fibulae",
      "insertie": "Tuberositas ossis metatarsalis V",
      "innervatie": "N. fibularis superficialis",
      "functie": "Plantairflexie en eversie voet"
    },
    "en": {
      "regio": "LEG (Lateral)",
      "origo": "Lateral surface of fibula",
      "insertie": "Tuberosity of fifth metatarsal",
      "innervatie": "Superficial fibular nerve",
      "functie": "Ankle plantarflexion and foot eversion"
    }
  },
  {
    "id": "m_gastrocnemius",
    "naam": "M. gastrocnemius",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Posterieur) - Oppervlakkig",
      "origo": "Caput mediale: epicondylus medialis; Caput laterale: epicondylus lateralis",
      "insertie": "Via achillespees naar tuber calcanei",
      "innervatie": "N. tibialis",
      "functie": "Plantairflexie voet; flexie knie"
    },
    "en": {
      "regio": "LEG (Posterior) – Superficial",
      "origo": "Medial head: medial epicondyle; lateral head: lateral epicondyle",
      "insertie": "Via Achilles tendon to calcaneal tuberosity",
      "innervatie": "Tibial nerve",
      "functie": "Ankle plantarflexion; knee flexion"
    }
  },
  {
    "id": "m_soleus",
    "naam": "M. soleus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Posterieur) - Oppervlakkig",
      "origo": "Linea m. solei tibiae en caput fibulae",
      "insertie": "Via achillespees naar tuber calcanei",
      "innervatie": "N. tibialis",
      "functie": "Plantairflexie voet"
    },
    "en": {
      "regio": "LEG (Posterior) – Superficial",
      "origo": "Soleal line of tibia and head of fibula",
      "insertie": "Via Achilles tendon to calcaneal tuberosity",
      "innervatie": "Tibial nerve",
      "functie": "Ankle plantarflexion"
    }
  },
  {
    "id": "m_plantaris",
    "naam": "M. plantaris",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Posterieur) - Oppervlakkig",
      "origo": "Linea supracondylaris lateralis femoris",
      "insertie": "Samen met achillespees of mediaal daarvan naar tuber calcanei",
      "innervatie": "N. tibialis",
      "functie": "Plantairflexie voet; flexie knie (beperkt)"
    },
    "en": {
      "regio": "LEG (Posterior) – Superficial",
      "origo": "Lateral supracondylar line of femur",
      "insertie": "Together with the Achilles tendon or medial to it to the calcaneal tuberosity",
      "innervatie": "Tibial nerve",
      "functie": "Ankle plantarflexion; limited knee flexion"
    }
  },
  {
    "id": "m_popliteus",
    "naam": "M. popliteus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Posterieur) - Diep",
      "origo": "Condylus lateralis femoris",
      "insertie": "Facies posterior tibiae (boven linea m. solei)",
      "innervatie": "N. tibialis",
      "functie": "Flexie en endorotatie knie ('unlockt' de knie)"
    },
    "en": {
      "regio": "LEG (Posterior) – Deep",
      "origo": "Lateral condyle of femur",
      "insertie": "Posterior surface of tibia (above soleal line)",
      "innervatie": "Tibial nerve",
      "functie": "Knee flexion and internal rotation ('unlocks' the knee)"
    }
  },
  {
    "id": "m_tibialis_posterieur",
    "naam": "M. tibialis posterieur",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Posterieur) - Diep",
      "origo": "Membraan interossea en aangrenzende tibia en fibula",
      "insertie": "Tuberositas ossis navicularis, cuneiformia en metatarsalia II-IV",
      "innervatie": "N. tibialis",
      "functie": "Plantairflexie en inversie voet; ondersteunt voetboog"
    },
    "en": {
      "regio": "LEG (Posterior) – Deep",
      "origo": "Interosseous membrane and adjacent tibia and fibula",
      "insertie": "Navicular tuberosity, cuneiforms and metatarsals II–IV",
      "innervatie": "Tibial nerve",
      "functie": "Ankle plantarflexion and foot inversion; supports the foot arch"
    }
  },
  {
    "id": "m_flexor_hallucis_longus",
    "naam": "M. flexor hallucis longus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Posterieur) - Diep",
      "origo": "Facies posterior fibulae en membraan interossea",
      "insertie": "Phalanx distalis hallux (plantair)",
      "innervatie": "N. tibialis",
      "functie": "Flexie hallux; plantairflexie en inversie voet"
    },
    "en": {
      "regio": "LEG (Posterior) – Deep",
      "origo": "Posterior surface of fibula and interosseous membrane",
      "insertie": "Distal phalanx of great toe (plantar surface)",
      "innervatie": "Tibial nerve",
      "functie": "Great toe flexion; ankle plantarflexion and foot inversion"
    }
  },
  {
    "id": "m_flexor_digitorum_longus",
    "naam": "M. flexor digitorum longus",
    "visualisatie": {
      "basis_weergave": "skelet_achter.png",
      "origo_x": "50%",
      "origo_y": "30%",
      "insertie_x": "50%",
      "insertie_y": "60%"
    },
    "nl": {
      "regio": "ONDERBEEN (Posterieur) - Diep",
      "origo": "Facies posterior tibiae (mediaal)",
      "insertie": "Phalanges distales tenen II-V (plantair)",
      "innervatie": "N. tibialis",
      "functie": "Flexie tenen II-V; plantairflexie en inversie voet"
    },
    "en": {
      "regio": "LEG (Posterior) – Deep",
      "origo": "Posterior surface of tibia (medial)",
      "insertie": "Distal phalanges of toes II–V (plantar surface)",
      "innervatie": "Tibial nerve",
      "functie": "Flexion of toes II–V; ankle plantarflexion and foot inversion"
    }
  }
];
