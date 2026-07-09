import { Button } from "@/registry/solid/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/solid/ui/drawer";

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger as={Button} variant="muted">
        Open drawer
      </DrawerTrigger>
      <DrawerContent class="data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-md">
        <DrawerHeader>
          <DrawerTitle>PROJECT</DrawerTitle>
          <DrawerDescription>
            Adjust project settings before broadcasting to the network.
          </DrawerDescription>
        </DrawerHeader>
        <div class="space-y-3 px-4 text-sm text-foreground/80">
          <p>Switch environments, adjust API tokens, and manage access.</p>
          <p class="text-muted-foreground">
            Changes apply instantly across all connected control planes.
          </p>
        </div>
        <DrawerFooter>
          <DrawerClose as={Button} variant="muted">
            Dismiss
          </DrawerClose>
          <Button>Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
