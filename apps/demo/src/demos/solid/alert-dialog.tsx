import { Button } from "@/registry/solid/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/solid/ui/alert-dialog";

export default function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger as={Button} variant="muted">
        Delete workspace
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>DELETE</AlertDialogTitle>
          <AlertDialogDescription>
            Removing a workspace permanently deletes logs, metrics, and active secrets. This action
            cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div class="space-y-2 text-sm text-foreground/80">
          <p>
            Billing will be finalised at the end of the current cycle. Instances are terminated
            immediately.
          </p>
          <p class="text-muted-foreground">Download any compliance exports before confirming.</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
