import { Skeleton } from "@/registry/react/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}
