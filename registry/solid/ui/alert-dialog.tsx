import { splitProps, type ComponentProps, type JSX, type ValidComponent } from "solid-js";
import * as AlertDialogPrimitive from "@kobalte/core/alert-dialog";
import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/registry/solid/ui/button";
import { cn } from "@/registry/solid/lib/utils";

export type AlertDialogProps = ComponentProps<typeof AlertDialogPrimitive.Root>;

function AlertDialog(props: AlertDialogProps) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export type AlertDialogTriggerProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof AlertDialogPrimitive.Trigger<T>
>;

function AlertDialogTrigger<T extends ValidComponent = "button">(
  props: AlertDialogTriggerProps<T>,
) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal(props: ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

export type AlertDialogOverlayProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof AlertDialogPrimitive.Overlay<T>
>;

function AlertDialogOverlay<T extends ValidComponent = "div">(props: AlertDialogOverlayProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      class={cn(
        "omni-glass-overlay",
        "data-[expanded]:animate-in data-[expanded]:fade-in-0",
        "data-[closed]:animate-out data-[closed]:fade-out-0",
        local.class,
      )}
      {...rest}
    />
  );
}

export type AlertDialogContentProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof AlertDialogPrimitive.Content<T>
> & {
  size?: "default" | "sm";
};

function AlertDialogContent<T extends ValidComponent = "div">(props: AlertDialogContentProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children", "size"]);
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        data-size={local.size ?? "default"}
        onInteractOutside={(e: Event) => e.preventDefault()}
        class={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-6 px-6 py-6",
          "omni-glass-surface-strong",
          "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95",
          "data-[closed]:animate-out data-[closed]:zoom-out-95",
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  );
}

export type AlertDialogHeaderProps = JSX.HTMLAttributes<HTMLDivElement> & { class?: string };

function AlertDialogHeader(props: AlertDialogHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div data-slot="alert-dialog-header" class={cn("flex flex-col gap-3", local.class)} {...rest} />
  );
}

export type AlertDialogFooterProps = JSX.HTMLAttributes<HTMLDivElement> & { class?: string };

function AlertDialogFooter(props: AlertDialogFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="alert-dialog-footer"
      class={cn(
        "flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:justify-end sm:gap-2",
        local.class,
      )}
      {...rest}
    />
  );
}

export type AlertDialogMediaProps = JSX.HTMLAttributes<HTMLDivElement> & { class?: string };

function AlertDialogMedia(props: AlertDialogMediaProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="alert-dialog-media"
      class={cn(
        "mb-2 inline-flex size-16 items-center justify-center border border-border/60 bg-muted/40 text-foreground [&_svg:not([class*='size-'])]:size-8",
        local.class,
      )}
      {...rest}
    />
  );
}

export type AlertDialogTitleProps<T extends ValidComponent = "h2"> = ComponentProps<
  typeof AlertDialogPrimitive.Title<T>
>;

function AlertDialogTitle<T extends ValidComponent = "h2">(props: AlertDialogTitleProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      class={cn("text-sm font-medium text-muted-foreground", local.class)}
      {...rest}
    />
  );
}

export type AlertDialogDescriptionProps<T extends ValidComponent = "p"> = ComponentProps<
  typeof AlertDialogPrimitive.Description<T>
>;

function AlertDialogDescription<T extends ValidComponent = "p">(
  props: AlertDialogDescriptionProps<T>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      class={cn("text-sm text-foreground/80 leading-relaxed", local.class)}
      {...rest}
    />
  );
}

type ButtonStyleProps = VariantProps<typeof buttonVariants>;

export type AlertDialogActionProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof AlertDialogPrimitive.CloseButton<T>
> & {
  variant?: ButtonStyleProps["variant"];
  size?: ButtonStyleProps["size"];
};

function AlertDialogAction<T extends ValidComponent = "button">(props: AlertDialogActionProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children", "variant", "size"]);
  return (
    <AlertDialogPrimitive.CloseButton
      as={Button}
      variant={local.variant ?? "default"}
      size={local.size}
      class={cn(
        "border-destructive/60 text-destructive before:bg-destructive hover:border-destructive hover:bg-destructive hover:text-background focus-visible:ring-destructive/30",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </AlertDialogPrimitive.CloseButton>
  );
}

export type AlertDialogCancelProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof AlertDialogPrimitive.CloseButton<T>
> & {
  variant?: ButtonStyleProps["variant"];
  size?: ButtonStyleProps["size"];
};

function AlertDialogCancel<T extends ValidComponent = "button">(props: AlertDialogCancelProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children", "variant", "size"]);
  return (
    <AlertDialogPrimitive.CloseButton
      as={Button}
      variant={local.variant ?? "muted"}
      size={local.size}
      class={cn(
        "hover:border-foreground hover:bg-muted/60 focus-visible:ring-ring/30",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </AlertDialogPrimitive.CloseButton>
  );
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
