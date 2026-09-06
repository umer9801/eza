import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { INDUSTRIES } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { ArrowGlyph } from "./primitives";

export function IndustryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(i);
  };

  return (
    <div>
      <div className="edge shell flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4">
        {INDUSTRIES.map((ind, i) => (
          <button
            key={ind.id}
            onClick={() => scrollTo(i)}
            className={cn(
              "label-mono relative py-1 transition-all duration-300",
              i === active ? "text-ink scale-110" : "text-muted-foreground hover:text-ink hover:scale-105",
            )}
            style={{
              transform: i === active ? "translateY(-2px)" : "translateY(0)",
            }}
          >
            {i === active && (
              <motion.span layoutId="ind-underline" className="absolute -bottom-[17px] left-0 h-px w-full bg-primary-dim" />
            )}
            {ind.name}
          </button>
        ))}
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pl-[clamp(1.25rem,5vw,5.5rem)] pr-6"
      >
        {INDUSTRIES.map((ind, i) => (
          <IndustryCard key={ind.id} ind={ind} i={i} onView={() => setActive(i)} />
        ))}
      </div>
    </div>
  );
}

function IndustryCard({
  ind,
  i,
  onView,
}: {
  ind: (typeof INDUSTRIES)[number];
  i: number;
  onView: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.article
      onViewportEnter={onView}
      viewport={{ amount: 0.6 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex w-[85vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-sm border border-border bg-card p-7 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(8,10,11,0.5)] sm:w-[27rem] md:p-9"
    >
      <IndustryGlyph index={i} hover={hover} />
      <div className="relative z-[2]">
        <span className="label-mono text-muted-foreground">
          {String(i + 1).padStart(2, "0")} / {ind.name}
        </span>
        <h3 className="display-md mt-6 max-w-[16ch]">{ind.challenge}</h3>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">{ind.problem}</p>
        <AnimatePresence>
          <motion.p
            initial={false}
            animate={{ opacity: hover ? 1 : 0.62 }}
            className="mt-5 border-l-2 border-lime pl-4 text-[0.95rem] leading-relaxed"
          >
            {ind.solution}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="relative z-[2] mt-9 flex items-center justify-between border-t border-border pt-5">
        <span className="label-mono text-muted-foreground">{ind.service}</span>
        <Link
          to="/services/$slug"
          params={{ slug: ind.slug }}
          className="group/link label-mono flex items-center gap-2 transition-colors hover:text-primary"
        >
          Explore <ArrowGlyph />
        </Link>
      </div>
    </motion.article>
  );
}

function IndustryGlyph({ index, hover }: { index: number; hover: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 300"
      className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 opacity-[0.09] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
      style={{ transform: hover ? "rotate(8deg) scale(1.08)" : "none" }}
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x={30 + i * 12}
          y={30 + ((i * 29 + index * 17) % 90)}
          width={140 - i * 10}
          height={30}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          transform={`skewY(${-14 + index})`}
        />
      ))}
    </svg>
  );
}

