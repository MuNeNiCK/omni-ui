import { Button } from "@/registry/react/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/react/ui/dialog";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="muted">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>INSTANCE</DialogTitle>
          <DialogDescription>
            Allocate a new compute instance within the Tokyo region.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm text-foreground/80">
          <p>
            Deploying an instance will provision compute, network, and observability hooks in the
            selected zone.
          </p>
          <p className="text-muted-foreground">
            You can reconfigure after launch. Billing starts once the instance reaches a running
            state.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="muted">Cancel</Button>
          </DialogClose>
          <Button>Launch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
