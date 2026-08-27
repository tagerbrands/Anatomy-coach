import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

# Replace MOVEMENTS array
old_mov = """const MOVEMENTS = [
  'Flexie', 'Extensie', 'Anteflexie', 'Dorsoflexie', 'Abductie', 'Adductie',
  'Endorotatie', 'Exorotatie', 'Plantairflexie', 'Dorsaalflexie',
  'Inversie', 'Eversie'
];"""
new_mov = """const MOVEMENTS = [
  'Knieflexie', 'Knie-extensie', 'Anteflexie', 'Dorsoflexie', 'Abductie', 'Adductie',
  'Endorotatie', 'Exorotatie', 'Plantairflexie', 'Dorsaalflexie',
  'Inversie', 'Eversie'
];"""
code = code.replace(old_mov, new_mov)

# Replace in translations
old_tl_nl = """    movements: {
      'Flexie': 'Flexie', 'Extensie': 'Extensie', 'Anteflexie': 'Anteflexie', 'Dorsoflexie': 'Dorsoflexie', 'Abductie': 'Abductie', 'Adductie': 'Adductie',
      'Endorotatie': 'Endorotatie', 'Exorotatie': 'Exorotatie', 'Plantairflexie': 'Plantairflexie',
      'Dorsaalflexie': 'Dorsaalflexie', 'Inversie': 'Inversie', 'Eversie': 'Eversie'
    }"""
new_tl_nl = """    movements: {
      'Knieflexie': 'Knieflexie', 'Knie-extensie': 'Knie-extensie', 'Anteflexie': 'Anteflexie', 'Dorsoflexie': 'Dorsoflexie', 'Abductie': 'Abductie', 'Adductie': 'Adductie',
      'Endorotatie': 'Endorotatie', 'Exorotatie': 'Exorotatie', 'Plantairflexie': 'Plantairflexie',
      'Dorsaalflexie': 'Dorsaalflexie', 'Inversie': 'Inversie', 'Eversie': 'Eversie'
    }"""
code = code.replace(old_tl_nl, new_tl_nl)

old_tl_en = """    movements: {
      'Flexie': 'Flexion', 'Extensie': 'Extension', 'Anteflexie': 'Anteflexion', 'Dorsoflexie': 'Dorsoflexion', 'Abductie': 'Abduction', 'Adductie': 'Adduction',
      'Endorotatie': 'Internal Rotation', 'Exorotatie': 'External Rotation', 'Plantairflexie': 'Plantar Flexion',
      'Dorsaalflexie': 'Dorsiflexion', 'Inversie': 'Inversion', 'Eversie': 'Eversion'
    }"""
new_tl_en = """    movements: {
      'Knieflexie': 'Knee Flexion', 'Knie-extensie': 'Knee Extension', 'Anteflexie': 'Anteflexion', 'Dorsoflexie': 'Dorsoflexion', 'Abductie': 'Abduction', 'Adductie': 'Adduction',
      'Endorotatie': 'Internal Rotation', 'Exorotatie': 'External Rotation', 'Plantairflexie': 'Plantar Flexion',
      'Dorsaalflexie': 'Dorsiflexion', 'Inversie': 'Inversion', 'Eversie': 'Eversion'
    }"""
code = code.replace(old_tl_en, new_tl_en)

# Add pinpoint useEffect
pinpoint_effect = """  const startNewPinPointSession = () => {
    setPinPointRound(1);
    setPinPointXp(0);
    setPinPointHistory([]);
    setIsPinPointFinished(false);
    pickRandomPinPoint();
  };

  useEffect(() => {
    if (activeTab === 'pinpoint' && !pinPointMuscle && !isPinPointFinished) {
      startNewPinPointSession();
    }
  }, [activeTab]);"""
code = code.replace("""  const startNewPinPointSession = () => {
    setPinPointRound(1);
    setPinPointXp(0);
    setPinPointHistory([]);
    setIsPinPointFinished(false);
    pickRandomPinPoint();
  };""", pinpoint_effect)


with open('src/App.tsx', 'w') as f:
    f.write(code)
