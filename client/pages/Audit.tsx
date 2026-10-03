import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  FileSearch,
  Flag,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Plus,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const modes = [
  { label: "Make a plan", description: "Choose the idea" },
  { label: "Check the app", description: "Find clues" },
  { label: "Look inside", description: "Check the code" },
];

const sections = [
  {
    number: "01",
    title: "What are we making?",
    kicker: "Start with the big idea",
    icon: Target,
    color: "bg-mint",
    checks: ["What are we solving?", "Who is it for?", "What is the first win?"],
    fact: "LittleMinds helps curious kids turn small coding ideas into games, stories, and confidence.",
    observation: "The home page explains that idea and sends kids straight to their first lesson.",
    risk: "We do not know yet if a kid can come back later and find their work.",
    recommendation: "Ask kids to finish the first lesson, then ask what made them want to come back.",
  },
  {
    number: "02",
    title: "How is the app shaped?",
    kicker: "Know our app",
    icon: Layers3,
    color: "bg-lilac",
    checks: ["What kind of app is it?", "Do the pieces fit?", "Who owns each space?"],
    fact: "LittleMinds is a website with a public home page, a lesson room, and a small helper server.",
    observation: "We found 6 places to explore, but kids do not have a real private room yet.",
    risk: "Calling the lesson room private would promise more than the app can protect today.",
    recommendation: "Decide who gets a room, who can help in it, and what each person is allowed to see.",
  },
  {
    number: "03",
    title: "Who can do what?",
    kicker: "Give every helper a job",
    icon: Users,
    color: "bg-butter",
    checks: ["List the people who use it", "Give each person a job", "Try the doors they should not open"],
    fact: "A job is only real when the screen and the helper server agree about it.",
    observation: "Right now, anyone who knows the address can open every page; there are no different people or jobs yet.",
    risk: "When private lessons or parent tools arrive, the wrong person could walk through an open door.",
    recommendation: "Name the kid, parent, and helper jobs, then make the server check every important action.",
  },
  {
    number: "04",
    title: "Which screens do we have?",
    kicker: "Find every stop",
    icon: ClipboardCheck,
    color: "bg-coral/20",
    checks: ["List all the app stops", "Plan for slow or missing stuff", "Give the main path a finish"],
    fact: "People need more than a home page to have a good time in an app.",
    observation: "We found home, lesson, checkup, parent/story placeholders, and a lost-page screen; log in, settings, and help are not built.",
    risk: "A kid may get stuck when the internet is slow, something is missing, or they need to start over.",
    recommendation: "Draw the missing screens for login, help, slow internet, and empty rooms before inviting real families.",
  },
  {
    number: "05",
    title: "What can we save?",
    kicker: "Follow our stuff",
    icon: FileSearch,
    color: "bg-mint",
    checks: ["Make new stuff safely", "Find saved stuff", "Change or delete it safely"],
    fact: "A save button is not finished until saved work can be found, changed, and safely removed.",
    observation: "The app does not save lessons, projects, or checkup notes yet; they live only while this page is open.",
    risk: "Refreshing the page can erase a kid’s progress and a team’s notes.",
    recommendation: "Start by saving lesson progress, and decide who owns it, how it changes, and how it can be removed.",
  },
  {
    number: "06",
    title: "How do we get started?",
    kicker: "Help kids find the first win",
    icon: Sparkles,
    color: "bg-lilac",
    checks: ["Name the first happy moment", "Show how far we are", "Never leave a blank screen"],
    fact: "The best welcome gets a kid to a fun first win quickly.",
    observation: "The home page opens the lesson room with progress, an editor, and a clear finish button.",
    risk: "If a kid leaves, there is no saved welcome, way back in, or handoff to a parent.",
    recommendation: "Keep the first lesson open without signup, then offer a parent account after the first win.",
  },
  {
    number: "07",
    title: "How do pages talk?",
    kicker: "Keep the back room safe",
    icon: BarChart3,
    color: "bg-butter",
    checks: ["The server checks who is asking", "The server checks the message", "Oops messages stay friendly"],
    fact: "A screen can hide a button, but only the helper server can really check who is asking.",
    observation: "The helper server only has 2 demo messages; lesson edits and checkup notes never travel to it.",
    risk: "There is no real lock, message check, or safe “something went wrong” plan yet.",
    recommendation: "Build the first real server message with a people check, a message check, and a friendly error.",
  },
  {
    number: "08",
    title: "Where does saved stuff live?",
    kicker: "Make data trustworthy",
    icon: Layers3,
    color: "bg-coral/20",
    checks: ["Saved things fit together", "Nothing gets half-saved", "The app can grow safely"],
    fact: "Saved work should never disappear halfway through or belong to the wrong person.",
    observation: "There is no storage box or save plan in the code yet.",
    risk: "Progress, parent permission, and checkup notes would have nowhere trustworthy to live.",
    recommendation: "Draw the first storage boxes for kids, lessons, progress, and notes before saving real data.",
  },
  {
    number: "09",
    title: "Can we keep it safe?",
    kicker: "Check the safety locks",
    icon: ShieldCheck,
    color: "bg-mint",
    checks: ["Only the right people get in", "Our building blocks are safe", "The app closes the door safely"],
    fact: "Safety means locked doors, trusted building blocks, and a good plan for surprises—not just a login.",
    observation: "We have not tested private rooms, expired logins, building blocks, or the app’s safety settings yet.",
    risk: "Putting kid information here before those tests pass would be a big stop sign.",
    recommendation: "Try every safety door, check every building block, and write down what happens when something goes wrong.",
  },
  {
    number: "10",
    title: "How do we care for data?",
    kicker: "Protect kid privacy",
    icon: LockKeyhole,
    color: "bg-lilac",
    checks: ["Know what we collect", "Let people take it back", "Ask a grown-up first"],
    fact: "Saying “delete my data” only counts when the data really disappears.",
    observation: "The app does not collect account data yet, but kids mean a grown-up should help decide what we keep.",
    risk: "Collecting names or activity without a clear grown-up yes and delete button could hurt trust.",
    recommendation: "Choose the smallest amount of data, ask a grown-up first, and prove it can be deleted.",
  },
  {
    number: "11",
    title: "Will it stay quick?",
    kicker: "Keep it speedy",
    icon: BarChart3,
    color: "bg-butter",
    checks: ["Try it on a real connection", "Give slow moments a plan", "Keep big lists speedy"],
    fact: "The app should still feel helpful when the internet is having a slow day.",
    observation: "The first download is about 600 kB and the build asks us to make it smaller; no speed goal is written down.",
    risk: "Adding more rooms and tools could make the first lesson feel slow on school or mobile internet.",
    recommendation: "Pick a speed goal, load big rooms only when needed, and try the lesson on a slow connection.",
  },
  {
    number: "12",
    title: "Can everyone use it?",
    kicker: "Make every path work",
    icon: Users,
    color: "bg-coral/20",
    checks: ["Try it without a mouse", "Say changes out loud", "Explain mistakes clearly"],
    fact: "Everyone should be able to use the app with the tools that work best for them.",
    observation: "We use buttons, links, and a labeled typing box, but we have not tried the app with a keyboard or screen reader.",
    risk: "A kid might not hear that their code ran or know where the next button went.",
    recommendation: "Try every path without a mouse, announce changes out loud, and explain mistakes clearly.",
  },
  {
    number: "13",
    title: "What should we notice?",
    kicker: "Notice the good stuff",
    icon: BarChart3,
    color: "bg-mint",
    checks: ["Notice the big moments", "Spot when things break", "Connect clues to the journey"],
    fact: "Good clues tell us when kids are having fun and when the app needs help.",
    observation: "We do not count lesson starts, code runs, finished lessons, or broken moments yet.",
    risk: "We cannot tell which part feels great or where kids get stuck.",
    recommendation: "Choose a few helpful clues to count, and ask a grown-up before collecting them.",
  },
  {
    number: "14",
    title: "Did we try it for real?",
    kicker: "Test the happy path",
    icon: ClipboardCheck,
    color: "bg-lilac",
    checks: ["Test little pieces", "Try the whole journey", "Try the safety doors"],
    fact: "Trying the app ourselves helps us catch surprises before real kids do.",
    observation: "Five tiny helper tests pass, but nobody has yet tested a whole lesson, a keyboard path, or a locked door.",
    risk: "A change could quietly break the fun lesson or let the wrong person through.",
    recommendation: "Test the first lesson from start to finish, try it without a mouse, and try the doors that should stay closed.",
  },
  {
    number: "15",
    title: "What needs fixing first?",
    kicker: "Pick the important stuff",
    icon: Flag,
    color: "bg-coral/20",
    checks: ["Name how big each problem is", "Point to the clue", "Fix big problems first"],
    fact: "It is better to say “we do not know yet” than to make a lucky guess.",
    observation: "We have finished 4 of 16 checkups, so this number is a progress hint—not a ready-to-launch badge.",
    risk: "A shiny score could hide the things we have not checked, like saving, privacy, and locked doors.",
    recommendation: "Keep unknowns visible, mark big problems first, and give every fix a helper.",
  },
  {
    number: "16",
    title: "What do we do next?",
    kicker: "Make the next-step list",
    icon: ArrowRight,
    color: "bg-butter",
    checks: ["Give every fix a helper", "Put steps in order", "Choose: ready or keep building"],
    fact: "A checkup should end with a short list of what to try next.",
    observation: "Our next big steps are private rooms, saved progress, kid privacy, a safe helper server, and whole-journey tests.",
    risk: "Sending the pretty prototype out too soon could make a fun idea hard to trust.",
    recommendation: "Make a 30-day list, choose a helper for each step, and check each one before launch day.",
  },
];

const scorecard = ["Big idea", "Easy to use", "Helpful features", "App pieces", "Safety", "Everyone can use it", "Speed", "Trust", "Helpful clues", "Testing", "Room to grow"];

type ModeIndex = 0 | 1 | 2;

export default function Audit() {
  const [modeIndex, setModeIndex] = useState<ModeIndex>(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviewed, setReviewed] = useState<number[]>([1, 3, 5, 8]);
  const [checked, setChecked] = useState<Record<number, number[]>>({ 0: [0], 2: [0, 1], 4: [0] });
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [isShared, setIsShared] = useState(false);

  const activeSection = sections[activeIndex];
  const ActiveIcon = activeSection.icon;
  const readiness = Math.round((reviewed.length / sections.length) * 100);
  const activeChecks = checked[activeIndex] ?? [];
  const checkedCount = useMemo(() => Object.values(checked).flat().length, [checked]);

  const toggleReview = () => {
    setReviewed((current) => current.includes(activeIndex) ? current.filter((index) => index !== activeIndex) : [...current, activeIndex]);
  };

  const toggleCheck = (checkIndex: number) => {
    setChecked((current) => {
      const existing = current[activeIndex] ?? [];
      const next = existing.includes(checkIndex) ? existing.filter((index) => index !== checkIndex) : [...existing, checkIndex];
      return { ...current, [activeIndex]: next };
    });
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#F7F6EE] px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-berry">Our app checkup</p>
            <div className="mt-2 flex items-center gap-3"><h1 className="text-3xl font-black tracking-[-0.06em] text-forest sm:text-4xl">App checkup studio</h1><span className="hidden rounded-full bg-mint px-3 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-mint-dark sm:inline-flex">In progress</span></div>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-forest/60 sm:text-base">We’re looking at LittleMinds together to find what works, what needs help, and what to try next.</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-black text-forest/55"><span className="rounded-full bg-forest/6 px-3 py-1.5">Clues from our code</span><span>6 places to explore</span><span className="text-forest/25">•</span><span>2 server clues</span><span className="text-forest/25">•</span><span>Nothing saved yet</span></div>
          </div>
          <div className="flex items-center gap-2"><button type="button" onClick={() => setIsShared((shared) => !shared)} className={`inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-black transition-colors ${isShared ? "border-mint-dark/20 bg-mint text-mint-dark" : "border-forest/10 bg-cream text-forest hover:bg-forest/5"}`}>{isShared ? <Check className="size-4" strokeWidth={3} /> : <MessageSquareText className="size-4" />} {isShared ? "Ready to show" : "Show a grown-up"}</button><button type="button" onClick={() => setReviewed([])} className="inline-flex h-11 items-center gap-2 rounded-xl bg-forest px-4 text-sm font-black text-cream shadow-[0_4px_0_#0c241e] transition-transform hover:-translate-y-0.5"><Plus className="size-4" /> Start over</button></div>
        </div>

        <div className="mt-6 rounded-[22px] border border-forest/8 bg-[#F5E6FF] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">How to use this page</p><p className="mt-1 text-sm font-extrabold text-forest">Pick a checkup, look for clues, then mark it done.</p></div><div className="grid gap-2 text-xs font-black text-forest/65 sm:grid-cols-3"><span className="rounded-xl bg-white/55 px-3 py-2"><b className="mr-1 text-berry">1.</b> Pick a stop</span><span className="rounded-xl bg-white/55 px-3 py-2"><b className="mr-1 text-berry">2.</b> Find clues</span><span className="rounded-xl bg-white/55 px-3 py-2"><b className="mr-1 text-berry">3.</b> Try a fix</span></div></div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-forest/8 bg-cream p-4 shadow-card"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[0.1em] text-forest/50">How far we are</p><Target className="size-4 text-berry" /></div><div className="mt-2 flex items-end justify-between"><p className="text-3xl font-black tracking-[-0.06em]">{readiness}%</p><p className="pb-1 text-xs font-bold text-mint-dark">Keep going!</p></div><div className="mt-3 h-1.5 rounded-full bg-forest/8"><div className="h-full rounded-full bg-berry transition-all duration-300" style={{ width: `${readiness}%` }} /></div></div>
          <div className="rounded-2xl border border-forest/8 bg-cream p-4 shadow-card"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[0.1em] text-forest/50">Clues collected</p><ClipboardCheck className="size-4 text-mint-dark" /></div><p className="mt-2 text-3xl font-black tracking-[-0.06em]">{checkedCount}<span className="text-lg text-forest/35">/48</span></p><p className="mt-2 text-xs font-bold text-forest/50">{reviewed.length} checkups finished</p></div>
          <div className="rounded-2xl border border-forest/8 bg-cream p-4 shadow-card"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[0.1em] text-forest/50">Questions left</p><TriangleAlert className="size-4 text-coral" /></div><p className="mt-2 text-3xl font-black tracking-[-0.06em]">09</p><p className="mt-2 text-xs font-bold text-coral">Things to fix</p></div>
          <div className="rounded-2xl border border-forest/8 bg-cream p-4 shadow-card"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[0.1em] text-forest/50">What we looked at</p><Sparkles className="size-4 text-butter" /></div><p className="mt-2 text-3xl font-black tracking-[-0.06em]">Our code</p><p className="mt-2 text-xs font-bold text-forest/50">Screens + server</p></div>
        </div>

        <div className="mt-6 rounded-[22px] border border-forest/8 bg-cream p-2 shadow-card sm:p-2.5">
          <div className="grid gap-1 sm:grid-cols-3">
            {modes.map((mode, index) => <button key={mode.label} type="button" onClick={() => setModeIndex(index as ModeIndex)} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${modeIndex === index ? "bg-forest text-cream" : "hover:bg-forest/5"}`}><span className={`grid size-8 place-items-center rounded-xl text-xs font-black ${modeIndex === index ? "bg-butter text-forest" : "bg-forest/7 text-forest/50"}`}>{index + 1}</span><span><span className="block text-sm font-black">{mode.label}</span><span className={`block text-xs font-bold ${modeIndex === index ? "text-cream/55" : "text-forest/45"}`}>{mode.description}</span></span></button>)}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-[24px] border border-forest/8 bg-cream p-3 shadow-card lg:h-fit">
            <div className="flex items-center justify-between px-3 pb-3 pt-2"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-berry">{modes[modeIndex].label}</p><p className="mt-1 text-sm font-black text-forest">16 little checkups</p></div><FileSearch className="size-5 text-forest/35" /></div>
            <div className="max-h-[560px] space-y-1 overflow-y-auto pr-1">
              {sections.map((section, index) => { const Icon = section.icon; const isSelected = index === activeIndex; const isReviewed = reviewed.includes(index); return <button key={section.title} type="button" onClick={() => setActiveIndex(index)} className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors ${isSelected ? "bg-berry text-white" : "hover:bg-forest/5"}`}><span className={`grid size-9 shrink-0 place-items-center rounded-xl ${isSelected ? "bg-white/15" : section.color}`}><Icon className={`size-4 ${isSelected ? "text-white" : "text-forest"}`} /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-black">{section.title}</span><span className={`block truncate text-[11px] font-bold ${isSelected ? "text-white/55" : "text-forest/45"}`}>{section.kicker}</span></span><span className={`grid size-5 place-items-center rounded-full text-[10px] font-black ${isReviewed ? isSelected ? "bg-mint text-mint-dark" : "bg-mint text-mint-dark" : isSelected ? "border border-white/25 text-white/60" : "border border-forest/15 text-forest/35"}`}>{isReviewed ? <Check className="size-3" strokeWidth={3} /> : section.number.slice(-1)}</span></button>; })}
            </div>
          </aside>

          <section className="min-w-0 rounded-[24px] border border-forest/8 bg-cream shadow-card">
            <div className="border-b border-forest/8 p-5 sm:p-7"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start"><div className="flex gap-3"><span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${activeSection.color}`}><ActiveIcon className="size-6 text-forest" /></span><div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">Checkup {activeSection.number} / 16</p><h2 className="mt-1 text-2xl font-black tracking-[-0.05em] text-forest sm:text-3xl">{activeSection.title}</h2><p className="mt-1 text-sm font-semibold text-forest/55">{activeSection.kicker}</p></div></div><button type="button" onClick={toggleReview} className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-black transition-colors ${reviewed.includes(activeIndex) ? "bg-mint text-mint-dark" : "bg-forest text-cream hover:bg-forest-light"}`}>{reviewed.includes(activeIndex) ? <Check className="size-4" strokeWidth={3} /> : <ClipboardCheck className="size-4" />} {reviewed.includes(activeIndex) ? "Checkup done" : "Mark done"}</button></div></div>

            <div className="p-5 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["What we know", activeSection.fact, "bg-[#EEF9F2]", "text-mint-dark"],
                  ["What we noticed", activeSection.observation, "bg-[#F5E6FF]", "text-berry"],
                  ["What could go wrong", activeSection.risk, "bg-[#FFF0EC]", "text-coral"],
                  ["What to try next", activeSection.recommendation, "bg-[#FFF7D9]", "text-[#A16C00]"],
                ].map(([label, copy, color, labelColor]) => <article key={label} className={`rounded-2xl p-4 ${color}`}><p className={`text-[11px] font-black uppercase tracking-[0.12em] ${labelColor}`}>{label}</p><p className="mt-2 text-sm font-bold leading-6 text-forest/70">{copy}</p></article>)}
              </div>

              <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_280px]">
                <div><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.13em] text-forest/45">Clue checklist</p><h3 className="mt-1 text-lg font-black tracking-[-0.03em] text-forest">What did we find?</h3></div><span className="text-xs font-black text-berry">{activeChecks.length}/{activeSection.checks.length} done</span></div><div className="mt-4 space-y-2">{activeSection.checks.map((check, index) => <button key={check} type="button" aria-pressed={activeChecks.includes(index)} onClick={() => toggleCheck(index)} className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${activeChecks.includes(index) ? "border-mint-dark/15 bg-mint/30" : "border-forest/8 bg-[#FBFAF3] hover:bg-forest/4"}`}><span className={`grid size-6 shrink-0 place-items-center rounded-lg ${activeChecks.includes(index) ? "bg-mint-dark text-white" : "border border-forest/15 text-transparent"}`}><Check className="size-3.5" strokeWidth={3} /></span><span className={`text-sm font-bold ${activeChecks.includes(index) ? "text-forest" : "text-forest/65"}`}>{check}</span></button>)}</div></div>
                <div><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.13em] text-forest/45">Your note</p><h3 className="mt-1 text-lg font-black tracking-[-0.03em] text-forest">Write it down</h3></div><MessageSquareText className="size-4 text-forest/35" /></div><textarea aria-label={`Your note for ${activeSection.title}`} value={notes[activeIndex] ?? ""} onChange={(event) => setNotes((current) => ({ ...current, [activeIndex]: event.target.value }))} placeholder="What did you notice?" className="mt-4 min-h-[142px] w-full resize-none rounded-2xl border border-forest/8 bg-[#FBFAF3] p-3.5 text-sm font-semibold leading-6 text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-berry/40 focus:ring-2 focus:ring-berry/10" /><p className="mt-2 text-[11px] font-bold text-forest/40">Your note stays on this page for now.</p></div>
              </div>

              {activeIndex === 14 && <div className="mt-7 rounded-2xl border border-forest/8 bg-forest p-5 text-cream"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-butter">How ready is it?</p><h3 className="mt-1 text-lg font-black">Count clues before a score</h3></div><span className="rounded-full bg-cream/10 px-3 py-1 text-xs font-black text-cream/60">Not scored yet</span></div><div className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">{scorecard.map((item) => <div key={item} className="flex items-center justify-between border-b border-cream/10 py-2 text-xs font-bold"><span className="text-cream/70">{item}</span><span className="font-mono text-cream/35">— /10</span></div>)}</div></div>}

              <div className="mt-7 flex flex-col justify-between gap-4 border-t border-forest/8 pt-5 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-xs font-bold text-forest/45"><span className="size-2 rounded-full bg-mint-dark" /> Saved on this page</p><div className="flex items-center justify-between gap-3 sm:justify-end"><button type="button" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => Math.max(0, index - 1))} className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-black text-forest/55 transition-colors hover:bg-forest/5 disabled:cursor-not-allowed disabled:opacity-30">Back</button><button type="button" onClick={() => setActiveIndex((index) => Math.min(sections.length - 1, index + 1))} className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-forest px-4 text-sm font-black text-cream transition-transform hover:-translate-y-0.5">Next checkup <ArrowRight className="size-4" /></button></div></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
