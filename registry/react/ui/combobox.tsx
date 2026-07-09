"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";

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

const ComboboxValue = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span data-slot="combobox-value" className={cn("truncate", className)} {...props} />
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

const ComboboxInput = ({
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

const ComboboxLabel = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="combobox-label"
    className={cn("px-3 pb-1.5 text-xs font-medium text-muted-foreground/70", className)}
    {...props}
  />
);

const ComboboxCollection = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="combobox-collection" className={className} {...props} />
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

const ComboboxChips = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="combobox-chips"
    className={cn(
      "flex min-h-10 flex-wrap items-center gap-1.5 border border-border/60 bg-muted/40 px-2.5 py-1.5 text-sm shadow-[var(--glass-shadow-inset)] focus-within:border-foreground focus-within:ring-2 focus-within:ring-ring/40",
      className,
    )}
    {...props}
  />
);

const ComboboxChip = ({
  className,
  children,
  showRemove = true,
  ...props
}: React.ComponentProps<"span"> & {
  showRemove?: boolean;
}) => (
  <span
    data-slot="combobox-chip"
    className={cn(
      "inline-flex h-6 w-fit items-center justify-center gap-1 border border-border/60 bg-muted/50 px-2 text-xs font-medium text-foreground",
      showRemove && "pr-1",
      className,
    )}
    {...props}
  >
    {children}
    {showRemove ? (
      <button
        type="button"
        data-slot="combobox-chip-remove"
        className="inline-flex size-4 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Remove"
      >
        <XIcon className="size-3" />
      </button>
    ) : null}
  </span>
);

const ComboboxChipsInput = ({ className, ...props }: React.ComponentProps<"input">) => (
  <input
    data-slot="combobox-chip-input"
    className={cn("min-w-16 flex-1 bg-transparent outline-none", className)}
    {...props}
  />
);

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxSeparator,
  ComboboxItem,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxValue,
  useComboboxAnchor,
};
