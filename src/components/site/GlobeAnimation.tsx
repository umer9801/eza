"use client";

export function GlobeAnimation() {
  const nodes = [
    { label: "LDN", top: "62%", left: "48%", delay: "0s" },
    { label: "MAN", top: "38%", left: "38%", delay: "0.6s" },
    { label: "BHM", top: "51%", left: "42%", delay: "1.2s" },
    { label: "EDI", top: "18%", left: "34%", delay: "1.8s" },
    { label: "BEL", top: "34%", left: "18%", delay: "2.4s" },
  ];

  return (
    <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 aspect-square w-full max-w-[520px] select-none opacity-70 z-[1]">
      {/* Ambient champagne glow effect - brighter */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-50 bg-champagne/50"
      />

      {/* Orbiting rings - brighter borders */}
      <div
        aria-hidden
        className="absolute inset-6 rounded-full border-2 border-champagne/40"
        style={{ animation: "eza-orbit 34s linear infinite" }}
      >
        <span className="absolute -top-1 left-1/2 size-3 -translate-x-1/2 rounded-full bg-champagne shadow-[0_0_20px_currentColor] text-champagne" />
      </div>
      
      <div
        aria-hidden
        className="absolute inset-16 rounded-full border-2 border-champagne/35"
        style={{ animation: "eza-orbit 22s linear infinite reverse" }}
      >
        <span className="absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 rounded-full bg-luxury-red shadow-[0_0_20px_currentColor] text-luxury-red" />
      </div>

      {/* Core sphere with scanning animation - brighter */}
      <div className="absolute inset-24 overflow-hidden rounded-full bg-charcoal/80 backdrop-blur-sm border-2 border-champagne/25">
        {/* Scanning sweep line - brighter */}
        <div
          aria-hidden
          className="absolute inset-x-0 h-14 bg-champagne/20"
          style={{ animation: "eza-scan 4.5s linear infinite" }}
        />

        {/* Wire globe SVG - brighter and thicker */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full opacity-60">
          <g fill="none" className="stroke-champagne-light" strokeWidth="0.8">
            <circle cx="100" cy="100" r="78" />
            <ellipse cx="100" cy="100" rx="78" ry="30" />
            <ellipse cx="100" cy="100" rx="78" ry="56" />
            <ellipse cx="100" cy="100" rx="30" ry="78" />
            <ellipse cx="100" cy="100" rx="56" ry="78" />
            <line x1="22" y1="100" x2="178" y2="100" />
          </g>
        </svg>

        {/* Center text - brighter */}
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Live network</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-ivory">UK</p>
            <p className="text-[10px] text-champagne-light">1,284 units active</p>
          </div>
        </div>
      </div>

      {/* Floating hub nodes - brighter */}
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute"
          style={{
            top: n.top,
            left: n.left,
            animation: `eza-float 6s ease-in-out ${n.delay} infinite`,
          }}
        >
          <div className="flex items-center gap-2 rounded-full bg-charcoal/90 backdrop-blur-sm border border-champagne/40 px-3 py-1.5 text-[11px] tracking-tight text-ivory font-medium shadow-lg">
            <span className="size-2 rounded-full bg-champagne shadow-[0_0_12px_currentColor] text-champagne" style={{ animation: "eza-pulse 2s ease-in-out infinite" }} />
            {n.label}
          </div>
        </div>
      ))}

      {/* Floating telemetry cards - brighter */}
      <div
        className="absolute -right-2 top-10 rounded-xl bg-charcoal/90 backdrop-blur-sm border border-champagne/40 px-4 py-3 text-xs shadow-lg"
        style={{ animation: "eza-float 6s ease-in-out 0.4s infinite" }}
      >
        <p className="text-champagne-light text-[10px] uppercase tracking-wider">Route AI</p>
        <p className="mt-1 text-sm font-semibold text-champagne">Optimised · −18% ETA</p>
      </div>

      <div
        className="absolute -left-3 bottom-14 rounded-xl bg-charcoal/90 backdrop-blur-sm border border-luxury-red/50 px-4 py-3 text-xs shadow-lg"
        style={{ animation: "eza-float 6s ease-in-out 1.4s infinite" }}
      >
        <p className="text-champagne-light text-[10px] uppercase tracking-wider">Express slot</p>
        <p className="mt-1 text-sm font-semibold text-luxury-red">45 min window</p>
      </div>
    </div>
  );
}
