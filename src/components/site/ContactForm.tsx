import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MagneticButton } from "./primitives";
import { CONTACT } from "@/lib/site-data";

const ENQUIRY_TYPES = [
  "General enquiry",
  "Quote request",
  "Account setup",
  "Existing booking",
  "Complaint or feedback",
  "Partnership enquiry",
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    enquiryType: "",
    message: "",
    consent: false,
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setErrorMessage("Please agree to the privacy policy to continue.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // Simulate form submission - in production this would POST to a backend endpoint
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In production, replace this with actual form submission:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Submission failed');
      
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        enquiryType: "",
        message: "",
        consent: false,
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or contact us directly.");
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-lime/20 bg-lime/5 p-8 text-center md:p-12">
        <div className="data-mono mx-auto text-6xl text-lime">✓</div>
        <h3 className="heading-lg mt-6">Message received</h3>
        <p className="mt-4 text-muted-foreground">
          Thank you for getting in touch. We will respond within one working day during office hours.
          For urgent same-day requirements, please call {CONTACT.phone}.
        </p>
        <div className="mt-8">
          <MagneticButton
            onClick={() => setStatus("idle")}
            variant="lime"
          >
            Send another message
          </MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Your name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="John Smith"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@company.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="0161 470 2288"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company name</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Your Company Ltd"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="enquiryType">
          Enquiry type <span className="text-red-500">*</span>
        </Label>
        <Select
          required
          value={formData.enquiryType}
          onValueChange={(value) => handleChange("enquiryType", value)}
        >
          <SelectTrigger id="enquiryType">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {ENQUIRY_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Your message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell us about your requirements — postcodes, weight, service level and any specific constraints..."
        />
        <p className="label-mono text-muted-foreground">
          For urgent same-day requirements, please call {CONTACT.phone}
        </p>
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={formData.consent}
          onCheckedChange={(checked) => handleChange("consent", checked === true)}
          required
        />
        <label
          htmlFor="consent"
          className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
        >
          I agree to Kinetic Logistics storing my details and contacting me about this enquiry.
          We will not share your information with third parties. <span className="text-red-500">*</span>
        </label>
      </div>

      {status === "error" && errorMessage && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      <MagneticButton
        type="submit"
        variant="lime"
        size="lg"
        disabled={status === "submitting"}
        className="w-full"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </MagneticButton>

      <p className="label-mono text-center text-muted-foreground">
        We aim to respond within one working day during office hours.
      </p>
    </form>
  );
}
