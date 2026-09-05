import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CoverageMap } from "@/components/site/CoverageMap";
import { MagneticButton, ArrowGlyph, SectionLabel, Reveal, Stat } from "@/components/site/primitives";
import { CITIES, HUB, CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/coverage")({
  component: CoveragePage,
  head: () => ({
    meta: [
      {
        title: "Coverage & Routes | Kinetic Logistics",
        description:
          "Same-day dedicated service across the North West from our Manchester hub. Next-day delivery UK-wide. Check postcode coverage and transit times.",
      },
    ],
  }),
});

function CoveragePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="01">Coverage & routes</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-xl mt-7 max-w-4xl">
                Manchester hub, national reach.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Direct routes from our Trafford Park hub throughout the North West and beyond,
                with same-day dedicated movements and next-day nationwide delivery.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10">
                <MagneticButton to="/quote" size="lg" variant="lime">
                  Get a Quote <ArrowGlyph />
                </MagneticButton>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.4}>
              <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 lg:max-w-4xl">
                <Stat value="<60 MIN" label="Avg. collection (MCR)" />
                <Stat value="98.7%" label="On-time delivery" />
                <Stat value="24/7" label="Dispatch availability" />
                <Stat value="UK" label="Next-day coverage" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Map */}
        <section className="surface-dark grain py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <div>
                <CoverageMap withSearch />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Key Routes */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="02">Key routes</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Direct routes from {HUB.name}.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Typical transit times for same-day dedicated movements from our Trafford Park hub.
                Next-day services available nationwide with pre-noon and timed upgrades.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {CITIES.map((city) => (
                  <div
                    key={city.id}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="heading-md">{city.name}</h3>
                        <p className="label-mono mt-1 text-muted-foreground">
                          {city.region}
                        </p>
                      </div>
                      <div
                        className="flex h-7 items-center justify-center rounded-full px-3 text-xs font-medium"
                        style={{
                          backgroundColor:
                            city.status === "Clear"
                              ? "var(--lime-dim)"
                              : city.status === "Busy"
                                ? "hsl(38, 85%, 50%)"
                                : "hsl(0, 0%, 50%)",
                          color: "var(--ink)",
                        }}
                      >
                        {city.status}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <div className="data-mono text-xl">{city.minutes} MIN</div>
                        <div className="label-mono mt-1 text-muted-foreground">
                          Transit time
                        </div>
                      </div>
                      <div>
                        <div className="data-mono text-xl">{city.miles} MI</div>
                        <div className="label-mono mt-1 text-muted-foreground">
                          Distance
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-muted/30 p-3">
                      <p className="label-mono text-muted-foreground">
                        {city.service}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Service Areas */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="03">Service areas</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                What we cover, and how.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">01</div>
                  <h3 className="heading-md mt-4">Greater Manchester</h3>
                  <p className="mt-4 text-muted-foreground">
                    Same-day dedicated collection within 30–60 minutes. Direct routing with no depot
                    stop between collection and delivery.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="label-mono text-muted-foreground">
                      Collection: <span className="text-foreground">30–60 min</span>
                    </div>
                    <div className="label-mono text-muted-foreground">
                      Availability: <span className="text-foreground">24/7</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">02</div>
                  <h3 className="heading-md mt-4">North West</h3>
                  <p className="mt-4 text-muted-foreground">
                    Same-day and next-day services throughout Lancashire, Merseyside, Cheshire and
                    the wider region. Direct and trunked options available.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="label-mono text-muted-foreground">
                      Collection: <span className="text-foreground">60–90 min</span>
                    </div>
                    <div className="label-mono text-muted-foreground">
                      Service: <span className="text-foreground">Same/next-day</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">03</div>
                  <h3 className="heading-md mt-4">UK Mainland</h3>
                  <p className="mt-4 text-muted-foreground">
                    Next-day delivery nationwide with pre-09:00 and pre-noon upgrades. Same-day
                    dedicated available on request for longer runs.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="label-mono text-muted-foreground">
                      Cut-off: <span className="text-foreground">17:00</span>
                    </div>
                    <div className="label-mono text-muted-foreground">
                      Delivery: <span className="text-foreground">Next working day</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Hub Details */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <div className="grid gap-10 lg:grid-cols-[1fr,1.2fr] lg:gap-16">
              <Reveal>
                <div>
                  <SectionLabel index="04">Our hub</SectionLabel>
                  <h2 className="display-md mt-7">
                    Trafford Park, Manchester.
                  </h2>
                  <p className="lede mt-6 text-muted-foreground">
                    Central location with direct access to the M60, M62 and M6. Purpose-built
                    logistics facility with 24/7 dispatch operations.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-6 rounded-xl border border-border bg-card p-8">
                  <div>
                    <h3 className="heading-sm text-muted-foreground">Address</h3>
                    <p className="mt-2">{CONTACT.hub}</p>
                  </div>

                  <div>
                    <h3 className="heading-sm text-muted-foreground">Contact</h3>
                    <div className="mt-2 space-y-1">
                      <a
                        href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                        className="block font-medium hover:text-lime"
                      >
                        {CONTACT.phone}
                      </a>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="block font-medium hover:text-lime"
                      >
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="heading-sm text-muted-foreground">Hours</h3>
                    <p className="mt-2">{CONTACT.hours}</p>
                  </div>

                  <div className="rounded-lg bg-lime/10 p-4">
                    <p className="label-mono text-muted-foreground">
                      Out-of-hours dispatch available for urgent same-day movements at published rates.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="grain relative overflow-hidden bg-ink py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="light" index="05">
                Get started
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-paper">
                Check your route and get a quote.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-paper/60">
                Enter your postcodes and shipment details in the quote calculator. We will show you
                the distance, transit time and a transparent breakdown of costs.
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
