import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/solid/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion collapsible class="max-w-xl" defaultValue={["observability"]}>
      <AccordionItem value="deployments">
        <AccordionTrigger>DEPLOYMENTS</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-2 text-sm text-foreground/80">
            <p>
              Rollouts now default to progressive traffic shifting. You can still opt into immediate
              cutovers from the CLI.
            </p>
            <p class="text-muted-foreground">
              Surge usage is surfaced in the instances table with realtime deltas.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="observability">
        <AccordionTrigger>OBSERVABILITY</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-2 text-sm text-foreground/80">
            <p>Metrics explorer gains latency histograms and exportable alert templates.</p>
            <p class="text-muted-foreground">
              Webhooks integrate directly with PagerDuty and Opsgenie.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>SECURITY</AccordionTrigger>
        <AccordionContent>
          <div class="space-y-2 text-sm text-foreground/80">
            <p>SSO groups can now be mapped to workspace roles with fine-grained permissions.</p>
            <p class="text-muted-foreground">
              Session duration limits can be configured per environment.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
