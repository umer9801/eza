import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { SERVICES } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { ArrowGlyph } from "./primitives";

/** Interactive logistics-console style service selector. */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-[#FAF3E7]/50 lg:grid-cols-[1.05fr_1fr]">
      {/* selector column */}
      <div className="bg-background">
        {SERVICES.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.slug}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={cn(
                "group relative block w-full border-b border-primary/10 px-6 py-6 text-left transition-all duration-500 last:border-b-0 md:px-9 md:py-8",
                on ? "bg-[#F5EDE0]" : "hover:bg-[#FAF3E7]",
              )}
              style={{
                transform: on ? "scale(1.02) translateX(4px)" : "scale(1)",
                transformOrigin: "left center",
              }}
            >
              {on && (
                <motion.span
                  layoutId="svc-bar"
                  className="absolute inset-y-0 left-0 w-[3px] bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <div className="flex items-baseline gap-5">
                <span
                  className={cn(
                    "label-mono transition-colors",
                    on ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {s.index}
                </span>
                <span
                  className={cn(
                    "text-[1.5rem] font-medium tracking-[-0.035em] transition-colors md:text-[1.9rem]",
                    on ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.name}
                </span>
              </div>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden pl-[3.1rem] text-[0.95rem] leading-relaxed text-muted-foreground"
                  >
                    <span className="block pt-3">{s.short}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* console column */}
      <div className="relative flex min-h-[26rem] flex-col justify-between overflow-hidden bg-[#F5EDE0] p-6 md:p-10">
        <ConsoleRoute seed={active} />
        <div className="relative z-[2] flex items-center justify-between">
          <span className="label-mono text-muted-foreground">Service console</span>
          <span className="label-mono flex items-center gap-2 text-muted-foreground">
            <span className="status-dot" aria-hidden /> Live
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[2] mt-10"
          >
            <p className="max-w-md text-[1.05rem] leading-[1.5] tracking-[-0.015em] text-foreground">
              {service.blurb}
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden border border-border bg-[#FAF3E7]">
              {service.stats.map((st) => (
                <div key={st.label} className="bg-[#FAF3E7] px-3 py-4">
                  <dt className="label-mono text-[0.55rem] text-muted-foreground">{st.label}</dt>
                  <dd className="data-mono mt-2 text-[1.05rem] text-primary">{st.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group label-mono flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                Service detail <ArrowGlyph />
              </Link>
              <Link
                to="/quote"
                className="group label-mono flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
              >
                Quote this service <ArrowGlyph />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ConsoleRoute({ seed }: { seed: number }) {
  const paths = [
    "M20,180 C120,60 220,240 380,90",
    "M20,120 C160,220 200,40 380,160",
    "M20,220 C140,140 240,200 380,60",
    "M20,60 C120,200 260,80 380,200",
    "M20,150 C110,30 270,260 380,110",
  ];
  return (
    <svg
      viewBox="0 0 400 260"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="svc-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#FF771C" stopOpacity="0" />
          <stop offset="45%" stopColor="#FF771C" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#546877" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <AnimatePresence mode="wait">
        <motion.path
          key={seed}
          d={paths[seed % paths.length]}
          fill="none"
          stroke="url(#svc-grad)"
          strokeWidth="1.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      <path
        d={paths[seed % paths.length]}
        fill="none"
        stroke="#546877"
        strokeOpacity="0.2"
        strokeWidth="1"
        className="route-flow"
      />
    </svg>
  );
}

