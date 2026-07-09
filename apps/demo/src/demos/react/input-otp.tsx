import { useState } from "react";

import { Button } from "@/registry/react/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/react/ui/input-otp";

export default function InputOTPDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <InputOTP value={value} onChange={setValue} maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="text-sm text-muted-foreground">
        Value: <span className="text-foreground">{value || "------"}</span>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="muted" onClick={() => setValue("")} disabled={!value}>
          Clear
        </Button>
      </div>
    </div>
  );
}
