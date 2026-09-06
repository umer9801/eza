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
      {/* Cool ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-35"
        style={{ background: "radial-gradient(circle, rgba(84,104,119,0.34) 0%, transparent 70%)" }}
      />
      {/* Blue-gray ambient glow */}
      <div
        aria-hidden
        className="absolute inset-8 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, rgba(84,104,119,0.5) 0%, transparent 70%)" }}
      />

      {/* Outer ring - blue-gray */}
      <div
        aria-hidden
        className="absolute inset-6 rounded-full border-2"
        style={{ animation: "eza-orbit 34s linear infinite", borderColor: "rgba(84,104,119,0.5)" }}
      >
          <span className="absolute -top-1 left-1/2 size-3 -translate-x-1/2 rounded-full bg-[#546877] shadow-[0_0_20px_#546877]" />
      </div>

      {/* Inner ring - blue-gray */}
      <div
        aria-hidden
        className="absolute inset-16 rounded-full border-2"
        style={{ animation: "eza-orbit 22s linear infinite reverse", borderColor: "rgba(84,104,119,0.45)" }}
      >
        <span
          className="absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 rounded-full"
          style={{ background: "#546877", boxShadow: "0 0 20px #546877" }}
        />
      </div>

      {/* Core sphere */}
      <div className="absolute inset-24 overflow-hidden rounded-full bg-[#F5EDE0]/80 backdrop-blur-sm border-2" style={{ borderColor: "rgba(84,104,119,0.3)" }}>
        <div
          aria-hidden
            className="absolute inset-x-0 h-14 bg-[#546877]/15"
          style={{ animation: "eza-scan 4.5s linear infinite" }}
        />

        {/* Wire globe - all blue-gray lines */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 size-full opacity-70">
          <g fill="none" strokeWidth="0.8">
            <circle cx="100" cy="100" r="78" stroke="#546877" strokeOpacity="0.6" />
            <ellipse cx="100" cy="100" rx="78" ry="30" stroke="#546877" strokeOpacity="0.55" />
            <ellipse cx="100" cy="100" rx="78" ry="56" stroke="#546877" strokeOpacity="0.5" />
            <ellipse cx="100" cy="100" rx="30" ry="78" stroke="#546877" strokeOpacity="0.5" />
            <ellipse cx="100" cy="100" rx="56" ry="78" stroke="#546877" strokeOpacity="0.45" />
            <line x1="22" y1="100" x2="178" y2="100" stroke="#546877" strokeOpacity="0.4" />
          </g>
        </svg>

        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Live network</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">UK</p>
            <p className="text-[10px]" style={{ color: "#546877" }}>1,284 units active</p>
          </div>
        </div>
      </div>

      {/* Floating hub nodes */}
      {nodes.map((n) => (
        <div
          key={n.label}
          className="absolute"
          style={{ top: n.top, left: n.left, animation: `eza-float 6s ease-in-out ${n.delay} infinite` }}
        >
          <div
            className="flex items-center gap-2 rounded-full bg-[#F5EDE0]/90 backdrop-blur-sm px-3 py-1.5 text-[11px] tracking-tight text-foreground font-medium shadow-lg"
            style={{ border: "1px solid rgba(84,104,119,0.35)" }}
          >
              <span
              className="size-2 rounded-full bg-[#546877]"
              style={{ animation: "eza-pulse 2s ease-in-out infinite", boxShadow: "0 0 12px #546877" }}
            />
            {n.label}
          </div>
        </div>
      ))}

      {/* Telemetry card - orange accent */}
      <div
        className="absolute -right-2 top-10 rounded-xl bg-[#F5EDE0]/90 backdrop-blur-sm border border-primary/40 px-4 py-3 text-xs shadow-lg"
        style={{ animation: "eza-float 6s ease-in-out 0.4s infinite" }}
      >
        <p className="text-[10px] uppercase tracking-wider" style={{ color: "#546877" }}>Route AI</p>
        <p className="mt-1 text-sm font-semibold text-primary">Optimised · −18% ETA</p>
      </div>

      {/* Telemetry card - blue-gray accent */}
      <div
        className="absolute -left-3 bottom-14 rounded-xl bg-[#F5EDE0]/90 backdrop-blur-sm px-4 py-3 text-xs shadow-lg"
        style={{ animation: "eza-float 6s ease-in-out 1.4s infinite", border: "1px solid rgba(84,104,119,0.45)" }}
      >
        <p className="text-[10px] uppercase tracking-wider" style={{ color: "#546877" }}>Express slot</p>
        <p className="mt-1 text-sm font-semibold" style={{ color: "#546877" }}>45 min window</p>
      </div>
    </div>
  );
}
