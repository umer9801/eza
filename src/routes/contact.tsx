import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ContactForm } from "@/components/site/ContactForm";
import { MagneticButton, SectionLabel, Reveal } from "@/components/site/primitives";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      {
        title: "Contact Us | Kinetic Logistics",
        description:
          "Get in touch for quotes, account enquiries or general questions. Call 0161 470 2288, email hello@mftcourier.co.uk or use our contact form. Office hours 07:00–19:00.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="01">Get in touch</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-xl mt-7 max-w-4xl">
                We are here to help.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Call for same-day quotes and urgent dispatch, email for non-urgent enquiries, or use
                the form below. We aim to respond within one working day during office hours.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact Methods & Form */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <div className="grid gap-10 lg:grid-cols-[1fr,1.5fr] lg:gap-16">
              {/* Contact Details */}
              <div className="space-y-8">
                <Reveal>
                  <div className="rounded-2xl border border-border bg-card p-8">
                    <h2 className="heading-md mb-6">Contact details</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="heading-sm text-muted-foreground">Phone</h3>
                        <a
                          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                          className="mt-2 block text-lg font-medium hover:text-lime"
                        >
                          {CONTACT.phone}
                        </a>
                        <p className="label-mono mt-1 text-muted-foreground">
                          For urgent same-day requirements
                        </p>
                      </div>

                      <div>
                        <h3 className="heading-sm text-muted-foreground">Email</h3>
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="mt-2 block text-lg font-medium hover:text-lime"
                        >
                          {CONTACT.email}
                        </a>
                        <p className="label-mono mt-1 text-muted-foreground">
                          Response within 60 minutes
                        </p>
                      </div>

                      <div>
                        <h3 className="heading-sm text-muted-foreground">Office hours</h3>
                        <p className="mt-2 text-lg font-medium">07:00–19:00</p>
                        <p className="label-mono mt-1 text-muted-foreground">
                          Monday to Friday
                        </p>
                      </div>

                      <div>
                        <h3 className="heading-sm text-muted-foreground">Dispatch</h3>
                        <p className="mt-2 text-lg font-medium">24/7, 365 days</p>
                        <p className="label-mono mt-1 text-muted-foreground">
                          Out-of-hours rates apply
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="rounded-2xl border border-border bg-card p-8">
                    <h2 className="heading-md mb-6">Quick links</h2>
                    <div className="space-y-3">
                      <MagneticButton to="/quote" variant="lime" className="w-full">
                        Quote Calculator →
                      </MagneticButton>
                      <MagneticButton to="/services" variant="ghost" className="w-full">
                        View Services →
                      </MagneticButton>
                      <MagneticButton to="/how-it-works" variant="ghost" className="w-full">
                        How It Works →
                      </MagneticButton>
                    </div>
                  </div>
                </Reveal>
              </div>

              {/* Contact Form */}
              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="heading-md mb-2">Send us a message</h2>
                  <p className="label-mono mb-8 text-muted-foreground">
                    Fill in your details and we will get back to you within one working day.
                  </p>
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Location & Address */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="02">Our hub</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Trafford Park, Manchester.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <div className="rounded-xl border border-border bg-card p-8">
                    <h3 className="heading-sm text-muted-foreground">Address</h3>
                    <address className="mt-3 not-italic">
                      {CONTACT.hub}
                    </address>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-8">
                    <h3 className="heading-sm text-muted-foreground">Access</h3>
                    <p className="mt-3 text-muted-foreground">
                      Direct access from the M60 motorway. On-site parking available for customer
                      collections and drop-offs during office hours.
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-8">
                    <h3 className="heading-sm text-muted-foreground">Drop-off hours</h3>
                    <p className="mt-3 text-muted-foreground">
                      Monday to Friday, 08:00–17:00. Call ahead for out-of-hours drop-off
                      arrangements on urgent movements.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="rounded-xl border border-border bg-card p-8">
                  <h3 className="heading-md mb-6">Why this location?</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Trafford Park sits at the intersection of the M60, M62 and M6 — the three
                      primary motorway routes serving Greater Manchester, the North West and the rest
                      of the UK.
                    </p>
                    <p>
                      This central position means same-day collections throughout the region start
                      from a hub that is already 15 minutes closer to every customer than a
                      satellite depot would be.
                    </p>
                    <p>
                      For next-day trunking, our location on the established overnight freight
                      corridor means consignments move directly onto the national network without
                      backtracking through secondary consolidation points.
                    </p>
                    <p className="rounded-lg bg-lime/10 p-4 font-medium text-foreground">
                      Central location = faster collection times = lower mileage costs = better
                      service windows for you.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Alternative Contact Methods */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="03">Other ways to reach us</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Choose what works for you.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">01</div>
                  <h3 className="heading-md mt-4">Same-day phone quotes</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Call {CONTACT.phone} during office hours. We will quote back over the phone and
                    confirm in writing by email before collection.
                  </p>
                  <div className="mt-6">
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="text-sm font-medium text-lime hover:underline"
                    >
                      Call now →
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">02</div>
                  <h3 className="heading-md mt-4">Email enquiries</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Send your requirements to {CONTACT.email}. We aim to respond within 60 minutes
                    during office hours.
                  </p>
                  <div className="mt-6">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-sm font-medium text-lime hover:underline"
                    >
                      Send email →
                    </a>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-lime">03</div>
                  <h3 className="heading-md mt-4">Online quote calculator</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Get instant pricing with our transparent quote engine. Enter postcodes, weight
                    and service level for a detailed breakdown.
                  </p>
                  <div className="mt-6">
                    <MagneticButton to="/quote" variant="lime" size="md">
                      Get a quote →
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="grain relative overflow-hidden bg-ink py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="light" index="04">
                Ready to book?
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-paper">
                Let us move your freight.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-paper/60">
                Whether you need a same-day dedicated vehicle in the next hour or a scheduled
                next-day delivery, we are here to help. Get a quote, ask a question, or book a collection.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton to="/quote" size="lg" variant="lime">
                  Get a Quote →
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
