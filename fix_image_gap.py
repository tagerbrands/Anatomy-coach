import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

code = code.replace('className="flex w-full h-full items-center justify-center pt-4 overflow-hidden min-h-0 shrink gap-2 sm:gap-8"', 'className="flex w-full h-full items-center justify-center pt-4 pb-4 overflow-hidden min-h-0 shrink gap-2 sm:gap-8"')

with open('src/App.tsx', 'w') as f:
    f.write(code)
