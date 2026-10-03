import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  FileText,
  Flame,
  HeartHandshake,
  Lock,
  Mail,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const activity = [
  { title: "Finished “Meet the code crew”", detail: "Code Quest 101 · 8 min", when: "Today, 4:42 PM", icon: Check, color: "bg-mint", reward: "+15 stars" },
  { title: "Tried a new Python idea", detail: "Practice time · 18 min", when: "Yesterday, 5:10 PM", icon: CodeIcon, color: "bg-lilac", reward: "New" },
  { title: "Saved a pet parade blueprint", detail: "Project time · 12 min", when: "Mon, 4:05 PM", icon: FileText, color: "bg-butter", reward: "Ready" },
  { title: "Kept a creative rhythm", detail: "LittleMinds habit", when: "Sun, 3:28 PM", icon: Flame, color: "bg-coral/15", reward: "4 days" },
];

function CodeIcon({ className }: { className?: string }) {
  return <span className={`font-mono text-sm font-black ${className ?? ""}`}>{"</>"}</span>;
}

const controls = [
  { id: "digest", label: "Weekly parent digest", detail: "A gentle Sunday summary", icon: Mail, initial: true },
  { id: "sharing", label: "Grown-up sharing", detail: "Riley asks before sharing work", icon: HeartHandshake, initial: true },
  { id: "reminders", label: "Friendly reminders", detail: "Nudge after a quiet week", icon: Bell, initial: false },
];

export default function Parents() {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "settings">("overview");
  const [enabledControls, setEnabledControls] = useState(() => controls.filter((control) => control.initial).map((control) => control.id));

  const toggleControl = (id: string) => setEnabledControls((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <div className="bg-[#F7F6EE] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-black uppercase tracking-[0.15em] text-berry">Grown-up corner</p><h1 className="mt-2 text-3xl font-black tracking-[-0.06em] text-forest sm:text-4xl">Riley’s creative journey</h1><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-forest/60 sm:text-base">See the moments that matter without hovering over every click.</p></div><div className="flex items-center gap-2"><span className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${isConnected ? "bg-mint text-mint-dark" : "bg-butter/70 text-forest/65"}`}><span className={`size-2 rounded-full ${isConnected ? "bg-mint-dark" : "bg-coral"}`} />{isConnected ? "Preview account connected" : "Preview account"}</span><button type="button" onClick={() => setIsConnected((current) => !current)} className="inline-flex h-11 items-center gap-2 rounded-xl bg-forest px-4 text-sm font-black text-cream shadow-[0_4px_0_#0c241e] transition-transform hover:-translate-y-0.5">{isConnected ? <Check className="size-4" /> : <Users className="size-4" />}{isConnected ? "Connected" : "Connect account"}</button></div></div>

        {!isConnected && <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-butter/40 bg-butter/30 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-butter text-forest"><ShieldCheck className="size-5" /></span><div><p className="text-sm font-black text-forest">This is a safe preview</p><p className="mt-0.5 text-xs font-bold leading-5 text-forest/60">Nothing here is connected to a real child account or email yet.</p></div></div><button type="button" onClick={() => setIsConnected(true)} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-forest px-4 text-xs font-black text-cream">Set up preview <ArrowRight className="size-3.5" /></button></div>}

        <div className="mt-7 grid gap-4 md:grid-cols-3"><div className="rounded-[24px] bg-forest p-5 text-cream shadow-card md:col-span-2"><div className="flex items-start justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-cream/55">This week</p><p className="mt-2 text-3xl font-black tracking-[-0.06em]">86 minutes of making</p><p className="mt-2 text-sm font-semibold text-cream/60">Riley explored 4 lessons and kept a 4-day streak.</p></div><span className="grid size-12 place-items-center rounded-2xl bg-butter text-forest"><Sparkles className="size-6" /></span></div><div className="mt-6 flex items-end gap-2"><div className="h-16 w-1/6 rounded-t-lg bg-mint/70" /><div className="h-24 w-1/6 rounded-t-lg bg-mint/70" /><div className="h-20 w-1/6 rounded-t-lg bg-mint/70" /><div className="h-32 w-1/6 rounded-t-lg bg-butter" /><div className="h-24 w-1/6 rounded-t-lg bg-mint/70" /><div className="h-36 w-1/6 rounded-t-lg bg-butter" /><div className="h-10 w-1/6 rounded-t-lg bg-cream/15" /></div><div className="mt-2 flex justify-between text-[10px] font-bold text-cream/40"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div><div className="rounded-[24px] border border-forest/8 bg-cream p-5 shadow-card"><div className="flex items-center justify-between"><p className="text-xs font-black uppercase tracking-[0.12em] text-forest/50">Current path</p><CodeIcon className="text-berry" /></div><h2 className="mt-3 text-xl font-black tracking-[-0.04em] text-forest">Code Quest 101</h2><p className="mt-1 text-sm font-semibold text-forest/55">Tiny tinkerer · 68% complete</p><div className="mt-5 h-2 rounded-full bg-forest/8"><div className="h-full w-[68%] rounded-full bg-berry" /></div><Link to="/learn" className="mt-5 inline-flex items-center gap-1.5 text-sm font-black text-berry">See learner view <ArrowRight className="size-4" /></Link></div></div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"><main className="rounded-[26px] border border-forest/8 bg-cream shadow-card"><div className="flex flex-wrap gap-1 border-b border-forest/8 p-3">{[{ id: "overview", label: "Overview", icon: Eye }, { id: "activity", label: "Activity", icon: Activity }, { id: "settings", label: "Parent controls", icon: Settings2 }].map((tab) => { const Icon = tab.icon; return <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition-colors ${activeTab === tab.id ? "bg-forest text-cream" : "text-forest/50 hover:bg-forest/5 hover:text-forest"}`}><Icon className="size-4" /> {tab.label}</button>; })}</div>
          {activeTab === "overview" && <div className="p-5 sm:p-7"><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-berry">Recent wins</p><h2 className="mt-1 text-xl font-black tracking-[-0.04em] text-forest">A little look at the week</h2></div><Link to="/learn" className="hidden items-center gap-1 text-xs font-black text-berry sm:inline-flex">Open lessons <ChevronRight className="size-4" /></Link></div><div className="mt-5 divide-y divide-forest/8">{activity.slice(0, 3).map((item) => { const Icon = item.icon; return <div key={item.title} className="flex items-center gap-3 py-4 first:pt-0"><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${item.color} text-forest`}><Icon className="size-5" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-black text-forest">{item.title}</p><p className="mt-1 text-xs font-bold text-forest/45">{item.detail} · {item.when}</p></div><span className="hidden rounded-full bg-mint px-2.5 py-1 text-[10px] font-black text-mint-dark sm:inline-flex">{item.reward}</span></div>; })}</div><div className="mt-5 rounded-2xl bg-lilac/60 p-4"><div className="flex gap-3"><Trophy className="size-5 shrink-0 text-berry" /><div><p className="text-sm font-black text-forest">A good next question</p><p className="mt-1 text-xs font-bold leading-5 text-forest/60">Ask Riley which project felt the most like their own idea. The best progress is often a story, not a score.</p></div></div></div></div>}
          {activeTab === "activity" && <div className="p-5 sm:p-7"><div className="flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[0.12em] text-berry">Activity trail</p><h2 className="mt-1 text-xl font-black tracking-[-0.04em] text-forest">Everything Riley made this week</h2></div><button type="button" className="inline-flex items-center gap-1.5 rounded-xl border border-forest/10 px-3 py-2 text-xs font-black text-forest/60"><Download className="size-3.5" /> Export</button></div><div className="mt-5 divide-y divide-forest/8">{activity.map((item) => { const Icon = item.icon; return <div key={item.title} className="flex items-center gap-3 py-4 first:pt-0"><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${item.color} text-forest`}><Icon className="size-5" /></span><div className="min-w-0 flex-1"><p className="text-sm font-black text-forest">{item.title}</p><p className="mt-1 text-xs font-bold text-forest/45">{item.detail} · {item.when}</p></div><span className="rounded-full bg-mint px-2.5 py-1 text-[10px] font-black text-mint-dark">{item.reward}</span></div>; })}</div></div>}
          {activeTab === "settings" && <div className="p-5 sm:p-7"><p className="text-xs font-black uppercase tracking-[0.12em] text-berry">Parent controls</p><h2 className="mt-1 text-xl font-black tracking-[-0.04em] text-forest">Support, don’t hover</h2><p className="mt-2 max-w-lg text-sm font-semibold leading-6 text-forest/55">Choose the gentle ways LittleMinds can keep you in the loop.</p><div className="mt-5 space-y-3">{controls.map((control) => { const Icon = control.icon; const enabled = enabledControls.includes(control.id); return <button key={control.id} type="button" aria-pressed={enabled} onClick={() => toggleControl(control.id)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${enabled ? "border-mint-dark/15 bg-mint/25" : "border-forest/8 bg-[#FBFAF3] hover:bg-forest/4"}`}><span className={`grid size-10 place-items-center rounded-xl ${enabled ? "bg-mint text-mint-dark" : "bg-forest/7 text-forest/40"}`}><Icon className="size-5" /></span><span className="flex-1"><span className="block text-sm font-black text-forest">{control.label}</span><span className="mt-1 block text-xs font-bold text-forest/45">{control.detail}</span></span><span className={`grid size-6 place-items-center rounded-full ${enabled ? "bg-mint-dark text-white" : "border border-forest/15"}`}>{enabled && <Check className="size-3.5" strokeWidth={3} />}</span></button>; })}</div></div>}
        </main>

        <aside className="rounded-[26px] border border-forest/8 bg-cream p-5 shadow-card"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-mint text-mint-dark"><Lock className="size-5" /></span><div><p className="text-sm font-black text-forest">Privacy first</p><p className="text-xs font-bold text-forest/45">Built for trust</p></div></div><p className="mt-5 text-sm font-semibold leading-6 text-forest/60">LittleMinds should help grown-ups understand progress without turning learning into surveillance.</p><div className="mt-5 space-y-3 text-xs font-bold text-forest/55"><p className="flex gap-2"><Check className="size-4 shrink-0 text-mint-dark" strokeWidth={3} /> No camera or microphone monitoring</p><p className="flex gap-2"><Check className="size-4 shrink-0 text-mint-dark" strokeWidth={3} /> Sharing needs a grown-up okay</p><p className="flex gap-2"><Clock3 className="size-4 shrink-0 text-berry" /> Weekly summaries, not every click</p></div><div className="mt-7 rounded-2xl bg-[#FBFAF3] p-4"><p className="text-xs font-black uppercase tracking-[0.1em] text-berry">Preview note</p><p className="mt-1 text-xs font-bold leading-5 text-forest/50">This dashboard is local demo state. Connect secure authentication and storage before using real family data.</p></div></aside></div>
      </div>
    </div>
  );
}
