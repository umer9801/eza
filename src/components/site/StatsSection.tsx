import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedCounter, SectionLabel } from "./primitives";

const STATS = [
  { value: 98.7, decimals: 1, suffix: "%", label: "On-time performance", note: "Measured across all dedicated jobs, rolling 12 months." },
  { value: 24, decimals: 0, suffix: "/7", label: "Operational support", note: "A dispatcher on the phone at 03:00, not a ticket queue." },
  { value: 365, decimals: 0, suffix: "", label: "Days a year", note: "Weekends, bank holidays and the days between Christmas and New Year." },
  { value: 0, decimals: 0, suffix: "UK", label: "Nationwide coverage", note: "Manchester hub, national reach, European and worldwide freight." },
  { value: 1, decimals: 0, suffix: "", label: "Dedicated logistics partner", note: "One account contact who knows your sites and your deadlines." },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-32%"]);

  return (
    <section ref={ref} className="surface-dark grain relative overflow-hidden py-24 md:py-32">
      <RouteBackdrop />
      <div className="shell edge relative z-[2]">
        <SectionLabel tone="light" index="03">
          Operational reality
        </SectionLabel>
        <h2 className="display-lg mt-7 max-w-3xl text-paper">
          Built around real operational pressure.
        </h2>
      </div>

      <motion.div style={{ x }} className="relative z-[2] mt-16 flex gap-6 pl-[clamp(1.25rem,5vw,5.5rem)] will-change-transform md:mt-24">
        {STATS.map((s, i) => (
          <motion.article
            key={s.label}
            className="w-[19rem] shrink-0 border-t border-paper/20 pt-6 md:w-[23rem]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { duration: 0.3 }
            }}
          >
            <span className="label-mono text-paper/35">{String(i + 1).padStart(2, "0")}</span>
            <div className="mt-6 text-[3.6rem] font-medium leading-none tracking-[-0.05em] text-lime md:text-[4.6rem]">
              {s.value === 0 ? (
                <span className="data-mono">{s.suffix}</span>
              ) : (
                <AnimatedCounter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              )}
            </div>
            <h3 className="mt-6 text-[1.15rem] font-medium tracking-[-0.02em] text-paper">
              {s.label}
            </h3>
            <p className="mt-3 max-w-[19rem] text-[0.92rem] leading-relaxed text-paper/50">
              {s.note}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function RouteBackdrop() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
    >
      {[120, 240, 360, 480].map((y, i) => (
        <path
          key={y}
          d={`M-50,${y} C300,${y - 90 - i * 20} 700,${y + 90 + i * 15} 1250,${y - 40}`}
          fill="none"
          stroke="#F5F4EF"
          strokeOpacity="0.08"
          strokeWidth="1"
          className="route-flow"
          style={{ animationDuration: `${18 + i * 6}s` }}
        />
      ))}
    </svg>
  );
}
