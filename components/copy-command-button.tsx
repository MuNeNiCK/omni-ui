"use client";

import { useCallback, useState } from "react";

import { Terminal } from "lucide-react";

import { Button } from "@/registry/react/ui/button";

interface CopyCommandButtonProps {
  command: string;
  copyCommand: string;
  className?: string;
}

export default function CopyCommandButton({
  command,
  copyCommand,
  className,
}: CopyCommandButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(copyCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy command", error);
    }
  }, [copyCommand]);

  const shortCommand = command.split(" ").slice(-1)[0];

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleCopy}
      className={`font-mono text-xs md:text-sm gap-2 ${className ?? ""}`}
    >
      <Terminal className="size-3 md:size-4" />
      <span className="hidden sm:block">{copied ? "Copied!" : command}</span>
      <span className="block sm:hidden">{copied ? "Copied!" : shortCommand}</span>
    </Button>
  );
}
