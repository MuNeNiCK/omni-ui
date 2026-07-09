import { ArrowRight } from "lucide-react";

import { Button } from "@/registry/react/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-muted-foreground">Variants</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="muted">Muted</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-muted-foreground">Sizes</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Icon button">
            <ArrowRight className="size-4" />
          </Button>
          <Button size="icon-sm" aria-label="Icon button small">
            <ArrowRight className="size-4" />
          </Button>
          <Button size="icon-lg" aria-label="Icon button large">
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-muted-foreground">asChild</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a href="https://example.com" target="_blank" rel="noreferrer">
              Default Link
            </a>
          </Button>
          <Button asChild variant="link">
            <a href="https://example.com" target="_blank" rel="noreferrer">
              Subtle Link
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
