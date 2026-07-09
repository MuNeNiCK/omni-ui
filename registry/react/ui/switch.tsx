"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/registry/react/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 items-center border border-border/60 bg-muted/50 text-foreground/80 transition-[border,background,color,transform] outline-none disabled:cursor-not-allowed disabled:opacity-40",
        "data-[state=checked]:bg-foreground data-[state=checked]:text-background",
        "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "rounded-none",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 border border-border/60 bg-muted/70 text-current transition-transform",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-[calc(100%-2px)]",
          "rounded-none",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
