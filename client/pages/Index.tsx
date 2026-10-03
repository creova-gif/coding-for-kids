import {
  ArrowRight,
  Check,
  Code2,
  Heart,
  Lightbulb,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const pathways = [
  {
    number: "01",
    title: "Imagine",
    copy: "Follow a question through stories, puzzles, and tiny experiments.",
    color: "bg-mint",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Make",
    copy: "Turn a big idea into a game, story, animation, or invention.",
    color: "bg-lilac",
    icon: Code2,
  },
  {
    number: "03",
    title: "Solve",
    copy: "Try, change, and discover what your idea can do next.",
    color: "bg-butter",
    icon: Rocket,
  },
];

const skills = [
  { name: "Build games", color: "bg-coral", symbol: "◆" },
  { name: "Tell stories", color: "bg-berry", symbol: "✦" },
  { name: "Solve puzzles", color: "bg-mint-dark", symbol: "○" },
];

export default function Index() {
  const [selectedSkill, setSelectedSkill] = useState(0);

  return (
    <div>
      <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-24 lg:pb-28 lg:pt-20">
        <div className="absolute -left-20 top-10 size-72 rounded-full bg-mint/45 blur-3xl" />
        <div className="absolute right-[-7rem] top-16 size-80 rounded-full bg-lilac/55 blur-3xl" />
        <div className="absolute bottom-10 left-[45%] size-48 rounded-full bg-butter/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-[650px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-cream/80 py-2 pl-2 pr-4 text-sm font-extrabold text-forest/75 shadow-sm">
              <span className="grid size-7 place-items-center rounded-full bg-butter text-forest"><Sparkles className="size-4" /></span>
              A creative playground for curious kids
            </div>
            <h1 className="mt-7 text-[clamp(3.35rem,7vw,6.5rem)] font-black leading-[0.91] tracking-[-0.075em] text-forest">
              Little minds. Big <span className="relative inline-block text-berry">ideas<span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-butter" /></span>.
            </h1>
            <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-forest/67 sm:text-xl">
              A playful place for curious kids to explore, create, solve challenges, and turn their biggest ideas into something amazing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/onboarding" className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-forest px-7 text-base font-black text-cream shadow-[0_5px_0_#0c241e] transition-all hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-[0_7px_0_#0c241e]">
                Start exploring <ArrowRight className="size-5" />
              </Link>
              <Link to="/about" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-forest/12 bg-cream/70 px-6 text-base font-black text-forest transition-colors hover:bg-forest/6">
                <span className="grid size-7 place-items-center rounded-full bg-coral text-white"><Play className="ml-0.5 size-3.5 fill-current" /></span>
                See how it works
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold text-forest/60">
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-mint-dark" strokeWidth={3} /> No experience needed</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-mint-dark" strokeWidth={3} /> Made for growing minds</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px] lg:mr-0">
            <div className="absolute -right-5 -top-5 grid size-[76px] place-items-center rounded-[25px] bg-butter text-forest shadow-[0_7px_0_#E9A52F] sm:-right-9 sm:-top-8"><Star className="size-9 fill-coral text-coral" /></div>
            <div className="absolute -bottom-7 -left-4 z-20 rounded-2xl bg-cream px-4 py-3 shadow-float sm:-left-10"><div className="flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl bg-mint text-mint-dark"><Heart className="size-4 fill-current" /></span><div><p className="text-xs font-bold text-forest/55">Today’s idea</p><p className="text-sm font-black">+15 stars!</p></div></div></div>
            <div className="relative overflow-hidden rounded-[38px] border-[7px] border-forest bg-forest p-4 shadow-[0_12px_0_#0D2821] sm:p-5">
              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2.5 text-xs font-black text-cream/75">
                <span className="flex items-center gap-2"><span className="flex gap-1"><i className="block size-2 rounded-full bg-coral" /><i className="block size-2 rounded-full bg-butter" /><i className="block size-2 rounded-full bg-mint" /></span> LittleMinds lab</span>
                <span className="rounded-md bg-mint/20 px-2 py-1 text-mint">saved</span>
              </div>
              <div className="mt-4 rounded-[22px] bg-[#FFFBEF] p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">Today’s mission</p><h2 className="mt-2 text-2xl font-black tracking-[-0.05em] text-forest">Grow a hello garden</h2></div><span className="grid size-11 place-items-center rounded-2xl bg-lilac text-berry"><Sparkles className="size-5" /></span></div>
                <div className="mt-6 rounded-2xl bg-[#122A24] p-4 font-mono text-[13px] font-bold leading-7 text-[#DFFBEC] shadow-[0_4px_0_#091A16]">
                  <p><span className="text-mint">let</span> seed <span className="text-white">=</span> <span className="text-butter">"sunflower"</span></p>
                  <p className="text-white/50">plant(seed)</p>
                  <p className="mt-2 text-mint">🌻 Hello, sunshine!</p>
                </div>
                <div className="mt-5 flex items-center justify-between"><div className="flex -space-x-2"><span className="grid size-8 place-items-center rounded-full border-2 border-[#FFFBEF] bg-coral text-xs font-black text-white">J</span><span className="grid size-8 place-items-center rounded-full border-2 border-[#FFFBEF] bg-berry text-xs font-black text-white">A</span><span className="grid size-8 place-items-center rounded-full border-2 border-[#FFFBEF] bg-butter text-xs font-black text-forest">S</span></div><span className="rounded-full bg-mint px-3 py-1.5 text-xs font-black text-mint-dark">3 ideas in progress</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-forest/7 bg-cream px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm font-extrabold text-forest/60 sm:justify-between">
          <span>Made for the “look what I made!” moment.</span>
          <span className="hidden h-4 w-px bg-forest/15 sm:block" />
          <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-mint-dark" /> Kid-first & parent-friendly</span>
          <span className="hidden h-4 w-px bg-forest/15 md:block" />
          <span className="flex items-center gap-1.5"><Sparkles className="size-4 text-coral" /> Tiny wins, every lesson</span>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-berry">More than a lesson</p>
            <h2 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.065em] text-forest sm:text-5xl">A playground for big ideas.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pathways.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <article key={pathway.title} className="group rounded-[28px] border border-forest/8 bg-cream p-6 shadow-card transition-transform duration-200 hover:-translate-y-1 sm:p-7">
                  <div className="flex items-start justify-between"><span className={`grid size-12 place-items-center rounded-2xl ${pathway.color} text-forest`}><Icon className="size-6" /></span><span className="font-mono text-sm font-black text-forest/30">{pathway.number}</span></div>
                  <h3 className="mt-9 text-2xl font-black tracking-[-0.05em] text-forest">{pathway.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-forest/63">{pathway.copy}</p>
                  <div className="mt-7 flex size-9 items-center justify-center rounded-full bg-forest/6 text-forest transition-all group-hover:bg-forest group-hover:text-cream"><ArrowRight className="size-4" /></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-forest px-5 py-20 text-cream sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-butter">Games for growing minds</p>
            <h2 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.065em] sm:text-5xl">Every game is a new way to think.</h2>
            <p className="mt-6 max-w-md text-lg font-semibold leading-8 text-cream/67">The game kids discover here is one of many playful challenges designed to sharpen thinking, build problem-solving skills, and make learning feel like play.</p>
            <Link to="/learn" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-butter px-6 text-sm font-black text-forest transition-transform hover:-translate-y-0.5">Explore the game collection <ArrowRight className="size-4" /></Link>
          </div>
          <div className="rounded-[30px] bg-cream/8 p-4 sm:p-6">
            <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Creative skills">
              {skills.map((skill, index) => (
                <button key={skill.name} type="button" role="tab" aria-selected={index === selectedSkill} onClick={() => setSelectedSkill(index)} className={`rounded-full px-4 py-2 text-sm font-black transition-colors ${index === selectedSkill ? "bg-cream text-forest" : "bg-white/8 text-cream/60 hover:bg-white/12"}`}>{skill.name}</button>
              ))}
            </div>
            <div className="mt-5 grid min-h-[300px] items-center rounded-[24px] bg-[#F6ECD4] p-6 text-forest sm:grid-cols-[1fr_1.15fr] sm:p-8">
              <div><span className={`grid size-14 place-items-center rounded-2xl ${skills[selectedSkill].color} text-2xl font-black text-white`}>{skills[selectedSkill].symbol}</span><p className="mt-5 text-sm font-black uppercase tracking-[0.12em] text-berry">Creative mission</p><h3 className="mt-2 text-3xl font-black leading-none tracking-[-0.06em]">{selectedSkill === 0 ? "Build a bounce game" : selectedSkill === 1 ? "Create a moon story" : "Crack the secret map"}</h3><p className="mt-4 text-sm font-semibold leading-6 text-forest/65">{selectedSkill === 0 ? "Make a character leap, score stars, and celebrate every landing." : selectedSkill === 1 ? "Use code to animate your own cast of night-time characters." : "Use clues, patterns, and logic to reach the treasure chest."}</p></div>
              <div className="relative mt-8 h-[180px] overflow-hidden rounded-[20px] bg-forest sm:mt-0"><div className="absolute inset-x-0 bottom-0 h-1/4 bg-mint-dark" /><div className={`absolute left-1/2 top-8 grid size-20 -translate-x-1/2 place-items-center rounded-[26px] ${skills[selectedSkill].color} text-4xl text-white shadow-[0_7px_0_rgba(0,0,0,.18)]`}><span>{selectedSkill === 0 ? "▴" : selectedSkill === 1 ? "☾" : "?"}</span></div><i className="absolute left-[18%] top-[25%] block size-2 rounded-full bg-butter" /><i className="absolute right-[20%] top-[18%] block size-3 rounded-full bg-lilac" /><i className="absolute right-[13%] top-[45%] block size-2 rounded-full bg-coral" /><div className="absolute bottom-4 left-5 rounded-xl bg-cream/15 px-3 py-2 font-mono text-[10px] font-bold text-cream/75">mission in progress...</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-7 sm:px-8 sm:py-9">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 rounded-[26px] bg-butter px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-forest text-butter"><ShieldCheck className="size-5" /></span><div><p className="text-xs font-black uppercase tracking-[0.12em] text-forest/55">For curious makers</p><p className="mt-1 text-base font-black tracking-[-0.02em] text-forest sm:text-lg">Find clues, make thoughtful fixes, and build with care.</p></div></div>
          <Link to="/audit" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-5 text-sm font-black text-cream transition-transform hover:-translate-y-0.5">Build with care <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-[980px] rounded-[34px] bg-lilac px-6 py-14 text-center sm:px-12 sm:py-20">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-berry text-white shadow-[0_5px_0_#813779]"><Sparkles className="size-7" /></span>
          <h2 className="mx-auto mt-7 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.065em] text-forest sm:text-5xl">Their next big idea starts here.</h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-forest/65 sm:text-lg">One small project can grow into a whole new way of seeing what they can imagine and do.</p>
          <Link to="/onboarding" className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-forest px-7 text-base font-black text-cream shadow-[0_5px_0_#0c241e] transition-all hover:-translate-y-0.5">Start exploring <ArrowRight className="size-5" /></Link>
        </div>
      </section>
    </div>
  );
}
