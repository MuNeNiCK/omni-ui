import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/registry/react/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "relative isolate shrink-0 overflow-hidden data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        "after:absolute after:inset-0 after:content-[''] after:bg-border/60",
        "data-[orientation=horizontal]:after:bg-gradient-to-r data-[orientation=horizontal]:after:from-transparent data-[orientation=horizontal]:after:via-border/60 data-[orientation=horizontal]:after:to-transparent",
        "data-[orientation=vertical]:after:bg-gradient-to-b data-[orientation=vertical]:after:from-transparent data-[orientation=vertical]:after:via-border/60 data-[orientation=vertical]:after:to-transparent",
        "dark:data-[orientation=horizontal]:after:via-white/20 dark:data-[orientation=vertical]:after:via-white/20",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
