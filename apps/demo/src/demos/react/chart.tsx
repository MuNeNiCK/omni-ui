import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/react/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

const trafficConfig = {
  requests: {
    label: "Requests",
    theme: { light: "#38bdf8", dark: "#38bdf8" },
  },
  errors: {
    label: "Errors",
    theme: { light: "#f97316", dark: "#fb923c" },
  },
} satisfies ChartConfig;

const trafficData = [
  { label: "00:00", requests: 42, errors: 12 },
  { label: "06:00", requests: 51, errors: 18 },
  { label: "12:00", requests: 64, errors: 14 },
  { label: "18:00", requests: 72, errors: 22 },
];

const latencyConfig = {
  latency: {
    label: "Latency",
    icon: undefined,
    theme: { light: "#22c55e", dark: "#34d399" },
  },
} satisfies ChartConfig;

const latencyData = [
  { label: "Tokyo", latency: 138 },
  { label: "Singapore", latency: 162 },
  { label: "Frankfurt", latency: 148 },
  { label: "Oregon", latency: 210 },
];

export default function ChartDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Request vs error rate
          </CardTitle>
          <CardDescription>
            Multi-series area chart with legend and tooltip styled by the registry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-w-0 overflow-hidden">
            <ChartContainer config={trafficConfig} className="h-56 w-full sm:h-72">
              <AreaChart data={trafficData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stroke="var(--color-requests)"
                  fill="var(--color-requests)"
                  fillOpacity={0.24}
                  strokeWidth={2.5}
                  isAnimationActive={false}
                />
                <Area
                  type="monotone"
                  dataKey="errors"
                  stroke="var(--color-errors)"
                  fill="var(--color-errors)"
                  fillOpacity={0.28}
                  strokeWidth={2.5}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Regional latency
          </CardTitle>
          <CardDescription>
            Single-series bar chart using the same container for consistent styling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-w-0 overflow-hidden">
            <ChartContainer config={latencyConfig} className="h-56 w-full sm:h-72">
              <BarChart data={latencyData} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="4 4" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="latency"
                  radius={0}
                  fill="var(--color-latency)"
                  isAnimationActive={false}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
