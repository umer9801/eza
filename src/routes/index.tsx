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
        <section className="relative min-h-screen overflow-hidden bg-paper pt-[5.5rem]">
          <MinimalHeroAnimation />
          <GlobeAnimation />

          <div className="shell edge relative z-[10] flex min-h-[calc(100vh-5.5rem)] flex-col justify-center pb-16 pt-12 md:pb-24 md:pt-20">
            <SectionLabel index="01">
              EZA Logistics
            </SectionLabel>
            <SplitHeading
              delay={0.15}
              text="Moving business forward."
              className="display-xl mt-8 max-w-5xl text-ink"
            />
            <Reveal delay={0.55} y={18}>
              <p className="lede mt-8 max-w-2xl text-ink/70 hidden md:block">
                Same-day courier, next-day delivery, freight, fulfilment and international shipping
                — from a Littleborough hub built around real operational pressure, not industry averages.
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
                  className="label-mono flex items-center gap-2 text-ink/55 transition-all duration-300 hover:text-lime hover:scale-105"
                >
                  <span className="status-dot animate-pulse" aria-hidden />
                  {CONTACT.phone}
                </a>
                <span className="label-mono text-ink/40">Office 07:00–19:00 · Dispatch 24/7</span>
              </div>
            </Reveal>
          </div>
        </section>

        <RouteTicker tone="light" />

        {/* About/Warehouse Section with Image */}
        <section className="shell edge relative overflow-hidden py-20 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <motion.img
                  src="/images/warehouse.jpg"
                  alt="EZA Logistics Warehouse"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent" />
                <motion.div
                  className="absolute bottom-6 left-6 rounded-lg bg-champagne/90 backdrop-blur-sm px-4 py-2"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <p className="text-sm font-bold text-noir">24/7 Operations</p>
                </motion.div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <SectionLabel index="02">About EZA Logistics</SectionLabel>
                <h2 className="display-md mt-6 text-ivory">
                  Built for speed. <span className="text-champagne">Designed for reliability.</span>
                </h2>
                <p className="lede mt-6 text-warm-gray">
                  From our Littleborough hub, we operate a 24/7 logistics network covering the entire UK. 
                  Every shipment is tracked in real-time, every deadline is a commitment, and every delivery 
                  is backed by our experienced team.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="rounded-lg border border-champagne/20 bg-charcoal/50 p-6">
                    <p className="text-3xl font-bold text-champagne">15+</p>
                    <p className="mt-2 text-sm text-warm-gray">Years Operating</p>
                  </div>
                  <div className="rounded-lg border border-champagne/20 bg-charcoal/50 p-6">
                    <p className="text-3xl font-bold text-champagne">98.7%</p>
                    <p className="mt-2 text-sm text-warm-gray">On-Time Delivery</p>
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
        <section className="shell edge relative overflow-hidden py-20 md:py-32 bg-obsidian/30">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <Reveal delay={0.1}>
              <div>
                <SectionLabel index="03">Our Team</SectionLabel>
                <h2 className="display-md mt-6 text-ivory">
                  Professional drivers. <span className="text-champagne">Personal service.</span>
                </h2>
                <p className="lede mt-6 text-warm-gray">
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
                      className="flex items-center gap-3 text-warm-gray"
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <motion.img
                  src="/images/driver.jpg"
                  alt="Professional EZA Logistics Driver"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent" />
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
                international coordination — each structured around the real constraints of your operation.
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

        <RouteTicker tone="light" />

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
                Retail, manufacturing, healthcare, automotive, legal and hospitality — each with
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
        <section className="grain relative overflow-hidden bg-ink py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="light" index="05">
                Get started
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-paper">
                One quote, clear pricing, transparent lead times.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-paper/60">
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
            className="pointer-events-none absolute -bottom-24 left-1/2 h-[28rem] w-[60rem] -translate-x-1/2 animate-pulse rounded-[50%] opacity-[0.18]"
            style={{
              background: "radial-gradient(ellipse at center, var(--lime) 0%, transparent 55%)",
              animation: "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
