import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site-data";
import { MagneticButton, ArrowGlyph } from "./primitives";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/coverage", label: "Coverage" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
          scrolled
            ? "border-b border-ink/10 bg-paper/80 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "shell edge flex items-center justify-between transition-all duration-500",
            scrolled ? "h-16" : "h-[5.5rem]",
          )}
        >
          <Link to="/" className="flex items-baseline gap-2.5" aria-label="EZA Logistics home">
            <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.06em]">
              EZA
            </span>
            <span className="label-mono hidden text-[0.58rem] text-muted-foreground md:block">
              Logistics
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative px-3.5 py-2 text-[0.83rem] font-medium tracking-[-0.01em] text-ink/70 transition-colors hover:text-ink"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2.5 -bottom-0.5 h-px bg-lime-dim"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={cn(active && "text-ink")}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden items-center gap-2 xl:flex">
              <span className="status-dot" aria-hidden />
              <span className="label-mono text-[0.6rem] text-muted-foreground">
                Network operational
              </span>
            </div>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="hidden data-mono text-[0.8rem] text-ink/70 transition-colors hover:text-ink md:block"
            >
              {CONTACT.phone}
            </a>
            <MagneticButton to="/quote" className="hidden sm:inline-flex">
              Get a Quote <ArrowGlyph />
            </MagneticButton>
            <button
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 lg:hidden"
              aria-label="Open menu"
            >
              <span className="relative block h-3 w-4">
                <span className="absolute inset-x-0 top-0 h-px bg-ink" />
                <span className="absolute inset-x-0 top-1.5 h-px bg-ink" />
                <span className="absolute inset-x-0 top-3 h-px bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[59] bg-ink/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              className="surface-dark grain fixed right-0 top-0 z-[60] flex h-full w-[85vw] max-w-md flex-col shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex h-[5.5rem] items-center justify-between px-6 border-b border-paper/10">
                <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.06em] text-paper">
                  EZA
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper text-xl"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={item.to}
                      className="flex items-baseline gap-3 border-b border-paper/10 py-4 text-[1.4rem] font-medium tracking-[-0.02em] text-paper transition-colors hover:text-lime"
                    >
                      <span className="label-mono text-[0.7rem] text-lime-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="flex flex-col gap-4 border-t border-paper/10 p-6">
                <MagneticButton to="/quote" size="lg" className="w-full">
                  Get a Quote <ArrowGlyph />
                </MagneticButton>
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} 
                  className="data-mono text-center text-paper/70 hover:text-lime transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
