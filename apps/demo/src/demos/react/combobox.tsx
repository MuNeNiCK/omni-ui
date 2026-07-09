import { useMemo, useState } from "react";

import { Badge } from "@/registry/react/ui/badge";
import { Button } from "@/registry/react/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxSeparator,
  ComboboxTrigger,
} from "@/registry/react/ui/combobox";

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
  const [openRegion, setOpenRegion] = useState(false);
  const [region, setRegion] = useState<string | null>(null);
  const [openTeam, setOpenTeam] = useState(false);
  const [team, setTeam] = useState<string | null>("observability");

  const selectedRegion = useMemo(() => regions.find((item) => item.value === region), [region]);
  const selectedTeam = useMemo(() => teams.find((item) => item.value === team), [team]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Region selector
        </h3>
        <Combobox open={openRegion} onOpenChange={setOpenRegion}>
          <ComboboxTrigger placeholder="Select a deployment region" className="min-w-[18rem]">
            {selectedRegion ? (
              <span className="flex items-center gap-3">
                <span>{selectedRegion.label}</span>
                <Badge variant="outline" className="font-mono text-[10px]">
                  {selectedRegion.badge}
                </Badge>
              </span>
            ) : null}
          </ComboboxTrigger>
          <ComboboxContent>
            <ComboboxSearch placeholder="Filter regions" />
            <ComboboxList>
              <ComboboxEmpty>No regions found.</ComboboxEmpty>
              <ComboboxGroup>
                {regions.map((item) => (
                  <ComboboxItem
                    key={item.value}
                    value={item.value}
                    onSelect={(current) => {
                      const next = current === region ? null : current;
                      setRegion(next);
                      setOpenRegion(false);
                    }}
                  >
                    <span className="flex flex-col">
                      <span className="font-medium leading-none">{item.label}</span>
                      <span className="text-muted-foreground/70 text-[11px]">
                        {item.description}
                      </span>
                    </span>
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>

        {selectedRegion ? (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{selectedRegion.label}</span> is mapped
            to the {selectedRegion.badge?.toLowerCase()} cluster.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Choose a region to see its operational role.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
          Team assignment
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Combobox open={openTeam} onOpenChange={setOpenTeam}>
            <ComboboxTrigger size="sm" placeholder="Assign to..." className="min-w-[12rem]">
              {selectedTeam?.label}
            </ComboboxTrigger>
            <ComboboxContent align="end">
              <ComboboxSearch placeholder="Filter teams" />
              <ComboboxList>
                <ComboboxEmpty>No team found.</ComboboxEmpty>
                <ComboboxGroup>
                  {teams.map((item) => (
                    <ComboboxItem
                      key={item.value}
                      value={item.value}
                      onSelect={(current) => {
                        setTeam(current);
                        setOpenTeam(false);
                      }}
                    >
                      <span className="flex w-full items-center justify-between">
                        <span>{item.label}</span>
                        <span className="text-muted-foreground/60 text-[11px]">{item.hint}</span>
                      </span>
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
                <ComboboxSeparator />
                <ComboboxGroup>
                  <ComboboxItem
                    value="new-team"
                    onSelect={() => {
                      setOpenTeam(false);
                    }}
                  >
                    Create new team...
                  </ComboboxItem>
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <Button variant="ghost" size="sm" className="tracking-[0.32em]">
            Notify
          </Button>
          <Button size="sm" className="tracking-[0.32em]">
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
}
