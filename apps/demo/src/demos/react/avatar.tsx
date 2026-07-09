import { Avatar, AvatarFallback } from "@/registry/react/ui/avatar";
import { Badge } from "@/registry/react/ui/badge";

export default function AvatarDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex items-center gap-3">
        <Avatar status="online">
          <AvatarFallback>HS</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm text-foreground">Haru Sato</p>
          <Badge variant="outline">Region Lead</Badge>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar status="away">
          <AvatarFallback>MN</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm text-foreground">Mina Nikaido</p>
          <Badge variant="outline">Security</Badge>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar status="offline">
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm text-foreground">Akira Kato</p>
          <Badge variant="outline">SRE</Badge>
        </div>
      </div>
    </div>
  );
}
