import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MagneticButton, ArrowGlyph, SectionLabel, Reveal, AnimatedCounter } from "@/components/site/primitives";
import { SIZES, SPEEDS, HANDLING, MIN_CHARGE, gbp, calculateQuote, type SizeId, type SpeedId } from "@/lib/site-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      {
        title: "Transparent Pricing | Kinetic Logistics",
        description:
          "Clear, predictable pricing with no hidden fees. Base charge, mileage, service speed and handling charges explained. Use our online calculator for instant quotes.",
      },
    ],
  }),
});

const PRICING_FACTORS = [
  {
    title: "Base Charge",
    description:
      "Starting price determined by shipment size â€” from small parcels through to full freight loads. Covers vehicle allocation and the first stage of the movement.",
    example: "Small parcel: Â£18 Â· Pallet: Â£72 Â· Freight: Â£145",
  },
  {
    title: "Mileage",
    description:
      "Distance-based charge calculated from real UK postcode areas. Per-mile rate scales with shipment size and vehicle type required.",
    example: "Medium parcel: Â£1.05/mile Â· Freight: Â£2.60/mile",
  },
  {
    title: "Service Speed",
    description:
      "Multiplier based on urgency. Same-day dedicated commands a premium; scheduled services offer a discount against the standard next-day rate.",
    example: "Same-day: 1.85Ã— Â· Next-day: 1Ã— Â· Scheduled: 0.86Ã—",
  },
  {
    title: "Weight Surcharge",
    description:
      "Applied when shipment weight exceeds the standard maximum for its size category. Charged per kilogram over the threshold.",
    example: "Â£0.65/kg over category limit",
  },
  {
    title: "Handling Fees",
    description:
      "Fixed charges for specialist equipment or requirements â€” tail-lift, temperature control, two-person handling or fragile goods protocols.",
    example: "Tail-lift: Â£25 Â· Temperature: Â£32 Â· Two-person: Â£45",
  },
  {
    title: "Fuel Surcharge",
    description:
      "Variable surcharge (currently 7%) applied to subtotal to cover fluctuating diesel costs. Reviewed quarterly and published on the website.",
    example: "7% of pre-fuel subtotal (current rate)",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is VAT included in quoted prices?",
    a: "All quotes show the subtotal and VAT separately, with the total price inclusive of VAT at 20%. Business customers with a valid VAT number may be invoiced exclusive depending on their account terms.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. The quote calculator shows every component â€” base, mileage, speed uplift, handling, fuel and VAT. What you see is what you pay, confirmed in writing before collection.",
  },
  {
    q: "What is the minimum charge?",
    a: `The minimum charge for any movement is ${gbp(MIN_CHARGE)} inclusive of VAT. This applies even when the calculated subtotal falls below that threshold.`,
  },
  {
    q: "Do you offer account discounts?",
    a: "Yes. Regular customers can open an account with agreed rates based on volume and frequency. Contact us to discuss account terms and standing collection arrangements.",
  },
  {
    q: "How does out-of-hours pricing work?",
    a: "Evening, night, weekend and bank holiday collections incur an additional surcharge on the standard rate. Out-of-hours rates are published and confirmed at the quote stage.",
  },
  {
    q: "What if the weight or dimensions were wrong?",
    a: "If the actual shipment is significantly larger or heavier than quoted, the driver will advise and the difference will be invoiced. We recommend weighing and measuring before booking to avoid surprises.",
  },
  {
    q: "Can I get a refund if I cancel?",
    a: "Cancellations made before the driver is dispatched incur no charge. Once the vehicle is en route to collection, a cancellation fee may apply depending on how far the movement has progressed.",
  },
  {
    q: "Do you price-match competitors?",
    a: "We price transparently based on real costs and service commitments. If you have received a significantly lower quote elsewhere, call us to discuss â€” there may be differences in service level, coverage or terms.",
  },
];

function PricingPage() {
  const [selectedSize, setSelectedSize] = useState<SizeId>("medium");
  const [selectedSpeed, setSelectedSpeed] = useState<SpeedId>("next-day");
  const [distance, setDistance] = useState(50);
  const [weight, setWeight] = useState(10);
  const [animatePrice, setAnimatePrice] = useState(false);

  // Calculate price manually to use the distance slider value
  const size = SIZES.find((s) => s.id === selectedSize) ?? SIZES[0];
  const speed = SPEEDS.find((s) => s.id === selectedSpeed) ?? SPEEDS[1];
  
  const base = size.base;
  const mileage = Math.round(distance * size.perMile * 100) / 100;
  const raw = base + mileage;
  const speedUplift = Math.round((raw * (speed.multiplier - 1)) * 100) / 100;
  
  const overweight = Math.max(0, weight - size.maxKg);
  const weightSurcharge = Math.round(overweight * 0.65 * 100) / 100;
  
  const preFuel = raw + speedUplift + weightSurcharge;
  const fuel = Math.round(preFuel * 0.07 * 100) / 100;
  let subtotal = Math.round((preFuel + fuel) * 100) / 100;
  if (subtotal < MIN_CHARGE) subtotal = MIN_CHARGE;
  const vat = Math.round(subtotal * 0.2 * 100) / 100;
  const total = Math.round((subtotal + vat) * 100) / 100;

  const estimatedPrice = Math.round(total);

  const quote = {
    base,
    mileage,
    speedUplift,
    weightSurcharge,
    fuel,
    subtotal,
    vat,
    total,
  };

  // Trigger animation whenever price changes
  useEffect(() => {
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 600);
    return () => clearTimeout(timer);
  }, [estimatedPrice]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="01">Pricing</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-xl mt-7 max-w-4xl">
                Transparent pricing, no hidden fees.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Every quote breaks down base charge, mileage, service speed, handling and fuel.
                What you see is what you pay, confirmed in writing before we collect.
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

        {/* Interactive Calculator */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="02">Try the calculator</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                See pricing change in real-time.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr,1fr]">
                {/* Controls */}
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Size Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="heading-sm mb-4">Parcel Size</h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {SIZES.slice(0, 4).map((size, i) => (
                        <motion.button
                          key={size.id}
                          onClick={() => setSelectedSize(size.id as SizeId)}
                          className={`rounded-lg border-2 p-4 text-left transition-all ${
                            selectedSize === size.id
                              ? "border-primary bg-primary/10"
                              : "border-border bg-card hover:border-primary/40"
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="heading-sm">{size.name}</div>
                          <div className="label-mono mt-1 text-muted-foreground">
                            up to {size.maxKg}kg
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Speed Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="heading-sm mb-4">Speed</h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {SPEEDS.slice(0, 3).map((speed, i) => (
                        <motion.button
                          key={speed.id}
                          onClick={() => setSelectedSpeed(speed.id as SpeedId)}
                          className={`rounded-lg border-2 p-4 text-left transition-all ${
                            selectedSpeed === speed.id
                              ? "border-primary bg-primary/10"
                              : "border-border bg-card hover:border-primary/40"
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="heading-sm">{speed.name}</div>
                          <div className="label-mono mt-1 text-muted-foreground">
                            {speed.eta}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Distance Slider */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="mb-4 flex items-end justify-between">
                      <h3 className="heading-sm">Distance from Manchester</h3>
                      <motion.span 
                        key={distance}
                        initial={{ scale: 1.3, color: "var(--primary)" }}
                        animate={{ scale: 1, color: "var(--primary)" }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        className="data-mono text-xl"
                      >
                        {distance} miles
                      </motion.span>
                    </div>
                    <Slider
                      value={[distance]}
                      onValueChange={(v) => setDistance(v[0])}
                      min={5}
                      max={350}
                      step={5}
                      className="w-full"
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>Local</span>
                      <span>National</span>
                    </div>
                  </motion.div>

                  {/* Weight Slider */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                  >
                    <div className="mb-4 flex items-end justify-between">
                      <h3 className="heading-sm">Weight</h3>
                      <motion.span 
                        key={weight}
                        initial={{ scale: 1.3, color: "var(--primary)" }}
                        animate={{ scale: 1, color: "var(--primary)" }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        className="data-mono text-xl"
                      >
                        {weight} kg
                      </motion.span>
                    </div>
                    <Slider
                      value={[weight]}
                      onValueChange={(v) => setWeight(v[0])}
                      min={1}
                      max={50}
                      step={1}
                      className="w-full"
                    />
                  </motion.div>
                </motion.div>

                {/* Price Display */}
                <motion.div 
                  className="lg:sticky lg:top-24"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  <motion.div 
                    className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-lime/5 to-lime/10 p-8"
                    animate={animatePrice ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="label-mono text-center text-muted-foreground">
                      INDICATIVE PRICE FROM
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={estimatedPrice}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="data-mono mt-4 text-center text-6xl text-primary"
                      >
                        <AnimatedCounter value={estimatedPrice} prefix="Â£" />
                      </motion.div>
                    </AnimatePresence>
                    <motion.p 
                      className="mt-4 text-center text-sm text-muted-foreground"
                      animate={animatePrice ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      Final price confirmed at booking. VAT not included.
                    </motion.p>
                    <div className="mt-8">
                      <MagneticButton to="/quote" variant="lime" size="lg" className="w-full">
                        Confirm this quote
                      </MagneticButton>
                    </div>

                    {/* Breakdown Preview */}
                    <motion.div 
                      className="mt-6 space-y-2 rounded-lg border border-primary/20 bg-primary/5 p-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base + Mileage</span>
                        <motion.span 
                          key={`base-${quote.base + quote.mileage}`}
                          initial={{ x: 10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="font-medium"
                        >
                          {gbp(quote.base + quote.mileage)}
                        </motion.span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Speed Uplift</span>
                        <motion.span 
                          key={`speed-${quote.speedUplift}`}
                          initial={{ x: 10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.05 }}
                          className="font-medium"
                        >
                          {gbp(quote.speedUplift)}
                        </motion.span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fuel Surcharge</span>
                        <motion.span 
                          key={`fuel-${quote.fuel}`}
                          initial={{ x: 10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="font-medium"
                        >
                          {gbp(quote.fuel)}
                        </motion.span>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pricing Factors */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="03">How pricing works</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Six components, clearly explained.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Our pricing engine calculates costs based on real operational factors. No guesswork,
                no averages â€” just transparent charges you can verify before you commit.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 space-y-6">
                {PRICING_FACTORS.map((factor, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="heading-md">{factor.title}</h3>
                        <p className="mt-4 text-muted-foreground">
                          {factor.description}
                        </p>
                      </div>
                      <div className="label-mono text-nowrap rounded-full bg-primary/10 px-4 py-1.5 text-primary-dim">
                        {i + 1}
                      </div>
                    </div>
                    <div className="mt-6 rounded-lg bg-muted/30 p-4">
                      <p className="label-mono text-muted-foreground">
                        Example: {factor.example}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Size Categories */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="04">Size categories</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Six standard size bands.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Each size category has a base charge and per-mile rate. Choose the one that matches
                your shipment dimensions and weight.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {SIZES.map((size) => (
                  <div
                    key={size.id}
                    className="rounded-xl border border-border bg-card p-6"
                  >
                    <h3 className="heading-md">{size.name}</h3>
                    <p className="label-mono mt-2 text-muted-foreground">
                      {size.detail}
                    </p>
                    <div className="mt-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="label-mono text-muted-foreground">
                          Base
                        </span>
                        <span className="heading-sm">{gbp(size.base)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="label-mono text-muted-foreground">
                          Per mile
                        </span>
                        <span className="heading-sm">{gbp(size.perMile)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Service Speeds */}
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="05">Service speeds</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Four speed tiers with clear multipliers.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Service speed applies a multiplier to the base + mileage subtotal. Same-day is
                premium; scheduled movements offer a discount.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {SPEEDS.map((speed) => (
                  <div
                    key={speed.id}
                    className="rounded-xl border border-border bg-card p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="heading-md">{speed.name}</h3>
                        <p className="label-mono mt-2 text-muted-foreground">
                          {speed.detail}
                        </p>
                      </div>
                      <div className="data-mono text-2xl text-primary">
                        {speed.multiplier}Ã—
                      </div>
                    </div>
                    <div className="mt-6 rounded-lg bg-muted/30 p-4">
                      <p className="label-mono text-muted-foreground">
                        ETA: {speed.eta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Handling Fees */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="06">Handling charges</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Fixed fees for specialist requirements.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Additional equipment or handling protocols carry fixed charges added to the subtotal
                before fuel and VAT.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {HANDLING.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-6"
                  >
                    <span className="text-base font-medium">{item.name}</span>
                    <span className="heading-sm text-primary">{gbp(item.fee)}</span>
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
              <SectionLabel index="07">Pricing FAQ</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Common questions about pricing.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 max-w-3xl">
                <Accordion type="single" collapsible className="space-y-4">
                  {FAQ_ITEMS.map((item, i) => (
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
        <section className="relative overflow-hidden bg-primary/5 py-24 md:py-32">
          <div className="shell edge relative z-[2]">
            <Reveal>
              <SectionLabel tone="dark" index="08">
                Get a quote
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-lg mt-7 max-w-3xl text-foreground">
                See exactly what you will pay.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Use the online calculator to get an instant breakdown of charges, or call the office
                for a quote over the phone. Every component explained, every cost confirmed in writing.
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

