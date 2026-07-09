import { splitProps, type ParentProps, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      display:
        "text-4xl font-semibold tracking-tight text-foreground/95 leading-tight text-balance",
      headline:
        "text-2xl font-semibold tracking-tight text-foreground/90 leading-snug text-balance",
      title: "text-xl font-semibold tracking-tight text-foreground/85",
      subtitle: "text-lg leading-relaxed text-muted-foreground/90",
      eyebrow: "text-xs font-medium text-muted-foreground/70",
      body: "text-base leading-relaxed text-foreground/85",
      bodyMuted: "text-base leading-relaxed text-muted-foreground/80",
      mono: "font-mono text-sm text-muted-foreground/80",
      caption: "text-xs leading-relaxed text-muted-foreground/70",
      metric: "text-5xl font-semibold leading-none tracking-tight tabular-nums text-foreground",
      code: "rounded-none bg-muted/40 px-2 py-1 font-mono text-[13px] text-foreground/90",
      label: "text-xs font-medium text-muted-foreground/75",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyProps = ParentProps<
  JSX.HTMLAttributes<HTMLElement> &
    VariantProps<typeof typographyVariants> & {
      as?: keyof JSX.IntrinsicElements;
    }
>;

function Typography(props: TypographyProps) {
  const [local, rest] = splitProps(props, ["as", "variant", "class", "children"]);
  const tag = () => local.as ?? "p";
  return (
    <Dynamic
      component={tag()}
      data-slot="typography"
      data-variant={local.variant ?? "body"}
      class={cn(typographyVariants({ variant: local.variant }), local.class)}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
}

function createTypographyComponent(
  variant: VariantProps<typeof typographyVariants>["variant"],
  element: keyof JSX.IntrinsicElements,
) {
  return function TypographyComponent(
    props: ParentProps<JSX.HTMLAttributes<HTMLElement> & { as?: keyof JSX.IntrinsicElements }>,
  ) {
    const [local, rest] = splitProps(props, ["as", "class", "children"]);
    const tag = () => local.as ?? element;
    return (
      <Dynamic
        component={tag()}
        data-slot="typography"
        data-variant={variant}
        class={cn(typographyVariants({ variant }), local.class)}
        {...rest}
      >
        {local.children}
      </Dynamic>
    );
  };
}

const TypographyDisplay = createTypographyComponent("display", "h1");
const TypographyHeadline = createTypographyComponent("headline", "h2");
const TypographyTitle = createTypographyComponent("title", "h3");
const TypographySubtitle = createTypographyComponent("subtitle", "h4");
const TypographyEyebrow = createTypographyComponent("eyebrow", "span");
const TypographyBody = createTypographyComponent("body", "p");
const TypographyBodyMuted = createTypographyComponent("bodyMuted", "p");
const TypographyMono = createTypographyComponent("mono", "span");
const TypographyCaption = createTypographyComponent("caption", "span");
const TypographyMetric = createTypographyComponent("metric", "div");
const TypographyCode = createTypographyComponent("code", "code");
const TypographyLabel = createTypographyComponent("label", "span");

export {
  Typography,
  TypographyDisplay,
  TypographyHeadline,
  TypographyTitle,
  TypographySubtitle,
  TypographyEyebrow,
  TypographyBody,
  TypographyBodyMuted,
  TypographyMono,
  TypographyCaption,
  TypographyMetric,
  TypographyCode,
  TypographyLabel,
  typographyVariants,
};
