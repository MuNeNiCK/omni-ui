import { Loader2Icon } from "lucide-react";

import { cn } from "@/registry/react/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn(
        "size-4 animate-spin text-foreground/80 drop-shadow-[var(--glass-drop-shadow-subtle)]",
        "dark:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Spinner };
