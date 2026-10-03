import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

type PlaceholderProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export default function Placeholder({ eyebrow, title, copy }: PlaceholderProps) {
  return (
    <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute left-[10%] top-16 size-32 rounded-full bg-mint/50 blur-3xl" />
      <div className="absolute right-[8%] top-1/3 size-44 rounded-full bg-lilac/60 blur-3xl" />
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-butter text-forest shadow-[0_5px_0_#EEA933]"><Sparkles className="size-7" /></span>
        <p className="mt-7 text-sm font-black uppercase tracking-[0.14em] text-berry">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-forest sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-lg text-base font-semibold leading-7 text-forest/65 sm:text-lg">{copy}</p>
        <Link to="/learn" className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-sm font-extrabold text-cream shadow-[0_4px_0_#0c241e] transition-all hover:-translate-y-0.5">
          Explore Code Quest <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
