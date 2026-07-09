import { Button } from "@/registry/solid/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/solid/ui/sheet";

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger as={Button} variant="muted">
        Open sheet
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>CHECKS</SheetTitle>
          <SheetDescription>
            Review automated diagnostics before deploying to production.
          </SheetDescription>
        </SheetHeader>
        <div class="space-y-3 px-4 text-sm text-foreground/80">
          <p>Runtime integrity passed.</p>
          <p>Network policy matches template.</p>
          <p class="text-muted-foreground">Estimated rollout time: 2m 14s.</p>
        </div>
        <SheetFooter>
          <SheetClose as={Button} variant="muted">
            Cancel
          </SheetClose>
          <Button>Confirm rollout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
