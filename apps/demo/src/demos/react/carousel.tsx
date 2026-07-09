import { useState } from "react";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/react/ui/carousel";
import { Button } from "@/registry/react/ui/button";

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
  const [index, setIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  return (
    <div className="relative">
      <Carousel
        className="w-full"
        setApi={(instance) => {
          setApi(instance);
          instance?.on("select", () => setIndex(instance.selectedScrollSnap()));
        }}
      >
        <CarouselContent className="-ml-6">
          {slides.map((slide) => (
            <CarouselItem key={slide.title} className="pl-6">
              <div className="flex flex-col gap-3 rounded-none border border-border/70 bg-muted/30 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.12)]">
                <span className="text-xs font-medium text-muted-foreground/80">{slide.status}</span>
                <h3 className="text-xl font-semibold">{slide.title}</h3>
                <p className="text-sm text-muted-foreground">{slide.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((_, slideIndex) => (
          <Button
            key={slideIndex}
            variant={index === slideIndex ? "default" : "muted"}
            size="icon-sm"
            className="size-8"
            onClick={() => {
              api?.scrollTo(slideIndex);
              setIndex(slideIndex);
            }}
          >
            <span className="sr-only">Go to slide {slideIndex + 1}</span>
            {slideIndex + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
