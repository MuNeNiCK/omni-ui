import { splitProps, Show, type ComponentProps, type JSX, type ValidComponent } from "solid-js";
import * as DialogPrimitive from "@kobalte/core/dialog";
import { XIcon } from "lucide-solid";
import { cn, omniMonoText } from "@/registry/solid/lib/utils";

export type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export type DialogTriggerProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof DialogPrimitive.Trigger<T>
>;

function DialogTrigger<T extends ValidComponent = "button">(props: DialogTriggerProps<T>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export type DialogCloseButtonProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof DialogPrimitive.CloseButton<T>
>;

function DialogCloseButton<T extends ValidComponent = "button">(props: DialogCloseButtonProps<T>) {
  return <DialogPrimitive.CloseButton data-slot="dialog-close" {...props} />;
}

function DialogOverlay(props: ComponentProps<typeof DialogPrimitive.Overlay>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      class={cn(
        "omni-glass-overlay",
        "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[closed]:animate-out data-[closed]:fade-out-0",
        local.class,
      )}
      {...rest}
    />
  );
}

export type DialogContentProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof DialogPrimitive.Content<T>
> & {
  showCloseButton?: boolean;
};

function DialogContent<T extends ValidComponent = "div">(props: DialogContentProps<T>) {
  const [local, rest] = splitProps(props, ["class", "children", "showCloseButton"]);
  const showClose = () => local.showCloseButton !== false;
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        class={cn(
          "fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 gap-6 overflow-y-auto px-6 py-6",
          "omni-glass-surface-strong",
          "data-[expanded]:animate-in data-[expanded]:fade-in-0 data-[expanded]:zoom-in-95 data-[closed]:animate-out data-[closed]:zoom-out-95",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <Show when={showClose()}>
          <DialogPrimitive.CloseButton data-slot="dialog-close" class="omni-glass-close-button">
            <XIcon class="size-4" />
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </Show>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export type DialogHeaderProps = JSX.HTMLAttributes<HTMLDivElement> & { class?: string };

function DialogHeader(props: DialogHeaderProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return <div data-slot="dialog-header" class={cn("flex flex-col gap-3", local.class)} {...rest} />;
}

export type DialogFooterProps = JSX.HTMLAttributes<HTMLDivElement> & { class?: string };

function DialogFooter(props: DialogFooterProps) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="dialog-footer"
      class={cn(
        "flex flex-col-reverse gap-2 border-t border-border/60 pt-4 sm:flex-row sm:justify-end",
        local.class,
      )}
      {...rest}
    />
  );
}

export type DialogTitleProps<T extends ValidComponent = "h2"> = ComponentProps<
  typeof DialogPrimitive.Title<T>
>;

function DialogTitle<T extends ValidComponent = "h2">(props: DialogTitleProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      class={cn(omniMonoText.section, "text-muted-foreground", local.class)}
      {...rest}
    />
  );
}

export type DialogDescriptionProps<T extends ValidComponent = "p"> = ComponentProps<
  typeof DialogPrimitive.Description<T>
>;

function DialogDescription<T extends ValidComponent = "p">(props: DialogDescriptionProps<T>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      class={cn("text-sm text-foreground/80", local.class)}
      {...rest}
    />
  );
}

export {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  type DialogCloseButtonProps,
  type DialogContentProps,
  type DialogDescriptionProps,
  type DialogFooterProps,
  type DialogHeaderProps,
  type DialogProps,
  type DialogTitleProps,
  type DialogTriggerProps,
};
