import {
  createContext,
  createMemo,
  For,
  Show,
  createUniqueId,
  splitProps,
  useContext,
  type Component,
  type ParentProps,
  type JSX,
} from "solid-js";
import { cn } from "@/registry/solid/lib/utils";

// --- Chart Config ---

type ChartConfig = Record<
  string,
  {
    label?: string;
    icon?: Component<{ class?: string }>;
    color?: string;
    theme?: Record<string, string>;
  }
>;

type ChartPayloadEntry = {
  color?: string;
  dataKey?: string;
  name?: string;
  value?: unknown;
  payload?: {
    fill?: string;
  };
};

type ChartTooltipRenderProps = {
  active?: boolean;
  payload?: ChartPayloadEntry[];
  label?: string;
};

type ChartContextValue = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextValue>();

function useChart() {
  const ctx = useContext(ChartContext);
  if (!ctx) throw new Error("useChart must be used within a <ChartContainer />");
  return ctx;
}

// --- ChartContainer ---

type ChartContainerProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig;
    id?: string;
  }
>;

function ChartContainer(props: ChartContainerProps) {
  const [local, rest] = splitProps(props, ["class", "children", "config", "id"]);
  const generatedId = createUniqueId();
  const uniqueId = () => `chart-${local.id || generatedId}`;

  return (
    <ChartContext.Provider value={{ config: local.config }}>
      <div
        data-slot="chart"
        data-chart={uniqueId()}
        class={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
          local.class,
        )}
        {...rest}
      >
        <ChartStyle id={uniqueId()} config={local.config} />
        {local.children}
      </div>
    </ChartContext.Provider>
  );
}

// --- ChartStyle ---

type ChartStyleProps = {
  id: string;
  config: ChartConfig;
};

function ChartStyle(props: ChartStyleProps) {
  const colorConfig = createMemo(() => {
    return Object.entries(props.config).filter(([_, cfg]) => cfg.theme || cfg.color);
  });

  const cssContent = createMemo(() => {
    if (colorConfig().length === 0) return "";

    let light = "";
    let dark = "";

    for (const [key, cfg] of colorConfig()) {
      if (cfg.theme) {
        if (cfg.theme.light) light += `  --color-${key}: ${cfg.theme.light};\n`;
        if (cfg.theme.dark) dark += `  --color-${key}: ${cfg.theme.dark};\n`;
      } else if (cfg.color) {
        light += `  --color-${key}: ${cfg.color};\n`;
        dark += `  --color-${key}: ${cfg.color};\n`;
      }
    }

    return `[data-chart="${props.id}"] {\n${light}}\n.dark [data-chart="${props.id}"] {\n${dark}}`;
  });

  return (
    <Show when={cssContent()}>
      <style innerHTML={cssContent()} />
    </Show>
  );
}

// --- ChartTooltip ---

type ChartTooltipProps = ParentProps<{
  class?: string;
  active?: boolean;
  payload?: ChartPayloadEntry[];
  label?: string;
  content?: (props: ChartTooltipRenderProps) => JSX.Element;
}>;

function ChartTooltip(props: ChartTooltipProps) {
  return (
    <Show when={props.active && props.payload && props.payload.length > 0}>
      <Show
        when={props.content}
        fallback={
          <ChartTooltipContent active={props.active} payload={props.payload} label={props.label} />
        }
      >
        {(content) =>
          content()({
            active: props.active,
            payload: props.payload,
            label: props.label,
          })
        }
      </Show>
    </Show>
  );
}

// --- ChartTooltipContent ---

type ChartTooltipContentProps = {
  class?: string;
  active?: boolean;
  payload?: ChartPayloadEntry[];
  label?: string;
  labelKey?: string;
  nameKey?: string;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  formatter?: (
    value: unknown,
    name: string,
    item: ChartPayloadEntry,
    index: number,
    payload: ChartPayloadEntry[],
  ) => JSX.Element;
  labelFormatter?: (label: string, payload: ChartPayloadEntry[]) => JSX.Element | string;
  color?: string;
};

function ChartTooltipContent(props: ChartTooltipContentProps) {
  const [local] = splitProps(props, [
    "class",
    "active",
    "payload",
    "label",
    "labelKey",
    "nameKey",
    "indicator",
    "hideLabel",
    "hideIndicator",
    "formatter",
    "labelFormatter",
    "color",
  ]);

  const { config } = useChart();
  const indicator = () => local.indicator ?? "dot";

  const tooltipLabel = createMemo(() => {
    if (local.hideLabel || !local.payload?.length) return null;
    const item = local.payload![0];
    const key = local.labelKey || (item?.dataKey as string) || "value";
    const cfgItem = config[key];
    const label = local.label || cfgItem?.label || key;
    if (local.labelFormatter) {
      return local.labelFormatter(label, local.payload!);
    }
    return label;
  });

  return (
    <Show when={local.active && local.payload && local.payload.length > 0}>
      <div
        data-slot="chart-tooltip-content"
        class={cn(
          "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
          local.class,
        )}
      >
        <Show when={tooltipLabel()}>
          <div class="font-medium">{tooltipLabel()}</div>
        </Show>
        <div class="grid gap-1">
          <For each={local.payload}>
            {(item, idx) => {
              const key = local.nameKey || (item.name as string) || (item.dataKey as string);
              const cfgItem = config[key];
              const itemColor = local.color || item.color || cfgItem?.color || item.payload?.fill;

              return (
                <div class="flex items-center gap-2">
                  <Show when={!local.hideIndicator}>
                    <div
                      class={cn(
                        "shrink-0 rounded-[2px]",
                        indicator() === "dot" && "size-2.5",
                        indicator() === "line" && "h-0.5 w-4",
                        indicator() === "dashed" &&
                          "h-0.5 w-4 border-t-2 border-dashed bg-transparent",
                      )}
                      style={{
                        "background-color": indicator() !== "dashed" ? itemColor : undefined,
                        "border-color": indicator() === "dashed" ? itemColor : undefined,
                      }}
                    />
                  </Show>
                  <div class="flex flex-1 items-baseline justify-between gap-2">
                    <span class="text-muted-foreground">{cfgItem?.label || key}</span>
                    <span class="font-mono font-medium tabular-nums text-foreground">
                      <Show when={local.formatter} fallback={<>{item.value}</>}>
                        {(fmt) => fmt()(item.value, key, item, idx(), local.payload)}
                      </Show>
                    </span>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </div>
    </Show>
  );
}

// --- ChartLegend ---

type ChartLegendProps = ParentProps<{
  class?: string;
  payload?: ChartPayloadEntry[];
  content?: (props: { payload?: ChartPayloadEntry[] }) => JSX.Element;
}>;

function ChartLegend(props: ChartLegendProps) {
  return (
    <Show when={props.payload && props.payload.length > 0}>
      <Show when={props.content} fallback={<ChartLegendContent payload={props.payload} />}>
        {(content) => content()({ payload: props.payload })}
      </Show>
    </Show>
  );
}

// --- ChartLegendContent ---

type ChartLegendContentProps = {
  class?: string;
  payload?: ChartPayloadEntry[];
  nameKey?: string;
  hideIcon?: boolean;
  verticalAlign?: "top" | "bottom";
};

function ChartLegendContent(props: ChartLegendContentProps) {
  const [local] = splitProps(props, ["class", "payload", "nameKey", "hideIcon", "verticalAlign"]);

  const { config } = useChart();

  return (
    <Show when={local.payload && local.payload.length > 0}>
      <div
        data-slot="chart-legend-content"
        class={cn(
          "flex items-center justify-center gap-4",
          local.verticalAlign === "top" ? "pb-3" : "pt-3",
          local.class,
        )}
      >
        <For each={local.payload}>
          {(item) => {
            const key = local.nameKey || (item.dataKey as string) || "value";
            const cfgItem = config[key];
            return (
              <div class="flex items-center gap-1.5">
                <Show when={!local.hideIcon}>
                  <Show
                    when={cfgItem?.icon}
                    fallback={
                      <div
                        class="h-2 w-2 shrink-0 rounded-[2px]"
                        style={{ "background-color": item.color }}
                      />
                    }
                  >
                    {(Icon) => {
                      const IconComp = Icon();
                      return <IconComp class="size-3 text-muted-foreground" />;
                    }}
                  </Show>
                </Show>
                <span class="text-xs text-muted-foreground">{cfgItem?.label || key}</span>
              </div>
            );
          }}
        </For>
      </div>
    </Show>
  );
}

export {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};

export type { ChartConfig };
