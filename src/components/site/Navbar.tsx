import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site-data";
import { MagneticButton, ArrowGlyph } from "./primitives";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/coverage", label: "Coverage" },
  { to: "/how-it-works", label: "Process" },
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
            ? "py-3 px-4"
            : "py-4 px-4",
        )}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto rounded-2xl transition-all duration-500 px-4 md:px-6",
            scrolled
              ? "bg-background/95 backdrop-blur-xl shadow-[8px_8px_16px_rgba(84,104,119,0.15),-8px_-8px_16px_rgba(255,255,255,0.7)]"
              : "bg-transparent",
          )}
        >
          <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center gap-2" aria-label="EZA Logistics home">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-[4px_4px_8px_rgba(84,104,119,0.15),-4px_-4px_8px_rgba(255,255,255,0.7)]">
              <span className="text-lg font-bold leading-none text-white">E</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold leading-none tracking-tight text-foreground">
                EZA
              </span>
              <span className="text-[0.6rem] leading-none text-muted-foreground hidden sm:block">
                Logistics
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active =
                pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative px-3.5 py-2 text-[0.83rem] font-medium tracking-[-0.01em] text-foreground/70 transition-colors hover:text-foreground"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-xl bg-background shadow-[inset_4px_4px_8px_rgba(84,104,119,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={cn("relative z-10", active && "text-primary font-semibold")}>{item.label}</span>                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-background px-3 py-1.5 shadow-[4px_4px_8px_rgba(84,104,119,0.12),-4px_-4px_8px_rgba(255,255,255,0.6)] xl:flex">
              <span className="status-dot" aria-hidden />
              <span className="label-mono text-[0.55rem] text-muted-foreground">
                Operational
              </span>
            </div>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="hidden data-mono text-[0.75rem] px-3 py-2 rounded-xl bg-background shadow-[4px_4px_8px_rgba(84,104,119,0.12),-4px_-4px_8px_rgba(255,255,255,0.6)] text-foreground/70 transition-all hover:text-foreground hover:shadow-[6px_6px_12px_rgba(84,104,119,0.15),-6px_-6px_12px_rgba(255,255,255,0.7)] md:block"
            >
              {CONTACT.phone}
            </a>
            <MagneticButton to="/quote" className="hidden sm:inline-flex">
              Get a Quote <ArrowGlyph />
            </MagneticButton>
            <button
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl bg-background transition-all lg:hidden",
                open
                  ? "shadow-[inset_4px_4px_8px_rgba(84,104,119,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.7)]"
                  : "shadow-[6px_6px_12px_rgba(84,104,119,0.15),-6px_-6px_12px_rgba(255,255,255,0.7)]"
              )}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? (
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path d="M1 1H17M1 7H17M1 13H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </motion.div>
            </button>
          </div>
        </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            {/* Invisible backdrop to close on outside click */}
            <motion.div
              className="fixed inset-0 z-[59] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Floating Card - top right corner, near hamburger button */}
            <motion.div
              className="fixed top-[4.5rem] right-4 z-[60] w-64 rounded-3xl bg-background overflow-hidden lg:hidden"
              style={{
                boxShadow: "16px_16px_32px_rgba(84,104,119,0.25),-8px_-8px_20px_rgba(255,255,255,0.8)",
                boxShadow: "0 20px 60px rgba(84,104,119,0.25), 0 0 0 1px rgba(84,104,119,0.08)"
              }}
              initial={{ opacity: 0, scale: 0.85, y: -12, transformOrigin: "top right" }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Nav Links */}
              <nav className="px-2 py-2">
                {NAV.map((item, i) => {
                  const isActive = pathname === item.to || pathname.startsWith(item.to + "/");
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        to={item.to}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3 mb-1 text-sm font-medium transition-all",
                          isActive
                            ? "bg-primary text-white shadow-[4px_4px_8px_rgba(255,119,28,0.3)]"
                            : "text-foreground/70 hover:text-foreground hover:bg-[#F5EDE0] hover:shadow-[inset_3px_3px_6px_rgba(84,104,119,0.1),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]"
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Divider */}
              <div className="mx-4 h-px bg-border" />

              {/* CTA */}
              <motion.div
                className="p-3 flex flex-col gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.25 }}
              >
                <Link
                  to="/quote"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-[6px_6px_12px_rgba(255,119,28,0.25),-3px_-3px_8px_rgba(255,255,255,0.3)] transition-all active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15)]"
                >
                  Get a Quote →
                </Link>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-background px-4 py-2.5 text-xs text-muted-foreground shadow-[4px_4px_8px_rgba(84,104,119,0.12),-4px_-4px_8px_rgba(255,255,255,0.6)] transition-all active:shadow-[inset_3px_3px_6px_rgba(84,104,119,0.15),inset_-3px_-3px_6px_rgba(255,255,255,0.7)]"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M14.5 11.2v2.3c0 .6-.4 1-.9 1.1-5.4.8-10-3.4-10.9-8.7C2.6 5.4 3 5 3.5 5h2.3c.5 0 .9.4 1 .8.1.8.3 1.5.6 2.2.2.4.1.9-.2 1.2l-1 1c.8 1.4 2 2.6 3.4 3.4l1-1c.3-.3.8-.4 1.2-.2.7.3 1.4.5 2.2.6.4.1.8.5.8 1z" fill="currentColor" className="text-primary"/>
                  </svg>
                  {CONTACT.phone}
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
