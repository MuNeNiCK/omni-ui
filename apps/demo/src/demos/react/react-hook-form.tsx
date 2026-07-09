import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/registry/react/ui/button";
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
import { Switch } from "@/registry/react/ui/switch";

const schema = z.object({
  email: z.string().email("Provide a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ReactHookFormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = (values: FormValues) => {
    console.info("Submitted", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="sre@omni.dev" {...field} />
              </FormControl>
              <FormDescription>
                This address receives incident reports and rollout updates.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-none border border-border/60 bg-muted/40 px-4 py-3">
              <div className="space-y-0.5">
                <FormLabel className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground/80">
                  Remember device
                </FormLabel>
                <FormDescription className="max-w-sm">
                  Keep this console signed in for quicker incident response.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            type="button"
            className="tracking-[0.3em]"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" className="tracking-[0.3em]">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
