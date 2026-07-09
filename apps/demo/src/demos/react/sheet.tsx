import { Button } from "@/registry/react/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/react/ui/sheet";

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="muted">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>CHECKS</SheetTitle>
          <SheetDescription>
            Review automated diagnostics before deploying to production.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-3 px-4 text-sm text-foreground/80">
          <p>Runtime integrity passed.</p>
          <p>Network policy matches template.</p>
          <p className="text-muted-foreground">Estimated rollout time: 2m 14s.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="muted">Cancel</Button>
          </SheetClose>
          <Button>Confirm rollout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
