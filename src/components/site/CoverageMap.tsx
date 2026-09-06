import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CITIES, HUB, isKnownPostcode, postcodeArea } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const UK_OUTLINE =
  "M44,4 L52,9 L49,15 L54,20 L50,27 L57,30 L54,38 L60,42 L57,47 L63,50 L61,57 L67,62 L64,69 L70,74 L67,80 L72,85 L66,90 L60,88 L56,93 L48,92 L44,96 L38,90 L33,92 L30,86 L34,80 L29,74 L33,68 L28,63 L32,57 L27,52 L31,46 L26,40 L31,34 L26,28 L32,22 L28,16 L35,12 L38,6 Z";

export function CoverageMap({
  withSearch = false,
  className,
}: {
  withSearch?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(CITIES[0].id);
  const [pc, setPc] = useState("");
  const [checked, setChecked] = useState<null | { ok: boolean; area: string | null }>(null);
  const city = CITIES.find((c) => c.id === active)!;

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pc.trim()) return;
    setChecked({ ok: isKnownPostcode(pc), area: postcodeArea(pc) });
  };

  return (
    <div className={cn("grid gap-px overflow-hidden border border-border bg-[#FAF3E7] lg:grid-cols-[1.25fr_1fr]", className)}>
      <div className="relative bg-background p-5 md:p-8">
        <svg viewBox="0 0 100 100" className="h-[26rem] w-full md:h-[34rem]" role="img" aria-label="Map of UK coverage from the Manchester hub">
          <defs>
            <linearGradient id="cov-route" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" className="[stop-color:var(--primary)]" />
              <stop offset="100%" className="[stop-color:var(--champagne-light)]" />
            </linearGradient>
            <radialGradient id="cov-hub">
              <stop offset="0%" className="[stop-color:var(--primary)]" stopOpacity="0.4" />
              <stop offset="100%" className="[stop-color:var(--primary)]" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* topographic contour rings */}
          {[10, 18, 26, 34].map((r) => (
            <circle
              key={r}
              cx={HUB.x}
              cy={HUB.y}
              r={r}
              fill="none"
              className="stroke-foreground"
              strokeOpacity="0.06"
              strokeDasharray="0.6 1.6"
            />
          ))}

          <path 
            d={UK_OUTLINE} 
            className="fill-muted stroke-muted-foreground" 
            fillOpacity="0.08" 
            strokeOpacity="0.25" 
            strokeWidth="0.35" 
          />

          {CITIES.map((c) => {
            const on = c.id === active;
            const d = `M${HUB.x},${HUB.y} Q${(HUB.x + c.x) / 2 + (c.y - HUB.y) * 0.18},${(HUB.y + c.y) / 2 - (c.x - HUB.x) * 0.18} ${c.x},${c.y}`;
            return (
              <g key={c.id}>
                <path
                  d={d}
                  fill="none"
                  stroke={on ? "url(#cov-route)" : "currentColor"}
                  className={on ? undefined : "text-foreground"}
                  strokeOpacity={on ? 1 : 0.16}
                  strokeWidth={on ? 0.6 : 0.3}
                />
                {on && (
                  <motion.path
                    d={d}
                    fill="none"
                    className="stroke-champagne"
                    strokeWidth="0.9"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </g>
            );
          })}

          <circle cx={HUB.x} cy={HUB.y} r="10" fill="url(#cov-hub)" />
          <circle cx={HUB.x} cy={HUB.y} r="1.5" className="fill-champagne" />

          {CITIES.map((c) => {
            const on = c.id === active;
            return (
              <g
                key={c.id}
                onMouseEnter={() => setActive(c.id)}
                onClick={() => setActive(c.id)}
                tabIndex={0}
                role="button"
                aria-label={`Route to ${c.name}`}
                onFocus={() => setActive(c.id)}
                className="cursor-pointer outline-none"
              >
                <circle cx={c.x} cy={c.y} r="4" fill="transparent" />
                <circle 
                  cx={c.x} 
                  cy={c.y} 
                  r={on ? 1.3 : 0.9} 
                  className={on ? "fill-champagne" : "fill-ivory"} 
                  fillOpacity={on ? 1 : 0.6} 
                />
                {on && (
                  <circle 
                    cx={c.x} 
                    cy={c.y} 
                    r="3" 
                    fill="none" 
                    className="stroke-champagne" 
                    strokeOpacity="0.5" 
                    strokeWidth="0.25" 
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col justify-between bg-[#F5EDE0] p-6 md:p-9">
        <div>
          <div className="flex items-center justify-between">
            <span className="label-mono text-muted-foreground">Selected route</span>
            <span className="label-mono flex items-center gap-2 text-muted-foreground">
              <span className="status-dot" aria-hidden /> {city.status}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="data-mono mt-6 text-[0.8rem] uppercase tracking-[0.14em] text-muted-foreground">
                Littleborough â†’ {city.name}
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="data-mono text-[3.2rem] leading-none tracking-[-0.04em] text-primary">
                  {city.minutes < 120 ? city.minutes : Math.floor(city.minutes / 60)}
                </span>
                <span className="label-mono text-muted-foreground">
                  {city.minutes < 120 ? "minutes" : `h ${city.minutes % 60}m typical`}
                </span>
              </div>

              <dl className="mt-8 space-y-px overflow-hidden bg-[#FAF3E7]/50">
                {[
                  ["Region", city.region],
                  ["Distance", `${city.miles} miles`],
                  ["Service", city.service],
                  ["Route status", city.status],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between bg-[#FAF3E7] px-4 py-3">
                    <dt className="label-mono text-muted-foreground">{k}</dt>
                    <dd className="data-mono text-[0.82rem] text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>

        {withSearch ? (
          <form onSubmit={check} className="mt-9">
            <label htmlFor="cov-pc" className="label-mono text-muted-foreground">
              Check a postcode
            </label>
            <div className="mt-3 flex gap-2">
              <input
                id="cov-pc"
                value={pc}
                onChange={(e) => setPc(e.target.value)}
                placeholder="e.g. LS1 4AP"
                className="data-mono h-12 w-full rounded-sm border border-border bg-[#FAF3E7] px-4 text-foreground uppercase placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-sm bg-primary px-5 text-[0.8rem] font-medium text-noir transition-colors hover:bg-primary-light"
              >
                Check
              </button>
            </div>
            {checked && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-4 text-[0.9rem]",
                  checked.ok ? "text-primary" : "text-muted-foreground",
                )}
              >
                {checked.ok
                  ? `Yes â€” we deliver to ${checked.area}. Same-day and next-day both available.`
                  : "Speak to our team about this route â€” we cover it, we just want to plan it properly."}
              </motion.p>
            )}
          </form>
        ) : (
          <p className="mt-9 text-[0.9rem] leading-relaxed text-muted-foreground">
            Times shown are typical door-to-door for a dedicated vehicle leaving the Littleborough hub,
            measured across the last twelve months of live jobs.
          </p>
        )}
      </div>
    </div>
  );
}

