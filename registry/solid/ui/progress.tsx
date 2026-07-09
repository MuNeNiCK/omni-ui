import { splitProps, type ComponentProps } from "solid-js";
import * as ProgressPrimitive from "@kobalte/core/progress";
import { cn } from "@/registry/solid/lib/utils";

export type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root>;

function Progress(props: ProgressProps) {
  const [local, rest] = splitProps(props, ["class", "children", "value"]);
  return (
    <ProgressPrimitive.Root data-slot="progress" value={local.value} {...rest}>
      {local.children}
      <ProgressTrack class={local.class}>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

export type ProgressTrackProps = ComponentProps<typeof ProgressPrimitive.Track>;

function ProgressTrack(props: ProgressTrackProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      class={cn(
        "relative h-2 w-full overflow-hidden rounded-none border border-border/60 bg-muted/40 shadow-[var(--glass-shadow-inset)]",
        "dark:border-white/20",
        local.class,
      )}
      {...rest}
    />
  );
}

export type ProgressIndicatorProps = ComponentProps<typeof ProgressPrimitive.Fill>;

function ProgressIndicator(props: ProgressIndicatorProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ProgressPrimitive.Fill
      data-slot="progress-indicator"
      class={cn(
        "relative h-full w-[var(--kb-progress-fill-width)] bg-foreground transition-[width]",
        "[&::after]:absolute [&::after]:inset-0 [&::after]:bg-background/20 [&::after]:mix-blend-overlay [&::after]:content-['']",
        local.class,
      )}
      {...rest}
    />
  );
}

export type ProgressGroupProps = ComponentProps<"div">;

function ProgressGroup(props: ProgressGroupProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="progress-group"
      class={cn("flex items-center justify-between gap-3", local.class)}
      {...rest}
    />
  );
}

export type ProgressLabelProps = ComponentProps<typeof ProgressPrimitive.Label>;

function ProgressLabel(props: ProgressLabelProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      class={cn("text-sm font-medium text-foreground", local.class)}
      {...rest}
    />
  );
}

export type ProgressValueLabelProps = ComponentProps<typeof ProgressPrimitive.ValueLabel>;

function ProgressValueLabel(props: ProgressValueLabelProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ProgressPrimitive.ValueLabel
      data-slot="progress-value"
      class={cn("ml-auto text-sm text-muted-foreground tabular-nums", local.class)}
      {...rest}
    />
  );
}

const ProgressValue = ProgressValueLabel;

export {
  Progress,
  ProgressGroup,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
  ProgressValueLabel,
};
