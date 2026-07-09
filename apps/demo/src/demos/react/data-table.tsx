import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/registry/react/ui/badge";
import { Button } from "@/registry/react/ui/button";
import { DataTable } from "@/registry/react/ui/data-table";

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
    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="text-sm">{row.getValue("service") as string}</p>
        <p className="text-muted-foreground text-xs">{row.original.id}</p>
      </div>
    ),
  },
  {
    accessorKey: "owner",
    header: "OWNER",
    enableColumnFilter: true,
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground/80">{row.getValue("owner") as string}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as Deployment["status"];
      const tone =
        status === "Healthy" ? "secondary" : status === "Warning" ? "outline" : "destructive";
      return (
        <Badge variant={tone} className="text-xs">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "region",
    header: "REGION",
    cell: ({ row }) => (
      <span className="text-sm text-foreground/80">{row.getValue("region") as string}</span>
    ),
  },
  {
    accessorKey: "latencyMs",
    header: "P95 LATENCY",
    cell: ({ row }) => (
      <span className="text-sm text-foreground/80">
        {row.original.latencyMs.toLocaleString()} ms
      </span>
    ),
  },
  {
    accessorKey: "incidents",
    header: "INCIDENTS",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground/70">{row.original.incidents}</span>
    ),
  },
];

export default function DataTableDemo() {
  const data = useMemo(() => deployments, []);

  return (
    <DataTable
      columns={columns}
      data={data}
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
