"use client";

import type { CSSProperties } from "react";

import { useTheme } from "@/registry/react/components/theme-provider";
import { CheckCheck, InfoIcon, TriangleAlert } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { cn } from "@/registry/react/lib/utils";
import { toneVarDefaults, toneVarOverrides } from "@/registry/react/lib/tone";

const toastBaseClass = cn(
  toneVarDefaults,
  "group/toast relative grid min-w-[20rem] max-w-[420px] grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 overflow-hidden rounded-none border border-[color:var(--tone-border)] bg-[image:var(--tone-gradient)] bg-no-repeat bg-[length:100%_1px] bg-[position:0_0] px-6 py-5 text-sm text-[color:var(--tone-body)] shadow-[var(--glass-shadow-outline)] backdrop-blur-[12px] transition-colors",
  "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[3px] before:rounded-full before:bg-[color:var(--tone-bar)] before:content-['']",
);

const toastVariants = {
  default: toneVarOverrides.default,
  info: toneVarOverrides.info,
  success: toneVarOverrides.success,
  warning: toneVarOverrides.warning,
  error: toneVarOverrides.destructive,
  loading: toneVarOverrides.default,
  action: toneVarOverrides.default,
  normal: toneVarOverrides.default,
} satisfies Record<string, string>;

const toastContentClass = cn("col-start-2 grid justify-items-start gap-2 text-left");

const toastTitleClass = cn("col-start-2 text-sm font-semibold text-[color:var(--tone-title)]");

const toastDescriptionClass = cn(
  "col-start-2 grid justify-items-start gap-2 text-left text-sm text-[color:var(--tone-description)] [&_p]:leading-relaxed",
);

const toastIconClass = cn(
  "col-start-1 row-span-2 mt-1 flex size-5 items-center justify-center rounded-full border border-[color:var(--tone-icon-border)] bg-[color:var(--tone-icon-bg)] p-1 text-[color:var(--tone-icon-fg)]",
);

const toastCloseButtonClass = cn(
  "text-muted-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
);

const toastCancelButtonClass = cn(
  "rounded-none border border-border/60 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground/70 transition-colors hover:border-foreground/60 hover:text-foreground",
);

const toastActionButtonClass = cn(
  "rounded-none border border-foreground bg-foreground px-2 py-1 text-xs font-medium text-background transition-colors hover:bg-foreground/90",
);

const toastToneCSS = `
[data-sonner-toaster] [data-sonner-toast][data-type] [data-description] {
  color: var(--tone-description);
}
[data-sonner-toaster] [data-sonner-toast][data-type] [data-title] {
  color: var(--tone-title);
}
`;

const toastIcons = {
  success: <CheckCheck className="size-3.5" />,
  info: <InfoIcon className="size-3.5" />,
  warning: <TriangleAlert className="size-3.5" />,
  error: <TriangleAlert className="size-3.5" />,
} satisfies NonNullable<ToasterProps["icons"]>;

const toasterStyle = {
  "--normal-bg": "var(--popover)",
  "--normal-text": "var(--popover-foreground)",
  "--normal-border": "var(--border)",
} as CSSProperties;

const Toaster = ({ toastOptions, icons, ...props }: ToasterProps) => {
  const { theme } = useTheme();

  const {
    className: userClassName,
    descriptionClassName: userDescriptionClassName,
    classNames: userClassNames = {},
    ...restToastOptions
  } = toastOptions ?? {};

  const mergedIcons = {
    ...toastIcons,
    ...icons,
  };

  return (
    <>
      <style>{toastToneCSS}</style>
      <Sonner
        theme={(theme ?? "system") as ToasterProps["theme"]}
        className="toaster group"
        style={toasterStyle}
        icons={mergedIcons}
        toastOptions={{
          ...restToastOptions,
          unstyled: true,
          className: cn(toastBaseClass, userClassName),
          descriptionClassName: cn(toastDescriptionClass, userDescriptionClassName),
          classNames: {
            ...userClassNames,
            content: cn(toastContentClass, userClassNames.content),
            title: cn(toastTitleClass, userClassNames.title),
            icon: cn(toastIconClass, userClassNames.icon),
            closeButton: cn(toastCloseButtonClass, userClassNames.closeButton),
            cancelButton: cn(toastCancelButtonClass, userClassNames.cancelButton),
            actionButton: cn(toastActionButtonClass, userClassNames.actionButton),
            default: cn(toastVariants.default, userClassNames.default),
            info: cn(toastVariants.info, userClassNames.info),
            success: cn(toastVariants.success, userClassNames.success),
            warning: cn(toastVariants.warning, userClassNames.warning),
            error: cn(toastVariants.error, userClassNames.error),
            loading: cn(toastVariants.loading, userClassNames.loading),
          },
        }}
        {...props}
      />
    </>
  );
};

export { Toaster };
