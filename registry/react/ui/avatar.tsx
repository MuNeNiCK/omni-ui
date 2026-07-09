"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/registry/react/lib/utils";

type AvatarStatus = "online" | "away" | "offline";

const statusBadgeStyles: Record<AvatarStatus, string> = {
  online: "text-emerald-400 dark:text-emerald-300",
  away: "text-amber-300 dark:text-amber-200",
  offline: "text-muted-foreground/60 dark:text-muted-foreground/40",
};

function Avatar({
  className,
  status,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  status?: AvatarStatus;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-status={status}
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center overflow-hidden",
        "rounded-none border border-border/60 bg-muted/40 text-foreground shadow-[var(--glass-shadow-outline)] backdrop-blur-[8px]",
        "transition-[border,background,color,box-shadow]",
        className,
      )}
      {...props}
    >
      {children}
      {status ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-0 right-0 grid size-3.5 place-items-center overflow-visible text-current",
            "translate-x-[45%] translate-y-[45%]",
            statusBadgeStyles[status],
          )}
        >
          <span className="absolute inset-0 bg-background/92 backdrop-blur-[2px] shadow-[var(--glass-shadow-outline-strong)]" />
          <span className="absolute inset-0 border border-border/60" />
          <span className="relative h-2 w-2 bg-current shadow-[0_0_5px_currentColor]" />
        </span>
      ) : null}
    </AvatarPrimitive.Root>
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "pointer-events-none flex size-full items-center justify-center bg-transparent text-xs font-medium text-muted-foreground/80",
        className,
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
