export type ServiceSlug =
  | "same-day"
  | "next-day"
  | "freight"
  | "fulfilment"
  | "international";

export interface Service {
  slug: ServiceSlug;
  index: string;
  name: string;
  short: string;
  blurb: string;
  window: string;
  coverage: string;
  weight: string;
  hero: string;
  problem: string;
  solution: string;
  useCases: string[];
  specs: { label: string; value: string }[];
  process: { step: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  stats: { label: string; value: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "same-day",
    index: "01",
    name: "Same-Day Courier",
    short: "Point-to-point collections across Greater Manchester and the North West.",
    blurb:
      "A dedicated vehicle, assigned to your consignment only, moving direct from collection to delivery with no depot, no sortation and no overnight hold.",
    window: "60 min collection",
    coverage: "North West + nationwide direct",
    weight: "Up to 1,000 kg",
    hero: "When the deadline is today.",
    problem:
      "Network couriers batch, sort and re-route. That is fine for a parcel with a week of slack — and useless when a line is down, a court date is fixed or a customer is waiting on site.",
    solution:
      "Direct, dedicated transport. One driver, one job, tracked door to door with a named contact who can tell you exactly where the vehicle is.",
    useCases: [
      "Production-critical spares and components",
      "Legal documents and court bundles",
      "Medical samples and time-bound clinical items",
      "Site deliveries where labour is already waiting",
      "Recovery of a failed network delivery",
    ],
    specs: [
      { label: "Collection window", value: "30–60 minutes" },
      { label: "Vehicle types", value: "Bike · Car · Small van · Luton" },
      { label: "Max payload", value: "1,000 kg" },
      { label: "Proof of delivery", value: "Signature + photo + timestamp" },
      { label: "Availability", value: "24/7, 365 days" },
    ],
    process: [
      { step: "01", title: "Brief", body: "Tell us the postcodes, the weight and the deadline. Quote back in minutes." },
      { step: "02", title: "Assign", body: "The nearest suitable vehicle is allocated and dispatched directly to collection." },
      { step: "03", title: "Move", body: "Direct routing, live updates, one driver in possession the whole way." },
      { step: "04", title: "Confirm", body: "Signature, photo and timestamp issued the moment it lands." },
    ],
    faq: [
      { q: "How quickly can you collect?", a: "Within Greater Manchester, typically 30–60 minutes from confirmation. Wider North West is usually inside 90 minutes." },
      { q: "Is the vehicle dedicated to my job?", a: "Yes. Nothing else is loaded and there is no depot stop between collection and delivery." },
      { q: "Do you run outside office hours?", a: "Yes — evenings, nights, weekends and bank holidays, at published out-of-hours rates." },
    ],
    stats: [
      { label: "Avg. collection", value: "48 MIN" },
      { label: "On-time", value: "98.7%" },
      { label: "Availability", value: "24/7" },
    ],
  },
  {
    slug: "next-day",
    index: "02",
    name: "Next-Day UK Delivery",
    short: "Reliable next-day delivery throughout the UK.",
    blurb:
      "Booked today, delivered tomorrow, anywhere on the mainland — with pre-noon and timed options where the arrival slot matters as much as the day.",
    window: "Next working day",
    coverage: "UK mainland",
    weight: "Up to 30 kg per item",
    hero: "Tomorrow, reliably.",
    problem:
      "Most next-day promises are averages. When the exception lands it lands on you, usually as a customer service call you did not budget for.",
    solution:
      "Planned overnight movements with pre-noon and timed upgrades, tracked consignment references and a human who answers when something needs intervening on.",
    useCases: [
      "B2B trade orders and replenishment",
      "Retail customer despatch",
      "Samples, proofs and pre-production items",
      "Multi-drop account shipping",
      "Regular scheduled account collections",
    ],
    specs: [
      { label: "Cut-off", value: "17:00 for next working day" },
      { label: "Upgrades", value: "Pre-09:00 · Pre-noon · Saturday" },
      { label: "Max item weight", value: "30 kg" },
      { label: "Tracking", value: "Reference-level, milestone updates" },
      { label: "Coverage", value: "UK mainland, offshore on request" },
    ],
    process: [
      { step: "01", title: "Book", body: "Raise the consignment online or over the phone before the daily cut-off." },
      { step: "02", title: "Collect", body: "Scheduled collection from your site — one-off or standing daily slot." },
      { step: "03", title: "Trunk", body: "Overnight linehaul onto the delivery round for the destination postcode." },
      { step: "04", title: "Deliver", body: "Next working day, with milestone notifications and electronic POD." },
    ],
    faq: [
      { q: "What is the booking cut-off?", a: "17:00 for a standard next-working-day service. Later cut-offs can be arranged on account." },
      { q: "Can you guarantee a morning delivery?", a: "Yes, via pre-09:00 or pre-noon upgrades on most mainland postcodes." },
      { q: "Do you deliver on Saturdays?", a: "Saturday delivery is available as an upgrade across most of the mainland." },
    ],
    stats: [
      { label: "Cut-off", value: "17:00" },
      { label: "Coverage", value: "UK" },
      { label: "On-time", value: "98.1%" },
    ],
  },
  {
    slug: "freight",
    index: "03",
    name: "Pallet & Freight",
    short: "Palletised and part-load freight for larger or heavier shipments.",
    blurb:
      "Quarter pallets through to full loads, with tail-lift and moffett options for sites without a dock — priced by space, not guesswork.",
    window: "Same-day to 48h",
    coverage: "UK + European groupage",
    weight: "Up to 26 t full load",
    hero: "When it stops fitting in a van.",
    problem:
      "Freight goes wrong at the edges: the site with no forklift, the pallet that is 30 cm over height, the delivery that needs booking into a goods-in slot.",
    solution:
      "We size the equipment to the site before the vehicle leaves, book delivery slots where they are required and confirm handling constraints in writing.",
    useCases: [
      "Manufacturing inputs and finished goods",
      "Trade counter and merchant replenishment",
      "Exhibition and event freight",
      "Machinery and part-load movements",
      "Retail store fit-out deliveries",
    ],
    specs: [
      { label: "Pallet sizes", value: "Quarter · Half · Full · Oversize" },
      { label: "Equipment", value: "Tail-lift · Moffett · Curtainside" },
      { label: "Max load", value: "26 tonnes" },
      { label: "Booking-in", value: "Managed on your behalf" },
      { label: "Transit", value: "Same-day dedicated to 48h economy" },
    ],
    process: [
      { step: "01", title: "Survey", body: "Dimensions, weight, access and handling equipment confirmed up front." },
      { step: "02", title: "Plan", body: "Vehicle and lifting equipment matched to both ends of the route." },
      { step: "03", title: "Load", body: "Secured, strapped and documented, with photographs on departure." },
      { step: "04", title: "Deliver", body: "Slot-booked delivery with signed POD and any required paperwork." },
    ],
    faq: [
      { q: "What if there is no forklift on site?", a: "We supply tail-lift or moffett vehicles so the load can be handled kerbside." },
      { q: "Can you move part loads?", a: "Yes — part loads and groupage are often the most economical option for 2–8 pallets." },
      { q: "Do you handle hazardous goods?", a: "ADR-compliant movements can be arranged; tell us the UN number when quoting." },
    ],
    stats: [
      { label: "Max load", value: "26 T" },
      { label: "Pallet types", value: "4" },
      { label: "Transit", value: "24–48H" },
    ],
  },
  {
    slug: "fulfilment",
    index: "04",
    name: "E-commerce Fulfilment",
    short: "Pick, pack and dispatch support for online retailers.",
    blurb:
      "Stock held in Manchester, picked against your orders, packed to your brand standard and despatched on the carrier service your customer chose.",
    window: "Same-day despatch",
    coverage: "UK + international",
    weight: "Any SKU profile",
    hero: "Your warehouse, without the warehouse.",
    problem:
      "Growth breaks fulfilment before it breaks anything else. Peak arrives, the packing bench becomes the whole business, and despatch accuracy quietly slides.",
    solution:
      "A managed pick-pack-despatch operation with same-day cut-offs, per-SKU stock visibility and returns handled back into sellable stock.",
    useCases: [
      "DTC brands outgrowing self-fulfilment",
      "Seasonal and peak overflow capacity",
      "Subscription box assembly",
      "Marketplace and multi-channel despatch",
      "Returns processing and restocking",
    ],
    specs: [
      { label: "Despatch cut-off", value: "16:00 same day" },
      { label: "Storage", value: "Pallet, shelf and bin locations" },
      { label: "Packing", value: "Branded, plain or customer-supplied" },
      { label: "Returns", value: "Inspected, graded, restocked" },
      { label: "Reporting", value: "Stock and despatch summaries" },
    ],
    process: [
      { step: "01", title: "Onboard", value: "", body: "Stock received, counted and located. SKU profile and packing spec agreed." },
      { step: "02", title: "Receive", body: "Orders arrive from your store or as a daily file." },
      { step: "03", title: "Pick & pack", body: "Picked, checked and packed to spec, with photographs on exceptions." },
      { step: "04", title: "Despatch", body: "Labelled and handed to the chosen service before the daily cut-off." },
    ] as Service["process"],
    faq: [
      { q: "Do I need a minimum volume?", a: "No. We work with brands from a few dozen orders a week upwards." },
      { q: "Can you use my own packaging?", a: "Yes — supply it and we pack to your spec, including inserts and gift notes." },
      { q: "How are returns handled?", a: "Received, inspected, graded and either restocked or quarantined to your rules." },
    ],
    stats: [
      { label: "Cut-off", value: "16:00" },
      { label: "Pick accuracy", value: "99.6%" },
      { label: "Returns", value: "48H" },
    ],
  },
  {
    slug: "international",
    index: "05",
    name: "International Shipping",
    short: "Worldwide courier and freight coordination.",
    blurb:
      "Express documents through to air and road freight, with customs documentation prepared properly the first time so nothing sits at a border.",
    window: "24h to 5 days",
    coverage: "Worldwide",
    weight: "Documents to full loads",
    hero: "Across the border, without the delay.",
    problem:
      "Post-Brexit paperwork is where international shipments die. A missing commodity code turns a two-day transit into a two-week investigation.",
    solution:
      "Documentation prepared and checked before collection, duty and tax terms agreed in advance, and a single point of contact for the whole movement.",
    useCases: [
      "EU trade shipments and returns",
      "Urgent AOG and spares to Europe",
      "Exhibition freight and carnets",
      "Worldwide express documents",
      "Air and sea freight coordination",
    ],
    specs: [
      { label: "Services", value: "Express · Air · Road · Sea" },
      { label: "Customs", value: "Docs prepared and checked" },
      { label: "Terms", value: "DDP · DAP · EXW supported" },
      { label: "Transit", value: "24h express to 5-day road" },
      { label: "Coverage", value: "220+ territories" },
    ],
    process: [
      { step: "01", title: "Scope", body: "Commodity, value, destination and incoterms confirmed before booking." },
      { step: "02", title: "Document", body: "Invoices, codes and declarations prepared and checked against the goods." },
      { step: "03", title: "Move", body: "Collected in the UK and moved on the agreed express or freight service." },
      { step: "04", title: "Clear", body: "Cleared at destination and delivered, with duties handled per the agreed terms." },
    ],
    faq: [
      { q: "Who pays duties and taxes?", a: "Whichever party the incoterms specify — we confirm this in writing before collection." },
      { q: "Can you handle EU returns?", a: "Yes, including returned-goods relief where the paperwork supports it." },
      { q: "How fast is express to Europe?", a: "Most western European commercial addresses are 24–48 hours door to door." },
    ],
    stats: [
      { label: "Territories", value: "220+" },
      { label: "Express EU", value: "24H" },
      { label: "Customs", value: "MANAGED" },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);

export interface City {
  id: string;
  name: string;
  region: string;
  x: number; // 0-100 map space
  y: number;
  minutes: number;
  miles: number;
  service: string;
  status: "Clear" | "Busy" | "Monitoring";
}

export const HUB = { name: "Littleborough", x: 46, y: 55.5 };

export const CITIES: City[] = [
  { id: "leeds", name: "Leeds", region: "Yorkshire", x: 57, y: 52, minutes: 55, miles: 44, service: "Same-day dedicated", status: "Clear" },
  { id: "liverpool", name: "Liverpool", region: "North West", x: 35, y: 55, minutes: 45, miles: 35, service: "Same-day dedicated", status: "Clear" },
  { id: "sheffield", name: "Sheffield", region: "Yorkshire", x: 55, y: 58.5, minutes: 65, miles: 41, service: "Same-day dedicated", status: "Busy" },
  { id: "birmingham", name: "Birmingham", region: "Midlands", x: 49, y: 70, minutes: 110, miles: 87, service: "Same-day / next-day", status: "Clear" },
  { id: "glasgow", name: "Glasgow", region: "Scotland", x: 32, y: 23, minutes: 260, miles: 215, service: "Overnight trunk", status: "Monitoring" },
  { id: "london", name: "London", region: "South East", x: 64, y: 81, minutes: 225, miles: 200, service: "Same-day / next-day", status: "Clear" },
];

export const INDUSTRIES = [
  {
    id: "retail",
    name: "Retail & E-commerce",
    challenge: "Peak arrives faster than headcount.",
    problem:
      "Order volume triples in six weeks and the despatch bench becomes the bottleneck for the entire business.",
    solution:
      "Overflow fulfilment, same-day despatch cut-offs and scheduled daily collections that absorb peak without new hires.",
    result: "Despatch capacity scales with demand instead of with payroll.",
    service: "E-commerce Fulfilment",
    slug: "fulfilment" as ServiceSlug,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    challenge: "When production stops, every minute costs.",
    problem:
      "A single missing component idles a line, a shift and a downstream customer commitment at the same time.",
    solution:
      "Urgent parts and just-in-time component delivery designed around production schedules, with dedicated vehicles on standby.",
    result: "Line-down events resolved in hours, not shifts.",
    service: "Same-Day Courier",
    slug: "same-day" as ServiceSlug,
  },
  {
    id: "automotive",
    name: "Automotive",
    challenge: "The vehicle is on the ramp, waiting.",
    problem:
      "Workshop bays earn nothing while a part is in transit, and courtesy vehicles are finite.",
    solution:
      "Dealer-to-dealer and factor-to-workshop runs, plus overnight replenishment into the parts department.",
    result: "Bay utilisation protected across the network.",
    service: "Next-Day UK Delivery",
    slug: "next-day" as ServiceSlug,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    challenge: "Chain of custody is not optional.",
    problem:
      "Samples, records and clinical consumables move under conditions where an unlogged handover is a compliance failure.",
    solution:
      "Dedicated vehicles, named drivers, temperature-aware handling and documented custody at every transfer.",
    result: "Auditable movements with no intermediate handling.",
    service: "Same-Day Courier",
    slug: "same-day" as ServiceSlug,
  },
  {
    id: "legal",
    name: "Legal",
    challenge: "The deadline is a court, not a customer.",
    problem:
      "Bundles, contracts and originals must be in a specific room, in a specific hour, with proof they arrived.",
    solution:
      "Timed same-day delivery with signature, photographic proof and timestamped custody from desk to desk.",
    result: "Filing deadlines met with evidence attached.",
    service: "Same-Day Courier",
    slug: "same-day" as ServiceSlug,
  },
  {
    id: "hospitality",
    name: "Hospitality & Food",
    challenge: "Service starts whether the delivery arrived or not.",
    problem:
      "Covers are booked, prep starts early and a late drop rewrites the menu.",
    solution:
      "Early-morning scheduled runs, multi-site drops and same-day recovery when a supplier misses.",
    result: "Kitchens open on time, every service.",
    service: "Pallet & Freight",
    slug: "freight" as ServiceSlug,
  },
];

export const TICKER = [
  "MANCHESTER → LEEDS · 55 MIN",
  "MANCHESTER → LIVERPOOL · 45 MIN",
  "MANCHESTER → SHEFFIELD · 65 MIN",
  "MANCHESTER → BIRMINGHAM · 1H 50",
  "MANCHESTER → LONDON · ~3H 45",
  "MANCHESTER → GLASGOW · 4H 20",
];

export const CONTACT = {
  phone: "+44 7392 847812",
  email: "hello@ezalogistics.co.uk",
  hub: "14 Nobel Drive, Littleborough, England, OL15 0FH",
  hours: "Office 07:00–19:00 · Dispatch 24/7, 365 days",
};

/* ---------------- Pricing engine ---------------- */

export type SizeId = "small" | "medium" | "large" | "pallet" | "freight" | "multi";
export type SpeedId = "same-day" | "next-day" | "scheduled" | "international";

export const SIZES: { id: SizeId; name: string; detail: string; base: number; perMile: number; maxKg: number }[] = [
  { id: "small", name: "Small parcel", detail: "Up to 30 × 20 × 15 cm · 5 kg", base: 18, perMile: 0.9, maxKg: 5 },
  { id: "medium", name: "Medium parcel", detail: "Up to 60 × 40 × 40 cm · 20 kg", base: 26, perMile: 1.05, maxKg: 20 },
  { id: "large", name: "Large parcel", detail: "Up to 120 × 60 × 60 cm · 50 kg", base: 38, perMile: 1.3, maxKg: 50 },
  { id: "pallet", name: "Pallet", detail: "Standard UK pallet · up to 1,000 kg", base: 72, perMile: 1.85, maxKg: 1000 },
  { id: "freight", name: "Freight", detail: "Multi-pallet or part load", base: 145, perMile: 2.6, maxKg: 26000 },
  { id: "multi", name: "Multiple items", detail: "Mixed consignment, multi-drop", base: 54, perMile: 1.55, maxKg: 1000 },
];

export const SPEEDS: { id: SpeedId; name: string; detail: string; multiplier: number; eta: string }[] = [
  { id: "same-day", name: "Same-day", detail: "Dedicated vehicle, direct", multiplier: 1.85, eta: "Today" },
  { id: "next-day", name: "Next-day", detail: "Booked by 17:00", multiplier: 1, eta: "Next working day" },
  { id: "scheduled", name: "Scheduled", detail: "You choose the date", multiplier: 0.86, eta: "Your chosen date" },
  { id: "international", name: "International", detail: "Customs handled", multiplier: 2.4, eta: "2–5 working days" },
];

export const HANDLING: { id: string; name: string; fee: number }[] = [
  { id: "tail-lift", name: "Tail-lift required", fee: 25 },
  { id: "fragile", name: "Fragile / high value", fee: 18 },
  { id: "temperature", name: "Temperature aware", fee: 32 },
  { id: "two-person", name: "Two-person handling", fee: 45 },
];

/** Rough great-circle-ish distance derived from UK outward postcode areas. */
const POSTCODE_POINTS: Record<string, [number, number]> = {
  M: [53.48, -2.24], BL: [53.58, -2.43], OL: [53.54, -2.11], SK: [53.41, -2.16],
  WA: [53.39, -2.6], WN: [53.55, -2.63], PR: [53.76, -2.7], BB: [53.75, -2.48],
  L: [53.41, -2.98], CH: [53.19, -2.89], CW: [53.16, -2.44], ST: [53.0, -2.18],
  LS: [53.8, -1.55], BD: [53.79, -1.75], HD: [53.65, -1.78], HX: [53.72, -1.86],
  WF: [53.68, -1.5], S: [53.38, -1.47], DN: [53.52, -1.13], YO: [53.96, -1.08],
  HU: [53.75, -0.34], HG: [53.99, -1.54], DL: [54.52, -1.55], TS: [54.57, -1.23],
  NE: [54.98, -1.61], SR: [54.9, -1.38], DH: [54.78, -1.58], CA: [54.9, -2.94],
  LA: [54.05, -2.8], B: [52.48, -1.9], CV: [52.41, -1.51], WV: [52.59, -2.13],
  DY: [52.51, -2.09], WS: [52.59, -1.98], WR: [52.19, -2.22], HR: [52.06, -2.72],
  TF: [52.68, -2.45], SY: [52.71, -2.75], DE: [52.92, -1.48], NG: [52.95, -1.15],
  LE: [52.64, -1.14], LN: [53.23, -0.54], PE: [52.57, -0.24], NN: [52.24, -0.9],
  MK: [52.04, -0.76], CB: [52.21, 0.12], NR: [52.63, 1.3], IP: [52.06, 1.16],
  CO: [51.89, 0.9], CM: [51.73, 0.47], SS: [51.54, 0.71], RM: [51.57, 0.18],
  IG: [51.56, 0.07], E: [51.52, -0.05], EC: [51.52, -0.09], N: [51.56, -0.11],
  NW: [51.54, -0.19], SE: [51.47, -0.05], SW: [51.46, -0.16], W: [51.51, -0.19],
  WC: [51.52, -0.12], UB: [51.53, -0.4], HA: [51.59, -0.34], TW: [51.45, -0.36],
  KT: [51.36, -0.29], SM: [51.36, -0.19], CR: [51.36, -0.09], BR: [51.4, 0.05],
  DA: [51.44, 0.17], SL: [51.51, -0.6], RG: [51.45, -0.97], OX: [51.75, -1.26],
  GU: [51.24, -0.58], RH: [51.11, -0.19], TN: [51.13, 0.26], ME: [51.35, 0.53],
  CT: [51.28, 1.08], BN: [50.83, -0.14], PO: [50.82, -1.08], SO: [50.91, -1.4],
  SP: [51.07, -1.79], BH: [50.72, -1.88], DT: [50.71, -2.44], TA: [51.02, -3.1],
  BS: [51.45, -2.59], BA: [51.38, -2.36], GL: [51.86, -2.24], SN: [51.56, -1.78],
  EX: [50.72, -3.53], PL: [50.37, -4.14], TQ: [50.46, -3.53], TR: [50.26, -5.05],
  CF: [51.48, -3.18], NP: [51.58, -2.99], SA: [51.62, -3.94], LD: [52.24, -3.38],
  LL: [53.22, -3.83], SY23: [52.41, -4.08], EH: [55.95, -3.19], G: [55.86, -4.25],
  AB: [57.15, -2.09], DD: [56.46, -2.97], FK: [56.0, -3.78], KA: [55.61, -4.5],
  ML: [55.79, -3.98], PA: [55.85, -4.43], PH: [56.4, -3.44], IV: [57.48, -4.22],
  KY: [56.12, -3.16], TD: [55.6, -2.43], DG: [55.07, -3.6], BT: [54.6, -5.93],
};

export function postcodeArea(pc: string): string | null {
  const clean = pc.trim().toUpperCase().replace(/\s+/g, "");
  const m = clean.match(/^([A-Z]{1,2})\d/);
  return m ? m[1] : null;
}

export function isKnownPostcode(pc: string): boolean {
  const area = postcodeArea(pc);
  return !!area && area in POSTCODE_POINTS;
}

export function distanceMiles(from: string, to: string): number | null {
  const a = postcodeArea(from);
  const b = postcodeArea(to);
  if (!a || !b || !(a in POSTCODE_POINTS) || !(b in POSTCODE_POINTS)) return null;
  const [la1, lo1] = POSTCODE_POINTS[a];
  const [la2, lo2] = POSTCODE_POINTS[b];
  const R = 3958.8;
  const dLat = ((la2 - la1) * Math.PI) / 180;
  const dLon = ((lo2 - lo1) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((la1 * Math.PI) / 180) * Math.cos((la2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  const straight = 2 * R * Math.asin(Math.sqrt(h));
  // road factor
  return Math.max(4, Math.round(straight * 1.22));
}

export interface QuoteInput {
  size: SizeId;
  speed: SpeedId;
  from: string;
  to: string;
  weightKg: number;
  packages: number;
  handling: string[];
}

export interface QuoteResult {
  distance: number | null;
  base: number;
  mileage: number;
  speedUplift: number;
  weightSurcharge: number;
  packageUplift: number;
  handlingFee: number;
  fuel: number;
  subtotal: number;
  vat: number;
  total: number;
  eta: string;
}

export const MIN_CHARGE = 50;

export function calculateQuote(input: QuoteInput): QuoteResult {
  const size = SIZES.find((s) => s.id === input.size) ?? SIZES[0];
  const speed = SPEEDS.find((s) => s.id === input.speed) ?? SPEEDS[1];
  const distance = distanceMiles(input.from, input.to);
  const miles = distance ?? 40;

  const base = size.base;
  const mileage = Math.round(miles * size.perMile * 100) / 100;
  const raw = base + mileage;
  const speedUplift = Math.round((raw * (speed.multiplier - 1)) * 100) / 100;

  const overweight = Math.max(0, input.weightKg - size.maxKg);
  const weightSurcharge = Math.round(overweight * 0.65 * 100) / 100;
  const packageUplift = Math.max(0, input.packages - 1) * 6;
  const handlingFee = input.handling.reduce(
    (sum, id) => sum + (HANDLING.find((h) => h.id === id)?.fee ?? 0),
    0,
  );

  const preFuel = raw + speedUplift + weightSurcharge + packageUplift + handlingFee;
  const fuel = Math.round(preFuel * 0.07 * 100) / 100;
  let subtotal = Math.round((preFuel + fuel) * 100) / 100;
  if (subtotal < MIN_CHARGE) subtotal = MIN_CHARGE;
  const vat = Math.round(subtotal * 0.2 * 100) / 100;

  return {
    distance,
    base,
    mileage,
    speedUplift,
    weightSurcharge,
    packageUplift,
    handlingFee,
    fuel,
    subtotal,
    vat,
    total: Math.round((subtotal + vat) * 100) / 100,
    eta: speed.eta,
  };
}

export const gbp = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: n % 1 === 0 ? 0 : 2 });
