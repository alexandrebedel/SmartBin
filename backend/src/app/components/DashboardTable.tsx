import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { BinInfo } from "@/types";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function DashboardTable({ bins }: { bins: BinInfo[] }) {
  return (
    <Table>
      <TableCaption>List of all bin</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Bin ID</TableHead>
          <TableHead>Date de mise en ligne</TableHead>
          <TableHead>Type de déchets le plus jeté</TableHead>
          <TableHead>Total trash</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bins.map((bin: BinInfo) => {
          return (
            <TableRow>
              <TableCell className="font-medium">{bin.id}</TableCell>
              <TableCell>{format(bin.createdAt, "EEEE dd MMMM yyyy", { locale: fr })}</TableCell>
              <TableCell>{bin.mostTypeTrash}</TableCell>
              <TableCell>{bin.totalTrash}</TableCell>
              <TableCell className="text-right">
                <Link href={`/stats/${bin.id}`}>
                  <Button>Détails</Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
