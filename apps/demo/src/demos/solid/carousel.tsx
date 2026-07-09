import { createSignal, For } from "solid-js";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/solid/ui/carousel";
import { Button } from "@/registry/solid/ui/button";

const slides = [
  {
    title: "Staging",
    description: "Rolling deploy across Tokyo cluster",
    status: "Healthy",
  },
  {
    title: "Production",
    description: "Canary at 35% traffic in Singapore",
    status: "Monitoring",
  },
  {
    title: "Failover",
    description: "Osaka cluster warming standby nodes",
    status: "Warm",
  },
];

export default function CarouselDemo() {
  const [index, setIndex] = createSignal(0);
  const [api, setApi] = createSignal<CarouselApi>();

  return (
    <div class="relative">
      <Carousel
        class="w-full"
        setApi={(instance) => {
          setApi(instance);
          instance?.on("select", () => setIndex(instance.selectedScrollSnap()));
        }}
      >
        <CarouselContent class="-ml-6">
          <For each={slides}>
            {(slide) => (
              <CarouselItem class="pl-6">
                <div class="flex flex-col gap-3 rounded-none border border-border/70 bg-muted/30 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.12)]">
                  <span class="text-xs font-medium text-muted-foreground/80">{slide.status}</span>
                  <h3 class="text-xl font-semibold">{slide.title}</h3>
                  <p class="text-sm text-muted-foreground">{slide.description}</p>
                </div>
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div class="mt-4 flex items-center justify-center gap-2">
        <For each={slides}>
          {(_, slideIndex) => (
            <Button
              variant={index() === slideIndex() ? "default" : "muted"}
              size="icon-sm"
              class="size-8"
              onClick={() => {
                api()?.scrollTo(slideIndex());
                setIndex(slideIndex());
              }}
            >
              <span class="sr-only">Go to slide {slideIndex() + 1}</span>
              {slideIndex() + 1}
            </Button>
          )}
        </For>
      </div>
    </div>
  );
}
