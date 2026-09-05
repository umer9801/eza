import { createFileRoute, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MagneticButton, ArrowGlyph, SectionLabel, Reveal, Hairline, Stat } from "@/components/site/primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceBySlug, CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  component: ServicePage,
  beforeLoad: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    if (!service) return {};
    return {
      meta: [
        {
          title: `${service.name} | Kinetic Logistics`,
          description: `${service.blurb} ${service.window} · ${service.coverage}`,
        },
      ],
    };
  },
});

function ServicePage() {
  const { service } = Route.useRouteContext();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        {/* Hero */}
        <section className="grain relative overflow-hidden bg-charcoal py-16 md:py-24">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="light" index={service.index}>
                {service.name}
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-xl mt-7 max-w-4xl text-ivory">
                {service.hero}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-ivory/70">
                {service.blurb}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton to="/quote" size="lg" variant="lime">
                  Get a Quote <ArrowGlyph />
                </MagneticButton>
                <MagneticButton
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  size="lg"
                  variant="ghost"
                >
                  Call {CONTACT.phone}
                </MagneticButton>
              </div>
            </Reveal>

            {/* Quick stats */}
            <Reveal delay={0.4}>
              <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:max-w-3xl">
                {service.stats.map((stat) => (
                  <Stat
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    className="border-ivory/20"
                  />
                ))}
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

        {/* Problem / Solution */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <div>
                  <h2 className="heading-sm text-muted-foreground">The problem</h2>
                  <p className="mt-4 text-lg leading-relaxed">{service.problem}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div>
                  <h2 className="heading-sm text-lime">The solution</h2>
                  <p className="mt-4 text-lg leading-relaxed">{service.solution}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel>Common use cases</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Where this service fits.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-10 grid gap-4 md:grid-cols-2">
                {service.useCases.map((useCase, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-lg border border-border bg-card p-5"
                  >
                    <span className="data-mono mt-0.5 text-lime">→</span>
                    <span className="text-base">{useCase}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel>Service specifications</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                What you need to know.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {service.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card p-6"
                  >
                    <div className="label-mono text-muted-foreground">
                      {spec.label}
                    </div>
                    <div className="heading-sm mt-2">{spec.value}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel>How it works</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Four steps from brief to delivery.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {service.process.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-8"
                  >
                    <div className="label-mono text-lime-dim">{step.step}</div>
                    <h3 className="heading-md mt-3">{step.title}</h3>
                    <p className="mt-4 text-muted-foreground">{step.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel>Frequently asked</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Questions about {service.name.toLowerCase()}.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 max-w-3xl">
                <Accordion type="single" collapsible className="space-y-4">
                  {service.faq.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`item-${i}`}
                      className="rounded-lg border border-border bg-card px-6"
                    >
                      <AccordionTrigger className="heading-sm text-left hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="grain relative overflow-hidden bg-charcoal py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="light">Get started</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-ivory">
                Ready to book {service.name.toLowerCase()}?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-ivory/60">
                Quote back within the hour. Transparent pricing, clear lead times, and a named
                contact who can track your shipment from collection through to delivery.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton to="/quote" size="lg" variant="lime">
                  Get a Quote <ArrowGlyph />
                </MagneticButton>
                <MagneticButton to="/services" size="lg" variant="ghost">
                  View All Services <ArrowGlyph />
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
