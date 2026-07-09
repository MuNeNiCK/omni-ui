import { type JSX, splitProps } from "solid-js";

import { cn } from "@/registry/solid/lib/utils";

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement>;

function Skeleton(props: SkeletonProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="skeleton"
      class={cn(
        "animate-pulse rounded-none bg-muted/40 shadow-[var(--glass-shadow-inset)]",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Skeleton };
