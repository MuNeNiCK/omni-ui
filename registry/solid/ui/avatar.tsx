import { splitProps, Show, type ParentProps, type JSX } from "solid-js";

import { cn } from "@/registry/solid/lib/utils";

type AvatarStatus = "online" | "away" | "offline";

const statusBadgeStyles: Record<AvatarStatus, string> = {
  online: "text-emerald-400 dark:text-emerald-300",
  away: "text-amber-300 dark:text-amber-200",
  offline: "text-muted-foreground/60 dark:text-muted-foreground/40",
};

function Avatar(
  props: ParentProps<
    {
      class?: string;
      status?: AvatarStatus;
    } & JSX.HTMLAttributes<HTMLSpanElement>
  >,
) {
  const [local, rest] = splitProps(props, ["class", "children", "status"]);
  return (
    <span
      data-slot="avatar"
      data-status={local.status}
      class={cn(
        "relative flex size-10 shrink-0 items-center justify-center overflow-hidden",
        "rounded-none border border-border/60 bg-muted/40 text-foreground shadow-[var(--glass-shadow-outline)] backdrop-blur-[8px]",
        "transition-[border,background,color,box-shadow]",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <Show when={local.status}>
        <span
          aria-hidden
          class={cn(
            "pointer-events-none absolute bottom-0 right-0 grid size-3.5 place-items-center overflow-visible text-current",
            "translate-x-[45%] translate-y-[45%]",
            statusBadgeStyles[local.status!],
          )}
        >
          <span class="absolute inset-0 bg-background/92 backdrop-blur-[2px] shadow-[var(--glass-shadow-outline-strong)]" />
          <span class="absolute inset-0 border border-border/60" />
          <span class="relative h-2 w-2 bg-current shadow-[0_0_5px_currentColor]" />
        </span>
      </Show>
    </span>
  );
}

function AvatarImage(
  props: ParentProps<
    {
      class?: string;
      src?: string;
      alt?: string;
      onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
    } & JSX.ImgHTMLAttributes<HTMLImageElement>
  >,
) {
  const [local, rest] = splitProps(props, ["class", "onLoadingStatusChange"]);
  return (
    <img
      data-slot="avatar-image"
      class={cn("size-full object-cover", local.class)}
      onLoad={() => local.onLoadingStatusChange?.("loaded")}
      onError={() => local.onLoadingStatusChange?.("error")}
      {...rest}
    />
  );
}

function AvatarFallback(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLSpanElement>>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <span
      data-slot="avatar-fallback"
      class={cn(
        "pointer-events-none flex size-full items-center justify-center bg-transparent font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </span>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
