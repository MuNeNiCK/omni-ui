import { Spinner } from "@/registry/solid/ui/spinner";
import { Button } from "@/registry/solid/ui/button";

export default function SpinnerDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button disabled class="gap-2">
        <Spinner class="size-3.5" />
        DEPLOYING
      </Button>
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        <span>Fetching cluster metrics...</span>
      </div>
    </div>
  );
}
