import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/registry/solid/ui/button-group";
import { Button } from "@/registry/solid/ui/button";

export default function ButtonGroupDemo() {
  return (
    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap items-center gap-4">
        <ButtonGroup>
          <Button variant="ghost">Deploy</Button>
          <ButtonGroupSeparator />
          <Button variant="ghost">Preview</Button>
          <ButtonGroupSeparator />
          <Button variant="ghost">Promote</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="muted">Pause</Button>
          <ButtonGroupSeparator />
          <Button variant="muted">Resume</Button>
        </ButtonGroup>
      </div>

      <div class="flex flex-wrap items-start gap-6">
        <ButtonGroup orientation="vertical" class="min-w-[180px]">
          <ButtonGroupText class="justify-between text-[9px] tracking-[0.36em]">
            REGION
          </ButtonGroupText>
          <Button variant="ghost" class="justify-between text-[10px] tracking-[0.28em]">
            Tokyo <span class="text-muted-foreground">JP-1</span>
          </Button>
          <ButtonGroupSeparator orientation="horizontal" />
          <Button variant="ghost" class="justify-between text-[10px] tracking-[0.28em]">
            Singapore <span class="text-muted-foreground">SG-1</span>
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <ButtonGroupText>VIEW</ButtonGroupText>
          <Button variant="ghost">List</Button>
          <ButtonGroupSeparator />
          <Button variant="ghost">Board</Button>
          <ButtonGroupSeparator />
          <Button variant="ghost">Graph</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
