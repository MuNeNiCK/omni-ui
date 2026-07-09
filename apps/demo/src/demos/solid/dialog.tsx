import { Button } from "@/registry/solid/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/solid/ui/dialog";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger as={Button} variant="muted">
        Open dialog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>INSTANCE</DialogTitle>
          <DialogDescription>
            Allocate a new compute instance within the Tokyo region.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-3 text-sm text-foreground/80">
          <p>
            Deploying an instance will provision compute, network, and observability hooks in the
            selected zone.
          </p>
          <p class="text-muted-foreground">
            You can reconfigure after launch. Billing starts once the instance reaches a running
            state.
          </p>
        </div>
        <DialogFooter>
          <DialogClose as={Button} variant="muted">
            Cancel
          </DialogClose>
          <Button>Launch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
