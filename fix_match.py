import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

old_match = """    if (mov === 'flexie') {
      text = text.replace(/plantairflexie|plantarflexion|plantar flexion|dorsaalflexie|dorsiflexion|anteflexie|dorsoflexie|flexie heup|hip flexion|flexie van de heup|flexes the hip/gi, '');
      return text.includes('flex');
    }
    if (mov === 'extensie') {
      text = text.replace(/extensie heup|hip extension|extensie van de heup|extends the hip/gi, '');
      return text.includes('exten');
    }"""
new_match = """    if (mov === 'knieflexie') {
      return /knieflexie|knee flexion|flexie knie/i.test(funcText);
    }
    if (mov === 'knie-extensie') {
      return /knie-extensie|knee extension|extensie knie/i.test(funcText);
    }"""
code = code.replace(old_match, new_match)

with open('src/App.tsx', 'w') as f:
    f.write(code)
