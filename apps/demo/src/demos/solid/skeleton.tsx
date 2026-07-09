import { Skeleton } from "@/registry/solid/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div class="flex flex-col gap-3">
      <Skeleton class="h-8 w-1/3" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-5/6" />
      <Skeleton class="h-28 w-full" />
    </div>
  );
}
