import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/registry/solid/ui/menubar";

export default function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>FILE</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            NEW PROJECT
            <MenubarShortcut>{"\u2318"}N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            OPEN&hellip;
            <MenubarShortcut>{"\u2318"}O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>EXPORT</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>JSON</MenubarItem>
              <MenubarItem>YAML</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem variant="destructive">DELETE</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>VIEW</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel inset>Toggle</MenubarLabel>
          <MenubarCheckboxItem checked>SIDEBAR</MenubarCheckboxItem>
          <MenubarCheckboxItem>CONSOLE</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarLabel inset>Themes</MenubarLabel>
          <MenubarRadioGroup value="dark">
            <MenubarRadioItem value="light">LIGHT</MenubarRadioItem>
            <MenubarRadioItem value="dark">DARK</MenubarRadioItem>
            <MenubarRadioItem value="system">SYSTEM</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
