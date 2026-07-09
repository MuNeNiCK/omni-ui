import { createSignal, For } from "solid-js";
import type { SelectRootItemComponentProps } from "@kobalte/core/select";
import { CheckCircle2 } from "lucide-solid";

import { Badge } from "@/registry/solid/ui/badge";
import { Button } from "@/registry/solid/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/solid/ui/field";
import { Input } from "@/registry/solid/ui/input";
import { Label } from "@/registry/solid/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/solid/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/solid/ui/select";
import { Switch } from "@/registry/solid/ui/switch";

export default function FieldDemo() {
  const [env, setEnv] = createSignal("staging");
  const [notify, setNotify] = createSignal(true);

  const owners = ["SRE", "Security", "Platform"];

  return (
    <FieldSet>
      <FieldGroup>
        <Field orientation="responsive">
          <FieldLabel for="service">Service</FieldLabel>
          <FieldContent>
            <Input id="service" placeholder="control-plane" />
            <FieldDescription>
              The slug used for dashboard navigation and API prefixes.
            </FieldDescription>
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel for="owner">Owner</FieldLabel>
          <FieldContent>
            <Select
              options={owners}
              defaultValue="SRE"
              placeholder="Select owner…"
              itemComponent={(props: SelectRootItemComponentProps<string>) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
            >
              <SelectTrigger id="owner" class="w-full">
                <SelectValue<string>>
                  {(state: { selectedOption: () => string | undefined }) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
            <FieldDescription>Used for escalation workflows and audit tagging.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>

      <FieldSeparator>Rollout policy</FieldSeparator>

      <FieldGroup>
        <Field orientation="vertical">
          <FieldTitle>
            <span>Environment</span>
            <Badge variant="outline" class="ml-2">
              {env()}
            </Badge>
          </FieldTitle>
          <FieldContent>
            <RadioGroup value={env()} onChange={setEnv} class="grid gap-2">
              <For
                each={[
                  { value: "staging", label: "Staging" },
                  { value: "production", label: "Production" },
                  { value: "failover", label: "Failover" },
                ]}
              >
                {(option) => (
                  <Label class="flex items-center gap-3 rounded-none border border-border/60 bg-muted/40 px-4 py-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    {option.label}
                  </Label>
                )}
              </For>
            </RadioGroup>
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel>Notifications</FieldLabel>
          <FieldContent>
            <div class="flex items-center gap-3">
              <Switch checked={notify()} onChange={setNotify} id="notify" />
              <label for="notify" class="text-sm text-muted-foreground">
                Slack alerts during canary
              </label>
            </div>
            <FieldDescription>
              Toggle to notify the incident channel when metrics drift.
            </FieldDescription>
          </FieldContent>
          <FieldError>{!notify() && "Alerts are required for production rollouts."}</FieldError>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field orientation="horizontal" class="justify-end gap-3">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">
            <CheckCircle2 class="mr-2 size-3" />
            Save changes
          </Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
