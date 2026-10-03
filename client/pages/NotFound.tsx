import { ArrowRight, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-coral/15 text-coral"><SearchX className="size-7" /></span>
      <p className="mt-7 text-sm font-black uppercase tracking-[0.14em] text-berry">Lost in the idea world</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-forest sm:text-6xl">This path isn’t built yet.</h1>
      <p className="mx-auto mt-5 max-w-md text-base font-semibold leading-7 text-forest/65">Let’s head back to a place full of puzzles, projects, and bright new ideas.</p>
      <Link to="/" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-forest px-6 text-sm font-extrabold text-cream shadow-[0_4px_0_#0c241e] transition-all hover:-translate-y-0.5">Return home <ArrowRight className="size-4" /></Link>
    </section>
  );
}
