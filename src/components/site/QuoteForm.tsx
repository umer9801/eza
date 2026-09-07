import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MagneticButton } from "./primitives";
import { SIZES, SPEEDS, HANDLING, calculateQuote, isKnownPostcode, gbp, type SizeId, type SpeedId, type QuoteInput, type QuoteResult } from "@/lib/site-data";
import {
  Package,
  MapPin,
  Truck,
  Weight,
  Clock,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
} from "lucide-react";

export function QuoteForm() {
  // Personal Details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  // Shipment Details
  const [collectionPostcode, setCollectionPostcode] = useState("");
  const [deliveryPostcode, setDeliveryPostcode] = useState("");
  const [size, setSize] = useState<SizeId>("medium");
  const [speed, setSpeed] = useState<SpeedId>("next-day");
  const [weightKg, setWeightKg] = useState(10);
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [handling, setHandling] = useState<string[]>([]);

  // Additional Details
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [preferredCollectionDate, setPreferredCollectionDate] = useState("");
  const [preferredCollectionTime, setPreferredCollectionTime] = useState("");

  // Form State
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "calculating" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Validation
  const [collectionValid, setCollectionValid] = useState(true);
  const [deliveryValid, setDeliveryValid] = useState(true);

  const handleCalculateQuote = () => {
    setStatus("calculating");
    setErrorMessage("");

    // Validate postcodes
    const collectionOk = collectionPostcode.length > 0 && isKnownPostcode(collectionPostcode);
    const deliveryOk = deliveryPostcode.length > 0 && isKnownPostcode(deliveryPostcode);

    setCollectionValid(collectionOk);
    setDeliveryValid(deliveryOk);

    if (!collectionOk || !deliveryOk) {
      setStatus("idle");
      setErrorMessage("Please enter valid postcodes");
      return;
    }

    const input: QuoteInput = {
      size,
      speed,
      from: collectionPostcode,
      to: deliveryPostcode,
      weightKg,
      packages: numberOfItems,
      handling,
    };

    const result = calculateQuote(input);
    setQuote(result);
    setStatus("idle");
  };

  const handleShipmentContinue = () => {
    setErrorMessage("");
    if (weightKg <= 0 || numberOfItems <= 0) {
      setErrorMessage("Please enter a valid weight and number of items");
      return;
    }
    setStep(2);
  };

  const handleAddressContinue = () => {
    handleCalculateQuote();
    const collectionOk = collectionPostcode.length > 0 && isKnownPostcode(collectionPostcode);
    const deliveryOk = deliveryPostcode.length > 0 && isKnownPostcode(deliveryPostcode);
    if (collectionOk && deliveryOk) setStep(3);
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Validate required fields
    if (!name || !email || !phone || !collectionPostcode || !deliveryPostcode) {
      setErrorMessage("Please fill in all required fields");
      setStatus("error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    try {
      // Direct MongoDB submission
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          collectionPostcode,
          deliveryPostcode,
          shipmentSize: size,
          serviceSpeed: speed,
          weightKg,
          numberOfItems,
          additionalHandling: handling,
          estimatedCost: quote?.total,
          quoteBreakdown: quote,
          specialInstructions,
          preferredCollectionDate,
          preferredCollectionTime,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Failed to submit quote");
      }

      setStatus("success");
      // Reset form
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setCollectionPostcode("");
        setDeliveryPostcode("");
        setSize("medium");
        setSpeed("next-day");
        setWeightKg(10);
        setNumberOfItems(1);
        setHandling([]);
        setSpecialInstructions("");
        setPreferredCollectionDate("");
        setPreferredCollectionTime("");
        setQuote(null);
        setStep(1);
        setStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Quote submission error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const toggleHandling = (id: string) => {
    setHandling((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center md:p-12">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h3 className="heading-lg mt-6">Quote Request Submitted!</h3>
        <p className="mt-4 text-muted-foreground">
          Thank you for your quote request. We've received your details and will get back to you
          within one working day with a detailed quote and booking options.
        </p>
        <div className="mt-8">
          <MagneticButton onClick={() => setStatus("idle")} variant="lime">
            Submit Another Quote
          </MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmitQuote} className="space-y-8">
      <div className="grid grid-cols-3 gap-2 border-b border-border pb-6">
        {["Shipment", "Addresses", "Your details"].map((label, index) => {
          const itemStep = (index + 1) as 1 | 2 | 3;
          const active = step === itemStep;
          const complete = step > itemStep;
          return (
            <div key={label} className="flex items-center gap-2">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                active || complete ? "bg-primary text-primary-foreground" : "border border-border bg-muted text-muted-foreground"
              }`}>
                {itemStep}
              </span>
              <span className={`hidden text-xs font-medium sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Personal Details Section */}
      {step === 3 && <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <User className="h-5 w-5 text-primary" />
          <h3 className="heading-sm">Personal Details</h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0161 470 2288"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your Company Ltd"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>}

      {/* Shipment Details Section */}
      {step <= 2 && <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <Package className="h-5 w-5 text-primary" />
          <h3 className="heading-sm">Shipment Details</h3>
        </div>

        {/* Postcodes */}
        {step === 2 && <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="collection">
              Collection Postcode <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="collection"
                required
                value={collectionPostcode}
                onChange={(e) => {
                  setCollectionPostcode(e.target.value.toUpperCase());
                  setCollectionValid(true);
                }}
                placeholder="M17 1RU"
                className={`pl-10 ${collectionPostcode && !collectionValid ? "border-red-500" : ""}`}
              />
            </div>
            {collectionPostcode && !collectionValid && (
              <p className="label-mono flex items-center gap-1 text-red-600">
                <AlertCircle className="h-3 w-3" />
                Postcode not recognised
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery">
              Delivery Postcode <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
              <Input
                id="delivery"
                required
                value={deliveryPostcode}
                onChange={(e) => {
                  setDeliveryPostcode(e.target.value.toUpperCase());
                  setDeliveryValid(true);
                }}
                placeholder="LS1 1UR"
                className={`pl-10 ${deliveryPostcode && !deliveryValid ? "border-red-500" : ""}`}
              />
            </div>
            {deliveryPostcode && !deliveryValid && (
              <p className="label-mono flex items-center gap-1 text-red-600">
                <AlertCircle className="h-3 w-3" />
                Postcode not recognised
              </p>
            )}
          </div>
        </div>}

        {/* Size & Speed */}
        {step === 1 && <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="size">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Shipment Size
              </div>
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SIZES.map((s) => {
                const selected = size === s.id;
                return (
                  <button
                    key={s.id}
                    id={s.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSize(s.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-xs transition-colors ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground shadow-[4px_4px_8px_rgba(255,119,28,0.25)]"
                        : "border-border bg-background text-foreground shadow-[var(--shadow-neumorphic-sm)] hover:bg-muted"
                    }`}
                  >
                    <span className="block font-medium">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="speed">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Service Speed
              </div>
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SPEEDS.map((s) => {
                const selected = speed === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSpeed(s.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-xs transition-colors ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground shadow-[4px_4px_8px_rgba(255,119,28,0.25)]"
                        : "border-border bg-background text-foreground shadow-[var(--shadow-neumorphic-sm)] hover:bg-muted"
                    }`}
                  >
                    <span className="block font-medium">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>}

        {/* Weight & Items */}
        {step === 1 && <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="weight">
              <div className="flex items-center gap-2">
                <Weight className="h-4 w-4" />
                Weight (kg)
              </div>
            </Label>
            <Input
              id="weight"
              type="number"
              min="0.1"
              step="0.1"
              value={weightKg}
              onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="items">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Number of Items
              </div>
            </Label>
            <Input
              id="items"
              type="number"
              min="1"
              value={numberOfItems}
              onChange={(e) => setNumberOfItems(parseInt(e.target.value) || 1)}
            />
          </div>
        </div>}

        {/* Additional Handling */}
        {step === 1 && <div className="space-y-3">
          <Label>Additional Handling</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {HANDLING.map((h) => (
              <label key={h.id} htmlFor={h.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${handling.includes(h.id) ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-muted"}`}>
                <Checkbox
                  id={h.id}
                  checked={handling.includes(h.id)}
                  onCheckedChange={() => toggleHandling(h.id)}
                />
                <div className="flex-1">
                  <span className="text-sm font-medium leading-none">{h.name}</span>
                  <p className="label-mono mt-0.5 text-muted-foreground">+{gbp(h.fee)}</p>
                </div>
              </label>
            ))}
          </div>
        </div>}

        {step === 1 && <MagneticButton
          type="button"
          onClick={handleShipmentContinue}
          variant="lime"
          size="lg"
          className="w-full"
        >
          Continue to addresses
        </MagneticButton>}

        {/* Quote Display */}
        {step === 2 && <MagneticButton
          type="button"
          onClick={handleAddressContinue}
          disabled={status === "calculating"}
          variant="lime"
          size="lg"
          className="w-full"
        >
          {status === "calculating" ? "Calculating..." : "Continue to your details"}
        </MagneticButton>}
      </div>}

      {/* Additional Information Section */}
      {step === 2 && <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="heading-sm">Additional Information (Optional)</h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="collection-date">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Preferred Collection Date
              </div>
            </Label>
            <Input
              id="collection-date"
              type="date"
              value={preferredCollectionDate}
              onChange={(e) => setPreferredCollectionDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="collection-time">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Preferred Collection Time
              </div>
            </Label>
            <Input
              id="collection-time"
              type="time"
              value={preferredCollectionTime}
              onChange={(e) => setPreferredCollectionTime(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instructions">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Special Instructions
            </div>
          </Label>
          <Textarea
            id="instructions"
            rows={4}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Any special requirements, access codes, or handling instructions..."
          />
        </div>
      </div>}

      {/* Error Message */}
      {status === "error" && errorMessage && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      {step === 3 && <MagneticButton
        type="submit"
        variant="lime"
        size="lg"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Request...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Quote Request
          </>
        )}
      </MagneticButton>}

      {step > 1 && (
        <button
          type="button"
          onClick={() => setStep((current) => (current - 1) as 1 | 2 | 3)}
          className="mx-auto block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Back to previous step
        </button>
      )}

      <p className="label-mono text-center text-muted-foreground">
        We'll get back to you within one working day with your quote
      </p>
    </form>
  );
}
