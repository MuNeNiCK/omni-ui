import {
  createMemo,
  createSignal,
  createUniqueId,
  Show,
  splitProps,
  createContext,
  useContext,
  type Accessor,
  type JSX,
  type ParentProps,
} from "solid-js";

import { FormControlContext } from "@/registry/solid/lib/form-control";
import { cn } from "@/registry/solid/lib/utils";
import { Label } from "@/registry/solid/ui/label";

type FormFieldContextValue = {
  name: string;
  error: Accessor<string | undefined>;
  setError: (msg: string | undefined) => void;
};

const FormFieldContext = createContext<FormFieldContextValue>();

type FormItemContextValue = {
  id: string;
  descriptionId: string;
  messageId: string;
};

const FormItemContext = createContext<FormItemContextValue>();

type FormErrorsContextValue = {
  errors: Accessor<Record<string, string | undefined>>;
  setErrors: (errors: Record<string, string | undefined>) => void;
  setFieldError: (name: string, error: string | undefined) => void;
  clearErrors: () => void;
};

const FormErrorsContext = createContext<FormErrorsContextValue>();

function useFormField() {
  const fieldCtx = useContext(FormFieldContext);
  const itemCtx = useContext(FormItemContext);
  if (!fieldCtx) throw new Error("useFormField must be used within <FormField />");
  return {
    name: fieldCtx.name,
    error: fieldCtx.error,
    setError: fieldCtx.setError,
    formItemId: itemCtx?.id ?? "",
    formDescriptionId: itemCtx?.descriptionId ?? "",
    formMessageId: itemCtx?.messageId ?? "",
  };
}

function useFormErrors() {
  return useContext(FormErrorsContext);
}

type FormProps = ParentProps<
  JSX.FormHTMLAttributes<HTMLFormElement> & {
    errors?: Record<string, string | undefined>;
  }
>;

function Form(props: FormProps) {
  const [local, rest] = splitProps(props, ["class", "children", "errors"]);
  const [internalErrors, setInternalErrors] = createSignal<Record<string, string | undefined>>(
    local.errors ?? {},
  );

  const setFieldError = (name: string, error: string | undefined) => {
    setInternalErrors((prev) => ({ ...prev, [name]: error }));
  };

  const clearErrors = () => setInternalErrors({});

  return (
    <FormErrorsContext.Provider
      value={{
        errors: internalErrors,
        setErrors: setInternalErrors,
        setFieldError,
        clearErrors,
      }}
    >
      <form data-slot="form" class={cn(local.class)} {...rest}>
        {local.children}
      </form>
    </FormErrorsContext.Provider>
  );
}

function FormField(props: ParentProps<{ name: string }>) {
  const formErrors = useFormErrors();
  const [fieldError, setFieldError] = createSignal<string | undefined>(undefined);

  const error = createMemo(() => {
    const formLevelError = formErrors?.errors()?.[props.name];
    if (formLevelError) return formLevelError;
    return fieldError();
  });

  return (
    <FormFieldContext.Provider value={{ name: props.name, error, setError: setFieldError }}>
      {props.children}
    </FormFieldContext.Provider>
  );
}

function FormItem(props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const id = createUniqueId();

  return (
    <FormItemContext.Provider
      value={{
        id: `${id}-form-item`,
        descriptionId: `${id}-form-item-description`,
        messageId: `${id}-form-item-message`,
      }}
    >
      <div data-slot="form-item" class={cn("grid gap-2", local.class)} {...rest}>
        {local.children}
      </div>
    </FormItemContext.Provider>
  );
}

function FormLabel(
  props: ParentProps<{ class?: string } & JSX.LabelHTMLAttributes<HTMLLabelElement>>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  const { formItemId, error } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error()}
      class={cn("data-[error=true]:text-destructive", local.class)}
      for={formItemId}
      {...rest}
    />
  );
}

function FormControl(props: ParentProps) {
  const controlProps = createMemo(() => useFormControlProps());
  return (
    <FormControlContext.Provider value={controlProps}>{props.children}</FormControlContext.Provider>
  );
}

function useFormControlProps() {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField();
  return {
    id: formItemId,
    "aria-describedby": error() ? `${formDescriptionId} ${formMessageId}` : formDescriptionId,
    "aria-invalid": error() ? true : undefined,
  };
}

function FormDescription(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLParagraphElement>>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  );
}

function FormMessage(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLParagraphElement>>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const { error, formMessageId } = useFormField();

  const body = createMemo(() => error() || local.children);

  return (
    <Show when={body()}>
      <p
        data-slot="form-message"
        id={formMessageId}
        class={cn("text-destructive text-sm", local.class)}
        role={error() ? "alert" : undefined}
        {...rest}
      >
        {body()}
      </p>
    </Show>
  );
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};
