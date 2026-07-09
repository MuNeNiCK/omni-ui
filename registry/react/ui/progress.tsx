"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/registry/react/lib/utils";

function Progress({
  className,
  children,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-none border border-border/60 bg-muted/40 shadow-[var(--glass-shadow-inset)]",
        "dark:border-white/20",
        className,
      )}
      {...props}
    >
      {children ?? (
        <ProgressIndicator style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
      )}
    </ProgressPrimitive.Root>
  );
}

function ProgressTrack({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-track"
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Indicator>) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "relative h-full w-full flex-1 bg-foreground transition-transform",
        "[&::after]:absolute [&::after]:inset-0 [&::after]:bg-background/20 [&::after]:mix-blend-overlay [&::after]:content-['']",
        className,
      )}
      {...props}
    />
  );
}

function ProgressLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  );
}

function ProgressValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="progress-value"
      className={cn("ml-auto text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  );
}

export { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue };
