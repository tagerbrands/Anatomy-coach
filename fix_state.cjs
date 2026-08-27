const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /const \[activeTab, setActiveTab\] = useState<\'bieb\' \| \'oefenen\' \| \'pinpoint\' \| \'zenuwen\'>\(\'bieb\'\);/,
  "const [activeTab, setActiveTab] = useState<'bieb' | 'oefenen' | 'pinpoint' | 'zenuwen' | 'quiz'>('bieb');"
);

const quizStateCode = `
  // Quiz State
  const [quizMuscle, setQuizMuscle] = useState<Muscle | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [viewSideQuiz, setViewSideQuiz] = useState<'voor' | 'achter'>('voor');
`;

code = code.replace(
  /\/\/ Zenuwen State/,
  quizStateCode + '\n  // Zenuwen State'
);

fs.writeFileSync('src/App.tsx', code);
