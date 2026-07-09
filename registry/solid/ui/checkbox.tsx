import { splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import * as CheckboxPrimitive from "@kobalte/core/checkbox";
import { CheckIcon } from "lucide-solid";

import { useOptionalFormControlProps } from "@/registry/solid/lib/form-control";
import { cn } from "@/registry/solid/lib/utils";

export type CheckboxProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof CheckboxPrimitive.Root<T>
>;

function Checkbox<T extends ValidComponent = "div">(props: CheckboxProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children", "id"]);
  const formControlProps = useOptionalFormControlProps();
  return (
    <CheckboxPrimitive.Root data-slot="checkbox" {...rest}>
      {(state) => (
        <>
          <CheckboxPrimitive.Input
            data-slot="checkbox-input"
            id={local.id ?? formControlProps?.().id}
            aria-describedby={formControlProps?.()["aria-describedby"]}
            aria-invalid={formControlProps?.()["aria-invalid"]}
          />
          <CheckboxPrimitive.Control
            data-slot="checkbox-control"
            onClick={(event) => event.preventDefault()}
            class={cn(
              "peer size-4 shrink-0 border border-border/60 bg-muted/40 text-foreground/80 shadow-[var(--glass-shadow-inset)] transition-[border,background,color,box-shadow] outline-none",
              "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40",
              "data-[checked]:bg-foreground data-[checked]:text-background",
              "disabled:cursor-not-allowed disabled:opacity-40",
              "rounded-none",
              local.class,
            )}
          >
            <CheckboxPrimitive.Indicator
              data-slot="checkbox-indicator"
              class="flex items-center justify-center text-current transition-none"
            >
              <CheckIcon class="size-3.5" />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Control>
          {typeof local.children === "function" ? local.children(state) : local.children}
        </>
      )}
    </CheckboxPrimitive.Root>
  );
}

export type CheckboxLabelProps<T extends ValidComponent = "label"> = ComponentProps<
  typeof CheckboxPrimitive.Label<T>
>;

function CheckboxLabel<T extends ValidComponent = "label">(props: CheckboxLabelProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <CheckboxPrimitive.Label
      data-slot="checkbox-label"
      class={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[invalid]:text-destructive",
        local.class,
      )}
      {...rest}
    />
  );
}

export type CheckboxDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof CheckboxPrimitive.Description<T>
>;

function CheckboxDescription<T extends ValidComponent = "div">(props: CheckboxDescriptionProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <CheckboxPrimitive.Description
      data-slot="checkbox-description"
      class={cn("text-sm text-muted-foreground data-[disabled]:opacity-50", local.class)}
      {...rest}
    />
  );
}

export type CheckboxInputProps<T extends ValidComponent = "input"> = ComponentProps<
  typeof CheckboxPrimitive.Input<T>
>;

function CheckboxInput<T extends ValidComponent = "input">(props: CheckboxInputProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <CheckboxPrimitive.Input
      data-slot="checkbox-input"
      class={cn(
        "[&:focus-visible+div]:ring-ring/50 peer [&:focus-visible+div]:ring-[3px]",
        local.class,
      )}
      {...rest}
    />
  );
}

export type CheckboxControlProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof CheckboxPrimitive.Control<T>
>;

function CheckboxControl<T extends ValidComponent = "div">(props: CheckboxControlProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <CheckboxPrimitive.Control
      data-slot="checkbox-control"
      class={cn(
        "peer size-4 shrink-0 border border-border/60 bg-muted/40 text-foreground/80 shadow-[var(--glass-shadow-inset)] transition-[border,background,color,box-shadow] outline-none",
        "peer-focus-visible:border-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40",
        "data-[checked]:bg-foreground data-[checked]:text-background",
        "disabled:cursor-not-allowed disabled:opacity-40",
        "rounded-none",
        local.class,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        class="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon class="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Control>
  );
}

export {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxInput,
  CheckboxLabel,
  type CheckboxControlProps,
  type CheckboxDescriptionProps,
  type CheckboxInputProps,
  type CheckboxLabelProps,
  type CheckboxProps,
};
