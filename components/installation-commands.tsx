"use client";

import { useMemo, useState } from "react";

import { Check, Clipboard } from "lucide-react";

import { Button } from "@/registry/react/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/react/ui/tabs";

interface InstallationCommandsProps {
  packageName: string;
  className?: string;
}

const managers = ["pnpm", "npm", "yarn", "bun"] as const;

const commandFor = (manager: (typeof managers)[number], pkg: string) => {
  const target = `@omni/${pkg}`;
  switch (manager) {
    case "npm":
      return `npx shadcn@latest add ${target}`;
    case "yarn":
      return `yarn dlx shadcn@latest add ${target}`;
    case "bun":
      return `bunx --bun shadcn@latest add ${target}`;
    default:
      return `pnpm dlx shadcn@latest add ${target}`;
  }
};

export default function InstallationCommands({
  packageName,
  className,
}: InstallationCommandsProps) {
  const [activeManager, setActiveManager] = useState<(typeof managers)[number]>("pnpm");
  const [copied, setCopied] = useState(false);

  const command = useMemo(
    () => commandFor(activeManager, packageName),
    [activeManager, packageName],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy command", error);
    }
  };

  return (
    <div className={`overflow-hidden rounded-lg border ${className ?? ""}`}>
      <Tabs
        value={activeManager}
        onValueChange={(value) => setActiveManager(value as (typeof managers)[number])}
      >
        <TabsList className="flex w-full justify-between rounded-none border-b bg-background px-2">
          <div className="flex gap-1">
            {managers.map((manager) => (
              <TabsTrigger
                key={manager}
                value={manager}
                className="rounded-none px-2 data-[state=active]:border-b-2 data-[state=active]:border-b-primary data-[state=active]:shadow-none"
              >
                {manager}
              </TabsTrigger>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-md hover:bg-primary/10"
            onClick={handleCopy}
          >
            {copied ? <Check className="size-3" /> : <Clipboard className="size-3" />}
          </Button>
        </TabsList>

        <TabsContent value={activeManager} className="p-4 pt-2">
          <div className="font-mono text-xs md:text-sm">{command}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
