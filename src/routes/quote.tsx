import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SectionLabel, Reveal } from "@/components/site/primitives";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
  head: () => ({
    meta: [
      {
        title: "Request a Quote | Kinetic Logistics",
        description:
          "Submit your shipping requirements and get a detailed quote. Fill in your details for same-day courier, next-day delivery, freight or international shipping.",
      },
    ],
  }),
});

function QuotePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="01">Request a Quote</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-lg mt-7 max-w-3xl">
                Get your personalized shipping quote.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Complete the form below with your shipment details. Our team will review your
                requirements and get back to you within one working day with a detailed quote
                and booking options.
              </p>
            </Reveal>

            <div className="mt-14 max-w-4xl mx-auto">
              <Reveal delay={0.3}>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <QuoteForm />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="surface-light py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="02">Why choose us</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-7 max-w-3xl">
                Fast, reliable, transparent.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Reveal delay={0.2}>
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-primary">01</div>
                  <h3 className="heading-md mt-4">Instant Calculation</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Get an immediate estimate based on your shipment details. No waiting, no
                    hidden fees.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-primary">02</div>
                  <h3 className="heading-md mt-4">Transparent Pricing</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Clear breakdown of all charges including base rate, mileage, handling, and
                    VAT. No surprises.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="rounded-xl border border-border bg-card p-8">
                  <div className="data-mono text-3xl text-primary">03</div>
                  <h3 className="heading-md mt-4">Quick Response</h3>
                  <p className="mt-4 text-sm text-muted-foreground">
                    We respond to all quote requests within one working day during office hours.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
