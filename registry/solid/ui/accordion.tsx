import { splitProps, type ComponentProps } from "solid-js";
import * as AccordionPrimitive from "@kobalte/core/accordion";
import { ChevronDownIcon } from "lucide-solid";
import { cn } from "@/registry/solid/lib/utils";

const containerStyles = "divide-y divide-border/60 text-muted-foreground/80 dark:text-foreground";

export type AccordionProps = ComponentProps<typeof AccordionPrimitive.Root>;

function Accordion(props: AccordionProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      class={cn(containerStyles, local.class)}
      {...rest}
    >
      {local.children}
    </AccordionPrimitive.Root>
  );
}

export type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;

function AccordionItem(props: AccordionItemProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      class={cn(
        "group relative overflow-hidden transition-colors",
        "before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-px before:origin-bottom before:scale-y-0 before:bg-primary/50 before:transition-transform before:duration-200 before:content-['']",
        "data-[expanded]:before:scale-y-100",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </AccordionPrimitive.Item>
  );
}

export type AccordionTriggerProps = ComponentProps<typeof AccordionPrimitive.Trigger>;

function AccordionTrigger(props: AccordionTriggerProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionPrimitive.Header class="relative">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        class={cn(
          "flex w-full items-center justify-between gap-5 px-4 py-4 text-left text-sm font-medium text-muted-foreground/85 dark:text-muted-foreground",
          "outline-none transition-colors",
          "hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "data-[expanded]:text-foreground",
          "disabled:pointer-events-none disabled:opacity-40",
          "[&>[data-slot=accordion-chevron]]:transition-transform [&[data-expanded]>[data-slot=accordion-chevron]]:rotate-180",
          local.class,
        )}
        {...rest}
      >
        <span class="flex-1 leading-snug">{local.children}</span>
        <span
          data-slot="accordion-chevron"
          class="inline-flex size-5 items-center justify-center text-muted-foreground/60 transition-transform group-hover:text-foreground"
        >
          <ChevronDownIcon class="size-3" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export type AccordionContentProps = ComponentProps<typeof AccordionPrimitive.Content>;

function AccordionContent(props: AccordionContentProps) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      class="overflow-hidden text-sm text-foreground/80 data-[closed]:animate-accordion-up data-[expanded]:animate-accordion-down"
      {...rest}
    >
      <div
        class={cn(
          "px-4 pb-4 pt-1.5 leading-relaxed text-muted-foreground/90 dark:text-foreground/80",
          local.class,
        )}
      >
        {local.children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
