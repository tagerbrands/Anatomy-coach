import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

code = code.replace('<div className="relative flex-1 min-h-[40vh] mb-2 bg-slate-900/40 sm:rounded-b-3xl border-b border-white/10 overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4">', '<div className="relative flex-1 min-h-[40vh] mb-4 sm:mb-6 bg-slate-900/40 sm:rounded-b-3xl border-b border-white/10 overflow-hidden flex flex-col items-center justify-center p-2 sm:p-4">')

with open('src/App.tsx', 'w') as f:
    f.write(code)
