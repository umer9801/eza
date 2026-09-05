import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MagneticButton, ArrowGlyph, SectionLabel, Reveal, Stat } from "@/components/site/primitives";
import { SERVICES } from "@/lib/site-data";
import { cn } from "@/lib/utils";

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
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {SERVICES.map((service, i) => (
                <Reveal key={service.slug} delay={0.1 * i}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="group block"
                  >
                    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-champagne/50 hover:bg-card/80 hover:shadow-[0_8px_30px_rgb(200,169,121,0.12)] hover:-translate-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="label-mono font-semibold text-champagne-light transition-colors duration-300 group-hover:text-champagne">{service.index}</div>
                          <h2 className="heading-lg mt-3 font-semibold transition-colors duration-300 group-hover:text-champagne">{service.name}</h2>
                        </div>
                        <div className="data-mono text-3xl font-semibold text-champagne opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-2">
                          →
                        </div>
                      </div>

                      <p className="mt-4 leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{service.blurb}</p>

                      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                        <div className="label-mono text-muted-foreground transition-colors duration-300">
                          <span className="font-medium text-foreground group-hover:text-champagne">{service.window}</span>
                        </div>
                        <div className="label-mono text-muted-foreground transition-colors duration-300">
                          Coverage: <span className="font-medium text-foreground group-hover:text-champagne">{service.coverage}</span>
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 transition-colors duration-300 group-hover:border-champagne/30">
                        {service.stats.map((stat, index) => (
                          <div 
                            key={stat.label}
                            className="transform transition-all duration-300"
                            style={{ 
                              transitionDelay: `${index * 50}ms` 
                            }}
                          >
                            <div className="data-mono text-lg font-semibold transition-colors duration-300 group-hover:text-champagne">{stat.value}</div>
                            <div className="label-mono mt-1 text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-champagne">
                        View service details
                        <ArrowGlyph className="transition-transform duration-500 group-hover:translate-x-2" />
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="grain relative overflow-hidden bg-ink py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="light" index="02">
                Get started
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-paper">
                Not sure which service fits?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-paper/60">
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
              background: "radial-gradient(ellipse at center, var(--lime) 0%, transparent 55%)",
            }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
