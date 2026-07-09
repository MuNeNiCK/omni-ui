"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/registry/react/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/react/ui/command";

const Combobox = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) => (
  <PopoverPrimitive.Root data-slot="combobox" {...props} />
);

const ComboboxTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
    placeholder?: React.ReactNode;
    hideIndicator?: boolean;
    size?: "sm" | "default";
  }
>(
  (
    { className, children, placeholder, hideIndicator = false, size = "default", ...props },
    ref,
  ) => {
    const showPlaceholder = children === undefined || children === null || children === "";

    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        data-slot="combobox-trigger"
        data-size={size}
        data-placeholder={showPlaceholder ? "true" : undefined}
        className={cn(
          "inline-flex w-fit items-center justify-between gap-2 px-3 text-xs text-foreground/85 transition-[border,background,color,box-shadow] outline-none",
          "omni-glass-surface",
          "focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/35",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[size=default]:h-10 data-[size=default]:min-w-[10rem]",
          "data-[size=sm]:h-9 data-[size=sm]:min-w-[8rem]",
          "data-[placeholder=true]:text-muted-foreground/70",
          className,
        )}
        {...props}
      >
        <span className="truncate text-left leading-none">
          {showPlaceholder ? placeholder : children}
        </span>
        {hideIndicator ? null : (
          <ChevronsUpDownIcon className="size-3.5 shrink-0 opacity-60" aria-hidden="true" />
        )}
      </PopoverPrimitive.Trigger>
    );
  },
);
ComboboxTrigger.displayName = "ComboboxTrigger";

type ComboboxContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  commandProps?: React.ComponentProps<typeof Command>;
};

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  ComboboxContentProps
>(({ className, sideOffset = 6, align = "start", commandProps, children, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        data-slot="combobox-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "relative z-50 min-w-[12rem]",
          "omni-glass-surface",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          "outline-hidden",
          className,
        )}
        {...props}
      >
        <Command
          {...commandProps}
          className={cn(
            "bg-transparent",
            "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground/70",
            "[&_[cmdk-group]]:px-1",
            "[&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-3",
            commandProps?.className,
          )}
        >
          {children}
        </Command>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});
ComboboxContent.displayName = "ComboboxContent";

const ComboboxSearch = ({
  className,
  placeholder = "Filter options…",
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandInput>) => (
  <CommandInput
    aria-label={typeof placeholder === "string" ? placeholder : "Search options"}
    data-slot="combobox-search"
    placeholder={placeholder}
    className={cn(
      "h-12 text-sm text-foreground/90 placeholder:text-muted-foreground/60",
      className,
    )}
    {...props}
  />
);

const ComboboxList = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandList>) => (
  <CommandList
    data-slot="combobox-list"
    className={cn("max-h-72 scroll-py-1 overflow-y-auto", className)}
    {...props}
  />
);

const ComboboxEmpty = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandEmpty>) => (
  <CommandEmpty
    data-slot="combobox-empty"
    className={cn("py-6 text-center text-xs text-muted-foreground/70", className)}
    {...props}
  />
);

const ComboboxGroup = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandGroup>) => (
  <CommandGroup
    data-slot="combobox-group"
    className={cn("overflow-hidden py-1", className)}
    {...props}
  />
);

const ComboboxSeparator = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandSeparator>) => (
  <CommandSeparator
    data-slot="combobox-separator"
    className={cn(
      "pointer-events-none -mx-1 my-1 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent",
      className,
    )}
    {...props}
  />
);

const ComboboxItem = ({
  className,
  children,
  indicator,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandItem> & {
  indicator?: React.ReactNode;
}) => {
  const renderedIndicator = React.useMemo(() => {
    if (React.isValidElement(indicator)) {
      const element = indicator as React.ReactElement<{ className?: string }>;
      return React.cloneElement(element, {
        className: cn(
          "size-3.5 opacity-0 transition-opacity",
          element.props.className,
          "group-data-[selected=true]/combobox-item:opacity-100",
        ),
      });
    }

    if (indicator === null) {
      return null;
    }

    if (indicator === undefined) {
      return (
        <CheckIcon className="size-3.5 opacity-0 transition-opacity group-data-[selected=true]/combobox-item:opacity-100" />
      );
    }

    return indicator;
  }, [indicator]);

  return (
    <CommandItem
      data-slot="combobox-item"
      className={cn(
        "group/combobox-item relative flex min-h-11 w-full cursor-default items-start gap-3 px-3 py-3 text-sm leading-normal text-muted-foreground/85 outline-hidden transition-[background,color]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-35",
        "data-[selected=true]:bg-foreground data-[selected=true]:text-background",
        "rounded-none",
        className,
      )}
      {...props}
    >
      {renderedIndicator ? (
        <span
          className="mt-0.5 flex size-4 shrink-0 items-center justify-center"
          aria-hidden="true"
        >
          {renderedIndicator}
        </span>
      ) : null}
      <span className="min-w-0 flex-1 text-left leading-normal [&_*]:leading-normal">
        {children}
      </span>
    </CommandItem>
  );
};

export {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
  ComboboxSearch,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxSeparator,
  ComboboxItem,
};
