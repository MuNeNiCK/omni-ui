import { splitProps, type ComponentProps, For, createMemo } from "solid-js";
import * as SliderPrimitive from "@kobalte/core/slider";
import { cn } from "@/registry/solid/lib/utils";

function Slider(props: ComponentProps<typeof SliderPrimitive.Root>) {
  const [local, rest] = splitProps(props, ["class", "defaultValue", "value"]);
  const thumbCount = createMemo(() => {
    const val = local.value ?? local.defaultValue;
    return Array.isArray(val) ? val.length : 1;
  });
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={local.defaultValue}
      value={local.value}
      class={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-40 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        local.class,
      )}
      {...rest}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        class={cn(
          "relative grow overflow-hidden border border-border/60 bg-muted/50 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}
      >
        <SliderPrimitive.Fill
          data-slot="slider-range"
          class={cn(
            "absolute bg-foreground data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
          )}
        />
      </SliderPrimitive.Track>
      <For each={Array.from({ length: thumbCount() })}>
        {() => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            class="block size-4 shrink-0 border border-border/60 bg-foreground text-background transition-[border,background,transform] outline-none hover:bg-foreground focus-visible:ring-4 focus-visible:ring-ring/40 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-40"
          >
            <SliderPrimitive.Input />
          </SliderPrimitive.Thumb>
        )}
      </For>
    </SliderPrimitive.Root>
  );
}

export { Slider };
