import { ScrollArea, ScrollBar } from "@/registry/react/ui/scroll-area";

const regions = [
  "Tokyo",
  "Osaka",
  "Singapore",
  "Frankfurt",
  "Oregon",
  "Sydney",
  "Virginia",
  "Mumbai",
  "Jakarta",
  "London",
  "Seoul",
];

export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-48 w-full">
      <ul className="flex flex-col gap-3 p-4 text-sm text-muted-foreground">
        {regions.map((region) => (
          <li
            key={region}
            className="flex items-center justify-between border border-border/50 bg-muted/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/80"
          >
            {region}
            <span className="text-xs normal-case tracking-normal text-foreground/70">
              12 services
            </span>
          </li>
        ))}
      </ul>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
