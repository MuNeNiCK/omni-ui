import { Button } from "@/registry/solid/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/solid/ui/tooltip";

export default function TooltipDemo() {
  return (
    <Tooltip placement="top">
      <TooltipTrigger as={Button} variant="muted">
        Hover me
      </TooltipTrigger>
      <TooltipContent>LAUNCH CONSOLE</TooltipContent>
    </Tooltip>
  );
}
