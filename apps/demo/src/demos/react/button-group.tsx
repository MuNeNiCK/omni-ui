import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/registry/react/ui/button-group";
import { Button } from "@/registry/react/ui/button";

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
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

      <div className="flex flex-wrap items-start gap-6">
        <ButtonGroup orientation="vertical" className="min-w-[180px]">
          <ButtonGroupText className="justify-between text-xs">REGION</ButtonGroupText>
          <Button variant="ghost" className="justify-between text-xs">
            Tokyo <span className="text-muted-foreground">JP-1</span>
          </Button>
          <ButtonGroupSeparator orientation="horizontal" />
          <Button variant="ghost" className="justify-between text-xs">
            Singapore <span className="text-muted-foreground">SG-1</span>
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
