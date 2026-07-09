import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/registry/react/ui/badge";
import { Button } from "@/registry/react/ui/button";
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
} from "@/registry/react/ui/field";
import { Input } from "@/registry/react/ui/input";
import { Label } from "@/registry/react/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/react/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/react/ui/select";
import { Switch } from "@/registry/react/ui/switch";

export default function FieldDemo() {
  const [env, setEnv] = useState("staging");
  const [notify, setNotify] = useState(true);

  return (
    <FieldSet>
      <FieldGroup>
        <Field orientation="responsive">
          <FieldLabel htmlFor="service">Service</FieldLabel>
          <FieldContent>
            <Input id="service" placeholder="control-plane" />
            <FieldDescription>
              The slug used for dashboard navigation and API prefixes.
            </FieldDescription>
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="owner">Owner</FieldLabel>
          <FieldContent>
            <Select defaultValue="sre">
              <SelectTrigger id="owner" className="w-full">
                <SelectValue placeholder="Select owner…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sre">SRE</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="platform">Platform</SelectItem>
              </SelectContent>
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
            <Badge variant="outline" className="ml-2">
              {env}
            </Badge>
          </FieldTitle>
          <FieldContent>
            <RadioGroup value={env} onValueChange={setEnv} className="grid gap-2">
              {[
                { value: "staging", label: "Staging" },
                { value: "production", label: "Production" },
                { value: "failover", label: "Failover" },
              ].map((option) => (
                <Label
                  key={option.value}
                  className="flex items-center gap-3 rounded-none border border-border/60 bg-muted/40 px-4 py-3"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  {option.label}
                </Label>
              ))}
            </RadioGroup>
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel>Notifications</FieldLabel>
          <FieldContent>
            <div className="flex items-center gap-3">
              <Switch checked={notify} onCheckedChange={setNotify} id="notify" />
              <label htmlFor="notify" className="text-sm text-muted-foreground">
                Slack alerts during canary
              </label>
            </div>
            <FieldDescription>
              Toggle to notify the incident channel when metrics drift.
            </FieldDescription>
          </FieldContent>
          <FieldError>{!notify && "Alerts are required for production rollouts."}</FieldError>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field orientation="horizontal" className="justify-end gap-3">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">
            <CheckCircle2 className="mr-2 size-3" />
            Save changes
          </Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
