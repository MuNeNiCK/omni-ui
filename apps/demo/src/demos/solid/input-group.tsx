import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/solid/ui/input-group";
import { Button } from "@/registry/solid/ui/button";
import { Badge } from "@/registry/solid/ui/badge";

export default function InputGroupDemo() {
  return (
    <div class="space-y-6">
      <InputGroup>
        <InputGroupAddon>SEARCH</InputGroupAddon>
        <InputGroupInput placeholder="Find services" />
        <InputGroupButton variant="ghost" size="icon-sm">
          <span class="sr-only">Run search</span>
          <svg viewBox="0 0 24 24" class="size-4" aria-hidden>
            <path
              d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </InputGroupButton>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="inline-start">OWNER</InputGroupAddon>
        <InputGroupInput placeholder="team@omni.dev" />
        <InputGroupAddon align="inline-end" class="gap-1">
          <Badge variant="outline">SRE</Badge>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupInput placeholder="cloud.omni.dev" />
        <InputGroupButton size="xs">Copy</InputGroupButton>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="block-start">NOTES</InputGroupAddon>
        <InputGroupTextarea placeholder="Add runbook context" rows={4} />
        <InputGroupAddon align="block-end">
          <Button variant="ghost" class="px-3 text-[10px] tracking-[0.32em]">
            Attach
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
