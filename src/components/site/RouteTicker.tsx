import { TICKER } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function RouteTicker({ className }: { tone?: "dark" | "light"; className?: string }) {
  const items = [...TICKER, ...TICKER];
  return (
    <div className={cn("relative overflow-hidden border-y border-border py-3 bg-background", className)}>
      <div className="marquee-track flex w-max gap-10">
        {items.map((item, i) => (
          <span key={i} className="label-mono flex shrink-0 items-center gap-4 whitespace-nowrap text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: i % 2 === 0 ? "#FF771C" : "#546877" }} />
            {item}
          </span>
        ))}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
