import { createSignal } from "solid-js";

import { Button } from "@/registry/solid/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/solid/ui/input-otp";

export default function InputOTPDemo() {
  const [value, setValue] = createSignal("");

  return (
    <div class="flex flex-col items-center justify-center gap-6">
      <InputOTP value={value()} onValueChange={setValue} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div class="text-sm text-muted-foreground font-mono tracking-[0.3em] uppercase">
        Value: <span class="text-foreground">{value() || "------"}</span>
      </div>

      <div class="flex items-center gap-3">
        <Button variant="muted" onClick={() => setValue("")} disabled={!value()}>
          Clear
        </Button>
      </div>
    </div>
  );
}
