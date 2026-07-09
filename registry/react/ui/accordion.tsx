"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/registry/react/lib/utils";

const containerStyles = "divide-y divide-border/60 text-muted-foreground/80 dark:text-foreground";

function Accordion({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(containerStyles, className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group relative overflow-hidden transition-colors",
        "before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-px before:origin-bottom before:scale-y-0 before:bg-primary/50 before:transition-transform before:duration-200 before:content-['']",
        "data-[state=open]:before:scale-y-100",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="relative">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex w-full items-center justify-between gap-5 px-4 py-4 text-left text-sm font-medium text-muted-foreground/85 dark:text-muted-foreground",
          "outline-none transition-colors",
          "hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "data-[state=open]:text-foreground",
          "disabled:pointer-events-none disabled:opacity-40",
          "[&>[data-slot=accordion-chevron]]:transition-transform [&[data-state=open]>[data-slot=accordion-chevron]]:rotate-180",
          className,
        )}
        {...props}
      >
        <span className="flex-1 leading-snug">{children}</span>
        <span
          data-slot="accordion-chevron"
          className="inline-flex size-5 items-center justify-center text-muted-foreground/60 transition-transform group-hover:text-foreground"
        >
          <ChevronDownIcon className="size-3" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm text-foreground/80 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "px-4 pb-4 pt-1.5 leading-relaxed text-muted-foreground/90 dark:text-foreground/80",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
