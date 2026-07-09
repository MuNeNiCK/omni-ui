import type { Component, ComponentProps, ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";

import type { DynamicProps, RootProps } from "@corvu/otp-field";
import OtpField from "@corvu/otp-field";
import { MinusIcon } from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";

export const REGEXP_ONLY_DIGITS = "^\\d*$";
export const REGEXP_ONLY_CHARS = "^[a-zA-Z]*$";
export const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]*$";

type InputOTPProps<T extends ValidComponent = "div"> = RootProps<T> & {
  class?: string;
  containerClassName?: string;
};

const InputOTP = <T extends ValidComponent = "div">(props: DynamicProps<T, InputOTPProps<T>>) => {
  const [, rest] = splitProps(props as InputOTPProps, ["class", "containerClassName"]);
  return (
    <OtpField
      data-slot="input-otp"
      class={cn(
        "flex items-center gap-3 has-[:disabled]:opacity-50",
        props.containerClassName,
        props.class,
      )}
      {...rest}
    />
  );
};

const InputOTPGroup: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div data-slot="input-otp-group" class={cn("flex items-center", local.class)} {...others} />
  );
};

const InputOTPSlot: Component<ComponentProps<"div"> & { index: number }> = (props) => {
  const [local, others] = splitProps(props, ["class", "index"]);
  const context = OtpField.useContext();
  const char = () => context.value()[local.index];
  const isActive = () => context.activeSlots().includes(local.index);
  const showFakeCaret = () => context.value().length === local.index && context.isInserting();

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive() || undefined}
      class={cn(
        "relative flex h-10 w-10 items-center justify-center border border-border/60 bg-muted/40 font-mono text-base tracking-[0.2em] text-foreground/90 shadow-[var(--glass-shadow-inset)] transition-[color,border,background] outline-none",
        "data-[active]:border-foreground data-[active]:bg-foreground data-[active]:text-background",
        "aria-invalid:border-destructive aria-invalid:text-destructive",
        "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
        "first:rounded-none first:border-l last:rounded-none",
        local.class,
      )}
      {...others}
    >
      {char()}
      <Show when={showFakeCaret()}>
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="h-4 w-px animate-caret-blink bg-background" />
        </div>
      </Show>
    </div>
  );
};

const InputOTPSeparator: Component<ComponentProps<"div">> = (props) => {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      class="flex items-center justify-center px-1 text-muted-foreground/60"
      {...props}
    >
      <MinusIcon class="size-4" />
    </div>
  );
};

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
