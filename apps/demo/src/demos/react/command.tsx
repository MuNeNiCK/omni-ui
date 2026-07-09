import * as React from "react";

import { Button } from "@/registry/react/ui/button";
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
} from "@/registry/react/ui/command";

function CommandMenu({ onSelect }: { onSelect?: () => void }) {
  return (
    <>
      <CommandInput placeholder="Search actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Session">
          <CommandItem onSelect={() => onSelect?.()}>
            Launch console
            <CommandShortcut>&#8984;K</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => onSelect?.()}>Open docs</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Workspaces">
          <CommandItem onSelect={() => onSelect?.()}>Tokyo region</CommandItem>
          <CommandItem onSelect={() => onSelect?.()}>Sandbox</CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}

export default function CommandDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Command className="max-w-md">
        <CommandMenu />
      </Command>
      <Button variant="muted" className="w-fit" onClick={() => setOpen(true)}>
        Open palette
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandMenu onSelect={() => setOpen(false)} />
      </CommandDialog>
    </div>
  );
}
