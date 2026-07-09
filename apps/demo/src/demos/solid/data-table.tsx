import type { ColumnDef } from "@tanstack/solid-table";

import { Badge } from "@/registry/solid/ui/badge";
import { Button } from "@/registry/solid/ui/button";
import { DataTable } from "@/registry/solid/ui/data-table";

type Deployment = {
  id: string;
  service: string;
  owner: string;
  status: "Healthy" | "Warning" | "Degraded";
  region: string;
  latencyMs: number;
  incidents: number;
};

const deployments: Deployment[] = [
  {
    id: "svc-telemetry",
    service: "Telemetry API",
    owner: "Observability",
    status: "Healthy",
    region: "Tokyo",
    latencyMs: 128,
    incidents: 0,
  },
  {
    id: "svc-gateway",
    service: "Ingress Gateway",
    owner: "SRE",
    status: "Warning",
    region: "Singapore",
    latencyMs: 182,
    incidents: 1,
  },
  {
    id: "svc-reports",
    service: "Reports",
    owner: "Product",
    status: "Healthy",
    region: "Frankfurt",
    latencyMs: 156,
    incidents: 0,
  },
  {
    id: "svc-billing",
    service: "Billing",
    owner: "Finance",
    status: "Degraded",
    region: "Oregon",
    latencyMs: 244,
    incidents: 3,
  },
  {
    id: "svc-ai",
    service: "Inference API",
    owner: "AI Platform",
    status: "Warning",
    region: "Tokyo",
    latencyMs: 198,
    incidents: 2,
  },
];

const columns: ColumnDef<Deployment>[] = [
  {
    accessorKey: "service",
    header: "SERVICE",
    cell: (info) => (
      <div class="space-y-1">
        <p class="text-sm">{info.getValue() as string}</p>
        <p class="text-muted-foreground text-xs">{info.row.original.id}</p>
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: "OWNER",
    enableColumnFilter: true,
    cell: (info) => (
      <span class="text-sm text-muted-foreground/80">{info.getValue() as string}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: (info) => {
      const status = info.getValue() as Deployment["status"];
      const tone =
        status === "Healthy" ? "secondary" : status === "Warning" ? "outline" : "destructive";
      return (
        <Badge variant={tone} class="text-xs">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "region",
    header: "REGION",
    cell: (info) => <span class="text-sm text-foreground/80">{info.getValue() as string}</span>,
  },
  {
    accessorKey: "latencyMs",
    header: "P95 LATENCY",
    cell: (info) => (
      <span class="text-sm text-foreground/80">
        {info.row.original.latencyMs.toLocaleString()} ms
      </span>
    ),
  },
  {
    accessorKey: "incidents",
    header: "INCIDENTS",
    cell: (info) => (
      <span class="text-sm text-muted-foreground/70">{info.row.original.incidents}</span>
    ),
  },
];

export default function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={deployments}
      searchKey="service"
      toolbar={() => (
        <Button size="sm" variant="muted">
          Export CSV
        </Button>
      )}
      emptyMessage="No services matched your filters."
    />
  );
}
