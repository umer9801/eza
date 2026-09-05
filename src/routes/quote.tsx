import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { MagneticButton, SectionLabel, Reveal, Hairline } from "@/components/site/primitives";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import {
  SIZES,
  SPEEDS,
  HANDLING,
  calculateQuote,
  isKnownPostcode,
  gbp,
  type SizeId,
  type SpeedId,
  type QuoteInput,
  type QuoteResult,
  CONTACT,
} from "@/lib/site-data";

export const Route = createFileRoute("/quote")({
  component: QuotePage,
  head: () => ({
    meta: [
      {
        title: "Instant Quote Calculator | Kinetic Logistics",
        description:
          "Get an instant price for same-day courier, next-day delivery, freight or international shipping. Real-time pricing with transparent breakdowns.",
      },
    ],
  }),
});

function QuotePage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [size, setSize] = useState<SizeId>("medium");
  const [speed, setSpeed] = useState<SpeedId>("next-day");
  const [weightKg, setWeightKg] = useState(10);
  const [packages, setPackages] = useState(1);
  const [handling, setHandling] = useState<string[]>([]);
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [fromValid, setFromValid] = useState(false);
  const [toValid, setToValid] = useState(false);

  useEffect(() => {
    setFromValid(from.length > 0 && isKnownPostcode(from));
  }, [from]);

  useEffect(() => {
    setToValid(to.length > 0 && isKnownPostcode(to));
  }, [to]);

  const canCalculate = fromValid && toValid && weightKg > 0 && packages > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const input: QuoteInput = {
      size,
      speed,
      from,
      to,
      weightKg,
      packages,
      handling,
    };
    const result = calculateQuote(input);
    setQuote(result);
  };

  const toggleHandling = (id: string) => {
    setHandling((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[5.5rem]">
        <section className="py-16 md:py-24">
          <div className="shell edge">
            <Reveal>
              <SectionLabel index="01">Quote Calculator</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display-lg mt-7 max-w-3xl">
                Instant pricing, transparent breakdown.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lede mt-6 max-w-2xl text-muted-foreground">
                Tell us the postcodes, weight and service level. The quote engine calculates in
                real time with a full breakdown of charges before you commit.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr,1fr]">
              {/* Form */}
              <Reveal delay={0.3}>
                <div className="rounded-2xl border border-border bg-card p-8">
                  <h2 className="heading-md mb-8">Shipment details</h2>
                  
                  <div className="space-y-6">
                    {/* Postcodes */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="from">Collection postcode</Label>
                        <Input
                          id="from"
                          placeholder="M17 1RU"
                          value={from}
                          onChange={(e) => setFrom(e.target.value.toUpperCase())}
                          className={
                            from && !fromValid ? "border-red-500" : ""
                          }
                        />
                        {from && !fromValid && (
                          <p className="label-mono text-red-600">
                            Postcode not recognised
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">Delivery postcode</Label>
                        <Input
                          id="to"
                          placeholder="LS1 1UR"
                          value={to}
                          onChange={(e) => setTo(e.target.value.toUpperCase())}
                          className={to && !toValid ? "border-red-500" : ""}
                        />
                        {to && !toValid && (
                          <p className="label-mono text-red-600">
                            Postcode not recognised
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Size */}
                    <div className="space-y-2">
                      <Label htmlFor="size">Shipment size</Label>
                      <Select
                        value={size}
                        onValueChange={(v) => setSize(v as SizeId)}
                      >
                        <SelectTrigger id="size">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SIZES.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              <div>
                                <div className="font-medium">{s.name}</div>
                                <div className="label-mono text-muted-foreground">
                                  {s.detail}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Speed */}
                    <div className="space-y-2">
                      <Label htmlFor="speed">Service speed</Label>
                      <Select
                        value={speed}
                        onValueChange={(v) => setSpeed(v as SpeedId)}
                      >
                        <SelectTrigger id="speed">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SPEEDS.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              <div>
                                <div className="font-medium">{s.name}</div>
                                <div className="label-mono text-muted-foreground">
                                  {s.detail}
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Weight & Packages */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={weightKg}
                          onChange={(e) =>
                            setWeightKg(parseFloat(e.target.value) || 0)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="packages">Number of items</Label>
                        <Input
                          id="packages"
                          type="number"
                          min="1"
                          value={packages}
                          onChange={(e) =>
                            setPackages(parseInt(e.target.value) || 1)
                          }
                        />
                      </div>
                    </div>

                    {/* Handling */}
                    <div className="space-y-3">
                      <Label>Additional handling</Label>
                      <div className="space-y-3">
                        {HANDLING.map((h) => (
                          <div key={h.id} className="flex items-start gap-3">
                            <Checkbox
                              id={h.id}
                              checked={handling.includes(h.id)}
                              onCheckedChange={() => toggleHandling(h.id)}
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={h.id}
                                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {h.name}
                              </label>
                              <p className="label-mono mt-0.5 text-muted-foreground">
                                +{gbp(h.fee)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <MagneticButton
                      onClick={handleCalculate}
                      disabled={!canCalculate}
                      variant="lime"
                      size="lg"
                      className="w-full"
                    >
                      Calculate Quote
                    </MagneticButton>
                  </div>
                </div>
              </Reveal>

              {/* Result */}
              <Reveal delay={0.4}>
                <div className="rounded-2xl border border-border bg-card p-8 lg:sticky lg:top-24">
                  {!quote ? (
                    <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                      <div className="data-mono text-6xl text-lime">→</div>
                      <p className="label-mono mt-6 text-muted-foreground">
                        Fill in the details and calculate to see your quote
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h2 className="heading-md">Your quote</h2>
                        <p className="label-mono mt-2 text-muted-foreground">
                          ETA: {quote.eta}
                          {quote.distance && ` · ${quote.distance} miles`}
                        </p>
                      </div>

                      <Hairline />

                      <div className="space-y-3">
                        <QuoteLine label="Base charge" value={quote.base} />
                        <QuoteLine label="Mileage" value={quote.mileage} />
                        {quote.speedUplift > 0 && (
                          <QuoteLine
                            label="Speed uplift"
                            value={quote.speedUplift}
                          />
                        )}
                        {quote.weightSurcharge > 0 && (
                          <QuoteLine
                            label="Weight surcharge"
                            value={quote.weightSurcharge}
                          />
                        )}
                        {quote.packageUplift > 0 && (
                          <QuoteLine
                            label="Additional items"
                            value={quote.packageUplift}
                          />
                        )}
                        {quote.handlingFee > 0 && (
                          <QuoteLine
                            label="Handling fee"
                            value={quote.handlingFee}
                          />
                        )}
                        <QuoteLine label="Fuel surcharge" value={quote.fuel} />
                      </div>

                      <Hairline />

                      <div className="space-y-2">
                        <QuoteLine
                          label="Subtotal"
                          value={quote.subtotal}
                          large
                        />
                        <QuoteLine label="VAT (20%)" value={quote.vat} />
                      </div>

                      <Hairline />

                      <div className="flex items-baseline justify-between">
                        <span className="heading-sm">Total</span>
                        <span className="data-mono text-3xl text-lime">
                          {gbp(quote.total)}
                        </span>
                      </div>

                      <div className="space-y-3 rounded-lg bg-muted/30 p-4">
                        <p className="label-mono text-muted-foreground">
                          Ready to book?
                        </p>
                        <div className="space-y-2">
                          <a
                            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                            className="block text-sm font-medium hover:text-lime"
                          >
                            Call: {CONTACT.phone}
                          </a>
                          <a
                            href={`mailto:${CONTACT.email}?subject=Quote request: ${from} to ${to}`}
                            className="block text-sm font-medium hover:text-lime"
                          >
                            Email: {CONTACT.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
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

function QuoteLine({
  label,
  value,
  large,
}: {
  label: string;
  value: number;
  large?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={large ? "text-base font-medium" : "label-mono text-muted-foreground"}>
        {label}
      </span>
      <span className={large ? "heading-sm" : "label-mono"}>{gbp(value)}</span>
    </div>
  );
}
