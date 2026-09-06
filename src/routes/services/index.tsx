import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MagneticButton, ArrowGlyph, SectionLabel, Reveal } from "@/components/site/primitives";
import { SERVICES } from "@/lib/site-data";
import { motion } from "motion/react";
import { Zap, Clock, Package, ShoppingCart, Globe } from "lucide-react";

const SERVICE_ICONS = [Zap, Clock, Package, ShoppingCart, Globe];

const CARD_ACCENTS = [
  { bar: "#FF771C", bg: "rgba(255,119,28,0.06)", stat: "#FF771C" },
  { bar: "#546877", bg: "rgba(84,104,119,0.06)", stat: "#546877" },
  { bar: "#FF771C", bg: "rgba(255,119,28,0.06)", stat: "#FF771C" },
  { bar: "#546877", bg: "rgba(84,104,119,0.06)", stat: "#546877" },
  { bar: "#FF771C", bg: "rgba(255,119,28,0.06)", stat: "#FF771C" },
];

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      {
        title: "Logistics Services | Kinetic Logistics",
        description:
          "Same-day courier, next-day delivery, pallet freight, e-commerce fulfilment and international shipping from Manchester. Five services for every logistics requirement.",
      },
    ],
  }),
});

function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="01">Logistics services</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-xl mt-7 max-w-4xl">
                Five services that cover how freight actually moves.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Same-day direct, next-day trunking, palletised freight, e-commerce fulfilment and
                international coordination — each structured around the real constraints of your operation.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10">
                <MagneticButton to="/quote" size="lg" variant="lime">
                  Get a Quote <ArrowGlyph />
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Services Grid */}
        <section className="pb-20 md:pb-28">
          <div className="shell edge">
            <div className="flex flex-col gap-5">
              {SERVICES.map((service, i) => {
                const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
                const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
                return (
                  <Reveal key={service.slug} delay={0.08 * i}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="group block"
                    >
                      <motion.article
                        className="relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-background"
                        style={{
                          boxShadow: "8px 8px 20px rgba(84,104,119,0.13), -8px -8px 20px rgba(255,255,255,0.7)"
                        }}
                        whileHover={{
                          y: -4,
                          boxShadow: "12px 12px 28px rgba(84,104,119,0.18), -12px -12px 28px rgba(255,255,255,0.8)"
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* Left accent bar */}
                        <div
                          className="hidden md:block w-1.5 flex-shrink-0 rounded-l-3xl transition-all duration-300"
                          style={{ background: accent.bar }}
                        />

                        {/* Icon column */}
                        <div
                          className="flex items-center justify-center w-full md:w-28 py-6 md:py-0 flex-shrink-0 rounded-t-3xl md:rounded-none"
                          style={{ background: accent.bg }}
                        >
                          <div
                            className="flex items-center justify-center w-14 h-14 rounded-2xl"
                            style={{
                              background: "#F5EDE0",
                              boxShadow: `4px 4px 10px rgba(84,104,119,0.15), -4px -4px 10px rgba(255,255,255,0.8)`
                            }}
                          >
                            <Icon size={24} style={{ color: accent.bar }} strokeWidth={1.8} />
                          </div>
                        </div>

                        {/* Main content */}
                        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className="label-mono text-[0.65rem] font-bold px-2 py-0.5 rounded-full"
                                  style={{ background: accent.bg, color: accent.bar }}
                                >
                                  {service.index}
                                </span>
                                <span className="label-mono text-[0.65rem] text-muted-foreground">
                                  {service.window}
                                </span>
                              </div>
                              <h2 className="text-xl md:text-2xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary tracking-tight">
                                {service.name}
                              </h2>
                            </div>
                            <motion.div
                              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl"
                              style={{
                                background: "#F5EDE0",
                                boxShadow: "4px 4px 8px rgba(84,104,119,0.12), -4px -4px 8px rgba(255,255,255,0.6)"
                              }}
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span style={{ color: accent.bar }} className="text-lg font-bold">→</span>
                            </motion.div>
                          </div>

                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:max-w-xl">
                            {service.blurb}
                          </p>

                          {/* Stats row */}
                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            {service.stats.slice(0, 3).map((stat, si) => (
                              <div
                                key={stat.label}
                                className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
                                style={{
                                  background: "#F5EDE0",
                                  boxShadow: "inset 3px 3px 6px rgba(84,104,119,0.1), inset -3px -3px 6px rgba(255,255,255,0.7)"
                                }}
                              >
                                <span
                                  className="data-mono text-sm font-bold"
                                  style={{ color: accent.stat }}
                                >
                                  {stat.value}
                                </span>
                                <span className="label-mono text-[0.6rem] text-muted-foreground">
                                  {stat.label}
                                </span>
                              </div>
                            ))}
                            <div
                              className="flex items-center gap-1.5 rounded-2xl px-4 py-2.5 ml-auto"
                              style={{
                                background: accent.bg,
                                border: `1px solid ${accent.bar}30`
                              }}
                            >
                              <span className="label-mono text-[0.65rem] font-semibold" style={{ color: accent.bar }}>
                                Coverage:
                              </span>
                              <span className="label-mono text-[0.65rem] text-foreground font-medium">
                                {service.coverage}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary/5 py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="dark" index="02">
                Get started
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-foreground">
                Not sure which service fits?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Tell us what you are moving, when it needs to arrive, and what the site constraints
                are. We will recommend the right service and quote it back within the hour.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton to="/quote" size="lg" variant="lime">
                  Get a Quote <ArrowGlyph />
                </MagneticButton>
                <MagneticButton to="/contact" size="lg" variant="ghost">
                  Contact Us <ArrowGlyph />
                </MagneticButton>
              </div>
            </Reveal>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-[50%] opacity-[0.12]"
            style={{
              background: "radial-gradient(ellipse at center, var(--primary) 0%, transparent 55%)",
            }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
