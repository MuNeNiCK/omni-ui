import { Button } from "@/registry/react/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/react/ui/drawer";

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="muted">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-md">
        <DrawerHeader>
          <DrawerTitle>PROJECT</DrawerTitle>
          <DrawerDescription>
            Adjust project settings before broadcasting to the network.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-3 px-4 text-sm text-foreground/80">
          <p>Switch environments, adjust API tokens, and manage access.</p>
          <p className="text-muted-foreground">
            Changes apply instantly across all connected control planes.
          </p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="muted">Dismiss</Button>
          </DrawerClose>
          <Button>Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
