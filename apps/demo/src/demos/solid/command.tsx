import { createSignal } from "solid-js";

import { Button } from "@/registry/solid/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/registry/solid/ui/command";

export default function CommandDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <Button variant="muted" onClick={() => setOpen(true)}>
        Open palette
      </Button>
      <CommandDialog open={open()} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search actions" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Session">
              <CommandItem onSelect={() => setOpen(false)}>
                Launch console
                <CommandShortcut>&#8984;K</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Open docs</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Workspaces">
              <CommandItem onSelect={() => setOpen(false)}>Tokyo region</CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>Sandbox</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
