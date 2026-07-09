import {
  splitProps,
  createSignal,
  createEffect,
  createContext,
  useContext,
  createMemo,
  onCleanup,
  mergeProps,
  Show,
  type ParentProps,
  type JSX,
  type Accessor,
  type ComponentProps,
  type ValidComponent,
} from "solid-js";
import { Polymorphic } from "@kobalte/core";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-solid";

import { useIsMobile } from "@/registry/solid/hooks/use-mobile";
import { cn } from "@/registry/solid/lib/utils";
import { Button } from "@/registry/solid/ui/button";
import { Input } from "@/registry/solid/ui/input";
import { Separator } from "@/registry/solid/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/registry/solid/ui/sheet";
import { Skeleton } from "@/registry/solid/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/solid/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

// --- Context ---

type SidebarContextProps = {
  state: Accessor<"expanded" | "collapsed">;
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  openMobile: Accessor<boolean>;
  setOpenMobile: (open: boolean) => void;
  isMobile: Accessor<boolean>;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps>();

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

// --- SidebarProvider ---

type SidebarProviderProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>;

function SidebarProvider(props: SidebarProviderProps) {
  const merged = mergeProps({ defaultOpen: true }, props);
  const [local, rest] = splitProps(merged, [
    "class",
    "style",
    "children",
    "defaultOpen",
    "open",
    "onOpenChange",
  ]);

  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = createSignal(false);
  const [internalOpen, setInternalOpen] = createSignal(local.defaultOpen!);

  const open = () => (local.open !== undefined ? local.open! : internalOpen());

  const setOpen = (value: boolean) => {
    if (local.onOpenChange) {
      local.onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  };

  const toggleSidebar = () => {
    if (isMobile()) {
      setOpenMobile((prev) => !prev);
    } else {
      setOpen(!open());
    }
  };

  // Adds a keyboard shortcut to toggle the sidebar.
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  const state = createMemo<"expanded" | "collapsed">(() => (open() ? "expanded" : "collapsed"));

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }}
    >
      <div
        data-slot="sidebar-wrapper"
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...(typeof local.style === "object" ? local.style : {}),
        }}
        class={cn(
          "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
          local.class,
        )}
        {...rest}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  );
}

// --- Sidebar ---

type SidebarProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>;

function Sidebar(props: SidebarProps) {
  const merged = mergeProps(
    { side: "left" as const, variant: "sidebar" as const, collapsible: "offcanvas" as const },
    props,
  );
  const [local, rest] = splitProps(merged, ["class", "children", "side", "variant", "collapsible"]);

  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  return (
    <Show
      when={local.collapsible !== "none"}
      fallback={
        <div
          data-slot="sidebar"
          class={cn(
            "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
            local.class,
          )}
          {...rest}
        >
          {local.children}
        </div>
      }
    >
      <Show
        when={!isMobile()}
        fallback={
          <Sheet open={openMobile()} onOpenChange={setOpenMobile}>
            <SheetContent
              data-sidebar="sidebar"
              data-slot="sidebar"
              data-mobile="true"
              class="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
              style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE }}
              side={local.side}
            >
              <SheetHeader class="sr-only">
                <SheetTitle>Sidebar</SheetTitle>
                <SheetDescription>Displays the mobile sidebar.</SheetDescription>
              </SheetHeader>
              <div class="flex h-full w-full flex-col">{local.children}</div>
            </SheetContent>
          </Sheet>
        }
      >
        <div
          class="group peer text-sidebar-foreground hidden md:block"
          data-state={state()}
          data-collapsible={state() === "collapsed" ? local.collapsible : ""}
          data-variant={local.variant}
          data-side={local.side}
          data-slot="sidebar"
        >
          {/* This is what handles the sidebar gap on desktop */}
          <div
            data-slot="sidebar-gap"
            class={cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              local.variant === "floating" || local.variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
            )}
          />
          <div
            data-slot="sidebar-container"
            class={cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              local.side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              local.variant === "floating" || local.variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              local.class,
            )}
            {...rest}
          >
            <div
              data-sidebar="sidebar"
              data-slot="sidebar-inner"
              class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
            >
              {local.children}
            </div>
          </div>
        </div>
      </Show>
    </Show>
  );
}

// --- SidebarTrigger ---

function SidebarTrigger(props: JSX.ButtonHTMLAttributes<HTMLButtonElement> & { class?: string }) {
  const [local, rest] = splitProps(props, ["class", "onClick"]);
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      class={cn("size-7", local.class)}
      onClick={(event: MouseEvent) => {
        local.onClick?.(event);
        toggleSidebar();
      }}
      {...rest}
    >
      <PanelLeftIcon />
      <span class="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

// --- SidebarRail ---

function SidebarRail(props: JSX.ButtonHTMLAttributes<HTMLButtonElement> & { class?: string }) {
  const [local, rest] = splitProps(props, ["class"]);
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      class={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        local.class,
      )}
      {...rest}
    />
  );
}

// --- SidebarInset ---

function SidebarInset(props: ParentProps<JSX.HTMLAttributes<HTMLElement> & { class?: string }>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <main
      data-slot="sidebar-inset"
      class={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        local.class,
      )}
      {...rest}
    />
  );
}

// --- SidebarInput ---

function SidebarInput(props: JSX.InputHTMLAttributes<HTMLInputElement> & { class?: string }) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      class={cn("bg-background h-8 w-full shadow-none", local.class)}
      {...rest}
    />
  );
}

// --- SidebarHeader ---

function SidebarHeader(
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      class={cn("flex flex-col gap-2 p-2", local.class)}
      {...rest}
    />
  );
}

// --- SidebarFooter ---

function SidebarFooter(
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      class={cn("flex flex-col gap-2 p-2", local.class)}
      {...rest}
    />
  );
}

// --- SidebarSeparator ---

function SidebarSeparator(props: ComponentProps<typeof Separator>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      class={cn("bg-sidebar-border mx-2 w-auto", local.class)}
      {...rest}
    />
  );
}

// --- SidebarContent ---

function SidebarContent(
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      class={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

// --- SidebarGroup ---

function SidebarGroup(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { class?: string }>) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      class={cn("relative flex w-full min-w-0 flex-col p-2", local.class)}
      {...rest}
    />
  );
}

// --- SidebarGroupLabel ---

type SidebarGroupLabelProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & {
    class?: string;
    as?: ValidComponent;
  }
>;

function SidebarGroupLabel(props: SidebarGroupLabelProps) {
  const [local, rest] = splitProps(props, ["class", "as"]);
  return (
    <Polymorphic
      as={local.as ?? "div"}
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      class={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        local.class,
      )}
      {...rest}
    />
  );
}

// --- SidebarGroupAction ---

type SidebarGroupActionProps = ParentProps<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    class?: string;
    as?: ValidComponent;
  }
>;

function SidebarGroupAction(props: SidebarGroupActionProps) {
  const [local, rest] = splitProps(props, ["class", "as"]);
  return (
    <Polymorphic
      as={local.as ?? "button"}
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      class={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

// --- SidebarGroupContent ---

function SidebarGroupContent(
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      class={cn("w-full text-sm", local.class)}
      {...rest}
    />
  );
}

// --- SidebarMenu ---

function SidebarMenu(
  props: ParentProps<JSX.HTMLAttributes<HTMLUListElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      class={cn("flex w-full min-w-0 flex-col gap-1", local.class)}
      {...rest}
    />
  );
}

// --- SidebarMenuItem ---

function SidebarMenuItem(
  props: ParentProps<JSX.HTMLAttributes<HTMLLIElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      class={cn("group/menu-item relative", local.class)}
      {...rest}
    />
  );
}

// --- SidebarMenuButton ---

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type SidebarMenuButtonProps = ParentProps<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    class?: string;
    as?: ValidComponent;
    isActive?: boolean;
    tooltip?: string | ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>;

function SidebarMenuButton(props: SidebarMenuButtonProps) {
  const [local, rest] = splitProps(props, [
    "class",
    "as",
    "isActive",
    "variant",
    "size",
    "tooltip",
  ]);

  const { isMobile, state } = useSidebar();

  const button = () => (
    <Polymorphic
      as={local.as ?? "button"}
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={local.size}
      data-active={local.isActive}
      class={cn(
        sidebarMenuButtonVariants({ variant: local.variant, size: local.size }),
        local.class,
      )}
      {...rest}
    />
  );

  return (
    <Show when={local.tooltip} fallback={button()}>
      {(tip) => {
        const tooltipProps = () => {
          const t = tip();
          return typeof t === "string" ? { children: t } : t;
        };
        return (
          <Tooltip>
            <TooltipTrigger as="span">{button()}</TooltipTrigger>
            <TooltipContent hidden={state() !== "collapsed" || isMobile()} {...tooltipProps()} />
          </Tooltip>
        );
      }}
    </Show>
  );
}

// --- SidebarMenuAction ---

type SidebarMenuActionProps = ParentProps<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    class?: string;
    as?: ValidComponent;
    showOnHover?: boolean;
  }
>;

function SidebarMenuAction(props: SidebarMenuActionProps) {
  const [local, rest] = splitProps(props, ["class", "as", "showOnHover"]);
  return (
    <Polymorphic
      as={local.as ?? "button"}
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      class={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        local.class,
      )}
      {...rest}
    />
  );
}

// --- SidebarMenuBadge ---

function SidebarMenuBadge(
  props: ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      class={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

// --- SidebarMenuSkeleton ---

type SidebarMenuSkeletonProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & {
    class?: string;
    showIcon?: boolean;
  }
>;

function SidebarMenuSkeleton(props: SidebarMenuSkeletonProps) {
  const [local, rest] = splitProps(props, ["class", "showIcon"]);
  // Random width between 50 to 90%.
  const width = createMemo(() => `${Math.floor(Math.random() * 40) + 50}%`);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      class={cn("flex h-8 items-center gap-2 rounded-md px-2", local.class)}
      {...rest}
    >
      <Show when={local.showIcon}>
        <Skeleton class="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
      </Show>
      <Skeleton
        class="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{ "--skeleton-width": width() }}
      />
    </div>
  );
}

// --- SidebarMenuSub ---

function SidebarMenuSub(
  props: ParentProps<JSX.HTMLAttributes<HTMLUListElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      class={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

// --- SidebarMenuSubItem ---

function SidebarMenuSubItem(
  props: ParentProps<JSX.HTMLAttributes<HTMLLIElement> & { class?: string }>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      class={cn("group/menu-sub-item relative", local.class)}
      {...rest}
    />
  );
}

// --- SidebarMenuSubButton ---

type SidebarMenuSubButtonProps = ParentProps<
  JSX.AnchorHTMLAttributes<HTMLAnchorElement> & {
    class?: string;
    as?: ValidComponent;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>;

function SidebarMenuSubButton(props: SidebarMenuSubButtonProps) {
  const merged = mergeProps({ size: "md" as const, isActive: false }, props);
  const [local, rest] = splitProps(merged, ["class", "as", "size", "isActive"]);

  return (
    <Polymorphic
      as={local.as ?? "a"}
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={local.size}
      data-active={local.isActive}
      class={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        local.size === "sm" && "text-xs",
        local.size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...rest}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
