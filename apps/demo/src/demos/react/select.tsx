import { Label } from "@/registry/react/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/registry/react/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/react/ui/card";

export default function SelectDemo() {
  return (
    <Card className="border-border/70">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">Region Picker</CardTitle>
        <CardDescription>
          Square trigger and flat dropdown to match the PoC form system.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Label htmlFor="region">Region</Label>
        <Select defaultValue="tokyo">
          <SelectTrigger id="region" className="min-w-[220px]">
            <SelectValue placeholder="Select a region…" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Asia Pacific</SelectLabel>
              <SelectItem value="tokyo">Tokyo</SelectItem>
              <SelectItem value="osaka">Osaka</SelectItem>
              <SelectItem value="singapore" disabled>
                Singapore (coming soon)
              </SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>North America</SelectLabel>
              <SelectItem value="oregon">Oregon</SelectItem>
              <SelectItem value="virginia">Virginia</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
