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

function CommandMenu(props: { onSelect?: () => void }) {
  return (
    <>
      <CommandInput placeholder="Search actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Session">
          <CommandItem onSelect={() => props.onSelect?.()}>
            Launch console
            <CommandShortcut>&#8984;K</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => props.onSelect?.()}>Open docs</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Workspaces">
          <CommandItem onSelect={() => props.onSelect?.()}>Tokyo region</CommandItem>
          <CommandItem onSelect={() => props.onSelect?.()}>Sandbox</CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}

export default function CommandDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <Command class="max-w-md">
        <CommandMenu />
      </Command>
      <Button variant="muted" class="w-fit" onClick={() => setOpen(true)}>
        Open palette
      </Button>
      <CommandDialog open={open()} onOpenChange={setOpen}>
        <CommandMenu onSelect={() => setOpen(false)} />
      </CommandDialog>
    </div>
  );
}
