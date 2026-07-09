export type ComponentStatus = "done" | "wip" | "todo" | "unchanged";

export const COMPONENT_STATUS_META: Record<ComponentStatus, { label: string; className: string }> =
  {
    done: {
      label: "Done",
      className:
        "border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:border-emerald-300/40 dark:bg-emerald-300/10 dark:text-emerald-200",
    },
    wip: {
      label: "In Progress",
      className:
        "border-amber-500/30 bg-amber-500/15 text-amber-600 dark:border-amber-300/40 dark:bg-amber-300/10 dark:text-amber-200",
    },
    todo: {
      label: "Todo",
      className: "border-border/60 bg-transparent text-muted-foreground dark:text-neutral-400",
    },
    unchanged: {
      label: "No Change",
      className: "border-slate-500/30 bg-transparent text-muted-foreground dark:text-slate-300",
    },
  };
