export type MsimboLanguage = "en" | "sw";

export type MsimboMissionCopy = {
  title: string;
  story: string;
  goal: string;
  hint: string;
};

export type MsimboCheck = {
  minSay?: number;
  minMove?: number;
  minMoveRight?: number;
  requireIf?: boolean;
  sayIncludes?: string;
};

export type MsimboMission = {
  id: number;
  emoji: string;
  concept: string;
  en: MsimboMissionCopy;
  sw: MsimboMissionCopy;
  check: MsimboCheck;
};

export const msimboUi = {
  en: {
    hint: "Hint",
    run: "Run",
    ready: "Ready.",
    ok: "Yes! Mission complete. ",
    almost: "Almost. Try the hint.",
    broke: "Something in the blocks broke.",
    aiOff: "AI hints are turned off for this class.",
    englishOnly: "EN only",
    aiOffLabel: "AI off",
  },
  sw: {
    hint: "Kidokezo",
    run: "Endesha",
    ready: "Tayari.",
    ok: "Hongera! Umefaulu. ",
    almost: "Karibu! Jaribu kidokezo.",
    broke: "Kosa katika vitalu.",
    aiOff: "AI imezimwa na mwalimu wa darasa.",
    englishOnly: "Kiingereza tu",
    aiOffLabel: "AI imezimwa",
  },
} as const;

export const msimboMissions: MsimboMission[] = [
  {
    id: 1,
    emoji: "🚌",
    concept: "sequence",
    en: { title: "Karibu Arusha", story: "The bajaj is at the Clock Tower. Make it greet Arusha in two languages.", goal: "Say two greetings", hint: "Use two yellow Say blocks under When run." },
    sw: { title: "Karibu Arusha", story: "Bajaj iko Clock Tower. Iambie isalimie Arusha kwa lugha mbili.", goal: "Salamu mbili", hint: "Tumia vitalu viwili vya Sema chini ya Anza." },
    check: { minSay: 2 },
  },
  {
    id: 2,
    emoji: "🍌",
    concept: "repeat",
    en: { title: "Count the bananas", story: "Mama mboga has bananas. Count them out loud three times.", goal: "Repeat a say 3 times", hint: "Wrap Say inside Repeat 3 times." },
    sw: { title: "Hesabu ndizi", story: "Mama mboga ana ndizi. Hesabu kwa sauti mara tatu.", goal: "Sema mara 3", hint: "Weka Sema ndani ya Rudia mara 3." },
    check: { minSay: 3 },
  },
  {
    id: 3,
    emoji: "🚌",
    concept: "move",
    en: { title: "Bajaj to Njiro", story: "Drive the bajaj right toward Njiro.", goal: "Move right at least twice", hint: "Two Move right blocks, or Repeat 2 times." },
    sw: { title: "Bajaj kwenda Njiro", story: "Endesha bajaj kulia kuelekea Njiro.", goal: "Sogea kulia mara 2", hint: "Sogea kulia mara mbili." },
    check: { minMoveRight: 2 },
  },
  {
    id: 4,
    emoji: "🌧️",
    concept: "if",
    en: { title: "Too much rain?", story: "If it is raining, say chukua mwavuli (take an umbrella).", goal: "Use an if block", hint: "If-block with a true value, then Say." },
    sw: { title: "Mvua nyingi?", story: "Kama inanyesha, sema chukua mwavuli.", goal: "Tumia kama", hint: "Kitalu cha kama + Sema." },
    check: { requireIf: true, minSay: 1 },
  },
  {
    id: 5,
    emoji: "🦒",
    concept: "loop+counter",
    en: { title: "Giraffe count", story: "At the park gate, count four giraffes.", goal: "Repeat 4 times", hint: "Repeat 4 + Say giraffe." },
    sw: { title: "Hesabu twiga", story: "Langoni la hifadhi, hesabu twiga wanne.", goal: "Rudia 4", hint: "Rudia 4 + Sema twiga." },
    check: { minSay: 4 },
  },
  {
    id: 6,
    emoji: "🏔️",
    concept: "nested-loop-lite",
    en: { title: "Kilimanjaro steps", story: "Climb in three short steps. Each step is a move.", goal: "Move three times", hint: "Repeat 3 times: Move." },
    sw: { title: "Ngazi za Kilimanjaro", story: "Panda hatua tatu fupi.", goal: "Sogea mara 3", hint: "Rudia 3: Sogea." },
    check: { minMove: 3 },
  },
  {
    id: 7,
    emoji: "🔔",
    concept: "events",
    en: { title: "School bell", story: "When the program runs, the class says Tumeanza!", goal: "One clear greeting", hint: "When run → Say Tumeanza!" },
    sw: { title: "Kengele ya shule", story: "Programu inapoanza, darasa lasema Tumeanza!", goal: "Salamu moja", hint: "Anza → Sema Tumeanza!" },
    check: { minSay: 1 },
  },
  {
    id: 8,
    emoji: "🔐",
    concept: "compare",
    en: { title: "Password gate", story: "The gate opens only if you say the secret word open.", goal: "Say the word open", hint: "Say block with the text open." },
    sw: { title: "Lango la nenosiri", story: "Lango linafunguka ukisema neno open.", goal: "Sema open", hint: "Sema neno open." },
    check: { sayIncludes: "open" },
  },
  {
    id: 9,
    emoji: "🧮",
    concept: "operators",
    en: { title: "Mama mboga change", story: "Say the change out loud at least twice (price then change).", goal: "Two say blocks", hint: "Say the price, then say the change." },
    sw: { title: "Chenji ya mama mboga", story: "Sema bei na chenji.", goal: "Sema mara 2", hint: "Sema bei, kisha chenji." },
    check: { minSay: 2 },
  },
  {
    id: 10,
    emoji: "🥾",
    concept: "nested-repeat",
    en: { title: "Two camps", story: "Walk two stages up the mountain. Each stage has two steps.", goal: "Move at least 4 times", hint: "Repeat 2 outside, Repeat 2 inside, Move." },
    sw: { title: "Kambi mbili", story: "Panda hatua mbili, mara mbili.", goal: "Sogea mara 4", hint: "Rudia 2 nje, Rudia 2 ndani, Sogea." },
    check: { minMove: 4 },
  },
  {
    id: 11,
    emoji: "🛤️",
    concept: "else-if",
    en: { title: "Two roads", story: "At Usa River the road splits. Use if, then say which way you go.", goal: "If + say", hint: "If true, Say left or right." },
    sw: { title: "Barabara mbili", story: "Usa River barabara inagawanyika. Tumia kama, kisha sema njia.", goal: "Kama + sema", hint: "Kama kweli, Sema kushoto au kulia." },
    check: { requireIf: true, minSay: 1 },
  },
  {
    id: 12,
    emoji: "📋",
    concept: "lists-intro",
    en: { title: "Class register", story: "Call three names from the register, one after another.", goal: "Say three names", hint: "Three Say blocks, or Repeat 3." },
    sw: { title: "Rejesta ya darasa", story: "Ita majina matatu, moja baada ya jingine.", goal: "Sema majina 3", hint: "Vitalu vitatu vya Sema, au Rudia 3." },
    check: { minSay: 3 },
  },
  {
    id: 13,
    emoji: "⚽",
    concept: "list-pick",
    en: { title: "Football scores", story: "Announce the winner, then cheer twice.", goal: "Say then repeat cheer", hint: "Say the team, Repeat 2, Say goal." },
    sw: { title: "Matokeo ya mpira", story: "Tangaza mshindi, kisha shangilia mara mbili.", goal: "Sema kisha shangilia", hint: "Sema timu, Rudia 2, Sema goal." },
    check: { minSay: 3 },
  },
  {
    id: 14,
    emoji: "🌤️",
    concept: "reuse",
    en: { title: "Weather week", story: "Greet the class, then greet again as if you reused the same idea.", goal: "Say twice", hint: "Two Say blocks with a greeting." },
    sw: { title: "Hali ya hewa", story: "Salimia darasa, kisha salimia tena.", goal: "Sema mara 2", hint: "Vitalu viwili vya Sema." },
    check: { minSay: 2 },
  },
  {
    id: 15,
    emoji: "🚙",
    concept: "params-lite",
    en: { title: "Ngorongoro jeep", story: "The jeep inches forward three times around the crater rim.", goal: "Move 3 times", hint: "Repeat 3 + Move." },
    sw: { title: "Jipu la Ngorongoro", story: "Jipu inasogea hatua tatu pembezoni mwa korongo.", goal: "Sogea mara 3", hint: "Rudia 3 + Sogea." },
    check: { minMove: 3 },
  },
  {
    id: 16,
    emoji: "🐐",
    concept: "while-lite",
    en: { title: "Lost goat", story: "Keep calling the goat until you have called three times.", goal: "Say 3 times", hint: "Repeat 3 + Say mbuzi." },
    sw: { title: "Mbuzi aliyepotea", story: "Ita mbuzi hadi mara tatu.", goal: "Sema mara 3", hint: "Rudia 3 + Sema mbuzi." },
    check: { minSay: 3 },
  },
  {
    id: 17,
    emoji: "🗺️",
    concept: "coords",
    en: { title: "Market map", story: "Go right, say the stall name, go right again.", goal: "Move and talk", hint: "Move, Say, Move." },
    sw: { title: "Ramani ya soko", story: "Sogea kulia, sema jina la duka, sogea tena.", goal: "Sogea na sema", hint: "Sogea, Sema, Sogea." },
    check: { minMove: 2, minSay: 1 },
  },
  {
    id: 18,
    emoji: "❓",
    concept: "input-if",
    en: { title: "Quiz master", story: "Ask a question with Say, then use If to give the answer.", goal: "If + two says", hint: "Say the question, If, Say the answer." },
    sw: { title: "Mwalimu wa maswali", story: "Uliza swali kwa Sema, kisha Kama ili kutoa jibu.", goal: "Kama + sema 2", hint: "Sema swali, Kama, Sema jibu." },
    check: { requireIf: true, minSay: 2 },
  },
  {
    id: 19,
    emoji: "🥭",
    concept: "combine",
    en: { title: "Catch the mangoes", story: "Move to the tree, call three mangoes down.", goal: "Move + say 3", hint: "Move once, Repeat 3, Say mango." },
    sw: { title: "Shika maembe", story: "Sogea kwenye mti, ita maembe matatu.", goal: "Sogea + sema 3", hint: "Sogea mara moja, Rudia 3, Sema embe." },
    check: { minMove: 1, minSay: 3 },
  },
  {
    id: 20,
    emoji: "🌟",
    concept: "showcase",
    en: { title: "My Arusha story", story: "Tell your own short Arusha story: move, talk, and use a repeat or an if.", goal: "Move, say twice, and if or 3+ says", hint: "Combine Move, Say, and Repeat or If." },
    sw: { title: "Hadithi yangu ya Arusha", story: "Simulia hadithi fupi: sogea, sema, na tumia rudia au kama.", goal: "Sogea, sema mara 2, na kama au sema 3+", hint: "Unganisha Sogea, Sema, na Rudia au Kama." },
    check: { minMove: 1, minSay: 2 },
  },
];
