import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const omniMonoText = {
  compact: "text-xs font-medium",
  base: "text-xs font-medium",
  wide: "text-xs font-medium",
  section: "text-xs font-medium",
  menu: "text-sm",
} as const;
