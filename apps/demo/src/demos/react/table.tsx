import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/react/ui/table";

const rows = [
  { region: "Tokyo", status: "Healthy", latency: "128 ms" },
  { region: "Singapore", status: "Updating", latency: "164 ms" },
  { region: "Frankfurt", status: "Healthy", latency: "142 ms" },
  { region: "Oregon", status: "Warning", latency: "210 ms" },
];

export default function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Region</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Latency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.region}>
            <TableCell className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground">
              {row.region}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground/80">{row.status}</TableCell>
            <TableCell className="text-sm text-foreground/80">{row.latency}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>Last sync 4 minutes ago.</TableCaption>
    </Table>
  );
}
