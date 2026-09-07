import { Link } from "@tanstack/react-router";
import { CONTACT, SERVICES } from "@/lib/site-data";
import { MagneticButton, ArrowGlyph } from "./primitives";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cream-light border-t border-border">
      <div className="shell edge relative z-[2] pb-10 pt-24 md:pt-32">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.06em] text-foreground">
                EZA
              </span>
              <span className="label-mono text-muted-foreground">Logistics</span>
            </div>
            <p className="mt-5 max-w-xs text-[1.35rem] font-medium leading-[1.15] tracking-[-0.03em] text-foreground">
              Moving business forward.
            </p>
            <div className="mt-8 flex items-center gap-2.5">
              <span className="status-dot" aria-hidden />
              <span className="label-mono text-[0.6rem] text-muted-foreground">
                Network status · Operational
              </span>
            </div>
          </div>

          <div>
            <div className="label-mono text-muted-foreground">Navigate</div>
            <ul className="mt-5 space-y-2.5">
              {[
                ["/services", "Services"],
                ["/coverage", "Coverage"],
                ["/how-it-works", "How It Works"],
                ["/pricing", "Pricing"],
                ["/industries", "Industries"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[0.92rem] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label-mono text-muted-foreground">Services</div>
            <ul className="mt-5 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="text-[0.92rem] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="label-mono text-muted-foreground">Contact</div>
            <ul className="mt-5 space-y-3 text-[0.92rem] text-muted-foreground">
              <li>
                <a className="data-mono hover:text-primary transition-colors" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </li>
              <li className="max-w-[16rem] leading-relaxed text-muted-foreground">{CONTACT.hub}</li>
            </ul>
            <MagneticButton to="/quote" className="mt-7">
              Get a Quote <ArrowGlyph />
            </MagneticButton>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-6 text-[0.75rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="data-mono">© {new Date().getFullYear()} EZA Logistics · Littleborough, UK</span>
          <div className="flex gap-6">
            <span className="cursor-default transition-colors hover:text-primary">Privacy</span>
            <span className="cursor-default transition-colors hover:text-primary">Terms</span>
            <span className="cursor-default transition-colors hover:text-primary">Cookies</span>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[36rem] w-[80rem] -translate-x-1/2 rounded-[50%] opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--primary) 0%, transparent 62%)",
        }}
      />
    </footer>
  );
}
