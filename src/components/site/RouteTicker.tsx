import { TICKER } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function RouteTicker({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const items = [...TICKER, ...TICKER];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y py-3",
        tone === "dark" ? "border-paper/12" : "border-border",
        className,
      )}
    >
      <div className="marquee-track flex w-max gap-10">
        {items.map((item, i) => (
          <span
            key={i}
            className={cn(
              "label-mono flex shrink-0 items-center gap-4 whitespace-nowrap",
              tone === "dark" ? "text-paper/55" : "text-muted-foreground",
            )}
          >
            <span className="inline-block h-1 w-1 rounded-full bg-lime-dim" />
            {item}
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-24",
          tone === "dark"
            ? "bg-gradient-to-r from-ink to-transparent"
            : "bg-gradient-to-r from-paper to-transparent",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-24",
          tone === "dark"
            ? "bg-gradient-to-l from-ink to-transparent"
            : "bg-gradient-to-l from-paper to-transparent",
        )}
      />
    </div>
  );
}
