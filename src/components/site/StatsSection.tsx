import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedCounter, SectionLabel } from "./primitives";

const STATS = [
  { value: 98.7, decimals: 1, suffix: "%", label: "On-time performance", note: "Measured across all dedicated jobs, rolling 12 months." },
  { value: 24, decimals: 0, suffix: "/7", label: "Operational support", note: "A dispatcher on the phone at 03:00, not a ticket queue." },
  { value: 365, decimals: 0, suffix: "", label: "Days a year", note: "Weekends, bank holidays and the days between Christmas and New Year." },
  { value: 0, decimals: 0, suffix: "UK", label: "Nationwide coverage", note: "Littleborough hub, national reach, European and worldwide freight." },
  { value: 1, decimals: 0, suffix: "", label: "Dedicated logistics partner", note: "One account contact who knows your sites and your deadlines." },
];

const ACCENT_COLORS = ["#FF771C", "#546877", "#FF771C", "#546877", "#FF771C"];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-32%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-32" style={{ background: "#FAF3E7" }}>
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20"
            style={{
              width: `${300 + i * 150}px`, height: `${300 + i * 150}px`,
              background: i % 2 === 0 ? "radial-gradient(circle, rgba(255,119,28,0.15) 0%, transparent 70%)" : "radial-gradient(circle, rgba(84,104,119,0.1) 0%, transparent 70%)",
              left: `${10 + i * 30}%`, top: `${10 + i * 20}%`,
              filter: "blur(60px)",
            }}
          />
        ))}
      </div>

      <div className="shell edge relative z-[2]">
        <SectionLabel tone="dark" index="03">Operational reality</SectionLabel>
        <h2 className="display-lg mt-7 max-w-3xl text-foreground">
          Built around real operational pressure.
        </h2>
      </div>

      <motion.div style={{ x }} className="relative z-[2] mt-16 flex gap-6 pl-[clamp(1.25rem,5vw,5.5rem)] will-change-transform md:mt-24">
        {STATS.map((s, i) => (
          <motion.article
            key={s.label}
            className="w-[19rem] shrink-0 rounded-3xl p-6 md:w-[22rem]"
            style={{ background: "#F5EDE0", boxShadow: "8px 8px 20px rgba(84,104,119,0.15), -8px -8px 20px rgba(255,255,255,0.8)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, boxShadow: "12px 12px 28px rgba(84,104,119,0.2), -12px -12px 28px rgba(255,255,255,0.9)" }}
          >
            <span className="label-mono" style={{ color: ACCENT_COLORS[i] }}>{String(i + 1).padStart(2, "0")}</span>
            <div className="mt-4 text-[3.6rem] font-medium leading-none tracking-[-0.05em] md:text-[4.2rem]" style={{ color: ACCENT_COLORS[i] }}>
              {s.value === 0 ? (
                <span className="data-mono">{s.suffix}</span>
              ) : (
                <AnimatedCounter value={s.value} decimals={s.decimals} suffix={s.suffix} />
              )}
            </div>
            <h3 className="mt-5 text-[1.1rem] font-semibold tracking-[-0.02em] text-foreground">{s.label}</h3>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">{s.note}</p>
            {/* Bottom accent bar */}
            <div className="mt-5 h-0.5 w-12 rounded-full" style={{ background: ACCENT_COLORS[i] }} />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
