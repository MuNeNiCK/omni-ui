import type { ComponentProps, ValidComponent } from "solid-js";
import { Show, splitProps } from "solid-js";

import type { DynamicProps, RootProps } from "@corvu/otp-field";
import OtpField from "@corvu/otp-field";
import { MinusIcon } from "lucide-solid";

import { cn } from "@/registry/solid/lib/utils";

export type OTPFieldProps<T extends ValidComponent = "div"> = RootProps<T> & {
  class?: string;
  containerClassName?: string;
};

const OTPField = <T extends ValidComponent = "div">(props: DynamicProps<T, OTPFieldProps<T>>) => {
  const [, rest] = splitProps(props as OTPFieldProps, ["class", "containerClassName"]);
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

export type OTPFieldGroupProps = ComponentProps<"div">;

const OTPFieldGroup = (props: OTPFieldGroupProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div data-slot="input-otp-group" class={cn("flex items-center", local.class)} {...others} />
  );
};

export type OTPFieldSlotProps = ComponentProps<"div"> & { index: number };

const OTPFieldSlot = (props: OTPFieldSlotProps) => {
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

export type OTPFieldSeparatorProps = ComponentProps<"div">;

const OTPFieldSeparator = (props: OTPFieldSeparatorProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      class={cn("flex items-center justify-center px-1 text-muted-foreground/60", local.class)}
      {...rest}
    >
      <MinusIcon class="size-4" />
    </div>
  );
};

export type OTPFieldInputProps<T extends ValidComponent = "input"> = ComponentProps<
  typeof OtpField.Input<T>
>;

const OTPFieldInput = <T extends ValidComponent = "input">(props: OTPFieldInputProps<T>) => (
  <OtpField.Input data-slot="input-otp-input" {...props} />
);

const InputOTP = OTPField;
const InputOTPGroup = OTPFieldGroup;
const InputOTPSlot = OTPFieldSlot;
const InputOTPSeparator = OTPFieldSeparator;

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  OTPField,
  OTPFieldGroup,
  OTPFieldInput,
  OTPFieldSeparator,
  OTPFieldSlot,
};
