import { For } from "solid-js";
import { ScrollArea, ScrollBar } from "@/registry/solid/ui/scroll-area";

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
    <ScrollArea class="h-48 w-full">
      <ul class="flex flex-col gap-3 p-4 text-sm text-muted-foreground">
        <For each={regions}>
          {(region) => (
            <li class="flex items-center justify-between border border-border/50 bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground/80">
              {region}
              <span class="text-xs normal-case tracking-normal text-foreground/70">
                12 services
              </span>
            </li>
          )}
        </For>
      </ul>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
