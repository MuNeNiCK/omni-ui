import { splitProps, type ComponentProps, type JSX } from "solid-js";
import * as AlertDialogPrimitive from "@kobalte/core/alert-dialog";
import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/registry/solid/ui/button";
import { cn } from "@/registry/solid/lib/utils";

function AlertDialog(props: ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger(props: ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal(props: ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay(props: ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
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

function AlertDialogContent(props: ComponentProps<typeof AlertDialogPrimitive.Content>) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
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

function AlertDialogHeader(props: JSX.HTMLAttributes<HTMLDivElement> & { class?: string }) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div data-slot="alert-dialog-header" class={cn("flex flex-col gap-3", local.class)} {...rest} />
  );
}

function AlertDialogFooter(props: JSX.HTMLAttributes<HTMLDivElement> & { class?: string }) {
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

function AlertDialogTitle(props: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      class={cn("text-sm font-medium text-muted-foreground", local.class)}
      {...rest}
    />
  );
}

function AlertDialogDescription(props: ComponentProps<typeof AlertDialogPrimitive.Description>) {
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

function AlertDialogAction(
  props: ComponentProps<typeof AlertDialogPrimitive.CloseButton> & {
    variant?: ButtonStyleProps["variant"];
    size?: ButtonStyleProps["size"];
  },
) {
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

function AlertDialogCancel(
  props: ComponentProps<typeof AlertDialogPrimitive.CloseButton> & {
    variant?: ButtonStyleProps["variant"];
    size?: ButtonStyleProps["size"];
  },
) {
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
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
