import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Code2,
  Eye,
  FileText,
  Flame,
  GraduationCap,
  Info,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TerminalSquare,
  Trophy,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

type PathwayId = "quest" | "games" | "web" | "python" | "logic" | "creative";
type HubTab = "lessons" | "homework" | "quiz" | "leaderboard";

type Lesson = {
  id: string;
  title: string;
  detail: string;
  type: string;
  prompt: string;
  instructions: string;
  starter: string;
  word: string;
  locked?: boolean;
};

const pathways: { id: PathwayId; title: string; description: string; lessons: string; color: string; icon: typeof Code2 }[] = [
  { id: "quest", title: "Idea Quest 101", description: "Your first coding superpowers", lessons: "8 missions", color: "bg-mint", icon: Code2 },
  { id: "games", title: "Game Makers", description: "Build worlds that you can play", lessons: "10 missions", color: "bg-lilac", icon: Trophy },
  { id: "web", title: "Web Wonderers", description: "Make a corner of the internet", lessons: "12 missions", color: "bg-butter", icon: Sparkles },
  { id: "python", title: "Python Pioneers", description: "Turn ideas into powerful programs", lessons: "9 missions", color: "bg-coral/20", icon: Code2 },
  { id: "logic", title: "Logic Lab", description: "Spot patterns and solve mysteries", lessons: "7 missions", color: "bg-berry/15", icon: Target },
  { id: "creative", title: "Creative Studio", description: "Make music, motion, and stories", lessons: "8 missions", color: "bg-mint/60", icon: Star },
];

const lessonPlans: Record<PathwayId, Lesson[]> = {
  quest: [
    { id: "crew", title: "Meet the idea crew", detail: "Lesson 1 · 8 min", type: "Welcome", prompt: "Say hello to your new idea crew.", instructions: "Meet the tiny ideas that make every project work together.", starter: "// Meet your code crew!\nconst buddy = \"Nova\";\n\nintroduce(buddy);", word: "const" },
    { id: "hello", title: "Make Nova say hello", detail: "Lesson 2 · 12 min", type: "Lesson", prompt: "Let’s teach Nova how to greet a friend.", instructions: "Change the name between the quotation marks, then run your code to see Nova say hello.", starter: '// Make Nova say hello!\nconst friend = "Riley";\n\nsayHello(friend);', word: "const" },
    { id: "adventure", title: "Choose your own adventure", detail: "Lesson 3 · 15 min", type: "Lesson", prompt: "Give your story two surprising turns.", instructions: "Use a choice to send your hero somewhere new. There is no wrong adventure.", starter: "// Choose a path!\nconst path = \"moon\";\n\nstartAdventure(path);", word: "if" },
    { id: "variables", title: "Give your ideas names", detail: "Lesson 4 · 10 min", type: "Lesson", prompt: "Help your code remember three favorite things.", instructions: "Create labels for a color, a snack, and a superpower, then show them to Nova.", starter: '// Give your ideas names!\nconst color = "blue";\nconst snack = "popcorn";\n\nshowIdeas(color, snack);', word: "variable" },
    { id: "dance", title: "Make it dance", detail: "Lesson 5 · 14 min", type: "Lesson", prompt: "Add a little wiggle to your project.", instructions: "Change the move so your character bounces, spins, or does a dance only you could invent.", starter: "// Make it dance!\nconst move = \"spin\";\n\ndance(move);", word: "function" },
    { id: "story", title: "Tell a story with code", detail: "Lesson 6 · 16 min", type: "Story lab", prompt: "Build a tiny story with a beginning, middle, and twist.", instructions: "Put your story beats in order and let your reader discover the surprise.", starter: "// A tiny story!\nconst beginning = \"Once upon a time\";\n\nshareStory(beginning);", word: "sequence" },
    { id: "pet", title: "Build a pet parade", detail: "Project · 20 min", type: "Project", prompt: "Bring a whole pet parade to life.", instructions: "Choose the pets, their sounds, and the order they march across the screen.", starter: "// Pet parade!\nconst pets = [\"cat\", \"dog\"];\n\nstartParade(pets);", word: "array" },
    { id: "finale", title: "Your very own mini game", detail: "Challenge · 25 min", type: "Challenge", prompt: "Mix your favorite code powers into one mini game.", instructions: "Pick a goal, add a surprise, and make a game that feels like you.", starter: "// Your mini game!\nconst goal = \"find the star\";\n\nlaunchGame(goal);", word: "event", locked: true },
  ],
  games: [
    { id: "game-start", title: "Meet your game world", detail: "Lesson 1 · 10 min", type: "Welcome", prompt: "Choose a world for your first game.", instructions: "Pick a setting, a hero, and one thing your player can discover.", starter: "// Choose your world!\nconst world = \"cloud city\";\n\nopenWorld(world);", word: "scene" },
    { id: "game-score", title: "Make a score sparkle", detail: "Lesson 2 · 14 min", type: "Lesson", prompt: "Give your player a reason to cheer.", instructions: "Add a star to the score whenever your player finds something special.", starter: "// Add a star!\nlet score = 0;\n\ncollectStar(score);", word: "let" },
    { id: "game-rules", title: "Invent a game rule", detail: "Lesson 3 · 16 min", type: "Lesson", prompt: "Make one rule that changes everything.", instructions: "Try a timer, a secret door, or a friendly creature who gives clues.", starter: "// A new rule!\nconst rule = \"find the key\";\n\nplayBy(rule);", word: "rule" },
    { id: "game-build", title: "Build your first level", detail: "Project · 25 min", type: "Project", prompt: "Design a level with one clever surprise.", instructions: "Put your ideas in a path your friends can play from start to finish.", starter: "// Build a level!\nconst level = [\"start\", \"bridge\", \"star\"];\n\nopenLevel(level);", word: "array" },
  ],
  web: [
    { id: "web-start", title: "Say hello to the web", detail: "Lesson 1 · 9 min", type: "Welcome", prompt: "Make your very first web corner.", instructions: "Choose a title that makes someone curious to look around.", starter: "// Your web corner!\nconst title = \"Riley's rocket club\";\n\nshowTitle(title);", word: "title" },
    { id: "web-color", title: "Paint with code", detail: "Lesson 2 · 13 min", type: "Lesson", prompt: "Give your page a color story.", instructions: "Pick colors that make your page feel sunny, mysterious, or completely you.", starter: '// Pick a color!\nconst color = "sunset";\n\npaintPage(color);', word: "style" },
    { id: "web-link", title: "Build a friendly link", detail: "Lesson 3 · 12 min", type: "Lesson", prompt: "Help visitors find the next cool thing.", instructions: "Write a link label that tells people exactly where it will take them.", starter: '// Add a link!\nconst label = "See my projects";\n\naddLink(label);', word: "link" },
    { id: "web-publish", title: "Share your web corner", detail: "Project · 22 min", type: "Project", prompt: "Put your ideas somewhere friends can visit.", instructions: "Check your page, share it with a grown-up, and celebrate the launch.", starter: "// Ready to share!\nconst page = \"my bright corner\";\n\nsharePage(page);", word: "publish" },
  ],
  python: [
    { id: "python-variables", title: "Name your first idea", detail: "Mission 1 · 12 min", type: "Welcome", prompt: "Give your Python ideas useful names.", instructions: "Create a variable for a favorite color, then ask Python to show it.", starter: 'color = "sunset"\n\nprint(color)', word: "variable" },
    { id: "python-loops", title: "Repeat a tiny wonder", detail: "Mission 2 · 15 min", type: "Mission", prompt: "Use a loop to make one idea happen three times.", instructions: "Choose something joyful to repeat and watch your program do the work.", starter: 'for star in range(3):\n    print("shine")', word: "loop" },
    { id: "python-functions", title: "Build a helper function", detail: "Mission 3 · 18 min", type: "Mission", prompt: "Teach Python a reusable trick.", instructions: "Write a function that greets a friend, then call it with a new name.", starter: 'def greet(name):\n    print("Hi, " + name)\n\ngreet("Riley")', word: "function" },
    { id: "python-project", title: "Make a pocket calculator", detail: "Project · 25 min", type: "Project", prompt: "Combine variables and functions into a useful tool.", instructions: "Choose two numbers, add them together, and make the result easy to read.", starter: 'first = 8\nsecond = 5\n\nprint(first + second)', word: "input" },
  ],
  logic: [
    { id: "logic-patterns", title: "Crack the pattern", detail: "Mission 1 · 8 min", type: "Puzzle", prompt: "Find what comes next and explain your clue.", instructions: "Look for the rule hiding in the sequence before you choose an answer.", starter: "// Pattern: 2, 4, 6, ?\nconst next = 8;\n\nexplain(next);", word: "pattern" },
    { id: "logic-conditions", title: "Open the secret door", detail: "Mission 2 · 12 min", type: "Mission", prompt: "Use a condition to choose the right path.", instructions: "Check the clue, then help your explorer decide which door to open.", starter: 'const key = "moon";\n\nif (key === "moon") {\n  openDoor();\n}', word: "condition" },
    { id: "logic-debug", title: "Find three tiny bugs", detail: "Challenge · 20 min", type: "Debugging", prompt: "Be a bug hunter and repair a surprising program.", instructions: "Read the clues, make one change at a time, and test your thinking.", starter: "// Something is not right yet!\nconst answer = 3 + 3;\n\ncheck(answer);", word: "debug" },
  ],
  creative: [
    { id: "creative-motion", title: "Make a shape dance", detail: "Mission 1 · 10 min", type: "Animation", prompt: "Give a shape a movement only you would invent.", instructions: "Pick a direction and a rhythm, then imagine how your animation feels.", starter: 'const move = "spin";\n\nanimate(move);', word: "event" },
    { id: "creative-story", title: "Compose a tiny story", detail: "Mission 2 · 14 min", type: "Story lab", prompt: "Mix a character, a place, and a surprise.", instructions: "Put three story beats in order and let your reader discover the twist.", starter: 'const hero = "a brave moon mouse";\n\ntellStory(hero);', word: "sequence" },
    { id: "creative-showcase", title: "Create your idea poster", detail: "Project · 22 min", type: "Project", prompt: "Show the world what you are curious about.", instructions: "Choose a title, a color, and one sentence that makes someone want to explore.", starter: 'const title = "My next big idea";\n\nmakePoster(title);', word: "design" },
  ],
};

const languageLabels: Record<string, string> = { python: "Python", cpp: "C++", javascript: "JavaScript", scratch: "Scratch" };
const languageFileTypes: Record<string, string> = { python: "py", cpp: "cpp", javascript: "js", scratch: "sb3" };
const languageStarters: Record<string, Partial<Record<string, string>>> = {
  python: { hello: '# Make Nova say hello!\nfriend = "Riley"\n\nsay_hello(friend)' },
  cpp: { hello: '// Make Nova say hello!\n#include <string>\n\nstd::string friendName = "Riley";\nsayHello(friendName);' },
  scratch: { hello: "// Make Nova say hello!\nwhen green flag clicked\n\nsay [Hi, Riley!]" },
};

const homework = [
  { id: "garden", kind: "Make at home", title: "Grow a hello garden", detail: "Idea Quest · 15 min", due: "Due Friday", progress: "In progress", description: "Plant three different flowers and give each one a friendly name.", tasks: ["Choose three flower names", "Give each flower a color", "Share a screenshot with a grown-up"], color: "bg-mint" },
  { id: "pet-blueprint", kind: "Project", title: "Pet parade blueprint", detail: "Idea Quest · 20 min", due: "Due next week", progress: "Not started", description: "Draw the parade route before you build it in code.", tasks: ["Draw the parade path", "Pick four pets", "Write each pet’s special move"], color: "bg-lilac" },
  { id: "game-review", kind: "Project", title: "Play-test a friend’s game", detail: "Game Makers · 10 min", due: "Anytime", progress: "New", description: "Be a kind game tester and leave one glow and one grow.", tasks: ["Play the game twice", "Name one thing that shines", "Suggest one tiny upgrade"], color: "bg-butter" },
];

const quizQuestions = [
  { question: "What does a variable help your code do?", options: ["Remember a useful thing", "Turn off the computer", "Draw only circles"], answer: 0 },
  { question: "What should you do when your code does something surprising?", options: ["Give up right away", "Look for clues and try a small change", "Hide the whole project"], answer: 1 },
  { question: "Which is a great project idea?", options: ["Only projects with one right answer", "A game, story, or invention you want to make", "A project nobody is allowed to enjoy"], answer: 1 },
];

const levels = [
  { level: 1, title: "Explorer", message: "You are spotting patterns and asking brave questions.", minXp: 0 },
  { level: 2, title: "Rookie Coder", message: "You are building your first real coding superpowers.", minXp: 100 },
  { level: 3, title: "Code Builder", message: "You are combining ideas into working creations.", minXp: 250 },
  { level: 4, title: "Problem Solver", message: "You can find clues and untangle tricky problems.", minXp: 450 },
  { level: 5, title: "Developer", message: "You are making projects with purpose and style.", minXp: 700 },
  { level: 6, title: "Code Creator", message: "Your ideas are becoming bigger, bolder, and more useful.", minXp: 1000 },
  { level: 7, title: "Engineer", message: "You are designing systems that work together.", minXp: 1400 },
  { level: 8, title: "Inventor", message: "You are turning hard questions into new possibilities.", minXp: 1850 },
  { level: 9, title: "Master Builder", message: "You are guiding projects from spark to finish.", minXp: 2400 },
  { level: 10, title: "Code Legend", message: "You make room for other minds to build too.", minXp: 3000 },
];

type LeaderboardMode = "improvement" | "mastery";
type FriendScore = { name: string; initials: string; color: string; level: number; xp: number; improvement: number; mastery: number; focus: string };

const friendScores: FriendScore[] = [
  { name: "PixelFox", initials: "P", color: "bg-coral", level: 3, xp: 382, improvement: 91, mastery: 78, focus: "Loops" },
  { name: "MangoBot", initials: "M", color: "bg-butter", level: 4, xp: 566, improvement: 73, mastery: 89, focus: "Functions" },
  { name: "SkyCoder", initials: "S", color: "bg-lilac", level: 2, xp: 214, improvement: 87, mastery: 65, focus: "Stories" },
  { name: "RiverByte", initials: "R", color: "bg-mint", level: 3, xp: 438, improvement: 68, mastery: 83, focus: "Web ideas" },
];

export default function Learn() {
  const [searchParams] = useSearchParams();
  const language = searchParams.get("language") ?? "javascript";
  const languageLabel = languageLabels[language] ?? "JavaScript";
  const languageFileType = languageFileTypes[language] ?? "js";
  const [activePathway, setActivePathway] = useState<PathwayId>("quest");
  const [activeLessonIndex, setActiveLessonIndex] = useState(1);
  const [hubTab, setHubTab] = useState<HubTab>("lessons");
  const [completedLessons, setCompletedLessons] = useState<string[]>(["crew"]);
  const [pathwayProgress, setPathwayProgress] = useState<Record<PathwayId, number>>({
    quest: 68,
    games: 24,
    web: 0,
    python: 0,
    logic: 0,
    creative: 0,
  });
  const [xp, setXp] = useState(180);
  const [xpEvents, setXpEvents] = useState<string[]>(["first-lesson"]);
  const [leaderboardMode, setLeaderboardMode] = useState<LeaderboardMode>("improvement");
  const [challengeSentTo, setChallengeSentTo] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [runResult, setRunResult] = useState("");
  const [selectedHomeworkId, setSelectedHomeworkId] = useState(homework[0].id);
  const [homeworkChecks, setHomeworkChecks] = useState<Record<string, number[]>>({});
  const [completedHomework, setCompletedHomework] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [proctorPreview, setProctorPreview] = useState(false);

  const currentLessons = lessonPlans[activePathway];
  const activeLesson = currentLessons[activeLessonIndex] ?? currentLessons[0];
  const codeKey = `${language}:${activeLesson.id}`;
  const activeCode = drafts[codeKey] ?? languageStarters[language]?.[activeLesson.id] ?? activeLesson.starter;
  const activeHomework = homework.find((item) => item.id === selectedHomeworkId) ?? homework[0];
  const currentQuestion = quizQuestions[quizIndex];
  const completedQuizAnswers = Object.keys(quizAnswers).length;
  const quizScore = useMemo(() => quizQuestions.reduce((score, question, index) => score + (quizAnswers[index] === question.answer ? 1 : 0), 0), [quizAnswers]);
  const pathway = pathways.find((item) => item.id === activePathway) ?? pathways[0];
  const lessonProgress = Math.round((completedLessons.filter((id) => currentLessons.some((lesson) => lesson.id === id)).length / currentLessons.length) * 100);
  const currentLevel = [...levels].reverse().find((item) => xp >= item.minXp) ?? levels[0];
  const nextLevel = levels.find((item) => item.minXp > xp);
  const levelProgress = nextLevel ? Math.round(((xp - currentLevel.minXp) / (nextLevel.minXp - currentLevel.minXp)) * 100) : 100;
  const sortedFriends = useMemo(() => {
    const currentLearner: FriendScore = {
      name: "Riley",
      initials: "R",
      color: "bg-berry",
      level: currentLevel.level,
      xp,
      improvement: Math.min(99, 62 + Math.round(xp / 12)),
      mastery: Math.min(99, 58 + Math.round(xp / 14)),
      focus: languageLabel,
    };
    return [currentLearner, ...friendScores].sort((a, b) => b[leaderboardMode] - a[leaderboardMode]);
  }, [currentLevel.level, languageLabel, leaderboardMode, xp]);

  const awardXp = (eventId: string, amount: number, pathwayId: PathwayId = activePathway) => {
    if (xpEvents.includes(eventId)) return;
    setXpEvents((current) => [...current, eventId]);
    setXp((current) => current + amount);
    setPathwayProgress((current) => ({
      ...current,
      [pathwayId]: Math.min(100, current[pathwayId] + Math.max(2, Math.round(amount / 4))),
    }));
  };

  const handlePathwayChange = (pathwayId: PathwayId) => {
    setActivePathway(pathwayId);
    setActiveLessonIndex(pathwayId === "quest" ? 1 : 0);
    setHubTab("lessons");
    setRunResult("");
  };

  const selectLesson = (index: number) => {
    if (currentLessons[index]?.locked) return;
    setActiveLessonIndex(index);
    setRunResult("");
  };

  const updateCode = (value: string) => {
    setDrafts((current) => ({ ...current, [codeKey]: value }));
    setRunResult("");
  };

  const runCode = () => {
    if (activeLesson.id === "hello") {
      const match = activeCode.match(/\b(?:friend|friendName)\s*=\s*["']([^"']+)["']/);
      setRunResult(`Nice job! Nova says: “Hi, ${match?.[1] || "friend"}!”`);
      awardXp(`run:${activeLesson.id}`, 10);
      return;
    }
    setRunResult(`It works! Your ${activeLesson.title.toLowerCase()} is coming to life.`);
    awardXp(`run:${activeLesson.id}`, 10);
  };

  const finishLesson = () => {
    if (!runResult) return;
    setCompletedLessons((current) => current.includes(activeLesson.id) ? current : [...current, activeLesson.id]);
    awardXp(`lesson:${activeLesson.id}`, 40);
  };

  const toggleHomeworkTask = (index: number) => {
    setHomeworkChecks((current) => {
      const currentChecks = current[activeHomework.id] ?? [];
      const nextChecks = currentChecks.includes(index) ? currentChecks.filter((item) => item !== index) : [...currentChecks, index];
      return { ...current, [activeHomework.id]: nextChecks };
    });
  };

  const submitHomework = () => {
    setCompletedHomework((current) => current.includes(activeHomework.id) ? current : [...current, activeHomework.id]);
    awardXp(`make:${activeHomework.id}`, 30);
  };

  const chooseQuizAnswer = (answerIndex: number) => {
    if (quizFinished) return;
    setQuizAnswers((current) => ({ ...current, [quizIndex]: answerIndex }));
  };

  const advanceQuiz = () => {
    if (quizIndex === quizQuestions.length - 1) {
      setQuizFinished(true);
      awardXp("quiz:complete", 60);
    } else {
      setQuizIndex((current) => current + 1);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizFinished(false);
  };

  const tabs: { id: HubTab; label: string; icon: typeof BookOpen }[] = [
    { id: "lessons", label: "Idea trail", icon: BookOpen },
    { id: "homework", label: "Make at home", icon: ClipboardCheck },
    { id: "quiz", label: "Quick check", icon: GraduationCap },
    { id: "leaderboard", label: "Friends", icon: Users },
  ];

  return (
    <div className="bg-[#F7F6EE] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Link to="/" className="mb-3 inline-flex items-center gap-1.5 text-sm font-extrabold text-forest/60 transition-colors hover:text-forest"><ArrowLeft className="size-4" /> Back to LittleMinds</Link>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-berry">Your idea trail</p>
            <h1 className="mt-1 text-3xl font-black tracking-[-0.055em] text-forest sm:text-4xl">Hello, Riley!</h1>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-forest/8 bg-cream px-4 py-3 shadow-card"><span className="grid size-9 place-items-center rounded-xl bg-coral/15 text-coral"><Flame className="size-5 fill-current" /></span><div><p className="text-xs font-bold text-forest/55">Making rhythm</p><p className="text-sm font-black text-forest">4 days creating</p></div></div>
        </div>

        <div className="mb-6 rounded-[26px] bg-forest p-5 text-cream shadow-card sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-2xl bg-butter text-forest"><Award className="size-6" /></span><div><p className="text-sm font-extrabold text-cream/62">Level {currentLevel.level} · {currentLevel.title}</p><p className="text-lg font-black tracking-[-0.03em]">{currentLevel.message}</p></div></div>
            <div className="min-w-[230px]"><div className="mb-2 flex justify-between text-xs font-black"><span>{xp} XP earned</span><span className="text-butter">{nextLevel ? `${nextLevel.minXp} XP` : "Max level"}</span></div><div className="h-3 overflow-hidden rounded-full bg-cream/15"><div className="h-full rounded-full bg-butter transition-all duration-500" style={{ width: `${levelProgress}%` }} /></div><p className="mt-2 text-right text-[11px] font-bold text-cream/45">{nextLevel ? `${nextLevel.minXp - xp} XP to ${nextLevel.title}` : "You reached the top level"}</p></div>
          </div>
        </div>

        <section aria-labelledby="pathway-heading" className="mb-6">
          <div className="mb-3 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">Topic worlds</p><h2 id="pathway-heading" className="mt-1 text-xl font-black tracking-[-0.04em] text-forest">Choose a world to explore</h2></div><span className="hidden text-xs font-bold text-forest/45 sm:block">Six worlds · switch anytime</span></div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {pathways.map((item) => { const Icon = item.icon; const isActive = item.id === activePathway; return <button key={item.id} type="button" aria-pressed={isActive} onClick={() => handlePathwayChange(item.id)} className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${isActive ? "border-forest bg-cream shadow-[0_4px_0_#173E35]" : "border-forest/8 bg-cream shadow-card hover:-translate-y-0.5"}`}><span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${item.color} text-forest`}><Icon className="size-5" /></span><span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className="truncate text-sm font-black text-forest">{item.title}</span>{isActive && <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-mint-dark">On now</span>}</span><span className="mt-0.5 block truncate text-xs font-bold text-forest/50">{item.description}</span><span className="mt-2 flex items-center gap-2 text-[11px] font-black text-forest/45"><span className="h-1.5 w-16 overflow-hidden rounded-full bg-forest/10"><span className="block h-full rounded-full bg-berry" style={{ width: `${pathwayProgress[item.id]}%` }} /></span>{pathwayProgress[item.id]}% · {item.lessons}</span></span><ChevronRight className={`size-4 shrink-0 ${isActive ? "text-berry" : "text-forest/25"}`} /></button>; })}
          </div>
        </section>

        <section className="mb-6 flex flex-col gap-4 rounded-[26px] bg-[#1A2744] p-5 text-cream shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-6"><div className="flex items-start gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#C4A35A] text-[#1A2744]"><Sparkles className="size-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.13em] text-[#C4A35A]">New world · Msimbo Arusha</p><h2 className="mt-1 text-xl font-black tracking-[-0.04em]">Code with stories from Tanzania.</h2><p className="mt-1 max-w-xl text-sm font-semibold leading-6 text-cream/60">Build Blockly missions in English or Kiswahili, then help a bajaj explore Arusha.</p></div></div><Link to="/msimbo" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C45C26] px-4 text-sm font-black text-white transition-transform hover:-translate-y-0.5">Open Msimbo <ArrowRight className="size-4" /></Link></section>

        <div className="mb-6 grid gap-2 rounded-[22px] border border-forest/8 bg-cream p-2 shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {tabs.map((tab) => { const Icon = tab.icon; const isActive = hubTab === tab.id; return <button key={tab.id} type="button" aria-pressed={isActive} onClick={() => setHubTab(tab.id)} className={`flex items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-black transition-colors ${isActive ? "bg-berry text-white shadow-[0_3px_0_#823A7B]" : "text-forest/55 hover:bg-forest/5 hover:text-forest"}`}><Icon className="size-4" /> {tab.label}</button>; })}
        </div>

        {hubTab === "lessons" && <div className="grid gap-6 lg:grid-cols-[292px_minmax(0,1fr)]">
          <aside className="rounded-[26px] border border-forest/8 bg-cream p-4 shadow-card lg:h-fit">
            <div className="mb-4 flex items-center justify-between px-2"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-mint-dark">Idea trail</p><h2 className="mt-1 font-black tracking-[-0.03em]">{pathway.title}</h2></div><span className="rounded-full bg-butter/65 px-2.5 py-1 text-[10px] font-black text-forest">{languageLabel}</span><button type="button" className="grid size-9 place-items-center rounded-xl bg-forest/6 text-forest/65 hover:bg-forest/10" aria-label="Get course help"><CircleHelp className="size-5" /></button></div>
            <div className="mb-4 rounded-2xl bg-mint/35 p-3"><div className="flex items-center justify-between text-xs font-black text-forest/65"><span>{completedLessons.filter((id) => currentLessons.some((lesson) => lesson.id === id)).length}/{currentLessons.length} complete</span><span>{lessonProgress}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-forest/10"><div className="h-full rounded-full bg-mint-dark transition-all" style={{ width: `${lessonProgress}%` }} /></div></div>
            <div className="space-y-1.5">{currentLessons.map((lesson, index) => { const isSelected = index === activeLessonIndex; const isLocked = lesson.locked; const isDone = completedLessons.includes(lesson.id); return <button key={lesson.id} type="button" disabled={isLocked} onClick={() => selectLesson(index)} className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-all ${isSelected ? "bg-berry text-white shadow-[0_4px_0_#823A7B]" : isLocked ? "cursor-not-allowed opacity-45" : "hover:bg-forest/5"}`}><span className={`grid size-8 shrink-0 place-items-center rounded-xl text-xs font-black ${isSelected ? "bg-white/16" : isDone ? "bg-mint text-mint-dark" : "bg-forest/7 text-forest/70"}`}>{isDone ? <Check className="size-4" strokeWidth={3} /> : isLocked ? <LockKeyhole className="size-3.5" /> : index + 1}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-black">{lesson.title}</span><span className={`block text-xs font-bold ${isSelected ? "text-white/65" : "text-forest/48"}`}>{lesson.detail}</span></span>{isSelected && <ChevronRight className="size-4 shrink-0" />}</button>; })}</div>
            <div className="mt-5 rounded-2xl bg-butter/55 p-3.5"><div className="flex gap-2.5"><Star className="mt-0.5 size-4 shrink-0 fill-coral text-coral" /><p className="text-xs font-extrabold leading-5 text-forest/75">Collect stars by trying ideas, finishing missions, and showing your work to a grown-up.</p></div></div>
          </aside>

          <section className="overflow-hidden rounded-[28px] border border-forest/8 bg-cream shadow-card">
            <div className="border-b border-forest/8 px-5 py-5 sm:px-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-full bg-coral/12 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-coral">{activeLesson.type}</span><span className="text-xs font-bold text-forest/45">{activeLesson.detail}</span><span className="rounded-full bg-forest/6 px-2.5 py-1 text-[10px] font-black text-forest/55">{languageLabel}</span></div><h2 className="text-2xl font-black tracking-[-0.05em] text-forest">{activeLesson.title}</h2></div><div className="flex items-center gap-1.5 text-sm font-black text-forest/65"><Star className="size-4 fill-butter text-butter" /> +15 stars</div></div></div>
            <div className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[minmax(0,1fr)_238px]">
              <div><div className="rounded-2xl bg-mint/35 p-4 sm:p-5"><p className="font-black text-forest">{activeLesson.prompt}</p><p className="mt-1 text-sm font-semibold leading-6 text-forest/65">{activeLesson.instructions}</p></div><div className="mt-5 overflow-hidden rounded-2xl bg-[#122A24] shadow-[0_7px_0_#091A16]"><div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div className="flex items-center gap-2 text-xs font-bold text-white/55"><TerminalSquare className="size-4 text-mint" /> {activeLesson.id}.{languageFileType}</div><span className="rounded-md bg-white/8 px-2 py-1 font-mono text-[10px] font-bold text-white/45">ready</span></div><textarea value={activeCode} onChange={(event) => updateCode(event.target.value)} spellCheck={false} aria-label="Code editor" className="block h-[180px] w-full resize-none bg-transparent p-5 font-mono text-sm font-medium leading-7 text-[#DBFAEC] outline-none selection:bg-berry selection:text-white" /><div className="flex flex-col gap-3 border-t border-white/10 bg-black/10 p-3 sm:flex-row sm:items-center sm:justify-between"><p className="font-mono text-xs text-white/40">Tip: small changes make big magic</p><button type="button" onClick={runCode} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-mint px-4 text-sm font-black text-forest transition-transform hover:-translate-y-0.5"><Play className="size-4 fill-current" /> Run code</button></div></div><div aria-live="polite" className={`mt-5 min-h-[76px] rounded-2xl border p-4 transition-colors ${runResult ? "border-mint-dark/20 bg-mint/25" : "border-dashed border-forest/15 bg-forest/[0.025]"}`}>{runResult ? <div className="flex items-start gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-xl bg-mint text-mint-dark"><Check className="size-4" strokeWidth={3} /></span><p className="pt-1 text-sm font-black text-forest">{runResult}</p></div> : <p className="pt-1 text-sm font-bold text-forest/40">Your code’s message will pop up here.</p>}</div></div>
              <aside className="flex flex-col rounded-2xl bg-[#F5E6FF] p-5"><span className="grid size-10 place-items-center rounded-2xl bg-berry text-white"><Code2 className="size-5" /></span><h3 className="mt-4 text-lg font-black tracking-[-0.04em] text-forest">Code word</h3><p className="mt-2 text-sm font-semibold leading-6 text-forest/65"><code className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs font-bold text-berry">{activeLesson.word}</code> is a little power your code can use.</p><div className="mt-5 rounded-xl bg-white/55 p-3"><p className="text-xs font-black uppercase tracking-[0.08em] text-berry">Try this</p><p className="mt-1 text-xs font-bold leading-5 text-forest/65">Change one tiny detail, run it, and see what surprises you.</p></div><div className="mt-auto pt-5"><button type="button" disabled={!runResult || completedLessons.includes(activeLesson.id)} onClick={finishLesson} className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-black transition-all ${completedLessons.includes(activeLesson.id) ? "bg-mint text-mint-dark" : runResult ? "bg-berry text-white hover:-translate-y-0.5" : "cursor-not-allowed bg-forest/8 text-forest/35"}`}>{completedLessons.includes(activeLesson.id) ? <><Check className="size-4" strokeWidth={3} /> Star collected!</> : <>Finish lesson <ArrowRight className="size-4" /></>}</button></div></aside>
            </div>
          </section>
        </div>}

        {hubTab === "homework" && <section className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="space-y-3">{homework.map((item) => { const isSelected = item.id === selectedHomeworkId; const done = completedHomework.includes(item.id); return <button key={item.id} type="button" onClick={() => setSelectedHomeworkId(item.id)} className={`w-full rounded-[22px] border p-4 text-left transition-all ${isSelected ? "border-forest bg-cream shadow-[0_4px_0_#173E35]" : "border-forest/8 bg-cream shadow-card hover:-translate-y-0.5"}`}><div className="flex items-start gap-3"><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${item.color} text-forest`}>{item.kind === "Make at home" ? <FileText className="size-5" /> : <ClipboardCheck className="size-5" />}</span><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="truncate text-sm font-black text-forest">{item.title}</span>{done && <CheckCircle2 className="size-4 shrink-0 text-mint-dark" />}</span><span className="mt-1 block text-xs font-bold text-forest/50">{item.kind} · {item.detail}</span><span className="mt-3 flex items-center justify-between text-xs font-black"><span className={done ? "text-mint-dark" : "text-forest/45"}>{done ? "Finished" : item.progress}</span><span className="text-forest/40">{item.due}</span></span></span></div></button>; })}</div>
          <section className="overflow-hidden rounded-[28px] border border-forest/8 bg-cream shadow-card"><div className={`p-5 sm:p-7 ${activeHomework.color}`}><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="rounded-full bg-white/60 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-forest/65">{activeHomework.kind}</span><h2 className="mt-3 text-3xl font-black tracking-[-0.06em] text-forest">{activeHomework.title}</h2><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-forest/65">{activeHomework.description}</p></div><span className="grid size-12 place-items-center rounded-2xl bg-white/60 text-forest"><Target className="size-6" /></span></div></div><div className="p-5 sm:p-7"><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">Your tiny steps</p><h3 className="mt-1 text-lg font-black tracking-[-0.03em] text-forest">Make it your own</h3></div><span className="text-xs font-black text-berry">{homeworkChecks[activeHomework.id]?.length ?? 0}/{activeHomework.tasks.length} done</span></div><div className="mt-4 space-y-2">{activeHomework.tasks.map((task, index) => { const checked = (homeworkChecks[activeHomework.id] ?? []).includes(index); return <button key={task} type="button" aria-pressed={checked} onClick={() => toggleHomeworkTask(index)} className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${checked ? "border-mint-dark/15 bg-mint/30" : "border-forest/8 bg-[#FBFAF3] hover:bg-forest/4"}`}><span className={`grid size-6 shrink-0 place-items-center rounded-lg ${checked ? "bg-mint-dark text-white" : "border border-forest/15 text-transparent"}`}><Check className="size-3.5" strokeWidth={3} /></span><span className={`text-sm font-bold ${checked ? "text-forest" : "text-forest/65"}`}>{task}</span></button>; })}</div><div className="mt-7 flex flex-col justify-between gap-4 rounded-2xl bg-butter/45 p-4 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-butter text-forest"><Award className="size-5" /></span><p className="text-xs font-extrabold leading-5 text-forest/70">Finish all three steps, then share your work with a grown-up.</p></div><button type="button" onClick={submitHomework} disabled={(homeworkChecks[activeHomework.id]?.length ?? 0) < activeHomework.tasks.length || completedHomework.includes(activeHomework.id)} className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-black transition-all ${completedHomework.includes(activeHomework.id) ? "bg-mint text-mint-dark" : "bg-forest text-cream hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35"}`}>{completedHomework.includes(activeHomework.id) ? <><Check className="size-4" /> Turned in!</> : <>Turn it in <ArrowRight className="size-4" /></>}</button></div></div></section>
        </section>}

        {hubTab === "leaderboard" && <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-[28px] border border-forest/8 bg-cream p-5 shadow-card sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">Friendly competition</p><h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-forest">Build together, cheer each other on.</h2><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-forest/55">Compare progress with approved friends using nicknames. There is more than one way to shine.</p></div><span className="grid size-12 place-items-center rounded-2xl bg-butter text-forest"><Trophy className="size-6" /></span></div>
            <div className="mt-6 grid gap-2 rounded-2xl border border-forest/8 bg-[#FBFAF3] p-2 sm:grid-cols-2" role="tablist" aria-label="Leaderboard views"><button type="button" role="tab" aria-selected={leaderboardMode === "improvement"} onClick={() => setLeaderboardMode("improvement")} className={`rounded-xl px-3 py-2.5 text-sm font-black transition-colors ${leaderboardMode === "improvement" ? "bg-berry text-white" : "text-forest/55 hover:bg-forest/5 hover:text-forest"}`}>Most improved</button><button type="button" role="tab" aria-selected={leaderboardMode === "mastery"} onClick={() => setLeaderboardMode("mastery")} className={`rounded-xl px-3 py-2.5 text-sm font-black transition-colors ${leaderboardMode === "mastery" ? "bg-berry text-white" : "text-forest/55 hover:bg-forest/5 hover:text-forest"}`}>Skill mastery</button></div>
            <div className="mt-5 space-y-2">{sortedFriends.map((friend, index) => { const isRiley = friend.name === "Riley"; const score = friend[leaderboardMode]; return <div key={friend.name} className={`flex items-center gap-3 rounded-2xl border p-3.5 ${isRiley ? "border-berry/25 bg-lilac/45" : "border-forest/8 bg-[#FBFAF3]"}`}><span className={`grid size-8 shrink-0 place-items-center rounded-xl text-sm font-black ${index === 0 ? "bg-butter text-forest" : "bg-forest/7 text-forest/55"}`}>{index + 1}</span><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${friend.color} text-sm font-black text-forest`}>{friend.initials}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-black text-forest">{friend.name}</p>{isRiley && <span className="rounded-full bg-berry px-2 py-0.5 text-[10px] font-black text-white">You</span>}</div><p className="mt-1 text-xs font-bold text-forest/45">Level {friend.level} · Exploring {friend.focus}</p></div><div className="text-right"><p className="text-lg font-black text-forest">{score}%</p><p className="text-[10px] font-black uppercase tracking-[0.08em] text-forest/40">{leaderboardMode === "improvement" ? "growth" : "mastery"}</p></div>{!isRiley && <button type="button" onClick={() => setChallengeSentTo(friend.name)} className="hidden rounded-xl bg-forest px-3 py-2 text-xs font-black text-cream transition-transform hover:-translate-y-0.5 sm:inline-flex">{challengeSentTo === friend.name ? "Sent" : "Challenge"}</button>}</div>; })}</div>
            <p className="mt-5 text-xs font-bold text-forest/45">Your place: #{sortedFriends.findIndex((friend) => friend.name === "Riley") + 1} of {sortedFriends.length} approved friends</p>
          </section>
          <aside className="flex flex-col rounded-[26px] border border-forest/8 bg-forest p-5 text-cream shadow-card sm:p-6"><span className="grid size-11 place-items-center rounded-2xl bg-mint text-forest"><Users className="size-5" /></span><h3 className="mt-5 text-xl font-black tracking-[-0.05em]">A fair way to compete</h3><p className="mt-2 text-sm font-semibold leading-6 text-cream/60">This preview celebrates growth and understanding, not hours online or endless streaks.</p><div className="mt-5 space-y-3 text-xs font-bold text-cream/65"><p className="flex gap-2"><Award className="size-4 shrink-0 text-butter" /> XP comes from missions, projects, debugging, and practice.</p><p className="flex gap-2"><Sparkles className="size-4 shrink-0 text-butter" /> Improvement gives every learner a way to shine.</p><p className="flex gap-2"><ShieldCheck className="size-4 shrink-0 text-mint" /> Nicknames only; real friend connections require grown-up controls.</p></div><div className="mt-auto pt-7"><div className="rounded-2xl bg-white/8 p-4"><div className="flex gap-2"><Info className="size-4 shrink-0 text-mint" /><p className="text-xs font-bold leading-5 text-cream/60">{challengeSentTo ? `Preview challenge sent to ${challengeSentTo}.` : "Choose Challenge on a friend's row to preview an async coding challenge."}</p></div></div></div></aside>
        </section>}

        {hubTab === "quiz" && <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="overflow-hidden rounded-[28px] border border-forest/8 bg-cream shadow-card"><div className="border-b border-forest/8 p-5 sm:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><span className="rounded-full bg-lilac px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-berry">Idea Quest · Quick check</span><h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-forest">Show what you discovered</h2><p className="mt-2 text-sm font-semibold text-forest/55">No trick questions. Just a chance to celebrate what stuck.</p></div><div className="flex items-center gap-2 text-sm font-black text-forest/55"><Zap className="size-4 fill-butter text-butter" /> {completedQuizAnswers}/{quizQuestions.length} answered</div></div></div><div className="p-5 sm:p-7">{quizFinished ? <div className="rounded-[24px] bg-mint/35 p-6 text-center sm:p-10"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-butter text-forest"><Trophy className="size-7" /></span><p className="mt-5 text-xs font-black uppercase tracking-[0.13em] text-mint-dark">Quick check complete</p><h3 className="mt-2 text-3xl font-black tracking-[-0.06em] text-forest">{quizScore}/{quizQuestions.length} great answers!</h3><p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-forest/65">Every answer is a clue for what to practice next. You can try again whenever you want.</p><button type="button" onClick={resetQuiz} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-forest px-5 text-sm font-black text-cream transition-transform hover:-translate-y-0.5"><Zap className="size-4" /> Try again</button></div> : <><div className="mb-6 flex items-center justify-between"><span className="text-xs font-black uppercase tracking-[0.13em] text-berry">Question {quizIndex + 1} of {quizQuestions.length}</span><div className="flex gap-1">{quizQuestions.map((_, index) => <span key={index} className={`h-2 w-9 rounded-full ${index <= quizIndex ? "bg-berry" : "bg-forest/10"}`} />)}</div></div><h3 className="max-w-2xl text-2xl font-black leading-tight tracking-[-0.045em] text-forest">{currentQuestion.question}</h3><div className="mt-6 space-y-3">{currentQuestion.options.map((option, index) => { const selected = quizAnswers[quizIndex] === index; return <button key={option} type="button" aria-pressed={selected} onClick={() => chooseQuizAnswer(index)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${selected ? "border-berry bg-lilac shadow-[0_3px_0_#B751A9]" : "border-forest/8 bg-[#FBFAF3] hover:border-forest/20 hover:bg-forest/4"}`}><span className={`grid size-8 shrink-0 place-items-center rounded-xl text-sm font-black ${selected ? "bg-berry text-white" : "bg-forest/7 text-forest/45"}`}>{String.fromCharCode(65 + index)}</span><span className="text-sm font-black text-forest/75">{option}</span>{selected && <Check className="ml-auto size-4 text-berry" strokeWidth={3} />}</button>; })}</div><div className="mt-7 flex justify-end"><button type="button" disabled={quizAnswers[quizIndex] === undefined} onClick={advanceQuiz} className="inline-flex h-11 items-center gap-2 rounded-xl bg-forest px-5 text-sm font-black text-cream transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35">{quizIndex === quizQuestions.length - 1 ? "Check my answers" : "Next question"} <ArrowRight className="size-4" /></button></div></>}</div></section>
          <aside className="flex flex-col rounded-[26px] border border-forest/8 bg-cream p-5 shadow-card"><div className="flex items-start justify-between gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-forest text-mint"><ShieldCheck className="size-5" /></span><span className="rounded-full bg-butter/70 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-forest">Preview</span></div><h3 className="mt-5 text-xl font-black tracking-[-0.05em] text-forest">AI proctoring preview</h3><p className="mt-2 text-sm font-semibold leading-6 text-forest/60">A privacy-first study guard for quiz time. This demo does not use a camera, microphone, face scan, or recording.</p><div className="mt-5 rounded-2xl bg-mint/30 p-4"><div className="flex items-center gap-2.5"><span className={`grid size-8 place-items-center rounded-xl ${proctorPreview ? "bg-mint-dark text-white" : "bg-forest/8 text-forest/45"}`}>{proctorPreview ? <Eye className="size-4" /> : <Video className="size-4" />}</span><div><p className="text-sm font-black text-forest">{proctorPreview ? "Privacy check on" : "Practice mode"}</p><p className="text-xs font-bold text-forest/55">{proctorPreview ? "Only this quiz screen is in focus." : "No monitoring is running."}</p></div></div></div><button type="button" onClick={() => setProctorPreview((current) => !current)} className={`mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-black transition-colors ${proctorPreview ? "bg-mint text-mint-dark" : "bg-forest text-cream hover:bg-forest-light"}`}>{proctorPreview ? <><Check className="size-4" /> Turn off preview</> : <><ShieldCheck className="size-4" /> See privacy check</>}</button><div className="mt-auto border-t border-forest/8 pt-5"><p className="flex items-start gap-2 text-xs font-bold leading-5 text-forest/45"><Info className="mt-0.5 size-3.5 shrink-0" /> Real proctoring would need clear parent permission, a separate privacy review, and a secure server design before launch.</p></div></aside>
        </section>}
      </div>
    </div>
  );
}
