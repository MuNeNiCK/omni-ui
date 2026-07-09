import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/registry/solid/ui/form";
import { Input } from "@/registry/solid/ui/input";
import { Button } from "@/registry/solid/ui/button";

export default function FormDemo() {
  return (
    <div class="w-full max-w-md space-y-6 rounded-none border border-border/70 bg-card/60 p-6 shadow-[var(--glass-shadow-card)] backdrop-blur">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          console.log(Object.fromEntries(formData));
        }}
        class="space-y-6"
      >
        <FormField name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="you@example.com" inputMode="email" name="email" />
            </FormControl>
            <FormDescription>We will contact you at this address.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField name="company">
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input placeholder="Omni Inc." name="company" />
            </FormControl>
            <FormDescription>Let us know which organization this form represents.</FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full">
          Submit
        </Button>
      </Form>
    </div>
  );
}
