import {
  TypographyBody,
  TypographyBodyMuted,
  TypographyCaption,
  TypographyDisplay,
  TypographyEyebrow,
  TypographyLabel,
  TypographyMetric,
  TypographyMono,
  TypographySubtitle,
  TypographyTitle,
} from "@/registry/react/ui/typography";

export default function TypographyDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground">Dashboard Hero</p>
        <TypographyEyebrow>STATUS</TypographyEyebrow>
        <TypographyDisplay>Control Plane Deployment Overview</TypographyDisplay>
        <TypographySubtitle>
          Edge fleet, workload health, and compliance snapshots in one viewport.
        </TypographySubtitle>
        <TypographyBodyMuted>
          Latency and error rates mirror the alerting thresholds defined in the platform guardrails.
          Use the label and caption variants to annotate aux metrics or timestamps.
        </TypographyBodyMuted>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-muted-foreground">Metrics Deck</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1">
            <TypographyLabel>Requests</TypographyLabel>
            <TypographyMetric>87.2k</TypographyMetric>
            <TypographyCaption>+12.4% vs. previous week</TypographyCaption>
          </div>
          <div className="space-y-1">
            <TypographyLabel>Latency (P95)</TypographyLabel>
            <TypographyMetric>162 ms</TypographyMetric>
            <TypographyCaption className="text-destructive">+28 ms variance</TypographyCaption>
          </div>
          <div className="space-y-1">
            <TypographyLabel>Error rate</TypographyLabel>
            <TypographyMetric>0.14%</TypographyMetric>
            <TypographyMono className="text-muted-foreground/70">
              24 incidents resolved
            </TypographyMono>
          </div>
          <div className="space-y-1">
            <TypographyLabel>Feature flag</TypographyLabel>
            <TypographyTitle>Edge cache rewrite</TypographyTitle>
            <TypographyBody>
              Rollout is limited to 35% of requests while regional soak tests complete.
            </TypographyBody>
          </div>
        </div>
      </div>
    </div>
  );
}
