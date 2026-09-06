import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import MinimalHeroAnimation from "@/components/site/MinimalHeroAnimation";
import { GlobeAnimation } from "@/components/site/GlobeAnimation";
import { RouteTicker } from "@/components/site/RouteTicker";
import { MagneticButton, ArrowGlyph, SectionLabel, Reveal, SplitHeading } from "@/components/site/primitives";
import { CONTACT } from "@/lib/site-data";
import { motion } from "motion/react";

const ServiceExplorer = lazy(() =>
  import("@/components/site/ServiceExplorer").then(({ ServiceExplorer }) => ({
    default: ServiceExplorer,
  })),
);
const CoverageMap = lazy(() =>
  import("@/components/site/CoverageMap").then(({ CoverageMap }) => ({
    default: CoverageMap,
  })),
);
const StatsSection = lazy(() =>
  import("@/components/site/StatsSection").then(({ StatsSection }) => ({
    default: StatsSection,
  })),
);
const IndustryCarousel = lazy(() =>
  import("@/components/site/IndustryStory").then(({ IndustryCarousel }) => ({
    default: IndustryCarousel,
  })),
);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Kinetic Logistics | Same-Day Courier & Freight Services Manchester",
        description:
          "Manchester logistics: same-day courier, next-day delivery, pallet freight, e-commerce fulfilment and international shipping. 24/7 dispatch from our Trafford Park hub.",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero - Minimal Animation */}
        <section className="relative min-h-screen overflow-hidden bg-background pt-[5.5rem]">
          <MinimalHeroAnimation />
          <GlobeAnimation />

          <div className="shell edge relative z-[10] flex min-h-[calc(100vh-5.5rem)] flex-col justify-center pb-16 pt-12 md:pb-24 md:pt-20">
            <SectionLabel index="01">
              EZA Logistics
            </SectionLabel>
            <SplitHeading
              delay={0.15}
              text="Moving business forward."
              className="display-xl mt-8 max-w-5xl text-foreground"
            />
            <Reveal delay={0.55} y={18}>
              <p className="lede mt-8 max-w-2xl text-foreground/70 hidden md:block">
                Same-day courier, next-day delivery, freight, fulfilment and international shipping
                â€” from a Littleborough hub built around real operational pressure, not industry averages.
              </p>
            </Reveal>
            <Reveal delay={0.75} y={16}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton to="/quote" size="lg" variant="lime">
                  Get a Quote <ArrowGlyph />
                </MagneticButton>
                <MagneticButton to="/services" size="lg" variant="ink">
                  Our Services <ArrowGlyph />
                </MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.95} y={14}>
              <div className="mt-16 flex flex-wrap gap-x-8 gap-y-2">
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="label-mono flex items-center gap-2 text-foreground/55 transition-all duration-300 hover:text-primary hover:scale-105"
                >
                  <span className="status-dot animate-pulse" aria-hidden />
                  {CONTACT.phone}
                </a>
                <span className="label-mono text-foreground/40">Office 07:00â€“19:00 Â· Dispatch 24/7</span>
              </div>
            </Reveal>
          </div>
        </section>

        <RouteTicker tone="dark" />

        {/* About/Warehouse Section with Image */}
        <section className="shell edge relative overflow-hidden py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[12px_12px_24px_rgba(84,104,119,0.2),-12px_-12px_24px_rgba(255,255,255,0.8)]">
                <motion.img
                  src="/images/warehouse.jpg"
                  alt="EZA Logistics Warehouse"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <motion.div
                  className="absolute bottom-6 left-6 rounded-2xl bg-primary backdrop-blur-sm px-4 py-2 shadow-[6px_6px_12px_rgba(84,104,119,0.3)]"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-sm font-bold text-white">24/7 Operations</p>
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <SectionLabel index="02">About EZA Logistics</SectionLabel>
                <h2 className="display-md mt-6 text-foreground">
                  Built for speed. <span className="text-primary">Designed for reliability.</span>
                </h2>
                <p className="lede mt-6 text-muted-foreground">
                  From our Littleborough hub, we operate a 24/7 logistics network covering the entire UK. 
                  Every shipment is tracked in real-time, every deadline is a commitment, and every delivery 
                  is backed by our experienced team.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="rounded-2xl bg-background p-6 shadow-[8px_8px_16px_rgba(84,104,119,0.15),-8px_-8px_16px_rgba(255,255,255,0.7)] transition-all duration-300 hover:shadow-[12px_12px_24px_rgba(84,104,119,0.2),-12px_-12px_24px_rgba(255,255,255,0.8)] hover:-translate-y-1">
                    <p className="text-3xl font-bold text-primary">15+</p>
                    <p className="mt-2 text-sm text-muted-foreground">Years Operating</p>
                  </div>
                  <div className="rounded-2xl bg-background p-6 shadow-[8px_8px_16px_rgba(84,104,119,0.15),-8px_-8px_16px_rgba(255,255,255,0.7)] transition-all duration-300 hover:shadow-[12px_12px_24px_rgba(84,104,119,0.2),-12px_-12px_24px_rgba(255,255,255,0.8)] hover:-translate-y-1">
                    <p className="text-3xl font-bold text-primary">98.7%</p>
                    <p className="mt-2 text-sm text-muted-foreground">On-Time Delivery</p>
                  </div>
                </div>
                <div className="mt-8">
                  <MagneticButton to="/contact" variant="ghost">
                    Learn More <ArrowGlyph />
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Driver/Team Section with Image */}
        <section className="shell edge relative overflow-hidden py-20 md:py-32 bg-cream-light rounded-3xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center px-8">
            <Reveal delay={0.1}>
              <div>
                <SectionLabel index="03">Our Team</SectionLabel>
                <h2 className="display-md mt-6 text-foreground">
                  Professional drivers. <span className="text-primary">Personal service.</span>
                </h2>
                <p className="lede mt-6 text-muted-foreground">
                  Every member of our team is fully trained, background-checked, and committed to delivering 
                  your shipments with care. From collection to final delivery, you'll have a dedicated contact 
                  who knows your business and understands your requirements.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "DBS-checked professional drivers",
                    "Real-time GPS tracking on all vehicles",
                    "Dedicated account managers",
                    "24/7 dispatch and customer support",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-muted-foreground"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[12px_12px_24px_rgba(84,104,119,0.2),-12px_-12px_24px_rgba(255,255,255,0.8)]">
                <motion.img
                  src="/images/driver.jpg"
                  alt="Professional EZA Logistics Driver"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 md:py-32">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="02">
                Logistics services
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl">
                Five services that cover how freight actually moves.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Same-day direct, next-day trunking, palletised freight, e-commerce fulfilment and
                international coordination â€” each structured around the real constraints of your operation.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-14">
                <Suspense fallback={null}>
                  <ServiceExplorer />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </section>

        <RouteTicker tone="dark" />

        {/* Coverage */}
        <section className="surface-light py-24 md:py-32">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="03">
                Coverage & reach
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl">
                Manchester hub, national reach.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Direct routes from our Trafford Park hub throughout the North West and beyond,
                with same-day dedicated movements and next-day nationwide delivery.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-14">
                <Suspense fallback={null}>
                  <CoverageMap withSearch />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats */}
        <Suspense fallback={null}>
          <StatsSection />
        </Suspense>

        {/* Industries */}
        <section className="py-24 md:py-32">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="04">
                Industry expertise
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl">
                Built for the sectors where timing is not negotiable.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Retail, manufacturing, healthcare, automotive, legal and hospitality â€” each with
                operational patterns we have learned by moving actual freight under real pressure.
              </p>
            </Reveal>
          </div>
          <div className="mt-14">
            <Suspense fallback={null}>
              <IndustryCarousel />
            </Suspense>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-primary/5 py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="dark" index="05">
                Get started
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-foreground">
                One quote, clear pricing, transparent lead times.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Tell us the postcodes, the weight and the deadline. We will quote it back within
                the hour, explain what moves when, and confirm it in writing before collection.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
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
            className="pointer-events-none absolute -bottom-24 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 rounded-[50%] opacity-[0.18]"
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

