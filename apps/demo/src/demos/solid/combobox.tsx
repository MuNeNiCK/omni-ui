import { createSignal, createMemo, Show, For } from "solid-js";
import { ChevronsUpDownIcon } from "lucide-solid";

import { Badge } from "@/registry/solid/ui/badge";
import { Button } from "@/registry/solid/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/solid/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/solid/ui/command";
import { cn } from "@/registry/solid/lib/utils";

const regions = [
  {
    value: "tokyo",
    label: "Tokyo",
    badge: "Primary",
    description: "Low latency for Japan workloads.",
  },
  {
    value: "osaka",
    label: "Osaka",
    badge: "Failover",
    description: "Warm standby for critical services.",
  },
  {
    value: "singapore",
    label: "Singapore",
    badge: "Edge",
    description: "Edge cache and streaming endpoints.",
  },
  {
    value: "sydney",
    label: "Sydney",
    badge: "Preview",
    description: "Pilot clusters for APAC partners.",
  },
];

const teams = [
  { value: "observability", label: "Observability", hint: "SRE" },
  { value: "security", label: "Security", hint: "Security" },
  { value: "product", label: "Product", hint: "Product" },
  { value: "growth", label: "Growth", hint: "Operations" },
];

export default function ComboboxDemo() {
  const [openRegion, setOpenRegion] = createSignal(false);
  const [region, setRegion] = createSignal<string | null>(null);
  const [openTeam, setOpenTeam] = createSignal(false);
  const [team, setTeam] = createSignal<string | null>("observability");

  const selectedRegion = createMemo(() => regions.find((item) => item.value === region()));
  const selectedTeam = createMemo(() => teams.find((item) => item.value === team()));

  return (
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-sm font-medium text-muted-foreground">Region selector</h3>
        <Popover open={openRegion()} onOpenChange={setOpenRegion}>
          <PopoverTrigger
            class={cn(
              "inline-flex w-fit items-center justify-between gap-2 border border-border/60 bg-muted/60 px-3 text-xs font-medium text-foreground/85 shadow-[var(--glass-shadow-outline)] transition-[border,background,color,box-shadow] outline-none",
              "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "h-10 min-w-[18rem]",
              "rounded-none",
              !selectedRegion() && "text-muted-foreground/70",
            )}
          >
            <span class="truncate text-left leading-none">
              <Show when={selectedRegion()} fallback="Select a deployment region…">
                {(r) => (
                  <span class="flex items-center gap-3">
                    <span>{r().label}</span>
                    <Badge variant="outline">{r().badge}</Badge>
                  </span>
                )}
              </Show>
            </span>
            <ChevronsUpDownIcon class="size-3.5 shrink-0 opacity-60" />
          </PopoverTrigger>
          <PopoverContent class="w-auto min-w-[18rem] p-0">
            <Command class="border-none bg-transparent shadow-none backdrop-blur-none">
              <CommandInput placeholder="Filter regions…" />
              <CommandList>
                <CommandEmpty>No regions found.</CommandEmpty>
                <CommandGroup>
                  <For each={regions}>
                    {(item) => (
                      <CommandItem
                        value={item.value}
                        onSelect={(current: string) => {
                          const next = current === region() ? null : current;
                          setRegion(next);
                          setOpenRegion(false);
                        }}
                      >
                        <span class="flex flex-col">
                          <span class="font-medium leading-none">{item.label}</span>
                          <span class="text-muted-foreground/70 text-xs">{item.description}</span>
                        </span>
                      </CommandItem>
                    )}
                  </For>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Show
          when={selectedRegion()}
          fallback={
            <p class="text-sm text-muted-foreground">
              Choose a region to see its operational role.
            </p>
          }
        >
          {(r) => (
            <p class="text-sm text-muted-foreground">
              <span class="font-semibold text-foreground">{r().label}</span> is mapped to the{" "}
              {r().badge?.toLowerCase()} cluster.
            </p>
          )}
        </Show>
      </div>

      <div class="space-y-4">
        <h3 class="text-sm font-medium text-muted-foreground">Team assignment</h3>
        <div class="flex flex-wrap items-center gap-3">
          <Popover open={openTeam()} onOpenChange={setOpenTeam}>
            <PopoverTrigger
              class={cn(
                "inline-flex w-fit items-center justify-between gap-2 border border-border/60 bg-muted/60 px-3 text-xs font-medium text-foreground/85 shadow-[var(--glass-shadow-outline)] transition-[border,background,color,box-shadow] outline-none",
                "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "h-9 min-w-[12rem]",
                "rounded-none",
              )}
            >
              <span class="truncate text-left leading-none">
                {selectedTeam()?.label ?? "Assign to…"}
              </span>
              <ChevronsUpDownIcon class="size-3.5 shrink-0 opacity-60" />
            </PopoverTrigger>
            <PopoverContent class="w-auto min-w-[12rem] p-0">
              <Command class="border-none bg-transparent shadow-none backdrop-blur-none">
                <CommandInput placeholder="Filter teams…" />
                <CommandList>
                  <CommandEmpty>No team found.</CommandEmpty>
                  <CommandGroup>
                    <For each={teams}>
                      {(item) => (
                        <CommandItem
                          value={item.value}
                          onSelect={(current: string) => {
                            setTeam(current);
                            setOpenTeam(false);
                          }}
                        >
                          <span class="flex w-full items-center justify-between">
                            <span>{item.label}</span>
                            <span class="text-muted-foreground/60 text-xs">{item.hint}</span>
                          </span>
                        </CommandItem>
                      )}
                    </For>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      value="new-team"
                      onSelect={() => {
                        setOpenTeam(false);
                      }}
                    >
                      Create new team…
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="sm">
            Notify
          </Button>
          <Button size="sm">Assign</Button>
        </div>
      </div>
    </div>
  );
}
