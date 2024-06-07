import { DashboardCard } from "../components/DashboardCard";
import { trashStatsType } from "@/types";
import DashboardTable from "../components/DashboardTable";

export const revalidate = 0;

async function getTrashStats() {
  const res = await fetch("https://smart-bin-jade.vercel.app/api/trash");
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export default async function Stats() {
  const trashStats: trashStatsType = await getTrashStats();

  return (
    <div className="pt-12">
      <h1 className="text-2xl mb-14">Dashboard</h1>
      <div className="flex gap-6 mb-20">
        <DashboardCard image="/recyclable.png" title="Recyclable" data={trashStats.stats.totalTrashByType.recyclable} />
        <DashboardCard image="/glass.jpeg" title="Glass" data={trashStats.stats.totalTrashByType.glass} />
        <DashboardCard image="/trash.jpeg" title="Trash" data={trashStats.stats.totalTrashByType.trash} />
      </div>
      <div>
        <DashboardTable bins={trashStats.stats.bins} />
      </div>
    </div>
  );
}
