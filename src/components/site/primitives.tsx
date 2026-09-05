import { Link } from "@tanstack/react-router";
import { motion, useInView, useReducedMotion, animate } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------ Reveal */

export function Reveal({
  children,
  delay = 0,
  y = 22,
  blur = true,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------- SectionLabel */

export function SectionLabel({
  children,
  index,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  index?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "label-mono flex items-center gap-3",
        tone === "dark" ? "text-muted-foreground" : "text-ivory/55",
        className,
      )}
    >
      <span className="status-dot" aria-hidden />
      {index ? <span className="text-lime-dim">{index}</span> : null}
      <span>{children}</span>
    </div>
  );
}

/* ------------------------------------------------------ MagneticButton */

type MagneticProps = {
  children: ReactNode;
  className?: string;
  variant?: "lime" | "ink" | "ghost" | "paper";
  size?: "md" | "lg";
  to?: string;
  params?: Record<string, string>;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants: Record<string, string> = {
  lime: "bg-champagne text-noir hover:bg-champagne-light",
  ink: "bg-ivory text-noir hover:bg-ivory/90",
  paper: "bg-noir text-ivory hover:bg-obsidian",
  ghost:
    "bg-transparent text-current border border-current/25 hover:border-current/60",
};

export function MagneticButton({
  children,
  className,
  variant = "lime",
  size = "md",
  to,
  params,
  href,
  onClick,
  type = "button",
  disabled,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [t, setT] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setT({
      x: (e.clientX - (r.left + r.width / 2)) * 0.22,
      y: (e.clientY - (r.top + r.height / 2)) * 0.32,
    });
  };

  const classes = cn(
    "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.01em] transition-colors duration-300",
    size === "lg" ? "h-14 px-8 text-[0.95rem]" : "h-11 px-6 text-[0.85rem]",
    variants[variant],
    disabled && "pointer-events-none opacity-40",
    className,
  );

  const inner = (
    <motion.span
      ref={ref}
      className={classes}
      animate={{ x: t.x, y: t.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.5 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
    >
      {children}
    </motion.span>
  );

  if (to) {
    return (
      <Link to={to} params={params as never} className="inline-flex">
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className="inline-flex">
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-flex">
      {inner}
    </button>
  );
}

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1",
        className,
      )}
    >
      →
    </span>
  );
}

/* ----------------------------------------------------- AnimatedCounter */

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={cn("data-mono", className)}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------ Word-by-word */

export function SplitHeading({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const lines = text.split("\n");
  let i = 0;
  return (
    <h1 className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.06em]">
          {line.split(" ").map((word) => {
            const idx = i++;
            return (
              <motion.span
                key={`${word}-${idx}`}
                className="inline-block whitespace-pre"
                initial={reduced ? { opacity: 0 } : { y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.05,
                  delay: delay + idx * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}{" "}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/* ----------------------------------------------------------- Hairline */

export function Hairline({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} />;
}

export function Stat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("border-t border-border pt-3", className)}>
      <div className="data-mono text-2xl tracking-tight">{value}</div>
      <div className="label-mono mt-1.5 text-muted-foreground">{label}</div>
    </div>
  );
}

export type SectionProps = ComponentProps<"section">;
