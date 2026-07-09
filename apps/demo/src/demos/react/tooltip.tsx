import { Button } from "@/registry/react/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/react/ui/tooltip";

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="muted">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          LAUNCH CONSOLE
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
