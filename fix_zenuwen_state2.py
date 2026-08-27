import re

with open('src/App.tsx', 'r') as f:
    code = f.read()

state_start = code.find('// Zenuwen State')
quiz_logic_start = code.find('// Quiz Logic')

if state_start != -1 and quiz_logic_start != -1:
    new_state = """// Zenuwen State
  const [nerveRound, setNerveRound] = useState(1);
  const [nerveHistory, setNerveHistory] = useState<Array<{ nerve: {nl: string, en: string}, mistakes: number, xp: number }>>([]);
  const [isNerveFinished, setIsNerveFinished] = useState(false);
  const [nerveXp, setNerveXp] = useState(0);
  const [nerveMistakesThisRound, setNerveMistakesThisRound] = useState(0);
  
  const [nerveMuscle, setNerveMuscle] = useState<any>(null);
  const [nerveOptions, setNerveOptions] = useState<string[]>([]);
  const [nerveAnswered, setNerveAnswered] = useState(false);
  const [nerveSelectedOption, setNerveSelectedOption] = useState<string | null>(null);
  
  const nerveFlexCardRef = useRef<HTMLDivElement>(null);

  """
    # Replace from state_start to before `// Quiz Logic`? Wait, `// Zenuwen State` is typically right before `// Zenuwen Logic` or something. Let me check where it is.
