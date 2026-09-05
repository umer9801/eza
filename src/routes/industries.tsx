import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MagneticButton, ArrowGlyph, SectionLabel, Reveal } from "@/components/site/primitives";
import { INDUSTRIES } from "@/lib/site-data";

export const Route = createFileRoute("/industries")({
  component: IndustriesPage,
  head: () => ({
    meta: [
      {
        title: "Industries We Serve | Kinetic Logistics",
        description:
          "Sector-specific logistics for retail, manufacturing, healthcare, automotive, legal and hospitality. Solutions built around real operational pressure, not industry averages.",
      },
    ],
  }),
});

function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="01">Industry expertise</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-xl mt-7 max-w-4xl">
                Built for the sectors where timing is not negotiable.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Retail, manufacturing, healthcare, automotive, legal and hospitality — each with
                operational patterns we have learned by moving actual freight under real pressure.
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

        {/* Industries Grid */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <div className="space-y-16 md:space-y-24">
              {INDUSTRIES.map((industry, i) => (
                <Reveal key={industry.id} delay={i * 0.05}>
                  <article className="grid gap-10 lg:grid-cols-[1fr,1.5fr] lg:gap-16">
                    <div>
                      <div className="label-mono text-lime-dim">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h2 className="display-md mt-3">{industry.name}</h2>
                      <p className="heading-sm mt-3 text-muted-foreground">
                        {industry.challenge}
                      </p>
                      <div className="mt-8">
                        <Link
                          to="/services/$slug"
                          params={{ slug: industry.slug }}
                          className="group inline-flex items-center gap-2 text-sm font-medium text-lime"
                        >
                          View {industry.service}
                          <ArrowGlyph className="transition-transform duration-500 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-xl border border-border bg-card p-6">
                        <h3 className="heading-sm text-muted-foreground">The problem</h3>
                        <p className="mt-3 text-muted-foreground">{industry.problem}</p>
                      </div>

                      <div className="rounded-xl border border-lime/20 bg-lime/5 p-6">
                        <h3 className="heading-sm text-lime">The solution</h3>
                        <p className="mt-3">{industry.solution}</p>
                      </div>

                      <div className="rounded-xl border border-border bg-card p-6">
                        <h3 className="heading-sm text-muted-foreground">The result</h3>
                        <p className="mt-3 text-muted-foreground">{industry.result}</p>
                      </div>
                    </div>
                  </article>
                  {i < INDUSTRIES.length - 1 && (
                    <div className="mx-auto h-px w-full max-w-4xl bg-border" />
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Sector Focus Matters */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="02">Why sector focus matters</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Understanding the constraints makes the difference.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Generic logistics services treat every shipment the same. Sector-specific experience
                means we understand what breaks first when pressure arrives.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">01</div>
                  <h3 className="heading-md mt-4">Operational patterns</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Every sector has peak periods, cut-off deadlines and failure modes. We schedule
                    around them because we have seen what happens when you don't.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">02</div>
                  <h3 className="heading-md mt-4">Site constraints</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Workshop bays, hospital loading docks, restaurant service windows — each with
                    access restrictions and receiving protocols that must be understood in advance.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">03</div>
                  <h3 className="heading-md mt-4">Compliance requirements</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Healthcare chain of custody, legal filing deadlines, automotive warranty terms —
                    freight that moves under documentation requirements we confirm before collection.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">04</div>
                  <h3 className="heading-md mt-4">Consequence awareness</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    A late parcel is an apology email. A late component is an idle production line.
                    We price and plan around what actually happens when the delivery misses.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">05</div>
                  <h3 className="heading-md mt-4">Peak planning</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Black Friday, January sale, pre-Christmas fulfilment — peak arrives at different
                    times in different sectors, and we scale capacity accordingly.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">06</div>
                  <h3 className="heading-md mt-4">Recovery protocols</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    When a network service fails or a supplier misses, we know which recovery option
                    fits the sector and can mobilise a same-day solution within the hour.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Case Study Highlight */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="03">Real-world example</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                When a production line goes down at 08:00.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 max-w-3xl space-y-6">
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="label-mono text-muted-foreground">08:15</div>
                  <p className="mt-3">
                    A manufacturing customer calls. A pneumatic actuator has failed and the line is
                    static. The replacement part is in their supplier's warehouse in Birmingham, 87
                    miles away. Production is already losing £2,400 per hour.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="label-mono text-muted-foreground">08:22</div>
                  <p className="mt-3">
                    We quote back within seven minutes. Same-day dedicated, tail-lift vehicle,
                    collection from the supplier within 60 minutes, direct to the factory with no
                    depot stop. Cost: £187. Alternative: wait until tomorrow and lose another shift.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="label-mono text-muted-foreground">09:30</div>
                  <p className="mt-3">
                    Vehicle collects from Birmingham. Part photographed, secured and driver given the
                    production manager's direct mobile number. Customer receives live updates as the
                    vehicle moves.
                  </p>
                </div>

                <div className="rounded-xl border border-lime/20 bg-lime/5 p-8">
                  <div className="label-mono text-lime-dim">11:15</div>
                  <p className="mt-3">
                    Part delivered to the factory goods-in. Maintenance fit the actuator and the line
                    restarts before the lunch break. Downtime: 3 hours. Cost of delay avoided:
                    £4,800.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 max-w-3xl">
                <p className="lede text-muted-foreground">
                  This is not an unusual event. It is Tuesday. Sector experience means we understand
                  the cost of delay, we size the vehicle to the site before dispatch, and we treat a
                  line-down call with the urgency it actually carries.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="grain relative overflow-hidden bg-ink py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="light" index="04">
                Get started
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-paper">
                Logistics that understands your sector.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-paper/60">
                Tell us what you are moving, what the constraints are, and what happens if it is late.
                We will recommend the right service and quote it back with sector-specific understanding.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton to="/quote" size="lg" variant="lime">
                  Get a Quote <ArrowGlyph />
                </MagneticButton>
                <MagneticButton to="/services" size="lg" variant="ghost">
                  View Services <ArrowGlyph />
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
