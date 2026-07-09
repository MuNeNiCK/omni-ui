"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/registry/react/lib/utils";

function Progress({
  className,
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
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "relative h-full w-full flex-1 bg-foreground transition-all",
          "[&::after]:absolute [&::after]:inset-0 [&::after]:bg-background/20 [&::after]:mix-blend-overlay [&::after]:content-['']",
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
