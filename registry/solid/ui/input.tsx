import type { ComponentProps, JSX, ValidComponent } from "solid-js";
import { For, Match, Switch, splitProps } from "solid-js";
import { TextField as TextFieldPrimitive } from "@kobalte/core/text-field";

import { useOptionalFormControlProps } from "@/registry/solid/lib/form-control";
import { cn } from "@/registry/solid/lib/utils";

const inputClasses = [
  "file:text-foreground placeholder:text-muted-foreground/70 selection:bg-foreground selection:text-background dark:bg-input/40 border border-border/60 flex h-10 w-full min-w-0 rounded-none bg-muted/40 px-3 text-sm text-foreground/90 shadow-[var(--glass-shadow-inset)] transition-[border,background,color,box-shadow] outline-none file:inline-flex file:h-8 file:rounded-none file:border file:border-border/40 file:bg-muted/60 file:px-2 file:text-sm file:font-medium file:text-foreground/80 file:transition-[background,color,border] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40",
].join(" ");

const textareaClasses =
  "border border-border/60 placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30 dark:aria-invalid:focus-visible:ring-destructive/40 dark:bg-input/40 field-sizing-content min-h-32 w-full rounded-none bg-muted/40 px-3 py-3 text-sm text-foreground/90 shadow-[var(--glass-shadow-inset)] transition-[border,background,color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50";

export type TextFieldProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TextFieldPrimitive<T>
>;

const TextField = <T extends ValidComponent = "div">(props: TextFieldProps<T>) => {
  const [, rest] = splitProps(props as TextFieldProps, ["class"]);
  return (
    <TextFieldPrimitive
      data-slot="text-field"
      class={cn("grid w-full gap-2", props.class)}
      {...rest}
    />
  );
};

export type TextFieldInputProps<T extends ValidComponent = "input"> = ComponentProps<
  typeof TextFieldPrimitive.Input<T>
>;

const TextFieldInput = <T extends ValidComponent = "input">(props: TextFieldInputProps<T>) => {
  const [, rest] = splitProps(props as TextFieldInputProps, ["class"]);
  return (
    <TextFieldPrimitive.Input
      data-slot="text-field-input"
      class={cn(inputClasses, props.class)}
      {...rest}
    />
  );
};

export type TextFieldTextAreaProps<T extends ValidComponent = "textarea"> = ComponentProps<
  typeof TextFieldPrimitive.TextArea<T>
>;

const TextFieldTextArea = <T extends ValidComponent = "textarea">(
  props: TextFieldTextAreaProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldTextAreaProps, ["class"]);
  return (
    <TextFieldPrimitive.TextArea
      data-slot="text-field-textarea"
      class={cn(textareaClasses, props.class)}
      {...rest}
    />
  );
};

export type TextFieldLabelProps<T extends ValidComponent = "label"> = ComponentProps<
  typeof TextFieldPrimitive.Label<T>
>;

const TextFieldLabel = <T extends ValidComponent = "label">(props: TextFieldLabelProps<T>) => {
  const [, rest] = splitProps(props as TextFieldLabelProps, ["class"]);
  return (
    <TextFieldPrimitive.Label
      data-slot="text-field-label"
      class={cn(
        "text-sm font-medium select-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:text-destructive",
        props.class,
      )}
      {...rest}
    />
  );
};

export type TextFieldErrorMessageProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TextFieldPrimitive.ErrorMessage<T>
> & {
  errors?: ({ message?: string } | undefined)[];
};

const TextFieldErrorMessage = <T extends ValidComponent = "div">(
  props: TextFieldErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldErrorMessageProps, ["class", "errors", "children"]);
  const uniqueErrors = () => [
    ...new Map(props.errors?.map((error) => [error?.message, error])).values(),
  ];

  return (
    <TextFieldPrimitive.ErrorMessage
      data-slot="text-field-error-message"
      class={cn("text-destructive text-sm", props.class)}
      {...rest}
    >
      <Switch
        fallback={
          <ul class="ml-4 flex list-disc flex-col gap-1">
            <For each={uniqueErrors()}>{(error) => <li>{error?.message}</li>}</For>
          </ul>
        }
      >
        <Match when={props.children}>{props.children}</Match>
        <Match when={!props.errors?.length}>{null}</Match>
        <Match when={uniqueErrors().length === 1}>{uniqueErrors()[0]?.message}</Match>
      </Switch>
    </TextFieldPrimitive.ErrorMessage>
  );
};

export type TextFieldDescriptionProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TextFieldPrimitive.Description<T>
>;

const TextFieldDescription = <T extends ValidComponent = "div">(
  props: TextFieldDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldDescriptionProps, ["class"]);
  return (
    <TextFieldPrimitive.Description
      data-slot="text-field-description"
      class={cn("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  );
};

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "type",
    "id",
    "aria-describedby",
    "aria-invalid",
  ]);
  const formControlProps = useOptionalFormControlProps();
  return (
    <input
      type={local.type}
      data-slot="input"
      id={local.id ?? formControlProps?.().id}
      aria-describedby={local["aria-describedby"] ?? formControlProps?.()["aria-describedby"]}
      aria-invalid={local["aria-invalid"] ?? formControlProps?.()["aria-invalid"]}
      class={cn(inputClasses, local.class)}
      {...rest}
    />
  );
}

export {
  Input,
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextArea,
};
