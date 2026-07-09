import { splitProps, type ComponentProps, type ValidComponent } from "solid-js";
import * as SwitchPrimitive from "@kobalte/core/switch";

import { useOptionalFormControlProps } from "@/registry/solid/lib/form-control";
import { cn } from "@/registry/solid/lib/utils";

export type SwitchProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SwitchPrimitive.Root<T>
> & {
  size?: "sm" | "default";
};

function Switch<T extends ValidComponent = "div">(props: SwitchProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children", "size"]);
  const formControlProps = useOptionalFormControlProps();
  return (
    <SwitchPrimitive.Root data-slot="switch" data-size={local.size ?? "default"} {...rest}>
      {(state) => (
        <>
          <SwitchPrimitive.Input
            data-slot="switch-input"
            id={formControlProps?.().id}
            aria-describedby={formControlProps?.()["aria-describedby"]}
            aria-invalid={formControlProps?.()["aria-invalid"]}
          />
          <SwitchPrimitive.Control
            data-slot="switch-control"
            data-size={local.size ?? "default"}
            class={cn(
              "peer inline-flex h-5 w-9 shrink-0 items-center border border-border/60 bg-muted/50 text-foreground/80 transition-[border,background,color,transform] outline-none disabled:cursor-not-allowed disabled:opacity-40",
              "data-[checked]:bg-foreground data-[checked]:text-background",
              "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "rounded-none",
              local.class,
            )}
          >
            <SwitchPrimitive.Thumb
              data-slot="switch-thumb"
              class={cn(
                "pointer-events-none block size-4 border border-border/60 bg-muted/70 text-current transition-transform",
                "translate-x-0",
                "data-[checked]:translate-x-[calc(100%-2px)]",
                "rounded-none",
              )}
            />
          </SwitchPrimitive.Control>
          {typeof local.children === "function" ? local.children(state) : local.children}
        </>
      )}
    </SwitchPrimitive.Root>
  );
}

export type SwitchControlProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SwitchPrimitive.Control<T>
>;

function SwitchControl<T extends ValidComponent = "div">(props: SwitchControlProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SwitchPrimitive.Control
      data-slot="switch-control"
      class={cn(
        "peer group/switch inline-flex h-5 w-9 shrink-0 items-center border border-border/60 bg-muted/50 text-foreground/80 transition-[border,background,color,transform] outline-none",
        "data-[checked]:bg-foreground data-[checked]:text-background",
        "peer-focus-visible/switch-input:border-foreground peer-focus-visible/switch-input:ring-2 peer-focus-visible/switch-input:ring-ring/40 peer-focus-visible/switch-input:ring-offset-2 peer-focus-visible/switch-input:ring-offset-background",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40",
        "rounded-none",
        local.class,
      )}
      {...rest}
    />
  );
}

export type SwitchThumbProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SwitchPrimitive.Thumb<T>
>;

function SwitchThumb<T extends ValidComponent = "div">(props: SwitchThumbProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      class={cn(
        "pointer-events-none block size-4 border border-border/60 bg-muted/70 text-current transition-transform",
        "translate-x-0 data-[checked]:translate-x-[calc(100%-2px)]",
        "rounded-none",
        local.class,
      )}
      {...rest}
    />
  );
}

export type SwitchInputProps<T extends ValidComponent = "input"> = ComponentProps<
  typeof SwitchPrimitive.Input<T>
>;

function SwitchInput<T extends ValidComponent = "input">(props: SwitchInputProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SwitchPrimitive.Input
      data-slot="switch-input"
      class={cn("peer/switch-input", local.class)}
      {...rest}
    />
  );
}

export type SwitchLabelProps<T extends ValidComponent = "label"> = ComponentProps<
  typeof SwitchPrimitive.Label<T>
>;

function SwitchLabel<T extends ValidComponent = "label">(props: SwitchLabelProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SwitchPrimitive.Label
      data-slot="switch-label"
      class={cn(
        "text-sm font-medium select-none",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[invalid]:text-destructive",
        local.class,
      )}
      {...rest}
    />
  );
}

export type SwitchErrorMessageProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SwitchPrimitive.ErrorMessage<T>
>;

function SwitchErrorMessage<T extends ValidComponent = "div">(props: SwitchErrorMessageProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SwitchPrimitive.ErrorMessage
      data-slot="switch-error-message"
      class={cn("text-sm text-destructive", local.class)}
      {...rest}
    />
  );
}

export type SwitchDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SwitchPrimitive.Description<T>
>;

function SwitchDescription<T extends ValidComponent = "div">(props: SwitchDescriptionProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <SwitchPrimitive.Description
      data-slot="switch-description"
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
}

export {
  Switch,
  SwitchControl,
  SwitchDescription,
  SwitchErrorMessage,
  SwitchInput,
  SwitchLabel,
  SwitchThumb,
  type SwitchControlProps,
  type SwitchDescriptionProps,
  type SwitchErrorMessageProps,
  type SwitchInputProps,
  type SwitchLabelProps,
  type SwitchProps,
  type SwitchThumbProps,
};
