import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MagneticButton, ArrowGlyph, SectionLabel, Reveal } from "@/components/site/primitives";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [
      {
        title: "How It Works | Kinetic Logistics",
        description:
          "From quote to delivery in four clear steps. Book online or over the phone, track in real time, and receive proof of delivery the moment it lands.",
      },
    ],
  }),
});

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Brief",
    subtitle: "Tell us what you need",
    description:
      "Call, email or use the online quote form. Tell us the postcodes, the weight, the dimensions and when it needs to arrive. We will quote it back within the hour with a clear breakdown.",
    details: [
      "Online quote calculator with instant pricing",
      "Phone quotes during office hours",
      "Email quotes responded to within 60 minutes",
      "Transparent breakdown of all charges",
    ],
  },
  {
    step: "02",
    title: "Book",
    subtitle: "Confirm and we dispatch",
    description:
      "Accept the quote and confirm collection details. For same-day movements, the nearest suitable vehicle is allocated immediately. For next-day and scheduled bookings, your consignment is logged and collection arranged.",
    details: [
      "Written confirmation with consignment reference",
      "Named contact for the movement",
      "Collection window confirmed in writing",
      "Any site-specific requirements logged",
    ],
  },
  {
    step: "03",
    title: "Track",
    subtitle: "Live updates, start to finish",
    description:
      "Same-day dedicated movements are tracked door-to-door with milestone updates. Next-day services provide reference-level tracking with collection, in-transit and out-for-delivery notifications.",
    details: [
      "Dedicated same-day: driver contact and live updates",
      "Next-day: milestone notifications via SMS/email",
      "Call the office for real-time status updates",
      "Proactive exception handling if delays occur",
    ],
  },
  {
    step: "04",
    title: "Confirm",
    subtitle: "Proof of delivery",
    description:
      "Electronic proof of delivery issued the moment your shipment lands. Signature, timestamp and photo evidence where required. POD available immediately via email or customer portal.",
    details: [
      "Signature capture with recipient name",
      "GPS timestamp and delivery location",
      "Photographic evidence for high-value items",
      "POD emailed within minutes of delivery",
    ],
  },
];

const FEATURES = [
  {
    title: "Account Setup",
    description:
      "Open an account with agreed rates, payment terms and standing collection slots. One-off and casual customers welcome â€” no minimum volume required.",
  },
  {
    title: "Collection Options",
    description:
      "Daily scheduled collection from your site, ad-hoc same-day dispatch, or drop-off to our Trafford Park hub during office hours.",
  },
  {
    title: "Packaging Guidance",
    description:
      "We will advise on packaging standards for your goods. Fragile, high-value or hazardous items handled to specification with any required documentation.",
  },
  {
    title: "Insurance & Liability",
    description:
      "Standard liability cover included. Extended insurance available for high-value shipments â€” confirm requirements at the quote stage.",
  },
  {
    title: "Invoicing & Payment",
    description:
      "Account customers invoiced weekly or monthly to agreed terms. One-off movements taken by card over the phone or bank transfer before collection.",
  },
  {
    title: "Returns Handling",
    description:
      "Inbound returns managed back through our hub, inspected and processed to your rules, then restocked or quarantined as required.",
  },
];

function HowItWorksPage() {
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start 70%", "end 35%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });
  const lineMarkerPosition = useTransform(lineProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="01">How it works</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-xl mt-7 max-w-4xl">
                From quote to delivery in four clear steps.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Book online or over the phone, track in real time, and receive proof of delivery the
                moment it lands. No jargon, no hidden fees, no surprises.
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
          </div>
        </section>

        {/* Process Steps */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <div ref={processRef} className="relative mx-auto max-w-5xl">
              <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 rounded-full bg-[rgba(84,104,119,0.18)] md:block" aria-hidden>
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top rounded-full bg-primary"
                  style={{ scaleY: lineProgress }}
                >
                  <motion.span
                    className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(255,119,28,0.14),0_0_14px_rgba(255,119,28,0.7)]"
                    style={{ top: lineMarkerPosition }}
                  />
                </motion.div>
              </div>

              {PROCESS_STEPS.map((item, i) => (
                <motion.article
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mb-10 last:mb-0 md:grid md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:items-start md:gap-6 md:mb-16"
                >
                  <div className={i % 2 === 0 ? "md:col-start-3" : "md:col-start-1 md:row-start-1"}>
                    <div className="rounded-[2rem] border border-[rgba(84,104,119,0.08)] bg-[#F5EDE0] p-6 shadow-[8px_8px_18px_rgba(84,104,119,0.12),-8px_-8px_18px_rgba(255,255,255,0.75)] md:p-8">
                      <div>
                        <div className="label-mono text-primary md:hidden">{item.step}</div>
                        <h2 className="display-md mt-2 md:mt-0">{item.title}</h2>
                        <p className="heading-sm mt-2 text-muted-foreground">{item.subtitle}</p>
                        <p className="mt-6 text-lg leading-relaxed text-foreground/90">{item.description}</p>
                        <ul className="mt-6 space-y-3">
                          {item.details.map((detail, j) => (
                            <motion.li
                              key={j}
                              initial={{ opacity: 0, x: i % 2 === 0 ? 12 : -12 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-10%" }}
                              transition={{ duration: 0.4, delay: i * 0.12 + j * 0.08 }}
                              className="flex gap-3"
                            >
                              <span className="data-mono mt-1 text-primary">→</span>
                              <span className="text-muted-foreground">{detail}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="relative hidden min-h-full items-start justify-center md:col-start-2 md:row-start-1 md:flex">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.1 + 0.12 }}
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(255,119,28,0.35)] bg-[#F5EDE0] text-xs font-semibold text-primary shadow-[4px_4px_10px_rgba(84,104,119,0.12),-4px_-4px_10px_rgba(255,255,255,0.75)]"
                    >
                      {item.step}
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="02">Additional details</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Everything else you need to know.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Accounts, payment terms, packaging, insurance and returns â€” the operational details
                that matter when you are moving freight regularly.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((feature, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <h3 className="heading-md">{feature.title}</h3>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Booking Methods */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="03">Booking methods</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Three ways to book.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-primary">01</div>
                  <h3 className="heading-md mt-4">Online Quote</h3>
                  <p className="mt-4 text-muted-foreground">
                    Use the quote calculator to get instant pricing with a transparent breakdown.
                    Save or email the quote, then call or email to confirm.
                  </p>
                  <div className="mt-6">
                    <MagneticButton to="/quote" variant="lime" className="w-full">
                      Quote Calculator <ArrowGlyph />
                    </MagneticButton>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-primary">02</div>
                  <h3 className="heading-md mt-4">Phone</h3>
                  <p className="mt-4 text-muted-foreground">
                    Call the office during working hours. Quote provided over the phone, confirmed
                    in writing by email before collection.
                  </p>
                  <div className="mt-6 space-y-2">
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="block font-medium hover:text-primary"
                    >
                      {CONTACT.phone}
                    </a>
                    <p className="label-mono text-muted-foreground">
                      Office 07:00â€“19:00
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-primary">03</div>
                  <h3 className="heading-md mt-4">Email</h3>
                  <p className="mt-4 text-muted-foreground">
                    Email your requirements and we will quote back within the hour during office
                    hours. Include postcodes, weight, dimensions and deadline.
                  </p>
                  <div className="mt-6">
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="block font-medium hover:text-primary"
                    >
                      {CONTACT.email}
                    </a>
                    <p className="label-mono mt-2 text-muted-foreground">
                      Response within 60 min
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary/5 py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="dark" index="04">
                Get started
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-foreground">
                Ready to book your first shipment?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Get an instant quote online, or call the office to talk through your requirements.
                Quote confirmed in writing before we collect, with transparent pricing and clear lead times.
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
              background: "radial-gradient(ellipse at center, var(--primary) 0%, transparent 55%)",
            }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

