import {
  Show,
  createContext,
  splitProps,
  useContext,
  type ComponentProps,
  type JSX,
  type ParentProps,
} from "solid-js";
import * as NavigationMenuPrimitive from "@kobalte/core/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-solid";

import { cn, omniMonoText } from "@/registry/solid/lib/utils";

type NavigationMenuContextValue = {
  viewport: () => boolean;
};

const NavigationMenuContext = createContext<NavigationMenuContextValue>({
  viewport: () => true,
});

function useNavigationMenuContext() {
  return useContext(NavigationMenuContext);
}

function NavigationMenu(
  props: ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    class?: string;
    viewport?: boolean;
  },
) {
  const [local, rest] = splitProps(props, ["class", "children", "viewport"]);
  const viewport = () => local.viewport ?? true;

  return (
    <NavigationMenuContext.Provider
      value={{
        viewport,
      }}
    >
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        data-viewport={viewport()}
        class={cn(
          "group/navigation-menu relative flex max-w-max items-center justify-center",
          local.class,
        )}
        {...rest}
      >
        {local.children}
        <Show when={viewport()}>
          <NavigationMenuViewport />
        </Show>
      </NavigationMenuPrimitive.Root>
    </NavigationMenuContext.Provider>
  );
}

function NavigationMenuList(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLUListElement>>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <ul
      data-slot="navigation-menu-list"
      class={cn("group flex flex-1 list-none items-center justify-center gap-1", local.class)}
      {...rest}
    >
      {local.children}
    </ul>
  );
}

function NavigationMenuItem(
  props: ParentProps<{ class?: string } & ComponentProps<typeof NavigationMenuPrimitive.Menu>>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <li data-slot="navigation-menu-item" class={cn("relative", local.class)}>
      <NavigationMenuPrimitive.Menu {...rest}>{local.children}</NavigationMenuPrimitive.Menu>
    </li>
  );
}

const navigationMenuTriggerStyle = cva(
  cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-3 py-1.5 text-muted-foreground transition-[color,background,border,box-shadow] focus-visible:outline-none",
    omniMonoText.compact,
  ),
);

function NavigationMenuTrigger(
  props: ParentProps<{ class?: string } & JSX.ButtonHTMLAttributes<HTMLButtonElement>>,
) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      class={cn(
        navigationMenuTriggerStyle(),
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "data-[expanded]:bg-accent/50 data-[expanded]:text-accent-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        "group",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <ChevronDownIcon
        class="relative top-px ml-2 size-3 transition duration-200 group-data-[expanded]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

function NavigationMenuContent(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  const ctx = useNavigationMenuContext();
  const content = (
    <NavigationMenuPrimitive.Content
      as="div"
      data-slot="navigation-menu-content"
      class={cn(
        "top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
        "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-none group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:border-border/60 group-data-[viewport=false]/navigation-menu:bg-muted/70 group-data-[viewport=false]/navigation-menu:text-foreground group-data-[viewport=false]/navigation-menu:shadow-[var(--glass-shadow-outline-subtle)] group-data-[viewport=false]/navigation-menu:backdrop-blur-[4px] group-data-[viewport=false]/navigation-menu:duration-200",
        "group-data-[viewport=false]/navigation-menu:data-[expanded]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[expanded]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[closed]:zoom-out-95",
        "**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        "dark:group-data-[viewport=false]/navigation-menu:border-white/20",
        local.class,
      )}
      {...rest}
    />
  );

  return (
    <Show when={ctx.viewport()} fallback={content}>
      <NavigationMenuPrimitive.Portal>{content}</NavigationMenuPrimitive.Portal>
    </Show>
  );
}

function NavigationMenuViewport(
  props?: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>,
) {
  const [local, rest] = splitProps(props ?? {}, ["class"]);
  return (
    <div class={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        class={cn(
          "origin-top-center relative mt-1.5 h-[var(--kb-navigation-menu-viewport-height)] w-full overflow-hidden transition-[width,height] duration-200 md:w-[var(--kb-navigation-menu-viewport-width)]",
          "omni-glass-menu-surface",
          "data-[expanded]:animate-in data-[expanded]:zoom-in-95 data-[expanded]:fade-in-0",
          "data-[closed]:animate-out data-[closed]:zoom-out-95 data-[closed]:fade-out-0",
          "dark:border-white/20",
          local.class,
        )}
        {...rest}
      />
    </div>
  );
}

function NavigationMenuLink(
  props: ParentProps<{ class?: string } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-link"
      class={cn(
        "flex flex-col gap-2 rounded-none border border-transparent p-3 text-sm leading-normal text-muted-foreground/80 transition-[color,background,border] outline-none",
        "hover:border-border/60 hover:bg-foreground/10 hover:text-foreground",
        "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-[active=true]:border-foreground data-[active=true]:bg-foreground data-[active=true]:text-background",
        "[&_svg:not([class*='text-'])]:text-muted-foreground/70 [&_svg:not([class*='size-'])]:size-3.5",
        local.class,
      )}
      {...rest}
    />
  );
}

function NavigationMenuIndicator(
  props: ParentProps<{ class?: string } & JSX.HTMLAttributes<HTMLDivElement>>,
) {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="navigation-menu-indicator"
      class={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[expanded]:animate-in data-[expanded]:fade-in data-[closed]:animate-out data-[closed]:fade-out",
        local.class,
      )}
      {...rest}
    >
      <div class={cn("relative top-[60%] h-2 w-2 rotate-45", "omni-glass-indicator-surface")} />
    </div>
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
