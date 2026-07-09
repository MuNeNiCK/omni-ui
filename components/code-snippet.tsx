"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { Check, Clipboard } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/react/ui/button";

interface CodeSnippetProps {
  children: ReactNode;
  className?: string;
}

export default function CodeSnippet({ children, className }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        typeof children === "string" ? children : ((children as React.ReactNode)?.toString() ?? ""),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code snippet", error);
    }
  }, [children]);

  return (
    <div className={cn("relative overflow-x-auto rounded-lg border bg-background/60", className)}>
      <pre className="p-4 text-xs md:text-sm">
        <code className="block whitespace-pre leading-relaxed">{children}</code>
      </pre>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute right-2 top-2 h-7 w-7"
      >
        {copied ? <Check className="size-3" /> : <Clipboard className="size-3" />}
      </Button>
    </div>
  );
}
