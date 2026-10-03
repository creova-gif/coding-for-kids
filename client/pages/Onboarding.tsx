import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Heart,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const languages = [
  { id: "python", label: "Python", detail: "Friendly and powerful", color: "bg-mint", icon: "🐍" },
  { id: "cpp", label: "C++", detail: "Build with superpowers", color: "bg-lilac", icon: "⚙" },
  { id: "javascript", label: "JavaScript", detail: "Make the web wiggle", color: "bg-butter", icon: "✨" },
  { id: "scratch", label: "Scratch", detail: "Start with colorful blocks", color: "bg-coral/20", icon: "🐱" },
] as const;

const goals = [
  { id: "games", label: "Build games", detail: "Make worlds to play in", icon: Target, color: "bg-coral/15" },
  { id: "stories", label: "Tell stories", detail: "Bring characters to life", icon: Heart, color: "bg-lilac" },
  { id: "anything", label: "Try everything", detail: "Follow the next bright idea", icon: Lightbulb, color: "bg-mint" },
] as const;

type Step = 1 | 2 | 3;

export default function Onboarding() {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("Riley");
  const [ageBand, setAgeBand] = useState("9–12");
  const [language, setLanguage] = useState("python");
  const [goal, setGoal] = useState("games");
  const [isReady, setIsReady] = useState(false);

  const nextStep = () => setStep((current) => Math.min(3, current + 1) as Step);
  const previousStep = () => setStep((current) => Math.max(1, current - 1) as Step);
  const selectedLanguage = languages.find((item) => item.id === language) ?? languages[0];

  return (
    <section className="relative overflow-hidden bg-[#F7F6EE] px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
      <div className="absolute -left-20 top-16 size-72 rounded-full bg-mint/35 blur-3xl" />
      <div className="absolute right-[-8rem] top-1/3 size-80 rounded-full bg-lilac/45 blur-3xl" />
      <div className="relative mx-auto max-w-[1040px]">
        <div className="flex items-center justify-between gap-4"><Link to="/" className="inline-flex items-center gap-1.5 text-sm font-extrabold text-forest/60 transition-colors hover:text-forest"><ArrowLeft className="size-4" /> Back home</Link><span className="inline-flex items-center gap-1.5 text-xs font-black text-forest/45"><ShieldCheck className="size-4 text-mint-dark" /> Kid-first preview</span></div>

        {isReady ? <div className="mx-auto max-w-2xl py-20 text-center sm:py-28"><span className={`mx-auto grid size-16 place-items-center rounded-[22px] ${selectedLanguage.color} text-3xl shadow-[0_6px_0_rgba(23,62,53,.12)]`}>{selectedLanguage.icon}</span><p className="mt-7 text-sm font-black uppercase tracking-[0.14em] text-berry">Your adventure is ready</p><h1 className="mt-3 text-5xl font-black leading-[0.95] tracking-[-0.07em] text-forest sm:text-7xl">Let’s make something, {name || "friend"}.</h1><p className="mx-auto mt-5 max-w-lg text-base font-semibold leading-7 text-forest/65 sm:text-lg">Your first path starts with {selectedLanguage.label}. You can try a different language whenever you want.</p><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link to={`/learn?language=${language}`} className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-forest px-7 py-3.5 text-base font-black text-cream shadow-[0_5px_0_#0c241e] transition-all hover:-translate-y-0.5">Enter the maker space <ArrowRight className="size-5" /></Link><Link to="/parents" className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-forest/12 bg-cream px-6 py-3.5 text-sm font-black text-forest">Show a grown-up</Link></div><p className="mx-auto mt-8 max-w-md text-xs font-bold leading-5 text-forest/40">Preview mode: your choices stay on this screen until a real account service is connected.</p></div> : <>
          <div className="mx-auto mt-12 max-w-2xl text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-forest text-butter shadow-[0_5px_0_#0c241e]"><Sparkles className="size-7" /></span><p className="mt-6 text-sm font-black uppercase tracking-[0.14em] text-berry">Make your LittleMinds map</p><h1 className="mt-3 text-4xl font-black leading-[0.96] tracking-[-0.065em] text-forest sm:text-6xl">A tiny hello, then a big adventure.</h1><p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-7 text-forest/65">Tell us a little about you so your first creative path feels like it was made for your brain.</p></div>
          <div className="mx-auto mt-10 max-w-3xl"><div className="mb-8 flex items-center justify-center gap-2">{[1, 2, 3].map((item) => <div key={item} className="flex items-center gap-2"><span className={`grid size-9 place-items-center rounded-full text-sm font-black ${item === step ? "bg-berry text-white shadow-[0_3px_0_#823A7B]" : item < step ? "bg-mint text-mint-dark" : "bg-forest/8 text-forest/35"}`}>{item < step ? <Check className="size-4" strokeWidth={3} /> : item}</span>{item < 3 && <span className={`h-1 w-12 rounded-full sm:w-24 ${item < step ? "bg-mint-dark" : "bg-forest/10"}`} />}</div>)}</div>
            <div className="rounded-[30px] border border-forest/8 bg-cream p-5 shadow-card sm:p-8">
              {step === 1 && <div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">Step 1 · Say hello</p><h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-forest">What should we call you?</h2><p className="mt-2 text-sm font-semibold leading-6 text-forest/60">A nickname is perfect. No grown-up details needed here.</p><label className="mt-7 block text-sm font-black text-forest" htmlFor="learner-name">Your nickname<input id="learner-name" value={name} onChange={(event) => setName(event.target.value)} maxLength={24} className="mt-2 h-[52px] w-full rounded-2xl border border-forest/12 bg-[#FBFAF3] px-4 text-base font-bold text-forest outline-none transition-colors placeholder:text-forest/30 focus:border-berry/50 focus:ring-2 focus:ring-berry/10" placeholder="e.g. PixelFox" /></label><fieldset className="mt-7"><legend className="text-sm font-black text-forest">How old are you?</legend><div className="mt-3 grid grid-cols-3 gap-2">{["6–8", "9–12", "13+"] .map((age) => <button key={age} type="button" onClick={() => setAgeBand(age)} className={`rounded-2xl border px-3 py-3 text-sm font-black transition-colors ${age === ageBand ? "border-berry bg-lilac text-forest" : "border-forest/8 bg-[#FBFAF3] text-forest/55 hover:bg-forest/4"}`}>{age}</button>)}</div></fieldset></div>}
              {step === 2 && <div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">Step 2 · Pick your tool</p><h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-forest">Which language sounds fun?</h2><p className="mt-2 text-sm font-semibold leading-6 text-forest/60">There is no “best” choice. You can learn them all.</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{languages.map((item) => <button key={item.id} type="button" aria-pressed={language === item.id} onClick={() => setLanguage(item.id)} className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${language === item.id ? "border-forest bg-[#FBFAF3] shadow-[0_4px_0_#173E35]" : "border-forest/8 bg-[#FBFAF3] hover:-translate-y-0.5"}`}><span className={`grid size-12 place-items-center rounded-2xl ${item.color} text-2xl`}>{item.icon}</span><span className="min-w-0 flex-1"><span className="block text-base font-black text-forest">{item.label}</span><span className="mt-0.5 block text-xs font-bold text-forest/50">{item.detail}</span></span>{language === item.id && <Check className="size-5 text-mint-dark" strokeWidth={3} />}</button>)}</div></div>}
              {step === 3 && <div><p className="text-xs font-black uppercase tracking-[0.13em] text-berry">Step 3 · Choose your spark</p><h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-forest">What do you want to make first?</h2><p className="mt-2 text-sm font-semibold leading-6 text-forest/60">This helps us put the best first project in front of you.</p><div className="mt-7 space-y-3">{goals.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" aria-pressed={goal === item.id} onClick={() => setGoal(item.id)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${goal === item.id ? "border-forest bg-[#FBFAF3] shadow-[0_4px_0_#173E35]" : "border-forest/8 bg-[#FBFAF3] hover:-translate-y-0.5"}`}><span className={`grid size-11 place-items-center rounded-2xl ${item.color} text-forest`}><Icon className="size-5" /></span><span className="flex-1"><span className="block text-base font-black text-forest">{item.label}</span><span className="mt-0.5 block text-xs font-bold text-forest/50">{item.detail}</span></span>{goal === item.id && <Check className="size-5 text-mint-dark" strokeWidth={3} />}</button>; })}</div><div className="mt-7 flex items-start gap-2.5 rounded-2xl bg-mint/30 p-4"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-mint-dark" /><p className="text-xs font-bold leading-5 text-forest/65">A grown-up can help connect an account later. For now, you can start imagining and making right away.</p></div></div>}
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-forest/8 pt-5"><button type="button" onClick={previousStep} disabled={step === 1} className="inline-flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-black text-forest/50 transition-colors hover:bg-forest/5 disabled:opacity-0"><ArrowLeft className="size-4" /> Back</button>{step < 3 ? <button type="button" onClick={nextStep} className="inline-flex h-11 items-center gap-2 rounded-xl bg-forest px-5 text-sm font-black text-cream transition-transform hover:-translate-y-0.5">Next <ArrowRight className="size-4" /></button> : <button type="button" onClick={() => setIsReady(true)} className="inline-flex h-11 items-center gap-2 rounded-xl bg-berry px-5 text-sm font-black text-white shadow-[0_4px_0_#823A7B] transition-transform hover:-translate-y-0.5">Start exploring <Sparkles className="size-4" /></button>}</div>
            </div>
          </div>
        </>}
      </div>
    </section>
  );
}
