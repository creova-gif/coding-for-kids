import { ArrowUpRight, Lightbulb, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const navigation = [
  { label: "Explore", to: "/learn" },
  { label: "App checkup", to: "/audit" },
  { label: "For parents", to: "/parents" },
  { label: "Our story", to: "/about" },
];

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "LittleMinds | Creative Learning, STEM & Activities for Kids",
    description: "A playful place for curious kids to imagine, explore, make, solve, and share their biggest ideas.",
  },
  "/onboarding": {
    title: "Start Exploring | LittleMinds",
    description: "Choose a language, follow a spark, and start making something that feels like you.",
  },
  "/learn": {
    title: "Explore & Make | LittleMinds",
    description: "Explore creative coding missions, maker projects, puzzles, and playful challenges for kids.",
  },
  "/audit": {
    title: "App Checkup Studio | LittleMinds",
    description: "A kid-friendly way to find clues, improve an app, and build with care.",
  },
  "/msimbo": {
    title: "Msimbo Arusha | LittleMinds",
    description: "A bilingual Blockly adventure where young builders learn coding through Arusha stories and missions.",
  },
  "/parents": {
    title: "For Parents | LittleMinds",
    description: "A privacy-first parent view for supporting a child's creative learning journey.",
  },
  "/about": {
    title: "Our Story | LittleMinds",
    description: "Meet LittleMinds, a creative learning playground for curious kids.",
  },
};

function usePageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? {
      title: "LittleMinds | Little minds. Big ideas.",
      description: "A creative learning playground for curious kids.",
    };
    document.title = metadata.title;

    const updateMeta = (key: string, attribute: "name" | "property", content: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    updateMeta("description", "name", metadata.description);
    updateMeta("og:title", "property", metadata.title);
    updateMeta("og:description", "property", metadata.description);
    updateMeta("twitter:title", "name", metadata.title);
    updateMeta("twitter:description", "name", metadata.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${pathname}`;
  }, [pathname]);
}

function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isCurrent = (to: string) => location.pathname === to;

  return (
    <header className="sticky top-0 z-50 border-b border-forest/5 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <span className="grid size-10 place-items-center rounded-[14px] bg-forest text-butter shadow-[0_5px_0_#F6B544] transition-transform duration-200 group-hover:-rotate-6">
            <Lightbulb className="size-5" strokeWidth={2.8} />
          </span>
          <span className="text-[21px] font-black tracking-[-0.07em] text-forest">
            Little<span className="text-berry">Minds</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isCurrent(item.to) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition-colors ${
                isCurrent(item.to) ? "bg-forest/8 text-forest" : "text-forest/65 hover:bg-forest/5 hover:text-forest"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/parents" className="text-sm font-extrabold text-forest/75 transition-colors hover:text-forest">
            Parent account
          </Link>
          <Link
            to="/onboarding"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-forest px-5 text-sm font-extrabold text-cream shadow-[0_4px_0_#0c241e] transition-all hover:-translate-y-0.5 hover:bg-forest-light hover:shadow-[0_6px_0_#0c241e]"
          >
            Start exploring <ArrowUpRight className="size-4" strokeWidth={2.8} />
          </Link>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full text-forest transition-colors hover:bg-forest/7 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-forest/7 bg-cream px-5 py-4 shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col gap-1" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isCurrent(item.to) ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-extrabold ${
                  isCurrent(item.to) ? "bg-forest/8 text-forest" : "text-forest/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/onboarding"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-forest px-5 text-sm font-extrabold text-cream"
            >
              Start exploring <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-forest px-5 pb-8 pt-14 text-cream sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-10 border-b border-cream/15 pb-12 md:flex-row">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-[14px] bg-butter text-forest">
                <Lightbulb className="size-5" strokeWidth={2.8} />
              </span>
              <span className="text-[21px] font-black tracking-[-0.07em]">
                Little<span className="text-butter">Minds</span>
              </span>
            </Link>
            <p className="mt-5 text-sm font-semibold leading-6 text-cream/65">
              A creative learning playground for curious kids to imagine, make, solve, and share big ideas.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-bold sm:flex sm:gap-8">
            <Link to="/learn" className="transition-colors hover:text-butter">Explore ideas</Link>
            <Link to="/parents" className="transition-colors hover:text-butter">For parents</Link>
            <Link to="/about" className="transition-colors hover:text-butter">Our story</Link>
            <Link to="/audit" className="transition-colors hover:text-butter">Build with care</Link>
            <Link to="/onboarding" className="transition-colors hover:text-butter">Start exploring</Link>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs font-bold text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2025 LittleMinds. Made for big ideas.</p>
          <p className="flex items-center gap-1.5"><Sparkles className="size-3" /> Imagine it. Make it. Solve it. Share it.</p>
        </div>
      </div>
    </footer>
  );
}

export default function SiteFrame() {
  usePageMetadata();

  return (
    <div className="min-h-screen overflow-x-clip bg-cream text-forest">
      <SiteHeader />
      <main><Outlet /></main>
      <SiteFooter />
    </div>
  );
}
