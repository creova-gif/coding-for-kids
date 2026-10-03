import {
  ArrowRight,
  Heart,
  Lightbulb,
  Puzzle,
  Sparkles,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const principles = [
  { title: "Curiosity first", copy: "Questions are not detours here. They are the beginning of every good project.", icon: Lightbulb, color: "bg-butter" },
  { title: "Small wins matter", copy: "A first line, a working button, a brave retry. We make room for all of it.", icon: Star, color: "bg-mint" },
  { title: "Make it yours", copy: "There is more than one right way to build a game, story, or idea.", icon: Puzzle, color: "bg-lilac" },
];

const chapters = [
  { number: "01", title: "A question", copy: "LittleMinds started with a simple one: what if learning felt more like making something with a friend?" },
  { number: "02", title: "A tiny first step", copy: "We built short missions where kids can change one thing, press run, and see their idea move." },
  { number: "03", title: "A bigger world", copy: "Now the playground is growing into pathways, projects, and gentle support for every curious maker." },
];

export default function About() {
  return (
    <div className="bg-[#F7F6EE]">
      <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20"><div className="absolute -left-20 top-10 size-72 rounded-full bg-mint/40 blur-3xl" /><div className="absolute right-[-8rem] top-20 size-80 rounded-full bg-lilac/45 blur-3xl" /><div className="relative mx-auto grid max-w-[1240px] items-center gap-12 lg:grid-cols-[1fr_0.8fr]"><div><p className="text-sm font-black uppercase tracking-[0.14em] text-berry">About LittleMinds</p><h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.93] tracking-[-0.075em] text-forest sm:text-7xl">Little minds. Big ideas.</h1><p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-forest/65 sm:text-xl">LittleMinds is a creative learning playground for kids who would rather find out than be told.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/onboarding" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-forest px-6 py-3.5 text-sm font-black text-cream shadow-[0_5px_0_#0c241e] transition-transform hover:-translate-y-0.5">Start exploring <ArrowRight className="size-4" /></Link><Link to="/parents" className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-forest/12 bg-cream px-6 py-3.5 text-sm font-black text-forest">For grown-ups</Link></div></div><div className="relative mx-auto w-full max-w-[390px]"><div className="relative aspect-square rounded-[38px] border-[7px] border-forest bg-berry p-5 shadow-[0_10px_0_#823A7B] sm:p-7"><div className="absolute inset-5 rounded-[27px] border-2 border-white/20 sm:inset-7" /><div className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[36px] bg-butter text-forest shadow-[0_8px_0_#E9A52F] sm:size-40"><Sparkles className="size-16 sm:size-20" /></div><span className="absolute left-8 top-10 text-3xl text-cream/80">✦</span><span className="absolute right-10 top-20 text-xl text-mint">●</span><span className="absolute bottom-16 left-12 text-2xl text-lilac">✦</span><span className="absolute bottom-10 right-10 text-2xl text-cream/70">○</span></div><div className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-2xl bg-cream px-4 py-3 shadow-float"><span className="grid size-9 place-items-center rounded-xl bg-mint text-mint-dark"><Heart className="size-4 fill-current" /></span><p className="text-xs font-black text-forest">Made with care</p></div></div></div></section>

      <section className="bg-forest px-5 py-20 text-cream sm:px-8 sm:py-24"><div className="mx-auto grid max-w-[1240px] items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-sm font-black uppercase tracking-[0.14em] text-butter">The LittleMinds promise</p><h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.06em] sm:text-5xl">Make space for wonder.</h2></div><p className="max-w-2xl text-lg font-semibold leading-8 text-cream/65">Making is a powerful way to ask “what if?” and then test the answer. We give kids a safe, joyful place to practice that feeling through code, stories, puzzles, and projects, with grown-ups close enough to help and far enough away to let the idea be theirs.</p></div></section>

      <section className="px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-[1240px]"><div className="max-w-2xl"><p className="text-sm font-black uppercase tracking-[0.14em] text-berry">How we make space for ideas</p><h2 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.065em] text-forest sm:text-5xl">Three things we keep close.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{principles.map((principle) => { const Icon = principle.icon; return <article key={principle.title} className="rounded-[28px] border border-forest/8 bg-cream p-6 shadow-card sm:p-7"><span className={`grid size-12 place-items-center rounded-2xl ${principle.color} text-forest`}><Icon className="size-6" /></span><h3 className="mt-8 text-2xl font-black tracking-[-0.05em] text-forest">{principle.title}</h3><p className="mt-3 text-sm font-semibold leading-6 text-forest/63">{principle.copy}</p></article>; })}</div></div></section>

      <section className="border-t border-forest/8 px-5 py-20 sm:px-8 sm:py-28"><div className="mx-auto max-w-[980px]"><div className="flex items-center gap-3"><span className="h-px w-10 bg-berry" /><p className="text-sm font-black uppercase tracking-[0.14em] text-berry">Our little timeline</p></div><div className="mt-10 space-y-4">{chapters.map((chapter) => <article key={chapter.number} className="grid gap-3 rounded-[25px] border border-forest/8 bg-cream p-5 shadow-card sm:grid-cols-[80px_1fr] sm:items-start sm:p-7"><span className="font-mono text-lg font-black text-berry">{chapter.number}</span><div><h3 className="text-2xl font-black tracking-[-0.05em] text-forest">{chapter.title}</h3><p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-forest/63">{chapter.copy}</p></div></article>)}</div></div></section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28"><div className="mx-auto flex max-w-[980px] flex-col items-center justify-between gap-6 rounded-[32px] bg-lilac px-6 py-10 sm:flex-row sm:px-10"><div><p className="text-sm font-black uppercase tracking-[0.13em] text-berry">Ready when they are</p><h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-forest">Let’s make room for their next idea.</h2></div><Link to="/onboarding" className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-forest px-6 text-sm font-black text-cream shadow-[0_4px_0_#0c241e] transition-transform hover:-translate-y-0.5">Start exploring <ArrowRight className="size-4" /></Link></div></section>
    </div>
  );
}
