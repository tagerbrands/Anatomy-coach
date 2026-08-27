import { Muscle } from './types';

export const MUSCLES: Muscle[] = [
  {
    "id": "m_iliopsoas",
    "naam": "M. iliopsoas",
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "Fossa iliaca (iliacus) en wervellichamen T12-L5 (psoas)",
      "insertie": "Trochanter minor femoris",
      "innervatie": "N. femoralis en rami anteriores L1-L3",
      "functie": "Anteflexie en exorotatie heup"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Iliac fossa (iliacus) and vertebral bodies T12-L5 (psoas)",
      "insertie": "Lesser trochanter of femur",
      "innervatie": "Femoral nerve and anterior rami L1-L3",
      "functie": "Hip anteflexion and external rotation"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "30.0%",
        "y": "6.0%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "36.6%",
        "y": "36.5%"
      }
    ]
  },
  {
    "id": "m_rectus_femoris",
    "naam": "M. rectus femoris",
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "Spina iliaca anterior inferior (SIAI)",
      "insertie": "Tuberositas tibiae (via lig. patellae)",
      "innervatie": "N. femoralis",
      "functie": "Anteflexie heup, Knie-extensie"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Anterior inferior iliac spine (AIIS)",
      "insertie": "Tibial tuberosity (via patellar ligament)",
      "innervatie": "Femoral nerve",
      "functie": "Hip anteflexion, Knee extension"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "32.0%",
        "y": "20.4%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "52.3%",
        "y": "90.6%"
      }
    ]
  },
  {
    "id": "m_tensor_fasciae_latae",
    "naam": "M. tensor fasciae latae",
    "nl": {
      "regio": "BOVENBEEN (Lateraal)",
      "origo": "Spina iliaca anterior superior (SIAS)",
      "insertie": "Tractus iliotibialis",
      "innervatie": "N. gluteus superior",
      "functie": "Anteflexie heup, Abductie heup, Endorotatie heup"
    },
    "en": {
      "regio": "THIGH (Lateral)",
      "origo": "Anterior superior iliac spine (ASIS)",
      "insertie": "Iliotibial tract",
      "innervatie": "Superior gluteal nerve",
      "functie": "Hip anteflexion, Hip abduction, Hip internal rotation"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "14.3%",
        "y": "11.1%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "33.3%",
        "y": "94.6%"
      }
    ]
  },
  {
    "id": "m_sartorius",
    "naam": "M. sartorius",
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "Spina iliaca anterior superior (SIAS)",
      "insertie": "Facies medialis tibiae (pes anserinus)",
      "innervatie": "N. femoralis",
      "functie": "Anteflexie heup, Abductie heup, Exorotatie heup, Knieflexie, Endorotatie knie"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Anterior superior iliac spine (ASIS)",
      "insertie": "Medial surface of tibia (pes anserinus)",
      "innervatie": "Femoral nerve",
      "functie": "Hip anteflexion, Hip abduction, Hip external rotation, Knee flexion, Knee internal rotation"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "14.3%",
        "y": "11.5%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "65.4%",
        "y": "95.0%"
      }
    ]
  },
  {
    "id": "m_pectineus",
    "naam": "M. pectineus",
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Pecten ossis pubis",
      "insertie": "Linea pectinea femoris",
      "innervatie": "N. femoralis, N. obturatorius",
      "functie": "Anteflexie heup, Adductie heup"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Pectineal line of pubis",
      "insertie": "Pectineal line of femur",
      "innervatie": "Femoral nerve, Obturator nerve",
      "functie": "Hip anteflexion, Hip adduction"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "85.7%",
        "y": "27.0%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "69.7%",
        "y": "45.6%"
      }
    ]
  },
  {
    "id": "m_adductor_longus",
    "naam": "M. adductor longus",
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Corpus ossis pubis",
      "insertie": "Linea aspera (labium mediale)",
      "innervatie": "N. obturatorius",
      "functie": "Adductie heup, Anteflexie heup"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Body of pubis",
      "insertie": "Linea aspera (medial lip)",
      "innervatie": "Obturator nerve",
      "functie": "Hip adduction, Hip anteflexion"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "90.9%",
        "y": "31.2%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "72.2%",
        "y": "51.6%"
      }
    ]
  },
  {
    "id": "m_adductor_brevis",
    "naam": "M. adductor brevis",
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Ramus inferior ossis pubis",
      "insertie": "Linea aspera (labium mediale)",
      "innervatie": "N. obturatorius",
      "functie": "Adductie heup, Anteflexie heup"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Inferior ramus of pubis",
      "insertie": "Linea aspera (medial lip)",
      "innervatie": "Obturator nerve",
      "functie": "Hip adduction, Hip anteflexion"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "86.3%",
        "y": "33.0%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "70.3%",
        "y": "50.0%"
      }
    ]
  },
  {
    "id": "m_adductor_magnus",
    "naam": "M. adductor magnus",
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Ramus inferior pubis, ramus ischiadicus, tuber ischiadicum",
      "insertie": "Linea aspera, tuberculum adductorium",
      "innervatie": "N. obturatorius, N. ischiadicus",
      "functie": "Adductie heup, Dorsoflexie heup (ischiadische deel)"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Inferior ramus of pubis, ischial ramus, ischial tuberosity",
      "insertie": "Linea aspera, adductor tubercle",
      "innervatie": "Obturator nerve, Sciatic nerve",
      "functie": "Hip adduction, Hip dorsoflexion (ischial part)"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "73.2%",
        "y": "35.4%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "72.2%",
        "y": "46.9%"
      }
    ]
  },
  {
    "id": "m_gracilis",
    "naam": "M. gracilis",
    "nl": {
      "regio": "BOVENBEEN (Mediaal)",
      "origo": "Ramus inferior ossis pubis",
      "insertie": "Facies medialis tibiae (pes anserinus)",
      "innervatie": "N. obturatorius",
      "functie": "Adductie heup, Knieflexie, Endorotatie knie"
    },
    "en": {
      "regio": "THIGH (Medial)",
      "origo": "Inferior ramus of pubis",
      "insertie": "Medial surface of tibia (pes anserinus)",
      "innervatie": "Obturator nerve",
      "functie": "Hip adduction, Knee flexion, Knee internal rotation"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "78.5%",
        "y": "35.4%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "68.0%",
        "y": "95.4%"
      }
    ]
  },
  {
    "id": "m_gluteus_maximus",
    "naam": "M. gluteus maximus",
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Os ilium, sacrum, coccyx, lig. sacrotuberale",
      "insertie": "Tractus iliotibialis, tuberositas glutea",
      "innervatie": "N. gluteus inferior",
      "functie": "Dorsoflexie heup, Exorotatie heup"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Ilium, sacrum, coccyx, sacrotuberous ligament",
      "insertie": "Iliotibial tract, gluteal tuberosity",
      "innervatie": "Inferior gluteal nerve",
      "functie": "Hip dorsoflexion, Hip external rotation"
    },
    "visualisatie": [
      {
        "image": "regio_boven_achter.png",
        "type": "origo",
        "x": "18.4%",
        "y": "19.5%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "81.6%",
        "y": "34.8%"
      }
    ]
  },
  {
    "id": "m_gluteus_medius",
    "naam": "M. gluteus medius",
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Facies glutea ossis ilii",
      "insertie": "Trochanter major",
      "innervatie": "N. gluteus superior",
      "functie": "Abductie heup, Endorotatie heup (ventrale vezels), Exorotatie heup (dorsale vezels)"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Gluteal surface of ilium",
      "insertie": "Greater trochanter",
      "innervatie": "Superior gluteal nerve",
      "functie": "Hip abduction, Hip internal rotation (anterior fibers), Hip external rotation (posterior fibers)"
    },
    "visualisatie": [
      {
        "image": "regio_boven_achter.png",
        "type": "origo",
        "x": "54.7%",
        "y": "5.3%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "92.2%",
        "y": "29.0%"
      }
    ]
  },
  {
    "id": "m_gluteus_minimus",
    "naam": "M. gluteus minimus",
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Facies glutea ossis ilii",
      "insertie": "Trochanter major",
      "innervatie": "N. gluteus superior",
      "functie": "Abductie heup, Endorotatie heup"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Gluteal surface of ilium",
      "insertie": "Greater trochanter",
      "innervatie": "Superior gluteal nerve",
      "functie": "Hip abduction, Hip internal rotation"
    },
    "visualisatie": [
      {
        "image": "regio_boven_achter.png",
        "type": "origo",
        "x": "69.1%",
        "y": "11.5%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "98.5%",
        "y": "30.1%"
      }
    ]
  },
  {
    "id": "m_piriformis",
    "naam": "M. piriformis",
    "nl": {
      "regio": "GLUTEAAL (Bilregio)",
      "origo": "Facies pelvica ossis sacri",
      "insertie": "Trochanter major",
      "innervatie": "Rami anteriores S1-S2",
      "functie": "Exorotatie heup, Abductie heup"
    },
    "en": {
      "regio": "GLUTEAL (Gluteal region)",
      "origo": "Pelvic surface of sacrum",
      "insertie": "Greater trochanter",
      "innervatie": "Anterior rami S1-S2",
      "functie": "Hip external rotation, Hip abduction"
    },
    "visualisatie": [
      {
        "image": "regio_boven_achter.png",
        "type": "origo",
        "x": "42.2%",
        "y": "17.1%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "88.5%",
        "y": "26.8%"
      }
    ]
  },
  {
    "id": "m_biceps_femoris",
    "naam": "M. biceps femoris",
    "nl": {
      "regio": "BOVENBEEN (Posterieur)",
      "origo": "Tuber ischiadicum (caput longum), Linea aspera (caput breve)",
      "insertie": "Caput fibulae",
      "innervatie": "N. ischiadicus",
      "functie": "Knieflexie, Exorotatie knie, Dorsoflexie heup"
    },
    "en": {
      "regio": "THIGH (Posterior)",
      "origo": "Ischial tuberosity (long head), Linea aspera (short head)",
      "insertie": "Head of fibula",
      "innervatie": "Sciatic nerve",
      "functie": "Knee flexion, Knee external rotation, Hip dorsoflexion"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "62.8%",
        "y": "35.7%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "28.1%",
        "y": "97.7%"
      }
    ]
  },
  {
    "id": "m_semitendinosus",
    "naam": "M. semitendinosus",
    "nl": {
      "regio": "BOVENBEEN (Posterieur)",
      "origo": "Tuber ischiadicum",
      "insertie": "Facies medialis tibiae (pes anserinus)",
      "innervatie": "N. ischiadicus",
      "functie": "Knieflexie, Endorotatie knie, Dorsoflexie heup"
    },
    "en": {
      "regio": "THIGH (Posterior)",
      "origo": "Ischial tuberosity",
      "insertie": "Medial surface of tibia (pes anserinus)",
      "innervatie": "Sciatic nerve",
      "functie": "Knee flexion, Knee internal rotation, Hip dorsoflexion"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "62.8%",
        "y": "35.9%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "68.0%",
        "y": "96.5%"
      }
    ]
  },
  {
    "id": "m_semimembranosus",
    "naam": "M. semimembranosus",
    "nl": {
      "regio": "BOVENBEEN (Posterieur)",
      "origo": "Tuber ischiadicum",
      "insertie": "Condylus medialis tibiae",
      "innervatie": "N. ischiadicus",
      "functie": "Knieflexie, Endorotatie knie, Dorsoflexie heup"
    },
    "en": {
      "regio": "THIGH (Posterior)",
      "origo": "Ischial tuberosity",
      "insertie": "Medial condyle of tibia",
      "innervatie": "Sciatic nerve",
      "functie": "Knee flexion, Knee internal rotation, Hip dorsoflexion"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "56.2%",
        "y": "34.6%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "origo",
        "x": "41.6%",
        "y": "36.5%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "insertie",
        "x": "37.8%",
        "y": "87.5%"
      }
    ]
  },
  {
    "id": "m_quadriceps_femoris",
    "naam": "M. quadriceps femoris",
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "Bekken en femur (4 koppen)",
      "insertie": "Tuberositas tibiae",
      "innervatie": "N. femoralis",
      "functie": "Knie-extensie"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Pelvis and femur (4 heads)",
      "insertie": "Tibial tuberosity",
      "innervatie": "Femoral nerve",
      "functie": "Knee extension"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "33.3%",
        "y": "20.8%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "51.6%",
        "y": "90.3%"
      }
    ]
  },
  {
    "id": "m_vastus_lateralis",
    "naam": "M. vastus lateralis",
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "Linea aspera, trochanter major",
      "insertie": "Tuberositas tibiae",
      "innervatie": "N. femoralis",
      "functie": "Knie-extensie"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Linea aspera, greater trochanter",
      "insertie": "Tibial tuberosity",
      "innervatie": "Femoral nerve",
      "functie": "Knee extension"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "11.1%",
        "y": "31.7%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "52.3%",
        "y": "90.1%"
      }
    ]
  },
  {
    "id": "m_vastus_medialis",
    "naam": "M. vastus medialis",
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "Linea aspera, linea intertrochanterica",
      "insertie": "Tuberositas tibiae",
      "innervatie": "N. femoralis",
      "functie": "Knie-extensie"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Linea aspera, intertrochanteric line",
      "insertie": "Tibial tuberosity",
      "innervatie": "Femoral nerve",
      "functie": "Knee extension"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "51.6%",
        "y": "90.1%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "32.7%",
        "y": "39.8%"
      },
      {
        "image": "regio_boven_achter.png",
        "type": "origo",
        "x": "63.4%",
        "y": "53.2%"
      }
    ]
  },
  {
    "id": "m_vastus_intermedius",
    "naam": "M. vastus intermedius",
    "nl": {
      "regio": "BOVENBEEN (Anterieur)",
      "origo": "Corpus femoris (anterieur/lateraal)",
      "insertie": "Tuberositas tibiae",
      "innervatie": "N. femoralis",
      "functie": "Knie-extensie"
    },
    "en": {
      "regio": "THIGH (Anterior)",
      "origo": "Femoral shaft (anterior/lateral)",
      "insertie": "Tibial tuberosity",
      "innervatie": "Femoral nerve",
      "functie": "Knee extension"
    },
    "visualisatie": [
      {
        "image": "regio_boven_voor.png",
        "type": "origo",
        "x": "20.9%",
        "y": "43.0%"
      },
      {
        "image": "regio_boven_voor.png",
        "type": "insertie",
        "x": "52.3%",
        "y": "89.9%"
      }
    ]
  },
  {
    "id": "m_gastrocnemius",
    "naam": "M. gastrocnemius",
    "nl": {
      "regio": "ONDERBEEN (Posterieur)",
      "origo": "Condylus medialis en lateralis femoris",
      "insertie": "Tuber calcanei (achillespees)",
      "innervatie": "N. tibialis",
      "functie": "Plantairflexie enkel, Knieflexie"
    },
    "en": {
      "regio": "LEG (Posterior)",
      "origo": "Medial and lateral condyles of femur",
      "insertie": "Calcaneal tuberosity (Achilles tendon)",
      "innervatie": "Tibial nerve",
      "functie": "Ankle plantarflexion, Knee flexion"
    },
    "visualisatie": [
      {
        "image": "regio_onder_achter.png",
        "type": "origo",
        "x": "38.5%",
        "y": "18.2%"
      },
      {
        "image": "regio_onder_achter.png",
        "type": "insertie",
        "x": "43.1%",
        "y": "92.6%"
      }
    ]
  },
  {
    "id": "m_soleus",
    "naam": "M. soleus",
    "nl": {
      "regio": "ONDERBEEN (Posterieur)",
      "origo": "Linea musculi solei, caput fibulae",
      "insertie": "Tuber calcanei (achillespees)",
      "innervatie": "N. tibialis",
      "functie": "Plantairflexie enkel"
    },
    "en": {
      "regio": "LEG (Posterior)",
      "origo": "Soleal line, head of fibula",
      "insertie": "Calcaneal tuberosity (Achilles tendon)",
      "innervatie": "Tibial nerve",
      "functie": "Ankle plantarflexion"
    },
    "visualisatie": [
      {
        "image": "regio_onder_achter.png",
        "type": "origo",
        "x": "62.4%",
        "y": "35.2%"
      },
      {
        "image": "regio_onder_achter.png",
        "type": "insertie",
        "x": "42.2%",
        "y": "92.5%"
      }
    ]
  },
  {
    "id": "m_tibialis_anterior",
    "naam": "M. tibialis anterior",
    "nl": {
      "regio": "ONDERBEEN (Anterieur)",
      "origo": "Facies lateralis tibiae",
      "insertie": "Os cuneiforme mediale, os metatarsale I",
      "innervatie": "N. fibularis profundus",
      "functie": "Dorsaalflexie enkel, Inversie enkel"
    },
    "en": {
      "regio": "LEG (Anterior)",
      "origo": "Lateral surface of tibia",
      "insertie": "Medial cuneiform, first metatarsal",
      "innervatie": "Deep fibular nerve",
      "functie": "Ankle dorsiflexion, Ankle inversion"
    },
    "visualisatie": [
      {
        "image": "regio_onder_voor.png",
        "type": "origo",
        "x": "56.0%",
        "y": "46.0%"
      },
      {
        "image": "regio_onder_voor.png",
        "type": "insertie",
        "x": "83.4%",
        "y": "88.3%"
      }
    ]
  },
  {
    "id": "m_peroneus_longus",
    "naam": "M. fibularis longus",
    "nl": {
      "regio": "ONDERBEEN (Lateraal)",
      "origo": "Caput fibulae, facies lateralis fibulae",
      "insertie": "Os cuneiforme mediale, os metatarsale I",
      "innervatie": "N. fibularis superficialis",
      "functie": "Plantairflexie enkel, Eversie enkel"
    },
    "en": {
      "regio": "LEG (Lateral)",
      "origo": "Head of fibula, lateral surface of fibula",
      "insertie": "Medial cuneiform, first metatarsal",
      "innervatie": "Superficial fibular nerve",
      "functie": "Ankle plantarflexion, Ankle eversion"
    },
    "visualisatie": [
      {
        "image": "regio_onder_voor.png",
        "type": "origo",
        "x": "33.1%",
        "y": "42.7%"
      },
      {
        "image": "regio_onder_voor.png",
        "type": "insertie",
        "x": "87.1%",
        "y": "89.7%"
      }
    ]
  },
  {
    "id": "m_extensor_digitorum_longus",
    "naam": "M. extensor digitorum longus",
    "nl": {
      "regio": "ONDERBEEN (Anterieur)",
      "origo": "Condylus lateralis tibiae, fibula",
      "insertie": "Dorsale aponeurose tenen 2-5",
      "innervatie": "N. fibularis profundus",
      "functie": "Dorsaalflexie enkel, Eversie enkel"
    },
    "en": {
      "regio": "LEG (Anterior)",
      "origo": "Lateral condyle of tibia, fibula",
      "insertie": "Dorsal aponeuroses of toes 2-5",
      "innervatie": "Deep fibular nerve",
      "functie": "Ankle dorsiflexion, Ankle eversion"
    },
    "visualisatie": [
      {
        "image": "regio_onder_voor.png",
        "type": "origo",
        "x": "39.5%",
        "y": "43.0%"
      },
      {
        "image": "regio_onder_voor.png",
        "type": "insertie",
        "x": "48.6%",
        "y": "91.7%"
      }
    ]
  },
  {
    "id": "m_flexor_digitorum_longus",
    "naam": "M. flexor digitorum longus",
    "nl": {
      "regio": "ONDERBEEN (Posterieur)",
      "origo": "Facies posterior tibiae",
      "insertie": "Phalanges distales tenen 2-5",
      "innervatie": "N. tibialis",
      "functie": "Plantairflexie enkel, Inversie enkel"
    },
    "en": {
      "regio": "LEG (Posterior)",
      "origo": "Posterior surface of tibia",
      "insertie": "Distal phalanges of toes 2-5",
      "innervatie": "Tibial nerve",
      "functie": "Ankle plantarflexion, Ankle inversion"
    },
    "visualisatie": [
      {
        "image": "regio_onder_achter.png",
        "type": "origo",
        "x": "36.6%",
        "y": "52.9%"
      },
      {
        "image": "regio_onder_achter.png",
        "type": "insertie",
        "x": "63.4%",
        "y": "97.2%"
      }
    ]
  },
  {
    "id": "m_tibialis_posterior",
    "naam": "M. tibialis posterior",
    "nl": {
      "regio": "ONDERBEEN (Posterieur)",
      "origo": "Membrana interossea, tibia, fibula",
      "insertie": "Tuberositas ossis navicularis",
      "innervatie": "N. tibialis",
      "functie": "Plantairflexie enkel, Inversie enkel"
    },
    "en": {
      "regio": "LEG (Posterior)",
      "origo": "Interosseous membrane, tibia, fibula",
      "insertie": "Tuberosity of navicular bone",
      "innervatie": "Tibial nerve",
      "functie": "Ankle plantarflexion, Ankle inversion"
    },
    "visualisatie": [
      {
        "image": "regio_onder_achter.png",
        "type": "origo",
        "x": "53.2%",
        "y": "47.2%"
      },
      {
        "image": "regio_onder_achter.png",
        "type": "insertie",
        "x": "15.4%",
        "y": "92.1%"
      }
    ]
  }
];
