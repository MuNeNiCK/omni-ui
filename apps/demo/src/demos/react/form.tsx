import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/react/ui/form";
import { Input } from "@/registry/react/ui/input";
import { Button } from "@/registry/react/ui/button";

type DemoFormValues = {
  email: string;
  company: string;
};

export default function FormDemo() {
  const form = useForm<DemoFormValues>({
    defaultValues: {
      email: "",
      company: "",
    },
  });

  return (
    <div className="w-full max-w-md space-y-6 rounded-none border border-border/70 bg-card/60 p-6 shadow-[var(--glass-shadow-card)] backdrop-blur">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => console.log(values))} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" inputMode="email" {...field} />
                </FormControl>
                <FormDescription>We will contact you at this address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            rules={{
              required: "Company name is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Omni Inc." {...field} />
                </FormControl>
                <FormDescription>
                  Let us know which organization this form represents.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
