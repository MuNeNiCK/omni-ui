import { type JSX, splitProps } from "solid-js";

import { useOptionalFormControlProps } from "@/registry/solid/lib/form-control";
import { cn } from "@/registry/solid/lib/utils";

function Textarea(props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [local, rest] = splitProps(props, ["class", "id", "aria-describedby", "aria-invalid"]);
  const formControlProps = useOptionalFormControlProps();
  return (
    <textarea
      data-slot="textarea"
      id={local.id ?? formControlProps?.().id}
      aria-describedby={local["aria-describedby"] ?? formControlProps?.()["aria-describedby"]}
      aria-invalid={local["aria-invalid"] ?? formControlProps?.()["aria-invalid"]}
      class={cn(
        "border border-border/60 placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40 dark:bg-input/40 field-sizing-content min-h-32 w-full rounded-none bg-muted/40 px-3 py-3 text-sm text-foreground/90 shadow-[var(--glass-shadow-inset)] transition-[border,background,color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50",
        local.class,
      )}
      {...rest}
    />
  );
}

export { Textarea };
