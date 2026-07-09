import { Kbd, KbdGroup } from "@/registry/solid/ui/kbd";

export default function KbdDemo() {
  return (
    <div class="flex flex-col gap-4">
      <KbdGroup>
        <Kbd>CTRL</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>SHIFT</Kbd>
        <Kbd>ALT</Kbd>
        <Kbd>F</Kbd>
      </KbdGroup>
    </div>
  );
}
