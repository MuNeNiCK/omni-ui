import { splitProps, type ParentProps, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/registry/solid/lib/utils";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      display: "font-mono text-4xl uppercase tracking-[0.32em] text-foreground/95 leading-[1.05]",
      headline: "font-mono text-2xl uppercase tracking-[0.3em] text-foreground/90 leading-snug",
      title: "font-mono text-xl uppercase tracking-[0.28em] text-foreground/85",
      subtitle: "font-mono text-lg uppercase tracking-[0.26em] text-muted-foreground/90",
      eyebrow: "font-mono text-[11px] uppercase tracking-[0.42em] text-muted-foreground/70",
      body: "text-base leading-relaxed text-foreground/85",
      bodyMuted: "text-base leading-relaxed text-muted-foreground/80",
      mono: "font-mono text-sm uppercase tracking-[0.32em] text-muted-foreground/80",
      caption: "font-mono text-xs uppercase tracking-[0.36em] text-muted-foreground/70",
      metric: "font-mono text-5xl leading-none tracking-tight text-foreground",
      code: "rounded-none bg-muted/40 px-2 py-1 font-mono text-[13px] text-foreground/90",
      label: "font-mono text-[12px] uppercase tracking-[0.36em] text-muted-foreground/75",
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
