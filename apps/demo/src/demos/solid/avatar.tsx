import { Avatar, AvatarFallback } from "@/registry/solid/ui/avatar";
import { Badge } from "@/registry/solid/ui/badge";

export default function AvatarDemo() {
  return (
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="flex items-center gap-3">
        <Avatar status="online">
          <AvatarFallback>HS</AvatarFallback>
        </Avatar>
        <div class="space-y-1">
          <p class="text-sm text-foreground">Haru Sato</p>
          <Badge variant="outline">Region Lead</Badge>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <Avatar status="away">
          <AvatarFallback>MN</AvatarFallback>
        </Avatar>
        <div class="space-y-1">
          <p class="text-sm text-foreground">Mina Nikaido</p>
          <Badge variant="outline">Security</Badge>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <Avatar status="offline">
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <div class="space-y-1">
          <p class="text-sm text-foreground">Akira Kato</p>
          <Badge variant="outline">SRE</Badge>
        </div>
      </div>
    </div>
  );
}
