import { Spinner } from "@/registry/react/ui/spinner";
import { Button } from "@/registry/react/ui/button";

export default function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled className="gap-2">
        <Spinner className="size-3.5" />
        DEPLOYING
      </Button>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        <span>Fetching cluster metrics…</span>
      </div>
    </div>
  );
}
