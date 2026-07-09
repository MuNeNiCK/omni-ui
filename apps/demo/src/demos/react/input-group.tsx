import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/react/ui/input-group";
import { Button } from "@/registry/react/ui/button";
import { Badge } from "@/registry/react/ui/badge";

export default function InputGroupDemo() {
  return (
    <div className="space-y-6">
      <InputGroup>
        <InputGroupAddon>SEARCH</InputGroupAddon>
        <InputGroupInput aria-label="Search services" placeholder="Find services…" />
        <InputGroupButton variant="ghost" size="icon-sm">
          <span className="sr-only">Run search</span>
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
            <path
              d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </InputGroupButton>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="inline-start">OWNER</InputGroupAddon>
        <InputGroupInput aria-label="Owner email" placeholder="team@omni.dev…" />
        <InputGroupAddon align="inline-end" className="gap-1">
          <Badge variant="outline">SRE</Badge>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupText>https://</InputGroupText>
        <InputGroupInput aria-label="Workspace domain" placeholder="cloud.omni.dev…" />
        <InputGroupButton size="xs">Copy</InputGroupButton>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="block-start">NOTES</InputGroupAddon>
        <InputGroupTextarea
          aria-label="Runbook notes"
          placeholder="Add runbook context…"
          rows={4}
        />
        <InputGroupAddon align="block-end">
          <Button variant="ghost" className="px-3 text-xs">
            Attach
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
